import { Modulo } from '@/types'

export const okrs: Modulo = {
  id: 'okrs',
  trilhaId: 'cultura-organizacional',
  numero: 7,
  titulo: 'OKRs',
  subtitulo: 'Metas que alinham o time sem exigir que o líder acompanhe cada tarefa',
  iconName: 'Target',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['conversas-1-1'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar Objetivos e Resultados-Chave que alinham o time em torno de metas claras, sem precisar microgerenciar como cada uma será alcançada.',
  erroFatal: 'Confundir OKR com lista de tarefas — um Resultado-Chave precisa ser um número mensurável que comprova que o Objetivo foi alcançado, não uma atividade marcada como "feita ou não feita".',
  numeroChave: { valor: '70%', legenda: 'muitas empresas que usam OKR de forma ambiciosa consideram atingir 70% de um Resultado-Chave como sucesso — bater 100% toda vez pode ser sinal de metas fáceis demais, não de alta performance' },
  glossarioDoModulo: ['OKR', 'Objetivo', 'Resultado-Chave', 'KPI'],
  proximoPasso: undefined,

  aprender: {
    oQueE: 'OKR, sigla para Objectives and Key Results (Objetivos e Resultados-Chave), é um framework de definição de metas usado para alinhar times em torno de prioridades claras. Um Objetivo é uma direção qualitativa e inspiradora (por exemplo, "tornar-se referência de atendimento no nosso mercado"); os Resultados-Chave são de dois a quatro números mensuráveis que, juntos, comprovam que o objetivo foi alcançado (por exemplo, "elevar a nota de satisfação de 7 para 9" ou "reduzir o tempo médio de resposta de 24h para 4h").',
    porQueImporta: 'Sem um framework de metas claro, cada pessoa da equipe prioriza o que parece mais urgente no dia, sem necessariamente estar alinhado com o que a empresa mais precisa naquele momento. OKRs resolvem isso definindo com clareza para onde o time está indo (o Objetivo) e como saber se está no caminho certo (os Resultados-Chave), sem exigir que o líder acompanhe e aprove cada tarefa individual — as pessoas ganham liberdade de decidir como chegar lá, desde que o resultado apareça no número.',
    naPratica: 'Um bom OKR começa com um Objetivo qualitativo, ambicioso e inspirador — não um número, uma direção. Cada Objetivo tem de dois a quatro Resultados-Chave, que precisam ser especificamente números: uma meta de "melhorar o atendimento" não é um Resultado-Chave válido, mas "elevar a nota de satisfação de 7 para 9" é. A diferença entre OKR e KPI (Key Performance Indicator) é sutil, mas importante: um KPI é um indicador contínuo de saúde do negócio (como taxa de churn mensal, monitorada sempre); um OKR é um alvo específico e temporário, definido para um período determinado (geralmente um trimestre), que expira e é redefinido.',
    passoAPasso: [
      'Defina um Objetivo qualitativo e inspirador para o período (geralmente um trimestre) — a direção, não o número.',
      'Escolha de dois a quatro Resultados-Chave, cada um sendo um número específico e mensurável que comprova o Objetivo.',
      'Evite transformar um Resultado-Chave em uma lista de tarefas — "lançar a nova funcionalidade" não é Resultado-Chave, é uma tarefa; "aumentar a retenção de usuários de 60% para 75%" é.',
      'Compartilhe os OKRs com toda a equipe, permitindo que cada pessoa entenda como o próprio trabalho se conecta ao objetivo maior.',
      'Revise o progresso periodicamente (semanal ou quinzenal), sem microgerenciar como cada Resultado-Chave está sendo perseguido.',
    ],
    errosComuns: [
      'Escrever Resultados-Chave como tarefas ("lançar X", "fazer Y") em vez de números mensuráveis que comprovam um resultado.',
      'Definir metas fáceis demais para garantir 100% de atingimento, o que elimina o propósito de usar OKR para buscar mais do que o óbvio.',
      'Confundir OKR (meta temporária e específica de um período) com KPI (indicador contínuo de saúde do negócio, sempre monitorado).',
      'Definir OKRs demais ao mesmo tempo, diluindo o foco — o framework funciona melhor com poucos objetivos bem definidos, não uma lista longa.',
    ],
    comparativo: {
      titulo: 'OKR vs. KPI',
      linhas: [
        { label: 'OKR', valor: 'Meta específica e temporária | Definida para um período (ex: trimestre), depois expira e é redefinida' },
        { label: 'KPI', valor: 'Indicador contínuo de saúde | Monitorado sempre, sem prazo de expiração' },
      ],
    },
    checklist: [
      'Meu Objetivo é qualitativo e inspirador, não um número disfarçado.',
      'Cada Resultado-Chave é um número mensurável, não uma tarefa marcada como feita ou não feita.',
      'Tenho entre dois e quatro Resultados-Chave por Objetivo, não uma lista longa.',
      'Compartilhei os OKRs com a equipe, para que cada pessoa entenda a conexão com seu próprio trabalho.',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'O método de Dave Ramsey defende metas específicas e mensuráveis, com prazo, em vez de intenções vagas — o mesmo princípio central que separa um Resultado-Chave válido de uma lista de boas intenções.',
    },
  },

  mapaMental: {
    label: 'OKRs',
    subtitulo: 'Objetivos e Resultados-Chave',
    ramos: [
      {
        id: 'objetivo',
        label: 'O Objetivo',
        cor: '#8B5CF6',
        resumo: 'Qualitativo e inspirador',
        filhos: [
          { label: 'Uma direção, não um número', desc: 'Ex: "tornar-se referência de atendimento"' },
        ],
      },
      {
        id: 'resultados-chave',
        label: 'Os Resultados-Chave',
        cor: '#22C55E',
        resumo: 'De 2 a 4 números mensuráveis',
        filhos: [
          { label: 'Comprovam o objetivo', desc: 'Não são tarefas, são resultados numéricos' },
          { label: 'Exemplo', desc: 'Elevar a nota de satisfação de 7 para 9' },
        ],
      },
      {
        id: 'okr-vs-kpi',
        label: 'OKR × KPI',
        cor: '#3B82F6',
        resumo: 'A diferença essencial',
        filhos: [
          { label: 'OKR', desc: 'Temporário, expira e é redefinido' },
          { label: 'KPI', desc: 'Contínuo, sempre monitorado' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos revisar OKRs de exemplo e identificar quais estão bem formulados.',
    passos: [
      'Ler o OKR proposto no cenário.',
      'Avaliar se os Resultados-Chave são números mensuráveis ou tarefas disfarçadas.',
      'Escolher a formulação mais correta.',
    ],
    exemploGuiado: 'Uma equipe de suporte define o Objetivo "ser a referência de atendimento no nosso setor". Os Resultados-Chave: "elevar a nota de satisfação de 7,2 para 8,5", "reduzir o tempo médio de primeira resposta de 6h para 1h", e "reduzir a taxa de reabertura de chamados de 18% para 8%". Todos os três são números específicos, mensuráveis, com ponto de partida e meta clara — nenhum deles é uma tarefa como "contratar mais atendentes" ou "comprar um novo sistema", que descreveriam o caminho, não o resultado.',
    cenarioGuiado: [
      {
        pergunta: 'Um time propõe o seguinte Resultado-Chave: "lançar o novo aplicativo mobile até o fim do trimestre". Isso é um bom Resultado-Chave?',
        opcoes: [
          { texto: 'Sim, porque tem um prazo claro definido', resultado: 'Ter prazo não é suficiente — "lançar o aplicativo" é uma tarefa (feita ou não feita), não um resultado mensurável. Faltaria, por exemplo, "atingir 5.000 downloads no primeiro mês" como Resultado-Chave de verdade.' },
          { texto: 'Não, porque é uma tarefa disfarçada de meta, não um número mensurável de resultado', resultado: 'Correto — esse é o erro mais comum ao escrever OKRs. "Lançar" é uma ação binária (aconteceu ou não), não um resultado numérico que comprova o valor gerado pelo lançamento.' },
          { texto: 'Sim, porque todo Objetivo de tecnologia precisa ter um Resultado-Chave sobre lançamento de produto', resultado: 'Não é uma regra — o Resultado-Chave certo mede o impacto do lançamento (adoção, uso, satisfação), não o lançamento em si como evento binário.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa OKR?', verso: 'Objectives and Key Results — Objetivos e Resultados-Chave, um framework de definição de metas.' },
    { id: 'fc2', frente: 'Qual é a diferença entre um Objetivo e um Resultado-Chave?', verso: 'O Objetivo é uma direção qualitativa e inspiradora; os Resultados-Chave são de dois a quatro números mensuráveis que comprovam que o objetivo foi alcançado.' },
    { id: 'fc3', frente: 'Qual é o erro mais comum ao escrever Resultados-Chave?', verso: 'Transformá-los em tarefas ("lançar X", "fazer Y") em vez de números mensuráveis de resultado.' },
    { id: 'fc4', frente: 'Qual é a diferença entre OKR e KPI?', verso: 'OKR é uma meta temporária e específica de um período, que expira e é redefinida; KPI é um indicador contínuo de saúde do negócio, sempre monitorado.' },
  ],

  quiz: [
    {
      pergunta: 'Qual das opções abaixo é um Resultado-Chave bem formulado?',
      alternativas: [
        'Lançar a nova campanha de marketing',
        'Melhorar o atendimento ao cliente',
        'Elevar a taxa de retenção de clientes de 60% para 75%',
        'Contratar mais três vendedores',
      ],
      correta: 2,
      explicacao: 'É o único que é um número mensurável com ponto de partida e meta clara — os outros são tarefas ou objetivos vagos, não resultados numéricos.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Qual é a principal diferença entre OKR e KPI?',
      alternativas: [
        'OKR é usado só por empresas de tecnologia, KPI por todas as demais',
        'OKR é uma meta temporária e específica de um período; KPI é um indicador contínuo, sempre monitorado',
        'KPI sempre tem prazo, OKR nunca tem',
        'Não existe diferença real entre os dois termos',
      ],
      correta: 1,
      explicacao: 'OKRs são definidos para um período específico (geralmente um trimestre) e depois expiram, sendo redefinidos; KPIs são indicadores de saúde monitorados continuamente, sem prazo de expiração.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Devo definir metas fáceis, para garantir que sempre sejam atingidas?',
      resposta: 'Depende da filosofia da empresa. Muitas empresas que usam OKR de forma ambiciosa consideram 70% de atingimento como sucesso — bater 100% toda vez pode ser sinal de que as metas estão fáceis demais, não de alta performance real.',
    },
    {
      pergunta: 'Quantos OKRs uma equipe deveria ter ao mesmo tempo?',
      resposta: 'O ideal costuma ser de um a três Objetivos por equipe, cada um com dois a quatro Resultados-Chave. Definir muitos OKRs simultaneamente dilui o foco, que é justamente o problema que o framework tenta resolver.',
    },
  ],
}
