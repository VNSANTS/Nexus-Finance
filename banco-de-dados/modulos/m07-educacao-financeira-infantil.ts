import type { Modulo } from '@/types'

export const educacaoFinanceiraInfantil: Modulo = {
  id: 'educacao-financeira-infantil',
  trilhaId: 'fundamentos',
  numero: 7,
  titulo: 'Educação Financeira Infantil',
  subtitulo: 'Como ensinar seus filhos sobre dinheiro sem repetir o tabu que você viveu',
  iconName: 'Baby',
  duracaoMin: 9,

  nivel: 'iniciante',
  preRequisitos: ['psicologia-do-dinheiro'],
  objetivoAprendizagem: 'Você vai sair com uma abordagem prática, por faixa etária, para ensinar dinheiro aos seus filhos sem transformar o assunto em tabu ou fonte de medo.',
  erroFatal: 'Dar mesada sem nenhuma conversa sobre escolha e consequência — a criança recebe o dinheiro, mas nunca aprende a decidir com ele, o que adia o aprendizado real para a vida adulta, de forma mais cara.',
  numeroChave: {
    valor: '1 em cada 3',
    legenda: 'jovens brasileiros chega à vida adulta sem nunca ter tido uma conversa estruturada sobre dinheiro em casa, segundo levantamentos recorrentes sobre educação financeira nas famílias'
  },
  glossarioDoModulo: ['mesada com propósito', 'potes de dinheiro', 'atraso de gratificação', 'dinheiro físico vs. digital', 'consequência natural'],
  proximoPasso: { moduloId: 'formacao-investidor', motivo: 'Depois de entender como formar a relação da próxima geração com dinheiro, o próximo passo natural é entender como se forma um investidor de verdade, na prática.' },

  aprender: {
    oQueE: 'Educação financeira infantil é o processo de ensinar crianças e adolescentes, de forma apropriada para cada idade, a lidar com dinheiro — o que ele vale, como se ganha, como se escolhe entre gastar, guardar e doar. O objetivo não é transformar a criança em investidora precoce, mas construir noções básicas de escolha, consequência e paciência que vão sustentar toda a vida financeira adulta.',
    porQueImporta: 'A maioria dos adultos aprende sobre dinheiro por tentativa e erro, já endividados ou já cometendo os mesmos deslizes que os pais cometeram — porque a escola raramente ensina isso e em casa o assunto costuma ser tabu. Crianças que crescem com alguma prática de decisão financeira (mesmo que só com mesada) chegam à vida adulta com menos ansiedade e mais capacidade de lidar com escolhas financeiras reais.',
    naPratica: 'No Brasil, a prática mais comum de educação financeira infantil ainda é a mesada — mas o método faz toda a diferença: dar o valor sem nenhuma conversa ensina pouco, enquanto vincular a mesada a pequenas responsabilidades e deixar a criança decidir como gastar dentro de categorias (o método dos "potes": gastar, guardar, doar) ensina de fato. Crianças pequenas aprendem melhor com dinheiro físico (cédulas e moedas, ou um cofrinho transparente) do que com valores abstratos numa tela, porque conseguem visualizar a quantidade diminuindo. Adolescentes se beneficiam de ter uma conta digital própria (há opções de contas para menores de idade vinculadas à conta dos pais) para praticar decisões com supervisão, mas com autonomia real.',
    passoAPasso: [
      'Comece cedo (a partir dos 4-5 anos) com conceitos simples: dinheiro é limitado, escolhas têm consequência.',
      'Use dinheiro físico ou um sistema visual (potes, cofrinhos) para crianças pequenas visualizarem a quantidade.',
      'Implemente uma mesada vinculada a pequenas responsabilidades, não como pagamento por tarefas domésticas básicas, mas como prática de gestão.',
      'Divida a mesada em categorias desde cedo: uma parte para gastar agora, uma para guardar, uma para doar.',
      'Deixe a criança errar em decisões de baixo risco (gastar tudo rápido e ficar sem dinheiro pro resto da semana) sem resgatar a consequência.',
      'Com adolescentes, avance para conceitos mais complexos: juros, conta digital própria, primeiro cartão pré-pago, noção básica de investimento.',
      'Fale abertamente sobre dinheiro em casa, dentro do apropriado para a idade, quebrando o ciclo do tabu.'
    ],
    errosComuns: [
      'Dar mesada sem nenhuma conversa sobre escolha, transformando-a em apenas um valor recebido passivamente.',
      'Resgatar a criança sempre que ela erra financeiramente, impedindo que ela sinta a consequência natural da escolha.',
      'Vincular toda mesada a tarefas domésticas básicas, ensinando que cuidar da própria casa é um favor remunerado, não uma responsabilidade.',
      'Falar sobre dinheiro só em tom de crise ou preocupação, associando o tema a ansiedade em vez de planejamento.',
      'Pular direto para conceitos avançados (investimento, cartão de crédito) sem passar pelas noções básicas de escolha e limite.',
      'Comparar a mesada ou os gastos do filho com os de outras crianças, gerando competição em vez de aprendizado.'
    ],
    comparativo: {
      titulo: 'Mesada tradicional vs. mesada com propósito',
      linhas: [
        { label: 'Como é dada', valor: 'Tradicional: valor fixo, sem conversa | Com propósito: valor fixo + conversa sobre categorias (gastar/guardar/doar)' },
        { label: 'O que ensina', valor: 'Tradicional: só o hábito de receber | Com propósito: prática de escolha e consequência' },
        { label: 'Reação ao erro da criança', valor: 'Tradicional: pais resgatam ou repõem | Com propósito: consequência natural é mantida' },
        { label: 'Resultado esperado no longo prazo', valor: 'Tradicional: pouca mudança de comportamento | Com propósito: mais autonomia financeira na vida adulta' }
      ]
    },
    checklist: [
      'Defina uma mesada (ou sistema equivalente) para seu filho, dividida em categorias claras.',
      'Use um cofrinho ou pote visual para crianças pequenas visualizarem o dinheiro.',
      'Deixe a criança tomar pelo menos uma decisão de gasto por semana, sem interferência.',
      'Converse abertamente, no nível apropriado para a idade, sobre uma decisão financeira da família.',
      'Para adolescentes, avalie abrir uma conta digital para menores vinculada à sua.'
    ],
    livroRelacionado: {
      livroId: 'habitos-atomicos',
      textoConexao: 'James Clear mostra que hábitos se formam por repetição pequena e visível, não por força de vontade — exatamente o princípio por trás de dar à criança decisões de gasto reais e recorrentes, em vez de só uma explicação teórica sobre dinheiro.',
    },
  },

  mapaMental: {
    label: 'Educação Financeira Infantil',
    subtitulo: 'Como ensinar dinheiro por faixa etária',
    ramos: [
      {
        id: 'primeira-infancia',
        label: 'Primeira Infância (4-7 anos)',
        cor: '#3B82F6',
        resumo: 'Noções concretas e visuais',
        filhos: [
          { label: 'Dinheiro é limitado', desc: 'Conceito básico de que dinheiro acaba se for todo gasto' },
          { label: 'Dinheiro físico', desc: 'Cédulas, moedas e cofrinhos transparentes ajudam a visualizar quantidade' },
          { label: 'Escolha simples', desc: 'Deixar escolher entre dois itens dentro de um valor limitado' }
        ]
      },
      {
        id: 'infancia-intermediaria',
        label: 'Infância (8-11 anos)',
        cor: '#F59E0B',
        resumo: 'Introdução da mesada e categorias',
        filhos: [
          { label: 'Mesada com propósito', desc: 'Valor fixo dividido entre gastar, guardar e doar' },
          { label: 'Consequência natural', desc: 'Deixar a criança sentir o resultado de gastar tudo rápido' },
          { label: 'Metas pequenas', desc: 'Guardar para um item específico que a criança escolheu' }
        ]
      },
      {
        id: 'adolescencia',
        label: 'Adolescência (12-17 anos)',
        cor: '#8B5CF6',
        resumo: 'Ferramentas digitais e conceitos mais complexos',
        filhos: [
          { label: 'Conta digital própria', desc: 'Conta para menores vinculada à conta dos pais, com supervisão' },
          { label: 'Noção de juros', desc: 'Entender juros simples e compostos de forma prática' },
          { label: 'Primeiro trabalho/renda', desc: 'Estágio, freela ou trabalho de meio período gerando renda própria' }
        ]
      },
      {
        id: 'papel-dos-pais',
        label: 'Papel dos Pais',
        cor: '#10B981',
        resumo: 'Como sustentar o processo em casa',
        filhos: [
          { label: 'Falar abertamente', desc: 'Conversar sobre dinheiro no nível apropriado, sem tabu nem drama' },
          { label: 'Modelar comportamento', desc: 'Crianças absorvem mais o que veem os pais fazendo do que o que ouvem' },
          { label: 'Não resgatar todo erro', desc: 'Permitir consequências naturais em decisões de baixo risco' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você decide como reagir em situações reais do dia a dia com seus filhos e vê o efeito de cada abordagem no aprendizado deles.',
    passos: [
      'Leia a situação com um filho ou filha (real ou hipotética).',
      'Escolha a reação que você mais provavelmente teria.',
      'Veja a reflexão sobre o efeito dessa reação no aprendizado financeiro da criança.'
    ],
    exemploGuiado: 'Situação: seu filho de 9 anos gasta toda a mesada da semana no primeiro dia, comprando um brinquedo pequeno, e depois pede mais dinheiro porque quer ir ao cinema com os amigos. Reação que resgata o erro: dar o dinheiro extra "só dessa vez" — a criança aprende que gastar tudo não tem consequência real. Reação que ensina: explicar com carinho que a mesada da semana já foi usada e que, para o cinema, ela pode planejar melhor na próxima semana — a criança sente a consequência de forma segura, sem punição, e aprende a se planejar.',
    cenarioGuiado: [
      {
        pergunta: 'Seu filho gasta toda a mesada da semana no primeiro dia e pede mais dinheiro para um passeio com amigos.',
        opcoes: [
          { texto: 'Dou o dinheiro extra "só dessa vez" para ele não ficar de fora', resultado: 'A criança aprende que gastar tudo rápido não tem consequência real, o que dificulta aprender a se planejar no futuro.' },
          { texto: 'Explico que a mesada já acabou e que ele pode se planejar melhor na próxima semana', resultado: 'A criança sente a consequência natural de forma segura, sem punição — a base do aprendizado real sobre limites financeiros.' }
        ]
      },
      {
        pergunta: 'Sua filha de 6 anos quer saber quanto você ganha no trabalho.',
        opcoes: [
          { texto: 'Digo que isso não é assunto para criança e mudo de assunto', resultado: 'Reforça o tabu do dinheiro desde cedo, que tende a se manter na vida adulta dela.' },
          { texto: 'Respondo de forma simples e apropriada para a idade, sem entrar em detalhes desnecessários', resultado: 'Trata dinheiro como assunto normal de conversa, no nível adequado, sem criar mistério ou tabu em torno do tema.' }
        ]
      },
      {
        pergunta: 'Seu filho adolescente quer uma conta digital própria para receber e gastar o dinheiro que ganha de um trabalho de meio período.',
        opcoes: [
          { texto: 'Não deixo, prefiro controlar todo o dinheiro dele até ele ser maior de idade', resultado: 'Adia a prática real de gestão financeira para depois dos 18, quando os erros custam mais caro.' },
          { texto: 'Abro uma conta digital para menores, vinculada à minha, com supervisão', resultado: 'Permite que ele pratique decisões financeiras reais, com autonomia e supervisão adequadas à idade.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'efi-01', frente: 'A partir de que idade é recomendado começar noções básicas de dinheiro com crianças?', verso: 'Por volta dos 4-5 anos, com conceitos simples como "dinheiro é limitado" e escolhas básicas entre itens.' },
    { id: 'efi-02', frente: 'O que é "mesada com propósito"?', verso: 'Uma mesada dividida desde o início em categorias (gastar, guardar, doar), com conversa sobre escolha, em vez de só um valor entregue sem contexto.' },
    { id: 'efi-03', frente: 'Por que dinheiro físico é melhor para crianças pequenas do que valores digitais?', verso: 'Porque a criança consegue visualizar concretamente a quantidade diminuindo, o que ajuda a entender que dinheiro é limitado.' },
    { id: 'efi-04', frente: 'O que é "consequência natural" na educação financeira infantil?', verso: 'Deixar a criança sentir o resultado real de uma decisão financeira (como gastar tudo rápido) em vez de os pais resgatarem o erro.' },
    { id: 'efi-05', frente: 'Qual o erro comum de vincular mesada a tarefas domésticas básicas?', verso: 'Ensina que cuidar da própria casa é um favor remunerado, e não uma responsabilidade compartilhada da família.' },
    { id: 'efi-06', frente: 'O que muda na educação financeira na adolescência?', verso: 'Entram conceitos mais complexos: conta digital própria, noção de juros, e eventualmente a primeira renda de um trabalho ou estágio.' },
    { id: 'efi-07', frente: 'Por que o exemplo dos pais é tão importante na educação financeira dos filhos?', verso: 'Crianças absorvem mais o comportamento financeiro que observam em casa do que as instruções verbais que recebem.' },
    { id: 'efi-08', frente: 'O que é o método dos "potes" na mesada?', verso: 'Dividir o dinheiro recebido em categorias visuais — geralmente gastar, guardar e doar — para que a criança pratique alocação desde cedo.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o principal problema de dar mesada sem nenhuma conversa sobre escolha ou consequência?',
      alternativas: [
        'A criança gasta menos do que deveria',
        'A criança recebe o valor, mas não aprende a decidir com ele',
        'Isso é ilegal em algumas famílias',
        'A criança vai automaticamente economizar mais'
      ],
      correta: 1,
      explicacao: 'O valor da mesada sozinho não ensina nada — o aprendizado vem da prática de escolher entre categorias e sentir a consequência dessa escolha, algo que só acontece com conversa e contexto.'
    },
    {
      pergunta: 'Por que dinheiro físico costuma funcionar melhor do que valores digitais para crianças pequenas?',
      alternativas: [
        'Porque dinheiro digital é ilegal para menores de idade',
        'Porque a criança visualiza concretamente a quantidade diminuindo, o que ajuda a entender limite',
        'Porque dinheiro físico rende juros',
        'Porque não existe opção de conta digital para menores no Brasil'
      ],
      correta: 1,
      explicacao: 'A concretude do dinheiro físico ajuda crianças pequenas, que ainda não têm pensamento abstrato bem desenvolvido, a entender de forma visual que o dinheiro é finito.'
    },
    {
      pergunta: 'O que caracteriza "consequência natural" na educação financeira infantil?',
      alternativas: [
        'Os pais sempre repõem o dinheiro gasto',
        'A criança sente o resultado real de uma escolha, sem os pais resgatarem o erro',
        'A criança nunca pode errar',
        'Os pais decidem tudo pela criança'
      ],
      correta: 1,
      explicacao: 'Deixar a consequência natural acontecer (dentro de decisões de baixo risco) é o que ensina de fato — resgatar sempre o erro remove a lição.'
    },
    {
      pergunta: 'Qual prática é recomendada para adolescentes praticarem gestão financeira com mais autonomia?',
      alternativas: [
        'Nunca deixar o adolescente lidar com dinheiro até os 18 anos',
        'Abrir uma conta digital para menores, vinculada à conta dos pais, com supervisão',
        'Dar cartão de crédito sem limite',
        'Controlar 100% de todo o dinheiro que o adolescente ganha'
      ],
      correta: 1,
      explicacao: 'Contas digitais para menores, vinculadas à dos pais, permitem prática real de decisão financeira com supervisão adequada, sem adiar todo o aprendizado para depois da maioridade.'
    },
    {
      pergunta: 'Por que vincular toda a mesada a tarefas domésticas básicas (como arrumar a própria cama) é considerado um erro comum?',
      alternativas: [
        'Porque tarefas domésticas não deveriam existir',
        'Porque ensina que responsabilidades básicas da própria vida são um favor remunerado, e não parte natural de viver em família',
        'Porque isso é proibido por lei',
        'Porque a criança vai recusar fazer qualquer tarefa'
      ],
      correta: 1,
      explicacao: 'Responsabilidades básicas de autocuidado e convivência em família fazem parte do papel da criança na casa, independente de remuneração; misturar isso com mesada distorce essa lição.'
    },
    {
      pergunta: 'O que o módulo recomenda em relação a falar sobre dinheiro em casa?',
      alternativas: [
        'Evitar completamente o assunto até a maioridade',
        'Falar apenas em tom de crise, para a criança entender a gravidade',
        'Conversar abertamente, no nível apropriado para a idade, quebrando o tabu financeiro',
        'Deixar a escola ser totalmente responsável por esse ensino'
      ],
      correta: 2,
      explicacao: 'Conversar abertamente, de forma apropriada à idade, é a recomendação central do módulo — isso quebra o ciclo do tabu financeiro que costuma se repetir entre gerações.'
    }
  ],

  faq: [
    { pergunta: 'Qual a idade ideal para começar a dar mesada?', resposta: 'Não há uma idade exata obrigatória, mas por volta dos 6-8 anos, quando a criança já entende noções básicas de contagem e escolha, costuma ser um bom momento para começar com valores pequenos.' },
    { pergunta: 'Devo pagar meu filho para tirar notas boas na escola?', resposta: 'A recomendação geral é evitar vincular dinheiro a desempenho escolar, já que isso pode distorcer a motivação para estudar, transformando aprendizado em transação. É preferível manter a mesada ligada à prática de gestão financeira, separada do desempenho acadêmico.' },
    { pergunta: 'E se meu filho gastar toda a mesada em algo que considero bobagem?', resposta: 'Dentro de decisões de baixo risco, é justamente isso que ensina — deixe a escolha acontecer e converse depois sobre o resultado, sem repor o dinheiro perdido nem fazer um grande drama sobre a decisão.' },
    { pergunta: 'Contas digitais para menores de idade são seguras?', resposta: 'As principais opções do mercado brasileiro têm supervisão parental integrada (limites de gasto, notificações para os pais), o que permite autonomia real da criança ou adolescente com controle dos responsáveis.' },
    { pergunta: 'Como falo sobre dívidas da família sem assustar meus filhos?', resposta: 'De forma simples e sem dramatização: é possível explicar que a família está organizando as contas e ajustando gastos, sem detalhar valores ou transmitir uma sensação de crise que não cabe à criança processar.' },
    { pergunta: 'Existe uma idade em que já é "tarde demais" para começar a ensinar isso?', resposta: 'Não. Mesmo adolescentes que nunca tiveram nenhuma prática financeira em casa se beneficiam de começar agora — o aprendizado é cumulativo e vale começar a qualquer momento antes da vida adulta.' }
  ]
}
