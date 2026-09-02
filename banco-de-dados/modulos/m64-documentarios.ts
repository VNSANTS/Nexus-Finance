// m04-documentarios.ts
import { Modulo } from '@/types'

export const documentarios: Modulo = {
  id: 'documentarios',
  trilhaId: 'cultura-investimentos',
  numero: 4,
  titulo: 'Documentários sobre Economia',
  subtitulo: 'Como assistir com espírito crítico, sem confundir narrativa envolvente com análise completa',
  iconName: 'Film',
  duracaoMin: 9,

  nivel: 'iniciante',
  preRequisitos: ['estudos-de-caso'],
  objetivoAprendizagem: 'Você vai sair sabendo avaliar criticamente documentários sobre economia e finanças, reconhecendo quando uma narrativa simplifica demais uma questão complexa para fins de entretenimento.',
  erroFatal: 'Tratar a conclusão de um documentário como verdade definitiva e completa sobre um tema financeiro complexo, sem considerar que toda produção audiovisual faz escolhas narrativas (o que incluir, o que omitir, qual especialista entrevistar) que moldam a mensagem final, muitas vezes simplificando questões que têm múltiplas perspectivas legítimas.',
  numeroChave: { valor: '1 perspectiva', legenda: 'a maioria dos documentários sobre temas econômicos apresenta predominantemente uma linha narrativa e um conjunto de especialistas alinhados a essa visão — buscar perspectivas complementares ou contrárias é essencial para uma compreensão mais completa do tema' },
  glossarioDoModulo: ['Viés de seleção narrativa', 'Especialista consultado', 'Simplificação didática', 'Contraponto', 'Fonte primária vs. secundária'],
  proximoPasso: { moduloId: 'resumos-livros', motivo: 'Depois de desenvolver espírito crítico ao consumir documentários, vale aplicar a mesma postura na leitura de resumos de livros financeiros, outra forma popular e às vezes simplificada de consumir conteúdo educacional.' },

  aprender: {
    oQueE: 'Documentários sobre economia e finanças são produções audiovisuais que exploram temas como crises financeiras, biografias de investidores, funcionamento de mercados ou eventos econômicos históricos, geralmente combinando entrevistas com especialistas, imagens de arquivo e narração para contar uma história de forma acessível e envolvente. Embora sejam uma ferramenta valiosa de educação financeira por tornarem temas complexos mais digeríveis, documentários são produções narrativas, com escolhas editoriais que inevitavelmente simplificam ou enfatizam certos aspectos de uma história em detrimento de outros.',
    porQueImporta: 'Documentários bem produzidos podem despertar interesse genuíno por temas financeiros e oferecer contexto histórico valioso, mas quem os consome sem espírito crítico pode acabar formando uma visão parcial ou simplificada de questões que, na realidade, envolvem múltiplas perspectivas legítimas e debates ainda não resolvidos entre especialistas. Isso é especialmente relevante em temas controversos ou politicamente carregados, onde diferentes documentários sobre o mesmo evento histórico podem apresentar interpretações significativamente diferentes, cada uma enfatizando certos fatores e minimizando outros.',
    naPratica: 'Ao assistir a um documentário sobre um tema financeiro, vale prestar atenção a alguns elementos: quais especialistas foram entrevistados (e se representam uma diversidade real de perspectivas sobre o tema, ou majoritariamente uma única linha de interpretação), qual é o tom geral da narrativa (mais alarmista, mais didático, mais crítico a instituições específicas), e quais dados ou eventos foram omitidos que poderiam complementar ou até contradizer a narrativa apresentada. Documentários sobre crises financeiras históricas, por exemplo, tendem a simplificar causas complexas e multifatoriais em narrativas mais lineares e com vilões claros, o que é compreensível do ponto de vista de storytelling, mas pode deixar de fora nuances importantes sobre como diferentes fatores interagiram para gerar o evento analisado.',
    passoAPasso: [
      'Antes de assistir a um documentário sobre um tema financeiro, pesquise brevemente sobre a linha editorial do diretor ou produtora, quando essa informação estiver disponível.',
      'Durante o documentário, observe quais especialistas foram entrevistados e se representam uma diversidade real de perspectivas sobre o tema abordado.',
      'Identifique o tom geral da narrativa (alarmista, didático, crítico a instituições específicas) e reflita sobre como isso pode influenciar a interpretação dos fatos apresentados.',
      'Após assistir, busque ativamente outras fontes sobre o mesmo tema — artigos, livros ou outros documentários com perspectiva diferente — para formar uma visão mais completa.',
      'Distinga entre fatos verificáveis apresentados no documentário e interpretações ou opiniões dos especialistas entrevistados, que podem ser legitimamente contestadas por outros especialistas.',
      'Use o documentário como ponto de partida para aprofundamento, não como fonte definitiva e completa sobre o tema abordado.'
    ],
    errosComuns: [
      'Tratar a conclusão de um único documentário como verdade definitiva e completa sobre um tema financeiro complexo.',
      'Não considerar que a escolha de quais especialistas entrevistar molda significativamente a narrativa final apresentada.',
      'Confundir simplificação didática (necessária para tornar o tema acessível) com análise completa e isenta de vieses editoriais.',
      'Não buscar perspectivas complementares ou contrárias sobre o mesmo tema após assistir a um único documentário.',
      'Aceitar interpretações de causas de eventos econômicos complexos como se fossem consenso estabelecido, quando muitas vezes ainda são objeto de debate entre especialistas.',
      'Ignorar o contexto e a data de produção do documentário, que pode não refletir desenvolvimentos ou dados mais recentes sobre o tema abordado.'
    ],
    comparativo: {
      titulo: 'Consumo crítico vs. consumo passivo de documentários financeiros',
      linhas: [
        { label: 'Postura diante da narrativa', valor: 'Consumo crítico: questiona escolhas editoriais | Consumo passivo: aceita a narrativa como fato completo' },
        { label: 'Busca por perspectivas adicionais', valor: 'Consumo crítico: ativa, busca contrapontos | Consumo passivo: nenhuma, encerra no documentário assistido' },
        { label: 'Distinção entre fato e interpretação', valor: 'Consumo crítico: clara, avalia cada afirmação separadamente | Consumo passivo: confusa, trata tudo como verdade estabelecida' },
        { label: 'Valor educacional resultante', valor: 'Consumo crítico: alto, ponto de partida para aprofundamento | Consumo passivo: limitado, visão possivelmente parcial do tema' }
      ]
    },
    checklist: [
      'Antes de assistir, pesquise brevemente sobre a linha editorial da produção, quando possível.',
      'Observe quais especialistas foram entrevistados e se representam diferentes perspectivas sobre o tema.',
      'Distinga fatos verificáveis de interpretações e opiniões apresentadas ao longo do documentário.',
      'Busque ativamente outras fontes sobre o mesmo tema após assistir, especialmente com perspectivas diferentes.',
      'Considere o contexto e a data de produção, avaliando se desenvolvimentos mais recentes poderiam complementar a narrativa.'
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman descreve como aceitamos narrativas convincentes com pouco escrutínio quando pensamos rápido demais — a prática deste módulo de distinguir fato de interpretação em um documentário é justamente ativar o pensamento lento e deliberado.',
    },
    naoConfundirCom: [
      { moduloId: 'estudos-de-caso', diferenca: 'Estudos de Caso de Empresas ensina metodologia estruturada de análise de decisões reais de investimento; este módulo foca especificamente em como consumir de forma crítica documentários como fonte de educação financeira.' },
      { moduloId: 'resumos-livros', diferenca: 'Este módulo trata de conteúdo audiovisual narrativo; Resumos de Livros Financeiros aborda especificamente como avaliar resumos condensados de obras escritas sobre finanças e investimentos.' }
    ]
  },

  mapaMental: {
    label: 'Documentários sobre Economia',
    subtitulo: 'Consumo crítico de narrativas audiovisuais sobre finanças',
    ramos: [
      {
        id: 'elementos-narrativos',
        label: 'Elementos Narrativos',
        cor: '#3B82F6',
        resumo: 'O que molda a mensagem final de um documentário',
        filhos: [
          { label: 'Especialistas entrevistados', desc: 'A seleção influencia diretamente a perspectiva apresentada' },
          { label: 'Tom da narrativa', desc: 'Alarmista, didático ou crítico a instituições específicas' },
          { label: 'Escolhas editoriais', desc: 'O que é incluído e o que é omitido da história completa' }
        ]
      },
      {
        id: 'riscos-do-consumo-passivo',
        label: 'Riscos do Consumo Passivo',
        cor: '#EF4444',
        resumo: 'Onde o espectador desatento pode se enganar',
        filhos: [
          { label: 'Simplificação excessiva', desc: 'Causas complexas reduzidas a narrativas lineares com vilões claros' },
          { label: 'Visão parcial do tema', desc: 'Ausência de perspectivas complementares ou contrárias' },
          { label: 'Confusão entre fato e opinião', desc: 'Tratar interpretações de especialistas como consenso estabelecido' }
        ]
      },
      {
        id: 'praticas-de-consumo-critico',
        label: 'Práticas de Consumo Crítico',
        cor: '#22C55E',
        resumo: 'Como assistir de forma mais consciente',
        filhos: [
          { label: 'Pesquisa prévia', desc: 'Entender a linha editorial da produção, quando possível' },
          { label: 'Busca por contrapontos', desc: 'Consultar outras fontes com perspectivas diferentes' },
          { label: 'Distinção fato vs. interpretação', desc: 'Avaliar cada afirmação separadamente' }
        ]
      },
      {
        id: 'valor-educacional',
        label: 'Valor Educacional',
        cor: '#F59E0B',
        resumo: 'Como aproveitar documentários de forma produtiva',
        filhos: [
          { label: 'Ponto de partida', desc: 'Despertar interesse e contexto inicial sobre um tema' },
          { label: 'Não substituto de análise própria', desc: 'Complementar com outras fontes antes de formar opinião definitiva' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia situações relacionadas ao consumo crítico de documentários sobre economia e finanças, refletindo sobre como formar uma visão mais completa e equilibrada de temas complexos.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre como consumir ou interpretar um documentário financeiro.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de consumo crítico de conteúdo audiovisual.'
    ],
    exemploGuiado: 'Uma pessoa assiste a um documentário sobre uma crise financeira histórica, que apresenta uma narrativa focada principalmente na ganância de determinadas instituições financeiras como causa central do evento. A produção é envolvente, com boa qualidade de edição e entrevistas com especialistas críticos ao sistema financeiro da época. Antes de considerar essa narrativa como explicação completa e definitiva da crise, o espectador busca ler artigos acadêmicos e outras análises históricas sobre o mesmo evento, descobrindo que, embora a ganância institucional tenha sido de fato um fator relevante, historiadores econômicos também apontam falhas regulatórias, políticas monetárias específicas da época e comportamento de consumidores individuais como fatores adicionais que contribuíram para o mesmo evento. Essa pesquisa complementar não invalida o documentário original, mas revela que ele apresentou apenas uma parte de uma explicação multifatorial mais complexa.',
    cenarioGuiado: [
      {
        pergunta: 'Você assiste a um documentário envolvente sobre uma crise financeira histórica, que aponta uma causa principal muito clara e um "vilão" específico para o evento.',
        opcoes: [
          { texto: 'Aceito essa explicação como a causa definitiva e completa da crise', resultado: 'Crises financeiras históricas costumam ter causas multifatoriais e complexas — aceitar uma narrativa simplificada com um único vilão claro, por mais envolvente que seja a produção, pode deixar de fora fatores relevantes que contribuíram para o evento.' },
          { texto: 'Busco outras fontes sobre o mesmo evento histórico antes de formar uma opinião definitiva', resultado: 'Buscar perspectivas complementares ajuda a entender a complexidade real de eventos econômicos multifatoriais, evitando aceitar uma narrativa simplificada, ainda que bem produzida, como explicação completa e definitiva.' }
        ]
      },
      {
        pergunta: 'Um documentário sobre investimentos entrevista exclusivamente especialistas que defendem uma única estratégia específica de investimento.',
        opcoes: [
          { texto: 'Concluo que essa é a única estratégia válida de investimento, já que todos os especialistas entrevistados concordam', resultado: 'A seleção de especialistas entrevistados molda diretamente a narrativa apresentada — um documentário que entrevista apenas defensores de uma única estratégia não representa necessariamente um consenso real do mercado sobre o tema, apenas a perspectiva escolhida para aquela produção específica.' },
          { texto: 'Reconheço que essa é uma perspectiva específica e busco entender outras estratégias e visões sobre o mesmo tema', resultado: 'Reconhecer que a seleção de entrevistados reflete uma escolha editorial específica, não necessariamente um consenso de mercado, ajuda a formar uma visão mais completa e equilibrada sobre estratégias de investimento.' }
        ]
      },
      {
        pergunta: 'Você quer recomendar um documentário financeiro para alguém que está começando a se interessar por investimentos.',
        opcoes: [
          { texto: 'Recomendo apenas o documentário, sem nenhuma ressalva adicional', resultado: 'Recomendar um documentário sem nenhuma orientação sobre como consumi-lo criticamente pode levar a pessoa a formar uma visão parcial do tema, especialmente se for a única fonte de informação consultada sobre aquele assunto específico.' },
          { texto: 'Recomendo o documentário como ponto de partida, sugerindo buscar outras fontes complementares depois', resultado: 'Orientar sobre a importância de buscar perspectivas complementares ajuda a pessoa a desenvolver desde cedo o hábito de consumo crítico de conteúdo educacional financeiro, evitando formar opiniões baseadas numa única fonte narrativa.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'doc-01', frente: 'Por que documentários sobre economia devem ser consumidos com espírito crítico, mesmo sendo bem produzidos?', verso: 'Porque são produções narrativas com escolhas editoriais (quais especialistas entrevistar, o que incluir ou omitir) que moldam a mensagem final, muitas vezes simplificando questões complexas com múltiplas perspectivas legítimas.' },
    { id: 'doc-02', frente: 'O que observar em relação aos especialistas entrevistados num documentário financeiro?', verso: 'Se eles representam uma diversidade real de perspectivas sobre o tema, ou majoritariamente uma única linha de interpretação escolhida pela produção.' },
    { id: 'doc-03', frente: 'Qual é o erro mais caro ao consumir documentários financeiros, segundo o módulo?', verso: 'Tratar a conclusão de um documentário como verdade definitiva e completa sobre um tema complexo, sem buscar perspectivas complementares ou contrárias.' },
    { id: 'doc-04', frente: 'Por que crises financeiras históricas costumam ser simplificadas em documentários?', verso: 'Porque causas multifatoriais e complexas são frequentemente reduzidas a narrativas mais lineares e com vilões claros, o que funciona melhor para fins de storytelling, mas pode omitir nuances importantes.' },
    { id: 'doc-05', frente: 'Qual é a diferença entre fato verificável e interpretação num documentário?', verso: 'Fatos verificáveis são eventos ou dados que podem ser confirmados objetivamente; interpretações são opiniões e análises de especialistas, que podem ser legitimamente contestadas por outros especialistas com visões diferentes.' },
    { id: 'doc-06', frente: 'Como deve ser usado um documentário no processo de educação financeira, segundo o módulo?', verso: 'Como ponto de partida para despertar interesse e contexto inicial, complementado por outras fontes, e não como fonte definitiva e completa sobre o tema abordado.' },
    { id: 'doc-07', frente: 'Por que a data de produção de um documentário é relevante?', verso: 'Porque desenvolvimentos ou dados mais recentes sobre o tema podem não estar refletidos na narrativa, especialmente em temas econômicos que evoluem constantemente.' },
    { id: 'doc-08', frente: 'O que caracteriza um consumo crítico de documentário, em oposição a um consumo passivo?', verso: 'Questionar escolhas editoriais, buscar ativamente perspectivas complementares, e distinguir claramente fatos de interpretações apresentadas ao longo da produção.' }
  ],

  quiz: [
    {
      pergunta: 'Por que documentários sobre economia devem ser consumidos com espírito crítico, mesmo quando bem produzidos?',
      alternativas: [
        'Porque documentários financeiros são sempre produzidos com informações falsas',
        'Porque são produções narrativas com escolhas editoriais que moldam a mensagem final, simplificando questões complexas',
        'Porque documentários nunca são baseados em fatos reais',
        'Porque apenas livros acadêmicos podem ser considerados fontes confiáveis'
      ],
      correta: 1,
      explicacao: 'Toda produção audiovisual faz escolhas sobre o que incluir, o que omitir e quais especialistas entrevistar — essas escolhas editoriais moldam a narrativa final, mesmo quando a produção é tecnicamente bem feita e baseada em fatos reais.'
    },
    {
      pergunta: 'O que observar em relação aos especialistas entrevistados num documentário sobre finanças?',
      alternativas: [
        'Apenas o nome e a formação acadêmica de cada especialista',
        'Se representam uma diversidade real de perspectivas sobre o tema, ou majoritariamente uma única linha de interpretação',
        'Quantos especialistas foram entrevistados no total, sem considerar suas visões',
        'Se os especialistas aparecem por tempo suficiente na produção'
      ],
      correta: 1,
      explicacao: 'A seleção de especialistas entrevistados influencia diretamente a perspectiva apresentada — um documentário que entrevista majoritariamente pessoas alinhadas a uma única visão não reflete necessariamente o debate completo existente sobre o tema.'
    },
    {
      pergunta: 'Qual é o erro mais caro ao consumir documentários financeiros, segundo o módulo?',
      alternativas: [
        'Assistir a documentários como ponto de partida para aprender sobre um tema',
        'Tratar a conclusão de um documentário como verdade definitiva e completa, sem buscar perspectivas complementares',
        'Distinguir fatos verificáveis de interpretações apresentadas na produção',
        'Considerar a data de produção do documentário na análise'
      ],
      correta: 1,
      explicacao: 'Aceitar a narrativa de um único documentário como explicação completa e definitiva de um tema complexo, sem buscar outras fontes, pode levar a uma visão parcial e simplificada de questões que envolvem múltiplas perspectivas legítimas.'
    },
    {
      pergunta: 'Por que causas de crises financeiras históricas costumam ser simplificadas em documentários?',
      alternativas: [
        'Porque crises financeiras nunca têm causas complexas',
        'Porque narrativas com causas multifatoriais são reduzidas a histórias mais lineares e com vilões claros, mais adequadas ao formato de storytelling',
        'Porque documentaristas não têm acesso a informações completas sobre crises passadas',
        'Porque é proibido apresentar múltiplas causas num mesmo documentário'
      ],
      correta: 1,
      explicacao: 'Do ponto de vista de storytelling, narrativas com causas complexas e multifatoriais costumam ser simplificadas em histórias mais lineares, com vilões claros, o que é compreensível para engajamento do público, mas pode omitir nuances importantes do evento real.'
    },
    {
      pergunta: 'Qual é a diferença entre fato verificável e interpretação, ao assistir a um documentário financeiro?',
      alternativas: [
        'Não existe diferença relevante entre os dois conceitos em documentários',
        'Fatos verificáveis podem ser confirmados objetivamente; interpretações são opiniões de especialistas, que podem ser legitimamente contestadas',
        'Interpretações são sempre mais confiáveis que fatos verificáveis',
        'Fatos verificáveis só existem em documentários produzidos por universidades'
      ],
      correta: 1,
      explicacao: 'Distinguir entre o que é um fato objetivamente verificável e o que é uma interpretação ou opinião de um especialista entrevistado é essencial para avaliar criticamente as afirmações apresentadas ao longo de um documentário.'
    },
    {
      pergunta: 'Como um documentário sobre economia deve ser idealmente utilizado no processo de educação financeira?',
      alternativas: [
        'Como fonte única e definitiva sobre qualquer tema abordado',
        'Como ponto de partida para despertar interesse, complementado por outras fontes antes de formar uma opinião definitiva',
        'Apenas como entretenimento, sem nenhum valor educacional real',
        'Como substituto completo de livros e artigos acadêmicos sobre o mesmo tema'
      ],
      correta: 1,
      explicacao: 'Documentários são valiosos como ponto de partida para despertar interesse e oferecer contexto inicial sobre um tema, mas o processo de educação financeira mais completo envolve buscar fontes complementares antes de formar uma visão definitiva sobre questões complexas.'
    }
  ],

  faq: [
    { pergunta: 'Documentários sobre economia são uma boa forma de começar a aprender sobre finanças?', resposta: 'Sim, especialmente por tornarem temas complexos mais acessíveis e envolventes — mas funcionam melhor como ponto de partida, complementados posteriormente por outras fontes, do que como única fonte de aprendizado sobre um tema específico.' },
    { pergunta: 'Como sei se um documentário está apresentando uma visão enviesada de um tema?', resposta: 'Sinais possíveis incluem entrevistar majoritariamente especialistas alinhados a uma única perspectiva, usar linguagem fortemente emocional ou alarmista, e apresentar causas complexas de forma excessivamente simplificada, com um único "vilão" claro para o problema.' },
    { pergunta: 'Vale a pena assistir a documentários mais antigos sobre temas econômicos ainda relevantes hoje?', resposta: 'Sim, mas é importante considerar que desenvolvimentos e dados mais recentes sobre o tema podem não estar refletidos na produção — buscar atualizações ou análises mais recentes sobre o mesmo assunto ajuda a complementar essa lacuna temporal.' },
    { pergunta: 'É possível um documentário ser tecnicamente bem produzido e ainda assim apresentar uma visão parcial de um tema?', resposta: 'Sim, completamente possível — qualidade técnica de produção (edição, roteiro, imagens) não garante necessariamente uma cobertura equilibrada e completa de todas as perspectivas relevantes sobre um tema complexo.' },
    { pergunta: 'Como busco perspectivas complementares depois de assistir a um documentário financeiro?', resposta: 'Pesquisar artigos acadêmicos, livros especializados no mesmo tema, ou outros documentários com abordagem diferente sobre o mesmo evento são formas eficazes de complementar e contrastar a perspectiva apresentada na produção original assistida.' },
    { pergunta: 'Documentários sobre biografias de investidores específicos têm os mesmos cuidados de consumo crítico?', resposta: 'Sim — biografias em formato documentário também fazem escolhas narrativas sobre quais aspectos da trajetória enfatizar, podendo apresentar uma visão mais heroica ou mais crítica da pessoa retratada, dependendo da linha editorial da produção.' }
  ]
}
