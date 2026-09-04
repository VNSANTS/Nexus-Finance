import type { Modulo } from '@/types'

export const moduloMentalidadeInvestidor: Modulo = {
  id: 'mentalidade-investidor',
  trilhaId: 'fundamentos',
  numero: 3,
  titulo: 'Mentalidade de Investidor',
  subtitulo: 'Trocar "quanto rende?" pela pergunta certa',
  iconName: 'Brain',
  duracaoMin: 10,

  aprender: {
    oQueE:
      'Mentalidade de investidor é o conjunto de crenças operacionais que separa quem investe de quem aposta. São basicamente três: tempo é o ativo mais poderoso, risco e retorno andam juntos, e não existe retorno alto e garantido ao mesmo tempo.',
    porQueImporta:
      'O brasileiro médio ainda trata investimento por dois extremos: como aposta ou como poupança. O primeiro leva a pirâmide e a day trade; o segundo leva a perder para a inflação em silêncio por décadas. Nenhum dos dois é investir.',
    naPratica:
      'A pergunta "qual o melhor investimento?" não tem resposta. A pergunta que tem resposta é "qual investimento serve para este dinheiro, neste prazo, com este nível de risco que eu aguento?". Também vale internalizar uma distinção que evita a maior parte dos prejuízos: volatilidade é o preço balançar, e perda permanente é o valor não voltar. A primeira é o custo de entrada da renda variável; a segunda vem de empresa quebrando, fraude ou venda no fundo por pânico.',
    passoAPasso: [
      'Separe seu dinheiro por horizonte: 1 ano, 5 anos, 20 anos',
      'Aceite que volatilidade não é o mesmo que perda',
      'Decida a alocação antes de comprar, não durante a queda',
      'Escreva a tese de cada investimento em três linhas',
      'Combine consigo mesmo, por escrito, o que fará numa queda de 30%',
    ],
    errosComuns: [
      'Buscar o "melhor investimento" em vez do adequado ao prazo',
      'Trocar de estratégia a cada notícia',
      'Confundir volatilidade com risco real',
      'Copiar carteira de influenciador sem saber o horizonte dele',
      'Aportar em promessa de retorno fixo e alto',
    ],
    comparativo: {
      titulo: 'Poupador, investidor e apostador',
      linhas: [
        { label: 'Poupador', valor: 'Horizonte curto · foge de risco · perde para a inflação' },
        { label: 'Investidor', valor: 'Horizonte longo · aceita risco medido · aporta na queda' },
        { label: 'Apostador', valor: 'Horizonte de dias · busca ganho rápido · sai no prejuízo' },
      ],
    },
    checklist: [
      'Separei meu dinheiro por horizonte de uso',
      'Entendi a diferença entre volatilidade e perda permanente',
      'Escrevi a tese dos meus investimentos',
      'Defini o que farei numa queda forte, antes que ela aconteça',
      'Sei reconhecer promessa de retorno alto e garantido como fraude',
    ],
    livroRelacionado: {
      livroId: 'pai-rico-pai-pobre',
      textoConexao:
        'A ideia central de Kiyosaki é que a diferença entre as duas mentalidades não está na renda, e sim em como cada uma enxerga risco, tempo e o próprio dinheiro trabalhando.',
    },
  },

  mapaMental: {
    label: 'Mentalidade de Investidor',
    subtitulo: 'Trocar "quanto rende?" por "que risco eu aceito, por quanto tempo?"',
    ramos: [
      {
        id: 'tempo',
        label: 'Tempo',
        cor: '#00D4FF',
        resumo: 'A única variável que não volta',
        filhos: [
          { label: 'Horizonte', desc: 'A data em que você vai precisar do dinheiro. É ela que define onde investir, não a rentabilidade da tela.' },
          { label: 'Começar cedo', desc: 'Quem começa aos 20 pode aportar menos da metade de quem começa aos 35 e chegar ao mesmo lugar.' },
          { label: 'Longo prazo alisa', desc: 'Quanto maior o prazo, menor a chance de um único ano ruim definir o seu resultado final.' },
          { label: 'Custo de esperar', desc: 'Cada ano parado esperando o momento certo é um ano a menos de juro composto trabalhando por você.' },
        ],
      },
      {
        id: 'risco',
        label: 'Risco e retorno',
        cor: '#FFC93C',
        resumo: 'Andam sempre juntos',
        filhos: [
          { label: 'Prêmio de risco', desc: 'O retorno extra que você exige para aceitar incerteza. Sem risco, não existe prêmio.' },
          {
            label: 'Volatilidade',
            desc: 'O preço balançar. Incomoda, mas não é o mesmo que perder dinheiro.',
            netos: [
              { label: 'Perda permanente', desc: 'Quando o valor não volta: empresa quebra, fraude, ou venda no fundo por pânico. Este é o risco que importa.' },
            ],
          },
          { label: 'Não existe alto e garantido', desc: 'Se prometem retorno alto sem risco, é fraude ou mentira por omissão. Não há exceção.' },
        ],
      },
      {
        id: 'armadilhas',
        label: 'Armadilhas',
        cor: '#EF4444',
        resumo: 'O que aparece disfarçado',
        filhos: [
          { label: 'Pirâmide', desc: 'Paga os antigos com dinheiro dos novos. O sinal é sempre o mesmo: retorno fixo alto e ganho por indicar pessoas.' },
          { label: 'FOMO', desc: 'Medo de ficar de fora. É o gatilho que faz comprar no topo, sempre depois de a alta já ter acontecido.' },
          { label: 'Dica de rede social', desc: 'Você fica sabendo da compra e nunca da venda. Não sabe o horizonte nem o bolso de quem indicou.' },
          { label: 'Promessa de day trade', desc: 'A maioria dos operadores individuais perde dinheiro de forma consistente. O produto vendido é o curso, não o resultado.' },
        ],
      },
      {
        id: 'disciplina',
        label: 'Disciplina',
        cor: '#22C55E',
        resumo: 'Regras acima de humor',
        filhos: [
          { label: 'Aporte constante', desc: 'Investir todo mês, independentemente do noticiário, tira a decisão do campo emocional.' },
          { label: 'Tese escrita', desc: 'Três linhas sobre por que você comprou. Serve para saber depois se mudou o fato ou apenas o preço.' },
          { label: 'Plano para a queda', desc: 'Decidir o que fazer numa queda de 30% antes de ela acontecer. Durante, é tarde.' },
          { label: 'Não olhar todo dia', desc: 'Acompanhar demais aumenta a chance de mexer, e mexer demais destrói retorno.' },
        ],
      },
      {
        id: 'identidade',
        label: 'Identidade',
        cor: '#8B5CF6',
        resumo: 'Sócio, não apostador',
        filhos: [
          { label: 'Sócio de empresas', desc: 'Comprar ação é comprar pedaço de negócio real, não bilhete premiado.' },
          { label: 'Paciência é vantagem', desc: 'É a única vantagem competitiva do pequeno investidor sobre o profissional, que precisa mostrar resultado todo trimestre.' },
          { label: 'Errar barato', desc: 'Errar com pouco dinheiro e cedo é o curso mais eficiente que existe.' },
          { label: 'Processo acima do resultado', desc: 'Um ano bom pode ser sorte. O processo é o que se repete ao longo de décadas.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'A melhor demonstração de mentalidade de investidor não é sobre valor, é sobre tempo. Aqui a variável que muda não é quanto você aporta, é quando você começa.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Use um aporte mensal fixo, por exemplo R$ 300, com taxa de 0,8% ao mês',
      'Simule 40 anos, como se você começasse aos 20',
      'Simule 30 anos, como se começasse aos 30',
      'Simule 20 anos e compare os três resultados finais',
    ],
    exemploGuiado:
      'Exemplo: R$ 300 por mês a 0,8% ao mês. Em 20 anos, cerca de R$ 175 mil. Em 30 anos, mais de R$ 450 mil. Em 40 anos, ultrapassa R$ 1,1 milhão. O aporte é o mesmo nos três casos — muda só o tempo. Nenhuma escolha de ativo produz uma diferença dessa magnitude.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a diferença entre volatilidade e perda permanente?', verso: 'Volatilidade é o preço balançar e voltar. Perda permanente é o valor não voltar: empresa quebrando, fraude ou venda no fundo por pânico.' },
    { id: 'fc2', frente: 'Existe investimento com retorno alto e garantido?', verso: 'Não. Toda promessa nesse formato é fraude ou omissão. Retorno maior sempre vem acompanhado de risco maior.' },
    { id: 'fc3', frente: 'Qual a vantagem do pequeno investidor sobre o profissional?', verso: 'Tempo. Ele não presta contas trimestrais a ninguém e pode esperar anos por uma tese, o que um gestor raramente pode.' },
    { id: 'fc4', frente: 'Por que decidir o que fazer numa queda antes dela acontecer?', verso: 'Porque durante a queda a decisão é tomada pelo medo. A regra escrita em um momento calmo é o que sobrevive à emoção.' },
    { id: 'fc5', frente: 'Como identificar uma pirâmide financeira?', verso: 'Retorno fixo e alto prometido, ganho por indicar novas pessoas, e ausência de uma atividade real que gere aquele retorno.' },
    { id: 'fc6', frente: 'Qual pergunta substitui "qual o melhor investimento?"', verso: '"Qual investimento serve para este dinheiro, neste prazo, com o risco que eu consigo aguentar?" A primeira não tem resposta; a segunda tem.' },
  ],

  quiz: [
    {
      pergunta: 'Uma plataforma promete 5% ao mês garantidos, sem risco. O que isso indica?',
      alternativas: ['Uma boa oportunidade que poucos conhecem', 'Fraude ou omissão: não existe retorno alto e garantido', 'Um investimento agressivo, mas legítimo', 'Um fundo de alta performance'],
      correta: 1,
      explicacao: '5% ao mês composto ultrapassa 79% ao ano. Nenhuma atividade econômica sustenta isso de forma garantida. É a assinatura de praticamente todo esquema financeiro.',
    },
    {
      pergunta: 'Sua carteira de ações caiu 25% em três meses. Você não precisa desse dinheiro por 15 anos. Qual a atitude coerente?',
      alternativas: ['Vender tudo para não perder mais', 'Verificar se as teses continuam válidas e manter os aportes', 'Parar de aportar até o mercado melhorar', 'Trocar tudo por criptomoedas'],
      correta: 1,
      explicacao: 'Com horizonte de 15 anos, queda de preço sem mudança de fundamento é volatilidade, não perda. Parar de aportar na baixa é justamente abrir mão de comprar barato.',
    },
    {
      pergunta: 'Qual dinheiro pode ir para renda variável?',
      alternativas: ['A reserva de emergência', 'A entrada do imóvel que você compra em um ano', 'Dinheiro que pode ficar aplicado por 5 anos ou mais', 'O salário do mês'],
      correta: 2,
      explicacao: 'Renda variável exige prazo para atravessar ciclos. Dinheiro com uso próximo precisa estar em algo que não oscile no momento do saque.',
    },
    {
      pergunta: 'O que pesa mais no resultado final de um investidor de longo prazo?',
      alternativas: ['Escolher a melhor ação do ano', 'Começar cedo e manter aportes constantes', 'Acertar o momento de entrada', 'Acompanhar o mercado diariamente'],
      correta: 1,
      explicacao: 'Tempo e constância produzem diferenças de várias vezes no resultado final. Seleção de ativo e timing raramente compensam anos perdidos.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso acompanhar o mercado todo dia?',
      resposta: 'Não, e fazer isso costuma piorar o resultado. Acompanhar demais aumenta a vontade de mexer, e cada mexida é uma chance de errar. Uma revisão trimestral dos fundamentos resolve.',
    },
    {
      pergunta: 'E se eu perder tudo?',
      resposta: 'Investindo à vista em ativos diversificados e regulados, perder tudo exigiria que todas as empresas e emissores quebrassem ao mesmo tempo. O risco real de perder tudo aparece em alavancagem, concentração extrema e plataformas não reguladas.',
    },
    {
      pergunta: 'Quanto preciso para começar?',
      resposta: 'Cerca de R$ 30 no Tesouro Direto. O valor nunca foi a barreira real — a barreira é a ordem: dívida cara quitada e reserva montada antes de qualquer investimento de risco.',
    },
  ],
}
