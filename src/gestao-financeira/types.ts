// Tipos do domínio "Gestão Financeira" — um app dentro do app, com estado
// próprio (localStorage separado) e nenhuma dependência do progresso de
// aprendizado (useUserProgress). Isso é intencional: o Vinícius definiu que
// essa área não deve ter conexão com o restante do Nexus Finance.

export type TipoConta = 'corrente' | 'poupanca' | 'carteira' | 'dinheiro' | 'digital' | 'investimento' | 'outra'

export interface Conta {
  id: string
  nome: string
  tipo: TipoConta
  saldoInicial: number
  moeda: string
  icone: string
  cor: string
  principal: boolean
  arquivada: boolean
  criadaEm: string
}

export type TipoCartao = 'credito' | 'debito' | 'multiplo'

export interface Cartao {
  id: string
  nome: string
  banco: string
  tipo: TipoCartao
  limite: number
  diaFechamento: number
  diaVencimento: number
  cor: string
  icone: string
  arquivado: boolean
  criadoEm: string
}

export type FormaPagamento = 'dinheiro' | 'pix' | 'debito' | 'credito' | 'transferencia' | 'boleto' | 'carteira-digital' | 'outro'

export type TipoTransacao = 'receita' | 'despesa' | 'transferencia'

export type NaturezaGasto = 'fixo' | 'variavel'
export type EssencialidadeGasto = 'necessidade' | 'desejo'

export interface Categoria {
  id: string
  nome: string
  tipo: 'receita' | 'despesa'
  icone: string
  cor: string
  categoriaPaiId: string | null
  padrao: boolean
  // Classificação opcional, usada nos relatórios "Fixos x Variáveis" e
  // "Necessidades x Desejos". Categorias sem valor definido (ex.: criadas
  // pelo usuário antes desses campos existirem) caem num padrão razoável
  // na hora de agrupar — ver relatorios.ts.
  natureza?: NaturezaGasto
  essencialidade?: EssencialidadeGasto
}

export interface Transacao {
  id: string
  tipo: TipoTransacao
  valor: number
  data: string // YYYY-MM-DD
  hora: string // HH:MM
  descricao: string
  categoriaId: string | null
  contaId: string | null
  cartaoId: string | null
  formaPagamento: FormaPagamento
  pago: boolean
  criadaEm: string
  // Quem lançou, quando Família e perfis tem mais de um membro. Opcional e
  // sem valor padrão retroativo — lançamentos antigos ficam sem dono e
  // continuam aparecendo normalmente em todo o app.
  membroId?: string | null
}

export interface Divida {
  id: string
  nome: string
  valorTotal: number
  valorPago: number
  vencimento: string | null
  contaId: string | null
  parcelas: number | null
  parcelaAtual: number | null
  quitada: boolean
  criadaEm: string
}

export interface Meta {
  id: string
  nome: string
  valorObjetivo: number
  valorAtual: number
  prazo: string | null
  icone: string
  cor: string
  prioridade: 'baixa' | 'media' | 'alta'
  pausada: boolean
  arquivada: boolean
  criadaEm: string
  // Foto opcional (ex.: foto do carro, do destino da viagem) — guardada como
  // data URL já comprimida no próprio navegador. Quando ausente, a tela usa
  // o ícone normalmente.
  fotoUrl?: string | null
}

export interface OrcamentoCategoria {
  categoriaId: string
  limite: number
}

// Idiomas suportados na interface da Gestão Financeira. Hoje só pt-BR tem
// tradução completa — en-US existe na estrutura (types + seletor na tela)
// como preparação, mas a tradução de fato do app é trabalho à parte (ver
// PROXIMA_SESSAO.md).
export type Idioma = 'pt-BR' | 'en-US'

// Preferências avançadas da Central de Notificações — cobre a seção
// "4. Notificações" do documento de projeto: cada categoria pode ser
// ativada/desativada e configurada individualmente (limiar, antecedência),
// além de opções de estilo de exibição e som que valem pra central toda.
export type EstiloExibicaoNotificacao = 'compacto' | 'detalhado'
export type AgruparNotificacoesPor = 'prioridade' | 'categoria' | 'status'
export type EstiloSomNotificacao = 'suave' | 'classico' | 'alerta'

