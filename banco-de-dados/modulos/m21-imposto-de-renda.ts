import type { Modulo } from '@/types'

export const moduloImpostoDeRenda: Modulo = {
  id: 'imposto-de-renda',
  trilhaId: 'renda-fixa-previdencia',
  numero: 4,
  titulo: 'Imposto de Renda',
  subtitulo: 'Quem recolhe, quanto é e o que declarar',
  iconName: 'Receipt',
  duracaoMin: 15,

  aprender: {
    oQueE:
      'Cada tipo de investimento tem uma regra tributária própria: alíquota, responsável pelo recolhimento e forma de declarar. Em uns o imposto já sai antes de o dinheiro chegar em você; em outros, é você quem calcula e paga. Saber em qual grupo cada ativo seu está é o que evita multa e dor de cabeça.',
    porQueImporta:
      'A Receita cruza automaticamente os dados que a B3 e as corretoras enviam. Vender ação com lucro e não recolher o DARF gera multa e juros, e a cobrança chega. Do outro lado, muita gente paga imposto que não devia por não compensar prejuízo acumulado ou por não conhecer as isenções.',
    naPratica:
      'A divisão prática é simples. Renda fixa e fundos têm o imposto retido na fonte: você não faz nada. Ações, FIIs, ETFs, cripto e ativos no exterior exigem que você calcule e recolha via DARF até o último dia útil do mês seguinte à venda. Dois pontos concentram a maior parte dos erros: o cálculo do ganho usa o preço médio de todas as suas compras, não a última; e o prejuízo acumulado abate lucros futuros da mesma categoria, sem prazo para expirar. Por fim, mesmo sem ter vendido nada, você declara a posição em 31 de dezembro.',
    passoAPasso: [
      'Liste seus ativos e identifique quem recolhe o imposto de cada um',
      'Calcule o ganho de capital pelo preço médio de todas as compras',
      'Verifique se você tem prejuízo acumulado a compensar antes de recolher',
      'Emita e pague o DARF até o último dia útil do mês seguinte à venda',
      'Guarde notas de corretagem e comprovantes de DARF para a declaração anual',
    ],
    errosComuns: [
      'Achar que a isenção do rendimento de FII vale também na venda da cota',
      'Não compensar prejuízo acumulado e pagar imposto a mais',
      'Usar o preço da última compra em vez do preço médio',
      'Esquecer o DARF de uma venda pequena que passou do limite de isenção',
      'Não declarar ativos que não tiveram venda no ano — a posição é declarada mesmo assim',
    ],
    comparativo: {
      titulo: 'Quem recolhe e quanto (confira as regras vigentes)',
      linhas: [
        { label: 'Ações · venda comum', valor: '15% sobre o ganho · você via DARF · isenção mensal em vendas até o limite' },
        { label: 'Day trade', valor: '20% · você via DARF · sem isenção' },
        { label: 'FII · rendimento', valor: 'Isento para PF, com requisitos' },
        { label: 'FII · venda de cota', valor: '20% sobre o ganho · você via DARF · sem isenção' },
        { label: 'Renda fixa', valor: '22,5% a 15% regressivo · retido na fonte' },
        { label: 'LCI, LCA, CRI, CRA, deb. incentivada', valor: 'Isento para PF' },
        { label: 'Fundos abertos', valor: 'Regressivo + come-cotas · retido na fonte' },
        { label: 'ETF de ações', valor: '15% · você via DARF · sem a isenção mensal das ações' },
      ],
    },
    checklist: [
      'Sei quem recolhe o imposto de cada ativo que tenho',
      'Sei calcular ganho de capital pelo preço médio',
      'Verifiquei se tenho prejuízo acumulado a compensar',
      'Guardo minhas notas de corretagem organizadas',
      'Sei que declaro a posição de 31/12 mesmo sem ter vendido nada',
    ],
    livroRelacionado: {
      livroId: 'i-will-teach-you-to-be-rich',
      textoConexao: 'Ramit Sethi enfatiza sistemas automáticos e organizados como base de finanças pessoais saudáveis — manter as notas de corretagem organizadas e saber calcular o ganho de capital é essa mesma lógica de sistema aplicada ao imposto de renda.',
    },
  },

  mapaMental: {
    label: 'Imposto de Renda nos Investimentos',
    subtitulo: 'Para cada ativo: quem recolhe, quanto é e o que declarar',
    ramos: [
      {
        id: 'quem',
        label: 'Quem recolhe',
        cor: '#00D4FF',
        resumo: 'A divisão que organiza tudo',
        filhos: [
          { label: 'Retido na fonte', desc: 'Renda fixa e fundos. O imposto sai antes de o dinheiro chegar em você — não há nada a fazer.' },
          {
            label: 'Você mesmo, via DARF',
            desc: 'Ações, FIIs, ETFs, cripto e ativos no exterior. Você calcula e recolhe.',
            netos: [
              { label: 'Prazo', desc: 'Até o último dia útil do mês seguinte ao da venda com lucro.' },
              { label: 'Atraso', desc: 'Gera multa e juros. A Receita cruza os dados enviados pela B3 e pelas corretoras.' },
            ],
          },
        ],
      },
      {
        id: 'acoes',
        label: 'Ações',
        cor: '#EC4899',
        resumo: 'Onde mora a isenção mensal',
        filhos: [
          { label: 'Isenção mensal', desc: 'Vendas no mercado à vista até o limite mensal ficam isentas do imposto sobre o ganho. Confira o valor vigente.' },
          { label: 'Alíquota', desc: '15% sobre o lucro em operação comum. Day trade paga 20% e não tem isenção nenhuma.' },
          {
            label: 'Preço médio',
            desc: 'O custo de cada ação é a média ponderada de todas as suas compras, não a última.',
            netos: [
              { label: 'Por que importa', desc: 'Sem o preço médio correto, o ganho de capital fica errado e o imposto também.' },
              { label: 'Como manter', desc: 'Planilha simples atualizada a cada compra. Reconstruir anos depois é sofrimento.' },
            ],
          },
          { label: 'Compensar prejuízo', desc: 'Perdas anteriores abatem lucros futuros da mesma categoria, sem prazo para expirar. Muita gente esquece e paga a mais.' },
        ],
      },
      {
        id: 'fiis',
        label: 'FIIs',
        cor: '#8B5CF6',
        resumo: 'A confusão mais comum',
        filhos: [
          { label: 'Rendimento mensal', desc: 'Isento para pessoa física, desde que o fundo seja listado, tenha ao menos 50 cotistas e você não detenha 10% ou mais das cotas.' },
          { label: 'Venda da cota', desc: '20% sobre o ganho, sem isenção. A isenção vale para o rendimento, nunca para o ganho de capital.' },
          { label: 'Compensação separada', desc: 'Prejuízo de FII abate lucro de FII. Não se mistura com o resultado de ações.' },
        ],
      },
      {
        id: 'rendafixa',
        label: 'Renda fixa e fundos',
        cor: '#22C55E',
        resumo: 'Você não faz nada, mas precisa entender',
        filhos: [
          {
            label: 'Tabela regressiva',
            desc: 'De 22,5% a 15%, conforme o tempo de aplicação. Quanto mais tempo, menos imposto.',
            netos: [
              { label: 'Até 180 dias', desc: '22,5% sobre o rendimento.' },
              { label: 'Acima de 720 dias', desc: '15%, a menor alíquota possível.' },
            ],
          },
          { label: 'Isentos para PF', desc: 'LCI, LCA, CRI, CRA e debênture incentivada não pagam IR. É o que muda a comparação entre produtos.' },
          { label: 'Come-cotas', desc: 'Nos fundos abertos, o imposto é antecipado duas vezes por ano, o que reduz o efeito do juro composto ao longo do tempo.' },
        ],
      },
      {
        id: 'declaracao',
        label: 'Declaração anual',
        cor: '#FFC93C',
        resumo: 'O que entra mesmo sem venda',
        filhos: [
          { label: 'Bens e direitos', desc: 'Declara-se a posição em 31 de dezembro, mesmo que você não tenha vendido nada durante o ano.' },
          { label: 'Rendimentos isentos', desc: 'Dividendos e rendimento de FII entram em ficha própria de rendimentos isentos.' },
          { label: 'Informe de rendimentos', desc: 'A corretora e o banco disponibilizam. É o ponto de partida de toda a declaração.' },
          { label: 'Guardar tudo', desc: 'Notas de corretagem e DARFs pagos, por anos. É o que sustenta o preço médio e as compensações.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Comparador de Renda Fixa',
    intro:
      'A tributação muda completamente a comparação entre produtos. O comparador aplica a alíquota correta conforme o prazo e mostra qual opção entrega mais no bolso — que é frequentemente a que tem a taxa bruta menor.',
    passos: [
      'Abra Ferramentas → Comparador de Renda Fixa',
      'Digite um CDB tributado, por exemplo 108% do CDI',
      'Digite uma LCI isenta, por exemplo 93% do CDI',
      'Informe o prazo em meses para que a alíquota correta seja aplicada',
      'Compare os dois rendimentos líquidos e repita com prazos diferentes',
    ],
    exemploGuiado:
      'Exemplo: em 12 meses, o CDB de 108% do CDI paga 17,5% de IR sobre o rendimento. A LCI de 93%, isenta, entrega tudo. Nesse prazo, as duas ficam muito próximas. Em prazos acima de dois anos, quando a alíquota do CDB cai para 15%, ele volta a ganhar. Não existe resposta única: o prazo decide.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quem recolhe o imposto sobre a venda de ações?', verso: 'Você mesmo, via DARF, até o último dia útil do mês seguinte à venda com lucro. A corretora não faz isso por você.' },
    { id: 'fc2', frente: 'O rendimento de FII é isento. E a venda da cota?', verso: 'Não. A venda com lucro paga 20% sobre o ganho, sem nenhuma isenção. É o erro mais comum entre investidores de FII.' },
    { id: 'fc3', frente: 'O que é preço médio e por que importa?', verso: 'É a média ponderada de todas as suas compras de um ativo. É a partir dele que se calcula o ganho de capital — sem ele, o imposto sai errado.' },
    { id: 'fc4', frente: 'Prejuízo em investimento serve para alguma coisa?', verso: 'Serve: abate lucros futuros da mesma categoria, sem prazo para expirar. Não compensar é pagar imposto que não era devido.' },
    { id: 'fc5', frente: 'O que é come-cotas?', verso: 'A antecipação semestral do imposto de renda em fundos abertos. Reduz o efeito do juro composto porque tira dinheiro que continuaria rendendo.' },
    { id: 'fc6', frente: 'Preciso declarar investimento que não vendi?', verso: 'Sim. A posição em 31 de dezembro é declarada em bens e direitos, independentemente de ter havido venda no ano.' },
  ],

  quiz: [
    {
      pergunta: 'Você vendeu cotas de FII com lucro de R$ 5.000. O que fazer?',
      alternativas: ['Nada, FII é isento', 'Recolher 20% sobre o ganho via DARF até o último dia útil do mês seguinte', 'Recolher 15% na declaração anual', 'A corretora recolhe automaticamente'],
      correta: 1,
      explicacao: 'A isenção de FII vale só para o rendimento mensal. Ganho de capital na venda paga 20%, recolhidos por você via DARF.',
    },
    {
      pergunta: 'Você comprou ações em três momentos, a R$ 20, R$ 30 e R$ 40. Qual custo usar para calcular o ganho na venda?',
      alternativas: ['O da última compra, R$ 40', 'O da primeira compra, R$ 20', 'O preço médio ponderado de todas as compras', 'O menor dos três'],
      correta: 2,
      explicacao: 'A legislação exige o preço médio ponderado. Usar qualquer uma das compras isoladamente produz cálculo errado do ganho e do imposto.',
    },
    {
      pergunta: 'Qual destes é isento de IR para pessoa física?',
      alternativas: ['CDB', 'Fundo de renda fixa', 'LCI', 'Tesouro Selic'],
      correta: 2,
      explicacao: 'LCI, LCA, CRI, CRA e debêntures incentivadas são isentas para pessoa física. Os demais seguem a tabela regressiva de 22,5% a 15%.',
    },
    {
      pergunta: 'Como funciona a tabela regressiva de IR na renda fixa?',
      alternativas: ['A alíquota aumenta com o tempo', 'A alíquota diminui com o tempo, de 22,5% até 15%', 'É sempre 15%', 'Depende do valor investido'],
      correta: 1,
      explicacao: 'Quanto mais tempo o dinheiro fica aplicado, menor a alíquota: começa em 22,5% até 180 dias e chega a 15% após 720 dias.',
    },
  ],

  faq: [
    {
      pergunta: 'Perdi as notas de corretagem de anos atrás. E agora?',
      resposta: 'Dá para reconstruir pelo histórico da corretora e pela área do investidor da B3, que guarda a movimentação. Trabalhoso, mas possível. A partir de hoje, mantenha uma planilha simples atualizada a cada compra — evita esse problema para sempre.',
    },
    {
      pergunta: 'As regras de imposto mudam com frequência?',
      resposta: 'Sim, e esse é um dos assuntos que mais mudam no Brasil. Alíquotas, limites de isenção e regras para ativos no exterior foram alterados nos últimos anos. Confirme sempre na Receita Federal antes de agir com base em qualquer material, inclusive este.',
    },
    {
      pergunta: 'Vale a pena contratar contador para os investimentos?',
      resposta: 'Para carteira simples, com poucas operações, dá para fazer sozinho com organização. Quando entram muitas operações, ativos no exterior ou day trade, o custo do contador costuma ser menor que o risco de erro e a multa correspondente.',
    },
  ],
}
