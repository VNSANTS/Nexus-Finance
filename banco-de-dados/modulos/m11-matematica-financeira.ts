import type { Modulo } from '@/types'

export const moduloMatematicaFinanceira: Modulo = {
  id: 'matematica-financeira',
  trilhaId: 'economia-mercado',
  numero: 3,
  titulo: 'Matemática Financeira',
  subtitulo: 'As quatro contas que destravam todo o resto',
  iconName: 'Calculator',
  duracaoMin: 15,

  aprender: {
    oQueE:
      'Matemática financeira é o conjunto de contas que descrevem o dinheiro no tempo. São quatro ideias, e só: valor presente e futuro, juro composto, conversão de taxas e taxa real. Quem domina essas quatro consegue comparar qualquer investimento com qualquer outro — e quem não domina depende de acreditar no que dizem.',
    porQueImporta:
      'É o módulo que destrava os outros. Sem conversão de taxas você não compara um CDB de 1 ano com um Tesouro de 5. Sem taxa real você comemora um rendimento que na verdade perdeu da inflação. Sem juro composto, aposentadoria e dívida de cartão viram assunto de fé.',
    naPratica:
      'A conta que mais engana brasileiro é simples: 1% ao mês não é 12% ao ano. É 12,68%, porque o juro do segundo mês incide sobre o do primeiro. Parece detalhe, mas em taxas altas a diferença explode — e é justamente por isso que o rotativo do cartão, anunciado como "15% ao mês", vira mais de 400% ao ano. A segunda conta que engana é a taxa real: descontar inflação não é subtrair. Render 10% com IPCA de 6% dá pouco menos de 4%, não 4% exatos.',
    passoAPasso: [
      'Aprenda a fórmula do montante: valor final = valor inicial × (1 + taxa) elevado ao número de períodos',
      'Converta uma taxa anual em mensal usando raiz, nunca dividindo por 12',
      'Calcule a taxa real de um investimento seu, dividindo e não subtraindo',
      'Aplique a regra dos 72 para estimar em quantos anos seu dinheiro dobra',
      'Confira todas as contas na calculadora do app e veja se bateu',
    ],
    errosComuns: [
      'Dividir a taxa anual por 12 para achar a mensal',
      'Subtrair a inflação do rendimento em vez de dividir',
      'Comparar dois investimentos com prazos diferentes sem converter',
      'Confundir porcentagem ao mês com porcentagem no período total',
      'Achar que uma queda de 50% se recupera com uma alta de 50%',
    ],
    comparativo: {
      titulo: 'Juro simples x composto — R$ 10.000 a 1% ao mês',
      linhas: [
        { label: '1 ano · simples', valor: 'R$ 11.200' },
        { label: '1 ano · composto', valor: 'R$ 11.268' },
        { label: '10 anos · simples', valor: 'R$ 22.000' },
        { label: '10 anos · composto', valor: 'R$ 33.004' },
        { label: '30 anos · simples', valor: 'R$ 46.000' },
        { label: '30 anos · composto', valor: 'R$ 359.496' },
      ],
    },
    checklist: [
      'Sei escrever a fórmula do montante',
      'Converti uma taxa anual em mensal corretamente',
      'Calculei a taxa real de pelo menos um investimento meu',
      'Sei usar a regra dos 72',
      'Entendi por que cair 50% exige subir 100% para voltar',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham insiste que investir bem exige raciocínio quantitativo rigoroso, não intuição — a matemática financeira deste módulo é a ferramenta que sustenta toda análise disciplinada que o livro defende.',
    },
  },

  mapaMental: {
    label: 'Matemática Financeira',
    subtitulo: 'As quatro contas que destravam todos os outros módulos',
    ramos: [
      {
        id: 'tempo',
        label: 'Valor no tempo',
        cor: '#00D4FF',
        resumo: 'Hoje vale mais que amanhã',
        filhos: [
          { label: 'Valor presente', desc: 'Quanto vale hoje um dinheiro que você só recebe no futuro. Sempre menos que o valor de face.' },
          { label: 'Valor futuro', desc: 'Quanto o seu dinheiro de hoje vira depois de render por um tempo.' },
          { label: 'Por que existe', desc: 'R$ 100 hoje valem mais que R$ 100 daqui a um ano, porque hoje eles já podem render. É a base de tudo.' },
          { label: 'Aplicação prática', desc: 'É o raciocínio por trás de "à vista com desconto ou parcelado sem juros?" — depende de quanto o seu dinheiro renderia no período.' },
        ],
      },
      {
        id: 'composto',
        label: 'Juro simples x composto',
        cor: '#FFC93C',
        resumo: 'Reta contra curva',
        filhos: [
          { label: 'Juro simples', desc: 'Sempre calculado sobre o valor inicial. Quase não aparece na vida real brasileira.' },
          {
            label: 'Juro composto',
            desc: 'Calculado sobre o valor inicial mais tudo que já rendeu. É o padrão de investimentos e de dívidas.',
            netos: [
              { label: 'A fórmula', desc: 'Valor final = valor inicial × (1 + taxa) elevado ao número de períodos.' },
              { label: 'Com aportes', desc: 'Quando você deposita todo mês, entra a fórmula de série uniforme — é a base de toda simulação de aposentadoria.' },
            ],
          },
          { label: 'A curva', desc: 'Simples é reta, composto é curva que acelera. Em 1 ano a diferença é pequena; em 30 anos é de outra ordem de grandeza.' },
          { label: 'Regra dos 72', desc: 'Divida 72 pela taxa anual e descubra em quantos anos o dinheiro dobra. A 12% ao ano, seis anos.' },
        ],
      },
      {
        id: 'conversao',
        label: 'Conversão de taxas',
        cor: '#3B82F6',
        resumo: 'O erro mais comum de todos',
        filhos: [
          {
            label: '1% ao mês não é 12% ao ano',
            desc: 'É 12,68%, porque o juro do segundo mês incide sobre o do primeiro.',
            netos: [
              { label: 'Em taxa alta', desc: 'A diferença explode. 15% ao mês vira mais de 400% ao ano — é assim que o rotativo funciona.' },
            ],
          },
          { label: 'Taxa equivalente', desc: 'A conta correta para comparar prazos: (1 + taxa) elevado à razão entre os períodos, menos 1.' },
          { label: 'O erro clássico', desc: 'Dividir a taxa anual por 12. Dá quase certo em taxa baixa e muito errado em taxa alta.' },
          { label: 'Por que importa', desc: 'Sem isso você não compara um CDB de 12 meses com um Tesouro de 5 anos. É como decidir entre preço por quilo e preço por unidade.' },
        ],
      },
      {
        id: 'real',
        label: 'Nominal x real',
        cor: '#22C55E',
        resumo: 'O único ganho que conta',
        filhos: [
          { label: 'Taxa nominal', desc: 'O número que aparece no extrato. É o que a propaganda mostra.' },
          { label: 'Taxa real', desc: 'O que sobrou depois da inflação. É a única que mede se você ficou mais rico.' },
          {
            label: 'A conta certa',
            desc: 'Não é subtrair. É dividir (1 + nominal) por (1 + inflação) e tirar 1.',
            netos: [
              { label: 'Exemplo', desc: 'Render 10% com inflação de 6% dá pouco menos de 4% real. A subtração daria 4% exatos — e superestima o ganho.' },
              { label: 'Em inflação alta', desc: 'Quanto maior a inflação, maior o erro da subtração. Em anos de IPCA de dois dígitos, a diferença é relevante.' },
            ],
          },
        ],
      },
      {
        id: 'assimetria',
        label: 'Assimetria e armadilhas',
        cor: '#EF4444',
        resumo: 'Perder custa mais do que parece',
        filhos: [
          { label: 'Cair 50% exige subir 100%', desc: 'Se R$ 100 viram R$ 50, é preciso dobrar para voltar ao início. Perda e ganho não são simétricos.' },
          { label: 'Cair 20% exige subir 25%', desc: 'A assimetria vale em qualquer escala e é a razão matemática pela qual controlar perda importa mais que perseguir ganho.' },
          { label: 'Porcentagem sobre o quê', desc: '"Desconto de 50% e depois mais 20%" não é 70% de desconto — o segundo incide sobre o já reduzido.' },
          { label: 'Média enganosa', desc: 'Ganhar 50% num ano e perder 50% no seguinte não empata: sobra 75% do capital inicial.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Conversor de Taxas',
    intro:
      'Este módulo usa duas calculadoras em sequência, e a ordem importa. Primeiro o Conversor, para colocar todas as taxas na mesma base. Depois o de Juros Compostos, para ver o efeito no tempo.',
    passos: [
      'Abra Ferramentas → Conversor de Taxas',
      'Digite 1% ao mês e converta para anual — confirme que dá 12,68%, não 12%',
      'Digite agora um rendimento anual e o IPCA do período para obter a taxa real',
      'Abra Ferramentas → Juros Compostos e use a taxa que você acabou de calcular',
      'Compare o resultado em 10 e em 30 anos, e repare quanto do total não foi aportado por você',
    ],
    exemploGuiado:
      'Exemplo: R$ 10.000 a 1% ao mês. Em juro simples, 30 anos dariam R$ 46.000. Em juro composto, passam de R$ 359.000. É o mesmo capital, a mesma taxa e o mesmo prazo — muda só a forma de calcular. Essa diferença é o motivo de o tempo ser a variável mais importante de qualquer plano financeiro.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quanto é 1% ao mês em taxa anual?', verso: '12,68%, não 12%. O juro de cada mês incide sobre o acumulado, então a taxa cresce mais que a soma simples.' },
    { id: 'fc2', frente: 'Como se calcula a taxa real?', verso: 'Dividindo (1 + rendimento) por (1 + inflação) e subtraindo 1. Subtrair direto superestima o ganho, principalmente em inflação alta.' },
    { id: 'fc3', frente: 'O que é a regra dos 72?', verso: 'Um atalho: divida 72 pela taxa anual e você tem, aproximadamente, em quantos anos o dinheiro dobra. A 12% ao ano, seis anos.' },
    { id: 'fc4', frente: 'Se um investimento cai 50%, quanto precisa subir para voltar?', verso: '100%. Perda e ganho não são simétricos, e é por isso que evitar perdas grandes importa mais do que perseguir ganhos grandes.' },
    { id: 'fc5', frente: 'Qual a diferença entre juro simples e composto?', verso: 'Simples incide sempre sobre o valor inicial; composto incide sobre o inicial mais tudo que já rendeu. Um é reta, o outro é curva.' },
    { id: 'fc6', frente: 'Por que não dividir a taxa anual por 12?', verso: 'Porque isso ignora o efeito composto dentro do ano. A conversão correta usa raiz, não divisão — e a diferença cresce com a taxa.' },
  ],

  quiz: [
    {
      pergunta: 'Um investimento rende 1% ao mês. Qual a taxa anual equivalente?',
      alternativas: ['12%', '12,68%', '10,5%', '13,5%'],
      correta: 1,
      explicacao: 'A conta é (1,01) elevado a 12, menos 1, que dá 12,68%. Dividir ou multiplicar linearmente ignora o efeito do juro sobre juro.',
    },
    {
      pergunta: 'Sua carteira caiu 20%. Quanto ela precisa subir para voltar ao valor original?',
      alternativas: ['20%', '22%', '25%', '18%'],
      correta: 2,
      explicacao: 'R$ 100 caindo 20% viram R$ 80. Para R$ 80 voltarem a R$ 100 é preciso subir 25%. Essa assimetria é a base da gestão de risco.',
    },
    {
      pergunta: 'Qual investimento rende mais: um que paga 11% ao ano ou um que paga 0,9% ao mês?',
      alternativas: ['O de 11% ao ano', 'O de 0,9% ao mês, que equivale a cerca de 11,35% ao ano', 'São iguais', 'Impossível comparar'],
      correta: 1,
      explicacao: '0,9% ao mês composto por 12 meses dá aproximadamente 11,35% ao ano. Sem converter para a mesma base, a comparação não existe.',
    },
    {
      pergunta: 'O que é taxa real?',
      alternativas: ['A taxa anunciada pelo banco', 'A taxa depois de descontados os impostos', 'A taxa depois de descontada a inflação', 'A taxa média do mercado'],
      correta: 2,
      explicacao: 'Taxa real é o rendimento descontada a inflação. É o único número que indica se o seu poder de compra aumentou de fato.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso decorar as fórmulas?',
      resposta: 'Não. Precisa entender o raciocínio e saber usar uma calculadora. O que não pode é achar que dividir taxa anual por 12 funciona — esse erro leva a decisões ruins mesmo com calculadora na mão.',
    },
    {
      pergunta: 'Parcelado sem juros é sempre melhor que à vista?',
      resposta: 'Depende do desconto à vista e de quanto seu dinheiro renderia no período. Se o desconto à vista supera o que você ganharia investindo o valor durante as parcelas, à vista vence. É exatamente a conta de valor presente.',
    },
    {
      pergunta: 'Por que o rotativo do cartão chega a mais de 400% ao ano?',
      resposta: 'Porque a taxa mensal alta é composta. Algo como 14% ou 15% ao mês, capitalizado por 12 meses, ultrapassa 400% ao ano. É a mesma matemática que trabalha a seu favor nos investimentos, funcionando contra você.',
    },
  ],
}
