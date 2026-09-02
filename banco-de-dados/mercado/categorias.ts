/**
 * ===================================================================
 * MERCADO — CATEGORIAS E NOTÍCIAS (dados mockados)
 * ===================================================================
 *
 * Todos os valores aqui são mockados — a estrutura já está pronta para
 * receber dados de APIs reais (Brapi, AwesomeAPI, BrasilAPI, CoinGecko)
 * quando essa etapa for implementada. Até lá, edite os valores à mão.
 *
 * Cada categoria de mercado (Bolsa, Dólar, Cripto, etc.) é um objeto no
 * array `CATEGORIAS_MERCADO` abaixo. Para adicionar uma categoria nova,
 * copie um bloco inteiro e cole antes do `]` final, preenchendo:
 *
 * - id: identificador único, sem espaços (ex: 'fiis')
 * - nome: nome exibido na tela (ex: 'Fundos Imobiliários')
 * - valor: o valor/índice principal mostrado (ex: 'IFIX 3.412 pts')
 * - delta: variação (ex: '+0,45%', '-1,2%', 'estável')
 * - up: true (subiu, verde), false (caiu, vermelho) ou null (estável, neutro)
 * - iconName: nome de um ícone da biblioteca lucide-react (ex: 'Building2')
 * - cor: cor em hexadecimal para o ícone/destaque
 * - noticias: lista de notícias, cada uma com titulo, fonte e tempo
 * ===================================================================
 */
export interface CategoriaMercado {
  id: string
  nome: string
  valor: string
  delta: string
  up: boolean | null
  iconName: string
  cor: string
  noticias: { titulo: string; fonte: string; tempo: string }[]
}

