import { Modulo } from '@/types'

export const keeperTest: Modulo = {
  id: 'keeper-test',
  trilhaId: 'cultura-organizacional',
  numero: 3,
  titulo: 'Keeper Test',
  subtitulo: 'A pergunta que substitui a avaliação de desempenho engessada',
  iconName: 'UserCheck',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['informed-captain'],
  objetivoAprendizagem: 'Você vai sair sabendo aplicar o Keeper Test para decidir, com mais clareza emocional, quem deveria continuar na equipe.',
  erroFatal: 'Adiar indefinidamente a decisão sobre um funcionário mediano — nem excelente, nem ruim o suficiente para demitir — porque isso ocupa uma vaga que poderia ter alguém pelo qual você lutaria de verdade para manter.',
  numeroChave: { valor: '1 pergunta', legenda: 'o Keeper Test se resume a uma única pergunta por pessoa: "se essa pessoa pedisse demissão amanhã, eu lutaria para mantê-la, ou aceitaria com alívio?"' },
  glossarioDoModulo: ['Keeper Test', 'Performance mediana', 'Cultura de alta performance'],
  proximoPasso: { moduloId: 'estrutura-e-contratacao', motivo: 'Depois de saber quem manter, o próximo módulo ensina como estruturar a contratação de quem vai substituir ou expandir a equipe.' },

  aprender: {
    oQueE: 'O Keeper Test (Teste de Manutenção) é uma técnica, popularizada por empresas como a Netflix, para avaliar cada membro da equipe com uma única pergunta direta: "se essa pessoa viesse até mim hoje e pedisse demissão, eu lutaria para convencê-la a ficar, ou aceitaria a saída com alívio, ou até discreto contentamento?". A resposta a essa pergunta revela, de forma mais honesta do que a maioria das avaliações formais de desempenho, o real valor daquela pessoa para a equipe.',
    porQueImporta: 'Avaliações de desempenho tradicionais tendem a ser burocráticas, cheias de escalas numéricas e formulários que acabam medindo mais a capacidade de preencher formulário do que o impacto real da pessoa. O Keeper Test corta esse ruído com uma pergunta simples e emocionalmente honesta — a resposta geralmente já existe na cabeça do líder, só raramente é verbalizada com clareza.',
    naPratica: 'Para cada pessoa da equipe, pergunte a si mesmo, sem filtro: se ela pedisse demissão amanhã, você lutaria para mantê-la (oferecendo aumento, mudança de função, o que fosse necessário) ou aceitaria a saída, talvez até com um certo alívio? Se a resposta for "lutaria", essa pessoa passou no Keeper Test. Se a resposta for "aceitaria", vale investigar por quê — às vezes é desempenho fraco, às vezes é desalinhamento cultural, às vezes é simplesmente a função errada para o talento daquela pessoa. O importante é que essa reflexão não fique só na cabeça: ela deve orientar decisões reais de desenvolvimento, remanejamento ou, quando necessário, desligamento.',
    passoAPasso: [
      'Para cada pessoa da sua equipe direta, faça a pergunta do Keeper Test com honestidade radical, sem racionalizar a resposta.',
      'Para quem passou no teste, identifique o que especificamente a torna insubstituível, e proteja isso (reconhecimento, crescimento, remuneração).',
      'Para quem não passou, investigue a causa: é desempenho, desalinhamento de valores, ou função incompatível com o talento da pessoa?',
      'Converse abertamente, quando fizer sentido, sobre o que precisaria mudar para a resposta virar "sim".',
      'Evite manter alguém na função apenas por medo do vazio da vaga aberta — isso costuma custar mais caro no longo prazo do que a vaga temporariamente vazia.',
    ],
    errosComuns: [
      'Aplicar o Keeper Test de forma pública ou como ameaça, em vez de uma ferramenta de reflexão honesta e privada do líder.',
      'Usar o teste apenas para justificar demissões já decididas, sem realmente refletir sobre cada pessoa com honestidade.',
      'Manter alguém que reprovou no teste por medo da vaga aberta, adiando indefinidamente uma decisão necessária.',
      'Não comunicar de forma construtiva o que levaria a resposta a mudar, deixando a pessoa sem chance real de ajustar o rumo.',
    ],
    checklist: [
      'Apliquei o Keeper Test, com honestidade, para cada pessoa da minha equipe direta.',
      'Identifiquei o que torna insubstituíveis as pessoas que passaram no teste.',
      'Para quem não passou, investiguei se é desempenho, desalinhamento ou função errada.',
      'Não estou adiando uma decisão necessária só por medo da vaga aberta.',
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'O livro defende que valor real numa equipe vem de contribuição genuína, não de presença passiva — o Keeper Test é uma ferramenta prática para identificar exatamente essa diferença entre quem contribui de verdade e quem apenas ocupa um lugar.',
    },
  },

  mapaMental: {
    label: 'Keeper Test',
    subtitulo: 'Uma pergunta, honestidade radical',
    ramos: [
      {
        id: 'a-pergunta',
        label: 'A Pergunta Central',
        cor: '#3B82F6',
        resumo: 'Simples, mas emocionalmente honesta',
        filhos: [
          { label: '"Eu lutaria para mantê-la?"', desc: 'Se ela pedisse demissão amanhã' },
        ],
      },
      {
        id: 'passou',
        label: 'Se a Resposta é "Sim"',
        cor: '#22C55E',
        resumo: 'Proteger o que a torna insubstituível',
        filhos: [
          { label: 'Reconhecimento e crescimento', desc: 'Investir ativamente em quem passou' },
        ],
      },
      {
        id: 'nao-passou',
        label: 'Se a Resposta é "Não"',
        cor: '#EF4444',
        resumo: 'Investigar a causa raiz',
        filhos: [
          { label: 'Desempenho', desc: 'A pessoa não entrega o esperado' },
          { label: 'Desalinhamento cultural', desc: 'Valores diferentes dos da equipe' },
          { label: 'Função errada', desc: 'O talento existe, mas não nesse papel' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos aplicar o Keeper Test em cenários de decisão de equipe.',
    passos: [
      'Ler o cenário sobre um membro específico da equipe.',
      'Aplicar a pergunta central do Keeper Test.',
      'Escolher a ação mais alinhada com o resultado do teste.',
    ],
    exemploGuiado: 'Um gerente tem um funcionário competente tecnicamente, mas que gera atrito constante com o resto do time, sempre em pequenos conflitos. Aplicando o Keeper Test: "se ele pedisse demissão amanhã, eu lutaria para mantê-lo?". A resposta honesta é "não, provavelmente aceitaria com alívio, apesar da competência técnica" — isso revela que o problema não é habilidade, é desalinhamento cultural, o que muda completamente a conversa que precisa acontecer com essa pessoa.',
    cenarioGuiado: [
      {
        pergunta: 'Você aplica o Keeper Test em uma vendedora da sua equipe. A resposta honesta é "sim, eu lutaria muito para mantê-la". Qual é a ação mais coerente com esse resultado?',
        opcoes: [
          { texto: 'Não fazer nada diferente, já que ela está indo bem sozinha', resultado: 'Passar no teste não significa que não precisa de atenção — é justamente o sinal de que vale investir ativamente para não perder essa pessoa para outra oportunidade.' },
          { texto: 'Conversar abertamente sobre reconhecimento, crescimento e o que a manteria motivada a longo prazo', resultado: 'Essa é a ação coerente: identificar e proteger ativamente o que torna essa pessoa insubstituível, antes que outra empresa faça isso primeiro.' },
          { texto: 'Aumentar a cobrança sobre ela, já que claramente aguenta pressão', resultado: 'Aumentar cobrança sem contrapartida pode desgastar até quem passou no Keeper Test — o teste identifica valor, não abre licença para sobrecarregar sem reconhecimento.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é a pergunta central do Keeper Test?', verso: 'Se essa pessoa pedisse demissão amanhã, eu lutaria para mantê-la, ou aceitaria a saída com alívio?' },
    { id: 'fc2', frente: 'Por que o Keeper Test costuma ser mais honesto que avaliações formais de desempenho?', verso: 'Porque corta o ruído burocrático de escalas e formulários, indo direto a uma reflexão emocionalmente honesta que geralmente já existe na cabeça do líder.' },
    { id: 'fc3', frente: 'O que fazer quando alguém não passa no Keeper Test?', verso: 'Investigar a causa: pode ser desempenho fraco, desalinhamento de valores, ou simplesmente a função errada para o talento daquela pessoa.' },
    { id: 'fc4', frente: 'Qual é o principal erro ao manter alguém que reprovou no Keeper Test?', verso: 'Adiar a decisão por medo da vaga aberta — isso costuma custar mais caro no longo prazo do que o período temporário sem aquela posição preenchida.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é a pergunta central do Keeper Test?',
      alternativas: [
        'Essa pessoa bate as metas todos os meses?',
        'Se essa pessoa pedisse demissão amanhã, eu lutaria para mantê-la?',
        'Essa pessoa tem mais de dois anos de casa?',
        'Essa pessoa é a mais simpática da equipe?',
      ],
      correta: 1,
      explicacao: 'O Keeper Test se resume a essa pergunta direta e emocionalmente honesta sobre o valor real da pessoa para a equipe.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Um funcionário tecnicamente competente, mas com forte desalinhamento cultural, reprova no Keeper Test. Qual é a ação mais coerente com o módulo?',
      alternativas: [
        'Demitir imediatamente, sem nenhuma conversa',
        'Ignorar o resultado do teste, já que competência técnica é o que importa',
        'Investigar a causa raiz — nesse caso, desalinhamento cultural, não falta de habilidade',
        'Aumentar o salário para tentar reverter a situação sem conversar sobre o problema real',
      ],
      correta: 2,
      explicacao: 'O Keeper Test revela que existe um problema, mas a ação certa é investigar a causa raiz — no caso, desalinhamento cultural — antes de qualquer decisão definitiva.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Devo aplicar o Keeper Test na frente da equipe?',
      resposta: 'Não. É uma ferramenta de reflexão honesta e privada do líder, não uma avaliação pública ou uma ameaça velada. A conversa que eventualmente resulta dessa reflexão deve ser construtiva, individual e focada em desenvolvimento, não em intimidação.',
    },
    {
      pergunta: 'Com que frequência devo aplicar o Keeper Test?',
      resposta: 'Não precisa ser um ritual formal e datado — mas revisitar a pergunta periodicamente (por exemplo, a cada seis meses, ou ao preparar conversas 1:1) ajuda a manter a reflexão honesta em vez de deixá-la só para momentos de crise.',
    },
  ],
}
