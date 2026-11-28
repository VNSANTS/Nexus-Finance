import { useEffect, useRef } from 'react'
import type { UserProgress, PreferenciasNotificacoesAprender } from '@/types'
import { todayStr } from '@/hooks/useUserProgress'
import { tocarSomAprender } from './som'
import { BADGES } from '@/data/badges'
import { aoRetomarAndroid, mostrarLembreteAndroid, mostrarNotificacaoWeb, notificacoesLocaisAndroid, sincronizarLembretesAndroid, type LembreteDispositivo } from './notificacoesDispositivo'

export type TipoNotificacaoAprender = 'streak' | 'desafio-diario' | 'revisao' | 'conquista' | 'modulo-parado' | 'motivacional'

export interface NotificacaoAprender {
  id: string
  tipo: TipoNotificacaoAprender
  titulo: string
  mensagem: string
  rota: string
}

// Frases motivadoras: import dinâmico (mesmo padrão já usado na Home — ver
// nexus-finance.md, "chunk inicial reduzido") pra não engordar o bundle
// inicial só por causa de uma categoria de notificação opcional.
async function sortearFraseMotivadora(): Promise<string | null> {
  try {
    const mod = await import('@/data/frasesMotivadoras')
    const todas = mod.FRASES_MOTIVADORAS
    if (!Array.isArray(todas) || todas.length === 0) return null
    const escolhida = todas[Math.floor(Math.random() * todas.length)]
    return `"${escolhida.texto}" — ${escolhida.fonte}`
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// "Não perturbe": intervalo em HH:MM, com suporte a virar a meia-noite
// (ex: 22:00 -> 08:00, onde o fim é "menor" que o início).
// ---------------------------------------------------------------------------
function minutosDoDia(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export function dentroDeNaoPerturbe(prefs: PreferenciasNotificacoesAprender, agora = new Date()): boolean {
  if (!prefs.naoPerturbe.ativo) return false
  const atual = agora.getHours() * 60 + agora.getMinutes()
  const inicio = minutosDoDia(prefs.naoPerturbe.inicio)
  const fim = minutosDoDia(prefs.naoPerturbe.fim)
  if (inicio === fim) return false // janela de 0 minutos = desativada na prática
  if (inicio < fim) return atual >= inicio && atual < fim
  // Vira a meia-noite (ex: 22:00 -> 08:00)
  return atual >= inicio || atual < fim
}

// ---------------------------------------------------------------------------
// Log local de deduplicação — evita reenviar a mesma notificação a cada
// checagem periódica (ex: a cada 60s) dentro da mesma janela (dia/semana).
// Fica fora do UserProgress de propósito: é estado de agendamento, não
// progresso do usuário, e não precisa entrar no backup/export de progresso.
// ---------------------------------------------------------------------------
const LOG_KEY = 'nexus-notificacoes-aprender-log:v2'

interface LogNotificacoes {
  disparadasEm: Record<string, string> // chave da categoria -> marcador da janela (dia ou semana) já disparada
  badgesConhecidos: string[] // badges já notificados, pra "conquistas" só notificar as novas
}

function lerLog(identity: string): LogNotificacoes {
  try {
    const raw = localStorage.getItem(`${LOG_KEY}:${encodeURIComponent(identity)}`)
    if (!raw) return { disparadasEm: {}, badgesConhecidos: [] }
    const parsed = JSON.parse(raw)
    return {
      disparadasEm: parsed?.disparadasEm && typeof parsed.disparadasEm === 'object' ? parsed.disparadasEm : {},
      badgesConhecidos: Array.isArray(parsed?.badgesConhecidos) ? parsed.badgesConhecidos : [],
    }
  } catch {
    return { disparadasEm: {}, badgesConhecidos: [] }
  }
}

function salvarLog(log: LogNotificacoes, identity: string) {
  try {
    localStorage.setItem(`${LOG_KEY}:${encodeURIComponent(identity)}`, JSON.stringify(log))
  } catch {
    // modo privado / cota cheia: sem dedupe nesta sessão, não é crítico
  }
}

function numeroDaSemana(d: Date): string {
  // Marcador simples "ano-semana" (não precisa ser ISO 8601 exato — só
  // precisa ser estável dentro da mesma semana pra fins de dedupe).
  const primeiroDoAno = new Date(d.getFullYear(), 0, 1)
  const dias = Math.floor((d.getTime() - primeiroDoAno.getTime()) / (1000 * 60 * 60 * 24))
  return `${d.getFullYear()}-s${Math.ceil((dias + primeiroDoAno.getDay() + 1) / 7)}`
}

// ---------------------------------------------------------------------------
// Regras de "está no dia certo" pro lembrete de sequência.
// ---------------------------------------------------------------------------
function diaBateComFrequencia(prefs: PreferenciasNotificacoesAprender['lembreteStreak'], agora: Date): boolean {
  const diaSemana = agora.getDay() // 0=domingo..6=sábado
  if (prefs.frequencia === 'diaria') return true
  if (prefs.frequencia === 'dias_uteis') return diaSemana >= 1 && diaSemana <= 5
  return prefs.diasPersonalizados.includes(diaSemana)
}

// Já passou do horário configurado, hoje?
function jaPassouDoHorario(horario: string, agora: Date): boolean {
  return agora.getHours() * 60 + agora.getMinutes() >= minutosDoDia(horario)
}

export interface DependenciasNotificacoesAprender {
  progress: UserProgress
  prefs: PreferenciasNotificacoesAprender
  agora?: Date
}

/**
 * Calcula, a partir das preferências + progresso do usuário, quais
 * notificações deveriam disparar "agora" — puro (não tem side-effect, não
 * mexe no log de dedupe). O agendador (useAgendadorNotificacoesAprender)
 * é quem decide o que já foi disparado e efetivamente dispara.
 */
export function calcularNotificacoesDevidas({ progress, prefs, agora = new Date() }: DependenciasNotificacoesAprender): NotificacaoAprender[] {
  if (!prefs.ativas) return []
  if (dentroDeNaoPerturbe(prefs, agora)) return []

  const hoje = todayStr(agora)
  const notificacoes: NotificacaoAprender[] = []

  // --- Lembrete de sequência ---
  if (
    prefs.lembreteStreak.ativa &&
    diaBateComFrequencia(prefs.lembreteStreak, agora) &&
    jaPassouDoHorario(prefs.lembreteStreak.horario, agora) &&
    (!prefs.lembreteStreak.apenasSeAindaNaoEstudouHoje || progress.lastActiveDate !== hoje)
  ) {
    const emRisco = progress.streak > 0
    notificacoes.push({
      id: `streak-${hoje}`,
      tipo: 'streak',
      titulo: emRisco ? `Não perca sua sequência de ${progress.streak} dias! 🔥` : 'Hora de estudar 📚',
      mensagem: emRisco
        ? 'Você ainda não estudou hoje — alguns minutos já garantem seu dia.'
        : 'Comece uma nova sequência hoje mesmo.',
      rota: '/aprender',
    })
  }

  // --- Desafio diário ---
  if (
    prefs.desafioDiario.ativa &&
    jaPassouDoHorario(prefs.desafioDiario.horario, agora) &&
    progress.ultimoDesafioData !== hoje
  ) {
    notificacoes.push({
      id: `desafio-diario-${hoje}`,
      tipo: 'desafio-diario',
      titulo: 'Novo desafio diário disponível 🎯',
      mensagem: 'Teste seus conhecimentos e ganhe XP extra hoje.',
      rota: '/desafio-diario',
    })
  }

  // --- Revisão espaçada vencendo ---
  if (prefs.revisao.ativa && progress.itensRevisao.length >= prefs.revisao.minimoItens) {
    notificacoes.push({
      id: `revisao-${hoje}`,
      tipo: 'revisao',
      titulo: 'Itens de revisão te esperando 🔁',
      mensagem: `Você tem ${progress.itensRevisao.length} itens pendentes de revisão.`,
      rota: '/revisao',
    })
  }

  // --- Módulo parado ---
  // Simplificação assumida (sem timestamp por módulo hoje no UserProgress):
  // usa como proxy "existe módulo iniciado e não terminado" + "o app ficou
  // parado por N dias" (via lastActiveDate), em vez de checar módulo por
  // módulo. Se no futuro cada módulo passar a guardar a data da última
  // abertura, dá pra trocar por uma checagem por módulo de verdade.
  if (prefs.moduloParado.ativa && progress.lastActiveDate) {
    const diffDias = Math.round((agora.getTime() - new Date(`${progress.lastActiveDate}T12:00:00`).getTime()) / (1000 * 60 * 60 * 24))
    const temModuloIncompleto = Object.values(progress.abasConcluidas).some((abas) => abas.length > 0 && abas.length < 6)
    if (temModuloIncompleto && diffDias >= prefs.moduloParado.diasInatividade) {
      notificacoes.push({
        id: `modulo-parado-${hoje}`,
        tipo: 'modulo-parado',
        titulo: 'Um módulo está te esperando 📖',
        mensagem: `Já fazem ${diffDias} dias — que tal terminar de onde parou?`,
        rota: '/aprender',
      })
    }
  }

  // --- Conquistas (badges novos) — comparado contra o log de dedupe direto
  // pelo chamador, aqui só sinaliza os candidatos (todos os badges atuais);
  // ver useAgendadorNotificacoesAprender para o filtro do que é realmente novo.
  if (prefs.conquistas.ativa && progress.badges.length > 0) {
    notificacoes.push(
      ...progress.badges.map((badgeId) => {
        const badge = BADGES.find((b) => b.id === badgeId)
        return {
          id: `conquista-${badgeId}`,
          tipo: 'conquista' as const,
          titulo: 'Nova conquista desbloqueada! 🏆',
          mensagem: badge ? badge.nome : badgeId,
          rota: '/perfil',
        }
      })
    )
  }

  return notificacoes
}

// ---------------------------------------------------------------------------
// Efeitos colaterais: notificação nativa do navegador + som + vibração.
// ---------------------------------------------------------------------------
function preferenciasDoDispositivo(prefs: PreferenciasNotificacoesAprender) {
  return { som: prefs.som.ativo && prefs.som.estilo !== 'nenhum' && prefs.som.volume > 0, vibrar: prefs.vibrar }
}

function horarioPermitido(dia: Date, horario: string, prefs: PreferenciasNotificacoesAprender) {
  const data = new Date(dia)
  const minutos = minutosDoDia(horario)
  data.setHours(Math.floor(minutos / 60), minutos % 60, 0, 0)
  if (!dentroDeNaoPerturbe(prefs, data)) return data
  const fim = minutosDoDia(prefs.naoPerturbe.fim)
  if (fim <= minutos) return null
  data.setHours(Math.floor(fim / 60), fim % 60, 0, 0)
  return data
}

function planejarLembretesAprender(progress: UserProgress, prefs: PreferenciasNotificacoesAprender) {
  const lembretes: LembreteDispositivo[] = []
  if (!prefs.ativas || !prefs.notificacaoNavegador) return lembretes
  const hoje = new Date()
  const categorias = [
    ['streak', prefs.lembreteStreak.horario],
    ['desafio-diario', prefs.desafioDiario.horario],
    ['revisao', '12:00'],
    ['modulo-parado', '12:00'],
  ] as const
  for (let offset = 0; offset < 7; offset++) {
    const dia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + offset)
    for (const [tipo, hora] of categorias) {
      const horario = horarioPermitido(dia, hora, prefs)
      if (!horario) continue
      const evento = calcularNotificacoesDevidas({ progress, prefs, agora: horario }).find((item) => item.tipo === tipo)
      if (evento) lembretes.push({ chave: evento.id, titulo: evento.titulo, mensagem: evento.mensagem, rota: evento.rota, horario })
    }
    if (prefs.motivacional.ativa && (prefs.motivacional.frequencia === 'diaria' || dia.getDay() === 1)) {
      const horario = horarioPermitido(dia, '12:00', prefs)
      if (horario) lembretes.push({ chave: `motivacional-${todayStr(dia)}`, titulo: 'Nexus Finance 💡', mensagem: 'Que tal reservar alguns minutos para avançar nos seus estudos?', rota: '/', horario })
    }
  }
  return lembretes
}

function dispararEfeitos(n: NotificacaoAprender, prefs: PreferenciasNotificacoesAprender, conta: string | null) {
  if (prefs.notificacaoNavegador && notificacoesLocaisAndroid && conta) {
    mostrarLembreteAndroid(conta, 'aprender', { chave: n.id, titulo: n.titulo, mensagem: n.mensagem, rota: n.rota }, preferenciasDoDispositivo(prefs))
    return
  }
  if (prefs.notificacaoNavegador) void mostrarNotificacaoWeb(n.titulo, { body: n.mensagem, tag: n.id }, conta)
  if (prefs.som.ativo && prefs.som.estilo !== 'nenhum') {
    tocarSomAprender(prefs.som.estilo, 'padrao', prefs.som.volume)
  }
  if (prefs.vibrar && 'vibrate' in navigator) {
    try {
      navigator.vibrate(120)
    } catch {
      // dispositivo sem suporte real, apesar do feature-detect — ignora
    }
  }
}

const INTERVALO_CHECAGEM_MS = 60 * 1000

/**
 * Roda a checagem periódica (a cada 60s, mais um "pente-fino" sempre que a
 * aba volta a ficar visível) enquanto o app está aberto, e dispara os
 * efeitos (notificação nativa, som, vibração) para cada notificação devida
 * ainda não registrada no log de dedupe local.
 */
export function useAgendadorNotificacoesAprender(progress: UserProgress, prefs: PreferenciasNotificacoesAprender, enabled = true, identity = 'anonymous') {
  const conta = identity.startsWith('user:') ? identity.slice(5) : null
  const progressRef = useRef(progress)
  const prefsRef = useRef(prefs)
  progressRef.current = progress
  prefsRef.current = prefs

  useEffect(() => {
    if (!enabled || !conta || !notificacoesLocaisAndroid) return
    sincronizarLembretesAndroid(conta, 'aprender', planejarLembretesAprender(progress, prefs), preferenciasDoDispositivo(prefs))
  }, [conta, enabled, prefs, progress])

  useEffect(() => {
    if (!enabled) return
    let ativo = true
    function checar() {
      const p = progressRef.current
      const cfg = prefsRef.current
      if (!cfg.ativas) return
      const agora = new Date()
      if (dentroDeNaoPerturbe(cfg, agora)) return
      const devidas = calcularNotificacoesDevidas({ progress: p, prefs: cfg, agora })
      const usaAgendados = notificacoesLocaisAndroid && cfg.notificacaoNavegador

      const log = lerLog(identity)
      const hoje = todayStr(agora)
      const semana = numeroDaSemana(agora)
      let mudou = false

      for (const n of devidas) {
        if (n.tipo === 'conquista') {
          const badgeId = n.id.replace(/^conquista-/, '')
          if (log.badgesConhecidos.includes(badgeId)) continue
          log.badgesConhecidos = [...log.badgesConhecidos, badgeId]
          mudou = true
          dispararEfeitos(n, cfg, conta)
          continue
        }

        if (usaAgendados) continue
        const janela = n.tipo === 'motivacional' ? semana : hoje
        if (log.disparadasEm[n.id] === janela) continue
        log.disparadasEm[n.id] = janela
        mudou = true
        dispararEfeitos(n, cfg, conta)
      }

      // Motivacional é assíncrona (busca frase por import dinâmico) e não
      // depende de progress/badges — tratada à parte, com sua própria janela.
      if (cfg.motivacional.ativa && !usaAgendados) {
        const janelaMotivacional = cfg.motivacional.frequencia === 'semanal' ? semana : hoje
        const chave = 'motivacional'
        if (log.disparadasEm[chave] !== janelaMotivacional) {
          log.disparadasEm[chave] = janelaMotivacional
          mudou = true
          void sortearFraseMotivadora().then((frase) => {
            if (!ativo || !frase || !prefsRef.current.ativas || !prefsRef.current.motivacional.ativa) return
            dispararEfeitos({ id: `motivacional-${janelaMotivacional}`, tipo: 'motivacional', titulo: 'Nexus Finance 💡', mensagem: frase, rota: '/' }, prefsRef.current, conta)
          })
        }
      }

      if (mudou) salvarLog(log, identity)
    }

    checar()
    const intervalo = setInterval(checar, INTERVALO_CHECAGEM_MS)
    const retomar = () => {
      if (conta && notificacoesLocaisAndroid) {
        const cfg = prefsRef.current
        sincronizarLembretesAndroid(conta, 'aprender', planejarLembretesAprender(progressRef.current, cfg), preferenciasDoDispositivo(cfg))
      }
      checar()
    }
    const onVisibilidade = () => {
      if (document.visibilityState === 'visible') retomar()
    }
    const removerListenerAndroid = aoRetomarAndroid(retomar)
    if (!notificacoesLocaisAndroid) document.addEventListener('visibilitychange', onVisibilidade)
    return () => {
      ativo = false
      clearInterval(intervalo)
      removerListenerAndroid()
      document.removeEventListener('visibilitychange', onVisibilidade)
    }
  }, [conta, enabled, identity])
}
