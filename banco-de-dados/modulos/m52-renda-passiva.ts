import type { Modulo } from '@/types'

export const moduloRendaPassiva: Modulo = {
  id: 'renda-passiva',
  trilhaId: 'vida-financeira',
  numero: 4,
  titulo: 'Renda Passiva',
  subtitulo: 'Transformar patrimônio em dinheiro todo mês',
  iconName: 'Banknote',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'Renda passiva é o dinheiro que entra sem depender do seu trabalho naquele mês: aluguel de FII, dividendo de ação, cupom de título. Ela não é gratuita nem automática — é o resultado de um patrimônio construído antes. A palavra "passiva" descreve a manutenção, não a construção.',
    porQueImporta:
      'É o objetivo declarado da maioria das pessoas que começa a investir, e também o mais mal dimensionado. Vídeos vendem a ideia de viver de renda com pouco capital; a matemática diz outra coisa. Ver o número real cedo evita quinze anos de plano construído sobre uma premissa errada.',
    naPratica:
      'A conta é simples e desconfortável: renda mensal desejada dividida pelo yield líquido mensal dá o patrimônio necessário. Para R$ 3.000 por mês com yield de 7% ao ano, são cerca de R$ 514 mil. E há um segundo ponto que quase todo mundo ignora: a renda precisa crescer com a inflação, senão encolhe todo ano. Uma renda de R$ 3.000 hoje, congelada, vale bem menos daqui a dez anos.',
    passoAPasso: [
      'Defina a renda mensal alvo, já líquida de imposto',
      'Escolha a combinação de fontes: FIIs, ações pagadoras, títulos com cupom',
      'Calcule o patrimônio necessário usando um yield conservador',
      'Some uma margem para que a renda acompanhe a inflação ao longo dos anos',
      'Construa por etapas e comemore os primeiros R$ 100 por mês',
    ],
    errosComuns: [
      'Projetar com o maior yield disponível hoje',
      'Esquecer que a renda precisa crescer com a inflação',
      'Concentrar tudo em uma única fonte ou em um único fundo',
      'Confundir renda passiva com renda garantida',
      'Gastar os proventos antes de atingir a meta de patrimônio',
    ],
    comparativo: {
      titulo: 'Fontes de renda passiva',
      linhas: [
        { label: 'FIIs', valor: 'Mensal · isento para PF com requisitos · risco de vacância' },
        { label: 'Ações pagadoras', valor: 'Irregular · cresce com o tempo · risco de corte' },
        { label: 'Tesouro IPCA+ com cupom', valor: 'Semestral · corrige pela inflação · IR regressivo' },
        { label: 'CDB/LCI com cupom', valor: 'Periódico · alta previsibilidade · risco de crédito' },
        { label: 'Tesouro Renda+', valor: 'Mensal por 20 anos · corrigido pela inflação' },
        { label: 'Imóvel alugado', valor: 'Mensal · vacância, inadimplência e manutenção' },
      ],
    },
    checklist: [
      'Defini minha renda mensal alvo',
      'Calculei o patrimônio necessário com yield conservador',
      'Escolhi mais de uma fonte de renda',
      'Considerei a correção pela inflação no plano',
      'Estabeleci metas intermediárias em vez de só o número final',
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'O livro trata diretamente da transição de acumular patrimônio para viver da renda gerada por ele — a mesma lógica de calcular patrimônio necessário com yield conservador que este módulo ensina na prática.',
    },
  },

  mapaMental: {
    label: 'Renda Passiva',
    subtitulo: 'Transformar patrimônio em fluxo mensal previsível',
    ramos: [
      {
        id: 'fontes',
        label: 'As fontes',
        cor: '#22C55E',
        resumo: 'Cada uma com um risco',
        filhos: [
          { label: 'FIIs', desc: 'Pagamento mensal e isento para pessoa física dentro das regras. O risco é vacância e queda de aluguel.' },
          { label: 'Ações pagadoras', desc: 'Irregular no curto prazo, mas cresce ao longo dos anos em boas empresas. O risco é corte de dividendo.' },
          { label: 'Títulos com cupom', desc: 'Tesouro IPCA+ com juros semestrais e debêntures que pagam periodicamente. Alta previsibilidade.' },
          { label: 'Imóvel alugado', desc: 'Concreto e familiar, com vacância, inadimplência, manutenção e baixa liquidez embutidos.' },
        ],
      },
      {
        id: 'conta',
        label: 'A conta',
        cor: '#00D4FF',
        resumo: 'O número que assusta e organiza',
        filhos: [
          { label: 'Renda alvo líquida', desc: 'Comece pelo que você quer receber por mês, já descontado imposto. Bruto engana.' },
          {
            label: 'Yield conservador',
            desc: 'Projete com um rendimento menor que o disponível hoje. Margem de segurança em projeção é obrigatória.',
            netos: [
              { label: 'Regra prática', desc: 'Faça a conta com o yield atual e refaça com 30% a menos. Adote o segundo número.' },
            ],
          },
          { label: 'Patrimônio necessário', desc: 'Renda anual desejada dividida pelo yield anual. É quase sempre maior do que as redes sociais sugerem.' },
        ],
      },
      {
        id: 'inflacao',
        label: 'Manter o poder de compra',
        cor: '#FFC93C',
        resumo: 'Renda parada é renda encolhendo',
        filhos: [
          { label: 'A renda precisa crescer', desc: 'Sem correção pela inflação, R$ 3.000 hoje compram bem menos daqui a dez anos.' },
          { label: 'Reinvestir parte', desc: 'Mesmo na fase de renda, reinvestir uma fatia mantém o poder de compra subindo.' },
          { label: 'Ativos que corrigem', desc: 'FIIs com contratos indexados, IPCA+ e boas pagadoras que aumentam dividendo ao longo do tempo.' },
        ],
      },
      {
        id: 'diversificar',
        label: 'Diversificar a renda',
        cor: '#3B82F6',
        resumo: 'Não depender de um pagador',
        filhos: [
          { label: 'Várias fontes', desc: 'FII, ação e renda fixa com cupom reagem a coisas diferentes. Uma sustenta a outra.' },
          { label: 'Corte acontece', desc: 'Fundo reduz distribuição e empresa corta dividendo. Depender de um único pagador é risco desnecessário.' },
          { label: 'Calendário', desc: 'Combinar pagadores em datas diferentes suaviza o fluxo dentro do mês.' },
        ],
      },
      {
        id: 'ilusoes',
        label: 'Ilusões comuns',
        cor: '#EF4444',
        resumo: 'O que vendem por aí',
        filhos: [
          { label: '"Renda passiva fácil"', desc: 'Exige patrimônio grande ou muitos anos de aporte. Normalmente os dois.' },
          { label: 'Yield alto como atalho', desc: 'Rendimento muito acima da média é sinal de risco, não de eficiência. Perseguir isso destrói o plano.' },
          { label: 'Gastar cedo demais', desc: 'Consumir proventos na fase de acumulação desliga o juro composto e atrasa a meta em anos.' },
          { label: 'Renda não é garantida', desc: 'Distribuição pode cair, e cai justamente nos períodos ruins, quando você mais contaria com ela.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Renda de Dividendos',
    intro:
      'A calculadora responde a pergunta central deste módulo. O exercício útil não é o primeiro número, é ver o alvo se mover quando você troca a premissa de rendimento.',
    passos: [
      'Abra Ferramentas → Renda de Dividendos',
      'Digite a renda mensal que você quer receber',
      'Use um yield de 7% ao ano e anote o patrimônio necessário',
      'Refaça com 5% ao ano e compare',
      'Divida o resultado por 10 para achar uma meta intermediária alcançável este ano',
    ],
    exemploGuiado:
      'Exemplo: R$ 2.000 por mês com yield de 7% ao ano exigem cerca de R$ 343 mil. Com 5%, sobem para R$ 480 mil. A diferença entre as duas premissas é de quase R$ 140 mil — anos de aporte. Planejar pelo cenário conservador e ser surpreendido positivamente é sempre melhor que o contrário.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Como calcular o patrimônio necessário para uma renda mensal?', verso: 'Multiplique a renda mensal desejada por 12 e divida pelo yield anual líquido. Use sempre um yield conservador.' },
    { id: 'fc2', frente: 'Por que a renda passiva precisa crescer?', verso: 'Porque a inflação corrói o poder de compra. Uma renda congelada em reais compra cada vez menos a cada ano que passa.' },
    { id: 'fc3', frente: 'Renda passiva é renda garantida?', verso: 'Não. Fundos reduzem distribuição e empresas cortam dividendo, geralmente nos períodos ruins — exatamente quando você mais contaria com ela.' },
    { id: 'fc4', frente: 'Por que não usar o maior yield disponível na projeção?', verso: 'Porque yield alto raramente se sustenta. Projetar pelo melhor caso constrói um plano que só funciona se nada der errado.' },
    { id: 'fc5', frente: 'Quando parar de reinvestir os proventos?', verso: 'Só depois de atingir a meta de patrimônio. Consumir antes desliga o juro composto justamente na fase em que ele mais trabalha.' },
    { id: 'fc6', frente: 'Por que diversificar as fontes de renda?', verso: 'Porque corte de distribuição acontece. Com FII, ação e renda fixa com cupom, uma fonte compensa a queda temporária da outra.' },
  ],

  quiz: [
    {
      pergunta: 'Você quer R$ 4.000 por mês de renda. Com um yield líquido de 6% ao ano, qual o patrimônio necessário aproximado?',
      alternativas: ['R$ 400 mil', 'R$ 800 mil', 'R$ 240 mil', 'R$ 1,2 milhão'],
      correta: 1,
      explicacao: 'R$ 4.000 por mês são R$ 48.000 por ano. Dividido por 6%, dá R$ 800 mil. É um número maior do que a maioria imagina — e por isso vale conhecê-lo cedo.',
    },
    {
      pergunta: 'Qual o maior erro ao planejar renda passiva?',
      alternativas: ['Diversificar demais as fontes', 'Projetar usando o maior yield disponível hoje', 'Investir em FIIs', 'Reinvestir os proventos'],
      correta: 1,
      explicacao: 'Yield alto costuma ser temporário. Um plano construído sobre a melhor premissa possível revela o erro só depois de muitos anos de aporte, quando corrigir é caro.',
    },
    {
      pergunta: 'Por que a renda passiva precisa ser corrigida pela inflação?',
      alternativas: ['Por exigência da Receita Federal', 'Porque uma renda fixa em reais perde poder de compra ano após ano', 'Porque os fundos exigem isso', 'Não precisa, o valor nominal basta'],
      correta: 1,
      explicacao: 'Sem correção, o mesmo valor nominal compra cada vez menos. Um plano de renda para 30 anos precisa considerar que o custo de vida sobe todo ano.',
    },
    {
      pergunta: 'Na fase de acumulação, o que fazer com os proventos recebidos?',
      alternativas: ['Gastar, é a recompensa', 'Reinvestir, para acelerar a construção do patrimônio', 'Deixar parados na conta', 'Usar para pagar despesas fixas'],
      correta: 1,
      explicacao: 'Reinvestir na fase de acumulação é o que faz a bola de neve girar. Consumir cedo demais transforma décadas de espera em anos a mais de espera.',
    },
  ],

  faq: [
    {
      pergunta: 'Dá para começar a receber renda com pouco dinheiro?',
      resposta: 'Dá, e vale a pena pelo efeito psicológico. Receber R$ 30 de rendimento no primeiro mês torna o conceito concreto. O importante é reinvestir esse valor até chegar à meta, não consumi-lo.',
    },
    {
      pergunta: 'FII ou ação pagadora, qual é melhor para renda?',
      resposta: 'FII paga mensalmente e tem isenção no rendimento para pessoa física, o que dá previsibilidade. Ação pagadora é irregular no curto prazo, mas boas empresas aumentam o dividendo ao longo dos anos. Ter os dois costuma funcionar melhor que escolher um.',
    },
    {
      pergunta: 'Quanto tempo leva para viver de renda?',
      resposta: 'Depende muito mais da sua taxa de poupança do que da rentabilidade. Quem guarda 30% da renda chega muito antes de quem guarda 10% com um rendimento um pouco melhor. Nos primeiros anos, aumentar o aporte pesa mais que otimizar a carteira.',
    },
  ],
}
