import type { Modulo } from '@/types'

export const moduloContabilidadeInvestidores: Modulo = {
  id: 'contabilidade-investidores',
  trilhaId: 'economia-mercado',
  numero: 4,
  titulo: 'Contabilidade para Investidores',
  subtitulo: 'Achar os números que importam em 5 minutos',
  iconName: 'FileSpreadsheet',
  duracaoMin: 16,

  aprender: {
    oQueE:
      'Contabilidade é a linguagem que as empresas usam para contar o que aconteceu com o dinheiro delas. Para o investidor, não é sobre saber fazer lançamento contábil: é sobre abrir um relatório trimestral e localizar rapidamente receita, lucro, dívida e caixa — e entender o que cada um desses números realmente diz.',
    porQueImporta:
      'Análise fundamentalista sem contabilidade é leitura de horóscopo. E o mais impressionante é que o dado é público, gratuito e está no site de relações com investidores de qualquer empresa listada. A vantagem não está em ter acesso à informação, está em saber lê-la.',
    naPratica:
      'São três demonstrações e cada uma responde uma pergunta. A DRE responde "deu lucro no período?". O balanço responde "o que a empresa tem e o que deve hoje?". A demonstração de fluxo de caixa responde "entrou dinheiro de verdade?" — e é a mais confiável das três, porque lucro depende de critério contábil e caixa é dinheiro que efetivamente circulou. Quando lucro sobe e caixa operacional cai, existe algo para investigar. Esse é o alerta mais clássico da análise de balanço.',
    passoAPasso: [
      'Baixe o release de resultados no site de RI da empresa',
      'Leia a DRE de cima para baixo: receita líquida, margens, lucro',
      'Ache a dívida líquida no balanço, subtraindo o caixa da dívida total',
      'Compare o lucro líquido com o caixa gerado pela operação na DFC',
      'Compare sempre com o mesmo trimestre do ano anterior, nunca com o trimestre imediatamente anterior',
    ],
    errosComuns: [
      'Olhar apenas o lucro e ignorar de onde ele veio',
      'Comparar trimestre com o trimestre anterior, ignorando sazonalidade',
      'Aceitar EBITDA ajustado sem ler quais ajustes foram feitos',
      'Confundir receita com lucro',
      'Ignorar as notas explicativas, onde estão as informações que mudam a análise',
    ],
    comparativo: {
      titulo: 'As três demonstrações',
      linhas: [
        { label: 'DRE', valor: 'Deu lucro? · atenção a resultado não recorrente' },
        { label: 'Balanço', valor: 'O que tem e o que deve · atenção a intangível inflado' },
        { label: 'Fluxo de caixa', valor: 'Entrou dinheiro? · a mais difícil de maquiar' },
      ],
    },
    checklist: [
      'Sei onde encontrar o release no site de RI',
      'Consigo localizar receita líquida e lucro líquido na DRE',
      'Sei calcular dívida líquida a partir do balanço',
      'Sei comparar lucro com caixa operacional',
      'Comparo sempre com o mesmo trimestre do ano anterior',
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Philip Fisher defende que ler os números de uma empresa a fundo — não só o preço da ação — é o que separa investimento de especulação; este módulo ensina exatamente onde encontrar e como interpretar esses números.',
    },
  },

  mapaMental: {
    label: 'Contabilidade para Investidores',
    subtitulo: 'Onde achar os números de uma empresa e o que eles realmente dizem',
    ramos: [
      {
        id: 'dre',
        label: 'DRE',
        cor: '#00D4FF',
        resumo: 'Deu lucro no período?',
        filhos: [
          { label: 'Receita líquida', desc: 'O que a empresa vendeu, já sem os impostos sobre venda. É a primeira linha e o ponto de partida.' },
          {
            label: 'Margem bruta',
            desc: 'O que sobra depois do custo de produzir o que foi vendido. Margem baixa deixa pouco espaço para erro.',
            netos: [
              { label: 'Como comparar', desc: 'Só faz sentido dentro do mesmo setor. Varejo e software vivem em mundos completamente diferentes.' },
            ],
          },
          {
            label: 'EBITDA',
            desc: 'Resultado operacional antes de juros, impostos e depreciação. Serve para comparar empresas, mas ignora que máquinas se desgastam.',
            netos: [
              { label: 'EBITDA ajustado', desc: 'Quando a empresa inventa ajustes para o número parecer melhor. Leia sempre quais foram.' },
            ],
          },
          { label: 'Lucro líquido', desc: 'O que sobra no fim. Cuidado com lucro que veio de venda de ativo, ganho fiscal ou reversão de provisão.' },
        ],
      },
      {
        id: 'balanco',
        label: 'Balanço',
        cor: '#3B82F6',
        resumo: 'O que tem e o que deve, hoje',
        filhos: [
          { label: 'Ativo', desc: 'O que a empresa tem: caixa, estoque, contas a receber, imóveis, máquinas e marcas.' },
          { label: 'Passivo', desc: 'O que ela deve: fornecedores, empréstimos, impostos e obrigações trabalhistas.' },
          { label: 'Patrimônio líquido', desc: 'Ativo menos passivo. É o que sobra para os sócios se tudo fosse liquidado hoje.' },
          {
            label: 'Dívida líquida',
            desc: 'Dívida total menos o caixa. É esse o número que importa, não a dívida bruta.',
            netos: [
              { label: 'Perfil da dívida', desc: 'Dívida de curto prazo em juro alto é bem mais perigosa que dívida longa em taxa fixa.' },
            ],
          },
        ],
      },
      {
        id: 'dfc',
        label: 'Fluxo de caixa',
        cor: '#22C55E',
        resumo: 'Lucro é opinião, caixa é fato',
        filhos: [
          { label: 'Operacional', desc: 'Dinheiro gerado pela atividade principal. É a mais importante das três seções.' },
          { label: 'Investimento', desc: 'Compra e venda de máquinas, fábricas e participações. Mostra se a empresa está investindo em si mesma.' },
          { label: 'Financiamento', desc: 'Empréstimos tomados e pagos, e dinheiro devolvido aos sócios via dividendo ou recompra.' },
          { label: 'Por que é a mais confiável', desc: 'Lucro depende de critério contábil. Caixa é dinheiro que entrou e saiu de verdade, muito mais difícil de maquiar.' },
        ],
      },
      {
        id: 'alertas',
        label: 'Sinais de alerta',
        cor: '#EF4444',
        resumo: 'O que investigar antes de comprar',
        filhos: [
          { label: 'Lucro sem caixa', desc: 'Lucro subindo e caixa operacional caindo é o alerta mais clássico da análise de balanço.' },
          { label: 'Estoque crescendo mais que a venda', desc: 'O produto não está saindo. Costuma anteceder desconto forçado e queda de margem.' },
          { label: 'Recebíveis inchando', desc: 'A empresa vendeu, mas não recebeu. Pode indicar venda forçada com prazo longo ou risco de calote.' },
          { label: 'Troca frequente de auditoria', desc: 'Mudança recorrente de auditor ou de diretor financeiro merece atenção redobrada.' },
        ],
      },
      {
        id: 'onde',
        label: 'Onde encontrar',
        cor: '#FFC93C',
        resumo: 'Tudo público e gratuito',
        filhos: [
          { label: 'Site de RI', desc: 'Relações com Investidores. Todo release e balanço, de graça, direto da fonte, sem intermediário.' },
          { label: 'Release trimestral', desc: 'Versão resumida e comentada do balanço. É por onde começar.' },
          { label: 'Notas explicativas', desc: 'Chatas e onde estão as informações que efetivamente mudam a análise.' },
          { label: 'Comparação correta', desc: 'Mesmo trimestre do ano anterior, para eliminar sazonalidade. Comparar com o trimestre anterior distorce.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Valuation Rápido',
    intro:
      'Depois de localizar lucro, dívida e caixa, o passo seguinte é transformar esses números em uma estimativa de valor. A calculadora de valuation usa exatamente os dados que você acabou de aprender a encontrar.',
    passos: [
      'Abra Ferramentas → Valuation Rápido',
      'Informe o lucro líquido anual que você localizou na DRE',
      'Informe uma expectativa de crescimento conservadora',
      'Informe a taxa de desconto que você exige para correr esse risco',
      'Compare a faixa de preço justo com o preço atual da ação',
    ],
    exemploGuiado:
      'Exemplo: uma empresa com lucro anual de R$ 1 bilhão e 500 milhões de ações tem lucro por ação de R$ 2. Se ela negocia a R$ 24, o P/L é 12 — ou seja, ao preço de hoje seriam necessários doze anos de lucro atual para pagar o valor da empresa. Se o lucro do último ano incluiu a venda de uma fábrica, esse P/L é ficção, e é exatamente por isso que a leitura da DRE vem antes da conta.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual pergunta cada demonstração responde?', verso: 'DRE: deu lucro no período? Balanço: o que a empresa tem e deve hoje? Fluxo de caixa: entrou dinheiro de verdade?' },
    { id: 'fc2', frente: 'Por que o fluxo de caixa é mais confiável que o lucro?', verso: 'Porque lucro depende de critérios contábeis e de estimativas, enquanto caixa é dinheiro que efetivamente entrou e saiu. É muito mais difícil de maquiar.' },
    { id: 'fc3', frente: 'O que é dívida líquida?', verso: 'Dívida total menos o caixa disponível. É o endividamento real da empresa, e o número relevante para a análise.' },
    { id: 'fc4', frente: 'Qual o alerta mais clássico na leitura de balanço?', verso: 'Lucro subindo enquanto o caixa gerado pela operação cai. Indica que o lucro pode não ser dinheiro de verdade.' },
    { id: 'fc5', frente: 'Por que não comparar um trimestre com o trimestre anterior?', verso: 'Por causa da sazonalidade. Varejo no quarto trimestre é sempre mais forte que no terceiro. A comparação correta é com o mesmo trimestre do ano anterior.' },
    { id: 'fc6', frente: 'O que é EBITDA e qual sua limitação?', verso: 'Resultado operacional antes de juros, impostos e depreciação. Serve para comparar operações, mas ignora que os ativos se desgastam e precisam ser repostos.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa reporta lucro recorde, mas o caixa gerado pela operação caiu 40%. O que investigar?',
      alternativas: ['Nada, lucro recorde é sempre bom', 'De onde veio o lucro: pode ter vindo de venda de ativo, ganho fiscal ou vendas ainda não recebidas', 'Se a empresa vai pagar mais dividendos', 'Se o setor está em alta'],
      correta: 1,
      explicacao: 'É o sinal clássico de lucro que não virou dinheiro. Pode indicar receita não recorrente ou vendas a prazo que ainda não foram recebidas.',
    },
    {
      pergunta: 'Onde encontrar gratuitamente o balanço de uma empresa listada na B3?',
      alternativas: ['Só pagando uma casa de análise', 'No site de Relações com Investidores da própria empresa', 'Apenas na corretora', 'Não é informação pública'],
      correta: 1,
      explicacao: 'Empresas listadas são obrigadas a divulgar demonstrações publicamente. O site de RI traz tudo de graça, direto da fonte e sem interpretação de terceiros.',
    },
    {
      pergunta: 'O que é dívida líquida?',
      alternativas: ['Toda a dívida da empresa', 'A dívida total menos o caixa disponível', 'Apenas a dívida de curto prazo', 'A dívida com fornecedores'],
      correta: 1,
      explicacao: 'Uma empresa que deve R$ 10 bilhões mas tem R$ 8 bilhões em caixa está em situação muito diferente de outra que deve os mesmos R$ 10 bilhões sem caixa nenhum.',
    },
    {
      pergunta: 'Estoque crescendo bem mais rápido que a receita costuma indicar o quê?',
      alternativas: ['Que a empresa está se preparando para crescer', 'Que o produto não está saindo, o que costuma anteceder desconto e queda de margem', 'Que a empresa comprou barato', 'Que o lucro vai subir'],
      correta: 1,
      explicacao: 'Estoque acumulando enquanto a venda não acompanha sinaliza demanda mais fraca que o previsto, e normalmente termina em liquidação com margem menor.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso saber contabilidade para investir em ações?',
      resposta: 'Para comprar ETF de índice, não. Para escolher empresas individualmente, sim — pelo menos o suficiente para localizar receita, lucro, dívida e caixa. Sem isso, a decisão vira confiança na opinião de terceiros.',
    },
    {
      pergunta: 'Quanto tempo leva para ler um release?',
      resposta: 'Com prática, cinco a dez minutos para os números principais. O release já vem resumido e comentado pela própria empresa. A leitura completa das notas explicativas é para quando algo chamar atenção.',
    },
    {
      pergunta: 'Empresa pode manipular os números?',
      resposta: 'Existem escolhas contábeis legítimas que deixam o resultado mais favorável, e existem casos de fraude. Por isso o fluxo de caixa importa tanto: é a demonstração mais difícil de distorcer, e divergências entre lucro e caixa são o principal sinal de alerta.',
    },
  ],
}
