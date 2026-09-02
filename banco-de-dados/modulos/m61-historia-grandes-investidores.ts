// m01-historia-grandes-investidores.ts
import { Modulo } from '@/types'

export const historiaGrandesInvestidores: Modulo = {
  id: 'historia-grandes-investidores',
  trilhaId: 'cultura-investimentos',
  numero: 1,
  titulo: 'História de Grandes Investidores',
  subtitulo: 'O que décadas de mercado ensinam sobre paciência, ciclos e disciplina',
  iconName: 'ScrollText',
  duracaoMin: 13,

  nivel: 'intermediario',
  preRequisitos: ['formacao-investidor', 'estrategias-grandes-gestores'],
  objetivoAprendizagem: 'Você vai sair entendendo os princípios recorrentes que atravessam décadas de história do investimento, capazes de serem aplicados de forma prática à sua própria estratégia.',
  erroFatal: 'Tentar copiar literalmente as decisões específicas de grandes investidores do passado, ignorando que o contexto de mercado, taxas de juros e oportunidades disponíveis eram completamente diferentes — o valor histórico está nos princípios de decisão, não nas escolhas específicas de ativos feitas décadas atrás.',
  numeroChave: { valor: '+90 anos', legenda: 'período aproximado coberto pela história moderna de investimento em valor, desde as primeiras formulações sistemáticas nas décadas de 1920 e 1930 até as estratégias amplamente estudadas hoje' },
  glossarioDoModulo: ['Investimento em valor (value investing)', 'Margem de segurança', 'Ciclo de mercado', 'Bolha especulativa', 'Efeito manada', 'Vantagem competitiva duradoura (moat)'],
  proximoPasso: { moduloId: 'biografias-investidores', motivo: 'Depois de entender os princípios recorrentes na história do investimento, o próximo passo é conhecer as trajetórias individuais de investidores específicos que aplicaram esses princípios de formas distintas.' },

  aprender: {
    oQueE: 'A história de grandes investidores é o estudo de como diferentes gerações de profissionais do mercado financeiro desenvolveram, testaram e refinaram princípios de tomada de decisão ao longo de décadas — atravessando guerras, crises financeiras, bolhas especulativas e períodos de forte crescimento econômico. Diferente de estudar apenas resultados (quanto determinado investidor ganhou), estudar a história do investimento em valor foca em entender o raciocínio e a disciplina que sustentaram decisões consistentes ao longo de ciclos de mercado muito distintos entre si.',
    porQueImporta: 'Investidores iniciantes frequentemente acreditam que cada momento de mercado é único e sem precedentes, o que os torna vulneráveis a repetir os mesmos erros comportamentais que gerações anteriores já cometeram — comprar no auge da euforia, vender no fundo do pânico, perseguir modismos sem fundamento. Conhecer a história do investimento revela que ciclos de euforia e pânico se repetem, com roupagens diferentes, ao longo de praticamente um século de mercados financeiros modernos, e que os investidores mais bem-sucedidos historicamente foram aqueles que mantiveram disciplina e princípios consistentes independente do humor do mercado no momento.',
    naPratica: 'O conceito de investimento em valor, popularizado a partir de obras acadêmicas publicadas ainda nas décadas de 1930 e 1940, propôs pela primeira vez de forma sistemática a ideia de comprar ativos por um preço abaixo do seu valor intrínseco estimado, com uma margem de segurança que protege o investidor contra erros de avaliação ou eventos imprevistos. Esse princípio foi posteriormente expandido e aplicado por gerações seguintes de investidores, incluindo a busca por empresas com vantagem competitiva duradoura (um "fosso" que protege a empresa da concorrência ao longo do tempo), não apenas ativos baratos no sentido numérico. Ao longo da história, diferentes bolhas especulativas — desde episódios do início do século XX até a bolha das empresas de internet no fim dos anos 1990 — mostraram um padrão recorrente: euforia coletiva, justificativas de que "dessa vez é diferente", e eventual correção brusca de preços, frequentemente atingindo mais duramente quem entrou mais tarde no movimento, motivado pelo medo de ficar de fora (conhecido como FOMO).',
    passoAPasso: [
      'Estude os princípios centrais do investimento em valor: comprar com margem de segurança, focar no valor intrínseco do ativo, não apenas no preço de mercado do momento.',
      'Observe padrões recorrentes em diferentes bolhas especulativas ao longo da história, identificando elementos comuns como euforia coletiva e justificativas de "dessa vez é diferente".',
      'Entenda que ciclos de mercado (alta, euforia, correção, pessimismo excessivo, recuperação) se repetem estruturalmente, mesmo que os ativos específicos envolvidos mudem a cada geração.',
      'Reconheça a diferença entre estudar princípios de decisão (aplicáveis a qualquer época) e tentar replicar escolhas específicas de ativos feitas décadas atrás, em contextos econômicos totalmente diferentes.',
      'Analise como investidores historicamente bem-sucedidos mantiveram disciplina em momentos de pressão social para "seguir a manada", tanto em bolhas de alta quanto em pânicos de baixa.',
      'Aplique esses princípios à sua própria estratégia, adaptando-os ao contexto de mercado atual, em vez de apenas repetir fórmulas do passado sem adaptação crítica.'
    ],
    errosComuns: [
      'Tentar replicar literalmente decisões específicas de investimento tomadas décadas atrás, ignorando mudanças profundas no contexto econômico desde então.',
      'Acreditar que "dessa vez é diferente" durante períodos de euforia especulativa, ignorando padrões históricos recorrentes de bolhas e correções.',
      'Estudar apenas os resultados financeiros de grandes investidores, sem entender o raciocínio e a disciplina que sustentaram suas decisões ao longo de décadas.',
      'Ignorar que muitos investidores historicamente bem-sucedidos passaram por períodos longos de resultados abaixo da média antes de serem reconhecidos, exigindo paciência extrema.',
      'Confundir sorte pontual em um único ciclo de mercado com habilidade consistente comprovada ao longo de múltiplos ciclos distintos.',
      'Desconsiderar completamente a história do investimento por achar que "o mercado mudou", quando os padrões comportamentais humanos por trás dos ciclos permanecem substancialmente os mesmos.'
    ],
    comparativo: {
      titulo: 'Padrões recorrentes: bolhas especulativas ao longo da história',
      linhas: [
        { label: 'Fase de euforia', valor: 'Características: otimismo generalizado, justificativa de "dessa vez é diferente", entrada de investidores inexperientes' },
        { label: 'Fase de pico', valor: 'Características: valorizações desconectadas de fundamentos, cobertura midiática intensa e otimista' },
        { label: 'Fase de correção', valor: 'Características: queda brusca de preços, pânico vendedor, questionamento retrospectivo dos fundamentos' },
        { label: 'Fase de recuperação', valor: 'Características: consolidação dos ativos com fundamentos reais, desaparecimento dos especulativos sem sustentação' }
      ]
    },
    checklist: [
      'Estude os princípios centrais do investimento em valor, não apenas casos específicos de sucesso.',
      'Identifique padrões recorrentes de bolhas especulativas ao longo da história do mercado financeiro.',
      'Reflita criticamente sobre a frase "dessa vez é diferente" sempre que ouvir isso durante um período de forte euforia de mercado.',
      'Avalie sua própria disciplina em momentos de pressão social para seguir movimentos de manada, tanto de alta quanto de baixa.',
      'Adapte princípios históricos ao contexto atual, em vez de replicar decisões específicas de outra época sem adaptação crítica.'
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham escreveu o livro que fundou o investimento em valor e continua relevante décadas depois — a prova viva de que princípios de disciplina superam táticas específicas de uma época, exatamente o que este módulo defende.',
    },
    naoConfundirCom: [
      { moduloId: 'biografias-investidores', diferenca: 'Este módulo foca nos princípios e padrões recorrentes ao longo da história do investimento; Biografias de Investidores aprofunda as trajetórias individuais específicas de investidores particulares.' },
      { moduloId: 'estrategias-grandes-gestores', diferenca: 'Este módulo tem foco histórico e comportamental sobre décadas de mercado; Estratégias de Grandes Gestores foca nas técnicas práticas específicas de análise e construção de carteira usadas atualmente.' }
    ]
  },

  mapaMental: {
    label: 'História de Grandes Investidores',
    subtitulo: 'Princípios recorrentes ao longo de quase um século de mercado',
    ramos: [
      {
        id: 'fundamentos-do-value-investing',
        label: 'Fundamentos do Value Investing',
        cor: '#3B82F6',
        resumo: 'A base sistemática desenvolvida ainda no início do século XX',
        filhos: [
          { label: 'Valor intrínseco', desc: 'Estimativa do valor real de um ativo, independente do preço de mercado momentâneo' },
          { label: 'Margem de segurança', desc: 'Comprar abaixo do valor intrínseco estimado, protegendo contra erros de avaliação' },
          { label: 'Vantagem competitiva duradoura', desc: 'Busca por empresas com proteção estrutural frente à concorrência ao longo do tempo' }
        ]
      },
      {
        id: 'ciclos-de-mercado',
        label: 'Ciclos de Mercado',
        cor: '#EF4444',
        resumo: 'O padrão que se repete, com roupagens diferentes, ao longo da história',
        filhos: [
          { label: 'Euforia coletiva', desc: 'Otimismo generalizado, com justificativas de que "dessa vez é diferente"' },
          { label: 'Bolhas especulativas', desc: 'Valorizações desconectadas de fundamentos reais dos ativos' },
          { label: 'Correções bruscas', desc: 'Queda de preços que atinge mais duramente quem entrou por último' }
        ]
      },
      {
        id: 'disciplina-comportamental',
        label: 'Disciplina Comportamental',
        cor: '#22C55E',
        resumo: 'O que diferenciou investidores consistentes ao longo de décadas',
        filhos: [
          { label: 'Resistência ao efeito manada', desc: 'Manter princípios mesmo sob pressão social para seguir a maioria' },
          { label: 'Paciência de longo prazo', desc: 'Aceitar períodos de resultado abaixo da média sem abandonar a estratégia' },
          { label: 'Foco em processo, não em resultado pontual', desc: 'Avaliar decisões pela qualidade do raciocínio, não apenas pelo resultado de curto prazo' }
        ]
      },
      {
        id: 'licoes-aplicaveis',
        label: 'Lições Aplicáveis Hoje',
        cor: '#F59E0B',
        resumo: 'Como usar a história sem tentar replicá-la literalmente',
        filhos: [
          { label: 'Princípios, não escolhas específicas', desc: 'O contexto de cada época muda, os princípios de decisão permanecem relevantes' },
          { label: 'Reconhecer padrões, não prever o futuro', desc: 'A história ajuda a identificar sinais de alerta, não a cronometrar o próximo ciclo' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações que remetem a padrões históricos recorrentes do mercado financeiro e reflete sobre como aplicar princípios de disciplina e análise crítica diante de cada uma.',
    passos: [
      'Leia a situação que remete a um padrão histórico recorrente de mercado.',
      'Escolha a alternativa que representa sua reação diante dessa situação.',
      'Veja a análise do resultado, considerando os padrões históricos de ciclos de mercado.'
    ],
    exemploGuiado: 'Durante um período de forte euforia em um determinado setor da economia, um investidor observa colegas e conhecidos obtendo retornos expressivos em poucas semanas, com ativos cujo preço já subiu muito além de qualquer estimativa razoável de valor fundamentado. A justificativa amplamente repetida no mercado é que "esse setor mudou completamente as regras do jogo, e os modelos tradicionais de avaliação não se aplicam mais". Historicamente, esse tipo de justificativa — de que "dessa vez é diferente" — precedeu diversas correções bruscas de mercado ao longo de quase um século de história financeira moderna. Um investidor que aplica princípios de margem de segurança e ceticismo saudável diante dessa narrativa tende a reduzir exposição ou evitar entrar nesse movimento tardiamente, mesmo correndo o risco de "perder" parte da valorização adicional, caso ela ainda continue por mais algum tempo antes de uma eventual correção.',
    cenarioGuiado: [
      {
        pergunta: 'Você ouve repetidamente a frase "dessa vez é diferente" para justificar a valorização acelerada de um setor específico da economia.',
        opcoes: [
          { texto: 'Aceito a justificativa e aumento minha exposição a esse setor, para não ficar de fora do movimento', resultado: 'Historicamente, a frase "dessa vez é diferente" precedeu diversas bolhas especulativas ao longo de quase um século de mercado — aceitá-la sem ceticismo aumenta o risco de entrar tardiamente num ciclo próximo de uma correção relevante.' },
          { texto: 'Aplico ceticismo saudável e avalio criticamente se os fundamentos realmente justificam essa valorização', resultado: 'Reconhecer esse padrão histórico recorrente e manter disciplina de avaliação, mesmo sob pressão social para "não ficar de fora", é uma das lições centrais extraídas de quase um século de ciclos de mercado.' }
        ]
      },
      {
        pergunta: 'Você está estudando a trajetória de um investidor historicamente bem-sucedido e considera aplicar exatamente as mesmas escolhas de ativos que ele fez décadas atrás.',
        opcoes: [
          { texto: 'Replico literalmente as mesmas escolhas de ativos, já que funcionaram no passado', resultado: 'O contexto econômico, as taxas de juros e as oportunidades disponíveis eram completamente diferentes na época — replicar escolhas específicas sem adaptação ao contexto atual ignora que o valor histórico está nos princípios de decisão, não nas escolhas exatas de ativos.' },
          { texto: 'Estudo os princípios de decisão usados e adapto-os ao contexto de mercado atual', resultado: 'Abordagem mais adequada: extrair princípios de raciocínio (margem de segurança, disciplina, foco em fundamentos) e adaptá-los ao contexto presente é o que realmente aproveita o valor da história de investimento.' }
        ]
      },
      {
        pergunta: 'Durante um período de forte pessimismo de mercado, após uma correção relevante, muitos investidores estão vendendo ativos em pânico.',
        opcoes: [
          { texto: 'Sigo o movimento geral e também vendo minhas posições, para evitar perdas maiores', resultado: 'Historicamente, vender em pânico durante o auge do pessimismo coletivo, sem reavaliar os fundamentos reais dos ativos, tende a cristalizar perdas justamente no momento de maior desconto de preço, repetindo um padrão comportamental recorrente ao longo da história do mercado.' },
          { texto: 'Reavalio os fundamentos dos meus ativos antes de qualquer decisão, resistindo à pressão do movimento coletivo', resultado: 'Manter disciplina e reavaliar fundamentos antes de agir, mesmo sob forte pressão emocional do mercado, é um dos comportamentos historicamente associados a investidores que mantiveram resultados consistentes ao longo de múltiplos ciclos.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'hgi-01', frente: 'Quando começaram as primeiras formulações sistemáticas do investimento em valor?', verso: 'Ainda nas décadas de 1920 e 1930, com obras acadêmicas que popularizaram os conceitos de valor intrínseco e margem de segurança.' },
    { id: 'hgi-02', frente: 'O que é margem de segurança no investimento em valor?', verso: 'A prática de comprar um ativo por um preço significativamente abaixo do seu valor intrínseco estimado, protegendo o investidor contra erros de avaliação ou eventos imprevistos.' },
    { id: 'hgi-03', frente: 'Qual frase costuma preceder historicamente diversas bolhas especulativas, segundo o módulo?', verso: '"Dessa vez é diferente" — a justificativa recorrente usada para explicar por que os padrões e modelos tradicionais de avaliação não se aplicariam ao momento atual.' },
    { id: 'hgi-04', frente: 'O que é vantagem competitiva duradoura (moat)?', verso: 'Uma característica estrutural de uma empresa que a protege da concorrência ao longo do tempo, permitindo manter rentabilidade superior de forma sustentável.' },
    { id: 'hgi-05', frente: 'Qual é o erro mais comum ao estudar a história de grandes investidores, segundo o módulo?', verso: 'Tentar replicar literalmente as escolhas específicas de ativos feitas décadas atrás, ignorando que o contexto econômico da época era completamente diferente do atual.' },
    { id: 'hgi-06', frente: 'O que é FOMO no contexto de ciclos de mercado?', verso: 'O medo de ficar de fora (Fear Of Missing Out), um gatilho emocional que frequentemente leva investidores a entrar tardiamente em movimentos de euforia, próximos ao pico do ciclo.' },
    { id: 'hgi-07', frente: 'Por que estudar apenas os resultados financeiros de grandes investidores é insuficiente?', verso: 'Porque não revela o raciocínio e a disciplina que sustentaram as decisões ao longo de décadas e múltiplos ciclos de mercado, informação essencial para aplicar os mesmos princípios de forma consistente.' },
    { id: 'hgi-08', frente: 'O que os padrões de bolhas especulativas ao longo da história têm em comum?', verso: 'Uma fase de euforia coletiva com justificativas de que "dessa vez é diferente", seguida de valorização desconectada de fundamentos e, eventualmente, uma correção brusca de preços.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o erro mais caro ao estudar a história de grandes investidores, segundo o módulo?',
      alternativas: [
        'Estudar os princípios de decisão usados ao longo do tempo',
        'Tentar replicar literalmente escolhas específicas de ativos feitas décadas atrás, ignorando mudanças de contexto econômico',
        'Reconhecer padrões recorrentes de bolhas especulativas',
        'Adaptar princípios históricos ao contexto de mercado atual'
      ],
      correta: 1,
      explicacao: 'O contexto econômico, taxas de juros e oportunidades disponíveis mudam significativamente ao longo das décadas — o valor histórico está nos princípios de raciocínio e disciplina, não nas escolhas específicas de ativos feitas em outra época.'
    },
    {
      pergunta: 'O que é margem de segurança, conceito central do investimento em valor desenvolvido ainda nas décadas de 1920 e 1930?',
      alternativas: [
        'Uma taxa de seguro cobrada sobre investimentos de risco',
        'Comprar um ativo por um preço significativamente abaixo do seu valor intrínseco estimado',
        'Um limite legal de exposição a ações estabelecido pela CVM',
        'A garantia do FGC sobre investimentos de renda fixa'
      ],
      correta: 1,
      explicacao: 'Margem de segurança é a prática de comprar com desconto em relação ao valor intrínseco estimado do ativo, criando uma proteção contra erros de avaliação ou eventos imprevistos que possam afetar negativamente o investimento.'
    },
    {
      pergunta: 'Qual frase, segundo padrões históricos recorrentes, costuma anteceder diversas bolhas especulativas de mercado?',
      alternativas: [
        '"O mercado está em baixa"',
        '"Dessa vez é diferente"',
        '"Investimentos de risco não valem a pena"',
        '"A inflação está sob controle"'
      ],
      correta: 1,
      explicacao: 'A justificativa de que os padrões tradicionais de avaliação não se aplicam mais a um momento específico — "dessa vez é diferente" — tem se repetido historicamente antes de diversas correções bruscas de mercado ao longo de quase um século.'
    },
    {
      pergunta: 'Por que estudar apenas os resultados financeiros de grandes investidores, sem entender seu raciocínio, é considerado insuficiente?',
      alternativas: [
        'Porque resultados financeiros nunca são divulgados publicamente',
        'Porque não revela a disciplina e o processo de decisão que sustentaram resultados consistentes ao longo de múltiplos ciclos de mercado',
        'Porque grandes investidores nunca divulgam seus resultados históricos',
        'Porque resultados financeiros são sempre fraudulentos'
      ],
      correta: 1,
      explicacao: 'O valor de estudar a história de grandes investidores está em entender o processo de decisão e a disciplina comportamental que sustentaram resultados consistentes, informação que não aparece apenas nos números finais de retorno obtido.'
    },
    {
      pergunta: 'O que caracteriza o efeito FOMO em ciclos de mercado historicamente observados?',
      alternativas: [
        'A análise cuidadosa de fundamentos antes de qualquer decisão de investimento',
        'O medo de ficar de fora de um movimento de valorização, levando a entradas tardias próximas ao pico do ciclo',
        'A disciplina de manter margem de segurança em qualquer decisão',
        'Um indicador técnico usado para prever recessões econômicas'
      ],
      correta: 1,
      explicacao: 'FOMO (Fear Of Missing Out) é o gatilho emocional que leva investidores a entrarem tardiamente em movimentos de euforia, frequentemente próximos ao pico do ciclo, justamente no momento de maior risco de uma correção subsequente.'
    },
    {
      pergunta: 'O que é vantagem competitiva duradoura (moat), conceito expandido por gerações de investidores após os princípios iniciais de investimento em valor?',
      alternativas: [
        'Um tipo específico de ação preferencial negociada na bolsa',
        'Uma característica estrutural que protege uma empresa da concorrência ao longo do tempo, sustentando rentabilidade superior',
        'Um imposto cobrado sobre empresas com posição dominante de mercado',
        'Um índice usado exclusivamente para medir volatilidade de mercado'
      ],
      correta: 1,
      explicacao: 'O conceito de vantagem competitiva duradoura amplia o investimento em valor além de apenas buscar ativos numericamente baratos, incorporando a análise de proteções estruturais que sustentam a rentabilidade de uma empresa ao longo de décadas.'
    }
  ],

  faq: [
    { pergunta: 'Estudar história de investimentos ajuda a prever o próximo ciclo de mercado?', resposta: 'Não de forma precisa — a história ajuda a reconhecer padrões recorrentes (como sinais de euforia excessiva) e a manter disciplina comportamental, mas não permite prever com exatidão quando ou como o próximo ciclo específico vai se desenrolar.' },
    { pergunta: 'Os princípios de investimento em valor desenvolvidos há quase um século ainda fazem sentido hoje?', resposta: 'Os princípios centrais (valor intrínseco, margem de segurança, disciplina comportamental) permanecem amplamente relevantes, embora a aplicação prática precise se adaptar a mudanças estruturais do mercado, novos setores econômicos e ferramentas de análise disponíveis atualmente.' },
    { pergunta: 'Por que tantas bolhas especulativas ao longo da história compartilham padrões parecidos, mesmo em setores completamente diferentes?', resposta: 'Porque os padrões comportamentais humanos por trás desses ciclos — euforia coletiva, medo de ficar de fora, dificuldade de avaliar riscos durante períodos de forte otimismo — permanecem substancialmente os mesmos, independente do ativo ou setor específico envolvido em cada época.' },
    { pergunta: 'É possível identificar uma bolha especulativa em tempo real, enquanto ela está acontecendo?', resposta: 'É extremamente difícil identificar com certeza em tempo real, já que muitas justificativas de valorização parecem razoáveis no momento — a história mostra que mesmo investidores experientes frequentemente subestimam ou superestimam a duração desses movimentos.' },
    { pergunta: 'Qual é a diferença entre estudar história de investimentos e apenas seguir modismos de mercado?', resposta: 'Estudar história de investimentos busca entender princípios de decisão e padrões comportamentais recorrentes de forma crítica; seguir modismos significa reagir passivamente ao movimento do momento, sem essa análise crítica de fundamentos e contexto histórico mais amplo.' },
    { pergunta: 'Vale a pena estudar investidores que tiveram períodos de resultados ruins ao longo da carreira?', resposta: 'Sim, e é especialmente valioso — entender como investidores historicamente bem-sucedidos lidaram com períodos de resultados abaixo da média, sem abandonar seus princípios, oferece lições importantes sobre disciplina e paciência de longo prazo.' }
  ]
}
