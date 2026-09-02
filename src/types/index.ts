// Ajuste de enquadramento da foto de perfil dentro do círculo do avatar —
// salvo junto com a foto para reabrir o editor exatamente de onde parou.
export interface AjusteFoto {
  zoom: number // 1 = ajuste padrão (preenche o círculo), >1 aproxima
  deslocX: number // em % do diâmetro do círculo, -50 a 50
  deslocY: number
  rotacaoGraus: number
}

export interface PerfilPessoal {
  nome: string
  emoji: string | null
  cor: string
  // Quando fotoUrl existe, o avatar mostra a foto (recortada em círculo com
  // o ajuste salvo) no lugar do emoji/iniciais. fotoUrl é um data URL
  // (base64) — sem upload para servidor, tudo fica local no localStorage.
  fotoUrl: string | null
  fotoAjuste: AjusteFoto | null
  // Frase curta opcional que aparece embaixo do nome no perfil (ex: "Rumo à
  // independência financeira"). Campo novo — opcional para não quebrar
  // perfis salvos antes dele existir.
  bio?: string
}

// Preferências da Central de Notificações do lado "Aprender" — mesmo nível
// de granularidade que já existe na Gestão Financeira
// (gestao-financeira/types.ts), mas com categorias específicas de
// aprendizado/gamificação em vez de finanças. Ver src/lib/notificacoesAprender.ts
// para o motor que calcula, a partir destas preferências + UserProgress,
// quais notificações devem disparar.
export type EstiloSomNotificacaoAprender = 'suave' | 'classico' | 'alerta' | 'nenhum'
export type FrequenciaLembrete = 'diaria' | 'dias_uteis' | 'personalizada'

export interface PreferenciasNotificacoesAprender {
  ativas: boolean
  notificacaoNavegador: boolean
  vibrar: boolean

  // Lembrete de sequência (streak) — o principal caso de uso hoje
  lembreteStreak: {
    ativa: boolean
    horario: string // "HH:MM", ex: "19:00"
    frequencia: FrequenciaLembrete
    diasPersonalizados: number[] // 0=domingo..6=sábado, usado se frequencia === 'personalizada'
    // Só notifica se o usuário ainda não estudou nada hoje (evita notificação
    // redundante se a sequência do dia já foi garantida)
    apenasSeAindaNaoEstudouHoje: boolean
  }

  // Novo desafio diário disponível
  desafioDiario: { ativa: boolean; horario: string }

  // Lembretes de revisão espaçada (spaced repetition) vencendo
  revisao: { ativa: boolean; minimoItens: number } // só notifica se houver >= N itens vencidos

  // Badges e conquistas desbloqueadas
  conquistas: { ativa: boolean }

  // Sugestão de conteúdo baseada em progresso parado (ex: módulo iniciado e
  // não terminado há X dias)
  moduloParado: { ativa: boolean; diasInatividade: number }

  // Motivacional (frases aleatórias do banco frasesMotivadoras, cadência)
  motivacional: { ativa: boolean; frequencia: 'diaria' | 'semanal' }

  estiloExibicao: 'compacto' | 'detalhado'
  som: { ativo: boolean; volume: number; estilo: EstiloSomNotificacaoAprender }

  // Não perturbe: silencia tudo num intervalo (ex: 22h-8h)
  naoPerturbe: { ativo: boolean; inicio: string; fim: string }
}

export interface UserProgress {
  xp: number
  level: number
  levelName: string
  streak: number
  lastActiveDate: string | null
  activeDates: string[]
  abasConcluidas: Record<string, string[]> // moduloId -> array de nomes de aba concluídas
  quizScores: Record<string, number>
  badges: string[]
  watchlist: string[]
  goals: Goal[]
  onboardingDone: boolean
  riskProfile: 'conservador' | 'moderado' | 'agressivo' | null
  itensRevisao: ItemRevisao[]
  perfilPessoal: PerfilPessoal
  // Fallback em defaultProgress()/progressStore.ts — estados salvos antes
  // desta tela existir recebem o padrão automaticamente.
  preferenciasNotificacoesAprender: PreferenciasNotificacoesAprender
  historicoXpRecente: { xp: number; timestamp: number }[] // usado para anti-grinding