export interface PreferenciasNotificacoes {
  ativas: boolean
  notificacaoNavegador: boolean
  vibrar: boolean
  dividas: { ativa: boolean; diasAntecedencia: number }
  orcamento: { ativa: boolean; percentualAlerta: number }
  metas: { ativa: boolean; diasAntecedencia: number }
  insights: { ativa: boolean; boasNoticias: boolean; pontosAtencao: boolean }
  estiloExibicao: EstiloExibicaoNotificacao
  agruparPor: AgruparNotificacoesPor
  ocultarValores: boolean
  som: { ativo: boolean; volume: number; estilo: EstiloSomNotificacao }
}

// Preferências da tela "Privacidade" (menu Mais). Escopo deliberadamente
// restrito ao que dá pra controlar de fato dentro do app hoje — ocultar
// valores e um bloqueio visual ao trocar de app. PIN/biometria fica pra
// tela "Segurança" (ainda não construída) e exportar/apagar dados fica
// fora daqui por decisão do Vinícius (não é "backup"), tratado como ação
// direta (limparTodosDados), não como preferência persistida.
export interface PreferenciasPrivacidade {
  ocultarValoresAoAbrir: boolean
  ocultarAoTrocarDeApp: boolean
  // Controle de verdade dentro do app pras permissões usadas — mesmo as
  // que tecnicamente também dá pra mudar no navegador (notificação,
  // vibração), aqui vira a fonte única que o app inteiro respeita.
  permitirFotoMetas: boolean
}

// Família e perfis (menu Mais → Família e perfis). Como a Gestão Financeira
// inteira é local (sem servidor, sem conta na nuvem — ver comentário no topo
// deste arquivo), "família" aqui não é multiusuário de verdade: é um jeito
// de várias pessoas que usam o MESMO aparelho/app organizarem quem lançou o
// quê e limitarem o que cada uma pode fazer nesse dispositivo. Não é uma
// trava de segurança (não tem senha por perfil) — é organização e permissão
// "de boa-fé", como uma etiqueta de nome numa geladeira compartilhada.
export type PapelMembro = 'administrador' | 'adulto' | 'jovem' | 'visualizador'

export interface PermissoesMembro {
  lancar: boolean // criar novos lançamentos
  editar: boolean // editar lançamentos, contas, cartões, dívidas e metas já existentes
  excluir: boolean // excluir lançamentos, contas, cartões, dívidas e metas
  verSaldos: boolean // ver valores (se falso, a tela de Privacidade oculta os valores pra esse perfil)
  gerenciarMembros: boolean // adicionar, editar e remover outros membros da família
}

export interface Membro {
  id: string
  nome: string
  emoji: string | null
  cor: string
  papel: PapelMembro
  permissoes: PermissoesMembro
  criadoEm: string
  // O primeiro membro, criado automaticamente com o app (o "dono" do
  // aparelho). Não pode ser excluído — precisa sempre sobrar pelo menos
  // um jeito de administrar a família.
  principal: boolean
}

export interface GestaoFinanceiraState {
  versao: number
  contas: Conta[]
  cartoes: Cartao[]
  categorias: Categoria[]
  transacoes: Transacao[]
  dividas: Divida[]
  metas: Meta[]
  orcamentos: OrcamentoCategoria[]
  metaEconomiaMensal: number
  primeiroAcessoFeito: boolean
  moedaPadrao: string
  notificacoesLidas: string[]
  // Configurações financeiras (tela "Configurações gerais"). Todas com
  // fallback no reducer/estadoInicial — usuários com estado salvo antes
  // dessa mudança recebem os valores padrão sem quebrar nada.
  idioma: Idioma
  formatoValor: 'simbolo-antes' | 'simbolo-depois' | 'codigo-antes'
  casasDecimais: number
  separadorDecimal: ',' | '.'
  separadorMilhares: '.' | ',' | ' ' | 'nenhum'
  primeiroDiaMesFinanceiro: number // 1–28, dia do mês em que o "mês financeiro" começa
  semanaComecaEm: 'domingo' | 'segunda'
  formatoData: 'DD/MM/AAAA' | 'MM/DD/AAAA' | 'AAAA-MM-DD'
  // Fallback no reducer/estadoInicial — estados salvos antes dessa tela
  // recebem o padrão sem quebrar (mesmo padrão já usado nas outras configs).
  preferenciasNotificacoes: PreferenciasNotificacoes
  preferenciasPrivacidade: PreferenciasPrivacidade
  // Fallback no reducer/estadoInicial — estados salvos antes desta tela
  // existir recebem um membro "Eu" (administrador) automaticamente.
  membros: Membro[]
  membroAtivoId: string | null
}
