import type { Modulo } from '@/types'

export const moduloDividendos: Modulo = {
  id: 'dividendos',
  trilhaId: 'acoes-bolsa',
  numero: 9,
  titulo: 'Dividendos',
  subtitulo: 'Parte do lucro voltando para o bolso do sócio',
  iconName: 'Coins',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'Dividendo é a parcela do lucro que a empresa distribui aos acionistas em dinheiro. Existe também o JCP, juros sobre capital próprio, que cumpre função parecida mas com tratamento fiscal diferente: a empresa abate o valor do imposto dela e o investidor pessoa física paga imposto retido na fonte.',
    porQueImporta:
      'Viver de dividendos é a estratégia mais popular do investidor brasileiro e também a mais mal executada. A armadilha é montar carteira pelo ranking de maior dividend yield, o que costuma reunir empresas em declínio cujo yield só é alto porque o preço da ação caiu. Entender sustentabilidade de dividendo é o que separa renda crescente de armadilha.',
    naPratica:
      'Três datas organizam tudo. Na data com, quem tiver a ação recebe o provento. Na data ex, quem comprar já não recebe — e o preço da ação cai aproximadamente pelo valor distribuído, o que confunde quem acha que ganhou dinheiro de graça. A data de pagamento é quando o dinheiro entra, às vezes meses depois. Vale saber também que dividendo não cria valor: é transferência de caixa da empresa para você. O que cria valor é o lucro que gerou aquele caixa.',
    passoAPasso: [
      'Entenda as três datas: com, ex e pagamento',
      'Calcule o dividend yield deixando claro se é dos últimos 12 meses ou projetado',
      'Verifique o payout: quanto do lucro está sendo distribuído',
      'Confirme se o lucro é recorrente ou veio de evento único',
      'Monte o histórico de 5 anos de proventos antes de considerar a empresa uma pagadora',
    ],
    errosComuns: [
      'Montar carteira pelo ranking de maior dividend yield',
      'Achar que o preço não cai na data ex — ele cai, pelo valor do provento',
      'Ignorar que o JCP é tributado na fonte',
      'Confundir yield sobre o preço atual com yield sobre o preço que você pagou',
      'Tratar dividendo como criação de valor em vez de transferência',
    ],
    comparativo: {
      titulo: 'Tipos de provento',
      linhas: [
        { label: 'Dividendo', valor: 'Distribuição direta do lucro · confira a regra vigente de IR' },
        { label: 'JCP', valor: 'Empresa abate no IR dela · IR retido na fonte para PF' },
        { label: 'Bonificação', valor: 'Novas ações em vez de dinheiro' },
        { label: 'Desdobramento', valor: 'Divide a ação · muda o preço unitário, não o valor total' },
        { label: 'Grupamento', valor: 'Junta ações · também não muda o valor que você tem' },
      ],
    },
    checklist: [
      'Sei o que são data com, data ex e data de pagamento',
      'Sei calcular dividend yield e payout',
      'Verifiquei se o lucro da empresa que escolhi é recorrente',
      'Levantei o histórico de 5 anos de proventos',
      'Entendi a diferença entre dividendo e JCP',
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O perfil de quem acumula patrimônio de verdade, segundo o livro, é quem reinveste e deixa o dinheiro trabalhar silenciosamente — dividendos reinvestidos ao longo de anos são exatamente esse mecanismo em ação.',
    },
  },

  mapaMental: {
    label: 'Dividendos',
    subtitulo: 'Parte do lucro voltando para o bolso do sócio',
    ramos: [
      {
        id: 'tipos',
        label: 'Tipos de provento',
        cor: '#22C55E',
        resumo: 'Nem tudo é dividendo',
        filhos: [
          { label: 'Dividendo', desc: 'Distribuição direta de parte do lucro, em dinheiro, na proporção das ações que você tem.' },
          {
            label: 'JCP',
            desc: 'Juros sobre capital próprio. A empresa abate do imposto dela e o investidor pessoa física paga IR retido na fonte.',
            netos: [
              { label: 'Por que a empresa prefere', desc: 'Porque reduz o imposto que ela paga. Para o acionista, o valor líquido costuma ser menor que o de um dividendo equivalente.' },
            ],
          },
          { label: 'Bonificação', desc: 'Você recebe ações novas em vez de dinheiro. Sua fatia da empresa continua a mesma, dividida em mais papéis.' },
          { label: 'Desdobramento e grupamento', desc: 'Dividir ou juntar ações. Muda o preço unitário e a quantidade, nunca o valor total que você possui.' },
        ],
      },
      {
        id: 'datas',
        label: 'As três datas',
        cor: '#00D4FF',
        resumo: 'Onde quase todo mundo se confunde',
        filhos: [
          { label: 'Data com', desc: 'Último dia para comprar e ainda ter direito ao provento anunciado.' },
          {
            label: 'Data ex',
            desc: 'A partir dela, quem comprar não recebe. O preço da ação cai aproximadamente pelo valor do provento.',
            netos: [
              { label: 'Por que cai', desc: 'Porque aquele dinheiro saiu do caixa da empresa. Não é perda: ele foi para a sua conta.' },
              { label: 'A armadilha', desc: 'Comprar só para "pegar o dividendo" não gera ganho. Você recebe o valor e vê a ação cair na mesma proporção.' },
            ],
          },
          { label: 'Data de pagamento', desc: 'Quando o dinheiro efetivamente cai na conta. Pode ser semanas ou meses depois da data ex.' },
        ],
      },
      {
        id: 'indicadores',
        label: 'Indicadores',
        cor: '#3B82F6',
        resumo: 'Três números e um histórico',
        filhos: [
          { label: 'Dividend Yield', desc: 'Provento anual dividido pelo preço atual. Sempre diga se é dos últimos 12 meses ou projetado — são coisas diferentes.' },
          {
            label: 'Payout',
            desc: 'Percentual do lucro que foi distribuído. Acima de 100% significa distribuir mais do que ganhou, o que não se sustenta.',
            netos: [
              { label: 'Payout baixo', desc: 'Pode indicar empresa em crescimento, que prefere reinvestir. Não é defeito.' },
              { label: 'Payout muito alto', desc: 'Pode indicar empresa sem onde investir, ou distribuição bancada com dívida.' },
            ],
          },
          { label: 'Yield on cost', desc: 'Provento dividido pelo preço que você pagou. É o número que cresce ao longo dos anos em boas pagadoras.' },
          { label: 'Histórico de 5 anos', desc: 'Pagamento constante vale mais que um ano espetacular. Um bom pagador se prova ao longo de ciclos, não em um trimestre.' },
        ],
      },
      {
        id: 'sustentabilidade',
        label: 'Sustentabilidade',
        cor: '#FFC93C',
        resumo: 'O dividendo vai continuar?',
        filhos: [
          { label: 'Lucro recorrente', desc: 'Dividendo bancado por venda de ativo ou ganho fiscal não se repete no ano seguinte.' },
          { label: 'Geração de caixa', desc: 'Distribuir sem caixa significa distribuir com dívida. Compare o dividendo com o fluxo de caixa operacional.' },
          { label: 'Setor', desc: 'Elétricas, bancos, saneamento e seguradoras pagam bem por natureza. Tecnologia e varejo em expansão costumam reinvestir.' },
          { label: 'Necessidade de investir', desc: 'Empresa que precisa de capex alto só para se manter tem menos espaço para distribuir, mesmo lucrando.' },
        ],
      },
      {
        id: 'armadilhas',
        label: 'Armadilhas',
        cor: '#EF4444',
        resumo: 'Por que yield alto engana',
        filhos: [
          { label: 'Yield alto por queda de preço', desc: 'O denominador caiu, o dividendo não subiu. Costuma ser sinal de problema, não de barganha.' },
          { label: 'Dividendo extraordinário', desc: 'Evento único, como venda de uma unidade de negócio, inflando o indicador por 12 meses.' },
          { label: 'Ranking de DY', desc: 'Montar carteira pelo topo da lista reúne empresas em declínio estrutural com uma facilidade impressionante.' },
          { label: 'Dividendo não cria valor', desc: 'É transferência de caixa da empresa para você. No dia da data ex, o preço cai pelo mesmo valor.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Renda de Dividendos',
    intro:
      'A calculadora mostra quanto patrimônio é necessário para uma renda mensal alvo. O exercício importante aqui não é o primeiro número, é o segundo: refazer com um yield menor e ver o alvo mudar.',
    passos: [
      'Abra Ferramentas → Renda de Dividendos',
      'Digite a renda mensal que você quer alcançar',
      'Use um dividend yield realista, entre 6% e 8% ao ano para uma carteira diversificada',
      'Anote o patrimônio necessário',
      'Refaça com yield 30% menor e adote esse número como sua meta de verdade',
    ],
    exemploGuiado:
      'Exemplo: R$ 3.000 por mês com yield de 7% ao ano exigem cerca de R$ 514 mil. Com yield de 4,9%, sobem para cerca de R$ 735 mil. Planejar pelo segundo número e ser surpreendido positivamente é muito melhor do que planejar pelo primeiro e descobrir o erro depois de quinze anos de aporte.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que acontece com o preço da ação na data ex?', verso: 'Ele cai aproximadamente pelo valor do provento, porque aquele dinheiro saiu do caixa da empresa e foi para a conta dos acionistas.' },
    { id: 'fc2', frente: 'Qual a diferença entre dividendo e JCP?', verso: 'O JCP permite à empresa abater o valor do imposto dela, e o investidor pessoa física tem IR retido na fonte. O dividendo tem tratamento fiscal distinto — confira a regra vigente.' },
    { id: 'fc3', frente: 'O que é payout?', verso: 'O percentual do lucro que a empresa distribuiu. Acima de 100% ela está distribuindo mais do que ganhou, o que não se sustenta por muito tempo.' },
    { id: 'fc4', frente: 'Por que um dividend yield muito alto pode ser ruim?', verso: 'Porque geralmente o preço da ação caiu, ou houve um provento extraordinário que não se repete. Yield alto costuma ser sintoma, não qualidade.' },
    { id: 'fc5', frente: 'O que é yield on cost?', verso: 'O provento em relação ao preço que você pagou, não ao preço atual. É o número que cresce com os anos numa boa pagadora.' },
    { id: 'fc6', frente: 'Dividendo cria valor para o acionista?', verso: 'Não. É transferência do caixa da empresa para o seu bolso. O que cria valor é o lucro que gerou aquele caixa.' },
  ],

  quiz: [
    {
      pergunta: 'Você compra uma ação um dia antes da data ex só para receber o dividendo. O que acontece?',
      alternativas: ['Você ganha o dividendo de graça', 'Você recebe o provento, mas a ação cai aproximadamente pelo mesmo valor', 'Você não tem direito ao provento', 'A corretora bloqueia a operação'],
      correta: 1,
      explicacao: 'É neutro. O valor sai do caixa da empresa e entra no seu bolso, e o preço da ação se ajusta na mesma proporção. Comprar só pelo dividendo não gera ganho.',
    },
    {
      pergunta: 'Uma empresa tem payout de 130%. O que isso significa?',
      alternativas: ['Que ela é uma excelente pagadora', 'Que ela distribuiu mais do que lucrou no período, o que não é sustentável', 'Que ela pagou dividendos em dobro', 'Que o lucro dela cresceu 130%'],
      correta: 1,
      explicacao: 'Payout acima de 100% significa distribuir além do lucro, usando caixa acumulado, venda de ativo ou dívida. Pode acontecer pontualmente, mas não se sustenta.',
    },
    {
      pergunta: 'Qual a forma mais confiável de identificar uma boa pagadora de dividendos?',
      alternativas: ['O maior dividend yield do ranking', 'Histórico de proventos consistentes ao longo de 5 anos, com lucro recorrente e payout saudável', 'Ser uma empresa muito conhecida', 'Ter pago um dividendo extraordinário grande'],
      correta: 1,
      explicacao: 'Consistência ao longo de ciclos, sustentada por lucro recorrente e geração de caixa, é o que distingue uma pagadora de verdade de um yield alto momentâneo.',
    },
    {
      pergunta: 'O que é bonificação?',
      alternativas: ['Um dividendo maior que o normal', 'O recebimento de ações novas em vez de dinheiro', 'Um desconto na corretagem', 'Um bônus pago só a grandes acionistas'],
      correta: 1,
      explicacao: 'Na bonificação a empresa entrega ações novas aos acionistas. Sua participação percentual continua a mesma, apenas distribuída em mais papéis.',
    },
  ],

  faq: [
    {
      pergunta: 'Dá para viver só de dividendos?',
      resposta: 'Dá, com patrimônio suficiente e uma carteira diversificada de boas pagadoras. O ponto de atenção é que a renda precisa crescer pelo menos com a inflação, e que dividendo não é garantido: empresa em dificuldade corta distribuição, e costuma cortar exatamente na hora em que você mais precisa.',
    },
    {
      pergunta: 'Devo reinvestir os dividendos?',
      resposta: 'Na fase de acumulação, sim, e essa é uma das decisões de maior impacto no resultado final. Consumir proventos antes de atingir a meta desliga o juro composto justamente quando ele mais importa.',
    },
    {
      pergunta: 'Empresas que não pagam dividendo são piores?',
      resposta: 'Não. Empresa em crescimento acelerado costuma reinvestir tudo porque consegue retorno maior aplicando internamente do que você conseguiria com o dinheiro na mão. O que importa é o que ela faz com o lucro, não se ela distribui.',
    },
  ],
}
