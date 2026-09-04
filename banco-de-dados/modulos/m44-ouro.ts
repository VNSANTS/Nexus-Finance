// m03-ouro.ts
import type { Modulo } from '@/types'

export const ouro: Modulo = {
  id: 'ouro',
  trilhaId: 'alternativos-derivativos',
  numero: 3,
  titulo: 'Ouro',
  subtitulo: 'As diferentes formas de investir em ouro no Brasil e o que cada uma custa de verdade',
  iconName: 'Coins',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['reserva-de-valor'],
  objetivoAprendizagem: 'Você vai sair sabendo escolher entre as diferentes formas de investir em ouro no Brasil considerando custo, liquidez e segurança, em vez de comprar a primeira opção que aparecer.',
  erroFatal: 'Comprar ouro físico (barras ou joias de investimento) de vendedores não certificados ou sem nota fiscal, expondo-se a fraude de pureza e, na hora de vender, a deságios enormes por falta de procedência comprovada.',
  numeroChave: { valor: '0,25% ao ano', legenda: 'taxa de administração aproximada cobrada por ETFs de ouro negociados na B3, muito abaixo do custo de armazenagem e seguro de ouro físico guardado por conta própria' },
  glossarioDoModulo: ['Ouro físico', 'ETF de ouro', 'Grama de ouro', 'Pureza (quilates)', 'Custódia', 'Spread de compra e venda', 'Ativo real'],
  proximoPasso: { moduloId: 'equity', motivo: 'Depois de estudar ouro como ativo real de proteção, o próximo passo é entender equity — participação acionária direta em empresas, incluindo negociações fora da bolsa tradicional.' },

  aprender: {
    oQueE: 'Ouro é um metal precioso usado há milênios como reserva de valor, meio de troca e, mais recentemente, ativo de investimento e proteção de carteira. No Brasil, é possível investir em ouro de diversas formas: fisicamente (barras, moedas ou joias de investimento certificadas), via ETFs negociados na B3 (que replicam o preço do ouro em reais), ou por meio de contratos futuros na B3, mais voltados a investidores sofisticados. Cada formato tem uma combinação diferente de custo, liquidez e segurança.',
    porQueImporta: 'Quem decide investir em ouro sem entender as diferenças entre as formas de fazer isso corre riscos concretos: pagar ágio excessivo na compra de ouro físico sem procedência, arcar com custos de armazenagem e seguro que corroem o retorno ao longo dos anos, ou comprar um produto ilíquido que é difícil de vender pelo preço justo quando necessário. Escolher a forma certa de exposição a ouro pode ser a diferença entre uma proteção eficiente de carteira e um ativo caro e problemático de manter.',
    naPratica: 'No Brasil, a forma mais prática e líquida de investir em ouro para a maioria das pessoas é via ETF de ouro negociado na B3 (como o GOLD11), que replica a variação do preço internacional do ouro convertido em reais, com taxa de administração baixa (na faixa de 0,20% a 0,30% ao ano) e sem necessidade de guardar nada fisicamente. Ouro físico certificado (barras com selo de refinarias reconhecidas, como a de São Paulo, com nota fiscal) é uma opção para quem quer posse direta do ativo, mas envolve custos de armazenagem (cofre próprio ou aluguel de cofre bancário) e seguro, além de spread relevante entre preço de compra e venda em revendedores. Joias de "investimento" costumam ter ágio de fabricação embutido, o que as torna uma forma ineficiente de investir em ouro puro — servem mais como bem de consumo com valor residual do que como investimento propriamente dito. Contratos futuros de ouro na B3 permitem alavancagem, mas são adequados apenas para quem já entende de derivativos e tem tolerância a esse tipo de risco.',
    passoAPasso: [
      'Defina o objetivo: proteção de carteira no longo prazo (favorece ETF, pela praticidade) ou posse física direta (favorece ouro físico certificado).',
      'Se optar por ETF, verifique a taxa de administração e a liquidez média diária de negociação antes de escolher entre as opções disponíveis na B3.',
      'Se optar por ouro físico, compre apenas de instituições financeiras ou revendedores autorizados, sempre com nota fiscal e certificado de pureza.',
      'Avalie o custo total de manter ouro físico: cofre próprio, aluguel de cofre bancário, ou seguro residencial específico para bens de valor.',
      'Evite joias como forma de investimento em ouro — o ágio de fabricação reduz significativamente a eficiência dessa exposição.',
      'Determine o percentual da carteira dedicado a ouro considerando seu objetivo de proteção, geralmente uma fração pequena e complementar, não a maior parte do patrimônio.'
    ],
    errosComuns: [
      'Comprar ouro físico sem nota fiscal ou certificado de procedência, expondo-se a fraude de pureza e dificuldade de revenda.',
      'Ignorar o custo de armazenagem e seguro ao comparar ouro físico com ETFs, subestimando o custo real de manter o ativo fisicamente.',
      'Tratar joias de "investimento" como forma eficiente de exposição ao ouro, quando o ágio de fabricação reduz o retorno real de forma significativa.',
      'Concentrar parcela desproporcional da carteira em ouro, esquecendo que seu papel principal é de proteção complementar, não de motor de crescimento patrimonial.',
      'Operar contratos futuros de ouro sem entender alavancagem, expondo-se a perdas maiores que o capital investido inicialmente.',
      'Comprar ouro esperando retorno consistente no curto prazo, quando seu histórico mostra valorização mais relevante em horizontes de vários anos.'
    ],
    comparativo: {
      titulo: 'Formas de investir em ouro no Brasil',
      linhas: [
        { label: 'ETF de ouro (B3)', valor: 'Custo: taxa de administração ~0,25% a.a. | Liquidez: alta, negociação em bolsa | Segurança: custódia institucional' },
        { label: 'Ouro físico certificado', valor: 'Custo: armazenagem + seguro + spread de compra/venda | Liquidez: menor, depende de revendedor | Segurança: depende do local de guarda' },
        { label: 'Joias de "investimento"', valor: 'Custo: ágio de fabricação, geralmente alto | Liquidez: baixa, deságio na revenda | Segurança: bem físico sujeito a perda ou roubo' },
        { label: 'Contratos futuros (B3)', valor: 'Custo: baixo por operação, mas com risco de alavancagem | Liquidez: alta para investidores sofisticados | Segurança: exige conhecimento técnico avançado' }
      ]
    },
    checklist: [
      'Defina se seu objetivo é proteção de carteira prática (ETF) ou posse física direta do metal.',
      'Se for comprar ETF de ouro, compare taxa de administração e volume médio de negociação entre as opções da B3.',
      'Se for comprar ouro físico, exija sempre nota fiscal e certificado de pureza de instituição reconhecida.',
      'Calcule o custo anual de armazenagem e seguro antes de decidir por ouro físico.',
      'Evite considerar joias como parte da sua estratégia de investimento em ouro.'
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O livro alerta contra confundir símbolo de status (joias, itens de luxo) com investimento real — o mesmo alerta que fecha o checklist deste módulo sobre não tratar joias como estratégia de investimento em ouro.',
    },
    naoConfundirCom: [
      { moduloId: 'reserva-de-valor', diferenca: 'O módulo de Reserva de Valor compara o papel do ouro com outros ativos (dólar, Tesouro IPCA+, Bitcoin) na função de proteção patrimonial; este módulo foca especificamente em como investir em ouro na prática, no Brasil.' },
      { moduloId: 'investimentos-alternativos', diferenca: 'Ouro é tratado aqui como classe específica; o módulo de Investimentos Alternativos aborda outras categorias fora do tradicional, como private equity e ativos colecionáveis, de forma mais ampla.' }
    ]
  },

  mapaMental: {
    label: 'Ouro',
    subtitulo: 'Formas de investir e como escolher',
    ramos: [
      {
        id: 'formas-de-investir',
        label: 'Formas de Investir',
        cor: '#FFC93C',
        resumo: 'As opções disponíveis no Brasil',
        filhos: [
          { label: 'ETF de ouro (B3)', desc: 'Replica o preço internacional do ouro em reais, negociado como uma ação' },
          { label: 'Ouro físico certificado', desc: 'Barras ou moedas com procedência e pureza comprovadas' },
          { label: 'Joias de investimento', desc: 'Ágio de fabricação reduz a eficiência como investimento puro' },
          { label: 'Contratos futuros', desc: 'Instrumento de derivativos, com alavancagem, para investidores sofisticados' }
        ]
      },
      {
        id: 'custos',
        label: 'Custos Envolvidos',
        cor: '#3B82F6',
        resumo: 'O que cada formato realmente custa',
        filhos: [
          { label: 'Taxa de administração (ETF)', desc: 'Geralmente entre 0,20% e 0,30% ao ano' },
          { label: 'Armazenagem e seguro (físico)', desc: 'Cofre próprio, aluguel de cofre bancário ou seguro residencial' },
          { label: 'Spread de compra e venda', desc: 'Diferença entre preço pago na compra e recebido na revenda' }
        ]
      },
      {
        id: 'riscos',
        label: 'Riscos Específicos',
        cor: '#EF4444',
        resumo: 'O que pode dar errado em cada formato',
        filhos: [
          { label: 'Fraude de procedência', desc: 'Comprar ouro físico sem certificado de pureza e nota fiscal' },
          { label: 'Iliquidez de joias', desc: 'Deságio alto na hora de revender' },
          { label: 'Alavancagem em futuros', desc: 'Perdas podem superar o capital investido inicialmente' }
        ]
      },
      {
        id: 'papel-na-carteira',
        label: 'Papel na Carteira',
        cor: '#22C55E',
        resumo: 'Como o ouro se encaixa na estratégia geral',
        filhos: [
          { label: 'Proteção complementar', desc: 'Geralmente uma fração pequena, não o núcleo da carteira' },
          { label: 'Baixa correlação com ações', desc: 'Tende a se comportar de forma diferente de ativos de risco em crises' },
          { label: 'Horizonte de longo prazo', desc: 'Retorno mais relevante observado em períodos de vários anos, não no curto prazo' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você compara decisões práticas sobre como investir em ouro e vê o resultado esperado de cada escolha, considerando custo e segurança.',
    passos: [
      'Leia a situação sobre uma decisão de investimento em ouro.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando custos e riscos envolvidos.'
    ],
    exemploGuiado: 'Uma pessoa quer alocar R$ 10.000 em ouro como proteção complementar de carteira. Opção A: comprar ouro físico em barras de 10g, com spread de compra/venda de aproximadamente 5% e custo anual de armazenagem em cofre bancário de cerca de R$ 300. Opção B: comprar cotas de um ETF de ouro na B3, com taxa de administração de 0,25% ao ano (R$ 25 sobre os R$ 10.000) e sem custo de armazenagem, já que a custódia é institucional. Ao longo de 5 anos, considerando apenas os custos de manutenção (sem contar o spread inicial da opção física), o ouro físico custaria acima de R$ 1.500 em armazenagem, contra pouco mais de R$ 125 em taxa de administração do ETF — uma diferença que só se justificaria se a pessoa tivesse um motivo específico para querer posse física direta do metal.',
    cenarioGuiado: [
      {
        pergunta: 'Você quer começar a investir em ouro com R$ 5.000, sem interesse em ter o metal fisicamente em casa.',
        opcoes: [
          { texto: 'Compro ouro físico e guardo em casa, é mais simples de entender', resultado: 'Além do custo de armazenagem e do risco de guardar um bem de valor em casa sem segurança adequada, essa opção não atende ao seu próprio critério de não querer posse física — um ETF seria mais alinhado ao seu objetivo.' },
          { texto: 'Compro cotas de um ETF de ouro na B3', resultado: 'Opção alinhada ao objetivo: exposição ao preço do ouro, com custódia institucional, sem necessidade de guardar nada fisicamente e com taxa de administração relativamente baixa.' }
        ]
      },
      {
        pergunta: 'Um vendedor oferece uma "barra de ouro" com preço abaixo do mercado, sem nota fiscal, pagamento apenas via Pix pessoal.',
        opcoes: [
          { texto: 'Aproveito a oportunidade, o preço está muito bom', resultado: 'Ausência de nota fiscal e certificado de procedência é sinal claro de risco de fraude de pureza — mesmo que o ouro seja genuíno, a falta de documentação torna a revenda futura extremamente difícil e desvantajosa.' },
          { texto: 'Não compro e procuro uma instituição financeira ou revendedor autorizado', resultado: 'Postura correta: comprar ouro físico exige sempre procedência comprovada, nota fiscal e certificado de pureza, mesmo que isso signifique pagar um preço mais alinhado ao mercado.' }
        ]
      },
      {
        pergunta: 'Você já tem 3% da sua carteira em ouro e está pensando em aumentar para 40%, achando que isso vai "blindar" totalmente seu patrimônio.',
        opcoes: [
          { texto: 'Aumento para 40%, quanto mais proteção, melhor', resultado: 'Concentrar quase metade da carteira em ouro contraria o papel dele como proteção complementar — isso reduz drasticamente a diversificação e a expõe a riscos específicos do próprio ouro, como estagnação de preço por longos períodos.' },
          { texto: 'Mantenho uma fração menor, como proteção complementar, e sigo diversificando entre outras classes de ativos', resultado: 'Alinhado ao papel real do ouro numa carteira: proteção complementar de baixa correlação com ações, não o núcleo do patrimônio.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'ouro-01', frente: 'Quais são as principais formas de investir em ouro no Brasil?', verso: 'ETF de ouro na B3, ouro físico certificado (barras ou moedas), joias de investimento e contratos futuros.' },
    { id: 'ouro-02', frente: 'Qual é a taxa de administração aproximada de um ETF de ouro na B3?', verso: 'Entre 0,20% e 0,30% ao ano, bem abaixo do custo de armazenagem e seguro de ouro físico guardado por conta própria.' },
    { id: 'ouro-03', frente: 'Por que joias não são consideradas uma forma eficiente de investir em ouro?', verso: 'Porque embutem ágio de fabricação, o que reduz significativamente o retorno em comparação com ouro puro investido via ETF ou barras certificadas.' },
    { id: 'ouro-04', frente: 'O que é essencial verificar antes de comprar ouro físico?', verso: 'Nota fiscal e certificado de pureza de instituição reconhecida, para evitar fraude e garantir liquidez na revenda.' },
    { id: 'ouro-05', frente: 'Quais custos estão envolvidos em manter ouro físico?', verso: 'Armazenagem (cofre próprio ou bancário), seguro e o spread entre preço de compra e venda em revendedores.' },
    { id: 'ouro-06', frente: 'Qual é o papel esperado do ouro numa carteira diversificada?', verso: 'Proteção complementar, geralmente com baixa correlação com ações, e não o núcleo principal do patrimônio.' },
    { id: 'ouro-07', frente: 'Contratos futuros de ouro são recomendados para quem?', verso: 'Para investidores sofisticados que já entendem de derivativos e alavancagem, dado o risco de perdas superiores ao capital investido.' },
    { id: 'ouro-08', frente: 'Em que horizonte de tempo o ouro costuma mostrar valorização mais relevante?', verso: 'No longo prazo, ao longo de vários anos — no curto prazo, o preço pode ficar estagnado ou até cair por períodos prolongados.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é a forma mais prática e líquida de investir em ouro para a maioria das pessoas no Brasil?',
      alternativas: ['Joias de investimento', 'ETF de ouro negociado na B3', 'Ouro físico guardado em casa', 'Contratos futuros alavancados'],
      correta: 1,
      explicacao: 'ETFs de ouro na B3 oferecem exposição ao preço do metal com alta liquidez, custódia institucional e taxa de administração relativamente baixa, sem exigir guarda física — por isso são a opção mais prática para a maioria dos investidores.'
    },
    {
      pergunta: 'Por que comprar ouro físico sem nota fiscal é considerado o erro mais caro do tema?',
      alternativas: [
        'Porque é ilegal possuir ouro físico no Brasil',
        'Porque expõe a fraude de pureza e dificulta a revenda pelo preço justo no futuro',
        'Porque ouro sem nota fiscal não pode ser declarado no Imposto de Renda',
        'Porque o Banco Central proíbe esse tipo de compra'
      ],
      correta: 1,
      explicacao: 'Sem nota fiscal e certificado de procedência, não há garantia da pureza do metal, e a revenda futura tende a sofrer deságio significativo por falta de documentação comprobatória.'
    },
    {
      pergunta: 'Por que joias de "investimento" são consideradas uma forma ineficiente de investir em ouro?',
      alternativas: [
        'Porque joias não contêm ouro de verdade',
        'Porque o ágio de fabricação embutido reduz significativamente a eficiência como investimento em ouro puro',
        'Porque joias não podem ser vendidas legalmente',
        'Porque só é possível comprar joias no exterior'
      ],
      correta: 1,
      explicacao: 'O custo de fabricação (mão de obra, design, marca) fica embutido no preço da joia, o que faz dela funcionar mais como bem de consumo com valor residual do que como investimento eficiente em ouro puro.'
    },
    {
      pergunta: 'Qual custo é tipicamente menor ao investir em ouro via ETF, comparado a ouro físico guardado por conta própria?',
      alternativas: [
        'Custo de armazenagem e seguro',
        'Imposto de Renda sobre o ganho de capital',
        'Taxa de corretagem para comprar ações',
        'Custo de transporte do ouro'
      ],
      correta: 0,
      explicacao: 'ETFs de ouro têm custódia institucional incluída na taxa de administração, eliminando a necessidade de armazenagem própria e seguro, custos que se acumulam significativamente ao longo dos anos em ouro físico.'
    },
    {
      pergunta: 'Qual é o papel esperado do ouro dentro de uma carteira diversificada?',
      alternativas: [
        'Ser o núcleo principal da carteira, com a maior parte do patrimônio',
        'Proteção complementar, geralmente com baixa correlação com ações',
        'Substituir completamente a reserva de emergência',
        'Gerar o maior retorno possível no curto prazo'
      ],
      correta: 1,
      explicacao: 'O ouro costuma ter baixa correlação com ativos de risco como ações, funcionando como proteção complementar numa carteira diversificada — não como o componente principal do patrimônio.'
    },
    {
      pergunta: 'Quem deveria considerar operar contratos futuros de ouro na B3?',
      alternativas: [
        'Qualquer pessoa que queira exposição simples ao preço do ouro',
        'Apenas investidores sofisticados que entendem de alavancagem e seus riscos',
        'Apenas quem já possui ouro físico em casa',
        'Investidores iniciantes buscando reserva de emergência'
      ],
      correta: 1,
      explicacao: 'Contratos futuros envolvem alavancagem, que pode ampliar perdas além do capital investido inicialmente — por isso são adequados apenas a investidores que já entendem esse tipo de risco em profundidade.'
    }
  ],

  faq: [
    { pergunta: 'ETF de ouro paga Imposto de Renda sobre o rendimento?', resposta: 'Sim, ETFs de ouro seguem a tributação de renda variável: 15% sobre o ganho de capital na venda, sem isenção de faixa mensal como ocorre com ações — é importante consultar a regra vigente ao declarar.' },
    { pergunta: 'Vale mais a pena comprar ouro físico ou ETF de ouro?', resposta: 'Para a maioria das pessoas que buscam apenas exposição ao preço do ouro como proteção de carteira, o ETF costuma ser mais eficiente por ter custos menores e mais liquidez. Ouro físico faz sentido para quem tem motivo específico de querer posse direta do metal.' },
    { pergunta: 'Onde é seguro comprar ouro físico no Brasil?', resposta: 'Instituições financeiras reconhecidas e revendedores autorizados, sempre exigindo nota fiscal e certificado de pureza de refinarias reconhecidas — evite vendedores informais ou ofertas sem documentação, mesmo que o preço pareça atrativo.' },
    { pergunta: 'O preço do ouro sempre sobe em momentos de crise?', resposta: 'Historicamente o ouro tende a se valorizar ou se manter estável em muitos momentos de crise e incerteza, funcionando como proteção, mas isso não é garantido em todo cenário — o preço também pode ficar estagnado por períodos prolongados.' },
    { pergunta: 'Quanto do meu patrimônio deveria estar em ouro?', resposta: 'Não existe um percentual universal correto — a maioria das estratégias de diversificação trata o ouro como uma fração pequena e complementar da carteira, não como o componente principal, mas o valor exato depende dos seus objetivos e tolerância a risco.' },
    { pergunta: 'É possível perder dinheiro investindo em ouro?', resposta: 'Sim. Como qualquer ativo com preço flutuante, o ouro pode desvalorizar no curto e médio prazo, além de custos como armazenagem (no caso físico) e taxa de administração (no caso de ETF) reduzirem o retorno líquido ao longo do tempo.' }
  ]
}
