import { Modulo } from '@/types'

export const priorizacaoDeCanais: Modulo = {
  id: 'priorizacao-de-canais',
  trilhaId: 'geracao-de-receita',
  numero: 7,
  titulo: 'Priorização de Canais e o Coeficiente Viral',
  subtitulo: 'Nem todo canal de aquisição merece o mesmo investimento — e alguns crescem sozinhos',
  iconName: 'Radar',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['cross-sell-up-sell-nrr'],
  objetivoAprendizagem: 'Você vai sair sabendo como comparar canais de aquisição diferentes usando CAC e LTV específicos de cada um, e como calcular o k-factor (coeficiente viral) de um produto ou serviço.',
  erroFatal: 'Investir o mesmo orçamento, proporcionalmente, em todos os canais de aquisição sem medir o CAC e o LTV específico de cada um — canais diferentes trazem clientes com perfil, custo e retenção completamente diferentes entre si.',
  numeroChave: { valor: '1,0', legenda: 'o k-factor (coeficiente viral) que marca a fronteira entre crescer com esforço constante e crescer sozinho — acima de 1,0, cada cliente traz, em média, mais de um cliente novo' },
  glossarioDoModulo: ['Canal de aquisição', 'k-factor', 'Crescimento orgânico', 'Payback de CAC'],
  proximoPasso: undefined,

  aprender: {
    oQueE: 'Priorização de canais é o processo de comparar diferentes fontes de aquisição de clientes (redes sociais, indicação, eventos, parcerias, busca orgânica, anúncios pagos) usando os mesmos critérios objetivos — CAC e LTV específicos de cada canal — em vez de investir de forma intuitiva ou proporcionalmente igual em todos. O k-factor, ou coeficiente viral, mede quantos clientes novos, em média, cada cliente existente traz por conta própria, sem custo de aquisição — é o motor por trás do crescimento que se sustenta sozinho.',
    porQueImporta: 'Cada canal de aquisição tem uma economia própria: o CAC de conseguir um cliente via indicação costuma ser muito menor que via anúncio pago, mas o volume que a indicação traz é geralmente menor e mais lento de escalar. Sem medir CAC e LTV canal por canal, é impossível saber onde o próximo real de investimento renderia mais — a decisão vira palpite, disfarçado de estratégia.',
    naPratica: 'Para priorizar canais, calcule o CAC e o LTV separadamente para cada fonte de aquisição — não um CAC médio geral, que esconde a diferença entre canais bons e ruins. Compare a relação LTV/CAC de cada canal, junto com o volume que ele consegue entregar e o tempo de payback (quanto tempo leva até o cliente "pagar de volta" o custo de aquisição). O k-factor se calcula multiplicando o número médio de convites que cada cliente envia pela taxa de conversão desses convites em novos clientes — um k-factor de 1,2, por exemplo, significa que cada cliente traz, em média, 1,2 clientes novos, um efeito que se multiplica exponencialmente ao longo do tempo.',
    passoAPasso: [
      'Liste todos os canais de aquisição usados atualmente (redes sociais, indicação, anúncios, eventos, parcerias, etc.).',
      'Calcule o CAC específico de cada canal, dividindo o investimento naquele canal pelos clientes que ele trouxe.',
      'Calcule ou estime o LTV dos clientes vindos de cada canal — em alguns negócios, o perfil de cliente varia bastante conforme o canal.',
      'Compare a relação LTV/CAC entre os canais e priorize investimento nos que superam o benchmark de 3:1 com folga.',
      'Calcule o k-factor do produto ou serviço: (convites médios por cliente) × (taxa de conversão dos convites).',
      'Se o k-factor está próximo ou acima de 1,0, invista em reduzir atrito no processo de indicação — esse canal pode crescer com pouco ou nenhum investimento adicional.',
    ],
    errosComuns: [
      'Calcular um CAC médio único para todos os canais, escondendo que alguns são muito mais eficientes que outros.',
      'Cortar um canal com CAC alto sem considerar que ele também pode ter LTV alto o suficiente para compensar.',
      'Ignorar o k-factor completamente, tratando indicação como "sorte" em vez de um mecanismo mensurável e otimizável.',
      'Confundir k-factor com taxa de satisfação do cliente — o k-factor mede ação concreta (convites que viram clientes), não opinião.',
    ],
    comparativo: {
      titulo: 'O que o k-factor indica',
      linhas: [
        { label: 'k-factor abaixo de 0,5', valor: 'Crescimento viral fraco ou inexistente | O canal de indicação não se sustenta sozinho' },
        { label: 'k-factor entre 0,5 e 1,0', valor: 'Crescimento viral parcial | Reduz a dependência de outros canais, mas não substitui' },
        { label: 'k-factor acima de 1,0', valor: 'Crescimento exponencial sozinho | Cada cliente, em média, traz mais de um cliente novo' },
      ],
    },
    checklist: [
      'Calculei CAC e LTV separadamente para cada canal de aquisição usado.',
      'Priorizei investimento nos canais com melhor relação LTV/CAC, não nos de maior volume bruto.',
      'Calculei o k-factor do meu produto ou serviço.',
      'Se o k-factor está próximo de 1,0, identifiquei formas de reduzir atrito no processo de indicação.',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A filosofia Boglehead defende alocar recursos com base em dados objetivos de retorno, não em preferência ou hábito — o mesmo princípio se aplica a priorizar canais de aquisição pela relação LTV/CAC de cada um, não pelo canal mais familiar.',
    },
  },

  mapaMental: {
    label: 'Priorização de Canais e k-factor',
    subtitulo: 'Onde investir, e o que cresce sozinho',
    ramos: [
      {
        id: 'comparar-canais',
        label: 'Comparar Canais',
        cor: '#3B82F6',
        resumo: 'CAC e LTV específicos, não médios',
        filhos: [
          { label: 'CAC por canal', desc: 'Investimento naquele canal ÷ clientes que ele trouxe' },
          { label: 'LTV por canal', desc: 'O perfil de cliente pode variar conforme a origem' },
        ],
      },
      {
        id: 'k-factor',
        label: 'k-factor (Coeficiente Viral)',
        cor: '#22C55E',
        resumo: 'O motor do crescimento sozinho',
        filhos: [
          { label: 'Fórmula', desc: 'Convites médios por cliente × taxa de conversão dos convites' },
          { label: 'Acima de 1,0', desc: 'Crescimento exponencial, sem custo de aquisição adicional' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de k-factor',
    intro: 'Vamos calcular o k-factor de um produto e entender o que esse número indica.',
    passos: [
      'Medir quantos convites, em média, cada cliente envia.',
      'Medir a taxa de conversão desses convites em clientes novos.',
      'Multiplicar os dois valores para chegar ao k-factor.',
    ],
    exemploGuiado: 'Um aplicativo de finanças pessoais descobre que cada usuário convida, em média, 4 amigos ao longo do primeiro mês de uso. Desses convites, 15% viram usuários novos de fato. k-factor = 4 × 0,15 = 0,6. Isso significa que cada usuário, em média, traz 0,6 usuário novo — abaixo do limiar de 1,0, então o crescimento viral sozinho não sustenta o aplicativo, mas ainda reduz significativamente a dependência de outros canais pagos. Se o time de produto reduzir o atrito do convite (por exemplo, permitindo convidar direto do WhatsApp em vez de digitar um e-mail manualmente) e a taxa de conversão subir para 30%, o k-factor passaria para 4 × 0,30 = 1,2 — cruzando a fronteira do crescimento exponencial sozinho.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é k-factor?', verso: 'Coeficiente viral — mede quantos clientes novos, em média, cada cliente existente traz por conta própria, sem custo de aquisição.' },
    { id: 'fc2', frente: 'Qual é a fórmula do k-factor?', verso: '(número médio de convites por cliente) × (taxa de conversão desses convites em clientes novos).' },
    { id: 'fc3', frente: 'O que acontece quando o k-factor ultrapassa 1,0?', verso: 'O crescimento passa a ser exponencial e sozinho — cada cliente, em média, traz mais de um cliente novo.' },
    { id: 'fc4', frente: 'Por que calcular um CAC médio único para todos os canais é um erro?', verso: 'Porque esconde que alguns canais são muito mais eficientes que outros — a média mascara a diferença real entre os canais bons e ruins.' },
  ],

  quiz: [
    {
      pergunta: 'Um produto tem em média 5 convites por cliente, com taxa de conversão de 10%. Qual é o k-factor?',
      alternativas: ['0,1', '0,5', '1,0', '5,0'],
      correta: 1,
      explicacao: '5 × 0,10 = 0,5.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Um k-factor de 1,3 significa que:',
      alternativas: [
        'O produto está perdendo 1,3% dos clientes por mês',
        'Cada cliente, em média, traz 1,3 clientes novos — o crescimento se sustenta sozinho',
        'O CAC do produto é 1,3 vezes maior que o LTV',
        'O produto precisa de 1,3 anos para se pagar',
      ],
      correta: 1,
      explicacao: 'Um k-factor acima de 1,0 indica crescimento exponencial e autossustentado — cada cliente traz, em média, mais de um cliente novo.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que priorizar canais só pelo volume bruto de clientes trazidos pode ser um erro?',
      alternativas: [
        'Porque volume bruto nunca é um dado confiável',
        'Porque um canal de alto volume pode ter CAC alto e LTV baixo, sendo menos eficiente que um canal menor',
        'Porque canais de alto volume são sempre ilegais',
        'Porque volume bruto só existe em empresas de tecnologia',
      ],
      correta: 1,
      explicacao: 'Volume sem considerar CAC e LTV específicos do canal pode esconder que aquele canal, apesar de trazer muita gente, entrega clientes caros e de baixo retorno — priorizar pela relação LTV/CAC é mais confiável.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Meu negócio não tem como medir "convites" de forma clara. Ainda dá para calcular k-factor?',
      resposta: 'Sim, de forma aproximada — pergunte diretamente a novos clientes como conheceram o negócio, e monitore quantos citam indicação de outro cliente. Isso não é tão preciso quanto um sistema de convite formal, mas ainda revela se o crescimento por indicação é relevante.',
    },
    {
      pergunta: 'Vale a pena investir dinheiro para aumentar o k-factor artificialmente, tipo programas de indicação pagos?',
      resposta: 'Pode valer, mas com cautela: um programa de indicação com recompensa financeira precisa entrar no cálculo de CAC daquele canal específico. Se o custo do incentivo for alto demais, o canal deixa de ser vantajoso mesmo com k-factor melhorado.',
    },
  ],
}
