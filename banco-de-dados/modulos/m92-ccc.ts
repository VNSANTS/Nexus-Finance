import { Modulo } from '@/types'

export const ccc: Modulo = {
  id: 'ccc',
  trilhaId: 'gestao-financeira-negocios',
  numero: 5,
  titulo: 'CCC: O Tempo que o Dinheiro Fica Preso',
  subtitulo: 'Entre pagar o fornecedor e receber do cliente, o caixa fica sequestrado',
  iconName: 'Hourglass',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['orcamento-base-zero'],
  objetivoAprendizagem: 'Você vai sair sabendo calcular o Ciclo de Conversão de Caixa de um negócio e identificar onde reduzi-lo para liberar capital de giro.',
  erroFatal: 'Focar só em vender mais, sem perceber que um CCC muito longo pode fazer o crescimento de vendas consumir cada vez mais caixa, em vez de gerar mais caixa — quanto mais a empresa vende com um ciclo ruim, mais dinheiro fica preso, não menos.',
  numeroChave: { valor: '3 prazos', legenda: 'o Ciclo de Conversão de Caixa combina três prazos: quanto tempo o dinheiro fica parado em estoque, quanto tempo leva para receber dos clientes, e quanto tempo a empresa tem para pagar seus próprios fornecedores' },
  glossarioDoModulo: ['CCC', 'Prazo médio de estoque', 'Prazo médio de recebimento', 'Prazo médio de pagamento', 'Capital de giro'],
  proximoPasso: { moduloId: 'roic-vs-wacc', motivo: 'Depois de entender o ciclo do caixa operacional, o próximo módulo ensina a régua para decidir se vale a pena investir capital em algo específico.' },

  aprender: {
    oQueE: 'CCC, sigla para Ciclo de Conversão de Caixa, mede quantos dias, em média, o dinheiro de uma empresa fica "preso" entre o momento em que ela paga por insumos ou mercadorias e o momento em que recebe o pagamento dos clientes pela venda desses mesmos produtos ou serviços. O cálculo combina três prazos médios: quanto tempo o produto fica em estoque antes de ser vendido, quanto tempo leva, depois da venda, para o dinheiro do cliente efetivamente entrar no caixa, e quanto tempo a empresa consegue esperar para pagar seus próprios fornecedores.',
    porQueImporta: 'Duas empresas podem ter a mesma margem de lucro e volumes de venda parecidos, mas uma pode estar sufocada de caixa enquanto a outra sobra dinheiro — a diferença, muitas vezes, está no CCC. Uma empresa com CCC longo precisa financiar, com capital próprio ou empréstimo, o tempo inteiro em que o dinheiro fica preso entre a compra do insumo e o recebimento do cliente. Crescer as vendas com um CCC ruim pode, contraintuitivamente, piorar o aperto de caixa, porque cada venda nova exige mais capital preso no ciclo antes de virar dinheiro disponível.',
    naPratica: 'O Prazo Médio de Estoque mede quantos dias, em média, o produto fica parado até ser vendido. O Prazo Médio de Recebimento mede quantos dias, em média, a empresa leva para receber dos clientes depois da venda (relevante especialmente em vendas a prazo ou parceladas). O Prazo Médio de Pagamento mede quantos dias a empresa consegue esperar para pagar seus próprios fornecedores. A fórmula do CCC é: Prazo Médio de Estoque + Prazo Médio de Recebimento − Prazo Médio de Pagamento. Quanto menor o resultado (podendo até ser negativo, em casos raros e favoráveis), menos tempo o caixa da empresa fica sequestrado no ciclo operacional.',
    passoAPasso: [
      'Calcule o Prazo Médio de Estoque: quantos dias, em média, os produtos ficam parados antes de serem vendidos.',
      'Calcule o Prazo Médio de Recebimento: quantos dias, em média, leva para receber dos clientes depois da venda.',
      'Calcule o Prazo Médio de Pagamento: quantos dias a empresa consegue esperar antes de pagar seus fornecedores.',
      'Aplique a fórmula: CCC = Prazo de Estoque + Prazo de Recebimento − Prazo de Pagamento.',
      'Identifique qual dos três prazos tem mais espaço para melhoria — reduzir estoque parado, acelerar recebimento, ou negociar prazos maiores com fornecedores.',
    ],
    errosComuns: [
      'Focar só em vender mais sem calcular o efeito disso no CCC — crescer vendas com um ciclo ruim pode consumir mais caixa do que gerar.',
      'Ignorar o Prazo Médio de Pagamento como alavanca — negociar prazos maiores com fornecedores tem o mesmo efeito no CCC que reduzir estoque ou acelerar recebimento.',
      'Comparar o CCC de negócios de setores muito diferentes sem considerar que a natureza do produto (perecível vs. durável, por exemplo) afeta naturalmente o prazo de estoque esperado.',
      'Não considerar o efeito de meios de pagamento — vender via cartão parcelado sem antecipação de recebíveis alonga significativamente o prazo médio de recebimento.',
    ],
    checklist: [
      'Sei calcular os três prazos médios que compõem o CCC do meu negócio.',
      'Calculei o CCC e sei se ele está sendo um sequestrador de caixa relevante.',
      'Identifiquei qual dos três prazos (estoque, recebimento, pagamento) tem mais espaço de melhoria.',
      'Entendo que crescer vendas com CCC ruim pode piorar o aperto de caixa, não melhorar.',
    ],
    livroRelacionado: {
      livroId: 'seu-dinheiro-ou-sua-vida',
      textoConexao: 'O livro trata dinheiro como tempo de vida — o CCC aplica uma lógica parecida ao caixa de uma empresa: tempo em que o dinheiro fica preso é tempo em que ele não está disponível para nenhum outro propósito.',
    },
  },

  mapaMental: {
    label: 'CCC — Ciclo de Conversão de Caixa',
    subtitulo: 'Três prazos, um sequestro de caixa',
    ramos: [
      {
        id: 'estoque',
        label: 'Prazo Médio de Estoque',
        cor: '#F97316',
        resumo: 'Quanto tempo o produto fica parado',
        filhos: [
          { label: 'Antes de ser vendido', desc: 'Dinheiro parado, sem gerar retorno' },
        ],
      },
      {
        id: 'recebimento',
        label: 'Prazo Médio de Recebimento',
        cor: '#EF4444',
        resumo: 'Quanto tempo até o dinheiro entrar',
        filhos: [
          { label: 'Depois da venda', desc: 'Relevante em vendas a prazo ou parceladas' },
        ],
      },
      {
        id: 'pagamento',
        label: 'Prazo Médio de Pagamento',
        cor: '#22C55E',
        resumo: 'Quanto tempo até pagar o fornecedor',
        filhos: [
          { label: 'Alavanca a favor da empresa', desc: 'Quanto maior, melhor para o CCC' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de CCC',
    intro: 'Vamos calcular o CCC de uma loja de roupas fictícia.',
    passos: [
      'Calcular o Prazo Médio de Estoque.',
      'Calcular o Prazo Médio de Recebimento.',
      'Calcular o Prazo Médio de Pagamento.',
      'Aplicar a fórmula do CCC.',
    ],
    exemploGuiado: 'Uma loja de roupas mantém, em média, suas peças em estoque por 60 dias antes de vendê-las. Como vende bastante no cartão parcelado, leva em média 35 dias para receber o valor integral das vendas. Consegue negociar com fornecedores um prazo médio de pagamento de 30 dias. CCC = 60 (estoque) + 35 (recebimento) − 30 (pagamento) = 65 dias. Isso significa que, em média, o dinheiro da loja fica preso 65 dias entre a compra da mercadoria e o recebimento efetivo da venda — um período relevante que precisa ser financiado com capital de giro próprio ou de terceiros. Se a loja conseguisse reduzir o estoque parado para 40 dias (vendendo mais rápido) e negociar 45 dias com fornecedores, o CCC cairia para 40 + 35 − 45 = 30 dias, liberando caixa significativo para outras finalidades.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa CCC?', verso: 'Ciclo de Conversão de Caixa — mede quantos dias, em média, o dinheiro fica preso entre pagar por insumos e receber dos clientes.' },
    { id: 'fc2', frente: 'Qual é a fórmula do CCC?', verso: 'Prazo Médio de Estoque + Prazo Médio de Recebimento − Prazo Médio de Pagamento.' },
    { id: 'fc3', frente: 'Por que crescer vendas com um CCC ruim pode piorar o aperto de caixa?', verso: 'Porque cada venda nova exige mais capital preso no ciclo operacional antes de virar dinheiro disponível — quanto mais vende, mais caixa fica sequestrado.' },
    { id: 'fc4', frente: 'Qual é uma alavanca do CCC frequentemente esquecida?', verso: 'O Prazo Médio de Pagamento — negociar prazos maiores com fornecedores reduz o CCC tanto quanto reduzir estoque ou acelerar recebimento.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa tem Prazo Médio de Estoque de 40 dias, Prazo Médio de Recebimento de 20 dias, e Prazo Médio de Pagamento de 25 dias. Qual é o CCC?',
      alternativas: ['35 dias', '45 dias', '65 dias', '85 dias'],
      correta: 0,
      explicacao: '40 + 20 − 25 = 35 dias.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que negociar um prazo maior de pagamento com fornecedores melhora o CCC?',
      alternativas: [
        'Porque isso aumenta a margem de lucro diretamente',
        'Porque o Prazo Médio de Pagamento é subtraído na fórmula do CCC, então quanto maior ele for, menor o CCC final',
        'Porque fornecedores sempre preferem prazos maiores',
        'Isso não tem relação com o CCC',
      ],
      correta: 1,
      explicacao: 'Como o Prazo Médio de Pagamento é subtraído na fórmula (Estoque + Recebimento − Pagamento), aumentar esse prazo reduz o CCC final, liberando caixa por mais tempo antes de precisar pagar.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'É possível ter um CCC negativo?',
      resposta: 'Sim, em casos favoráveis — geralmente quando a empresa recebe dos clientes muito rápido (à vista, por exemplo) e consegue prazos longos com fornecedores. Um CCC negativo significa que o dinheiro do cliente chega antes de a empresa precisar pagar pela mercadoria, uma posição de caixa muito vantajosa.',
    },
    {
      pergunta: 'Qual dos três prazos costuma ser o mais fácil de melhorar?',
      resposta: 'Varia por negócio, mas negociar prazo com fornecedores costuma ser a alavanca mais rápida de ajustar, especialmente para empresas com bom histórico de pagamento — não exige mudança operacional, só negociação comercial.',
    },
  ],
}
