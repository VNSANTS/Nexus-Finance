import { Modulo } from '@/types'

export const introducaoGeracaoDeReceita: Modulo = {
  id: 'introducao-geracao-de-receita',
  trilhaId: 'geracao-de-receita',
  numero: 1,
  titulo: 'Introdução: Geração de Receita',
  subtitulo: 'Vender sem estrutura é aposta, não estratégia',
  iconName: 'Rocket',
  duracaoMin: 8,

  nivel: 'intermediario',
  objetivoAprendizagem: 'Você vai sair entendendo por que empresas que crescem de forma previsível usam os mesmos poucos números para decidir onde investir em aquisição de clientes — e por que essa trilha existe.',
  erroFatal: 'Tratar toda venda como um evento isolado, sem sistema por trás — depender de sorte, de um bom mês, de um cliente generoso que apareceu na hora certa, em vez de construir os mecanismos que fazem a receita se sustentar sozinha.',
  numeroChave: { valor: '4 pilares', legenda: 'Receita, Cultura, Eficiência Operacional e Gestão Financeira — os mesmos modelos usados por empresas de bilhões de dólares para decidir onde investir, quem manter, o que cortar e quanto vale cada real' },
  glossarioDoModulo: ['LTV', 'CAC', 'ICP', 'Funil de conversão', 'NRR', 'k-factor'],
  proximoPasso: { moduloId: 'fases-da-receita', motivo: 'A primeira aula da trilha mostra as quatro fases que toda empresa madura atravessa para vender de várias formas ao mesmo tempo.' },

  aprender: {
    oQueE: 'Esta trilha ensina os números e frameworks que separam empresas que vendem de empresas que crescem de forma previsível — o primeiro dos quatro pilares de um guia de gestão que também cobre Cultura, Eficiência Operacional e Gestão Financeira. Aqui, o foco é entender de onde vem a receita, quanto custa conquistar cada cliente, e quanto cada cliente realmente vale ao longo do tempo.',
    porQueImporta: 'Toda empresa que quebra, quebra sem dinheiro em caixa — isso quase nunca acontece por falta de venda. Acontece porque o dono confunde "entrou dinheiro" com "sobrou dinheiro", ou investe em aquisição de clientes sem saber se esse investimento está voltando multiplicado ou sendo jogado fora. Os números desta trilha (LTV, CAC, funil de conversão, NRR) são os mesmos que investidores de tecnologia usam para decidir se um modelo de negócio é saudável.',
    naPratica: 'Cada módulo desta trilha corresponde a uma aula do guia original, com a origem do conceito, a fórmula exata usada no mercado, e um exemplo numérico resolvido do início ao fim. No final de cada módulo, uma pergunta de recuperação força você a lembrar o conceito sem reler o texto — é o mesmo princípio usado no restante do Nexus Finance: o esforço de tentar lembrar grava conhecimento de um jeito que a releitura passiva nunca consegue.',
    passoAPasso: [
      'Comece pelo módulo "As Quatro Fases da Receita" — ele dá o mapa geral de como uma empresa madura vende de várias formas ao mesmo tempo.',
      'Siga a ordem dos módulos: cada um constrói sobre o anterior, do CAC/LTV básico até a priorização de canais e o coeficiente viral.',
      'Resolva os exemplos numéricos de cada módulo com papel e caneta antes de olhar a resposta pronta.',
      'Use as calculadoras da trilha para testar os números do seu próprio negócio, não só os exemplos do guia.',
      'Ao final, tente reconstruir as fórmulas principais (LTV/CAC, funil, NRR, k-factor) de memória, sem consultar nada.',
    ],
    errosComuns: [
      'Pular direto para os módulos de fórmula sem entender o mapa geral das quatro fases de receita.',
      'Decorar a fórmula sem entender o benchmark de mercado — um número sem referência de comparação não ajuda a decidir nada.',
      'Aplicar os conceitos só na teoria, sem calcular com os números reais do próprio negócio.',
      'Tratar os quatro pilares (Receita, Cultura, Eficiência, Financeiro) como independentes — eles se conectam: uma decisão de corte de custo, por exemplo, usa o ROIC do pilar financeiro.',
    ],
    checklist: [
      'Entendi que as quatro fases de receita coexistem, não se substituem.',
      'Sei a diferença entre CAC e LTV antes de entrar no módulo de fórmula.',
      'Tenho em mãos (ou vou buscar) os números reais do meu negócio para praticar.',
      'Entendi que esta trilha é a primeira de quatro — Cultura, Eficiência e Financeiro vêm depois.',
    ],
  },

  mapaMental: {
    label: 'Geração de Receita',
    subtitulo: 'O mapa dos seis módulos desta trilha',
    ramos: [
      {
        id: 'entender-o-cliente',
        label: 'Entender o Cliente',
        cor: '#EC4899',
        resumo: 'Antes de vender mais, saber para quem e por quê',
        filhos: [
          { label: 'Quatro fases da receita', desc: 'Venda única, esteira, recorrência, embaixador' },
          { label: 'ICP — Perfil de Cliente Ideal', desc: 'Para quem vender, com precisão cirúrgica' },
        ],
      },
      {
        id: 'medir-o-retorno',
        label: 'Medir o Retorno',
        cor: '#3B82F6',
        resumo: 'Os números que provam se vale a pena investir',
        filhos: [
          { label: 'LTV/CAC', desc: 'A régua que decide se vale a pena crescer' },
          { label: 'Funil de conversão', desc: 'Onde o funil está furado' },
        ],
      },
      {
        id: 'expandir-e-priorizar',
        label: 'Expandir e Priorizar',
        cor: '#FFC93C',
        resumo: 'Crescer com quem já confia, e saber onde investir',
        filhos: [
          { label: 'Cross-sell, up-sell e NRR', desc: 'Expandir receita de quem já é cliente' },
          { label: 'Priorização de canais e k-factor', desc: 'A oferta certa, no canal certo' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Este módulo é a porta de entrada da trilha — a simulação de verdade acontece módulo a módulo, com a calculadora de cada conceito.',
    passos: [
      'Escolha um negócio real (o seu, ou um que você conhece bem) para usar como referência ao longo de toda a trilha.',
      'Ao entrar em cada módulo, tente aplicar a fórmula com números desse negócio antes de olhar o exemplo pronto.',
    ],
    exemploGuiado: 'Pense num negócio simples: uma cafeteria de bairro. Ela vende café (venda única para quem passa uma vez), tem cartão de fidelidade (recorrência), vende também bolo e sanduíche para quem já pediu o café (esteira), e recebe indicações de clientes fiéis (embaixador). As quatro fases da receita já estão ali, mesmo sem o dono ter nomeado assim — esta trilha dá nome e número a cada uma delas.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais são os quatro pilares do guia de gestão desta trilha?', verso: 'Geração de Receita, Cultura, Eficiência Operacional e Gestão Financeira.' },
    { id: 'fc2', frente: 'Por que a maioria das empresas que quebra, quebra sem dinheiro em caixa, mesmo vendendo?', verso: 'Porque confundem "entrou dinheiro" com "sobrou dinheiro" — faturar não é o mesmo que ter caixa disponível.' },
    { id: 'fc3', frente: 'O que diferencia um negócio que "vende" de um negócio que "cresce de forma previsível"?', verso: 'O negócio previsível usa os mesmos poucos números (como LTV, CAC, funil) para decidir onde investir, em vez de depender de sorte ou de um bom mês.' },
    { id: 'fc4', frente: 'Qual técnica de aprendizagem esta trilha usa ao final de cada módulo?', verso: 'Recuperação de memória: uma pergunta força você a lembrar o conceito sem reler o texto, o que grava conhecimento melhor que releitura passiva.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo esta trilha, por que a maioria das empresas realmente quebra?',
      alternativas: [
        'Por falta de vendas',
        'Por falta de dinheiro em caixa, mesmo vendendo bem',
        'Por excesso de funcionários',
        'Por falta de marketing',
      ],
      correta: 1,
      explicacao: 'Toda empresa que quebra, quebra sem dinheiro em caixa — isso raramente acontece por falta de venda. Acontece por confundir faturamento com caixa disponível.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Qual é o foco central do pilar "Geração de Receita" dentro do guia completo?',
      alternativas: [
        'Como reduzir custos operacionais',
        'Como estruturar cultura organizacional',
        'Os números e frameworks que tornam o crescimento previsível, não dependente de sorte',
        'Como montar o DRE de uma empresa',
      ],
      correta: 2,
      explicacao: 'O pilar de Receita ensina os mesmos poucos números que empresas maduras usam para decidir onde investir em aquisição de clientes, tornando o crescimento sistemático em vez de aleatório.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ter uma empresa para aproveitar esta trilha?',
      resposta: 'Não. Os conceitos se aplicam a qualquer contexto onde exista um "cliente" a conquistar e reter — inclusive dentro de uma carreira ou projeto pessoal. Mas o aprendizado rende mais se você tiver, mesmo que pequeno, um negócio real para aplicar os números.',
    },
    {
      pergunta: 'Preciso fazer os módulos desta trilha em ordem?',
      resposta: 'É recomendado, porque os conceitos se conectam — o módulo de LTV/CAC, por exemplo, é pré-requisito natural para entender priorização de canais mais à frente.',
    },
  ],
}
