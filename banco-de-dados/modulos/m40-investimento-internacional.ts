import type { Modulo } from '@/types'

export const investimentoInternacional: Modulo = {
  id: 'investimento-internacional',
  trilhaId: 'estrategia-gestao',
  numero: 7,
  titulo: 'Investimento Internacional',
  subtitulo: 'Como tirar parte do seu patrimônio de dentro do Brasil, na prática',
  iconName: 'Globe',
  duracaoMin: 14,

  nivel: 'intermediario',
  preRequisitos: ['alocacao-ativos'],
  objetivoAprendizagem: 'Você vai sair sabendo as três formas principais de investir fora do Brasil e qual delas se encaixa melhor no seu caso.',
  erroFatal: 'Concentrar 100% do patrimônio em reais e ativos brasileiros, ficando exposto integralmente ao risco de um único país — moeda, política econômica e mercado de capitais concentrados numa só geografia.',
  numeroChave: {
    valor: 'menos de 0,5%',
    legenda: 'do PIB mundial é gerado no Brasil, o que ilustra o tamanho da fatia de oportunidades globais que fica de fora de uma carteira 100% concentrada em ativos nacionais'
  },
  glossarioDoModulo: ['BDR', 'ETF internacional', 'conta no exterior', 'risco cambial', 'IOF sobre remessas', 'hedge cambial'],
  proximoPasso: { moduloId: 'macro-aplicada-carteira', motivo: 'Com a diversificação internacional entendida, o próximo passo é aprender a usar o cenário macroeconômico global para calibrar essas decisões.' },

  aprender: {
    oQueE: 'Investimento internacional é a alocação de parte do patrimônio em ativos fora do Brasil — ações, fundos ou ETFs de outros países — com o objetivo de diversificar moeda, geografia e acesso a empresas e setores que não existem ou são pouco representados na bolsa brasileira.',
    porQueImporta: 'A bolsa brasileira representa uma fração muito pequena do valor de mercado global e é concentrada em poucos setores (principalmente commodities e bancos). Ficar 100% investido no Brasil significa depender inteiramente da moeda, da política econômica e dos ciclos de um único país, além de não ter acesso direto a setores como tecnologia de ponta, que têm pouca representação na B3.',
    naPratica: 'No Brasil, existem três caminhos principais para investir internacionalmente: (1) BDRs (Brazilian Depositary Receipts), que são recibos negociados na B3 representando ações de empresas estrangeiras, comprados e vendidos em reais, com a praticidade de operar dentro da mesma corretora nacional; (2) ETFs internacionais, tanto os listados na B3 que replicam índices como o S&P 500, quanto ETFs comprados diretamente em corretoras no exterior; (3) conta em corretora internacional, que permite comprar ações, ETFs e outros ativos diretamente em dólar ou outras moedas, geralmente exigindo transferência de recursos via remessa internacional, sujeita a IOF. Cada caminho tem trade-offs de custo, praticidade tributária e exposição cambial direta.',
    passoAPasso: [
      'Defina qual percentual da sua carteira você quer alocar internacionalmente, alinhado ao seu perfil e horizonte.',
      'Avalie se BDRs (mais simples, dentro da corretora nacional) atendem sua necessidade ou se você precisa de acesso mais amplo via conta no exterior.',
      'Se optar por conta no exterior, pesquise as taxas de remessa e o IOF aplicável antes de transferir recursos.',
      'Considere se quer exposição cambial direta (dólar) ou hedge cambial, dependendo do seu objetivo (proteção vs. especulação de moeda).',
      'Entenda a tributação de cada tipo de investimento internacional antes de investir — a declaração de bens no exterior tem regras próprias.',
      'Comece com um percentual pequeno e vá aumentando a exposição conforme ganha confiança e entendimento do processo.'
    ],
    errosComuns: [
      'Ignorar completamente a diversificação internacional por achar que é "coisa de rico" ou complicada demais.',
      'Abrir conta no exterior sem entender a tributação e as obrigações de declaração de bens no exterior.',
      'Confundir BDR com ação da empresa original — BDRs têm particularidades de liquidez e podem ter prêmio ou desconto em relação à ação original.',
      'Concentrar o investimento internacional apenas num único país ou setor, replicando o mesmo erro de concentração cometido no Brasil.',
      'Ignorar o custo de remessas internacionais e o IOF ao mover recursos, o que pode corroer parte do retorno se feito de forma pouco eficiente.'
    ],
    comparativo: {
      titulo: 'BDR vs. ETF internacional na B3 vs. conta no exterior',
      linhas: [
        { label: 'Onde negocia', valor: 'BDR: B3, em reais | ETF na B3: B3, em reais | Conta exterior: corretora internacional, em dólar' },
        { label: 'Praticidade', valor: 'BDR: alta, mesma corretora nacional | ETF na B3: alta | Conta exterior: exige abertura de conta e remessa' },
        { label: 'Exposição cambial', valor: 'BDR: indireta, via preço | ETF na B3: indireta | Conta exterior: direta e completa' },
        { label: 'Custos de acesso', valor: 'BDR: corretagem nacional | ETF na B3: corretagem nacional | Conta exterior: IOF sobre remessa + taxas da corretora' }
      ]
    },
    checklist: [
      'Defina um percentual-alvo de exposição internacional para sua carteira.',
      'Compare BDRs, ETFs na B3 e conta no exterior considerando seu objetivo e disposição para lidar com burocracia.',
      'Se for abrir conta no exterior, pesquise o IOF vigente sobre remessas antes de transferir.',
      'Verifique as regras de declaração de bens e rendimentos no exterior aplicáveis ao seu caso.',
      'Comece com uma posição pequena e aumente gradualmente conforme ganhar confiança no processo.'
    ]
    ,
    livroRelacionado: {
      livroId: 'quit-like-a-millionaire',
      textoConexao: 'Kristy Shen e Bryce Leung constroem grande parte da tese do livro sobre diversificação internacional de carteira e uso de contas no exterior — experiência prática direta com o tema deste módulo.',
    },
  },

  mapaMental: {
    label: 'Investimento Internacional',
    subtitulo: 'Como diversificar geografia e moeda',
    ramos: [
      {
        id: 'motivos',
        label: 'Por Que Diversificar',
        cor: '#3B82F6',
        resumo: 'Razões para sair de uma carteira 100% nacional',
        filhos: [
          { label: 'Concentração geográfica', desc: 'Brasil representa fração pequena do mercado global' },
          { label: 'Acesso a setores ausentes', desc: 'Tecnologia de ponta e outros setores pouco representados na B3' },
          { label: 'Diversificação de moeda', desc: 'Reduzir dependência total do real' }
        ]
      },
      {
        id: 'caminhos',
        label: 'Formas de Acesso',
        cor: '#F59E0B',
        resumo: 'Os três caminhos principais disponíveis',
        filhos: [
          { label: 'BDRs', desc: 'Recibos de ações estrangeiras negociados na B3, em reais' },
          { label: 'ETFs internacionais', desc: 'Na B3 ou diretamente em corretora no exterior' },
          { label: 'Conta em corretora internacional', desc: 'Acesso direto a ativos em dólar ou outra moeda' }
        ]
      },
      {
        id: 'custos-burocracia',
        label: 'Custos e Burocracia',
        cor: '#8B5CF6',
        resumo: 'O que considerar antes de investir fora',
        filhos: [
          { label: 'IOF sobre remessas', desc: 'Custo aplicável ao transferir dinheiro para o exterior' },
          { label: 'Tributação específica', desc: 'Regras próprias de imposto de renda para investimento internacional' },
          { label: 'Declaração de bens no exterior', desc: 'Obrigação de declarar ativos mantidos fora do país, conforme regras vigentes' }
        ]
      },
      {
        id: 'riscos',
        label: 'Riscos Específicos',
        cor: '#EF4444',
        resumo: 'O que muda ao investir fora do Brasil',
        filhos: [
          { label: 'Risco cambial', desc: 'Variação do câmbio pode ampliar ou reduzir o retorno em reais' },
          { label: 'Prêmio/desconto de BDR', desc: 'BDR pode negociar com diferença de preço em relação à ação original' },
          { label: 'Concentração num único país', desc: 'Repetir o mesmo erro de concentração, agora em outro mercado' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: 'Conversão de Moeda e IOF',
    intro: 'Use a calculadora de Conversão de Moeda e IOF para simular o custo real de enviar recursos para uma corretora no exterior, considerando a cotação do dólar e o IOF vigente.',
    passos: [
      'Informe o valor em reais que você pretende transferir para investir internacionalmente.',
      'Veja a cotação de câmbio aplicada e o valor do IOF sobre a remessa.',
      'Compare o valor líquido que efetivamente chega em dólares na corretora internacional.',
      'Compare esse custo com o de comprar um BDR ou ETF equivalente diretamente na B3, em reais.'
    ],
    exemploGuiado: 'Exemplo: um investidor quer alocar R$10.000 em ações de tecnologia americanas. Via conta no exterior, ele precisa considerar o IOF sobre a remessa internacional e a cotação de câmbio do dia, o que reduz o valor líquido convertido em dólares. Via BDR na B3, ele compra o recibo diretamente em reais, sem remessa internacional, mas precisa considerar que o preço do BDR pode ter um pequeno prêmio ou desconto em relação à ação original negociada nos Estados Unidos, e a exposição cambial acontece de forma indireta, embutida no preço.'
  },

  flashcards: [
    { id: 'ii-01', frente: 'O que é um BDR?', verso: 'Brazilian Depositary Receipt — um recibo negociado na B3, em reais, que representa uma ação de uma empresa estrangeira, permitindo investir fora do Brasil dentro da corretora nacional.' },
    { id: 'ii-02', frente: 'Quais são os três caminhos principais para investir internacionalmente a partir do Brasil?', verso: 'BDRs na B3, ETFs internacionais (na B3 ou no exterior), e conta em corretora internacional para comprar ativos diretamente em outra moeda.' },
    { id: 'ii-03', frente: 'O que é risco cambial?', verso: 'A possibilidade de a variação da taxa de câmbio impactar o retorno de um investimento internacional quando convertido de volta para reais.' },
    { id: 'ii-04', frente: 'O que é IOF sobre remessas internacionais?', verso: 'Um imposto aplicado sobre a transferência de recursos para o exterior, que reduz o valor líquido efetivamente convertido para investir internacionalmente.' },
    { id: 'ii-05', frente: 'Por que investir 100% no Brasil é considerado um risco de concentração?', verso: 'Porque o Brasil representa uma fração muito pequena do mercado global, concentrando o investidor inteiramente na moeda, política econômica e setores de um único país.' },
    { id: 'ii-06', frente: 'BDR é a mesma coisa que a ação original da empresa?', verso: 'Não exatamente — o BDR é um recibo que representa a ação, mas pode negociar com prêmio ou desconto em relação ao preço da ação original, e tem dinâmica de liquidez própria.' },
    { id: 'ii-07', frente: 'O que precisa ser considerado ao abrir conta em corretora internacional?', verso: 'A tributação específica de investimentos no exterior e a obrigação de declarar bens e rendimentos mantidos fora do país, conforme as regras vigentes.' },
    { id: 'ii-08', frente: 'Qual vantagem prática de um ETF internacional listado na própria B3?', verso: 'Permite exposição a índices globais (como o S&P 500) negociando em reais, dentro da mesma corretora nacional, sem necessidade de remessa internacional.' }
  ],

  quiz: [
    {
      pergunta: 'O que é um BDR?',
      alternativas: [
        'Um tipo de Tesouro Direto',
        'Um recibo negociado na B3, em reais, que representa uma ação de empresa estrangeira',
        'Uma criptomoeda brasileira',
        'Um fundo imobiliário internacional'
      ],
      correta: 1,
      explicacao: 'BDR (Brazilian Depositary Receipt) é justamente isso: um recibo negociado na bolsa brasileira, em reais, que representa uma ação de uma empresa listada em outro país.'
    },
    {
      pergunta: 'Qual é o principal argumento para diversificar internacionalmente, mesmo tendo uma carteira nacional bem construída?',
      alternativas: [
        'O Brasil representa a maior fatia do mercado global',
        'O Brasil representa uma fração pequena do mercado global e é concentrado em poucos setores',
        'Investir fora do Brasil é sempre mais barato',
        'É obrigatório por lei ter parte do patrimônio no exterior'
      ],
      correta: 1,
      explicacao: 'A bolsa brasileira representa uma fração pequena do valor de mercado global e é concentrada em poucos setores, o que limita o acesso a setores como tecnologia de ponta se o investidor ficar restrito só ao Brasil.'
    },
    {
      pergunta: 'O que é o IOF sobre remessas internacionais?',
      alternativas: [
        'Uma taxa cobrada pela B3 sobre operações com ações',
        'Um imposto aplicado sobre a transferência de recursos para o exterior',
        'Um tributo sobre o rendimento de fundos imobiliários',
        'Uma taxa cobrada apenas sobre criptoativos'
      ],
      correta: 1,
      explicacao: 'O IOF sobre remessas internacionais incide sobre a transferência de dinheiro para o exterior, sendo um custo relevante a considerar ao investir via conta em corretora internacional.'
    },
    {
      pergunta: 'Por que um BDR pode ter um preço diferente da ação original que ele representa?',
      alternativas: [
        'Porque BDRs sempre custam o dobro da ação original',
        'Porque BDR pode negociar com prêmio ou desconto em relação à ação original, por dinâmicas próprias de oferta e demanda no Brasil',
        'Porque BDRs não têm relação nenhuma com o preço da ação original',
        'Porque BDRs são reajustados apenas uma vez por ano'
      ],
      correta: 1,
      explicacao: 'BDRs podem apresentar prêmio ou desconto em relação à ação original devido a diferenças de liquidez e dinâmica própria de oferta e demanda no mercado brasileiro, mesmo representando o mesmo ativo subjacente.'
    },
    {
      pergunta: 'Qual das opções é uma forma de investir internacionalmente sem precisar fazer remessa internacional de recursos?',
      alternativas: ['Abrir conta em corretora nos Estados Unidos', 'Comprar BDRs ou ETFs internacionais listados na própria B3', 'Transferir dinheiro via corretora de câmbio para o exterior', 'Comprar criptoativos em uma exchange internacional'],
      correta: 1,
      explicacao: 'BDRs e ETFs internacionais listados na B3 permitem exposição a ativos estrangeiros negociando diretamente em reais, sem a necessidade de remessa internacional de recursos.'
    },
    {
      pergunta: 'Qual é um erro comum ao diversificar internacionalmente?',
      alternativas: [
        'Definir um percentual-alvo de exposição internacional',
        'Concentrar o investimento internacional em um único país ou setor, repetindo o erro de concentração',
        'Pesquisar a tributação antes de abrir conta no exterior',
        'Começar com uma posição pequena e aumentar gradualmente'
      ],
      correta: 1,
      explicacao: 'Um erro comum é apenas trocar a concentração no Brasil por uma concentração equivalente em outro único país ou setor no exterior, sem realmente diversificar geograficamente e setorialmente.'
    }
  ],

  faq: [
    { pergunta: 'Preciso declarar bens que tenho em uma corretora no exterior?', resposta: 'Sim, existem regras específicas de declaração de bens e rendimentos mantidos fora do país, que variam conforme o valor e o tipo de ativo. Vale consultar as regras vigentes da Receita Federal ou um contador antes de investir no exterior.' },
    { pergunta: 'É mais barato investir via BDR ou abrindo conta no exterior?', resposta: 'Depende do valor e da frequência das operações — BDRs evitam o custo de remessa internacional (IOF), mas podem ter menor liquidez e prêmio/desconto em relação à ação original. Contas no exterior dão acesso mais amplo, mas envolvem custos de remessa e câmbio.' },
    { pergunta: 'Investir internacionalmente me protege de uma crise no Brasil?', resposta: 'Ajuda a reduzir a dependência de um único país, mas não elimina todos os riscos — ativos internacionais também têm suas próprias oscilações e riscos específicos do país ou empresa em questão.' },
    { pergunta: 'Qual percentual da carteira costuma ser recomendado para exposição internacional?', resposta: 'Não existe um número único correto — depende do perfil, horizonte e objetivo de cada investidor. O importante é ter algum grau de diversificação internacional, evitando ficar 100% concentrado em ativos nacionais.' },
    { pergunta: 'ETFs internacionais listados na B3 têm a mesma exposição de um ETF comprado diretamente no exterior?', resposta: 'Em termos de ativos subjacentes, geralmente sim (ambos replicam o mesmo índice), mas podem existir diferenças de custo, liquidez e estrutura tributária entre a versão listada na B3 e a comprada diretamente em uma corretora no exterior.' }
  ]
}
