import { Modulo } from '@/types'

export const pessoasProcessosTecnologia: Modulo = {
  id: 'pessoas-processos-tecnologia',
  trilhaId: 'eficiencia-operacional',
  numero: 6,
  titulo: 'A Ordem Certa: Pessoas, Processos, Tecnologia',
  subtitulo: 'Automatizar um processo ruim só faz o erro acontecer mais rápido',
  iconName: 'ListOrdered',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['oee'],
  objetivoAprendizagem: 'Você vai sair sabendo por que a ordem de otimização deveria ser sempre pessoas primeiro, depois processos, e só depois tecnologia — nunca ao contrário.',
  erroFatal: 'Comprar um software caro ou automatizar uma etapa antes de garantir que as pessoas estão bem treinadas e o processo está bem desenhado — tecnologia aplicada sobre um processo ruim só faz o erro acontecer com mais velocidade e escala, não menos.',
  numeroChave: { valor: '1ª, 2ª e 3ª', legenda: 'a ordem correta de investimento em otimização é sempre pessoas primeiro, processos em segundo lugar, e tecnologia só em terceiro — investir fora dessa ordem costuma desperdiçar o investimento em tecnologia' },
  glossarioDoModulo: ['Automação prematura', 'Treinamento', 'Redesenho de processo'],
  proximoPasso: { moduloId: 'alavancagem-corte-custo', motivo: 'Depois de saber em que ordem investir para melhorar, o último módulo da trilha ensina a calcular se um corte de custo específico realmente vale a pena.' },

  aprender: {
    oQueE: 'Este princípio defende uma ordem específica e não intercambiável ao tentar melhorar qualquer operação: primeiro garantir que as pessoas certas estão nas funções certas, com treinamento adequado; segundo, garantir que o processo em si está bem desenhado, sem os desperdícios mapeados em módulos anteriores; e só terceiro, considerar investir em tecnologia ou automação para acelerar ou escalar o que já funciona bem nos dois primeiros níveis.',
    porQueImporta: 'A tentação de "comprar a solução" é forte — parece mais rápido resolver um problema operacional com um software novo do que com o trabalho mais lento de treinar pessoas e redesenhar processos. Mas automatizar um processo mal desenhado normalmente só faz o erro acontecer mais rápido e em maior escala. Um exemplo clássico: automatizar o envio de um relatório que ninguém lê não economiza tempo de verdade, só torna o desperdício mais rápido e invisível.',
    naPratica: 'No nível de Pessoas, a pergunta é: as pessoas certas estão nas funções certas, com o treinamento e a clareza de expectativa necessários para fazer o trabalho bem? No nível de Processos, a pergunta é: mesmo com as pessoas certas, o caminho que o trabalho percorre é o mais direto e livre de desperdício possível (aplicando os conceitos de VSM e os oito desperdícios de módulos anteriores)? Só depois de responder sim às duas primeiras perguntas faz sentido perguntar, no nível de Tecnologia: existe uma ferramenta que aceleraria ou escalaria esse processo já otimizado, sem introduzir complexidade desnecessária?',
    passoAPasso: [
      'Antes de considerar qualquer investimento em tecnologia, avalie se a equipe atual tem o treinamento e a clareza necessários para executar bem.',
      'Em seguida, avalie se o processo em si está bem desenhado, aplicando o mapeamento de fluxo de valor e a busca por desperdícios de módulos anteriores.',
      'Só depois de resolver os dois primeiros níveis, avalie se existe uma tecnologia específica que aceleraria ou escalaria o processo já otimizado.',
      'Ao considerar uma nova tecnologia, pergunte especificamente o que ela resolve que treinamento ou redesenho de processo não resolveriam.',
      'Desconfie de qualquer solução tecnológica vendida como "resolve tudo" sem entender primeiro onde está o problema real — pessoas, processo ou de fato tecnologia.',
    ],
    errosComuns: [
      'Investir em automação ou software antes de resolver problemas óbvios de treinamento ou clareza de expectativa da equipe.',
      'Automatizar um processo com desperdícios não resolvidos, escalando o próprio problema em vez de eliminá-lo.',
      'Achar que tecnologia é sempre a solução mais "moderna" ou "profissional", ignorando que às vezes o problema real é simples e barato de resolver no nível de pessoas ou processo.',
      'Comprar uma ferramenta cara baseada em uma demonstração de vendas, sem validar se ela resolve o problema específico identificado nos dois primeiros níveis.',
    ],
    checklist: [
      'Avaliei o nível de Pessoas antes de qualquer investimento em tecnologia.',
      'Avaliei o nível de Processos, aplicando VSM e os oito desperdícios, antes de automatizar.',
      'Só considerei tecnologia depois de resolver os dois primeiros níveis.',
      'Fiz a pergunta específica: o que essa tecnologia resolve que treinamento ou redesenho não resolveriam?',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey defende resolver a base (hábito e comportamento) antes de buscar ferramentas sofisticadas de investimento — o mesmo princípio de sequência se aplica aqui: pessoas e processo antes de tecnologia.',
    },
  },

  mapaMental: {
    label: 'Pessoas, Processos, Tecnologia',
    subtitulo: 'A ordem que evita desperdiçar investimento',
    ramos: [
      {
        id: 'pessoas',
        label: '1º: Pessoas',
        cor: '#3B82F6',
        resumo: 'As certas, nas funções certas, treinadas',
        filhos: [
          { label: 'Treinamento adequado', desc: 'Clareza de expectativa e capacidade real' },
        ],
      },
      {
        id: 'processos',
        label: '2º: Processos',
        cor: '#22C55E',
        resumo: 'Bem desenhados, sem desperdício',
        filhos: [
          { label: 'VSM e os 8 desperdícios', desc: 'Aplicados antes de qualquer automação' },
        ],
      },
      {
        id: 'tecnologia',
        label: '3º: Tecnologia',
        cor: '#8B5CF6',
        resumo: 'Só depois de otimizar os dois primeiros',
        filhos: [
          { label: 'Acelera o que já funciona', desc: 'Não conserta o que está quebrado na base' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos avaliar decisões de investimento em otimização, na ordem certa.',
    passos: [
      'Ler o cenário de decisão de investimento.',
      'Avaliar se a solução proposta respeita a ordem pessoas-processos-tecnologia.',
      'Escolher a decisão mais alinhada com o princípio.',
    ],
    exemploGuiado: 'Uma empresa de logística sofre com atrasos constantes nas entregas. A primeira reação da diretoria é comprar um sistema caro de rastreamento em tempo real. Mas ao investigar antes (seguindo a ordem certa), descobrem que os motoristas não receberam treinamento adequado sobre a nova rota otimizada implementada há dois meses (problema de Pessoas), e que o processo de despacho tem uma etapa redundante de dupla conferência que atrasa a saída dos veículos (problema de Processo). Resolvendo esses dois pontos primeiro, sem gastar nada em tecnologia nova, os atrasos já caem significativamente — e só então a empresa avalia se ainda vale investir em rastreamento para o ganho adicional que sobrar.',
    cenarioGuiado: [
      {
        pergunta: 'Sua equipe de atendimento está demorando demais para responder clientes. Qual é a primeira ação, seguindo a ordem correta?',
        opcoes: [
          { texto: 'Comprar imediatamente um chatbot de inteligência artificial para automatizar respostas', resultado: 'Pular direto para tecnologia sem avaliar pessoas e processo é o erro clássico — se o processo de atendimento tem desperdícios ou a equipe não está bem treinada, o chatbot pode só automatizar e escalar o problema existente.' },
          { texto: 'Avaliar primeiro se a equipe tem treinamento e clareza suficiente, e se o processo de atendimento tem etapas desnecessárias', resultado: 'Essa é a ordem correta: pessoas e processo antes de tecnologia. Frequentemente essa investigação já resolve boa parte do problema sem nenhum investimento em ferramenta nova.' },
          { texto: 'Contratar mais atendentes imediatamente, sem investigar a causa da demora', resultado: 'Adicionar mais pessoas sem entender a causa raiz pode aliviar o sintoma temporariamente, mas não resolve se o problema real é treinamento inadequado ou um processo com etapas desnecessárias — o mesmo problema volta a aparecer conforme a demanda cresce.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é a ordem correta de otimização, segundo este módulo?', verso: 'Pessoas primeiro, processos em segundo lugar, e tecnologia só em terceiro.' },
    { id: 'fc2', frente: 'Por que automatizar um processo mal desenhado é um erro comum?', verso: 'Porque tecnologia aplicada sobre um processo ruim só faz o erro acontecer com mais velocidade e escala, não menos.' },
    { id: 'fc3', frente: 'Qual pergunta fazer antes de investir em qualquer nova tecnologia, segundo este módulo?', verso: 'O que essa tecnologia resolve que treinamento de pessoas ou redesenho de processo não resolveriam?' },
  ],

  quiz: [
    {
      pergunta: 'Segundo este módulo, qual é a ordem correta de investimento ao tentar melhorar uma operação?',
      alternativas: [
        'Tecnologia, depois processos, depois pessoas',
        'Pessoas, depois processos, depois tecnologia',
        'Processos, depois tecnologia, depois pessoas',
        'A ordem não importa, desde que os três sejam resolvidos eventualmente',
      ],
      correta: 1,
      explicacao: 'A ordem certa é pessoas primeiro (treinamento e função certa), processos em segundo (desenho eficiente), e tecnologia só em terceiro (para acelerar o que já funciona bem).',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que comprar uma tecnologia cara antes de resolver problemas de pessoas ou processo costuma ser um desperdício?',
      alternativas: [
        'Porque tecnologia é sempre mais cara do que treinamento',
        'Porque automatizar um problema estrutural mal resolvido só escala esse mesmo problema mais rápido',
        'Porque tecnologia nunca resolve nenhum tipo de problema operacional',
        'Porque tecnologia é ilegal em determinados setores regulados',
      ],
      correta: 1,
      explicacao: 'A tecnologia acelera o que já existe — se o que existe é um processo com desperdício ou uma equipe sem treinamento, a tecnologia amplifica o problema, não o resolve.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Existe alguma exceção a essa ordem?',
      resposta: 'Em casos raros, uma tecnologia específica pode ser tão transformadora que vale investir mesmo com pessoas ou processo ainda imperfeitos — mas isso é exceção, não regra. Na dúvida, vale sempre investigar pessoas e processo primeiro, já que geralmente é mais barato e revela problemas que a tecnologia sozinha não resolveria.',
    },
    {
      pergunta: 'Como sei se já resolvi o suficiente nos níveis de pessoas e processos para considerar tecnologia?',
      resposta: 'Um bom sinal é quando o processo, mapeado via VSM, já está sem desperdícios óbvios dos oito tipos vistos anteriormente, e a equipe está entregando de forma consistente. Nesse ponto, tecnologia tende a acelerar um sistema que já funciona, em vez de mascarar um que não funciona.',
    },
  ],
}
