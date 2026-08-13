import type { Modulo } from '@/types'

export const moduloOrganizacaoFinanceira: Modulo = {
  id: 'organizacao-financeira',
  trilhaId: 'fundamentos',
  numero: 2,
  titulo: 'Organização Financeira',
  subtitulo: 'Enxergar o mês antes que ele aconteça',
  iconName: 'ClipboardList',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'Organização financeira é o sistema que te permite responder, em qualquer dia do mês, três perguntas: quanto entrou, quanto já está comprometido e quanto está livre. Não é planilha bonita nem app cheio de gráfico — é visibilidade. Sem ela, toda decisão sobre dinheiro é chute.',
    porQueImporta:
      'Boa parte das famílias endividadas no Brasil não sabe dizer o valor total da própria dívida. A dor raramente é falta de renda: é falta de enxergar. Você não negocia, não corta e não prioriza aquilo que não consegue ver. Organizar é o passo que transforma "não sei para onde vai meu dinheiro" em um plano com números.',
    naPratica:
      'Um orçamento funcional cabe em três colunas: gastos fixos, gastos variáveis e dívidas. Quem tenta categorizar em quinze grupos abandona em duas semanas. Gastos anuais como IPVA, IPTU, seguro e material escolar quebram orçamentos todo janeiro — a solução é dividir por 12 e guardar mensalmente. E a regra que mais muda resultado não é cortar café: é programar a transferência do que vai ser guardado para o dia seguinte ao pagamento.',
    passoAPasso: [
      'Levante sua renda líquida real — o que cai na conta, não o salário bruto',
      'Liste todos os gastos fixos e some',
      'Liste suas dívidas com saldo, taxa e prazo de cada uma',
      'Calcule a sobra (ou o buraco): renda menos fixos menos parcelas',
      'Programe a transferência automática do que vai guardar para o dia do pagamento',
    ],
    errosComuns: [
      'Usar a renda bruta como base do orçamento',
      'Esquecer os gastos anuais (IPVA, IPTU, seguro, material escolar)',
      'Montar um orçamento perfeito demais, sem folga para imprevisto',
      'Anotar por três dias e parar',
      'Guardar o que sobra em vez de guardar primeiro',
    ],
    comparativo: {
      titulo: 'Três métodos de orçamento',
      linhas: [
        { label: '50/30/20', valor: 'Três baldes fixos — renda estável' },
        { label: 'Base zero', valor: 'Todo real com destino — controle máximo' },
        { label: 'Contas separadas', valor: 'Uma conta por finalidade — quem odeia anotar' },
        { label: 'Envelope digital', valor: 'Acabou o saldo, acabou — limite físico' },
      ],
    },
    checklist: [
      'Anotei minha renda líquida real',
      'Listei todos os meus gastos fixos',
      'Listei minhas dívidas com a taxa de juros de cada uma',
      'Calculei minha sobra mensal',
      'Programei a transferência automática no dia do pagamento',
    ],
    livroRelacionado: {
      livroId: 'pai-rico-pai-pobre',
      textoConexao:
        'Kiyosaki insiste que alfabetização financeira começa em saber ler o próprio balanço. É exatamente isso que um orçamento faz: transforma sensação em número.',
    },
  },

  mapaMental: {
    label: 'Organização Financeira',
    subtitulo: 'Enxergar o mês inteiro antes que ele aconteça',
    ramos: [
      {
        id: 'diagnostico',
        label: 'Diagnóstico',
        cor: '#00D4FF',
        resumo: 'A foto real, sem memória',
        filhos: [
          { label: 'Extrato de 90 dias', desc: 'A foto real dos seus hábitos. Memória sempre subestima gasto pequeno e frequente.' },
          { label: 'Renda média', desc: 'Para renda variável, use a média dos últimos 6 meses e planeje pelo mês mais fraco.' },
          { label: 'Comprometimento de renda', desc: 'Quanto por cento da renda já está prometido em parcelas antes do mês começar. Acima de 30% acende alerta.' },
          { label: 'Patrimônio líquido', desc: 'Tudo que você tem menos tudo que você deve. É o placar real — e pode dar negativo no começo, o que é normal.' },
        ],
      },
      {
        id: 'metodos',
        label: 'Métodos',
        cor: '#FFC93C',
        resumo: 'Escolher um e manter',
        filhos: [
          { label: '50/30/20', desc: 'Metade essencial, 30% desejo, 20% guardar. Bom para renda estável e para quem está começando.' },
          { label: 'Base zero', desc: 'Todo real ganha destino antes do mês começar; a sobra é zero de propósito. Controle máximo, exige disciplina.' },
          { label: 'Contas separadas', desc: 'Uma conta para fixos, uma para variáveis, uma para guardar. Funciona para quem odeia anotar.' },
          { label: 'Envelope digital', desc: 'Cartão ou carteira separada por categoria. Quando acaba, acabou — o limite é físico, não moral.' },
        ],
      },
      {
        id: 'dividas',
        label: 'Dívidas',
        cor: '#EF4444',
        resumo: 'Listar, ordenar, atacar',
        filhos: [
          { label: 'Listar tudo', desc: 'Credor, saldo, taxa e prazo em uma folha só. A maioria das pessoas nunca fez isso e se assusta com o total.' },
          {
            label: 'Ordem por taxa',
            desc: 'Atacar primeiro a de juro mais alto economiza mais dinheiro. É o método avalanche.',
            netos: [
              { label: 'Quando usar', desc: 'Quando você aguenta esperar o resultado aparecer. É o matematicamente ótimo.' },
            ],
          },
          {
            label: 'Ordem por valor',
            desc: 'Quitar a menor primeiro dá impulso psicológico. É o método bola de neve.',
            netos: [
              { label: 'Quando usar', desc: 'Quando falta motivação. Sentir uma dívida morrer vale mais que alguns reais de economia.' },
            ],
          },
          { label: 'Renegociação', desc: 'Credor aceita desconto grande em dívida antiga. Nunca aceite parcela que não cabe no orçamento real — você quebra o acordo e volta pior.' },
        ],
      },
      {
        id: 'reserva',
        label: 'Reserva',
        cor: '#22C55E',
        resumo: 'Construir por etapas',
        filhos: [
          { label: 'Meta em meses', desc: '3 a 6 meses de custo de vida para CLT; 6 a 12 para autônomo e MEI.' },
          { label: 'Construção por etapas', desc: 'Primeiro R$ 1.000, depois um mês de gastos, depois o alvo. Meta grande demais desanima antes do primeiro mês.' },
          { label: 'Conta separada', desc: 'Reserva na mesma conta do dia a dia vira gasto sem você perceber.' },
          { label: 'Regra de uso', desc: 'Só sai para emergência de verdade. Promoção não é emergência.' },
        ],
      },
      {
        id: 'automacao',
        label: 'Automação',
        cor: '#8B5CF6',
        resumo: 'Tirar a decisão do caminho',
        filhos: [
          { label: 'Transferência no dia do pagamento', desc: 'O dinheiro sai antes de você ver. É a única técnica que funciona para quase todo mundo.' },
          { label: 'Débito automático', desc: 'Evita multa e juro por esquecimento — mas exige conferir a fatura todo mês.' },
          { label: 'Alertas', desc: 'Aviso de saldo e de vencimento no celular custa nada e evita cheque especial.' },
          { label: 'Revisão mensal', desc: 'Vinte minutos por mês olhando o que saiu do plano. Sem revisão, todo método morre em dois meses.' },
        ],
      },
      {
        id: 'imprevistos',
        label: 'Imprevistos',
        cor: '#3B82F6',
        resumo: 'Orçamento sem folga é orçamento falso',
        filhos: [
          { label: 'Linha de folga', desc: 'De 5% a 10% do orçamento para o que não dá para prever. Sem isso, o plano quebra no primeiro pneu furado.' },
          { label: 'Gastos anuais', desc: 'IPVA, IPTU, seguro, material escolar. Divida por 12 e guarde mensalmente, para janeiro não ser catástrofe.' },
          { label: 'Seguros', desc: 'Seguro barato evita perda grande: residencial, de vida quando há dependentes, e do carro quando ele é ferramenta de trabalho.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Reserva de Emergência',
    intro:
      'Depois de calcular sua sobra mensal, o próximo número que você precisa é o tamanho da sua reserva. Ele muda bastante conforme o tipo de renda — e ver essa diferença na tela costuma mudar o plano de quem é autônomo.',
    passos: [
      'Abra Ferramentas → Reserva de Emergência',
      'Digite seu custo de vida mensal (o quanto você precisa para viver, não o quanto ganha)',
      'Escolha seu perfil de renda: CLT, autônomo ou MEI',
      'Veja o valor-alvo e quantos meses ele representa',
      'Divida esse alvo pela sua sobra mensal para descobrir em quantos meses você chega lá',
    ],
    exemploGuiado:
      'Exemplo: custo de vida de R$ 3.000 por mês. Como CLT, o alvo fica entre R$ 9.000 e R$ 18.000. Como autônomo, entre R$ 18.000 e R$ 36.000. Guardando R$ 500 por mês, o primeiro alvo leva cerca de 18 meses — e é por isso que a construção por etapas importa: R$ 1.000 primeiro, depois um mês de gastos, depois o resto.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Por que usar renda líquida e não a bruta?', verso: 'Porque a bruta inclui descontos que nunca chegam na sua conta: INSS, imposto, plano, vale. Orçar pela bruta cria uma sobra que não existe.' },
    { id: 'fc2', frente: 'O que é "gasto invisível"?', verso: 'O que aparece uma vez por ano e por isso é esquecido: IPVA, IPTU, seguro, material escolar. A solução é dividir por 12 e tratar como fixo.' },
    { id: 'fc3', frente: 'Qual dívida atacar primeiro?', verso: 'Pelo método avalanche, a de maior taxa de juros — economiza mais. Pelo método bola de neve, a de menor valor — dá impulso. Escolha pelo que você consegue manter.' },
    { id: 'fc4', frente: 'Qual o tamanho da reserva de emergência?', verso: 'De 3 a 6 meses do custo de vida para quem tem renda estável; de 6 a 12 meses para autônomo, MEI e renda variável.' },
    { id: 'fc5', frente: 'Por que automatizar vence disciplina?', verso: 'Porque tira a decisão do caminho. Se o dinheiro sai da conta antes de você ver, não há força de vontade envolvida todo mês.' },
    { id: 'fc6', frente: 'Por que um orçamento precisa de folga?', verso: 'Orçamento sem linha de imprevisto não é apertado, é falso. Ele quebra no primeiro imprevisto e leva junto a confiança no método.' },
  ],

  quiz: [
    {
      pergunta: 'Você tem rotativo do cartão aberto e nenhuma reserva. Qual a prioridade?',
      alternativas: ['Montar a reserva primeiro', 'Quitar o rotativo primeiro', 'Fazer os dois em partes iguais', 'Começar a investir em ações'],
      correta: 1,
      explicacao: 'O rotativo é a dívida mais cara do país. Nenhum investimento rende perto disso, então quitá-lo é o melhor retorno garantido que existe. Uma reserva mínima pode ser construída em paralelo, mas a prioridade é clara.',
    },
    {
      pergunta: 'O que é renda líquida?',
      alternativas: ['O salário informado no contrato', 'O que sobra depois de pagar as contas', 'O que efetivamente cai na conta após os descontos', 'A renda de todos da casa somada'],
      correta: 2,
      explicacao: 'Renda líquida é o que cai na conta depois de INSS, imposto, plano e demais descontos. É com ela que se monta o orçamento — nunca com a bruta.',
    },
    {
      pergunta: 'Onde deve ficar a reserva de emergência?',
      alternativas: ['Em ações de empresas sólidas', 'Em investimento com liquidez diária, como Tesouro Selic ou CDB de resgate imediato', 'Em um CDB de 3 anos que paga bem mais', 'Em imóvel, que é seguro'],
      correta: 1,
      explicacao: 'Reserva precisa de liquidez diária. Se você não consegue sacar no dia da emergência, ela não cumpre a função — por melhor que seja o rendimento.',
    },
    {
      pergunta: 'Qual destes é um gasto fixo?',
      alternativas: ['Delivery de comida', 'Combustível', 'Mensalidade da escola', 'Presente de aniversário'],
      correta: 2,
      explicacao: 'Gasto fixo repete todo mês praticamente no mesmo valor. Os outros três variam conforme o mês e são justamente onde existe espaço de manobra.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso mesmo anotar cada cafezinho?',
      resposta: 'Nos primeiros 30 dias, sim — é o diagnóstico. Depois, não. O objetivo da anotação detalhada é descobrir para onde o dinheiro vai; uma vez que você sabe, basta acompanhar as categorias.',
    },
    {
      pergunta: 'Monto a reserva ou quito a dívida primeiro?',
      resposta: 'Depende da taxa. Dívida acima de 100% ao ano vem antes de tudo. Dívidas mais baratas, como consignado ou financiamento, podem conviver com a construção de uma reserva mínima em paralelo.',
    },
    {
      pergunta: 'Qual app ou planilha usar?',
      resposta: 'O que você conseguir manter por seis meses. Planilha simples, caderno ou app — todos funcionam. A ferramenta é o detalhe menos importante da organização financeira.',
    },
  ],
}
