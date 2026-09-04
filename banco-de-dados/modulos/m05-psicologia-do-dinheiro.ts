import type { Modulo } from '@/types'

export const psicologiaDoDinheiro: Modulo = {
  id: 'psicologia-do-dinheiro',
  trilhaId: 'fundamentos',
  numero: 5,
  titulo: 'Psicologia do Dinheiro',
  subtitulo: 'A história emocional que você carrega e que dita suas decisões financeiras hoje',
  iconName: 'HeartHandshake',
  duracaoMin: 12,

  nivel: 'iniciante',
  preRequisitos: ['psicologia-financeira'],
  objetivoAprendizagem: 'Você vai sair identificando sua "crença financeira de origem" e como ela molda decisões que parecem racionais mas não são.',
  erroFatal: 'Replicar, sem perceber, o mesmo padrão financeiro disfuncional que você viu na sua família de origem — seja escassez extrema, seja gasto compulsivo — só porque nunca parou para examinar de onde vem esse padrão.',
  numeroChave: {
    valor: '3 em cada 4',
    legenda: 'brasileiros dizem que dinheiro é uma fonte relevante de estresse no dia a dia, segundo pesquisas recorrentes sobre saúde financeira e bem-estar no país'
  },
  glossarioDoModulo: ['crença financeira de origem', 'escassez aprendida', 'gasto compensatório', 'tabu do dinheiro', 'roteiro financeiro familiar'],
  proximoPasso: { moduloId: 'educacao-financeira-infantil', motivo: 'Depois de entender como sua própria história com dinheiro foi formada, faz sentido entender como formar esse roteiro de forma mais saudável nos seus filhos.' },

  aprender: {
    oQueE: 'Psicologia do dinheiro é o estudo de como sua relação emocional com dinheiro — moldada na infância, pela família, pela cultura e por experiências marcantes — determina comportamentos financeiros muito antes de qualquer decisão "racional" entrar em cena. Diferente dos vieses cognitivos de curto prazo, aqui o assunto é o roteiro de fundo que você segue sem perceber.',
    porQueImporta: 'Duas pessoas com a mesma renda e o mesmo conhecimento técnico sobre investimentos podem ter trajetórias financeiras completamente diferentes porque uma carrega uma crença de "nunca vai ter dinheiro suficiente" (o que gera tanto acúmulo ansioso quanto gasto compensatório) e a outra não. Ignorar essa camada emocional é a razão pela qual planilhas e cursos de finanças sozinhos frequentemente não mudam o comportamento de ninguém.',
    naPratica: 'No Brasil, dinheiro ainda é um tabu de conversa em muitas famílias — filhos raramente sabem quanto os pais ganham ou como decidem gastar, e crescem reproduzindo padrões nunca discutidos abertamente. Isso aparece como: gente que cresceu ouvindo "dinheiro não dá em árvore" e desenvolve ansiedade extrema mesmo tendo reserva financeira robusta; gente que viveu escassez real na infância e hoje gasta de forma compensatória assim que tem alguma folga no orçamento; casais que discutem mais sobre dinheiro do que sobre qualquer outro tema, porque cada um carrega um roteiro financeiro diferente da própria família e nunca verbalizou isso ao outro.',
    passoAPasso: [
      'Identifique uma frase sobre dinheiro que você ouviu repetidamente na infância (de pais, avós, escola).',
      'Observe se um comportamento financeiro seu atual (economizar demais, gastar compulsivamente, evitar olhar extrato) ecoa essa frase.',
      'Separe o que é crença herdada do que é decisão consciente sua — pergunte-se "isso ainda é verdade para a minha vida hoje?".',
      'Converse abertamente sobre dinheiro com seu parceiro ou parceira, incluindo medos e crenças, não só números.',
      'Se identificar um padrão disfuncional recorrente (ansiedade financeira crônica mesmo com estabilidade, gasto compensatório), considere buscar apoio de um profissional (terapeuta ou planejador financeiro comportamental).'
    ],
    errosComuns: [
      'Achar que só falta "força de vontade" para mudar hábitos financeiros, ignorando a raiz emocional do comportamento.',
      'Evitar completamente falar sobre dinheiro com parceiro(a) ou filhos, perpetuando o tabu.',
      'Usar o gasto como forma de aliviar ansiedade ou compensar uma infância de escassez, sem perceber a ligação.',
      'Guardar dinheiro de forma compulsiva mesmo tendo reserva de emergência robusta, por medo herdado, sem nunca aproveitar o que já construiu.',
      'Repetir com os filhos exatamente o silêncio (ou o drama) sobre dinheiro que os próprios pais tiveram.'
    ],
    checklist: [
      'Escreva uma frase sobre dinheiro que marcou sua infância e reflita se ela ainda serve à sua vida atual.',
      'Tenha uma conversa aberta sobre dinheiro com seu parceiro ou parceira neste mês.',
      'Observe por uma semana se algum gasto seu foi motivado por ansiedade, não por necessidade real.',
      'Se notar um padrão recorrente e desconfortável, considere buscar apoio profissional especializado.'
    ],
    livroRelacionado: {
      livroId: 'psicologia-do-dinheiro-livro',
      textoConexao: 'O livro de Morgan Housel é a referência direta deste módulo: mostra por que decisões financeiras raramente são puramente racionais, e como a história pessoal de cada um molda sua relação com dinheiro mais do que qualquer planilha.',
    },
    naoConfundirCom: [
      { moduloId: 'psicologia-financeira', diferenca: 'Este módulo trata da relação emocional de fundo com dinheiro, formada na história pessoal; o outro trata dos vieses cognitivos que distorcem decisões pontuais de investir.' }
    ]
  },

  mapaMental: {
    label: 'Psicologia do Dinheiro',
    subtitulo: 'O roteiro emocional por trás das suas decisões financeiras',
    ramos: [
      {
        id: 'origem',
        label: 'Origem da Crença',
        cor: '#3B82F6',
        resumo: 'De onde vem seu roteiro financeiro',
        filhos: [
          { label: 'Família de origem', desc: 'Frases e comportamentos financeiros observados na infância' },
          { label: 'Experiências marcantes', desc: 'Um episódio de perda, dívida ou fartura que marcou a visão sobre dinheiro' },
          { label: 'Cultura e tabu', desc: 'Dinheiro como assunto evitado socialmente no Brasil' }
        ]
      },
      {
        id: 'padroes',
        label: 'Padrões Comuns',
        cor: '#F59E0B',
        resumo: 'Como a crença de origem aparece hoje',
        filhos: [
          { label: 'Escassez aprendida', desc: 'Ansiedade financeira mesmo com estabilidade real' },
          { label: 'Gasto compensatório', desc: 'Gastar para aliviar uma ansiedade emocional, não por necessidade' },
          { label: 'Acúmulo compulsivo', desc: 'Guardar sem nunca se permitir usar, por medo herdado' }
        ]
      },
      {
        id: 'impacto-relacoes',
        label: 'Impacto nas Relações',
        cor: '#EC4899',
        resumo: 'Como isso afeta casais e famílias',
        filhos: [
          { label: 'Conflito conjugal', desc: 'Roteiros financeiros diferentes nunca verbalizados geram atrito recorrente' },
          { label: 'Silêncio com os filhos', desc: 'Repetir o tabu financeiro da própria criação' }
        ]
      },
      {
        id: 'caminho',
        label: 'Caminho de Mudança',
        cor: '#10B981',
        resumo: 'Como reescrever o roteiro',
        filhos: [
          { label: 'Identificação consciente', desc: 'Nomear a crença herdada em vez de agir por ela automaticamente' },
          { label: 'Conversa aberta', desc: 'Falar sobre dinheiro com parceiro(a) e, quando fizer sentido, com os filhos' },
          { label: 'Apoio profissional', desc: 'Terapia ou planejamento financeiro comportamental quando o padrão é recorrente' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você não calcula números — você reconhece padrões emocionais em situações do dia a dia e reflete sobre a origem deles.',
    passos: [
      'Leia cada cenário pensando em como você reagiria de verdade.',
      'Escolha a reação mais parecida com a sua.',
      'Veja a reflexão sobre o que essa reação pode revelar sobre seu roteiro financeiro.'
    ],
    exemploGuiado: 'Cenário: você recebe um aumento de salário de 20%. Reação de escassez aprendida: guardar tudo o valor extra "por precaução", sem se permitir nenhuma melhora na qualidade de vida, mesmo com reserva de emergência já formada — o medo herdado fala mais alto que a realidade financeira atual. Reação mais equilibrada: reavaliar o orçamento, direcionar parte do aumento para metas de longo prazo e parte para melhorar algo concreto na qualidade de vida, de forma consciente.',
    cenarioGuiado: [
      {
        pergunta: 'Você recebeu um aumento de salário de 20%. O que você faz?',
        opcoes: [
          { texto: 'Guardo tudo, "por precaução", mesmo já tendo reserva de emergência completa', resultado: 'Pode indicar escassez aprendida: o medo financeiro age mesmo quando os números mostram segurança real.' },
          { texto: 'Gasto quase tudo em algo que eu queria há tempos, de uma vez', resultado: 'Pode indicar gasto compensatório: aliviar uma ansiedade acumulada de forma impulsiva, sem planejamento.' },
          { texto: 'Reviso meu orçamento e divido entre metas de longo prazo e uma melhoria pontual na qualidade de vida', resultado: 'Reação mais equilibrada: reconhece a folga real sem agir só por medo ou só por impulso.' }
        ]
      },
      {
        pergunta: 'Seu parceiro ou parceira pergunta quanto você tem guardado. Sua reação inicial é:',
        opcoes: [
          { texto: 'Desconforto e vontade de mudar de assunto', resultado: 'Pode revelar o tabu financeiro herdado da família de origem, onde dinheiro não era assunto de conversa aberta.' },
          { texto: 'Responder com naturalidade e abrir a conversa sobre planos financeiros conjuntos', resultado: 'Indica um roteiro financeiro mais saudável, com dinheiro tratado como assunto compartilhável, não tabu.' }
        ]
      },
      {
        pergunta: 'Depois de uma semana estressante no trabalho, você percebe que gastou bem mais do que o normal em compras pequenas. Isso te faz pensar em:',
        opcoes: [
          { texto: 'Só em cortar gastos no próximo mês, sem entender o porquê', resultado: 'Tratar apenas o sintoma (o gasto) sem examinar o gatilho emocional tende a repetir o padrão no próximo período de estresse.' },
          { texto: 'Perceber que o gasto foi uma forma de aliviar o estresse, e pensar em outras formas de lidar com isso', resultado: 'Reconhecer o gasto compensatório na hora que ele acontece é o primeiro passo para não repeti-lo automaticamente.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'pd-01', frente: 'O que é uma "crença financeira de origem"?', verso: 'Uma ideia sobre dinheiro absorvida na infância, geralmente da família, que continua influenciando decisões financeiras na vida adulta sem ser questionada.' },
    { id: 'pd-02', frente: 'O que é escassez aprendida?', verso: 'A sensação persistente de que "nunca vai ter dinheiro suficiente", mesmo quando a situação financeira real é estável ou confortável.' },
    { id: 'pd-03', frente: 'O que é gasto compensatório?', verso: 'Gastar dinheiro como forma de aliviar uma emoção negativa (estresse, tristeza, ansiedade), e não por uma necessidade ou desejo planejado.' },
    { id: 'pd-04', frente: 'Por que dinheiro é considerado um "tabu" em muitas famílias brasileiras?', verso: 'Porque falar abertamente sobre quanto se ganha, gasta ou deve é culturalmente evitado, o que impede que crianças aprendam com clareza sobre finanças em casa.' },
    { id: 'pd-05', frente: 'O que é um "roteiro financeiro familiar"?', verso: 'O padrão de comportamento com dinheiro observado e absorvido dos pais ou responsáveis, que tende a se repetir na vida adulta se não for examinado.' },
    { id: 'pd-06', frente: 'Qual é o primeiro passo prático para mudar um padrão financeiro disfuncional?', verso: 'Identificar conscientemente a crença ou experiência de origem por trás do comportamento, em vez de tentar mudar só o comportamento com força de vontade.' },
    { id: 'pd-07', frente: 'Por que planilhas e cursos de finanças às vezes não mudam o comportamento de ninguém?', verso: 'Porque endereçam apenas a camada técnica (conhecimento), sem tocar na camada emocional de fundo que realmente dirige o comportamento financeiro.' },
    { id: 'pd-08', frente: 'Qual o risco de não conversar sobre dinheiro com o parceiro ou parceira?', verso: 'Cada pessoa carrega um roteiro financeiro diferente e não verbalizado, o que costuma gerar conflitos recorrentes sobre dinheiro no relacionamento.' }
  ],

  quiz: [
    {
      pergunta: 'Uma pessoa cresceu ouvindo que "dinheiro nunca é suficiente" e, mesmo com renda estável e reserva de emergência completa, sente ansiedade financeira constante. Isso é um exemplo de:',
      alternativas: ['Viés de ancoragem', 'Escassez aprendida', 'Efeito manada', 'Contabilidade mental'],
      correta: 1,
      explicacao: 'Escassez aprendida é exatamente isso: uma crença emocional de insuficiência financeira que persiste mesmo quando os números reais mostram segurança. Os outros vieses (ancoragem, manada, contabilidade mental) são fenômenos distintos, mais ligados a decisões pontuais de investimento.'
    },
    {
      pergunta: 'Qual das opções abaixo é um exemplo de gasto compensatório?',
      alternativas: [
        'Comprar algo por impulso para aliviar o estresse de uma semana difícil',
        'Guardar dinheiro todo mês em uma reserva de emergência',
        'Comparar preços antes de comprar um eletrodoméstico',
        'Investir uma parte do salário em renda fixa'
      ],
      correta: 0,
      explicacao: 'Gasto compensatório é usar o consumo para aliviar uma emoção negativa. As demais opções descrevem comportamentos financeiros planejados, não compensatórios.'
    },
    {
      pergunta: 'Por que examinar a origem emocional de um hábito financeiro é importante antes de tentar mudá-lo?',
      alternativas: [
        'Porque só isso já resolve automaticamente qualquer problema financeiro',
        'Porque tentar mudar apenas o comportamento, sem entender a raiz, tende a não durar',
        'Porque não existe relação entre emoção e comportamento financeiro',
        'Porque isso substitui a necessidade de organizar o orçamento'
      ],
      correta: 1,
      explicacao: 'Mudanças de comportamento que ignoram a causa emocional de fundo costumam ser temporárias — a pessoa volta ao padrão antigo sob estresse. Entender a origem não substitui a organização financeira prática, mas a sustenta.'
    },
    {
      pergunta: 'O que caracteriza o "tabu do dinheiro" nas famílias?',
      alternativas: [
        'A prática de investir em ativos de risco',
        'Evitar conversar abertamente sobre renda, gastos e dívidas dentro de casa',
        'A obrigação legal de declarar Imposto de Renda',
        'O uso de aplicativos de controle financeiro'
      ],
      correta: 1,
      explicacao: 'O tabu do dinheiro é o silêncio cultural sobre finanças dentro da família, o que impede o aprendizado natural sobre o tema e tende a se repetir entre gerações.'
    },
    {
      pergunta: 'Um casal briga com frequência sobre decisões financeiras, mas nunca discutiu abertamente suas crenças de origem sobre dinheiro. Qual ação tende a reduzir esse conflito?',
      alternativas: [
        'Evitar completamente o assunto para não gerar mais briga',
        'Um dos dois assumir sozinho todas as decisões financeiras',
        'Conversar abertamente sobre as crenças e medos financeiros de cada um',
        'Comparar o casal com outros casais nas redes sociais'
      ],
      correta: 2,
      explicacao: 'Verbalizar as crenças e medos financeiros de origem de cada pessoa ajuda o casal a entender de onde vêm os atritos e construir um roteiro financeiro conjunto, em vez de operar em roteiros individuais não ditos.'
    },
    {
      pergunta: 'Quando um padrão financeiro disfuncional (ansiedade crônica, gasto compulsivo) é recorrente e não melhora com organização financeira básica, o que este módulo recomenda?',
      alternativas: [
        'Ignorar, já que finanças pessoais não têm relação com bem-estar emocional',
        'Considerar buscar apoio profissional especializado',
        'Aumentar ainda mais o controle e a restrição financeira sozinho',
        'Parar de acompanhar as próprias finanças'
      ],
      correta: 1,
      explicacao: 'Quando o padrão é recorrente e resiste a mudanças práticas, buscar apoio de um profissional (terapeuta ou planejador financeiro comportamental) é a recomendação, já que a raiz pode ser emocional e não apenas técnica.'
    }
  ],

  faq: [
    { pergunta: 'Terapia realmente ajuda com finanças pessoais?', resposta: 'Pode ajudar bastante quando o problema financeiro tem raiz emocional — ansiedade, compulsão, tabu. A terapia trabalha essa raiz, enquanto o planejamento financeiro trabalha a execução prática; os dois se complementam.' },
    { pergunta: 'É possível mudar uma crença financeira de origem sozinho, sem ajuda profissional?', resposta: 'Sim, em muitos casos — o primeiro passo (identificar conscientemente a crença) já reduz bastante o automatismo do comportamento. Ajuda profissional é mais indicada quando o padrão é intenso e recorrente, mesmo depois dessa identificação.' },
    { pergunta: 'Por que é tão difícil falar sobre dinheiro mesmo com pessoas próximas?', resposta: 'Porque, culturalmente, dinheiro costuma estar ligado a vergonha, comparação social ou medo de julgamento — o que faz o assunto ser evitado mesmo quando seria mais saudável conversar abertamente.' },
    { pergunta: 'Meus pais nunca falaram sobre dinheiro comigo — isso significa que vou repetir os mesmos erros?', resposta: 'Não necessariamente, mas o silêncio deixa você mais propenso a repetir padrões sem perceber. Reconhecer isso conscientemente já é o que quebra o ciclo automático.' },
    { pergunta: 'Como eu falo sobre dinheiro com meus filhos sem repetir o tabu que vivi?', resposta: 'O próximo módulo, sobre Educação Financeira Infantil, trata exatamente disso — em resumo, comece com conversas simples e apropriadas para a idade, sem transformar dinheiro em assunto proibido ou fonte de medo.' },
    { pergunta: 'Ter uma reserva de emergência resolve a ansiedade financeira herdada?', resposta: 'Ajuda na segurança real, mas não necessariamente na ansiedade emocional, que pode persistir mesmo com números saudáveis — por isso o trabalho de reconhecer a crença de origem é complementar, não substituído pela reserva.' }
  ]
}
