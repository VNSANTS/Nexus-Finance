import { Modulo } from '@/types'

export const oee: Modulo = {
  id: 'oee',
  trilhaId: 'eficiencia-operacional',
  numero: 5,
  titulo: 'OEE: A Métrica que Mede Eficiência Real',
  subtitulo: 'Três números multiplicados, não somados — um deles ruim já derruba tudo',
  iconName: 'Gauge',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['kaizen-pdca'],
  objetivoAprendizagem: 'Você vai sair sabendo calcular o OEE de um processo ou equipamento, entendendo por que os três componentes se multiplicam, não se somam.',
  erroFatal: 'Medir só um dos três componentes do OEE (geralmente performance, o mais visível) e achar que isso representa a eficiência real — um processo pode ter ótima performance no tempo em que está rodando, mas ficar parado a maior parte do tempo, e o OEE combinado ainda ser péssimo.',
  numeroChave: { valor: '85%', legenda: 'em manufatura de classe mundial, um OEE de 85% é considerado excelente — a maioria das operações, sem medir e otimizar deliberadamente, opera com OEE real entre 40% e 60%, sem saber' },
  glossarioDoModulo: ['OEE', 'Disponibilidade', 'Performance', 'Qualidade'],
  proximoPasso: { moduloId: 'pessoas-processos-tecnologia', motivo: 'Depois de medir a eficiência real de um processo, o próximo módulo ensina em que ordem investir para melhorá-la.' },

  aprender: {
    oQueE: 'OEE, sigla para Overall Equipment Effectiveness (Eficácia Geral do Equipamento), é um indicador que combina três componentes multiplicados entre si: Disponibilidade (a fração do tempo planejado em que o equipamento ou processo realmente estava funcionando, sem paradas), Performance (a fração da velocidade máxima teórica que foi de fato atingida enquanto estava funcionando) e Qualidade (a fração do que foi produzido que saiu sem defeito, sem precisar de retrabalho).',
    porQueImporta: 'É comum uma operação achar que está indo bem porque, quando está rodando, roda rápido e com qualidade — mas ignora quanto tempo fica parada esperando manutenção, trocando de configuração, ou aguardando material. O OEE força a considerar os três fatores ao mesmo tempo, e como eles se multiplicam (não se somam), um único componente fraco já derruba o resultado total, mesmo que os outros dois sejam excelentes.',
    naPratica: 'Disponibilidade se calcula dividindo o tempo real de operação pelo tempo total planejado para operação (excluindo paradas propositais como intervalos, mas incluindo paradas não planejadas como manutenção ou falta de insumo). Performance se calcula dividindo a velocidade real de produção pela velocidade máxima teórica do processo. Qualidade se calcula dividindo as unidades boas produzidas pelo total de unidades produzidas, incluindo as com defeito. O OEE final é a multiplicação dos três percentuais: Disponibilidade × Performance × Qualidade.',
    passoAPasso: [
      'Meça o tempo real de operação e divida pelo tempo total planejado — esse é o percentual de Disponibilidade.',
      'Meça a velocidade real de produção e divida pela velocidade máxima teórica — esse é o percentual de Performance.',
      'Meça as unidades boas produzidas e divida pelo total produzido (incluindo defeituosas) — esse é o percentual de Qualidade.',
      'Multiplique os três percentuais (não some) para chegar ao OEE final.',
      'Identifique qual dos três componentes está mais baixo — geralmente é ali que o maior ganho de eficiência está disponível.',
    ],
    errosComuns: [
      'Somar os três componentes em vez de multiplicá-los — a matemática do OEE é sempre multiplicativa, e isso muda bastante o resultado final.',
      'Medir só um componente (geralmente performance) e ignorar os outros dois, perdendo a visão completa da eficiência real.',
      'Confundir "tempo planejado" com "24 horas do dia" — o tempo planejado exclui pausas propositais como manutenção preventiva programada ou intervalos.',
      'Não investigar qual dos três componentes está puxando o OEE para baixo antes de decidir onde investir esforço de melhoria.',
    ],
    comparativo: {
      titulo: 'Os três componentes do OEE',
      linhas: [
        { label: 'Disponibilidade', valor: 'Mede: tempo real operando ÷ tempo planejado | Prejudicada por: paradas não planejadas, manutenção, falta de material' },
        { label: 'Performance', valor: 'Mede: velocidade real ÷ velocidade máxima teórica | Prejudicada por: pequenas paradas, operação mais lenta que o ideal' },
        { label: 'Qualidade', valor: 'Mede: unidades boas ÷ total produzido | Prejudicada por: defeitos, retrabalho, refugo' },
      ],
    },
    checklist: [
      'Medi os três componentes separadamente: Disponibilidade, Performance e Qualidade.',
      'Multipliquei os três percentuais, não somei.',
      'Identifiquei qual dos três está mais baixo e puxando o OEE geral para baixo.',
      'Entendi que "tempo planejado" exclui pausas propositais, não é igual a 24 horas do dia.',
    ],
    livroRelacionado: {
      livroId: 'random-walk-wall-street',
      textoConexao: 'Malkiel defende medir o desempenho real de um investimento com todos os fatores relevantes combinados, não isoladamente — o mesmo princípio do OEE, que combina três fatores multiplicativos para medir eficiência real, não parcial.',
    },
  },

  mapaMental: {
    label: 'OEE',
    subtitulo: 'Três fatores multiplicados, não somados',
    ramos: [
      {
        id: 'disponibilidade',
        label: 'Disponibilidade',
        cor: '#3B82F6',
        resumo: 'Quanto tempo realmente funcionou',
        filhos: [
          { label: 'Tempo real ÷ tempo planejado', desc: 'Prejudicada por paradas não planejadas' },
        ],
      },
      {
        id: 'performance',
        label: 'Performance',
        cor: '#FFC93C',
        resumo: 'Quão rápido, enquanto funcionava',
        filhos: [
          { label: 'Velocidade real ÷ máxima teórica', desc: 'Prejudicada por pequenas paradas e lentidão' },
        ],
      },
      {
        id: 'qualidade',
        label: 'Qualidade',
        cor: '#22C55E',
        resumo: 'Quanto saiu sem defeito',
        filhos: [
          { label: 'Unidades boas ÷ total produzido', desc: 'Prejudicada por defeitos e retrabalho' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de OEE',
    intro: 'Vamos calcular o OEE de uma linha de produção fictícia.',
    passos: [
      'Calcular a Disponibilidade dividindo tempo real de operação pelo tempo planejado.',
      'Calcular a Performance dividindo velocidade real pela velocidade máxima teórica.',
      'Calcular a Qualidade dividindo unidades boas pelo total produzido.',
      'Multiplicar os três percentuais para chegar ao OEE.',
    ],
    exemploGuiado: 'Uma linha de produção tem 8 horas de turno planejado, mas fica parada 1 hora por manutenção não programada: Disponibilidade = 7h ÷ 8h = 87,5%. A velocidade máxima teórica é de 100 unidades por hora, mas a linha produz, em média, 80 unidades por hora quando está rodando: Performance = 80 ÷ 100 = 80%. Das unidades produzidas nas 7 horas efetivas (560 unidades), 28 saem com defeito: Qualidade = (560-28) ÷ 560 = 95%. OEE = 87,5% × 80% × 95% ≈ 66,5%. Apesar de cada componente individual parecer razoável, o resultado combinado (66,5%) está bem abaixo do benchmark de excelência de 85%, mostrando que há espaço real de melhoria em qualquer um dos três fatores.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa OEE?', verso: 'Overall Equipment Effectiveness (Eficácia Geral do Equipamento) — um indicador que combina Disponibilidade, Performance e Qualidade.' },
    { id: 'fc2', frente: 'Como os três componentes do OEE se combinam?', verso: 'Multiplicados entre si (Disponibilidade × Performance × Qualidade), não somados — um componente fraco já derruba o resultado total.' },
    { id: 'fc3', frente: 'O que mede a Disponibilidade, no OEE?', verso: 'A fração do tempo planejado em que o equipamento ou processo realmente estava funcionando, sem paradas não planejadas.' },
    { id: 'fc4', frente: 'Qual é considerado um OEE excelente, segundo o benchmark de manufatura de classe mundial?', verso: '85% — a maioria das operações, sem medir e otimizar deliberadamente, opera entre 40% e 60%, sem saber.' },
  ],

  quiz: [
    {
      pergunta: 'Um processo tem Disponibilidade de 90%, Performance de 90% e Qualidade de 90%. Qual é o OEE?',
      alternativas: ['90%', '270%', '81%', '72,9%'],
      correta: 3,
      explicacao: '0,90 × 0,90 × 0,90 = 0,729, ou 72,9% — mostrando como três componentes "bons" individualmente ainda produzem um OEE bem abaixo de 90%, por causa da multiplicação.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que é um erro somar os três componentes do OEE em vez de multiplicá-los?',
      alternativas: [
        'Porque somar é matematicamente mais difícil',
        'Porque a multiplicação é a fórmula correta e reflete melhor o impacto combinado de fraquezas em qualquer um dos três fatores',
        'Porque somar sempre resulta em números negativos',
        'Não há diferença prática entre somar e multiplicar nesse caso',
      ],
      correta: 1,
      explicacao: 'A multiplicação é a fórmula correta do OEE, e reflete que uma fraqueza em qualquer um dos três componentes já reduz proporcionalmente o resultado final — somando, essa penalidade desapareceria.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'O OEE serve só para linhas de produção industrial?',
      resposta: 'A métrica nasceu na indústria, mas o conceito se adapta a qualquer processo com etapas repetitivas — uma cozinha de restaurante, um consultório médico, um centro de distribuição podem calcular versões adaptadas de Disponibilidade, Performance e Qualidade.',
    },
    {
      pergunta: 'Qual dos três componentes costuma ser o mais fácil de melhorar primeiro?',
      resposta: 'Varia por operação, mas frequentemente Disponibilidade é o componente com maior potencial de ganho rápido, porque paradas não planejadas costumam ter causas identificáveis e corrigíveis (manutenção preventiva, gestão de estoque de insumos).',
    },
  ],
}
