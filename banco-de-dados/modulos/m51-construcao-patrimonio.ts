// m03-construcao-patrimonio.ts
import { Modulo } from '@/types'

export const construcaoPatrimonio: Modulo = {
  id: 'construcao-patrimonio',
  trilhaId: 'vida-financeira',
  numero: 3,
  titulo: 'Construção de Patrimônio',
  subtitulo: 'O processo mensal que transforma renda em capital ao longo de décadas',
  iconName: 'Building2',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['planejamento-financeiro'],
  objetivoAprendizagem:
    'Você vai sair sabendo montar um sistema de acumulação automático, com ordem de prioridade definida entre dívida, reserva, previdência e investimento.',
  erroFatal:
    'Deixar o custo fixo mensal subir na mesma velocidade da renda. É assim que alguém multiplica o salário por cinco em vinte anos de carreira e termina com patrimônio próximo de zero: cada aumento vira aluguel maior, carro mais caro e escola mais cara, e a taxa de poupança nunca sai do lugar.',
  numeroChave: {
    valor: 'R$ 975 mil',
    legenda:
      'É o resultado de aportar R$ 1.000 por mês durante 30 anos a 6% de juro real ao ano. Desse total, R$ 360 mil vêm do seu bolso e R$ 615 mil vêm dos juros.',
  },
  glossarioDoModulo: [
    'Taxa de poupança',
    'Inflação de estilo de vida',
    'Aporte automático',
    'Custo de oportunidade',
    'PGBL e VGBL',
    'Tabela regressiva da previdência',
    'Rebalanceamento',
    'Patrimônio líquido',
  ],
  proximoPasso: {
    moduloId: 'liberdade-financeira',
    motivo:
      'Com o processo de acumulação montado, o passo seguinte é calcular o número exato onde esse processo precisa chegar.',
  },

  aprender: {
    oQueE:
      'Construção de patrimônio é o conjunto de rotinas que converte parte da sua renda em ativos, de forma repetida e automática, ao longo de décadas. O patrimônio que importa é o líquido: tudo que você tem menos tudo que você deve. Renda alta e patrimônio alto são coisas diferentes, e a ponte entre as duas se chama taxa de poupança.',
    porQueImporta:
      'Quase todo mundo superestima o efeito da rentabilidade e subestima o efeito do tempo e da constância. Em uma acumulação de 30 anos com 6% de juro real, cerca de dois terços do resultado final vêm dos juros, e não dos aportes. Mas os juros só têm o que multiplicar se houver aporte, e só têm tempo de trabalhar se houver começo cedo. Quem começa dez anos depois com o mesmo aporte chega a menos da metade.',
    naPratica:
      'No Brasil, o sistema de acumulação tem uma ordem de prioridade bem definida. Primeiro, eliminar dívida cara: rotativo do cartão e cheque especial cobram taxas de ordem de grandeza incomparável com qualquer investimento, e quitar essa dívida é o melhor retorno garantido disponível no país. Segundo, montar reserva de emergência em Tesouro Selic ou CDB de liquidez diária, entre seis meses de despesa para quem tem carteira assinada e doze meses para autônomo. Terceiro, aproveitar benefícios fiscais: quem declara IR no modelo completo pode deduzir aportes em PGBL de até 12% da renda bruta anual tributável. Quarto, aportar no dia do salário, por débito programado, antes de gastar. A tabela regressiva da previdência privada chega a 10% de IR para recursos mantidos por mais de dez anos, a menor alíquota disponível no mercado brasileiro.',
    passoAPasso: [
      'Calcule seu patrimônio líquido de hoje: some tudo que você tem e subtraia tudo que você deve, incluindo financiamentos.',
      'Liste suas dívidas por taxa de juros e ataque primeiro a mais cara, independentemente do tamanho do saldo.',
      'Complete a reserva de emergência em ativo de liquidez diária antes de qualquer investimento de prazo longo.',
      'Programe débito automático de aporte para o dia seguinte ao recebimento do salário, não para o fim do mês.',
      'Defina uma alocação-alvo por classe de ativo e escreva os percentuais em um documento.',
      'Estabeleça a regra do aumento: sempre que a renda subir, no mínimo metade do aumento vai para o aporte antes de qualquer mudança de padrão de vida.',
      'Rebalanceie uma vez por ano, sempre no mesmo mês, comprando o que ficou abaixo do alvo em vez de vender o que subiu.',
    ],
    errosComuns: [
      'Investir enquanto carrega saldo no rotativo do cartão, o que é matematicamente equivalente a tomar dinheiro caro para aplicar em algo mais barato.',
      'Aportar apenas o que sobra no fim do mês, quando o comportamento previsível é que não sobre nada.',
      'Confundir patrimônio com o valor do carro e do imóvel financiado, ignorando o saldo devedor do outro lado.',
      'Trocar de estratégia toda vez que uma classe de ativo tem um ano ruim, cristalizando prejuízo e comprando o que já subiu.',
      'Contratar PGBL declarando no modelo simplificado, o que anula o único benefício do produto e ainda sujeita o valor total ao IR no resgate.',
      'Deixar o dinheiro parado em conta corrente esperando o momento certo de entrar, perdendo o rendimento do período inteiro em nome de um timing que raramente se confirma.',
    ],
    comparativo: {
      titulo: 'Começar cedo contra começar tarde (R$ 1.000 por mês, 6% de juro real ao ano)',
      linhas: [
        { label: 'Aportando por 30 anos', valor: 'Cerca de R$ 975 mil, sendo R$ 360 mil de aportes e R$ 615 mil de juros.' },
        { label: 'Aportando por 20 anos', valor: 'Cerca de R$ 453 mil, ou seja, menos da metade, com dois terços dos aportes.' },
        { label: 'Aportando por 10 anos', valor: 'Cerca de R$ 163 mil. Um terço do tempo entrega um sexto do resultado.' },
        { label: 'Para igualar 30 anos começando 10 anos depois', valor: 'Seria preciso aportar cerca de R$ 2.150 por mês, mais que o dobro.' },
        { label: 'Peso dos juros no total', valor: 'Em 10 anos os juros são cerca de 24% do montante; em 30 anos, cerca de 63%.' },
      ],
    },
    checklist: [
      'Escreva hoje seu patrimônio líquido em uma linha: total de ativos menos total de dívidas.',
      'Configure o débito automático do aporte para o dia seguinte ao salário cair.',
      'Verifique se a reserva de emergência cobre de seis a doze meses de despesa e está em liquidez diária.',
      'Confira qual modelo de declaração de IR você usa antes de decidir entre PGBL e VGBL.',
      'Defina por escrito o percentual de cada aumento de renda que vai automaticamente para o aporte.',
      'Marque na agenda o mês fixo de rebalanceamento anual.',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey defende um plano passo a passo executado sem depender de força de vontade constante — configurar o débito automático do aporte para o dia seguinte ao salário é exatamente essa automação que o método defende.',
    },
    naoConfundirCom: [
      {
        moduloId: 'liberdade-financeira',
        diferenca:
          'Construção de patrimônio é o processo de acumular; liberdade financeira é o ponto de chegada calculado desse processo.',
      },
      {
        moduloId: 'planejamento-patrimonial',
        diferenca:
          'Aqui você constrói o patrimônio; lá você organiza como ele será transferido, protegido e sucedido.',
      },
      {
        moduloId: 'macro-aplicada-carteira',
        diferenca:
          'Aqui se define quanto e com que frequência aportar; lá se define em qual indexador e prazo esse aporte entra.',
      },
    ],
  },

  mapaMental: {
    label: 'Construção de Patrimônio',
    subtitulo: 'Taxa de poupança, tempo e automação',
    ramos: [
      {
        id: 'alavancas',
        label: 'As quatro alavancas',
        cor: '#7C3AED',
        resumo: 'Só existem quatro variáveis no processo, e três delas dependem de comportamento, não de mercado.',
        filhos: [
          {
            label: 'Taxa de poupança',
            desc: 'Percentual da renda líquida que vira aporte, a variável mais poderosa e a mais ignorada.',
            netos: [
              { label: 'Aumentar renda', desc: 'Amplia a base, mas só ajuda se o custo fixo não subir junto.' },
              { label: 'Reduzir custo fixo', desc: 'Efeito permanente: um corte feito uma vez rende todos os meses seguintes.' },
              { label: 'Regra do aumento', desc: 'Direcionar metade de cada aumento salarial ao aporte antes de mudar de padrão.' },
            ],
          },
          { label: 'Tempo', desc: 'A única alavanca que não se compra depois: cada ano perdido exige aportes desproporcionalmente maiores.' },
          { label: 'Rentabilidade real', desc: 'Importa, mas é a variável menos controlável e a que mais atrai atenção indevida.' },
          { label: 'Constância', desc: 'Aportar todo mês em qualquer cenário supera aportar bem em alguns meses do ano.' },
        ],
      },
      {
        id: 'ordem',
        label: 'Ordem de prioridade',
        cor: '#0891B2',
        resumo: 'Cada real tem um destino ótimo, e a sequência entre eles não é opinião.',
        filhos: [
          { label: 'Dívida cara primeiro', desc: 'Quitar rotativo e cheque especial é o maior retorno garantido disponível no Brasil.' },
          { label: 'Reserva de emergência', desc: 'De seis a doze meses de despesa em liquidez diária, sem risco de marcação.' },
          { label: 'Benefício fiscal', desc: 'PGBL dedutível em até 12% da renda bruta tributável para quem declara no modelo completo.' },
          { label: 'Investimento de longo prazo', desc: 'Só depois das etapas anteriores o aporte vai para prazos longos e risco maior.' },
        ],
      },
      {
        id: 'automacao',
        label: 'Automação do processo',
        cor: '#EA580C',
        resumo: 'Sistema vence disciplina, porque disciplina é finita e sistema roda sozinho.',
        filhos: [
          { label: 'Pague-se primeiro', desc: 'Débito programado no dia seguinte ao salário, antes de qualquer despesa variável.' },
          { label: 'Contas separadas', desc: 'Conta de gastos apartada da conta de investimento reduz o vazamento por impulso.' },
          { label: 'Aporte fixo, não residual', desc: 'Valor definido em reais ou percentual, e não o que sobrar no fim do mês.' },
          { label: 'Rebalanceamento anual', desc: 'Mesmo mês todo ano, comprando o que ficou abaixo do alvo.' },
        ],
      },
      {
        id: 'armadilhas',
        label: 'O que destrói patrimônio',
        cor: '#BE123C',
        resumo: 'A maior parte da destruição de patrimônio não vem do mercado, vem de decisões de consumo e de crédito.',
        filhos: [
          { label: 'Inflação de estilo de vida', desc: 'Custo fixo subindo junto com a renda, o que congela a taxa de poupança para sempre.' },
          { label: 'Crédito rotativo', desc: 'Taxas de ordem de grandeza de centenas de por cento ao ano transformam consumo em dívida perpétua.' },
          { label: 'Ativos que só custam', desc: 'Carro, e em parte o imóvel de moradia, consomem manutenção, seguro e imposto sem gerar fluxo.' },
          { label: 'Giro excessivo', desc: 'Trocar de estratégia com frequência paga imposto na alíquota mais alta e corretagem sem melhorar o retorno.' },
        ],
      },
      {
        id: 'blocos',
        label: 'Blocos do patrimônio',
        cor: '#65A30D',
        resumo: 'Patrimônio maduro tem camadas com funções diferentes, não um único produto.',
        filhos: [
          { label: 'Liquidez', desc: 'Reserva em Tesouro Selic ou CDB de liquidez diária, para imprevistos e oportunidades.' },
          { label: 'Renda fixa de prazo', desc: 'Títulos indexados à inflação que travam juro real para objetivos datados.' },
          { label: 'Renda variável', desc: 'Ações e fundos imobiliários, com horizonte mínimo de cinco a dez anos.' },
          { label: 'Internacional', desc: 'Exposição a outra moeda e a outras economias para reduzir a dependência de um único país.' },
          { label: 'Previdência', desc: 'Camada com vantagem tributária e sucessória, útil quando bem escolhida e mantida por mais de dez anos.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro:
      'A construção de patrimônio quase nunca falha por falta de conta: falha por escolha errada de prioridade. Os cenários abaixo colocam você diante das três decisões que mais aparecem na vida real de quem começa a acumular, cada uma com um valor concreto em jogo.',
    passos: [
      'Leia o cenário e decida antes de olhar as opções.',
      'Escolha a opção mais próxima da sua decisão.',
      'Leia o resultado de todas as opções, inclusive das descartadas.',
      'Identifique qual variável pesou mais na resposta correta: quase sempre é taxa efetiva ou prazo, não preferência pessoal.',
      'Aplique a mesma lógica ao seu próprio caso e anote a decisão.',
    ],
    exemploGuiado:
      'Rafael tem 28 anos, renda líquida de R$ 7.000 e consegue aportar R$ 1.000 por mês. Com 6% de juro real ao ano, ao longo de 30 anos, ele acumula aproximadamente R$ 975 mil em valores de hoje: R$ 360 mil saíram do bolso dele e R$ 615 mil vieram dos juros. Agora suponha que ele receba uma promoção de R$ 2.000 no quinto ano e aplique a regra de direcionar metade de todo aumento ao aporte. O aporte sobe para R$ 2.000 e, nos 25 anos restantes, essa parcela adicional de R$ 1.000 mensais acumula sozinha cerca de R$ 692 mil, elevando o total para aproximadamente R$ 1,67 milhão. A promoção não mudou a rentabilidade nem exigiu nenhuma decisão de investimento: mudou apenas o destino de metade do aumento. Esse é o formato real da alavanca principal da acumulação.',
    cenarioGuiado: [
      {
        pergunta:
          'Você recebeu R$ 15 mil de bônus. Tem R$ 4 mil de saldo no rotativo do cartão, nenhuma reserva de emergência e vinha querendo começar a investir em ações. O que faz primeiro?',
        opcoes: [
          {
            texto: 'Investe os R$ 15 mil em ações e paga o cartão nos próximos meses',
            resultado:
              'Pior escolha possível. O rotativo do cartão trabalha em ordem de grandeza de centenas de por cento ao ano, muito acima de qualquer retorno esperado de bolsa. Você estaria tomando dinheiro caríssimo para aplicar em algo com retorno menor e incerto.',
          },
          {
            texto: 'Quita os R$ 4 mil do cartão e coloca os R$ 11 mil restantes na reserva de emergência',
            resultado:
              'Escolha correta e na ordem certa. Quitar a dívida cara é o único retorno garantido de dois ou três dígitos disponível no país. A reserva em liquidez diária impede que o próximo imprevisto recrie a dívida, que é exatamente o ciclo que mantém a maioria das pessoas sem patrimônio.',
          },
          {
            texto: 'Divide entre pagar o cartão, reserva e ações, um terço para cada',
            resultado:
              'Melhor que a primeira opção, pior que a segunda. Dividir parece equilibrado, mas deixa parte da dívida cara viva. Enquanto existir saldo no rotativo, ele consome o retorno de qualquer aplicação e ainda cresce sobre si mesmo.',
          },
        ],
      },
      {
        pergunta:
          'Você ganha R$ 150 mil brutos por ano, declara IR no modelo completo e quer usar previdência privada. Sobram R$ 20 mil por ano para esse fim. Qual estrutura escolhe?',
        opcoes: [
          {
            texto: 'R$ 18 mil em PGBL e R$ 2 mil em VGBL',
            resultado:
              'Escolha eficiente. O limite de dedução do PGBL é de 12% da renda bruta anual tributável, o que dá R$ 18 mil no seu caso. Aportar exatamente esse teto maximiza o adiamento de imposto, e o excedente vai para VGBL, onde a tributação futura incide apenas sobre o rendimento.',
          },
          {
            texto: 'R$ 20 mil em PGBL, para deduzir tudo',
            resultado:
              'Erro comum. Você só pode deduzir até 12% da renda bruta tributável, ou seja, R$ 18 mil. Os R$ 2 mil excedentes não geram benefício algum na declaração e, ainda assim, ficarão sujeitos ao IR sobre o valor total no resgate, porque essa é a regra do PGBL.',
          },
          {
            texto: 'R$ 20 mil em VGBL, para simplificar',
            resultado:
              'Funciona, mas deixa dinheiro na mesa. Quem declara no modelo completo abre mão de adiar imposto sobre R$ 18 mil ao ano, e esse adiamento, capitalizado por duas ou três décadas, costuma valer mais do que a simplicidade de manter um produto só.',
          },
        ],
      },
      {
        pergunta:
          'Você tem R$ 200 mil e está decidindo entre dar entrada em um imóvel para morar, com financiamento de 25 anos, ou continuar alugando e investir o valor. O que pesa mais na decisão?',
        opcoes: [
          {
            texto: 'Comprar sempre vale mais, porque aluguel é dinheiro jogado fora',
            resultado:
              'Raciocínio incompleto. Juros do financiamento, ITBI, escritura, IPTU, condomínio e manutenção também são dinheiro que não volta, e nos primeiros anos de um financiamento longo a maior parte da parcela paga juros, não amortização. A comparação honesta é entre o custo total de possuir e o custo total de alugar.',
          },
          {
            texto: 'Comparar a taxa efetiva do financiamento com o retorno líquido esperado dos investimentos e considerar o horizonte de permanência',
            resultado:
              'Abordagem correta. Se a taxa efetiva do financiamento supera o retorno líquido esperado, amortizar ou comprar à vista tende a vencer. E o prazo de permanência é decisivo: custos de transação de compra e venda diluem-se mal em menos de cinco a sete anos no mesmo imóvel.',
          },
          {
            texto: 'Alugar sempre vale mais, porque o dinheiro rende mais investido',
            resultado:
              'Também incompleto. Alugar e investir só vence se a diferença for de fato investida todo mês, com disciplina. Além disso, o imóvel próprio reduz uma despesa vitalícia e traz estabilidade não financeira, que tem valor real mesmo sem aparecer na planilha.',
          },
        ],
      },
    ],
  },

  flashcards: [
    {
      id: 'cp-fc-01',
      frente: 'O que é patrimônio líquido?',
      verso:
        'Tudo que você tem menos tudo que você deve. Um carro de R$ 80 mil com R$ 60 mil de financiamento em aberto adiciona R$ 20 mil ao patrimônio, não R$ 80 mil.',
    },
    {
      id: 'cp-fc-02',
      frente: 'Qual a ordem de prioridade de cada real disponível?',
      verso:
        'Primeiro quitar dívida cara, depois montar reserva de emergência, depois aproveitar benefício fiscal e só então investir em prazos longos e risco maior.',
    },
    {
      id: 'cp-fc-03',
      frente: 'Aportando R$ 1.000 por mês a 6% real, quanto se acumula em 30 anos e quanto vem dos juros?',
      verso: 'Cerca de R$ 975 mil, dos quais aproximadamente R$ 615 mil vêm de juros e R$ 360 mil dos aportes.',
    },
    {
      id: 'cp-fc-04',
      frente: 'Qual o limite de dedução do PGBL na declaração de Imposto de Renda?',
      verso:
        'Até 12% da renda bruta anual tributável, válido apenas para quem declara no modelo completo e contribui para a previdência oficial.',
    },
    {
      id: 'cp-fc-05',
      frente: 'Qual a diferença essencial entre PGBL e VGBL na tributação do resgate?',
      verso:
        'No PGBL o imposto incide sobre o valor total resgatado, porque o aporte foi deduzido antes. No VGBL incide apenas sobre o rendimento, porque não houve dedução na entrada.',
    },
    {
      id: 'cp-fc-06',
      frente: 'Até quanto pode chegar a menor alíquota da tabela regressiva da previdência privada?',
      verso:
        'Chega a 10% para recursos mantidos por mais de dez anos, a alíquota mais baixa disponível entre os produtos financeiros brasileiros.',
    },
    {
      id: 'cp-fc-07',
      frente: 'O que é inflação de estilo de vida?',
      verso:
        'É o aumento do custo fixo mensal acompanhando cada aumento de renda. O efeito prático é manter a taxa de poupança congelada mesmo com a renda multiplicando ao longo da carreira.',
    },
    {
      id: 'cp-fc-08',
      frente: 'Por que aportar no dia do salário funciona melhor que aportar o que sobra?',
      verso:
        'Porque a despesa tende a se expandir até ocupar toda a renda disponível. Retirar o aporte antes de gastar transforma poupança em custo fixo, o que é o único formato que resiste ao mês difícil.',
    },
    {
      id: 'cp-fc-09',
      frente: 'Começar dez anos mais tarde exige aportar quanto a mais para chegar ao mesmo lugar?',
      verso:
        'Aproximadamente o dobro. Para igualar 30 anos de R$ 1.000 mensais a 6% real, quem começa dez anos depois precisa aportar cerca de R$ 2.150 por mês.',
    },
    {
      id: 'cp-fc-10',
      frente: 'Qual o tamanho recomendado da reserva de emergência?',
      verso:
        'De seis meses de despesa para quem tem renda estável com carteira assinada, até doze meses para autônomos, profissionais liberais e quem tem renda variável.',
    },
    {
      id: 'cp-fc-11',
      frente: 'Por que rebalancear comprando o ativo que caiu, em vez de vender o que subiu?',
      verso:
        'Porque a venda gera imposto sobre o ganho e reduz o capital que continua trabalhando. Redirecionar o aporte novo para a classe abaixo do alvo produz o mesmo efeito sem custo tributário.',
    },
    {
      id: 'cp-fc-12',
      frente: 'Qual erro anula completamente o benefício do PGBL?',
      verso:
        'Contratá-lo declarando no modelo simplificado. Sem a dedução, você fica com a desvantagem de pagar imposto sobre o valor total no resgate, sem receber a vantagem que justificava o produto.',
    },
  ],

  quiz: [
    {
      pergunta:
        'Você tem R$ 10 mil disponíveis, R$ 3 mil de saldo no rotativo do cartão e nenhuma reserva. Qual a sequência correta?',
      alternativas: [
        'Investir tudo em renda variável para acelerar o patrimônio',
        'Quitar o rotativo e destinar o restante à reserva de emergência',
        'Montar a reserva primeiro e quitar o cartão depois, com o rendimento dela',
        'Aplicar em previdência privada para reduzir o imposto',
      ],
      correta: 1,
      explicacao:
        'O rotativo cobra taxas em ordem de grandeza muito superior a qualquer retorno de investimento, então quitá-lo é o melhor retorno garantido possível. Deixar a dívida viva enquanto se monta reserva significa pagar juros altos para render juros baixos. Renda variável e previdência são etapas posteriores na ordem de prioridade.',
    },
    {
      pergunta: 'Qual variável tem maior impacto no patrimônio final de uma acumulação de 30 anos?',
      alternativas: [
        'A escolha da corretora',
        'A taxa de poupança combinada com o tempo de aporte',
        'A escolha entre CDB de banco grande e de banco médio',
        'O momento exato de entrada no mercado',
      ],
      correta: 1,
      explicacao:
        'Taxa de poupança e tempo definem tanto quanto entra quanto por quantos períodos os juros trabalham, e em 30 anos os juros respondem por cerca de dois terços do resultado. Corretora e emissor afetam o retorno na margem. Tentar acertar o momento de entrada tem efeito pequeno e histórico de erro alto.',
    },
    {
      pergunta: 'Com renda bruta anual tributável de R$ 200 mil, qual o valor máximo dedutível em PGBL?',
      alternativas: ['R$ 12 mil', 'R$ 20 mil', 'R$ 24 mil', 'Não há limite'],
      correta: 2,
      explicacao:
        'O limite é de 12% da renda bruta anual tributável, o que resulta em R$ 24 mil. R$ 12 mil corresponderia a 6% e R$ 20 mil a 10%, percentuais que não existem na regra. O limite existe e é justamente o ponto que separa o uso eficiente do produto do desperdício.',
    },
    {
      pergunta: 'Uma pessoa aumenta a renda de R$ 6 mil para R$ 12 mil em oito anos e mantém patrimônio próximo de zero. Qual a explicação mais provável?',
      alternativas: [
        'Rentabilidade ruim dos investimentos escolhidos',
        'Inflação de estilo de vida: o custo fixo subiu junto com a renda',
        'Inflação do IPCA no período',
        'Excesso de reserva de emergência',
      ],
      correta: 1,
      explicacao:
        'Sem taxa de poupança positiva não existe patrimônio a render, então rentabilidade sequer entra na equação. A inflação oficial não explica a ausência total de acumulação com renda dobrada. Reserva de emergência é patrimônio, não sua ausência.',
    },
    {
      pergunta: 'Por que a maioria dos especialistas recomenda rebalancear com aportes novos em vez de vender ativos?',
      alternativas: [
        'Porque vender é proibido antes de dois anos',
        'Porque a venda gera imposto sobre o ganho e reduz o capital que continua rendendo',
        'Porque aportes novos rendem mais que o capital antigo',
        'Porque a corretora cobra taxa maior em vendas de renda fixa',
      ],
      correta: 1,
      explicacao:
        'Redirecionar o aporte para a classe abaixo do alvo restaura a alocação sem realizar ganho tributável e sem tirar capital do mercado. Não existe proibição de venda por prazo. Aporte novo e capital antigo rendem à mesma taxa. Taxas de corretagem existem, mas o motivo central é tributário.',
    },
    {
      pergunta: 'Qual afirmação sobre o carro próprio é correta do ponto de vista patrimonial?',
      alternativas: [
        'É um ativo que valoriza com o tempo e deve compor a carteira',
        'É um bem de uso que se deprecia e gera custos recorrentes, e seu financiamento reduz o patrimônio líquido',
        'Deve ser somado ao patrimônio pelo valor de tabela, sem considerar o financiamento',
        'É equivalente a um investimento em renda fixa de longo prazo',
      ],
      correta: 1,
      explicacao:
        'Carro deprecia e consome seguro, manutenção, IPVA e combustível, sem gerar fluxo de caixa. Contabilizá-lo pelo valor de tabela ignorando o saldo devedor infla artificialmente o patrimônio. Nenhuma dessas características se aproxima de um investimento de renda fixa.',
    },
    {
      pergunta: 'Aportando R$ 1.000 mensais a 6% de juro real, qual a diferença aproximada entre 20 e 30 anos de acumulação?',
      alternativas: [
        'Cerca de R$ 150 mil, proporcional ao tempo adicional',
        'Cerca de R$ 522 mil, porque o crescimento não é proporcional ao tempo',
        'Cerca de R$ 360 mil, equivalente aos aportes adicionais',
        'Nenhuma diferença relevante, já que o aporte é o mesmo',
      ],
      correta: 1,
      explicacao:
        'São aproximadamente R$ 453 mil em 20 anos e R$ 975 mil em 30 anos, uma diferença de cerca de R$ 522 mil produzida por apenas R$ 120 mil de aportes adicionais. O crescimento é exponencial, não linear, e é justamente na última década que os juros pesam mais.',
    },
    {
      pergunta: 'Qual a melhor destinação para a reserva de emergência?',
      alternativas: [
        'Tesouro IPCA+ 2045, para proteger da inflação no longo prazo',
        'Tesouro Selic ou CDB de liquidez diária com garantia do FGC',
        'Fundo de ações com histórico consistente',
        'Fundo imobiliário que paga rendimento mensal',
      ],
      correta: 1,
      explicacao:
        'Reserva de emergência exige liquidez imediata e ausência de risco de marcação, que é exatamente o perfil do Tesouro Selic e do CDB de liquidez diária. O IPCA+ longo oscila fortemente e pode estar em prejuízo justamente quando o imprevisto acontecer. Ações e fundos imobiliários têm volatilidade incompatível com a função de reserva.',
    },
  ],

  faq: [
    {
      pergunta: 'Com quanto dá para começar a construir patrimônio?',
      resposta:
        'Com o valor mínimo de um título do Tesouro Direto, que fica na casa de algumas dezenas de reais. O valor inicial importa muito menos do que a instalação do hábito, porque o que se está construindo nos primeiros meses é o sistema, e não o montante. Quem começa com R$ 100 mensais e sobe conforme a renda cresce chega mais longe do que quem espera ter um valor grande para começar.',
    },
    {
      pergunta: 'Vale a pena amortizar financiamento imobiliário ou investir o dinheiro?',
      resposta:
        'Compare a taxa efetiva do financiamento, incluindo seguros e taxas administrativas, com o retorno líquido de imposto que você espera obter. Se o financiamento custa mais do que o investimento rende líquido, amortizar vence, e no sistema SAC a amortização reduzindo prazo economiza mais juros do que reduzindo parcela. Há ainda o componente não financeiro: quitar dívida diminui risco e libera fluxo mensal.',
    },
    {
      pergunta: 'FGTS conta como patrimônio?',
      resposta:
        'Conta, mas é uma parcela com regras próprias de saque e rendimento historicamente baixo, atrelado à TR mais 3% ao ano somados à distribuição de resultados. Por isso ele costuma perder para a inflação em períodos de preço em alta. Inclua no seu balanço patrimonial, mas não conte com ele como motor de acumulação nem como reserva de emergência, já que o acesso é restrito.',
    },
    {
      pergunta: 'Devo investir enquanto pago financiamento do carro?',
      resposta:
        'Depende da taxa. Financiamento de veículo costuma custar bem mais do que o retorno líquido de investimentos conservadores, o que favorece quitar antes. A exceção é manter a reserva de emergência intacta: ficar sem reserva para adiantar parcelas cria o risco de voltar ao rotativo no primeiro imprevisto, o que sai muito mais caro.',
    },
    {
      pergunta: 'Preciso diversificar entre muitos produtos para construir patrimônio?',
      resposta:
        'Não. Diversificação relevante acontece entre classes de ativo, não entre quantidade de produtos. Uma carteira com liquidez em pós-fixado, uma parcela indexada à inflação, uma parcela em renda variável e uma exposição internacional já cobre a maior parte do benefício. Acumular dezenas de produtos parecidos aumenta o trabalho de acompanhamento sem reduzir risco.',
    },
    {
      pergunta: 'Como fica a construção de patrimônio para quem tem renda variável, como autônomos?',
      resposta:
        'Duas adaptações resolvem a maior parte do problema. A primeira é definir o aporte como percentual da entrada e não como valor fixo, o que faz o sistema funcionar tanto no mês bom quanto no ruim. A segunda é ampliar a reserva de emergência para doze meses de despesa, porque a irregularidade da renda é justamente o risco que a reserva existe para cobrir.',
    },
    {
      pergunta: 'Devo esperar a bolsa cair para começar a aportar?',
      resposta:
        'O histórico mostra que aportes regulares independentemente do nível de preço superam a tentativa de esperar o momento certo, principalmente porque as maiores altas costumam acontecer em poucos dias concentrados e imprevisíveis. Se preferir cautela, divida o valor em parcelas mensais fixas ao longo de alguns meses, que é uma forma de reduzir o impacto do ponto de entrada sem ficar fora do mercado.',
    },
  ],
}
