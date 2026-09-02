import type { Modulo } from '@/types'

export const moduloEducacaoFinanceira: Modulo = {
  id: 'educacao-financeira',
  trilhaId: 'fundamentos',
  numero: 1,
  titulo: 'Educação Financeira',
  subtitulo: 'A base de tudo que vem depois',
  iconName: 'GraduationCap',
  duracaoMin: 10,

  aprender: {
    oQueE:
      'Educação financeira é a capacidade de entender e usar bem diferentes habilidades relacionadas a dinheiro: orçar, poupar, investir e se proteger de dívidas ruins. Não é sobre decorar fórmulas complexas — é sobre tomar decisões melhores com o dinheiro que você já tem, por menor que seja.',
    porQueImporta:
      'Mais de 60% das famílias brasileiras estão endividadas, boa parte em dívidas caras como cartão rotativo e cheque especial, que podem passar de 400% ao ano em juros. Isso não acontece só por ganhar pouco — é falta de base. Aprender o essencial muda a trajetória financeira de uma vida inteira.',
    naPratica:
      'O rotativo do cartão girava perto de 400-450% ao ano em 2025-2026, enquanto a Selic (referência segura) estava em torno de 10-11% ao ano no mesmo período — uma dívida de cartão cresce até 40x mais rápido que um investimento seguro. Investindo R$ 200/mês a 0,8% ao mês por 20 anos, o total ultrapassa R$ 115 mil, só com constância.',
    passoAPasso: [
      'Anote todos os gastos por 30 dias, mesmo o cafezinho',
      'Separe em essenciais, desejos e dívidas',
      'Identifique dívidas com juro acima de 100% a.a. — são prioridade',
      'Defina a meta de guardar 10% da renda todo mês',
      'Abra conta em corretora/banco digital sem tarifa',
    ],
    errosComuns: [
      "Achar que é 'só para quem tem dinheiro sobrando'",
      'Focar em ganhar mais sem controlar o que já entra',
      'Pagar o mínimo da fatura, ativando o rotativo',
      'Comparar sua vida financeira com redes sociais',
      "Esperar 'sobrar' no fim do mês para guardar",
    ],
    comparativo: {
      titulo: 'Custo de crédito no Brasil (referência 2025-2026)',
      linhas: [
        { label: 'Cartão rotativo', valor: '400-450% a.a.' },
        { label: 'Cheque especial', valor: '130-150% a.a.' },
        { label: 'Empréstimo pessoal', valor: '60-100% a.a.' },
        { label: 'Selic (referência)', valor: '~10-11% a.a.' },
      ],
    },
    checklist: [
      'Anotei meus gastos dos últimos 30 dias',
      'Separei gastos essenciais, desejos e dívidas',
      'Identifiquei dívidas com juro acima de 100% a.a.',
      'Defini a meta de guardar 10% da renda',
      'Abri conta em corretora/banco digital sem tarifa',
    ],
    livroRelacionado: {
      livroId: 'pai-rico-pai-pobre',
      textoConexao:
        'Em Pai Rico, Pai Pobre, Kiyosaki reforça essa mesma ideia: o problema raramente é ganhar pouco — é não saber diferenciar o que constrói patrimônio do que só parece riqueza.',
    },
  },

  mapaMental: {
    label: 'Educação Financeira',
    ramos: [
      { id: 'orcamento', label: 'Orçamento', cor: '#00D4FF', filhos: ['Regra 50/30/20', 'Essenciais vs. desejos', 'Anotar gastos'] },
      { id: 'dividas', label: 'Dívidas', cor: '#EF4444', filhos: ['Rotativo (400%+ a.a.)', 'Cheque especial', 'Dívida boa vs. ruim'] },
      { id: 'reserva', label: 'Reserva de Emergência', cor: '#22C55E', filhos: ['3 a 6 meses de gastos', 'Liquidez diária', 'Tesouro Selic / CDB'] },
      { id: 'juros', label: 'Juro Composto', cor: '#FFC93C', filhos: ['A favor no investimento', 'Contra na dívida', 'Tempo é o maior aliado'] },
      { id: 'mentalidade', label: 'Mentalidade', cor: '#8B5CF6', filhos: ['Guardar primeiro', 'Constância > valor alto', 'Comparação social é armadilha'] },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'Depois de entender como o juro composto trabalha a seu favor (quando investe) ou contra você (quando deve), o próximo passo é ver isso em números. Use a Calculadora de Juros Compostos, na aba Ferramentas, para simular seus próprios aportes.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Digite um aporte inicial (pode ser R$ 0 se está começando do zero)',
      'Digite quanto pretende investir por mês, mesmo que seja R$ 50',
      'Use uma taxa próxima da Selic atual (~0,8% ao mês) como referência conservadora',
      'Veja o gráfico de crescimento e a tabela ano a ano — repare como o crescimento acelera nos últimos anos',
    ],
    exemploGuiado:
      'Exemplo: aportando R$ 200/mês a 0,8% ao mês por 20 anos, sem aporte inicial, o total ultrapassa R$ 115 mil — sendo boa parte disso só juros sobre juros, não dinheiro que você colocou.',
  },

  flashcards: [
    {
      id: 'fc1',
      frente: 'O que é educação financeira?',
      verso: 'A capacidade de entender e usar bem habilidades com dinheiro: orçar, poupar, investir e evitar dívidas ruins — decisões melhores no dia a dia, não fórmulas complexas.',
    },
    {
      id: 'fc2',
      frente: 'Qual é a dívida mais cara do Brasil?',
      verso: 'O rotativo do cartão de crédito, que pode passar de 400% ao ano — muito acima de qualquer outra modalidade comum.',
    },
    {
      id: 'fc3',
      frente: "Por que 'guardar primeiro' funciona melhor?",
      verso: 'Porque quase nunca sobra dinheiro no fim do mês. Separar a parcela assim que o dinheiro entra torna o hábito automático.',
    },
    {
      id: 'fc4',
      frente: 'O que é a regra 50/30/20?',
      verso: '50% da renda para essenciais, 30% para desejos, 20% para poupança e investimentos — um ponto de partida, não regra rígida.',
    },
    {
      id: 'fc5',
      frente: "Por que juro composto é 'faca de dois gumes'?",
      verso: 'Multiplica seu dinheiro com o tempo quando você investe, mas multiplica uma dívida na mesma velocidade quando você deve.',
    },
    {
      id: 'fc6',
      frente: 'Qual o primeiro passo prático?',
      verso: 'Anotar todos os gastos por 30 dias, sem exceção — impossível decidir bem sem saber para onde o dinheiro vai.',
    },
  ],

  quiz: [
    {
      pergunta: 'Qual dessas modalidades costuma ter a maior taxa de juros no Brasil?',
      alternativas: ['Tesouro Selic', 'Empréstimo consignado', 'Cartão de crédito rotativo', 'CDB de banco grande'],
      correta: 2,
      explicacao: 'O rotativo do cartão é historicamente o mais caro do mercado brasileiro, podendo superar 400% ao ano.',
    },
    {
      pergunta: 'Na regra 50/30/20, o que representam os 20%?',
      alternativas: ['Gastos essenciais', 'Desejos e lazer', 'Poupança e investimentos', 'Impostos'],
      correta: 2,
      explicacao: 'Os 20% finais são destinados a poupança e investimentos — a parte que constrói patrimônio.',
    },
    {
      pergunta: "Por que 'guardar primeiro' é mais eficaz que guardar o que sobra?",
      alternativas: ['Bancos exigem isso', 'Quase nunca sobra dinheiro se essa não for a prioridade', 'É obrigatório por lei', 'Não há diferença real'],
      correta: 1,
      explicacao: 'Gastos tendem a se expandir até ocupar toda a renda disponível. Separar a parcela logo evita esse efeito.',
    },
    {
      pergunta: "O que caracteriza uma 'dívida ruim'?",
      alternativas: ['Qualquer dívida, sem exceção', 'Dívidas com juros altos que não geram retorno', 'Financiamento de imóvel para alugar', 'Empréstimo para negócio lucrativo'],
      correta: 1,
      explicacao: 'Dívidas ruins financiam consumo imediato com juros altos, como o rotativo — sem gerar patrimônio.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ganhar bem para começar a aplicar educação financeira?',
      resposta: 'Não. Quem ganha pouco precisa de mais cuidado, porque cada decisão pesa proporcionalmente mais. Os princípios valem para qualquer faixa de renda.',
    },
    {
      pergunta: 'Quanto tempo leva para sentir diferença na vida financeira?',
      resposta: 'Os primeiros efeitos (sair do vermelho, parar de pagar rotativo) costumam aparecer em 2-3 meses de disciplina. Resultados de patrimônio visível levam anos.',
    },
    {
      pergunta: 'É melhor quitar dívidas ou começar a investir primeiro?',
      resposta: 'Depende da taxa de juros da dívida. Se ela cobra mais do que qualquer investimento renderia, quitar vem primeiro. Dívidas mais baratas podem conviver com um começo de investimento.',
    },
  ],
}
