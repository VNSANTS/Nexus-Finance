import { createContext, createElement, useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import type { ReactNode } from 'react'
import type { UserProgress, ItemRevisao, Flashcard, QuizQuestion, NomeAba, PerguntaDesafio } from '@/types'
import { TODAS_ABAS, XP_POR_ABA } from '@/types'

const STORAGE_KEY = 'nexus-finance-progress'
const STORAGE_VERSION = 2
const PERSIST_DEBOUNCE_MS = 400
const JANELA_ANTI_GRINDING_MS = 10 * 60 * 1000

const LEVELS = [
  { min: 0, name: 'Novato' },
  { min: 300, name: 'Poupador' },
  { min: 900, name: 'Investidor' },
  { min: 2000, name: 'Estrategista' },
  { min: 4000, name: 'Tubarão' },
  { min: 8000, name: 'Nexus Master' },
]

function getLevelInfo(xp: number) {
  let levelIndex = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) levelIndex = i
  }
  const current = LEVELS[levelIndex]
  const next = LEVELS[levelIndex + 1]
  const progressToNext = next
    ? Math.round(((xp - current.min) / (next.min - current.min)) * 100)
    : 100
  return {
    level: levelIndex + 1,
    levelName: current.name,
    nextLevelName: next?.name ?? null,
    xpToNext: next ? next.min - xp : 0,
    progressToNext,
  }
}

// Sistema de bônus de XP (baseado em ciência de motivação, versão simplificada e transparente).
// Todo bônus é visível e explicado ao usuário — nunca surpresa oculta.
export interface ResultadoXp {
  xpFinal: number
  bonusAplicado: string | null
  avisoGrinding: string | null
}

function calcularBonusXp(
  xpBase: number,
  historicoXpRecente: { xp: number; timestamp: number }[],
  agoraMs = Date.now()
): ResultadoXp {
  const agora = new Date(agoraMs)
  const hora = agora.getHours()
  const bonus: { motivo: string; mult: number }[] = []

  if ((hora >= 6 && hora < 9) || (hora >= 20 && hora < 22)) {
    bonus.push({ motivo: 'Horário de ouro', mult: 1.15 })
  }
  const diaSemana = agora.getDay()
  if (diaSemana === 0 || diaSemana === 6) {
    bonus.push({ motivo: 'Fim de semana', mult: 1.1 })
  }

  const melhorBonus = bonus.sort((a, b) => b.mult - a.mult)[0]
  const multiplicador = melhorBonus ? melhorBonus.mult : 1

  const xpUltimos10min = historicoXpRecente
    .filter((h) => agoraMs - h.timestamp < JANELA_ANTI_GRINDING_MS)
    .reduce((soma, h) => soma + h.xp, 0)

  let fatorAntiGrinding = 1
  let avisoGrinding: string | null = null
  if (xpUltimos10min > 150) {
    fatorAntiGrinding = 0.3
    avisoGrinding = 'Você está indo rápido demais — XP reduzido temporariamente para incentivar um ritmo saudável de estudo'
  } else if (xpUltimos10min > 80) {
    fatorAntiGrinding = 0.6
  }

  return {
    xpFinal: Math.round(xpBase * multiplicador * fatorAntiGrinding),
    bonusAplicado: melhorBonus ? melhorBonus.motivo : null,
    avisoGrinding,
  }
}

function defaultProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    levelName: 'Novato',
    streak: 0,
    lastActiveDate: null,
    activeDates: [],
    abasConcluidas: {},
    quizScores: {},
    badges: [],
    watchlist: ['PETR4', 'ITUB4', 'MXRF11'],
    goals: [],
    onboardingDone: false,
    riskProfile: null,
    itensRevisao: [],
    perfilPessoal: { nome: 'Investidor', emoji: null, cor: '#00D4FF' },
    historicoXpRecente: [],
    sequenciaAcertosAtual: 0,
    maiorSequenciaAcertos: 0,
    livrosAbertos: [],
    calculadorasUsadas: [],
    perfisCarteiraVistos: [],
    desafiosCompletos: 0,
    ultimoDesafioData: null,
    perguntasDesafioUsadas: [],
    itensRevisadosTotal: 0,
  }
}

