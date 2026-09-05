import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/auth/AuthContext'

export interface MensagemChat {
  id: string // id local (timestamp) para mensagens otimistas, ou id do banco quando carregado do histórico
  papel: 'user' | 'model'
  conteudo: string
  pendente?: boolean // true enquanto espera a resposta do Gemini
}

export function useNexusAI() {
  const { sessao } = useAuth()
  const [mensagens, setMensagens] = useState<MensagemChat[]>([])
  const [carregandoHistorico, setCarregandoHistorico] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // Carrega o histórico salvo assim que há sessão (uma vez).
  useEffect(() => {
    if (!sessao?.user?.id) {
      setCarregandoHistorico(false)
      return
    }
    supabase
      .from('nexus_ai_mensagens')
      .select('id, papel, conteudo')
      .eq('user_id', sessao.user.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setMensagens(data.map((m) => ({ id: String(m.id), papel: m.papel as 'user' | 'model', conteudo: m.conteudo })))
        }
        setCarregandoHistorico(false)
      })
  }, [sessao?.user?.id])

  const enviarMensagem = useCallback(
    async (texto: string, moduloContexto?: string | null) => {
      const textoLimpo = texto.trim()
      if (!textoLimpo || enviando) return

      setErro(null)
      const idOtimista = `local-${Date.now()}`
      setMensagens((prev) => [
        ...prev,
        { id: idOtimista, papel: 'user', conteudo: textoLimpo },
        { id: `${idOtimista}-resp`, papel: 'model', conteudo: '', pendente: true },
      ])
      setEnviando(true)

      try {
        const { data, error } = await supabase.functions.invoke('nexus-ai', {
          body: { mensagem: textoLimpo, moduloContexto: moduloContexto ?? null },
        })

        if (error || !data?.ok) {
          const msgErro = data?.erro ?? 'Não foi possível falar com o Nexus AI agora.'
          setErro(msgErro)
          // Remove a bolha de "pendente" e a pergunta que falhou, para não
          // deixar lixo na tela — o usuário pode tentar de novo.
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
    [enviando]
  )

  return { mensagens, carregandoHistorico, enviando, erro, enviarMensagem }
}
