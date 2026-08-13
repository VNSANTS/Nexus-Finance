import type { Modulo } from '@/types'

export const moduloAnaliseTecnica: Modulo = {
  id: 'analise-tecnica',
  trilhaId: 'acoes-bolsa',
  numero: 7,
  titulo: 'Análise Técnica',
  subtitulo: 'Estudar o gráfico e o comportamento do preço, com consciência dos limites',
  iconName: 'CandlestickChart',
  duracaoMin: 16,

  aprender: {
    oQueE:
      'Análise técnica estuda o comportamento do preço e do volume ao longo do tempo, buscando regiões em que compradores ou vendedores costumam aparecer. Ela não olha o balanço da empresa nem o produto que ela vende. Trabalha com a premissa de que padrões de comportamento coletivo se repetem, ao menos parcialmente.',
    porQueImporta:
      'Vale conhecer por dois motivos. O primeiro é prático: ler um gráfico ajuda a entender o que as pessoas estão dizendo quando falam de suporte, resistência e tendência, e o stop loss é uma ferramenta legítima de controle de perda. O segundo é defensivo: boa parte do conteúdo financeiro que circula usa esse vocabulário para vender método milagroso, e reconhecer o que a técnica de fato entrega protege você de comprar promessa.',
    naPratica:
      'A honestidade sobre os limites faz parte do conteúdo. Padrão gráfico descreve probabilidade sobre comportamento passado, e falha com frequência. A pesquisa acadêmica sobre operação de curto prazo por pessoa física no Brasil é dura: estudos conduzidos por universidades brasileiras acompanharam operadores individuais no mercado futuro e encontraram uma proporção muito pequena de pessoas obtendo ganho consistente ao longo de centenas de pregões. O uso mais defensável da análise técnica não é prever para onde o preço vai, e sim definir de antemão até onde você aceita perder.',
    passoAPasso: [
      'Aprenda a ler um candle: abertura, fechamento, máxima e mínima do período',
      'Identifique a tendência olhando a sequência de topos e de fundos',
      'Marque as regiões de suporte e de resistência que se repetiram no histórico',
      'Confirme o movimento com volume antes de dar qualquer peso a ele',
      'Defina o stop antes de entrar, junto com o tamanho da posição',
    ],
    errosComuns: [
      'Tratar padrão gráfico como previsão em vez de probabilidade',
      'Operar alavancado sem nenhuma regra de controle de perda',
      'Procurar padrão até encontrar, que é viés de confirmação puro',
      'Ignorar custo de corretagem e imposto em uma estratégia de giro alto',
      'Confundir análise técnica com obrigação de fazer day trade',
    ],
    comparativo: {
      titulo: 'Tipos de gráfico e horizontes de operação',
      linhas: [
        { label: 'Gráfico de linha', valor: 'Liga só os fechamentos · mostra a direção geral e esconde o que aconteceu dentro do período' },
        { label: 'Gráfico de barras', valor: 'Mostra abertura, fechamento, máxima e mínima · mais informação, leitura menos intuitiva' },
        { label: 'Candlestick', valor: 'Mesma informação da barra em formato visual · corpo e sombra revelam a disputa dentro do período' },
        { label: 'Day trade', valor: 'Abre e fecha no mesmo dia · custo e imposto altos · evidência de resultado consistente é muito desfavorável' },
        { label: 'Swing trade', valor: 'Posição de dias a semanas · menos custo que o day trade · ainda exige critério de saída definido' },
        { label: 'Position e longo prazo', valor: 'Meses a anos · a técnica entra no máximo para escolher o momento da execução' },
      ],
    },
    checklist: [
      'Sei ler os quatro preços que um candle representa',
      'Consigo identificar se um ativo está em tendência de alta, de baixa ou lateral',
      'Sei o que suporte e resistência significam e por que rompimento falha muito',
      'Entendo que padrão gráfico é probabilidade sobre o passado, não previsão',
      'Se eu operar no curto prazo, defino o stop e o tamanho da posição antes de entrar',
    ],
    livroRelacionado: {
      livroId: 'random-walk-wall-street',
      textoConexao: 'Malkiel é uma das críticas mais conhecidas à análise técnica, argumentando que padrões gráficos raramente têm poder preditivo real — uma leitura útil para calibrar expectativas antes de usar este módulo na prática.',
    },
  },

  mapaMental: {
    label: 'Análise Técnica',
    subtitulo: 'Estudar o gráfico e o comportamento do preço, com consciência dos limites',
    ramos: [
      {
        id: 'candle',
        label: 'O candle',
        cor: '#00D4FF',
        resumo: 'A unidade básica do gráfico',
        filhos: [
          {
            label: 'Quatro preços',
            desc: 'Cada candle registra abertura, fechamento, máxima e mínima do período escolhido, seja ele um minuto ou um mês.',
            netos: [
              { label: 'O período importa', desc: 'O mesmo ativo conta histórias diferentes em gráfico de cinco minutos e em gráfico semanal. Escolher o período já é uma decisão.' },
            ],
          },
          { label: 'Corpo e sombra', desc: 'O corpo é a distância entre abertura e fechamento. A sombra mostra até onde o preço foi e de onde voltou dentro do período.' },
          { label: 'Cor', desc: 'Verde quando fechou acima da abertura, vermelho quando fechou abaixo. É só uma convenção visual, sem significado adicional.' },
          { label: 'O que o candle não diz', desc: 'Nada sobre o negócio da empresa, sobre dívida, sobre lucro ou sobre quem controla a companhia.' },
        ],
      },
      {
        id: 'tendencia',
        label: 'Tendência',
        cor: '#3B82F6',
        resumo: 'A direção predominante',
        filhos: [
          { label: 'Alta', desc: 'Sequência de topos e fundos cada vez mais altos. Enquanto essa sequência se mantém, a leitura é de tendência de alta.' },
          { label: 'Baixa', desc: 'Topos e fundos cada vez mais baixos. A quebra dessa sequência é o que sinaliza possível mudança.' },
          {
            label: 'Lateral',
            desc: 'Preço andando de lado, sem direção definida. É o estado mais comum dos ativos e o mais ignorado pelos cursos.',
            netos: [
              { label: 'Por que é ignorado', desc: 'Não rende conteúdo empolgante e não gera sinal de operação. Justamente por isso é onde mais gente força uma leitura que não existe.' },
            ],
          },
          { label: 'Tendência não é garantia', desc: 'Ela descreve o que aconteceu até agora. A reversão só é visível depois que já aconteceu.' },
        ],
      },
      {
        id: 'suporte-resistencia',
        label: 'Suporte e resistência',
        cor: '#FFC93C',
        resumo: 'Regiões, não linhas exatas',
        filhos: [
          { label: 'Suporte', desc: 'Região em que a queda costuma parar porque compradores voltam a aparecer naquele patamar de preço.' },
          { label: 'Resistência', desc: 'Região em que a alta costuma travar porque vendedores aparecem, muitas vezes gente que comprou mais caro e quer sair no zero a zero.' },
          {
            label: 'Rompimento',
            desc: 'Quando o preço atravessa a região marcada. Pode indicar continuidade e frequentemente é falso.',
            netos: [
              { label: 'O falso rompimento', desc: 'O preço passa, aciona ordens automáticas e volta. É um dos motivos pelos quais operar rompimento sem stop machuca tanto.' },
            ],
          },
          { label: 'Região, não número', desc: 'Tratar suporte como um preço exato produz falsa precisão. São faixas em que o comportamento se repetiu, com margem.' },
        ],
      },
      {
        id: 'indicadores',
        label: 'Indicadores',
        cor: '#8B5CF6',
        resumo: 'Derivados do próprio preço',
        filhos: [
          { label: 'Média móvel', desc: 'O preço médio dos últimos períodos. Suaviza o ruído e mostra direção, sempre com atraso em relação ao movimento real.' },
          { label: 'Volume', desc: 'Quantidade negociada. Movimento acompanhado de volume alto tem mais peso do que movimento em mercado parado.' },
          { label: 'IFR', desc: 'Mede se o ativo subiu ou caiu rápido demais no curto prazo. Sinaliza esticamento, e esticado pode continuar esticando por muito tempo.' },
          {
            label: 'MACD',
            desc: 'Compara duas médias para sinalizar mudança de força no movimento.',
            netos: [
              { label: 'O limite comum a todos', desc: 'Todo indicador é calculado a partir do preço passado. Nenhum deles acrescenta informação nova sobre o futuro.' },
            ],
          },
        ],
      },
      {
        id: 'riscos',
        label: 'Riscos e honestidade',
        cor: '#EF4444',
        resumo: 'A parte que os cursos omitem',
        filhos: [
          {
            label: 'Não é previsão',
            desc: 'Padrão gráfico descreve probabilidade sobre comportamento passado, e falha com frequência alta.',
            netos: [
              { label: 'O que a evidência mostra', desc: 'Pesquisas brasileiras acompanharam operadores individuais de curto prazo por centenas de pregões e encontraram uma proporção muito pequena com ganho consistente.' },
            ],
          },
          { label: 'Viés de confirmação', desc: 'Se você procurar um padrão até encontrar, você sempre encontra. O gráfico tem pontos suficientes para sustentar qualquer história.' },
          { label: 'Custo do giro', desc: 'Operar muito significa pagar corretagem, emolumentos e imposto o tempo todo. O resultado precisa vencer esse custo antes de existir.' },
          {
            label: 'Alavancagem',
            desc: 'Operar com valor maior do que se tem é o mecanismo pelo qual prejuízo vira dívida.',
            netos: [
              { label: 'Por que é o erro fatal', desc: 'Sem alavancagem o pior caso é perder o que você colocou. Com ela, o pior caso não tem esse limite.' },
            ],
          },
          { label: 'Stop loss', desc: 'O uso mais defensável da análise técnica: limitar a perda de uma operação, dentro de um plano definido antes de entrar.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'Antes de avaliar se uma estratégia de giro alto funciona, vale medir o obstáculo que ela precisa vencer. Corretagem, emolumentos e imposto sobre cada ganho realizado formam um custo que incide muitas vezes por ano.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Informe o aporte mensal e um prazo de 10 anos',
      'Rode a primeira simulação com a rentabilidade cheia que você esperaria do ativo',
      'Estime o custo anual de uma estratégia com muitas operações por mês, somando taxas e imposto',
      'Rode de novo descontando esse custo e compare com o resultado de manter a posição',
    ],
    exemploGuiado:
      'Exemplo: uma estratégia de giro alto precisa superar o custo de execução antes de gerar qualquer ganho para quem opera. Cada operação paga corretagem e emolumentos, e cada ganho realizado paga imposto na hora, em vez de deixar esse valor rendendo. Ao projetar dez anos com e sem esse vazamento, aparece a régua que a estratégia precisa vencer todo ano só para empatar com quem comprou e ficou parado. Esse cálculo não diz que a análise técnica não funciona. Diz qual é o tamanho da barra que ela precisa ultrapassar, e é uma barra alta.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais quatro preços um candle representa?', verso: 'Abertura, fechamento, máxima e mínima do período escolhido. O corpo é a distância entre abertura e fechamento, e a sombra mostra até onde o preço foi e voltou.' },
    { id: 'fc2', frente: 'Como se identifica uma tendência de alta?', verso: 'Pela sequência de topos e fundos cada vez mais altos. Enquanto a sequência se mantém, a leitura é de alta. A reversão só fica visível depois que já ocorreu.' },
    { id: 'fc3', frente: 'O que são suporte e resistência?', verso: 'Regiões em que a queda costuma parar ou a alta costuma travar, porque compradores ou vendedores voltam a aparecer ali. São faixas, e não preços exatos.' },
    { id: 'fc4', frente: 'Por que rompimento merece desconfiança?', verso: 'Porque o falso rompimento é comum: o preço atravessa a região, aciona ordens automáticas e volta. Operar rompimento sem critério de saída definido custa caro.' },
    { id: 'fc5', frente: 'Qual é o limite comum a todos os indicadores técnicos?', verso: 'Todos são calculados a partir do preço passado. Eles organizam informação que já existe e não acrescentam nenhuma informação nova sobre o futuro.' },
    { id: 'fc6', frente: 'Por que a alavancagem é o risco mais grave aqui?', verso: 'Porque sem ela o pior caso é perder o que você colocou. Com ela, a perda pode ultrapassar o capital investido e virar dívida.' },
  ],

  quiz: [
    {
      pergunta: 'O que um padrão gráfico realmente representa?',
      alternativas: ['Uma previsão do preço futuro', 'Uma probabilidade baseada em comportamento passado, que falha com frequência', 'Uma garantia de reversão', 'Uma informação sobre o balanço da empresa'],
      correta: 1,
      explicacao: 'Padrões descrevem o que costumou acontecer em situações parecidas no passado. Tratar isso como previsão é a origem da maior parte dos prejuízos de quem começa pelo gráfico.',
    },
    {
      pergunta: 'Qual é o uso mais defensável da análise técnica?',
      alternativas: ['Prever o topo e o fundo do mercado', 'Definir de antemão até onde você aceita perder em uma operação', 'Escolher qual empresa tem melhor negócio', 'Calcular o preço justo de uma ação'],
      correta: 1,
      explicacao: 'O stop loss é gestão de risco, não previsão. As demais alternativas pedem informação que o gráfico não contém, seja sobre o negócio, seja sobre o futuro.',
    },
    {
      pergunta: 'Qual é o estado mais comum de um ativo no gráfico?',
      alternativas: ['Tendência de alta', 'Tendência de baixa', 'Lateral, andando de lado sem direção definida', 'Rompimento constante'],
      correta: 2,
      explicacao: 'A maior parte do tempo o preço anda de lado. É o cenário que menos gera sinal e por isso o que mais leva gente a forçar uma leitura que o gráfico não sustenta.',
    },
    {
      pergunta: 'Por que o custo importa tanto em estratégias de giro alto?',
      alternativas: ['Porque a corretora cobra mais de quem opera pouco', 'Porque taxas e imposto incidem a cada operação e o resultado precisa vencer esse custo antes de existir', 'Porque o imposto é maior no longo prazo', 'Porque o gráfico fica menos preciso'],
      correta: 1,
      explicacao: 'Cada operação paga taxas, e cada ganho realizado paga imposto naquele momento em vez de continuar rendendo. Esse vazamento é a barra que a estratégia precisa superar todo ano.',
    },
  ],

  faq: [
    {
      pergunta: 'Dá para viver de day trade?',
      resposta: 'A evidência disponível é bastante desfavorável. Pesquisas conduzidas por universidades brasileiras acompanharam operadores individuais no mercado futuro ao longo de centenas de pregões e encontraram uma proporção muito pequena de pessoas com ganho consistente, com a grande maioria terminando no prejuízo. Isso não prova que seja impossível, e mostra que a probabilidade é baixa o suficiente para que quem apresenta a atividade como caminho de renda esteja, na melhor das hipóteses, omitindo a parte mais importante do dado. Vale conferir os estudos na fonte.',
    },
    {
      pergunta: 'Análise técnica e fundamentalista são inimigas?',
      resposta: 'A briga entre as duas escolas é mais ideológica do que útil. Elas respondem perguntas diferentes: a fundamentalista responde o que comprar e por quê, a técnica responde quando executar e até onde aceitar perder. Muita gente que investe pensando em anos usa o gráfico apenas para escolher o momento de uma compra que já estava decidida por outro motivo. O problema aparece quando o gráfico vira o único critério e a pessoa passa a comprar empresas que nunca estudou.',
    },
    {
      pergunta: 'Comprei um curso que promete um método com alta taxa de acerto. Como avaliar?',
      resposta: 'Comece perguntando pelo histórico auditado por terceiro, com todas as operações, incluindo as perdedoras, e já descontados custos e imposto. Resultado apresentado em print de tela, sem período completo e sem custos, não é evidência de nada. Desconfie especialmente de taxa de acerto alta divulgada sem o tamanho médio das perdas: dá para acertar a maioria das operações e ainda assim perder dinheiro, se as poucas perdas forem grandes. E lembre que quem tem método consistente ganha dinheiro operando, não vendendo o método.',
    },
  ],
}
