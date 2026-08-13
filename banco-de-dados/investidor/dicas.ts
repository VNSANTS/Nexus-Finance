export interface Tese {
  titulo: string
  ideia: string
  porque: string
  riscos: string
  indicadores: string
}

export interface DicaClasse {
  id: string
  nome: string
  iconName: string
  cor: string
  teses?: Tese[]
  texto?: string
}

export const DICAS_POR_CLASSE: DicaClasse[] = [
  {
    id: 'acoes',
    nome: 'Ações',
    iconName: 'BarChart3',
    cor: '#EC4899',
    teses: [
      {
        titulo: 'Bancos descontados vs. histórico',
        ideia: 'Grandes bancos negociando abaixo da média histórica de P/VP, com ROE ainda saudável.',
        porque: 'Ciclo de juros elevado pressionou o setor, mas a lucratividade estrutural segue forte.',
        riscos: 'Inadimplência pode subir se o desemprego piorar; regulação bancária pode mudar.',
        indicadores: 'P/VP, ROE, inadimplência trimestral',
      },
      {
        titulo: 'Elétricas e o ciclo de juros',
        ideia: 'Empresas de energia com contratos de longo prazo tendem a se beneficiar quando os juros começam a cair.',
        porque: 'Fluxo de caixa previsível fica mais atrativo frente a juros menores.',
        riscos: 'Mudanças regulatórias no setor elétrico; risco hidrológico.',
        indicadores: 'Dividend yield, alavancagem, duration dos contratos',
      },
      {
        titulo: 'Exportadoras e o dólar',
        ideia: 'Empresas com receita em dólar se beneficiam de um câmbio mais depreciado.',
        porque: 'Custos em real, receita em dólar — margem se expande com desvalorização cambial.',
        riscos: 'Reversão do câmbio; preços de commodities no mercado internacional.',
        indicadores: '% de receita em dólar, margem EBITDA, preço da commodity',
      },
    ],
  },
  {
    id: 'fiis',
    nome: 'Fundos Imobiliários',
    iconName: 'Building',
    cor: '#FFC93C',
    texto:
      'Radar de FIIs: tijolo (imóveis físicos) vs. papel (recebíveis/CRIs). Vale comparar o preço atual com o valor patrimonial — descontos grandes podem ser oportunidade, mas exigem entender por que o mercado está descontando. Yields acima da média do IFIX merecem checar a taxa de vacância antes de decidir.',
  },
  {
    id: 'renda-fixa',
    nome: 'Renda Fixa',
    iconName: 'ShieldCheck',
    cor: '#22C55E',
    texto:
      'Mapa de oportunidades por prazo: Tesouro IPCA+ com vencimentos 2029, 2035 e 2045 para diferentes horizontes; CDBs comparados sempre pelo % do CDI oferecido; LCIs e LCAs isentas de IR podem valer mais que CDBs tributados mesmo com taxa nominal menor; debêntures incentivadas também são isentas, mas exigem atenção ao risco de crédito da empresa emissora.',
  },
  {
    id: 'internacional',
    nome: 'Internacional',
    iconName: 'Plane',
    cor: '#3B82F6',
    texto:
      'BDRs permitem investir em empresas estrangeiras direto na B3, sem precisar abrir conta no exterior. ETFs globais como IVVB11 (S&P 500) e WRLD11 (mercado global) são portas de entrada simples para diversificação internacional. Dolarizar parte da carteira é uma forma de proteção contra desvalorização do real — não precisa ser tudo de uma vez.',
  },
  {
    id: 'cripto',
    nome: 'Cripto',
    iconName: 'Bitcoin',
    cor: '#8B5CF6',
    texto:
      'Bitcoin e Ethereum como uma fatia pequena da carteira (geralmente sugerido entre 5-10% para perfis mais arrojados), nunca como posição principal. Os ciclos de halving do Bitcoin historicamente antecedem períodos de alta, mas isso não é garantia. Cuidados de custódia são essenciais: prefira exchanges regulamentadas e considere carteiras próprias para valores maiores.',
  },
]

export interface CarteiraRecomendada {
  id: string
  nome: string
  cor: string
  foco: string
  alocacao: { classe: string; pct: number; cor: string }[]
  perfil: string
}

export const CARTEIRAS_RECOMENDADAS: CarteiraRecomendada[] = [
  {
    id: 'valorizacao',
    nome: 'Carteira Valorização',
    cor: '#EC4899',
    foco: 'Crescimento de longo prazo',
    alocacao: [
      { classe: 'Ações', pct: 45, cor: '#EC4899' },
      { classe: 'Small Caps', pct: 20, cor: '#FFC93C' },
      { classe: 'Internacional', pct: 25, cor: '#3B82F6' },
      { classe: 'Renda Fixa', pct: 10, cor: '#22C55E' },
    ],
    perfil: 'Agressivo',
  },
  {
    id: 'dividendos',
    nome: 'Carteira Dividendos',
    cor: '#FFC93C',
    foco: 'Renda mensal recorrente',
    alocacao: [
      { classe: 'Ações pagadoras', pct: 50, cor: '#EC4899' },
      { classe: 'FIIs', pct: 40, cor: '#FFC93C' },
      { classe: 'Renda Fixa', pct: 10, cor: '#22C55E' },
    ],
    perfil: 'Moderado',
  },
  {
    id: 'renda-passiva',
    nome: 'Carteira Renda Passiva',
    cor: '#22C55E',
    foco: 'Viver de renda com previsibilidade',
    alocacao: [
      { classe: 'Renda Fixa', pct: 55, cor: '#22C55E' },
      { classe: 'FIIs', pct: 25, cor: '#FFC93C' },
      { classe: 'Ações pagadoras', pct: 20, cor: '#EC4899' },
    ],
    perfil: 'Conservador',
  },
  {
    id: 'global',
    nome: 'Carteira Global',
    cor: '#3B82F6',
    foco: 'Exposição internacional e proteção cambial',
    alocacao: [
      { classe: 'Internacional', pct: 50, cor: '#3B82F6' },
      { classe: 'Ações Brasil', pct: 25, cor: '#EC4899' },
      { classe: 'Renda Fixa', pct: 15, cor: '#22C55E' },
      { classe: 'Cripto', pct: 10, cor: '#8B5CF6' },
    ],
    perfil: 'Moderado a Agressivo',
  },
]

export const RELATORIO_SEMANA = {
  moveu:
    'O Ibovespa oscilou acompanhando sinais do Copom sobre o ritmo de cortes de juros, enquanto o dólar recuou com dados mais fracos de inflação nos EUA. Bancos e elétricas lideraram os ganhos.',
  proximaSemana:
    'Atenção à divulgação do IPCA e aos balanços do setor de varejo, que podem sinalizar a força do consumo das famílias no trimestre.',
  teseDestaque: 'Elétricas com contratos de longo prazo seguem atrativas conforme o mercado precifica cortes de juros mais à frente.',
  conceito: {
    termo: 'Duration',
    explicacao:
      'Mede o tempo médio ponderado para receber o retorno de um investimento — quanto maior a duration, mais sensível o ativo é a mudanças na taxa de juros.',
  },
}
