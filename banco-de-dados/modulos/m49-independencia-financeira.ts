import type { Modulo } from '@/types'

export const moduloIndependenciaFinanceira: Modulo = {
  id: 'independencia-financeira',
  trilhaId: 'vida-financeira',
  numero: 1,
  titulo: 'Independência Financeira',
  subtitulo: 'Calcular o seu número e o prazo até ele',
  iconName: 'Target',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Independência financeira é o ponto em que a renda dos seus investimentos cobre o seu custo de vida, e trabalhar vira escolha em vez de necessidade. É um número, não uma sensação — e ele depende muito mais do seu custo de vida do que do seu salário.',
    porQueImporta:
      'Sem calcular o número, o objetivo permanece vago e a meta se move sozinha toda vez que a renda sobe. Com o número na mão, cada aporte passa a ter um destino mensurável, e é possível saber, com razoável precisão, quantos anos faltam.',
    naPratica:
      'A regra mais conhecida é a dos 4%: um patrimônio de 25 vezes o gasto anual permitiria retirar cerca de 4% ao ano. Ela vem de um estudo americano, com carteira e inflação de lá — no Brasil, com juro real historicamente mais alto e inflação mais volátil, o mais prudente é trabalhar com uma faixa entre 25 e 33 vezes o gasto anual. E há um detalhe que muda tudo: o prazo até o número depende mais da sua taxa de poupança do que da rentabilidade. Quem guarda 30% da renda chega muito antes de quem guarda 10% com um rendimento melhor.',
    passoAPasso: [
      'Calcule seu custo de vida anual real, não o desejado',
      'Multiplique por 25 e por 33 para obter a faixa do seu número',
      'Calcule sua taxa de poupança atual: quanto por cento da renda você guarda',
      'Estime o prazo usando um retorno real conservador, não nominal',
      'Revise o cálculo uma vez por ano, ou quando a vida mudar',
    ],
    errosComuns: [
      'Usar retorno nominal em vez de real na projeção',
      'Esquecer imposto e inflação na fase de retirada',
      'Calcular sobre um custo de vida irreal',
      'Tratar como tudo ou nada, ignorando as etapas intermediárias',
      'Ignorar que gastos com saúde crescem bastante com a idade',
    ],
    comparativo: {
      titulo: 'Os quatro níveis de independência',
      linhas: [
        { label: 'Coast FI', valor: 'O que já tem cresce sozinho até a aposentadoria, sem novos aportes' },
        { label: 'Barista FI', valor: 'A renda cobre parte das contas · você trabalha menos' },
        { label: 'Lean FI', valor: 'Cobre o custo de vida essencial, com estilo simples' },
        { label: 'Fat FI', valor: 'Cobre o padrão de vida atual com folga' },
      ],
    },
    checklist: [
      'Calculei meu custo de vida anual real',
      'Defini a faixa do meu número, entre 25 e 33 vezes',
      'Calculei minha taxa de poupança atual',
      'Estimei o prazo com retorno real conservador',
      'Identifiquei em qual dos quatro níveis estou hoje',
    ],
    livroRelacionado: {
      livroId: 'seu-dinheiro-ou-sua-vida',
      textoConexao: 'O livro trata dinheiro como tempo de vida trocado por trabalho — a base filosófica exata por trás do conceito de calcular quantas vezes o custo de vida anual é preciso acumular para não depender mais do salário.',
    },
  },

  mapaMental: {
    label: 'Independência Financeira',
    subtitulo: 'O ponto em que trabalhar vira escolha, não necessidade',
    ramos: [
      {
        id: 'niveis',
        label: 'Os quatro níveis',
        cor: '#22C55E',
        resumo: 'Não é tudo ou nada',
        filhos: [
          { label: 'Coast FI', desc: 'Você já tem o suficiente para o dinheiro crescer sozinho até a aposentadoria, mesmo parando de aportar hoje.' },
          { label: 'Barista FI', desc: 'A renda passiva cobre parte das contas. Você pode trabalhar menos, ou no que gosta e paga menos.' },
          { label: 'Lean FI', desc: 'Cobre o custo de vida essencial, com um estilo de vida mais simples.' },
          { label: 'Fat FI', desc: 'Cobre o padrão de vida atual com folga, sem precisar cortar nada.' },
        ],
      },
      {
        id: 'matematica',
        label: 'A matemática',
        cor: '#00D4FF',
        resumo: 'Custo de vida é o que manda',
        filhos: [
          { label: 'Custo de vida anual', desc: 'O número mais importante da conta, e o que quase ninguém sabe de cabeça. Some 12 meses reais, não o mês bom.' },
          {
            label: 'Regra dos 4%',
            desc: 'Patrimônio de 25 vezes o gasto anual permitiria retirar cerca de 4% ao ano.',
            netos: [
              { label: 'A ressalva brasileira', desc: 'O estudo é americano, com outra inflação e outra carteira. Aqui, trabalhe com a faixa de 25 a 33 vezes.' },
            ],
          },
          { label: 'Taxa de poupança', desc: 'Quanto por cento da renda você guarda. É ela que define o prazo, mais do que a rentabilidade.' },
          { label: 'A conta invertida', desc: 'Reduzir o custo de vida diminui o número necessário e aumenta o aporte ao mesmo tempo. Trabalha dos dois lados.' },
        ],
      },
      {
        id: 'retorno',
        label: 'Retorno real',
        cor: '#FFC93C',
        resumo: 'Onde a projeção engana',
        filhos: [
          { label: 'Nominal engana', desc: 'Projetar com 12% ao ano ignorando 5% de inflação atrasa a sua vida em muitos anos.' },
          { label: 'Ser conservador', desc: 'Errar a premissa para cima é o erro que só aparece no fim, quando não dá mais tempo de corrigir.' },
          { label: 'Imposto entra na conta', desc: 'A retirada também é tributada, dependendo do ativo. Projete o valor líquido, não o bruto.' },
        ],
      },
      {
        id: 'retirada',
        label: 'Fase de retirada',
        cor: '#3B82F6',
        resumo: 'A parte que ninguém planeja',
        filhos: [
          { label: 'Risco da sequência', desc: 'Uma crise logo nos primeiros anos de retirada machuca muito mais que a mesma crise dez anos depois.' },
          { label: 'Reserva maior', desc: 'Na fase de renda, ter mais caixa evita ser obrigado a vender ativo durante uma queda.' },
          { label: 'A renda precisa crescer', desc: 'Se não acompanhar a inflação, o mesmo valor compra menos a cada ano de aposentadoria.' },
        ],
      },
      {
        id: 'erros',
        label: 'Erros de cálculo',
        cor: '#EF4444',
        resumo: 'O que distorce o número',
        filhos: [
          { label: 'Custo de vida irreal', desc: 'Calcular sobre o gasto que você gostaria de ter, e não sobre o que realmente gasta.' },
          { label: 'Esquecer a saúde', desc: 'Plano de saúde encarece bastante com a idade e costuma ficar de fora da projeção.' },
          { label: 'Tudo ou nada', desc: 'Cada nível intermediário já muda a sua vida. Coast FI e Barista FI chegam muito antes do número final.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Aposentadoria (FIRE)',
    intro:
      'Esta é a calculadora mais alinhada a um módulo em todo o app. Ela transforma o custo de vida mensal no patrimônio necessário e estima o prazo a partir do seu aporte.',
    passos: [
      'Abra Ferramentas → Aposentadoria (FIRE)',
      'Digite o gasto mensal que você quer sustentar, com base no custo real de hoje',
      'Veja o patrimônio necessário pela regra dos 4%',
      'Informe seu aporte mensal e um retorno real conservador',
      'Refaça com um gasto mensal 20% menor e observe o prazo encurtar',
    ],
    exemploGuiado:
      'Exemplo: custo de vida de R$ 6.000 por mês significa R$ 72 mil por ano, e um número entre R$ 1,8 milhão e R$ 2,4 milhões. Agora reduza o custo para R$ 4.800: o número cai para algo entre R$ 1,44 milhão e R$ 1,9 milhão, e o aporte disponível aumenta ao mesmo tempo. Reduzir custo de vida trabalha dos dois lados da equação — por isso ele é a alavanca mais poderosa.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é a regra dos 4%?', verso: 'A ideia de que um patrimônio de 25 vezes o gasto anual permitiria retirar cerca de 4% ao ano. É referência americana e no Brasil convém usar uma faixa mais conservadora.' },
    { id: 'fc2', frente: 'O que define mais o prazo até a independência: rentabilidade ou taxa de poupança?', verso: 'A taxa de poupança. Quem guarda 30% da renda chega muito antes de quem guarda 10% com um rendimento um pouco melhor.' },
    { id: 'fc3', frente: 'O que é Coast FI?', verso: 'O ponto em que o que você já acumulou cresce sozinho até a aposentadoria, mesmo que você pare de aportar hoje.' },
    { id: 'fc4', frente: 'Por que projetar com retorno real e não nominal?', verso: 'Porque o nominal ignora a inflação. Projetar com 12% quando o real é 7% cria um plano que só existe no papel.' },
    { id: 'fc5', frente: 'O que é risco da sequência de retornos?', verso: 'O fato de uma crise nos primeiros anos de retirada causar dano muito maior do que a mesma crise anos depois, porque você vende ativos em baixa para viver.' },
    { id: 'fc6', frente: 'Por que reduzir o custo de vida é a alavanca mais poderosa?', verso: 'Porque diminui o patrimônio necessário e aumenta o valor disponível para aportar ao mesmo tempo. Trabalha dos dois lados da conta.' },
  ],

  quiz: [
    {
      pergunta: 'Seu custo de vida é de R$ 5.000 por mês. Qual o patrimônio aproximado pela regra dos 25 vezes?',
      alternativas: ['R$ 600 mil', 'R$ 1,5 milhão', 'R$ 3 milhões', 'R$ 900 mil'],
      correta: 1,
      explicacao: 'R$ 5.000 por mês são R$ 60 mil por ano. Multiplicado por 25, dá R$ 1,5 milhão. Considerando a faixa conservadora de até 33 vezes, o alvo sobe para cerca de R$ 2 milhões.',
    },
    {
      pergunta: 'O que mais encurta o prazo até a independência financeira?',
      alternativas: ['Encontrar um investimento com rentabilidade 1% maior', 'Aumentar a taxa de poupança', 'Acompanhar o mercado diariamente', 'Concentrar a carteira nas melhores ações'],
      correta: 1,
      explicacao: 'Nos primeiros anos, o aporte pesa muito mais que a rentabilidade. Elevar a taxa de poupança reduz o número necessário e acelera a acumulação simultaneamente.',
    },
    {
      pergunta: 'Por que a regra dos 4% exige adaptação no Brasil?',
      alternativas: ['Porque aqui não existe bolsa de valores', 'Porque foi criada com dados americanos, com inflação e carteira diferentes das nossas', 'Porque no Brasil não há inflação', 'Porque a regra é proibida pela CVM'],
      correta: 1,
      explicacao: 'A regra nasceu de um estudo com histórico do mercado americano. Com juro real mais alto e inflação mais volátil, o razoável aqui é trabalhar com uma faixa mais ampla e conservadora.',
    },
    {
      pergunta: 'O que é o risco da sequência de retornos?',
      alternativas: ['O risco de a corretora quebrar', 'O dano maior causado por uma crise logo no início da fase de retirada', 'O risco de a inflação subir', 'A chance de escolher a ação errada'],
      correta: 1,
      explicacao: 'Quem começa a sacar justo quando o mercado cai vende ativos desvalorizados para viver, o que compromete o patrimônio de forma difícil de recuperar depois.',
    },
  ],

  faq: [
    {
      pergunta: 'Independência financeira significa parar de trabalhar?',
      resposta: 'Significa poder escolher. Muita gente que atinge o número continua trabalhando, só que sem depender do salário — o que muda completamente a relação com o trabalho, com chefe e com projetos que valem a pena.',
    },
    {
      pergunta: 'É possível chegar lá com salário médio?',
      resposta: 'É, e o fator decisivo é a taxa de poupança, não o valor do salário. Quem consegue guardar uma fatia grande da renda e mantém isso por décadas chega. O que impede a maioria é o padrão de vida subir junto com a renda.',
    },
    {
      pergunta: 'Preciso atingir o número final para mudar de vida?',
      resposta: 'Não, e essa é a parte mais subestimada. Coast FI e Barista FI chegam muito antes e já alteram decisões importantes: aceitar um trabalho que paga menos, reduzir jornada, mudar de área. As etapas intermediárias valem por si.',
    },
  ],
}
