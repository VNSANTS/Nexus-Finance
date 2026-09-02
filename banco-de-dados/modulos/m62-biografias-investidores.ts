// m02-biografias-investidores.ts
import { Modulo } from '@/types'

export const biografiasInvestidores: Modulo = {
  id: 'biografias-investidores',
  trilhaId: 'cultura-investimentos',
  numero: 2,
  titulo: 'Biografias de Investidores',
  subtitulo: 'Trajetórias reais, com seus acertos e erros — o que cada uma ensina de forma diferente',
  iconName: 'UserCheck',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['historia-grandes-investidores'],
  objetivoAprendizagem: 'Você vai sair sabendo identificar, nas trajetórias de investidores reais, quais decisões foram fruto de processo replicável e quais foram específicas do contexto pessoal e histórico de cada um.',
  erroFatal: 'Idolatrar um único investidor de referência a ponto de adotar cegamente todas as suas opiniões e decisões atuais, sem senso crítico — mesmo investidores com décadas de resultados consistentes já cometeram erros relevantes ao longo da carreira, e nenhuma trajetória individual deveria ser seguida sem análise própria e independente.',
  numeroChave: { valor: 'décadas', legenda: 'o horizonte de tempo comum às trajetórias de praticamente todos os investidores considerados historicamente bem-sucedidos — não existe biografia relevante de sucesso consistente construída em poucos anos' },
  glossarioDoModulo: ['Filosofia de investimento', 'Concentração vs. diversificação', 'Círculo de competência', 'Paciência ativa', 'Aprendizado com erros', 'Alocação de capital'],
  proximoPasso: { moduloId: 'estudos-de-caso', motivo: 'Depois de conhecer trajetórias individuais de investidores, o próximo passo é aplicar essa mesma lente analítica a estudos de caso específicos de empresas, entendendo decisões de investimento em contextos concretos.' },

  aprender: {
    oQueE: 'Biografias de investidores são o estudo das trajetórias individuais de profissionais que construíram resultados consistentes e documentados ao longo de décadas no mercado financeiro, incluindo não apenas os sucessos, mas também os erros, mudanças de estratégia e períodos difíceis que fizeram parte do caminho. Diferente de estudar apenas princípios gerais de investimento, a biografia individual revela como uma filosofia de investimento específica se desenvolveu ao longo do tempo, moldada por experiências pessoais, erros cometidos e ajustes de estratégia diante de diferentes contextos de mercado.',
    porQueImporta: 'Conhecer trajetórias reais e completas — com decisões certas e erradas — ajuda a desmistificar a ideia de que investidores bem-sucedidos acertam sempre ou seguem uma fórmula infalível. Isso é importante porque protege o investidor iniciante de duas armadilhas comuns: desistir cedo demais ao cometer os primeiros erros (achando que investidores de referência nunca erraram) ou, no extremo oposto, idolatrar cegamente uma figura específica, replicando decisões atuais sem entender o contexto e o processo de raciocínio por trás delas.',
    naPratica: 'Ao estudar biografias de investidores reconhecidos, é possível observar padrões comuns apesar de filosofias de investimento distintas: praticamente todos desenvolveram um "círculo de competência" bem definido, evitando investir em áreas que não entendiam profundamente, mesmo quando essas áreas estavam em alta euforia de mercado. A maioria também passou por períodos de resultados abaixo da média do mercado, às vezes por vários anos consecutivos, antes de serem reconhecidos por resultados consistentes no longo prazo — o que exigiu tanto convicção na própria filosofia quanto disposição para reconhecer e corrigir erros específicos ao longo do caminho. Diferenças relevantes também aparecem: alguns investidores historicamente se destacaram por carteiras mais concentradas em poucas posições de altíssima convicção, enquanto outros construíram resultados consistentes com maior diversificação — mostrando que não existe uma única filosofia "correta", mas sim diferentes abordagens compatíveis com diferentes perfis e contextos.',
    passoAPasso: [
      'Ao estudar a biografia de um investidor, busque entender tanto os acertos quanto os erros documentados ao longo da carreira, não apenas os resultados finais de sucesso.',
      'Identifique o círculo de competência específico de cada investidor — as áreas em que ele desenvolveu conhecimento profundo e evitava investir fora delas.',
      'Observe como cada investidor lidou com períodos de resultados abaixo da média do mercado, sem abandonar sua filosofia central de investimento.',
      'Compare diferentes filosofias (concentração vs. diversificação, foco em valor vs. foco em crescimento) para entender que múltiplas abordagens podem gerar resultados consistentes, dependendo do contexto e perfil do investidor.',
      'Evite adotar cegamente as opiniões atuais de qualquer investidor de referência sem analisar criticamente se elas fazem sentido para seu próprio contexto e objetivos.',
      'Extraia princípios de processo (como disciplina, paciência e reconhecimento de erros) que sejam aplicáveis independente do contexto específico de mercado em que a biografia se desenrolou.'
    ],
    errosComuns: [
      'Idolatrar um único investidor de referência a ponto de replicar cegamente suas decisões atuais, sem senso crítico próprio.',
      'Estudar apenas os sucessos de uma trajetória, ignorando os erros e períodos difíceis que também fizeram parte do processo.',
      'Assumir que a filosofia de investimento de uma pessoa específica é a única forma "correta" de investir, desconsiderando outras abordagens igualmente válidas.',
      'Desistir de uma estratégia própria cedo demais, ao comparar resultados de curto prazo com o histórico de décadas de investidores de referência.',
      'Ignorar o círculo de competência de investidores estudados, tentando replicar decisões em áreas totalmente diferentes daquelas em que o investidor original tinha profundidade de conhecimento.',
      'Tratar declarações públicas recentes de um investidor de referência como verdade absoluta, sem considerar que até profissionais experientes podem errar ou mudar de opinião ao longo do tempo.'
    ],
    comparativo: {
      titulo: 'Diferentes filosofias observadas em trajetórias de investidores reconhecidos',
      linhas: [
        { label: 'Carteira concentrada', valor: 'Características: poucas posições de altíssima convicção | Exige: profundo conhecimento específico de cada ativo' },
        { label: 'Carteira diversificada', valor: 'Características: muitas posições, menor exposição individual a cada uma | Exige: processo sistemático de seleção' },
        { label: 'Foco em valor', valor: 'Características: busca por ativos abaixo do valor intrínseco estimado | Exige: paciência para o mercado reconhecer o valor' },
        { label: 'Foco em crescimento', valor: 'Características: busca por empresas com forte potencial de expansão futura | Exige: tolerância a maior volatilidade de curto prazo' }
      ]
    },
    checklist: [
      'Ao estudar qualquer biografia de investidor, busque informações sobre erros e períodos difíceis, não apenas os sucessos.',
      'Identifique o círculo de competência específico de cada investidor estudado.',
      'Compare diferentes filosofias de investimento para entender que existem múltiplos caminhos válidos.',
      'Evite adotar decisões atuais de qualquer investidor de referência sem análise crítica própria.',
      'Extraia princípios de processo e disciplina aplicáveis ao seu próprio contexto, em vez de apenas resultados específicos.'
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Philip Fisher é ele mesmo um dos investidores cuja trajetória e filosofia valem estudo — o livro mostra o processo de decisão por trás dos resultados, exatamente o tipo de lição que este módulo pede para extrair de qualquer biografia.',
    },
    naoConfundirCom: [
      { moduloId: 'historia-grandes-investidores', diferenca: 'História de Grandes Investidores foca em padrões e princípios recorrentes ao longo de décadas de mercado; Biografias de Investidores aprofunda trajetórias individuais específicas, incluindo contexto pessoal e erros de cada investidor.' },
      { moduloId: 'estudos-de-caso', diferenca: 'Este módulo foca nas trajetórias de pessoas específicas; Estudos de Caso de Empresas foca na análise de decisões de investimento aplicadas a empresas e situações de mercado específicas.' }
    ]
  },

  mapaMental: {
    label: 'Biografias de Investidores',
    subtitulo: 'O que trajetórias reais, com acertos e erros, ensinam',
    ramos: [
      {
        id: 'elementos-comuns',
        label: 'Elementos Comuns',
        cor: '#3B82F6',
        resumo: 'Padrões que aparecem apesar de filosofias distintas',
        filhos: [
          { label: 'Círculo de competência', desc: 'Foco em áreas de conhecimento profundo, evitando o que não entendem bem' },
          { label: 'Horizonte de décadas', desc: 'Resultados consistentes construídos ao longo de muitos anos, não de forma rápida' },
          { label: 'Disciplina sob pressão', desc: 'Manutenção da filosofia mesmo em períodos de resultado abaixo da média' }
        ]
      },
      {
        id: 'diferencas-de-filosofia',
        label: 'Diferenças de Filosofia',
        cor: '#F59E0B',
        resumo: 'Como diferentes abordagens geraram resultados consistentes',
        filhos: [
          { label: 'Concentração', desc: 'Poucas posições de altíssima convicção' },
          { label: 'Diversificação', desc: 'Muitas posições, processo mais sistemático' },
          { label: 'Valor vs. crescimento', desc: 'Diferentes critérios de seleção de ativos' }
        ]
      },
      {
        id: 'erros-e-aprendizado',
        label: 'Erros e Aprendizado',
        cor: '#EF4444',
        resumo: 'Parte inseparável de qualquer trajetória real',
        filhos: [
          { label: 'Decisões equivocadas documentadas', desc: 'Mesmo investidores de referência já erraram de forma relevante' },
          { label: 'Ajuste de estratégia', desc: 'Mudanças de abordagem diante de novos aprendizados ao longo da carreira' },
          { label: 'Reconhecimento público de erro', desc: 'Postura de transparência sobre decisões que não deram certo' }
        ]
      },
      {
        id: 'aplicacao-critica',
        label: 'Aplicação Crítica',
        cor: '#22C55E',
        resumo: 'Como usar biografias sem idolatria cega',
        filhos: [
          { label: 'Princípios, não idolatria', desc: 'Extrair processo de raciocínio, não seguir cegamente uma pessoa' },
          { label: 'Contexto específico', desc: 'Reconhecer que cada trajetória se deu num momento histórico particular' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações relacionadas ao estudo de biografias de investidores e reflete sobre como aplicar essas lições de forma crítica, evitando tanto a idolatria cega quanto o descarte precipitado de aprendizados valiosos.',
    passos: [
      'Leia a situação envolvendo uma decisão relacionada ao estudo de biografias de investidores.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de aplicação crítica de trajetórias individuais.'
    ],
    exemploGuiado: 'Um investidor iniciante lê a biografia de um investidor historicamente reconhecido e descobre que, décadas atrás, ele cometeu um erro relevante ao investir numa empresa que posteriormente enfrentou dificuldades financeiras sérias, gerando perdas significativas para a carteira. Em vez de descartar todos os ensinamentos dessa biografia por causa desse erro específico, o investidor iniciante busca entender o que motivou aquela decisão original e, principalmente, como o investidor de referência reagiu depois — se reconheceu publicamente o erro, ajustou seu processo de análise para evitar situações semelhantes no futuro, e manteve disciplina na filosofia central mesmo após esse revés pontual. Essa análise mais completa, que inclui o erro e a resposta a ele, oferece um aprendizado mais rico do que estudar apenas os casos de sucesso da mesma trajetória.',
    cenarioGuiado: [
      {
        pergunta: 'Você admira profundamente a trajetória de um investidor específico e ele expressa publicamente uma opinião recente sobre um investimento específico.',
        opcoes: [
          { texto: 'Sigo a recomendação imediatamente, confiando totalmente na experiência histórica dele', resultado: 'Adotar cegamente uma decisão atual, sem análise crítica própria, ignora que até investidores com décadas de resultados consistentes já cometeram erros relevantes — nenhuma trajetória individual deveria substituir completamente o próprio processo de análise.' },
          { texto: 'Analiso criticamente essa opinião, considerando meu próprio contexto e objetivos antes de decidir', resultado: 'Abordagem mais equilibrada: aproveitar o conhecimento acumulado de investidores experientes como um dos inputs de análise, sem abrir mão do próprio senso crítico e adequação ao contexto pessoal.' }
        ]
      },
      {
        pergunta: 'Ao estudar a biografia de um investidor de referência, você descobre que ele cometeu um erro relevante décadas atrás.',
        opcoes: [
          { texto: 'Descarto completamente os ensinamentos dessa trajetória, já que ele também errou', resultado: 'Descartar todos os aprendizados por causa de um erro específico ignora que praticamente toda trajetória de sucesso consistente ao longo de décadas inclui erros pontuais — o valor está em entender como o investidor reagiu e aprendeu com essas situações.' },
          { texto: 'Busco entender o contexto do erro e como o investidor ajustou sua estratégia depois disso', resultado: 'Essa abordagem mais completa, que analisa tanto o erro quanto a resposta a ele, costuma revelar lições mais valiosas sobre disciplina e capacidade de adaptação do que estudar apenas os casos de sucesso isolados.' }
        ]
      },
      {
        pergunta: 'Você está decidindo entre adotar uma filosofia de investimento mais concentrada (poucas posições) ou mais diversificada (muitas posições), com base em diferentes trajetórias de investidores estudadas.',
        opcoes: [
          { texto: 'Escolho a abordagem do investidor mais famoso que conheço, sem considerar meu próprio perfil', resultado: 'Diferentes filosofias de investimento (concentração vs. diversificação) podem gerar resultados consistentes, mas cada uma exige um perfil e nível de conhecimento específico — escolher apenas pela fama do investidor, sem considerar adequação ao próprio contexto, pode não ser a decisão mais adequada.' },
          { texto: 'Avalio qual filosofia é mais compatível com meu próprio conhecimento, tempo disponível e tolerância a risco', resultado: 'Abordagem mais criteriosa: entender que múltiplas filosofias válidas existem, e escolher aquela mais alinhada ao próprio perfil e circunstâncias, é mais produtivo do que simplesmente copiar a abordagem de uma única referência.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'bi-01', frente: 'Por que estudar apenas os sucessos de uma biografia de investidor é uma abordagem incompleta?', verso: 'Porque ignora os erros, ajustes de estratégia e períodos difíceis que também fazem parte de praticamente toda trajetória de sucesso consistente construída ao longo de décadas.' },
    { id: 'bi-02', frente: 'O que é círculo de competência?', verso: 'A área específica de conhecimento profundo desenvolvida por um investidor, dentro da qual ele toma decisões com mais segurança, evitando investir fora desse domínio mesmo em momentos de euforia de mercado.' },
    { id: 'bi-03', frente: 'Qual é o erro mais caro relacionado ao estudo de biografias de investidores, segundo o módulo?', verso: 'Idolatrar um único investidor de referência a ponto de adotar cegamente suas decisões atuais, sem análise crítica própria.' },
    { id: 'bi-04', frente: 'Existe uma única filosofia de investimento "correta" entre trajetórias de investidores reconhecidos?', verso: 'Não — diferentes abordagens, como carteiras concentradas ou diversificadas, foco em valor ou em crescimento, podem gerar resultados consistentes, dependendo do perfil e contexto de cada investidor.' },
    { id: 'bi-05', frente: 'Por que é importante estudar como um investidor reagiu após cometer um erro relevante?', verso: 'Porque revela a disciplina e a capacidade de adaptação diante de dificuldades, informações tão ou mais valiosas quanto estudar apenas as decisões que deram certo.' },
    { id: 'bi-06', frente: 'Qual é o horizonte de tempo comum a praticamente todas as biografias de investidores considerados historicamente bem-sucedidos?', verso: 'Décadas — não existe trajetória relevante de sucesso consistente construída em apenas poucos anos de mercado.' },
    { id: 'bi-07', frente: 'Por que é arriscado replicar decisões atuais de um investidor de referência sem análise própria?', verso: 'Porque mesmo investidores com décadas de resultados consistentes podem errar ou ter opiniões que não se aplicam ao contexto e objetivos específicos de quem está replicando a decisão.' },
    { id: 'bi-08', frente: 'O que diferencia carteiras concentradas de carteiras diversificadas, observado em diferentes biografias de investidores?', verso: 'Carteiras concentradas exigem conhecimento profundo de poucos ativos específicos; carteiras diversificadas costumam depender de um processo mais sistemático de seleção entre muitas posições.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o erro mais caro ao estudar a biografia de investidores de referência, segundo o módulo?',
      alternativas: [
        'Analisar criticamente as decisões e opiniões de investidores estudados',
        'Idolatrar um único investidor a ponto de adotar cegamente suas decisões atuais, sem senso crítico',
        'Estudar tanto os erros quanto os acertos de uma trajetória',
        'Comparar diferentes filosofias de investimento entre si'
      ],
      correta: 1,
      explicacao: 'Mesmo investidores com décadas de resultados consistentes já cometeram erros relevantes — nenhuma trajetória individual deveria ser seguida sem análise própria e crítica, adaptada ao contexto e objetivos de cada pessoa.'
    },
    {
      pergunta: 'O que é círculo de competência, conceito recorrente em biografias de investidores bem-sucedidos?',
      alternativas: [
        'Um grupo formal de investidores que se reúnem periodicamente',
        'A área específica de conhecimento profundo dentro da qual um investidor toma decisões, evitando investir fora desse domínio',
        'Um índice de mercado usado para medir performance de fundos',
        'Uma certificação obrigatória para atuar como gestor de investimentos'
      ],
      correta: 1,
      explicacao: 'Investidores historicamente bem-sucedidos costumam desenvolver um círculo de competência bem definido, evitando investir em áreas que não entendem profundamente, mesmo durante períodos de forte euforia de mercado em setores fora desse domínio.'
    },
    {
      pergunta: 'Por que estudar apenas os sucessos de uma trajetória de investidor, sem considerar os erros, é uma abordagem incompleta?',
      alternativas: [
        'Porque erros de investidores de referência nunca são documentados publicamente',
        'Porque ignora informações valiosas sobre disciplina e capacidade de adaptação diante de dificuldades reais',
        'Porque investidores de referência nunca cometem erros relevantes',
        'Porque estudar erros é sempre desnecessário para o aprendizado'
      ],
      correta: 1,
      explicacao: 'Entender como um investidor lidou com erros e períodos difíceis, sem abandonar sua filosofia central, costuma revelar lições tão ou mais valiosas quanto estudar apenas os casos de sucesso isolados de uma mesma trajetória.'
    },
    {
      pergunta: 'Existe uma única filosofia de investimento considerada "correta" entre diferentes trajetórias de investidores historicamente reconhecidos?',
      alternativas: [
        'Sim, apenas carteiras concentradas geram resultados consistentes no longo prazo',
        'Não — diferentes abordagens, como concentração ou diversificação, podem gerar resultados consistentes dependendo do perfil e contexto de cada investidor',
        'Sim, apenas o foco em crescimento é uma filosofia validada historicamente',
        'Não existe filosofia documentada de investidores reconhecidos ao longo da história'
      ],
      correta: 1,
      explicacao: 'O módulo destaca que múltiplas filosofias válidas coexistem entre trajetórias de investidores reconhecidos, cada uma exigindo um perfil, conhecimento e tolerância a risco específicos, sem que exista uma única abordagem universalmente superior.'
    },
    {
      pergunta: 'Qual é o horizonte de tempo comumente observado em biografias de investidores considerados historicamente bem-sucedidos?',
      alternativas: [
        'Menos de 1 ano', 'Entre 2 e 5 anos', 'Décadas', 'Não há um padrão de tempo relevante'
      ],
      correta: 2,
      explicacao: 'Praticamente todas as trajetórias de sucesso consistente estudadas em biografias de investidores se desenrolam ao longo de décadas, não de forma rápida — um padrão recorrente que reforça a importância da paciência de longo prazo.'
    },
    {
      pergunta: 'Por que analisar criticamente as opiniões públicas recentes de um investidor de referência, em vez de segui-las automaticamente, é uma prática recomendada?',
      alternativas: [
        'Porque investidores de referência nunca devem ser estudados',
        'Porque até investidores experientes podem errar ou expressar opiniões que não se aplicam ao contexto específico de quem está analisando',
        'Porque opiniões públicas de investidores são sempre falsas',
        'Porque é proibido por lei seguir recomendações de investidores específicos'
      ],
      correta: 1,
      explicacao: 'Mesmo investidores com décadas de resultados consistentes não estão isentos de erros ou de opiniões que podem não se adequar ao contexto e objetivos específicos de outra pessoa — daí a importância da análise crítica própria antes de qualquer decisão.'
    }
  ],

  faq: [
    { pergunta: 'É válido se inspirar na filosofia de um único investidor de referência?', resposta: 'Sim, desde que de forma crítica — extrair princípios de disciplina e processo de decisão é valioso, mas é importante adaptar essa filosofia ao próprio contexto, conhecimento e objetivos, em vez de replicar decisões específicas sem análise própria.' },
    { pergunta: 'Por que investidores historicamente bem-sucedidos passaram por períodos de resultados abaixo da média do mercado?', resposta: 'Porque nenhuma filosofia de investimento acerta em todos os momentos de mercado — períodos em que uma determinada abordagem está temporariamente fora de sintonia com o sentimento geral do mercado são parte normal da trajetória de praticamente qualquer investidor de longo prazo.' },
    { pergunta: 'Vale a pena estudar biografias de investidores que atuaram em contextos econômicos muito diferentes do atual?', resposta: 'Sim, desde que o foco esteja nos princípios de decisão e na disciplina comportamental demonstrada, não nas escolhas específicas de ativos — esses princípios tendem a permanecer relevantes mesmo quando o contexto econômico específico mudou significativamente.' },
    { pergunta: 'Como sei se estou idolatrando um investidor de referência em vez de aprender criticamente com sua trajetória?', resposta: 'Um sinal de alerta é aceitar automaticamente qualquer opinião ou decisão recente dessa pessoa sem questionamento, ou sentir desconforto em considerar que ela possa ter cometido erros ao longo da carreira — aprendizado crítico envolve reconhecer tanto acertos quanto limitações de qualquer trajetória.' },
    { pergunta: 'Diferentes filosofias de investimento (concentração vs. diversificação) podem ser combinadas por um mesmo investidor?', resposta: 'Sim, é possível adaptar elementos de diferentes filosofias conforme o contexto — muitos investidores ajustam o grau de concentração ou diversificação da própria carteira ao longo do tempo, conforme evoluem seu conhecimento e objetivos pessoais.' },
    { pergunta: 'Onde posso encontrar biografias detalhadas de investidores reconhecidos para estudar?', resposta: 'Livros biográficos, cartas anuais publicadas por gestores de fundos ao longo de décadas, entrevistas e documentários especializados em mercado financeiro costumam ser boas fontes, sempre priorizando fontes que discutam tanto acertos quanto erros da trajetória analisada.' }
  ]
}
