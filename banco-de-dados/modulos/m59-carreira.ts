// m04-carreira.ts
import { Modulo } from '@/types'

export const carreira: Modulo = {
  id: 'carreira',
  trilhaId: 'carreira-negocios',
  numero: 4,
  titulo: 'Carreira',
  subtitulo: 'Por que trocar de emprego costuma render mais que esperar por um aumento interno',
  iconName: 'Briefcase',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: [],
  objetivoAprendizagem: 'Você vai sair sabendo como estruturar decisões de carreira (troca de emprego, negociação salarial, desenvolvimento de competências) com base em dados de mercado, não em suposições sobre o que "parece justo".',
  erroFatal: 'Nunca pesquisar sua faixa salarial de mercado e aceitar reajustes anuais internos como referência única de evolução — dados recorrentes do mercado de trabalho mostram que trocar de emprego costuma gerar aumentos salariais proporcionalmente maiores do que permanecer na mesma empresa esperando por reajustes internos, especialmente para profissionais com poucos anos de experiência.',
  numeroChave: { valor: '10 a 20%', legenda: 'faixa aproximada de aumento salarial real que reajustes internos anuais costumam representar, contra ganhos frequentemente superiores obtidos por profissionais que trocam de empresa negociando com base em dados de mercado' },
  glossarioDoModulo: ['Faixa salarial de mercado', 'Employer branding', 'Plano de desenvolvimento individual (PDI)', 'Mobilidade de carreira', 'Rede de contatos profissional (networking)', 'Currículo orientado a resultado'],
  proximoPasso: { moduloId: 'negociacao', motivo: 'Depois de entender como estruturar decisões de carreira com base em dados de mercado, o próximo passo natural é desenvolver as habilidades práticas de negociação para efetivamente conduzir essas conversas com sucesso.' },

  aprender: {
    oQueE: 'Carreira, do ponto de vista financeiro, é a trajetória de desenvolvimento profissional que determina diretamente sua principal fonte de renda ao longo da vida — e, para a maioria das pessoas, a alavanca de renda mais relevante para acelerar a construção de patrimônio. Gerenciar a carreira de forma estratégica significa tomar decisões informadas sobre desenvolvimento de competências, momento de troca de emprego, negociação salarial e construção de rede de contatos, em vez de deixar essas decisões acontecerem passivamente, ditadas apenas pelo que a empresa atual oferece.',
    porQueImporta: 'Profissionais que não acompanham sua faixa salarial de mercado tendem a aceitar reajustes internos como única referência de evolução, sem perceber que podem estar significativamente abaixo do que o mercado paga para a mesma função e nível de experiência. Ao longo de uma carreira de décadas, essa diferença acumulada representa um impacto relevante no patrimônio total construído, já que salário mais alto significa mais capacidade de poupança e investimento, mesmo mantendo a mesma taxa de poupança percentual.',
    naPratica: 'No mercado de trabalho brasileiro, pesquisas salariais de plataformas como Glassdoor, LinkedIn Salary e levantamentos de recrutadoras especializadas ajudam a entender a faixa de mercado para cada função, nível de senioridade e região. Reajustes internos anuais costumam ficar na faixa de 10% a 20% em termos reais (acima da inflação), enquanto profissionais que trocam de empresa, negociando com base em dados de mercado e propostas concorrentes, frequentemente conseguem ganhos salariais superiores nessa transição, especialmente nos primeiros 10 a 15 anos de carreira. Isso não significa trocar de emprego a cada ano — permanência excessivamente curta em cada posição pode gerar percepção negativa em processos seletivos futuros — mas sim entender que a mobilidade estratégica, bem planejada, é uma ferramenta legítima e eficaz de gestão de carreira e renda.',
    passoAPasso: [
      'Pesquise sua faixa salarial de mercado pelo menos uma vez ao ano, usando múltiplas fontes (plataformas de pesquisa salarial, conversas com recrutadores, rede de contatos do setor).',
      'Documente resultados concretos e mensuráveis do seu trabalho ao longo do tempo, não apenas atividades realizadas, para embasar negociações salariais futuras.',
      'Construa e mantenha ativamente uma rede de contatos profissional, mesmo quando não está buscando uma nova oportunidade, já que isso amplia o acesso a informações de mercado e oportunidades futuras.',
      'Avalie periodicamente se sua trajetória atual (desenvolvimento de competências, remuneração, oportunidades de crescimento) está alinhada com seus objetivos de médio prazo.',
      'Antes de negociar um aumento ou considerar uma troca de emprego, tenha clareza sobre sua faixa salarial de mercado e o valor concreto que você entrega, evitando negociar apenas com base em "tempo de casa" ou necessidade pessoal.',
      'Invista continuamente em desenvolvimento de competências alinhadas às demandas futuras do seu setor, não apenas às exigências atuais do seu cargo.'
    ],
    errosComuns: [
      'Nunca pesquisar a faixa salarial de mercado, aceitando reajustes internos como única referência de evolução salarial.',
      'Negociar aumentos baseando o pedido apenas em necessidade pessoal ou tempo de casa, em vez de resultados concretos e dados de mercado.',
      'Trocar de emprego com frequência excessiva, sem tempo suficiente para gerar resultados mensuráveis em cada posição, prejudicando a percepção em processos seletivos futuros.',
      'Negligenciar a construção de rede de contatos profissional, limitando o acesso a informações de mercado e oportunidades futuras.',
      'Desenvolver apenas competências técnicas exigidas pelo cargo atual, sem atenção a tendências e demandas futuras do setor.',
      'Aceitar a primeira proposta de aumento ou de nova posição sem negociar, mesmo quando existe espaço real para isso.'
    ],
    comparativo: {
      titulo: 'Reajuste interno vs. troca de emprego negociada',
      linhas: [
        { label: 'Ganho salarial típico', valor: 'Reajuste interno: 10% a 20% em termos reais | Troca de emprego: frequentemente superior, especialmente no início de carreira' },
        { label: 'Base da negociação', valor: 'Reajuste interno: política interna da empresa | Troca de emprego: dados de mercado e propostas concorrentes' },
        { label: 'Risco envolvido', valor: 'Reajuste interno: baixo, mas limitado ao orçamento da empresa | Troca de emprego: adaptação a nova cultura e expectativas' },
        { label: 'Frequência recomendada', valor: 'Reajuste interno: negociação anual | Troca de emprego: mobilidade estratégica, não excessivamente frequente' }
      ]
    },
    checklist: [
      'Pesquise sua faixa salarial de mercado pelo menos uma vez ao ano.',
      'Documente resultados concretos do seu trabalho de forma contínua, não apenas próximo a avaliações.',
      'Mantenha sua rede de contatos profissional ativa, mesmo fora de momentos de busca por nova oportunidade.',
      'Avalie anualmente se sua trajetória atual está alinhada aos seus objetivos de médio prazo.',
      'Invista em pelo menos uma competência relevante para o futuro do seu setor a cada ano.'
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'Sabatier argumenta que aumentar renda é geralmente uma alavanca mais rápida para a liberdade financeira do que só cortar gastos — pesquisar sua faixa salarial e investir em competências relevantes é exatamente essa estratégia em prática.',
    },
    naoConfundirCom: [
      { moduloId: 'lideranca', diferenca: 'Este módulo foca na trajetória profissional individual e decisões estratégicas de carreira; Liderança foca especificamente nas competências de gestão e desenvolvimento de outras pessoas.' },
      { moduloId: 'negociacao', diferenca: 'Este módulo trata do planejamento estratégico da carreira, incluindo quando e por que negociar; Negociação foca nas técnicas práticas de conduzir essas conversas com eficácia.' }
    ]
  },

  mapaMental: {
    label: 'Carreira',
    subtitulo: 'Gestão estratégica da principal fonte de renda',
    ramos: [
      {
        id: 'dados-de-mercado',
        label: 'Dados de Mercado',
        cor: '#3B82F6',
        resumo: 'A base para decisões informadas de carreira',
        filhos: [
          { label: 'Faixa salarial de mercado', desc: 'Pesquisa contínua em plataformas e com recrutadores' },
          { label: 'Tendências do setor', desc: 'Competências emergentes e demandas futuras' },
          { label: 'Benchmarking de cargo', desc: 'Comparação de remuneração e benefícios por função e senioridade' }
        ]
      },
      {
        id: 'mobilidade-estrategica',
        label: 'Mobilidade Estratégica',
        cor: '#22C55E',
        resumo: 'Como decidir entre permanecer ou trocar de emprego',
        filhos: [
          { label: 'Reajuste interno', desc: 'Costuma ficar entre 10% e 20% em termos reais' },
          { label: 'Troca negociada', desc: 'Frequentemente gera ganhos superiores, especialmente no início de carreira' },
          { label: 'Tempo mínimo por posição', desc: 'Permanência muito curta pode prejudicar percepção em processos futuros' }
        ]
      },
      {
        id: 'construcao-de-valor',
        label: 'Construção de Valor Profissional',
        cor: '#F59E0B',
        resumo: 'O que sustenta negociações e oportunidades futuras',
        filhos: [
          { label: 'Resultados documentados', desc: 'Evidências concretas e mensuráveis do próprio trabalho' },
          { label: 'Desenvolvimento contínuo', desc: 'Competências alinhadas a demandas futuras, não só ao cargo atual' },
          { label: 'Rede de contatos', desc: 'Acesso ampliado a informações e oportunidades ao longo do tempo' }
        ]
      },
      {
        id: 'impacto-financeiro',
        label: 'Impacto Financeiro de Longo Prazo',
        cor: '#8B5CF6',
        resumo: 'Como decisões de carreira afetam a construção de patrimônio',
        filhos: [
          { label: 'Efeito cumulativo', desc: 'Diferenças salariais se acumulam ao longo de décadas de carreira' },
          { label: 'Capacidade de poupança', desc: 'Salário maior amplia a alavanca de renda dentro da taxa de poupança' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro: 'Use a calculadora de Juros Compostos para visualizar o impacto de longo prazo de diferenças salariais ao longo da carreira, considerando que a diferença mensal também é investida ao longo do tempo.',
    passos: [
      'Estime a diferença salarial mensal entre permanecer no emprego atual e uma eventual troca negociada com base em dados de mercado.',
      'Considere essa diferença mensal como um "aporte adicional" simulado na calculadora, ao longo de vários anos.',
      'Compare o patrimônio projetado com e sem essa diferença salarial, mantendo os demais parâmetros constantes.',
      'Avalie o impacto acumulado dessa decisão de carreira na sua trajetória patrimonial de longo prazo.'
    ],
    exemploGuiado: 'Um profissional ganha R$ 6.000 por mês e, ao pesquisar sua faixa salarial de mercado, descobre que profissionais com sua experiência em outras empresas ganham entre R$ 7.500 e R$ 8.500. Ele negocia uma troca de emprego e consegue R$ 8.000, uma diferença de R$ 2.000 mensais em relação ao salário anterior. Se ele investir metade dessa diferença (R$ 1.000 por mês) ao longo de 20 anos, com uma taxa de retorno real de 6% ao ano, essa decisão isolada de carreira projeta um patrimônio adicional de aproximadamente R$ 460.000 ao final do período — um valor que ilustra o impacto financeiro de longo prazo de decisões estratégicas de carreira bem embasadas em dados de mercado.'
  },

  flashcards: [
    { id: 'car-01', frente: 'Por que trocar de emprego costuma gerar ganhos salariais maiores que reajustes internos?', verso: 'Porque a negociação numa troca de emprego é baseada em dados de mercado e propostas concorrentes, enquanto reajustes internos costumam ficar limitados ao orçamento e política interna da empresa, geralmente entre 10% e 20% em termos reais.' },
    { id: 'car-02', frente: 'Qual é o erro mais caro relacionado à gestão de carreira, segundo o módulo?', verso: 'Nunca pesquisar sua faixa salarial de mercado, aceitando reajustes internos como única referência de evolução salarial ao longo da carreira.' },
    { id: 'car-03', frente: 'Por que trocar de emprego com frequência excessiva também pode ser prejudicial?', verso: 'Porque pode prejudicar a percepção em processos seletivos futuros, já que empregadores costumam valorizar um tempo mínimo de permanência que permita gerar e demonstrar resultados concretos.' },
    { id: 'car-04', frente: 'O que deve embasar uma negociação salarial eficaz?', verso: 'Resultados concretos e mensuráveis do trabalho realizado, combinados com dados reais de faixa salarial de mercado, em vez de apenas tempo de casa ou necessidade pessoal.' },
    { id: 'car-05', frente: 'Por que manter uma rede de contatos profissional ativa é importante, mesmo fora de momentos de busca por emprego?', verso: 'Porque amplia o acesso contínuo a informações de mercado e oportunidades futuras, além de fortalecer a reputação profissional ao longo do tempo.' },
    { id: 'car-06', frente: 'Quais fontes podem ser usadas para pesquisar faixa salarial de mercado no Brasil?', verso: 'Plataformas como Glassdoor e LinkedIn Salary, além de conversas com recrutadores especializados e a própria rede de contatos profissional.' },
    { id: 'car-07', frente: 'Por que decisões de carreira têm impacto significativo na construção de patrimônio no longo prazo?', verso: 'Porque salário é a principal alavanca de renda para a maioria das pessoas, e diferenças salariais se acumulam ao longo de décadas, ampliando a capacidade de poupança e investimento mesmo mantendo a mesma taxa de poupança percentual.' },
    { id: 'car-08', frente: 'O que é um currículo orientado a resultado?', verso: 'Um currículo que destaca conquistas concretas e mensuráveis (como "aumentei vendas em X%"), em vez de apenas listar atividades e responsabilidades desempenhadas.' }
  ],

  quiz: [
    {
      pergunta: 'Segundo o módulo, o que costuma gerar ganhos salariais proporcionalmente maiores, especialmente nos primeiros anos de carreira?',
      alternativas: [
        'Permanecer sempre na mesma empresa, esperando reajustes internos anuais',
        'Trocar de emprego negociando com base em dados de mercado, em comparação a reajustes internos',
        'Nunca negociar salário em nenhuma situação',
        'Aceitar sempre a primeira proposta recebida, sem questionamento'
      ],
      correta: 1,
      explicacao: 'Dados recorrentes do mercado de trabalho mostram que trocar de emprego, negociando com base em faixas salariais de mercado, costuma gerar ganhos superiores aos reajustes internos anuais, que ficam tipicamente entre 10% e 20% em termos reais.'
    },
    {
      pergunta: 'Qual é o erro mais caro relacionado à gestão de carreira, segundo o módulo?',
      alternativas: [
        'Documentar resultados concretos do próprio trabalho',
        'Nunca pesquisar sua faixa salarial de mercado, usando apenas reajustes internos como referência',
        'Manter uma rede de contatos profissional ativa',
        'Investir em desenvolvimento de novas competências'
      ],
      correta: 1,
      explicacao: 'Sem pesquisar a faixa salarial de mercado, o profissional não tem parâmetro real para avaliar se está sendo remunerado de forma competitiva, aceitando passivamente reajustes que podem estar significativamente abaixo do que o mercado paga.'
    },
    {
      pergunta: 'Por que trocar de emprego com frequência excessivamente curta também pode ser prejudicial à carreira?',
      alternativas: [
        'Porque é proibido por lei trocar de emprego mais de uma vez por ano',
        'Porque pode prejudicar a percepção em processos seletivos futuros, já que empregadores valorizam tempo suficiente para gerar resultados demonstráveis',
        'Porque gera automaticamente perda de todos os benefícios trabalhistas',
        'Porque reduz o salário em qualquer negociação futura'
      ],
      correta: 1,
      explicacao: 'Embora a mobilidade estratégica seja valiosa, permanência excessivamente curta em cada posição pode gerar percepção negativa em processos seletivos futuros, já que dificulta demonstrar resultados consistentes ao longo do tempo.'
    },
    {
      pergunta: 'O que deve embasar uma negociação salarial eficaz, segundo o módulo?',
      alternativas: [
        'Apenas o tempo de casa acumulado na empresa',
        'Resultados concretos e mensuráveis do trabalho, combinados com dados reais de mercado',
        'Somente a necessidade financeira pessoal do momento',
        'A opinião pessoal de colegas de trabalho sobre o assunto'
      ],
      correta: 1,
      explicacao: 'Negociações salariais bem-sucedidas costumam se basear em evidências concretas de valor entregue e em dados objetivos de mercado, não apenas em fatores subjetivos como tempo de casa ou necessidade pessoal.'
    },
    {
      pergunta: 'Por que decisões de carreira têm impacto significativo na construção de patrimônio no longo prazo?',
      alternativas: [
        'Porque carreira não tem nenhuma relação com investimentos financeiros',
        'Porque salário é a principal alavanca de renda para a maioria das pessoas, e diferenças se acumulam ao longo de décadas',
        'Porque apenas quem tem cargo de diretoria consegue construir patrimônio relevante',
        'Porque o patrimônio depende exclusivamente da taxa de retorno dos investimentos'
      ],
      correta: 1,
      explicacao: 'Salário é frequentemente a alavanca de renda mais relevante na construção de patrimônio — diferenças salariais acumuladas ao longo de uma carreira de décadas representam impacto financeiro substancial, mesmo mantendo a mesma taxa de poupança percentual.'
    },
    {
      pergunta: 'Por que manter uma rede de contatos profissional ativa, mesmo sem estar buscando novo emprego, é uma prática recomendada?',
      alternativas: [
        'Porque é uma exigência formal de todas as empresas brasileiras',
        'Porque amplia o acesso contínuo a informações de mercado e oportunidades futuras',
        'Porque substitui completamente a necessidade de qualificação técnica',
        'Porque garante automaticamente um aumento salarial anual'
      ],
      correta: 1,
      explicacao: 'Uma rede de contatos ativa oferece acesso contínuo a informações valiosas sobre o mercado, tendências do setor e oportunidades futuras, funcionando como um recurso estratégico de longo prazo, não apenas em momentos de busca ativa por emprego.'
    }
  ],

  faq: [
    { pergunta: 'Com que frequência devo pesquisar minha faixa salarial de mercado?', resposta: 'O ideal é fazer isso pelo menos uma vez ao ano, mesmo sem intenção imediata de trocar de emprego, para ter sempre um parâmetro atualizado na hora de negociar reajustes internos ou avaliar propostas externas.' },
    { pergunta: 'Trocar de emprego com muita frequência prejudica minha reputação profissional?', resposta: 'Permanências muito curtas e repetidas em diferentes empresas podem gerar questionamentos em processos seletivos futuros, mas isso varia por setor e contexto — o importante é ter tempo suficiente em cada posição para gerar e demonstrar resultados concretos.' },
    { pergunta: 'Como devo abordar uma negociação de aumento salarial internamente?', resposta: 'Apresente resultados concretos e mensuráveis do seu trabalho, combinados com dados objetivos de mercado sobre a faixa salarial da sua função, em vez de basear o pedido apenas em tempo de casa ou necessidades pessoais.' },
    { pergunta: 'Vale a pena aceitar uma proposta de outra empresa só para negociar um contra-aumento na empresa atual?', resposta: 'É uma estratégia arriscada — algumas empresas podem se sentir desconfortáveis com essa abordagem, e mesmo conseguindo o contra-aumento, a relação de confiança pode ficar afetada. É mais sustentável negociar proativamente com base em dados de mercado, sem depender de uma proposta externa como gatilho.' },
    { pergunta: 'Como faço networking de forma genuína, sem parecer interesseiro?', resposta: 'Construa relações profissionais baseadas em troca real de valor — compartilhar conhecimento, ajudar colegas, participar de comunidades do seu setor — em vez de buscar contatos apenas quando precisa de algo específico, como uma indicação de emprego.' },
    { pergunta: 'Devo priorizar desenvolvimento técnico ou competências comportamentais na minha carreira?', resposta: 'As duas frentes são importantes e se complementam — competências técnicas sólidas abrem portas iniciais, enquanto competências comportamentais (comunicação, liderança, negociação) costumam ganhar peso crescente conforme a carreira avança para posições de maior responsabilidade.' }
  ]
}
