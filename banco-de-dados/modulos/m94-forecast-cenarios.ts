import { Modulo } from '@/types'

export const forecastCenarios: Modulo = {
  id: 'forecast-cenarios',
  trilhaId: 'gestao-financeira-negocios',
  numero: 7,
  titulo: 'Forecast em Cenários',
  subtitulo: 'Uma única previsão é uma aposta; três cenários são um plano',
  iconName: 'GitBranch',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['roic-vs-wacc'],
  objetivoAprendizagem: 'Você vai sair sabendo construir uma projeção financeira com múltiplos cenários (otimista, base e pessimista), em vez de uma única previsão pontual.',
  erroFatal: 'Projetar o futuro financeiro da empresa com uma única linha de previsão otimista, sem considerar o que acontece se as vendas vierem abaixo do esperado — decisões de contratação, investimento e endividamento tomadas com base numa única previsão otimista quebram empresas quando a realidade fica abaixo do projetado.',
  numeroChave: { valor: '3 cenários', legenda: 'um forecast financeiro maduro sempre projeta pelo menos três cenários — pessimista, base (mais provável) e otimista — em vez de uma única linha de previsão' },
  glossarioDoModulo: ['Forecast', 'Cenário base', 'Análise de sensibilidade'],
  proximoPasso: undefined,

  aprender: {
    oQueE: 'Forecast em Cenários é a prática de projetar o futuro financeiro de uma empresa (receita, custos, caixa) construindo, no mínimo, três versões diferentes: um cenário pessimista (o que acontece se as coisas derem errado, com premissas conservadoras), um cenário base (a projeção mais provável, com premissas realistas) e um cenário otimista (o que acontece se as coisas derem certo, acima do esperado). Em vez de apostar tudo numa única linha de previsão, o forecast em cenários prepara a empresa para múltiplos futuros possíveis.',
    porQueImporta: 'Uma única previsão, por mais bem feita que seja, carrega uma ilusão perigosa de certeza — decisões de contratação, expansão ou endividamento tomadas com base nela assumem, implicitamente, que o futuro vai se comportar exatamente como projetado. Na prática, isso raramente acontece: vendas variam, custos sobem de forma inesperada, prazos de recebimento se alongam em crises. Preparar cenários múltiplos, principalmente o pessimista, revela com antecedência se a empresa sobreviveria a um cenário pior do que o esperado, e o que precisaria mudar para isso.',
    naPratica: 'Para construir o cenário base, use as premissas mais realistas disponíveis: crescimento histórico de vendas, custos conhecidos, prazos médios já observados. Para o cenário pessimista, reduza as premissas de receita (por exemplo, vendas 15-20% abaixo do esperado) e aumente as de custo (por exemplo, inflação de insumos acima do previsto), simulando um ambiente adverso plausível, não catastrófico e improvável demais para ser útil. Para o cenário otimista, aumente as premissas de receita e mantenha os custos controlados, simulando uma execução acima do esperado. O objetivo não é acertar qual cenário vai acontecer, mas garantir que a empresa tenha um plano de ação para qualquer um dos três.',
    passoAPasso: [
      'Construa o cenário base com as premissas mais realistas disponíveis sobre receita, custo e prazo.',
      'Construa o cenário pessimista reduzindo a receita esperada e aumentando os custos esperados, de forma plausível.',
      'Construa o cenário otimista aumentando a receita esperada, mantendo disciplina sobre os custos.',
      'Para o cenário pessimista, identifique especificamente o que a empresa precisaria fazer (cortar custo, buscar crédito, atrasar investimento) para sobreviver a ele.',
      'Revise os cenários periodicamente conforme dados reais chegam, ajustando as premissas dos três.',
    ],
    errosComuns: [
      'Construir só um cenário (geralmente otimista) e tomar decisões importantes de contratação ou investimento baseadas só nele.',
      'Fazer o cenário pessimista tão extremo e improvável que ele se torna inútil para planejamento real, ou tão suave que não representa risco de verdade.',
      'Nunca revisar os cenários depois de construídos, tratando-os como um exercício único em vez de um processo vivo.',
      'Confundir cenário pessimista com "cenário de crise total" — o objetivo é simular um ambiente adverso plausível, não um colapso extremo e raro.',
    ],
    checklist: [
      'Construí pelo menos três cenários: pessimista, base e otimista.',
      'O cenário pessimista é plausível e adverso, sem ser catastrófico e improvável demais.',
      'Para o cenário pessimista, identifiquei ações concretas que a empresa tomaria para sobreviver a ele.',
      'Tenho um plano para revisar os três cenários periodicamente, conforme dados reais chegam.',
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman mostra como o excesso de confiança em uma única previsão é um viés cognitivo comum e caro — o forecast em múltiplos cenários é uma defesa estrutural contra esse viés, forçando a considerar explicitamente que o futuro é incerto.',
    },
  },

  mapaMental: {
    label: 'Forecast em Cenários',
    subtitulo: 'Três futuros possíveis, não um só',
    ramos: [
      {
        id: 'pessimista',
        label: 'Cenário Pessimista',
        cor: '#EF4444',
        resumo: 'O que acontece se der errado',
        filhos: [
          { label: 'Receita abaixo do esperado', desc: 'Custos acima do previsto' },
          { label: 'Plano de ação definido', desc: 'O que fazer se esse cenário se concretizar' },
        ],
      },
      {
        id: 'base',
        label: 'Cenário Base',
        cor: '#3B82F6',
        resumo: 'O mais provável',
        filhos: [
          { label: 'Premissas realistas', desc: 'Baseadas em dados históricos conhecidos' },
        ],
      },
      {
        id: 'otimista',
        label: 'Cenário Otimista',
        cor: '#22C55E',
        resumo: 'O que acontece se der certo',
        filhos: [
          { label: 'Receita acima do esperado', desc: 'Custos ainda sob controle' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos construir os três cenários de um forecast financeiro simples.',
    passos: [
      'Definir as premissas do cenário base.',
      'Ajustar as premissas para o cenário pessimista.',
      'Ajustar as premissas para o cenário otimista.',
      'Comparar o resultado de caixa nos três cenários.',
    ],
    exemploGuiado: 'Uma empresa projeta o próximo trimestre com receita base de R$ 300.000 e custos de R$ 240.000, resultando em R$ 60.000 de lucro esperado. No cenário pessimista, a receita cai 15% (R$ 255.000) e os custos sobem 5% por inflação de insumos (R$ 252.000), resultando em apenas R$ 3.000 de lucro — praticamente no ponto de equilíbrio. No cenário otimista, a receita sobe 15% (R$ 345.000) mantendo os custos controlados em R$ 245.000, resultando em R$ 100.000 de lucro. Ao ver o cenário pessimista tão próximo do zero, a empresa já identifica antecipadamente que precisaria adiar uma contratação planejada se as vendas vierem fracas — uma decisão que só ficou clara ao construir os três cenários, não apenas o mais otimista.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais são os três cenários mínimos de um forecast financeiro maduro?', verso: 'Pessimista, base (mais provável) e otimista.' },
    { id: 'fc2', frente: 'Por que confiar numa única previsão financeira é arriscado?', verso: 'Porque decisões importantes tomadas com base nela assumem, implicitamente, que o futuro vai se comportar exatamente como projetado — o que raramente acontece.' },
    { id: 'fc3', frente: 'Qual é o principal objetivo do cenário pessimista?', verso: 'Revelar com antecedência se a empresa sobreviveria a um cenário adverso plausível, e identificar o que precisaria mudar para isso.' },
    { id: 'fc4', frente: 'O cenário pessimista deveria ser um "colapso total" da empresa?', verso: 'Não — deveria representar um ambiente adverso plausível, nem tão suave que não representa risco real, nem tão extremo que se torna inútil para planejamento.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é o principal risco de basear decisões importantes numa única previsão financeira?',
      alternativas: [
        'Previsões únicas são sempre mais precisas que múltiplos cenários',
        'A decisão assume implicitamente que o futuro vai se comportar exatamente como projetado, o que raramente acontece',
        'Previsões únicas são proibidas por normas contábeis',
        'Não há nenhum risco real nessa prática',
      ],
      correta: 1,
      explicacao: 'Confiar numa única linha de previsão carrega uma ilusão de certeza que raramente se confirma na prática — vendas variam, custos sobem, prazos se alongam de forma imprevisível.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Qual é o propósito específico do cenário pessimista num forecast?',
      alternativas: [
        'Assustar a diretoria para reduzir gastos desnecessariamente',
        'Revelar com antecedência se a empresa sobreviveria a um ambiente adverso plausível, e o que fazer se isso acontecer',
        'Servir apenas como exercício teórico sem aplicação prática',
        'Substituir completamente o cenário base nas decisões da empresa',
      ],
      correta: 1,
      explicacao: 'O cenário pessimista existe para antecipar riscos reais e plausíveis, permitindo à empresa já ter um plano de ação definido caso a realidade venha pior do que o esperado.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Com que frequência devo revisar os três cenários?',
      resposta: 'Trimestralmente é um bom ritmo para a maioria dos negócios, ajustando as premissas conforme os dados reais do período anterior chegam. Negócios com alta volatilidade podem se beneficiar de revisões mais frequentes.',
    },
    {
      pergunta: 'Vale a pena construir mais de três cenários?',
      resposta: 'Para a maioria dos negócios, três cenários já trazem o benefício principal do método sem complexidade excessiva. Empresas maiores ou com decisões de investimento muito grandes às vezes constroem cenários adicionais (por exemplo, com diferentes premissas de câmbio ou juros), mas isso raramente é necessário para negócios pequenos e médios.',
    },
  ],
}
