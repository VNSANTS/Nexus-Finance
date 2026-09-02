import { Modulo } from '@/types'

export const informedCaptain: Modulo = {
  id: 'informed-captain',
  trilhaId: 'cultura-organizacional',
  numero: 2,
  titulo: 'Informed Captain',
  subtitulo: 'Nem ditador, nem refém do consenso — quem decide, decide informado',
  iconName: 'Anchor',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['introducao-cultura-organizacional'],
  objetivoAprendizagem: 'Você vai sair sabendo aplicar o modelo Informed Captain: buscar input de quem entende do assunto, mas decidir com clareza sobre quem é responsável pela decisão final.',
  erroFatal: 'Confundir "ouvir a equipe" com "decidir por consenso total" — buscar unanimidade em toda decisão paralisa a empresa, porque decisões importantes quase sempre têm opiniões divergentes e legítimas.',
  numeroChave: { valor: '1 pessoa', legenda: 'no modelo Informed Captain, cada decisão importante tem exatamente uma pessoa responsável por decidir — mas essa pessoa é obrigada a buscar input de quem tem mais contexto antes de decidir' },
  glossarioDoModulo: ['Informed Captain', 'Consenso', 'Responsabilidade de decisão'],
  proximoPasso: { moduloId: 'keeper-test', motivo: 'Depois de entender como decisões são tomadas, o próximo módulo ensina uma das decisões mais difíceis de qualquer líder: quem manter na equipe.' },

  aprender: {
    oQueE: 'Informed Captain (Capitão Informado) é um modelo de decisão em que uma única pessoa é claramente responsável pela decisão final sobre um tema, mas é obrigada, antes de decidir, a buscar ativamente o input de quem tem mais contexto ou conhecimento sobre aquele assunto específico. Não é decisão autoritária (que ignora quem sabe mais) nem decisão por consenso (que exige concordância de todos) — é um meio-termo deliberado entre os dois extremos.',
    porQueImporta: 'Empresas sem um modelo claro de decisão oscilam entre dois problemas opostos: ou um líder decide tudo sozinho, ignorando informação valiosa que outras pessoas têm, ou toda decisão vira uma reunião interminável buscando concordância geral, o que trava a velocidade da empresa justamente quando ela mais precisa de agilidade. O Informed Captain resolve os dois problemas ao mesmo tempo: mantém a velocidade de uma decisão individual, mas aumenta a qualidade dela ao forçar a busca por informação antes de decidir.',
    naPratica: 'Para aplicar o modelo, primeiro é preciso deixar claro, para cada tipo de decisão, quem é o "capitão" responsável — pode ser sempre a mesma pessoa (o fundador, por exemplo) ou variar conforme o tema (o responsável de operações decide sobre operações, o de vendas decide sobre vendas). Antes de decidir, o capitão busca ativamente a opinião de quem tem mais contexto sobre aquele tema específico — não apenas espera que alguém se manifeste, mas pergunta diretamente. Depois de ouvir, o capitão decide, e a decisão é dele, mesmo que nem todo mundo concorde.',
    passoAPasso: [
      'Para a próxima decisão importante, identifique claramente quem é o responsável final — o "capitão" daquela decisão.',
      'Antes de decidir, liste quem tem mais contexto ou conhecimento relevante sobre o tema específico.',
      'Busque ativamente a opinião dessas pessoas — não espere que elas se manifestem sozinhas.',
      'Considere os inputs recebidos, mas lembre que a decisão final é do capitão, não do grupo.',
      'Comunique a decisão com transparência sobre por que ela foi tomada, mesmo que alguns inputs não tenham sido seguidos.',
    ],
    errosComuns: [
      'Buscar consenso total em toda decisão, achando que isso é sinal de cultura democrática saudável — na prática, isso trava decisões e desgasta o time.',
      'Decidir sozinho sem buscar nenhum input, mesmo quando outras pessoas claramente têm mais contexto sobre o tema específico.',
      'Não deixar claro quem é o "capitão" de cada tipo de decisão, criando confusão sobre quem realmente decide o quê.',
      'Buscar input apenas de forma simbólica, já tendo decidido de antemão e sem real abertura para mudar de opinião.',
    ],
    checklist: [
      'Sei identificar quem é o "capitão" responsável por cada tipo de decisão importante na minha equipe.',
      'Antes de decidir algo relevante, busco ativamente o input de quem tem mais contexto.',
      'Entendo que buscar consenso total em toda decisão trava a velocidade da empresa.',
      'Comunico minhas decisões explicando o racional, mesmo quando nem todos concordam.',
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman mostra que decisões de grupo tendem a amplificar vieses individuais sem necessariamente melhorar a qualidade — o modelo Informed Captain busca justamente o equilíbrio entre a velocidade da decisão individual e a qualidade da informação coletiva.',
    },
    naoConfundirCom: [
      { moduloId: 'disagree-and-commit', diferenca: 'Informed Captain define quem toma a decisão e como buscar informação antes; Disagree and Commit trata do que acontece depois — como a equipe executa uma decisão mesmo discordando dela.' },
    ],
  },

  mapaMental: {
    label: 'Informed Captain',
    subtitulo: 'O meio-termo entre autoritarismo e paralisia',
    ramos: [
      {
        id: 'os-dois-extremos',
        label: 'Os Dois Extremos a Evitar',
        cor: '#EF4444',
        resumo: 'O que o modelo previne',
        filhos: [
          { label: 'Decisão autoritária', desc: 'Ignora informação valiosa de quem sabe mais' },
          { label: 'Decisão por consenso total', desc: 'Trava a velocidade buscando concordância geral' },
        ],
      },
      {
        id: 'o-modelo',
        label: 'O Modelo Informed Captain',
        cor: '#3B82F6',
        resumo: 'Uma pessoa decide, informada',
        filhos: [
          { label: 'Um responsável claro', desc: 'O "capitão" daquela decisão específica' },
          { label: 'Busca ativa de input', desc: 'Pergunta a quem tem mais contexto, antes de decidir' },
          { label: 'Decisão final é do capitão', desc: 'Mesmo que nem todos concordem' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos simular decisões usando o modelo Informed Captain, opção por opção.',
    passos: [
      'Ler o cenário de decisão.',
      'Avaliar cada opção considerando se ela busca informação sem abrir mão da responsabilidade final.',
      'Escolher a opção mais alinhada ao modelo Informed Captain.',
    ],
    exemploGuiado: 'Um fundador precisa decidir se a empresa muda de fornecedor de matéria-prima. Aplicando o Informed Captain: ele não decide sozinho no impulso (autoritário), nem convoca uma votação geral entre todos os 15 funcionários (consenso total). Em vez disso, busca diretamente a opinião do responsável de compras (que conhece os fornecedores) e do responsável de produção (que sabe o impacto na qualidade), ouve os dois, e decide — comunicando depois por que escolheu aquele caminho, mesmo que um dos dois discordasse parcialmente.',
    cenarioGuiado: [
      {
        pergunta: 'Você é o responsável por decidir se a empresa contrata uma nova ferramenta de gestão, que vai custar caro e mudar a rotina de todo o time. Como aplicar o Informed Captain?',
        opcoes: [
          { texto: 'Decidir sozinho e comunicar a decisão pronta ao time', resultado: 'Isso é decisão autoritária, não Informed Captain — ignora o contexto valioso de quem vai usar a ferramenta no dia a dia, mesmo que a decisão final seja mesmo sua.' },
          { texto: 'Convocar uma votação com todo o time para decidir juntos', resultado: 'Isso é consenso total, não Informed Captain — decisões técnicas como essa raramente têm resposta óbvia para quem não usa a ferramenta diariamente, e votação pode gerar uma escolha popular, não necessariamente a melhor.' },
          { texto: 'Buscar a opinião de quem mais vai usar a ferramenta, ouvir prós e contras, e decidir com base nisso', resultado: 'Essa é a aplicação correta: busca informação de quem tem mais contexto (quem vai usar no dia a dia), mas mantém a decisão final com o responsável claro.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é o modelo Informed Captain?', verso: 'Um modelo de decisão em que uma pessoa é claramente responsável pela decisão final, mas busca ativamente input de quem tem mais contexto antes de decidir.' },
    { id: 'fc2', frente: 'Quais são os dois extremos que o Informed Captain evita?', verso: 'Decisão autoritária (ignora informação de quem sabe mais) e decisão por consenso total (trava a velocidade buscando concordância geral).' },
    { id: 'fc3', frente: 'Quem decide, no final, num modelo Informed Captain?', verso: 'O "capitão" responsável por aquela decisão específica — mesmo que nem todo mundo concorde com a escolha final.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é a principal diferença entre decisão autoritária e o modelo Informed Captain?',
      alternativas: [
        'Não há diferença, são a mesma coisa',
        'No Informed Captain, o responsável busca ativamente input de quem tem contexto antes de decidir',
        'No modelo autoritário, sempre há votação',
        'O Informed Captain nunca permite que uma única pessoa decida',
      ],
      correta: 1,
      explicacao: 'O que diferencia o Informed Captain da decisão autoritária é justamente a busca ativa de informação relevante antes de decidir — a decisão final continua sendo de uma pessoa, mas informada.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que buscar consenso total em toda decisão é considerado um problema, segundo este módulo?',
      alternativas: [
        'Porque consenso é sempre impossível de alcançar',
        'Porque trava a velocidade da empresa, já que decisões importantes quase sempre têm opiniões divergentes legítimas',
        'Porque funcionários nunca têm boas ideias',
        'Porque consenso é ilegal em ambientes corporativos',
      ],
      correta: 1,
      explicacao: 'Buscar unanimidade em toda decisão paralisa a empresa, porque decisões relevantes normalmente envolvem trade-offs e opiniões divergentes legítimas — esperar concordância geral consome tempo sem necessariamente melhorar a qualidade da decisão.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Quem deve ser o "capitão" de cada tipo de decisão numa empresa pequena?',
      resposta: 'Em empresas pequenas, muitas vezes o fundador acumula o papel de capitão em quase todas as decisões no início. Conforme a empresa cresce, vale distribuir esse papel por área: quem lidera vendas decide sobre vendas, quem lidera operação decide sobre operação, sempre buscando input de quem tem mais contexto.',
    },
    {
      pergunta: 'E se o capitão decide algo e a maioria da equipe discorda?',
      resposta: 'Isso é normal e esperado — o modelo Informed Captain não exige concordância, só informação. É exatamente aí que entra o próximo módulo desta trilha, Disagree and Commit: como a equipe executa uma decisão mesmo discordando dela.',
    },
  ],
}