  // --- Rastreamento real para conquistas (antes ficavam fixas em 0) ---
  sequenciaAcertosAtual: number // zera a cada erro de quiz, em qualquer módulo
  maiorSequenciaAcertos: number // maior valor que sequenciaAcertosAtual já atingiu
  livrosAbertos: string[] // ids de livros abertos na Biblioteca, sem repetição
  calculadorasUsadas: string[] // ids de calculadoras abertas em Ferramentas, sem repetição
  perfisCarteiraVistos: string[] // 'conservador' | 'moderado' | 'agressivo' já vistos, sem repetição
  desafiosCompletos: number // total de desafios diários concluídos
  ultimoDesafioData: string | null // 'YYYY-MM-DD' do último desafio feito, para liberar de novo só no dia seguinte
  perguntasDesafioUsadas: number[] // números (de PerguntaDesafio.numero) já sorteados — evita repetir até esgotar o banco
  itensRevisadosTotal: number // contador cumulativo — nunca decresce, ao contrário de itensRevisao.length
}

export interface ItemRevisao {
  id: string
  tipo: 'flashcard' | 'quiz'
  moduloId: string
  moduloTitulo: string
  card?: Flashcard
  pergunta?: QuizQuestion
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string | null
  createdAt: string
}

export interface Trilha {
  id: string
  numero: number
  nome: string
  descricao: string
  iconName: string
  cor: string
  moduloIds: string[]
}

// As 6 abas de conteúdo de um módulo (Casos Reais foi removida do escopo)
export type NomeAba = 'Aprender' | 'Mapa Mental' | 'Simulação' | 'Resumo' | 'Teste' | 'FAQ'
export const TODAS_ABAS: NomeAba[] = ['Aprender', 'Mapa Mental', 'Simulação', 'Resumo', 'Teste', 'FAQ']
export const ABAS_MARCAVEIS: NomeAba[] = ['Aprender', 'Mapa Mental', 'Simulação', 'Resumo', 'FAQ'] // Teste exige quiz de verdade
export const XP_POR_ABA = Math.round(100 / TODAS_ABAS.length)

export const CORES_NIVEL: Record<NonNullable<Modulo['nivel']>, string> = {
  iniciante: '#22C55E',
  intermediario: '#FFC93C',
  avancado: '#EC4899',
}
export const LABELS_NIVEL: Record<NonNullable<Modulo['nivel']>, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export interface Modulo {
  id: string
  trilhaId: string
  numero: number
  titulo: string
  subtitulo: string
  iconName: string
  duracaoMin: number

  // --- Melhorias do blueprint (todas opcionais, retrocompatíveis) ---
  nivel?: 'iniciante' | 'intermediario' | 'avancado' // chip colorido no card do módulo
  preRequisitos?: string[] // ids de outros módulos recomendados antes deste
  objetivoAprendizagem?: string // frase de ação, aparece em itálico ciano no topo da aba Aprender
  erroFatal?: string // o único erro que faz a pessoa perder dinheiro de verdade — card vermelho destacado
  numeroChave?: { valor: string; legenda: string } // número grande logo abaixo de "Por que importa"
  glossarioDoModulo?: string[] // termos que este módulo alimenta no Glossário
  proximoPasso?: { moduloId: string; motivo: string } // sugestão de continuidade no fim da aba FAQ

  aprender: {
    oQueE: string
    porQueImporta: string
    naPratica: string
    passoAPasso: string[]
    errosComuns: string[]
    comparativo?: { titulo: string; linhas: { label: string; valor: string }[] }
    checklist: string[]
    livroRelacionado?: { livroId: string; textoConexao: string }
    naoConfundirCom?: { moduloId: string; diferenca: string }[] // bloco curto delimitando fronteira com módulos vizinhos
  }
  mapaMental: MindMapNode
  simulacao: {
    calculadoraRelacionada: string | null // null quando o módulo usa Cenário Guiado em vez de calculadora
    intro: string
    passos: string[]
    exemploGuiado: string
    cenarioGuiado?: { pergunta: string; opcoes: { texto: string; resultado: string }[] }[] // usado quando calculadoraRelacionada é null
  }
  flashcards: Flashcard[]
  quiz: QuizQuestion[]
  faq: { pergunta: string; resposta: string }[]
}

