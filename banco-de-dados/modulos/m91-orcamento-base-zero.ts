import { Modulo } from '@/types'

export const orcamentoBaseZero: Modulo = {
  id: 'orcamento-base-zero',
  trilhaId: 'gestao-financeira-negocios',
  numero: 4,
  titulo: 'Orçamento Base Zero',
  subtitulo: 'Cada linha começa em zero — nenhum gasto é aprovado só porque existia ano passado',
  iconName: 'CalendarClock',
  duracaoMin: 11,

  nivel: 'avancado',
  preRequisitos: ['dre'],
  objetivoAprendizagem: 'Você vai sair sabendo aplicar o método de orçamento base zero, justificando cada gasto do zero em vez de simplesmente ajustar o orçamento do ano anterior.',
  erroFatal: 'Fazer o orçamento do próximo período pegando o orçamento do período anterior e aplicando um ajuste percentual (por inflação, por exemplo) — isso perpetua indefinidamente qualquer desperdício ou gasto sem propósito claro que já existia antes, sem nunca questioná-lo.',
  numeroChave: { valor: 'R$ 0', legenda: 'no orçamento base zero, todo período começa com cada linha de gasto zerada — nada é automaticamente aprovado só porque estava no orçamento anterior, mesmo que já existisse há anos' },
  glossarioDoModulo: ['Orçamento base zero', 'Orçamento incremental', 'Justificativa de gasto'],
  proximoPasso: { moduloId: 'ccc', motivo: 'Depois de aprender a planejar gastos do zero, o próximo módulo ensina a medir quanto tempo o dinheiro fica preso no ciclo operacional entre pagar e receber.' },

  aprender: {
    oQueE: 'Orçamento Base Zero é um método de planejamento financeiro em que cada gasto precisa ser justificado do zero a cada novo período, em vez de simplesmente pegar o orçamento anterior e ajustá-lo por um percentual (o chamado orçamento incremental, o método mais comum e menos rigoroso). No orçamento base zero, nenhuma linha de gasto é automaticamente aprovada só por já ter existido antes — cada uma precisa provar seu valor novamente, todo período.',
    porQueImporta: 'O orçamento incremental (pegar o ano passado e ajustar por inflação) tem uma falha silenciosa: qualquer gasto sem propósito claro, uma vez que entra no orçamento, tende a permanecer ali indefinidamente, porque ninguém questiona algo que "sempre esteve lá". Assinaturas de ferramentas que ninguém mais usa, processos que perderam a razão de existir, despesas que cresceram por hábito em vez de necessidade — tudo isso sobrevive ano após ano num orçamento incremental, exatamente porque o método nunca força uma nova justificativa.',
    naPratica: 'Para aplicar o orçamento base zero, cada área ou responsável precisa justificar, do zero, por que cada gasto deveria existir no próximo período — não com base no histórico ("sempre gastamos isso"), mas com base no valor gerado ("esse gasto específico entrega esse resultado específico"). Isso exige mais esforço de planejamento do que simplesmente copiar o ano anterior, mas revela, de forma sistemática, gastos que perderam sentido e que um orçamento incremental jamais questionaria.',
    passoAPasso: [
      'Para o próximo período de orçamento, comece cada linha de gasto do zero, sem herdar automaticamente nada do período anterior.',
      'Para cada gasto proposto, exija uma justificativa clara do valor ou resultado que ele gera — não apenas "sempre gastamos isso".',
      'Questione especificamente os gastos mais antigos e menos revisados — geralmente são os que mais acumulam desperdício silencioso.',
      'Compare o orçamento base zero resultante com o que seria um orçamento incremental simples, para visualizar onde a diferença apareceu.',
      'Reserve tempo suficiente para esse processo — é mais trabalhoso que o método incremental, mas o retorno em clareza costuma compensar.',
    ],
    errosComuns: [
      'Aplicar o orçamento base zero só nos primeiros anos e depois voltar ao método incremental por comodidade, perdendo o benefício de longo prazo.',
      'Exigir justificativa detalhada só dos gastos pequenos e visíveis, deixando os grandes gastos "sagrados" sem o mesmo escrutínio.',
      'Confundir orçamento base zero com corte automático de custos — o método não significa cortar tudo, significa justificar tudo, e alguns gastos vão continuar por terem justificativa sólida.',
      'Subestimar o tempo e esforço necessário para fazer esse processo de forma completa, aplicando-o de forma superficial.',
    ],
    checklist: [
      'Comecei o orçamento do próximo período do zero, sem herdar automaticamente o período anterior.',
      'Exijo justificativa clara de valor gerado para cada linha de gasto, não histórico de que "sempre existiu".',
      'Prestei atenção especial aos gastos mais antigos e menos revisados recentemente.',
      'Reservei tempo suficiente para esse processo, sabendo que é mais trabalhoso que o método incremental.',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey defende o orçamento base zero como princípio pessoal — cada real da renda deve ter um destino justificado, sem sobra "esquecida" — o mesmo rigor aplicado aqui ao orçamento de uma empresa inteira.',
    },
  },

  mapaMental: {
    label: 'Orçamento Base Zero',
    subtitulo: 'Cada linha, justificada do zero',
    ramos: [
      {
        id: 'o-metodo',
        label: 'Orçamento Base Zero',
        cor: '#22C55E',
        resumo: 'Nada é herdado automaticamente',
        filhos: [
          { label: 'Toda linha começa em R$ 0', desc: 'Precisa ser justificada de novo, todo período' },
        ],
      },
      {
        id: 'incremental',
        label: 'Orçamento Incremental',
        cor: '#EF4444',
        resumo: 'O método mais comum, e menos rigoroso',
        filhos: [
          { label: 'Ano anterior + ajuste', desc: 'Perpetua desperdícios sem nunca questionar' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos aplicar orçamento base zero a um conjunto de gastos que "sempre existiram" numa empresa fictícia.',
    passos: [
      'Listar os gastos recorrentes propostos.',
      'Exigir justificativa de valor para cada um, do zero.',
      'Decidir manter, ajustar ou cortar, com base na justificativa apresentada.',
    ],
    exemploGuiado: 'Uma empresa de médio porte, ao aplicar orçamento base zero pela primeira vez, descobre uma assinatura de software de R$ 400 por mês que ninguém consegue explicar por que ainda existe — foi contratada há três anos por uma pessoa que já não trabalha mais lá, e nenhuma outra equipe reivindica usar a ferramenta. Num orçamento incremental, esse gasto continuaria sendo "ajustado pela inflação" indefinidamente. No orçamento base zero, sem ninguém conseguir justificar seu valor, o gasto é cortado — uma economia de R$ 4.800 por ano que um método menos rigoroso jamais teria revelado.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é orçamento base zero?', verso: 'Um método em que cada gasto precisa ser justificado do zero a cada período, em vez de herdar automaticamente o orçamento anterior.' },
    { id: 'fc2', frente: 'Qual é a falha silenciosa do orçamento incremental?', verso: 'Gastos sem propósito claro, uma vez inseridos no orçamento, tendem a permanecer indefinidamente, porque ninguém os questiona de novo.' },
    { id: 'fc3', frente: 'Orçamento base zero significa cortar todos os gastos automaticamente?', verso: 'Não — significa exigir justificativa para todos, e alguns vão continuar por terem justificativa sólida de valor gerado.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é a principal diferença entre orçamento base zero e orçamento incremental?',
      alternativas: [
        'Orçamento base zero é sempre mais barato de executar',
        'No orçamento base zero, cada gasto precisa ser justificado do zero; no incremental, o orçamento anterior é apenas ajustado',
        'Orçamento incremental só existe em empresas pequenas',
        'Não há diferença prática entre os dois métodos',
      ],
      correta: 1,
      explicacao: 'O orçamento base zero exige nova justificativa para cada gasto a cada período, enquanto o incremental apenas ajusta o orçamento anterior por um percentual, sem questionar cada linha de novo.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que gastos sem propósito claro tendem a sobreviver por anos num orçamento incremental?',
      alternativas: [
        'Porque são sempre gastos muito pequenos e irrelevantes',
        'Porque o método incremental nunca exige que cada gasto seja justificado de novo, apenas ajustado por percentual',
        'Porque a lei exige manter todos os gastos do ano anterior',
        'Porque orçamento incremental é ilegal em alguns países',
      ],
      correta: 1,
      explicacao: 'O orçamento incremental herda automaticamente o orçamento anterior, aplicando apenas um ajuste — isso permite que gastos sem propósito claro sobrevivam indefinidamente, sem nunca serem questionados.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'O orçamento base zero precisa ser aplicado todo período, ou só de vez em quando?',
      resposta: 'O ideal é aplicá-lo regularmente (por exemplo, anualmente), mas mesmo uma aplicação pontual, de tempos em tempos, já revela desperdícios acumulados que um orçamento sempre incremental jamais mostraria.',
    },
    {
      pergunta: 'Esse método funciona para orçamento pessoal, não só empresarial?',
      resposta: 'Sim — a mesma lógica se aplica a gastos pessoais recorrentes, como assinaturas de streaming ou serviços que a pessoa contratou há anos e nunca mais questionou se ainda fazem sentido.',
    },
  ],
}
