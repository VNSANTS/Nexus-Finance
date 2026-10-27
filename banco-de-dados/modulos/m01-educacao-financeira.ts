import type { Modulo } from '@/types'

export const moduloEducacaoFinanceira: Modulo = {
  id: 'educacao-financeira',
  trilhaId: 'fundamentos',
  numero: 1,
  titulo: 'Educação Financeira',
  subtitulo: 'Entenda o dinheiro e construa hábitos que apoiam suas escolhas.',
  iconName: 'GraduationCap',
  duracaoMin: 10,

  aprender: {
    oQueE:
      'Educação financeira é muito mais do que saber fazer contas ou entender termos complicados sobre dinheiro. É desenvolver conhecimentos e hábitos que ajudam você a tomar decisões mais conscientes sobre o que ganha, o que gasta e o que pretende construir no futuro. Isso envolve aprender a organizar o orçamento, controlar os gastos, poupar, investir com consciência e usar o crédito de forma responsável, evitando decisões que possam comprometer sua vida financeira. No fim, o objetivo não é simplesmente ter mais dinheiro. É aprender a fazer melhores escolhas com o dinheiro que você tem, seja qual for a sua renda, para alcançar seus objetivos e construir uma vida financeira mais equilibrada e segura.',
    porQueImporta:
      'Milhões de pessoas lidam com dívidas e decisões financeiras todos os meses. O problema não depende apenas da renda: também importa como ela é organizada e como o crédito é usado. Cartão e empréstimo podem ajudar quando cabem no orçamento, mas juros e parcelas podem reduzir o dinheiro disponível para outras prioridades. Aprender a acompanhar gastos, comparar o custo das dívidas e formar uma reserva ajuda a decidir com mais clareza. Você não precisa dominar economia para começar; escolha práticas que façam sentido para sua realidade e ajuste o plano quando ela mudar.',
    naPratica:
      'Os juros podem fazer uma diferença enorme na sua vida financeira. Enquanto investimentos podem fazer seu dinheiro crescer com o tempo, uma dívida cara faz o caminho contrário: quanto mais tempo ela permanece, maior pode ser o custo. O cartão de crédito é um bom exemplo. O Banco Central mostra que o crédito rotativo está entre as modalidades de crédito com juros mais elevados para pessoas físicas. Desde 2024, porém, os juros e encargos do rotativo e do parcelamento da fatura estão limitados a 100% do valor original da dívida. Agora pense no outro lado. Se você investir R$ 200 por mês durante 20 anos, obtendo uma rentabilidade média de 0,8% ao mês, poderá acumular cerca de R$ 144 mil, considerando juros compostos e aportes mensais constantes. Você teria colocado R$ 48 mil do próprio bolso. O restante viria do crescimento acumulado ao longo do tempo. É essa a força dos juros compostos: o tempo pode trabalhar a seu favor ou contra você. A diferença está nas escolhas que você faz hoje.',
    passoAPasso: [
      'Anote todos os seus gastos por 30 dias — até aquele cafezinho. Pequenas despesas também ajudam a revelar para onde seu dinheiro está indo.',
      'Organize os gastos em três grupos: essenciais, desejos e dívidas. Assim, fica mais fácil identificar o que é necessário e o que pode ser reduzido.',
      'Liste suas dívidas e comece pelas mais caras. Compare as taxas de juros e priorize aquelas que consomem mais dinheiro ao longo do tempo.',
      'Defina uma meta de poupança mensal. Se sua realidade permitir, comece tentando guardar 10% da renda e ajuste esse percentual conforme seu orçamento.',
      'Escolha uma instituição financeira adequada aos seus objetivos. Compare tarifas, serviços, segurança e opções de investimento antes de abrir uma conta.',
    ],
    errosComuns: [
      "Achar que é 'só para quem tem dinheiro sobrando'",
      'Focar em ganhar mais sem controlar o que já entra',
      'Pagar o mínimo da fatura, ativando o rotativo',
      'Comparar sua vida financeira com redes sociais',
      "Esperar 'sobrar' no fim do mês para guardar",
    ],
    comparativo: {
      titulo: 'Compare o custo total antes de contratar',
      linhas: [
        { label: 'Cartão rotativo', valor: 'Consulte a taxa e o CET da fatura' },
        { label: 'Cheque especial', valor: 'Compare o custo com outras opções' },
        { label: 'Empréstimo pessoal', valor: 'Confira o CET e o prazo total' },
        { label: 'Crédito consignado', valor: 'Avalie parcelas e custo total' },
      ],
    },
    checklist: [
      'Anotei meus gastos dos últimos 30 dias',
      'Separei gastos essenciais, desejos e dívidas',
      'Comparei o custo efetivo total das minhas dívidas',
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
      'Teste diferentes taxas hipotéticas e lembre que simulações não garantem resultados',
      'Veja o gráfico e compare cenários com taxas e prazos diferentes',
    ],
    exemploGuiado:
      'Exemplo hipotético: aportando R$ 200 por mês durante 20 anos, a uma taxa constante de 0,8% ao mês e sem aporte inicial, o saldo ficaria próximo de R$ 145 mil antes de impostos e custos. A taxa é apenas uma premissa de simulação; o resultado real pode ser diferente.',
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
      verso: 'O rotativo costuma estar entre as modalidades mais caras. Compare o Custo Efetivo Total (CET) e as condições atuais antes de contratar crédito.',
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
      verso: 'Quando há aportes e rendimento, os juros podem se acumular a favor do investidor; em uma dívida, podem aumentar o saldo devedor. Taxas, custos e prazos fazem diferença.',
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
      explicacao: 'O rotativo costuma ter custo elevado, mas as taxas variam. Compare o CET das opções disponíveis e evite generalizar uma taxa sem conferir as condições atuais.',
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
      resposta: 'Compare o custo efetivo da dívida com o retorno esperado dos investimentos, considerando impostos, riscos e liquidez. Em geral, priorize dívidas caras e preserve uma reserva mínima compatível com sua realidade.'
    },
  ],
}
