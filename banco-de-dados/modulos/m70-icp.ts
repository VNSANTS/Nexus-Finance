import { Modulo } from '@/types'

export const icp: Modulo = {
  id: 'icp',
  trilhaId: 'geracao-de-receita',
  numero: 4,
  titulo: 'ICP: O Perfil de Cliente Ideal',
  subtitulo: 'Vender para todo mundo é a receita mais cara de crescer devagar',
  iconName: 'Target',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['ltv-cac'],
  objetivoAprendizagem: 'Você vai sair sabendo construir o perfil do seu cliente mais lucrativo e usar isso para filtrar onde investir tempo e dinheiro em aquisição.',
  erroFatal: 'Tentar vender para "todo mundo que tem o problema" em vez de mirar no cliente que tem o problema E o maior LTV E o menor CAC — isso dilui o orçamento de marketing entre públicos com retorno muito diferente, escondendo qual fatia realmente vale o investimento.',
  numeroChave: { valor: '20%', legenda: 'em muitos negócios, cerca de 20% dos clientes concentram 80% do lucro — o ICP existe para identificar exatamente esse grupo antes de gastar em atrair o resto' },
  glossarioDoModulo: ['ICP', 'Segmentação', 'Persona'],
  proximoPasso: { moduloId: 'funil-de-conversao', motivo: 'Sabendo para quem vender, o próximo passo é entender onde, no caminho até a venda, esses clientes estão sendo perdidos.' },

  aprender: {
    oQueE: 'ICP, sigla para Ideal Customer Profile (Perfil de Cliente Ideal), é a descrição precisa de quem é o cliente que mais gera valor para o negócio — não qualquer pessoa que poderia comprar, mas quem efetivamente compra mais, paga melhor, fica mais tempo e dá menos trabalho. É diferente de uma "persona" genérica de marketing: o ICP nasce de dados reais dos melhores clientes que a empresa já tem, não de suposições sobre quem ela gostaria de atender.',
    porQueImporta: 'Vender para todo mundo parece, à primeira vista, a estratégia mais segura — mais gente elegível significa mais chances de vender. Na prática, é o oposto: cada público diferente exige uma mensagem diferente, um canal diferente, uma oferta diferente. Tentar atender todo mundo ao mesmo tempo dilui o orçamento de marketing e a atenção da equipe comercial entre públicos com LTV muito diferente entre si — o resultado é gastar o mesmo CAC para conquistar tanto o cliente que fica dois anos quanto o que cancela em um mês.',
    naPratica: 'Para construir um ICP de verdade, o ponto de partida são os dados dos clientes atuais, não uma reunião de brainstorming. Cruze os clientes com maior LTV (calculado no módulo anterior) com características em comum entre eles: porte da empresa, setor, cargo de quem decide a compra, tamanho de time, ou, no caso de pessoa física, faixa de renda, momento de vida, comportamento de compra. O ICP não é uma pessoa fictícia com nome e foto de banco de imagens — é um filtro concreto, com critérios que podem ser checados antes mesmo do primeiro contato de vendas.',
    passoAPasso: [
      'Liste os 20% de clientes com maior LTV usando o cálculo do módulo anterior.',
      'Procure características em comum entre esses clientes: setor, tamanho, comportamento, localização, motivo de compra.',
      'Escreva o ICP como uma lista de critérios objetivos e verificáveis, não como uma descrição vaga de "pessoa que gosta de qualidade".',
      'Compare o ICP com o público que hoje recebe o investimento em marketing — identifique a diferença entre "para quem eu vendo" e "para quem eu deveria estar vendendo".',
      'Redirecione parte do orçamento de aquisição para os canais e mensagens que atingem especificamente o ICP.',
    ],
    errosComuns: [
      'Construir o ICP com base em quem a empresa gostaria de atender, e não em quem já compra e traz mais retorno de verdade.',
      'Confundir ICP com uma "persona" de marketing genérica, sem nenhum dado real de LTV ou comportamento por trás.',
      'Definir um ICP tão amplo que ele volta a ser "todo mundo", perdendo a função de filtro.',
      'Nunca revisar o ICP conforme o negócio muda — o cliente ideal de um ano atrás pode não ser mais o mesmo hoje.',
    ],
    checklist: [
      'Identifiquei os clientes com maior LTV usando dados reais, não impressão.',
      'Encontrei pelo menos três características objetivas em comum entre eles.',
      'Escrevi o ICP como critérios verificáveis, não como uma descrição vaga.',
      'Comparei o ICP com o público que hoje recebe o investimento em aquisição.',
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Philip Fisher defende conhecer profundamente onde está o valor real de um investimento antes de agir — o ICP aplica o mesmo princípio de precisão à decisão de para quem vender, em vez de dispersar esforço.',
    },
  },

  mapaMental: {
    label: 'ICP — Perfil de Cliente Ideal',
    subtitulo: 'Para quem vender, com precisão',
    ramos: [
      {
        id: 'origem-do-icp',
        label: 'De Onde Vem o ICP',
        cor: '#3B82F6',
        resumo: 'Dados reais, não suposição',
        filhos: [
          { label: 'Clientes com maior LTV', desc: 'O ponto de partida, calculado com dados reais' },
          { label: 'Características em comum', desc: 'Setor, porte, comportamento, motivo de compra' },
        ],
      },
      {
        id: 'icp-vs-persona',
        label: 'ICP × Persona',
        cor: '#EC4899',
        resumo: 'Diferença essencial',
        filhos: [
          { label: 'ICP', desc: 'Filtro concreto e verificável, baseado em dados' },
          { label: 'Persona genérica', desc: 'Descrição fictícia, sem base em LTV real' },
        ],
      },
      {
        id: 'aplicacao',
        label: 'Onde Usar o ICP',
        cor: '#22C55E',
        resumo: 'Depois de definido, ele filtra decisões',
        filhos: [
          { label: 'Redirecionar orçamento', desc: 'Investir mais em quem se encaixa no ICP' },
          { label: 'Filtrar mensagem e canal', desc: 'Falar diretamente com quem importa' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos construir o ICP de uma empresa fictícia a partir dos dados dos seus clientes mais lucrativos.',
    passos: [
      'Olhar os clientes com maior LTV de uma base fictícia.',
      'Buscar padrões em comum entre eles.',
      'Formular o ICP como critérios objetivos.',
    ],
    exemploGuiado: 'Uma consultoria de marketing para pequenas empresas percebe que os clientes com maior LTV não são, como ela imaginava, as maiores empresas do seu portfólio — são empresas de 10 a 30 funcionários, do setor de serviços, cujo dono toma a decisão de compra sozinho (sem comitê). Empresas maiores demoram mais para fechar contrato e cancelam com mais frequência após seis meses, enquanto esse grupo específico permanece cliente por mais de dois anos em média. O ICP passa a ser: "empresas de serviços, 10-30 funcionários, decisão de compra concentrada no dono" — e o orçamento de anúncios, antes disperso, passa a mirar exatamente esse perfil.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa ICP?', verso: 'Ideal Customer Profile — Perfil de Cliente Ideal, a descrição precisa de quem mais gera valor para o negócio.' },
    { id: 'fc2', frente: 'Qual a principal diferença entre ICP e persona genérica de marketing?', verso: 'O ICP nasce de dados reais dos melhores clientes já existentes; a persona genérica costuma ser uma descrição fictícia sem base em LTV real.' },
    { id: 'fc3', frente: 'Qual é o ponto de partida correto para construir um ICP?', verso: 'Os clientes com maior LTV já existentes, não uma reunião de brainstorming sobre quem a empresa gostaria de atender.' },
    { id: 'fc4', frente: 'Por que vender para "todo mundo que tem o problema" costuma ser uma estratégia cara?', verso: 'Porque dilui o orçamento de marketing e a mensagem entre públicos com LTV muito diferente, gastando o mesmo CAC para conquistar clientes de retorno muito desigual.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é a base correta para construir um ICP?',
      alternativas: [
        'Uma reunião de brainstorming sobre o cliente ideal imaginado',
        'Os dados reais dos clientes com maior LTV já existentes',
        'A opinião pessoal do fundador sobre quem ele gostaria de atender',
        'O público mais amplo possível, para maximizar alcance',
      ],
      correta: 1,
      explicacao: 'O ICP nasce de dados reais dos clientes que já geram mais valor, não de suposições ou preferências pessoais sobre quem a empresa gostaria de atender.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que tentar vender para "todo mundo" é uma estratégia cara?',
      alternativas: [
        'Porque anúncios amplos custam mais por clique',
        'Porque dilui orçamento e mensagem entre públicos com LTV muito diferente entre si',
        'Porque é ilegal segmentar clientes por características demográficas',
        'Porque nenhum negócio consegue atender mais de 100 clientes',
      ],
      correta: 1,
      explicacao: 'Cada público diferente exige mensagem, canal e oferta diferentes. Tentar atender todo mundo dilui recursos entre grupos com retorno muito desigual.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Meu negócio é muito novo e não tenho dados suficientes de clientes. Como definir o ICP?',
      resposta: 'Nesse caso, comece com uma hipótese baseada no cliente que você mais gostaria de atender, mas trate isso como um rascunho — revise o ICP assim que tiver os primeiros 10-20 clientes reais, comparando quem trouxe mais retorno de fato.',
    },
    {
      pergunta: 'Posso ter mais de um ICP?',
      resposta: 'Sim, especialmente se a empresa vende produtos ou serviços diferentes. Mas cuidado: ter ICPs demais volta a diluir o foco. Geralmente um ou dois ICPs bem definidos superam cinco vagos.',
    },
  ],
}
