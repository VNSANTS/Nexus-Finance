import type { UserProgress } from '@/types'
import { TODAS_ABAS } from '@/types'

/**
 * "Backend" do progresso do usuário.
 *
 * Hoje o único "backend" que existe é o localStorage do navegador — não tem
 * login nem servidor ainda. Este arquivo isola isso: é o único lugar do app
 * que sabe COMO os dados são salvos. O resto do app (o hook useUserProgress
 * e todas as páginas) só conhece as duas funções abaixo, `carregarProgresso`
 * e `salvarProgresso` — nunca fala com localStorage diretamente.
 *
 * Quando o backend real (Supabase) existir, a ideia é criar
 * `src/backend/remoto/progressStore.ts` com as MESMAS duas funções, mas
 * fazendo fetch/chamada à API em vez de localStorage, e trocar só o import
 * em `src/backend/index.ts` — sem mexer no hook nem nas páginas.
 *
 * Aviso importante (pra não confundir depois): localStorage é síncrono, uma
 * API real não é. `carregarProgresso` aqui já devolve uma Promise pensando
 * nisso, mas o hook hoje ainda lê o progresso de forma síncrona no primeiro
 * render (pra não mostrar tela de carregando à toa quando é só localStorage).
 * Migrar pra um backend de verdade também vai exigir ajustar o hook pra
 * esperar essa Promise (um estado de "carregando" na abertura do app) — isso
 * ainda não foi feito, fica para quando o backend em si for criado.
 */

const STORAGE_KEY = 'nexus-finance-progress'
const STORAGE_VERSION = 2

interface DadosSalvos {
  v: number
  data: unknown
}

export function defaultProgress(): UserProgress {
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
    perfilPessoal: { nome: 'Investidor', emoji: null, cor: '#00D4FF', fotoUrl: null, fotoAjuste: null, bio: '' },
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
    preferenciasNotificacoesAprender: {
      ativas: true,
      notificacaoNavegador: false,
      vibrar: true,
      lembreteStreak: {
        ativa: true,
        horario: '19:00',
        frequencia: 'diaria',
        diasPersonalizados: [1, 2, 3, 4, 5], // seg-sex, só usado se frequencia === 'personalizada'
        apenasSeAindaNaoEstudouHoje: true,
      },
      desafioDiario: { ativa: true, horario: '08:00' },
      revisao: { ativa: true, minimoItens: 3 },
      conquistas: { ativa: true },
      moduloParado: { ativa: true, diasInatividade: 5 },
      motivacional: { ativa: true, frequencia: 'semanal' },
      estiloExibicao: 'detalhado',
      som: { ativo: true, volume: 70, estilo: 'classico' },
      naoPerturbe: { ativo: true, inicio: '22:00', fim: '08:00' },
    },
  }
}

// ---------------------------------------------------------------------------
// Persistência versionada. Sem isso, mudar o formato de UserProgress corrompe
// silenciosamente o progresso de quem já usava o app — foi exatamente o que
// aconteceu quando `completedModules` virou `abasConcluidas`.
// ---------------------------------------------------------------------------
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

function lerLocal(): UserProgress {
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
    // Blindagem da Central de Notificações do Aprender — estados salvos antes
    // desta tela existir (ou em versão antiga dela) recebem o padrão
    // automaticamente. Merge por sub-objeto (não só top-level) porque cada
    // categoria pode ter ganhado campos novos sem o usuário ter salvo de novo.
    {
      const p = base.preferenciasNotificacoesAprender
      const s = (merged.preferenciasNotificacoesAprender ?? {}) as Partial<UserProgress['preferenciasNotificacoesAprender']>
      merged.preferenciasNotificacoesAprender = {
        ...p,
        ...s,
        lembreteStreak: { ...p.lembreteStreak, ...(s.lembreteStreak ?? {}) },
        desafioDiario: { ...p.desafioDiario, ...(s.desafioDiario ?? {}) },
        revisao: { ...p.revisao, ...(s.revisao ?? {}) },
        conquistas: { ...p.conquistas, ...(s.conquistas ?? {}) },
        moduloParado: { ...p.moduloParado, ...(s.moduloParado ?? {}) },
        motivacional: { ...p.motivacional, ...(s.motivacional ?? {}) },
        som: { ...p.som, ...(s.som ?? {}) },
        naoPerturbe: { ...p.naoPerturbe, ...(s.naoPerturbe ?? {}) },
      }
    }
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

/** Lê o progresso salvo. Hoje é síncrono por baixo (localStorage), mas já expõe como Promise. */
export function carregarProgresso(): Promise<UserProgress> {
  return Promise.resolve(lerLocal())
}

/** Versão síncrona, usada só no primeiro render do hook (ver aviso no topo do arquivo). */
export function carregarProgressoSincrono(): UserProgress {
  return lerLocal()
}

/** Salva o progresso. Resolve/rejeita como uma chamada de API resolveria. */
export function salvarProgresso(data: UserProgress): Promise<void> {
  try {
    const envelope: DadosSalvos = { v: STORAGE_VERSION, data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope))
    return Promise.resolve()
  } catch (erro) {
    // modo privado / cota cheia: o app continua funcionando em memória
    return Promise.reject(erro)
  }
}
