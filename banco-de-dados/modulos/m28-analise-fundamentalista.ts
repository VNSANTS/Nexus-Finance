import type { Modulo } from '@/types'

export const moduloAnaliseFundamentalista: Modulo = {
  id: 'analise-fundamentalista',
  trilhaId: 'acoes-bolsa',
  numero: 5,
  titulo: 'Análise Fundamentalista',
  subtitulo: 'Avaliar o negócio antes do gráfico: o que a empresa faz e por quanto tempo faz bem',
  iconName: 'Microscope',
  duracaoMin: 16,

  aprender: {
    oQueE:
      'Análise fundamentalista avalia a empresa pelo negócio: o que ela vende, para quem, com qual vantagem sobre os concorrentes e por quanto tempo consegue manter essa vantagem. É método e postura antes de ser conta. Os indicadores numéricos vêm no módulo seguinte e o cálculo de preço justo vem depois deles.',
    porQueImporta:
      'Sem um método próprio, a escolha de empresa vira uma coleção de opiniões alheias, e opinião alheia não sustenta ninguém em uma queda de trinta por cento. Quem escreveu a própria tese sabe o que precisa acontecer para ela funcionar e sabe reconhecer quando ela quebrou. Quem não escreveu vive alternando entre esperar melhorar e vender no fundo.',
    naPratica:
      'A espinha do módulo é um checklist de oito perguntas que serve para qualquer empresa: o que ela vende, quem são os clientes e se eles trocam de fornecedor com facilidade, qual é a vantagem competitiva e se ela dura, como a empresa ganha dinheiro em termos de margem, quanto ela deve, quem controla e como trata o minoritário, o que precisa dar certo para a tese funcionar, e o que faria você vender. A última pergunta é a que quase ninguém responde e a que mais protege.',
    passoAPasso: [
      'Descreva em uma frase o que a empresa vende e para quem',
      'Identifique a vantagem competitiva e teste se ela resiste a um concorrente com dinheiro',
      'Leia margens, endividamento e retorno sobre capital ao longo de vários anos',
      'Investigue quem controla a empresa e o histórico dele com minoritários',
      'Escreva a tese em três linhas, incluindo o que faria você vender',
    ],
    errosComuns: [
      'Analisar apenas o setor da moda e ignorar o resto do mercado',
      'Decidir com base em um único indicador isolado',
      'Confundir empresa conhecida do dia a dia com empresa boa de investimento',
      'Ignorar governança e o histórico do controlador',
      'Não escrever a tese e por isso nunca conseguir revisá-la depois',
    ],
    comparativo: {
      titulo: 'Fundamentalista e técnica: o que cada escola faz',
      linhas: [
        { label: 'Fundamentalista · o que analisa', valor: 'O negócio: produto, clientes, margens, dívida, governança' },
        { label: 'Fundamentalista · horizonte', valor: 'Anos · a tese precisa de tempo para se confirmar ou se romper' },
        { label: 'Fundamentalista · quando serve', valor: 'Decidir o que comprar e por quê, e quando a tese deixou de valer' },
        { label: 'Técnica · o que analisa', valor: 'O comportamento do preço e do volume no gráfico' },
        { label: 'Técnica · horizonte', valor: 'Dias a meses · foco em pontos de entrada e de saída' },
        { label: 'Técnica · quando serve', valor: 'Definir momento de execução e limitar perda com stop, dentro de um plano' },
      ],
    },
    checklist: [
      'Consigo explicar o que a empresa vende em uma frase',
      'Sei qual é a vantagem competitiva dela e por que ela dura',
      'Olhei margens, dívida e retorno sobre capital ao longo de vários anos',
      'Sei quem controla a empresa e em qual segmento de listagem ela está',
      'Escrevi a tese em três linhas e defini o que me faria vender',
    ],
    livroRelacionado: {
      livroId: 'o-investidor-inteligente',
      textoConexao:
        'A contribuição central de Graham é a ideia de margem de segurança: comprar com desconto suficiente sobre o valor estimado para que um erro de cálculo seu não vire prejuízo permanente.',
    },
  },

  mapaMental: {
    label: 'Análise Fundamentalista',
    subtitulo: 'Avaliar o negócio antes do gráfico: o que a empresa faz e por quanto tempo faz bem',
    ramos: [
      {
        id: 'negocio',
        label: 'O negócio',
        cor: '#00D4FF',
        resumo: 'O ponto de partida',
        filhos: [
          {
            label: 'O que vende',
            desc: 'Se você não consegue explicar em uma frase, é sinal de que ainda não entendeu o suficiente para comprar.',
            netos: [
              { label: 'Teste simples', desc: 'Explique para alguém que não investe. Se a pessoa entender, você entendeu. Se você se perder, falta estudo.' },
            ],
          },
          { label: 'Para quem vende', desc: 'Cliente concentrado é risco: perder um contrato muda a empresa inteira. Cliente pulverizado é força e estabilidade.' },
          { label: 'Como ganha dinheiro', desc: 'Margem alta com pouco volume e margem baixa com muito giro são modelos diferentes, com riscos diferentes.' },
          { label: 'Poder de repassar preço', desc: 'Quem consegue subir preço sem perder cliente atravessa inflação sem sofrer. É um dos sinais mais confiáveis de força.' },
        ],
      },
      {
        id: 'vantagem',
        label: 'Vantagem competitiva',
        cor: '#22C55E',
        resumo: 'O que protege o lucro',
        filhos: [
          {
            label: 'Moat',
            desc: 'O fosso que separa a empresa do concorrente. A pergunta que importa é quanto tempo ele resiste, não se ele existe hoje.',
            netos: [
              { label: 'O teste do bilhão', desc: 'Se um concorrente com muito dinheiro entrasse amanhã, o que impediria ele de tomar o mercado? A resposta é o moat.' },
            ],
          },
          { label: 'Marca', desc: 'Quando o cliente aceita pagar mais só pelo nome, existe valor que não aparece no balanço.' },
          { label: 'Custo baixo', desc: 'Produzir mais barato que todo mundo é o que permite sobreviver e ganhar mercado quando o setor aperta.' },
          { label: 'Custo de troca', desc: 'Quando mudar de fornecedor dá trabalho, custa dinheiro ou paralisa a operação, o cliente fica mesmo insatisfeito.' },
          { label: 'Efeito de rede', desc: 'Quanto mais gente usa, mais valioso o serviço fica para todos. É a vantagem mais difícil de atacar quando se consolida.' },
        ],
      },
      {
        id: 'numeros',
        label: 'Os números',
        cor: '#3B82F6',
        resumo: 'O que o balanço conta',
        filhos: [
          {
            label: 'Crescimento de receita',
            desc: 'A empresa está vendendo mais? E esse crescimento veio da operação ou da compra de outras empresas?',
            netos: [
              { label: 'Orgânico versus aquisição', desc: 'Crescer comprando concorrente esconde estagnação da operação. Vale separar as duas coisas antes de comemorar.' },
            ],
          },
          { label: 'Margens', desc: 'A tendência ao longo dos anos diz mais que o valor de um trimestre. Margem caindo é o alerta mais antigo que existe.' },
          { label: 'Endividamento', desc: 'A dívida líquida sobre a geração de caixa mostra quantos anos de operação seriam necessários para quitar tudo.' },
          { label: 'Retorno sobre o capital', desc: 'A empresa gera bom retorno sobre o dinheiro que emprega? Empresa que cresce destruindo capital cresce para o lugar errado.' },
        ],
      },
      {
        id: 'governanca',
        label: 'Governança',
        cor: '#FFC93C',
        resumo: 'Quem manda e como trata você',
        filhos: [
          { label: 'Quem controla', desc: 'O histórico do controlador é o melhor previsor de como o minoritário será tratado quando houver conflito de interesse.' },
          { label: 'Segmento de listagem', desc: 'Novo Mercado exige mais transparência e direitos mais iguais entre acionistas. É um filtro rápido e informativo.' },
          {
            label: 'Partes relacionadas',
            desc: 'Negócios da empresa com outras empresas do próprio dono merecem leitura atenta nas notas explicativas.',
            netos: [
              { label: 'Por que olhar', desc: 'É por onde valor sai da companhia para o bolso do controlador sem que nada pareça irregular na superfície.' },
            ],
          },
          { label: 'Conselho independente', desc: 'Quem de fato fiscaliza a gestão. Conselho formado só por gente ligada ao controlador não fiscaliza ninguém.' },
        ],
      },
      {
        id: 'tese',
        label: 'A tese',
        cor: '#8B5CF6',
        resumo: 'O que separa método de palpite',
        filhos: [
          {
            label: 'Escrever três linhas',
            desc: 'Por que comprei, o que precisa dar certo e o que me faria vender. Três frases resolvem mais que dez planilhas.',
            netos: [
              { label: 'Por que por escrito', desc: 'A memória reescreve a tese para justificar a posição atual. O papel não deixa.' },
            ],
          },
          { label: 'Critério de venda', desc: 'Definido antes da compra, com a cabeça fria. Definir durante a queda é decidir com medo, e medo decide mal.' },
          { label: 'Revisar por trimestre', desc: 'Comparar o que aconteceu com o que a tese previa. É assim que se descobre cedo que a tese quebrou.' },
          { label: 'Margem de segurança', desc: 'Comprar com desconto sobre o que você calculou, justamente porque a sua conta pode estar errada.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Valuation Rápido',
    intro:
      'A análise do negócio só vira decisão quando encontra um preço. Use a ferramenta para transformar as suas conclusões qualitativas em uma faixa de valor e ver quanto de desconto o mercado está oferecendo.',
    passos: [
      'Abra Ferramentas → Valuation Rápido',
      'Informe o lucro atual da empresa que você estudou',
      'Coloque um crescimento coerente com o que a sua análise do negócio sustenta',
      'Defina a taxa de desconto pensando no risco daquela empresa específica',
      'Compare a faixa que aparecer com o preço de mercado e veja se existe margem de segurança',
    ],
    exemploGuiado:
      'Exemplo: você concluiu que a empresa tem vantagem competitiva sólida e consegue repassar preço. Isso justifica projetar crescimento acima da inflação por alguns anos. Coloque essa premissa na ferramenta e veja a faixa de valor que aparece. Depois reduza o crescimento pela metade, simulando um concorrente forte entrando no mercado, e observe o quanto a faixa desce. A distância entre os dois resultados mostra exatamente quanto da sua tese depende daquela vantagem competitiva continuar existindo. Se o preço de mercado já embute o cenário otimista, não sobrou margem para erro.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que a análise fundamentalista avalia?', verso: 'O negócio: o que a empresa vende, para quem, com qual vantagem competitiva e por quanto tempo consegue mantê-la. Os números entram para confirmar ou desmentir essa leitura.' },
    { id: 'fc2', frente: 'O que é um moat?', verso: 'A vantagem que protege a empresa da concorrência. Pode vir de marca, custo baixo, custo de troca ou efeito de rede. A pergunta relevante é quanto tempo ele resiste.' },
    { id: 'fc3', frente: 'Por que a tese precisa ser escrita?', verso: 'Porque a memória reescreve o motivo da compra para justificar a posição atual. No papel dá para comparar o que você esperava com o que aconteceu de fato.' },
    { id: 'fc4', frente: 'Qual pergunta do checklist quase ninguém responde?', verso: 'O que faria você vender. Sem esse critério definido antes, qualquer queda vira uma decisão tomada com medo, no pior momento possível.' },
    { id: 'fc5', frente: 'Por que crescimento por aquisição merece atenção?', verso: 'Porque ele pode esconder uma operação estagnada. Vale separar quanto do crescimento veio da operação existente e quanto veio de comprar outras empresas.' },
    { id: 'fc6', frente: 'O que são partes relacionadas e por que olhar?', verso: 'Negócios entre a empresa e outras companhias do mesmo controlador. É um dos caminhos pelos quais valor sai da companhia sem que nada pareça irregular por fora.' },
  ],

  quiz: [
    {
      pergunta: 'Qual das perguntas abaixo é a que mais protege o investidor em uma queda?',
      alternativas: ['Qual foi a alta dos últimos doze meses?', 'O que me faria vender?', 'Quantos analistas cobrem a empresa?', 'Qual o preço-alvo do banco?'],
      correta: 1,
      explicacao: 'O critério de venda definido antes da compra é o que impede decisões tomadas no susto. Sem ele, toda queda vira uma negociação com a própria ansiedade.',
    },
    {
      pergunta: 'Uma empresa muito conhecida e presente no dia a dia é necessariamente um bom investimento?',
      alternativas: ['Sim, familiaridade reduz risco', 'Não, conhecer o produto não diz nada sobre o negócio nem sobre o preço pago', 'Sim, se ela paga dividendo', 'Depende apenas do setor'],
      correta: 1,
      explicacao: 'Familiaridade com o produto é um bom ponto de partida para estudar, e nada além disso. O que decide é a qualidade do negócio e o preço que você paga por ela.',
    },
    {
      pergunta: 'A margem líquida de uma empresa vem caindo há quatro anos seguidos, mesmo com a receita subindo. O que isso sugere?',
      alternativas: ['Nada, receita subindo já basta', 'Que a empresa está ganhando mercado', 'Que a empresa pode estar perdendo poder de precificação ou vendo custos subirem', 'Que o dividendo vai aumentar'],
      correta: 2,
      explicacao: 'Vender mais ganhando menos por venda costuma indicar concorrência apertando ou custo escapando. A tendência da margem ao longo dos anos é um dos alertas mais antecipados que existem.',
    },
    {
      pergunta: 'O que o segmento de listagem de uma empresa ajuda a avaliar?',
      alternativas: ['O potencial de valorização', 'O nível de exigência de governança e de direitos do minoritário', 'A liquidez diária do papel', 'O dividend yield esperado'],
      correta: 1,
      explicacao: 'O segmento indica quais regras de transparência e de tratamento entre acionistas a empresa aceitou cumprir. Não promete retorno, mas informa sobre o risco de governança.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso saber ler balanço para investir em ações?',
      resposta: 'Para investir em empresas individuais escolhidas por você, sim, ao menos o básico: se a receita cresce, se a margem se mantém, quanto a empresa deve e se ela gera caixa. Isso se aprende em algumas semanas e não exige formação em contabilidade. Se você não pretende chegar nesse nível, existe um caminho perfeitamente legítimo, que é usar fundos ou índices amplos e não escolher empresa uma a uma. O erro é escolher empresa individualmente sem ler nada.',
    },
    {
      pergunta: 'Análise fundamentalista funciona no Brasil, com tanta instabilidade?',
      resposta: 'Ela funciona no sentido de te dar critério, e não no sentido de garantir retorno. Em um país com juro real alto e ciclos políticos fortes, o preço das ações pode se descolar dos fundamentos por bastante tempo, o que exige mais paciência do que em mercados mais estáveis. O que o método entrega é saber por que você comprou e reconhecer quando a tese quebrou. Nenhuma escola de análise entrega mais que isso.',
    },
    {
      pergunta: 'Estudei uma empresa por semanas, comprei, e a ação caiu. Errei?',
      resposta: 'Não necessariamente, e essa é uma das confusões mais caras que existem. Decisão e resultado são coisas separadas: dá para decidir bem e ter um resultado ruim, e dá para decidir mal e ter sorte. A pergunta certa é se algo na tese mudou. Se a empresa segue vendendo, com margem estável e sem dívida nova, você tem uma queda de preço e não uma quebra de tese. Se a margem despencou ou o controlador fez algo que você não previu, aí sim a tese pede revisão.',
    },
  ],
}
