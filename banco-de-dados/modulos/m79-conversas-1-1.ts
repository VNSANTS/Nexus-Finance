import { Modulo } from '@/types'

export const conversas1a1: Modulo = {
  id: 'conversas-1-1',
  trilhaId: 'cultura-organizacional',
  numero: 6,
  titulo: 'Conversas 1:1',
  subtitulo: 'O ritual de liderança mais subestimado, e o mais fácil de fazer errado',
  iconName: 'MessageSquare',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['disagree-and-commit'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar uma conversa individual que gera confiança real, em vez de virar apenas um status report disfarçado de reunião.',
  erroFatal: 'Transformar a conversa 1:1 em uma reunião de status sobre tarefas — isso já existe em outros formatos (relatório, painel de projeto); o valor único do 1:1 é abrir espaço para o que não cabe em nenhum outro lugar: dúvida, frustração, ideia, ou sinal de alerta antes que vire problema grande.',
  numeroChave: { valor: '80/20', legenda: 'numa conversa 1:1 bem conduzida, a proporção recomendada é a pessoa liderada falar cerca de 80% do tempo, e o líder ouvir e fazer perguntas nos outros 20% — o oposto do que costuma acontecer na prática' },
  glossarioDoModulo: ['1:1', 'Escuta ativa', 'Feedback contínuo'],
  proximoPasso: { moduloId: 'okrs', motivo: 'Depois de dominar o ritual individual, o último módulo da trilha ensina como alinhar times inteiros através de metas compartilhadas.' },

  aprender: {
    oQueE: 'Conversas 1:1 são reuniões individuais e regulares entre um líder e cada pessoa da sua equipe, com um propósito distinto de qualquer outra reunião: não é para acompanhar tarefas ou projetos (isso tem outros formatos), é para abrir espaço regular e protegido para o que raramente surge espontaneamente — dúvidas, frustrações silenciosas, ideias não testadas, sinais de que algo está errado antes que vire uma crise visível.',
    porQueImporta: 'Muitos problemas sérios de equipe — desde um talento prestes a pedir demissão até um conflito não resolvido entre colegas — dão sinais bem antes de explodirem. Mas esses sinais raramente aparecem numa reunião de equipe grande, ou num relatório de status. Eles aparecem, se aparecerem, numa conversa individual onde a pessoa se sente segura para falar sem estar sendo avaliada na frente de todos.',
    naPratica: 'A estrutura de um bom 1:1 inverte a lógica intuitiva: a maior parte do tempo deveria ser da pessoa liderada, não do líder. Em vez de o líder chegar com uma pauta de cobranças, a conversa deveria começar com uma pergunta aberta ("como você está, de verdade?", "o que está te incomodando essa semana?"), e o líder deveria escutar mais do que falar. Isso não significa ausência de direção — feedback direto e claro ainda tem espaço, mas depois de escutar, não como abertura da conversa.',
    passoAPasso: [
      'Reserve um horário fixo e regular (semanal ou quinzenal) para cada pessoa da sua equipe direta, e proteja esse horário de cancelamentos frequentes.',
      'Comece a conversa com uma pergunta aberta sobre a pessoa, não com uma lista de tarefas pendentes.',
      'Deixe a pessoa liderar a maior parte da conversa — pratique escutar mais do que falar.',
      'Anote sinais recorrentes ao longo de várias conversas (frustração repetida com o mesmo tema, por exemplo) — um padrão que só aparece ao longo do tempo, não numa conversa isolada.',
      'Reserve, se necessário, feedback direto e específico para depois de escutar, não como abertura da conversa.',
    ],
    errosComuns: [
      'Transformar o 1:1 em uma reunião de status sobre tarefas, que já tem outros formatos apropriados.',
      'O líder falar a maior parte do tempo, invertendo a proporção que deveria ser majoritariamente da pessoa liderada.',
      'Cancelar 1:1s com frequência quando a agenda fica cheia, sinalizando (mesmo sem querer) que aquele espaço não é prioridade.',
      'Usar o 1:1 apenas para dar feedback negativo, o que rapidamente ensina a pessoa a temer, e não buscar, aquele espaço.',
    ],
    checklist: [
      'Tenho um horário fixo e protegido de 1:1 com cada pessoa da minha equipe direta.',
      'Começo a conversa com uma pergunta aberta, não com uma lista de tarefas.',
      'Falo menos do que escuto durante a conversa.',
      'Não uso o 1:1 exclusivamente para feedback negativo.',
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'O livro defende que relações de valor genuíno nascem de atenção real ao outro, não de transações — a conversa 1:1 bem conduzida é exatamente esse tipo de espaço, priorizando escuta sobre agenda própria.',
    },
  },

  mapaMental: {
    label: 'Conversas 1:1',
    subtitulo: 'O espaço que nenhum outro formato substitui',
    ramos: [
      {
        id: 'proposito',
        label: 'Propósito Único',
        cor: '#3B82F6',
        resumo: 'O que não cabe em outro lugar',
        filhos: [
          { label: 'Não é status de tarefa', desc: 'Isso já tem outros formatos apropriados' },
          { label: 'É sinal precoce', desc: 'Frustração, dúvida, ideia, alerta antes de virar crise' },
        ],
      },
      {
        id: 'estrutura',
        label: 'Estrutura da Conversa',
        cor: '#22C55E',
        resumo: 'A proporção 80/20',
        filhos: [
          { label: 'Pergunta aberta primeiro', desc: 'Não uma lista de cobranças' },
          { label: 'Líder escuta mais que fala', desc: 'A pessoa liderada conduz a maior parte' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos comparar duas condução de 1:1, uma que segue a proporção certa e outra que não.',
    passos: [
      'Ler o cenário da conversa individual.',
      'Avaliar se o formato descrito segue a proporção 80/20.',
      'Escolher a condução mais alinhada ao propósito do 1:1.',
    ],
    exemploGuiado: 'Um líder começa o 1:1 semanal com "como você está, de verdade? Não em relação a tarefas, em relação a você" — e depois fica quieto, esperando a resposta com calma. A pessoa liderada, surpreendida no início, acaba compartilhando uma frustração que vinha guardando há semanas sobre a forma como um projeto estava sendo conduzido por outra área. Se o líder tivesse começado com "me atualiza sobre as tarefas da semana", provavelmente essa frustração nunca teria vindo à tona naquele momento.',
    cenarioGuiado: [
      {
        pergunta: 'Você tem 30 minutos de 1:1 com um membro da equipe. Como estruturar melhor esse tempo?',
        opcoes: [
          { texto: 'Passar os 30 minutos revisando o status de cada tarefa do sprint atual', resultado: 'Isso transforma o 1:1 em uma reunião de status, que já tem outros formatos apropriados (painel de projeto, daily) — o valor único do 1:1 se perde.' },
          { texto: 'Abrir com uma pergunta pessoal e aberta, e deixar a pessoa conduzir a maior parte da conversa', resultado: 'Essa é a estrutura certa: prioriza o espaço para o que não aparece em outro lugar, com o líder escutando mais do que falando.' },
          { texto: 'Usar o tempo inteiro para dar feedback sobre pontos de melhoria da pessoa', resultado: 'Feedback tem espaço no 1:1, mas usar o tempo inteiro só para isso ensina a pessoa a temer aquele espaço, em vez de buscá-lo para compartilhar o que realmente precisa ser dito.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é o propósito único de uma conversa 1:1, diferente de outras reuniões?', verso: 'Abrir espaço regular e protegido para o que raramente surge espontaneamente: dúvidas, frustrações, ideias, sinais de alerta antes de virarem crise.' },
    { id: 'fc2', frente: 'Qual é a proporção recomendada de fala numa conversa 1:1 bem conduzida?', verso: 'Cerca de 80% do tempo para a pessoa liderada, 20% para o líder escutar e fazer perguntas.' },
    { id: 'fc3', frente: 'Qual é o erro mais comum ao conduzir um 1:1?', verso: 'Transformá-lo numa reunião de status sobre tarefas, que já tem outros formatos apropriados, perdendo o valor único desse espaço.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo este módulo, qual deveria ser a proporção de fala numa conversa 1:1 bem conduzida?',
      alternativas: [
        'O líder fala 80% do tempo, a pessoa liderada 20%',
        'A pessoa liderada fala cerca de 80% do tempo, o líder escuta e pergunta nos outros 20%',
        'A proporção deve ser sempre 50/50, sem exceção',
        'O líder deve falar o tempo todo, para dar direção clara',
      ],
      correta: 1,
      explicacao: 'A proporção recomendada inverte a lógica intuitiva: a maior parte do tempo deveria ser da pessoa liderada, com o líder escutando mais do que falando.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que transformar o 1:1 numa reunião de status sobre tarefas é considerado um erro?',
      alternativas: [
        'Porque tarefas não devem ser discutidas nunca com o líder',
        'Porque isso já tem outros formatos apropriados, e o 1:1 perde seu valor único de abrir espaço para o que não aparece em outro lugar',
        'Porque status de tarefas é assunto exclusivo de e-mail',
        'Porque conversas sobre tarefas são proibidas por lei trabalhista',
      ],
      correta: 1,
      explicacao: 'Status de tarefa já tem outros canais (relatórios, painéis de projeto). O 1:1 existe justamente para o que não cabe nesses formatos — sinais precoces de problema, dúvida, frustração.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Com que frequência devo fazer 1:1s com minha equipe?',
      resposta: 'Semanal ou quinzenal costuma funcionar bem para a maioria das equipes — o importante é a regularidade e o horário protegido, mais do que a frequência exata.',
    },
    {
      pergunta: 'E se a pessoa não tem nada específico para falar quando eu pergunto "como você está"?',
      resposta: 'É normal, principalmente no início. Silêncio ou respostas curtas não significam que não há nada — pode ser falta de hábito com esse tipo de conversa. Persistir com consistência, sem forçar, costuma abrir esse espaço aos poucos.',
    },
  ],
}
