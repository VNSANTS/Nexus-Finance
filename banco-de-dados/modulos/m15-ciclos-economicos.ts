import type { Modulo } from '@/types'

export const moduloCiclosEconomicos: Modulo = {
  id: 'ciclos-economicos',
  trilhaId: 'economia-mercado',
  numero: 7,
  titulo: 'Ciclos Econômicos',
  subtitulo: 'A economia anda em ondas, e o mercado se antecipa',
  iconName: 'RefreshCw',
  duracaoMin: 11,

  aprender: {
    oQueE:
      'A economia não cresce em linha reta: ela alterna períodos de expansão, aperto, contração e recuperação. Esse movimento se repete há séculos, com durações e intensidades diferentes. Entender em que fase provavelmente estamos ajuda a interpretar o que está acontecendo — sem a pretensão de acertar o momento exato da virada.',
    porQueImporta:
      'Explica algo que confunde muita gente: por que "renda fixa está ótima" e "bolsa está barata" costumam ser verdade em momentos opostos, e por que a bolsa começa a subir quando as notícias ainda são ruins. O mercado precifica expectativa, e por isso se move de seis a doze meses à frente dos dados econômicos.',
    naPratica:
      'A fase mais desconfortável é justamente a mais fértil. Na contração, o crédito trava, os lucros caem e as manchetes são ruins — e é exatamente aí que os ativos ficam baratos. Quem tem reserva e prazo compra bem nessa hora; quem não tem é obrigado a vender. Na outra ponta, a expansão é quando tudo parece fácil e as pessoas assumem mais risco do que suportam, justamente antes do aperto.',
    passoAPasso: [
      'Aprenda os sinais típicos de cada uma das quatro fases',
      'Observe o que o Banco Central está fazendo com os juros: subindo, parado ou cortando',
      'Compare o discurso do noticiário com o comportamento dos preços',
      'Use o ciclo apenas para ajustar na margem, dentro de um limite definido',
      'Mantenha a reserva intacta para poder comprar na contração em vez de vender',
    ],
    errosComuns: [
      'Achar que dá para cronometrar o topo e o fundo',
      'Confundir ciclo econômico com tendência estrutural',
      'Esquecer que o mercado antecipa em 6 a 12 meses',
      'Aplicar o ciclo americano ao Brasil sem ajuste',
      'Abandonar a estratégia de longo prazo por leitura de ciclo',
    ],
    comparativo: {
      titulo: 'As quatro fases',
      linhas: [
        { label: 'Expansão', valor: 'PIB sobe, crédito solta · cíclicas e small caps vão bem' },
        { label: 'Pico e aperto', valor: 'Inflação sobe, BC sobe juros · pós-fixado e caixa' },
        { label: 'Contração', valor: 'Crédito trava, lucros caem · renda fixa longa e defensivas' },
        { label: 'Recuperação', valor: 'BC começa a cortar · prefixado e bolsa antecipam' },
      ],
    },
    checklist: [
      'Sei identificar os sinais de cada fase',
      'Sei o que o Banco Central está fazendo com os juros agora',
      'Entendi que o mercado antecipa os dados em meses',
      'Defini um limite máximo de ajuste tático',
      'Minha reserva está intacta para a próxima contração',
    ],
    livroRelacionado: {
      livroId: 'random-walk-wall-street',
      textoConexao: 'Malkiel argumenta que o mercado antecipa ciclos econômicos antes que fiquem óbvios nos dados — por isso tentar cronometrar o ciclo raramente supera manter uma estratégia consistente, o mesmo princípio por trás do limite de ajuste tático deste módulo.',
    },
  },

  mapaMental: {
    label: 'Ciclos Econômicos',
    subtitulo: 'A economia anda em ondas — e o mercado se antecipa a elas',
    ramos: [
      {
        id: 'expansao',
        label: 'Expansão',
        cor: '#22C55E',
        resumo: 'Tudo parece fácil',
        filhos: [
          { label: 'Sinais', desc: 'PIB crescendo, desemprego caindo, crédito abundante e confiança alta em consumidores e empresas.' },
          { label: 'O que vai bem', desc: 'Empresas cíclicas, varejo, construção e small caps, que crescem mais rápido quando a economia acelera.' },
          { label: 'O risco da fase', desc: 'O otimismo sobe junto e as pessoas assumem mais risco do que suportariam numa queda.' },
        ],
      },
      {
        id: 'pico',
        label: 'Pico e aperto',
        cor: '#FFC93C',
        resumo: 'O freio começa a ser puxado',
        filhos: [
          { label: 'Sinais', desc: 'Inflação subindo, Banco Central elevando juros, salários pressionados e capacidade produtiva no limite.' },
          { label: 'O que vai bem', desc: 'Pós-fixado e caixa, porque a Selic sobe e a renda fixa acompanha imediatamente.' },
          { label: 'Erro comum', desc: 'Comprar prefixado longo no começo do ciclo de alta de juros, quando ainda há muito espaço para as taxas subirem.' },
        ],
      },
      {
        id: 'contracao',
        label: 'Contração',
        cor: '#EF4444',
        resumo: 'A fase mais fértil e mais difícil',
        filhos: [
          { label: 'Sinais', desc: 'Crédito travado, lucros caindo, desemprego subindo e notícia ruim todo dia.' },
          { label: 'O que vai bem', desc: 'Renda fixa longa e setores defensivos como energia, saneamento e saúde.' },
          {
            label: 'Onde nasce a oportunidade',
            desc: 'É aqui que os ativos ficam baratos, exatamente quando é psicologicamente mais difícil comprar.',
            netos: [
              { label: 'Quem consegue aproveitar', desc: 'Quem tem reserva de emergência e prazo. Sem reserva, você é vendedor forçado justamente no fundo.' },
            ],
          },
        ],
      },
      {
        id: 'recuperacao',
        label: 'Recuperação',
        cor: '#00D4FF',
        resumo: 'A bolsa sobe antes da notícia melhorar',
        filhos: [
          { label: 'Sinais', desc: 'Banco Central começa a cortar juros e a confiança volta devagar, antes dos dados de emprego reagirem.' },
          { label: 'O que vai bem', desc: 'Prefixado travado antes da queda, e a bolsa, que costuma subir bem antes de a economia melhorar de fato.' },
          { label: 'A antecipação', desc: 'O mercado se move de 6 a 12 meses à frente dos dados. Esperar a notícia boa é chegar depois da alta.' },
        ],
      },
      {
        id: 'usar',
        label: 'Como usar sem se enganar',
        cor: '#8B5CF6',
        resumo: 'Ajuste, não aposta',
        filhos: [
          { label: 'Ninguém acerta topo e fundo', desc: 'Nem quem faz isso profissionalmente e em tempo integral. Aceitar isso evita a maior parte dos erros.' },
          { label: 'Ajuste na margem', desc: 'Usar o ciclo para inclinar a carteira dentro de um limite, nunca para trocá-la inteira.' },
          { label: 'Ciclo x tendência estrutural', desc: 'Envelhecimento populacional e mudança tecnológica não são ciclo: são transformações que não voltam ao ponto anterior.' },
          { label: 'Brasil tem ritmo próprio', desc: 'Nosso ciclo é influenciado por commodities, câmbio e política doméstica. Copiar a leitura americana leva a erro.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'A resposta correta ao ciclo já está embutida em uma boa política de rebalanceamento: ela obriga a comprar o que caiu e reduzir o que subiu, sem depender de você acertar a fase.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Digite sua alocação alvo entre renda fixa e renda variável',
      'Simule uma queda de 30% na renda variável ajustando o valor atual',
      'Veja quanto a regra manda aportar em renda variável para voltar ao alvo',
      'Repare que a regra faz você comprar barato sem precisar prever nada',
    ],
    exemploGuiado:
      'Exemplo: alvo de 50% e 50%. Depois de uma queda de 30% na bolsa, sua carteira fica em 59% renda fixa e 41% renda variável. Rebalancear significa direcionar aportes para a parte que caiu — comprando exatamente quando está mais barato. É o ciclo trabalhando a seu favor por meio de uma regra, não de uma previsão.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais são as quatro fases do ciclo econômico?', verso: 'Expansão, pico e aperto, contração e recuperação. Elas se alternam com durações e intensidades diferentes a cada ciclo.' },
    { id: 'fc2', frente: 'Por que a bolsa sobe antes de a economia melhorar?', verso: 'Porque o preço reflete expectativa futura. O mercado se move de 6 a 12 meses à frente dos dados econômicos divulgados.' },
    { id: 'fc3', frente: 'Qual a fase mais fértil para comprar ativos?', verso: 'A contração, quando os preços caem e as notícias são ruins. É também a mais difícil psicologicamente, e por isso poucos aproveitam.' },
    { id: 'fc4', frente: 'O que permite aproveitar a contração?', verso: 'Ter reserva de emergência e prazo. Sem reserva, a crise transforma você em vendedor forçado justamente no fundo.' },
    { id: 'fc5', frente: 'Qual a diferença entre ciclo e tendência estrutural?', verso: 'Ciclo volta ao ponto anterior. Tendência estrutural, como envelhecimento populacional ou mudança tecnológica, não volta.' },
    { id: 'fc6', frente: 'Como usar a leitura de ciclo com responsabilidade?', verso: 'Para ajustar a carteira na margem, dentro de um limite definido. Virar a alocação inteira com base em leitura de ciclo é aposta.' },
  ],

  quiz: [
    {
      pergunta: 'O Banco Central começa a cortar juros depois de um longo ciclo de alta. Em qual fase provavelmente estamos?',
      alternativas: ['Expansão', 'Pico e aperto', 'Recuperação', 'Nenhuma, o ciclo acabou'],
      correta: 2,
      explicacao: 'O corte de juros costuma marcar o início da recuperação. Historicamente a bolsa antecipa esse movimento e começa a subir antes de os dados de emprego melhorarem.',
    },
    {
      pergunta: 'Por que a contração é considerada a fase mais fértil para quem investe?',
      alternativas: ['Porque a renda fixa rende mais', 'Porque os ativos ficam baratos justamente quando é mais difícil comprar', 'Porque o governo distribui incentivos', 'Porque a volatilidade some'],
      correta: 1,
      explicacao: 'Preços baixos aparecem quando as notícias são ruins. Quem tem reserva e prazo consegue comprar nessa fase; quem não tem, vende.',
    },
    {
      pergunta: 'Qual erro é mais comum na leitura de ciclos?',
      alternativas: ['Rebalancear a carteira', 'Achar que dá para acertar o topo e o fundo com precisão', 'Manter reserva de emergência', 'Diversificar entre classes'],
      correta: 1,
      explicacao: 'Nem profissionais em tempo integral acertam consistentemente os pontos de virada. Ciclo serve para contextualizar, não para cronometrar entrada e saída.',
    },
    {
      pergunta: 'O que NÃO é um ciclo econômico?',
      alternativas: ['Uma recessão seguida de recuperação', 'Um período de aperto monetário', 'O envelhecimento da população brasileira', 'Uma fase de expansão do crédito'],
      correta: 2,
      explicacao: 'Envelhecimento populacional é tendência estrutural: não volta ao ponto anterior. Ciclos, por definição, alternam e retornam a estados semelhantes.',
    },
  ],

  faq: [
    {
      pergunta: 'Como sei em que fase estamos agora?',
      resposta: 'Nunca com certeza, e essa é a resposta honesta. Os sinais mais úteis são a direção dos juros e o comportamento do crédito. Mas a classificação só fica clara depois, o que reforça por que ciclo não serve para cronometrar.',
    },
    {
      pergunta: 'Devo sair da bolsa quando o ciclo virar?',
      resposta: 'Sair inteiramente exige acertar duas vezes: a saída e a volta. A abordagem mais defensável é ajustar na margem, dentro de um limite, e deixar o rebalanceamento fazer o trabalho de comprar barato e reduzir o que subiu demais.',
    },
    {
      pergunta: 'Quanto tempo dura um ciclo?',
      resposta: 'Varia bastante — alguns anos, às vezes mais de uma década. No Brasil, choques políticos e de commodities encurtam ou alongam as fases de forma pouco previsível. Por isso construir estratégia em cima da duração esperada de um ciclo costuma dar errado.',
    },
  ],
}
