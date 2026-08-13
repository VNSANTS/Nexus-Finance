import type { Modulo } from '@/types'

export const moduloTesouroDireto: Modulo = {
  id: 'tesouro-direto',
  trilhaId: 'renda-fixa-previdencia',
  numero: 2,
  titulo: 'Tesouro Direto',
  subtitulo: 'Emprestar para o governo a partir de R$ 30',
  iconName: 'Landmark',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Tesouro Direto é o programa que permite a qualquer pessoa comprar títulos da dívida pública pela internet, com valores baixos. Na prática, você empresta dinheiro para o governo federal e recebe juros. É considerado o investimento de menor risco de crédito do país — se o governo brasileiro não pagar, nenhuma outra dívida em real será paga antes.',
    porQueImporta:
      'É a porta de entrada mais honesta do mercado brasileiro. Não tem taxa de corretora na maioria das plataformas, começa com valores muito baixos, e cobre três necessidades completamente diferentes com três títulos distintos: reserva de emergência, objetivo com data marcada e aposentadoria.',
    naPratica:
      'O Tesouro Selic acompanha a taxa básica e quase não oscila — é o título de reserva. O Prefixado trava uma taxa hoje e faz sentido para quem acredita em queda de juros. O IPCA+ paga inflação mais uma taxa real e é o título de longo prazo por excelência. Todos sofrem marcação a mercado: o preço muda todo dia. Isso só importa para quem vende antes do vencimento — quem segura recebe exatamente o combinado. Há ainda taxa de custódia da B3 de 0,20% ao ano, com isenção para valores menores em Tesouro Selic, e IOF em resgates antes de 30 dias.',
    passoAPasso: [
      'Abra conta em corretora que não cobre taxa de custódia própria',
      'Escolha o título pelo prazo do seu objetivo, não pela taxa mais alta da tela',
      'Confira o vencimento e tente casá-lo com a data em que vai usar o dinheiro',
      'Compre e anote a taxa contratada — é ela que você recebe no vencimento',
      'Não se assuste ao ver o valor oscilar no meio do caminho',
    ],
    errosComuns: [
      'Vender IPCA+ no meio do caminho por medo da marcação a mercado',
      'Achar que "garantido pelo governo" significa "não oscila"',
      'Deixar reserva de emergência em Prefixado ou IPCA+ longo',
      'Escolher pelo maior número da tela sem olhar o vencimento',
      'Resgatar antes de 30 dias e ser pego pelo IOF',
    ],
    comparativo: {
      titulo: 'Qual título para qual objetivo',
      linhas: [
        { label: 'Tesouro Selic', valor: 'Reserva de emergência · quase não oscila' },
        { label: 'Tesouro Prefixado', valor: 'Aposta em queda de juros · oscila bastante' },
        { label: 'Tesouro IPCA+', valor: 'Longo prazo e aposentadoria · protege da inflação' },
        { label: 'Tesouro Renda+', valor: 'Renda mensal por 20 anos após a data escolhida' },
        { label: 'Tesouro Educa+', valor: 'Renda mensal por 5 anos · faculdade dos filhos' },
      ],
    },
    checklist: [
      'Abri conta em corretora sem taxa de custódia própria',
      'Sei a diferença entre Selic, Prefixado e IPCA+',
      'Escolhi o título pelo prazo do meu objetivo',
      'Entendi o que é marcação a mercado',
      'Sei que só pago IOF se resgatar antes de 30 dias',
    ],
    livroRelacionado: {
      livroId: 'homem-mais-rico-babilonia',
      textoConexao: 'O livro defende começar a investir de forma simples e acessível, sem esperar ter muito dinheiro — o Tesouro Direto, com aportes baixos e pela internet, é a versão moderna exata desse primeiro passo.',
    },
  },

  mapaMental: {
    label: 'Tesouro Direto',
    subtitulo: 'Emprestar para o governo, com valores baixos, pela internet',
    ramos: [
      {
        id: 'selic',
        label: 'Tesouro Selic',
        cor: '#22C55E',
        resumo: 'O título da reserva',
        filhos: [
          { label: 'Como rende', desc: 'Acompanha a Selic, dia após dia. Quando a taxa básica sobe, ele rende mais na hora.' },
          { label: 'Para que serve', desc: 'Reserva de emergência. É o único da família que praticamente não oscila de preço.' },
          { label: 'Liquidez', desc: 'Resgate com o dinheiro na conta em um dia útil.' },
          { label: 'Isenção de custódia', desc: 'Valores menores aplicados nele costumam ficar isentos da taxa da B3 — confira a regra vigente.' },
        ],
      },
      {
        id: 'prefixado',
        label: 'Tesouro Prefixado',
        cor: '#FFC93C',
        resumo: 'Travar a taxa de hoje',
        filhos: [
          { label: 'Como rende', desc: 'Taxa travada na compra, tipo 12% ao ano até o vencimento. Você sabe o valor exato que vai receber.' },
          { label: 'Quando faz sentido', desc: 'Quando você acredita que os juros vão cair e quer garantir a taxa alta de agora.' },
          {
            label: 'O risco',
            desc: 'Se o juro subir depois, o preço do seu título cai. Segurando até o vencimento, você recebe o combinado mesmo assim.',
            netos: [
              { label: 'Por que cai', desc: 'Seu título antigo paga menos que os novos, então vale menos para quem fosse comprá-lo hoje.' },
            ],
          },
          { label: 'Não serve para reserva', desc: 'Oscila demais. Emergência acontece na hora errada, e você pode ser obrigado a vender no pior preço.' },
        ],
      },
      {
        id: 'ipca',
        label: 'Tesouro IPCA+',
        cor: '#3B82F6',
        resumo: 'Ganho real garantido no vencimento',
        filhos: [
          { label: 'Como rende', desc: 'Inflação do período mais uma taxa fixa. Garante que seu dinheiro cresça acima da inflação, seja qual for ela.' },
          { label: 'Para que serve', desc: 'Aposentadoria, faculdade dos filhos e qualquer objetivo de 10 anos ou mais.' },
          { label: 'Oscilação forte', desc: 'Quanto mais longo o vencimento, mais o preço balança no meio do caminho. É normal e não afeta quem segura.' },
          { label: 'Com juros semestrais', desc: 'Versão que paga cupom duas vezes por ano. Útil para quem já quer renda, ruim para quem ainda acumula, porque o cupom é tributado a cada pagamento.' },
        ],
      },
      {
        id: 'renda',
        label: 'Renda+ e Educa+',
        cor: '#8B5CF6',
        resumo: 'Acumular e depois receber mensalmente',
        filhos: [
          { label: 'Renda+', desc: 'Acumula até uma data escolhida e depois paga renda mensal corrigida pela inflação por 20 anos.' },
          { label: 'Educa+', desc: 'Mesma lógica, com pagamento por 5 anos. Pensado para a faculdade dos filhos.' },
          { label: 'Cuidado', desc: 'Resgatar antes da data programada pode sair caro por causa da marcação a mercado. São títulos para levar até o fim.' },
        ],
      },
      {
        id: 'custos',
        label: 'Custos e impostos',
        cor: '#EF4444',
        resumo: 'O que sai do seu rendimento',
        filhos: [
          { label: 'Taxa da B3', desc: '0,20% ao ano de custódia, com isenção para valores menores em Tesouro Selic. Confira a regra atual antes de investir.' },
          { label: 'Taxa da corretora', desc: 'A maioria zerou. Se a sua cobra, troque — não há motivo para pagar isso.' },
          { label: 'IR regressivo', desc: 'De 22,5% a 15%, conforme o tempo de aplicação. Cobrado só no resgate ou no vencimento.' },
          { label: 'IOF', desc: 'Apenas nos primeiros 30 dias, de forma decrescente. Depois disso, zero.' },
        ],
      },
      {
        id: 'marcacao',
        label: 'Marcação a mercado',
        cor: '#00D4FF',
        resumo: 'O que assusta quem não entendeu',
        filhos: [
          { label: 'O que é', desc: 'O preço do título muda todo dia conforme a expectativa de juros do mercado.' },
          { label: 'Juro sobe, preço cai', desc: 'Parece contraintuitivo, mas é assim: o título antigo, com taxa menor, passa a valer menos.' },
          { label: 'Só importa se vender antes', desc: 'Levando até o vencimento, você recebe exatamente a taxa que contratou na compra.' },
          { label: 'Pode ser oportunidade', desc: 'Um IPCA+ longo que subiu muito de preço às vezes vale mais vendido antes do que esperado até o fim.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Simulador Tesouro Direto',
    intro:
      'A taxa que aparece na tela do Tesouro é bruta. O que chega no seu bolso é menor, porque saem imposto de renda, taxa da B3 e, em resgates rápidos, IOF. Ver esses descontos aplicados muda a escolha do prazo.',
    passos: [
      'Abra Ferramentas → Simulador Tesouro Direto',
      'Escolha o tipo de título: Selic, Prefixado ou IPCA+',
      'Digite o valor do aporte e o prazo em anos',
      'Veja o valor bruto e depois o líquido, já com IR e taxa de custódia descontados',
      'Repita com prazos diferentes e observe a alíquota de IR caindo',
    ],
    exemploGuiado:
      'Exemplo: R$ 10.000 no Tesouro Selic por 6 meses pagam 22,5% de IR sobre o rendimento. Os mesmos R$ 10.000 mantidos por mais de 2 anos pagam 15%. Só de esperar, a alíquota cai um terço — e é por isso que vale planejar o prazo antes de aplicar, não depois.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual título do Tesouro serve para reserva de emergência?', verso: 'Tesouro Selic. Acompanha a taxa básica, praticamente não oscila de preço e tem resgate em um dia útil.' },
    { id: 'fc2', frente: 'O que é marcação a mercado?', verso: 'A variação diária do preço do título conforme a expectativa de juros. Só afeta quem vende antes do vencimento — quem segura recebe a taxa contratada.' },
    { id: 'fc3', frente: 'Por que o preço do título cai quando o juro sobe?', verso: 'Porque seu título antigo paga menos que os novos, então vale menos para quem fosse comprá-lo hoje.' },
    { id: 'fc4', frente: 'Quando o Tesouro IPCA+ faz sentido?', verso: 'Em objetivos de 10 anos ou mais, como aposentadoria. Ele garante rendimento acima da inflação no vencimento, qualquer que seja ela.' },
    { id: 'fc5', frente: 'Quais são os custos do Tesouro Direto?', verso: 'Taxa de custódia da B3 de 0,20% ao ano com isenção para valores menores em Tesouro Selic, IR regressivo de 22,5% a 15%, e IOF apenas nos primeiros 30 dias.' },
    { id: 'fc6', frente: 'Tesouro Direto tem FGC?', verso: 'Não, e não precisa. O devedor é o próprio governo federal, considerado o menor risco de crédito em real que existe no país.' },
  ],

  quiz: [
    {
      pergunta: 'Você vai comprar um carro daqui a 2 anos. Qual título faz mais sentido?',
      alternativas: ['Tesouro IPCA+ 2045', 'Tesouro Selic ou um Prefixado com vencimento próximo de 2 anos', 'Tesouro Renda+', 'Tesouro Prefixado 2040'],
      correta: 1,
      explicacao: 'Objetivo com data marcada pede vencimento casado com essa data. Títulos muito longos obrigariam você a vender no meio do caminho, sujeito à marcação a mercado.',
    },
    {
      pergunta: 'Seu Tesouro IPCA+ 2045 caiu 12% de valor este mês. O que aconteceu?',
      alternativas: ['O governo deu calote', 'A inflação ficou negativa', 'A expectativa de juros subiu e o preço do título caiu — no vencimento você recebe a taxa contratada', 'Você foi vítima de fraude'],
      correta: 2,
      explicacao: 'É marcação a mercado pura. Títulos longos oscilam bastante. Se você levar até 2045, receberá exatamente a inflação mais a taxa real contratada na compra.',
    },
    {
      pergunta: 'Quando o IOF é cobrado no Tesouro Direto?',
      alternativas: ['Sempre, em qualquer resgate', 'Somente em resgates antes de 30 dias', 'Somente acima de R$ 50 mil', 'Nunca'],
      correta: 1,
      explicacao: 'O IOF incide de forma decrescente apenas nos primeiros 30 dias. A partir do dia 30, é zero.',
    },
    {
      pergunta: 'Qual afirmação sobre o Tesouro Prefixado está correta?',
      alternativas: ['Ele rende mais quando a Selic sobe', 'Ele tem a taxa travada na compra e é garantida no vencimento', 'Ele nunca oscila de preço', 'Ele acompanha a inflação'],
      correta: 1,
      explicacao: 'A taxa é travada no momento da compra e cumprida no vencimento. No meio do caminho, o preço oscila conforme a expectativa de juros do mercado.',
    },
  ],

  faq: [
    {
      pergunta: 'E se o governo brasileiro der calote?',
      resposta: 'É o menor risco de crédito disponível em real. Um calote do governo federal significaria uma crise em que bancos, empresas e praticamente qualquer outro devedor já teriam quebrado antes. Não existe aplicação em real mais segura nesse critério.',
    },
    {
      pergunta: 'Posso vender antes do vencimento?',
      resposta: 'Pode, todos os dias úteis, pelo preço de mercado do dia. Isso pode significar receber mais ou menos que o previsto. A garantia da taxa contratada vale para quem segura até o vencimento.',
    },
    {
      pergunta: 'Qual a diferença entre Tesouro Direto e Tesouro Selic?',
      resposta: 'Tesouro Direto é o programa, a plataforma inteira. Tesouro Selic é um dos títulos vendidos nele. É a mesma confusão de chamar de "supermercado" um produto específico da prateleira.',
    },
  ],
}
