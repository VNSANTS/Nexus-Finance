import { Modulo } from '@/types'

export const introducaoEficienciaOperacional: Modulo = {
  id: 'introducao-eficiencia-operacional',
  trilhaId: 'eficiencia-operacional',
  numero: 1,
  titulo: 'Introdução: Eficiência Operacional',
  subtitulo: 'O método da Toyota, adaptado para qualquer tipo de operação',
  iconName: 'Settings2',
  duracaoMin: 8,

  nivel: 'intermediario',
  objetivoAprendizagem: 'Você vai sair entendendo por que eficiência operacional não é sobre trabalhar mais rápido, mas sobre eliminar sistematicamente o que não gera valor.',
  erroFatal: 'Tentar ser mais eficiente pedindo para a equipe "correr mais" ou "se esforçar mais", em vez de identificar e eliminar os desperdícios estruturais do processo — esforço extra sobre um processo ruim só produz cansaço extra, não resultado extra.',
  numeroChave: { valor: '8 desperdícios', legenda: 'o Sistema Toyota de Produção identificou oito tipos específicos de desperdício que existem em praticamente qualquer operação — mapear cada um é o primeiro módulo desta trilha' },
  glossarioDoModulo: ['Muda', 'VSM', 'Kaizen', 'OEE'],
  proximoPasso: { moduloId: 'oito-desperdicios', motivo: 'A primeira aula da trilha mapeia os oito tipos de desperdício que existem em praticamente qualquer processo, o ponto de partida para eliminar qualquer um deles.' },

  aprender: {
    oQueE: 'Esta trilha adapta o Sistema Toyota de Produção — um dos métodos de gestão operacional mais estudados do mundo — para qualquer tipo de negócio, não só fábricas. É o terceiro dos quatro pilares de um guia de gestão que também cobre Geração de Receita, Cultura e Gestão Financeira. O fio condutor é simples: toda operação, seja uma linha de montagem ou um escritório de serviços, tem desperdícios escondidos — tempo, material ou esforço que não geram nenhum valor para o cliente final — e a eficiência real vem de encontrar e eliminar esses desperdícios sistematicamente.',
    porQueImporta: 'A reação mais comum a um processo lento ou caro é "precisamos trabalhar mais rápido" ou "precisamos de mais gente". Raramente a reação é "precisamos entender por que esse processo é lento em primeiro lugar". O método desta trilha inverte essa lógica: antes de acelerar ou aumentar recursos, mapeia-se onde exatamente o tempo e o dinheiro estão sendo desperdiçados — muitas vezes a resposta não é "trabalhar mais rápido", é "parar de fazer uma etapa que nunca deveria ter existido".',
    naPratica: 'Cada módulo desta trilha corresponde a uma aula do guia original: os oito desperdícios (Muda) que aparecem em qualquer operação, o mapeamento do fluxo de valor (VSM) para visualizar o processo inteiro, o ciclo de melhoria contínua (Kaizen e PDCA), a métrica que mede eficiência real de um equipamento ou processo (OEE), a ordem correta de prioridade ao otimizar (pessoas, depois processos, depois tecnologia) e como calcular se um corte de custo específico realmente vale a pena.',
    passoAPasso: [
      'Comece pelo módulo "Os Oito Desperdícios" — ele dá o vocabulário e a lente para enxergar ineficiência em qualquer processo.',
      'Siga para o mapeamento de fluxo de valor, que visualiza o processo inteiro do início ao fim.',
      'Use os módulos de Kaizen/PDCA e OEE para estruturar como melhorar de forma contínua e medir o resultado.',
      'Aplique a ordem pessoas-processos-tecnologia antes de qualquer decisão de investimento em automação.',
      'Use a calculadora de alavancagem de corte de custo para decidir com números, não com impressão, onde vale a pena cortar.',
    ],
    errosComuns: [
      'Tentar acelerar um processo ineficiente em vez de primeiro eliminar as etapas que não geram valor.',
      'Investir em tecnologia para resolver um problema que na verdade é de processo mal desenhado ou pessoas sem treinamento adequado.',
      'Fazer uma única grande reforma operacional em vez de melhoria contínua e incremental (o espírito do Kaizen).',
      'Medir apenas volume produzido, sem considerar disponibilidade, performance e qualidade — os três componentes do OEE.',
    ],
    checklist: [
      'Entendi que eficiência não é "trabalhar mais rápido", é eliminar desperdício estrutural.',
      'Sei que esta trilha segue a lógica do Sistema Toyota de Produção, adaptada a qualquer tipo de negócio.',
      'Tenho em mente um processo real do meu negócio (ou de um que conheço bem) para mapear ao longo da trilha.',
      'Entendi que esta é a terceira de quatro trilhas — Receita, Cultura e Financeiro completam o conjunto.',
    ],
  },

  mapaMental: {
    label: 'Eficiência Operacional',
    subtitulo: 'O mapa dos seis módulos desta trilha',
    ramos: [
      {
        id: 'enxergar-o-desperdicio',
        label: 'Enxergar o Desperdício',
        cor: '#F97316',
        resumo: 'O vocabulário e o mapa',
        filhos: [
          { label: 'Os 8 desperdícios (Muda)', desc: 'O que existe em quase toda operação' },
          { label: 'VSM', desc: 'Mapear o fluxo de valor do início ao fim' },
        ],
      },
      {
        id: 'melhorar-continuamente',
        label: 'Melhorar Continuamente',
        cor: '#3B82F6',
        resumo: 'Ciclo, não evento único',
        filhos: [
          { label: 'Kaizen e PDCA', desc: 'Melhoria incremental e contínua' },
          { label: 'OEE', desc: 'A métrica que mede eficiência real' },
        ],
      },
      {
        id: 'decidir-onde-investir',
        label: 'Decidir Onde Investir',
        cor: '#22C55E',
        resumo: 'A ordem certa de prioridade',
        filhos: [
          { label: 'Pessoas → Processos → Tecnologia', desc: 'Nessa ordem, não ao contrário' },
          { label: 'Alavancagem de corte de custo', desc: 'Decidir com número, não com impressão' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Este módulo é a porta de entrada da trilha — a simulação de verdade acontece módulo a módulo.',
    passos: [
      'Pense num processo do seu negócio (ou de um que você conhece bem) que parece mais lento ou caro do que deveria.',
      'Ao entrar em cada módulo, aplique o conceito a esse processo específico antes de olhar o exemplo pronto.',
    ],
    exemploGuiado: 'Uma pequena confeitaria percebe que os bolos personalizados demoram muito mais do que o esperado para ficar prontos. A reação intuitiva seria contratar mais um confeiteiro. Mas ao mapear o processo (o que essa trilha ensina a fazer), descobre-se que boa parte do tempo é gasto esperando a geladeira industrial esfriar a massa entre etapas — um desperdício de espera, um dos oito tipos mapeados no próximo módulo. Resolver isso (comprando uma segunda geladeira menor, por exemplo) custa muito menos que contratar uma pessoa nova, e resolve a causa real do atraso.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual sistema de gestão operacional serve de base para esta trilha?', verso: 'O Sistema Toyota de Produção, adaptado para qualquer tipo de negócio, não só fábricas.' },
    { id: 'fc2', frente: 'Qual é a lógica central desta trilha sobre eficiência?', verso: 'Eficiência não vem de trabalhar mais rápido, vem de eliminar sistematicamente o que não gera valor (desperdício estrutural).' },
    { id: 'fc3', frente: 'Antes de acelerar um processo, o que esta trilha recomenda fazer primeiro?', verso: 'Mapear onde exatamente o tempo e o dinheiro estão sendo desperdiçados — às vezes a resposta é eliminar uma etapa, não acelerá-la.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo esta trilha, qual é o erro mais comum ao tentar melhorar um processo lento?',
      alternativas: [
        'Mapear o fluxo de valor antes de agir',
        'Pedir para a equipe trabalhar mais rápido, sem identificar os desperdícios estruturais do processo',
        'Investir em treinamento da equipe',
        'Medir a eficiência com o indicador OEE',
      ],
      correta: 1,
      explicacao: 'Esforço extra sobre um processo com desperdício estrutural só produz cansaço extra, não resultado extra — o caminho certo é identificar e eliminar o desperdício primeiro.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Em qual sistema de gestão operacional esta trilha se baseia?',
      alternativas: [
        'Sistema Toyota de Produção',
        'Modelo de vendas consultivas',
        'Framework ágil de desenvolvimento de software',
        'Modelo contábil de custeio por absorção',
      ],
      correta: 0,
      explicacao: 'A trilha adapta o Sistema Toyota de Produção, um dos métodos de gestão operacional mais estudados do mundo, para qualquer tipo de negócio.',
      dificuldade: 'facil',
    },
  ],

  faq: [
    {
      pergunta: 'Esses conceitos servem só para fábricas e linhas de produção?',
      resposta: 'Não. Embora o Sistema Toyota de Produção tenha nascido na indústria, os conceitos de desperdício, fluxo e melhoria contínua se aplicam a qualquer operação — escritórios de serviço, restaurantes, clínicas, lojas.',
    },
    {
      pergunta: 'Preciso seguir a ordem dos módulos desta trilha?',
      resposta: 'É recomendado, especialmente começar pelos Oito Desperdícios — esse módulo dá o vocabulário usado em praticamente todos os outros da trilha.',
    },
  ],
}
