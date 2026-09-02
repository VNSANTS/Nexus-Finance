import type { Modulo } from '@/types'

export const estrategiasGrandesGestores: Modulo = {
  id: 'estrategias-grandes-gestores',
  trilhaId: 'estrategia-gestao',
  numero: 6,
  titulo: 'Estratégias dos Grandes Gestores',
  subtitulo: 'O que investidores lendários fazem diferente — e o que disso cabe na sua carteira',
  iconName: 'Trophy',
  duracaoMin: 13,

  nivel: 'intermediario',
  preRequisitos: ['alocacao-ativos'],
  objetivoAprendizagem: 'Você vai sair reconhecendo as principais escolas de investimento praticadas por grandes gestores e o que é possível adaptar para um investidor pessoa física.',
  erroFatal: 'Copiar a carteira ou a estratégia de um grande gestor sem entender o contexto (tamanho de capital, horizonte de tempo, mandato do fundo) por trás daquela decisão — o que funciona para um fundo com bilhões e horizonte de décadas pode ser inadequado para uma pessoa física com outro perfil.',
  numeroChave: {
    valor: 'menos de 20%',
    legenda: 'dos fundos de ações ativos superam seu índice de referência de forma consistente ao longo de 10 anos ou mais, segundo estudos recorrentes de indústria financeira sobre performance de gestores ativos'
  },
  glossarioDoModulo: ['value investing', 'growth investing', 'investimento macro global', 'gestão passiva', 'margem de segurança', 'concentração vs. diversificação'],
  proximoPasso: { moduloId: 'investimento-internacional', motivo: 'Várias das estratégias dos grandes gestores dependem de atuar em múltiplos mercados — o próximo passo natural é entender como investir fora do Brasil na prática.' },

  aprender: {
    oQueE: 'Este módulo apresenta as principais escolas de investimento praticadas por gestores que construíram track records de longuíssimo prazo — value investing, growth investing, macro global e gestão quantitativa — e como cada uma pensa risco, retorno e tempo de forma diferente.',
    porQueImporta: 'Entender essas escolas não é sobre imitar nomes famosos, mas sobre reconhecer que existem lógicas de investimento coerentes e testadas ao longo de décadas, o que ajuda o investidor pessoa física a construir sua própria filosofia consciente, em vez de pular de estratégia em estratégia seguindo a moda do momento.',
    naPratica: 'Value investing (associado a Warren Buffett e Benjamin Graham) busca comprar empresas por um preço abaixo do seu valor intrínseco, com margem de segurança, e segurar por anos. Growth investing foca em empresas com crescimento acelerado de receita e lucro, aceitando pagar múltiplos mais altos pela expectativa de expansão futura. Investimento macro global (associado a gestores como George Soros) faz apostas direcionais em moedas, juros e índices com base em análise macroeconômica, geralmente com mais alavancagem e concentração. Gestão quantitativa usa modelos estatísticos e algoritmos para identificar padrões e executar milhares de operações, com pouca ou nenhuma decisão discricionária. No Brasil, gestoras como as que seguem value investing costumam comunicar suas teses publicamente em cartas trimestrais, que são fontes valiosas de aprendizado mesmo para quem não investe nesses fundos.',
    passoAPasso: [
      'Leia cartas de gestores (nacionais e internacionais) para entender como eles constroem e comunicam teses de investimento.',
      'Identifique qual escola de investimento mais dialoga com sua própria tolerância a risco e horizonte de tempo.',
      'Entenda o contexto por trás de cada estratégia — tamanho de capital, mandato, prazo — antes de tentar replicar qualquer parte dela.',
      'Adapte princípios (margem de segurança, foco em fundamentos, paciência) em vez de copiar posições específicas.',
      'Avalie fundos geridos ativamente com esse racional se preferir delegar a execução, comparando taxa de administração e histórico consistente, não só retorno de um único ano.'
    ],
    errosComuns: [
      'Copiar a posição específica de um gestor famoso sem entender o motivo e o contexto por trás da decisão.',
      'Achar que uma única escola de investimento é "a certa" e todas as outras estão erradas — cada uma tem racional próprio e se encaixa em contextos diferentes.',
      'Avaliar um fundo ativo só pelo retorno de um ano isolado, ignorando consistência e taxa de administração ao longo do tempo.',
      'Tentar replicar estratégias de investimento macro global (alavancadas e concentradas) sem o capital, o conhecimento ou a tolerância a risco necessários.',
      'Ignorar que a maioria dos gestores ativos, no longo prazo, não supera consistentemente seu índice de referência.'
    ],
    comparativo: {
      titulo: 'Principais escolas de investimento',
      linhas: [
        { label: 'Value investing', valor: 'Comprar abaixo do valor intrínseco, com margem de segurança, horizonte longo' },
        { label: 'Growth investing', valor: 'Empresas de crescimento acelerado, múltiplos mais altos, aposta no futuro' },
        { label: 'Macro global', valor: 'Apostas direcionais em juros, moedas e índices, com base em análise macroeconômica' },
        { label: 'Gestão quantitativa', valor: 'Modelos estatísticos e algoritmos, pouca decisão discricionária' }
      ]
    },
    checklist: [
      'Leia pelo menos uma carta trimestral de um gestor renomado nesse trimestre.',
      'Identifique qual escola de investimento mais se alinha com seu próprio perfil.',
      'Se investir em fundos ativos, compare o histórico de pelo menos 5 anos, não apenas o último ano.',
      'Evite replicar posições específicas sem entender o racional e o contexto por trás delas.'
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham é a referência histórica que moldou a filosofia de praticamente todos os grandes gestores de valor citados neste módulo — entender o racional dele ajuda a reconhecer de onde vêm as estratégias que eles aplicam hoje.',
    },
    naoConfundirCom: [
      { moduloId: 'alocacao-ativos', diferenca: 'Alocação de ativos trata de como dividir o patrimônio entre classes; estratégias de grandes gestores tratam de filosofias específicas de seleção e gestão dentro da renda variável.' }
    ]
  },

  mapaMental: {
    label: 'Estratégias dos Grandes Gestores',
    subtitulo: 'As principais escolas de investimento e sua lógica',
    ramos: [
      {
        id: 'value',
        label: 'Value Investing',
        cor: '#3B82F6',
        resumo: 'Comprar barato em relação ao valor real',
        filhos: [
          { label: 'Margem de segurança', desc: 'Comprar com desconto relevante em relação ao valor intrínseco estimado' },
          { label: 'Horizonte longo', desc: 'Paciência para o mercado reconhecer o valor real da empresa' },
          { label: 'Foco em fundamentos', desc: 'Análise de balanço, fluxo de caixa e vantagem competitiva' }
        ]
      },
      {
        id: 'growth',
        label: 'Growth Investing',
        cor: '#10B981',
        resumo: 'Apostar no crescimento futuro acelerado',
        filhos: [
          { label: 'Crescimento de receita', desc: 'Priorizar empresas com expansão acelerada de vendas' },
          { label: 'Múltiplos mais altos', desc: 'Aceitar pagar mais caro hoje pela expectativa de crescimento' },
          { label: 'Setores inovadores', desc: 'Frequentemente concentrado em tecnologia e novos modelos de negócio' }
        ]
      },
      {
        id: 'macro-global',
        label: 'Macro Global',
        cor: '#F59E0B',
        resumo: 'Apostas direcionais baseadas em cenário econômico',
        filhos: [
          { label: 'Juros e moedas', desc: 'Posições em taxas de juros e câmbio de diferentes países' },
          { label: 'Concentração e alavancagem', desc: 'Posições grandes e concentradas nas tendências de maior convicção' },
          { label: 'Análise macroeconômica', desc: 'Ciclos econômicos, política monetária e fiscal como base da tese' }
        ]
      },
      {
        id: 'quantitativa',
        label: 'Gestão Quantitativa',
        cor: '#8B5CF6',
        resumo: 'Modelos estatísticos e execução algorítmica',
        filhos: [
          { label: 'Modelos estatísticos', desc: 'Padrões identificados em grandes volumes de dados históricos' },
          { label: 'Execução automatizada', desc: 'Milhares de operações executadas por algoritmo, sem decisão manual' },
          { label: 'Pouca discricionariedade', desc: 'Decisões seguem o modelo, não a opinião pontual de um gestor' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões de investimento sob a ótica de diferentes escolas de gestores e reflete sobre qual racional se aplicaria a cada situação.',
    passos: [
      'Leia a situação de investimento apresentada.',
      'Escolha como você reagiria, imaginando-se com o racional de cada escola.',
      'Veja a reflexão sobre qual escola melhor se encaixa em cada abordagem.'
    ],
    exemploGuiado: 'Situação: uma empresa consolidada tem ações negociadas a um preço bem abaixo do valor patrimonial e do fluxo de caixa que gera, mas está num setor considerado "sem graça" pelo mercado. Um investidor com racional de value investing veria isso como oportunidade — margem de segurança e fundamentos sólidos, apesar da falta de entusiasmo do mercado. Já um investidor com racional de growth investing provavelmente passaria longe, preferindo pagar mais caro por uma empresa em setor de crescimento acelerado, mesmo com fundamentos financeiros atuais mais frágeis.',
    cenarioGuiado: [
      {
        pergunta: 'Uma empresa consolidada negocia bem abaixo do seu valor patrimonial, mas está num setor considerado "sem graça" pelo mercado. Qual racional melhor descreve investir nela?',
        opcoes: [
          { texto: 'Value investing: preço abaixo do valor intrínseco, com margem de segurança', resultado: 'Correto — esse é exatamente o tipo de situação que atrai investidores com racional de value investing, mesmo sem entusiasmo do mercado.' },
          { texto: 'Growth investing: aposta em crescimento futuro acelerado', resultado: 'Não se encaixa bem — growth investing tipicamente busca empresas com expansão acelerada de receita, não empresas "baratas" num setor estagnado.' }
        ]
      },
      {
        pergunta: 'Um gestor monta uma posição concentrada e alavancada apostando na queda de uma moeda, com base em análise da política monetária do país. Qual escola isso representa?',
        opcoes: [
          { texto: 'Macro global', resultado: 'Correto — apostas direcionais concentradas em moedas e juros, baseadas em cenário macroeconômico, são a marca registrada da gestão macro global.' },
          { texto: 'Gestão quantitativa', resultado: 'Não se encaixa — gestão quantitativa segue modelos estatísticos com pouca decisão discricionária, diferente de uma aposta direcional baseada em análise macroeconômica pontual.' }
        ]
      },
      {
        pergunta: 'Um fundo executa milhares de operações por dia com base em modelos estatísticos, sem nenhum gestor decidindo posição por posição manualmente. Qual escola é essa?',
        opcoes: [
          { texto: 'Gestão quantitativa', resultado: 'Correto — a característica central da gestão quantitativa é a execução baseada em modelos, com decisão pouco ou nada discricionária.' },
          { texto: 'Value investing', resultado: 'Não se encaixa — value investing depende de análise fundamentalista discricionária de empresas específicas, não de execução automatizada em alta frequência.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'egg-01', frente: 'O que é value investing?', verso: 'Uma escola de investimento que busca comprar ações por um preço abaixo do valor intrínseco estimado da empresa, com margem de segurança, e segurar por anos.' },
    { id: 'egg-02', frente: 'O que é growth investing?', verso: 'Uma escola de investimento que foca em empresas com crescimento acelerado de receita e lucro, aceitando pagar múltiplos mais altos pela expectativa de expansão futura.' },
    { id: 'egg-03', frente: 'O que caracteriza a gestão macro global?', verso: 'Apostas direcionais e concentradas em juros, moedas e índices, baseadas em análise do cenário macroeconômico, geralmente com mais alavancagem.' },
    { id: 'egg-04', frente: 'O que é gestão quantitativa?', verso: 'Uma abordagem que usa modelos estatísticos e algoritmos para identificar padrões e executar operações, com pouca ou nenhuma decisão manual discricionária.' },
    { id: 'egg-05', frente: 'O que é "margem de segurança" em value investing?', verso: 'A diferença entre o preço pago por um ativo e sua estimativa de valor intrínseco, funcionando como uma proteção contra erros de avaliação.' },
    { id: 'egg-06', frente: 'Por que copiar a posição de um gestor famoso sem entender o contexto é arriscado?', verso: 'Porque o tamanho de capital, o horizonte de tempo e o mandato daquele fundo podem ser completamente diferentes da situação de um investidor pessoa física.' },
    { id: 'egg-07', frente: 'Como avaliar corretamente um fundo de gestão ativa?', verso: 'Olhando a consistência do histórico ao longo de vários anos (5 ou mais) e a taxa de administração, não apenas o retorno de um único ano.' },
    { id: 'egg-08', frente: 'Segundo estudos de indústria, qual parcela dos fundos ativos supera consistentemente seu índice de referência no longo prazo?', verso: 'Uma minoria — geralmente menos de 20% ao longo de períodos de 10 anos ou mais, o que reforça a dificuldade de bater o mercado de forma consistente.' }
  ],

  quiz: [
    {
      pergunta: 'Qual escola de investimento busca comprar ativos abaixo do valor intrínseco estimado, com margem de segurança?',
      alternativas: ['Growth investing', 'Value investing', 'Macro global', 'Gestão quantitativa'],
      correta: 1,
      explicacao: 'Value investing é definido justamente pela busca de ativos precificados abaixo do valor intrínseco real, com uma margem de segurança que protege contra erros de avaliação.'
    },
    {
      pergunta: 'Qual é o principal risco de tentar replicar diretamente a estratégia de um fundo macro global concentrado e alavancado como pessoa física?',
      alternativas: [
        'Não há risco relevante, a estratégia funciona igual para qualquer capital',
        'A ausência do capital, conhecimento e tolerância a risco necessários para esse tipo de posição concentrada',
        'Isso é proibido por lei para pessoas físicas',
        'Fundos macro global não usam alavancagem'
      ],
      correta: 1,
      explicacao: 'Estratégias macro global concentradas e alavancadas dependem de um contexto (capital, mandato, tolerância a risco) muito diferente do de um investidor pessoa física comum, tornando a réplica direta arriscada.'
    },
    {
      pergunta: 'O que caracteriza a gestão quantitativa?',
      alternativas: [
        'Decisões discricionárias baseadas na intuição do gestor',
        'Modelos estatísticos e execução automatizada, com pouca decisão manual',
        'Compra exclusiva de ações de valor',
        'Apostas concentradas em moedas com base em notícias'
      ],
      correta: 1,
      explicacao: 'Gestão quantitativa se define pelo uso de modelos estatísticos e execução algorítmica, com a decisão seguindo o modelo, não a opinião pontual e discricionária de um gestor.'
    },
    {
      pergunta: 'Por que avaliar um fundo de gestão ativa apenas pelo retorno de um único ano é um erro comum?',
      alternativas: [
        'Porque retornos anuais são sempre calculados errado',
        'Porque um único ano pode não refletir a consistência real da estratégia ao longo de um ciclo completo de mercado',
        'Porque fundos ativos não divulgam retorno anual',
        'Porque isso é ilegal segundo a CVM'
      ],
      correta: 1,
      explicacao: 'Um único ano de bom desempenho pode ser sorte ou um ciclo de mercado favorável àquela estratégia específica — a consistência ao longo de vários anos é um indicador mais confiável da qualidade da gestão.'
    },
    {
      pergunta: 'Qual das opções melhor descreve growth investing?',
      alternativas: [
        'Comprar empresas baratas em relação ao valor patrimonial',
        'Focar em empresas com crescimento acelerado de receita, aceitando múltiplos mais altos',
        'Apostar na queda de moedas com base em política monetária',
        'Executar operações via modelos estatísticos'
      ],
      correta: 1,
      explicacao: 'Growth investing prioriza o potencial de crescimento futuro da empresa, aceitando pagar um preço mais alto hoje em relação aos fundamentos atuais, na expectativa de expansão acelerada.'
    },
    {
      pergunta: 'Qual é a atitude mais adequada de um investidor pessoa física em relação às diferentes escolas de investimento?',
      alternativas: [
        'Escolher uma única escola como "a certa" e ignorar completamente as demais',
        'Entender os princípios de cada escola e adaptar o que faz sentido ao próprio perfil e horizonte, sem copiar posições específicas',
        'Trocar de escola de investimento a cada trimestre, seguindo quem teve melhor retorno recente',
        'Ignorar completamente as estratégias de grandes gestores, já que não se aplicam a pessoas físicas'
      ],
      correta: 1,
      explicacao: 'A recomendação central é entender os princípios (margem de segurança, foco em fundamentos, paciência, disciplina) e adaptá-los ao próprio contexto, em vez de copiar posições específicas ou trocar de estratégia por moda.'
    }
  ],

  faq: [
    { pergunta: 'Existe uma escola de investimento "melhor" que as outras?', resposta: 'Não de forma absoluta — cada escola tem racional coerente e se encaixa melhor em contextos e perfis diferentes. O importante é entender os princípios de cada uma e escolher o que se alinha ao seu próprio horizonte e tolerância a risco.' },
    { pergunta: 'Vale a pena ler cartas de gestores mesmo sem investir nos fundos deles?', resposta: 'Sim — cartas de gestores renomados costumam explicar o racional por trás das decisões de investimento de forma didática, o que ajuda a desenvolver o próprio raciocínio, independente de investir ou não naquele fundo específico.' },
    { pergunta: 'Fundos de gestão ativa valem o custo da taxa de administração?', resposta: 'Depende — a maioria dos fundos ativos, no longo prazo, não supera consistentemente seu índice de referência depois de descontada a taxa. Vale comparar o histórico de vários anos e a taxa cobrada antes de decidir, em vez de assumir que gestão ativa sempre compensa.' },
    { pergunta: 'Um investidor pessoa física pode praticar value investing de verdade?', resposta: 'Sim, em escala menor — os princípios (margem de segurança, foco em fundamentos, paciência) se aplicam independente do tamanho de capital, embora o acesso a certas informações e negociações que grandes fundos têm seja diferente.' },
    { pergunta: 'Por que estratégias macro global costumam usar mais alavancagem?', resposta: 'Porque as apostas costumam ser em variações relativamente pequenas de juros ou câmbio, e a alavancagem amplia o retorno (e o risco) dessas variações — por isso exige gestão de risco muito mais sofisticada.' }
  ]
}
