import type { Modulo } from '@/types'

export const moduloCambio: Modulo = {
  id: 'cambio',
  trilhaId: 'economia-mercado',
  numero: 9,
  titulo: 'Câmbio',
  subtitulo: 'Sua vida já é parcialmente dolarizada',
  iconName: 'DollarSign',
  duracaoMin: 11,

  aprender: {
    oQueE:
      'Câmbio é o preço de uma moeda em relação a outra. Para o brasileiro, na prática, é o preço do dólar em reais. Ele não é apenas assunto de quem viaja: define o custo de uma parte relevante do que se consome no país e o valor em reais de qualquer investimento no exterior.',
    porQueImporta:
      'Combustível, trigo, fertilizante, eletrônico e maquinário são cotados em dólar. Quando o dólar sobe, esses preços sobem, e o efeito chega ao supermercado antes de chegar à sua carteira. Ou seja: você já tem exposição cambial mesmo sem nunca ter comprado um dólar — a questão é se essa exposição é proposital ou acidental.',
    naPratica:
      'Três coisas movem o câmbio de forma consistente: a diferença entre os juros daqui e os de fora, a percepção de risco do país, e o fluxo de comércio e investimento. Existem também três cotações diferentes que confundem: a comercial, que aparece no noticiário; a de turismo, sempre mais cara por causa do spread; e a PTAX, média oficial usada em contratos. E há um comportamento previsível que custa caro: comprar dólar em pânico, depois de uma alta forte, que é justamente quando ele está caro.',
    passoAPasso: [
      'Entenda o que move o câmbio: juros relativos, risco-país e fluxo comercial',
      'Estime quanto do seu custo de vida é influenciado pelo dólar',
      'Escolha o veículo de exposição mais simples que resolva o seu caso',
      'Defina um percentual alvo da carteira e mantenha',
      'Faça aportes graduais em vez de tentar acertar o momento do câmbio',
    ],
    errosComuns: [
      'Comprar dólar em pânico, depois de uma alta forte',
      'Confundir cotação comercial, turismo e PTAX',
      'Ignorar IOF e spread na comparação entre formas de comprar',
      'Achar que dólar é investimento — ele protege, mas não gera renda',
      'Esquecer o imposto sobre o ganho na variação cambial',
    ],
    comparativo: {
      titulo: 'Formas de se expor ao dólar',
      linhas: [
        { label: 'ETF internacional na B3', valor: 'Compra em reais, como ação · o caminho mais simples' },
        { label: 'BDR', valor: 'Recibo de ação estrangeira negociado aqui, em reais' },
        { label: 'Fundo cambial', valor: 'Prático · costuma cobrar taxa de administração alta' },
        { label: 'Conta no exterior', valor: 'Mais controle · câmbio, IOF e declarações extras' },
        { label: 'Dólar em espécie', valor: 'Só para viagem · spread alto e não rende nada' },
      ],
    },
    checklist: [
      'Sei o que move o câmbio',
      'Sei diferenciar cotação comercial, turismo e PTAX',
      'Escolhi meu veículo de exposição internacional',
      'Defini um percentual alvo e não pretendo alterá-lo por notícia',
      'Sei que dólar protege, mas não gera renda',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A filosofia Boglehead de manter um percentual alvo simples e não reagir a notícias de curto prazo se aplica diretamente à exposição cambial — definir um percentual e não alterá-lo por manchete é exatamente essa disciplina.',
    },
  },

  mapaMental: {
    label: 'Câmbio',
    subtitulo: 'Sua vida já é parcialmente dolarizada, mesmo que você nunca tenha comprado um dólar',
    ramos: [
      {
        id: 'move',
        label: 'O que move o dólar',
        cor: '#3B82F6',
        resumo: 'Três forças principais',
        filhos: [
          { label: 'Diferença de juros', desc: 'Juro alto no Brasil atrai capital estrangeiro e tende a valorizar o real. Juro alto lá fora faz o contrário.' },
          { label: 'Risco-país', desc: 'Incerteza política ou fiscal faz investidor sair, e o dólar sobe. É o canal mais rápido e mais visível.' },
          { label: 'Balança comercial', desc: 'Exportar mais que importar traz dólares para o país e pressiona a cotação para baixo.' },
          { label: 'Dólar global', desc: 'Quando os EUA sobem juros, o dólar se fortalece contra quase todas as moedas, não só o real.' },
        ],
      },
      {
        id: 'cotacoes',
        label: 'Cotações diferentes',
        cor: '#00D4FF',
        resumo: 'Não existe "o" dólar',
        filhos: [
          { label: 'Comercial', desc: 'Usada em importação e exportação. É a que aparece no noticiário e serve de referência.' },
          { label: 'Turismo', desc: 'A do papel-moeda, sempre mais cara por causa do spread cobrado por quem vende.' },
          { label: 'PTAX', desc: 'Média oficial calculada pelo Banco Central, usada em contratos e liquidações.' },
        ],
      },
      {
        id: 'expor',
        label: 'Como se expor',
        cor: '#FFC93C',
        resumo: 'Do mais simples ao mais complexo',
        filhos: [
          {
            label: 'ETF internacional na B3',
            desc: 'Compra em reais, como se fosse ação. Sem conta no exterior, sem câmbio, sem burocracia.',
            netos: [
              { label: 'Dupla exposição', desc: 'Você fica exposto ao ativo lá fora e ao câmbio ao mesmo tempo. Pode ganhar ou perder nas duas pontas.' },
            ],
          },
          { label: 'BDR', desc: 'Recibo de ação estrangeira negociado na B3, também em reais. Serve para quem quer empresa específica.' },
          { label: 'Fundo cambial', desc: 'Prático e disponível em qualquer corretora, mas a taxa de administração costuma corroer boa parte do benefício.' },
          { label: 'Conta no exterior', desc: 'Mais controle e mais opções, com custo de câmbio, IOF e obrigações declaratórias específicas.' },
        ],
      },
      {
        id: 'custos',
        label: 'Custos e impostos',
        cor: '#EF4444',
        resumo: 'O que come o retorno',
        filhos: [
          { label: 'Spread', desc: 'A diferença entre o preço de compra e o de venda. Em casa de câmbio e cartão de viagem, é alto.' },
          { label: 'IOF', desc: 'Imposto sobre operação de câmbio, com alíquotas diferentes conforme a finalidade. Confira a regra vigente.' },
          { label: 'IR sobre o ganho', desc: 'A valorização cambial é tributada quando você realiza o ganho. Vale conferir a regra específica do veículo escolhido.' },
        ],
      },
      {
        id: 'protecao',
        label: 'Proteção, não aposta',
        cor: '#22C55E',
        resumo: 'A postura que evita o erro caro',
        filhos: [
          { label: 'Dólar não gera renda', desc: 'Não paga juro nem dividendo. Serve para proteger patrimônio, não para multiplicá-lo.' },
          { label: 'Percentual alvo', desc: 'Definir uma fatia da carteira e mantê-la, sem tentar acertar o momento certo de comprar.' },
          { label: 'Aporte gradual', desc: 'Entrar aos poucos dilui o risco de fazer todo o câmbio em um único momento ruim.' },
          {
            label: 'Comprar em pânico',
            desc: 'O erro mais previsível: comprar depois de uma alta forte, que é exatamente quando está caro.',
            netos: [
              { label: 'Por que acontece', desc: 'A alta vira manchete, a manchete gera medo, e o medo gera compra. É o ciclo comportamental completo.' },
            ],
          },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'A melhor forma de lidar com câmbio é através de uma regra de alocação, não de previsão. O rebalanceamento faz você comprar dólar quando ele está barato e reduzir quando sobe, sem depender de acertar a direção.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Defina um alvo para a fatia internacional, por exemplo 15% da carteira',
      'Informe os valores atuais de cada classe',
      'Simule uma alta forte do dólar e veja a fatia internacional ultrapassar o alvo',
      'Observe que a regra manda reduzir, ou seja, realizar parte do ganho justamente na alta',
    ],
    exemploGuiado:
      'Exemplo: com alvo de 15% internacional, uma alta forte do dólar leva essa fatia para 22%. A regra manda reduzir de volta para 15%, realizando parte do ganho. Se o dólar cair depois, a fatia encolhe para 10% e a regra manda comprar. Você acaba comprando barato e vendendo caro sem ter previsto absolutamente nada.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Por que o câmbio afeta quem nunca viaja?', verso: 'Porque combustível, trigo, fertilizante e eletrônico são cotados em dólar. O câmbio chega ao supermercado antes de chegar à carteira.' },
    { id: 'fc2', frente: 'O que move o câmbio de forma mais consistente?', verso: 'A diferença entre os juros daqui e os de fora, a percepção de risco do país, e o fluxo de comércio e investimento.' },
    { id: 'fc3', frente: 'Qual a diferença entre dólar comercial, turismo e PTAX?', verso: 'Comercial é a referência do noticiário, turismo é o papel-moeda com spread maior, e PTAX é a média oficial do Banco Central usada em contratos.' },
    { id: 'fc4', frente: 'Dólar é investimento?', verso: 'Não no sentido de multiplicar patrimônio: ele não paga juro nem dividendo. É proteção, e o retorno vem apenas da variação de preço.' },
    { id: 'fc5', frente: 'Qual a forma mais simples de ter exposição cambial?', verso: 'ETF internacional negociado na B3, comprado em reais como se fosse ação. Sem conta no exterior e sem burocracia adicional.' },
    { id: 'fc6', frente: 'Qual o erro mais previsível com câmbio?', verso: 'Comprar dólar em pânico depois de uma alta forte. A alta vira manchete, a manchete gera medo, e a compra acontece no pior preço.' },
  ],

  quiz: [
    {
      pergunta: 'O dólar subiu 15% em duas semanas e está em todos os jornais. Qual a atitude mais coerente?',
      alternativas: ['Comprar agora antes que suba mais', 'Manter o percentual alvo definido e, se necessário, rebalancear reduzindo a exposição', 'Vender toda a carteira internacional', 'Alavancar em contratos futuros'],
      correta: 1,
      explicacao: 'Comprar depois da alta é o comportamento mais previsível e mais caro. Uma regra de alocação alvo faria o contrário: reduzir a fatia que subiu além do planejado.',
    },
    {
      pergunta: 'Por que juros altos no Brasil tendem a valorizar o real?',
      alternativas: ['Porque encarecem as importações', 'Porque atraem capital estrangeiro em busca de rendimento maior', 'Porque o governo compra reais', 'Porque reduzem a inflação'],
      correta: 1,
      explicacao: 'Juro mais alto atrai investidor de fora, que precisa converter dólares em reais para aplicar aqui. Esse fluxo aumenta a demanda por real e valoriza a moeda.',
    },
    {
      pergunta: 'Qual característica é verdadeira sobre o dólar como ativo?',
      alternativas: ['Paga juros mensais', 'Distribui dividendos', 'Não gera renda: o retorno vem apenas da variação de preço', 'É garantido pelo FGC'],
      correta: 2,
      explicacao: 'Moeda estrangeira em si não produz renda. Por isso ela cumpre função de proteção na carteira, e não de motor de crescimento do patrimônio.',
    },
    {
      pergunta: 'Você comprou um ETF internacional na B3. A que você está exposto?',
      alternativas: ['Apenas ao desempenho dos ativos estrangeiros', 'Apenas à variação do dólar', 'Aos dois: ao desempenho dos ativos e à variação cambial', 'A nenhum dos dois, porque comprou em reais'],
      correta: 2,
      explicacao: 'Comprar em reais não elimina a exposição cambial. O valor da cota reflete tanto o desempenho dos ativos lá fora quanto a variação do dólar frente ao real.',
    },
  ],

  faq: [
    {
      pergunta: 'Qual percentual da carteira deve ser internacional?',
      resposta: 'Não existe número correto. Faixas entre 10% e 30% aparecem com frequência em carteiras equilibradas. O que importa mais que o percentual exato é escolher um, mantê-lo e não tentar acertar o momento do câmbio.',
    },
    {
      pergunta: 'Preciso de conta no exterior?',
      resposta: 'Para a maioria das pessoas, não. ETFs internacionais e BDRs na B3 resolvem a exposição com muito menos burocracia. Conta no exterior faz mais sentido com patrimônio já relevante e disposição para lidar com câmbio, IOF e declarações.',
    },
    {
      pergunta: 'É melhor comprar dólar aos poucos ou de uma vez?',
      resposta: 'Aos poucos, na maioria dos casos. Aportes graduais diluem o risco de fazer todo o câmbio em um único momento ruim, e removem a necessidade de acertar o timing — que é justamente onde a maioria erra.',
    },
  ],
}
