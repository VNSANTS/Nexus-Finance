import { Modulo } from '@/types'

export const estruturaEContratacao: Modulo = {
  id: 'estrutura-e-contratacao',
  trilhaId: 'cultura-organizacional',
  numero: 4,
  titulo: 'Estrutura e Contratação',
  subtitulo: 'Contratar rápido demais é o jeito mais caro de crescer devagar',
  iconName: 'Handshake',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['keeper-test'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar um processo de contratação com critérios claros, e entender por que a estrutura organizacional deve seguir a estratégia, não o contrário.',
  erroFatal: 'Contratar reativamente, só quando a dor de "estamos afundados em trabalho" fica insuportável, sem um critério claro do que a pessoa precisa entregar e como isso será medido — o resultado mais comum é uma contratação cara que não resolve o problema real.',
  numeroChave: { valor: '3x', legenda: 'o custo estimado de uma contratação errada, somando salário pago, tempo de treinamento, produtividade perdida da equipe e o custo de recomeçar o processo — cerca de três vezes o salário anual da posição' },
  glossarioDoModulo: ['Organograma', 'Job Description', 'Processo seletivo estruturado'],
  proximoPasso: { moduloId: 'disagree-and-commit', motivo: 'Depois de estruturar quem entra na equipe, o próximo módulo ensina como o time discorda de decisões e ainda assim executa junto.' },

  aprender: {
    oQueE: 'Estrutura organizacional é o desenho de como o trabalho se divide entre as pessoas — quem reporta para quem, quais áreas existem, e como as responsabilidades se distribuem. Contratação estruturada é o processo de definir, antes de abrir uma vaga, exatamente o que a pessoa precisa entregar, quais critérios objetivos vão avaliar os candidatos, e como o sucesso na função será medido depois de contratada.',
    porQueImporta: 'A maioria das contratações erradas não acontece por falta de bons candidatos no mercado — acontece porque a empresa nunca definiu com clareza o que estava procurando. Contratar de forma reativa, só quando a dor do excesso de trabalho fica insuportável, tende a produzir descrições de vaga vagas demais, entrevistas sem critério consistente entre candidatos, e expectativas que só ficam claras (e frustradas) depois que a pessoa já está contratada.',
    naPratica: 'A estrutura organizacional deveria nascer da estratégia da empresa, não o contrário — antes de desenhar o organograma, é preciso saber quais funções são realmente necessárias para executar o plano dos próximos meses. Para cada vaga, o processo estruturado começa com uma descrição clara do que a pessoa vai entregar (não só suas responsabilidades, mas o resultado esperado), segue com critérios objetivos de avaliação que são os mesmos para todos os candidatos, e termina com uma decisão baseada nesses critérios, não em impressão geral ou simpatia pessoal na entrevista.',
    passoAPasso: [
      'Antes de abrir uma vaga, defina claramente o resultado que a pessoa precisa entregar nos primeiros 90 dias e no primeiro ano.',
      'Escreva critérios objetivos de avaliação — habilidades específicas, experiências necessárias — antes de olhar qualquer currículo.',
      'Use os mesmos critérios e, se possível, as mesmas perguntas para todos os candidatos da vaga, para permitir comparação justa.',
      'Envolva mais de uma pessoa no processo de decisão, especialmente para posições-chave, para reduzir o viés de uma única impressão.',
      'Revise periodicamente se a estrutura organizacional ainda reflete a estratégia atual da empresa, não a de seis meses atrás.',
    ],
    errosComuns: [
      'Contratar reativamente, só quando o excesso de trabalho já está insustentável, sem tempo para um processo estruturado.',
      'Decidir uma contratação principalmente pela simpatia da entrevista, sem critérios objetivos comparáveis entre candidatos.',
      'Deixar o organograma crescer de forma orgânica e desorganizada, sem revisão periódica de se ele ainda serve à estratégia atual.',
      'Não definir claramente o que sucesso significa na função antes de contratar, dificultando qualquer avaliação justa depois.',
    ],
    checklist: [
      'Defini o resultado esperado da vaga antes de divulgá-la.',
      'Tenho critérios objetivos de avaliação, os mesmos para todos os candidatos.',
      'Envolvo mais de uma pessoa nas decisões de contratação para posições-chave.',
      'Reviso periodicamente se o organograma ainda reflete a estratégia atual da empresa.',
    ],
    livroRelacionado: {
      livroId: 'homem-mais-rico-babilonia',
      textoConexao: 'O princípio de planejar antes de agir, central no livro, se aplica diretamente à contratação: definir com clareza o que se busca antes de abrir uma vaga evita o mesmo tipo de decisão por impulso que o livro alerta em relação a dinheiro.',
    },
  },

  mapaMental: {
    label: 'Estrutura e Contratação',
    subtitulo: 'Do organograma ao processo seletivo',
    ramos: [
      {
        id: 'estrutura',
        label: 'Estrutura Organizacional',
        cor: '#3B82F6',
        resumo: 'Nasce da estratégia, não o contrário',
        filhos: [
          { label: 'Quais funções são necessárias', desc: 'Para executar o plano dos próximos meses' },
          { label: 'Revisão periódica', desc: 'O organograma acompanha a estratégia que muda' },
        ],
      },
      {
        id: 'contratacao',
        label: 'Contratação Estruturada',
        cor: '#22C55E',
        resumo: 'Critérios antes de currículos',
        filhos: [
          { label: 'Resultado esperado definido', desc: 'Antes de abrir a vaga' },
          { label: 'Critérios objetivos', desc: 'Os mesmos para todos os candidatos' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos simular decisões de contratação, comparando abordagem reativa versus estruturada.',
    passos: [
      'Ler o cenário de contratação.',
      'Avaliar cada abordagem considerando se ela define critério antes ou depois de conhecer os candidatos.',
      'Escolher a abordagem mais estruturada.',
    ],
    exemploGuiado: 'Uma empresa percebe que o time de atendimento está sobrecarregado e decide contratar mais uma pessoa. Em vez de simplesmente publicar "vaga para atendimento" e escolher quem parecer mais simpático na entrevista, o gestor define primeiro: a pessoa precisa reduzir o tempo médio de resposta de 24h para 4h nos primeiros 60 dias, tem que ter experiência prévia com o sistema de chamados usado pela empresa, e será avaliada nesses dois critérios específicos em todas as entrevistas. O processo fica mais lento no início, mas a contratação tem muito mais chance de resolver o problema real.',
    cenarioGuiado: [
      {
        pergunta: 'Sua equipe está sobrecarregada e você precisa contratar rápido. Qual é a abordagem mais estruturada, mesmo sob pressão de tempo?',
        opcoes: [
          { texto: 'Publicar a vaga imediatamente e decidir na entrevista, com base na impressão geral de cada candidato', resultado: 'Isso é contratação reativa — mesmo sob pressão, decidir sem critério objetivo aumenta muito o risco de uma contratação que não resolve o problema real e custa caro para desfazer.' },
          { texto: 'Levar um dia para definir o resultado esperado e os critérios objetivos antes de divulgar a vaga', resultado: 'Mesmo sob pressão, esse investimento inicial de tempo reduz drasticamente o risco de uma contratação errada — que custaria muito mais tempo e dinheiro para corrigir depois.' },
          { texto: 'Pedir para um funcionário atual indicar alguém conhecido, sem processo formal', resultado: 'Indicação pode ser uma boa fonte de candidatos, mas sem critérios objetivos de avaliação, o risco de viés (contratar por proximidade, não por adequação real à vaga) aumenta bastante.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'O que deveria definir a estrutura organizacional de uma empresa?', verso: 'A estratégia — quais funções são necessárias para executar o plano dos próximos meses, não o crescimento orgânico e desorganizado.' },
    { id: 'fc2', frente: 'Qual é o primeiro passo de um processo de contratação estruturado?', verso: 'Definir claramente o resultado que a pessoa precisa entregar, antes mesmo de divulgar a vaga ou olhar currículos.' },
    { id: 'fc3', frente: 'Por que decidir uma contratação principalmente pela simpatia da entrevista é arriscado?', verso: 'Porque não permite comparação justa entre candidatos e aumenta o risco de contratar alguém que não entrega o resultado necessário, mesmo sendo agradável na conversa.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo este módulo, o que deveria definir a estrutura organizacional de uma empresa?',
      alternativas: [
        'O organograma de uma empresa concorrente de sucesso',
        'A estratégia da empresa — quais funções são necessárias para executá-la',
        'O número de funcionários que a empresa pode pagar naquele mês',
        'A preferência pessoal do fundador sobre como organizar times',
      ],
      correta: 1,
      explicacao: 'A estrutura organizacional deveria nascer da estratégia — quais funções são realmente necessárias para executar o plano — não de cópia de outra empresa ou de crescimento desorganizado.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Qual é o principal risco de contratar de forma reativa, só quando a dor de excesso de trabalho fica insuportável?',
      alternativas: [
        'A vaga demora mais para ser preenchida',
        'A descrição da vaga e os critérios de avaliação tendem a ficar vagos, aumentando o risco de contratação errada',
        'O salário oferecido é sempre menor',
        'A empresa é obrigada a contratar mais de uma pessoa por vez',
      ],
      correta: 1,
      explicacao: 'A pressa da contratação reativa costuma produzir descrições vagas e critérios inconsistentes entre candidatos, o que aumenta significativamente o risco de uma contratação que não resolve o problema real.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Não tenho tempo para um processo de contratação longo. O que fazer?',
      resposta: 'O processo estruturado não precisa ser longo — pode ser rápido, desde que os critérios sejam definidos antes de olhar candidatos. O investimento de algumas horas para definir resultado esperado e critérios objetivos costuma economizar muito mais tempo depois, evitando uma contratação errada.',
    },
    {
      pergunta: 'Vale a pena revisar o organograma mesmo numa empresa pequena?',
      resposta: 'Sim — mesmo com poucas pessoas, definir claramente quem é responsável por quê evita sobreposição de esforço e lacunas onde ninguém se sente dono de um problema.',
    },
  ],
}
