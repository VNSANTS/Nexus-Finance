import type { Modulo } from '@/types'

export const alocacaoAtivos: Modulo = {
  id: 'alocacao-ativos',
  trilhaId: 'estrategia-gestao',
  numero: 4,
  titulo: 'Alocação de Ativos',
  subtitulo: 'A decisão que pesa mais no seu retorno do que escolher qual ação comprar',
  iconName: 'PieChart',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['formacao-investidor'],
  objetivoAprendizagem: 'Você vai sair sabendo montar uma alocação entre renda fixa, renda variável e outras classes de ativos alinhada ao seu horizonte de tempo e perfil de risco.',
  erroFatal: 'Montar a carteira olhando só para o retorno passado de cada ativo isoladamente, sem pensar em como as classes se comportam juntas — o que costuma resultar numa carteira concentrada demais num único cenário de mercado.',
  numeroChave: {
    valor: 'mais de 90%',
    legenda: 'da variação de retorno de longo prazo de uma carteira diversificada é explicada pela alocação entre classes de ativos, não pela escolha de ativos individuais dentro de cada classe, segundo estudos clássicos de atribuição de performance (Brinson et al.)'
  },
  glossarioDoModulo: ['alocação estratégica', 'alocação tática', 'correlação entre ativos', 'rebalanceamento', 'classe de ativo', 'horizonte de investimento'],
  proximoPasso: { moduloId: 'estrategias-grandes-gestores', motivo: 'Com a lógica de alocação entendida, vale ver como grandes gestores aplicam (e adaptam) esses princípios na prática.' },

  aprender: {
    oQueE: 'Alocação de ativos é a decisão de como dividir seu patrimônio entre diferentes classes — renda fixa, ações, fundos imobiliários, ativos internacionais, alternativos — e é considerada, por diversos estudos acadêmicos de atribuição de performance, o fator que mais explica o retorno de uma carteira de longo prazo, muito mais do que a escolha de qual ativo específico comprar dentro de cada classe.',
    porQueImporta: 'Duas pessoas podem escolher excelentes ações individualmente, mas se uma tiver 90% em renda variável e outra tiver 30%, os resultados e principalmente as oscilações de curto prazo serão completamente diferentes. Ignorar a alocação e focar só na seleção de ativos é como escolher os melhores tijolos sem pensar na planta da casa — o resultado estrutural depende muito mais da planta.',
    naPratica: 'No Brasil, a alocação típica considera: renda fixa pós-fixada (CDI/Selic) para reserva e curto prazo; renda fixa prefixada e IPCA+ para médio/longo prazo, aproveitando quando as taxas estão altas; renda variável nacional (ações, fundos, ETFs) para crescimento de longo prazo; fundos imobiliários para geração de renda passiva com exposição a imóveis; ativos internacionais (BDRs, ETFs internacionais, ou conta em corretora no exterior) para diversificação de moeda e geografia. A alocação estratégica é a divisão de longo prazo definida pelo perfil e horizonte do investidor; a alocação tática são ajustes pontuais e temporários dentro dessa estrutura, aproveitando janelas de mercado (por exemplo, aumentar levemente renda fixa prefixada quando as taxas de juros estão num pico histórico).',
    passoAPasso: [
      'Defina seu horizonte de investimento para cada objetivo (reserva, médio prazo, aposentadoria).',
      'Estabeleça uma alocação estratégica de longo prazo entre classes, alinhada ao seu perfil de risco (do suitability).',
      'Considere a correlação entre classes — combine ativos que não se movem sempre na mesma direção, para reduzir a oscilação total da carteira.',
      'Defina um percentual mínimo e máximo para cada classe, criando bandas de tolerância.',
      'Rebalanceie periodicamente (trimestral ou semestral) para voltar às proporções definidas, vendendo o que subiu além da banda e comprando o que ficou abaixo.',
      'Revise a alocação estratégica apenas quando mudanças reais de vida acontecerem (aposentadoria se aproximando, mudança de objetivo), não por notícia de curto prazo.'
    ],
    errosComuns: [
      'Concentrar mais de 20-30% do patrimônio em um único ativo, ignorando o princípio de diversificação entre e dentro de classes.',
      'Definir a alocação uma vez e nunca rebalancear, deixando a carteira derivar para um perfil de risco muito diferente do original conforme os ativos se valorizam de forma desigual.',
      'Confundir alocação tática com abandono da alocação estratégica — ajustes pontuais não deveriam virar mudanças permanentes de estratégia.',
      'Ignorar a correlação entre ativos e montar uma carteira "diversificada" apenas no nome (várias ações do mesmo setor, por exemplo).',
      'Definir alocação de longo prazo baseada no desempenho recente de uma classe, projetando que ela vai continuar performando igual no futuro.'
    ],
    comparativo: {
      titulo: 'Alocação estratégica vs. alocação tática',
      linhas: [
        { label: 'Horizonte', valor: 'Estratégica: longo prazo, anos | Tática: curto/médio prazo, meses' },
        { label: 'Frequência de mudança', valor: 'Estratégica: raramente muda | Tática: ajustes periódicos dentro da estrutura' },
        { label: 'Motivação', valor: 'Estratégica: perfil e horizonte do investidor | Tática: janelas específicas de mercado' },
        { label: 'Risco de uso incorreto', valor: 'Estratégica: baixo, se bem definida | Tática: pode virar especulação disfarçada de estratégia' }
      ]
    },
    checklist: [
      'Defina o horizonte de tempo de cada objetivo financeiro que você tem.',
      'Estabeleça percentuais-alvo para cada classe de ativo na sua carteira.',
      'Verifique se algum ativo ou setor está concentrando mais de 20-30% do seu patrimônio.',
      'Agende uma data fixa (trimestral ou semestral) para revisar e rebalancear.',
      'Anote por escrito sua alocação estratégica, para não abandoná-la por impulso em momentos de volatilidade.'
    ],
    livroRelacionado: {
      livroId: 'homem-mais-rico-babilonia',
      textoConexao: 'O princípio de "controlar seus gastos" e manter regras simples por escrito, que o livro defende desde a Babilônia antiga, é a mesma lógica por trás de anotar a alocação estratégica para não abandoná-la em momentos de pânico.',
    },
    naoConfundirCom: [
      { moduloId: 'formacao-investidor', diferenca: 'Formação do investidor trata das etapas cronológicas de amadurecimento; alocação de ativos trata da distribuição do patrimônio já formado entre classes.' },
      { moduloId: 'macro-aplicada-carteira', diferenca: 'Alocação de ativos define a estrutura de longo prazo da carteira; macroeconomia aplicada trata de como o cenário econômico atual pode informar ajustes táticos dentro dessa estrutura.' }
    ]
  },

  mapaMental: {
    label: 'Alocação de Ativos',
    subtitulo: 'Como distribuir patrimônio entre classes',
    ramos: [
      {
        id: 'classes-ativos',
        label: 'Classes de Ativos',
        cor: '#3B82F6',
        resumo: 'As principais categorias disponíveis para diversificar',
        filhos: [
          { label: 'Renda fixa', desc: 'Pós-fixada, prefixada e IPCA+, para segurança e previsibilidade' },
          { label: 'Renda variável nacional', desc: 'Ações, fundos e ETFs para crescimento de longo prazo' },
          { label: 'Fundos imobiliários', desc: 'Renda passiva com exposição a imóveis e liquidez de bolsa' },
          { label: 'Ativos internacionais', desc: 'BDRs e ETFs para diversificação de moeda e geografia' }
        ]
      },
      {
        id: 'principios',
        label: 'Princípios Centrais',
        cor: '#F59E0B',
        resumo: 'O que sustenta uma boa alocação',
        filhos: [
          { label: 'Correlação entre ativos', desc: 'Combinar classes que não se movem sempre juntas' },
          { label: 'Horizonte de tempo', desc: 'Prazos diferentes pedem alocações diferentes' },
          { label: 'Perfil de risco', desc: 'Tolerância à oscilação de curto prazo, definida via suitability' }
        ]
      },
      {
        id: 'tipos-alocacao',
        label: 'Tipos de Alocação',
        cor: '#8B5CF6',
        resumo: 'Estratégica vs. tática',
        filhos: [
          { label: 'Alocação estratégica', desc: 'Estrutura de longo prazo, raramente muda' },
          { label: 'Alocação tática', desc: 'Ajustes pontuais dentro da estrutura, aproveitando janelas de mercado' }
        ]
      },
      {
        id: 'manutencao',
        label: 'Manutenção da Carteira',
        cor: '#10B981',
        resumo: 'Como manter a alocação ao longo do tempo',
        filhos: [
          { label: 'Rebalanceamento', desc: 'Voltar periodicamente às proporções-alvo definidas' },
          { label: 'Bandas de tolerância', desc: 'Percentual mínimo e máximo por classe antes de rebalancear' },
          { label: 'Revisão por mudança de vida', desc: 'Ajustar a estratégia só quando o horizonte ou objetivo mudarem de verdade' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: 'Alocação de Carteira',
    intro: 'Use a calculadora de Alocação de Carteira para simular como diferentes divisões entre renda fixa e renda variável se comportariam historicamente em termos de retorno e oscilação.',
    passos: [
      'Informe seu horizonte de investimento (em anos) para o objetivo em questão.',
      'Selecione seu perfil de risco (conservador, moderado, arrojado).',
      'Veja a alocação sugerida entre classes de ativos com base nesses dois fatores.',
      'Ajuste manualmente os percentuais para ver como isso mudaria a oscilação esperada da carteira.'
    ],
    exemploGuiado: 'Exemplo: um investidor de perfil moderado, com horizonte de 10 anos para aposentadoria, poderia adotar algo como 40% em renda fixa (dividida entre pós-fixada e IPCA+), 40% em renda variável nacional (ações e fundos), 10% em fundos imobiliários e 10% em ativos internacionais. A cada 6 meses, ele revisa: se a renda variável subiu e passou de 45% da carteira por valorização, ele vende o excedente e realoca para renda fixa, voltando aos 40% originais — isso é rebalanceamento na prática, e tende a fazer a carteira comprar mais barato e vender mais caro de forma sistemática, sem depender de previsão de mercado.'
  },

  flashcards: [
    { id: 'aa-01', frente: 'O que é alocação de ativos?', verso: 'A decisão de como dividir o patrimônio entre diferentes classes de ativos, como renda fixa, ações, fundos imobiliários e ativos internacionais.' },
    { id: 'aa-02', frente: 'Segundo estudos de atribuição de performance, o que mais explica o retorno de longo prazo de uma carteira?', verso: 'A alocação entre classes de ativos, muito mais do que a escolha de ativos específicos dentro de cada classe.' },
    { id: 'aa-03', frente: 'O que é alocação estratégica?', verso: 'A divisão de longo prazo do patrimônio entre classes de ativos, definida com base no perfil de risco e horizonte do investidor, que raramente muda.' },
    { id: 'aa-04', frente: 'O que é alocação tática?', verso: 'Ajustes pontuais e temporários dentro da estrutura estratégica, aproveitando janelas específicas de mercado, sem abandonar a estratégia de longo prazo.' },
    { id: 'aa-05', frente: 'O que é rebalanceamento de carteira?', verso: 'O processo periódico de vender o que subiu além da proporção-alvo e comprar o que ficou abaixo, voltando a carteira à alocação originalmente definida.' },
    { id: 'aa-06', frente: 'Por que a correlação entre ativos importa na alocação?', verso: 'Porque combinar ativos que não se movem sempre na mesma direção reduz a oscilação total da carteira, mesmo mantendo o retorno esperado.' },
    { id: 'aa-07', frente: 'Qual é um erro comum ao definir alocação com base no desempenho recente de uma classe?', verso: 'Assumir que uma classe vai continuar performando igual no futuro só porque performou bem recentemente, ignorando ciclos de mercado.' },
    { id: 'aa-08', frente: 'O que são "bandas de tolerância" numa carteira?', verso: 'Percentuais mínimo e máximo definidos para cada classe de ativo, que sinalizam quando é hora de rebalancear a carteira.' }
  ],

  quiz: [
    {
      pergunta: 'Segundo estudos clássicos de atribuição de performance, o que mais explica a variação de retorno de longo prazo de uma carteira diversificada?',
      alternativas: ['A escolha de ações específicas', 'A alocação entre classes de ativos', 'O momento exato de entrada no mercado', 'A corretora utilizada'],
      correta: 1,
      explicacao: 'Estudos como os de Brinson et al. mostram que a alocação entre classes de ativos explica a maior parte da variação de retorno de longo prazo, mais do que a seleção de ativos individuais dentro de cada classe.'
    },
    {
      pergunta: 'Qual é a diferença central entre alocação estratégica e alocação tática?',
      alternativas: [
        'Não há diferença, são sinônimos',
        'Estratégica é de longo prazo e raramente muda; tática são ajustes pontuais dentro dessa estrutura',
        'Estratégica é só para renda fixa; tática é só para renda variável',
        'Tática é decidida pela CVM; estratégica é decidida pelo investidor'
      ],
      correta: 1,
      explicacao: 'A alocação estratégica define a estrutura de longo prazo da carteira; a tática são ajustes temporários dentro dessa estrutura, aproveitando janelas específicas de mercado, sem abandonar a estratégia original.'
    },
    {
      pergunta: 'Por que rebalancear uma carteira periodicamente tende a ajudar o investidor, mesmo sem prever o mercado?',
      alternativas: [
        'Porque garante lucro em qualquer cenário',
        'Porque, de forma sistemática, vende parte do que subiu e compra parte do que caiu, sem depender de timing',
        'Porque reduz o imposto de renda automaticamente',
        'Porque elimina toda a volatilidade da carteira'
      ],
      correta: 1,
      explicacao: 'Rebalanceamento é uma disciplina mecânica que tende a vender ativos relativamente caros (que subiram além da proporção-alvo) e comprar ativos relativamente baratos (que caíram abaixo), sem exigir previsão de mercado.'
    },
    {
      pergunta: 'Qual das opções abaixo é um erro comum na construção de uma alocação de ativos?',
      alternativas: [
        'Definir percentuais-alvo por classe alinhados ao horizonte de investimento',
        'Concentrar mais de 20-30% do patrimônio em um único ativo',
        'Rebalancear periodicamente a carteira',
        'Considerar a correlação entre ativos ao montar a carteira'
      ],
      correta: 1,
      explicacao: 'Concentrar uma parcela muito grande do patrimônio em um único ativo vai contra o princípio de diversificação que sustenta a alocação de ativos, aumentando o risco específico daquele ativo sobre toda a carteira.'
    },
    {
      pergunta: 'Um investidor aumenta temporariamente sua exposição a renda fixa prefixada porque as taxas de juros estão num pico histórico, mantendo o restante da estrutura de longo prazo. Isso é um exemplo de:',
      alternativas: ['Alocação estratégica sendo abandonada', 'Alocação tática dentro da estrutura estratégica', 'Erro de diversificação', 'Viés de ancoragem'],
      correta: 1,
      explicacao: 'Esse é um ajuste tático clássico: aproveitar uma janela específica de mercado sem abandonar a alocação estratégica de longo prazo, que continua norteando o restante da carteira.'
    },
    {
      pergunta: 'Por que "diversificar" apenas comprando várias ações do mesmo setor não é diversificação real?',
      alternativas: [
        'Porque ações do mesmo setor tendem a ter correlação alta, se movendo de forma parecida diante dos mesmos eventos',
        'Porque isso é proibido pela CVM',
        'Porque ações do mesmo setor sempre têm o mesmo preço',
        'Porque isso aumenta automaticamente o imposto de renda'
      ],
      correta: 0,
      explicacao: 'Diversificação real depende da correlação entre os ativos, não só da quantidade. Ações do mesmo setor tendem a reagir de forma parecida aos mesmos eventos econômicos, reduzindo o benefício real da diversificação.'
    }
  ],

  faq: [
    { pergunta: 'Com que frequência devo rebalancear minha carteira?', resposta: 'Trimestral ou semestralmente costuma ser um bom equilíbrio entre manter a alocação alinhada e evitar custos ou movimentações excessivas. Rebalancear com frequência demais (semanalmente, por exemplo) tende a gerar mais custo do que benefício.' },
    { pergunta: 'Minha alocação deve mudar conforme eu envelheço?', resposta: 'Geralmente sim — à medida que o horizonte de tempo para um objetivo específico (como aposentadoria) diminui, é comum reduzir gradualmente a exposição a renda variável em favor de renda fixa, para diminuir a oscilação da carteira perto do momento de usar o dinheiro.' },
    { pergunta: 'Alocação de ativos é a mesma coisa que diversificação?', resposta: 'Estão relacionadas, mas não são idênticas — alocação de ativos é a decisão de quanto colocar em cada classe; diversificação é o princípio mais amplo de espalhar o risco, que também se aplica dentro de cada classe (várias ações, não uma só, por exemplo).' },
    { pergunta: 'Vale a pena mudar minha alocação estratégica por causa de uma notícia econômica importante?', resposta: 'Geralmente não — a alocação estratégica deveria refletir seu horizonte e perfil de risco de longo prazo, que raramente mudam por uma notícia pontual. Ajustes por notícia tendem a ser mais alocação tática, e mesmo assim, com moderação.' },
    { pergunta: 'Existe uma alocação "ideal" que serve para todo mundo?', resposta: 'Não — a alocação ideal depende do horizonte de tempo e do perfil de risco de cada pessoa. O que existe são princípios gerais (diversificação, correlação, rebalanceamento) que se aplicam a qualquer alocação, mas os percentuais específicos variam por pessoa.' }
  ]
}
