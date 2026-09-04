import { Modulo } from '@/types'

export const introducaoGestaoFinanceiraNegocios: Modulo = {
  id: 'introducao-gestao-financeira-negocios',
  trilhaId: 'gestao-financeira-negocios',
  numero: 1,
  titulo: 'Introdução: Gestão Financeira de Negócios',
  subtitulo: 'Lucro no papel não paga conta — o arsenal de quem decide com números',
  iconName: 'LineChart',
  duracaoMin: 8,

  nivel: 'avancado',
  objetivoAprendizagem: 'Você vai sair entendendo por que uma empresa pode dar lucro no papel e ainda assim quebrar, e por que essa distinção é a base de todo o resto desta trilha.',
  erroFatal: 'Confundir lucro contábil (o que aparece no papel) com caixa disponível (o que realmente existe na conta) — é a causa mais comum e mais silenciosa de falência de empresas que, tecnicamente, estavam dando lucro.',
  numeroChave: { valor: '6 aulas', legenda: 'esta trilha cobre seis ferramentas financeiras usadas por investidores e gestores profissionais para decidir com números — do custo básico até o valor de uma empresa inteira, comparado ao seu custo de capital' },
  glossarioDoModulo: ['Lucro contábil', 'Caixa disponível', 'Fluxo de caixa'],
  proximoPasso: { moduloId: 'custo-vs-investimento', motivo: 'A primeira aula da trilha ensina a diferença entre um gasto que desaparece e um gasto que constrói valor futuro.' },

  aprender: {
    oQueE: 'Esta trilha ensina o arsenal financeiro usado por gestores e investidores profissionais para decidir com números, não com impressão — o quarto e último dos pilares de um guia de gestão que também cobre Geração de Receita, Cultura e Eficiência Operacional. O fio condutor de toda a trilha é uma distinção que parece óbvia, mas que quebra empresas todos os dias: lucro no papel (contábil) não é o mesmo que dinheiro disponível na conta (caixa).',
    porQueImporta: 'Uma empresa pode vender muito, ter margem de lucro saudável no papel, e ainda assim não ter dinheiro para pagar fornecedores no fim do mês — porque vendeu a prazo, porque o dinheiro está preso em estoque, ou porque investiu em crescimento mais rápido do que o caixa aguentava. Entender essa diferença, e as ferramentas para geri-la, é o que separa gestores que decidem com dados de gestores que decidem por susto, sempre correndo atrás do próprio caixa.',
    naPratica: 'Cada módulo desta trilha corresponde a uma aula do guia original: a diferença entre custo (que desaparece) e investimento (que constrói valor), como ler um DRE (Demonstrativo de Resultado) de verdade, como orçar do zero em vez de copiar o ano anterior, como medir e reduzir o tempo que o dinheiro fica "preso" no ciclo operacional (CCC), como comparar o retorno de um investimento com o custo de capital da empresa (ROIC vs. WACC), e como projetar cenários financeiros futuros com mais realismo do que uma única previsão otimista.',
    passoAPasso: [
      'Comece pelo módulo "Custo vs. Investimento" — ele muda a forma como você olha para cada gasto da empresa daqui em diante.',
      'Siga para o DRE, a ferramenta central para entender de onde vem (e para onde vai) o resultado financeiro.',
      'Use os módulos de CCC e Orçamento Base Zero para entender e gerir o fluxo de caixa de perto, não só o lucro no papel.',
      'Use ROIC vs. WACC para decidir se vale a pena investir em algo específico, com uma régua objetiva.',
      'Termine com Forecast em Cenários, para projetar o futuro com mais de um caminho possível, não uma única aposta.',
    ],
    errosComuns: [
      'Confundir lucro contábil com caixa disponível, tomando decisões de investimento baseadas só no primeiro.',
      'Tratar todo gasto da mesma forma, sem diferenciar o que é custo puro do que é investimento que constrói valor futuro.',
      'Fazer orçamento copiando o ano anterior com um ajuste de inflação, em vez de questionar cada linha do zero.',
      'Investir em algo sem comparar o retorno esperado com o custo de capital da empresa — investir "porque parece bom" sem essa régua.',
    ],
    checklist: [
      'Entendi a diferença central entre lucro contábil e caixa disponível.',
      'Sei que esta trilha ensina ferramentas usadas por investidores e gestores profissionais, com aplicação direta em decisões reais.',
      'Tenho em mente os números básicos do meu negócio (ou de um que conheço) para aplicar ao longo da trilha.',
      'Entendi que esta é a última de quatro trilhas — Receita, Cultura e Eficiência completam o conjunto.',
    ],
  },

  mapaMental: {
    label: 'Gestão Financeira de Negócios',
    subtitulo: 'O mapa dos seis módulos desta trilha',
    ramos: [
      {
        id: 'entender-o-gasto',
        label: 'Entender o Gasto',
        cor: '#22C55E',
        resumo: 'Nem todo real gasto é igual',
        filhos: [
          { label: 'Custo vs. Investimento', desc: 'O que desaparece e o que constrói valor' },
          { label: 'DRE', desc: 'Como ler o resultado financeiro de verdade' },
        ],
      },
      {
        id: 'gerir-o-caixa',
        label: 'Gerir o Caixa',
        cor: '#3B82F6',
        resumo: 'Não só o lucro no papel',
        filhos: [
          { label: 'Orçamento Base Zero', desc: 'Questionar cada linha, não copiar o ano anterior' },
          { label: 'CCC', desc: 'Quanto tempo o dinheiro fica preso no ciclo' },
        ],
      },
      {
        id: 'decidir-com-numero',
        label: 'Decidir com Número',
        cor: '#8B5CF6',
        resumo: 'A régua dos investidores profissionais',
        filhos: [
          { label: 'ROIC vs. WACC', desc: 'Vale a pena investir nisso, ou não?' },
          { label: 'Forecast em Cenários', desc: 'Projetar o futuro com mais de um caminho possível' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Este módulo é a porta de entrada da trilha — a simulação de verdade acontece módulo a módulo, com a calculadora de cada conceito.',
    passos: [
      'Reúna, se possível, os números básicos de um negócio real: receita, custos, e quanto tempo leva para receber de clientes e pagar fornecedores.',
      'Ao entrar em cada módulo, aplique o conceito a esses números antes de olhar o exemplo pronto.',
    ],
    exemploGuiado: 'Uma loja de roupas vende R$ 50.000 em um mês, com margem de lucro de 30% — no papel, R$ 15.000 de lucro. Mas boa parte das vendas foi parcelada em cartão, com recebimento só em 30-60 dias, enquanto os fornecedores exigiram pagamento à vista. No fim do mês, apesar do "lucro" de R$ 15.000 no papel, a loja não tem caixa suficiente para repor o estoque vendido. Essa é exatamente a armadilha que esta trilha ensina a evitar: lucro contábil não é a mesma coisa que dinheiro disponível.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é a distinção central que sustenta toda esta trilha?', verso: 'A diferença entre lucro contábil (o que aparece no papel) e caixa disponível (o que realmente existe na conta).' },
    { id: 'fc2', frente: 'Por que uma empresa pode dar lucro no papel e ainda assim quebrar?', verso: 'Porque vendeu a prazo, o dinheiro está preso em estoque, ou investiu mais rápido do que o caixa real aguentava — mesmo com margem de lucro saudável.' },
    { id: 'fc3', frente: 'Quais são as seis ferramentas financeiras cobertas por esta trilha?', verso: 'Custo vs. Investimento, DRE, Orçamento Base Zero, CCC, ROIC vs. WACC, e Forecast em Cenários.' },
  ],

  quiz: [
    {
      pergunta: 'Segundo esta trilha, por que uma empresa lucrativa no papel pode quebrar mesmo assim?',
      alternativas: [
        'Porque lucro contábil e caixa disponível são sempre a mesma coisa',
        'Porque o dinheiro pode estar preso em vendas a prazo ou estoque, mesmo com lucro registrado no papel',
        'Porque empresas lucrativas nunca quebram de verdade',
        'Porque isso só acontece em empresas muito grandes',
      ],
      correta: 1,
      explicacao: 'Lucro contábil (o que aparece no papel) pode não coincidir com caixa disponível (o que realmente existe na conta) — essa diferença é a causa mais comum e silenciosa de falência de empresas tecnicamente lucrativas.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Qual é o foco central desta trilha, diferente das três anteriores (Receita, Cultura, Eficiência)?',
      alternativas: [
        'Como vender mais para clientes novos',
        'Como estruturar a cultura de uma equipe',
        'As ferramentas financeiras que separam decisão por dado de decisão por impressão, incluindo a gestão de caixa',
        'Como eliminar desperdício em processos operacionais',
      ],
      correta: 2,
      explicacao: 'Esta trilha foca especificamente no arsenal financeiro usado por investidores e gestores profissionais para decidir com números — do custo básico ao valor de uma empresa comparado ao seu custo de capital.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ter formação em contabilidade para acompanhar esta trilha?',
      resposta: 'Não. Os conceitos são explicados do zero, com exemplos numéricos resolvidos passo a passo. É útil ter algum contato prévio com números de negócio, mas não é pré-requisito formal.',
    },
    {
      pergunta: 'Essa trilha serve para quem não tem uma empresa própria?',
      resposta: 'Sim — os conceitos de DRE, fluxo de caixa e retorno sobre investimento também ajudam a entender relatórios financeiros de empresas de capital aberto, úteis para quem investe em ações, além de serem transferíveis para gestão financeira pessoal em escala maior.',
    },
  ],
}
