import { Modulo } from '@/types'

export const alavancagemCorteCusto: Modulo = {
  id: 'alavancagem-corte-custo',
  trilhaId: 'eficiencia-operacional',
  numero: 7,
  titulo: 'Alavancagem de Corte de Custo',
  subtitulo: 'Nem todo real cortado tem o mesmo efeito no lucro',
  iconName: 'Scissors',
  duracaoMin: 11,

  nivel: 'avancado',
  preRequisitos: ['pessoas-processos-tecnologia'],
  objetivoAprendizagem: 'Você vai sair sabendo calcular o efeito real de um corte de custo no lucro, e priorizar cortes com maior alavancagem em vez dos mais fáceis ou mais visíveis.',
  erroFatal: 'Cortar custos de forma indiscriminada, tratando cada real economizado como equivalente, sem calcular qual corte específico tem o maior efeito líquido no lucro final — alguns cortes parecem grandes mas têm efeito líquido pequeno, e vice-versa.',
  numeroChave: { valor: '1:1', legenda: 'todo real economizado em custo vira, na maioria dos casos, um real a mais de lucro direto — diferente de um real a mais de receita, que só vira lucro depois de descontada a margem; corte de custo, quando bem calculado, tem alavancagem direta sobre o resultado' },
  glossarioDoModulo: ['Alavancagem', 'Margem de contribuição', 'Custo fixo vs. variável'],
  proximoPasso: undefined,

  aprender: {
    oQueE: 'Alavancagem de corte de custo é o princípio de que nem todo real economizado tem o mesmo efeito no lucro final de uma empresa — cortar um custo fixo recorrente (que se repete todo mês) tem um efeito acumulado muito maior ao longo do ano do que um corte único e pontual, mesmo que os dois pareçam do mesmo tamanho no momento em que são feitos. Priorizar cortes por alavancagem significa calcular o efeito real e acumulado de cada corte possível, em vez de escolher pelo que é mais visível ou mais fácil de justificar numa reunião.',
    porQueImporta: 'Um erro comum em momentos de aperto financeiro é cortar o que é mais visível ou mais fácil de explicar (como reduzir o café da copa) em vez do que realmente move o resultado. Um corte de custo fixo recorrente de R$ 500 por mês, mantido por um ano, economiza R$ 6.000 — um efeito muito maior do que um corte pontual único de R$ 2.000, mesmo que este pareça, à primeira vista, um número mais impressionante.',
    naPratica: 'Para priorizar cortes de custo por alavancagem, primeiro separe custos fixos (que se repetem todo período, independente do volume de vendas) de custos variáveis (que mudam conforme o volume). Cortes em custos fixos recorrentes tendem a ter maior alavancagem por se acumularem ao longo do tempo. Em seguida, calcule o efeito anualizado de cada corte possível — multiplicando o valor mensal economizado por doze, no caso de custos recorrentes — para comparar cortes de tamanhos aparentemente diferentes numa base comum e justa.',
    passoAPasso: [
      'Liste todos os custos possíveis de cortar, separando em fixos recorrentes e variáveis ou pontuais.',
      'Para cada corte possível, calcule o efeito anualizado (valor mensal × 12, para custos recorrentes).',
      'Priorize os cortes com maior efeito anualizado, não os que parecem maiores no momento da decisão.',
      'Avalie o efeito colateral de cada corte — alguns cortes de custo reduzem qualidade ou capacidade de forma que compromete a receita futura, anulando o ganho.',
      'Prefira cortes que eliminam desperdício real (dos oito tipos vistos em módulo anterior) a cortes que apenas reduzem investimento em algo que gerava valor de verdade.',
    ],
    errosComuns: [
      'Cortar custos pontuais e visíveis, ignorando custos fixos recorrentes menores que teriam efeito acumulado maior ao longo do ano.',
      'Não calcular o efeito anualizado antes de comparar cortes de tamanhos diferentes, comparando maçãs com laranjas.',
      'Cortar um custo que na verdade gerava receita ou retenção de cliente, prejudicando o resultado final de forma mais ampla do que a economia obtida.',
      'Tratar todo corte de custo como positivo por definição, sem avaliar se ele está eliminando desperdício real ou apenas reduzindo capacidade útil.',
    ],
    checklist: [
      'Separei os custos possíveis de cortar entre fixos recorrentes e variáveis ou pontuais.',
      'Calculei o efeito anualizado de cada corte antes de comparar e priorizar.',
      'Avaliei se algum corte específico teria efeito colateral negativo na receita ou retenção de clientes.',
      'Priorizei cortes que eliminam desperdício real, não capacidade que gerava valor.',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey defende priorizar dívidas pelo efeito real no orçamento, não pelo tamanho aparente — o mesmo raciocínio de priorização por impacto real, não por visibilidade, se aplica a decidir quais custos cortar primeiro.',
    },
  },

  mapaMental: {
    label: 'Alavancagem de Corte de Custo',
    subtitulo: 'Nem todo corte tem o mesmo efeito',
    ramos: [
      {
        id: 'fixo-vs-variavel',
        label: 'Fixo × Variável',
        cor: '#3B82F6',
        resumo: 'A base da priorização',
        filhos: [
          { label: 'Custo fixo recorrente', desc: 'Se repete todo período, maior efeito acumulado' },
          { label: 'Custo variável ou pontual', desc: 'Muda com o volume, efeito único' },
        ],
      },
      {
        id: 'calculo',
        label: 'O Cálculo Certo',
        cor: '#22C55E',
        resumo: 'Efeito anualizado, para comparar de forma justa',
        filhos: [
          { label: 'Valor mensal × 12', desc: 'Para custos recorrentes' },
          { label: 'Comparar na mesma base', desc: 'Antes de priorizar entre cortes diferentes' },
        ],
      },
      {
        id: 'efeito-colateral',
        label: 'Efeito Colateral',
        cor: '#EF4444',
        resumo: 'Nem todo corte é positivo',
        filhos: [
          { label: 'Cortar valor real gerado', desc: 'Pode prejudicar receita ou retenção' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de Alavancagem de Corte de Custo',
    intro: 'Vamos comparar dois cortes de custo diferentes usando o efeito anualizado.',
    passos: [
      'Identificar o valor de cada corte possível.',
      'Calcular o efeito anualizado de cada um.',
      'Comparar na mesma base para decidir a prioridade.',
    ],
    exemploGuiado: 'Uma empresa tem duas opções de corte: cancelar uma assinatura de software pouco usada, economizando R$ 300 por mês, ou renegociar um contrato de fornecedor único, economizando R$ 3.000 de uma vez, sem repetição. Efeito anualizado da assinatura: R$ 300 × 12 = R$ 3.600 por ano. Efeito do contrato: R$ 3.000, único, sem repetição. Apesar do corte do contrato parecer maior à primeira vista (R$ 3.000 de uma vez contra R$ 300 por mês), o corte recorrente da assinatura tem maior efeito anualizado (R$ 3.600 contra R$ 3.000) — e continuará gerando essa economia todo ano seguinte, enquanto o corte do contrato não se repete.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é alavancagem de corte de custo?', verso: 'O princípio de que nem todo real economizado tem o mesmo efeito no lucro final — cortes recorrentes tendem a ter maior efeito acumulado que cortes pontuais do mesmo tamanho aparente.' },
    { id: 'fc2', frente: 'Como se calcula o efeito anualizado de um corte de custo recorrente?', verso: 'Multiplicando o valor mensal economizado por 12.' },
    { id: 'fc3', frente: 'Por que comparar cortes sem calcular o efeito anualizado pode levar a decisões erradas?', verso: 'Porque compara valores de naturezas diferentes (pontual vs. recorrente) sem uma base comum, fazendo um corte pontual grande parecer mais vantajoso do que um corte recorrente menor, mesmo quando não é.', },
    { id: 'fc4', frente: 'Qual é o risco de cortar custos sem avaliar efeito colateral?', verso: 'Alguns cortes reduzem qualidade ou capacidade de forma que compromete a receita futura ou a retenção de clientes, anulando ou superando o ganho obtido com a economia.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa pode cortar um custo pontual de R$ 5.000 (único) ou um custo recorrente de R$ 200 por mês. Qual tem maior efeito anualizado?',
      alternativas: [
        'O corte pontual de R$ 5.000, sempre',
        'O corte recorrente, porque 200 × 12 = R$ 2.400, ainda menor que R$ 5.000 nesse caso específico',
        'Os dois têm exatamente o mesmo efeito',
        'É impossível comparar os dois tipos de corte',
      ],
      correta: 1,
      explicacao: 'Nesse caso específico, R$ 200 × 12 = R$ 2.400, que é menor que os R$ 5.000 do corte pontual — o exercício de calcular o efeito anualizado é justamente o que permite essa comparação correta, mesmo quando o resultado favorece o corte pontual.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que cortar um custo que gerava valor real (como um investimento em qualidade que reduzia devoluções) pode ser um erro, mesmo economizando dinheiro no curto prazo?',
      alternativas: [
        'Porque cortar qualquer custo é sempre proibido por lei',
        'Porque o efeito colateral (mais devoluções, menos retenção) pode superar a economia obtida com o corte',
        'Porque custos de qualidade nunca podem ser reduzidos em nenhuma circunstância',
        'Porque isso não tem relação nenhuma com o resultado financeiro da empresa',
      ],
      correta: 1,
      explicacao: 'Nem todo corte de custo é positivo por definição — se o corte reduz um investimento que gerava valor real (como menor taxa de devolução), o efeito colateral pode anular ou superar a economia obtida.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Como sei se um custo é "desperdício real" ou "investimento que gera valor"?',
      resposta: 'Uma boa pergunta de referência: se esse custo desaparecesse amanhã, o cliente notaria alguma diferença real na experiência ou no resultado que recebe? Se a resposta é não, é provável candidato a corte. Se é sim, o corte precisa ser avaliado com mais cautela.',
    },
    {
      pergunta: 'Vale a pena cortar um custo pequeno, mesmo com baixo efeito anualizado?',
      resposta: 'Depende do esforço envolvido em fazer o corte. Se o esforço de renegociar ou cancelar é baixo, mesmo um efeito anualizado pequeno pode valer a pena — o problema é priorizar cortes de baixo efeito quando existem cortes de maior efeito disponíveis e ainda não realizados.',
    },
  ],
}
