// m05-negociacao.ts
import { Modulo } from '@/types'

export const negociacao: Modulo = {
  id: 'negociacao',
  trilhaId: 'carreira-negocios',
  numero: 5,
  titulo: 'Negociação',
  subtitulo: 'Por que quem faz a primeira proposta costuma sair na frente — e outras táticas que funcionam de verdade',
  iconName: 'Handshake',
  duracaoMin: 12,

  nivel: 'intermediario',
  preRequisitos: ['carreira'],
  objetivoAprendizagem: 'Você vai sair sabendo aplicar técnicas concretas de negociação (ancoragem, BATNA, escuta ativa) em situações financeiras reais, da negociação salarial à compra de um imóvel.',
  erroFatal: 'Entrar em qualquer negociação relevante (salário, compra de imóvel, venda de um bem) sem ter definido previamente sua BATNA (a melhor alternativa caso o acordo não seja fechado) — sem essa referência clara, é fácil aceitar uma proposta ruim por medo de "não ter nada", mesmo quando existiam alternativas melhores disponíveis.',
  numeroChave: { valor: '1ª proposta', legenda: 'quem faz a primeira proposta numa negociação tende a "ancorar" a discussão em torno desse valor, segundo pesquisas recorrentes de psicologia da negociação — mesmo quando a proposta inicial está fora da faixa considerada razoável pela outra parte' },
  glossarioDoModulo: ['BATNA (melhor alternativa)', 'Ancoragem', 'ZOPA (zona de possível acordo)', 'Escuta ativa', 'Concessão recíproca', 'Ponto de reserva'],
  proximoPasso: { moduloId: 'historia-grandes-investidores', motivo: 'Depois de desenvolver habilidades práticas de negociação, vale conhecer como grandes investidores da história aplicaram princípios semelhantes de análise e paciência em decisões financeiras de grande escala.' },

  aprender: {
    oQueE: 'Negociação é o processo estruturado de buscar um acordo entre partes com interesses distintos, algo presente em praticamente toda decisão financeira relevante da vida — desde negociar salário e comprar um imóvel até vender um veículo usado ou renegociar uma dívida. Diferente da percepção popular de que negociação é sobre "ser mais esperto" ou "levar vantagem", técnicas eficazes de negociação são baseadas em preparação, entendimento dos interesses de ambas as partes e comunicação estruturada — habilidades que podem ser aprendidas e praticadas de forma consistente.',
    porQueImporta: 'Quem entra em negociações importantes sem preparação — sem saber sua alternativa caso o acordo não se concretize, sem pesquisar valores de referência, sem entender os interesses da outra parte — tende a aceitar acordos abaixo do que poderia conseguir, ou a perder oportunidades por medo de negociar. Ao longo da vida, a diferença entre negociar bem e mal se acumula: no salário, na compra de bens de alto valor, na renegociação de dívidas — impactando diretamente a velocidade de construção de patrimônio.',
    naPratica: 'A técnica de ancoragem, amplamente estudada em psicologia comportamental, mostra que a primeira proposta numa negociação tende a influenciar desproporcionalmente o resultado final, funcionando como uma "âncora" mental em torno da qual a discussão gira — por isso, em muitas situações (como negociação salarial ou de preço de um bem), fazer a primeira proposta bem embasada em dados de mercado costuma ser vantajoso. A BATNA (Best Alternative To a Negotiated Agreement, ou melhor alternativa a um acordo negociado) é o que você faria caso a negociação atual não desse certo — quanto mais forte sua BATNA (por exemplo, ter outra proposta de emprego concreta em mãos), mais poder de negociação você tem, mesmo sem precisar mencionar isso explicitamente. A ZOPA (zona de possível acordo) é a faixa de sobreposição entre o que uma parte está disposta a aceitar como mínimo e o que a outra está disposta a pagar como máximo — identificar essa faixa, mesmo que aproximadamente, ajuda a conduzir a negociação de forma mais eficiente.',
    passoAPasso: [
      'Antes de qualquer negociação relevante, defina claramente sua BATNA: o que você fará caso esse acordo específico não se concretize.',
      'Pesquise valores de referência de mercado para o que está sendo negociado (salário, preço de imóvel, valor de um bem), para embasar sua posição com dados concretos.',
      'Considere fazer a primeira proposta em situações onde você tem informação suficiente para ancorar a negociação num valor favorável e defensável.',
      'Pratique escuta ativa durante a negociação, buscando entender os interesses reais da outra parte, não apenas a posição declarada inicialmente.',
      'Prepare-se para fazer concessões recíprocas de forma estratégica, trocando itens de menor valor para você por itens de maior valor, em vez de ceder unilateralmente.',
      'Defina previamente seu ponto de reserva — o limite mínimo (ou máximo, dependendo do papel) que você está disposto a aceitar antes de recorrer à sua BATNA.'
    ],
    errosComuns: [
      'Entrar numa negociação relevante sem ter definido a própria BATNA, ficando vulnerável a aceitar acordos ruins por medo de "não ter nada".',
      'Revelar informações sensíveis (como salário mínimo aceitável) muito cedo na negociação, enfraquecendo a própria posição.',
      'Focar apenas na própria posição, sem buscar entender os interesses reais da outra parte, perdendo oportunidades de acordos mutuamente vantajosos.',
      'Aceitar a primeira contraproposta por desconforto com o processo de negociação, sem explorar se havia espaço para mais concessões.',
      'Não pesquisar valores de referência de mercado antes de negociar, ficando sem parâmetro objetivo para avaliar se a proposta é razoável.',
      'Tratar toda negociação como confronto, quando abordagens colaborativas, buscando entender interesses mútuos, costumam gerar acordos mais duradouros e satisfatórios para ambas as partes.'
    ],
    comparativo: {
      titulo: 'Negociação com BATNA forte vs. sem BATNA definida',
      linhas: [
        { label: 'Postura durante a negociação', valor: 'Com BATNA forte: mais segurança para recusar propostas ruins | Sem BATNA: maior tendência a aceitar qualquer acordo' },
        { label: 'Poder de negociação percebido', valor: 'Com BATNA forte: maior, mesmo sem mencionar explicitamente | Sem BATNA: menor, vulnerável a pressão' },
        { label: 'Risco de arrependimento pós-acordo', valor: 'Com BATNA forte: menor, decisão mais informada | Sem BATNA: maior, decisão tomada sob incerteza' },
        { label: 'Preparação necessária', valor: 'Com BATNA forte: exige pesquisa prévia de alternativas reais | Sem BATNA: nenhuma preparação específica, maior risco' }
      ]
    },
    checklist: [
      'Antes de qualquer negociação relevante, defina claramente sua BATNA.',
      'Pesquise valores de referência de mercado para embasar sua posição com dados concretos.',
      'Avalie se faz sentido fazer a primeira proposta, considerando o efeito de ancoragem.',
      'Pratique escuta ativa para entender os interesses reais da outra parte durante a negociação.',
      'Defina seu ponto de reserva antes de iniciar a conversa, evitando decisões emocionais no calor do momento.'
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'O livro reformula negociação como busca por valor mútuo, não disputa — a prática de escuta ativa para entender os interesses reais da outra parte, deste módulo, é essa filosofia aplicada a uma técnica concreta.',
    },
    naoConfundirCom: [
      { moduloId: 'carreira', diferenca: 'Carreira trata do planejamento estratégico da trajetória profissional, incluindo quando buscar uma negociação; este módulo foca especificamente nas técnicas práticas de conduzir a negociação em si, aplicável além do contexto de carreira.' },
      { moduloId: 'lideranca', diferenca: 'Liderança foca em desenvolver e influenciar pessoas de forma contínua dentro de uma relação de equipe; Negociação foca em situações pontuais de busca de acordo entre partes com interesses distintos, dentro ou fora do ambiente de trabalho.' }
    ]
  },

  mapaMental: {
    label: 'Negociação',
    subtitulo: 'Técnicas estruturadas para buscar melhores acordos',
    ramos: [
      {
        id: 'preparacao',
        label: 'Preparação',
        cor: '#3B82F6',
        resumo: 'O que fazer antes de qualquer negociação relevante',
        filhos: [
          { label: 'BATNA', desc: 'Melhor alternativa disponível caso o acordo não se concretize' },
          { label: 'Ponto de reserva', desc: 'Limite mínimo ou máximo aceitável antes de recorrer à BATNA' },
          { label: 'Pesquisa de mercado', desc: 'Dados objetivos para embasar a posição na negociação' }
        ]
      },
      {
        id: 'taticas-de-conducao',
        label: 'Táticas de Condução',
        cor: '#F59E0B',
        resumo: 'Como conduzir a conversa de forma estratégica',
        filhos: [
          { label: 'Ancoragem', desc: 'Fazer a primeira proposta influencia desproporcionalmente o resultado final' },
          { label: 'Escuta ativa', desc: 'Entender os interesses reais da outra parte, não só a posição declarada' },
          { label: 'Concessão recíproca', desc: 'Trocar itens de menor valor por itens de maior valor, de forma estratégica' }
        ]
      },
      {
        id: 'conceitos-chave',
        label: 'Conceitos-Chave',
        cor: '#22C55E',
        resumo: 'Ferramentas mentais da negociação estruturada',
        filhos: [
          { label: 'ZOPA', desc: 'Zona de possível acordo, onde as posições das duas partes se sobrepõem' },
          { label: 'Posição vs. interesse', desc: 'O que a parte diz querer vs. o que realmente motiva essa demanda' }
        ]
      },
      {
        id: 'aplicacoes-financeiras',
        label: 'Aplicações Financeiras',
        cor: '#8B5CF6',
        resumo: 'Onde negociação impacta diretamente o patrimônio',
        filhos: [
          { label: 'Negociação salarial', desc: 'Um dos momentos de maior impacto financeiro acumulado na carreira' },
          { label: 'Compra de bens de alto valor', desc: 'Imóveis, veículos e outros ativos com margem real de negociação' },
          { label: 'Renegociação de dívidas', desc: 'Redução de juros ou condições mais favoráveis de pagamento' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões práticas de negociação em situações financeiras reais e vê o resultado esperado de cada escolha, considerando os princípios de preparação e condução estratégica.',
    passos: [
      'Leia a situação envolvendo uma decisão de negociação.',
      'Escolha a alternativa que representa sua abordagem.',
      'Veja a análise do resultado, considerando os princípios de negociação eficaz.'
    ],
    exemploGuiado: 'Uma pessoa está negociando a compra de um imóvel usado, anunciado por R$ 450.000. Antes de fazer qualquer proposta, ela pesquisa o valor de mercado de imóveis semelhantes na região, descobrindo que o valor médio de venda efetiva costuma ficar entre R$ 400.000 e R$ 420.000. Ela também define sua BATNA: outro imóvel semelhante, disponível por R$ 415.000, que ela consideraria como alternativa caso essa negociação não avançasse. Com essas informações, ela faz uma primeira proposta de R$ 390.000, abaixo da faixa que considera razoável, sabendo que isso ancora a negociação num patamar mais favorável a ela. Após algumas rodadas de contraproposta, as partes chegam a um acordo em R$ 408.000 — um valor dentro da faixa que ela havia pesquisado como razoável, e melhor do que sua BATNA de R$ 415.000, resultado que dificilmente seria alcançado sem a preparação prévia.',
    cenarioGuiado: [
      {
        pergunta: 'Você está prestes a negociar seu salário numa nova proposta de emprego, mas ainda não pesquisou valores de mercado nem tem outra proposta em mãos.',
        opcoes: [
          { texto: 'Vou para a negociação mesmo assim, confiando na minha capacidade de argumentar', resultado: 'Sem BATNA definida e sem dados de mercado, você fica em posição mais vulnerável, com maior risco de aceitar uma proposta abaixo do que poderia conseguir, por falta de referência objetiva para avaliar o que é razoável.' },
          { texto: 'Pesquiso valores de mercado e busco pelo menos uma alternativa concreta antes de negociar', resultado: 'Preparação prévia, incluindo dados de mercado e uma BATNA (mesmo que não precise ser usada), fortalece significativamente sua posição de negociação, dando mais segurança para recusar propostas abaixo do esperado.' }
        ]
      },
      {
        pergunta: 'Durante uma negociação de compra de um veículo usado, o vendedor faz a primeira proposta de valor, bem acima do que você pesquisou como preço justo de mercado.',
        opcoes: [
          { texto: 'Aceito negociar a partir do valor proposto pelo vendedor, ajustando um pouco para baixo', resultado: 'Negociar a partir da âncora estabelecida pela outra parte, mesmo tentando reduzir, tende a resultar num valor final mais alto do que se você tivesse contraproposto com uma âncora própria, bem fundamentada em dados de mercado.' },
          { texto: 'Apresento minha própria contraproposta, baseada em pesquisa de mercado, estabelecendo uma nova âncora', resultado: 'Contrapor com uma proposta própria, embasada em dados, ajuda a reequilibrar a negociação, evitando que a discussão fique ancorada apenas no valor inicial estabelecido pela outra parte.' }
        ]
      },
      {
        pergunta: 'Você está renegociando uma dívida com um credor e ele oferece uma proposta que parece razoável, mas você não tem certeza se é a melhor possível.',
        opcoes: [
          { texto: 'Aceito a primeira proposta, para não correr o risco de perder as condições oferecidas', resultado: 'Aceitar a primeira proposta sem explorar alternativas ou contrapropor pode significar deixar espaço de negociação na mesa — credores frequentemente têm alguma margem adicional, especialmente quando demonstram disposição inicial para negociar.' },
          { texto: 'Agradeço a proposta, mas pergunto se há espaço para condições ainda melhores antes de decidir', resultado: 'Explorar se existe margem adicional antes de aceitar, de forma respeitosa, é uma prática comum e legítima em negociações — mesmo que a resposta seja não, isso normalmente não compromete a proposta original já feita.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'neg-01', frente: 'O que é BATNA?', verso: 'Best Alternative To a Negotiated Agreement — a melhor alternativa disponível caso a negociação atual não resulte em acordo, e uma das bases mais importantes de preparação para negociar bem.' },
    { id: 'neg-02', frente: 'O que é o efeito de ancoragem numa negociação?', verso: 'A tendência da primeira proposta feita influenciar desproporcionalmente o resultado final da negociação, funcionando como uma referência mental em torno da qual a discussão gira.' },
    { id: 'neg-03', frente: 'O que é ZOPA?', verso: 'Zona de Possível Acordo — a faixa de sobreposição entre o mínimo que uma parte aceita e o máximo que a outra está disposta a oferecer, onde um acordo mutuamente aceitável pode ser alcançado.' },
    { id: 'neg-04', frente: 'Por que é importante distinguir posição de interesse numa negociação?', verso: 'Porque a posição é o que a parte diz querer explicitamente, enquanto o interesse é a motivação real por trás dessa demanda — entender o interesse real pode abrir caminhos de acordo que a posição declarada não revela.' },
    { id: 'neg-05', frente: 'Qual é o erro mais caro relacionado à falta de preparação numa negociação, segundo o módulo?', verso: 'Entrar numa negociação relevante sem ter definido previamente a própria BATNA, ficando vulnerável a aceitar acordos ruins por medo de não ter alternativa.' },
    { id: 'neg-06', frente: 'O que é concessão recíproca numa negociação?', verso: 'A prática de trocar itens de menor valor para você por itens de maior valor, de forma estratégica, em vez de ceder unilateralmente sem retorno equivalente da outra parte.' },
    { id: 'neg-07', frente: 'Por que revelar seu valor mínimo aceitável muito cedo na negociação enfraquece sua posição?', verso: 'Porque a outra parte, ao saber esse limite, tende a ancorar a negociação próximo a ele, reduzindo o espaço para você conseguir um resultado melhor do que esse mínimo.' },
    { id: 'neg-08', frente: 'O que é ponto de reserva?', verso: 'O limite mínimo (ou máximo, dependendo do papel na negociação) que a pessoa está disposta a aceitar antes de preferir recorrer à sua BATNA em vez de fechar o acordo.' }
  ],

  quiz: [
    {
      pergunta: 'O que é BATNA e por que ela é considerada essencial na preparação para uma negociação?',
      alternativas: [
        'Um tipo de contrato legal usado em negociações formais',
        'A melhor alternativa disponível caso a negociação atual não resulte em acordo, fortalecendo a posição de quem a possui',
        'Uma taxa cobrada por mediadores profissionais de negociação',
        'Um documento obrigatório em negociações salariais no Brasil'
      ],
      correta: 1,
      explicacao: 'BATNA (Best Alternative To a Negotiated Agreement) é a referência do que a pessoa fará caso o acordo não se concretize — quanto mais forte essa alternativa, maior o poder de negociação, mesmo sem precisar mencioná-la explicitamente.'
    },
    {
      pergunta: 'O que caracteriza o efeito de ancoragem numa negociação?',
      alternativas: [
        'A tendência de sempre aceitar a última proposta feita',
        'A influência desproporcional que a primeira proposta feita tem sobre o resultado final da negociação',
        'Um tipo específico de cláusula contratual',
        'A obrigação legal de manter o mesmo valor durante toda a negociação'
      ],
      correta: 1,
      explicacao: 'Pesquisas de psicologia comportamental mostram que a primeira proposta funciona como uma âncora mental, influenciando desproporcionalmente o resultado final, mesmo quando está fora da faixa que a outra parte inicialmente considerava razoável.'
    },
    {
      pergunta: 'Qual é o erro mais caro relacionado à falta de preparação numa negociação, segundo o módulo?',
      alternativas: [
        'Pesquisar valores de mercado antes de negociar',
        'Entrar numa negociação relevante sem ter definido a própria BATNA',
        'Praticar escuta ativa durante a conversa',
        'Definir um ponto de reserva antes de negociar'
      ],
      correta: 1,
      explicacao: 'Sem BATNA definida, a pessoa fica vulnerável a aceitar acordos ruins por medo de ficar sem nenhuma alternativa, mesmo quando existiam opções melhores disponíveis que simplesmente não foram consideradas previamente.'
    },
    {
      pergunta: 'O que é ZOPA numa negociação?',
      alternativas: [
        'Um tipo de cláusula de rescisão contratual',
        'A zona de possível acordo, onde o mínimo aceitável de uma parte se sobrepõe ao máximo que a outra está disposta a oferecer',
        'O nome de uma técnica de negociação exclusiva do mercado imobiliário',
        'Um imposto cobrado sobre transações negociadas'
      ],
      correta: 1,
      explicacao: 'ZOPA é a faixa onde existe sobreposição entre o que uma parte aceita como mínimo e o que a outra está disposta a pagar como máximo — identificar essa faixa ajuda a conduzir a negociação de forma mais eficiente em direção a um acordo viável.'
    },
    {
      pergunta: 'Por que revelar seu valor mínimo aceitável muito cedo numa negociação é considerado um erro comum?',
      alternativas: [
        'Porque é proibido por lei revelar esse tipo de informação',
        'Porque a outra parte tende a ancorar a negociação próximo a esse valor, reduzindo o espaço para um resultado melhor',
        'Porque isso automaticamente encerra qualquer negociação em andamento',
        'Porque gera cobrança de impostos adicionais sobre o acordo'
      ],
      correta: 1,
      explicacao: 'Ao revelar o valor mínimo aceitável cedo demais, a outra parte ganha uma informação valiosa que pode ser usada para ancorar a negociação próxima a esse limite, reduzindo as chances de um acordo mais vantajoso.'
    },
    {
      pergunta: 'Qual é a diferença entre posição e interesse numa negociação?',
      alternativas: [
        'Não existe diferença prática entre os dois conceitos',
        'Posição é o que a parte diz querer explicitamente; interesse é a motivação real por trás dessa demanda',
        'Posição é sempre mais importante que interesse em qualquer negociação',
        'Interesse só existe em negociações empresariais, não em negociações pessoais'
      ],
      correta: 1,
      explicacao: 'Entender o interesse real por trás da posição declarada pode revelar caminhos de acordo que não seriam visíveis considerando apenas a demanda explícita inicial da outra parte, ampliando as possibilidades de solução mutuamente vantajosa.'
    }
  ],

  faq: [
    { pergunta: 'É sempre melhor fazer a primeira proposta numa negociação?', resposta: 'Na maioria das situações onde você tem informação suficiente para embasar um valor defensável, fazer a primeira proposta costuma ser vantajoso devido ao efeito de ancoragem — mas se você tem pouca informação sobre o valor de mercado, pode ser mais prudente ouvir a proposta da outra parte primeiro para calibrar melhor sua posição.' },
    { pergunta: 'Negociação é sobre "ganhar" da outra parte?', resposta: 'Abordagens puramente competitivas costumam gerar acordos menos duradouros e satisfatórios. Negociações mais eficazes buscam entender interesses de ambas as partes, procurando soluções que atendam adequadamente aos dois lados, o que tende a gerar relações mais sustentáveis no longo prazo.' },
    { pergunta: 'Como defino minha BATNA se realmente não tenho nenhuma alternativa no momento?', resposta: 'Mesmo sem uma alternativa concreta imediata, vale refletir sobre o que aconteceria se o acordo não se concretizasse — isso ajuda a entender seu real poder de negociação e evita decisões tomadas puramente por desespero ou pressão emocional do momento.' },
    { pergunta: 'Vale a pena negociar valores pequenos, ou só faz sentido em negociações de grande valor?', resposta: 'Praticar negociação em situações de menor risco (como a compra de um bem de valor mais baixo) é uma forma útil de desenvolver a habilidade antes de aplicá-la em negociações de maior impacto financeiro, como salário ou compra de imóvel.' },
    { pergunta: 'É falta de educação fazer uma contraproposta bem abaixo do valor pedido?', resposta: 'Desde que conduzida de forma respeitosa e embasada (idealmente com alguma justificativa ou dado de mercado), fazer uma contraproposta é uma prática normal e esperada em muitos contextos de negociação, especialmente em mercados onde a negociação de preço é culturalmente comum, como compra de imóveis e veículos usados.' },
    { pergunta: 'Como sei se já cheguei no melhor acordo possível numa negociação?', resposta: 'Não existe uma forma garantida de saber com certeza, mas comparar o resultado obtido com sua pesquisa prévia de mercado e com sua BATNA ajuda a avaliar se o acordo está dentro de uma faixa razoável, mesmo sem ser necessariamente o melhor teoricamente possível.' }
  ]
}
