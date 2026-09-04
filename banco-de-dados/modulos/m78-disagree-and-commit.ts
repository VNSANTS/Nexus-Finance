import { Modulo } from '@/types'

export const disagreeAndCommit: Modulo = {
  id: 'disagree-and-commit',
  trilhaId: 'cultura-organizacional',
  numero: 5,
  titulo: 'Disagree and Commit',
  subtitulo: 'Discordar na sala, executar junto depois de decidido',
  iconName: 'Handshake',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['estrutura-e-contratacao'],
  objetivoAprendizagem: 'Você vai sair entendendo como um time pode debater com franqueza total e ainda assim executar unido depois que a decisão é tomada, sem sabotagem silenciosa.',
  erroFatal: 'Confundir "discordar e comprometer-se" com "concordar por educação e depois sabotar em silêncio" — o modelo só funciona se a discordância for expressa abertamente antes da decisão, não guardada para reclamação depois.',
  numeroChave: { valor: '2 momentos', legenda: 'o modelo separa claramente dois momentos que muitas equipes confundem: o momento de discordar abertamente (antes da decisão) e o momento de executar unido (depois dela)' },
  glossarioDoModulo: ['Disagree and Commit', 'Sabotagem silenciosa', 'Franqueza radical'],
  proximoPasso: { moduloId: 'conversas-1-1', motivo: 'Depois de aprender a discordar e executar junto, o próximo módulo ensina o ritual individual que sustenta essa confiança no dia a dia.' },

  aprender: {
    oQueE: 'Disagree and Commit (Discordar e Comprometer-se) é um princípio de decisão em equipe, também popularizado pela Amazon, que separa dois momentos claramente distintos: o momento de debater uma decisão, onde qualquer discordância deve ser expressa com total franqueza, e o momento posterior à decisão, onde todos — inclusive quem discordou — se comprometem a executar com o mesmo empenho de quem concordou plenamente.',
    porQueImporta: 'Equipes sem esse princípio caem em uma armadilha comum: durante a discussão, todo mundo concorda educadamente para evitar conflito, mas depois, na execução, quem discordava por dentro sabota silenciosamente — atrasando entregas, dando o mínimo esforço, ou minando a decisão em conversas paralelas. Isso é pior do que um debate acalorado, porque a discordância nunca fica visível o suficiente para ser resolvida — ela só aparece disfarçada de baixa performance.',
    naPratica: 'Para aplicar o modelo, é preciso primeiro criar segurança psicológica real para discordar abertamente durante a discussão — se as pessoas sentem que discordar tem custo social ou hierárquico, elas vão concordar por fora e sabotar por dentro. Uma vez que a decisão é tomada (seguindo, por exemplo, o modelo Informed Captain visto em módulo anterior), a expectativa muda: mesmo quem discordava se compromete a executar com o mesmo padrão de qualidade de quem concordava, e a reclamar só nos bastidores é considerado uma quebra de confiança com a equipe.',
    passoAPasso: [
      'Durante a discussão de uma decisão importante, convide explicitamente a discordância — pergunte diretamente quem vê riscos ou discorda, em vez de esperar silêncio como sinal de concordância.',
      'Garanta que discordar não tenha nenhum custo social ou hierárquico visível dentro da discussão.',
      'Uma vez tomada a decisão, comunique claramente que a fase de debate encerrou e a fase de execução começou.',
      'Se perceber sabotagem silenciosa depois da decisão, converse diretamente com a pessoa, lembrando do compromisso assumido de discordar antes, não depois.',
      'Reconheça publicamente quando alguém que discordou executa com o mesmo empenho de quem concordava — isso reforça o comportamento certo.',
    ],
    errosComuns: [
      'Confundir silêncio durante a discussão com concordância real — silêncio pode ser medo de discordar, não ausência de discordância.',
      'Punir, mesmo que sutilmente, quem discorda abertamente durante o debate, ensinando a equipe a guardar a discordância para depois.',
      'Não deixar claro quando a fase de debate encerrou e a de execução começou, deixando a decisão em limbo permanente.',
      'Tolerar sabotagem silenciosa pós-decisão sem conversar diretamente sobre isso, achando que vai se resolver sozinho.',
    ],
    checklist: [
      'Convido explicitamente a discordância durante a fase de discussão de decisões importantes.',
      'Garanto que discordar não tem custo social visível dentro da minha equipe.',
      'Comunico claramente quando uma decisão foi tomada e a fase de execução começou.',
      'Converso diretamente quando percebo sinais de sabotagem silenciosa pós-decisão.',
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'A confiança que sustenta relações de valor genuíno, tema central do livro, é a mesma confiança que permite discordar abertamente sem medo e ainda assim se comprometer com a decisão do grupo depois.',
    },
    naoConfundirCom: [
      { moduloId: 'informed-captain', diferenca: 'Informed Captain trata de como a decisão é tomada (quem decide e com base em qual informação); Disagree and Commit trata do que acontece depois — como a equipe executa mesmo quem discordava da decisão final.' },
    ],
  },

  mapaMental: {
    label: 'Disagree and Commit',
    subtitulo: 'Dois momentos, claramente separados',
    ramos: [
      {
        id: 'discordar',
        label: 'Momento de Discordar',
        cor: '#EF4444',
        resumo: 'Antes da decisão',
        filhos: [
          { label: 'Franqueza total', desc: 'Expressar riscos e objeções abertamente' },
          { label: 'Sem custo social', desc: 'Discordar não pode ser punido, nem sutilmente' },
        ],
      },
      {
        id: 'comprometer',
        label: 'Momento de Comprometer-se',
        cor: '#22C55E',
        resumo: 'Depois da decisão',
        filhos: [
          { label: 'Executar com o mesmo empenho', desc: 'Mesmo quem discordava, se compromete de verdade' },
          { label: 'Sem sabotagem silenciosa', desc: 'Reclamar nos bastidores quebra a confiança do time' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos simular a diferença entre comprometimento real e sabotagem silenciosa após uma decisão.',
    passos: [
      'Ler o cenário pós-decisão.',
      'Avaliar cada comportamento considerando se ele representa comprometimento real ou sabotagem disfarçada.',
      'Escolher o comportamento mais alinhado ao Disagree and Commit.',
    ],
    exemploGuiado: 'Numa reunião, um gerente de produto discorda abertamente da decisão de lançar uma nova funcionalidade antes de terminar os testes, argumentando os riscos com dados concretos. A decisão final, tomada pelo fundador, é lançar mesmo assim. Aplicando Disagree and Commit: o gerente já expressou sua discordância com franqueza durante a discussão — agora, na execução, ele lidera o lançamento com o mesmo cuidado e dedicação que teria se a decisão fosse dele, monitorando de perto os riscos que apontou, em vez de se afastar do projeto ou comentar nos corredores que "eu avisei que ia dar errado".',
    cenarioGuiado: [
      {
        pergunta: 'Você discordou de uma decisão da sua liderança durante a reunião, mas a decisão final foi diferente do que você defendia. Qual é a atitude alinhada com Disagree and Commit?',
        opcoes: [
          { texto: 'Executar a decisão com o mesmo empenho que teria se fosse sua escolha, mesmo discordando', resultado: 'Essa é a atitude correta: a discordância já foi expressa no momento certo (durante a discussão), e agora o compromisso é executar com qualidade, não sabotar silenciosamente.' },
          { texto: 'Concordar durante a reunião por educação, mas depois trabalhar no ritmo mínimo possível', resultado: 'Isso é sabotagem silenciosa — o problema central que o Disagree and Commit tenta evitar. A discordância deveria ter sido expressa na reunião, não guardada para minar a execução depois.' },
          { texto: 'Comentar com outros colegas, fora da reunião, que a decisão foi um erro', resultado: 'Isso quebra a confiança da equipe — mina a decisão pelas bordas em vez de ter expressado a discordância no momento certo, dentro da discussão formal.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa Disagree and Commit?', verso: 'Discordar abertamente durante a discussão de uma decisão, e se comprometer a executá-la com o mesmo empenho depois que ela é tomada.' },
    { id: 'fc2', frente: 'Quais são os dois momentos que o modelo separa claramente?', verso: 'O momento de discordar (durante o debate, com franqueza total) e o momento de comprometer-se (depois da decisão, na execução).' },
    { id: 'fc3', frente: 'O que é sabotagem silenciosa, no contexto deste módulo?', verso: 'Concordar por educação durante a discussão, mas depois minar a decisão através de baixo desempenho ou reclamações nos bastidores.' },
    { id: 'fc4', frente: 'Por que silêncio durante a discussão não deve ser confundido com concordância?', verso: 'Porque pode ser medo de discordar, não ausência real de discordância — por isso é importante convidar explicitamente a discordância durante o debate.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo este módulo, o que caracteriza a "sabotagem silenciosa"?',
      alternativas: [
        'Discordar abertamente durante a reunião de decisão',
        'Concordar por educação na discussão, mas minar a decisão depois através de baixo empenho ou reclamações nos bastidores',
        'Pedir mais tempo para pensar antes de decidir',
        'Executar a decisão com o mesmo empenho de quem concordava',
      ],
      correta: 1,
      explicacao: 'Sabotagem silenciosa é justamente concordar aparentemente na hora do debate, mas minar a decisão depois — é o comportamento que o Disagree and Commit busca prevenir.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que garantir que discordar não tenha custo social é essencial para o modelo funcionar?',
      alternativas: [
        'Porque sem isso, ninguém nunca discordaria de nada durante a discussão, e a discordância apareceria disfarçada de baixa performance depois',
        'Porque discordância sempre atrasa decisões importantes',
        'Porque times pequenos não precisam de discordância',
        'Porque isso é uma exigência legal em ambientes corporativos',
      ],
      correta: 0,
      explicacao: 'Se discordar tem custo social ou hierárquico, as pessoas tendem a concordar por fora e discordar por dentro, o que produz exatamente a sabotagem silenciosa que o modelo tenta evitar.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'E se, depois de comprometido, eu perceber que a decisão está mesmo errada, com dados novos?',
      resposta: 'Disagree and Commit não significa nunca reabrir uma decisão — significa não sabotar silenciosamente. Se surgirem dados novos e relevantes, é legítimo levar isso de volta à discussão formal, de forma transparente, em vez de simplesmente ignorar a decisão tomada.',
    },
    {
      pergunta: 'Esse modelo funciona em equipes pequenas, com poucas pessoas?',
      resposta: 'Sim, e talvez seja ainda mais importante nelas — em times pequenos, a sabotagem silenciosa de uma única pessoa tem impacto proporcionalmente maior no resultado geral do que em equipes grandes.',
    },
  ],
}
