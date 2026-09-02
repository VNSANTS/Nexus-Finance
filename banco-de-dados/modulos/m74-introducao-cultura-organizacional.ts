import { Modulo } from '@/types'

export const introducaoCulturaOrganizacional: Modulo = {
  id: 'introducao-cultura-organizacional',
  trilhaId: 'cultura-organizacional',
  numero: 1,
  titulo: 'Introdução: Cultura Organizacional',
  subtitulo: 'O sistema invisível que decide o que acontece quando ninguém está olhando',
  iconName: 'Users',
  duracaoMin: 8,

  nivel: 'intermediario',
  objetivoAprendizagem: 'Você vai sair entendendo por que cultura organizacional não é um conjunto de valores pendurados na parede, mas um sistema de decisões, contratações e conversas que se repete todos os dias.',
  erroFatal: 'Tratar cultura como algo abstrato demais para ser gerenciado com método — decisões de contratação, demissão, conflito e prioridade acontecem todos os dias, com ou sem intenção, e é isso que forma a cultura real, não o discurso sobre ela.',
  numeroChave: { valor: '6 mecanismos', legenda: 'esta trilha cobre seis mecanismos concretos e repetíveis — do teste de manutenção de talentos aos rituais de conversa individual — que juntos formam uma cultura de verdade, não um pôster na parede' },
  glossarioDoModulo: ['Cultura organizacional', 'Informed Captain', 'Keeper Test', 'OKR'],
  proximoPasso: { moduloId: 'informed-captain', motivo: 'A primeira aula da trilha mostra como decisões são tomadas sem virar nem autoritarismo nem paralisia por consenso.' },

  aprender: {
    oQueE: 'Esta trilha ensina os mecanismos concretos por trás de culturas organizacionais que funcionam de verdade — o segundo dos quatro pilares de um guia de gestão que também cobre Geração de Receita, Eficiência Operacional e Gestão Financeira. Cultura, aqui, não é discurso institucional: é o padrão real de como decisões são tomadas, quem é mantido na equipe, como conflitos são resolvidos e como o trabalho é acompanhado.',
    porQueImporta: 'Toda empresa tem uma cultura, queira ela ou não — a pergunta nunca é "temos cultura?", é "a cultura que temos foi escolhida de propósito, ou apenas aconteceu?". Empresas sem método de cultura acabam decidindo cada situação difícil (uma contratação errada, um conflito entre sócios, uma meta não batida) na hora, no impulso, sem um sistema que já tenha pensado sobre aquilo antes.',
    naPratica: 'Cada módulo desta trilha corresponde a uma aula do guia original, cobrindo um mecanismo específico: como decisões são tomadas sem virar autoritarismo (Informed Captain), como saber se alguém deveria continuar na equipe (Keeper Test), como estruturar contratação e organograma, como discordar e ainda assim executar junto (Disagree and Commit), como conduzir conversas individuais de verdade, e como definir metas que alinham o time sem microgerenciamento (OKRs). Como esses temas não são numéricos como os de finanças, as simulações desta trilha usam cenários de decisão em vez de calculadoras — você vai escolher entre opções realistas e ver o resultado de cada escolha.',
    passoAPasso: [
      'Comece pelo módulo "Informed Captain" — ele dá o modelo de decisão que sustenta todos os outros mecanismos desta trilha.',
      'Siga a ordem dos módulos: da decisão individual até o alinhamento de times inteiros via OKR.',
      'Em cada módulo, resolva o cenário guiado antes de olhar a resposta — o objetivo é praticar a decisão, não só ler sobre ela.',
      'Aplique pelo menos um mecanismo por semana na prática, mesmo em pequena escala.',
    ],
    errosComuns: [
      'Tratar cultura como um projeto de RH isolado, em vez de um conjunto de decisões que qualquer líder toma todos os dias.',
      'Copiar a cultura de outra empresa (geralmente uma big tech) sem adaptar ao tamanho e ao momento do próprio negócio.',
      'Achar que cultura forte significa unanimidade — Disagree and Commit, um dos módulos desta trilha, defende exatamente o oposto.',
      'Definir valores bonitos sem nenhum mecanismo concreto (como o Keeper Test) para colocá-los em prática nas decisões difíceis.',
    ],
    checklist: [
      'Entendi que cultura é um sistema de decisões repetidas, não um discurso institucional.',
      'Sei que esta trilha usa cenários de decisão em vez de calculadoras, porque o conteúdo não é numérico.',
      'Tenho pelo menos uma decisão real e recente (contratação, conflito, meta) para usar como referência ao longo da trilha.',
      'Entendi que esta é a segunda de quatro trilhas — Receita, Eficiência e Financeiro completam o conjunto.',
    ],
  },

  mapaMental: {
    label: 'Cultura Organizacional',
    subtitulo: 'O mapa dos seis módulos desta trilha',
    ramos: [
      {
        id: 'decidir',
        label: 'Decidir',
        cor: '#8B5CF6',
        resumo: 'Como decisões são tomadas',
        filhos: [
          { label: 'Informed Captain', desc: 'Decisão individual informada, não autoritária' },
          { label: 'Disagree and Commit', desc: 'Discordar na discussão, executar junto depois' },
        ],
      },
      {
        id: 'formar-o-time',
        label: 'Formar o Time',
        cor: '#3B82F6',
        resumo: 'Quem fica, como e por quê',
        filhos: [
          { label: 'Keeper Test', desc: 'Saber se alguém deveria continuar na equipe' },
          { label: 'Estrutura e contratação', desc: 'Organograma e processo seletivo com critério' },
        ],
      },
      {
        id: 'acompanhar',
        label: 'Acompanhar',
        cor: '#22C55E',
        resumo: 'Rituais que sustentam a cultura no dia a dia',
        filhos: [
          { label: 'Conversas 1:1', desc: 'O ritual mais subestimado da liderança' },
          { label: 'OKRs', desc: 'Metas que alinham sem microgerenciar' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Este módulo é a porta de entrada da trilha — a simulação de verdade acontece módulo a módulo, com cenários de decisão.',
    passos: [
      'Pense numa decisão de cultura recente e difícil que você tomou ou observou de perto.',
      'Ao entrar em cada módulo, compare a decisão real com o mecanismo ensinado, e veja o que teria mudado.',
    ],
    exemploGuiado: 'Um sócio de uma pequena agência de marketing precisa decidir sozinho se demite um funcionário talentoso, mas difícil de conviver, ou dá mais uma chance. Sem nenhum mecanismo, essa decisão vira puramente emocional — decidida pelo humor do dia. Com o Keeper Test (um dos módulos desta trilha), a pergunta certa não é "essa pessoa é boa?", é "se ela pedisse demissão hoje, eu lutaria para mantê-la?" — uma pergunta que remove boa parte do ruído emocional da decisão.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Segundo esta trilha, o que é cultura organizacional, de verdade?', verso: 'O padrão real de como decisões são tomadas, quem é mantido na equipe, como conflitos são resolvidos e como o trabalho é acompanhado — não um discurso institucional.' },
    { id: 'fc2', frente: 'Por que as simulações desta trilha usam cenários de decisão em vez de calculadoras?', verso: 'Porque o conteúdo de cultura não é numérico — a prática certa é escolher entre decisões realistas e ver o resultado de cada escolha.' },
    { id: 'fc3', frente: 'Qual é o erro de achar que cultura forte significa unanimidade?', verso: 'O módulo Disagree and Commit defende o oposto: discordar abertamente na discussão e, uma vez decidido, executar junto sem sabotagem.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo esta trilha, quando uma empresa realmente "tem" uma cultura organizacional?',
      alternativas: [
        'Só quando publica seus valores institucionais',
        'Sempre — toda empresa tem uma cultura, escolhida de propósito ou não',
        'Apenas empresas grandes têm cultura organizacional',
        'Somente após contratar um departamento de RH',
      ],
      correta: 1,
      explicacao: 'Toda empresa tem uma cultura, queira ela ou não. A questão não é se ela existe, mas se foi escolhida de propósito ou apenas aconteceu por acaso.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que esta trilha usa cenários de decisão simulados em vez de calculadoras, diferente da trilha de Geração de Receita?',
      alternativas: [
        'Porque cultura organizacional não tem nenhuma aplicação prática',
        'Porque o conteúdo de cultura é qualitativo e comportamental, não numérico',
        'Porque calculadoras são reservadas apenas para o pilar financeiro',
        'Porque esta trilha é menos importante que as outras',
      ],
      correta: 1,
      explicacao: 'O conteúdo de cultura trata de decisões e comportamentos, não de fórmulas numéricas — por isso a prática certa é simular a decisão em si, não calcular um resultado.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Sou um time de uma pessoa só. Essa trilha ainda serve para mim?',
      resposta: 'Sim, principalmente os módulos sobre decisão (Informed Captain) e prioridade — mesmo sozinho, você toma decisões que, ao contratar a primeira pessoa, vão definir o padrão cultural desde o início.',
    },
    {
      pergunta: 'Preciso seguir a ordem dos módulos desta trilha?',
      resposta: 'É recomendado, mas menos rígido que na trilha de Receita — os temas de cultura têm menos dependência sequencial entre si. Ainda assim, Informed Captain como primeiro módulo ajuda a entender o racional por trás dos demais.',
    },
  ],
}