// Mapa mental: ramo -> filho -> netos (opcional). Filho aceita string simples (formato original,
// 2 níveis) ou objeto com desc/netos (formato do blueprint, até 3 níveis) — ambos convivem.
export type MindMapFilho = string | { label: string; desc?: string; netos?: { label: string; desc: string }[] }

export interface MindMapNode {
  label: string
  subtitulo?: string
  ramos: { id: string; label: string; cor: string; resumo?: string; filhos: MindMapFilho[] }[]
}

export interface Flashcard {
  id: string
  frente: string
  verso: string
}

export type DificuldadeQuiz = 'facil' | 'medio' | 'dificil' | 'hard'

// XP ganho ao acertar / perdido ao errar, por dificuldade da pergunta.
// Perguntas sem `dificuldade` definida caem em 'medio' (ver XP_POR_DIFICULDADE).
export const XP_POR_DIFICULDADE: Record<DificuldadeQuiz, number> = {
  facil: 3,
  medio: 8,
  dificil: 20,
  hard: 35,
}

export interface QuizQuestion {
  pergunta: string
  alternativas: string[]
  correta: number
  explicacao: string
  dificuldade?: DificuldadeQuiz // padrão: 'medio' quando ausente
}

// XP fixo do Desafio Diário — bem mais alto e mais arriscado que o quiz normal
// dos módulos, de propósito: são perguntas difíceis, 5 alternativas, sem
// segunda chance ao errar.
export const XP_DESAFIO_ACERTO = 100
export const XP_DESAFIO_ERRO = -50

// Banco de perguntas do Desafio Diário — separado do quiz normal dos módulos.
// 5 alternativas, mais difíceis, sem segunda tentativa: errar manda direto
// para a revisão e passa para a próxima pergunta. Vinícius alimenta este banco
// manualmente, em lotes semanais, por isso cada pergunta carrega um id estável
// (não repete de uma semana para outra).
export interface PerguntaDesafio {
  numero: number // sequencial, único — identifica a pergunta no banco e no controle de "já usada"
  pergunta: string
  alternativas: [string, string, string, string, string]
  correta: number
  explicacao: string
}

export interface Badge {
  id: string
  nome: string
  descricao: string
  iconName: string
  cor: string
  condicao: (stats: BadgeStats) => boolean
}

export interface BadgeStats {
  modulosCompletos: number
  streak: number
  maiorSequenciaAcertos: number
  trilhasCompletas: number
  itensRevisados: number
  livrosAbertos: number
  nivel: number
  calculadorasUsadas: number
  perfisCarteiraVistos: number
  desafiosCompletos: number
  xp: number
}

export interface Livro {
  id: string
  titulo: string
  autor: string
  cor: string
  paraQuem: string
  ideias: string[]
  resumoCompleto: { secao: string; texto: string; lista?: string[]; fechamento?: string }[]
  categoria: 'educacao-financeira' | 'vendas-persuasao'
}

export interface GlossarioTermo {
  termo: string
  def: string
  modulo?: string
}

export interface PerfilCarteira {
  nome: string
  cor: string
  descricao: string
  alocacao: { classe: string; pct: number; cor: string }[]
  retornoMensalEstimado: number
}

