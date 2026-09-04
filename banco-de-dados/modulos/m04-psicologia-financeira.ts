import type { Modulo } from '@/types'

export const psicologiaFinanceira: Modulo = {
  id: 'psicologia-financeira',
  trilhaId: 'fundamentos',
  numero: 4,
  titulo: 'Psicologia Financeira',
  subtitulo: 'Por que seu cérebro é o maior obstáculo entre você e o dinheiro',
  iconName: 'Brain',
  duracaoMin: 11,

  nivel: 'iniciante',
  objetivoAprendizagem: 'Você vai sair reconhecendo os 5 vieses que mais destroem patrimônio e sabendo criar regras pra neutralizá-los antes de decidir.',
  erroFatal: 'Tomar decisões de investimento no calor do momento — vender em pânico numa queda ou comprar por FOMO numa alta — sem nenhuma regra definida com antecedência.',
  numeroChave: {
    valor: '97%',
    legenda: 'dos operadores de day trade na B3 perdem dinheiro depois de 300 dias operando, segundo estudo da FGV/USP com dados da bolsa — a maioria por decisões emocionais, não por falta de informação'
  },
  glossarioDoModulo: ['viés de ancoragem', 'aversão à perda', 'efeito manada', 'contabilidade mental', 'viés de confirmação', 'excesso de confiança'],
  proximoPasso: { moduloId: 'psicologia-do-dinheiro', motivo: 'Depois de entender os vieses nas decisões de investir, vale entender a raiz emocional mais profunda: sua relação histórica com dinheiro.' },

  aprender: {
    oQueE: 'Psicologia financeira é o campo que estuda como vieses cognitivos e emoções — não cálculos racionais — determinam a maior parte das decisões que as pessoas tomam com dinheiro. Ela explica por que investidores com acesso à mesma informação e à mesma educação formal tomam decisões completamente diferentes, e por que a decisão errada costuma parecer completamente lógica no momento em que é tomada.',
    porQueImporta: 'A maior parte da diferença de retorno entre dois investidores com a mesma carteira não vem de escolher os ativos certos — vem de comportamento: quem vende no pânico, quem compra no topo por ansiedade de ficar de fora, quem troca de estratégia a cada notícia. Estudos de finanças comportamentais mostram que o "gap comportamental" (a diferença entre o retorno do fundo e o retorno que o investidor médio realmente obteve nele, por causa de entradas e saídas mal cronometradas) frequentemente consome vários pontos percentuais de rentabilidade ao ano.',
    naPratica: 'No Brasil isso aparece o tempo todo: gente que vendeu ações de bancos e commodities no fundo do poço em março de 2020 por pânico e não voltou a tempo da recuperação; gente que entrou em criptoativos no topo de 2021 puxada pelo grupo de WhatsApp da família; investidor que segura uma ação perdedora por anos "esperando empatar" (aversão à perda) mas vende rapidinho uma ação que subiu 10% (medo de perder o ganho). O preço "de R$199,90 por R$149,90" no varejo e o "valor justo" que alguém ancora numa ação porque foi o preço que pagou são o mesmo viés de ancoragem em contextos diferentes.',
    passoAPasso: [
      'Escreva sua tese de investimento antes de comprar qualquer ativo, incluindo em que cenário você venderia.',
      'Defina regras automáticas com antecedência — por exemplo, rebalanceamento trimestral por data fixa, não por "sensação de mercado".',
      'Aplique uma regra de espera de 24 a 48 horas antes de qualquer decisão financeira gatilhada por notícia ou emoção forte.',
      'Mantenha um diário de decisões: registre por escrito o motivo de cada compra e venda, para revisar depois se o motivo real bateu com o resultado.',
      'Reduza a frequência de checagem da carteira — checar todo dia aumenta a sensação de perda a cada oscilação e estimula decisões por impulso.',
      'Busque um contraponto externo (um segundo investidor, um consultor, ou simplesmente a régua da sua própria tese escrita) antes de decisões grandes.'
    ],
    errosComuns: [
      'Vender na baixa por pânico e comprar de volta mais caro depois que o mercado já recuperou.',
      'Fazer "média para baixo" (comprar mais de um ativo que caiu) sem nenhuma tese nova, só para baixar o preço médio e aliviar o desconforto psicológico.',
      'Mudar de estratégia de investimento toda vez que vê um amigo ou influenciador ganhando dinheiro com outra abordagem.',
      'Ler só as notícias e análises que confirmam a posição que você já tem (viés de confirmação), ignorando sinais de alerta.',
      'Confundir sorte com habilidade depois de dois ou três acertos seguidos e aumentar o risco de forma desproporcional.',
      'Tratar dinheiro "inesperado" (13º, restituição, bônus) com menos cuidado do que o salário, gastando de forma impulsiva.'
    ],
    comparativo: {
      titulo: 'Investidor reativo vs. investidor com regras',
      linhas: [
        { label: 'Decisão em queda de 20%', valor: 'Reativo: vende em pânico | Com regras: segue plano de rebalanceamento escrito' },
        { label: 'Frequência de checagem da carteira', valor: 'Reativo: várias vezes ao dia | Com regras: revisão mensal agendada' },
        { label: 'Fonte da decisão', valor: 'Reativo: notícia do dia, grupo de WhatsApp | Com regras: tese registrada por escrito' },
        { label: 'Resultado no longo prazo', valor: 'Reativo: compra caro, vende barato | Com regras: captura o retorno médio do ativo' }
      ]
    },
    checklist: [
      'Escreva a tese de cada investimento antes de comprar, com o cenário de saída definido.',
      'Configure um rebalanceamento automático por calendário, não por humor.',
      'Adote a regra das 24-48h para qualquer decisão financeira gatilhada por emoção.',
      'Comece um diário de decisões (pode ser uma nota simples no celular).',
      'Reduza a checagem da carteira para no máximo uma vez por semana.'
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'O livro de Daniel Kahneman explica os dois sistemas de pensamento que competem em toda decisão financeira — o rápido e emocional, e o lento e racional — e é a base teórica por trás de regras como a das 24-48h antes de decidir.',
    },
    naoConfundirCom: [
      { moduloId: 'psicologia-do-dinheiro', diferenca: 'Este módulo foca nos vieses cognitivos que distorcem decisões de investir; o outro foca na relação emocional de fundo com dinheiro, formada desde a infância.' }
    ]
  },

  mapaMental: {
    label: 'Psicologia Financeira',
    subtitulo: 'Os vieses que sabotam suas decisões com dinheiro',
    ramos: [
      {
        id: 'vieses-cognitivos',
        label: 'Vieses Cognitivos',
        cor: '#EF4444',
        resumo: 'Distorções automáticas do raciocínio na hora de decidir',
        filhos: [
          { label: 'Aversão à perda', desc: 'A dor de perder R$100 pesa mais que a alegria de ganhar R$100' },
          { label: 'Ancoragem', desc: 'Fixar-se no preço de compra em vez do valor atual do ativo' },
          { label: 'Excesso de confiança', desc: 'Superestimar a própria capacidade de prever o mercado' }
        ]
      },
      {
        id: 'vieses-sociais',
        label: 'Vieses Sociais',
        cor: '#F59E0B',
        resumo: 'Distorções vindas da comparação com outras pessoas',
        filhos: [
          { label: 'Efeito manada', desc: 'Comprar porque todo mundo está comprando, sem tese própria' },
          { label: 'FOMO', desc: 'Medo de ficar de fora de um ganho que os outros parecem estar tendo' },
          { label: 'Comparação social', desc: 'Mudar de estratégia ao ver o retorno de terceiros nas redes' }
        ]
      },
      {
        id: 'contabilidade-mental',
        label: 'Contabilidade Mental',
        cor: '#8B5CF6',
        resumo: 'Tratar o mesmo real de formas diferentes dependendo da origem',
        filhos: [
          { label: 'Dinheiro "extra"', desc: '13º e restituição são gastos com menos cuidado que o salário' },
          { label: 'Efeito custo afundado', desc: 'Manter algo ruim só porque já se investiu tempo ou dinheiro nele' },
          { label: 'Orçamento por categoria mental', desc: 'Cortar o lazer mas não tocar num gasto fixo que poderia ser renegociado' }
        ]
      },
      {
        id: 'estrategias-defesa',
        label: 'Estratégias de Defesa',
        cor: '#10B981',
        resumo: 'Como neutralizar os vieses na prática',
        filhos: [
          { label: 'Regras automáticas', desc: 'Rebalanceamento e aportes programados, tirando a decisão do impulso' },
          { label: 'Diário de decisões', desc: 'Registrar o motivo real de cada movimento pra revisar depois' },
          { label: 'Regra das 24-48h', desc: 'Esperar antes de qualquer decisão gatilhada por emoção forte' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Como vieses são sobre comportamento, não sobre matemática, aqui você não calcula — você decide diante de cenários reais e vê a consequência de cada escolha.',
    passos: [
      'Leia o cenário como se estivesse vivendo aquele momento de mercado agora.',
      'Escolha a opção que você realmente tomaria, não a "resposta certa" óbvia.',
      'Veja o resultado explicado de cada escolha e compare com o seu instinto.'
    ],
    exemploGuiado: 'Cenário: você comprou uma ação a R$30. Ela caiu para R$24 (-20%) numa semana, sem nenhuma notícia nova sobre a empresa — só o mercado em geral caiu. Reação reativa: vender para "estancar a perda", mesmo sem nada ter mudado na tese original — isso é aversão à perda dominando a decisão. Reação com regra: revisar a tese escrita no momento da compra; se os fundamentos não mudaram, a regra diz para manter ou até aportar mais, e não decidir pelo desconforto da tela vermelha.',
    cenarioGuiado: [
      {
        pergunta: 'Uma ação sua caiu 20% numa semana sem nenhuma notícia nova sobre a empresa. O que você faz?',
        opcoes: [
          { texto: 'Vendo tudo agora para evitar perder mais', resultado: 'Aversão à perda em ação: você realiza o prejuízo justamente no momento de maior desconforto, e historicamente é comum vender perto do fundo e perder a recuperação.' },
          { texto: 'Compro mais só para baixar meu preço médio', resultado: 'Sem uma tese nova que justifique, isso é "pegar faca caindo" só pelo conforto psicológico do preço médio — risco de dobrar a aposta numa tese que pode estar errada.' },
          { texto: 'Reviso minha tese original por escrito e decido com base nela', resultado: 'Essa é a resposta mais robusta: separa o preço (emocional) da tese (racional) e evita decisão por impulso.' }
        ]
      },
      {
        pergunta: 'Todo o seu grupo de amigos está comprando um ativo que subiu 300% no último mês. Você:',
        opcoes: [
          { texto: 'Entro agora, ninguém quer ficar de fora de um ganho desses', resultado: 'Clássico efeito manada com FOMO — comprar no topo de um movimento sem tese própria costuma coincidir com o momento de maior risco.' },
          { texto: 'Pesquiso os fundamentos antes de decidir qualquer coisa', resultado: 'Resposta mais sólida: separa o hype social da análise, mesmo que a decisão final seja entrar.' },
          { texto: 'Ignoro completamente por ser modismo', resultado: 'Evita o viés de manada, mas descartar sem analisar também é uma decisão sem base — o ideal é analisar antes de decidir, não reagir ao extremo oposto.' }
        ]
      },
      {
        pergunta: 'Você recebeu uma restituição do IR de R$3.000. O que costuma acontecer com esse tipo de dinheiro?',
        opcoes: [
          { texto: 'Gasto sem muito planejamento, já que é dinheiro "extra"', resultado: 'Isso é contabilidade mental: o mesmo real do salário seria tratado com mais cuidado. Dinheiro é fungível — não deveria haver essa distinção.' },
          { texto: 'Trato como qualquer outro real e sigo meu plano financeiro', resultado: 'Resposta mais robusta: reconhecer que R$3.000 tem o mesmo poder de compra independente da origem evita decisões impulsivas.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'psi-01', frente: 'O que é aversão à perda?', verso: 'A tendência de sentir a dor de uma perda com mais intensidade do que o prazer de um ganho equivalente — o que leva a vender cedo demais os ganhos e segurar longo demais as perdas.' },
    { id: 'psi-02', frente: 'O que é viés de ancoragem em investimentos?', verso: 'Fixar-se num número de referência (geralmente o preço de compra) e usar esse número, em vez do valor real atual do ativo, para decidir.' },
    { id: 'psi-03', frente: 'O que é efeito manada?', verso: 'Tomar decisões de investimento copiando o comportamento do grupo, sem uma tese própria por trás.' },
    { id: 'psi-04', frente: 'O que é contabilidade mental?', verso: 'Tratar mentalmente o mesmo dinheiro de forma diferente dependendo da origem (salário vs. 13º, por exemplo), mesmo que o valor tenha o mesmo poder de compra.' },
    { id: 'psi-05', frente: 'O que é viés de confirmação?', verso: 'A tendência de buscar e valorizar apenas informações que confirmam uma decisão já tomada, ignorando sinais contrários.' },
    { id: 'psi-06', frente: 'O que é FOMO em investimentos?', verso: 'Fear of missing out — o medo de ficar de fora de um ganho que outras pessoas parecem estar tendo, o que empurra decisões de compra no pior momento (no topo).' },
    { id: 'psi-07', frente: 'Qual a principal defesa contra vieses comportamentais?', verso: 'Regras definidas com antecedência e por escrito (tese de investimento, rebalanceamento programado), tirando a decisão do calor do momento.' },
    { id: 'psi-08', frente: 'O que mostra o "gap comportamental"?', verso: 'A diferença entre o retorno de um fundo/ativo e o retorno que o investidor médio realmente teve nele, causada por entradas e saídas mal cronometradas.' },
    { id: 'psi-09', frente: 'Por que checar a carteira todo dia é ruim?', verso: 'Aumenta a exposição emocional a oscilações de curto prazo, o que estimula decisões por impulso baseadas em ruído, não em fundamento.' },
    { id: 'psi-10', frente: 'O que é a regra das 24-48h?', verso: 'Um período mínimo de espera antes de tomar qualquer decisão financeira gatilhada por uma emoção forte (pânico, euforia), para separar impulso de análise.' }
  ],

  quiz: [
    {
      pergunta: 'Investidor A compra uma ação a R$50 e ela cai para R$35. Ele se recusa a vender "até empatar", mesmo sem nenhuma tese nova. Qual viés explica esse comportamento?',
      alternativas: ['Efeito manada', 'Aversão à perda', 'Viés de confirmação', 'Excesso de confiança'],
      correta: 1,
      explicacao: 'É aversão à perda: a dor de realizar o prejuízo pesa tanto que a pessoa prefere manter uma posição ruim na esperança de "empatar", em vez de reavaliar racionalmente a tese. Não é efeito manada (não envolve grupo), nem viés de confirmação (não é sobre buscar informação), nem excesso de confiança (não envolve previsão de mercado).'
    },
    {
      pergunta: 'Qual das alternativas é um exemplo de contabilidade mental?',
      alternativas: [
        'Vender uma ação só porque todo mundo está vendendo',
        'Gastar a restituição do IR sem planejamento, mas guardar o salário com cuidado',
        'Ler só notícias que confirmam sua aposta numa ação',
        'Superestimar sua capacidade de prever o topo do mercado'
      ],
      correta: 1,
      explicacao: 'Contabilidade mental é tratar o mesmo dinheiro de formas diferentes conforme sua origem — a restituição é gasta com menos cuidado que o salário, mesmo tendo o mesmo poder de compra. As outras opções descrevem efeito manada, viés de confirmação e excesso de confiança, respectivamente.'
    },
    {
      pergunta: 'Segundo estudos com dados da B3, qual é aproximadamente o resultado da maioria dos day traders que operam por um período prolongado?',
      alternativas: ['A maioria lucra de forma consistente', 'A maioria perde dinheiro', 'O resultado é sempre neutro', 'Depende só da sorte, sem padrão'],
      correta: 1,
      explicacao: 'Estudos acadêmicos com dados da bolsa brasileira mostram que a grande maioria dos operadores de day trade perde dinheiro depois de meses operando — em boa parte por decisões emocionais e excesso de confiança, não por falta de acesso à informação.'
    },
    {
      pergunta: 'Qual estratégia reduz melhor o impacto de vieses comportamentais nas decisões de investimento?',
      alternativas: [
        'Checar a carteira várias vezes ao dia para reagir rápido',
        'Definir regras de rebalanceamento e tese por escrito, com antecedência',
        'Seguir o que a maioria dos investidores está fazendo',
        'Confiar na intuição desenvolvida com a experiência'
      ],
      correta: 1,
      explicacao: 'Regras definidas com antecedência tiram a decisão do calor do momento, que é exatamente onde os vieses agem com mais força. Checar a carteira com frequência, seguir a maioria ou confiar só na intuição tendem a amplificar os vieses, não reduzi-los.'
    },
    {
      pergunta: 'O que caracteriza o viés de confirmação num investidor?',
      alternativas: [
        'Comprar um ativo só porque o preço caiu bastante',
        'Buscar e valorizar apenas informações que confirmam uma posição já tomada',
        'Vender rapidamente qualquer ativo que suba de preço',
        'Comparar seu retorno com o de outros investidores'
      ],
      correta: 1,
      explicacao: 'Viés de confirmação é a tendência de dar mais peso a informações que confirmam o que você já acredita (ou já decidiu), ignorando sinais contrários. As outras alternativas descrevem outros comportamentos, não esse viés específico.'
    },
    {
      pergunta: 'Por que o preço de compra de um ativo não deveria ser o critério principal para decidir vendê-lo ou não?',
      alternativas: [
        'Porque o preço de compra é sempre o valor justo do ativo',
        'Porque isso é ancoragem: o mercado não sabe nem se importa com o preço que você pagou',
        'Porque vender sempre é melhor que manter',
        'Porque o preço de compra determina o imposto devido'
      ],
      correta: 1,
      explicacao: 'O mercado precifica o ativo com base em fundamentos e expectativas futuras, não no preço que um investidor específico pagou. Ancorar a decisão no preço de compra ("só vendo quando empatar") é um viés, não uma estratégia racional.'
    },
    {
      pergunta: 'O que é o "gap comportamental" em finanças comportamentais?',
      alternativas: [
        'A diferença entre o retorno do fundo e o retorno real do investidor, causada por timing ruim de entrada e saída',
        'A diferença entre a taxa Selic e a inflação',
        'O intervalo mínimo de tempo para resgatar um investimento',
        'A diferença de imposto entre renda fixa e renda variável'
      ],
      correta: 0,
      explicacao: 'O gap comportamental mede quanto do retorno "de papel" de um fundo ou ativo o investidor médio efetivamente capturou, descontando as perdas causadas por comprar caro (euforia) e vender barato (pânico).'
    }
  ],

  faq: [
    { pergunta: 'Se eu souber teoricamente sobre esses vieses, já estou protegido deles?', resposta: 'Não totalmente — conhecer o viés reduz o impacto, mas não elimina. Os vieses agem de forma automática e emocional, então a defesa real é ter regras escritas e mecanismos automáticos (como rebalanceamento programado), não só "força de vontade" no momento da decisão.' },
    { pergunta: 'É errado vender um ativo que caiu muito?', resposta: 'Não é errado por si só — o problema é vender por pânico, sem reavaliar a tese. Se os fundamentos do ativo pioraram de verdade, vender pode ser a decisão correta. O erro é a ausência de análise, não a venda em si.' },
    { pergunta: 'Checar minha carteira com frequência não me ajuda a agir mais rápido diante de problemas reais?', resposta: 'Para a maioria dos investidores de longo prazo, não — a frequência de checagem tende a aumentar ansiedade e decisões por impulso muito mais do que ajuda a identificar problemas reais, que geralmente aparecem em relatórios trimestrais, não em oscilações diárias de preço.' },
    { pergunta: 'Como eu escrevo uma "tese de investimento" na prática?', resposta: 'Em poucas frases: por que você está comprando esse ativo, o que precisaria acontecer para você vender, e qual o horizonte de tempo esperado. Isso vira sua régua objetiva quando a emoção do mercado tentar te fazer decidir de outro jeito.' },
    { pergunta: 'Investidores profissionais também sofrem desses vieses?', resposta: 'Sim — os vieses são cognitivos, não uma questão de falta de conhecimento técnico. A diferença é que gestores profissionais costumam ter processos e comitês que forçam disciplina, o que reduz (mas não elimina) o impacto dos vieses individuais.' },
    { pergunta: 'Vale a pena seguir o que investidores famosos estão comprando?', resposta: 'Copiar uma posição sem entender a tese por trás é efeito manada, não estratégia. Mesmo investidores renomados erram, e o contexto (horizonte de tempo, tamanho de capital, tolerância a risco) de cada um é diferente do seu.' }
  ]
}
