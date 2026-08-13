import type { Modulo } from '@/types'

export const moduloEconomia: Modulo = {
  id: 'economia',
  trilhaId: 'economia-mercado',
  numero: 2,
  titulo: 'Economia',
  subtitulo: 'Ler uma manchete e saber o efeito no seu bolso',
  iconName: 'Globe',
  duracaoMin: 14,

  aprender: {
    oQueE:
      'Economia é o estudo de como uma sociedade produz, distribui e consome com recursos limitados. Para o investidor, ela se resume a poucas engrenagens: oferta e demanda formando preços, o Banco Central mexendo nos juros, o governo arrecadando e gastando, e o efeito disso tudo na sua renda e nos seus investimentos.',
    porQueImporta:
      'Todo investimento no Brasil é precificado a partir de duas ou três variáveis macro. Quem entende PIB, inflação e juros entende a maior parte das notícias econômicas sem precisar de intérprete — e, mais importante, para de reagir a manchete achando que precisa mudar a carteira.',
    naPratica:
      'O ciclo básico funciona assim: economia aquecendo demais tende a pressionar preços; o Banco Central sobe os juros para esfriar o consumo; crédito fica caro, empresas investem menos, a inflação cede e a bolsa costuma sofrer, enquanto a renda fixa fica atraente. Quando a inflação cede, o processo se inverte. É por isso que "renda fixa está ótima" e "bolsa está barata" costumam ser verdade em momentos opostos do mesmo ciclo.',
    passoAPasso: [
      'Entenda oferta e demanda com um exemplo local, como o preço do tomate na entressafra',
      'Ligue inflação a poder de compra, usando o seu próprio orçamento',
      'Ligue juros a crédito e consumo: quem paga parcela e quem recebe rendimento',
      'Entenda de onde vem a arrecadação e para onde vai o gasto público',
      'Crie o hábito de ler uma notícia econômica por semana até o fim',
    ],
    errosComuns: [
      'Confundir PIB com riqueza da população',
      'Achar que inflação é só o preço do que você compra subir',
      'Achar que juro alto é ruim para tudo',
      'Ignorar o câmbio por não viajar para fora',
      'Tratar economia como opinião política em vez de mecanismo',
    ],
    comparativo: {
      titulo: 'Indicador, o que mede e o efeito no seu bolso',
      linhas: [
        { label: 'PIB', valor: 'Tudo que o país produziu · emprego e lucro das empresas' },
        { label: 'IPCA', valor: 'Inflação ao consumidor · poder de compra do salário' },
        { label: 'Selic', valor: 'Taxa básica · rendimento da renda fixa e custo do crédito' },
        { label: 'Desemprego', valor: 'Força do mercado de trabalho · reajustes e consumo' },
        { label: 'Câmbio', valor: 'Preço do dólar · combustível, alimento e eletrônico' },
        { label: 'Balança comercial', valor: 'Exportação menos importação · força do real' },
      ],
    },
    checklist: [
      'Entendi como oferta e demanda formam preço',
      'Sei o que o PIB mede e o que ele não mede',
      'Sei ligar juro a crédito, consumo e rendimento',
      'Sei diferenciar política monetária de política fiscal',
      'Li uma notícia econômica inteira esta semana',
    ],
    livroRelacionado: {
      livroId: 'random-walk-wall-street',
      textoConexao: 'Burton Malkiel conecta os ciclos econômicos e as engrenagens macro deste módulo ao comportamento real dos mercados — mostrando por que tentar prever o próximo movimento da economia raramente supera simplesmente entender como ela funciona.',
    },
  },

  mapaMental: {
    label: 'Economia',
    subtitulo: 'As poucas engrenagens que explicam a maior parte das manchetes',
    ramos: [
      {
        id: 'ofertademanda',
        label: 'Oferta e demanda',
        cor: '#00D4FF',
        resumo: 'Como o preço nasce',
        filhos: [
          { label: 'O encontro', desc: 'Muita procura e pouca oferta empurra o preço para cima. O contrário derruba. Vale para tomate, imóvel e ação.' },
          { label: 'Escassez', desc: 'O que é raro e desejado custa caro. É a base do valor de qualquer coisa negociada.' },
          {
            label: 'Elasticidade',
            desc: 'Quanto a demanda muda quando o preço muda.',
            netos: [
              { label: 'Inelástico', desc: 'Remédio e energia: você compra mesmo caro. Empresas desses setores sofrem menos em crise.' },
              { label: 'Elástico', desc: 'Restaurante e viagem: você corta rápido. Setores assim despencam primeiro na recessão.' },
            ],
          },
        ],
      },
      {
        id: 'indicadores',
        label: 'Indicadores',
        cor: '#3B82F6',
        resumo: 'Os números que aparecem no jornal',
        filhos: [
          {
            label: 'PIB',
            desc: 'A soma de tudo que o país produziu em um período. Cresce, tende a haver mais emprego e mais lucro de empresa.',
            netos: [
              { label: 'O que ele não mede', desc: 'Distribuição. PIB crescendo não significa que a renda chegou a todo mundo.' },
            ],
          },
          { label: 'IPCA', desc: 'A inflação oficial, medida pelo IBGE com uma cesta de consumo das famílias brasileiras.' },
          { label: 'Desemprego', desc: 'Medido pela PNAD do IBGE. Afeta consumo, crédito, reajustes salariais e o humor do mercado.' },
          { label: 'Balança comercial', desc: 'O que o país exporta menos o que importa. Superávit tende a trazer dólares e fortalecer o real.' },
        ],
      },
      {
        id: 'monetaria',
        label: 'Política monetária',
        cor: '#FFC93C',
        resumo: 'O Banco Central mexendo nos juros',
        filhos: [
          { label: 'Quem faz', desc: 'O Banco Central, através da Selic, definida pelo Copom a cada 45 dias aproximadamente.' },
          { label: 'Juro sobe', desc: 'Crédito encarece, consumo desacelera, inflação tende a ceder e a renda fixa fica mais atraente que a bolsa.' },
          { label: 'Juro cai', desc: 'Crédito barateia, empresa investe, consumo aquece e a bolsa costuma antecipar a melhora.' },
          { label: 'Efeito demorado', desc: 'A decisão de hoje aparece na economia meses depois. Por isso o Banco Central age olhando o futuro, não o presente.' },
        ],
      },
      {
        id: 'fiscal',
        label: 'Política fiscal',
        cor: '#EF4444',
        resumo: 'O governo arrecadando e gastando',
        filhos: [
          { label: 'Quem faz', desc: 'O governo, através de impostos e gastos. É a outra metade do motor, ao lado da política monetária.' },
          { label: 'Gastar mais', desc: 'Aquece a economia no curto prazo e pode pressionar preços e a dívida pública no médio.' },
          { label: 'Arrecadar mais', desc: 'Esfria o consumo e melhora as contas públicas, ao custo de tirar dinheiro do bolso de quem produz.' },
          { label: 'Dívida pública', desc: 'Quanto mais o governo deve, maior o juro que precisa pagar — e isso puxa o juro de todo mundo para cima.' },
        ],
      },
      {
        id: 'bolso',
        label: 'No seu bolso',
        cor: '#22C55E',
        resumo: 'Onde a teoria vira conta',
        filhos: [
          { label: 'Poder de compra', desc: 'Inflação alta significa que o mesmo salário compra menos no fim do mês.' },
          { label: 'Crédito', desc: 'Juro alto encarece financiamento, cartão e empréstimo. Quem tem dívida sente primeiro.' },
          { label: 'Emprego e renda', desc: 'PIB fraco significa menos vaga aberta e reajuste abaixo da inflação.' },
          { label: 'Sua carteira', desc: 'Cada cenário favorece uma classe de ativo diferente. É o assunto do módulo de Macro Aplicada.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Conversor de Taxas',
    intro:
      'A forma mais direta de sentir o efeito da economia no bolso é ver a inflação comendo o dinheiro parado ao longo dos anos. O conversor mostra isso em segundos.',
    passos: [
      'Abra Ferramentas → Conversor de Taxas',
      'Informe um rendimento de 0% ao ano, simulando dinheiro parado na conta',
      'Informe uma inflação anual de 5%',
      'Veja a taxa real negativa que aparece',
      'Repita com 10 anos e observe quanto do poder de compra desapareceu',
    ],
    exemploGuiado:
      'Exemplo: R$ 10.000 parados na conta corrente, com inflação de 5% ao ano, valem cerca de R$ 6.100 em poder de compra depois de dez anos. Ninguém tirou nada da sua conta e o extrato continua mostrando R$ 10.000. A perda existe e é silenciosa — é por isso que entender inflação vem antes de escolher investimento.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que o PIB mede?', verso: 'A soma de tudo que o país produziu em um período. Ele mede tamanho e crescimento, não distribuição de renda.' },
    { id: 'fc2', frente: 'Qual a diferença entre política monetária e fiscal?', verso: 'Monetária é o Banco Central mexendo nos juros. Fiscal é o governo arrecadando e gastando. São os dois motores da economia.' },
    { id: 'fc3', frente: 'O que acontece quando o Banco Central sobe os juros?', verso: 'Crédito encarece, consumo desacelera, a inflação tende a ceder, a renda fixa fica mais atraente e a bolsa costuma sofrer.' },
    { id: 'fc4', frente: 'O que é elasticidade da demanda?', verso: 'Quanto a procura muda quando o preço muda. Remédio é inelástico (compra-se mesmo caro), restaurante é elástico (corta-se rápido).' },
    { id: 'fc5', frente: 'Por que a política monetária demora a fazer efeito?', verso: 'Porque o crédito, o consumo e os investimentos reagem ao longo de meses. Por isso o Banco Central decide olhando a inflação futura, não a atual.' },
    { id: 'fc6', frente: 'Por que o câmbio afeta quem nunca viaja?', verso: 'Porque combustível, trigo, fertilizante e eletrônico são cotados em dólar. O câmbio entra no supermercado antes de entrar na sua carteira.' },
  ],

  quiz: [
    {
      pergunta: 'O Banco Central sobe a Selic. Qual o efeito esperado?',
      alternativas: ['Consumo aquece e a bolsa sobe', 'Crédito encarece, consumo desacelera e a renda fixa fica mais atraente', 'A inflação sobe imediatamente', 'O dólar cai obrigatoriamente'],
      correta: 1,
      explicacao: 'Juro maior encarece o crédito e desestimula consumo e investimento, o que tende a conter a inflação. Ao mesmo tempo, torna a renda fixa mais competitiva frente à bolsa.',
    },
    {
      pergunta: 'O PIB do país cresceu 3%. O que isso garante?',
      alternativas: ['Que a renda de todos aumentou', 'Que a produção total cresceu, sem dizer nada sobre a distribuição', 'Que a inflação vai cair', 'Que o desemprego acabou'],
      correta: 1,
      explicacao: 'PIB mede o tamanho da produção. Crescimento tende a vir com mais emprego, mas não informa como essa renda foi distribuída pela população.',
    },
    {
      pergunta: 'Qual setor tende a sofrer mais numa recessão?',
      alternativas: ['Energia elétrica', 'Saneamento', 'Restaurantes e turismo', 'Medicamentos'],
      correta: 2,
      explicacao: 'Restaurantes e turismo têm demanda elástica: são os primeiros gastos cortados quando a renda aperta. Energia, saneamento e remédios são inelásticos.',
    },
    {
      pergunta: 'O que é política fiscal?',
      alternativas: ['A definição da taxa de juros pelo Banco Central', 'As decisões do governo sobre impostos e gastos públicos', 'A fiscalização da CVM sobre o mercado', 'O controle do câmbio'],
      correta: 1,
      explicacao: 'Política fiscal é o lado do governo: quanto arrecada e quanto gasta. Política monetária é o lado do Banco Central, através dos juros.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso entender de economia para investir?',
      resposta: 'Precisa entender o básico: juros, inflação e o que move cada um. Não precisa acompanhar cada dado divulgado. O objetivo é conseguir ler uma notícia sem pânico e não mudar a carteira por causa dela.',
    },
    {
      pergunta: 'Inflação baixa é sempre bom?',
      resposta: 'Inflação controlada é bom. Deflação prolongada, que é queda generalizada de preços, costuma vir com economia parada, desemprego e empresas com lucro caindo. O alvo do Banco Central não é zero, é a meta.',
    },
    {
      pergunta: 'Economia é assunto político?',
      resposta: 'As escolhas de política econômica são políticas, e as pessoas divergem legitimamente sobre elas. Mas os mecanismos — juro alto esfria consumo, inflação corrói poder de compra — funcionam independentemente de opinião. É esse mecanismo que interessa ao investidor.',
    },
  ],
}
