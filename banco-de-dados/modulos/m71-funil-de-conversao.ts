import { Modulo } from '@/types'

export const funilDeConversao: Modulo = {
  id: 'funil-de-conversao',
  trilhaId: 'geracao-de-receita',
  numero: 5,
  titulo: 'Funil de Conversão: Onde o Dinheiro Vaza',
  subtitulo: 'A maioria dos negócios não tem um problema de tráfego, tem um problema de vazamento',
  iconName: 'Filter',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['icp'],
  objetivoAprendizagem: 'Você vai sair sabendo mapear as etapas do seu funil de vendas, medir a taxa de conversão de cada uma, e identificar exatamente onde o maior volume de clientes em potencial está sendo perdido.',
  erroFatal: 'Reagir a uma queda de vendas investindo mais em atrair gente nova para o topo do funil, sem antes checar se o problema real está no meio ou no fim do funil — jogar mais água num balde furado não enche o balde, só aumenta o desperdício.',
  numeroChave: { valor: '1 etapa', legenda: 'na maioria dos negócios, existe uma única etapa do funil responsável pela maior parte da perda de clientes — encontrar essa etapa vale mais que qualquer aumento de tráfego' },
  glossarioDoModulo: ['Funil de conversão', 'Taxa de conversão', 'Topo, meio e fundo de funil'],
  proximoPasso: { moduloId: 'cross-sell-up-sell-nrr', motivo: 'Depois de otimizar a entrada de clientes novos pelo funil, o próximo passo é aprender a extrair mais receita de quem já entrou e já é cliente.' },

  aprender: {
    oQueE: 'O funil de conversão é a representação das etapas que uma pessoa percorre desde o primeiro contato com a empresa até se tornar cliente pagante — e, idealmente, cliente recorrente. Cada etapa (visitante, lead, oportunidade, venda) tem uma taxa de conversão própria: a fração de pessoas que avança da etapa anterior para a seguinte. O funil existe para tornar visível, com números, onde exatamente o processo de vendas está perdendo mais gente.',
    porQueImporta: 'Quando as vendas caem, o reflexo mais comum é investir mais em tráfego — mais anúncio, mais alcance, mais gente entrando pelo topo. Mas se o problema está no meio do funil (leads que nunca viram oportunidade) ou no fundo (oportunidades que não fecham), jogar mais gente no topo só aumenta o volume de pessoas perdidas no mesmo ponto de vazamento, sem resolver a causa.',
    naPratica: 'Um funil típico tem quatro etapas: visitantes (quem chega até o produto ou site), leads (quem demonstra interesse real, deixando contato ou fazendo uma pergunta), oportunidades (quem entra em conversa ativa de vendas) e vendas (quem efetivamente compra). A taxa de conversão de cada etapa se calcula dividindo quem avançou pelo total da etapa anterior. Comparando essas taxas com benchmarks do próprio histórico ou do setor, fica claro onde está o maior gargalo — às vezes não é falta de interessados, é a demora em responder um lead, ou uma proposta confusa demais na hora de fechar.',
    passoAPasso: [
      'Defina as etapas do seu funil específico — pode ter mais ou menos de quatro etapas, dependendo do negócio.',
      'Meça o volume de pessoas em cada etapa, num período fixo (por exemplo, um mês).',
      'Calcule a taxa de conversão entre cada etapa consecutiva, dividindo quem avançou pelo total da etapa anterior.',
      'Identifique a etapa com a menor taxa de conversão relativa — geralmente é ali que está o maior potencial de melhoria.',
      'Antes de investir em mais tráfego, resolva o gargalo identificado; só depois volte a aumentar o volume que entra no topo.',
    ],
    errosComuns: [
      'Investir em mais tráfego (topo de funil) quando o gargalo real está no fundo (fechamento de venda).',
      'Medir apenas a taxa de conversão final (visitante direto para venda), sem visibilidade das etapas intermediárias, perdendo o diagnóstico de onde está o problema.',
      'Comparar a taxa de conversão do próprio negócio com benchmarks genéricos de internet sem considerar diferenças de ticket médio e complexidade de venda.',
      'Otimizar uma etapa isoladamente sem considerar o impacto nas etapas seguintes — por exemplo, gerar muito mais leads sem estrutura de atendimento para qualificá-los todos.',
    ],
    comparativo: {
      titulo: 'As quatro etapas típicas de um funil',
      linhas: [
        { label: 'Visitante → Lead', valor: 'Mede: quantos demonstram interesse real | Gargalo comum: oferta pouco clara ou irrelevante' },
        { label: 'Lead → Oportunidade', valor: 'Mede: quantos entram em conversa ativa | Gargalo comum: demora na resposta, qualificação fraca' },
        { label: 'Oportunidade → Venda', valor: 'Mede: quantos efetivamente compram | Gargalo comum: proposta confusa, objeção não resolvida' },
      ],
    },
    checklist: [
      'Mapeei as etapas específicas do meu funil.',
      'Medi o volume de pessoas em cada etapa num período fixo.',
      'Calculei a taxa de conversão entre cada etapa consecutiva.',
      'Identifiquei a etapa com a menor taxa relativa antes de investir em mais tráfego.',
    ],
    livroRelacionado: {
      livroId: 'i-will-teach-you-to-be-rich',
      textoConexao: 'Ramit Sethi defende medir sistemas antes de tentar consertá-los no escuro — o funil de conversão aplica esse princípio ao processo de vendas, tornando visível onde exatamente investir esforço.',
    },
    naoConfundirCom: [
      { moduloId: 'ltv-cac', diferenca: 'LTV/CAC mede o retorno financeiro de cada cliente já conquistado; Funil de Conversão mede a eficiência do processo que transforma visitante em cliente, etapa por etapa.' },
    ],
  },

  mapaMental: {
    label: 'Funil de Conversão',
    subtitulo: 'Onde o dinheiro vaza',
    ramos: [
      {
        id: 'etapas',
        label: 'As Etapas',
        cor: '#3B82F6',
        resumo: 'Do primeiro contato até a venda',
        filhos: [
          { label: 'Visitante', desc: 'Quem chega até o produto ou site' },
          { label: 'Lead', desc: 'Quem demonstra interesse real' },
          { label: 'Oportunidade', desc: 'Quem entra em conversa ativa de vendas' },
          { label: 'Venda', desc: 'Quem efetivamente compra' },
        ],
      },
      {
        id: 'diagnostico',
        label: 'Diagnóstico',
        cor: '#EF4444',
        resumo: 'Onde está o maior vazamento',
        filhos: [
          { label: 'Taxa de conversão por etapa', desc: 'Quem avançou dividido pelo total da etapa anterior' },
          { label: 'A etapa mais fraca', desc: 'Onde investir esforço primeiro, antes de mais tráfego' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de Funil de Conversão',
    intro: 'Vamos calcular as taxas de conversão de um funil completo e identificar o gargalo.',
    passos: [
      'Registrar o volume de cada etapa do funil.',
      'Calcular a taxa de conversão entre etapas consecutivas.',
      'Comparar as taxas para achar a etapa mais fraca.',
    ],
    exemploGuiado: 'Em um mês, uma empresa teve 1.000 visitantes, 200 leads, 40 oportunidades e 8 vendas. Taxa visitante→lead: 200/1.000 = 20%. Taxa lead→oportunidade: 40/200 = 20%. Taxa oportunidade→venda: 8/40 = 20%. Todas as taxas são iguais (20%), o que já é um dado valioso: não há um gargalo isolado, o funil perde proporcionalmente em cada etapa. Se, em vez disso, a taxa lead→oportunidade fosse de apenas 5% (só 10 de 200 leads viravam oportunidade), esse seria o ponto de maior alavancagem — resolver esse gargalo específico teria mais impacto do que dobrar o número de visitantes no topo.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais são as quatro etapas típicas de um funil de conversão?', verso: 'Visitante, lead, oportunidade e venda.' },
    { id: 'fc2', frente: 'Como se calcula a taxa de conversão entre duas etapas?', verso: 'Dividindo o número de pessoas que avançaram para a etapa seguinte pelo total da etapa anterior.' },
    { id: 'fc3', frente: 'Por que investir mais em tráfego pode não resolver uma queda de vendas?', verso: 'Porque se o gargalo está no meio ou no fim do funil, mais tráfego só aumenta o volume perdido no mesmo ponto de vazamento, sem resolver a causa.' },
    { id: 'fc4', frente: 'Qual é o primeiro passo antes de investir em aumentar o topo do funil?', verso: 'Identificar a etapa com a menor taxa de conversão relativa e resolver esse gargalo primeiro.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa teve 500 leads e 100 oportunidades em um mês. Qual é a taxa de conversão lead→oportunidade?',
      alternativas: ['5%', '10%', '20%', '50%'],
      correta: 2,
      explicacao: '100 ÷ 500 = 20%.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Uma empresa nota que a taxa de conversão oportunidade→venda é muito menor que as demais etapas do funil. Qual é a ação mais lógica?',
      alternativas: [
        'Investir mais em anúncios para trazer mais visitantes',
        'Investigar e corrigir o problema no processo de fechamento antes de aumentar o topo do funil',
        'Reduzir o preço do produto pela metade imediatamente',
        'Ignorar, já que o volume de vendas ainda é maior que zero',
      ],
      correta: 1,
      explicacao: 'Se o gargalo está no fundo do funil (fechamento), resolver isso tem mais impacto do que aumentar o volume de entrada, que só alimentaria o mesmo ponto de perda.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Meu funil tem etapas diferentes das quatro do exemplo. Isso é um problema?',
      resposta: 'Não. O modelo de quatro etapas (visitante, lead, oportunidade, venda) é um ponto de partida comum, mas o funil real de cada negócio pode ter mais ou menos etapas. O importante é medir a taxa de conversão entre cada uma delas, seja qual for a estrutura.',
    },
    {
      pergunta: 'Com que frequência devo revisar as taxas de conversão do funil?',
      resposta: 'Mensalmente é um bom ritmo para a maioria dos negócios — dá tempo suficiente para juntar volume relevante de dados, sem deixar um problema se arrastar por trimestres inteiros sem ser notado.',
    },
  ],
}
