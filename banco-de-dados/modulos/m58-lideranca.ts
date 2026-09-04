// m03-lideranca.ts
import { Modulo } from '@/types'

export const lideranca: Modulo = {
  id: 'lideranca',
  trilhaId: 'carreira-negocios',
  numero: 3,
  titulo: 'Liderança',
  subtitulo: 'A diferença entre gerenciar tarefas e liderar pessoas — e por que isso afeta seu bolso',
  iconName: 'Users',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['carreira'],
  objetivoAprendizagem: 'Você vai sair sabendo identificar as competências de liderança que efetivamente aumentam seu valor de mercado e aceleram sua trajetória de renda, em vez de confundir liderança com autoridade hierárquica.',
  erroFatal: 'Assumir uma posição de liderança (gerência, coordenação) tratando-a apenas como um degrau de status e salário mais alto, sem desenvolver as competências reais de gestão de pessoas — isso costuma gerar alta rotatividade na equipe, queda de performance do time e, no médio prazo, prejudica a própria reputação e trajetória profissional do líder despreparado.',
  numeroChave: { valor: '2x', legenda: 'aproximadamente o custo de substituir um funcionário, em relação ao seu salário anual, considerando recrutamento, treinamento e perda de produtividade — o que torna a retenção de talentos, função direta da liderança, um fator financeiro relevante para qualquer organização' },
  glossarioDoModulo: ['Liderança situacional', 'Feedback estruturado', 'Delegação', 'Inteligência emocional aplicada', 'Retenção de talentos', 'Autoridade formal vs. informal'],
  proximoPasso: { moduloId: 'negociacao', motivo: 'Depois de desenvolver competências de liderança, o próximo passo natural é aprofundar habilidades de negociação, essenciais tanto para liderar equipes quanto para negociar recursos, prazos e resultados com outras áreas.' },

  aprender: {
    oQueE: 'Liderança é a capacidade de influenciar, desenvolver e mobilizar pessoas em direção a um objetivo comum — algo distinto de simplesmente ocupar um cargo de chefia. Autoridade formal (o cargo em si) dá o direito de tomar decisões e distribuir tarefas; liderança de verdade é o que faz uma equipe seguir alguém não apenas por obrigação hierárquica, mas por confiança, clareza de direção e desenvolvimento genuíno das pessoas envolvidas. Do ponto de vista de carreira e renda, líderes eficazes tendem a ser promovidos mais rápido e assumir responsabilidades maiores, exatamente porque entregam resultados através de outras pessoas, não apenas através do próprio esforço individual.',
    porQueImporta: 'Muitos profissionals talentosos tecnicamente são promovidos a posições de liderança sem nenhum preparo específico para gerenciar pessoas, partindo do pressuposto equivocado de que quem é bom individualmente automaticamente saberá liderar uma equipe. Essa lacuna é uma das principais causas de alta rotatividade de equipes, queda de engajamento e, no fim, prejuízo financeiro real para as organizações — e também para a trajetória do próprio líder despreparado, que acumula uma reputação difícil de reverter no mercado de trabalho.',
    naPratica: 'No ambiente corporativo brasileiro, competências de liderança valorizadas incluem a capacidade de dar feedback estruturado e frequente (não apenas na avaliação anual formal), delegar responsabilidades reais em vez de apenas tarefas operacionais, adaptar o estilo de liderança conforme o nível de maturidade e experiência de cada membro da equipe (liderança situacional), e desenvolver as pessoas ao longo do tempo, não apenas cobrar resultados. Empresas que investem seriamente em desenvolvimento de liderança tendem a ter taxas de retenção de talentos significativamente maiores, o que se traduz em economia direta, já que o custo de substituir um funcionário (recrutamento, treinamento, perda de produtividade no período de adaptação) pode chegar a cerca de duas vezes o salário anual da posição, segundo estimativas recorrentes de consultorias de recursos humanos.',
    passoAPasso: [
      'Antes de assumir ou buscar uma posição de liderança, avalie honestamente se seu interesse é pelo status e salário, ou pelo desenvolvimento genuíno de pessoas — os dois podem coexistir, mas a motivação afeta diretamente a eficácia.',
      'Desenvolva o hábito de dar feedback estruturado e frequente à sua equipe, não apenas em avaliações formais anuais ou semestrais.',
      'Pratique a delegação de responsabilidades reais, não apenas tarefas operacionais, permitindo que membros da equipe desenvolvam autonomia e novas competências.',
      'Adapte seu estilo de liderança conforme o nível de experiência e maturidade de cada pessoa da equipe, em vez de aplicar a mesma abordagem para todos.',
      'Invista tempo genuíno em entender os objetivos de carreira de cada membro da equipe, conectando o trabalho do dia a dia a esse desenvolvimento de longo prazo.',
      'Busque feedback sobre seu próprio estilo de liderança regularmente, seja formalmente (avaliações 360°) ou informalmente, ajustando comportamentos com base nesse retorno.'
    ],
    errosComuns: [
      'Tratar a posição de liderança apenas como um degrau de status e salário, sem desenvolver competências reais de gestão de pessoas.',
      'Delegar apenas tarefas operacionais de baixo valor, mantendo todas as decisões relevantes centralizadas, o que impede o desenvolvimento da equipe.',
      'Dar feedback apenas em momentos formais (avaliação anual), deixando problemas de performance ou comportamento sem correção por longos períodos.',
      'Aplicar o mesmo estilo de liderança para toda a equipe, ignorando diferenças de experiência, maturidade profissional e necessidades individuais.',
      'Confundir liderança com controle excessivo (microgestão), o que reduz autonomia, engajamento e desenvolvimento da equipe no longo prazo.',
      'Ignorar sinais de insatisfação ou desgaste da equipe até que a rotatividade se torne um problema visível e caro para a organização.'
    ],
    comparativo: {
      titulo: 'Autoridade formal vs. liderança real',
      linhas: [
        { label: 'Fonte do poder', valor: 'Autoridade formal: cargo hierárquico | Liderança real: confiança e influência genuína' },
        { label: 'O que motiva a equipe a seguir', valor: 'Autoridade formal: obrigação e estrutura | Liderança real: confiança, propósito e desenvolvimento pessoal' },
        { label: 'Efeito na retenção de talentos', valor: 'Autoridade formal: baixa se não acompanhada de liderança real | Liderança real: alta, reduz rotatividade' },
        { label: 'Sustentabilidade no longo prazo', valor: 'Autoridade formal: depende do cargo, se perde ao sair dele | Liderança real: se mantém e fortalece reputação profissional' }
      ]
    },
    checklist: [
      'Avalie honestamente sua motivação para buscar ou manter uma posição de liderança.',
      'Estabeleça uma rotina de feedback estruturado e frequente com sua equipe, além das avaliações formais.',
      'Identifique responsabilidades reais (não apenas tarefas operacionais) que você pode delegar para desenvolver sua equipe.',
      'Mapeie o nível de maturidade e experiência de cada pessoa da equipe para adaptar seu estilo de liderança.',
      'Busque feedback regular sobre seu próprio estilo de liderança, formal ou informalmente.'
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'A fábula do livro defende que valor e influência genuína vêm de servir e desenvolver outras pessoas, não de posição hierárquica — o mesmo princípio por trás de mapear a maturidade da equipe e adaptar o estilo de liderança a cada pessoa.',
    },
    naoConfundirCom: [
      { moduloId: 'carreira', diferenca: 'Carreira foca na trajetória profissional individual, incluindo negociação salarial e desenvolvimento de competências próprias; Liderança foca especificamente na capacidade de desenvolver e mobilizar outras pessoas.' },
      { moduloId: 'negociacao', diferenca: 'Liderança foca em desenvolver e influenciar pessoas de forma contínua dentro de uma equipe; Negociação foca especificamente em situações pontuais de busca de acordo entre partes com interesses distintos.' }
    ]
  },

  mapaMental: {
    label: 'Liderança',
    subtitulo: 'Da autoridade formal à influência genuína',
    ramos: [
      {
        id: 'fundamentos',
        label: 'Fundamentos da Liderança',
        cor: '#3B82F6',
        resumo: 'O que diferencia liderar de apenas chefiar',
        filhos: [
          { label: 'Autoridade formal', desc: 'Poder dado pelo cargo hierárquico ocupado' },
          { label: 'Influência genuína', desc: 'Capacidade de mobilizar pessoas por confiança, não apenas obrigação' },
          { label: 'Desenvolvimento de pessoas', desc: 'Foco em fazer a equipe crescer, não apenas entregar resultados' }
        ]
      },
      {
        id: 'competencias-praticas',
        label: 'Competências Práticas',
        cor: '#22C55E',
        resumo: 'O que líderes eficazes fazem no dia a dia',
        filhos: [
          { label: 'Feedback estruturado', desc: 'Comunicação frequente e clara, não só em avaliações formais' },
          { label: 'Delegação real', desc: 'Distribuir responsabilidades de valor, não apenas tarefas operacionais' },
          {
            label: 'Liderança situacional',
            desc: 'Adaptar o estilo conforme a maturidade de cada pessoa',
            netos: [
              { label: 'Direcionamento', desc: 'Mais indicado para pessoas com menos experiência na função' },
              { label: 'Delegação plena', desc: 'Mais indicado para pessoas experientes e autônomas' }
            ]
          }
        ]
      },
      {
        id: 'impacto-financeiro',
        label: 'Impacto Financeiro',
        cor: '#FFC93C',
        resumo: 'Por que liderança tem valor econômico direto',
        filhos: [
          { label: 'Retenção de talentos', desc: 'Reduz custo de recrutamento, treinamento e perda de produtividade' },
          { label: 'Aceleração de carreira do líder', desc: 'Líderes eficazes tendem a ser promovidos mais rapidamente' },
          { label: 'Performance da equipe', desc: 'Equipes bem lideradas entregam resultados mais consistentes' }
        ]
      },
      {
        id: 'armadilhas',
        label: 'Armadilhas Comuns',
        cor: '#EF4444',
        resumo: 'Onde líderes de primeira viagem mais erram',
        filhos: [
          { label: 'Liderança pelo status', desc: 'Buscar o cargo apenas por salário, sem preparo real' },
          { label: 'Microgestão', desc: 'Controle excessivo que reduz autonomia e engajamento' },
          { label: 'Feedback só formal', desc: 'Deixar problemas sem correção por longos períodos' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões práticas de liderança de equipe e vê o resultado esperado de cada escolha, considerando os fundamentos de liderança situacional e desenvolvimento de pessoas.',
    passos: [
      'Leia a situação envolvendo uma decisão de liderança.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de liderança eficaz.'
    ],
    exemploGuiado: 'Um gerente recém-promovido percebe que um membro experiente da equipe está desmotivado, entregando resultados abaixo do padrão histórico dele. Em vez de esperar a avaliação semestral formal para abordar o assunto, o gerente agenda uma conversa individual estruturada, focada em entender a causa da queda de performance, sem julgamento imediato. Na conversa, descobre que o profissional está desmotivado por não ver perspectivas claras de crescimento na equipe. A partir disso, o gerente propõe um plano de desenvolvimento específico, delegando uma responsabilidade de maior visibilidade para esse profissional, alinhado ao seu interesse de carreira. Nos meses seguintes, a performance e o engajamento desse profissional melhoram significativamente, evitando uma possível saída da empresa e o custo associado de substituição.',
    cenarioGuiado: [
      {
        pergunta: 'Você é gestor e percebe que um membro da equipe está com performance abaixo do esperado há algumas semanas.',
        opcoes: [
          { texto: 'Espero a avaliação formal semestral para abordar o assunto oficialmente', resultado: 'Esperar meses para dar feedback sobre um problema já identificado permite que a situação se prolongue e possivelmente se agrave, além de reduzir as chances de reversão rápida do problema.' },
          { texto: 'Agendo uma conversa individual estruturada assim que percebo o padrão, buscando entender a causa', resultado: 'Feedback frequente e estruturado, dado no momento apropriado, permite identificar e endereçar problemas rapidamente, antes que se tornem questões maiores de performance ou engajamento.' }
        ]
      },
      {
        pergunta: 'Você tem um membro de equipe muito experiente e outro recém-contratado, e precisa decidir como distribuir uma tarefa complexa e importante.',
        opcoes: [
          { texto: 'Aplico o mesmo nível de supervisão e instruções detalhadas para os dois, por igual', resultado: 'Aplicar o mesmo estilo de liderança independente do nível de experiência ignora as necessidades específicas de cada pessoa — o profissional experiente pode se sentir microgerenciado, enquanto o recém-contratado pode precisar de mais direcionamento do que está recebendo.' },
          { texto: 'Adapto o nível de direcionamento conforme a experiência de cada um: mais autonomia para o experiente, mais suporte para o recém-contratado', resultado: 'Essa é a essência da liderança situacional: adaptar o estilo de gestão conforme o nível de maturidade e experiência de cada pessoa tende a gerar melhores resultados e mais engajamento de ambos.' }
        ]
      },
      {
        pergunta: 'Você foi promovido a uma posição de liderança recentemente e está decidindo como se relacionar com a equipe.',
        opcoes: [
          { texto: 'Foco em manter todas as decisões centralizadas comigo, para garantir controle total dos resultados', resultado: 'Centralizar todas as decisões, sem delegar responsabilidades reais, limita o desenvolvimento da equipe e tende a sobrecarregar o próprio líder, além de reduzir o engajamento dos membros mais experientes.' },
          { texto: 'Busco identificar quais responsabilidades posso delegar de forma real, desenvolvendo autonomia na equipe', resultado: 'Delegar responsabilidades de valor real, não apenas tarefas operacionais, é uma das competências centrais de liderança eficaz, contribuindo tanto para o desenvolvimento da equipe quanto para os resultados do time como um todo.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'lid-01', frente: 'Qual a diferença entre autoridade formal e liderança real?', verso: 'Autoridade formal vem do cargo hierárquico; liderança real é a capacidade de influenciar e mobilizar pessoas por confiança e desenvolvimento genuíno, não apenas por obrigação estrutural.' },
    { id: 'lid-02', frente: 'Por que o custo de substituir um funcionário é relevante para entender o valor da liderança?', verso: 'Porque pode chegar a cerca de duas vezes o salário anual da posição, tornando a retenção de talentos, função direta da liderança eficaz, um fator financeiro relevante para qualquer organização.' },
    { id: 'lid-03', frente: 'O que é liderança situacional?', verso: 'A prática de adaptar o estilo de liderança conforme o nível de maturidade e experiência de cada pessoa da equipe, em vez de aplicar a mesma abordagem para todos.' },
    { id: 'lid-04', frente: 'Por que dar feedback apenas em avaliações formais anuais é considerado insuficiente?', verso: 'Porque permite que problemas de performance ou comportamento fiquem sem correção por longos períodos, dificultando a reversão rápida de situações que poderiam ser resolvidas mais cedo.' },
    { id: 'lid-05', frente: 'O que caracteriza delegação real, diferente de apenas distribuir tarefas operacionais?', verso: 'Delegação real envolve passar responsabilidades de valor e decisão significativa, permitindo que a pessoa desenvolva autonomia e novas competências, não apenas execute instruções.' },
    { id: 'lid-06', frente: 'Qual é o erro mais caro ao assumir uma posição de liderança, segundo o módulo?', verso: 'Tratar a posição apenas como um degrau de status e salário, sem desenvolver as competências reais de gestão de pessoas necessárias para liderar com eficácia.' },
    { id: 'lid-07', frente: 'O que é microgestão e por que ela prejudica a liderança?', verso: 'É o controle excessivo sobre o trabalho da equipe, que reduz autonomia e engajamento no longo prazo, sendo frequentemente confundida erroneamente com um sinal de liderança forte.' },
    { id: 'lid-08', frente: 'Por que líderes eficazes tendem a ser promovidos mais rapidamente?', verso: 'Porque entregam resultados através do desenvolvimento de outras pessoas, ampliando o impacto e a escala do próprio trabalho além do esforço individual.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é a principal diferença entre autoridade formal e liderança real?',
      alternativas: [
        'Não existe diferença prática entre os dois conceitos',
        'Autoridade formal vem do cargo hierárquico; liderança real vem da confiança e influência genuína conquistadas com a equipe',
        'Autoridade formal é sempre mais eficaz que liderança real',
        'Liderança real só existe em cargos de diretoria ou acima'
      ],
      correta: 1,
      explicacao: 'Autoridade formal dá o direito estrutural de tomar decisões, mas liderança real é o que faz uma equipe seguir alguém genuinamente, por confiança e desenvolvimento, não apenas por obrigação hierárquica.'
    },
    {
      pergunta: 'Por que o custo de substituição de um funcionário é relevante para entender o valor financeiro da liderança?',
      alternativas: [
        'Porque substituir um funcionário nunca gera custo relevante para a empresa',
        'Porque pode chegar a cerca de duas vezes o salário anual da posição, tornando retenção de talentos um fator financeiro direto',
        'Porque é um custo fixo, independente da qualidade da liderança',
        'Porque apenas cargos de alta gerência geram custo de substituição'
      ],
      correta: 1,
      explicacao: 'O custo de recrutamento, treinamento e perda de produtividade durante a substituição de um funcionário pode ser significativo — líderes eficazes, que retêm talentos, geram economia real e mensurável para a organização.'
    },
    {
      pergunta: 'O que é liderança situacional?',
      alternativas: [
        'Um estilo de liderança fixo aplicado igualmente a toda a equipe',
        'A prática de adaptar o estilo de liderança conforme o nível de maturidade e experiência de cada pessoa',
        'Uma técnica exclusiva para equipes remotas',
        'Um método de avaliação de desempenho anual'
      ],
      correta: 1,
      explicacao: 'Liderança situacional reconhece que diferentes pessoas, em diferentes níveis de experiência e maturidade, precisam de abordagens distintas de direcionamento e autonomia para performar melhor.'
    },
    {
      pergunta: 'Qual é o erro mais caro relacionado à liderança, segundo o módulo?',
      alternativas: [
        'Delegar responsabilidades de valor para a equipe',
        'Assumir uma posição de liderança apenas pelo status e salário, sem desenvolver competências reais de gestão de pessoas',
        'Dar feedback estruturado com frequência',
        'Adaptar o estilo de liderança conforme a experiência de cada pessoa'
      ],
      correta: 1,
      explicacao: 'Buscar liderança apenas pelo status, sem desenvolver as competências necessárias, costuma gerar alta rotatividade, queda de performance da equipe e prejudica a própria reputação profissional do líder no médio prazo.'
    },
    {
      pergunta: 'Por que dar feedback apenas em avaliações formais anuais ou semestrais é considerado uma prática limitada?',
      alternativas: [
        'Porque avaliações formais são proibidas pela legislação trabalhista brasileira',
        'Porque permite que problemas fiquem sem correção por longos períodos, dificultando reversão rápida',
        'Porque feedback formal não tem nenhum valor para o desenvolvimento da equipe',
        'Porque só deve ser aplicado em empresas de grande porte'
      ],
      correta: 1,
      explicacao: 'Feedback frequente e estruturado permite identificar e corrigir problemas de performance ou comportamento rapidamente, evitando que pequenas questões se transformem em problemas maiores ao longo de meses.'
    },
    {
      pergunta: 'O que caracteriza microgestão, e por que ela é considerada prejudicial à liderança eficaz?',
      alternativas: [
        'É a prática de delegar responsabilidades de forma equilibrada, sendo sempre positiva',
        'É o controle excessivo sobre o trabalho da equipe, que reduz autonomia e engajamento no longo prazo',
        'É uma técnica recomendada para equipes muito experientes',
        'É sinônimo de liderança situacional bem aplicada'
      ],
      correta: 1,
      explicacao: 'Microgestão, o controle excessivo e constante sobre detalhes do trabalho da equipe, tende a reduzir autonomia, motivação e engajamento, sendo frequentemente confundida erroneamente com um sinal de liderança rigorosa e eficaz.'
    }
  ],

  faq: [
    { pergunta: 'É possível desenvolver competências de liderança mesmo sem estar numa posição formal de chefia?', resposta: 'Sim — muitas competências de liderança (influência, comunicação clara, desenvolvimento de colegas, condução de projetos) podem ser praticadas informalmente, mesmo sem cargo hierárquico, e costumam ser observadas por gestores na hora de considerar promoções futuras.' },
    { pergunta: 'Liderar significa ser sempre gentil e nunca cobrar resultados da equipe?', resposta: 'Não. Liderança eficaz combina desenvolvimento genuíno das pessoas com clareza de expectativas e cobrança justa de resultados — as duas coisas não são excludentes, e líderes que evitam completamente cobranças claras costumam prejudicar tanto a equipe quanto os resultados do negócio.' },
    { pergunta: 'Como sei se estou fazendo microgestão sem perceber?', resposta: 'Sinais comuns incluem revisar constantemente detalhes do trabalho de pessoas experientes, dificuldade em delegar decisões, e membros da equipe frequentemente pedindo aprovação para tarefas que já deveriam ter autonomia para resolver — buscar feedback direto da equipe também ajuda a identificar esse padrão.' },
    { pergunta: 'Vale a pena buscar treinamentos formais de liderança, ou a experiência prática já é suficiente?', resposta: 'Treinamentos formais podem acelerar o desenvolvimento e trazer estruturas e vocabulário útil (como liderança situacional e técnicas de feedback), mas a prática constante, com reflexão e busca ativa de feedback sobre o próprio estilo, é igualmente essencial para consolidar essas competências.' },
    { pergunta: 'Todo profissional técnico bom deveria buscar uma posição de liderança?', resposta: 'Não necessariamente. Excelência técnica e competência de liderança são habilidades diferentes, e nem todo profissional talentoso tecnicamente tem interesse ou aptidão para gerenciar pessoas — muitas empresas, inclusive, oferecem trilhas de carreira técnica avançada como alternativa à liderança de equipes.' },
    { pergunta: 'Como equilibrar liderança com minhas próprias entregas individuais de trabalho?', resposta: 'Conforme a equipe cresce, é natural que o tempo dedicado a entregas individuais diminua em favor do desenvolvimento e coordenação da equipe — resistir a essa transição, tentando manter o mesmo volume de entregas individuais de antes, é uma armadilha comum entre novos líderes.' }
  ]
}
