import { Modulo } from '@/types'

export const dre: Modulo = {
  id: 'dre',
  trilhaId: 'gestao-financeira-negocios',
  numero: 3,
  titulo: 'DRE: O Demonstrativo que Conta a Verdade',
  subtitulo: 'Da receita bruta ao lucro líquido, cada linha tira uma fatia',
  iconName: 'FileBarChart',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['custo-vs-investimento'],
  objetivoAprendizagem: 'Você vai sair sabendo ler um DRE simplificado, entendendo cada camada de margem entre a receita bruta e o lucro líquido final.',
  erroFatal: 'Olhar só para a receita bruta de um negócio como sinal de saúde financeira — uma empresa pode ter receita bruta enorme e lucro líquido praticamente nulo, ou até negativo, dependendo do que acontece em cada linha do DRE entre um número e outro.',
  numeroChave: { valor: '5 camadas', legenda: 'entre a receita bruta e o lucro líquido, um DRE típico passa por cinco camadas de dedução — impostos e devoluções, custo direto, despesas operacionais, despesas financeiras e impostos sobre o lucro' },
  glossarioDoModulo: ['DRE', 'Receita bruta', 'Receita líquida', 'Margem bruta', 'EBITDA', 'Lucro líquido'],
  proximoPasso: { moduloId: 'orcamento-base-zero', motivo: 'Depois de entender de onde vem o resultado, o próximo módulo ensina como planejar os gastos futuros do zero, em vez de copiar o histórico.' },

  aprender: {
    oQueE: 'DRE, sigla para Demonstrativo de Resultado do Exercício, é o relatório financeiro que mostra, em camadas sucessivas, como a receita bruta de uma empresa se transforma em lucro líquido, descontando cada tipo de custo e despesa no caminho. Cada linha do DRE representa uma dedução específica — impostos sobre venda, custo direto do produto ou serviço, despesas administrativas e comerciais, despesas financeiras, impostos sobre o lucro — até chegar ao número final que realmente sobra para os sócios.',
    porQueImporta: 'Olhar só para a receita bruta ("vendemos R$ 500 mil esse mês!") sem descer pelas camadas do DRE é como avaliar a saúde de alguém só pela altura — é um dado real, mas isolado, insuficiente para qualquer conclusão útil. Duas empresas podem ter a mesma receita bruta e resultados finais completamente diferentes, dependendo de quanto cada uma retém em cada camada de dedução.',
    naPratica: 'A Receita Bruta é o total vendido, sem nenhuma dedução. Subtraindo impostos sobre venda e devoluções, chega-se à Receita Líquida. Subtraindo o Custo dos Produtos ou Serviços Vendidos (CPV ou CSV — o custo direto de produzir o que foi vendido), chega-se ao Lucro Bruto, e a Margem Bruta é esse valor dividido pela receita líquida. Subtraindo as despesas operacionais (administrativas, comerciais, marketing), chega-se ao EBITDA, um indicador de lucro operacional antes de juros, impostos, depreciação e amortização. Subtraindo despesas financeiras (juros de dívidas, por exemplo) e impostos sobre o lucro, chega-se, finalmente, ao Lucro Líquido — o que de fato sobra para os sócios.',
    passoAPasso: [
      'Comece pela Receita Bruta: o total vendido no período, sem nenhuma dedução.',
      'Subtraia impostos sobre venda e devoluções para chegar à Receita Líquida.',
      'Subtraia o custo direto do produto ou serviço vendido para chegar ao Lucro Bruto, e calcule a Margem Bruta dividindo pelo total da receita líquida.',
      'Subtraia as despesas operacionais (administrativas, comerciais, marketing) para chegar ao EBITDA.',
      'Subtraia despesas financeiras e impostos sobre o lucro para chegar ao Lucro Líquido final.',
    ],
    errosComuns: [
      'Confundir receita bruta com lucro, tratando o número de vendas como se já fosse o resultado final para os sócios.',
      'Ignorar a diferença entre EBITDA e Lucro Líquido — o EBITDA ainda não descontou juros de dívidas nem impostos sobre o lucro, que podem ser significativos.',
      'Não separar claramente custo direto (do produto ou serviço em si) de despesa operacional (da estrutura administrativa e comercial em geral).',
      'Analisar um único mês isoladamente sem considerar sazonalidade ou eventos pontuais que distorcem a leitura do DRE daquele período.',
    ],
    comparativo: {
      titulo: 'As camadas do DRE, do bruto ao líquido',
      linhas: [
        { label: 'Receita Bruta', valor: 'Total vendido, sem nenhuma dedução' },
        { label: 'Receita Líquida', valor: 'Receita bruta menos impostos sobre venda e devoluções' },
        { label: 'Lucro Bruto', valor: 'Receita líquida menos custo direto do produto ou serviço (CPV/CSV)' },
        { label: 'EBITDA', valor: 'Lucro bruto menos despesas operacionais (administrativas, comerciais)' },
        { label: 'Lucro Líquido', valor: 'EBITDA menos despesas financeiras e impostos sobre o lucro' },
      ],
    },
    checklist: [
      'Sei diferenciar receita bruta de lucro líquido, e por que a diferença importa.',
      'Consigo identificar, num DRE simplificado, cada uma das cinco camadas de dedução.',
      'Sei calcular a Margem Bruta dividindo o lucro bruto pela receita líquida.',
      'Entendo que EBITDA ainda não descontou juros nem impostos sobre o lucro.',
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Fisher defende olhar além do número superficial de vendas para entender a real capacidade de geração de lucro de uma empresa — o DRE é exatamente a ferramenta que revela essa capacidade real, camada por camada.',
    },
  },

  mapaMental: {
    label: 'DRE',
    subtitulo: 'Da receita bruta ao lucro líquido',
    ramos: [
      {
        id: 'receita',
        label: 'Receita',
        cor: '#3B82F6',
        resumo: 'O ponto de partida',
        filhos: [
          { label: 'Receita Bruta', desc: 'Total vendido, sem dedução' },
          { label: 'Receita Líquida', desc: 'Após impostos sobre venda e devoluções' },
        ],
      },
      {
        id: 'margens',
        label: 'As Margens',
        cor: '#22C55E',
        resumo: 'Camadas de dedução',
        filhos: [
          { label: 'Lucro Bruto', desc: 'Após custo direto do produto/serviço' },
          { label: 'EBITDA', desc: 'Após despesas operacionais' },
        ],
      },
      {
        id: 'resultado-final',
        label: 'Resultado Final',
        cor: '#8B5CF6',
        resumo: 'O que realmente sobra',
        filhos: [
          { label: 'Lucro Líquido', desc: 'Após despesas financeiras e impostos sobre lucro' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de DRE Simplificado',
    intro: 'Vamos construir o DRE de uma empresa fictícia, camada por camada.',
    passos: [
      'Partir da receita bruta.',
      'Deduzir impostos sobre venda para achar a receita líquida.',
      'Deduzir custo direto para achar o lucro bruto.',
      'Deduzir despesas operacionais para achar o EBITDA.',
      'Deduzir despesas financeiras e impostos para achar o lucro líquido.',
    ],
    exemploGuiado: 'Uma empresa de serviços tem Receita Bruta de R$ 100.000 no mês. Impostos sobre venda somam R$ 8.000: Receita Líquida = R$ 92.000. O custo direto de prestar o serviço (mão de obra direta, materiais) é R$ 30.000: Lucro Bruto = R$ 62.000, com Margem Bruta de 62.000 ÷ 92.000 ≈ 67%. As despesas operacionais (administrativo, comercial, marketing) somam R$ 35.000: EBITDA = R$ 27.000. As despesas financeiras (juros de um empréstimo) são R$ 5.000, e os impostos sobre o lucro somam R$ 4.000: Lucro Líquido = R$ 18.000. De R$ 100.000 de receita bruta, apenas R$ 18.000 (18%) chega como lucro líquido de fato aos sócios — um exemplo real de como cada camada consome uma fatia significativa.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa DRE?', verso: 'Demonstrativo de Resultado do Exercício — o relatório que mostra, em camadas, como a receita bruta se transforma em lucro líquido.' },
    { id: 'fc2', frente: 'Qual é a diferença entre Lucro Bruto e EBITDA?', verso: 'Lucro Bruto é a receita líquida menos o custo direto do produto/serviço; EBITDA é o Lucro Bruto menos as despesas operacionais (administrativas, comerciais).' },
    { id: 'fc3', frente: 'O que ainda falta descontar do EBITDA para chegar ao Lucro Líquido?', verso: 'Despesas financeiras (como juros de dívidas) e impostos sobre o lucro.' },
    { id: 'fc4', frente: 'Por que olhar só a receita bruta de uma empresa é insuficiente para avaliar sua saúde financeira?', verso: 'Porque duas empresas com a mesma receita bruta podem ter lucro líquido completamente diferente, dependendo de quanto cada uma retém em cada camada de dedução do DRE.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa tem Receita Líquida de R$ 80.000 e Custo do Produto Vendido de R$ 30.000. Qual é o Lucro Bruto?',
      alternativas: ['R$ 30.000', 'R$ 50.000', 'R$ 80.000', 'R$ 110.000'],
      correta: 1,
      explicacao: '80.000 − 30.000 = R$ 50.000 de Lucro Bruto.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que o EBITDA não é o mesmo que o Lucro Líquido final?',
      alternativas: [
        'Porque EBITDA já inclui todos os impostos',
        'Porque EBITDA ainda não descontou despesas financeiras (como juros) nem impostos sobre o lucro',
        'Porque EBITDA é sempre maior que a Receita Bruta',
        'Não há diferença real entre os dois termos',
      ],
      correta: 1,
      explicacao: 'O EBITDA é uma medida de lucro operacional antes de juros, impostos, depreciação e amortização — ainda faltam duas camadas de dedução até chegar ao Lucro Líquido de fato.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Uma empresa tem Receita Bruta de R$ 200.000 e Lucro Líquido de apenas R$ 10.000. O que isso pode indicar?',
      alternativas: [
        'A empresa está necessariamente falindo',
        'As camadas de custo, despesa e impostos entre a receita bruta e o lucro líquido estão consumindo a maior parte do resultado, mesmo com boa venda',
        'É impossível ter lucro líquido tão menor que a receita bruta',
        'A empresa não pagou nenhum imposto naquele período',
      ],
      correta: 1,
      explicacao: 'Uma margem líquida de apenas 5% (10.000 ÷ 200.000) mostra que, apesar da receita robusta, as deduções ao longo do DRE consomem a grande maioria do resultado — um sinal importante para investigar onde estão os maiores custos ou despesas.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Toda empresa é obrigada a ter um DRE formal?',
      resposta: 'Empresas de certos portes e regimes tributários têm obrigação contábil de manter DRE formal. Mas mesmo negócios pequenos e informais se beneficiam de montar uma versão simplificada, só para entender de onde vem e para onde vai o resultado.',
    },
    {
      pergunta: 'Com que frequência devo analisar o DRE do meu negócio?',
      resposta: 'Mensalmente é um bom ritmo para a maioria dos negócios — permite identificar tendências e problemas antes que se acumulem por muitos meses sem serem notados.',
    },
  ],
}
