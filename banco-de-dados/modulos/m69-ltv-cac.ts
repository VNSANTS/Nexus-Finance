import { Modulo } from '@/types'

export const ltvCac: Modulo = {
  id: 'ltv-cac',
  trilhaId: 'geracao-de-receita',
  numero: 3,
  titulo: 'LTV/CAC: A Régua que Decide se Vale a Pena Crescer',
  subtitulo: 'O indicador mais usado no mundo para saber se um negócio está queimando dinheiro',
  iconName: 'Scale',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['fases-da-receita'],
  objetivoAprendizagem: 'Você vai sair sabendo calcular CAC e LTV do seu negócio e comparar com o benchmark de mercado de 3:1 para decidir se vale a pena acelerar o investimento em aquisição.',
  erroFatal: 'Investir pesado em aquisição de clientes administrando "de memória", por intuição, sem calcular CAC e LTV — é impossível saber se cada real gasto em marketing está voltando multiplicado ou sendo jogado fora sem esses dois números.',
  numeroChave: { valor: '3:1', legenda: 'o benchmark usado por investidores de tecnologia no mundo inteiro — para cada real gasto conquistando um cliente, ele deveria retornar pelo menos três reais em valor ao longo do relacionamento' },
  glossarioDoModulo: ['CAC', 'LTV', 'Margem Bruta', 'Churn'],
  proximoPasso: { moduloId: 'icp', motivo: 'Sabendo medir o retorno de cada cliente, o próximo passo é refinar para quem vender — nem todo cliente tem o mesmo LTV, e o ICP ensina a mirar nos melhores.' },

  aprender: {
    oQueE: 'CAC (Custo de Aquisição de Cliente) e LTV (Valor do Cliente ao Longo do Tempo, do inglês Lifetime Value) são os dois números que resolvem a pergunta mais básica de qualquer negócio: de onde vem o lucro, com prova numérica. A relação entre os dois, LTV dividido por CAC, é o indicador mais usado no mundo — por investidores de tecnologia e por donos de pequeno comércio — para decidir se um modelo de negócio é saudável ou está queimando dinheiro a cada cliente novo.',
    porQueImporta: 'Pergunte a qualquer empreendedor de onde vem o lucro do negócio: ele responde na hora, com confiança total. Agora peça para ele provar isso com dois números específicos e comparáveis — o silêncio que se segue costuma ser revelador. A maioria administra por intuição acumulada, e intuição, por mais valiosa que seja, não calcula se o marketing está funcionando de verdade.',
    naPratica: 'CAC é simples: quanto custou, em média, trazer cada cliente novo, somando toda a operação de marketing e vendas daquele período, dividido pelo número de clientes novos conquistados. LTV é mais sutil, porque depende de três variáveis: quanto o cliente médio gasta por mês, qual fatia disso é lucro de verdade (a margem bruta), e por quanto tempo, em média, ele permanece cliente antes de ir embora (o inverso da taxa de churn mensal).',
    passoAPasso: [
      'Some todo o gasto de marketing e vendas de um período (salários da equipe comercial, anúncios, ferramentas) e divida pelo número de clientes novos conquistados no mesmo período — esse é o CAC.',
      'Calcule a receita média mensal por cliente e multiplique pela margem bruta (não pela receita bruta) para achar o lucro médio mensal por cliente.',
      'Calcule a taxa de churn mensal (percentual de clientes que cancelam ou deixam de comprar por mês) e divida o lucro médio mensal por essa taxa — esse é o LTV.',
      'Divida o LTV pelo CAC. Compare o resultado com o benchmark de 3:1.',
      'Se a relação está abaixo de 2:1, revise o CAC antes de qualquer coisa — a aquisição está cara demais para o modelo se sustentar sozinho.',
      'Se está acima de 5:1, considere acelerar o investimento em aquisição — o sinal é que a empresa está deixando espaço na mesa.',
    ],
    errosComuns: [
      'Calcular o LTV usando a receita bruta por cliente, em vez da receita já multiplicada pela margem bruta — isso infla o LTV e distorce a relação.',
      'Esquecer de incluir salários da equipe comercial no CAC, contando só o gasto com anúncios.',
      'Comparar a relação LTV/CAC de negócios de setores muito diferentes sem ajustar para o ciclo de vendas e a margem típica de cada um.',
      'Tratar uma relação acima de 5:1 sempre como "ótimo", sem considerar que também pode ser sinal de investimento insuficiente em crescimento.',
    ],
    comparativo: {
      titulo: 'O que cada faixa de LTV/CAC indica',
      linhas: [
        { label: 'Abaixo de 2:1', valor: 'Aquisição cara demais | A empresa está, na prática, comprando clientes por um preço que a operação não aguenta pagar' },
        { label: 'Entre 2:1 e 3:1', valor: 'Zona de atenção | Sustentável, mas com pouca margem de erro' },
        { label: '3:1 (benchmark)', valor: 'Saudável | O ponto de referência usado mundialmente por investidores de tecnologia' },
        { label: 'Acima de 5:1', valor: 'Possível subinvestimento | A empresa provavelmente pode acelerar aquisição sem risco' },
      ],
    },
    checklist: [
      'Calculei o CAC somando todo o gasto de marketing e vendas do período, dividido pelos clientes novos.',
      'Calculei o LTV usando margem bruta, não receita bruta.',
      'Dividi LTV por CAC e comparei com o benchmark de 3:1.',
      'Se a relação está abaixo de 2:1, identifiquei se o problema é CAC alto ou LTV baixo.',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham defende que investir bem exige raciocínio quantitativo rigoroso, não intuição — a régua LTV/CAC aplica exatamente esse mesmo rigor à decisão de investir em adquirir um cliente novo.',
    },
    naoConfundirCom: [
      { moduloId: 'funil-de-conversao', diferenca: 'Este módulo mede se o retorno de cada cliente já conquistado compensa o custo; Funil de Conversão mede a eficiência do processo que transforma visitante em cliente, etapa por etapa.' },
    ],
  },

  mapaMental: {
    label: 'LTV/CAC',
    subtitulo: 'A régua que decide se vale a pena crescer',
    ramos: [
      {
        id: 'cac',
        label: 'CAC',
        cor: '#EF4444',
        resumo: 'Custo de Aquisição de Cliente',
        filhos: [
          { label: 'Gasto de marketing e vendas', desc: 'Soma tudo: anúncio, equipe comercial, ferramentas' },
          { label: 'Dividido pelos clientes novos', desc: 'Do mesmo período' },
        ],
      },
      {
        id: 'ltv',
        label: 'LTV',
        cor: '#22C55E',
        resumo: 'Valor do Cliente ao Longo do Tempo',
        filhos: [
          { label: 'Receita média × margem bruta', desc: 'O lucro real por cliente, não a receita bruta' },
          { label: 'Dividido pelo churn mensal', desc: 'Quanto menor o churn, maior o LTV' },
        ],
      },
      {
        id: 'benchmark',
        label: 'O Benchmark 3:1',
        cor: '#3B82F6',
        resumo: 'A referência de mercado',
        filhos: [
          { label: 'Abaixo de 2:1', desc: 'Aquisição cara demais' },
          { label: 'Acima de 5:1', desc: 'Possível espaço para investir mais' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de LTV/CAC',
    intro: 'Vamos calcular a relação LTV/CAC de uma empresa fictícia, passo a passo, com os números do exemplo do guia original.',
    passos: [
      'Calcular o CAC dividindo o gasto de marketing pelo número de clientes novos.',
      'Calcular o LTV combinando receita média, margem bruta e taxa de churn.',
      'Dividir LTV por CAC e comparar com o benchmark de 3:1.',
    ],
    exemploGuiado: 'Uma empresa gasta R$ 10.000 em marketing e vendas num mês e conquista 50 clientes novos: CAC = R$ 10.000 ÷ 50 = R$ 200 por cliente. Cada cliente gera em média R$ 100 por mês, com 70% de margem bruta, e permanece cliente por 20 meses em média (o que equivale a uma taxa de churn de 5% ao mês). LTV = (R$ 100 × 0,70) ÷ 0,05 = R$ 1.400. A relação LTV/CAC é 1.400 ÷ 200 = 7:1 — mais que o dobro do benchmark ideal de 3:1. Essa empresa provavelmente pode acelerar o investimento em aquisição sem risco, porque cada cliente novo já retorna bem mais do que custou para conquistar.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa CAC?', verso: 'Custo de Aquisição de Cliente — quanto custou, em média, trazer cada cliente novo para a empresa.' },
    { id: 'fc2', frente: 'O que significa LTV?', verso: 'Lifetime Value, o Valor do Cliente ao Longo do Tempo — quanto ele retorna em lucro durante todo o relacionamento.' },
    { id: 'fc3', frente: 'Qual é a fórmula do CAC?', verso: '(gasto total de marketing e vendas) ÷ (número de clientes novos conquistados).' },
    { id: 'fc4', frente: 'Qual é a fórmula do LTV?', verso: '(receita média por cliente × margem bruta) ÷ (taxa de churn mensal).' },
    { id: 'fc5', frente: 'Qual é o benchmark de mercado para a relação LTV/CAC?', verso: '3:1 — para cada real gasto conquistando um cliente, ele deveria retornar pelo menos três reais ao longo do relacionamento.' },
    { id: 'fc6', frente: 'O que uma relação LTV/CAC abaixo de 2:1 indica?', verso: 'Que a aquisição está cara demais para o modelo se sustentar sozinho — a empresa está comprando clientes por um preço que a operação não aguenta pagar.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa gasta R$ 20.000 em marketing e vendas e conquista 100 clientes novos no mês. Qual é o CAC?',
      alternativas: ['R$ 20', 'R$ 200', 'R$ 2.000', 'R$ 20.000'],
      correta: 1,
      explicacao: '20.000 ÷ 100 = R$ 200 por cliente novo.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Um cliente gera R$ 200 por mês, com 60% de margem bruta, e tem taxa de churn de 4% ao mês. Qual é o LTV aproximado?',
      alternativas: ['R$ 300', 'R$ 1.200', 'R$ 3.000', 'R$ 5.000'],
      correta: 2,
      explicacao: '(200 × 0,60) ÷ 0,04 = 120 ÷ 0,04 = R$ 3.000.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Se o CAC de uma empresa é R$ 400 e o LTV é R$ 800, a relação LTV/CAC é 2:1. O que isso indica, segundo o benchmark de mercado?',
      alternativas: [
        'Está acima do ideal, pode acelerar investimento sem cautela',
        'Está exatamente no benchmark ideal de mercado',
        'Está abaixo do benchmark saudável de 3:1 — zona de atenção',
        'É impossível avaliar sem saber o setor da empresa',
      ],
      correta: 2,
      explicacao: 'O benchmark saudável é 3:1. Uma relação de 2:1 está abaixo disso — a aquisição ainda é sustentável, mas com pouca margem de segurança.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que calcular o LTV com a receita bruta por cliente, em vez da receita multiplicada pela margem bruta, é um erro?',
      alternativas: [
        'Porque a receita bruta é sempre menor que a margem bruta',
        'Porque isso infla o LTV e distorce a relação LTV/CAC para parecer mais saudável do que realmente é',
        'Porque a receita bruta não pode ser medida mensalmente',
        'Porque o cálculo com receita bruta é ilegal em contabilidade',
      ],
      correta: 1,
      explicacao: 'A margem bruta é a fatia da receita que é lucro de verdade. Usar receita bruta em vez da margem infla artificialmente o LTV, fazendo o negócio parecer mais saudável do que é.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Meu negócio não tem taxa de churn clara (venda avulsa, não recorrente). Como calculo o LTV?',
      resposta: 'Para negócios sem recorrência formal, uma aproximação é usar o número médio de compras que um cliente faz ao longo do tempo em que continua comprando da marca (por exemplo, 5 compras em 2 anos), multiplicado pelo ticket médio e pela margem bruta.',
    },
    {
      pergunta: 'É melhor um LTV/CAC de 10:1 do que de 3:1?',
      resposta: 'Não necessariamente. Uma relação muito acima do benchmark pode ser ótima notícia (modelo eficiente) ou sinal de que a empresa está investindo pouco em crescimento e deixando espaço na mesa. Vale investigar se dá para crescer mais rápido mantendo a mesma eficiência.',
    },
  ],
}
