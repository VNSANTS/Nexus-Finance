import { Modulo } from '@/types'

export const custoVsInvestimento: Modulo = {
  id: 'custo-vs-investimento',
  trilhaId: 'gestao-financeira-negocios',
  numero: 2,
  titulo: 'Custo vs. Investimento',
  subtitulo: 'A mesma nota fiscal pode representar duas coisas completamente diferentes',
  iconName: 'ArrowLeftRight',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['introducao-gestao-financeira-negocios'],
  objetivoAprendizagem: 'Você vai sair sabendo classificar corretamente cada gasto da empresa como custo (que desaparece) ou investimento (que constrói valor futuro).',
  erroFatal: 'Cortar indiscriminadamente todo gasto durante um aperto financeiro, tratando custo e investimento como a mesma coisa — cortar um investimento que geraria retorno futuro pode ser mais prejudicial no longo prazo do que manter o aperto de caixa por mais um tempo.',
  numeroChave: { valor: '2 perguntas', legenda: 'a classificação certa de qualquer gasto depende de responder duas perguntas: esse gasto se repete e desaparece, ou constrói algo que continua gerando valor depois? E existe expectativa clara de retorno mensurável?' },
  glossarioDoModulo: ['Custo', 'Investimento', 'Depreciação'],
  proximoPasso: { moduloId: 'dre', motivo: 'Depois de aprender a classificar gastos corretamente, o próximo módulo ensina onde essa classificação aparece formalmente: no Demonstrativo de Resultado.' },

  aprender: {
    oQueE: 'Custo é um gasto que se consome no próprio período em que ocorre e não gera nenhum valor residual depois — o aluguel do mês, a conta de energia, o salário de quem executa uma tarefa operacional recorrente. Investimento é um gasto que constrói algo que continua gerando valor além do período em que foi feito — comprar um equipamento que vai ser usado por anos, treinar um funcionário de forma que aumenta sua capacidade permanentemente, desenvolver uma marca que continua atraindo clientes no futuro.',
    porQueImporta: 'A mesma quantia de dinheiro, gasta de formas diferentes, pode ser um custo puro (que desaparece sem deixar rastro de valor) ou um investimento (que continua rendendo depois de gasto). Confundir os dois leva a dois erros opostos e igualmente caros: tratar um investimento como custo e cortá-lo assim que o caixa aperta, perdendo o retorno futuro que ele geraria; ou tratar um custo recorrente como se fosse investimento, continuando a pagá-lo mesmo sem nenhum retorno real além do período imediato.',
    naPratica: 'Para classificar um gasto, pergunte: ele se consome inteiramente no período em que acontece, sem deixar nada de valor residual (custo)? Ou ele constrói algo — um ativo físico, uma capacidade, um relacionamento com cliente — que continua gerando valor depois desse período específico (investimento)? Um exemplo útil: pagar o salário de um vendedor pelo trabalho do mês é custo operacional recorrente; pagar por um treinamento que aumenta permanentemente a capacidade de venda desse mesmo vendedor é investimento, porque o ganho de capacidade continua além daquele mês específico.',
    passoAPasso: [
      'Liste os principais gastos recorrentes da empresa (ou de um negócio de referência).',
      'Para cada um, pergunte: esse gasto desaparece no período, ou constrói algo que continua gerando valor depois?',
      'Classifique cada gasto como custo ou investimento com base na resposta.',
      'Para os classificados como investimento, avalie se existe uma expectativa razoável e mensurável de retorno.',
      'Durante um aperto de caixa, priorize cortar custos puros antes de cortar investimentos com retorno já comprovado.',
    ],
    errosComuns: [
      'Cortar investimentos com retorno comprovado durante um aperto financeiro, só porque representam uma saída de caixa imediata visível.',
      'Tratar todo gasto em marketing ou treinamento como automaticamente "investimento", sem avaliar se existe retorno real e mensurável.',
      'Ignorar que um mesmo tipo de gasto (por exemplo, um curso) pode ser custo puro numa situação (treinamento genérico sem aplicação clara) e investimento real em outra (treinamento específico que já demonstrou aumentar vendas).',
      'Não considerar a depreciação de investimentos físicos (equipamentos, por exemplo) ao longo do tempo em que geram valor.',
    ],
    comparativo: {
      titulo: 'Custo vs. Investimento',
      linhas: [
        { label: 'Custo', valor: 'Se consome no período | Exemplo: aluguel, energia, salário de tarefa operacional' },
        { label: 'Investimento', valor: 'Constrói valor que continua depois | Exemplo: equipamento, treinamento com retorno mensurável, marca' },
      ],
    },
    checklist: [
      'Sei distinguir, para cada gasto relevante, se ele é custo puro ou investimento.',
      'Avalio se existe expectativa clara e mensurável de retorno antes de classificar algo como investimento.',
      'Durante aperto de caixa, priorizo cortar custos puros antes de investimentos com retorno comprovado.',
      'Entendo que o mesmo tipo de gasto pode ser custo numa situação e investimento em outra, dependendo do contexto.',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham diferencia investimento de especulação pela existência de análise e expectativa fundamentada de retorno — a mesma lógica de distinguir custo de investimento aplica esse rigor à decisão sobre gastos dentro de uma empresa.',
    },
  },

  mapaMental: {
    label: 'Custo vs. Investimento',
    subtitulo: 'A mesma nota fiscal, dois destinos diferentes',
    ramos: [
      {
        id: 'custo',
        label: 'Custo',
        cor: '#EF4444',
        resumo: 'Se consome, desaparece',
        filhos: [
          { label: 'Sem valor residual', desc: 'Nada continua depois do período' },
          { label: 'Exemplo', desc: 'Aluguel, energia, salário operacional recorrente' },
        ],
      },
      {
        id: 'investimento',
        label: 'Investimento',
        cor: '#22C55E',
        resumo: 'Constrói valor futuro',
        filhos: [
          { label: 'Retorno mensurável esperado', desc: 'Continua gerando valor além do período' },
          { label: 'Exemplo', desc: 'Equipamento, treinamento com retorno claro, marca' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos classificar gastos reais de um pequeno negócio em custo ou investimento.',
    passos: [
      'Ler cada gasto listado no cenário.',
      'Perguntar se ele desaparece no período ou constrói valor futuro.',
      'Classificar corretamente cada um.',
    ],
    exemploGuiado: 'Uma padaria tem os seguintes gastos num mês: R$ 3.000 de farinha e insumos (custo — consumido na produção do próprio mês), R$ 15.000 em um forno industrial novo, que vai durar anos e aumentar a capacidade de produção (investimento — gera valor além do mês da compra), e R$ 800 num curso de confeitaria avançada para o padeiro principal, que passa a produzir itens de maior valor agregado permanentemente (investimento, porque a capacidade adquirida continua além do mês do curso). O aluguel de R$ 4.000 é custo puro — desaparece todo mês, sem construir nada residual.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que caracteriza um custo, diferente de um investimento?', verso: 'O custo se consome inteiramente no período em que ocorre, sem deixar valor residual depois.' },
    { id: 'fc2', frente: 'O que caracteriza um investimento, diferente de um custo?', verso: 'O investimento constrói algo — ativo, capacidade, relacionamento — que continua gerando valor além do período em que foi feito.' },
    { id: 'fc3', frente: 'Por que cortar investimentos com retorno comprovado durante um aperto de caixa pode ser um erro?', verso: 'Porque elimina o retorno futuro que aquele investimento geraria, mesmo que traga alívio imediato de caixa — um problema de curto prazo pode criar um problema maior de longo prazo.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa paga por um treinamento de vendas genérico, sem nenhuma métrica de acompanhamento de resultado depois. Como classificar esse gasto?',
      alternativas: [
        'Sempre como investimento, porque é treinamento',
        'Como custo, já que não há expectativa clara e mensurável de retorno acompanhado',
        'Como receita, porque gera vendas futuras',
        'É impossível classificar gastos com treinamento',
      ],
      correta: 1,
      explicacao: 'Sem uma expectativa clara e mensurável de retorno, mesmo um gasto que parece "investimento" por natureza (treinamento) se comporta mais como custo — a classificação depende da existência real de retorno acompanhável, não só da categoria genérica do gasto.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Qual é o principal risco de tratar todo gasto igual (custo) durante um aperto de caixa?',
      alternativas: [
        'Nenhum, cortar tudo igualmente é sempre a decisão mais segura',
        'Cortar investimentos com retorno comprovado, perdendo o retorno futuro que eles gerariam',
        'A empresa nunca conseguirá economizar dinheiro dessa forma',
        'Isso é ilegal em qualquer tipo de empresa',
      ],
      correta: 1,
      explicacao: 'Tratar investimento como custo e cortá-lo assim que o caixa aperta elimina o retorno futuro esperado — um dos dois erros opostos que este módulo alerta para evitar.',
      dificuldade: 'facil',
    },
  ],

  faq: [
    {
      pergunta: 'Um mesmo gasto pode mudar de classificação com o tempo?',
      resposta: 'Sim. Um gasto que começou como investimento (um equipamento novo, por exemplo) eventualmente se deprecia e deixa de gerar o mesmo valor incremental — nesse ponto, sua manutenção pode passar a se comportar mais como custo puro.',
    },
    {
      pergunta: 'Como sei se um investimento realmente teve retorno, e não foi apenas um custo disfarçado?',
      resposta: 'Definindo, antes de fazer o gasto, uma métrica clara de acompanhamento (aumento de vendas, redução de tempo de produção, retenção de cliente) e revisando essa métrica depois de um período razoável. Sem essa medição, é fácil confundir esperança de retorno com retorno real.',
    },
  ],
}
