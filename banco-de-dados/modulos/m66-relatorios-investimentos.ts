// m06-relatorios-investimentos.ts
import { Modulo } from '@/types'

export const relatoriosInvestimentos: Modulo = {
  id: 'relatorios-investimentos',
  trilhaId: 'cultura-investimentos',
  numero: 6,
  titulo: 'Relatórios de Investimentos',
  subtitulo: 'Como ler relatórios de análise sem confundir opinião de analista com fato garantido',
  iconName: 'FileBarChart',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['empresas-negocios', 'resumos-livros'],
  objetivoAprendizagem: 'Você vai sair sabendo identificar as partes essenciais de um relatório de análise de investimentos e avaliar criticamente as premissas por trás de qualquer recomendação apresentada.',
  erroFatal: 'Tratar o "preço-alvo" de um relatório de análise como uma previsão garantida ou certeza matemática, em vez de uma estimativa baseada em premissas específicas do analista — preços-alvo frequentemente não se confirmam, e a informação mais valiosa de um relatório costuma estar nas premissas e no raciocínio por trás do número, não no número final isoladamente.',
  numeroChave: { valor: 'múltiplos analistas', legenda: 'diferentes casas de análise frequentemente publicam preços-alvo distintos para a mesma empresa, às vezes com diferenças superiores a 30% entre si — evidência clara de que essas projeções são estimativas baseadas em premissas específicas, não fatos objetivos e únicos' },
  glossarioDoModulo: ['Preço-alvo', 'Recomendação (compra, venda, neutro)', 'Múltiplos de valuation', 'Tese de investimento do analista', 'Conflito de interesse', 'Relatório setorial vs. relatório de empresa específica'],
  proximoPasso: { moduloId: 'estudos-de-caso', motivo: 'Depois de aprender a ler relatórios de investimento com espírito crítico, vale revisitar estudos de caso específicos de empresas para aplicar essa mesma análise crítica a decisões de investimento documentadas historicamente.' },

  aprender: {
    oQueE: 'Relatórios de investimentos são documentos técnicos produzidos por analistas de instituições financeiras (corretoras, bancos de investimento, casas de análise independentes) contendo avaliação detalhada de uma empresa, setor ou classe de ativo específica, geralmente incluindo uma recomendação (compra, venda ou manutenção), um preço-alvo estimado e a análise fundamentalista que sustenta essas conclusões. No Brasil, tanto grandes bancos quanto casas de análise independentes registradas na CVM produzem esse tipo de material, disponibilizado a clientes ou, em alguns casos, publicamente.',
    porQueImporta: 'Investidores que leem apenas a recomendação final (compra ou venda) e o preço-alvo de um relatório, sem entender as premissas e o raciocínio por trás dessas conclusões, perdem a parte mais valiosa da análise e ficam vulneráveis a tratar uma estimativa como se fosse uma certeza matemática. Além disso, é importante entender que analistas de instituições financeiras podem ter, em determinados contextos, conflitos de interesse (como a própria instituição ter relação comercial com a empresa analisada), o que reforça a importância de ler criticamente as premissas, não apenas a conclusão final apresentada.',
    naPratica: 'Um relatório de investimento tipicamente estruturado inclui: uma tese de investimento (o raciocínio central que justifica a recomendação), a metodologia de valuation utilizada (como múltiplos de mercado comparáveis ou fluxo de caixa descontado), as premissas específicas assumidas para projeções futuras (crescimento de receita esperado, margens futuras, taxa de desconto aplicada) e os principais riscos identificados que poderiam invalidar a tese. O preço-alvo final é uma consequência matemática dessas premissas específicas — mudar qualquer uma delas (por exemplo, uma taxa de crescimento ligeiramente mais conservadora) pode alterar significativamente o preço-alvo resultante, o que explica por que diferentes analistas, usando premissas distintas, frequentemente chegam a preços-alvo bastante diferentes para a mesma empresa. No Brasil, a CVM exige que relatórios de análise informem eventuais conflitos de interesse relevantes, como participação acionária do analista ou da instituição na empresa analisada, informação que vale a pena verificar antes de dar peso excessivo a uma recomendação específica.',
    passoAPasso: [
      'Ao ler um relatório de investimento, comece pela tese de investimento central, entendendo o raciocínio principal antes de olhar para o preço-alvo específico.',
      'Identifique as premissas específicas usadas na projeção (crescimento esperado, margens futuras, taxa de desconto), avaliando se parecem razoáveis com base no seu próprio conhecimento sobre a empresa e o setor.',
      'Verifique se o relatório declara algum conflito de interesse relevante entre a instituição responsável e a empresa analisada.',
      'Compare o preço-alvo e a recomendação com relatórios de outras casas de análise sobre a mesma empresa, observando o grau de convergência ou divergência entre diferentes analistas.',
      'Preste atenção especial à seção de riscos identificados no relatório, que costuma revelar os principais pontos de incerteza da tese apresentada.',
      'Trate o preço-alvo como uma estimativa baseada em premissas específicas, sujeita a mudança conforme novas informações surgem, não como uma previsão garantida.'
    ],
    errosComuns: [
      'Ler apenas a recomendação final (compra ou venda) e o preço-alvo, sem entender as premissas e o raciocínio que sustentam essas conclusões.',
      'Tratar o preço-alvo como uma previsão garantida ou certeza matemática, em vez de uma estimativa sujeita a mudanças conforme as premissas se confirmam ou não na realidade.',
      'Ignorar eventuais conflitos de interesse declarados no relatório entre a instituição responsável e a empresa analisada.',
      'Não comparar relatórios de diferentes casas de análise sobre a mesma empresa, perdendo a oportunidade de identificar o grau de consenso ou divergência entre analistas.',
      'Desconsiderar completamente a seção de riscos do relatório, que costuma trazer informações relevantes sobre incertezas da tese apresentada.',
      'Confiar cegamente em relatórios antigos, sem considerar que premissas e condições de mercado podem ter mudado significativamente desde a data de publicação.'
    ],
    comparativo: {
      titulo: 'Leitura superficial vs. leitura crítica de um relatório de investimento',
      linhas: [
        { label: 'Foco principal da leitura', valor: 'Superficial: apenas recomendação e preço-alvo | Crítica: tese, premissas e riscos identificados' },
        { label: 'Tratamento do preço-alvo', valor: 'Superficial: como previsão garantida | Crítica: como estimativa sujeita a premissas específicas' },
        { label: 'Verificação de conflito de interesse', valor: 'Superficial: ignorada | Crítica: verificada antes de dar peso à recomendação' },
        { label: 'Comparação entre fontes', valor: 'Superficial: relatório único considerado suficiente | Crítica: comparação entre diferentes casas de análise' }
      ]
    },
    checklist: [
      'Ao ler um relatório, comece pela tese de investimento, não pelo preço-alvo isolado.',
      'Identifique as premissas específicas usadas nas projeções e avalie se parecem razoáveis.',
      'Verifique se há declaração de conflito de interesse entre a instituição e a empresa analisada.',
      'Compare com relatórios de outras casas de análise sobre a mesma empresa, quando disponível.',
      'Leia atentamente a seção de riscos identificados pelo analista.'
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham insiste que o investidor deve entender a tese por trás de uma recomendação, não seguir preços-alvo cegamente — o primeiro item deste checklist, "comece pela tese, não pelo preço-alvo isolado", é esse princípio aplicado à leitura de relatórios.',
    },
    naoConfundirCom: [
      { moduloId: 'empresas-negocios', diferenca: 'Empresas e Negócios ensina a ler diretamente os demonstrativos financeiros de uma empresa; Relatórios de Investimentos foca em avaliar criticamente a análise já elaborada por profissionais sobre esses demonstrativos e outras informações da empresa.' },
      { moduloId: 'estudos-de-caso', diferenca: 'Este módulo foca na leitura crítica de relatórios técnicos atuais, produzidos por analistas; Estudos de Caso de Empresas foca na análise retrospectiva e metodológica de decisões de investimento já concluídas historicamente.' }
    ]
  },

  mapaMental: {
    label: 'Relatórios de Investimentos',
    subtitulo: 'Como ler análises técnicas com espírito crítico',
    ramos: [
      {
        id: 'estrutura-do-relatorio',
        label: 'Estrutura do Relatório',
        cor: '#3B82F6',
        resumo: 'Os elementos centrais de uma análise técnica',
        filhos: [
          { label: 'Tese de investimento', desc: 'O raciocínio central que justifica a recomendação apresentada' },
          { label: 'Metodologia de valuation', desc: 'Como o preço-alvo foi calculado (múltiplos, fluxo de caixa descontado)' },
          { label: 'Premissas específicas', desc: 'Crescimento, margens e taxa de desconto assumidos na projeção' },
          { label: 'Riscos identificados', desc: 'Pontos de incerteza que poderiam invalidar a tese apresentada' }
        ]
      },
      {
        id: 'limitacoes-a-considerar',
        label: 'Limitações a Considerar',
        cor: '#EF4444',
        resumo: 'Por que o preço-alvo não é uma certeza',
        filhos: [
          { label: 'Sensibilidade das premissas', desc: 'Pequenas mudanças nas premissas alteram significativamente o preço-alvo' },
          { label: 'Conflito de interesse', desc: 'Relação comercial entre instituição e empresa analisada' },
          { label: 'Divergência entre analistas', desc: 'Diferentes casas frequentemente chegam a preços-alvo distintos' }
        ]
      },
      {
        id: 'praticas-de-leitura-critica',
        label: 'Práticas de Leitura Crítica',
        cor: '#22C55E',
        resumo: 'Como extrair mais valor de um relatório',
        filhos: [
          { label: 'Foco nas premissas', desc: 'Entender o raciocínio antes de olhar apenas o número final' },
          { label: 'Comparação entre fontes', desc: 'Verificar convergência ou divergência entre diferentes analistas' },
          { label: 'Verificação de conflitos', desc: 'Checar declarações obrigatórias exigidas pela CVM' }
        ]
      },
      {
        id: 'tipos-de-relatorio',
        label: 'Tipos de Relatório',
        cor: '#F59E0B',
        resumo: 'Diferentes escopos de análise disponíveis no mercado',
        filhos: [
          { label: 'Relatório de empresa específica', desc: 'Análise detalhada de uma companhia individual' },
          { label: 'Relatório setorial', desc: 'Visão comparativa de múltiplas empresas dentro de um mesmo setor' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações relacionadas à leitura crítica de relatórios de investimento e reflete sobre como interpretar corretamente recomendações e preços-alvo apresentados por analistas.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre como interpretar um relatório de investimento.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de leitura crítica de relatórios técnicos.'
    ],
    exemploGuiado: 'Um investidor lê um relatório de análise que recomenda compra de uma ação específica, com preço-alvo 25% acima da cotação atual. Antes de tomar qualquer decisão baseada apenas nessa informação, ele verifica as premissas usadas no relatório e percebe que o analista assumiu uma taxa de crescimento de receita bastante otimista para os próximos anos, acima da média histórica recente da empresa. Ele então busca relatórios de outras duas casas de análise sobre a mesma empresa, encontrando preços-alvo mais conservadores, com premissas de crescimento mais alinhadas ao histórico recente. Com essa comparação, o investidor entende que o preço-alvo mais otimista depende de uma premissa específica de aceleração de crescimento que pode ou não se concretizar, e decide considerar essa incerteza na sua própria análise, em vez de tratar o preço-alvo mais otimista como uma certeza matemática sobre o futuro da ação.',
    cenarioGuiado: [
      {
        pergunta: 'Você lê um relatório com recomendação de compra e preço-alvo bastante otimista para uma ação específica.',
        opcoes: [
          { texto: 'Decido investir imediatamente, confiando no preço-alvo apresentado como uma projeção confiável', resultado: 'Tratar o preço-alvo como uma previsão garantida, sem entender as premissas específicas que o sustentam, ignora que diferentes analistas frequentemente chegam a conclusões distintas para a mesma empresa, dependendo das premissas assumidas em cada análise.' },
          { texto: 'Verifico as premissas usadas no relatório e comparo com análises de outras casas antes de decidir', resultado: 'Avaliar as premissas específicas e comparar com outras fontes de análise ajuda a formar uma visão mais equilibrada sobre a incerteza real envolvida na projeção, em vez de tratar um único preço-alvo como certeza absoluta.' }
        ]
      },
      {
        pergunta: 'Você percebe que um relatório de análise foi produzido por uma instituição que também presta serviços financeiros para a empresa analisada.',
        opcoes: [
          { texto: 'Ignoro essa informação, já que o relatório parece tecnicamente bem elaborado', resultado: 'Ignorar conflitos de interesse declarados, mesmo diante de um relatório tecnicamente bem elaborado, pode levar a dar peso excessivo a uma recomendação que possa estar influenciada, ainda que parcialmente, pela relação comercial entre as partes envolvidas.' },
          { texto: 'Considero esse conflito de interesse ao avaliar o peso que vou dar a essa recomendação específica', resultado: 'Levar em conta conflitos de interesse declarados é uma prática de leitura crítica recomendada, ajudando a calibrar adequadamente a confiança depositada numa recomendação específica, sem necessariamente descartá-la por completo.' }
        ]
      },
      {
        pergunta: 'Você encontra um relatório de investimento publicado há mais de um ano, com uma recomendação ainda aparentemente relevante para você.',
        opcoes: [
          { texto: 'Uso a recomendação como se fosse atual, sem verificar se algo relevante mudou desde então', resultado: 'Premissas e condições de mercado podem mudar significativamente ao longo de um ano — usar uma recomendação desatualizada sem verificar desenvolvimentos mais recentes pode levar a decisões baseadas em informações que já não refletem a realidade atual da empresa ou do mercado.' },
          { texto: 'Busco relatórios mais recentes ou verifico se houve mudanças relevantes na empresa desde a publicação original', resultado: 'Verificar a atualidade das informações e buscar análises mais recentes, quando disponíveis, é uma prática importante de leitura crítica, já que premissas de mercado podem ter mudado significativamente desde a publicação original do relatório.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'ri-01', frente: 'O que é a tese de investimento num relatório de análise?', verso: 'O raciocínio central que justifica a recomendação apresentada pelo analista, explicando por que a ação deveria ser comprada, vendida ou mantida.' },
    { id: 'ri-02', frente: 'Por que o preço-alvo de um relatório não deve ser tratado como previsão garantida?', verso: 'Porque é uma consequência matemática de premissas específicas assumidas pelo analista (crescimento, margens, taxa de desconto), que podem ou não se confirmar na realidade — diferentes analistas frequentemente chegam a preços-alvo distintos para a mesma empresa.' },
    { id: 'ri-03', frente: 'Qual é o erro mais caro relacionado à leitura de relatórios de investimento, segundo o módulo?', verso: 'Tratar o preço-alvo como uma certeza matemática, em vez de uma estimativa baseada em premissas específicas do analista, que podem se confirmar ou não ao longo do tempo.' },
    { id: 'ri-04', frente: 'Por que verificar conflitos de interesse declarados num relatório é importante?', verso: 'Porque a instituição responsável pela análise pode ter relação comercial com a empresa analisada, o que pode influenciar, ainda que parcialmente, a recomendação apresentada.' },
    { id: 'ri-05', frente: 'O que geralmente inclui a seção de riscos de um relatório de investimento?', verso: 'Os principais pontos de incerteza identificados pelo analista que poderiam invalidar a tese de investimento apresentada, caso se concretizem.' },
    { id: 'ri-06', frente: 'Por que comparar relatórios de diferentes casas de análise sobre a mesma empresa é uma boa prática?', verso: 'Porque revela o grau de consenso ou divergência entre analistas, ajudando a entender a incerteza real envolvida na projeção, em vez de confiar numa única fonte isolada.' },
    { id: 'ri-07', frente: 'O que a CVM exige que relatórios de análise informem, no Brasil?', verso: 'Eventuais conflitos de interesse relevantes, como participação acionária do analista ou da instituição na empresa analisada.' },
    { id: 'ri-08', frente: 'Por que a data de publicação de um relatório de investimento é relevante?', verso: 'Porque premissas e condições de mercado podem mudar significativamente ao longo do tempo, tornando recomendações antigas potencialmente desatualizadas em relação à realidade atual da empresa ou do mercado.' }
  ],

  quiz: [
    {
      pergunta: 'Por que o preço-alvo de um relatório de investimento não deve ser tratado como uma previsão garantida?',
      alternativas: [
        'Porque preços-alvo nunca são calculados com metodologia técnica',
        'Porque é uma consequência matemática de premissas específicas do analista, que podem ou não se confirmar na realidade',
        'Porque a CVM proíbe a divulgação de preços-alvo no Brasil',
        'Porque preços-alvo só existem para ações de empresas estrangeiras'
      ],
      correta: 1,
      explicacao: 'O preço-alvo resulta de premissas específicas assumidas pelo analista sobre crescimento, margens e taxa de desconto — mudanças nessas premissas alteram significativamente o resultado, o que explica divergências entre diferentes analistas para a mesma empresa.'
    },
    {
      pergunta: 'Qual é o erro mais caro relacionado à leitura de relatórios de investimento, segundo o módulo?',
      alternativas: [
        'Verificar as premissas específicas usadas nas projeções do relatório',
        'Tratar o preço-alvo como certeza matemática, em vez de estimativa baseada em premissas específicas',
        'Comparar relatórios de diferentes casas de análise sobre a mesma empresa',
        'Ler a seção de riscos identificados pelo analista'
      ],
      correta: 1,
      explicacao: 'Tratar o preço-alvo como garantido, sem entender as premissas específicas que o sustentam, ignora que se trata de uma estimativa sujeita a mudanças, não de um fato objetivo sobre o futuro da empresa analisada.'
    },
    {
      pergunta: 'Por que verificar conflitos de interesse declarados num relatório de investimento é uma prática recomendada?',
      alternativas: [
        'Porque relatórios com conflito de interesse são sempre falsos',
        'Porque a instituição responsável pela análise pode ter relação comercial com a empresa analisada, o que pode influenciar a recomendação',
        'Porque é uma exigência apenas para relatórios internacionais',
        'Porque conflitos de interesse tornam o relatório automaticamente inválido'
      ],
      correta: 1,
      explicacao: 'Conflitos de interesse declarados, como relação comercial entre a instituição e a empresa analisada, podem influenciar, ainda que parcialmente, a recomendação apresentada — verificar essa informação ajuda a calibrar o peso dado à análise.'
    },
    {
      pergunta: 'O que a comparação entre relatórios de diferentes casas de análise sobre a mesma empresa costuma revelar?',
      alternativas: [
        'Qual analista está sempre certo e qual está sempre errado',
        'O grau de consenso ou divergência entre diferentes analistas, útil para entender a incerteza real da projeção',
        'Informações que não têm relação com a qualidade da análise',
        'Apenas informações sobre o tamanho da instituição responsável pelo relatório'
      ],
      correta: 1,
      explicacao: 'Comparar diferentes relatórios sobre a mesma empresa revela se existe consenso amplo entre analistas ou divergência significativa, o que ajuda a entender melhor o grau de incerteza envolvido na projeção apresentada.'
    },
    {
      pergunta: 'O que costuma estar incluído na seção de riscos de um relatório de investimento?',
      alternativas: [
        'Apenas informações irrelevantes para a decisão de investimento',
        'Os principais pontos de incerteza que poderiam invalidar a tese de investimento apresentada',
        'Exclusivamente dados históricos de preço da ação analisada',
        'Informações sobre a sede física da instituição responsável pela análise'
      ],
      correta: 1,
      explicacao: 'A seção de riscos identifica os principais pontos de incerteza que poderiam comprometer a tese central do relatório, sendo uma parte essencial para uma leitura crítica e completa da análise apresentada.'
    },
    {
      pergunta: 'Por que a data de publicação de um relatório de investimento deve ser considerada na análise?',
      alternativas: [
        'Porque relatórios antigos são sempre proibidos de serem consultados',
        'Porque premissas e condições de mercado podem mudar significativamente ao longo do tempo, tornando recomendações antigas potencialmente desatualizadas',
        'Porque a data de publicação não tem nenhuma relevância para a análise',
        'Porque apenas relatórios publicados no mesmo dia são válidos'
      ],
      correta: 1,
      explicacao: 'Condições de mercado e premissas específicas de uma empresa podem mudar consideravelmente ao longo do tempo — um relatório publicado há muito tempo pode não refletir mais a realidade atual, tornando importante verificar análises mais recentes.'
    }
  ],

  faq: [
    { pergunta: 'Devo confiar cegamente em relatórios de grandes bancos de investimento?', resposta: 'Não é recomendado confiar cegamente em nenhuma fonte específica, independente do tamanho da instituição — é mais produtivo avaliar criticamente as premissas apresentadas, verificar conflitos de interesse declarados e comparar com outras fontes de análise disponíveis.' },
    { pergunta: 'Onde posso ter acesso a relatórios de investimento no Brasil?', resposta: 'Muitas corretoras oferecem relatórios de análise gratuitamente para seus clientes, e casas de análise independentes registradas na CVM também publicam conteúdo, sendo algumas gratuitas e outras pagas, dependendo da instituição e do nível de profundidade da análise.' },
    { pergunta: 'O que fazer quando diferentes relatórios apresentam recomendações muito divergentes para a mesma empresa?', resposta: 'Divergência significativa entre analistas é um sinal de que existe incerteza real sobre o futuro da empresa — vale a pena entender quais premissas específicas cada analista está usando para justificar sua visão, e formar sua própria opinião com base nessa análise comparativa.' },
    { pergunta: 'Relatórios setoriais têm as mesmas características de relatórios de empresa específica?', resposta: 'Relatórios setoriais analisam múltiplas empresas dentro de um mesmo setor de forma comparativa, geralmente com menos profundidade individual sobre cada empresa específica do que um relatório dedicado exclusivamente a uma única companhia, mas oferecem contexto valioso sobre tendências mais amplas do setor.' },
    { pergunta: 'É possível prever com precisão se um preço-alvo vai se confirmar ou não?', resposta: 'Não existe forma de prever com certeza — preços-alvo são estimativas baseadas em premissas específicas sobre o futuro, que envolvem incerteza genuína, mesmo quando elaboradas com metodologia técnica rigorosa por analistas experientes.' },
    { pergunta: 'Vale a pena ler relatórios de investimento mesmo sem pretender comprar a ação analisada no curto prazo?', resposta: 'Sim, relatórios de investimento também são uma boa forma de desenvolver conhecimento sobre análise fundamentalista e entender como diferentes analistas avaliam empresas e setores, mesmo sem intenção imediata de compra, contribuindo para o desenvolvimento da própria capacidade analítica.' }
  ]
}
