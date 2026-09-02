// m01-empresas-negocios.ts
import { Modulo } from '@/types'

export const empresasNegocios: Modulo = {
  id: 'empresas-negocios',
  trilhaId: 'carreira-negocios',
  numero: 1,
  titulo: 'Empresas e Negócios',
  subtitulo: 'Como ler o balanço de uma empresa e entender se ela realmente ganha dinheiro',
  iconName: 'Building',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['formacao-investidor'],
  objetivoAprendizagem: 'Você vai sair sabendo ler os três demonstrativos financeiros básicos de uma empresa e identificar se o lucro divulgado reflete geração real de caixa.',
  erroFatal: 'Avaliar uma empresa só pelo lucro líquido divulgado, sem checar o fluxo de caixa operacional — é possível uma empresa apresentar lucro contábil relevante e, ao mesmo tempo, estar "queimando caixa" de verdade, através de manobras contábeis legais como reconhecimento antecipado de receita ou capitalização de despesas que deveriam ser reconhecidas no período.',
  numeroChave: { valor: '3 demonstrativos', legenda: 'balanço patrimonial, demonstração de resultado (DRE) e demonstração de fluxo de caixa — juntos, e não isoladamente, formam a base mínima para avaliar a saúde financeira real de qualquer empresa' },
  glossarioDoModulo: ['Balanço patrimonial', 'DRE (Demonstração de Resultado)', 'Fluxo de caixa operacional', 'EBITDA', 'Margem líquida', 'Alavancagem financeira', 'Capital de giro'],
  proximoPasso: { moduloId: 'empreendedorismo', motivo: 'Depois de entender como avaliar a saúde financeira de empresas já estabelecidas, o próximo passo é olhar para o outro lado: como se constrói um negócio do zero.' },

  aprender: {
    oQueE: 'Entender empresas e negócios do ponto de vista financeiro significa saber ler os demonstrativos contábeis básicos que toda empresa de capital aberto (e boa parte das fechadas, para fins internos) produz: o balanço patrimonial (retrato do que a empresa possui e deve num momento específico), a demonstração de resultado (DRE, que mostra receitas, custos e lucro ao longo de um período) e a demonstração de fluxo de caixa (que mostra a movimentação real de dinheiro, diferente do lucro contábil). Juntos, esses três documentos revelam a saúde financeira real de um negócio, muito além do que uma manchete de lucro trimestral consegue transmitir.',
    porQueImporta: 'Investidores e profissionais que avaliam empresas sem entender esses fundamentos ficam reféns de manchetes e narrativas — "a empresa teve lucro recorde" pode esconder uma deterioração real de caixa, endividamento crescente ou dependência de receitas não recorrentes. Entender os três demonstrativos em conjunto permite identificar se o crescimento é sustentável, se a empresa gera caixa de verdade e se está sendo gerida com disciplina financeira, informações essenciais tanto para investir em ações quanto para avaliar um negócio próprio ou de terceiros.',
    naPratica: 'No Brasil, empresas de capital aberto na B3 são obrigadas a divulgar esses demonstrativos trimestralmente (ITR) e anualmente (DFP), disponíveis publicamente no site da CVM e da própria B3. Ao analisar uma empresa, o balanço patrimonial mostra a relação entre ativos (o que a empresa possui) e passivos (o que ela deve), revelando o nível de endividamento e a solidez patrimonial. A DRE mostra a trajetória de receita, custos operacionais, despesas financeiras e o lucro líquido final — métricas como margem líquida (lucro líquido dividido pela receita) e EBITDA (lucro antes de juros, impostos, depreciação e amortização) ajudam a comparar a eficiência operacional entre empresas do mesmo setor. Já a demonstração de fluxo de caixa é o documento mais difícil de manipular contabilmente, porque mostra o dinheiro que efetivamente entrou e saiu do caixa — por isso, comparar o lucro líquido da DRE com o fluxo de caixa operacional é uma das checagens mais reveladoras que um analista pode fazer.',
    passoAPasso: [
      'Ao avaliar uma empresa, comece pelo balanço patrimonial: veja a relação entre dívida total e patrimônio líquido para entender o nível de alavancagem.',
      'Analise a DRE dos últimos 3 a 5 anos, observando a trajetória de receita e margem líquida, não apenas o resultado do último trimestre isoladamente.',
      'Compare o lucro líquido divulgado com o fluxo de caixa operacional do mesmo período — divergências relevantes e recorrentes merecem investigação mais profunda.',
      'Calcule o EBITDA e compare a margem EBITDA com empresas concorrentes do mesmo setor, já que setores diferentes têm padrões de margem muito distintos.',
      'Verifique o capital de giro (ativo circulante menos passivo circulante) para avaliar se a empresa tem folga financeira de curto prazo.',
      'Leia as notas explicativas dos demonstrativos, onde geralmente estão detalhados riscos, contingências e políticas contábeis relevantes que não aparecem nos números principais.'
    ],
    errosComuns: [
      'Avaliar uma empresa apenas pelo lucro líquido divulgado, sem checar se o fluxo de caixa operacional confirma esse resultado.',
      'Comparar margens de empresas de setores diferentes sem ajustar para as características específicas de cada indústria.',
      'Ignorar o nível de endividamento e alavancagem financeira ao avaliar apenas o crescimento de receita.',
      'Não ler as notas explicativas dos demonstrativos, perdendo informações relevantes sobre riscos e contingências.',
      'Tratar EBITDA como sinônimo de geração de caixa, quando na verdade ele ignora investimentos necessários em capital de giro e ativos fixos.',
      'Analisar apenas um trimestre isolado, sem considerar a tendência de vários períodos e possíveis sazonalidades do negócio.'
    ],
    comparativo: {
      titulo: 'Os três demonstrativos financeiros e o que cada um revela',
      linhas: [
        { label: 'Balanço patrimonial', valor: 'Mostra: ativos, passivos e patrimônio líquido num momento específico | Revela: solidez e endividamento' },
        { label: 'DRE', valor: 'Mostra: receitas, custos e lucro ao longo de um período | Revela: rentabilidade e eficiência operacional' },
        { label: 'Fluxo de caixa', valor: 'Mostra: movimentação real de dinheiro no período | Revela: se o lucro contábil vira caixa de verdade' }
      ]
    },
    checklist: [
      'Antes de avaliar qualquer empresa, acesse os três demonstrativos financeiros mais recentes.',
      'Compare o lucro líquido da DRE com o fluxo de caixa operacional do mesmo período.',
      'Calcule a relação entre dívida total e patrimônio líquido no balanço patrimonial.',
      'Analise a trajetória de margem líquida e EBITDA ao longo de pelo menos 3 anos, não só o último período.',
      'Leia as notas explicativas dos demonstrativos antes de formar uma conclusão final.'
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Fisher é a referência clássica sobre avaliar a qualidade real de uma empresa através de seus números e não só do preço da ação — exatamente a disciplina de leitura de DRE, balanço e fluxo de caixa que este módulo ensina.',
    },
    naoConfundirCom: [
      { moduloId: 'empreendedorismo', diferenca: 'Este módulo foca em avaliar empresas já estabelecidas por meio de seus demonstrativos financeiros; Empreendedorismo foca no processo de criar e estruturar um negócio do zero.' },
      { moduloId: 'estudos-de-caso', diferenca: 'Este módulo ensina a mecânica de leitura de demonstrativos financeiros; Estudos de Caso de Empresas aplica essa análise a situações reais e específicas de empresas conhecidas.' }
    ]
  },

  mapaMental: {
    label: 'Empresas e Negócios',
    subtitulo: 'Como ler a saúde financeira de uma empresa',
    ramos: [
      {
        id: 'balanco-patrimonial',
        label: 'Balanço Patrimonial',
        cor: '#3B82F6',
        resumo: 'O retrato financeiro num momento específico',
        filhos: [
          { label: 'Ativos', desc: 'Tudo que a empresa possui: caixa, estoques, imóveis, investimentos' },
          { label: 'Passivos', desc: 'Tudo que a empresa deve: dívidas, fornecedores, obrigações' },
          { label: 'Patrimônio líquido', desc: 'Diferença entre ativos e passivos, o valor contábil dos acionistas' }
        ]
      },
      {
        id: 'dre',
        label: 'DRE',
        cor: '#F59E0B',
        resumo: 'A trajetória de resultado ao longo de um período',
        filhos: [
          { label: 'Receita líquida', desc: 'Total vendido, descontados impostos e devoluções' },
          { label: 'Margem líquida', desc: 'Lucro líquido dividido pela receita, mede eficiência final' },
          { label: 'EBITDA', desc: 'Lucro antes de juros, impostos, depreciação e amortização' }
        ]
      },
      {
        id: 'fluxo-de-caixa',
        label: 'Fluxo de Caixa',
        cor: '#22C55E',
        resumo: 'O dinheiro que realmente entra e sai',
        filhos: [
          { label: 'Fluxo operacional', desc: 'Caixa gerado pela atividade principal do negócio' },
          { label: 'Fluxo de investimento', desc: 'Recursos usados em ativos de longo prazo' },
          { label: 'Fluxo de financiamento', desc: 'Captação e pagamento de dívidas e dividendos' }
        ]
      },
      {
        id: 'sinais-de-alerta',
        label: 'Sinais de Alerta',
        cor: '#EF4444',
        resumo: 'O que investigar mais a fundo',
        filhos: [
          { label: 'Lucro sem caixa', desc: 'Divergência recorrente entre lucro líquido e fluxo de caixa operacional' },
          { label: 'Endividamento crescente', desc: 'Dívida aumentando mais rápido que o patrimônio líquido' },
          { label: 'Margem em queda', desc: 'Deterioração persistente de eficiência operacional ao longo do tempo' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações práticas de análise de demonstrativos financeiros e vê o resultado esperado de cada abordagem, considerando os sinais que realmente importam.',
    passos: [
      'Leia a situação envolvendo uma decisão de análise financeira de empresa.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os fundamentos de leitura de demonstrativos financeiros.'
    ],
    exemploGuiado: 'Uma empresa divulga lucro líquido de R$ 50 milhões no trimestre, superando as expectativas do mercado, e a ação sobe forte no dia seguinte. Um investidor mais cuidadoso, antes de comprar ações baseado só nessa manchete, verifica a demonstração de fluxo de caixa do mesmo período e descobre que o fluxo de caixa operacional foi de apenas R$ 8 milhões — uma divergência relevante. Ao investigar as notas explicativas, ele encontra que parte significativa do lucro veio de reconhecimento antecipado de receita de contratos de longo prazo, ainda não efetivamente recebida em caixa. Essa descoberta muda substancialmente a interpretação do resultado: o lucro contábil forte não está sendo acompanhado, no mesmo período, por geração de caixa correspondente, um sinal que merece cautela antes de qualquer decisão de investimento baseada apenas na manchete de lucro recorde.',
    cenarioGuiado: [
      {
        pergunta: 'Uma empresa anuncia lucro recorde no trimestre e a ação sobe forte na bolsa no mesmo dia.',
        opcoes: [
          { texto: 'Compro ações imediatamente, o lucro recorde é um sinal claramente positivo', resultado: 'Reagir apenas à manchete de lucro, sem checar se o fluxo de caixa operacional confirma esse resultado, ignora um dos sinais mais reveladores da saúde financeira real da empresa.' },
          { texto: 'Verifico o fluxo de caixa operacional do mesmo período antes de tomar qualquer decisão', resultado: 'Abordagem mais criteriosa: comparar lucro contábil com fluxo de caixa operacional ajuda a identificar se o resultado divulgado reflete geração real de dinheiro, ou se depende de reconhecimentos contábeis que ainda não se converteram em caixa.' }
        ]
      },
      {
        pergunta: 'Você está comparando duas empresas do mesmo setor, uma com margem líquida de 15% e outra com 8%.',
        opcoes: [
          { texto: 'Considero automaticamente a empresa de margem 15% mais eficiente e melhor investimento', resultado: 'Margem líquida isolada não conta toda a história — é importante verificar também o nível de endividamento, a trajetória histórica da margem e se o fluxo de caixa confirma essa rentabilidade, antes de concluir qual empresa é de fato mais sólida.' },
          { texto: 'Analiso também o balanço patrimonial e a trajetória histórica de margem de ambas antes de comparar', resultado: 'Abordagem mais completa: margem líquida é um dado importante, mas precisa ser interpretado junto com endividamento, consistência histórica e geração de caixa para uma comparação justa entre empresas.' }
        ]
      },
      {
        pergunta: 'Uma empresa reporta EBITDA em forte crescimento, e um analista de mercado destaca isso como sinal muito positivo.',
        opcoes: [
          { texto: 'Considero EBITDA equivalente à geração real de caixa da empresa', resultado: 'EBITDA ignora investimentos necessários em capital de giro e ativos fixos, além de despesas financeiras e impostos — tratá-lo como equivalente à geração real de caixa pode levar a uma avaliação otimista demais da saúde financeira do negócio.' },
          { texto: 'Uso o EBITDA como uma métrica complementar, mas confirmo com o fluxo de caixa operacional real', resultado: 'Abordagem correta: EBITDA é útil para comparar eficiência operacional entre empresas, mas precisa ser complementado pela análise do fluxo de caixa real para entender a geração efetiva de dinheiro do negócio.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'en-01', frente: 'Quais são os três demonstrativos financeiros básicos de uma empresa?', verso: 'Balanço patrimonial, demonstração de resultado (DRE) e demonstração de fluxo de caixa.' },
    { id: 'en-02', frente: 'O que o balanço patrimonial revela sobre uma empresa?', verso: 'A relação entre ativos (o que a empresa possui) e passivos (o que ela deve) num momento específico, revelando solidez e nível de endividamento.' },
    { id: 'en-03', frente: 'O que é margem líquida?', verso: 'O lucro líquido dividido pela receita, uma métrica que mede a eficiência final da empresa em converter vendas em lucro.' },
    { id: 'en-04', frente: 'O que é EBITDA?', verso: 'Lucro antes de juros, impostos, depreciação e amortização — uma métrica usada para comparar eficiência operacional entre empresas, sem o efeito de decisões financeiras e contábeis específicas.' },
    { id: 'en-05', frente: 'Por que o fluxo de caixa é considerado o demonstrativo mais difícil de manipular contabilmente?', verso: 'Porque mostra o dinheiro que efetivamente entrou e saiu do caixa, diferente do lucro contábil, que pode ser influenciado por reconhecimentos de receita ou despesa que ainda não se converteram em movimentação real de dinheiro.' },
    { id: 'en-06', frente: 'Qual é o erro mais caro ao avaliar uma empresa, segundo o módulo?', verso: 'Avaliar a empresa apenas pelo lucro líquido divulgado, sem checar se o fluxo de caixa operacional confirma essa geração de resultado.' },
    { id: 'en-07', frente: 'O que é capital de giro?', verso: 'A diferença entre ativo circulante e passivo circulante, usada para avaliar se a empresa tem folga financeira suficiente para suas obrigações de curto prazo.' },
    { id: 'en-08', frente: 'Onde encontrar os demonstrativos financeiros de empresas de capital aberto no Brasil?', verso: 'No site da CVM e da B3, onde empresas listadas são obrigadas a divulgar publicamente esses documentos trimestralmente (ITR) e anualmente (DFP).' }
  ],

  quiz: [
    {
      pergunta: 'Quais são os três demonstrativos financeiros básicos que juntos revelam a saúde financeira real de uma empresa?',
      alternativas: [
        'Relatório de sustentabilidade, ata de assembleia e press release',
        'Balanço patrimonial, demonstração de resultado (DRE) e demonstração de fluxo de caixa',
        'Apenas o lucro líquido trimestral divulgado',
        'Relatório de vendas, folha de pagamento e inventário de estoque'
      ],
      correta: 1,
      explicacao: 'Esses três demonstrativos, analisados em conjunto, mostram respectivamente a posição patrimonial, a rentabilidade ao longo do tempo e a geração real de caixa — nenhum deles isoladamente conta a história completa.'
    },
    {
      pergunta: 'Por que avaliar uma empresa apenas pelo lucro líquido divulgado é considerado um erro grave?',
      alternativas: [
        'Porque o lucro líquido nunca é divulgado corretamente por empresas brasileiras',
        'Porque o lucro contábil pode divergir significativamente da geração real de caixa, escondendo problemas financeiros reais',
        'Porque apenas empresas de capital fechado divulgam lucro líquido',
        'Porque o lucro líquido é sempre menor que o fluxo de caixa operacional'
      ],
      correta: 1,
      explicacao: 'É possível uma empresa apresentar lucro contábil relevante através de reconhecimentos antecipados de receita ou outras práticas contábeis legais, sem que isso se reflita, no mesmo período, em geração real de caixa operacional.'
    },
    {
      pergunta: 'O que a demonstração de fluxo de caixa revela que a DRE sozinha não consegue mostrar?',
      alternativas: [
        'O valor total de impostos pagos no ano anterior',
        'A movimentação real de dinheiro no período, permitindo checar se o lucro contábil se converteu em caixa efetivo',
        'O número total de funcionários da empresa',
        'A cotação atual das ações da empresa na bolsa'
      ],
      correta: 1,
      explicacao: 'A DRE mostra o resultado contábil (receitas menos custos e despesas), que pode incluir itens que não representam movimentação real de caixa no período — o fluxo de caixa mostra exatamente o dinheiro que entrou e saiu de fato.'
    },
    {
      pergunta: 'O que é EBITDA e qual sua principal limitação como métrica de análise?',
      alternativas: [
        'É o lucro líquido final, sem nenhuma limitação relevante',
        'É o lucro antes de juros, impostos, depreciação e amortização, mas ignora investimentos necessários em capital de giro e ativos fixos',
        'É um imposto específico cobrado sobre empresas de capital aberto',
        'É a métrica que substitui completamente a necessidade de analisar o fluxo de caixa'
      ],
      correta: 1,
      explicacao: 'EBITDA é útil para comparar eficiência operacional entre empresas, mas por ignorar depreciação, amortização e outros fatores, não deve ser tratado como equivalente à geração real de caixa do negócio.'
    },
    {
      pergunta: 'O que o balanço patrimonial permite avaliar sobre uma empresa?',
      alternativas: [
        'Apenas o volume de vendas do último trimestre',
        'A relação entre ativos e passivos, revelando o nível de endividamento e solidez patrimonial',
        'Somente o valor de mercado das ações na bolsa',
        'Exclusivamente o número de funcionários contratados'
      ],
      correta: 1,
      explicacao: 'O balanço patrimonial é um retrato num momento específico do que a empresa possui (ativos) e deve (passivos), permitindo avaliar alavancagem financeira e solidez patrimonial geral do negócio.'
    },
    {
      pergunta: 'Por que comparar margens de empresas de setores diferentes sem ajuste é considerado um erro comum?',
      alternativas: [
        'Porque margens só existem em empresas de tecnologia',
        'Porque setores diferentes têm padrões de margem muito distintos, tornando a comparação direta enganosa',
        'Porque margem líquida é sempre igual entre empresas do mesmo país',
        'Porque a CVM proíbe esse tipo de comparação'
      ],
      correta: 1,
      explicacao: 'Setores como varejo, tecnologia e indústria pesada têm estruturas de custo e padrões de margem naturalmente diferentes — comparar margens sem considerar o setor pode levar a conclusões equivocadas sobre eficiência relativa.'
    }
  ],

  faq: [
    { pergunta: 'Onde posso encontrar os demonstrativos financeiros de uma empresa listada na bolsa brasileira?', resposta: 'No site da CVM (Comissão de Valores Mobiliários) e no site de Relações com Investidores da própria empresa, além do site da B3, onde os documentos trimestrais (ITR) e anuais (DFP) ficam disponíveis publicamente para consulta.' },
    { pergunta: 'É possível uma empresa "maquiar" seus demonstrativos financeiros legalmente?', resposta: 'Dentro dos limites da legislação contábil, existem escolhas e estimativas que podem apresentar os resultados de forma mais favorável (como reconhecimento antecipado de receita ou capitalização de certas despesas), sem necessariamente configurar fraude — por isso comparar diferentes demonstrativos entre si é uma forma de identificar essas nuances.' },
    { pergunta: 'Margem líquida alta sempre significa uma empresa melhor?', resposta: 'Não necessariamente — depende do setor, da fase de crescimento da empresa e de fatores pontuais que podem ter influenciado o resultado do período. Margem alta e sustentável ao longo de vários anos costuma ser um sinal mais confiável do que uma margem elevada num único trimestre isolado.' },
    { pergunta: 'Preciso ser contador para conseguir ler demonstrativos financeiros?', resposta: 'Não é necessário ser contador para entender os conceitos básicos e identificar os principais sinais de alerta — o conhecimento fundamental apresentado neste módulo já permite uma análise mais criteriosa do que se basear apenas em manchetes de resultado.' },
    { pergunta: 'Com que frequência as empresas listadas divulgam esses demonstrativos no Brasil?', resposta: 'Trimestralmente, por meio do ITR (Informações Trimestrais), e anualmente, por meio da DFP (Demonstrações Financeiras Padronizadas), ambos de divulgação obrigatória para empresas de capital aberto.' },
    { pergunta: 'O que fazer se eu encontrar uma divergência relevante entre lucro líquido e fluxo de caixa operacional?', resposta: 'Investigue as notas explicativas dos demonstrativos para entender a origem dessa divergência — pode haver explicações legítimas (como sazonalidade do negócio), mas divergências recorrentes ao longo de vários períodos merecem análise mais aprofundada antes de qualquer decisão de investimento.' }
  ]
}
