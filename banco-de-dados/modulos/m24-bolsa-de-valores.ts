import type { Modulo } from '@/types'

export const moduloBolsaDeValores: Modulo = {
  id: 'bolsa-de-valores',
  trilhaId: 'acoes-bolsa',
  numero: 1,
  titulo: 'Bolsa de Valores',
  subtitulo: 'O que acontece entre o clique e a ação na sua conta',
  iconName: 'BarChart3',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'A bolsa de valores é o ambiente onde pedaços de empresas trocam de dono, com regra, fiscalização e garantia de liquidação. No Brasil ela se chama B3. Quando você compra uma ação ali, não está apostando num número: está comprando participação numa empresa que existe, fatura, contrata e distribui lucro.',
    porQueImporta:
      'A maior barreira do brasileiro para a bolsa não é falta de dinheiro, é medo baseado em desinformação. Duas ideias travam quase todo mundo: "isso é cassino" e "preciso de muito dinheiro". As duas caem quando você entende como o mecanismo funciona — inclusive o que acontece com seus ativos se a corretora quebrar.',
    naPratica:
      'Seus ativos ficam registrados no seu CPF na custódia da B3, não na corretora. Dá para conferir isso de graça na área do investidor da própria B3, sem depender da plataforma onde você comprou. A liquidação é em D+2: o dinheiro da venda cai dois dias úteis depois. E existe o mercado fracionário, onde se compra de 1 a 99 ações — ou seja, dá para começar com o preço de uma ação só, não de um lote de cem.',
    passoAPasso: [
      'Entenda o papel da B3: negociação, custódia e garantia de liquidação',
      'Abra conta em corretora registrada na CVM, com corretagem zerada',
      'Faça o cadastro na área do investidor da B3 para conferir sua posição na fonte',
      'Dê sua primeira ordem no mercado fracionário, com valor pequeno',
      'Acompanhe a liquidação em D+2 e confira o ativo aparecendo na custódia',
    ],
    errosComuns: [
      'Achar que bolsa é sinônimo de day trade',
      'Achar que o Ibovespa representa o mercado inteiro',
      'Não saber que existe o fracionário e adiar por achar que precisa de muito dinheiro',
      'Comprar por indicação de rede social sem entender o que comprou',
      'Achar que a corretora é dona do seu dinheiro e dos seus ativos',
    ],
    comparativo: {
      titulo: 'Os principais índices da B3',
      linhas: [
        { label: 'Ibovespa', valor: 'Ações mais negociadas · concentrado em commodities e bancos' },
        { label: 'IBrX 100', valor: 'Mais amplo que o Ibovespa' },
        { label: 'SMLL', valor: 'Índice de small caps · empresas menores' },
        { label: 'IDIV', valor: 'Maiores pagadoras de dividendos' },
      ],
    },
    checklist: [
      'Entendi que meus ativos ficam custodiados no meu CPF na B3',
      'Abri conta em corretora registrada na CVM',
      'Acessei a área do investidor da B3',
      'Sei o que é liquidação em D+2',
      'Sei que posso comprar no fracionário, a partir de uma ação',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham diferencia investidor de especulador logo no início do livro — entender a estrutura de custódia, liquidação e registro da bolsa (como este módulo ensina) é parte do que torna alguém um investidor informado, não um apostador.',
    },
  },

  mapaMental: {
    label: 'Bolsa de Valores',
    subtitulo: 'Onde pedaços de empresas trocam de dono, com regra e fiscalização',
    ramos: [
      {
        id: 'b3',
        label: 'A B3',
        cor: '#EC4899',
        resumo: 'Negociação, custódia e garantia',
        filhos: [
          { label: 'O que é', desc: 'A bolsa do Brasil, onde se negociam ações, FIIs, ETFs e contratos futuros.' },
          {
            label: 'Câmara de liquidação',
            desc: 'Garante que quem comprou receba e quem vendeu seja pago. É o que permite negociar com um estranho sem risco de calote.',
            netos: [
              { label: 'D+2', desc: 'O prazo padrão de liquidação: dois dias úteis entre a operação e o acerto final.' },
            ],
          },
          { label: 'Custódia', desc: 'Seus ativos ficam registrados no seu CPF, não na corretora. Se ela quebrar, eles continuam seus.' },
          { label: 'Circuit breaker', desc: 'Pausa automática do pregão quando o índice cai demais. Serve para o mercado respirar e evitar pânico em cascata.' },
        ],
      },
      {
        id: 'indices',
        label: 'Índices',
        cor: '#3B82F6',
        resumo: 'Termômetros, não o mercado inteiro',
        filhos: [
          { label: 'Ibovespa', desc: 'O mais conhecido. Reúne as ações mais negociadas, ponderadas por liquidez — e é concentrado em poucos setores.' },
          { label: 'IBrX 100', desc: 'Mais amplo que o Ibovespa, com mais empresas na composição.' },
          { label: 'SMLL', desc: 'O índice das small caps, empresas de menor valor de mercado.' },
          { label: 'IDIV', desc: 'Reúne as maiores pagadoras de dividendos da bolsa.' },
        ],
      },
      {
        id: 'comprar',
        label: 'Como se compra',
        cor: '#00D4FF',
        resumo: 'Do clique até a custódia',
        filhos: [
          { label: 'Home broker', desc: 'A tela da corretora por onde a ordem é enviada ao mercado.' },
          {
            label: 'Lote e fracionário',
            desc: 'Lote padrão são 100 ações. No fracionário se compra de 1 a 99, com o ticker terminado em F.',
            netos: [
              { label: 'Por que importa', desc: 'É o que derruba a barreira de entrada: dá para começar com o preço de uma ação.' },
            ],
          },
          { label: 'Área do investidor B3', desc: 'Site gratuito onde você confere sua posição direto na fonte, sem depender da corretora.' },
        ],
      },
      {
        id: 'participantes',
        label: 'Quem está do outro lado',
        cor: '#FFC93C',
        resumo: 'E qual a sua vantagem',
        filhos: [
          { label: 'Pessoa física', desc: 'Você. A vantagem é não prestar contas a ninguém e poder esperar o tempo que quiser.' },
          { label: 'Institucional', desc: 'Fundos e gestoras. Movem volume grande e precisam mostrar resultado a cada trimestre — o que os obriga a ter pressa.' },
          { label: 'Estrangeiro', desc: 'Entra e sai conforme juros lá fora e risco daqui. Explica boa parte dos movimentos bruscos do Ibovespa.' },
          { label: 'Formador de mercado', desc: 'Contratado para garantir que sempre haja alguém comprando e vendendo determinado ativo.' },
        ],
      },
      {
        id: 'mitos',
        label: 'Mitos',
        cor: '#EF4444',
        resumo: 'O que trava quem nunca começou',
        filhos: [
          { label: '"Bolsa é cassino"', desc: 'Cassino tem resultado aleatório e casa que sempre ganha. Empresa tem lucro, patrimônio e distribui dividendo.' },
          { label: '"Precisa de muito dinheiro"', desc: 'No fracionário dá para começar com o preço de uma ação. O obstáculo é informação, não capital.' },
          { label: '"É só day trade"', desc: 'Day trade é uma forma de operar, e é justamente a que mais perde dinheiro entre pessoas físicas.' },
          { label: '"O Ibovespa é o mercado"', desc: 'Ele é concentrado em commodities e bancos. Existe muita empresa relevante fora dele.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'Antes de comprar a primeira ação, vale entender o que muda quando o dinheiro fica na bolsa por muito tempo — e por que renda variável exige prazo. A calculadora aqui serve para dimensionar expectativa, não para prever resultado.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Digite um aporte mensal realista para você',
      'Use uma taxa conservadora de renda variável no longo prazo, algo entre 0,7% e 0,9% ao mês',
      'Compare o resultado em 5, 10 e 20 anos',
      'Repare que o gráfico é uma média — na vida real haverá anos negativos no meio do caminho',
    ],
    exemploGuiado:
      'Exemplo: R$ 300 por mês a 0,8% ao mês por 20 anos passam de R$ 170 mil. Mas essa curva suave não existe na prática: haverá anos de queda de 20% ou 30%. Quem entende isso antes de começar não vende no fundo — e é essa diferença de comportamento, não a escolha da ação, que define o resultado final da maioria das pessoas.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Onde ficam seus ativos depois da compra?', verso: 'Na custódia da B3, registrados no seu CPF. A corretora é apenas a intermediária — se ela quebrar, seus ativos continuam seus.' },
    { id: 'fc2', frente: 'O que é liquidação em D+2?', verso: 'O prazo padrão: o acerto financeiro de uma compra ou venda de ações se conclui dois dias úteis depois da operação.' },
    { id: 'fc3', frente: 'O que é o mercado fracionário?', verso: 'O ambiente onde se compra de 1 a 99 ações, em vez do lote padrão de 100. O ticker leva um F no final.' },
    { id: 'fc4', frente: 'O Ibovespa representa toda a bolsa?', verso: 'Não. Ele reúne as ações mais negociadas, ponderadas por liquidez, e é concentrado em commodities e bancos. Existe muita empresa relevante fora dele.' },
    { id: 'fc5', frente: 'O que é circuit breaker?', verso: 'A pausa automática do pregão quando o índice cai além de um limite. Serve para interromper o pânico e permitir que o mercado reavalie.' },
    { id: 'fc6', frente: 'Qual a vantagem do investidor pessoa física sobre o profissional?', verso: 'Tempo. Ele não presta contas trimestrais a cotistas e pode esperar anos por uma tese, o que um gestor raramente pode.' },
  ],

  quiz: [
    {
      pergunta: 'Sua corretora quebra. O que acontece com as ações que você comprou por ela?',
      alternativas: ['Você perde tudo', 'Continuam registradas no seu CPF na custódia da B3 e podem ser transferidas para outra corretora', 'O FGC devolve o valor', 'Viram crédito na falência'],
      correta: 1,
      explicacao: 'A corretora é intermediária, não proprietária. Os ativos ficam custodiados no seu CPF na B3 e podem ser transferidos. O que você perde é o acesso pela plataforma, não o patrimônio.',
    },
    {
      pergunta: 'Quem fiscaliza o mercado de ações no Brasil?',
      alternativas: ['O Banco Central', 'A CVM', 'A Receita Federal', 'A própria B3, sem supervisão externa'],
      correta: 1,
      explicacao: 'A CVM é a autarquia responsável por fiscalizar o mercado de valores mobiliários. O Banco Central cuida da política monetária e da saúde do sistema bancário.',
    },
    {
      pergunta: 'Você quer comprar 30 ações de uma empresa. Como fazer?',
      alternativas: ['Não é possível, o mínimo é 100', 'Pelo mercado fracionário, usando o ticker com F no final', 'Precisa ligar para a corretora', 'Só investidores qualificados podem'],
      correta: 1,
      explicacao: 'O mercado fracionário existe justamente para permitir compras de 1 a 99 ações, com o mesmo papel e o ticker acrescido de F.',
    },
    {
      pergunta: 'Qual afirmação sobre day trade é correta?',
      alternativas: ['É a forma mais comum de investir em bolsa', 'É obrigatório para quem opera na B3', 'É uma forma de operar em que a maioria das pessoas físicas perde dinheiro de forma consistente', 'É isento de imposto'],
      correta: 2,
      explicacao: 'Estudos brasileiros e internacionais mostram que a ampla maioria dos operadores individuais de day trade perde dinheiro. É uma modalidade específica, não sinônimo de investir em bolsa — e ainda é tributada em 20%, sem isenção.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso acompanhar o mercado todo dia?',
      resposta: 'Não. Para quem investe com horizonte de anos, acompanhar diariamente aumenta a ansiedade e a chance de tomar decisão ruim. Uma revisão trimestral dos resultados das empresas resolve.',
    },
    {
      pergunta: 'Quanto preciso para começar?',
      resposta: 'O preço de uma ação, pelo fracionário. Mas o valor importa menos que a ordem: dívida cara quitada e reserva de emergência montada vêm antes de qualquer compra na bolsa.',
    },
    {
      pergunta: 'A bolsa pode fechar e eu perder tudo?',
      resposta: 'Empresas individuais podem quebrar, e é por isso que se diversifica. A bolsa como instituição funciona com garantia de liquidação e fiscalização da CVM. O risco real é ter dinheiro de curto prazo aplicado em renda variável e precisar sacar num ano ruim.',
    },
  ],
}
