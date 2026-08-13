import type { Modulo } from '@/types'

export const moduloAnaliseIndicadores: Modulo = {
  id: 'analise-indicadores',
  trilhaId: 'acoes-bolsa',
  numero: 6,
  titulo: 'Análise de Indicadores',
  subtitulo: 'A caixa de ferramentas numérica, e nenhuma delas serve sozinha',
  iconName: 'Ruler',
  duracaoMin: 17,

  aprender: {
    oQueE:
      'Indicadores são atalhos numéricos para comparar empresas. Cada um resume uma dimensão do negócio em um número: preço em relação ao lucro, retorno sobre o capital dos sócios, tamanho da dívida, fatia do lucro distribuída. São ferramentas de triagem e de perguntas, e não respostas prontas.',
    porQueImporta:
      'A lição do módulo cabe em uma frase: a quantidade de indicadores necessária para decidir sozinha é zero. Todo indicador tem uma armadilha específica e um companheiro obrigatório de leitura. Quem aprende os pares certos consegue eliminar rapidamente empresas ruins e evita a armadilha mais comum da bolsa, que é comprar algo barato por um motivo que ainda não descobriu.',
    naPratica:
      'O caso clássico é o P/L baixo. Ele mostra quantos anos de lucro atual pagariam o preço da ação, então um número baixo parece oportunidade. Só que ele fica baixo por três motivos bem diferentes: a empresa está realmente descontada, o lucro do último período foi inflado por algo não recorrente, ou o mercado espera que esse lucro encolha. Lido junto com retorno sobre patrimônio, endividamento e a origem do lucro, o mesmo número passa a contar qual dos três casos é o seu.',
    passoAPasso: [
      'Escolha o indicador certo para o setor antes de comparar qualquer coisa',
      'Leia todo indicador em par com o companheiro que revela a armadilha dele',
      'Compare com empresas do mesmo setor, nunca entre setores diferentes',
      'Compare também com a história da própria empresa nos últimos anos',
      'Confirme se o lucro e o dividendo usados na conta são recorrentes',
    ],
    errosComuns: [
      'Comprar por P/L baixo sem investigar por que ele está baixo',
      'Comparar múltiplos entre setores com estruturas completamente diferentes',
      'Aceitar ROE alto sem olhar o quanto de dívida está inflando esse retorno',
      'Calcular dividend yield sobre um dividendo extraordinário que não se repete',
      'Usar um único indicador como critério de decisão',
    ],
    comparativo: {
      titulo: 'Dez indicadores: o que medem, a armadilha e o par de leitura',
      linhas: [
        { label: 'P/L', valor: 'Anos de lucro para pagar o preço · armadilha: lucro não recorrente · leia com ROE e crescimento' },
        { label: 'P/VP', valor: 'Preço sobre patrimônio · armadilha: o setor muda a referência · leia com ROE' },
        { label: 'ROE', valor: 'Retorno sobre o patrimônio dos sócios · armadilha: alavancagem infla · leia com dívida sobre EBITDA' },
        { label: 'Dívida líquida / EBITDA', valor: 'Anos de caixa para quitar a dívida · armadilha: EBITDA ajustado de forma criativa · leia com cobertura de juros' },
        { label: 'Margem líquida', valor: 'Quanto sobra de cada real vendido · armadilha: varia demais entre setores · leia com a margem histórica da própria empresa' },
        { label: 'Dividend Yield', valor: 'Dividendo sobre o preço · armadilha: provento extraordinário · leia com payout e lucro recorrente' },
        { label: 'Payout', valor: 'Fatia do lucro distribuída · armadilha: acima de cem por cento não se sustenta · leia com o fluxo de caixa' },
        { label: 'CAGR de receita', valor: 'Ritmo de crescimento · armadilha: aquisições mascaram o crescimento próprio · leia com margem' },
        { label: 'EV / EBITDA', valor: 'Valor da firma sobre geração de caixa · armadilha: ignora investimento pesado · leia com capex sobre receita' },
        { label: 'LPA', valor: 'Lucro por ação · armadilha: diluição por emissão de novas ações · leia com o número de ações' },
      ],
    },
    checklist: [
      'Sei o que cada indicador da minha planilha realmente mede',
      'Leio todo indicador em par com o que revela a armadilha dele',
      'Comparo empresas apenas dentro do mesmo setor',
      'Verifico se o lucro usado no cálculo foi recorrente',
      'Nunca tomei uma decisão de compra com base em um número isolado',
    ],
    livroRelacionado: {
      livroId: 'acoes-comuns-lucros-extraordinarios',
      textoConexao: 'Fisher defende olhar além dos números superficiais para entender a qualidade real de uma empresa — o princípio de nunca decidir com base em um indicador isolado é exatamente essa defesa contra a leitura rasa dos dados.',
    },
  },

  mapaMental: {
    label: 'Indicadores',
    subtitulo: 'Ferramentas numéricas, e nenhuma delas serve sozinha',
    ramos: [
      {
        id: 'multiplos',
        label: 'Múltiplos de preço',
        cor: '#3B82F6',
        resumo: 'Quanto o mercado está cobrando',
        filhos: [
          {
            label: 'P/L',
            desc: 'Preço dividido pelo lucro por ação: quantos anos do lucro atual pagariam o preço. Baixo pode ser desconto ou pode ser problema.',
            netos: [
              { label: 'Os três motivos', desc: 'Empresa descontada, lucro inflado por algo não recorrente, ou mercado esperando que o lucro encolha. Descobrir qual é o trabalho.' },
              { label: 'Quando não usa', desc: 'Empresa com lucro negativo ou muito volátil torna o número inútil ou enganoso.' },
            ],
          },
          { label: 'P/VP', desc: 'Preço sobre valor patrimonial. Faz sentido em banco e em fundo imobiliário, e diz pouco em empresa cujo valor está em marca e software.' },
          { label: 'EV/EBITDA', desc: 'Considera a dívida junto do preço, o que o torna mais justo que o P/L para comparar empresas com endividamentos diferentes.' },
          { label: 'PSR', desc: 'Preço sobre receita. Usado quando a empresa ainda não dá lucro, e por isso mesmo exige mais cuidado com a tese.' },
        ],
      },
      {
        id: 'rentabilidade',
        label: 'Rentabilidade',
        cor: '#22C55E',
        resumo: 'Qualidade do lucro',
        filhos: [
          {
            label: 'ROE',
            desc: 'Retorno sobre o patrimônio dos sócios. Alto costuma ser bom sinal, e pode estar inflado por dívida.',
            netos: [
              { label: 'Como a dívida infla', desc: 'Tomar dinheiro emprestado reduz o patrimônio próprio na conta e faz o mesmo lucro parecer um retorno maior.' },
            ],
          },
          { label: 'ROIC', desc: 'Retorno sobre todo o capital empregado, próprio e de terceiros. Mais honesto que o ROE justamente porque a dívida não some da conta.' },
          { label: 'Margem líquida', desc: 'Quanto sobra de cada real vendido depois de tudo. Só faz sentido comparada dentro do mesmo setor.' },
          { label: 'Margem EBITDA', desc: 'Eficiência da operação antes de juros, impostos e depreciação. Boa para isolar o desempenho operacional da estrutura financeira.' },
        ],
      },
      {
        id: 'endividamento',
        label: 'Endividamento',
        cor: '#EF4444',
        resumo: 'Capacidade de atravessar crise',
        filhos: [
          {
            label: 'Dívida líquida sobre EBITDA',
            desc: 'Quantos anos de geração de caixa seriam necessários para quitar a dívida. Números altos costumam acender alerta, com a referência variando por setor.',
            netos: [
              { label: 'O ajuste criativo', desc: 'EBITDA ajustado por itens que a empresa considera excepcionais pode maquiar o indicador. Vale conferir o que foi excluído.' },
            ],
          },
          { label: 'Cobertura de juros', desc: 'Quantas vezes o resultado operacional cobre os juros que a empresa paga. Abaixo de um patamar confortável, o caixa vai todo para o banco.' },
          { label: 'Perfil da dívida', desc: 'Dívida curta em juro variável é bem mais perigosa que dívida longa em taxa fixa, mesmo quando o valor total é o mesmo.' },
          { label: 'Contexto de juro alto', desc: 'Em ciclo de juro alto, empresa endividada sofre duas vezes: paga mais caro pela dívida e vende menos porque o cliente também sente.' },
        ],
      },
      {
        id: 'proventos',
        label: 'Proventos',
        cor: '#FFC93C',
        resumo: 'O que chega no seu bolso',
        filhos: [
          {
            label: 'Dividend Yield',
            desc: 'Dividendo distribuído dividido pelo preço da ação. O número mais fácil de manipular sem querer.',
            netos: [
              { label: 'Confira sempre', desc: 'Se o dividendo do período incluiu algo extraordinário, o yield calculado não se repete no ano seguinte.' },
              { label: 'Yield alto demais', desc: 'Pode significar cota em queda livre e não empresa generosa. O denominador caindo infla o indicador sozinho.' },
            ],
          },
          { label: 'Payout', desc: 'Percentual do lucro distribuído aos sócios. Acima de cem por cento significa distribuir mais do que se ganhou, o que não se sustenta por muito tempo.' },
          { label: 'Yield on cost', desc: 'Dividendo sobre o preço que você pagou, não sobre o preço de hoje. Em boas pagadoras ele cresce ao longo dos anos.' },
          { label: 'Recorrência', desc: 'A pergunta que resolve quase tudo em proventos: esse dividendo vem do lucro da operação e tende a se repetir?' },
        ],
      },
      {
        id: 'como-usar',
        label: 'Como usar',
        cor: '#8B5CF6',
        resumo: 'A lição do módulo',
        filhos: [
          {
            label: 'Nunca isolado',
            desc: 'P/L baixo com retorno baixo e dívida alta é armadilha, não oportunidade. É a combinação que informa, nunca o número solto.',
            netos: [
              { label: 'O par mínimo', desc: 'Todo múltiplo de preço pede um indicador de rentabilidade e um de endividamento ao lado. Três números respondem mais que trinta.' },
            ],
          },
          { label: 'Comparar com o setor', desc: 'Banco, varejo e mineradora têm padrões completamente diferentes. Comparar entre eles produz conclusões inventadas.' },
          { label: 'Comparar com a própria história', desc: 'A empresa está barata em relação a ela mesma nos últimos anos? Essa é a comparação mais estável que existe.' },
          { label: 'Armadilha de valor', desc: 'Ação barata que continua barata porque o negócio está encolhendo. O múltiplo estava certo, a leitura é que estava errada.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Valuation Rápido',
    intro:
      'A melhor forma de aprender que indicador isolado engana é ver o mesmo número levar a conclusões opostas dependendo do que está ao lado dele.',
    passos: [
      'Abra Ferramentas → Valuation Rápido',
      'Informe o lucro de uma empresa e um crescimento modesto, compatível com um negócio maduro',
      'Anote a faixa de valor que aparece e compare com o preço de mercado',
      'Refaça a conta supondo que parte daquele lucro foi um ganho não recorrente',
      'Compare as duas faixas e veja o quanto o mesmo P/L muda de significado',
    ],
    exemploGuiado:
      'Exemplo: duas empresas do mesmo setor negociam pelo mesmo P/L. A primeira tem retorno sobre o capital consistente há anos, dívida baixa e margem estável. A segunda registrou no último ano a venda de um imóvel, o que inflou o lucro e derrubou o múltiplo. Olhando apenas o P/L, as duas parecem igualmente atrativas. Olhando o par de indicadores certo, a segunda revela um lucro que não se repete e um múltiplo real bem mais alto do que aparenta. O número era o mesmo. A leitura é que era diferente.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Quantos indicadores bastam para decidir uma compra?', verso: 'Nenhum sozinho. Todo indicador tem uma armadilha específica, e o que informa é a combinação: um múltiplo de preço lido junto com rentabilidade e endividamento.' },
    { id: 'fc2', frente: 'Por que o P/L pode estar baixo?', verso: 'Por três motivos diferentes: a empresa está realmente descontada, o lucro do período foi inflado por algo não recorrente, ou o mercado espera que esse lucro encolha.' },
    { id: 'fc3', frente: 'Por que ROE alto merece desconfiança?', verso: 'Porque dívida reduz o patrimônio próprio na conta e faz o mesmo lucro parecer um retorno maior. Leia sempre junto com o endividamento, ou prefira o ROIC.' },
    { id: 'fc4', frente: 'O que é armadilha de valor?', verso: 'Uma ação que parece barata pelos múltiplos e continua barata porque o negócio está encolhendo. O múltiplo não estava errado, a interpretação é que estava.' },
    { id: 'fc5', frente: 'O que checar antes de confiar em um dividend yield alto?', verso: 'Se o dividendo foi recorrente ou extraordinário, e se o preço da ação não caiu muito. Nos dois casos o indicador infla sem que a empresa tenha ficado melhor.' },
    { id: 'fc6', frente: 'Por que não comparar múltiplos entre setores?', verso: 'Porque banco, varejo e mineradora têm estruturas de capital, ciclos e necessidades de investimento completamente diferentes. A comparação produz uma conclusão inventada.' },
  ],

  quiz: [
    {
      pergunta: 'Uma empresa tem P/L baixo, ROE baixo e dívida alta. O que essa combinação sugere?',
      alternativas: ['Oportunidade clara de compra', 'Provável armadilha de valor', 'Empresa em crescimento acelerado', 'Nada, os indicadores são independentes'],
      correta: 1,
      explicacao: 'Preço baixo acompanhado de retorno fraco e endividamento alto costuma indicar um negócio em dificuldade, e não um desconto. É exatamente o caso que o múltiplo isolado esconde.',
    },
    {
      pergunta: 'O que pode inflar artificialmente o ROE de uma empresa?',
      alternativas: ['Aumento de receita', 'Alavancagem, porque a dívida reduz o patrimônio próprio na conta', 'Distribuição de dividendo extraordinário', 'Recompra de ações'],
      correta: 1,
      explicacao: 'Quanto menor o patrimônio dos sócios no denominador, maior o retorno aparente sobre ele. Por isso o ROIC, que considera todo o capital empregado, é uma leitura mais honesta.',
    },
    {
      pergunta: 'Uma empresa distribuiu payout acima de cem por cento no último ano. O que isso significa?',
      alternativas: ['Que ela é muito lucrativa', 'Que distribuiu mais do que lucrou no período, o que não se sustenta indefinidamente', 'Que o dividend yield vai cair', 'Que ela não tem dívida'],
      correta: 1,
      explicacao: 'Distribuir acima do lucro exige usar caixa acumulado, vender ativo ou se endividar. Pode acontecer pontualmente, e como padrão indica que a distribuição atual não é sustentável.',
    },
    {
      pergunta: 'Qual indicador é mais adequado para comparar duas empresas com níveis de endividamento muito diferentes?',
      alternativas: ['P/L', 'EV/EBITDA', 'Margem líquida', 'Dividend Yield'],
      correta: 1,
      explicacao: 'O EV considera a dívida junto do valor de mercado, então coloca as duas empresas na mesma base. O P/L olha só o preço da ação e ignora quanto a empresa deve.',
    },
  ],

  faq: [
    {
      pergunta: 'Existe um valor de P/L que indica que a ação está barata?',
      resposta: 'Não, e essa é a pergunta mais frequente e mais mal respondida do mercado. O patamar considerado normal muda por setor, por país e por momento do ciclo de juros. Um mesmo número pode ser caro em uma mineradora e barato em uma empresa de software com crescimento consistente. A comparação que funciona é dupla: contra empresas do mesmo setor e contra a história da própria empresa. Qualquer regra fixa de número mágico ignora essas duas coisas.',
    },
    {
      pergunta: 'Preciso acompanhar todos esses indicadores todo trimestre?',
      resposta: 'Não. Acompanhar todos é a receita para não acompanhar nenhum de verdade. Para a maioria das teses, três ou quatro números respondem: se a receita cresce, se a margem se mantém, quanto a empresa deve e se ela gera caixa. Os demais entram quando alguma coisa nesses quatro chama atenção. Trimestre é uma janela curta, e movimento de um único trimestre raramente muda uma tese de anos.',
    },
    {
      pergunta: 'Uso um site que já mostra todos os indicadores prontos. Isso basta?',
      resposta: 'Serve muito bem para triagem inicial e economiza tempo. O cuidado é que esses sites calculam a partir dos números divulgados, sem separar o que foi recorrente do que foi eventual, e sem ajustar as diferenças entre setores. Um lucro inflado por venda de ativo aparece lá como lucro normal. Use a lista pronta para reduzir o universo de empresas e vá ao relatório da companhia antes de comprar qualquer uma delas.',
    },
  ],
}
