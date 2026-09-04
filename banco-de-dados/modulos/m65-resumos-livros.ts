// m05-resumos-livros.ts
import { Modulo } from '@/types'

export const resumosLivros: Modulo = {
  id: 'resumos-livros',
  trilhaId: 'cultura-investimentos',
  numero: 5,
  titulo: 'Resumos de Livros Financeiros',
  subtitulo: 'O que se perde (e o que se ganha) ao trocar um livro de 300 páginas por um resumo de 10 minutos',
  iconName: 'BookOpen',
  duracaoMin: 11,

  nivel: 'iniciante',
  preRequisitos: ['documentarios'],
  objetivoAprendizagem: 'Você vai sair sabendo quando um resumo de livro financeiro é suficiente para seus objetivos, e quando vale a pena investir tempo na leitura completa da obra original.',
  erroFatal: 'Tratar um resumo de 10 a 15 minutos como equivalente ao conteúdo completo de um livro de centenas de páginas, aplicando conceitos financeiros complexos (como estratégias de alocação ou análise de empresas) com a mesma confiança que teria após uma leitura completa e aprofundada — resumos comprimem necessariamente nuances, ressalvas e contexto que podem ser essenciais para aplicar o conceito corretamente na prática.',
  numeroChave: { valor: '90%+', legenda: 'proporção aproximada do conteúdo original que geralmente é omitida num resumo condensado de um livro — o que significa que um resumo captura a essência de algumas ideias centrais, mas necessariamente descarta a grande maioria dos exemplos, nuances e argumentações de apoio do texto original' },
  glossarioDoModulo: ['Resumo condensado', 'Ideia central vs. argumentação de apoio', 'Nuance perdida na compressão', 'Leitura seletiva', 'Aplicabilidade prática de conceito'],
  proximoPasso: { moduloId: 'relatorios-investimentos', motivo: 'Depois de entender os limites e usos apropriados de resumos de livros, vale desenvolver também a capacidade crítica de leitura de relatórios de investimentos, outra fonte comum de informação financeira condensada.' },

  aprender: {
    oQueE: 'Resumos de livros financeiros são versões condensadas de obras completas sobre investimentos, economia comportamental, gestão de negócios ou finanças pessoais, geralmente apresentando as ideias centrais do livro original em um formato muito mais curto — seja em texto, áudio ou vídeo. Plataformas especializadas nesse formato se popularizaram como forma de tornar conhecimento financeiro mais acessível para quem tem pouco tempo disponível, mas o processo de condensação necessariamente implica perda significativa de conteúdo, nuance e contexto do material original.',
    porQueImporta: 'Resumos são ferramentas valiosas para triagem inicial (decidir se um livro específico vale a leitura completa) e para relembrar conceitos de livros já lidos anteriormente, mas quando tratados como substituto completo da leitura integral, especialmente para livros com conceitos técnicos complexos ou argumentações elaboradas ao longo de várias etapas, podem gerar uma compreensão superficial ou até equivocada do conteúdo original. Isso é particularmente relevante em finanças, onde a aplicação prática incorreta de um conceito mal compreendido pode ter consequência financeira real.',
    naPratica: 'Diferentes tipos de livros financeiros se prestam de forma diferente à compressão em resumo. Livros que apresentam uma tese central relativamente direta, com exemplos ilustrativos que reforçam a mesma ideia principal, tendem a perder menos substância num resumo bem feito — a ideia central pode ser capturada de forma razoavelmente fiel. Já livros que constroem um argumento complexo ao longo de múltiplos capítulos, com nuances, exceções e ressalvas importantes apresentadas progressivamente, tendem a perder muito mais na compressão — um resumo desses livros pode capturar a conclusão final, mas sem o contexto necessário para entender quando e como aplicá-la corretamente, ou quais são as exceções relevantes que o autor original fez questão de destacar. Resumos também tendem a omitir referências a estudos e dados específicos que sustentam os argumentos do livro, apresentando apenas as conclusões, sem o mesmo nível de evidência que sustentava a afirmação original.',
    passoAPasso: [
      'Use resumos como ferramenta de triagem: decidir se um livro específico parece relevante o suficiente para justificar a leitura completa.',
      'Para conceitos financeiros que você pretende aplicar na prática (estratégias de investimento, análise de empresas, planejamento financeiro), prefira a leitura completa da obra original, não apenas o resumo.',
      'Ao consumir um resumo, identifique se o livro original apresenta uma tese relativamente direta ou um argumento complexo construído progressivamente — isso ajuda a avaliar quanto foi provavelmente perdido na compressão.',
      'Use resumos para relembrar conceitos de livros que você já leu integralmente no passado, como forma de revisão, não como primeira exposição ao conteúdo.',
      'Desconfie de resumos que apresentam conclusões muito categóricas ou fórmulas simples para problemas financeiros complexos — frequentemente o livro original apresenta ressalvas importantes que se perdem na versão condensada.',
      'Quando um resumo despertar interesse genuíno num tema, considere isso como sinal para buscar a leitura completa, em vez de considerar o processo de aprendizado encerrado ali.'
    ],
    errosComuns: [
      'Tratar um resumo condensado como equivalente ao conteúdo completo de um livro, aplicando conceitos complexos com a mesma confiança que teria após leitura integral.',
      'Não considerar que resumos tendem a omitir ressalvas, exceções e nuances importantes que o autor original fez questão de incluir no texto completo.',
      'Usar exclusivamente resumos para aprender conceitos financeiros que serão efetivamente aplicados em decisões reais de investimento ou planejamento.',
      'Ignorar que diferentes tipos de livros se prestam de forma muito diferente à compressão em resumo, tratando todos os resumos como igualmente completos e confiáveis.',
      'Não buscar a leitura completa mesmo quando um resumo desperta interesse genuíno e aprofundado sobre determinado tema.',
      'Confiar em conclusões apresentadas de forma categórica num resumo, sem considerar que o livro original pode ter apresentado essas ideias com mais nuance e contexto.'
    ],
    comparativo: {
      titulo: 'Quando um resumo é suficiente vs. quando vale a leitura completa',
      linhas: [
        { label: 'Triagem inicial de interesse', valor: 'Resumo: suficiente | Leitura completa: não necessária nessa etapa' },
        { label: 'Revisão de livro já lido', valor: 'Resumo: útil como lembrete | Leitura completa: já realizada anteriormente' },
        { label: 'Aprender conceito para aplicação prática', valor: 'Resumo: insuficiente | Leitura completa: recomendada' },
        { label: 'Livro com argumento complexo e progressivo', valor: 'Resumo: perde nuances importantes | Leitura completa: essencial para compreensão adequada' }
      ]
    },
    checklist: [
      'Use resumos principalmente como ferramenta de triagem inicial, não como fonte definitiva de aprendizado.',
      'Para conceitos que pretende aplicar em decisões financeiras reais, busque a leitura completa da obra original.',
      'Desconfie de conclusões muito categóricas apresentadas em formato de resumo, sem as ressalvas do texto original.',
      'Considere a leitura completa sempre que um resumo despertar interesse genuíno e aprofundado sobre um tema.',
      'Diferencie livros com tese direta (menos perda na compressão) de livros com argumento complexo (mais perda na compressão).'
    ],
    livroRelacionado: {
      livroId: 'homem-mais-rico-babilonia',
      textoConexao: 'É um bom exemplo prático da distinção que este módulo ensina: seus princípios são diretos e resumíveis sem grande perda, ao contrário de obras com argumentação mais complexa que exigem leitura completa para captar as nuances.',
    },
    naoConfundirCom: [
      { moduloId: 'documentarios', diferenca: 'Documentários sobre Economia trata de conteúdo audiovisual narrativo sobre temas financeiros; este módulo foca especificamente em como avaliar resumos condensados de obras escritas.' },
      { moduloId: 'relatorios-investimentos', diferenca: 'Este módulo trata de resumos de livros com conteúdo educacional geral sobre finanças; Relatórios de Investimentos foca em documentos técnicos específicos produzidos por instituições financeiras sobre empresas ou mercados.' }
    ]
  },

  mapaMental: {
    label: 'Resumos de Livros Financeiros',
    subtitulo: 'O que se ganha e o que se perde na compressão de conteúdo',
    ramos: [
      {
        id: 'usos-apropriados',
        label: 'Usos Apropriados',
        cor: '#22C55E',
        resumo: 'Quando um resumo cumpre bem seu papel',
        filhos: [
          { label: 'Triagem inicial', desc: 'Decidir se um livro específico vale a leitura completa' },
          { label: 'Revisão de conteúdo já lido', desc: 'Relembrar conceitos de livros lidos integralmente no passado' },
          { label: 'Introdução a um novo tema', desc: 'Primeiro contato antes de decidir aprofundar' }
        ]
      },
      {
        id: 'o-que-se-perde',
        label: 'O que se Perde na Compressão',
        cor: '#EF4444',
        resumo: 'Elementos frequentemente omitidos em resumos condensados',
        filhos: [
          { label: 'Ressalvas e exceções', desc: 'Nuances importantes que o autor original destacou no texto completo' },
          { label: 'Evidências e dados de apoio', desc: 'Estudos e referências que sustentavam os argumentos originais' },
          { label: 'Contexto de aplicação', desc: 'Quando e como aplicar corretamente um conceito específico' }
        ]
      },
      {
        id: 'tipos-de-livro',
        label: 'Tipos de Livro e Compressão',
        cor: '#F59E0B',
        resumo: 'Nem todo livro perde a mesma coisa num resumo',
        filhos: [
          { label: 'Tese direta com exemplos', desc: 'Perde relativamente menos substância na compressão' },
          { label: 'Argumento complexo e progressivo', desc: 'Perde nuances essenciais para compreensão adequada' }
        ]
      },
      {
        id: 'aplicacao-pratica',
        label: 'Aplicação Prática',
        cor: '#3B82F6',
        resumo: 'Como decidir entre resumo e leitura completa',
        filhos: [
          { label: 'Conceito para aplicação real', desc: 'Recomenda-se leitura completa antes de aplicar em decisões financeiras' },
          { label: 'Interesse genérico ou cultural', desc: 'Resumo pode ser suficiente dependendo do objetivo' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações relacionadas ao uso de resumos de livros financeiros e reflete sobre quando eles são suficientes e quando vale buscar a leitura completa da obra original.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre uso de resumo versus leitura completa de um livro financeiro.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de uso apropriado de resumos condensados.'
    ],
    exemploGuiado: 'Uma pessoa lê o resumo de um livro sobre estratégias de alocação de ativos e fica entusiasmada com uma conclusão específica sobre a proporção ideal entre ações e renda fixa apresentada de forma bem categórica no resumo. Antes de aplicar essa proporção exata à própria carteira de investimentos, ela decide ler o livro completo, e descobre que o autor original apresentava essa proporção como um ponto de partida geral, com diversas ressalvas importantes sobre como ajustá-la conforme idade, tolerância a risco individual e objetivos específicos de cada pessoa — nuances que o resumo condensado, focado em transmitir a ideia central de forma rápida, havia simplificado significativamente. Com a leitura completa, ela consegue adaptar o conceito de forma muito mais adequada à sua própria situação financeira, em vez de aplicar uma fórmula genérica sem as ressalvas importantes que o contexto completo oferecia.',
    cenarioGuiado: [
      {
        pergunta: 'Você lê o resumo de um livro sobre estratégias específicas de investimento e quer aplicar imediatamente os conceitos na sua própria carteira.',
        opcoes: [
          { texto: 'Aplico os conceitos com base apenas no resumo, já que capturei a ideia principal', resultado: 'Resumos geralmente omitem ressalvas, exceções e contexto de aplicação importantes — aplicar conceitos financeiros complexos com base apenas num resumo condensado pode levar a decisões inadequadas ao seu contexto específico, que o livro completo provavelmente esclareceria.' },
          { texto: 'Uso o resumo como triagem inicial e busco a leitura completa antes de aplicar os conceitos na prática', resultado: 'Para conceitos que serão efetivamente aplicados em decisões financeiras reais, buscar a leitura completa ajuda a capturar nuances e ressalvas importantes que o resumo condensado necessariamente simplificou ou omitiu.' }
        ]
      },
      {
        pergunta: 'Você está decidindo entre vários livros sobre um mesmo tema financeiro e tem pouco tempo disponível.',
        opcoes: [
          { texto: 'Leio os resumos de todos os livros e escolho um deles para leitura completa com base nisso', resultado: 'Usar resumos como ferramenta de triagem inicial, para decidir qual livro específico merece o investimento de tempo da leitura completa, é exatamente um dos usos mais apropriados e eficientes desse tipo de recurso.' },
          { texto: 'Leio apenas os resumos de todos os livros e considero que já entendi cada um completamente', resultado: 'Tratar múltiplos resumos como equivalentes à leitura completa de cada livro, sem nunca aprofundar em nenhum deles, tende a gerar uma compreensão superficial e fragmentada dos temas, sem a profundidade que uma leitura completa proporcionaria.' }
        ]
      },
      {
        pergunta: 'Um resumo de livro financeiro apresenta uma conclusão bastante categórica e simples sobre um tema que você sabe ser complexo.',
        opcoes: [
          { texto: 'Aceito a conclusão categórica como válida, já que veio de um livro reconhecido', resultado: 'Conclusões apresentadas de forma muito categórica em resumos condensados frequentemente simplificam questões que o autor original tratou com mais nuance e ressalvas no texto completo — desconfiar dessa categorização excessiva é uma postura crítica saudável.' },
          { texto: 'Desconfio da simplificação e busco entender se o livro original trata o tema com mais nuance', resultado: 'Questionar conclusões excessivamente categóricas apresentadas em formato resumido, buscando entender se existem ressalvas importantes no texto original, é uma prática de consumo crítico que evita aplicações equivocadas de conceitos financeiros complexos.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'rl-01', frente: 'Qual é o uso mais apropriado de um resumo de livro financeiro, segundo o módulo?', verso: 'Como ferramenta de triagem inicial, para decidir se um livro específico merece a leitura completa, ou como forma de revisão de um livro já lido integralmente.' },
    { id: 'rl-02', frente: 'Qual é o erro mais caro relacionado ao uso de resumos de livros financeiros?', verso: 'Tratar um resumo condensado como equivalente ao conteúdo completo do livro, aplicando conceitos financeiros complexos com a mesma confiança que teria após leitura integral.' },
    { id: 'rl-03', frente: 'Aproximadamente qual proporção do conteúdo original é geralmente omitida num resumo condensado?', verso: 'Mais de 90% do conteúdo original — o resumo captura a essência de algumas ideias centrais, mas descarta a maioria dos exemplos, nuances e argumentações de apoio do texto completo.' },
    { id: 'rl-04', frente: 'Que tipo de livro tende a perder menos substância quando condensado em resumo?', verso: 'Livros que apresentam uma tese central relativamente direta, com exemplos ilustrativos que reforçam a mesma ideia principal ao longo do texto.' },
    { id: 'rl-05', frente: 'Que tipo de livro tende a perder mais substância importante quando condensado em resumo?', verso: 'Livros que constroem um argumento complexo ao longo de múltiplos capítulos, com nuances, exceções e ressalvas apresentadas progressivamente.' },
    { id: 'rl-06', frente: 'Por que resumos são especialmente arriscados para conceitos financeiros que serão aplicados na prática?', verso: 'Porque a aplicação prática incorreta de um conceito mal compreendido, sem as ressalvas e o contexto do texto original, pode ter consequência financeira real e negativa.' },
    { id: 'rl-07', frente: 'O que costuma ser omitido em resumos, além das ideias centrais do livro?', verso: 'Referências a estudos e dados específicos que sustentavam os argumentos originais, além de ressalvas e exceções importantes destacadas pelo autor no texto completo.' },
    { id: 'rl-08', frente: 'Qual deve ser a reação diante de uma conclusão muito categórica apresentada num resumo de livro financeiro?', verso: 'Desconfiar dessa categorização excessiva e buscar entender se o livro original trata o mesmo tema com mais nuance, ressalvas e contexto de aplicação.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o uso mais apropriado de um resumo de livro financeiro, segundo o módulo?',
      alternativas: [
        'Substituir completamente a necessidade de leitura de qualquer livro financeiro',
        'Servir como ferramenta de triagem inicial ou revisão de um livro já lido integralmente',
        'Aplicar imediatamente qualquer conceito apresentado em decisões financeiras reais',
        'Comprovar cientificamente teses financeiras complexas'
      ],
      correta: 1,
      explicacao: 'Resumos funcionam bem como ferramenta de triagem (decidir se vale a leitura completa) ou como revisão de conteúdo já estudado anteriormente — não como substituto completo da leitura integral para fins de aplicação prática.'
    },
    {
      pergunta: 'Por que aplicar conceitos financeiros complexos com base apenas num resumo condensado é considerado arriscado?',
      alternativas: [
        'Porque resumos sempre contêm informações falsas',
        'Porque resumos tendem a omitir ressalvas, exceções e contexto de aplicação importantes presentes no texto original',
        'Porque é proibido usar resumos para fins educacionais',
        'Porque resumos nunca são baseados em livros reais'
      ],
      correta: 1,
      explicacao: 'O processo de condensação necessariamente descarta nuances, ressalvas e contexto de aplicação que podem ser essenciais para aplicar corretamente um conceito financeiro na prática, aumentando o risco de aplicação inadequada.'
    },
    {
      pergunta: 'Que tipo de livro tende a perder mais substância importante quando condensado em formato de resumo?',
      alternativas: [
        'Livros com tese central direta e exemplos que reforçam a mesma ideia',
        'Livros que constroem um argumento complexo ao longo de múltiplos capítulos, com nuances e ressalvas progressivas',
        'Livros de ficção sem nenhum conteúdo técnico',
        'Todos os tipos de livro perdem exatamente a mesma quantidade de conteúdo'
      ],
      correta: 1,
      explicacao: 'Livros com argumentação complexa e progressiva, onde ressalvas e exceções são construídas ao longo de várias etapas, tendem a perder muito mais substância importante na compressão do que livros com tese mais direta.'
    },
    {
      pergunta: 'Aproximadamente qual proporção do conteúdo original costuma ser omitida num resumo condensado de livro?',
      alternativas: ['Cerca de 10%', 'Cerca de 50%', 'Mais de 90%', 'Nenhum conteúdo é omitido em resumos bem feitos'],
      correta: 2,
      explicacao: 'Um resumo condensado tipicamente omite mais de 90% do conteúdo original do livro — capturando apenas a essência de algumas ideias centrais, mas descartando a maior parte dos exemplos, nuances e argumentações de apoio.'
    },
    {
      pergunta: 'Qual é o erro mais caro relacionado ao uso de resumos de livros financeiros, segundo o módulo?',
      alternativas: [
        'Usar resumos como ferramenta de triagem inicial antes de decidir ler um livro completo',
        'Tratar um resumo condensado como equivalente ao conteúdo completo do livro, aplicando conceitos complexos com a mesma confiança',
        'Usar resumos para relembrar conceitos de livros já lidos integralmente',
        'Desconfiar de conclusões excessivamente categóricas apresentadas em resumos'
      ],
      correta: 1,
      explicacao: 'Tratar um resumo como se fosse equivalente à leitura completa, aplicando conceitos financeiros complexos com a mesma confiança que teria após leitura integral, ignora que ressalvas e nuances importantes foram necessariamente perdidas na compressão.'
    },
    {
      pergunta: 'Como deve ser a reação diante de uma conclusão muito categórica apresentada num resumo de livro financeiro?',
      alternativas: [
        'Aceitar automaticamente, já que veio de um livro reconhecido',
        'Desconfiar da simplificação excessiva e buscar entender se o livro original trata o tema com mais nuance',
        'Ignorar completamente qualquer conclusão apresentada em formato de resumo',
        'Aplicar a conclusão imediatamente em decisões financeiras, sem questionamento'
      ],
      correta: 1,
      explicacao: 'Conclusões excessivamente categóricas em resumos frequentemente simplificam questões que o autor original tratou com mais nuance e ressalvas — desconfiar dessa simplificação e buscar o contexto completo é uma postura crítica recomendada.'
    }
  ],

  faq: [
    { pergunta: 'Vale a pena assinar plataformas especializadas em resumos de livros financeiros?', resposta: 'Pode ser útil como ferramenta de triagem, ajudando a identificar quais livros merecem investimento de tempo na leitura completa, mas não deve ser vista como substituto da leitura integral para conceitos que você pretende efetivamente aplicar em decisões financeiras.' },
    { pergunta: 'Todos os resumos de livros financeiros têm a mesma qualidade e confiabilidade?', resposta: 'Não — a qualidade varia significativamente entre diferentes fontes de resumo, dependendo de quem produz o conteúdo e do cuidado editorial aplicado na compressão. Alguns resumos são mais fiéis à obra original do que outros.' },
    { pergunta: 'Como sei se um livro específico vale a leitura completa, além de usar o resumo como triagem?', resposta: 'Além do resumo, avaliar recomendações de outras fontes confiáveis, ler uma amostra do primeiro capítulo (disponível gratuitamente em muitas plataformas) e considerar se o tema é algo que você pretende aplicar praticamente ajudam a decidir se vale o investimento de tempo na obra completa.' },
    { pergunta: 'Resumos em formato de áudio ou vídeo têm as mesmas limitações que resumos em texto?', resposta: 'Sim, o formato de apresentação (texto, áudio ou vídeo) não elimina a limitação fundamental da compressão de conteúdo — todos os formatos de resumo necessariamente omitem a maior parte do conteúdo, nuances e ressalvas do livro original.' },
    { pergunta: 'É melhor ler vários resumos sobre o mesmo tema, ou ler um único livro completo?', resposta: 'Depende do objetivo: para uma visão panorâmica inicial de um tema, vários resumos podem ajudar a identificar diferentes perspectivas; mas para aplicação prática de conceitos específicos, a leitura completa de uma obra de referência costuma ser mais valiosa do que múltiplos resumos superficiais.' },
    { pergunta: 'Resumos de livros de finanças pessoais têm as mesmas limitações que resumos de livros técnicos sobre investimentos?', resposta: 'Livros de finanças pessoais com conceitos mais diretos (como a importância de poupar regularmente) tendem a perder menos substância em resumo do que livros técnicos sobre análise de investimentos, que frequentemente envolvem nuances metodológicas mais complexas e ressalvas importantes sobre quando e como aplicar cada conceito.' }
  ]
}
