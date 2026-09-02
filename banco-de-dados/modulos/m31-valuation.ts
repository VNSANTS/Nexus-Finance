import type { Modulo } from '@/types'

export const moduloValuation: Modulo = {
  id: 'valuation',
  trilhaId: 'acoes-bolsa',
  numero: 8,
  titulo: 'Valuation',
  subtitulo: 'Estimar quanto uma empresa vale, sabendo que o resultado é faixa e nunca número exato',
  iconName: 'Scale',
  duracaoMin: 18,

  aprender: {
    oQueE:
      'Valuation é o exercício de estimar quanto uma empresa vale hoje com base no dinheiro que ela deve gerar no futuro. Existem três caminhos principais: projetar o caixa futuro e trazer a valor presente, comparar a empresa com pares parecidos usando múltiplos, ou partir do dividendo em empresas maduras e previsíveis. Os três chegam a estimativas, e nenhum chega a um fato.',
    porQueImporta:
      'Sem uma noção de valor, preço é só um número na tela e qualquer queda parece oportunidade. Com uma faixa estimada, você passa a saber se está comprando com desconto ou pagando adiantado por um futuro que ainda precisa acontecer. A fragilidade do método é a lição central: toda avaliação depende de duas ou três premissas, e mudar uma delas em um ponto percentual pode mover o resultado em dezenas de por cento.',
    naPratica:
      'O passo que quase todo mundo pula é a análise de sensibilidade, e é justamente o mais importante. Depois de chegar a um número, refaça a conta com premissas piores e com premissas melhores. O resultado deixa de ser um valor e vira uma faixa, que é o formato honesto da resposta. Se a faixa inteira está acima do preço de mercado, existe margem. Se o preço já está dentro dela, você está pagando pelo cenário médio e não sobrou proteção para o caso de a sua conta estar errada.',
    passoAPasso: [
      'Projete receita e margem para alguns anos, com premissas que você consiga defender',
      'Estime o fluxo de caixa livre a partir dessa projeção, descontando o investimento necessário',
      'Defina a taxa de desconto pensando no risco específico daquela empresa',
      'Calcule a perpetuidade e traga tudo a valor presente, dividindo pelo número de ações',
      'Refaça a conta com premissas piores e melhores para transformar o número em faixa',
    ],
    errosComuns: [
      'Projetar crescimento alto para sempre, como se a concorrência não existisse',
      'Usar taxa de desconto irreal para o risco do país e da empresa',
      'Confundir o seu preço justo com o preço-alvo divulgado por casa de análise',
      'Ignorar a diluição causada por emissões futuras de ações',
      'Acreditar no resultado com duas casas decimais como se fosse medição',
    ],
    comparativo: {
      titulo: 'Os três métodos e onde cada um funciona',
      linhas: [
        { label: 'Fluxo de Caixa Descontado · como funciona', valor: 'Projeta o caixa futuro e traz a valor presente por uma taxa de desconto' },
        { label: 'Fluxo de Caixa Descontado · melhor para', valor: 'Empresas previsíveis · exige mais premissas e é o mais sensível a elas' },
        { label: 'Múltiplos comparáveis · como funciona', valor: 'Compara P/L, EV/EBITDA ou P/VP com empresas parecidas do mesmo setor' },
        { label: 'Múltiplos comparáveis · melhor para', valor: 'Análise rápida e setores maduros · falha se o setor inteiro estiver caro' },
        { label: 'Gordon · como funciona', valor: 'Dividendo dividido pela diferença entre a taxa exigida e o crescimento esperado' },
        { label: 'Gordon · melhor para', valor: 'Pagadoras estáveis como elétricas e bancos · não serve para quem não paga dividendo' },
      ],
    },
    checklist: [
      'Sei explicar cada premissa que usei e por que ela é razoável',
      'Minha projeção de crescimento não se estende ao infinito no mesmo ritmo',
      'Considerei a diluição por possíveis emissões futuras de ações',
      'Refiz a conta com cenários pior e melhor e cheguei a uma faixa',
      'Comparei a faixa com o preço de mercado antes de decidir qualquer coisa',
    ],
    livroRelacionado: {
      livroId: 'o-investidor-inteligente',
      textoConexao:
        'Graham tratava a margem de segurança como consequência direta da imprecisão do cálculo: como a estimativa de valor sempre carrega erro, o desconto sobre ela é o que impede que o erro vire prejuízo permanente.',
    },
  },

  mapaMental: {
    label: 'Valuation',
    subtitulo: 'Estimar quanto uma empresa vale, sabendo que é faixa e nunca número exato',
    ramos: [
      {
        id: 'fcd',
        label: 'Fluxo de Caixa Descontado',
        cor: '#00D4FF',
        resumo: 'O método mais completo e mais frágil',
        filhos: [
          {
            label: 'A ideia',
            desc: 'A empresa vale o dinheiro que vai gerar no futuro, trazido para o valor de hoje. Dinheiro daqui a dez anos vale menos que o mesmo valor agora.',
            netos: [
              { label: 'Por que descontar', desc: 'Porque existe risco de não receber e porque o mesmo dinheiro hoje poderia estar rendendo em outro lugar.' },
            ],
          },
          { label: 'Projeção', desc: 'Estimar receita, margem e investimento por alguns anos. Quanto mais longa a projeção, menos confiável ela fica.' },
          {
            label: 'Taxa de desconto',
            desc: 'O retorno que você exige para correr aquele risco. Quanto maior a taxa, menor o valor calculado para a empresa.',
            netos: [
              { label: 'O peso no Brasil', desc: 'Juro real alto eleva a régua de qualquer projeto. A mesma empresa vale menos aqui do que valeria em um país de juro baixo.' },
            ],
          },
          {
            label: 'Perpetuidade',
            desc: 'O valor de tudo que vem depois do último ano projetado. Costuma representar a maior parte do resultado final.',
            netos: [
              { label: 'A fragilidade escondida', desc: 'Se a maior parte do valor vem da perpetuidade, o seu cálculo depende sobretudo de uma premissa sobre um futuro distante que ninguém consegue prever.' },
            ],
          },
        ],
      },
      {
        id: 'multiplos',
        label: 'Múltiplos',
        cor: '#3B82F6',
        resumo: 'Rápido e ancorado no mercado',
        filhos: [
          { label: 'A ideia', desc: 'Comparar a empresa com pares parecidos usando P/L, EV/EBITDA ou P/VP, e aplicar o múltiplo médio do grupo.' },
          { label: 'Vantagem', desc: 'Rápido, transparente e ancorado no que o mercado efetivamente paga hoje por empresas semelhantes.' },
          {
            label: 'Limite',
            desc: 'Se o setor inteiro está caro, a comparação também está. O método diz se a empresa está barata em relação aos pares, não em relação ao valor.',
            netos: [
              { label: 'O erro de escolher pares', desc: 'Selecionar como comparáveis apenas as empresas que sustentam a sua conclusão é o autoengano mais fácil de cometer aqui.' },
            ],
          },
          { label: 'Quando combinar', desc: 'Usar múltiplos como checagem de sanidade do resultado do fluxo de caixa descontado costuma revelar premissas fora do lugar.' },
        ],
      },
      {
        id: 'gordon',
        label: 'Gordon',
        cor: '#22C55E',
        resumo: 'Para pagadoras previsíveis',
        filhos: [
          { label: 'A ideia', desc: 'O dividendo dividido pela diferença entre a taxa que você exige e o crescimento esperado desse dividendo.' },
          { label: 'Onde funciona', desc: 'Elétricas, bancos e saneamento. Empresas maduras, com fluxo previsível e política de distribuição estável.' },
          {
            label: 'Onde falha',
            desc: 'Empresa que não paga dividendo, que cresce de forma irregular ou que reinveste tudo no negócio.',
            netos: [
              { label: 'A instabilidade da fórmula', desc: 'Quando o crescimento estimado se aproxima da taxa exigida, o denominador encolhe e o resultado dispara para valores absurdos.' },
            ],
          },
          { label: 'Vantagem prática', desc: 'É o método mais simples de calcular e o mais fácil de auditar, porque tem poucas premissas explícitas.' },
        ],
      },
      {
        id: 'premissas',
        label: 'Premissas',
        cor: '#FFC93C',
        resumo: 'Onde o resultado é realmente decidido',
        filhos: [
          {
            label: 'Crescimento',
            desc: 'Projetar crescimento alto para sempre é o erro mais comum. Nenhuma empresa cresce acima da economia indefinidamente.',
            netos: [
              { label: 'Teste de realidade', desc: 'Estenda a sua premissa por trinta anos e veja o tamanho que a empresa alcançaria. Se ficar maior que o próprio setor, a premissa está errada.' },
            ],
          },
          { label: 'Margem', desc: 'Supor que a margem só melhora ignora concorrência, pressão de custo e ciclo. Margem estável já é uma premissa otimista em muitos setores.' },
          { label: 'Taxa de desconto', desc: 'Precisa refletir o risco daquela empresa específica, e não apenas uma referência genérica de mercado.' },
          { label: 'Diluição', desc: 'Se a empresa emite ações novas, o mesmo valor total passa a ser dividido entre mais gente e a sua fatia diminui.' },
        ],
      },
      {
        id: 'sensibilidade',
        label: 'Sensibilidade e margem',
        cor: '#8B5CF6',
        resumo: 'O passo que transforma número em decisão',
        filhos: [
          {
            label: 'Análise de sensibilidade',
            desc: 'Refazer a conta com premissas piores e melhores. O resultado vira uma faixa, que é o formato honesto da resposta.',
            netos: [
              { label: 'Como ler a faixa', desc: 'Faixa inteira acima do preço indica margem. Preço já dentro da faixa indica que você está pagando pelo cenário médio.' },
            ],
          },
          { label: 'Margem de segurança', desc: 'Comprar bem abaixo do valor calculado, justamente porque a sua conta carrega erro embutido que você não consegue medir.' },
          {
            label: 'Autoengano',
            desc: 'Ajustar as premissas até chegar no preço que justifica a compra que você já queria fazer.',
            netos: [
              { label: 'Como se proteger', desc: 'Escreva as premissas antes de olhar o preço de mercado. Depois compare. A ordem inversa contamina tudo.' },
            ],
          },
          { label: 'Preço-alvo não é previsão', desc: 'É apenas o resultado das premissas de quem calculou. Duas casas de análise chegam a números distantes usando os mesmos dados públicos.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Valuation Rápido',
    intro:
      'A demonstração mais eloquente deste módulo é ver a faixa de preço se mover em tempo real quando você mexe em uma única premissa. É assim que a fragilidade do método deixa de ser um aviso abstrato.',
    passos: [
      'Abra Ferramentas → Valuation Rápido',
      'Informe o lucro atual de uma empresa que você conhece',
      'Ajuste o crescimento esperado e observe o valor calculado se mover',
      'Mexa na taxa de desconto em um único ponto percentual e veja o efeito no resultado',
      'Anote o valor mínimo e o máximo que apareceram e trate isso como a sua faixa',
    ],
    exemploGuiado:
      'Exemplo: você monta uma avaliação com crescimento moderado e uma taxa de desconto coerente com o risco do negócio. Chega a um valor por ação. Agora suba a taxa de desconto em um ponto percentual, simulando um cenário de juro mais alto, e o valor calculado cai de forma expressiva. Volte a taxa e reduza o crescimento em um ponto: o valor cai de novo. Nenhuma dessas mudanças alterou nada na empresa, no produto ou nos clientes. Alterou apenas o que você supôs sobre o futuro. É por isso que o resultado precisa ser lido como faixa e é por isso que a margem de segurança existe.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que valuation tenta responder?', verso: 'Quanto uma empresa vale hoje com base no dinheiro que ela deve gerar no futuro. O resultado é uma estimativa em faixa, nunca um número exato.' },
    { id: 'fc2', frente: 'Quais são os três métodos principais?', verso: 'Fluxo de caixa descontado, múltiplos comparáveis e o modelo de Gordon para pagadoras estáveis. Cada um funciona melhor em um tipo diferente de empresa.' },
    { id: 'fc3', frente: 'O que a taxa de desconto representa?', verso: 'O retorno exigido para correr o risco daquela empresa. Quanto maior a taxa, menor o valor calculado, porque o dinheiro futuro passa a valer menos hoje.' },
    { id: 'fc4', frente: 'Por que a perpetuidade merece tanta atenção?', verso: 'Porque costuma representar a maior parte do valor calculado. Isso significa que o resultado depende sobretudo de uma premissa sobre um futuro distante e imprevisível.' },
    { id: 'fc5', frente: 'O que é análise de sensibilidade?', verso: 'Refazer a conta com premissas piores e melhores para transformar o número único em uma faixa. É o passo mais pulado e o mais importante do método.' },
    { id: 'fc6', frente: 'Por que existe margem de segurança?', verso: 'Porque a sua estimativa carrega erro que você não consegue medir. Comprar com desconto sobre o valor calculado é o que impede que esse erro vire prejuízo permanente.' },
  ],

  quiz: [
    {
      pergunta: 'Por que o resultado de um valuation deve ser lido como faixa e não como número?',
      alternativas: ['Por convenção de mercado', 'Porque pequenas mudanças nas premissas movem muito o resultado', 'Porque a bolsa oscila todo dia', 'Porque a contabilidade tem arredondamentos'],
      correta: 1,
      explicacao: 'Alterar crescimento ou taxa de desconto em um único ponto percentual pode mover o valor calculado em dezenas de por cento. Um número único esconde essa fragilidade.',
    },
    {
      pergunta: 'Qual método faz mais sentido para uma empresa de energia elétrica madura e boa pagadora de dividendo?',
      alternativas: ['Fluxo de caixa descontado com projeção de vinte anos', 'Modelo de Gordon', 'Preço sobre receita', 'Análise técnica'],
      correta: 1,
      explicacao: 'Gordon foi desenhado exatamente para empresas maduras com distribuição estável e previsível. Poucas premissas explícitas e fácil de auditar.',
    },
    {
      pergunta: 'O que caracteriza o erro fatal deste módulo?',
      alternativas: ['Usar múltiplos em vez de fluxo de caixa', 'Ajustar as premissas até chegar no preço que justifica a compra que você já queria fazer', 'Calcular a perpetuidade', 'Comparar com empresas do mesmo setor'],
      correta: 1,
      explicacao: 'É viés de confirmação com aparência de planilha. A proteção é escrever as premissas antes de olhar o preço de mercado, e só então comparar.',
    },
    {
      pergunta: 'O preço-alvo divulgado por uma casa de análise é o mesmo que preço justo?',
      alternativas: ['Sim, os dois são calculados igual', 'Não, é apenas o resultado das premissas de quem fez a conta', 'Sim, quando vem de banco grande', 'Não, porque preço-alvo é sempre otimista'],
      correta: 1,
      explicacao: 'Duas casas chegam a números bem diferentes usando os mesmos dados públicos, porque adotam premissas diferentes. O preço-alvo informa sobre as premissas de quem publicou.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso saber fazer valuation para investir em ações?',
      resposta: 'Para escolher empresas individuais, ajuda muito, e não precisa ser no nível de uma planilha profissional. Entender que preço é a expectativa de lucros futuros e que essa expectativa depende de premissas frágeis já muda a forma como você reage a uma queda. Se você não pretende fazer a conta, o caminho coerente é usar índices amplos ou fundos e não escolher empresa uma a uma. O que não funciona é escolher empresa individualmente sem nenhuma noção de valor, porque aí só sobra o preço da tela para guiar a decisão.',
    },
    {
      pergunta: 'Cheguei a um valor bem acima do preço de mercado. Encontrei uma pechincha?',
      resposta: 'Talvez, e a primeira hipótese a testar é a oposta: que as suas premissas estão otimistas demais. Refaça a conta reduzindo crescimento e margem e subindo a taxa de desconto, e veja se a faixa continua acima do preço. Em seguida, pergunte o que o mercado está enxergando que você não colocou na planilha, porque normalmente há um motivo para o desconto: dívida, judicial, concorrente novo, controlador problemático. Se depois disso a faixa se sustentar e você entender o motivo do desconto, aí sim a tese fica de pé.',
    },
    {
      pergunta: 'Duas análises da mesma empresa chegaram a valores muito diferentes. Uma delas está errada?',
      resposta: 'Não necessariamente. Valuation é um modelo alimentado por premissas, e premissas razoáveis podem divergir bastante sobre crescimento, margem e risco. Em vez de escolher qual número está certo, compare as premissas de cada uma e veja qual conjunto você acha mais defensável, e por quê. Esse exercício ensina mais do que o resultado de qualquer uma das duas contas isoladamente.',
    },
  ],
}
