import { Modulo } from '@/types'

export const roicVsWacc: Modulo = {
  id: 'roic-vs-wacc',
  trilhaId: 'gestao-financeira-negocios',
  numero: 6,
  titulo: 'ROIC vs. WACC: A Régua dos Investidores',
  subtitulo: 'Se o retorno não supera o custo de capital, a empresa está destruindo valor, mesmo dando lucro',
  iconName: 'Scale',
  duracaoMin: 13,

  nivel: 'avancado',
  preRequisitos: ['ccc'],
  objetivoAprendizagem: 'Você vai sair sabendo comparar o ROIC de um investimento com o WACC da empresa, a régua que investidores profissionais usam para decidir se um negócio está criando ou destruindo valor.',
  erroFatal: 'Considerar um investimento "bom" só porque tem retorno positivo, sem compará-lo ao custo de capital da empresa — um retorno de 8% ao ano pode parecer positivo, mas se o custo de capital da empresa é 12%, esse investimento está, na prática, destruindo valor.',
  numeroChave: { valor: '1 comparação', legenda: 'toda decisão de investimento de capital se resume, no fundo, a uma única comparação: o retorno esperado (ROIC) supera o custo de obter esse capital (WACC)? Se sim, cria valor; se não, destrói' },
  glossarioDoModulo: ['ROIC', 'WACC', 'Custo de capital', 'Criação de valor'],
  proximoPasso: { moduloId: 'forecast-cenarios', motivo: 'Depois de aprender a régua para avaliar um investimento específico, o último módulo da trilha ensina a projetar múltiplos cenários financeiros futuros.' },

  aprender: {
    oQueE: 'ROIC, sigla para Return on Invested Capital (Retorno sobre o Capital Investido), mede quanto lucro operacional uma empresa gera para cada real de capital que foi investido nela (próprio ou de terceiros). WACC, sigla para Weighted Average Cost of Capital (Custo Médio Ponderado de Capital), mede quanto custa, em média, para a empresa obter esse capital — combinando o custo de dívidas com juros e o custo de oportunidade do capital próprio dos sócios. A régua central de qualquer decisão de investimento profissional é comparar os dois: se ROIC supera WACC, o investimento cria valor; se ROIC fica abaixo do WACC, o investimento destrói valor, mesmo que gere lucro contábil positivo.',
    porQueImporta: 'Um erro comum é achar que qualquer retorno positivo já justifica um investimento. Mas capital nunca é gratuito: dinheiro emprestado tem juros, e dinheiro próprio dos sócios tem um custo de oportunidade — o que eles ganhariam se tivessem investido esse dinheiro em outro lugar. Se um investimento retorna 8% ao ano, mas custa 12% para obter esse capital (considerando dívida e capital próprio combinados), a empresa está, na prática, perdendo valor a cada ano que mantém esse investimento, mesmo registrando lucro contábil positivo nele.',
    naPratica: 'Para calcular o ROIC de um investimento específico, divide-se o lucro operacional gerado por ele pelo capital total investido (próprio mais de terceiros) naquele investimento. Para calcular o WACC da empresa, pondera-se o custo da dívida (a taxa de juros paga, ajustada pelo benefício fiscal) e o custo do capital próprio (geralmente estimado pelo retorno que os sócios exigiriam considerando o risco do negócio), na proporção em que cada fonte de capital é usada. A comparação final é simples de enunciar, mesmo que o cálculo de cada componente exija atenção: ROIC maior que WACC cria valor; ROIC menor que WACC destrói valor, independentemente do lucro contábil parecer positivo.',
    passoAPasso: [
      'Calcule o lucro operacional gerado por um investimento ou pela empresa como um todo.',
      'Divida esse lucro pelo capital total investido (dívida mais capital próprio usado) para chegar ao ROIC.',
      'Calcule o custo da dívida (taxa de juros média paga) e o custo do capital próprio (retorno mínimo exigido pelos sócios).',
      'Pondere os dois custos pela proporção de cada fonte de capital usada, chegando ao WACC.',
      'Compare ROIC com WACC: se ROIC supera WACC, o investimento cria valor; se não, destrói valor, mesmo com lucro contábil positivo.',
    ],
    errosComuns: [
      'Considerar um investimento bom só porque tem retorno positivo, sem comparar com o custo real de capital da empresa.',
      'Esquecer de incluir o custo do capital próprio no cálculo do WACC, tratando apenas a dívida com juros como "custo real" de capital.',
      'Comparar o ROIC de um investimento com a taxa de juros de um único empréstimo, em vez do WACC combinado (dívida e capital próprio ponderados).',
      'Não revisar o WACC periodicamente — o custo de capital muda conforme as taxas de juros do mercado e o risco percebido do negócio mudam.',
    ],
    comparativo: {
      titulo: 'ROIC vs. WACC: o que cada resultado indica',
      linhas: [
        { label: 'ROIC maior que WACC', valor: 'Cria valor | O investimento retorna mais do que custa captar o capital usado nele' },
        { label: 'ROIC igual ao WACC', valor: 'Neutro | O investimento se paga, mas não gera valor econômico adicional' },
        { label: 'ROIC menor que WACC', valor: 'Destrói valor | Mesmo com lucro contábil positivo, o investimento consome mais valor do que gera' },
      ],
    },
    checklist: [
      'Sei calcular o ROIC de um investimento específico dividindo lucro operacional pelo capital investido.',
      'Sei calcular o WACC combinando custo de dívida e custo de capital próprio, ponderados.',
      'Comparo sempre ROIC com WACC antes de considerar um investimento "bom", não só se o retorno é positivo.',
      'Entendo que ROIC abaixo do WACC destrói valor, mesmo com lucro contábil positivo.',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham defende avaliar investimentos comparando retorno esperado com o custo de oportunidade real do capital — a comparação ROIC vs. WACC é essa mesma disciplina aplicada dentro de uma empresa, na decisão de onde alocar capital internamente.',
    },
  },

  mapaMental: {
    label: 'ROIC vs. WACC',
    subtitulo: 'A régua da criação de valor',
    ramos: [
      {
        id: 'roic',
        label: 'ROIC',
        cor: '#22C55E',
        resumo: 'Quanto o investimento retorna',
        filhos: [
          { label: 'Lucro operacional ÷ capital investido', desc: 'O retorno gerado pelo investimento' },
        ],
      },
      {
        id: 'wacc',
        label: 'WACC',
        cor: '#EF4444',
        resumo: 'Quanto custa captar o capital',
        filhos: [
          { label: 'Custo da dívida', desc: 'Juros pagos, ajustados pelo benefício fiscal' },
          { label: 'Custo do capital próprio', desc: 'Retorno mínimo exigido pelos sócios' },
        ],
      },
      {
        id: 'comparacao',
        label: 'A Comparação',
        cor: '#3B82F6',
        resumo: 'A régua final',
        filhos: [
          { label: 'ROIC > WACC', desc: 'Cria valor' },
          { label: 'ROIC < WACC', desc: 'Destrói valor, mesmo com lucro contábil' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de ROIC vs. WACC',
    intro: 'Vamos comparar ROIC e WACC para decidir se um investimento específico vale a pena.',
    passos: [
      'Calcular o ROIC do investimento proposto.',
      'Calcular o WACC da empresa.',
      'Comparar os dois números para decidir se o investimento cria ou destrói valor.',
    ],
    exemploGuiado: 'Uma empresa avalia abrir uma nova filial, que exigiria R$ 500.000 de capital investido (parte em empréstimo, parte em capital próprio dos sócios) e geraria lucro operacional anual estimado de R$ 45.000. ROIC = 45.000 ÷ 500.000 = 9% ao ano. A empresa capta dívida a uma taxa de 14% ao ano, mas os sócios exigem um retorno mínimo de capital próprio de 18% ao ano, considerando o risco do negócio; usando 40% de dívida e 60% de capital próprio na estrutura, o WACC = (0,40 × 14%) + (0,60 × 18%) = 5,6% + 10,8% = 16,4% ao ano. Com ROIC de 9% e WACC de 16,4%, o investimento na nova filial destruiria valor, mesmo gerando lucro operacional positivo — o retorno não cobre o custo real do capital necessário para viabilizá-lo.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa ROIC?', verso: 'Return on Invested Capital — quanto lucro operacional é gerado para cada real de capital investido.' },
    { id: 'fc2', frente: 'O que significa WACC?', verso: 'Weighted Average Cost of Capital — o custo médio ponderado de capital, combinando custo de dívida e custo de capital próprio.' },
    { id: 'fc3', frente: 'Quando um investimento "cria valor", segundo essa régua?', verso: 'Quando o ROIC supera o WACC — o retorno gerado é maior do que o custo de captar o capital usado.' },
    { id: 'fc4', frente: 'Por que um investimento pode destruir valor mesmo com lucro contábil positivo?', verso: 'Porque o retorno gerado (ROIC), mesmo positivo, pode ser menor que o custo real de capital (WACC) — capital nunca é gratuito, mesmo o capital próprio dos sócios.' },
  ],

  quiz: [
    {
      pergunta: 'Um investimento tem ROIC de 12% ao ano, e o WACC da empresa é 9% ao ano. O que isso indica?',
      alternativas: [
        'O investimento está destruindo valor',
        'O investimento está criando valor, já que o retorno supera o custo de capital',
        'Não é possível avaliar sem mais informações',
        'O investimento é neutro, nem cria nem destrói valor',
      ],
      correta: 1,
      explicacao: 'Com ROIC (12%) maior que WACC (9%), o investimento retorna mais do que custa captar o capital usado — ele está criando valor.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que ignorar o custo do capital próprio no cálculo do WACC é um erro comum?',
      alternativas: [
        'Porque capital próprio nunca tem custo real algum',
        'Porque capital próprio tem um custo de oportunidade real — o que os sócios ganhariam investindo esse dinheiro em outro lugar',
        'Porque capital próprio é sempre mais barato que dívida bancária',
        'Porque a lei proíbe considerar capital próprio no cálculo do WACC',
      ],
      correta: 1,
      explicacao: 'Mesmo sem juros explícitos, capital próprio tem um custo de oportunidade — os sócios abrem mão de outras opções de investimento ao colocar dinheiro naquele negócio, e esse custo precisa entrar no WACC.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Como estimo o custo do capital próprio, se não há uma taxa de juros explícita como na dívida?',
      resposta: 'Uma forma comum é considerar o retorno que os sócios poderiam obter num investimento de risco parecido no mercado, mais um prêmio adicional pelo risco específico daquele negócio. Não existe uma fórmula única perfeita, mas mesmo uma estimativa razoável já é mais rigorosa do que ignorar esse custo completamente.',
    },
    {
      pergunta: 'O WACC muda com o tempo, ou é fixo?',
      resposta: 'Muda — conforme as taxas de juros do mercado sobem ou descem, e conforme o risco percebido do negócio muda (uma empresa mais endividada ou mais instável tende a ter WACC maior), vale revisar esse número periodicamente.',
    },
  ],
}
