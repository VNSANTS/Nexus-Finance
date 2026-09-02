import type { Modulo } from '@/types'

export const moduloFundamentosBolsa: Modulo = {
  id: 'fundamentos-bolsa',
  trilhaId: 'acoes-bolsa',
  numero: 2,
  titulo: 'Fundamentos da Bolsa',
  subtitulo: 'O manual do botão: dar uma ordem sem pagar caro por desatenção',
  iconName: 'MousePointerClick',
  duracaoMin: 11,

  aprender: {
    oQueE:
      'Este módulo trata da operação em si. O que significa cada sufixo do ticker, quais tipos de ordem existem, quanto custa cada clique e em que horários o mercado funciona de um jeito diferente. Nada aqui decide qual empresa comprar. Tudo aqui decide quanto você paga para executar a decisão que já tomou.',
    porQueImporta:
      'A maior parte do prejuízo evitável de quem está começando não vem de escolher a empresa errada. Vem de dar ordem a mercado em papel sem liquidez, de aportar valores pequenos pagando corretagem fixa e de girar a carteira sem perceber que taxa e imposto saem a cada operação. São erros de execução, e todos eles somem quando você entende cinco conceitos.',
    naPratica:
      'A ordem limitada resolve quase tudo. Você define o preço máximo que aceita pagar e a ordem só executa até ali. A ordem a mercado executa no melhor preço disponível naquele instante, o que funciona bem em ação muito negociada e vira armadilha em papel de baixa liquidez, onde a próxima oferta pode estar bem longe da tela. Antes de confirmar qualquer coisa, olhe o book: ele mostra a fila de compra e venda e revela na hora se existe gente do outro lado.',
    passoAPasso: [
      'Confira o ticker e o que o sufixo significa antes de digitar a quantidade',
      'Escolha ordem limitada como padrão e reserve a ordem a mercado para papel líquido',
      'Olhe o book de ofertas e o volume médio diário do ativo',
      'Some corretagem, emolumentos e liquidação para saber o custo real da operação',
      'Guarde a nota de corretagem, porque é dela que sai o seu preço médio',
    ],
    errosComuns: [
      'Dar ordem a mercado em ativo de baixa liquidez e comprar bem acima da tela',
      'Confirmar a compra sem olhar o book e sem saber quem está do outro lado',
      'Ignorar emolumentos em aportes pequenos, onde eles pesam muito em percentual',
      'Confundir ON e PN sem saber que os direitos de cada uma são diferentes',
      'Mandar ordem durante o leilão sem entender como o preço é formado ali',
    ],
    comparativo: {
      titulo: 'Tipos de ordem e quando cada uma serve',
      linhas: [
        { label: 'A mercado', valor: 'Executa no melhor preço do momento · rápida · perigosa em ativo ilíquido' },
        { label: 'Limitada', valor: 'Você define o teto de compra ou o piso de venda · é o padrão recomendado' },
        { label: 'Stop loss', valor: 'Dispara venda se o preço cair até o nível marcado · serve para limitar perda' },
        { label: 'Stop gain', valor: 'Dispara venda quando o lucro alvo é atingido · tira a emoção da saída' },
        { label: 'Start', valor: 'Dispara compra quando o preço sobe até certo ponto · usada para entrar em rompimento' },
        { label: 'Sufixos do ticker', valor: '3 é ON · 4 é PN · 11 é unit, ETF ou FII · F indica fracionário' },
      ],
    },
    checklist: [
      'Sei o que o número final do ticker que eu comprei significa',
      'Uso ordem limitada como padrão e sei quando abrir exceção',
      'Já olhei o book e o volume diário de pelo menos um papel meu',
      'Sei quanto pago de custo total por operação, em reais e em percentual',
      'Guardo as notas de corretagem em um lugar que eu encontro depois',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A filosofia Boglehead valoriza operações simples e de baixo custo, sem complexidade desnecessária — usar ordem limitada como padrão e monitorar o custo total por operação é exatamente esse tipo de disciplina prática.',
    },
  },

  mapaMental: {
    label: 'Fundamentos da Bolsa',
    subtitulo: 'O manual do botão: como dar uma ordem sem pagar caro por desatenção',
    ramos: [
      {
        id: 'tickers',
        label: 'Tickers',
        cor: '#00D4FF',
        resumo: 'O que o código diz',
        filhos: [
          {
            label: 'Final 3',
            desc: 'Ação ordinária, a ON. Dá direito a voto na assembleia e costuma vir com tag along mais generoso.',
            netos: [
              { label: 'Por que importa', desc: 'Em uma venda de controle, o tag along define se você sai junto e por quanto. É direito, não detalhe burocrático.' },
            ],
          },
          { label: 'Final 4', desc: 'Ação preferencial, a PN. Sem voto, com preferência na distribuição de lucro.' },
          { label: 'Final 11', desc: 'Pode ser unit, ETF ou fundo imobiliário, dependendo do ativo. Vale conferir antes de comprar achando que é ação.' },
          { label: 'Final F', desc: 'Mercado fracionário, para comprar menos de cem ações. É por onde quase todo mundo começa.' },
        ],
      },
      {
        id: 'ordens',
        label: 'Tipos de ordem',
        cor: '#FFC93C',
        resumo: 'O botão certo para cada situação',
        filhos: [
          {
            label: 'A mercado',
            desc: 'Executa no melhor preço disponível agora. Rápida em papel líquido e arriscada em papel parado.',
            netos: [
              { label: 'O risco concreto', desc: 'Se a próxima oferta de venda está bem acima da tela, você compra por ela sem ser avisado.' },
            ],
          },
          {
            label: 'Limitada',
            desc: 'Você define o preço máximo de compra ou o mínimo de venda. A ordem espera até alguém aceitar.',
            netos: [
              { label: 'Por que é o padrão', desc: 'Você troca velocidade por controle, e controle vale mais em quase todas as situações de quem investe para o longo prazo.' },
            ],
          },
          { label: 'Stop loss', desc: 'Dispara a venda se o preço cair até o nível que você marcou. Serve para limitar perda dentro de um plano.' },
          { label: 'Stop gain', desc: 'Dispara a venda quando o preço atinge o lucro que você definiu. Ajuda quem tem dificuldade de sair.' },
        ],
      },
      {
        id: 'custos',
        label: 'Custos',
        cor: '#EF4444',
        resumo: 'O que sai a cada clique',
        filhos: [
          {
            label: 'Corretagem',
            desc: 'Cobrada por ordem executada. Muitas corretoras zeraram, e onde ainda existe ela pesa demais em aporte pequeno.',
            netos: [
              { label: 'A conta que abre os olhos', desc: 'Um valor fixo por ordem vira um percentual enorme quando o aporte é pequeno. O mesmo valor some quando o aporte é grande.' },
            ],
          },
          { label: 'Emolumentos e liquidação', desc: 'Taxas da B3 cobradas em toda operação. Pequenas em percentual, mas presentes sempre e somadas ao resto.' },
          { label: 'Custo de girar', desc: 'Quem compra e vende o tempo todo paga taxa e imposto o tempo todo. O retorno some por vazamento, não por decisão errada.' },
          { label: 'Nota de corretagem', desc: 'O comprovante de cada operação, com todos os custos discriminados. É dela que sai o preço médio que a Receita vai querer.' },
        ],
      },
      {
        id: 'book',
        label: 'Book e liquidez',
        cor: '#3B82F6',
        resumo: 'Quem está do outro lado',
        filhos: [
          { label: 'Book de ofertas', desc: 'A fila de quem quer comprar e de quem quer vender, com preço e quantidade de cada oferta. É a foto da oferta e da demanda naquele segundo.' },
          { label: 'Spread', desc: 'A distância entre a melhor compra e a melhor venda. Quanto maior, mais caro fica entrar e sair do papel.' },
          { label: 'Volume diário', desc: 'Quanto o ativo negocia por dia. Define se você consegue vender a sua posição sem derrubar o próprio preço.' },
          { label: 'Como usar na prática', desc: 'Se o book está vazio e o spread está largo, use ordem limitada e tenha paciência. Pressa ali custa dinheiro.' },
        ],
      },
      {
        id: 'horarios',
        label: 'Horários',
        cor: '#8B5CF6',
        resumo: 'Nem todo minuto é igual',
        filhos: [
          { label: 'Pregão', desc: 'O horário normal de negociação em dias úteis, quando a liquidez é maior e os preços se formam de forma contínua.' },
          { label: 'Leilão de abertura e fechamento', desc: 'Momentos em que as ordens se acumulam e o preço é formado de uma vez só. Ordem a mercado ali pode executar longe do esperado.' },
          { label: 'After market', desc: 'Sessão curta depois do fechamento, com liquidez baixa e variação limitada em relação ao preço de fechamento.' },
          { label: 'Regra prática', desc: 'Para quem investe pensando em anos, os primeiros e os últimos minutos do pregão não oferecem vantagem nenhuma.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'Custo de operação parece irrelevante quando você olha uma nota de corretagem isolada. O jeito de enxergar o tamanho real dele é projetar o mesmo aporte por dez anos com e sem esse vazamento.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Informe o aporte mensal que você faz e um prazo de 10 anos',
      'Rode a primeira simulação com a rentabilidade cheia que você espera',
      'Estime quanto os custos de operação consomem por ano se você girar a carteira com frequência',
      'Rode de novo descontando essa estimativa e compare os dois valores finais',
    ],
    exemploGuiado:
      'Exemplo: dois investidores compram exatamente as mesmas ações e fazem o mesmo aporte mensal. O primeiro compra e mantém, com poucas ordens por ano. O segundo gira a carteira, entrando e saindo várias vezes por mês, e por isso paga corretagem, emolumentos e imposto sobre cada ganho realizado. Ao fim de dez anos a diferença entre os dois é grande, e nenhuma parte dela veio de escolher empresas piores. Veio inteira do custo de executar.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que o número final do ticker indica?', verso: 'Três é ação ordinária, quatro é preferencial, onze pode ser unit, ETF ou fundo imobiliário, e o F indica mercado fracionário. Vale conferir antes de comprar.' },
    { id: 'fc2', frente: 'Qual a diferença entre ordem limitada e ordem a mercado?', verso: 'Na limitada você define o preço máximo de compra ou o mínimo de venda e espera. Na ordem a mercado a execução é imediata pelo melhor preço disponível, seja ele qual for.' },
    { id: 'fc3', frente: 'Por que ordem a mercado é perigosa em ativo de baixa liquidez?', verso: 'Porque a próxima oferta de venda no book pode estar bem acima do preço que aparece na tela. Você executa por ela sem receber nenhum aviso.' },
    { id: 'fc4', frente: 'O que é o book de ofertas?', verso: 'A fila das ordens de compra e de venda, com preço e quantidade de cada uma. É a foto da oferta e da demanda do papel naquele instante.' },
    { id: 'fc5', frente: 'O que é spread e por que ele importa?', verso: 'A distância entre a melhor oferta de compra e a melhor de venda. Spread largo encarece tanto a entrada quanto a saída, e é sinal de liquidez baixa.' },
    { id: 'fc6', frente: 'Por que a nota de corretagem precisa ser guardada?', verso: 'Porque é dela que sai o preço médio de cada ativo, que é o número necessário para calcular ganho de capital e declarar imposto corretamente depois.' },
  ],

  quiz: [
    {
      pergunta: 'Você quer comprar uma ação pouco negociada. Qual tipo de ordem faz mais sentido?',
      alternativas: ['A mercado, para garantir a execução', 'Limitada, definindo o preço máximo que você aceita', 'Stop gain', 'Start acima do preço atual'],
      correta: 1,
      explicacao: 'Em ativo pouco negociado a ordem a mercado pode executar bem acima do preço da tela. A limitada troca velocidade por controle, que é o que interessa aqui.',
    },
    {
      pergunta: 'O ticker termina em 4. O que isso significa?',
      alternativas: ['É um fundo imobiliário', 'É uma ação preferencial, sem direito a voto', 'É uma ação ordinária, com direito a voto', 'É negociação no fracionário'],
      correta: 1,
      explicacao: 'Final quatro indica ação preferencial: sem voto na assembleia, com preferência na distribuição de lucro. Final três seria a ordinária.',
    },
    {
      pergunta: 'Por que aportar valores pequenos em corretora que cobra corretagem fixa é ineficiente?',
      alternativas: ['Porque a corretora recusa ordens pequenas', 'Porque o custo fixo vira um percentual alto do valor investido', 'Porque o imposto é maior em ordens pequenas', 'Porque não existe mercado fracionário'],
      correta: 1,
      explicacao: 'Um valor fixo por ordem representa uma fatia grande de um aporte pequeno e uma fatia irrelevante de um aporte grande. O ativo é o mesmo, o custo relativo é que muda.',
    },
    {
      pergunta: 'O que o volume médio diário de um papel ajuda a responder?',
      alternativas: ['Se a empresa é lucrativa', 'Se o dividendo é recorrente', 'Se você consegue vender sua posição sem derrubar o preço', 'Se a ação está barata'],
      correta: 2,
      explicacao: 'Volume mede liquidez, e liquidez responde à pergunta da saída. Uma posição grande demais em relação ao que se negocia por dia é difícil de desmontar.',
    },
  ],

  faq: [
    {
      pergunta: 'Existe uma hora melhor do dia para comprar?',
      resposta: 'Para quem investe pensando em anos, não. A abertura e o fechamento concentram volatilidade e leilões, o que aumenta a chance de executar em um preço estranho sem nenhum ganho em troca. Se o seu horizonte é longo, comprar no meio do pregão com ordem limitada resolve. A busca pelo minuto perfeito costuma custar mais em atenção do que entrega em resultado.',
    },
    {
      pergunta: 'Comprar no fracionário é pior do que comprar lote inteiro?',
      resposta: 'A ação é exatamente a mesma e os direitos também. As diferenças práticas são liquidez um pouco menor e spread às vezes um pouco maior no fracionário, o que se resolve usando ordem limitada. Para quem está começando ou aporta valores menores, o fracionário é o caminho normal e não tem nada de inferior nele.',
    },
    {
      pergunta: 'Devo usar stop loss em tudo?',
      resposta: 'Depende do que você está fazendo. Para quem opera no curto prazo, o stop é uma ferramenta de controle de perda e faz sentido dentro de um plano definido antes. Para quem compra pensando em anos e escolheu a empresa pelo negócio, um stop pode te tirar da posição em uma queda temporária de mercado, realizando prejuízo justamente na hora errada. A pergunta não é se a ferramenta é boa, e sim se ela combina com o seu horizonte.',
    },
  ],
}
