// m05-opcoes.ts
import type { Modulo } from '@/types'

export const opcoes: Modulo = {
  id: 'opcoes',
  trilhaId: 'alternativos-derivativos',
  numero: 5,
  titulo: 'Opções',
  subtitulo: 'O derivativo que pode proteger sua carteira ou zerar seu capital em poucos dias',
  iconName: 'GitBranch',
  duracaoMin: 17,

  nivel: 'avancado',
  preRequisitos: ['equity', 'estrategias-grandes-gestores'],
  objetivoAprendizagem: 'Você vai sair entendendo como funcionam opções de compra e venda na B3, a diferença entre travar risco e alavancar risco, e por que a maioria de quem opera opções sem estratégia perde dinheiro.',
  erroFatal: 'Vender opções a descoberto (sem ter o ativo-objeto ou garantia suficiente) achando que "o prêmio recebido já é lucro garantido" — se o mercado se mover contra a posição, a perda pode superar em muitas vezes o valor recebido inicialmente, e em alguns casos ser, na prática, ilimitada.',
  numeroChave: { valor: '3 em cada 4', legenda: 'proporção aproximada de opções que expiram sem valor (viram pó) na data de vencimento, segundo estudos recorrentes sobre mercados de derivativos — o que favorece estruturalmente quem vende opções, não quem compra' },
  glossarioDoModulo: ['Opção de compra (call)', 'Opção de venda (put)', 'Prêmio', 'Strike (preço de exercício)', 'Titular e lançador', 'Opção a descoberto', 'Vencimento', 'Volatilidade implícita'],
  proximoPasso: { moduloId: 'investimentos-alternativos', motivo: 'Depois de entender derivativos de opções, vale conhecer outras categorias de investimentos fora do tradicional, que também exigem análise de risco específica antes de alocar capital.' },

  aprender: {
    oQueE: 'Opções são contratos derivativos que dão o direito (mas não a obrigação) de comprar ou vender um ativo por um preço fixo (strike) até uma data determinada (vencimento). Uma opção de compra (call) dá o direito de comprar o ativo; uma opção de venda (put) dá o direito de vendê-lo. Quem compra a opção é o titular e paga um valor chamado prêmio; quem vende é o lançador e recebe esse prêmio, assumindo a obrigação de honrar o contrato caso o titular decida exercer o direito.',
    porQueImporta: 'Opções podem servir tanto para proteger uma carteira (comprando puts como seguro contra queda) quanto para gerar renda extra (vendendo opções cobertas) ou para especular com alavancagem elevada. O problema é que a maioria dos iniciantes entra direto na parte mais arriscada — comprar opções buscando ganho rápido, ou pior, vender opções a descoberto sem entender que o risco pode ser desproporcional ao prêmio recebido. Sem entender a mecânica correta, é fácil perder o capital investido rapidamente, ou assumir risco muito maior do que se pretendia.',
    naPratica: 'No Brasil, opções sobre ações são negociadas na B3, com séries padronizadas identificadas por letras e números que indicam o tipo (call ou put) e o mês de vencimento. O prêmio de uma opção reflete principalmente três fatores: a diferença entre o preço atual do ativo e o strike, o tempo até o vencimento, e a volatilidade implícita esperada para o ativo. Estratégias comuns usadas por investidores mais experientes incluem venda coberta (vender calls de uma ação que você já possui, gerando renda extra mensal) e trava de alta ou de baixa (comprar e vender opções simultaneamente para limitar tanto o ganho quanto a perda potencial). Vender opções a descoberto — sem ter o ativo ou garantia equivalente — exige margem de garantia calculada pela B3 e pode gerar chamadas de margem (pedidos de mais garantia) se o mercado se mover contra a posição, além de risco de perda que pode superar muitas vezes o prêmio originalmente recebido.',
    passoAPasso: [
      'Entenda primeiro a diferença entre ser titular (comprador, direito, risco limitado ao prêmio pago) e lançador (vendedor, obrigação, risco potencialmente maior que o prêmio recebido).',
      'Comece, se for iniciante em opções, apenas comprando opções (titular), nunca vendendo a descoberto, já que o risco fica limitado ao valor pago.',
      'Estude a venda coberta como primeira estratégia de geração de renda: vender calls apenas de ações que você já possui em carteira.',
      'Avalie o strike e o vencimento considerando seu cenário esperado para o ativo — opções muito distantes do preço atual (fora do dinheiro) custam menos, mas têm menor chance de gerar lucro.',
      'Calcule sempre a perda máxima possível da operação antes de executá-la, não apenas o ganho potencial.',
      'Acompanhe a posição até o vencimento ou decida encerrá-la antecipadamente, já que opções perdem valor com a aproximação da data de vencimento (efeito conhecido como decaimento do tempo).',
      'Nunca opere volume que comprometa uma parcela relevante do seu patrimônio total, dado o potencial de perda rápida em operações alavancadas.'
    ],
    errosComuns: [
      'Vender opções a descoberto sem entender que o risco pode ser muito maior que o prêmio recebido, às vezes tecnicamente ilimitado.',
      'Comprar opções muito distantes do preço atual do ativo ("fora do dinheiro") esperando ganho desproporcional, sem considerar que a maioria expira sem valor.',
      'Ignorar o decaimento do tempo, mantendo posições compradas até muito próximo do vencimento e vendo o valor da opção derreter mesmo com o ativo parado.',
      'Não calcular a margem de garantia necessária para vender opções a descoberto, sendo pego de surpresa por uma chamada de margem.',
      'Tratar opções como forma de "aumentar ganhos garantidos", quando na prática o mecanismo aumenta tanto o potencial de ganho quanto o de perda.',
      'Operar opções de ativos com baixa liquidez, dificultando o encerramento da posição pelo preço justo quando necessário.'
    ],
    comparativo: {
      titulo: 'Titular (comprador) vs. Lançador (vendedor) de opções',
      linhas: [
        { label: 'O que você tem', valor: 'Titular: direito de comprar ou vender o ativo | Lançador: obrigação de honrar o contrato se exercido' },
        { label: 'O que você paga ou recebe', valor: 'Titular: paga o prêmio | Lançador: recebe o prêmio' },
        { label: 'Perda máxima possível', valor: 'Titular: limitada ao prêmio pago | Lançador: pode superar muitas vezes o prêmio recebido' },
        { label: 'Ganho máximo possível', valor: 'Titular: pode ser elevado, dependendo do movimento do ativo | Lançador: limitado ao prêmio recebido' },
        { label: 'Perfil mais adequado', valor: 'Titular: iniciantes em opções, risco controlado | Lançador (coberto): investidores experientes com o ativo em carteira' }
      ]
    },
    checklist: [
      'Antes de operar, defina se você será titular (comprador) ou lançador (vendedor) e entenda o risco de cada papel.',
      'Se for iniciante, opere apenas como titular, com perda máxima limitada ao prêmio pago.',
      'Só considere vender opções a descoberto depois de entender profundamente margem de garantia e chamadas de margem.',
      'Calcule sempre a perda máxima da operação antes de executá-la, não apenas o ganho potencial esperado.',
      'Priorize opções de ativos líquidos, evitando séries com pouco volume de negociação.',
      'Limite o capital destinado a operações com opções a uma fração pequena do seu patrimônio total.'
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham traça uma linha clara entre investimento e especulação — operar opções sem entender profundamente o risco (como lançar a descoberto sem saber calcular perda máxima) é exatamente o tipo de comportamento especulativo contra o qual ele alerta.',
    },
    naoConfundirCom: [
      { moduloId: 'equity', diferenca: 'Equity é participação societária direta (ser dono de uma fração da empresa); opções são contratos derivativos sobre um ativo, incluindo ações, sem necessariamente conferir propriedade da empresa.' },
      { moduloId: 'criptomoedas', diferenca: 'Este módulo trata de opções negociadas na B3 sobre ações; existem também derivativos de opções sobre criptoativos em mercados internacionais, mas com regras, liquidez e regulação bastante diferentes.' }
    ]
  },

  mapaMental: {
    label: 'Opções',
    subtitulo: 'Direitos, obrigações e estratégias com derivativos',
    ramos: [
      {
        id: 'mecanica-basica',
        label: 'Mecânica Básica',
        cor: '#3B82F6',
        resumo: 'Os elementos que compõem um contrato de opção',
        filhos: [
          { label: 'Call (opção de compra)', desc: 'Direito de comprar o ativo por um preço fixo até o vencimento' },
          { label: 'Put (opção de venda)', desc: 'Direito de vender o ativo por um preço fixo até o vencimento' },
          { label: 'Strike', desc: 'Preço de exercício combinado no contrato' },
          { label: 'Prêmio', desc: 'Valor pago pelo titular e recebido pelo lançador' }
        ]
      },
      {
        id: 'papeis',
        label: 'Papéis no Contrato',
        cor: '#FFC93C',
        resumo: 'Quem compra e quem vende a opção',
        filhos: [
          { label: 'Titular', desc: 'Compra a opção, paga o prêmio, tem o direito, risco limitado ao prêmio' },
          {
            label: 'Lançador',
            desc: 'Vende a opção, recebe o prêmio, assume a obrigação',
            netos: [
              { label: 'Lançamento coberto', desc: 'Vende opção de um ativo que já possui, risco reduzido' },
              { label: 'Lançamento a descoberto', desc: 'Vende sem ter o ativo, risco potencialmente muito maior' }
            ]
          }
        ]
      },
      {
        id: 'estrategias',
        label: 'Estratégias Comuns',
        cor: '#22C55E',
        resumo: 'Formas de combinar opções para objetivos específicos',
        filhos: [
          { label: 'Proteção (hedge)', desc: 'Comprar puts para proteger uma carteira de quedas' },
          { label: 'Renda extra', desc: 'Venda coberta de calls sobre ações já possuídas' },
          { label: 'Travas', desc: 'Combinar compra e venda simultâneas para limitar ganho e perda' }
        ]
      },
      {
        id: 'fatores-de-preco',
        label: 'O que Forma o Preço',
        cor: '#EC4899',
        resumo: 'Variáveis que determinam o valor do prêmio',
        filhos: [
          { label: 'Distância do strike', desc: 'Quanto mais próximo do preço atual do ativo, maior o prêmio' },
          { label: 'Tempo até o vencimento', desc: 'Mais tempo, maior o prêmio; o valor decai com a aproximação da data' },
          { label: 'Volatilidade implícita', desc: 'Expectativa de oscilação futura do ativo, embutida no preço da opção' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões práticas envolvendo opções e vê o resultado esperado de cada escolha, considerando o risco assumido em cada papel do contrato.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre operar opções.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando o risco real de cada posição.'
    ],
    exemploGuiado: 'Um investidor possui 1.000 ações de uma empresa, compradas a R$ 20 cada (R$ 20.000 investidos). Ele decide vender (lançar) opções de compra cobertas com strike de R$ 22, recebendo um prêmio de R$ 0,80 por ação (R$ 800 no total) para vencimento em 30 dias. Cenário 1: se a ação ficar abaixo de R$ 22 no vencimento, a opção expira sem valor, ele fica com as ações e embolsa os R$ 800 de prêmio como renda extra, cerca de 4% sobre o valor investido em apenas um mês. Cenário 2: se a ação subir acima de R$ 22, ele é obrigado a vender as ações a R$ 22 (o strike), realizando lucro de R$ 2 por ação na venda mais os R$ 0,80 de prêmio, mas abrindo mão de qualquer valorização acima de R$ 22. Como a operação foi coberta (ele já tinha as ações), o risco ficou limitado a essa renúncia de ganho adicional — diferente de uma venda a descoberto, que exporia a perdas maiores caso ele não tivesse o ativo.',
    cenarioGuiado: [
      {
        pergunta: 'Você está começando a operar opções e precisa decidir entre ser titular (comprador) ou lançador a descoberto (vendedor sem o ativo) numa primeira operação.',
        opcoes: [
          { texto: 'Começo vendendo opções a descoberto, o prêmio recebido na hora parece atrativo', resultado: 'Vender a descoberto sem experiência expõe a perdas que podem superar muitas vezes o prêmio recebido, caso o ativo se mova fortemente contra a posição — não é o ponto de partida recomendado para quem está aprendendo.' },
          { texto: 'Começo comprando opções (titular), com risco limitado ao prêmio pago', resultado: 'Abordagem mais prudente para iniciantes: a perda máxima fica limitada ao valor pago pela opção, permitindo aprender a mecânica do mercado sem risco de perdas desproporcionais.' }
        ]
      },
      {
        pergunta: 'Você tem 500 ações de uma empresa em carteira, compradas há 2 anos, e considera vender calls contra essa posição para gerar renda extra.',
        opcoes: [
          { texto: 'Vendo calls cobertas (tenho as ações), aceitando vender a ação pelo strike se for exercido', resultado: 'Estratégia de venda coberta é considerada relativamente conservadora dentro do universo de opções, já que o risco está limitado a abrir mão de valorização acima do strike, não a uma perda maior que o valor da própria ação.' },
          { texto: 'Vendo calls a descoberto de outra empresa que não possuo, buscando prêmio maior', resultado: 'Vender a descoberto de um ativo que você não possui expõe a um risco de perda muito maior, potencialmente superior ao prêmio recebido, caso o preço do ativo suba significativamente.' }
        ]
      },
      {
        pergunta: 'Você comprou uma opção de compra há 25 dias, com vencimento em 30 dias, e o ativo não se moveu como esperado.',
        opcoes: [
          { texto: 'Mantenho a posição até o último dia, esperando uma reversão', resultado: 'Opções perdem valor com a aproximação do vencimento (decaimento do tempo), mesmo sem o ativo se mover — esperar até o último momento, sem um plano, tende a agravar a perda caso o cenário não se reverta.' },
          { texto: 'Reavalio a posição, considerando encerrá-la antes do vencimento para reduzir a perda', resultado: 'Reavaliar ativamente a posição, em vez de simplesmente esperar o vencimento, é uma prática mais disciplinada diante do decaimento do tempo, que corrói o valor da opção mesmo sem movimento do ativo.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'op-01', frente: 'O que é uma opção de compra (call)?', verso: 'Um contrato que dá ao titular o direito, mas não a obrigação, de comprar um ativo por um preço fixo (strike) até uma data de vencimento.' },
    { id: 'op-02', frente: 'O que é uma opção de venda (put)?', verso: 'Um contrato que dá ao titular o direito, mas não a obrigação, de vender um ativo por um preço fixo (strike) até uma data de vencimento.' },
    { id: 'op-03', frente: 'Qual a diferença entre titular e lançador de uma opção?', verso: 'Titular compra a opção, paga o prêmio e tem o direito de exercer; lançador vende a opção, recebe o prêmio e assume a obrigação de honrar o contrato se exercido.' },
    { id: 'op-04', frente: 'Qual é a perda máxima possível para quem compra (é titular de) uma opção?', verso: 'Limitada ao valor do prêmio pago na compra da opção — o titular nunca perde mais do que isso.' },
    { id: 'op-05', frente: 'Por que vender opções a descoberto é considerado mais arriscado que ser titular?', verso: 'Porque a perda pode superar muitas vezes o prêmio recebido, caso o mercado se mova contra a posição do lançador, diferente do titular, cuja perda é sempre limitada ao prêmio pago.' },
    { id: 'op-06', frente: 'O que é venda coberta de opções?', verso: 'Estratégia de vender opções de compra (calls) de um ativo que você já possui em carteira, reduzindo o risco em comparação com a venda a descoberto.' },
    { id: 'op-07', frente: 'O que é decaimento do tempo em opções?', verso: 'A perda de valor de uma opção conforme se aproxima a data de vencimento, mesmo que o preço do ativo-objeto não se mova.' },
    { id: 'op-08', frente: 'O que é volatilidade implícita?', verso: 'A expectativa de oscilação futura do preço do ativo, embutida no preço (prêmio) da opção — quanto maior a expectativa de oscilação, maior tende a ser o prêmio.' },
    { id: 'op-09', frente: 'Aproximadamente que proporção das opções expira sem valor no vencimento?', verso: 'Cerca de 3 em cada 4, o que estruturalmente favorece quem vende opções em relação a quem compra, na média histórica.' },
    { id: 'op-10', frente: 'O que é uma chamada de margem?', verso: 'Um pedido de garantia adicional feito a quem vendeu opções a descoberto, quando o mercado se move contra a posição, exigindo mais capital ou ativos como garantia.' }
  ],

  quiz: [
    {
      pergunta: 'O que uma opção de compra (call) dá ao seu titular?',
      alternativas: [
        'A obrigação de comprar o ativo no vencimento',
        'O direito, mas não a obrigação, de comprar o ativo por um preço fixo até o vencimento',
        'A propriedade imediata do ativo',
        'O direito de vender o ativo por um preço fixo'
      ],
      correta: 1,
      explicacao: 'A call dá ao titular o direito de comprar o ativo pelo strike combinado, sem obrigação de exercer esse direito — se não for vantajoso, ele simplesmente deixa a opção expirar sem exercer.'
    },
    {
      pergunta: 'Qual é a perda máxima possível para quem é titular (comprador) de uma opção?',
      alternativas: [
        'Ilimitada, dependendo do movimento do ativo',
        'Limitada ao valor do prêmio pago pela opção',
        'Sempre o dobro do prêmio pago',
        'Não existe possibilidade de perda para o titular'
      ],
      correta: 1,
      explicacao: 'O titular só perde, no máximo, o valor que pagou pelo prêmio da opção — se o mercado não for favorável, ele simplesmente não exerce o direito, mas não deve nada além do que já pagou.'
    },
    {
      pergunta: 'Por que vender opções a descoberto é considerado o erro mais caro e recorrente entre iniciantes no tema?',
      alternativas: [
        'Porque é uma prática proibida pela CVM',
        'Porque a perda pode superar muitas vezes o prêmio recebido, caso o mercado se mova contra a posição',
        'Porque opções a descoberto não pagam prêmio nenhum',
        'Porque só é possível vender opções cobertas no Brasil'
      ],
      correta: 1,
      explicacao: 'Ao vender uma opção sem ter o ativo ou garantia equivalente, o lançador assume uma obrigação cujo risco pode crescer muito além do prêmio recebido inicialmente, especialmente se o ativo se mover fortemente contra a posição.'
    },
    {
      pergunta: 'O que caracteriza uma venda coberta de opções?',
      alternativas: [
        'Vender uma opção sem possuir o ativo-objeto',
        'Vender uma opção de compra (call) de um ativo que você já possui em carteira',
        'Comprar uma opção de venda (put) como proteção',
        'Vender opções apenas em dias de alta volatilidade'
      ],
      correta: 1,
      explicacao: 'A venda coberta consiste em lançar calls sobre um ativo que o investidor já possui, o que limita o risco à renúncia de ganho adicional acima do strike, ao contrário da venda a descoberto.'
    },
    {
      pergunta: 'O que é o decaimento do tempo em opções?',
      alternativas: [
        'Um imposto cobrado sobre opções perto do vencimento',
        'A perda de valor de uma opção conforme se aproxima o vencimento, mesmo sem o ativo se mover',
        'A obrigação de vender a opção antes do vencimento',
        'Um bônus pago a quem mantém a opção até o fim'
      ],
      correta: 1,
      explicacao: 'Conforme o tempo até o vencimento diminui, o valor de tempo embutido no prêmio da opção também diminui, corroendo seu valor mesmo que o preço do ativo-objeto permaneça estável.'
    },
    {
      pergunta: 'Aproximadamente qual proporção das opções expira sem valor no vencimento, segundo estudos recorrentes sobre derivativos?',
      alternativas: ['1 em cada 4', '1 em cada 2', '3 em cada 4', '9 em cada 10'],
      correta: 2,
      explicacao: 'Cerca de 3 em cada 4 opções expiram sem valor, o que estruturalmente favorece, em média, quem vende opções (recebe o prêmio e não precisa honrar a obrigação) em detrimento de quem compra.'
    },
    {
      pergunta: 'Qual estratégia com opções é considerada relativamente mais conservadora, adequada para investidores que já possuem o ativo?',
      alternativas: ['Venda a descoberto de calls', 'Compra de opções muito fora do dinheiro', 'Venda coberta de calls', 'Compra de opções de vencimento muito distante'],
      correta: 2,
      explicacao: 'A venda coberta limita o risco à renúncia de ganho adicional acima do strike, já que o investidor já possui o ativo — diferente da venda a descoberto, que expõe a perdas potencialmente muito maiores.'
    }
  ],

  faq: [
    { pergunta: 'Preciso ter muito dinheiro para começar a operar opções?', resposta: 'Comprar opções (ser titular) costuma exigir capital relativamente menor que comprar o ativo diretamente, já que o prêmio é uma fração do valor do ativo-objeto. Vender opções a descoberto, por outro lado, exige margem de garantia calculada pela B3, geralmente bem mais elevada.' },
    { pergunta: 'Opções são um investimento ou uma especulação?', resposta: 'Depende de como são usadas. Comprar puts para proteger uma carteira existente é uma forma de gestão de risco (hedge); operar comprando ou vendendo opções buscando ganho rápido, sem lastro em outros ativos, tende a se aproximar mais de especulação alavancada.' },
    { pergunta: 'O que acontece se eu não fizer nada e minha opção comprada expirar sem valor?', resposta: 'Você simplesmente perde o valor pago no prêmio, sem nenhuma obrigação adicional — a opção expira automaticamente sem valor, e nenhuma ação extra é necessária da sua parte.' },
    { pergunta: 'É verdade que quem vende opções ganha mais dinheiro no longo prazo que quem compra?', resposta: 'Estatisticamente, como a maioria das opções expira sem valor, vendedores tendem a ter vantagem estrutural na média — mas isso não elimina o risco de perdas pontuais elevadas em operações a descoberto, que podem superar meses ou anos de ganhos acumulados com prêmios.' },
    { pergunta: 'Posso perder mais dinheiro do que investi operando opções?', resposta: 'Como titular (comprador), não — sua perda é limitada ao prêmio pago. Como lançador a descoberto (vendedor sem o ativo), sim — a perda pode superar significativamente o valor recebido inicialmente, dependendo do movimento do mercado.' },
    { pergunta: 'Como escolho o strike certo para uma opção?', resposta: 'Não existe um strike "certo" universal — a escolha depende do seu cenário esperado para o ativo, do quanto você está disposto a pagar de prêmio e do equilíbrio entre probabilidade de sucesso e potencial de retorno que você busca na operação.' }
  ]
}