// Data local do usuário. NAO usar toISOString() aqui: ele devolve UTC, e no
// Brasil (UTC-3) isso vira o dia seguinte a partir das 21h — o streak pulava de
// dia e as datas do calendário de atividade saíam trocadas.
function todayStr(d = new Date()) {
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

function daysBetween(a: string, b: string) {
  const d1 = new Date(a + 'T12:00:00') // meio-dia evita a borda de horário de verão
  const d2 = new Date(b + 'T12:00:00')
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

// ---------------------------------------------------------------------------
// Persistência versionada. Sem isso, mudar o formato de UserProgress corrompe
// silenciosamente o progresso de quem já usava o app — foi exatamente o que
// aconteceu quando `completedModules` virou `abasConcluidas`.
// ---------------------------------------------------------------------------
interface DadosSalvos {
  v: number
  data: unknown
}

function migrar(bruto: unknown): Partial<UserProgress> {
  if (!bruto || typeof bruto !== 'object') return {}
  const envelope = bruto as Partial<DadosSalvos>

  // v2+: já está no formato atual
  if (typeof envelope.v === 'number') {
    return (envelope.data ?? {}) as Partial<UserProgress>
  }

  // v1 (sem envelope): objeto cru, possivelmente com o esquema antigo de
  // conclusão por módulo inteiro.
  const antigo = bruto as Record<string, unknown>
  const migrado: Record<string, unknown> = { ...antigo }
  const concluidosAntigos = antigo.completedModules
  if (Array.isArray(concluidosAntigos)) {
    const abas: Record<string, string[]> = { ...(antigo.abasConcluidas as Record<string, string[]> | undefined) }
    for (const moduloId of concluidosAntigos) {
      if (typeof moduloId === 'string' && !abas[moduloId]) abas[moduloId] = [...TODAS_ABAS]
    }
    migrado.abasConcluidas = abas
    delete migrado.completedModules
  }
  return migrado as Partial<UserProgress>
}

function carregar(): UserProgress {
  const base = defaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const merged = { ...base, ...migrar(JSON.parse(raw)) }
    // Blindagem: um campo corrompido não pode derrubar o app inteiro.
    // Sem isso, `progress.itensRevisao.map(...)` quebra a tela se vier nulo.
    merged.activeDates = Array.isArray(merged.activeDates) ? merged.activeDates : []
    merged.badges = Array.isArray(merged.badges) ? merged.badges : []
    merged.watchlist = Array.isArray(merged.watchlist) ? merged.watchlist : base.watchlist
    merged.goals = Array.isArray(merged.goals) ? merged.goals : []
    merged.itensRevisao = Array.isArray(merged.itensRevisao) ? merged.itensRevisao : []
    merged.historicoXpRecente = Array.isArray(merged.historicoXpRecente) ? merged.historicoXpRecente : []
    merged.abasConcluidas =
      merged.abasConcluidas && typeof merged.abasConcluidas === 'object' ? merged.abasConcluidas : {}
    merged.quizScores = merged.quizScores && typeof merged.quizScores === 'object' ? merged.quizScores : {}
    merged.perfilPessoal = { ...base.perfilPessoal, ...(merged.perfilPessoal ?? {}) }
    // Blindagem dos campos de rastreamento de conquistas — progresso salvo antes
    // dessa mudança não tem nenhum destes, então caem no default (tudo zerado).
    merged.livrosAbertos = Array.isArray(merged.livrosAbertos) ? merged.livrosAbertos : []
    merged.calculadorasUsadas = Array.isArray(merged.calculadorasUsadas) ? merged.calculadorasUsadas : []
    merged.perfisCarteiraVistos = Array.isArray(merged.perfisCarteiraVistos) ? merged.perfisCarteiraVistos : []
    merged.sequenciaAcertosAtual = typeof merged.sequenciaAcertosAtual === 'number' ? merged.sequenciaAcertosAtual : 0
    merged.maiorSequenciaAcertos = typeof merged.maiorSequenciaAcertos === 'number' ? merged.maiorSequenciaAcertos : 0
    merged.desafiosCompletos = typeof merged.desafiosCompletos === 'number' ? merged.desafiosCompletos : 0
    merged.ultimoDesafioData = typeof merged.ultimoDesafioData === 'string' ? merged.ultimoDesafioData : null
    merged.perguntasDesafioUsadas = Array.isArray(merged.perguntasDesafioUsadas) ? merged.perguntasDesafioUsadas : []
    merged.itensRevisadosTotal = typeof merged.itensRevisadosTotal === 'number' ? merged.itensRevisadosTotal : 0
    return merged
  } catch {
    return base
  }
}

// ---------------------------------------------------------------------------
// Store. O estado canônico mora num ref e o React é notificado depois — assim
// `ganharXp` e `concluirAba` devolvem o resultado na hora, sem depender do que
// acontece dentro do updater do setState (que roda duas vezes em StrictMode e
// não tem garantia de execução síncrona).
// ---------------------------------------------------------------------------
function useProgressStore() {
  const stateRef = useRef<UserProgress | null>(null)
  if (stateRef.current === null) stateRef.current = carregar()
  const [, notificar] = useReducer((n: number) => n + 1, 0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const persistir = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    try {
      const envelope: DadosSalvos = { v: STORAGE_VERSION, data: stateRef.current }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope))
    } catch {
      // modo privado / cota cheia: o app continua funcionando em memória
    }
  }, [])

  const update = useCallback(
    (fn: (p: UserProgress) => UserProgress) => {
      const atual = stateRef.current!
      const proximo = fn(atual)
      if (proximo === atual) return atual
      stateRef.current = proximo
      notificar()
      // Escrita agrupada: sem isso o app serializava o progresso inteiro
      // (incluindo todos os itens de revisão) a cada mudança de estado.
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(persistir, PERSIST_DEBOUNCE_MS)
      return proximo
    },
    [persistir]
  )

  // Garante que nada se perde quando o app vai para segundo plano. No iOS,
  // 'pagehide' é o evento confiável — 'beforeunload' não dispara.
  useEffect(() => {
    const flush = () => {
      if (timerRef.current) persistir()
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [persistir])

  // Registra a visita de hoje e recalcula o streak, uma única vez.
  useEffect(() => {
    const today = todayStr()
    update((prev) => {
      if (prev.lastActiveDate === today) return prev
      let newStreak = 1
      if (prev.lastActiveDate) {
        const diff = daysBetween(prev.lastActiveDate, today)
        if (diff === 1) newStreak = prev.streak + 1
        else if (diff === 0) newStreak = prev.streak
        else newStreak = 1
      }
      const activeDates = prev.activeDates.includes(today)
        ? prev.activeDates
        : [...prev.activeDates, today].slice(-90)
      return { ...prev, streak: newStreak, lastActiveDate: today, activeDates }
    })
  }, [update])

  const ganharXp = useCallback(
    (xpBase: number): ResultadoXp => {
      const agoraMs = Date.now()
      const resultado = calcularBonusXp(xpBase, stateRef.current!.historicoXpRecente, agoraMs)
      update((prev) => {
        const newXp = prev.xp + resultado.xpFinal
        const info = getLevelInfo(newXp)
        const historicoLimpo = prev.historicoXpRecente.filter(
          (h) => agoraMs - h.timestamp < JANELA_ANTI_GRINDING_MS
        )
        return {
          ...prev,
          xp: newXp,
          level: info.level,
          levelName: info.levelName,
          historicoXpRecente: [...historicoLimpo, { xp: resultado.xpFinal, timestamp: agoraMs }],
        }
      })
      return resultado
    },
    [update]
  )

  // Perda de XP ao errar uma pergunta do quiz. Sem bônus de horário/fim de semana
  // e sem anti-grinding — isso é penalidade, não recompensa, não faz sentido multiplicar.
  // XP pode ficar negativo: não há piso em 0, de propósito.
  const perderXp = useCallback(
    (xp: number) => {
      update((prev) => {
        const newXp = prev.xp - xp
        const info = getLevelInfo(Math.max(newXp, 0)) // nível/título nunca regride abaixo de "Novato", só o número de XP fica negativo
        return {
          ...prev,
          xp: newXp,
          level: info.level,
          levelName: info.levelName,
        }
      })
    },
    [update]
  )

  const concluirAba = useCallback(
    (moduloId: string, aba: NomeAba): ResultadoXp | null => {
      const abasDoModulo = stateRef.current!.abasConcluidas[moduloId] || []
      if (abasDoModulo.includes(aba)) return null
      update((prev) => ({
        ...prev,
        abasConcluidas: {
          ...prev.abasConcluidas,
          [moduloId]: [...(prev.abasConcluidas[moduloId] || []), aba],
        },
      }))
      return ganharXp(XP_POR_ABA)
    },
    [update, ganharXp]
  )

  const progress = stateRef.current!

  const isModuloCompleto = useCallback(
    (moduloId: string) => (progress.abasConcluidas[moduloId] || []).length === TODAS_ABAS.length,
    [progress.abasConcluidas]
  )

  const recordQuizScore = useCallback(
    (quizId: string, score: number) => {
      update((prev) => ({ ...prev, quizScores: { ...prev.quizScores, [quizId]: score } }))
    },
    [update]
  )

  const toggleWatchlist = useCallback(
    (ticker: string) => {
      update((prev) => ({
        ...prev,
        watchlist: prev.watchlist.includes(ticker)
          ? prev.watchlist.filter((t) => t !== ticker)
          : [...prev.watchlist, ticker],
      }))
    },
    [update]
  )

  const unlockBadge = useCallback(
    (badgeId: string) => {
      update((prev) =>
        prev.badges.includes(badgeId) ? prev : { ...prev, badges: [...prev.badges, badgeId] }
      )
    },
    [update]
  )

  const setOnboardingDone = useCallback(
    (riskProfile: UserProgress['riskProfile']) => {
      update((prev) => ({ ...prev, onboardingDone: true, riskProfile }))
      persistir() // grava na hora: o usuário pode fechar o app logo depois do onboarding
    },
    [update, persistir]
  )

  const addGoal = useCallback(
    (goal: UserProgress['goals'][number]) => {
      update((prev) => ({ ...prev, goals: [...prev.goals, goal] }))
    },
    [update]
  )

  const setPerfilPessoal = useCallback(
    (perfil: UserProgress['perfilPessoal']) => {
      update((prev) => ({ ...prev, perfilPessoal: perfil }))
    },
    [update]
  )

  // Revisão espaçada. O id precisa incluir o módulo: antes era só `q-${indice}`,
  // então a pergunta 1 de Tesouro Direto e a pergunta 1 de Opções colidiam e a
  // segunda nunca entrava na lista de revisão.
  const marcarFlashcardErrado = useCallback(
    (moduloId: string, moduloTitulo: string, card: Flashcard) => {
      update((prev) => {
        const id = `${moduloId}::${card.id}`
        if (prev.itensRevisao.some((i) => i.tipo === 'flashcard' && i.id === id)) return prev
        const novoItem: ItemRevisao = { id, tipo: 'flashcard', moduloId, moduloTitulo, card }
        return { ...prev, itensRevisao: [...prev.itensRevisao, novoItem] }
      })
    },
    [update]
  )

  const marcarFlashcardAcertado = useCallback(
    (cardId: string) => {
      update((prev) => {
        const restantes = prev.itensRevisao.filter(
          (i) => !(i.tipo === 'flashcard' && (i.id === cardId || i.id.endsWith(`::${cardId}`)))
        )
        return restantes.length === prev.itensRevisao.length ? prev : { ...prev, itensRevisao: restantes }
      })
    },
    [update]
  )

  const marcarQuizErrado = useCallback(
    (moduloId: string, moduloTitulo: string, pergunta: QuizQuestion, indice: number) => {
      update((prev) => {
        const id = `${moduloId}::q${indice}`
        const jaTinha = prev.itensRevisao.some((i) => i.tipo === 'quiz' && i.id === id)
        const novoItem: ItemRevisao = { id, tipo: 'quiz', moduloId, moduloTitulo, pergunta }
        return {
          ...prev,
          itensRevisao: jaTinha ? prev.itensRevisao : [...prev.itensRevisao, novoItem],
          sequenciaAcertosAtual: 0, // erro quebra a sequência, em qualquer módulo
        }
      })
    },
    [update]
  )

  // Erro no Desafio Diário também vai para a revisão, igual ao quiz normal —
  // convertido para o formato QuizQuestion (mesmos campos, 5 alternativas em
  // vez de 4, o que QuizQuestion.alternativas já aceita por ser string[]).
  const marcarDesafioErrado = useCallback(
    (perguntaId: string, pergunta: { pergunta: string; alternativas: string[]; correta: number; explicacao: string }) => {
      update((prev) => {
        const id = `desafio-diario::${perguntaId}`
        const jaTinha = prev.itensRevisao.some((i) => i.tipo === 'quiz' && i.id === id)
        const novoItem: ItemRevisao = {
          id,
          tipo: 'quiz',
          moduloId: 'desafio-diario',
          moduloTitulo: 'Desafio Diário',
          pergunta,
        }
        return {
          ...prev,
          itensRevisao: jaTinha ? prev.itensRevisao : [...prev.itensRevisao, novoItem],
          sequenciaAcertosAtual: 0,
        }
      })
    },
    [update]
  )

  // Conquista "10 acertos seguidos": conta sequência ao longo de qualquer módulo,
  // não só dentro de um quiz — errar em qualquer lugar zera, acertar incrementa.
  const registrarAcertoQuiz = useCallback(() => {
    update((prev) => {
      const nova = prev.sequenciaAcertosAtual + 1
      return {
        ...prev,
        sequenciaAcertosAtual: nova,
        maiorSequenciaAcertos: Math.max(prev.maiorSequenciaAcertos, nova),
      }
    })
  }, [update])

  const removerItemRevisao = useCallback(
    (itemId: string, tipo: 'flashcard' | 'quiz') => {
      update((prev) => {
        const existia = prev.itensRevisao.some((i) => i.id === itemId && i.tipo === tipo)
        const restantes = prev.itensRevisao.filter((i) => !(i.id === itemId && i.tipo === tipo))
        if (restantes.length === prev.itensRevisao.length) return prev
        // "Revisado" aqui = removido da lista de pendências, ou seja, o usuário
        // resolveu o item. Conta pra conquista "Revisor Dedicado" só quando de
        // fato existia (evita contar cliques em itens que já tinham sumido).
        return {
          ...prev,
          itensRevisao: restantes,
          itensRevisadosTotal: existia ? prev.itensRevisadosTotal + 1 : prev.itensRevisadosTotal,
        }
      })
    },
    [update]
  )

  // Conquista "Leitor Voraz": abrir 3 resumos de livros diferentes na Biblioteca.
  const registrarLivroAberto = useCallback(
    (livroId: string) => {
      update((prev) =>
        prev.livrosAbertos.includes(livroId)
          ? prev
          : { ...prev, livrosAbertos: [...prev.livrosAbertos, livroId] }
      )
    },
    [update]
  )

  // Conquista "Calculista": usar 3 calculadoras diferentes em Ferramentas.
  const registrarCalculadoraUsada = useCallback(
    (calculadoraId: string) => {
      update((prev) =>
        prev.calculadorasUsadas.includes(calculadoraId)
          ? prev
          : { ...prev, calculadorasUsadas: [...prev.calculadorasUsadas, calculadoraId] }
      )
    },
    [update]
  )

  // Conquista "Explorador de Carteiras": ver os 3 perfis (conservador/moderado/agressivo).
  const registrarPerfilCarteiraVisto = useCallback(
    (perfilId: string) => {
      update((prev) =>
        prev.perfisCarteiraVistos.includes(perfilId)
          ? prev
          : { ...prev, perfisCarteiraVistos: [...prev.perfisCarteiraVistos, perfilId] }
      )
    },
    [update]
  )

  // Conquista "Desafiante": completar o desafio diário pela primeira vez.
  // Grava a data para travar um desafio por dia (libera de novo à meia-noite),
  // e marca os números das perguntas usadas para o sorteio não repetir nenhuma
  // até o banco inteiro se esgotar — nesse ponto, reinicia o controle.
  const registrarDesafioCompleto = useCallback(
    (numerosUsados: number[], totalNoBanco: number) => {
      const hoje = new Date().toISOString().slice(0, 10)
      update((prev) => {
        const usadasAcumuladas = [...new Set([...prev.perguntasDesafioUsadas, ...numerosUsados])]
        // Banco esgotado: todas as perguntas já apareceram pelo menos uma vez.
        // Reinicia o controle para o próximo desafio voltar a sortear livremente.
        const usadasFinal = usadasAcumuladas.length >= totalNoBanco ? [] : usadasAcumuladas
        return {
          ...prev,
          desafiosCompletos: prev.desafiosCompletos + 1,
          ultimoDesafioData: hoje,
          perguntasDesafioUsadas: usadasFinal,
        }
      })
    },
    [update]
  )

  // Sorteia N perguntas do banco sem repetir nenhuma que já tenha caído em
  // desafios anteriores (controlado por perguntasDesafioUsadas). Se o banco
  // não tiver perguntas "novas" suficientes para completar N, completa com
  // perguntas já usadas antes (evita travar o desafio por falta de conteúdo).
  const sortearPerguntasDesafio = useCallback(
    (banco: PerguntaDesafio[], quantidade: number): PerguntaDesafio[] => {
      const usadas = new Set(progress.perguntasDesafioUsadas)
      const naoUsadas = banco.filter((p) => !usadas.has(p.numero))
      const jaUsadas = banco.filter((p) => usadas.has(p.numero))

      function embaralhar<T>(arr: T[]): T[] {
        const copia = [...arr]
        for (let i = copia.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[copia[i], copia[j]] = [copia[j], copia[i]]
        }
        return copia
      }

      const embaralhadasNovas = embaralhar(naoUsadas)
      if (embaralhadasNovas.length >= quantidade) {
        return embaralhadasNovas.slice(0, quantidade)
      }
      // Não há perguntas "novas" suficientes — completa com já usadas, embaralhadas.
      const faltam = quantidade - embaralhadasNovas.length
      return [...embaralhadasNovas, ...embaralhar(jaUsadas).slice(0, faltam)]
    },
    [progress.perguntasDesafioUsadas]
  )

  const resetProgress = useCallback(() => {
    update(() => defaultProgress())
    persistir()
  }, [update, persistir])

  const levelInfo = getLevelInfo(progress.xp)

  return {
    progress,
    levelInfo,
    ganharXp,
    perderXp,
    concluirAba,
    isModuloCompleto,
    recordQuizScore,
    toggleWatchlist,
    unlockBadge,
    setOnboardingDone,
    addGoal,
    setPerfilPessoal,
    marcarFlashcardErrado,
    marcarFlashcardAcertado,
    marcarQuizErrado,
    marcarDesafioErrado,
    registrarAcertoQuiz,
    registrarLivroAberto,
    registrarCalculadoraUsada,
    registrarPerfilCarteiraVisto,
    registrarDesafioCompleto,
    sortearPerguntasDesafio,
    removerItemRevisao,
    resetProgress,
  }
}

export type ProgressStore = ReturnType<typeof useProgressStore>

const ProgressContext = createContext<ProgressStore | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const store = useProgressStore()
  return createElement(ProgressContext.Provider, { value: store }, children)
}

/**
 * Estado de progresso compartilhado por todo o app.
 *
 * Antes isto era um hook com `useState` próprio, e as 7 telas que o chamavam
 * ficavam cada uma com a sua cópia: ganhar XP no módulo não atualizava a Home,
 * e cada cópia sobrescrevia o localStorage com a sua versão desatualizada.
 * Agora existe uma instância só, no ProgressProvider.
 */
export function useUserProgress(): ProgressStore {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useUserProgress precisa estar dentro de <ProgressProvider>')
  return ctx
}

export { todayStr, daysBetween, getLevelInfo, calcularBonusXp }
