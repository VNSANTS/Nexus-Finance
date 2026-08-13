import type { Modulo } from '@/types'

export const moduloFinancasPublicas: Modulo = {
  id: 'financas-publicas',
  trilhaId: 'economia-mercado',
  numero: 5,
  titulo: 'Finanças Públicas',
  subtitulo: 'Por que Brasília mexe no seu título',
  iconName: 'Library',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'Finanças públicas é o estudo de como o governo arrecada, gasta e se endivida. Enquanto a política monetária é o Banco Central mexendo nos juros, a política fiscal é o governo decidindo quanto tirar da sociedade em impostos e quanto devolver em gastos e investimentos.',
    porQueImporta:
      'A conexão entre Brasília e a sua carteira é direta e mensurável. Quando o mercado desconfia da capacidade do governo de pagar a própria dívida, exige juro maior para financiá-lo. Isso empurra toda a curva de juros para cima — e derruba o preço de quem já tinha títulos prefixados e IPCA+ na carteira, antes mesmo de qualquer lei ser aprovada.',
    naPratica:
      'Dois conceitos organizam a leitura. O resultado primário é arrecadação menos despesas, sem contar os juros da dívida: mostra se a conta fecharia caso o governo não devesse nada. O resultado nominal inclui os juros, e é o resultado de verdade. Também vale distinguir déficit de dívida: déficit é o rombo de um ano, dívida é a soma acumulada de todos os rombos anteriores. E há uma característica brasileira importante: a maior parte da despesa é obrigatória por lei, o que deixa pouco espaço de manobra no curto prazo.',
    passoAPasso: [
      'Entenda a diferença entre resultado primário e nominal',
      'Separe despesa obrigatória de discricionária e veja o tamanho de cada uma',
      'Acompanhe a relação dívida sobre PIB, que é o número que o mercado observa',
      'Ligue risco fiscal a prêmio de juros exigido pelo mercado',
      'Observe o efeito disso no preço de um Tesouro IPCA+ longo',
    ],
    errosComuns: [
      'Tratar o tema como torcida política em vez de mecanismo',
      'Confundir déficit com dívida',
      'Achar que emitir moeda resolve o problema sem consequência',
      'Ignorar o peso das despesas obrigatórias no orçamento',
      'Achar que finanças públicas não afetam quem só tem CDB',
    ],
    comparativo: {
      titulo: 'Conceitos que se confundem',
      linhas: [
        { label: 'Resultado primário', valor: 'Arrecadação menos despesas, sem os juros' },
        { label: 'Resultado nominal', valor: 'Inclui os juros da dívida · é o resultado real' },
        { label: 'Déficit', valor: 'O rombo de um único exercício' },
        { label: 'Dívida', valor: 'A soma acumulada de todos os déficits anteriores' },
        { label: 'Despesa obrigatória', valor: 'Previdência e pessoal · não se corta de um ano para o outro' },
        { label: 'Despesa discricionária', valor: 'Investimento e custeio · a parte que o governo consegue mexer' },
      ],
    },
    checklist: [
      'Sei a diferença entre resultado primário e nominal',
      'Sei a diferença entre déficit e dívida',
      'Entendi por que despesa obrigatória limita o ajuste',
      'Sei ligar risco fiscal a alta de juros longos',
      'Entendi o efeito disso nos meus títulos prefixados e IPCA+',
    ],
    livroRelacionado: {
      livroId: 'random-walk-wall-street',
      textoConexao: 'Malkiel mostra como fatores macroeconômicos e fiscais afetam o comportamento agregado dos mercados — a discussão sobre déficit e dívida pública deste módulo é justamente o tipo de contexto que molda o cenário de juros que o livro discute.',
    },
  },

  mapaMental: {
    label: 'Finanças Públicas',
    subtitulo: 'Por que a discussão em Brasília mexe no seu título antes de virar lei',
    ramos: [
      {
        id: 'arrecadacao',
        label: 'Arrecadação',
        cor: '#22C55E',
        resumo: 'De onde vem o dinheiro',
        filhos: [
          { label: 'Impostos sobre consumo', desc: 'Os que mais pesam no Brasil, e que todo mundo paga na mesma proporção sobre o produto, ganhando pouco ou muito.' },
          { label: 'Impostos sobre renda', desc: 'Imposto de renda de pessoa física e jurídica. Tende a ser progressivo, cobrando mais de quem ganha mais.' },
          { label: 'Contribuições', desc: 'INSS e outras, com destinação específica definida em lei.' },
          { label: 'Carga tributária', desc: 'A soma de tudo dividida pelo PIB. É o indicador que mede quanto da economia passa pelo Estado.' },
        ],
      },
      {
        id: 'despesas',
        label: 'Despesas',
        cor: '#EF4444',
        resumo: 'Para onde ele vai',
        filhos: [
          {
            label: 'Obrigatórias',
            desc: 'Previdência, salários e benefícios definidos em lei. Não se corta de um ano para o outro.',
            netos: [
              { label: 'Por que travam', desc: 'Ocupam a maior parte do orçamento, o que deixa pouquíssimo espaço para ajuste no curto prazo.' },
            ],
          },
          { label: 'Discricionárias', desc: 'Investimento e custeio, a parte que o governo consegue mexer. É pequena, e por isso costuma ser a primeira a ser cortada.' },
          { label: 'Juros da dívida', desc: 'O que o governo paga por já dever. Cresce quando a Selic sobe, e concorre com todo o resto do orçamento.' },
        ],
      },
      {
        id: 'resultado',
        label: 'Resultado',
        cor: '#3B82F6',
        resumo: 'A conta fecha ou não',
        filhos: [
          { label: 'Primário', desc: 'Arrecadação menos despesas, sem contar juros. Mostra se a conta fecharia se o governo não devesse nada.' },
          { label: 'Nominal', desc: 'Inclui os juros da dívida. É o resultado de verdade, e o que determina se a dívida cresce ou cai.' },
          { label: 'Déficit x dívida', desc: 'Déficit é o rombo do ano; dívida é a soma acumulada de todos os rombos anteriores.' },
        ],
      },
      {
        id: 'divida',
        label: 'Dívida pública',
        cor: '#FFC93C',
        resumo: 'O número que o mercado observa',
        filhos: [
          { label: 'Dívida sobre PIB', desc: 'O tamanho da dívida comparado ao que o país produz. É a relação que o mercado acompanha, não o valor absoluto.' },
          { label: 'Rolagem', desc: 'O governo paga dívida velha emitindo dívida nova. Se o mercado desconfia, exige juro maior para aceitar comprar.' },
          {
            label: 'Prêmio de risco',
            desc: 'O juro extra exigido de quem parece arriscado. Sobe com incerteza fiscal e cai com credibilidade.',
            netos: [
              { label: 'Efeito cascata', desc: 'O juro do governo é o piso do país. Se ele sobe, sobe também o custo do crédito para empresas e famílias.' },
            ],
          },
        ],
      },
      {
        id: 'carteira',
        label: 'Efeito na sua carteira',
        cor: '#8B5CF6',
        resumo: 'Onde a política vira preço',
        filhos: [
          { label: 'Curva de juros', desc: 'Quando o risco fiscal sobe, o juro longo sobe primeiro, antes mesmo de qualquer decisão do Copom.' },
          { label: 'Prefixado e IPCA+ caem', desc: 'Juro subindo derruba o valor de mercado de quem já tinha o título comprado. É marcação a mercado.' },
          { label: 'Bolsa sofre', desc: 'Juro alto torna a renda fixa mais atraente e encarece o crédito das empresas, comprimindo lucro futuro.' },
          { label: 'A outra face', desc: 'Juro real alto significa ponto de entrada excelente para quem tem prazo e aguenta a oscilação do caminho.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Simulador Tesouro Direto',
    intro:
      'A forma mais concreta de sentir o efeito do risco fiscal é ver o que acontece com um título longo quando a taxa exigida pelo mercado sobe. O simulador permite comparar cenários de taxa.',
    passos: [
      'Abra Ferramentas → Simulador Tesouro Direto',
      'Escolha um Tesouro IPCA+ de vencimento longo',
      'Informe uma taxa real de 6% ao ano e anote o resultado',
      'Refaça com taxa real de 7% ao ano, simulando aumento do prêmio de risco',
      'Compare os dois valores presentes e observe o efeito no preço de hoje',
    ],
    exemploGuiado:
      'Exemplo: quando o mercado passa a exigir 1 ponto percentual a mais de juro real para financiar o governo, o preço de mercado de um título longo cai de forma relevante — quanto mais distante o vencimento, maior o impacto. Quem segura até o fim recebe a taxa contratada e ignora tudo isso. Quem precisa vender no meio, não.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a diferença entre resultado primário e nominal?', verso: 'O primário é arrecadação menos despesas sem contar juros. O nominal inclui os juros da dívida, e é o resultado que realmente determina se a dívida cresce.' },
    { id: 'fc2', frente: 'Déficit e dívida são a mesma coisa?', verso: 'Não. Déficit é o rombo de um único ano. Dívida é a soma acumulada de todos os déficits anteriores ao longo do tempo.' },
    { id: 'fc3', frente: 'Por que despesa obrigatória limita o ajuste fiscal?', verso: 'Porque previdência e pessoal são definidos em lei e ocupam a maior parte do orçamento. Sobra pouco espaço para cortar no curto prazo.' },
    { id: 'fc4', frente: 'O que é prêmio de risco?', verso: 'O juro extra que o mercado exige de um devedor que parece arriscado. No caso do governo, ele sobe com incerteza fiscal e puxa o juro de todo mundo junto.' },
    { id: 'fc5', frente: 'Por que a dívida é medida em relação ao PIB?', verso: 'Porque o que importa é a capacidade de pagar, não o valor absoluto. Uma dívida grande em uma economia grande pesa menos que uma dívida menor em uma economia pequena.' },
    { id: 'fc6', frente: 'Como o risco fiscal afeta quem tem Tesouro IPCA+?', verso: 'O mercado passa a exigir juro maior, o que derruba o preço de mercado dos títulos já emitidos. Só afeta quem precisa vender antes do vencimento.' },
  ],

  quiz: [
    {
      pergunta: 'O risco fiscal aumenta e o mercado passa a exigir juros maiores. O que acontece com seu Tesouro Prefixado já comprado?',
      alternativas: ['Passa a render mais', 'O preço de mercado cai, mas a taxa contratada é mantida se levar até o vencimento', 'É automaticamente resgatado', 'Não é afetado de forma alguma'],
      correta: 1,
      explicacao: 'É marcação a mercado. Seu título antigo paga menos que os novos e por isso vale menos hoje. Segurando até o vencimento, você recebe exatamente o contratado.',
    },
    {
      pergunta: 'O que mede o resultado primário?',
      alternativas: ['A dívida total do país', 'Arrecadação menos despesas, sem contar os juros da dívida', 'O crescimento do PIB', 'A inflação do período'],
      correta: 1,
      explicacao: 'O primário mostra se a conta do governo fecharia caso ele não tivesse dívida nenhuma. Incluindo os juros, chega-se ao resultado nominal.',
    },
    {
      pergunta: 'Por que o juro do governo influencia o juro que você paga no financiamento?',
      alternativas: ['Porque os bancos são obrigados a copiar a taxa', 'Porque o título público é considerado o menor risco: qualquer outro devedor precisa pagar mais que ele', 'Porque a CVM determina isso', 'Não há relação entre os dois'],
      correta: 1,
      explicacao: 'O título público funciona como piso de remuneração. Se emprestar ao governo já paga bem, emprestar a uma empresa ou pessoa precisa pagar ainda mais para compensar o risco maior.',
    },
    {
      pergunta: 'Qual é a maior parte do orçamento federal brasileiro?',
      alternativas: ['Investimento em infraestrutura', 'Despesas obrigatórias, como previdência e pessoal', 'Publicidade governamental', 'Despesas discricionárias'],
      correta: 1,
      explicacao: 'As despesas obrigatórias, definidas em lei, ocupam a maior fatia. É isso que torna qualquer ajuste fiscal lento e politicamente difícil.',
    },
  ],

  faq: [
    {
      pergunta: 'O governo não pode simplesmente imprimir dinheiro para pagar a dívida?',
      resposta: 'Pode, e o resultado histórico dessa escolha é inflação alta, que funciona como um imposto invisível sobre quem tem renda fixa e salário. O Brasil viveu isso e é uma das razões pelas quais o Banco Central tem autonomia hoje.',
    },
    {
      pergunta: 'Dívida pública alta é sempre ruim?',
      resposta: 'Depende do custo e da trajetória. Dívida alta com juro baixo e crescimento forte é administrável. Dívida alta com juro alto e economia parada tende a piorar sozinha, porque os juros crescem mais rápido que a capacidade de pagar.',
    },
    {
      pergunta: 'Isso afeta quem só investe em CDB?',
      resposta: 'Afeta, porque o CDB é remunerado a partir do CDI, que segue a Selic, que por sua vez responde à situação fiscal e inflacionária. O juro do governo é o piso que define o rendimento de praticamente toda a renda fixa do país.',
    },
  ],
}