export const CATEGORIAS_MERCADO: CategoriaMercado[] = [
  {
    id: 'bolsa',
    nome: 'Bolsa de Valores',
    valor: '134.281 pts',
    delta: '+0,82%',
    up: true,
    iconName: 'BarChart3',
    cor: '#00D4FF',
    noticias: [
      { titulo: 'Ibovespa fecha em alta puxado por bancos e commodities', fonte: 'InfoMoney', tempo: 'há 2h' },
      { titulo: 'Petrobras anuncia novo plano de investimentos para 2027', fonte: 'Valor Econômico', tempo: 'há 4h' },
      { titulo: 'Vale sobe 3% após dados de exportação da China', fonte: 'InfoMoney', tempo: 'há 5h' },
    ],
  },
  {
    id: 'dolar',
    nome: 'Dólar',
    valor: 'R$ 5,42',
    delta: '-0,31%',
    up: false,
    iconName: 'DollarSign',
    cor: '#22C55E',
    noticias: [
      { titulo: 'Dólar recua com expectativa de corte de juros nos EUA', fonte: 'Reuters Brasil', tempo: 'há 1h' },
      { titulo: 'Banco Central intervém no câmbio pela terceira vez no mês', fonte: 'Valor Econômico', tempo: 'há 6h' },
    ],
  },
  {
    id: 'selic',
    nome: 'Juros e Inflação',
    valor: 'Selic 10,75%',
    delta: 'estável',
    up: null,
    iconName: 'Landmark',
    cor: '#FFC93C',
    noticias: [
      { titulo: 'Copom mantém Selic e sinaliza cautela para próxima reunião', fonte: 'InfoMoney', tempo: 'há 3h' },
      { titulo: 'IPCA de junho vem abaixo do esperado pelo mercado', fonte: 'Valor Econômico', tempo: 'há 1d' },
    ],
  },
  {
    id: 'cripto',
    nome: 'Criptomoedas',
    valor: 'BTC $67.230',
    delta: '+2,14%',
    up: true,
    iconName: 'Bitcoin',
    cor: '#8B5CF6',
    noticias: [
      { titulo: 'Bitcoin se aproxima de máxima histórica após fluxo de ETFs', fonte: 'CriptoFacil', tempo: 'há 30min' },
      { titulo: 'Ethereum sobe com atualização de rede', fonte: 'InfoMoney', tempo: 'há 2h' },
    ],
  },
  {
    id: 'fiis',
    nome: 'Fundos Imobiliários (FIIs)',
    valor: 'IFIX 3.412 pts',
    delta: '+0,45%',
    up: true,
    iconName: 'Building2',
    cor: '#F97316',
    noticias: [
      { titulo: 'FIIs de papel atraem investidores com IPCA+ em alta', fonte: 'InfoMoney', tempo: 'há 3h' },
      { titulo: 'Vacância de lajes corporativas cai em São Paulo', fonte: 'Valor Econômico', tempo: 'há 1d' },
    ],
  },
  {
    id: 'commodities',
    nome: 'Commodities',
    valor: 'Petróleo $82,40',
    delta: '-0,68%',
    up: false,
    iconName: 'Fuel',
    cor: '#EAB308',
    noticias: [
      { titulo: 'Minério de ferro recua com desaceleração da demanda chinesa', fonte: 'Reuters Brasil', tempo: 'há 2h' },
      { titulo: 'Preço da soja sobe com quebra de safra na Argentina', fonte: 'Valor Econômico', tempo: 'há 5h' },
      { titulo: 'Ouro se mantém perto de máxima com tensões geopolíticas', fonte: 'InfoMoney', tempo: 'há 8h' },
    ],
  },
  {
    id: 'indices-internacional',
    nome: 'Índices e Mercado Internacional',
    valor: 'S&P 500 5.634 pts',
    delta: '+0,54%',
    up: true,
    iconName: 'Globe',
    cor: '#3B82F6',
    noticias: [
      { titulo: 'Nasdaq fecha em alta puxado por techs de inteligência artificial', fonte: 'Reuters Brasil', tempo: 'há 1h' },
      { titulo: 'Bolsas europeias fecham mistas à espera de dados de inflação', fonte: 'Valor Econômico', tempo: 'há 4h' },
    ],
  },
  {
    id: 'etfs',
    nome: 'ETFs',
    valor: 'IVVB11 R$ 312,80',
    delta: '+0,61%',
    up: true,
    iconName: 'LayoutGrid',
    cor: '#06B6D4',
    noticias: [
      { titulo: 'ETFs de renda fixa batem recorde de captação no mês', fonte: 'InfoMoney', tempo: 'há 4h' },
      { titulo: 'B3 lista novo ETF de small caps americanas', fonte: 'Valor Econômico', tempo: 'há 1d' },
    ],
  },
  {
    id: 'renda-fixa-tesouro',
    nome: 'Renda Fixa / Tesouro Direto',
    valor: 'IPCA+ 2035: 6,1%',
    delta: 'estável',
    up: null,
    iconName: 'Landmark',
    cor: '#22C55E',
    noticias: [
      { titulo: 'Tesouro Direto tem recorde de novos investidores no trimestre', fonte: 'InfoMoney', tempo: 'há 6h' },
      { titulo: 'Taxas dos títulos prefixados recuam após dados de inflação', fonte: 'Valor Econômico', tempo: 'há 1d' },
    ],
  },
  {
    id: 'fundos-investimento',
    nome: 'Fundos de Investimento',
    valor: 'IHFA +0,38% no mês',
    delta: '+0,38%',
    up: true,
    iconName: 'Layers',
    cor: '#A855F7',
    noticias: [
      { titulo: 'Fundos multimercado voltam a atrair captação líquida positiva', fonte: 'Valor Econômico', tempo: 'há 5h' },
      { titulo: 'Gestoras reduzem taxa de administração para competir com ETFs', fonte: 'InfoMoney', tempo: 'há 1d' },
    ],
  },
  {
    id: 'cambio',
    nome: 'Câmbios',
    valor: 'EUR/BRL R$ 5,89',
    delta: '+0,12%',
    up: true,
    iconName: 'ArrowLeftRight',
    cor: '#EC4899',
    noticias: [
      { titulo: 'Euro sobe com expectativa de juros na zona do euro', fonte: 'Reuters Brasil', tempo: 'há 2h' },
      { titulo: 'Libra esterlina recua após dados fracos de varejo no Reino Unido', fonte: 'Valor Econômico', tempo: 'há 7h' },
    ],
  },
  {
    id: 'futuros-derivativos',
    nome: 'Futuros e Derivativos',
    valor: 'DI Jan/27: 10,85%',
    delta: '-0,05 p.p.',
    up: false,
    iconName: 'LineChart',
    cor: '#EF4444',
    noticias: [
      { titulo: 'Contratos futuros de juros recuam após ata do Copom', fonte: 'InfoMoney', tempo: 'há 3h' },
      { titulo: 'Volume de opções sobre Ibovespa cresce antes do vencimento', fonte: 'Valor Econômico', tempo: 'há 9h' },
    ],
  },
]

