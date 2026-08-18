import { Modulo } from '@/types'

export const vsm: Modulo = {
  id: 'vsm',
  trilhaId: 'eficiencia-operacional',
  numero: 3,
  titulo: 'VSM: Mapeamento do Fluxo de Valor',
  subtitulo: 'Desenhar o processo inteiro no papel revela o que ninguém enxerga vivendo dentro dele',
  iconName: 'Workflow',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['oito-desperdicios'],
  objetivoAprendizagem: 'Você vai sair sabendo desenhar um mapa simples do fluxo de valor de um processo, identificando cada etapa, seu tempo, e onde os desperdícios do módulo anterior aparecem concretamente.',
  erroFatal: 'Tentar melhorar um processo baseado só na percepção de quem trabalha nele — quem está dentro do processo todo dia raramente enxerga o quadro completo, porque já naturalizou etapas que, vistas de fora e desenhadas no papel, são claramente desperdício.',
  numeroChave: { valor: '2 tempos', legenda: 'todo mapeamento de fluxo de valor mede dois tempos distintos para cada etapa: o tempo que agrega valor de verdade (o que o cliente pagaria por), e o tempo total decorrido, incluindo esperas — a diferença entre os dois é onde mora o desperdício' },
  glossarioDoModulo: ['VSM', 'Lead time', 'Tempo de ciclo', 'Tempo que agrega valor'],
  proximoPasso: { moduloId: 'kaizen-pdca', motivo: 'Depois de mapear e visualizar o processo, o próximo módulo ensina o ciclo estruturado para melhorá-lo continuamente.' },

  aprender: {
    oQueE: 'VSM, sigla para Value Stream Mapping (Mapeamento do Fluxo de Valor), é uma técnica visual para desenhar todas as etapas de um processo, do início (pedido do cliente, por exemplo) até o fim (entrega), incluindo o tempo que cada etapa realmente leva e, dentro desse tempo, quanto é trabalho que agrega valor de verdade e quanto é espera ou desperdício. O mapa transforma um processo que só existe na cabeça de quem trabalha nele em algo visível, discutível e mensurável.',
    porQueImporta: 'Quem trabalha dentro de um processo todos os dias tende a naturalizar suas ineficiências — uma espera de dois dias entre duas etapas pode parecer "normal" simplesmente porque sempre foi assim. Desenhar o processo inteiro no papel, com os tempos reais de cada etapa, frequentemente revela que a maior parte do tempo total (às vezes 80% ou mais) é espera, não trabalho de fato — um dado que raramente é visível sem esse exercício de mapeamento.',
    naPratica: 'Para construir um VSM, primeiro liste cada etapa do processo em sequência, do início ao fim. Para cada etapa, meça (ou estime, na ausência de dados exatos) dois números: o tempo de ciclo (quanto tempo aquela etapa específica leva quando está sendo executada) e o lead time (o tempo total decorrido entre o fim de uma etapa e o início da próxima, incluindo qualquer espera). Somando os tempos de ciclo de todas as etapas, chega-se ao tempo que realmente agrega valor; somando também os lead times entre etapas, chega-se ao tempo total do processo. A diferença entre os dois totais é, essencialmente, o tamanho do desperdício de espera no processo inteiro.',
    passoAPasso: [
      'Escolha um processo específico e defina claramente onde ele começa e onde termina.',
      'Liste cada etapa em sequência, sem pular nenhuma, mesmo as que parecem pequenas ou óbvias.',
      'Para cada etapa, meça ou estime o tempo de ciclo (tempo de execução) e o lead time até a próxima etapa começar.',
      'Some os tempos de ciclo (trabalho real) e compare com o lead time total do processo inteiro.',
      'Identifique as maiores lacunas entre o tempo de execução e o tempo total — é ali que o desperdício de espera está concentrado.',
    ],
    errosComuns: [
      'Mapear o processo "como deveria ser" em vez do processo real, com todas as suas ineficiências atuais — o VSM só é útil se retratar a realidade, não a intenção.',
      'Pular etapas pequenas ou informais (como uma aprovação verbal) que, somadas, consomem tempo real.',
      'Medir só o tempo de ciclo (execução) sem medir o lead time (incluindo espera) — é justamente essa diferença que revela o desperdício.',
      'Fazer o mapeamento sozinho, sem envolver quem executa o processo no dia a dia, perdendo detalhes que só quem está dentro sabe.',
    ],
    checklist: [
      'Defini claramente o início e o fim do processo a ser mapeado.',
      'Listei todas as etapas em sequência, sem pular nenhuma.',
      'Medi ou estimei tempo de ciclo e lead time para cada etapa.',
      'Identifiquei onde está a maior diferença entre tempo de execução e tempo total.',
    ],
    livroRelacionado: {
      livroId: 'i-will-teach-you-to-be-rich',
      textoConexao: 'Ramit Sethi defende medir e visualizar sistemas financeiros antes de tentar consertá-los — o VSM aplica exatamente esse princípio a processos operacionais, tornando visível o que só existia como impressão vaga.',
    },
  },

  mapaMental: {
    label: 'VSM — Mapeamento do Fluxo de Valor',
    subtitulo: 'Desenhar o processo revela o desperdício',
    ramos: [
      {
        id: 'os-dois-tempos',
        label: 'Os Dois Tempos',
        cor: '#3B82F6',
        resumo: 'A diferença é onde mora o desperdício',
        filhos: [
          { label: 'Tempo de ciclo', desc: 'Quanto a etapa leva quando está sendo executada' },
          { label: 'Lead time', desc: 'Tempo total decorrido, incluindo espera' },
        ],
      },
      {
        id: 'como-mapear',
        label: 'Como Mapear',
        cor: '#22C55E',
        resumo: 'Etapa por etapa, sem pular nenhuma',
        filhos: [
          { label: 'Listar cada etapa em sequência', desc: 'Do início definido ao fim definido' },
          { label: 'Medir cada uma', desc: 'Tempo de ciclo e lead time, não só impressão geral' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos mapear o fluxo de valor de um processo de atendimento a um pedido de cliente.',
    passos: [
      'Listar as etapas do processo, do pedido à entrega.',
      'Medir o tempo de ciclo e o lead time de cada etapa.',
      'Somar os totais e comparar tempo de trabalho real com tempo total do processo.',
    ],
    exemploGuiado: 'Uma pequena gráfica mapeia o processo de um pedido personalizado: o cliente faz o pedido (tempo de ciclo: 10 minutos), espera 1 dia até o designer disponibilizar tempo (lead time: 24h), o design é feito (tempo de ciclo: 40 minutos), espera 2 dias na fila de impressão (lead time: 48h), a impressão leva 15 minutos (tempo de ciclo), e o produto espera mais 1 dia até o transporte de entrega (lead time: 24h). Somando os tempos de ciclo: 10+40+15 = 65 minutos de trabalho real. Somando os lead times: mais de 96 horas de espera. O processo inteiro leva quase 5 dias, mas menos de 1h10 é trabalho de fato — o restante é espera, revelando exatamente onde otimizar primeiro: a fila de impressão, o maior lead time do processo.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa VSM?', verso: 'Value Stream Mapping (Mapeamento do Fluxo de Valor) — uma técnica visual para desenhar todas as etapas de um processo e seus tempos reais.' },
    { id: 'fc2', frente: 'Qual é a diferença entre tempo de ciclo e lead time?', verso: 'Tempo de ciclo é quanto uma etapa leva quando está sendo executada; lead time é o tempo total decorrido, incluindo qualquer espera até a próxima etapa começar.' },
    { id: 'fc3', frente: 'Por que desenhar o processo no papel costuma revelar mais desperdício do que a percepção de quem trabalha nele?', verso: 'Porque quem está dentro do processo tende a naturalizar suas ineficiências, tratando esperas longas como "normais" simplesmente por já serem hábito.' },
    { id: 'fc4', frente: 'Como se identifica onde está o maior desperdício de espera num VSM?', verso: 'Comparando a soma dos tempos de ciclo (trabalho real) com o lead time total do processo — a maior diferença entre os dois indica onde o desperdício está concentrado.' },
  ],

  quiz: [
    {
      pergunta: 'Um processo tem 50 minutos de trabalho real somado (tempo de ciclo) e leva 3 dias no total (lead time). O que essa diferença indica?',
      alternativas: [
        'Que o processo é extremamente eficiente',
        'Que a maior parte do tempo total é espera, não trabalho real — um sinal claro de desperdício a investigar',
        'Que os funcionários estão trabalhando devagar demais',
        'Que o processo precisa de mais matéria-prima',
      ],
      correta: 1,
      explicacao: 'A grande diferença entre tempo de ciclo (trabalho real) e lead time (tempo total) revela que a maior parte do processo é espera — exatamente o tipo de desperdício que o VSM torna visível.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que é um erro mapear o processo "como deveria ser" em vez do processo real?',
      alternativas: [
        'Porque isso é proibido pela metodologia VSM',
        'Porque o VSM só é útil se retratar a realidade atual, com suas ineficiências reais, não uma versão idealizada',
        'Porque processos ideais não podem ser desenhados no papel',
        'Porque isso demora mais tempo para ser feito',
      ],
      correta: 1,
      explicacao: 'O valor do VSM está em revelar o desperdício real — se o mapa retrata uma versão idealizada, ele perde a capacidade de mostrar onde a melhoria é realmente necessária.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso de um software especial para fazer um VSM?',
      resposta: 'Não — a versão clássica é feita literalmente com papel e caneta (ou um quadro branco), desenhando caixas para cada etapa com os tempos anotados. A simplicidade é parte do método: qualquer pessoa consegue entender o mapa rapidamente.',
    },
    {
      pergunta: 'Com que frequência devo refazer o VSM de um processo?',
      resposta: 'Vale refazer sempre que o processo passa por uma mudança relevante (nova ferramenta, nova etapa, mudança de equipe), e também periodicamente (por exemplo, uma vez por ano) mesmo sem mudanças óbvias, porque desperdícios tendem a reaparecer com o tempo.',
    },
  ],
}
