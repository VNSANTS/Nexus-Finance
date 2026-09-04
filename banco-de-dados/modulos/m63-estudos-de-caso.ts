// m03-estudos-de-caso.ts
import { Modulo } from '@/types'

export const estudosDeCaso: Modulo = {
  id: 'estudos-de-caso',
  trilhaId: 'cultura-investimentos',
  numero: 3,
  titulo: 'Estudos de Caso de Empresas',
  subtitulo: 'Como decisões reais de investimento se desenrolaram — o que deu certo, o que deu errado, e por quê',
  iconName: 'FileSearch',
  duracaoMin: 14,

  nivel: 'avancado',
  preRequisitos: ['empresas-negocios', 'biografias-investidores'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar sua própria análise de um estudo de caso empresarial, identificando quais fatores foram determinantes no resultado final de uma decisão de investimento.',
  erroFatal: 'Analisar um estudo de caso apenas com viés de retrospecto (hindsight bias), tratando um resultado que já é conhecido como se fosse óbvio ou previsível no momento da decisão — isso impede extrair lições reais de processo de análise, e cria uma falsa sensação de que os sinais de alerta eram claros o suficiente para qualquer um perceber antes do resultado se concretizar.',
  numeroChave: { valor: 'hindsight bias', legenda: 'viés cognitivo que faz eventos passados parecerem mais previsíveis do que realmente eram no momento em que aconteceram — um dos maiores obstáculos para extrair lições genuínas de estudos de caso de investimento' },
  glossarioDoModulo: ['Hindsight bias (viés de retrospecto)', 'Due diligence', 'Tese de investimento', 'Sinais de alerta (red flags)', 'Governança corporativa', 'Análise fundamentalista aplicada'],
  proximoPasso: { moduloId: 'documentarios', motivo: 'Depois de estudar casos específicos de empresas em profundidade, documentários sobre economia oferecem outra forma de explorar essas mesmas dinâmicas de mercado, de forma mais narrativa e acessível.' },

  aprender: {
    oQueE: 'Estudo de caso de empresas é a análise aprofundada de uma situação real de investimento — seja um sucesso notável, um fracasso relevante, ou uma situação ambígua com lições em ambas as direções — buscando entender os fatores que efetivamente determinaram o resultado final. Diferente de estudar princípios gerais de forma abstrata, o estudo de caso trabalha com a complexidade real de uma decisão específica: informações disponíveis (e indisponíveis) no momento, incertezas genuínas enfrentadas pelos envolvidos, e como diferentes fatores interagiram ao longo do tempo até chegar ao resultado observado posteriormente.',
    porQueImporta: 'Sem uma metodologia estruturada de análise, é fácil cair no viés de retrospecto: olhar para um caso já conhecido (uma empresa que faliu, ou que teve sucesso excepcional) e assumir que os sinais eram óbvios, quando na verdade, no momento da decisão, a situação envolvia incerteza genuína e informação incompleta. Estudar casos reais de forma metodologicamente cuidadosa — reconstituindo o que era efetivamente conhecível no momento da decisão, não o que sabemos hoje em retrospecto — desenvolve a capacidade de análise crítica aplicável a decisões futuras, que sempre envolverão esse mesmo tipo de incerteza genuína.',
    naPratica: 'Uma análise estruturada de estudo de caso geralmente segue algumas etapas: primeiro, reconstituir o contexto e as informações disponíveis no momento da decisão original, sem contaminar essa reconstituição com o conhecimento do resultado final. Em seguida, identificar a tese de investimento original — o raciocínio específico que levou àquela decisão — e avaliar se essa tese fazia sentido com as informações disponíveis na época, independente de ter se confirmado ou não posteriormente. Depois, analisar os sinais de alerta que existiam (mesmo que sutis ou ambíguos) e se eles eram genuinamente identificáveis no momento, ou se só ficaram claros em retrospecto. Casos de fracasso corporativo frequentemente revelam, em análise cuidadosa, sinais relacionados a governança corporativa frágil (conflitos de interesse não adequadamente geridos, falta de transparência em demonstrativos financeiros) que, embora presentes, exigiam investigação ativa para serem percebidos, não sendo necessariamente óbvios para todos os investidores do mercado na época.',
    passoAPasso: [
      'Escolha um estudo de caso específico, buscando fontes que documentem o contexto histórico completo, não apenas o resultado final já conhecido.',
      'Reconstitua as informações que estavam genuinamente disponíveis no momento da decisão original, resistindo à tentação de usar conhecimento posterior nessa reconstituição.',
      'Identifique a tese de investimento original: qual era o raciocínio específico que motivou a decisão analisada.',
      'Avalie se essa tese fazia sentido com as informações disponíveis na época, separando isso do julgamento sobre se o resultado final foi bom ou ruim.',
      'Busque sinais de alerta que existiam no momento, avaliando honestamente se eram genuinamente identificáveis então, ou se só parecem óbvios agora, em retrospecto.',
      'Extraia lições de processo de análise (não apenas "essa decisão foi boa ou ruim") que sejam aplicáveis a decisões futuras em contextos diferentes.'
    ],
    errosComuns: [
      'Analisar um caso com viés de retrospecto, tratando o resultado conhecido como se fosse óbvio ou previsível no momento da decisão original.',
      'Focar apenas no resultado final (sucesso ou fracasso), sem analisar a qualidade do processo de decisão e das informações disponíveis na época.',
      'Ignorar a diferença entre sorte e habilidade — um resultado positivo não significa necessariamente que o processo de decisão foi rigoroso, assim como um resultado negativo não significa automaticamente que a decisão foi mal fundamentada.',
      'Buscar apenas casos de sucesso extremo ou fracasso extremo, negligenciando casos ambíguos, que frequentemente oferecem lições mais sutis e aplicáveis.',
      'Não considerar o contexto macroeconômico e setorial específico da época analisada, tratando o caso como se fosse isolado de fatores externos relevantes.',
      'Extrair lições excessivamente específicas de um único caso, tratando-as como regras universais aplicáveis a qualquer situação futura, sem considerar as particularidades de cada contexto.'
    ],
    comparativo: {
      titulo: 'Análise com viés de retrospecto vs. análise metodologicamente cuidadosa',
      linhas: [
        { label: 'Ponto de partida', valor: 'Com viés: parte do resultado conhecido | Cuidadosa: reconstitui informações disponíveis na época' },
        { label: 'Tratamento de sinais de alerta', valor: 'Com viés: trata como óbvios em retrospecto | Cuidadosa: avalia se eram genuinamente identificáveis então' },
        { label: 'Foco da análise', valor: 'Com viés: resultado final (bom ou ruim) | Cuidadosa: qualidade do processo de decisão' },
        { label: 'Valor para decisões futuras', valor: 'Com viés: baixo, gera falsa confiança | Cuidadosa: alto, desenvolve análise crítica aplicável' }
      ]
    },
    checklist: [
      'Ao estudar um caso, busque fontes que documentem o contexto completo da época, não apenas o resultado final.',
      'Reconstitua as informações disponíveis no momento da decisão, evitando contaminar essa análise com conhecimento posterior.',
      'Avalie a qualidade do processo de decisão separadamente do resultado final observado.',
      'Considere o contexto macroeconômico e setorial específico da época analisada.',
      'Extraia lições de processo aplicáveis a decisões futuras, evitando regras excessivamente específicas de um único caso.'
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman discute extensamente o viés de retrospecto — a tendência de julgar decisões passadas como óbvias depois que já sabemos o resultado — que é exatamente o risco que este módulo pede para evitar ao reconstituir um caso.',
    },
    naoConfundirCom: [
      { moduloId: 'biografias-investidores', diferenca: 'Biografias de Investidores foca na trajetória de pessoas específicas ao longo de décadas; Estudos de Caso de Empresas foca em situações e decisões específicas, com contexto e resultado documentados, podendo envolver múltiplos investidores ou apenas a dinâmica da própria empresa.' },
      { moduloId: 'empresas-negocios', diferenca: 'Empresas e Negócios ensina a mecânica de leitura de demonstrativos financeiros; Estudos de Caso aplica essa e outras análises a situações reais e específicas, incluindo o contexto histórico e o processo de decisão envolvido.' }
    ]
  },

  mapaMental: {
    label: 'Estudos de Caso de Empresas',
    subtitulo: 'Metodologia de análise crítica de decisões reais de investimento',
    ramos: [
      {
        id: 'metodologia',
        label: 'Metodologia de Análise',
        cor: '#3B82F6',
        resumo: 'Como estruturar o estudo de um caso real',
        filhos: [
          { label: 'Reconstituição de contexto', desc: 'Informações genuinamente disponíveis no momento da decisão' },
          { label: 'Tese de investimento original', desc: 'O raciocínio específico que motivou a decisão analisada' },
          { label: 'Avaliação de processo', desc: 'Separar qualidade da decisão do resultado final observado' }
        ]
      },
      {
        id: 'vieses-a-evitar',
        label: 'Vieses a Evitar',
        cor: '#EF4444',
        resumo: 'Armadilhas comuns na análise de casos já conhecidos',
        filhos: [
          { label: 'Hindsight bias', desc: 'Tratar o resultado conhecido como se fosse óbvio no momento' },
          { label: 'Confusão entre sorte e habilidade', desc: 'Resultado positivo não implica necessariamente processo rigoroso' },
          { label: 'Generalização excessiva', desc: 'Tratar lições de um caso específico como regras universais' }
        ]
      },
      {
        id: 'sinais-de-alerta',
        label: 'Sinais de Alerta',
        cor: '#F59E0B',
        resumo: 'O que investigar em casos de fracasso corporativo',
        filhos: [
          { label: 'Governança frágil', desc: 'Conflitos de interesse não adequadamente geridos' },
          { label: 'Falta de transparência', desc: 'Demonstrativos financeiros pouco claros ou inconsistentes' },
          { label: 'Identificabilidade real', desc: 'Avaliar se o sinal era genuinamente perceptível na época' }
        ]
      },
      {
        id: 'aplicacao-de-licoes',
        label: 'Aplicação de Lições',
        cor: '#22C55E',
        resumo: 'Como transformar o estudo de caso em aprendizado útil',
        filhos: [
          { label: 'Lições de processo', desc: 'Aplicáveis a decisões futuras, independente do resultado específico' },
          { label: 'Contexto macroeconômico', desc: 'Considerar fatores externos relevantes de cada época analisada' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia abordagens de análise de estudos de caso empresariais e vê o resultado esperado de cada uma, considerando os princípios de análise crítica sem viés de retrospecto.',
    passos: [
      'Leia a situação envolvendo uma decisão de análise de estudo de caso.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios metodológicos de estudo de caso.'
    ],
    exemploGuiado: 'Um investidor está estudando o caso de uma empresa que enfrentou dificuldades financeiras relevantes anos depois de ter sido considerada uma das mais promissoras do seu setor. Ao pesquisar apenas fontes que já conhecem o desfecho, ele encontra diversas análises retrospectivas apontando "sinais claros" de que o problema estava por vir. Antes de aceitar essa narrativa, ele busca reportagens e relatórios financeiros contemporâneos à época da decisão original, anteriores ao problema se manifestar publicamente. Ao fazer essa reconstituição cuidadosa, percebe que os sinais mencionados nas análises retrospectivas eram, de fato, mencionados en passant em notas de rodapé de relatórios técnicos da época, mas não eram destacados como preocupação central por analistas de mercado no momento — uma diferença importante entre "o sinal existia tecnicamente" e "o sinal era amplamente reconhecido como preocupante" no momento da decisão original.',
    cenarioGuiado: [
      {
        pergunta: 'Você está estudando o caso de uma empresa que teve resultado financeiro muito negativo anos depois de uma decisão de investimento específica.',
        opcoes: [
          { texto: 'Assumo que os sinais de alerta eram óbvios, já que hoje sabemos o resultado final', resultado: 'Esse é o clássico viés de retrospecto (hindsight bias) — tratar o resultado conhecido como se fosse previsível na época impede extrair lições genuínas sobre como avaliar decisões sob incerteza real, sem o benefício de já saber o desfecho.' },
          { texto: 'Busco reconstituir quais informações estavam genuinamente disponíveis e destacadas no momento da decisão original', resultado: 'Essa reconstituição cuidadosa, resistindo à tentação de usar o conhecimento posterior, é essencial para avaliar de forma justa a qualidade do processo de decisão original e extrair lições aplicáveis a situações futuras de incerteza genuína.' }
        ]
      },
      {
        pergunta: 'Você encontra um caso de investimento que teve resultado extremamente positivo, e quer entender os fatores por trás desse sucesso.',
        opcoes: [
          { texto: 'Assumo que o processo de decisão foi necessariamente rigoroso, já que o resultado final foi excelente', resultado: 'Resultado positivo não implica automaticamente que o processo de decisão foi rigoroso — é importante avaliar separadamente se havia uma tese bem fundamentada, ou se fatores de sorte tiveram peso relevante no resultado observado.' },
          { texto: 'Analiso separadamente a qualidade do processo de decisão e o resultado final obtido', resultado: 'Separar a qualidade do processo de decisão do resultado final é fundamental para extrair lições genuinamente aplicáveis, já que até decisões bem fundamentadas podem ter resultados ruins por fatores imprevisíveis, e o oposto também é verdadeiro.' }
        ]
      },
      {
        pergunta: 'Ao estudar um caso específico de sucesso empresarial, você identifica uma lição interessante sobre um setor específico.',
        opcoes: [
          { texto: 'Trato essa lição como uma regra universal, aplicável a qualquer empresa ou setor no futuro', resultado: 'Generalizar excessivamente uma lição extraída de um único caso específico, sem considerar o contexto macroeconômico e setorial daquela época, pode levar a decisões equivocadas em contextos muito diferentes no futuro.' },
          { texto: 'Considero o contexto específico daquele caso antes de avaliar como (e se) essa lição se aplica a outras situações', resultado: 'Avaliar o contexto específico de cada estudo de caso, incluindo fatores macroeconômicos e setoriais da época, ajuda a extrair lições mais matizadas e genuinamente aplicáveis, evitando generalizações precipitadas.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'edc-01', frente: 'O que é hindsight bias (viés de retrospecto)?', verso: 'O viés cognitivo que faz eventos passados parecerem mais previsíveis do que realmente eram no momento em que aconteceram, dificultando a análise justa de decisões tomadas sob incerteza genuína.' },
    { id: 'edc-02', frente: 'Por que é importante reconstituir as informações disponíveis no momento da decisão original, ao estudar um caso?', verso: 'Porque analisar o caso com conhecimento do resultado final contamina a avaliação da qualidade real do processo de decisão, impedindo extrair lições genuínas aplicáveis a situações futuras de incerteza.' },
    { id: 'edc-03', frente: 'O que é tese de investimento?', verso: 'O raciocínio específico e fundamentado que motivou uma decisão de investimento, incluindo as premissas e expectativas que embasaram essa escolha no momento em que foi feita.' },
    { id: 'edc-04', frente: 'Por que resultado positivo não implica automaticamente processo de decisão rigoroso?', verso: 'Porque fatores de sorte podem ter peso relevante em resultados observados, mesmo quando o processo de análise original não foi particularmente cuidadoso ou bem fundamentado.' },
    { id: 'edc-05', frente: 'Qual é o erro mais caro ao analisar estudos de caso, segundo o módulo?', verso: 'Analisar o caso com viés de retrospecto, tratando o resultado já conhecido como se fosse óbvio ou previsível no momento da decisão original.' },
    { id: 'edc-06', frente: 'O que costuma caracterizar sinais de alerta em casos de fracasso corporativo?', verso: 'Frequentemente relacionados a governança corporativa frágil e falta de transparência em demonstrativos financeiros, exigindo investigação ativa para serem percebidos, nem sempre óbvios para todo o mercado na época.' },
    { id: 'edc-07', frente: 'Por que generalizar excessivamente lições de um único caso é considerado um erro?', verso: 'Porque cada estudo de caso tem um contexto macroeconômico e setorial específico, e tratar lições muito particulares como regras universais pode levar a decisões equivocadas em contextos futuros diferentes.' },
    { id: 'edc-08', frente: 'Qual deve ser o foco principal de uma análise metodologicamente cuidadosa de estudo de caso?', verso: 'A qualidade do processo de decisão diante das informações disponíveis na época, separadamente da avaliação do resultado final observado posteriormente.' }
  ],

  quiz: [
    {
      pergunta: 'O que é hindsight bias (viés de retrospecto), e por que ele é considerado o erro mais caro na análise de estudos de caso?',
      alternativas: [
        'Um indicador técnico usado para prever resultados futuros de investimentos',
        'O viés que faz eventos passados parecerem mais previsíveis do que realmente eram, impedindo análise justa de decisões tomadas sob incerteza genuína',
        'Um tipo de taxa cobrada em análises financeiras retrospectivas',
        'Uma metodologia recomendada para prever crises financeiras futuras'
      ],
      correta: 1,
      explicacao: 'O hindsight bias distorce a análise ao tratar sinais que só ficaram claros em retrospecto como se fossem óbvios no momento da decisão original, impedindo extrair lições genuínas sobre como avaliar situações de incerteza real.'
    },
    {
      pergunta: 'Por que é importante reconstituir as informações genuinamente disponíveis no momento de uma decisão original, ao estudar um caso?',
      alternativas: [
        'Porque essa reconstituição é sempre impossível de ser feita com precisão',
        'Porque evita contaminar a análise com o conhecimento posterior do resultado final, permitindo avaliar de forma justa a qualidade do processo de decisão',
        'Porque é uma exigência legal para publicação de estudos de caso',
        'Porque apenas assim é possível calcular o retorno financeiro exato da decisão'
      ],
      correta: 1,
      explicacao: 'Reconstituir o contexto informacional da época, sem usar conhecimento posterior, é essencial para avaliar se a decisão original foi bem fundamentada diante da incerteza genuína enfrentada no momento, independente do resultado final observado depois.'
    },
    {
      pergunta: 'Por que resultado financeiro positivo de uma decisão de investimento não implica automaticamente que o processo de decisão foi rigoroso?',
      alternativas: [
        'Porque resultados positivos são sempre fraudulentos',
        'Porque fatores de sorte podem ter peso relevante no resultado observado, independente da qualidade da análise original',
        'Porque resultados positivos nunca podem ser estudados como casos de sucesso',
        'Porque apenas resultados negativos merecem análise aprofundada'
      ],
      correta: 1,
      explicacao: 'É importante separar a avaliação da qualidade do processo de decisão do resultado final observado — decisões bem fundamentadas podem ter resultados ruins por fatores imprevisíveis, assim como decisões pouco criteriosas podem, por sorte, gerar resultados positivos.'
    },
    {
      pergunta: 'O que frequentemente caracteriza sinais de alerta identificados em análises cuidadosas de casos de fracasso corporativo?',
      alternativas: [
        'Sempre são completamente óbvios e amplamente divulgados no momento em que ocorrem',
        'Frequentemente relacionados a governança corporativa frágil e falta de transparência, exigindo investigação ativa para serem percebidos',
        'Nunca estão presentes em nenhum documento público da época',
        'São sempre idênticos entre diferentes casos de fracasso corporativo'
      ],
      correta: 1,
      explicacao: 'Sinais de alerta relacionados a governança frágil ou falta de transparência costumam exigir investigação ativa e cuidadosa para serem percebidos, não sendo necessariamente óbvios para todo o mercado no momento em que a decisão estava sendo tomada.'
    },
    {
      pergunta: 'Por que generalizar excessivamente uma lição extraída de um único estudo de caso é considerado um erro comum?',
      alternativas: [
        'Porque estudos de caso nunca oferecem lições aplicáveis a outras situações',
        'Porque cada caso tem contexto macroeconômico e setorial específico, e tratar lições particulares como regras universais pode levar a decisões equivocadas em contextos diferentes',
        'Porque é proibido comparar diferentes casos entre si',
        'Porque lições de estudos de caso só se aplicam à mesma empresa estudada'
      ],
      correta: 1,
      explicacao: 'Cada estudo de caso se desenrola num contexto específico — tratar lições muito particulares daquele contexto como regras universais, sem considerar diferenças macroeconômicas e setoriais, pode levar a aplicações equivocadas em situações futuras distintas.'
    },
    {
      pergunta: 'Qual deve ser o foco principal de uma análise metodologicamente cuidadosa de um estudo de caso empresarial?',
      alternativas: [
        'Apenas o resultado financeiro final observado, positivo ou negativo',
        'A qualidade do processo de decisão diante das informações disponíveis na época, separadamente do resultado final',
        'Somente a reputação da empresa no mercado atual',
        'Exclusivamente a opinião de analistas de mercado sobre o caso hoje'
      ],
      correta: 1,
      explicacao: 'Uma análise cuidadosa avalia a qualidade do processo de decisão e o raciocínio original com base nas informações disponíveis na época, tratando essa avaliação separadamente do resultado final observado posteriormente, que pode ter sido influenciado por fatores imprevisíveis.'
    }
  ],

  faq: [
    { pergunta: 'Onde encontrar fontes contemporâneas confiáveis para reconstituir o contexto de um estudo de caso antigo?', resposta: 'Arquivos de jornais e revistas especializadas da época, relatórios financeiros originais divulgados publicamente, e registros de analistas de mercado contemporâneos à decisão são fontes mais confiáveis do que análises retrospectivas escritas após o resultado final já ser conhecido.' },
    { pergunta: 'É possível eliminar completamente o viés de retrospecto ao estudar um caso já conhecido?', resposta: 'Eliminar completamente é praticamente impossível, já que o pesquisador sabe o resultado final antes de começar a análise — mas buscar ativamente fontes contemporâneas à decisão original e questionar constantemente se um sinal era genuinamente destacado ou apenas mencionado de forma marginal na época ajuda a reduzir significativamente esse viés.' },
    { pergunta: 'Estudos de caso de fracasso são mais valiosos que estudos de caso de sucesso?', resposta: 'Ambos oferecem lições valiosas quando analisados com metodologia cuidadosa — casos de fracasso costumam revelar sinais de alerta e problemas de governança, enquanto casos de sucesso ajudam a entender teses de investimento bem fundamentadas, mas nenhum dos dois tipos deve ser estudado apenas pelo resultado final.' },
    { pergunta: 'Como diferencio um sinal de alerta genuinamente identificável de algo que só parece óbvio em retrospecto?', resposta: 'Verifique se esse sinal era destacado como preocupação central por analistas e pela imprensa especializada na época, ou se aparecia apenas de forma marginal (como uma nota de rodapé em relatório técnico) sem receber atenção significativa do mercado no momento da decisão original.' },
    { pergunta: 'Vale a pena estudar casos de empresas de setores muito diferentes do meu interesse principal de investimento?', resposta: 'Sim — lições de processo de análise (como identificar sinais de governança frágil ou avaliar teses de investimento com rigor) costumam ser aplicáveis entre diferentes setores, mesmo que os detalhes específicos de cada negócio sejam distintos.' },
    { pergunta: 'Estudos de caso substituem a necessidade de fazer minha própria due diligence antes de investir?', resposta: 'Não. Estudos de caso desenvolvem a capacidade de análise crítica e ajudam a reconhecer padrões, mas cada nova decisão de investimento exige due diligence própria e específica, já que cada situação envolve um conjunto particular de informações e incertezas genuínas.' }
  ]
}
