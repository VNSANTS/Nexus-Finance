import { Modulo } from '@/types'

export const oitoDesperdicios: Modulo = {
  id: 'oito-desperdicios',
  trilhaId: 'eficiencia-operacional',
  numero: 2,
  titulo: 'Os Oito Desperdícios (Muda)',
  subtitulo: 'Toda operação tem, em algum grau, todos os oito — a questão é qual pesa mais',
  iconName: 'Trash2',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['introducao-eficiencia-operacional'],
  objetivoAprendizagem: 'Você vai sair sabendo identificar cada um dos oito tipos de desperdício do Sistema Toyota de Produção dentro do seu próprio processo de trabalho.',
  erroFatal: 'Achar que desperdício é só "material jogado fora" — o Sistema Toyota de Produção mapeia oito tipos diferentes, e a maioria deles (espera, transporte, movimento, processamento excessivo) não envolve nenhum material físico sendo descartado, só tempo e esforço mal direcionados.',
  numeroChave: { valor: '8 tipos', legenda: 'transporte, estoque, movimento, espera, superprodução, processamento excessivo, defeitos e talento subutilizado — os oito tipos de desperdício (Muda, em japonês) mapeados pelo Sistema Toyota de Produção' },
  glossarioDoModulo: ['Muda', 'Superprodução', 'Talento subutilizado'],
  proximoPasso: { moduloId: 'vsm', motivo: 'Depois de aprender a nomear cada tipo de desperdício, o próximo módulo ensina a mapear visualmente onde eles aparecem ao longo de um processo inteiro.' },

  aprender: {
    oQueE: 'Muda é a palavra japonesa para desperdício, usada no Sistema Toyota de Produção para descrever qualquer atividade que consome recursos (tempo, dinheiro, esforço) sem gerar valor para o cliente final. O sistema mapeia oito tipos específicos: transporte desnecessário, estoque excessivo, movimento desnecessário de pessoas, tempo de espera, superprodução, processamento excessivo (fazer mais do que o cliente precisa), defeitos que exigem retrabalho, e talento subutilizado (pessoas capazes fazendo tarefas abaixo da sua capacidade).',
    porQueImporta: 'A maioria das pessoas, quando pensa em "desperdício" num negócio, imagina material jogado fora ou dinheiro gasto à toa. Mas na prática, os desperdícios mais comuns e mais caros costumam ser invisíveis: um funcionário esperando informação de outro setor, um processo que passa por mais aprovações do que precisa, um relatório detalhado demais que ninguém lê inteiro. Esses desperdícios não aparecem numa planilha de custos direta, mas consomem tempo e energia que poderiam gerar valor real.',
    naPratica: 'Transporte é o deslocamento desnecessário de materiais, informações ou produtos entre etapas. Estoque é acumular mais material ou trabalho pronto do que o necessário no momento. Movimento é o deslocamento físico desnecessário de pessoas (buscar uma ferramenta guardada longe, por exemplo). Espera é tempo parado aguardando a próxima etapa. Superprodução é produzir mais, ou antes, do que é realmente demandado. Processamento excessivo é fazer mais trabalho do que o cliente valoriza ou percebe. Defeitos geram retrabalho, que consome recursos duas vezes pelo mesmo resultado. Talento subutilizado é o oitavo e mais frequentemente esquecido: pessoas capazes executando tarefas muito abaixo do seu potencial, desperdiçando a capacidade mais cara e mais difícil de repor de qualquer operação.',
    passoAPasso: [
      'Escolha um processo específico do seu trabalho para analisar (por exemplo, do pedido do cliente até a entrega).',
      'Percorra as etapas do processo procurando exemplos de cada um dos oito tipos de desperdício.',
      'Para cada desperdício identificado, estime o impacto aproximado em tempo ou dinheiro perdido.',
      'Priorize atacar primeiro o desperdício de maior impacto, não necessariamente o mais fácil de resolver.',
      'Revise periodicamente — desperdícios voltam a aparecer conforme o processo muda, mesmo depois de resolvidos uma vez.',
    ],
    errosComuns: [
      'Focar só em desperdícios físicos e visíveis (material, estoque), ignorando os mais sutis como espera e talento subutilizado.',
      'Tentar eliminar todos os oito desperdícios ao mesmo tempo, em vez de priorizar o de maior impacto primeiro.',
      'Confundir estoque de segurança (proteção razoável contra incerteza) com estoque excessivo (acúmulo sem propósito real).',
      'Ignorar o talento subutilizado por ser o mais difícil de medir em dinheiro direto, mesmo sendo geralmente o mais caro dos oito.',
    ],
    comparativo: {
      titulo: 'Os oito desperdícios, com exemplos comuns',
      linhas: [
        { label: 'Transporte', valor: 'Deslocamento desnecessário de material ou informação entre etapas' },
        { label: 'Estoque', valor: 'Mais material ou trabalho pronto do que o necessário' },
        { label: 'Movimento', valor: 'Deslocamento físico desnecessário de pessoas' },
        { label: 'Espera', valor: 'Tempo parado aguardando a próxima etapa' },
        { label: 'Superprodução', valor: 'Produzir mais, ou antes, do que a demanda real' },
        { label: 'Processamento excessivo', valor: 'Fazer mais do que o cliente valoriza ou percebe' },
        { label: 'Defeitos', valor: 'Retrabalho que consome recursos duas vezes' },
        { label: 'Talento subutilizado', valor: 'Pessoas capazes em tarefas abaixo do seu potencial' },
      ],
    },
    checklist: [
      'Mapeei um processo específico procurando exemplos de cada um dos oito desperdícios.',
      'Estimei o impacto aproximado, em tempo ou dinheiro, de cada desperdício identificado.',
      'Priorizei o desperdício de maior impacto, não o mais fácil de resolver.',
      'Considerei especificamente o talento subutilizado, o desperdício mais fácil de ignorar.',
    ],
    livroRelacionado: {
      livroId: 'seu-dinheiro-ou-sua-vida',
      textoConexao: 'O livro trata tempo de vida como o recurso mais escasso e valioso — os oito desperdícios aplicam essa mesma lente ao tempo dentro de uma operação, especialmente no caso do talento subutilizado, o desperdício de capacidade humana.',
    },
  },

  mapaMental: {
    label: 'Os Oito Desperdícios (Muda)',
    subtitulo: 'O que consome recursos sem gerar valor',
    ramos: [
      {
        id: 'desperdicios-de-fluxo',
        label: 'Desperdícios de Fluxo',
        cor: '#F97316',
        resumo: 'O que trava o processo',
        filhos: [
          { label: 'Transporte', desc: 'Deslocamento desnecessário de material ou informação' },
          { label: 'Movimento', desc: 'Deslocamento físico desnecessário de pessoas' },
          { label: 'Espera', desc: 'Tempo parado aguardando a próxima etapa' },
        ],
      },
      {
        id: 'desperdicios-de-volume',
        label: 'Desperdícios de Volume',
        cor: '#EF4444',
        resumo: 'Fazer mais do que o necessário',
        filhos: [
          { label: 'Estoque', desc: 'Mais material pronto do que o necessário' },
          { label: 'Superprodução', desc: 'Produzir mais, ou antes, do que a demanda' },
          { label: 'Processamento excessivo', desc: 'Fazer mais do que o cliente valoriza' },
        ],
      },
      {
        id: 'desperdicios-de-qualidade',
        label: 'Desperdícios de Qualidade e Pessoas',
        cor: '#8B5CF6',
        resumo: 'Os dois mais fáceis de ignorar',
        filhos: [
          { label: 'Defeitos', desc: 'Retrabalho que consome recursos duas vezes' },
          { label: 'Talento subutilizado', desc: 'Pessoas capazes em tarefas abaixo do seu potencial' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos identificar os oito desperdícios num processo real: o atendimento de uma clínica pequena.',
    passos: [
      'Percorrer as etapas do atendimento, do agendamento até a saída do paciente.',
      'Identificar qual tipo de desperdício aparece em cada etapa problemática.',
      'Priorizar qual desperdício ataca primeiro.',
    ],
    exemploGuiado: 'Numa clínica pequena, o paciente agenda por telefone (informação repetida depois no papel, um transporte de dados desnecessário), espera 20 minutos além do horário marcado (espera), a recepcionista se desloca até a sala do médico para avisar que o paciente chegou em vez de usar um sistema simples de aviso (movimento), o prontuário é preenchido em papel e depois digitado de novo no sistema (processamento excessivo, retrabalho duplo) e a enfermeira, formada e capaz de atendimentos mais complexos, passa boa parte do dia apenas organizando a agenda (talento subutilizado). Nenhum desses problemas envolve "material jogado fora", mas juntos consomem uma fatia enorme do tempo disponível da equipe.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa Muda?', verso: 'A palavra japonesa para desperdício, usada no Sistema Toyota de Produção para qualquer atividade que consome recursos sem gerar valor para o cliente final.' },
    { id: 'fc2', frente: 'Quais são os oito tipos de desperdício mapeados pelo Sistema Toyota de Produção?', verso: 'Transporte, estoque, movimento, espera, superprodução, processamento excessivo, defeitos e talento subutilizado.' },
    { id: 'fc3', frente: 'O que é "talento subutilizado", como tipo de desperdício?', verso: 'Pessoas capazes executando tarefas muito abaixo do seu potencial — geralmente o desperdício mais caro e mais fácil de ignorar, por não aparecer direto numa planilha de custo.' },
    { id: 'fc4', frente: 'Qual a diferença entre estoque de segurança e estoque excessivo (desperdício)?', verso: 'Estoque de segurança é uma proteção razoável contra incerteza; estoque excessivo é acúmulo sem propósito real, além do necessário.' },
  ],

  quiz: [
    {
      pergunta: 'Qual das opções abaixo é um exemplo de "espera", como tipo de desperdício?',
      alternativas: [
        'Um funcionário parado aguardando informação de outro setor para continuar o trabalho',
        'Um produto sendo transportado entre dois setores',
        'Um relatório detalhado demais que ninguém lê inteiro',
        'Um erro que precisa ser corrigido depois de identificado',
      ],
      correta: 0,
      explicacao: 'Espera é justamente tempo parado aguardando a próxima etapa do processo — nesse caso, o funcionário parado esperando informação.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Por que "talento subutilizado" é considerado um dos desperdícios mais fáceis de ignorar?',
      alternativas: [
        'Porque não é considerado um desperdício real pelo Sistema Toyota',
        'Porque não aparece direto numa planilha de custos, apesar de geralmente ser o mais caro dos oito',
        'Porque só acontece em empresas muito grandes',
        'Porque é impossível de medir de qualquer forma',
      ],
      correta: 1,
      explicacao: 'Diferente de estoque ou defeito, que geram um custo direto e visível, talento subutilizado é um custo de oportunidade — geralmente alto, mas invisível numa planilha tradicional.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Todos os oito desperdícios existem em todo negócio?',
      resposta: 'Em algum grau, sim — a questão nunca é "temos ou não temos desperdício", é qual dos oito pesa mais no seu processo específico. Alguns negócios sofrem mais com espera, outros com processamento excessivo, e assim por diante.',
    },
    {
      pergunta: 'Esse mapeamento serve para negócios de serviço, sem produção física?',
      resposta: 'Sim — os oito tipos foram criados originalmente para manufatura, mas se aplicam bem a serviços. Um escritório pode ter "estoque" de tarefas acumuladas, "espera" entre aprovações, "processamento excessivo" em relatórios detalhados demais.',
    },
  ],
}
