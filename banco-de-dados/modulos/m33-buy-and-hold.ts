import type { Modulo } from '@/types'

export const moduloBuyAndHold: Modulo = {
  id: 'buy-and-hold',
  trilhaId: 'acoes-bolsa',
  numero: 10,
  titulo: 'Buy and Hold',
  subtitulo: 'Comprar bons negócios e carregar por anos',
  iconName: 'Anchor',
  duracaoMin: 10,

  aprender: {
    oQueE:
      'Buy and hold é comprar participações em bons negócios e mantê-las por muitos anos, aportando com regularidade e ignorando o ruído de curto prazo. O que não significa comprar e esquecer: a tese continua sendo revisada, e deterioração de fundamento continua sendo motivo para vender.',
    porQueImporta:
      'É a estratégia com maior chance de funcionar para quem tem outra profissão. Ela reduz o número de decisões, e cada decisão é uma oportunidade de errar. Também reduz custo: quem gira pouco paga menos corretagem e menos imposto, e o que não sai da carteira continua rendendo.',
    naPratica:
      'Os melhores dias do mercado costumam vir logo depois dos piores, quando quem vendeu ainda está de fora esperando "melhorar". Perder um punhado desses dias ao longo de uma década reduz drasticamente o resultado final. É por isso que a estratégia depende menos de escolher bem e mais de conseguir permanecer. Na prática, três regras escritas resolvem: o que compro, com que frequência aporto, e o que me faria vender.',
    passoAPasso: [
      'Defina por escrito os critérios do que você compra',
      'Defina a periodicidade e o valor do aporte, e automatize',
      'Escreva os três motivos que fariam você vender',
      'Faça revisão trimestral dos resultados das empresas, não das cotações',
      'Reinvista os proventos durante toda a fase de acumulação',
    ],
    errosComuns: [
      'Confundir buy and hold com "nunca vender"',
      'Nunca revisar a tese e carregar empresa deteriorada por anos',
      'Aportar sem critério, comprando o que subiu mais no mês',
      'Parar de aportar durante a crise, que é quando os preços são melhores',
      'Achar que comprar índice dispensa disciplina de aporte',
    ],
    comparativo: {
      titulo: 'Buy and hold, trade e aporte oportunista',
      linhas: [
        { label: 'Buy and hold', valor: 'Giro baixo · custo e imposto mínimos · exige paciência' },
        { label: 'Trade', valor: 'Giro alto · custo e imposto altos · exige tempo integral' },
        { label: 'Aporte oportunista', valor: 'Compra nas quedas · exige caixa parado e sangue frio' },
      ],
    },
    checklist: [
      'Escrevi os critérios do que eu compro',
      'Defini valor e periodicidade do aporte',
      'Escrevi os três motivos que me fariam vender',
      'Faço revisão trimestral de resultados, não de cotação',
      'Reinvisto os proventos automaticamente',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'Buy and hold é um dos pilares centrais da filosofia Boglehead: definir critérios de compra, aportar com regularidade e resistir à tentação de reagir a cada oscilação de curto prazo.',
    },
  },

  mapaMental: {
    label: 'Buy and Hold',
    subtitulo: 'Carregar bons negócios por anos — sem confundir com comprar e esquecer',
    ramos: [
      {
        id: 'principio',
        label: 'O princípio',
        cor: '#22C55E',
        resumo: 'Menos decisões, menos erros',
        filhos: [
          { label: 'Tempo a favor', desc: 'Quanto maior o prazo, mais o resultado reflete o negócio e menos o humor do mercado.' },
          { label: 'Menos custo', desc: 'Girar pouco significa pagar menos corretagem e adiar imposto. O que não sai continua rendendo.' },
          { label: 'Menos decisão', desc: 'Cada decisão é uma chance de errar. Reduzir o número delas melhora o resultado médio.' },
        ],
      },
      {
        id: 'fazer',
        label: 'O que fazer',
        cor: '#00D4FF',
        resumo: 'A rotina que sustenta',
        filhos: [
          { label: 'Aporte recorrente', desc: 'Todo mês, valor definido, independentemente do noticiário. Automatizado sempre que possível.' },
          { label: 'Preço médio', desc: 'Comprando sempre, você compra caro e barato, e o efeito se equilibra ao longo dos anos.' },
          { label: 'Reinvestir proventos', desc: 'É o que transforma a bola de neve em algo visível. Consumir cedo demais desliga o mecanismo.' },
          { label: 'Revisão trimestral', desc: 'Olhar o resultado da empresa, não a cotação da semana. São informações diferentes.' },
        ],
      },
      {
        id: 'naoe',
        label: 'O que não é',
        cor: '#EF4444',
        resumo: 'O mal-entendido mais caro',
        filhos: [
          { label: 'Não é nunca vender', desc: 'Se a tese quebrou, vende. Carregar por teimosia não é estratégia, é apego.' },
          { label: 'Não é ignorar a empresa', desc: 'É ignorar o preço no curto prazo, nunca os fundamentos.' },
          { label: 'Não é comprar qualquer coisa', desc: 'Carregar empresa ruim por dez anos multiplica o prejuízo em vez de diluí-lo.' },
        ],
      },
      {
        id: 'vender',
        label: 'Quando vender',
        cor: '#FFC93C',
        resumo: 'Definido antes, não durante',
        filhos: [
          { label: 'Tese quebrada', desc: 'O motivo pelo qual você comprou deixou de existir. É o critério principal.' },
          { label: 'Governança deteriorou', desc: 'O sinal mais grave e o mais frequentemente ignorado. Costuma preceder as maiores perdas.' },
          { label: 'Rebalanceamento', desc: 'A posição cresceu tanto que virou concentração de risco. Vender parte é gestão, não desistência.' },
          { label: 'Precisar do dinheiro', desc: 'Motivo legítimo — e a razão pela qual ação nunca deve ser reserva de emergência.' },
        ],
      },
      {
        id: 'inimigo',
        label: 'O inimigo',
        cor: '#8B5CF6',
        resumo: 'Tentar acertar o momento',
        filhos: [
          { label: 'Market timing', desc: 'Tentar sair antes da queda e voltar antes da alta exige acertar duas vezes seguidas, repetidamente.' },
          { label: 'Perder os melhores dias', desc: 'As maiores altas costumam vir logo após as maiores quedas, quando quem saiu ainda está fora.' },
          { label: 'Ruído diário', desc: 'Notícia é feita para ser lida hoje. Sua carteira é feita para durar décadas. Ritmos incompatíveis.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'A força do buy and hold não aparece em um ano nem em cinco. Ela aparece na diferença entre quem manteve o aporte por duas décadas e quem interrompeu nos períodos difíceis.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Simule 25 anos de aporte mensal constante a 0,8% ao mês',
      'Anote o valor final e quanto dele foi efetivamente aportado por você',
      'Repare que a maior parte do montante não é aporte, é rendimento sobre rendimento',
      'Refaça com 20 anos e veja o quanto os últimos 5 anos representam do total',
    ],
    exemploGuiado:
      'Exemplo: R$ 800 por mês por 25 anos a 0,8% ao mês ultrapassam R$ 800 mil, sendo apenas R$ 240 mil de aporte. Os últimos cinco anos sozinhos acrescentam mais que a primeira década inteira. É por isso que interromper perto do fim é ainda mais custoso que começar tarde.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Buy and hold significa nunca vender?', verso: 'Não. Significa não vender por causa de oscilação de preço. Tese quebrada, governança deteriorada e rebalanceamento continuam sendo motivos válidos.' },
    { id: 'fc2', frente: 'Por que perder os melhores dias do mercado é tão caro?', verso: 'Porque as maiores altas costumam vir logo depois das maiores quedas, quando quem vendeu ainda está fora esperando confirmação.' },
    { id: 'fc3', frente: 'Quais as três regras que sustentam a estratégia?', verso: 'O que eu compro, com que frequência eu aporto, e o que me faria vender. Todas escritas antes, em momento calmo.' },
    { id: 'fc4', frente: 'Por que giro baixo melhora o resultado?', verso: 'Menos corretagem, imposto adiado e menos decisões tomadas. O dinheiro que não sai para pagar custo continua rendendo.' },
    { id: 'fc5', frente: 'O que revisar na revisão trimestral?', verso: 'Os resultados da empresa: receita, margem, dívida e execução da estratégia. Não a cotação, que é ruído nesse intervalo.' },
    { id: 'fc6', frente: 'Qual o erro mais comum de quem diz seguir buy and hold?', verso: 'Parar de aportar durante as crises — exatamente quando os preços estão melhores e a estratégia mais dependeria da constância.' },
  ],

  quiz: [
    {
      pergunta: 'A empresa que você carrega há 5 anos perdeu sua principal vantagem competitiva e a dívida disparou. O que fazer?',
      alternativas: ['Manter, porque buy and hold é para sempre', 'Reavaliar e provavelmente vender, porque a tese mudou', 'Comprar mais para reduzir o preço médio', 'Esperar voltar ao preço de compra'],
      correta: 1,
      explicacao: 'Buy and hold não é apego. Quando o fundamento que justificava a compra deixa de existir, manter deixa de ser disciplina e vira teimosia.',
    },
    {
      pergunta: 'Por que o market timing é tão difícil?',
      alternativas: ['Porque exige muito capital', 'Porque exige acertar duas vezes: a saída e a volta, repetidamente', 'Porque a corretora cobra caro', 'Porque é proibido pela CVM'],
      correta: 1,
      explicacao: 'Sair perto do topo já é difícil; voltar antes da recuperação é mais difícil ainda, e é preciso acertar as duas coisas de novo a cada ciclo.',
    },
    {
      pergunta: 'Durante uma crise, com a bolsa caindo 35%, o que faz o investidor buy and hold?',
      alternativas: ['Vende para preservar capital', 'Mantém a rotina de aportes, comprando mais barato', 'Migra tudo para renda fixa', 'Para de aportar até a recuperação'],
      correta: 1,
      explicacao: 'Aporte constante durante a queda é o que produz preço médio menor. Interromper nesse momento é abrir mão da melhor parte da estratégia.',
    },
    {
      pergunta: 'O que NÃO é motivo válido para vender numa estratégia de buy and hold?',
      alternativas: ['A tese de investimento quebrou', 'A posição cresceu muito e virou concentração', 'A ação caiu 20% no trimestre sem mudança de fundamento', 'Você precisa do dinheiro para um objetivo'],
      correta: 2,
      explicacao: 'Queda de preço sem mudança de fundamento é volatilidade. Vender por isso é justamente o comportamento que a estratégia existe para evitar.',
    },
  ],

  faq: [
    {
      pergunta: 'Buy and hold funciona no Brasil, com juro real tão alto?',
      resposta: 'Funciona, mas a régua é mais alta: a renda variável precisa superar um Tesouro IPCA+ que já paga bem. Isso torna a seleção de empresas mais exigente e reforça a importância de ter renda fixa na carteira em vez de tudo em ações.',
    },
    {
      pergunta: 'Quantas empresas devo carregar?',
      resposta: 'Entre 10 e 15 de setores diferentes costuma equilibrar diversificação e capacidade de acompanhar. Mais que isso, você deixa de conhecer o que tem; menos, a carteira fica concentrada demais.',
    },
    {
      pergunta: 'Posso fazer buy and hold só com ETFs?',
      resposta: 'Pode, e é uma escolha defensável — resolve diversificação e reduz o trabalho de análise. Mas continua exigindo disciplina de aporte e de não vender na queda, que é a parte difícil da estratégia em qualquer formato.',
    },
  ],
}
