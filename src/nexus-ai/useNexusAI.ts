import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/auth/AuthContext'

export type EscopoNexusAI = 'geral' | 'gestao-financeira'

export interface MensagemChat {
  id: string
  papel: 'user' | 'model'
  conteudo: string
  pendente?: boolean
}

export interface SessaoHistorico {
  sessaoId: string
  primeiraMensagem: string
  ultimaMensagemEm: string
  totalMensagens: number
}

// O supabase-js (functions.invoke) só preenche `error` quando a Edge
// Function responde com status não-2xx, e nesse caso `data` vem null — o
// corpo de verdade (com o campo `erro` que a nossa function sempre manda)
// fica em `error.context`, uma Response que precisa ser lida à parte.
async function extrairMensagemDeErro(error: unknown): Promise<string | null> {
  const contexto = (error as { context?: Response } | null)?.context
  if (!contexto || typeof contexto.json !== 'function') return null
  try {
    const corpo = await contexto.clone().json()
    return typeof corpo?.erro === 'string' ? corpo.erro : null
  } catch {
    return null // corpo não era JSON (ex: function nem chegou a rodar) — segue pro fallback genérico
  }
}

const INATIVIDADE_NOVA_SESSAO_MS = 2 * 60 * 1000 // 2 minutos
const CHAVE_ULTIMA_ATIVIDADE = (escopo: EscopoNexusAI) => `nexus-ai:${escopo}:ultima-atividade`
const CHAVE_SESSAO_ATUAL = (escopo: EscopoNexusAI) => `nexus-ai:${escopo}:sessao-atual`

function gerarUuid(): string {
  // crypto.randomUUID existe em todo navegador moderno (o app já exige
  // HTTPS pelo GitHub Pages, então está sempre disponível aqui).
  return crypto.randomUUID()
}

// Decide qual sessaoId usar ao abrir o chat: se já tem uma sessão salva
// (localStorage) E a última atividade foi há menos de 2 minutos, continua
// nela. Senão, gera uma sessão nova — é essa checagem de tempo que
// implementa "depois de 2 min de inatividade, começa um chat novo".
function obterOuCriarSessaoId(escopo: EscopoNexusAI): { sessaoId: string; ehNova: boolean } {
  const sessaoSalva = localStorage.getItem(CHAVE_SESSAO_ATUAL(escopo))
  const ultimaAtividade = Number(localStorage.getItem(CHAVE_ULTIMA_ATIVIDADE(escopo)) ?? 0)
  const passouTempo = Date.now() - ultimaAtividade > INATIVIDADE_NOVA_SESSAO_MS

  if (sessaoSalva && !passouTempo) {
    return { sessaoId: sessaoSalva, ehNova: false }
  }

  const novaSessaoId = gerarUuid()
  localStorage.setItem(CHAVE_SESSAO_ATUAL(escopo), novaSessaoId)
  return { sessaoId: novaSessaoId, ehNova: true }
}

function marcarAtividade(escopo: EscopoNexusAI) {
  localStorage.setItem(CHAVE_ULTIMA_ATIVIDADE(escopo), String(Date.now()))
}

