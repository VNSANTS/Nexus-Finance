import { Modulo } from '@/types'

export const kaizenPdca: Modulo = {
  id: 'kaizen-pdca',
  trilhaId: 'eficiencia-operacional',
  numero: 4,
  titulo: 'Kaizen e PDCA',
  subtitulo: 'Melhoria contínua vence reforma pontual, quase sempre',
  iconName: 'RefreshCw',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['vsm'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar um ciclo PDCA para testar melhorias pequenas e contínuas, em vez de esperar por uma grande reforma operacional.',
  erroFatal: 'Esperar acumular tempo e orçamento suficientes para uma "grande reforma" do processo, em vez de testar pequenas melhorias continuamente — a grande reforma raramente acontece, porque sempre existe uma prioridade mais urgente competindo pelo mesmo tempo e orçamento.',
  numeroChave: { valor: '4 etapas', legenda: 'Planejar, Fazer (do inglês Do), Checar (Check) e Agir (Act) — o ciclo PDCA se repete continuamente, cada volta gerando uma melhoria pequena e testada, não uma aposta grande e única' },
  glossarioDoModulo: ['Kaizen', 'PDCA', 'Melhoria contínua'],
  proximoPasso: { moduloId: 'oee', motivo: 'Depois de estruturar o ciclo de melhoria contínua, o próximo módulo ensina a métrica que mede se essa melhoria está realmente funcionando.' },

  aprender: {
    oQueE: 'Kaizen é uma palavra japonesa que significa "mudança para melhor", e no contexto de gestão operacional se refere a uma filosofia de melhoria contínua e incremental, em oposição a grandes reformas pontuais e raras. PDCA, sigla para Plan-Do-Check-Act (Planejar-Fazer-Checar-Agir), é o ciclo estruturado usado para colocar o espírito Kaizen em prática: planejar uma pequena mudança, testá-la, checar o resultado com dados, e agir com base no que foi aprendido — recomeçando o ciclo com a próxima melhoria.',
    porQueImporta: 'A tentação natural, ao perceber um processo ineficiente, é esperar juntar tempo e orçamento suficientes para uma reforma completa — mas essa reforma grande raramente acontece, porque sempre existe uma prioridade mais urgente competindo pelos mesmos recursos. O Kaizen resolve isso trocando a aposta grande e rara por pequenas apostas frequentes e testadas: cada melhoria é pequena o suficiente para ser tentada rapidamente, com baixo risco, e o aprendizado de uma alimenta a próxima.',
    naPratica: 'O ciclo PDCA começa com Planejar: identificar um problema específico e pequeno o suficiente para testar rapidamente, e formular uma hipótese de melhoria. Fazer significa implementar essa mudança em pequena escala — um teste, não uma mudança definitiva em toda a operação de uma vez. Checar é medir o resultado real com dados, comparando com o esperado. Agir significa, com base no que foi aprendido, ou adotar a mudança em escala maior, ou ajustá-la, ou descartá-la — e então recomeçar o ciclo com a próxima melhoria identificada.',
    passoAPasso: [
      'Identifique um problema específico e pequeno o suficiente para testar em poucas semanas, não meses.',
      'Planeje uma hipótese clara de melhoria: "se fizermos X, esperamos que Y melhore".',
      'Implemente a mudança em pequena escala — um teste controlado, não uma virada completa.',
      'Meça o resultado real com dados, comparando com o que era esperado antes do teste.',
      'Decida: adotar em escala maior, ajustar e testar de novo, ou descartar — e comece o próximo ciclo.',
    ],
    errosComuns: [
      'Pular a etapa de "Checar" com dados reais, confiando apenas na impressão de que a mudança funcionou.',
      'Implementar mudanças grandes demais de uma vez, perdendo a vantagem de baixo risco que o teste pequeno oferece.',
      'Fazer só um ciclo PDCA e parar, em vez de tratar a melhoria contínua como um hábito permanente.',
      'Esperar o momento "perfeito" para começar um ciclo, quando o espírito do Kaizen é justamente começar pequeno, imperfeito, e melhorar a partir do teste.',
    ],
    checklist: [
      'Identifiquei um problema específico e pequeno o suficiente para testar rapidamente.',
      'Formulei uma hipótese clara de melhoria antes de agir.',
      'Medi o resultado real com dados, não só impressão.',
      'Decidi com base nos dados: adotar, ajustar ou descartar, e já pensei no próximo ciclo.',
    ],
    livroRelacionado: {
      livroId: 'habitos-atomicos',
      textoConexao: 'James Clear defende que pequenas melhorias repetidas produzem resultados maiores no longo prazo do que mudanças grandes e raras — exatamente o princípio central do Kaizen aplicado a processos, não a hábitos pessoais.',
    },
  },

  mapaMental: {
    label: 'Kaizen e PDCA',
    subtitulo: 'Melhoria pequena, contínua, testada',
    ramos: [
      {
        id: 'kaizen',
        label: 'Kaizen',
        cor: '#22C55E',
        resumo: 'A filosofia',
        filhos: [
          { label: 'Mudança para melhor', desc: 'Contínua e incremental, não pontual e rara' },
        ],
      },
      {
        id: 'pdca',
        label: 'PDCA',
        cor: '#3B82F6',
        resumo: 'O ciclo estruturado',
        filhos: [
          { label: 'Planejar', desc: 'Hipótese clara de melhoria' },
          { label: 'Fazer', desc: 'Testar em pequena escala' },
          { label: 'Checar', desc: 'Medir resultado real com dados' },
          { label: 'Agir', desc: 'Adotar, ajustar ou descartar, e recomeçar' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos aplicar um ciclo PDCA completo a um problema real de um pequeno negócio.',
    passos: [
      'Identificar o problema e formular a hipótese (Planejar).',
      'Testar em pequena escala (Fazer).',
      'Medir o resultado (Checar).',
      'Decidir o próximo passo (Agir).',
    ],
    exemploGuiado: 'Uma lanchonete percebe que o tempo de entrega de pedidos por aplicativo está alto. Planejar: a hipótese é que separar uma bancada exclusiva para pedidos de app (em vez de misturar com pedidos do balcão) reduziria o tempo. Fazer: testam isso por uma semana, só nos turnos de almoço. Checar: o tempo médio de entrega caiu de 35 para 22 minutos nesse período, medido com os próprios dados do aplicativo. Agir: com o resultado positivo confirmado por dados, adotam a bancada exclusiva em todos os turnos, e já identificam o próximo problema a testar: o tempo de embalagem, que ainda parece alto.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa Kaizen?', verso: 'Palavra japonesa para "mudança para melhor" — a filosofia de melhoria contínua e incremental, em vez de grandes reformas pontuais.' },
    { id: 'fc2', frente: 'O que significa PDCA?', verso: 'Plan-Do-Check-Act (Planejar-Fazer-Checar-Agir) — o ciclo estruturado usado para colocar o Kaizen em prática.' },
    { id: 'fc3', frente: 'Por que o Kaizen prefere pequenas melhorias frequentes a uma grande reforma única?', verso: 'Porque a grande reforma raramente acontece de verdade — sempre existe uma prioridade mais urgente competindo pelos mesmos recursos.' },
    { id: 'fc4', frente: 'O que acontece na etapa "Checar" do PDCA?', verso: 'Medir o resultado real da mudança testada com dados, comparando com o que era esperado — não confiar apenas em impressão.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é a principal diferença entre a filosofia Kaizen e uma abordagem de "grande reforma"?',
      alternativas: [
        'Kaizen é mais caro de implementar',
        'Kaizen prefere melhorias pequenas, contínuas e testadas, em vez de mudanças raras e grandes',
        'Kaizen só funciona em empresas japonesas',
        'Não há diferença real entre as duas abordagens',
      ],
      correta: 1,
      explicacao: 'O Kaizen troca a aposta grande e rara (que frequentemente nunca acontece) por pequenas apostas frequentes e testadas, com aprendizado acumulado de um ciclo para o outro.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'O que acontece se a etapa "Checar" do ciclo PDCA for pulada?',
      alternativas: [
        'Nada muda, o ciclo continua funcionando normalmente',
        'A decisão de adotar, ajustar ou descartar a mudança fica baseada em impressão, não em dados reais',
        'O ciclo PDCA se torna mais rápido de executar',
        'A etapa "Checar" é opcional e raramente necessária',
      ],
      correta: 1,
      explicacao: 'Sem medir o resultado real com dados, a decisão final do ciclo (Agir) perde a base objetiva que diferencia o PDCA de uma simples tentativa por impressão.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Quanto tempo deve durar um ciclo PDCA?',
      resposta: 'Varia conforme o problema, mas o espírito do Kaizen favorece ciclos curtos — dias ou poucas semanas, não meses. Se o ciclo está demorando meses, provavelmente o problema escolhido era grande demais para um único teste.',
    },
    {
      pergunta: 'Kaizen substitui a necessidade de mudanças estruturais maiores em algum momento?',
      resposta: 'Não necessariamente — algumas mudanças exigem investimento maior e mais planejamento. Mas mesmo essas mudanças maiores costumam se beneficiar de serem testadas em escala reduzida primeiro, seguindo a lógica do PDCA, antes de um investimento total.',
    },
  ],
}
