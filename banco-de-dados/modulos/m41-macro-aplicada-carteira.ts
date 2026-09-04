// m08-macro-aplicada-carteira.ts
import { Modulo } from '@/types'

export const macroAplicadaCarteira: Modulo = {
  id: 'macro-aplicada-carteira',
  trilhaId: 'estrategia-gestao',
  numero: 8,
  titulo: 'Macroeconomia Aplicada à Carteira',
  subtitulo: 'Como transformar Selic, IPCA e curva de juros em decisão de compra',
  iconName: 'Landmark',
  duracaoMin: 13,

  nivel: 'avancado',
  preRequisitos: ['renda-fixa-avancada', 'construcao-patrimonio'],
  objetivoAprendizagem:
    'Você vai sair sabendo ler quatro indicadores e decidir, com critério, se compra pós-fixado, prefixado ou IPCA+ neste momento do ciclo.',
  erroFatal:
    'Comprar Tesouro Prefixado ou IPCA+ de vencimento longo no meio de um ciclo de alta de juros, precisar do dinheiro antes do vencimento e realizar prejuízo na marcação a mercado. Renda fixa longa vendida no meio do caminho é renda variável.',
  numeroChave: {
    valor: '8 dias por ano',
    legenda:
      'O Copom se reúne 8 vezes ao ano. A taxa definida nesses 8 dias determina o retorno de praticamente toda a renda fixa brasileira e o custo de capital da bolsa inteira.',
  },
  glossarioDoModulo: [
    'Juro real ex-ante',
    'Curva de juros (estrutura a termo)',
    'Boletim Focus',
    'Duration',
    'Marcação a mercado',
    'Prêmio de risco',
    'Núcleos de inflação',
    'Dominância fiscal',
  ],
  proximoPasso: {
    moduloId: 'renda-fixa-avancada',
    motivo:
      'Depois de saber ler o ciclo, o passo seguinte é montar a estrutura de vencimentos que aproveita esse ciclo sem depender de vender no meio do caminho.',
  },

  aprender: {
    oQueE:
      'Macroeconomia aplicada é o uso de um conjunto pequeno de variáveis (Selic, inflação, câmbio e curva de juros futuros) para escolher indexador e prazo dos seus investimentos. Não é previsão de economia, é leitura de preço. A pergunta que ela responde não é o que vai acontecer, e sim o que o mercado já está cobrando para assumir cada risco.',
    porQueImporta:
      'No Brasil, a diferença entre acertar e errar o indexador supera com folga qualquer ganho obtido escolhendo o banco emissor. Um Tesouro IPCA+ 2045 pode cair 11% em um mês só porque o juro real de mercado subiu 1 ponto percentual, sem nenhum default envolvido. Quem compra sem entender isso descobre a duration olhando o extrato.',
    naPratica:
      'O Copom se reúne 8 vezes por ano e anuncia a Selic na quarta-feira, com ata na terça seguinte. A meta de inflação é contínua, de 3% ao ano, com banda de 1,5 ponto percentual para cima e para baixo. O IBGE divulga o IPCA por volta do dia 10 de cada mês. Toda segunda-feira o Banco Central publica o Boletim Focus com a mediana das projeções de mercado. A B3 negocia contratos de DI futuro que formam a curva de juros: é ali, e não no Focus, que está o preço que o mercado realmente paga. Quando a curva já embute queda de juros maior do que a que vai acontecer, comprar prefixado é caro mesmo com a Selic caindo.',
    passoAPasso: [
      'Toda segunda-feira, abra o Boletim Focus e anote a mediana de Selic e de IPCA para o ano corrente e para o seguinte.',
      'Compare essas medianas com a curva de DI futuro da B3: se a curva embute juro menor que o Focus, o prefixado já está caro.',
      'Calcule o juro real ex-ante pela fórmula (1 + Selic) dividido por (1 + IPCA esperado), menos 1. Esse é o número que importa, não a Selic nominal.',
      'Classifique o momento em uma de quatro fases: aperto em curso, topo do ciclo, corte em curso, fundo do ciclo.',
      'Defina o indexador dominante da carteira conforme a fase, usando a tabela comparativa deste módulo.',
      'Defina a duration máxima que você aceita: prazo longo só entra com dinheiro que você consegue carregar até o vencimento.',
      'Revise a alocação uma vez por trimestre, depois do Relatório de Política Monetária, e não a cada manchete.',
    ],
    errosComuns: [
      'Confundir juro nominal alto com juro real alto: Selic de 15% com inflação de 5% entrega menos juro real do que Selic de 9% com inflação de 2%.',
      'Comprar prefixado longo porque acredita que os juros vão cair, sem checar quanta queda a curva já precificou.',
      'Reagir ao IPCA cheio de um único mês, ignorando os núcleos, a difusão e a média móvel de três meses.',
      'Tratar dólar como proteção de curto prazo, quando ele é seguro de cauda e costuma andar contra a carteira justamente nos meses calmos.',
      'Mudar a carteira inteira a cada reunião do Copom, pagando IR na alíquota mais alta da tabela regressiva por girar antes de 180 dias.',
      'Ignorar que o IR da renda fixa incide sobre o ganho nominal, o que faz a inflação ser tributada junto com o juro real.',
    ],
    comparativo: {
      titulo: 'Qual indexador domina em cada fase do ciclo',
      linhas: [
        {
          label: 'Aperto em curso (Selic subindo)',
          valor:
            'Pós-fixado (Tesouro Selic, CDB de liquidez diária). Prefixado e IPCA+ longos sofrem marcação a mercado negativa.',
        },
        {
          label: 'Topo do ciclo (Selic parada no pico)',
          valor:
            'Janela de compra de prefixado e IPCA+ longos. É onde o prêmio costuma estar maior, e o risco é errar o timing por alguns meses, não por anos.',
        },
        {
          label: 'Corte em curso (Selic caindo)',
          valor:
            'Quem já comprou prefixado e IPCA+ ganha na marcação. Quem compra agora paga caro: a curva já embutiu boa parte do corte.',
        },
        {
          label: 'Fundo do ciclo (Selic baixa e estável)',
          valor:
            'Pós-fixado rende pouco. Aumenta o peso de bolsa, FIIs e crédito privado, e o juro real disponível no IPCA+ tende a ser o menor da década.',
        },
        {
          label: 'Choque cambial com fiscal em deterioração',
          valor:
            'IPCA+ curto e médio protege melhor que prefixado. Dólar e ativos globais funcionam como seguro, não como aposta.',
        },
      ],
    },
    checklist: [
      'Salve nos favoritos o Boletim Focus, o calendário do Copom e a página de curva de juros da B3.',
      'Escreva no papel qual fase do ciclo você acha que estamos e por quê, em duas linhas.',
      'Calcule o juro real ex-ante de hoje e compare com o IPCA+ que o Tesouro Direto está oferecendo.',
      'Liste cada título de renda fixa da sua carteira com indexador, vencimento e se você consegue carregar até o fim.',
      'Defina uma regra escrita de rebalanceamento trimestral e a data das quatro revisões do ano.',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A prática de rebalancear por calendário fixo, não por reação a notícia, é um dos pilares Boglehead — usar o cenário macro para calibrar título e prazo, mas seguir uma data de revisão trimestral, é essa mesma disciplina em ação.',
    },
    naoConfundirCom: [
      {
        moduloId: 'renda-fixa-avancada',
        diferenca:
          'Macro decide qual indexador e qual prazo comprar; renda fixa avançada decide como estruturar os vencimentos para gerar renda mensal.',
      },
      {
        moduloId: 'construcao-patrimonio',
        diferenca:
          'Macro cuida de como alocar o que você já tem; construção de patrimônio cuida de quanto e com que frequência você aporta.',
      },
    ],
  },

  mapaMental: {
    label: 'Macroeconomia Aplicada à Carteira',
    subtitulo: 'Quatro variáveis, quatro fases, uma decisão',
    ramos: [
      {
        id: 'variaveis',
        label: 'As quatro variáveis',
        cor: '#2563EB',
        resumo: 'Tudo que importa para a carteira cabe em quatro números acompanhados semanalmente.',
        filhos: [
          {
            label: 'Selic',
            desc: 'Taxa básica definida pelo Copom, âncora do CDI e do custo de capital de toda a economia.',
            netos: [
              { label: 'Selic meta', desc: 'A taxa anunciada na reunião, válida até a próxima decisão.' },
              { label: 'CDI', desc: 'Roda historicamente cerca de 0,10 ponto percentual abaixo da Selic.' },
              { label: 'Selic esperada', desc: 'O que a curva de DI futuro embute para os próximos 12 e 24 meses.' },
            ],
          },
          {
            label: 'IPCA',
            desc: 'Índice oficial de inflação do IBGE, referência da meta e dos títulos indexados.',
            netos: [
              { label: 'Índice cheio', desc: 'Número da manchete, contaminado por itens voláteis como alimentos e combustíveis.' },
              { label: 'Núcleos', desc: 'Medidas que excluem itens voláteis e mostram a tendência real de preços.' },
              { label: 'Difusão', desc: 'Percentual de itens da cesta que subiram no mês, sinal de inflação espalhada.' },
            ],
          },
          {
            label: 'Câmbio',
            desc: 'Preço do dólar afeta inflação de bens comercializáveis com defasagem de dois a três trimestres.',
          },
          {
            label: 'Curva de juros',
            desc: 'A estrutura a termo formada pelos contratos de DI futuro, o preço que o mercado realmente cobra.',
          },
        ],
      },
      {
        id: 'ciclo',
        label: 'As quatro fases do ciclo',
        cor: '#16A34A',
        resumo: 'A economia oscila entre aperto e afrouxamento monetário, e cada fase premia um indexador diferente.',
        filhos: [
          { label: 'Aperto', desc: 'Copom sobe a Selic para conter inflação; renda fixa longa se desvaloriza.' },
          { label: 'Topo', desc: 'Selic parada no pico, prêmios altos, melhor janela para travar juro real longo.' },
          { label: 'Corte', desc: 'Selic caindo, prefixado e IPCA+ comprados antes se valorizam na marcação.' },
          { label: 'Fundo', desc: 'Juro baixo e estável, renda variável e crédito privado ganham espaço relativo.' },
        ],
      },
      {
        id: 'traducao',
        label: 'Tradução para a carteira',
        cor: '#F59E0B',
        resumo: 'Cada classe de ativo responde a um tipo específico de choque macro.',
        filhos: [
          { label: 'Pós-fixado', desc: 'Acompanha a Selic no dia a dia, não sofre marcação relevante, é caixa de verdade.' },
          { label: 'Prefixado', desc: 'Aposta explícita de que os juros vão cair mais do que a curva já embute.' },
          {
            label: 'IPCA+',
            desc: 'Trava um juro acima da inflação, com marcação a mercado proporcional à duration.',
            netos: [
              { label: 'Curto (até 2029)', desc: 'Oscila pouco, serve para objetivos de médio prazo.' },
              { label: 'Longo (2045 e além)', desc: 'Duration alta: 1 ponto percentual de juro real move o preço em cerca de 11%.' },
            ],
          },
          { label: 'Bolsa', desc: 'Sofre com juro alto por dois canais: desconto de fluxo futuro e concorrência da renda fixa.' },
          { label: 'Dólar e ativos globais', desc: 'Descorrelação estrutural, funcionam como seguro contra risco local.' },
        ],
      },
      {
        id: 'fontes',
        label: 'Fontes e calendário',
        cor: '#9333EA',
        resumo: 'Informação de qualidade é gratuita e pública no Brasil, o que falta é rotina de leitura.',
        filhos: [
          { label: 'Boletim Focus', desc: 'Publicado toda segunda-feira pelo Banco Central com a mediana das projeções de mercado.' },
          { label: 'Ata do Copom', desc: 'Sai na terça seguinte à decisão e explica o balanço de riscos que guiou o voto.' },
          { label: 'IPCA do IBGE', desc: 'Divulgado por volta do dia 10, com IPCA-15 como prévia no meio do mês.' },
          { label: 'Curva DI da B3', desc: 'Mostra a taxa negociada para cada vencimento, a verdadeira expectativa com dinheiro em jogo.' },
          { label: 'Relatório de Política Monetária', desc: 'Publicação trimestral do BC com as projeções condicionais de inflação.' },
        ],
      },
      {
        id: 'armadilhas',
        label: 'Armadilhas do caso brasileiro',
        cor: '#DC2626',
        resumo: 'O Brasil tem particularidades que quebram o manual importado de macro.',
        filhos: [
          { label: 'Dominância fiscal', desc: 'Quando a dívida cresce, subir juros pode piorar a inflação em vez de conter.' },
          { label: 'IR sobre ganho nominal', desc: 'A inflação embutida no rendimento é tributada, o que reduz o juro real líquido.' },
          { label: 'Marcação a mercado', desc: 'Título longo vendido antes do vencimento pode dar prejuízo mesmo sem calote.' },
          { label: 'Prêmio de risco', desc: 'Parte do juro alto remunera risco fiscal, não expectativa de inflação.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro:
      'Aqui você não vai calcular um número, vai treinar decisão. Cada cenário abaixo descreve uma configuração macro plausível para o Brasil e pede uma escolha de alocação. O objetivo é perceber que quase toda decisão de renda fixa é uma comparação entre o que você acha e o que o preço já embute.',
    passos: [
      'Leia o cenário sem olhar as opções e escreva em uma frase o que você faria.',
      'Escolha a opção que mais se aproxima da sua decisão.',
      'Leia o resultado de todas as opções, inclusive das que você descartou.',
      'Anote qual variável você tinha ignorado: em geral é a curva, não a Selic.',
    ],
    exemploGuiado:
      'Suponha Selic em 15% ao ano e IPCA esperado para os próximos 12 meses em 4,5%. O juro real ex-ante é (1,15 dividido por 1,045) menos 1, ou seja, aproximadamente 10% ao ano. Agora aplique o imposto: em um título carregado por mais de 720 dias, a alíquota é de 15% sobre o ganho nominal. Sobre 15% de rendimento nominal, o IR consome 2,25 pontos percentuais, deixando 12,75% líquidos. Descontando a inflação de 4,5%, o juro real líquido cai para cerca de 7,9% ao ano. Compare esse número com o Tesouro IPCA+ do mesmo prazo: se ele estiver oferecendo IPCA mais 7% bruto, o líquido dele será menor que os 7,9% do pós-fixado no primeiro ano, mas ele trava esse juro real por uma década, enquanto o pós-fixado só existe enquanto a Selic estiver alta. A decisão, portanto, não é qual rende mais hoje, e sim por quanto tempo você quer garantir esse juro real.',
    cenarioGuiado: [
      {
        pergunta:
          'O Copom subiu a Selic pela quinta reunião seguida e sinalizou pelo menos mais uma alta. A curva de DI embute Selic caindo forte a partir do ano que vem. Você tem R$ 50 mil para aplicar com horizonte de 3 anos. O que faz?',
        opcoes: [
          {
            texto: 'Tudo em Tesouro Prefixado 2029, para travar a taxa alta antes da queda',
            resultado:
              'Risco alto. A taxa parece alta em termos absolutos, mas a curva já embutiu a queda futura, então você está comprando o consenso, não um prêmio. Se o ciclo de aperto se estender, o título se desvaloriza na marcação e você só recupera carregando até 2029.',
          },
          {
            texto: 'Tudo em Tesouro Selic, esperando o topo do ciclo',
            resultado:
              'Seguro e coerente com a fase, mas com custo. Você captura a Selic alta enquanto ela durar e não sofre marcação. O risco é o oposto: quando o corte começar, sua rentabilidade cai junto e a janela de travar juro real longo terá passado.',
          },
          {
            texto: 'Metade em Tesouro Selic e metade em Tesouro IPCA+ 2029',
            resultado:
              'Decisão mais robusta. Você mantém liquidez e captura a Selic alta com metade, e com a outra metade trava um juro real por três anos, protegido caso a inflação surpreenda para cima. É a alocação que erra menos nos dois desfechos possíveis.',
          },
        ],
      },
      {
        pergunta:
          'O IPCA cheio veio em 0,80% no mês, bem acima do esperado, mas os núcleos vieram estáveis e a alta se concentrou em alimentos e passagens aéreas. Sua carteira tem 40% em Tesouro IPCA+ 2045. O que faz?',
        opcoes: [
          {
            texto: 'Aumenta a posição em IPCA+ 2045, já que a inflação surpreendeu',
            resultado:
              'Reação equivocada. O choque foi em itens voláteis, não em inflação disseminada. Além disso, o IPCA+ 2045 tem duration alta: ele reage muito mais a mudanças na expectativa de juro real do que ao IPCA de um mês específico.',
          },
          {
            texto: 'Não mexe e espera a média móvel de três meses dos núcleos',
            resultado:
              'Correto. Um mês não é tendência, e os núcleos são justamente a ferramenta desenhada para separar ruído de sinal. Rebalanceamento por manchete é a forma mais cara de administrar carteira, porque paga corretagem e IR sem melhorar a decisão.',
          },
          {
            texto: 'Vende tudo e vai para pós-fixado até a poeira baixar',
            resultado:
              'Custo alto sem benefício. Vender IPCA+ longo em um momento de estresse costuma realizar exatamente o prejuízo de marcação que o carregamento até o vencimento evitaria, e ainda gera IR sobre o ganho acumulado.',
          },
        ],
      },
      {
        pergunta:
          'O juro real ex-ante está em torno de 4% ao ano, o mais baixo dos últimos dez anos, e o Tesouro IPCA+ longo oferece IPCA mais 4,2%. Você está montando a carteira de aposentadoria. O que faz?',
        opcoes: [
          {
            texto: 'Compra IPCA+ longo assim mesmo, porque é o único que garante juro real',
            resultado:
              'Defensável, mas caro. Você trava um juro real historicamente baixo por décadas. Se o prêmio voltar aos patamares médios, você fica com um ativo que rende pouco e ainda oscila muito na marcação.',
          },
          {
            texto: 'Reduz renda fixa longa e aumenta bolsa, FIIs e ativos globais',
            resultado:
              'Coerente com a fase de fundo de ciclo. Com juro real baixo, o custo de oportunidade de assumir risco cai e ativos de crescimento tendem a ser reprecificados para cima. Exige, em troca, estômago para volatilidade e horizonte longo de verdade.',
          },
          {
            texto: 'Mantém escada de IPCA+ com prazos curtos e médios, reinvestindo aos poucos',
            resultado:
              'Solução equilibrada. Prazos curtos sofrem pouca marcação e vencem em intervalos regulares, o que permite recomprar juro real mais alto se o prêmio voltar, sem depender de acertar o momento exato.',
          },
        ],
      },
    ],
  },

  flashcards: [
    {
      id: 'macro-fc-01',
      frente: 'Qual a fórmula do juro real ex-ante?',
      verso:
        'Divida (1 + taxa nominal esperada) por (1 + inflação esperada) e subtraia 1. Subtrair a inflação da Selic direto é aproximação, e ela erra mais quanto maiores forem os números.',
    },
    {
      id: 'macro-fc-02',
      frente: 'Quantas vezes por ano o Copom se reúne e quando sai a ata?',
      verso: 'Oito reuniões por ano, com decisão na quarta-feira e ata publicada na terça-feira seguinte.',
    },
    {
      id: 'macro-fc-03',
      frente: 'O que é duration e por que ela importa em renda fixa?',
      verso:
        'É o prazo médio ponderado de recebimento dos fluxos do título. Quanto maior a duration, maior a queda de preço para cada ponto percentual de alta na taxa. Um título com duration de 11 anos perde cerca de 11% se a taxa sobe 1 ponto.',
    },
    {
      id: 'macro-fc-04',
      frente: 'Por que o Boletim Focus não substitui a curva de DI futuro?',
      verso:
        'O Focus é opinião declarada de economistas; a curva de DI é preço negociado com dinheiro em risco. Quando os dois divergem, é na curva que está a expectativa que você paga ao comprar um prefixado.',
    },
    {
      id: 'macro-fc-05',
      frente: 'Qual a meta de inflação vigente no Brasil e sua banda?',
      verso:
        'Meta contínua de 3% ao ano, com banda de tolerância de 1,5 ponto percentual para cada lado, ou seja, de 1,5% a 4,5%.',
    },
    {
      id: 'macro-fc-06',
      frente: 'Por que o IR da renda fixa reduz o juro real mais do que parece?',
      verso:
        'Porque a alíquota incide sobre o ganho nominal, que inclui a parte que apenas repõe a inflação. Quanto maior a inflação, maior a fatia do imposto que recai sobre a correção monetária.',
    },
    {
      id: 'macro-fc-07',
      frente: 'O que são núcleos de inflação?',
      verso:
        'Medidas que excluem ou suavizam itens voláteis, como alimentos in natura e combustíveis, para revelar a tendência subjacente dos preços. O Banco Central decide olhando os núcleos, não a manchete.',
    },
    {
      id: 'macro-fc-08',
      frente: 'Em qual fase do ciclo o prefixado longo tende a ser a melhor compra?',
      verso:
        'No topo do ciclo, quando a Selic para de subir e o prêmio embutido na curva está no ponto mais alto. Comprar durante o corte costuma significar pagar por uma queda que o preço já reconheceu.',
    },
    {
      id: 'macro-fc-09',
      frente: 'O que significa dominância fiscal?',
      verso:
        'Situação em que a dívida pública é tão grande que subir juros piora as expectativas de solvência e, em vez de conter a inflação, alimenta desvalorização cambial e mais inflação.',
    },
    {
      id: 'macro-fc-10',
      frente: 'Por que dólar não é bom hedge de curto prazo para uma carteira brasileira?',
      verso:
        'Porque o câmbio responde a fatores globais e ao apetite por risco, não ao seu horizonte. Ele funciona como seguro de cauda, protegendo em crises severas, e costuma render pouco ou negativo nos períodos calmos.',
    },
    {
      id: 'macro-fc-11',
      frente: 'O que é marcação a mercado e quando ela vira prejuízo real?',
      verso:
        'É a atualização diária do preço do título conforme a taxa negociada hoje. A oscilação é apenas contábil enquanto você carrega até o vencimento, e vira prejuízo efetivo no momento em que você vende antes.',
    },
    {
      id: 'macro-fc-12',
      frente: 'Qual a relação entre CDI e Selic?',
      verso:
        'O CDI é a taxa média das operações entre bancos e acompanha de perto a Selic, historicamente cerca de 0,10 ponto percentual abaixo dela.',
    },
  ],

  quiz: [
    {
      pergunta:
        'Com Selic nominal de 15% ao ano e inflação esperada de 5%, qual o juro real ex-ante aproximado?',
      alternativas: ['10,0% ao ano', '9,5% ao ano', '20,0% ao ano', '7,5% ao ano'],
      correta: 1,
      explicacao:
        'A conta correta é (1,15 dividido por 1,05) menos 1, o que dá aproximadamente 9,5%. A alternativa de 10% é a subtração simples, que superestima o juro real e erra mais quanto maiores forem as taxas. 20% soma em vez de descontar. 7,5% não corresponde a nenhuma operação válida entre os dois números.',
    },
    {
      pergunta:
        'A curva de DI embute Selic caindo 4 pontos percentuais em 12 meses. Você acredita que a queda será de apenas 2 pontos. O que faz sentido fazer?',
      alternativas: [
        'Comprar prefixado longo, porque a Selic vai cair de qualquer jeito',
        'Comprar IPCA+ longo, porque a inflação vai subir',
        'Preferir pós-fixado, porque o prefixado está caro para a sua visão',
        'Sair da renda fixa e ir para bolsa',
      ],
      correta: 2,
      explicacao:
        'Se você espera menos queda do que a curva embute, o prefixado está precificando um cenário melhor do que o seu, ou seja, está caro para você. O pós-fixado se beneficia justamente da Selic permanecendo mais alta por mais tempo. Comprar prefixado ignora que a queda já está no preço. IPCA+ responde a uma tese sobre inflação, que não é a tese apresentada. Migrar para bolsa troca o risco de juros por risco de mercado sem relação com a divergência descrita.',
    },
    {
      pergunta: 'Um Tesouro IPCA+ 2045 tem duration próxima de 11 anos. Se o juro real de mercado subir 1 ponto percentual, o que acontece com o preço?',
      alternativas: [
        'Sobe cerca de 11%',
        'Cai cerca de 11%',
        'Fica igual, porque é indexado à inflação',
        'Cai cerca de 1%',
      ],
      correta: 1,
      explicacao:
        'Preço e taxa andam em direções opostas, e a magnitude é aproximadamente a duration multiplicada pela variação da taxa, o que dá cerca de 11% de queda. A alta de 11% inverte a relação. A indexação ao IPCA protege do risco de inflação, não do risco de taxa de juro real. A queda de 1% ignoraria completamente o efeito da duration.',
    },
    {
      pergunta: 'Qual indicador o Banco Central privilegia para avaliar se a inflação é persistente?',
      alternativas: [
        'O IPCA cheio do mês mais recente',
        'Os núcleos de inflação e o índice de difusão',
        'A variação do dólar no mês',
        'O IGP-M acumulado em 12 meses',
      ],
      correta: 1,
      explicacao:
        'Núcleos e difusão foram criados exatamente para separar choques pontuais de inflação disseminada, que é o que a política monetária consegue combater. O IPCA cheio de um mês contém itens voláteis e é ruidoso. O câmbio é uma das causas possíveis, não a medida de persistência. O IGP-M tem peso grande de preços no atacado e serve mais para contratos do que para decisão de juros.',
    },
    {
      pergunta: 'Em qual situação o pós-fixado é claramente a melhor escolha?',
      alternativas: [
        'Quando a Selic está no fundo do ciclo e estável',
        'Quando o Copom está no meio de um ciclo de alta de juros',
        'Quando o juro real longo está no maior patamar da década',
        'Quando a bolsa está barata em relação ao histórico',
      ],
      correta: 1,
      explicacao:
        'Em ciclo de alta, o pós-fixado acompanha a Selic subindo e não sofre marcação a mercado, enquanto prefixado e IPCA+ longos se desvalorizam. No fundo do ciclo ele rende pouco. Com juro real longo no topo histórico, a decisão racional é travar esse juro, não ficar em pós. Bolsa barata é uma decisão sobre outra classe de ativo.',
    },
    {
      pergunta:
        'Um título de renda fixa resgatado em 200 dias sofre qual alíquota de Imposto de Renda pela tabela regressiva?',
      alternativas: ['22,5%', '20%', '17,5%', '15%'],
      correta: 1,
      explicacao:
        'A faixa de 181 a 360 dias corresponde a 20%. A alíquota de 22,5% vale até 180 dias, 17,5% de 361 a 720 dias e 15% acima de 720 dias. Confundir as faixas costuma custar caro em resgates feitos poucos dias antes da virada de alíquota.',
    },
    {
      pergunta: 'O que caracteriza um quadro de dominância fiscal?',
      alternativas: [
        'Governo com superávit primário elevado e dívida em queda',
        'Situação em que a alta de juros piora as expectativas de solvência e alimenta a inflação',
        'Período em que o Banco Central perde autonomia formal',
        'Momento em que a inflação fica abaixo do piso da meta',
      ],
      correta: 1,
      explicacao:
        'Dominância fiscal é justamente a inversão do canal usual: com dívida elevada, juros mais altos aumentam o custo do endividamento, deterioram a percepção de risco, desvalorizam o câmbio e realimentam a inflação. Superávit e dívida em queda descrevem o oposto. Perda de autonomia formal é uma questão institucional distinta. Inflação abaixo do piso é um problema de meta, não de dominância.',
    },
    {
      pergunta:
        'Você tem horizonte de 15 anos e compra Tesouro IPCA+ 2040. No terceiro ano o título aparece com prejuízo de 12% no extrato. O que isso significa?',
      alternativas: [
        'Que o Tesouro pode dar calote e você deve vender',
        'Que a inflação ficou negativa no período',
        'Que o juro real de mercado subiu e o preço caiu, sem afetar o retorno se você carregar até 2040',
        'Que você errou o indexador e precisa migrar para prefixado',
      ],
      correta: 2,
      explicacao:
        'A oscilação é marcação a mercado: a taxa contratada na compra é garantida até o vencimento, e o prejuízo só se materializa se houver venda antecipada. Risco de calote do Tesouro Nacional em moeda local é o menor risco de crédito disponível no país. Deflação prolongada não é a explicação usual. Migrar para prefixado nesse momento realizaria o prejuízo e trocaria proteção inflacionária por aposta direcional.',
    },
    {
      pergunta: 'Qual publicação traz semanalmente a mediana das projeções de mercado para Selic e IPCA?',
      alternativas: [
        'Ata do Copom',
        'Boletim Focus',
        'Relatório de Política Monetária',
        'Comunicado do Copom',
      ],
      correta: 1,
      explicacao:
        'O Boletim Focus é publicado toda segunda-feira pelo Banco Central e consolida projeções de mais de uma centena de instituições. A ata explica a decisão já tomada e sai depois de cada reunião. O Relatório de Política Monetária é trimestral. O comunicado é o texto curto divulgado junto com a decisão.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso acompanhar macroeconomia todo dia para investir bem?',
      resposta:
        'Não. Uma leitura semanal do Focus e uma revisão trimestral da alocação cobrem quase tudo que importa para uma carteira pessoal. Acompanhamento diário aumenta o giro, o imposto pago e a chance de decisão emocional, sem melhorar o resultado.',
    },
    {
      pergunta: 'Se a Selic está alta, por que eu compraria qualquer coisa que não seja pós-fixado?',
      resposta:
        'Porque a Selic alta é temporária por construção: ela existe para derrubar a inflação e cai quando a missão termina. O IPCA+ longo permite travar um juro real por uma década ou mais, o que o pós-fixado nunca garante. A pergunta certa é por quanto tempo você quer manter o rendimento que está vendo hoje.',
    },
    {
      pergunta: 'Como sei se o prêmio do Tesouro IPCA+ está bom?',
      resposta:
        'Compare a taxa oferecida com a média dos últimos cinco a dez anos para o mesmo vencimento. Historicamente, juro real acima de 6% ao ano é território de prêmio generoso no Brasil, e abaixo de 4,5% costuma indicar prêmio comprimido. O histórico de taxas está disponível no próprio site do Tesouro Direto.',
    },
    {
      pergunta: 'Vale a pena montar carteira só com base em previsão de Selic?',
      resposta:
        'Não, porque previsão de Selic tem histórico ruim, inclusive entre profissionais. O uso correto do ciclo é ajustar pesos e prazos na margem, mantendo um núcleo diversificado que sobrevive a você estar errado. Estratégia que só funciona se a previsão acertar é aposta, não alocação.',
    },
    {
      pergunta: 'Dólar deveria ser posição fixa na carteira?',
      resposta:
        'Para a maioria das carteiras brasileiras, uma exposição internacional estrutural entre 10% e 30% faz sentido como diversificação de moeda e de economia, não como aposta de curto prazo. O ponto é reduzir a dependência de um único país e de uma única moeda, e não tentar acertar o topo e o fundo do câmbio.',
    },
    {
      pergunta: 'Por que a bolsa cai quando os juros sobem, mesmo com as empresas lucrando?',
      resposta:
        'Por dois motivos simultâneos. O valor de uma ação é o fluxo de caixa futuro trazido a valor presente, e juro maior significa desconto maior sobre esse fluxo. Além disso, renda fixa passa a oferecer retorno alto com risco baixo, o que exige da bolsa um prêmio maior para atrair o mesmo capital.',
    },
    {
      pergunta: 'O que faço se eu tiver comprado prefixado longo e o juro subiu?',
      resposta:
        'Se o dinheiro não era necessário antes do vencimento, o caminho de menor custo é carregar até o fim e receber exatamente a taxa contratada. Vender agora transforma oscilação em perda definitiva. O aprendizado prático é dimensionar posições longas apenas com recursos que você sabe que não vai precisar.',
    },
  ],
}
