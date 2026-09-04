import type { Modulo } from '@/types'

export const formacaoInvestidor: Modulo = {
  id: 'formacao-investidor',
  trilhaId: 'fundamentos',
  numero: 8,
  titulo: 'Formação do Investidor',
  subtitulo: 'O caminho real, em etapas, de quem nunca investiu até quem investe com autonomia',
  iconName: 'GraduationCap',
  duracaoMin: 10,

  nivel: 'iniciante',
  preRequisitos: ['educacao-financeira-infantil', 'psicologia-financeira'],
  objetivoAprendizagem: 'Você vai sair sabendo exatamente qual é a sua etapa atual como investidor e qual é o próximo passo concreto, sem pular etapas por ansiedade ou hype.',
  erroFatal: 'Pular direto para produtos complexos (ações individuais, opções, criptoativos) sem antes ter reserva de emergência formada e sem entender renda fixa básica — investir "avançado" sem ter passado pelo "básico" é a causa mais comum de perdas evitáveis.',
  numeroChave: {
    valor: 'menos de 20%',
    legenda: 'da população brasileira investe além da poupança, segundo levantamentos recorrentes da Anbima sobre hábitos de investimento no país — a maioria nunca sai da primeira etapa da formação do investidor'
  },
  glossarioDoModulo: ['reserva de emergência', 'perfil de investidor', 'CDI', 'diversificação', 'horizonte de investimento', 'autonomia do investidor'],
  proximoPasso: { moduloId: 'alocacao-ativos', motivo: 'Com as etapas da formação entendidas, o próximo passo natural é aprender a distribuir o patrimônio entre classes de ativos de forma estruturada.' },

  aprender: {
    oQueE: 'Formação do investidor é o caminho, em etapas, que leva alguém de "nunca ter investido" até "investir com autonomia e critério próprio". Não é um processo instantâneo nem depende de sorte — é cumulativo: cada etapa depende da anterior estar minimamente consolidada, o que explica por que pular etapas costuma sair caro.',
    porQueImporta: 'A maior parte das perdas evitáveis em investimentos no Brasil não vem de "escolher o ativo errado" — vem de investir numa etapa que a pessoa ainda não estava preparada para lidar: alguém sem reserva de emergência que precisa resgatar um investimento de risco no pior momento para cobrir uma emergência, ou alguém que nunca entendeu renda fixa básica e vai direto para ações individuais achando que vai "ficar rico rápido". Entender em que etapa você está evita decisões fora de ordem.',
    naPratica: 'No Brasil, o caminho típico de formação passa por: (1) organizar o orçamento e sair de dívidas caras (cartão de crédito, cheque especial); (2) construir uma reserva de emergência em ativo líquido e seguro (geralmente Tesouro Selic ou CDB com liquidez diária, cobrindo de 3 a 12 meses de despesas); (3) entender e usar renda fixa básica além da poupança (CDB, Tesouro Direto, LCI/LCA); (4) descobrir o próprio perfil de investidor (conservador, moderado, arrojado) via suitability, exigido pelas corretoras pela CVM; (5) diversificar para renda variável de forma gradual (fundos, ETFs, ações), sempre alinhado ao horizonte de tempo; (6) só depois avançar para produtos mais complexos (ações individuais com análise própria, fundos imobiliários, investimento internacional) com autonomia real de decisão.',
    passoAPasso: [
      'Verifique se você tem dívidas caras em aberto (cartão de crédito, cheque especial) — quite-as antes de qualquer investimento de risco, porque o custo dessas dívidas costuma superar qualquer retorno de investimento.',
      'Construa uma reserva de emergência líquida (Tesouro Selic ou CDB com liquidez diária) cobrindo de 3 a 12 meses de despesas essenciais.',
      'Aprenda renda fixa básica (CDB, Tesouro Direto, LCI/LCA) antes de qualquer produto de risco maior.',
      'Faça o teste de suitability na sua corretora para identificar seu perfil de investidor real.',
      'Comece a diversificar para renda variável de forma gradual e pequena, alinhada ao seu horizonte de tempo.',
      'Só avance para produtos complexos (ações individuais, fundos imobiliários, opções, investimento internacional) depois de já operar com autonomia nas etapas anteriores.'
    ],
    errosComuns: [
      'Investir em renda variável antes de ter reserva de emergência, precisando resgatar no pior momento por causa de um imprevisto.',
      'Manter dinheiro parado só na poupança por anos, sem aprender renda fixa básica, perdendo rentabilidade de forma constante.',
      'Pular direto para ações individuais ou criptoativos sem entender os fundamentos de renda fixa e diversificação.',
      'Ignorar ou preencher o teste de suitability sem sinceridade, distorcendo a própria percepção de risco.',
      'Confundir "estar numa etapa avançada" com "ter mais dinheiro" — a etapa é sobre conhecimento e processo, não sobre patrimônio.',
      'Comparar sua etapa de formação com a de outra pessoa nas redes sociais e pular etapas por pressa ou comparação.'
    ],
    comparativo: {
      titulo: 'Etapas da formação do investidor',
      linhas: [
        { label: 'Etapa 1', valor: 'Organização financeira e quitação de dívidas caras' },
        { label: 'Etapa 2', valor: 'Reserva de emergência em ativo líquido e seguro' },
        { label: 'Etapa 3', valor: 'Renda fixa básica além da poupança (CDB, Tesouro, LCI/LCA)' },
        { label: 'Etapa 4', valor: 'Descoberta do perfil de investidor via suitability' },
        { label: 'Etapa 5', valor: 'Diversificação gradual para renda variável (fundos, ETFs, ações)' },
        { label: 'Etapa 6', valor: 'Produtos complexos com autonomia real (ações individuais, FIIs, internacional)' }
      ]
    },
    checklist: [
      'Liste todas as suas dívidas atuais e identifique quais têm juros mais altos que qualquer investimento razoável.',
      'Calcule quantos meses de despesas essenciais sua reserva de emergência atual cobre.',
      'Se ainda não fez, faça o teste de suitability na sua corretora.',
      'Identifique em qual das 6 etapas você está hoje, com honestidade.',
      'Defina qual é o próximo passo concreto — não o passo 6, o próximo depois do que você já concluiu.'
    ],
    livroRelacionado: {
      livroId: 'homem-mais-rico-babilonia',
      textoConexao: 'Os princípios atemporais do livro (pague-se primeiro, controle os gastos, faça o dinheiro trabalhar) formam a base de qualquer uma das 6 etapas descritas aqui — é o ponto de partida clássico para quem está começando do zero.',
    },
    naoConfundirCom: [
      { moduloId: 'alocacao-ativos', diferenca: 'Este módulo trata das etapas cronológicas de amadurecimento do investidor; o outro trata de como distribuir o patrimônio já formado entre classes de ativos.' }
    ]
  },

  mapaMental: {
    label: 'Formação do Investidor',
    subtitulo: 'O caminho em etapas, do zero à autonomia',
    ramos: [
      {
        id: 'base',
        label: 'Base Financeira',
        cor: '#EF4444',
        resumo: 'Pré-requisitos antes de qualquer investimento',
        filhos: [
          { label: 'Quitação de dívidas caras', desc: 'Cartão de crédito e cheque especial primeiro' },
          { label: 'Orçamento organizado', desc: 'Saber para onde vai o dinheiro todo mês' }
        ]
      },
      {
        id: 'seguranca',
        label: 'Segurança',
        cor: '#F59E0B',
        resumo: 'Reserva de emergência antes de qualquer risco',
        filhos: [
          { label: 'Tesouro Selic', desc: 'Ativo líquido e seguro, referência para reserva de emergência' },
          { label: 'CDB com liquidez diária', desc: 'Alternativa de banco/corretora para reserva' },
          { label: 'Meses de cobertura', desc: 'De 3 a 12 meses de despesas essenciais, conforme estabilidade de renda' }
        ]
      },
      {
        id: 'fundamentos-investimento',
        label: 'Fundamentos de Investimento',
        cor: '#3B82F6',
        resumo: 'Renda fixa básica e autoconhecimento',
        filhos: [
          { label: 'Renda fixa além da poupança', desc: 'CDB, Tesouro Direto, LCI/LCA' },
          { label: 'Perfil de investidor', desc: 'Suitability define conservador, moderado ou arrojado' },
          { label: 'Horizonte de tempo', desc: 'Quanto tempo o dinheiro pode ficar investido sem necessidade' }
        ]
      },
      {
        id: 'expansao',
        label: 'Expansão para Renda Variável',
        cor: '#8B5CF6',
        resumo: 'Diversificação gradual e cautelosa',
        filhos: [
          { label: 'Fundos e ETFs', desc: 'Diversificação instantânea, boa porta de entrada para renda variável' },
          { label: 'Ações via análise própria', desc: 'Só depois de entender fundamentos, com posição pequena inicial' }
        ]
      },
      {
        id: 'autonomia',
        label: 'Autonomia Plena',
        cor: '#10B981',
        resumo: 'Produtos complexos e decisão independente',
        filhos: [
          { label: 'Fundos imobiliários', desc: 'Exposição a imóveis com liquidez de bolsa' },
          { label: 'Investimento internacional', desc: 'Diversificação de moeda e geografia' },
          { label: 'Produtos sofisticados', desc: 'Opções e alternativos, só com conhecimento técnico consolidado' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: 'Reserva de Emergência',
    intro: 'Use a calculadora de Reserva de Emergência para descobrir, com base nas suas despesas mensais reais, quanto você precisa ter guardado antes de avançar para as próximas etapas.',
    passos: [
      'Informe suas despesas essenciais mensais (moradia, alimentação, transporte, contas fixas).',
      'Informe a estabilidade da sua renda (CLT, autônomo, empresário) para calibrar quantos meses de cobertura você precisa.',
      'Veja o valor total recomendado de reserva de emergência.',
      'Compare com o que você já tem guardado hoje para saber sua distância até a próxima etapa.'
    ],
    exemploGuiado: 'Exemplo: uma pessoa com despesas essenciais de R$3.000/mês e renda de CLT estável precisa de uma reserva de emergência de cerca de 6 meses de despesas, ou seja, R$18.000, guardados em Tesouro Selic ou CDB com liquidez diária. Se ela já tem R$8.000 guardados, ainda faltam R$10.000 antes de avançar com tranquilidade para diversificação em renda variável — até lá, o foco deve continuar sendo completar a reserva, não acelerar para produtos de risco.'
  },

  flashcards: [
    { id: 'fi-01', frente: 'Qual é a primeira etapa da formação do investidor, antes de qualquer investimento?', verso: 'Organizar o orçamento e quitar dívidas caras, como cartão de crédito e cheque especial, já que o custo dessas dívidas costuma superar qualquer retorno de investimento.' },
    { id: 'fi-02', frente: 'Por que a reserva de emergência vem antes da renda variável na formação do investidor?', verso: 'Porque sem reserva líquida, um imprevisto obriga a resgatar investimentos de risco no pior momento possível, transformando uma queda temporária em prejuízo real.' },
    { id: 'fi-03', frente: 'O que é suitability?', verso: 'O teste de perfil de investidor exigido pela CVM às corretoras, que classifica o investidor em conservador, moderado ou arrojado, orientando quais produtos são adequados.' },
    { id: 'fi-04', frente: 'Onde normalmente se guarda a reserva de emergência?', verso: 'Em ativos líquidos e seguros, como Tesouro Selic ou CDB com liquidez diária, que permitem resgate rápido sem grande risco de perda de valor.' },
    { id: 'fi-05', frente: 'Quantos meses de despesas uma reserva de emergência costuma cobrir?', verso: 'Entre 3 e 12 meses de despesas essenciais, dependendo da estabilidade da renda — autônomos e empresários costumam precisar de reservas maiores que CLTs.' },
    { id: 'fi-06', frente: 'Qual é o erro mais comum de quem pula etapas na formação do investidor?', verso: 'Investir diretamente em produtos complexos (ações individuais, criptoativos) sem ter reserva de emergência ou entender renda fixa básica, aumentando o risco de perdas evitáveis.' },
    { id: 'fi-07', frente: 'O que caracteriza a etapa de "autonomia plena" do investidor?', verso: 'A capacidade de tomar decisões sobre produtos complexos (fundos imobiliários, investimento internacional, ativos sofisticados) com conhecimento técnico próprio consolidado.' },
    { id: 'fi-08', frente: 'Por que renda fixa básica costuma vir antes da renda variável na formação do investidor?', verso: 'Porque renda fixa introduz conceitos fundamentais (taxa, prazo, liquidez, tributação) de forma mais simples e previsível, servindo de base para entender produtos mais complexos depois.' }
  ],

  quiz: [
    {
      pergunta: 'Qual etapa deve vir antes de qualquer investimento em renda variável, segundo a formação do investidor?',
      alternativas: ['Comprar ações de empresas conhecidas', 'Ter uma reserva de emergência formada', 'Fazer day trade para acumular capital', 'Investir em criptoativos'],
      correta: 1,
      explicacao: 'Sem reserva de emergência, qualquer imprevisto obriga a resgatar investimentos de risco no pior momento possível, o que costuma transformar uma queda temporária em prejuízo real e evitável.'
    },
    {
      pergunta: 'O que é o teste de suitability, exigido pela CVM às corretoras?',
      alternativas: [
        'Um teste de conhecimento sobre a bolsa de valores',
        'Um questionário que classifica o perfil de risco do investidor (conservador, moderado, arrojado)',
        'Uma avaliação de crédito para liberar cartão',
        'Um exame obrigatório para comprar ações'
      ],
      correta: 1,
      explicacao: 'O suitability é o questionário de perfil de investidor, exigido regulatoriamente, que orienta quais produtos são adequados ao risco que cada pessoa está disposta e apta a assumir.'
    },
    {
      pergunta: 'Por que dívidas de cartão de crédito e cheque especial devem ser quitadas antes de investir?',
      alternativas: [
        'Porque investir com dívidas é proibido por lei',
        'Porque o custo dessas dívidas costuma superar qualquer retorno razoável de investimento',
        'Porque dívidas impedem abrir conta em corretora',
        'Porque isso reduz o perfil de investidor'
      ],
      correta: 1,
      explicacao: 'As taxas de juros de cartão de crédito e cheque especial estão entre as mais altas do mercado, geralmente muito acima de qualquer retorno esperado de investimento — quitar essas dívidas primeiro é matematicamente mais vantajoso.'
    },
    {
      pergunta: 'Segundo levantamentos recorrentes sobre hábitos de investimento no Brasil, qual é aproximadamente a parcela da população que investe além da poupança?',
      alternativas: ['Mais de 80%', 'Cerca de metade', 'Menos de 20%', 'Praticamente 100%'],
      correta: 2,
      explicacao: 'A maior parte da população brasileira ainda não avança além da poupança na formação como investidor, ficando nas primeiras etapas do processo.'
    },
    {
      pergunta: 'Qual é o principal risco de pular direto para ações individuais sem passar pelas etapas anteriores?',
      alternativas: [
        'Nenhum risco relevante, já que ações são sempre seguras no longo prazo',
        'Investir sem reserva de emergência e sem entender fundamentos, aumentando a chance de decisões ruins sob pressão',
        'Pagar mais imposto de renda',
        'Ser impedido pela corretora de comprar ações'
      ],
      correta: 1,
      explicacao: 'Sem as etapas anteriores consolidadas (reserva de emergência, entendimento de renda fixa, perfil de investidor), o investidor fica mais vulnerável a decisões emocionais e perdas evitáveis diante de qualquer volatilidade.'
    },
    {
      pergunta: 'O que diferencia a etapa de "autonomia plena" das etapas anteriores?',
      alternativas: [
        'A quantidade de dinheiro investido',
        'A capacidade de decidir sobre produtos complexos com conhecimento técnico próprio',
        'A idade do investidor',
        'O número de corretoras em que a pessoa tem conta'
      ],
      correta: 1,
      explicacao: 'A etapa de autonomia plena é definida pelo nível de conhecimento e critério próprio para lidar com produtos mais complexos, não pelo volume de patrimônio ou pela idade do investidor.'
    }
  ],

  faq: [
    { pergunta: 'Posso pular a etapa da reserva de emergência se eu tiver um emprego muito estável?', resposta: 'Não é recomendado pular — mesmo com renda estável, imprevistos (saúde, manutenção urgente, perda de emprego) podem acontecer, e a reserva existe justamente para não obrigar o resgate de investimentos de risco nesses momentos.' },
    { pergunta: 'Quanto tempo leva para passar por todas as etapas da formação do investidor?', resposta: 'Varia muito conforme a situação financeira de cada pessoa — pode levar de poucos meses a alguns anos. O importante não é a velocidade, mas não pular etapas por pressa ou comparação com outras pessoas.' },
    { pergunta: 'Já tenho investimentos em ações, mas nunca fiz o teste de suitability. Isso é um problema?', resposta: 'Vale fazer o teste para confirmar se o nível de risco que você já assume está de fato alinhado ao seu perfil real — é comum descobrir, ao fazer o teste com sinceridade, que o risco assumido está desalinhado do perfil declarado.' },
    { pergunta: 'Reserva de emergência em Tesouro Selic rende bem o suficiente?', resposta: 'Sim, para o propósito de reserva de emergência, o Tesouro Selic acompanha de perto a taxa básica de juros (Selic) e tem liquidez diária, o que o torna adequado — o objetivo aqui é segurança e liquidez, não maximizar retorno.' },
    { pergunta: 'É possível estar em etapas diferentes em áreas diferentes da vida financeira?', resposta: 'Sim — é comum alguém já ter renda fixa bem estruturada mas nunca ter feito o teste de suitability, por exemplo. O importante é mapear honestamente onde você está em cada frente, não assumir uma etapa única para tudo.' },
    { pergunta: 'Vale a pena investir em ações antes de terminar de pagar dívidas?', resposta: 'Geralmente não, especialmente se as dívidas tiverem juros altos (cartão de crédito, cheque especial) — o retorno "garantido" de quitar uma dívida cara costuma superar o retorno esperado de qualquer investimento em ações.' }
  ]
}
