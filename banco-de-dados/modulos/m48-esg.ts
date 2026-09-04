// m07-esg.ts
import type { Modulo } from '@/types'

export const esg: Modulo = {
  id: 'esg',
  trilhaId: 'alternativos-derivativos',
  numero: 7,
  titulo: 'ESG',
  subtitulo: 'Como separar investimento sustentável real de marketing verde',
  iconName: 'Leaf',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['alocacao-ativos'],
  objetivoAprendizagem: 'Você vai sair sabendo avaliar criticamente fundos e ativos rotulados como ESG, entendendo o que os critérios realmente medem e como identificar greenwashing.',
  erroFatal: 'Investir num fundo só porque tem "ESG" ou "sustentável" no nome, sem checar a metodologia de avaliação por trás do rótulo — muitos fundos rotulados dessa forma têm exposição relevante a empresas e setores que, numa análise mais rigorosa, dificilmente seriam classificados como sustentáveis.',
  numeroChave: { valor: '2', legenda: 'número aproximado de letras (das três de ESG) que a maioria dos fundos rotulados como "sustentáveis" no Brasil efetivamente incorpora de forma rigorosa em sua metodologia de seleção, segundo análises recorrentes sobre o setor' },
  glossarioDoModulo: ['ESG', 'Greenwashing', 'Governança corporativa', 'Critérios de exclusão', 'Rating ESG', 'Materialidade', 'Investimento de impacto'],
  proximoPasso: { moduloId: 'planejamento-financeiro', motivo: 'Depois de aprender a avaliar critérios ESG com ceticismo saudável, o próximo passo natural é estruturar como esses e outros critérios se encaixam no seu planejamento financeiro geral, de forma prática.' },

  aprender: {
    oQueE: 'ESG é a sigla em inglês para Environmental, Social and Governance (Ambiental, Social e Governança) — um conjunto de critérios usados para avaliar práticas de empresas além dos resultados financeiros tradicionais. O critério ambiental avalia impacto em emissões, uso de recursos naturais e gestão de resíduos; o social avalia relações trabalhistas, diversidade e impacto em comunidades; o de governança avalia estrutura de conselho, transparência e alinhamento de interesses entre gestores e acionistas. Fundos de investimento rotulados como ESG prometem selecionar ativos considerando esses critérios, além do retorno financeiro esperado.',
    porQueImporta: 'O rótulo ESG virou um forte apelo de marketing na última década, o que levou a um fenômeno conhecido como greenwashing: fundos e empresas que usam a linguagem da sustentabilidade sem, de fato, aplicar critérios rigorosos de seleção ou mudança de prática. Quem investe baseado só no rótulo, sem entender a metodologia por trás dele, pode acabar com uma carteira que não reflete de fato seus valores, ou pior, pagando taxas de administração mais altas por um produto que, na prática, difere pouco de um fundo tradicional.',
    naPratica: 'No Brasil, a CVM já emitiu orientações para aumentar a transparência de fundos que se autodenominam sustentáveis, exigindo maior clareza sobre a metodologia usada. Ainda assim, não existe uma regulamentação única e rígida que padronize o que pode ou não ser chamado de ESG, o que deixa espaço para interpretações amplas. Alguns fundos usam apenas critérios de exclusão simples (não investir em tabaco, armas ou carvão, por exemplo), enquanto outros aplicam metodologia mais profunda, com engajamento ativo junto às empresas investidas e rating ESG proprietário baseado em dados extensos. A qualidade e o rigor variam enormemente entre gestoras, mesmo dentro do mesmo rótulo "ESG" ou "sustentável" no nome do fundo.',
    passoAPasso: [
      'Ao considerar um fundo ESG, leia o regulamento e a lâmina para entender a metodologia exata usada na seleção de ativos.',
      'Verifique se o fundo usa apenas critérios de exclusão simples ou se aplica análise mais profunda com rating ESG proprietário.',
      'Compare a taxa de administração do fundo ESG com fundos tradicionais similares — o rótulo não deveria justificar, por si só, uma taxa muito mais alta.',
      'Pesquise as principais posições (holdings) do fundo e avalie se, na sua visão, elas realmente refletem critérios ambientais, sociais e de governança rigorosos.',
      'Considere se o objetivo é apenas evitar setores específicos (critério de exclusão) ou buscar impacto positivo ativo (investimento de impacto), já que são abordagens diferentes.',
      'Acompanhe relatórios periódicos de sustentabilidade do fundo, quando disponíveis, para verificar consistência entre o discurso e a prática ao longo do tempo.'
    ],
    errosComuns: [
      'Investir baseado apenas no nome do fundo, sem checar a metodologia real de seleção de ativos por trás do rótulo ESG.',
      'Assumir que todo fundo ESG tem retorno financeiro necessariamente menor ou necessariamente maior que fundos tradicionais, quando o resultado varia caso a caso.',
      'Pagar taxa de administração significativamente mais alta sem entender exatamente o que está sendo feito de diferente na gestão do fundo.',
      'Ignorar que critérios de exclusão simples (não investir em determinados setores) são um nível de rigor muito diferente de metodologias com engajamento ativo e rating proprietário.',
      'Confundir o critério de governança (G) com os critérios ambiental e social, tratando ESG como sinônimo apenas de sustentabilidade ambiental.',
      'Não verificar as posições reais (holdings) do fundo, confiando apenas na comunicação de marketing da gestora.'
    ],
    comparativo: {
      titulo: 'Níveis de rigor em fundos rotulados como ESG',
      linhas: [
        { label: 'Critérios de exclusão simples', valor: 'Metodologia: exclui setores específicos (armas, tabaco, carvão) | Rigor: básico | Risco de greenwashing: alto' },
        { label: 'Rating ESG proprietário', valor: 'Metodologia: pontuação detalhada baseada em dados extensos das empresas | Rigor: intermediário a alto | Risco de greenwashing: moderado' },
        { label: 'Engajamento ativo', valor: 'Metodologia: gestora dialoga ativamente com empresas investidas para melhorar práticas | Rigor: alto | Risco de greenwashing: baixo' },
        { label: 'Investimento de impacto', valor: 'Metodologia: busca ativamente gerar impacto positivo mensurável, além de retorno financeiro | Rigor: alto, com métricas específicas | Risco de greenwashing: baixo, se bem documentado' }
      ]
    },
    checklist: [
      'Leia o regulamento e a lâmina de qualquer fundo ESG antes de investir, focando na metodologia descrita.',
      'Compare a taxa de administração com fundos tradicionais equivalentes.',
      'Verifique as principais posições (holdings) do fundo periodicamente.',
      'Pesquise se a gestora publica relatórios de sustentabilidade ou impacto com dados concretos, não apenas discurso.',
      'Defina para você mesmo se busca apenas exclusão de setores específicos ou impacto positivo ativo, já que isso muda qual tipo de fundo faz sentido.'
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A comunidade Boglehead defende sempre entender a metodologia real de um fundo antes de investir, e não só o rótulo do produto — essencial ao avaliar fundos ESG, cujo critério de seleção varia muito entre gestoras.',
    },
    naoConfundirCom: [
      { moduloId: 'alocacao-ativos', diferenca: 'Alocação de ativos trata da distribuição entre classes (renda fixa, ações, etc.) buscando equilíbrio de risco e retorno; ESG é um critério adicional de seleção dentro de qualquer classe de ativo, não uma classe em si.' }
    ]
  },

  mapaMental: {
    label: 'ESG',
    subtitulo: 'Critérios ambientais, sociais e de governança em investimentos',
    ramos: [
      {
        id: 'os-tres-pilares',
        label: 'Os Três Pilares',
        cor: '#22C55E',
        resumo: 'O que cada letra da sigla avalia',
        filhos: [
          { label: 'Ambiental (E)', desc: 'Emissões, uso de recursos naturais e gestão de resíduos' },
          { label: 'Social (S)', desc: 'Relações trabalhistas, diversidade e impacto em comunidades' },
          { label: 'Governança (G)', desc: 'Estrutura de conselho, transparência e alinhamento de interesses' }
        ]
      },
      {
        id: 'niveis-de-metodologia',
        label: 'Níveis de Metodologia',
        cor: '#3B82F6',
        resumo: 'Do mais básico ao mais rigoroso',
        filhos: [
          { label: 'Critérios de exclusão', desc: 'Simplesmente não investe em setores específicos' },
          { label: 'Rating ESG proprietário', desc: 'Pontuação baseada em dados extensos das empresas' },
          { label: 'Engajamento ativo', desc: 'Gestora dialoga com empresas para melhorar práticas' },
          { label: 'Investimento de impacto', desc: 'Busca ativamente gerar impacto positivo mensurável' }
        ]
      },
      {
        id: 'riscos-do-rotulo',
        label: 'Riscos do Rótulo',
        cor: '#EF4444',
        resumo: 'Onde o marketing pode enganar o investidor',
        filhos: [
          { label: 'Greenwashing', desc: 'Uso da linguagem de sustentabilidade sem prática rigorosa correspondente' },
          { label: 'Taxa mais alta sem justificativa clara', desc: 'Cobrar mais sem entregar metodologia efetivamente diferenciada' },
          { label: 'Falta de padronização', desc: 'Ausência de regulamentação única que defina o que pode ser chamado de ESG' }
        ]
      },
      {
        id: 'como-avaliar',
        label: 'Como Avaliar na Prática',
        cor: '#FFC93C',
        resumo: 'Passos concretos para verificar um fundo ESG',
        filhos: [
          { label: 'Ler regulamento e lâmina', desc: 'Entender a metodologia exata descrita oficialmente' },
          { label: 'Checar holdings', desc: 'Verificar se as posições reais refletem o discurso do fundo' },
          { label: 'Comparar taxas', desc: 'Avaliar se a taxa de administração é proporcional ao rigor da metodologia' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões práticas sobre fundos e investimentos rotulados como ESG e vê o resultado esperado de cada escolha, considerando rigor metodológico e risco de greenwashing.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre um investimento rotulado como ESG.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando os fatores reais de avaliação de rigor ESG.'
    ],
    exemploGuiado: 'Uma pessoa está escolhendo entre dois fundos de ações com "sustentável" no nome. O Fundo A cobra taxa de administração de 2,5% ao ano e, ao ler a lâmina, ela descobre que a metodologia é apenas exclusão de poucos setores específicos (armas e tabaco), sem rating detalhado nem engajamento ativo com as empresas investidas. O Fundo B cobra taxa de administração de 1,8% ao ano e detalha na lâmina um rating ESG proprietário aplicado a cada empresa da carteira, além de relatórios anuais de engajamento com as companhias investidas. Ao comparar as principais posições de cada fundo, ela nota que o Fundo A tem participação relevante em empresas com histórico de controvérsias ambientais e trabalhistas recentes, enquanto o Fundo B tem posições mais alinhadas à metodologia descrita. Com base nessa análise, ela opta pelo Fundo B, que além de mais barato, demonstra maior rigor real na aplicação dos critérios ESG.',
    cenarioGuiado: [
      {
        pergunta: 'Você está escolhendo um fundo de investimento e vê dois com "ESG" no nome, mas taxas de administração bem diferentes.',
        opcoes: [
          { texto: 'Escolho o mais caro, assumindo que taxa mais alta significa metodologia mais rigorosa', resultado: 'Taxa de administração mais alta não garante, por si só, metodologia mais rigorosa — é necessário verificar a lâmina e o regulamento de cada fundo para confirmar isso, em vez de assumir uma relação direta entre preço e qualidade.' },
          { texto: 'Leio a lâmina e o regulamento de ambos antes de decidir, comparando metodologia e taxa', resultado: 'Abordagem correta: comparar a metodologia descrita oficialmente, junto com a taxa cobrada, permite uma decisão mais informada do que confiar apenas no nome ou no preço do fundo.' }
        ]
      },
      {
        pergunta: 'Você lê que um fundo ESG usa apenas critérios de exclusão simples (não investe em poucos setores específicos), sem rating detalhado.',
        opcoes: [
          { texto: 'Considero isso equivalente a qualquer outro fundo com rating ESG proprietário detalhado', resultado: 'Critérios de exclusão simples são um nível de rigor bem mais básico que um rating ESG proprietário detalhado com engajamento ativo — tratá-los como equivalentes ignora diferenças reais de metodologia.' },
          { texto: 'Entendo que é um nível de rigor mais básico e ajusto minha expectativa sobre o quanto o fundo reflete critérios ESG de fato', resultado: 'Compreensão correta: existe uma escala de rigor entre diferentes metodologias ESG, e reconhecer isso ajuda a formar expectativas realistas sobre o que cada fundo realmente entrega.' }
        ]
      },
      {
        pergunta: 'Uma empresa divulga intensamente ações de sustentabilidade em marketing, mas você quer verificar se isso se reflete na prática.',
        opcoes: [
          { texto: 'Confio na comunicação de marketing da empresa, já que ela tem boa reputação', resultado: 'Comunicação de marketing isoladamente não é evidência suficiente de práticas ESG rigorosas — relatórios de sustentabilidade com dados concretos e avaliação de terceiros independentes oferecem uma base mais confiável.' },
          { texto: 'Busco relatórios de sustentabilidade com dados concretos e, se possível, avaliações de terceiros independentes', resultado: 'Postura mais criteriosa: dados concretos e avaliação independente ajudam a verificar se a comunicação de marketing corresponde à prática real da empresa, reduzindo o risco de ser enganado por greenwashing.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'esg-01', frente: 'O que significa a sigla ESG?', verso: 'Environmental, Social and Governance — critérios ambiental, social e de governança usados para avaliar práticas de empresas além dos resultados financeiros tradicionais.' },
    { id: 'esg-02', frente: 'O que é greenwashing?', verso: 'O uso da linguagem e do marketing de sustentabilidade por empresas ou fundos, sem que isso corresponda a práticas rigorosas de fato na seleção de ativos ou na operação da empresa.' },
    { id: 'esg-03', frente: 'Qual é a diferença entre critérios de exclusão e rating ESG proprietário?', verso: 'Critérios de exclusão apenas evitam setores específicos (como armas ou tabaco); rating ESG proprietário aplica pontuação detalhada baseada em dados extensos sobre práticas de cada empresa.' },
    { id: 'esg-04', frente: 'O que avalia o critério de "Governança" (G) em ESG?', verso: 'Estrutura de conselho, transparência e alinhamento de interesses entre gestores e acionistas da empresa.' },
    { id: 'esg-05', frente: 'Existe regulamentação única e rígida no Brasil sobre o que pode ser chamado de fundo ESG?', verso: 'Não. A CVM emitiu orientações para aumentar transparência, mas não existe uma padronização rígida única, o que deixa espaço para interpretações amplas do rótulo.' },
    { id: 'esg-06', frente: 'Por que investir só pelo nome "ESG" do fundo é considerado o erro mais caro do tema?', verso: 'Porque a metodologia real de seleção pode variar enormemente entre fundos com o mesmo rótulo, e o investidor pode acabar com exposição a empresas que não refletem critérios ESG rigorosos.' },
    { id: 'esg-07', frente: 'O que é investimento de impacto?', verso: 'Uma abordagem que busca ativamente gerar impacto positivo mensurável, além do retorno financeiro, com métricas específicas de acompanhamento.' },
    { id: 'esg-08', frente: 'Qual documento é essencial ler antes de investir num fundo ESG?', verso: 'A lâmina e o regulamento do fundo, que detalham a metodologia exata usada na seleção de ativos.' }
  ],

  quiz: [
    {
      pergunta: 'O que representa cada letra da sigla ESG?',
      alternativas: [
        'Economia, Segurança e Governo',
        'Environmental (Ambiental), Social e Governance (Governança)',
        'Emissões, Sustentabilidade e Gestão',
        'Estratégia, Setor e Grupo'
      ],
      correta: 1,
      explicacao: 'ESG é a sigla em inglês para Environmental, Social and Governance — critérios ambiental, social e de governança usados na avaliação de práticas corporativas.'
    },
    {
      pergunta: 'O que é greenwashing?',
      alternativas: [
        'Um tipo específico de imposto sobre fundos sustentáveis',
        'O uso de linguagem de sustentabilidade em marketing sem prática rigorosa correspondente',
        'Um método reconhecido de auditoria ambiental',
        'A obrigação legal de todo fundo divulgar dados ESG'
      ],
      correta: 1,
      explicacao: 'Greenwashing é o fenômeno de empresas ou fundos usarem discurso e marketing de sustentabilidade sem, de fato, aplicar critérios rigorosos correspondentes na prática.'
    },
    {
      pergunta: 'Por que investir num fundo apenas pelo nome "ESG" ou "sustentável" é considerado arriscado, segundo o módulo?',
      alternativas: [
        'Porque fundos ESG são sempre proibidos pela CVM',
        'Porque a metodologia real por trás do rótulo pode variar enormemente entre gestoras, sem padronização rígida',
        'Porque fundos ESG nunca geram retorno financeiro',
        'Porque o nome do fundo é a única informação disponível ao investidor'
      ],
      correta: 1,
      explicacao: 'A ausência de uma regulamentação única e rígida permite que fundos com o mesmo rótulo apliquem metodologias muito diferentes — algumas superficiais, outras rigorosas — daí a importância de checar a metodologia real antes de investir.'
    },
    {
      pergunta: 'Qual é a diferença entre critérios de exclusão simples e um rating ESG proprietário detalhado?',
      alternativas: [
        'Não há diferença prática entre os dois',
        'Critérios de exclusão apenas evitam setores específicos; rating proprietário aplica pontuação detalhada baseada em dados extensos',
        'Rating proprietário é sempre mais barato de aplicar',
        'Critérios de exclusão só existem fora do Brasil'
      ],
      correta: 1,
      explicacao: 'Critérios de exclusão representam um nível de rigor mais básico (apenas evitar determinados setores), enquanto um rating ESG proprietário avalia cada empresa com base em dados extensos, representando uma análise mais profunda.'
    },
    {
      pergunta: 'O que o critério de Governança (G) em ESG avalia especificamente?',
      alternativas: [
        'Apenas emissões de carbono da empresa',
        'Estrutura de conselho, transparência e alinhamento de interesses entre gestores e acionistas',
        'Apenas políticas de diversidade no ambiente de trabalho',
        'Somente o volume de doações filantrópicas da empresa'
      ],
      correta: 1,
      explicacao: 'O pilar de Governança foca em como a empresa é administrada e fiscalizada internamente — estrutura de conselho, transparência de informações e alinhamento entre interesses de gestores e acionistas.'
    },
    {
      pergunta: 'Qual documento oficial é recomendado como leitura essencial antes de investir num fundo rotulado como ESG?',
      alternativas: [
        'Apenas o material de marketing divulgado nas redes sociais da gestora',
        'A lâmina e o regulamento do fundo, que detalham a metodologia real de seleção',
        'Somente a opinião de influenciadores financeiros sobre o fundo',
        'Não existe documento específico recomendado'
      ],
      correta: 1,
      explicacao: 'A lâmina e o regulamento são documentos oficiais que detalham a metodologia efetivamente usada na seleção de ativos, oferecendo uma base mais confiável de análise do que apenas comunicação de marketing.'
    }
  ],

  faq: [
    { pergunta: 'Fundos ESG têm retorno financeiro menor que fundos tradicionais?', resposta: 'Não necessariamente — o resultado varia caso a caso, dependendo da metodologia aplicada, do período analisado e dos setores incluídos ou excluídos. Não existe uma regra universal de que ESG signifique retorno menor ou maior de forma automática.' },
    { pergunta: 'Como identifico se um fundo está fazendo greenwashing?', resposta: 'Compare o discurso de marketing com a metodologia detalhada na lâmina e no regulamento, e verifique as principais posições (holdings) do fundo — se houver empresas com histórico relevante de controvérsias ambientais, sociais ou de governança na carteira, é um sinal de alerta.' },
    { pergunta: 'Vale a pena pagar uma taxa de administração mais alta por um fundo ESG?', resposta: 'Depende da metodologia real por trás do fundo. Uma taxa mais alta só se justifica se corresponder a um nível de rigor efetivamente maior (rating detalhado, engajamento ativo), não apenas ao uso do rótulo "sustentável" no nome.' },
    { pergunta: 'Existe alguma certificação oficial que garanta que um fundo é realmente ESG?', resposta: 'No Brasil, não existe uma certificação única e obrigatória com esse nível de rigor. A CVM tem avançado em exigências de transparência, mas cabe ao investidor verificar a metodologia específica de cada fundo, já que a autodenominação como "ESG" ainda não é padronizada de forma rígida.' },
    { pergunta: 'Investimento de impacto é a mesma coisa que investimento ESG?', resposta: 'Não exatamente. ESG é um critério de avaliação usado dentro da seleção de ativos; investimento de impacto vai além, buscando ativamente gerar impacto positivo mensurável como objetivo central, com métricas específicas de acompanhamento, não apenas evitar práticas negativas.' },
    { pergunta: 'Empresas com boa nota ESG são livres de qualquer controvérsia?', resposta: 'Não. Mesmo empresas bem avaliadas em critérios ESG podem enfrentar controvérsias pontuais — o rating é uma ferramenta de análise baseada em metodologia e dados disponíveis, não uma garantia absoluta de conduta impecável em todas as situações.' }
  ]
}