export function useNexusAI(escopo: EscopoNexusAI = 'geral') {
  const { sessao } = useAuth()
  const [sessaoId, setSessaoId] = useState<string>(() => obterOuCriarSessaoId(escopo).sessaoId)
  const [mensagens, setMensagens] = useState<MensagemChat[]>([])
  const [carregandoHistorico, setCarregandoHistorico] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const escopoRef = useRef(escopo)
  escopoRef.current = escopo

  const carregarMensagensDaSessao = useCallback(
    async (idSessao: string) => {
      if (!sessao?.user?.id) {
        setCarregandoHistorico(false)
        return
      }
      setCarregandoHistorico(true)
      const { data } = await supabase
        .from('nexus_ai_mensagens')
        .select('id, papel, conteudo')
        .eq('user_id', sessao.user.id)
        .eq('sessao_id', idSessao)
        .order('created_at', { ascending: true })

      setMensagens((data ?? []).map((m) => ({ id: String(m.id), papel: m.papel as 'user' | 'model', conteudo: m.conteudo })))
      setCarregandoHistorico(false)
    },
    [sessao?.user?.id]
  )

  // Carrega a sessão atual ao montar (ou quando o escopo muda — o chat da
  // GF e o chat geral têm sessões independentes).
  useEffect(() => {
    const { sessaoId: id } = obterOuCriarSessaoId(escopo)
    setSessaoId(id)
    carregarMensagensDaSessao(id)
  }, [escopo, carregarMensagensDaSessao])

  const enviarMensagem = useCallback(
    async (texto: string, moduloContexto?: string | null) => {
      const textoLimpo = texto.trim()
      if (!textoLimpo || enviando) return

      setErro(null)
      marcarAtividade(escopoRef.current)

      const idOtimista = `local-${Date.now()}`
      setMensagens((prev) => [
        ...prev,
        { id: idOtimista, papel: 'user', conteudo: textoLimpo },
        { id: `${idOtimista}-resp`, papel: 'model', conteudo: '', pendente: true },
      ])
      setEnviando(true)

      try {
        const { data, error } = await supabase.functions.invoke('nexus-ai', {
          body: { mensagem: textoLimpo, sessaoId, escopo: escopoRef.current, moduloContexto: moduloContexto ?? null },
        })

        if (error || !data?.ok) {
          // Quando a Edge Function responde com status de erro (400/401/500/502),
          // o supabase-js devolve `data: null` e o motivo real fica só dentro de
          // `error.context` (a Response bruta) — precisa ser lido manualmente,
          // senão a mensagem específica que a function gerou (ex: "Sessão
          // inválida", "chave do Gemini ausente") se perde e vira genérico.
          const msgErro = data?.erro ?? (await extrairMensagemDeErro(error)) ?? 'Não foi possível falar com o Nexus AI agora.'
          setErro(msgErro)
          setMensagens((prev) => prev.filter((m) => m.id !== idOtimista && m.id !== `${idOtimista}-resp`))
          return
        }

        setMensagens((prev) =>
          prev.map((m) => (m.id === `${idOtimista}-resp` ? { ...m, conteudo: data.dados.resposta, pendente: false } : m))
        )
      } catch {
        setErro('Sem conexão com o Nexus AI. Verifique sua internet.')
        setMensagens((prev) => prev.filter((m) => m.id !== idOtimista && m.id !== `${idOtimista}-resp`))
      } finally {
        setEnviando(false)
      }
    },
    [enviando, sessaoId]
  )

  // Botão "Novo chat" — força uma sessão nova, mesmo que ainda esteja
  // dentro da janela de 2 minutos.
  const iniciarNovoChat = useCallback(() => {
    const novaSessaoId = gerarUuid()
    localStorage.setItem(CHAVE_SESSAO_ATUAL(escopoRef.current), novaSessaoId)
    setSessaoId(novaSessaoId)
    setMensagens([])
    setErro(null)
  }, [])

  // Troca para uma conversa antiga (vindo do painel de Histórico).
  const abrirSessao = useCallback(
    (idSessao: string) => {
      localStorage.setItem(CHAVE_SESSAO_ATUAL(escopoRef.current), idSessao)
      marcarAtividade(escopoRef.current) // reabrir uma conversa antiga conta como atividade — evita ela mesma expirar em 2min
      setSessaoId(idSessao)
      carregarMensagensDaSessao(idSessao)
    },
    [carregarMensagensDaSessao]
  )

  // Lista as conversas anteriores (agrupadas por sessao_id) do escopo
  // atual, mais recentes primeiro — usado pelo painel de Histórico.
  const listarHistoricoSessoes = useCallback(async (): Promise<SessaoHistorico[]> => {
    if (!sessao?.user?.id) return []

    const { data } = await supabase
      .from('nexus_ai_mensagens')
      .select('sessao_id, papel, conteudo, created_at')
      .eq('user_id', sessao.user.id)
      .eq('escopo', escopoRef.current)
      .order('created_at', { ascending: true })

    if (!data) return []

    // Agrupa em memória por sessao_id — mais simples e robusto que uma
    // query SQL de agregação, e o volume de mensagens por usuário é
    // pequeno o suficiente para isso não pesar.
    const porSessao = new Map<string, { primeiraMensagemUser: string | null; ultimaEm: string; total: number }>()
    for (const m of data as { sessao_id: string; papel: string; conteudo: string; created_at: string }[]) {
      const atual = porSessao.get(m.sessao_id) ?? { primeiraMensagemUser: null, ultimaEm: m.created_at, total: 0 }
      if (atual.primeiraMensagemUser === null && m.papel === 'user') atual.primeiraMensagemUser = m.conteudo
      atual.ultimaEm = m.created_at
      atual.total += 1
      porSessao.set(m.sessao_id, atual)
    }

    return [...porSessao.entries()]
      .map(([sessaoId, v]) => ({
        sessaoId,
        primeiraMensagem: v.primeiraMensagemUser ?? '(sem mensagens do usuário)',
        ultimaMensagemEm: v.ultimaEm,
        totalMensagens: v.total,
      }))
      .sort((a, b) => new Date(b.ultimaMensagemEm).getTime() - new Date(a.ultimaMensagemEm).getTime())
  }, [sessao?.user?.id])

  return {
    sessaoId,
    mensagens,
    carregandoHistorico,
    enviando,
    erro,
    enviarMensagem,
    iniciarNovoChat,
    abrirSessao,
    listarHistoricoSessoes,
  }
}
