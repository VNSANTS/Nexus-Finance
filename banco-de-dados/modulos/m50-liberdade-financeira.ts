// m02-liberdade-financeira.ts
import { Modulo } from '@/types'

export const liberdadeFinanceira: Modulo = {
  id: 'liberdade-financeira',
  trilhaId: 'vida-financeira',
  numero: 2,
  titulo: 'Liberdade Financeira',
  subtitulo: 'O número exato que separa trabalhar por opção de trabalhar por necessidade',
  iconName: 'Compass',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['construcao-patrimonio'],
  objetivoAprendizagem:
    'Você vai sair sabendo calcular seu patrimônio-alvo com juro real líquido brasileiro e estimar em quantos anos você chega lá com a sua taxa de poupança atual.',
  erroFatal:
    'Calcular o patrimônio-alvo usando a rentabilidade nominal (a Selic de dois dígitos que aparece no extrato) em vez do juro real líquido de IR e inflação. Quem faz essa conta se aposenta com aproximadamente metade do patrimônio necessário e só percebe o erro uns oito anos depois, quando não há mais tempo de corrigir.',
  numeroChave: {
    valor: '25x',
    legenda:
      'Com uma taxa de retirada de 4% ao ano, o patrimônio necessário equivale a 25 vezes a sua despesa anual. Quem gasta R$ 8.000 por mês precisa de R$ 2,4 milhões investidos.',
  },
  glossarioDoModulo: [
    'FIRE',
    'Taxa segura de retirada',
    'Patrimônio-alvo',
    'Taxa de poupança',
    'Risco de sequência de retornos',
    'Juro real líquido',
    'Escada de NTN-B',
    'Barista FIRE',
  ],
  proximoPasso: {
    moduloId: 'renda-fixa-avancada',
    motivo:
      'Depois de definir o número, o passo seguinte é construir a estrutura de títulos que transforma esse patrimônio em renda previsível todo mês.',
  },

  aprender: {
    oQueE:
      'Liberdade financeira é o ponto em que a renda gerada pelo seu patrimônio cobre suas despesas sem que você precise vender seu tempo. Não é um sentimento, é uma equação com três variáveis: quanto você gasta por ano, qual taxa de retirada você considera segura e, portanto, qual patrimônio você precisa acumular. O movimento FIRE (sigla em inglês para independência financeira e aposentadoria antecipada) popularizou o cálculo, mas os parâmetros originais são americanos e precisam de ajuste para o Brasil.',
    porQueImporta:
      'Sem esse número, o esforço de poupar não tem destino: a pessoa investe por dez anos sem saber se está adiantada ou atrasada. Pior, quem estima o alvo pela rentabilidade nominal em um país com inflação relevante superestima brutalmente o poder de compra do próprio patrimônio. A diferença entre planejar com 4% real e planejar com 12% nominal é a diferença entre precisar de R$ 2,4 milhões e achar que R$ 800 mil bastam.',
    naPratica:
      'A regra dos 4% nasceu de um estudo americano que testou carteiras de ações e títulos ao longo de 30 anos de histórico dos Estados Unidos. O Brasil tem duas diferenças que puxam em direções opostas. A favor: aqui existe Tesouro IPCA+ pagando juro real contratado, algo que quase nenhum país oferece ao investidor de varejo, o que permite travar retorno acima da inflação por décadas. Contra: o Imposto de Renda incide sobre o ganho nominal, não sobre o ganho real, e a inflação brasileira é mais alta e mais volátil. Na prática, um título que paga IPCA mais 7% ao ano bruto, com inflação de 4,5%, entrega cerca de IPCA mais 5,3% líquido depois dos 15% de IR da faixa acima de 720 dias. É esse 5,3%, e não o 7%, que deve entrar na sua conta.',
    passoAPasso: [
      'Levante sua despesa anual real dos últimos 12 meses, incluindo o que é anual (IPVA, IPTU, seguro, viagem) e não apenas o mês típico.',
      'Projete a despesa do futuro, não a de hoje: some plano de saúde de faixa etária mais alta e subtraia gastos que somem, como financiamento quitado ou filhos independentes.',
      'Escolha sua taxa de retirada. Use 4% se quer margem de segurança e horizonte longo, e até 5% se sua carteira for majoritariamente indexada à inflação e você aceitar revisar retiradas em anos ruins.',
      'Divida a despesa anual pela taxa escolhida em decimal: essa é a meta de patrimônio investido, sem contar o imóvel onde você mora.',
      'Calcule sua taxa de poupança atual: quanto sobra por mês dividido pela renda líquida mensal.',
      'Consulte a tabela comparativa deste módulo para ver quantos anos essa taxa de poupança leva até o alvo.',
      'Defina uma alavanca para o próximo trimestre: subir a taxa de poupança em 5 pontos percentuais corta anos inteiros do prazo.',
    ],
    errosComuns: [
      'Usar rentabilidade nominal no lugar do juro real líquido, o que superestima o patrimônio disponível em cerca do dobro.',
      'Contar o imóvel próprio como parte do patrimônio que gera renda: ele não paga suas contas e ainda cobra IPTU, condomínio e manutenção.',
      'Calcular sobre a despesa de hoje sem ajustar plano de saúde, que sobe por faixa etária e é o maior item de custo de quem para de trabalhar cedo.',
      'Ignorar o risco de sequência de retornos: uma queda forte nos primeiros anos de retirada destrói uma carteira que sobreviveria à mesma queda dez anos depois.',
      'Confundir liberdade financeira com parar de trabalhar. A maioria das pessoas que chega lá continua trabalhando, mas escolhendo o quê, com quem e por quanto.',
      'Perseguir a meta cortando qualidade de vida a ponto de abandonar o plano no terceiro ano, o que custa mais do que nunca ter começado.',
    ],
    comparativo: {
      titulo: 'Anos até a liberdade financeira por taxa de poupança (juro real de 5% ao ano, alvo de 25x)',
      linhas: [
        { label: 'Poupa 10% da renda líquida', valor: 'Cerca de 51 anos. Na prática, significa depender do INSS.' },
        { label: 'Poupa 20% da renda líquida', valor: 'Cerca de 37 anos. Começando aos 25, chega perto dos 62.' },
        { label: 'Poupa 30% da renda líquida', valor: 'Cerca de 28 anos. Começando aos 25, chega aos 53.' },
        { label: 'Poupa 40% da renda líquida', valor: 'Cerca de 22 anos. Começando aos 25, chega aos 47.' },
        { label: 'Poupa 50% da renda líquida', valor: 'Cerca de 17 anos. Cada real economizado adianta e reduz o alvo ao mesmo tempo.' },
        { label: 'Poupa 70% da renda líquida', valor: 'Cerca de 8,5 anos. Exige renda alta ou custo de vida muito baixo, raramente sustentável por acaso.' },
      ],
    },
    checklist: [
      'Some suas despesas dos últimos 12 meses e divida por 12 para achar a despesa mensal real, não a imaginada.',
      'Multiplique por 12 e depois por 25 para obter seu patrimônio-alvo com taxa de retirada de 4%.',
      'Calcule sua taxa de poupança dos últimos três meses e anote o número.',
      'Localize sua linha na tabela de anos até a liberdade e escreva a idade em que você chegaria lá.',
      'Escolha uma única alavanca para o próximo trimestre: aumentar renda, cortar um custo fixo grande ou automatizar o aporte.',
      'Marque na agenda uma revisão anual do número, porque despesa e juro real mudam.',
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'Sabatier constrói boa parte do livro em torno do cálculo do "número" de liberdade financeira usando a taxa de retirada de 4% — exatamente a fórmula central deste módulo.',
    },
    naoConfundirCom: [
      {
        moduloId: 'construcao-patrimonio',
        diferenca:
          'Liberdade financeira define o número de chegada; construção de patrimônio é o processo mensal de acumular até chegar nele.',
      },
      {
        moduloId: 'planejamento-financeiro',
        diferenca:
          'Planejamento financeiro organiza orçamento e metas dos próximos anos; liberdade financeira é uma meta específica de longuíssimo prazo dentro desse planejamento.',
      },
      {
        moduloId: 'renda-fixa-avancada',
        diferenca:
          'Aqui você calcula de quanto precisa; lá você monta a carteira que paga essa renda mês a mês.',
      },
    ],
  },

  mapaMental: {
    label: 'Liberdade Financeira',
    subtitulo: 'Despesa anual, taxa de retirada e tempo',
    ramos: [
      {
        id: 'equacao',
        label: 'A equação',
        cor: '#0EA5E9',
        resumo: 'Três variáveis definem tudo, e duas delas estão sob seu controle direto.',
        filhos: [
          {
            label: 'Despesa anual',
            desc: 'A base do cálculo, e a única variável que você reduz e amplia o efeito duas vezes.',
            netos: [
              { label: 'Custo fixo', desc: 'Moradia, saúde, transporte e educação, responsáveis por cerca de 70% do orçamento típico.' },
              { label: 'Gastos anuais', desc: 'IPVA, IPTU, seguros e viagens, esquecidos em quase todo cálculo caseiro.' },
              { label: 'Despesa futura', desc: 'Plano de saúde sobe por faixa etária e é o item que mais cresce depois dos 55 anos.' },
            ],
          },
          {
            label: 'Taxa de retirada',
            desc: 'Percentual do patrimônio consumido por ano, tipicamente entre 3,5% e 5%.',
          },
          {
            label: 'Patrimônio-alvo',
            desc: 'Despesa anual dividida pela taxa de retirada, sem incluir o imóvel de moradia.',
          },
        ],
      },
      {
        id: 'brasil',
        label: 'Ajuste para o Brasil',
        cor: '#22C55E',
        resumo: 'A regra dos 4% é americana e precisa de três correções antes de virar plano local.',
        filhos: [
          { label: 'Juro real contratado', desc: 'O Tesouro IPCA+ permite travar retorno acima da inflação por décadas, vantagem rara no mundo.' },
          { label: 'IR sobre ganho nominal', desc: 'O imposto incide também sobre a parcela que apenas repõe a inflação, reduzindo o retorno real.' },
          { label: 'Inflação mais volátil', desc: 'Exige margem de segurança maior do que a usada em estudos de países desenvolvidos.' },
          { label: 'INSS como complemento', desc: 'Mesmo com teto baixo, o benefício futuro reduz a fatia que o patrimônio precisa cobrir.' },
        ],
      },
      {
        id: 'variantes',
        label: 'Variantes do conceito',
        cor: '#F97316',
        resumo: 'Nem toda liberdade financeira exige parar de trabalhar aos 40.',
        filhos: [
          { label: 'FIRE tradicional', desc: 'Patrimônio de 25x a despesa e independência total da renda do trabalho.' },
          { label: 'Barista FIRE', desc: 'Patrimônio parcial somado a uma renda de trabalho leve que cobre a diferença.' },
          { label: 'Coast FIRE', desc: 'Você já aportou o suficiente para que os juros sozinhos levem ao alvo na idade da aposentadoria.' },
          { label: 'Fat FIRE', desc: 'Alvo calculado sobre um padrão de vida elevado, exigindo múltiplos bem acima de 25x.' },
        ],
      },
      {
        id: 'riscos',
        label: 'O que pode dar errado',
        cor: '#EF4444',
        resumo: 'Os riscos de quem já chegou são diferentes dos riscos de quem está acumulando.',
        filhos: [
          { label: 'Sequência de retornos', desc: 'Queda forte nos primeiros anos de retirada compromete a carteira de forma permanente.' },
          { label: 'Inflação médica', desc: 'Planos de saúde sobem historicamente acima do IPCA, corroendo o poder de compra do plano.' },
          { label: 'Longevidade', desc: 'Planejar 30 anos de retirada aos 45 anos de idade pode ser insuficiente.' },
          { label: 'Mudança de vida', desc: 'Filhos, divórcio e doença alteram a despesa base, que é o denominador de tudo.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'A simulação tem duas partes. Primeiro você define o alvo, que é uma conta de uma linha. Depois você usa a calculadora de juros compostos para descobrir em quanto tempo seus aportes atuais chegam nesse alvo, sempre em termos reais, ou seja, com a taxa já descontada da inflação.',
    passos: [
      'Informe sua despesa mensal média dos últimos 12 meses e multiplique por 12.',
      'Divida pelo percentual de retirada escolhido (0,04 para a regra dos 4%) e anote o patrimônio-alvo.',
      'Na calculadora de juros compostos, coloque o patrimônio atual como valor inicial e o aporte mensal que você faz de fato.',
      'Use taxa real de 5% ao ano, não a Selic nominal, porque o alvo também está em valores de hoje.',
      'Ajuste o aporte para cima e observe quantos anos cada R$ 500 adicionais economizam.',
    ],
    exemploGuiado:
      'Marina gasta R$ 8.000 por mês, o que dá R$ 96.000 por ano. Com taxa de retirada de 4%, o alvo é R$ 96.000 dividido por 0,04, ou seja, R$ 2,4 milhões. Ela tem hoje R$ 180.000 investidos e consegue aportar R$ 3.500 por mês, com renda líquida de R$ 12.000, o que dá uma taxa de poupança de 29%. Usando 5% de juro real ao ano, o valor inicial de R$ 180.000 cresce para cerca de R$ 750.000 em 30 anos, e os aportes de R$ 3.500 mensais acumulam cerca de R$ 2,85 milhões no mesmo período, somando bem mais que o alvo por volta do ano 26. Se Marina subir o aporte para R$ 5.000 mensais, elevando a taxa de poupança para 42%, ela atinge os R$ 2,4 milhões por volta do ano 21, cinco anos antes. Agora o ponto que quase ninguém percebe: se em vez de aumentar o aporte ela reduzir a despesa mensal de R$ 8.000 para R$ 6.500, o alvo cai para R$ 1,95 milhão e o aporte sobe automaticamente para R$ 5.000. Cortar despesa mexe nas duas pontas da equação ao mesmo tempo, e por isso vale mais do que aumentar a renda na mesma proporção.',
  },

  flashcards: [
    {
      id: 'lf-fc-01',
      frente: 'Como se calcula o patrimônio-alvo da liberdade financeira?',
      verso:
        'Despesa anual dividida pela taxa de retirada. Com 4% de retirada, isso equivale a 25 vezes a despesa anual, e o imóvel de moradia não entra na conta.',
    },
    {
      id: 'lf-fc-02',
      frente: 'De onde vem a regra dos 4%?',
      verso:
        'De um estudo americano que testou carteiras de ações e títulos ao longo de 30 anos de histórico dos Estados Unidos, buscando a retirada máxima que não esgotava o patrimônio. É referência útil, não lei da natureza, e precisa de ajuste para o Brasil.',
    },
    {
      id: 'lf-fc-03',
      frente: 'Por que cortar despesa vale mais do que aumentar renda na mesma proporção?',
      verso:
        'Porque a despesa aparece duas vezes na equação: ela reduz o patrimônio-alvo e aumenta a sobra mensal disponível para aportar. Aumentar renda mexe apenas em uma das pontas.',
    },
    {
      id: 'lf-fc-04',
      frente: 'Um título que paga IPCA mais 7% bruto entrega quanto de juro real líquido?',
      verso:
        'Com inflação de 4,5% e alíquota de 15% sobre o ganho nominal, sobra aproximadamente IPCA mais 5,3% ao ano. O imposto tributa também a parcela que apenas repõe a inflação.',
    },
    {
      id: 'lf-fc-05',
      frente: 'O que é risco de sequência de retornos?',
      verso:
        'É o risco de a carteira sofrer perdas grandes justamente nos primeiros anos de retirada. Como você está sacando enquanto o patrimônio está reduzido, a recuperação posterior ocorre sobre uma base menor e pode não bastar.',
    },
    {
      id: 'lf-fc-06',
      frente: 'O que é Coast FIRE?',
      verso:
        'É o momento em que o patrimônio já acumulado, mesmo sem novos aportes, cresce sozinho até o alvo na idade de aposentadoria planejada. A partir dali você só precisa cobrir suas despesas correntes.',
    },
    {
      id: 'lf-fc-07',
      frente: 'Com 50% de taxa de poupança e 5% de juro real, quanto tempo até a liberdade financeira?',
      verso: 'Aproximadamente 17 anos, partindo do zero, independentemente do valor absoluto da renda.',
    },
    {
      id: 'lf-fc-08',
      frente: 'Por que o imóvel onde você mora não entra no patrimônio-alvo?',
      verso:
        'Porque ele não gera fluxo de caixa e ainda consome IPTU, condomínio e manutenção. Ele reduz a sua despesa com aluguel, o que já aparece na conta pelo lado da despesa anual.',
    },
    {
      id: 'lf-fc-09',
      frente: 'Qual é a maior armadilha ao projetar a despesa futura?',
      verso:
        'Usar a despesa de hoje sem ajustar o plano de saúde, que sobe por faixa etária e costuma ser o maior item de custo de quem para de trabalhar antes dos 60.',
    },
    {
      id: 'lf-fc-10',
      frente: 'O que é Barista FIRE?',
      verso:
        'É atingir um patrimônio parcial, suficiente para cobrir boa parte das despesas, e complementar a diferença com um trabalho leve e escolhido, geralmente com menos horas e menos pressão.',
    },
    {
      id: 'lf-fc-11',
      frente: 'Por que usar juro real e não a Selic nominal na projeção?',
      verso:
        'Porque o patrimônio-alvo está expresso em poder de compra de hoje. Se você projetar com taxa nominal e comparar com um alvo em valores atuais, estará comparando grandezas diferentes e superestimando o resultado.',
    },
    {
      id: 'lf-fc-12',
      frente: 'Liberdade financeira significa parar de trabalhar?',
      verso:
        'Não. Significa que trabalhar passa a ser escolha e não obrigação. A maior parte das pessoas que atinge o alvo continua produzindo, mas com liberdade para recusar projetos, clientes e condições.',
    },
  ],

  quiz: [
    {
      pergunta: 'Você gasta R$ 6.000 por mês. Qual seu patrimônio-alvo com taxa de retirada de 4% ao ano?',
      alternativas: ['R$ 720 mil', 'R$ 1,44 milhão', 'R$ 1,8 milhão', 'R$ 2,4 milhões'],
      correta: 2,
      explicacao:
        'A despesa anual é R$ 72.000, e dividida por 0,04 resulta em R$ 1,8 milhão, ou 25 vezes a despesa anual. R$ 720 mil equivale a apenas 10 vezes. R$ 1,44 milhão corresponde a 20 vezes, taxa de retirada de 5%. R$ 2,4 milhões seria o alvo de quem gasta R$ 8.000 mensais.',
    },
    {
      pergunta: 'Qual das ações abaixo tem o maior efeito sobre o tempo até a liberdade financeira?',
      alternativas: [
        'Aumentar a rentabilidade da carteira em 1 ponto percentual',
        'Reduzir a despesa mensal em 20%',
        'Trocar o banco por uma corretora sem taxa de custódia',
        'Aportar uma vez por ano em vez de mensalmente',
      ],
      correta: 1,
      explicacao:
        'Reduzir despesa age nas duas pontas: derruba o patrimônio-alvo e aumenta o aporte disponível. Ganhar 1 ponto percentual a mais de rentabilidade ajuda, mas é incerto e menor em magnitude. Eliminar taxas é bom e deve ser feito, mas o impacto é marginal diante da taxa de poupança. Aportar anualmente em vez de mensalmente reduz o tempo de exposição do dinheiro e piora o resultado.',
    },
    {
      pergunta: 'Um Tesouro IPCA+ que paga 7% de juro real bruto, com inflação de 4,5% e IR de 15%, entrega quanto de juro real líquido aproximado?',
      alternativas: ['7,0%', '5,95%', '5,3%', '4,0%'],
      correta: 2,
      explicacao:
        'O rendimento nominal é cerca de 11,8% ao ano. O IR de 15% incide sobre esse total nominal, retirando aproximadamente 1,77 ponto percentual e deixando cerca de 10,0% nominais. Descontando a inflação de 4,5%, sobram aproximadamente 5,3% reais. A alternativa de 5,95% é o erro comum de aplicar os 15% apenas sobre o juro real. 7% ignora o imposto e 4% subestima.',
    },
    {
      pergunta: 'O que caracteriza o Coast FIRE?',
      alternativas: [
        'Ter patrimônio de 25 vezes a despesa anual e parar de trabalhar imediatamente',
        'Ter patrimônio suficiente para que os juros sozinhos alcancem o alvo na idade planejada, sem novos aportes',
        'Trabalhar meio período para cobrir metade das despesas',
        'Investir apenas em ativos internacionais',
      ],
      correta: 1,
      explicacao:
        'Coast FIRE é o ponto em que o capital acumulado cresce sozinho até o alvo, liberando você de continuar aportando, embora ainda precise cobrir o custo de vida corrente. A primeira alternativa descreve o FIRE tradicional e a terceira descreve o Barista FIRE. A quarta não tem relação com o conceito.',
    },
    {
      pergunta: 'Por que a regra dos 4% precisa de ajuste no Brasil?',
      alternativas: [
        'Porque no Brasil não existem títulos indexados à inflação',
        'Porque o IR incide sobre o ganho nominal e a inflação é mais volátil, embora exista juro real contratado no Tesouro IPCA+',
        'Porque a bolsa brasileira sempre rende menos que a americana',
        'Porque a taxa de retirada no Brasil é fixada por lei',
      ],
      correta: 1,
      explicacao:
        'O ajuste necessário vem da tributação sobre o ganho nominal e da maior volatilidade inflacionária, compensadas parcialmente pela existência do Tesouro IPCA+, que trava juro real por décadas. Títulos indexados existem e são a principal vantagem local. Desempenho passado de bolsa não define taxa de retirada. Não há lei fixando taxa de retirada.',
    },
    {
      pergunta: 'Qual item costuma ser mais subestimado ao projetar a despesa de quem alcança a liberdade financeira?',
      alternativas: [
        'Assinaturas de streaming',
        'Plano de saúde por faixa etária',
        'Gasto com transporte por aplicativo',
        'Presentes de aniversário',
      ],
      correta: 1,
      explicacao:
        'O plano de saúde sobe por reajuste anual e por mudança de faixa etária, e costuma se tornar o maior item isolado do orçamento depois dos 55 anos. Os demais itens têm peso pequeno e tendem a cair quando a pessoa deixa a rotina de trabalho, não a subir.',
    },
    {
      pergunta: 'Duas pessoas poupam 40% da renda: uma ganha R$ 6 mil e outra R$ 60 mil por mês. Partindo do zero e com o mesmo juro real, quem atinge a liberdade financeira primeiro?',
      alternativas: [
        'Quem ganha R$ 60 mil, porque acumula mais em valor absoluto',
        'Quem ganha R$ 6 mil, porque tem alvo menor',
        'As duas ao mesmo tempo, porque o prazo depende da taxa de poupança, não do valor da renda',
        'Depende exclusivamente do valor do imóvel de cada uma',
      ],
      correta: 2,
      explicacao:
        'O tempo até o alvo é função da proporção poupada, porque a despesa define o alvo e a sobra define o aporte, ambos escalando com a renda. Quem ganha mais acumula mais em reais, mas também precisa de mais em reais. O imóvel de moradia não entra no cálculo do patrimônio que gera renda.',
    },
    {
      pergunta: 'O que é o risco de sequência de retornos e quando ele é mais perigoso?',
      alternativas: [
        'É o risco de a inflação superar a rentabilidade, e é pior na fase de acumulação',
        'É o risco de perdas grandes nos primeiros anos de retirada, quando os saques ocorrem sobre um patrimônio já reduzido',
        'É o risco de o emissor do título não pagar no vencimento',
        'É a oscilação diária da marcação a mercado de títulos longos',
      ],
      correta: 1,
      explicacao:
        'O perigo está na combinação de queda de mercado com saques simultâneos no início da fase de retirada, porque a recuperação passa a ocorrer sobre uma base menor. Perda inflacionária, risco de crédito e marcação a mercado são conceitos distintos, ainda que também relevantes.',
    },
  ],

  faq: [
    {
      pergunta: 'A regra dos 4% ainda vale com a Selic brasileira em dois dígitos?',
      resposta:
        'Ela vale como ponto de partida conservador. Com Tesouro IPCA+ pagando juro real líquido próximo de 5%, uma retirada de 4,5% a 5% é defensável para carteiras majoritariamente indexadas à inflação. O cuidado é lembrar que o juro real alto de hoje não é permanente e que títulos vencem, obrigando você a reinvestir nas taxas que existirem naquele momento.',
    },
    {
      pergunta: 'Devo incluir o INSS no cálculo?',
      resposta:
        'Sim, mas com desconto. O caminho prudente é calcular o patrimônio-alvo sem ele e tratar o benefício futuro como margem de segurança. Se quiser incluir, subtraia da despesa anual apenas o valor que você tem alta confiança de receber, e refaça a conta a cada revisão de regras previdenciárias.',
    },
    {
      pergunta: 'Existe relação entre este módulo e o livro Liberdade Financeira, de Grant Sabatier?',
      resposta:
        'O livro está na Biblioteca do app e trata do mesmo conceito, com foco na experiência americana de acelerar renda e taxa de poupança. Este módulo cobre o cálculo em si e os parâmetros brasileiros: juro real contratado, IR sobre ganho nominal e ajuste do múltiplo. Ler os dois é complementar, com o livro dando a narrativa e o módulo dando os números do seu contexto.',
    },
    {
      pergunta: 'Comprar imóvel para alugar acelera ou atrasa a liberdade financeira?',
      resposta:
        'Depende do rendimento líquido. Aluguel residencial no Brasil costuma render entre 0,35% e 0,55% do valor do imóvel ao mês antes de IPTU, manutenção, vacância e Imposto de Renda, o que muitas vezes fica abaixo do juro real de um título indexado. O imóvel adiciona concentração e ilíquidez, e por isso precisa de um retorno claramente superior para justificar a troca.',
    },
    {
      pergunta: 'E se eu chegar ao alvo e o mercado despencar logo depois?',
      resposta:
        'Esse é exatamente o risco de sequência de retornos, e há três defesas conhecidas. Manter de dois a três anos de despesas em pós-fixado, para não vender ativos em queda. Reduzir temporariamente a retirada em anos ruins, o que preserva o principal. E manter uma parcela de renda de trabalho no início, mesmo pequena, durante os primeiros anos.',
    },
    {
      pergunta: 'Faz sentido buscar liberdade financeira ganhando salário mínimo?',
      resposta:
        'A matemática do múltiplo continua válida, mas com renda baixa a alavanca principal deixa de ser a taxa de poupança e passa a ser o crescimento de renda, porque há um piso de despesa que não comprime. Nesse cenário, investir em qualificação e em aumento de renda produz mais efeito do que otimizar carteira, e o patrimônio-alvo deve ser tratado como meta de longo prazo com etapas intermediárias.',
    },
    {
      pergunta: 'Qual a diferença entre liberdade financeira e independência financeira?',
      resposta:
        'Na prática do mercado brasileiro os termos são usados como sinônimos. Quando alguém faz distinção, costuma chamar de independência a cobertura integral das despesas pela renda do patrimônio, e de liberdade a condição mais ampla de poder decidir como usar o próprio tempo, o que às vezes acontece antes do número fechar.',
    },
  ],
}