export const TICKER_TAPE_ITENS = [
  { label: 'IBOV', valor: '134.281', delta: '+0,82%', up: true },
  { label: 'USD', valor: '5,42', delta: '-0,31%', up: false },
  { label: 'EUR', valor: '5,89', delta: '+0,12%', up: true },
  { label: 'BTC', valor: '$67.230', delta: '+2,14%', up: true },
  { label: 'Selic', valor: '10,75%', delta: 'estável', up: null as boolean | null },
  { label: 'IFIX', valor: '3.412', delta: '+0,45%', up: true },
]

export const RANKING_ALTAS = [
  { ticker: 'CSNA3', preco: 'R$ 14,82', delta: '+5,3%' },
  { ticker: 'USIM5', preco: 'R$ 7,21', delta: '+4,1%' },
  { ticker: 'MGLU3', preco: 'R$ 2,15', delta: '+3,8%' },
  { ticker: 'BBAS3', preco: 'R$ 26,40', delta: '+2,9%' },
  { ticker: 'GGBR4', preco: 'R$ 18,63', delta: '+2,4%' },
]
export const RANKING_BAIXAS = [
  { ticker: 'AZUL4', preco: 'R$ 4,12', delta: '-4,7%' },
  { ticker: 'CVCB3', preco: 'R$ 1,89', delta: '-3,9%' },
  { ticker: 'COGN3', preco: 'R$ 2,34', delta: '-3,1%' },
  { ticker: 'PETZ3', preco: 'R$ 5,67', delta: '-2,6%' },
  { ticker: 'YDUQ3', preco: 'R$ 11,90', delta: '-2,2%' },
]

export const SETORES_HEATMAP = [
  { nome: 'Bancos', variacao: 1.8 },
  { nome: 'Commodities', variacao: -0.9 },
  { nome: 'Energia', variacao: 0.6 },
  { nome: 'Varejo', variacao: -2.3 },
  { nome: 'Tecnologia', variacao: 2.1 },
  { nome: 'Saúde', variacao: 0.2 },
  { nome: 'Industrial', variacao: -0.4 },
  { nome: 'Imobiliário', variacao: 1.1 },
  { nome: 'Telecom', variacao: -0.1 },
]

export const CALENDARIO_ECONOMICO = [
  { dia: 'Seg', evento: 'Ata do Copom', relevancia: 'alta' as const },
  { dia: 'Ter', evento: 'IPCA-15 (prévia da inflação)', relevancia: 'alta' as const },
  { dia: 'Qua', evento: 'Payroll dos EUA', relevancia: 'media' as const },
  { dia: 'Qui', evento: 'Decisão de juros do Fed', relevancia: 'alta' as const },
  { dia: 'Sex', evento: 'PIB trimestral (Brasil)', relevancia: 'media' as const },
]

export const TICKERS_DISPONIVEIS = ['PETR4', 'ITUB4', 'MXRF11', 'VALE3', 'BBAS3', 'MGLU3', 'HGLG11', 'WEGE3', 'ABEV3', 'TAEE11']
