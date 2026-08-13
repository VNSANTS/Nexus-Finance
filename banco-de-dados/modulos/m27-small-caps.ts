import type { Modulo } from '@/types'

export const moduloSmallCaps: Modulo = {
  id: 'small-caps',
  trilhaId: 'acoes-bolsa',
  numero: 4,
  titulo: 'Small Caps',
  subtitulo: 'Empresas menores: mais espaço para crescer, mais chance de dar errado',
  iconName: 'Sprout',
  duracaoMin: 11,

  aprender: {
    oQueE:
      'Small cap é a empresa de menor valor de mercado, calculado pelo preço da ação vezes o número de ações existentes. A classificação em small, mid e large não fala de qualidade nem de preço, apenas de tamanho. Uma empresa pequena pode ser excelente e cara, e uma gigante pode ser ruim e barata.',
    porQueImporta:
      'É o pedaço da bolsa em que a assimetria de informação ainda existe para a pessoa física. Poucas casas de análise cobrem essas empresas, então o preço tem mais chance de estar errado, para cima ou para baixo. Esse mesmo abandono é o que cria as armadilhas de liquidez que fazem gente ficar presa em uma posição que não consegue vender.',
    naPratica:
      'O erro que mais machuca aqui não tem a ver com escolher a empresa errada. Tem a ver com tamanho de posição. Se você monta uma posição comparável ao que o papel negocia em um dia inteiro, você virou o mercado daquele ativo: entrou empurrando o preço para cima e vai sair empurrando para baixo. Antes de decidir se a empresa é boa, olhe o volume médio diário e defina o teto da sua posição a partir dele.',
    passoAPasso: [
      'Defina antes o percentual máximo da carteira que vai ficar em small caps',
      'Cheque o volume médio diário do papel antes de olhar qualquer indicador',
      'Dimensione a posição em relação a esse volume, não ao seu entusiasmo',
      'Estude a tese com mais rigor do que faria em uma empresa grande',
      'Aceite que a tese pode levar anos e não acompanhe o preço todo dia',
    ],
    errosComuns: [
      'Montar posição grande demais para a liquidez que o papel oferece',
      'Confundir empresa pequena com empresa barata',
      'Ignorar governança e o histórico de quem controla a empresa',
      'Comprar por indicação de fórum ou de rede social sem estudar nada',
      'Esquecer que sair da posição é bem mais difícil do que entrar nela',
    ],
    comparativo: {
      titulo: 'Small, mid e large cap',
      linhas: [
        { label: 'Small cap · liquidez', valor: 'Baixa · a saída é o problema, não a entrada' },
        { label: 'Small cap · cobertura', valor: 'Poucos analistas · mais chance de o preço estar errado nos dois sentidos' },
        { label: 'Small cap · volatilidade', valor: 'Alta · cai mais que o índice em crise e sobe mais em euforia' },
        { label: 'Mid cap · perfil', valor: 'Liquidez razoável · cobertura parcial · meio do caminho em risco e potencial' },
        { label: 'Large cap · liquidez', valor: 'Alta · dá para montar e desmontar posição grande sem mover o preço' },
        { label: 'Large cap · cobertura', valor: 'Muitos analistas · preço mais eficiente e menos espaço para vantagem informacional' },
      ],
    },
    checklist: [
      'Defini o teto de small caps na minha carteira antes de comprar qualquer uma',
      'Sei o volume médio diário de cada small cap que tenho',
      'Minha posição é pequena em relação ao que o papel negocia por dia',
      'Conheço quem controla a empresa e em qual segmento de listagem ela está',
      'Escrevi a tese e o prazo que estou disposto a esperar',
    ],
    livroRelacionado: {
      livroId: 'o-jeito-peter-lynch-de-investir',
      textoConexao:
        'Lynch defendia que o investidor comum pode enxergar antes do mercado justamente em empresas menores e pouco acompanhadas, desde que estude o negócio de verdade em vez de comprar pela história bonita.',
    },
  },

  mapaMental: {
    label: 'Small Caps',
    subtitulo: 'Empresas menores: mais espaço para crescer, mais chance de dar errado',
    ramos: [
      {
        id: 'o-que-sao',
        label: 'O que são',
        cor: '#EC4899',
        resumo: 'Uma classificação de tamanho',
        filhos: [
          {
            label: 'Valor de mercado',
            desc: 'Preço da ação multiplicado pelo número de ações. É esse número que separa small, mid e large cap.',
            netos: [
              { label: 'O que ele não diz', desc: 'Nada sobre preço estar caro ou barato. Empresa pequena pode negociar por múltiplos altíssimos.' },
            ],
          },
          { label: 'Small cap', desc: 'Empresas de menor valor de mercado, normalmente fora do topo do Ibovespa e presentes em índices próprios.' },
          { label: 'Menos analistas cobrindo', desc: 'Menos gente estudando significa mais chance de o preço estar errado, e o erro pode ser para qualquer um dos dois lados.' },
          { label: 'Não confundir', desc: 'Tamanho é uma coisa, qualidade é outra e preço é uma terceira. Misturar as três é o começo da maioria dos erros aqui.' },
        ],
      },
      {
        id: 'atrativos',
        label: 'Atrativos',
        cor: '#22C55E',
        resumo: 'Por que atraem tanta gente',
        filhos: [
          { label: 'Espaço de crescimento', desc: 'É aritmeticamente mais fácil dobrar de tamanho partindo de uma base pequena do que de uma base gigante.' },
          {
            label: 'Assimetria de informação',
            desc: 'Quem estuda a fundo pode enxergar antes do mercado, porque há pouca gente olhando aquela empresa.',
            netos: [
              { label: 'A contrapartida', desc: 'Essa vantagem só existe para quem realmente estuda. Para quem segue dica, a assimetria trabalha contra.' },
            ],
          },
          { label: 'Aquisição', desc: 'Empresas pequenas e bem posicionadas viram alvo de compra por empresas grandes, o que costuma acontecer com prêmio sobre o preço de tela.' },
          { label: 'O contraponto honesto', desc: 'Todos esses atrativos existem, e nenhum deles garante resultado. A dispersão entre acertos e erros é muito maior aqui.' },
        ],
      },
      {
        id: 'riscos',
        label: 'Riscos',
        cor: '#EF4444',
        resumo: 'Onde a coisa desanda',
        filhos: [
          {
            label: 'Liquidez',
            desc: 'Pouca negociação por dia. Você entra com facilidade e pode não conseguir sair sem derrubar o próprio preço.',
            netos: [
              { label: 'O cenário que dói', desc: 'Notícia ruim sai, todo mundo quer vender ao mesmo tempo e não existe comprador do outro lado do book.' },
            ],
          },
          { label: 'Concentração', desc: 'Depender de poucos clientes, de um único produto ou de uma só região. Um contrato perdido muda a empresa inteira.' },
          { label: 'Governança', desc: 'Estrutura menor, controle familiar e menos transparência. O minoritário tem menos proteção quando as coisas apertam.' },
          { label: 'Volatilidade', desc: 'Cai bem mais que o índice em crise e sobe mais em euforia. Quem não aguenta a oscilação vende no pior momento.' },
        ],
      },
      {
        id: 'dimensionar',
        label: 'Como dimensionar',
        cor: '#FFC93C',
        resumo: 'A parte que salva a carteira',
        filhos: [
          { label: 'Percentual pequeno', desc: 'Small caps funcionam como fatia satélite da carteira. Colocar o núcleo aqui expõe todo o seu patrimônio ao risco mais alto da bolsa.' },
          {
            label: 'Posição versus volume diário',
            desc: 'Se a sua posição é grande perto do que o papel negocia por dia, você se tornou o mercado daquele ativo.',
            netos: [
              { label: 'Regra prática', desc: 'Pense em quantos dias de negociação você precisaria para desmontar a posição inteira. Se a resposta assusta, a posição está grande.' },
            ],
          },
          { label: 'Prazo longo', desc: 'Tese de small cap costuma levar anos para se realizar, porque depende de a empresa executar e de o mercado perceber.' },
          { label: 'Diversificar dentro do satélite', desc: 'Concentrar toda a fatia de risco em uma única empresa pequena junta os dois piores riscos no mesmo lugar.' },
        ],
      },
      {
        id: 'analise',
        label: 'Análise mais rigorosa',
        cor: '#00D4FF',
        resumo: 'Mais exigência, não menos',
        filhos: [
          { label: 'Caixa e dívida', desc: 'Empresa pequena com dívida alta não atravessa crise. O balanço aqui é questão de sobrevivência, não de otimização.' },
          { label: 'Quem manda', desc: 'O histórico do controlador pesa mais em empresa pequena do que em empresa grande, porque há menos contrapesos institucionais.' },
          { label: 'Segmento de listagem', desc: 'Novo Mercado indica regras de governança mais rígidas e direitos mais iguais entre acionistas. É um filtro simples e útil.' },
          { label: 'Ler o release trimestral', desc: 'Em empresa pouco coberta, o material que ela mesma divulga costuma ser a sua principal fonte. Ler dá trabalho e é o trabalho.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'A decisão que mais importa em small caps é de tamanho, e não de escolha. Use a ferramenta de alocação para enxergar o peso dessa fatia dentro da carteira inteira antes de comprar.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Monte sua alocação alvo separando o núcleo da carteira da fatia satélite',
      'Coloque small caps dentro do satélite e defina um teto percentual para ele',
      'Informe a alocação atual e veja quanto falta ou quanto sobra nessa fatia',
      'Guarde esse teto como regra e volte à ferramenta a cada aporte em vez de decidir no impulso',
    ],
    exemploGuiado:
      'Exemplo: uma carteira com uma fatia satélite pequena em small caps. Se essa fatia cair pela metade em um ano ruim, o impacto na carteira inteira é limitado e você continua conseguindo dormir. Agora imagine a mesma queda com essa fatia ocupando um terço do patrimônio: o estrago passa a ser grande o suficiente para provocar a venda no pior momento possível. As empresas escolhidas foram exatamente as mesmas nos dois casos. O que mudou foi o tamanho da aposta.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que define uma small cap?', verso: 'O valor de mercado, que é o preço da ação vezes o número de ações. É uma classificação de tamanho e não diz nada sobre qualidade nem sobre preço estar caro ou barato.' },
    { id: 'fc2', frente: 'Por que existe mais chance de o preço estar errado em small caps?', verso: 'Porque poucas casas de análise cobrem essas empresas. Com menos gente estudando, o preço se descola do valor com mais frequência, para cima ou para baixo.' },
    { id: 'fc3', frente: 'Qual é o risco mais específico de small caps?', verso: 'Liquidez. Entrar é fácil e sair pode não ser, porque não há volume suficiente do outro lado do book quando muita gente quer vender ao mesmo tempo.' },
    { id: 'fc4', frente: 'Como dimensionar uma posição em small cap?', verso: 'Comparando o tamanho pretendido com o volume médio diário do papel. Se você precisaria de muitos dias de negociação para sair, a posição está grande demais.' },
    { id: 'fc5', frente: 'Por que governança pesa mais em empresa pequena?', verso: 'Porque a estrutura é menor, o controle costuma ser familiar e existem menos contrapesos institucionais. O minoritário tem menos proteção se o controlador agir contra ele.' },
    { id: 'fc6', frente: 'O que o segmento de listagem indica?', verso: 'O nível de exigência de governança e de transparência que a empresa aceitou cumprir. Novo Mercado é o mais rígido, e serve como filtro inicial simples.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é o maior risco prático de montar uma posição grande em uma small cap pouco negociada?',
      alternativas: ['O imposto é maior', 'Não conseguir vender sem derrubar o próprio preço', 'A corretora cobra mais caro', 'A empresa não paga dividendo'],
      correta: 1,
      explicacao: 'É o risco de liquidez. A entrada acontece sem dificuldade, e a saída depende de existir comprador do outro lado, o que pode não acontecer justamente na hora ruim.',
    },
    {
      pergunta: 'Uma empresa é small cap. O que isso permite concluir sobre o preço dela?',
      alternativas: ['Que está barata', 'Que está cara', 'Nada, porque tamanho e preço são coisas diferentes', 'Que vai crescer mais que a média'],
      correta: 2,
      explicacao: 'Valor de mercado mede tamanho. Uma empresa pequena pode negociar por múltiplos altos e uma gigante pode estar descontada. Confundir os dois é o erro de partida do módulo.',
    },
    {
      pergunta: 'Como small caps costumam se comportar em uma crise de mercado?',
      alternativas: ['Caem menos que o índice, por serem menores', 'Ficam estáveis, por terem menos investidores', 'Caem mais que o índice e demoram mais para recuperar liquidez', 'Não são afetadas por crise'],
      correta: 2,
      explicacao: 'A combinação de negócio mais frágil e liquidez baixa amplifica a queda. Em euforia acontece o inverso, e essa amplitude nos dois sentidos é a característica central da classe.',
    },
    {
      pergunta: 'Qual é o papel mais razoável das small caps em uma carteira?',
      alternativas: ['O núcleo, por terem maior potencial', 'Uma fatia satélite com teto definido antes', 'Metade da renda variável, sempre', 'Substituir a renda fixa'],
      correta: 1,
      explicacao: 'A assimetria de resultado é grande demais para ocupar o núcleo. Como satélite com teto definido de antemão, a classe contribui sem colocar o patrimônio inteiro no risco mais alto da bolsa.',
    },
  ],

  faq: [
    {
      pergunta: 'Vi uma small cap subir muito em pouco tempo. Ainda dá para entrar?',
      resposta: 'A pergunta útil não é sobre o que já subiu, e sim sobre o que sustenta o preço de agora. Alta forte em papel pouco líquido pode vir de volume pequeno movendo muito o preço, o que se desfaz com a mesma velocidade. Antes de qualquer decisão, olhe se a tese mudou, se o resultado da empresa acompanhou e qual é o volume diário. Se a resposta for que só o preço mudou, você estaria comprando o movimento, não a empresa.',
    },
    {
      pergunta: 'Quanto da minha carteira pode ficar em small caps?',
      resposta: 'Não existe número universal, e desconfie de quem der um. O que existe é um critério: a fatia precisa ser pequena o suficiente para que uma queda forte nela não te faça vender o resto da carteira em pânico. Quem está começando, tem renda instável ou nunca passou por um ciclo de baixa costuma se dar melhor com uma fatia bem modesta. O teto certo é aquele que você consegue manter no ano ruim.',
    },
    {
      pergunta: 'Peguei uma indicação de small cap em um grupo. Isso serve de ponto de partida?',
      resposta: 'Como ponto de partida para estudar, pode servir. Como base para comprar, não. Em papel pouco líquido, uma indicação que circula em grupo grande move o preço sozinha, e quem chega depois compra de quem chegou antes. Trate a dica apenas como o nome de uma empresa para pesquisar do zero: o que ela vende, quanto deve, quem controla e quanto negocia por dia. Se a tese não se sustentar sem a indicação, ela não se sustenta.',
    },
  ],
}
