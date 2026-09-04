import type { Modulo } from '@/types'

export const moduloCarteiraInvestimentos: Modulo = {
  id: 'carteira-investimentos',
  trilhaId: 'estrategia-gestao',
  numero: 2,
  titulo: 'Carteira de Investimentos',
  subtitulo: 'Blocos com função, não uma coleção de ativos',
  iconName: 'Briefcase',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Uma carteira é o conjunto dos seus investimentos organizados por função. Cada bloco existe para resolver um problema diferente: um garante liquidez para emergência, outro persegue um objetivo com data, outro faz o patrimônio crescer, outro gera renda. Sem essa divisão, o que existe não é carteira, é acúmulo.',
    porQueImporta:
      'A maioria das pessoas monta a carteira ao contrário: começa escolhendo ativos e só depois tenta descobrir para que servem. O resultado é uma lista de 20 coisas compradas por indicação, sobrepostas, sem tese e impossível de avaliar — porque não existe critério de acerto quando não existe objetivo declarado.',
    naPratica:
      'A ordem correta é: objetivos primeiro, classes depois, produtos por último. Se você tem uma viagem em um ano, uma entrada de imóvel em sete e aposentadoria em vinte e cinco, esses três dinheiros não podem ficar no mesmo lugar. O prazo de cada objetivo define a classe, e só então se escolhe o produto específico. Uma boa regra prática: se a carteira não cabe em uma folha de papel, ela é complexa demais para ser mantida por anos.',
    passoAPasso: [
      'Liste seus objetivos com valor e data de cada um',
      'Atribua uma função a cada bloco: reserva, objetivo, crescimento, renda, proteção',
      'Defina o percentual alvo de cada bloco',
      'Só então escolha os produtos específicos de cada classe',
      'Registre tudo em uma folha e revise a cada seis meses',
    ],
    errosComuns: [
      'Começar pelos ativos em vez dos objetivos',
      'Ter 40 ativos e nenhuma tese escrita',
      'Sobrepor produtos que fazem exatamente a mesma coisa',
      'Esquecer a reserva e ser obrigado a resgatar investimento em queda',
      'Misturar dinheiro de curto e longo prazo na mesma conta mental',
    ],
    comparativo: {
      titulo: 'A função de cada bloco',
      linhas: [
        { label: 'Reserva', valor: 'Emergência · Tesouro Selic, CDB liquidez diária' },
        { label: 'Objetivo com data', valor: 'Meta marcada · renda fixa casada com o prazo' },
        { label: 'Crescimento', valor: 'Longo prazo · ações, ETFs' },
        { label: 'Renda', valor: 'Fluxo mensal · FIIs, ações pagadoras' },
        { label: 'Proteção', valor: 'Câmbio e inflação · internacional, IPCA+, ouro' },
        { label: 'Satélite', valor: 'Assimetria · cripto, small caps · fatia pequena' },
      ],
    },
    checklist: [
      'Listei meus objetivos com valor e data',
      'Defini a função de cada bloco da minha carteira',
      'Estabeleci percentuais alvo por bloco',
      'Escolhi os produtos depois das classes, não antes',
      'Minha carteira cabe em uma folha de papel',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A filosofia Boglehead valoriza carteiras simples e compreensíveis, com poucos blocos de função clara — a ideia de que sua carteira deve caber em uma folha de papel é praticamente um lema do movimento.',
    },
  },

  mapaMental: {
    label: 'Carteira de Investimentos',
    subtitulo: 'Um conjunto de blocos, cada um com uma função clara',
    ramos: [
      {
        id: 'reserva',
        label: 'Reserva',
        cor: '#22C55E',
        resumo: 'A base de tudo',
        filhos: [
          { label: 'Função', desc: 'Cobrir emergência sem precisar vender nenhum investimento com prejuízo.' },
          { label: 'Onde', desc: 'Tesouro Selic ou CDB de liquidez diária pagando perto de 100% do CDI.' },
          { label: 'Tamanho', desc: '3 a 6 meses de gastos para renda estável; 6 a 12 para autônomo e renda variável.' },
          { label: 'Por que vem antes', desc: 'Sem ela, todo o resto da carteira vira reserva improvisada na primeira emergência.' },
        ],
      },
      {
        id: 'objetivo',
        label: 'Objetivos com data',
        cor: '#00D4FF',
        resumo: 'Dinheiro com hora marcada',
        filhos: [
          { label: 'Função', desc: 'Juntar para algo específico: carro, entrada de imóvel, viagem, faculdade.' },
          {
            label: 'Onde',
            desc: 'Renda fixa com vencimento próximo da data do objetivo.',
            netos: [
              { label: 'Até 2 anos', desc: 'Pós-fixado com liquidez. Nada que oscile.' },
              { label: 'De 2 a 7 anos', desc: 'Prefixado ou IPCA+ com vencimento casado com a data.' },
            ],
          },
          { label: 'Regra', desc: 'Quanto mais perto a data, menos volatilidade se aceita. Não há exceção que valha o risco.' },
        ],
      },
      {
        id: 'crescimento',
        label: 'Crescimento',
        cor: '#EC4899',
        resumo: 'O motor do longo prazo',
        filhos: [
          { label: 'Função', desc: 'Fazer o patrimônio crescer acima da inflação ao longo de muitos anos.' },
          { label: 'Onde', desc: 'Ações, ETFs de índice e fundos de ações.' },
          { label: 'Prazo mínimo', desc: 'Cinco anos. Abaixo disso, a chance de precisar sacar num ano ruim é alta demais.' },
          { label: 'O que exige de você', desc: 'Aguentar quedas de 20% ou 30% sem parar de aportar. É aqui que o resultado é decidido.' },
        ],
      },
      {
        id: 'renda',
        label: 'Renda',
        cor: '#FFC93C',
        resumo: 'Dinheiro entrando todo mês',
        filhos: [
          { label: 'Função', desc: 'Gerar fluxo de caixa sem precisar vender ativo.' },
          { label: 'Onde', desc: 'FIIs, ações pagadoras de dividendos, títulos com cupom semestral.' },
          { label: 'Quando priorizar', desc: 'A partir do momento em que o patrimônio já é relevante. Antes disso, reinvestir rende mais que receber.' },
        ],
      },
      {
        id: 'protecao',
        label: 'Proteção',
        cor: '#3B82F6',
        resumo: 'O seguro da carteira',
        filhos: [
          { label: 'Internacional', desc: 'Protege contra desvalorização do real e diversifica para fora de uma economia concentrada.' },
          { label: 'IPCA+', desc: 'Garante ganho acima da inflação, qualquer que seja ela. É proteção de poder de compra.' },
          { label: 'Ouro', desc: 'Costuma subir quando o resto cai. Fatia pequena, com função de amortecedor.' },
        ],
      },
      {
        id: 'satelite',
        label: 'Satélite',
        cor: '#8B5CF6',
        resumo: 'A parte que pode dar errado',
        filhos: [
          { label: 'Função', desc: 'Buscar assimetria: retorno muito acima da média, com risco proporcional.' },
          { label: 'O que entra', desc: 'Cripto, small caps, teses específicas, investimentos alternativos.' },
          { label: 'Limite', desc: 'O que você aceitaria perder inteiro sem mudar nenhum plano de vida. Para a maioria, algo entre 5% e 10%.' },
          { label: 'A regra de ouro', desc: 'Se a carteira não cabe em uma folha, ela é complexa demais para ser mantida por dez anos.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'Depois de definir os blocos e os percentuais, a manutenção é o que sustenta a carteira ao longo dos anos. A ferramenta mostra o desvio atual e quanto direcionar do próximo aporte para cada bloco.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Digite o percentual alvo de cada bloco da sua carteira',
      'Digite o valor que você tem hoje em cada um',
      'Observe qual bloco está mais distante do alvo',
      'Informe o próximo aporte e direcione para os blocos abaixo do alvo',
    ],
    exemploGuiado:
      'Exemplo: alvo de 20% reserva, 30% renda fixa de objetivo, 35% crescimento, 15% renda. Depois de um ano bom de bolsa, crescimento subiu para 45% e os demais encolheram proporcionalmente. Direcionando os aportes dos próximos meses só para reserva e renda, você volta ao equilíbrio sem vender nada e sem gerar imposto.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a ordem correta para montar uma carteira?', verso: 'Objetivos primeiro, depois as classes de ativo, e os produtos específicos por último. Começar pelos produtos é o erro mais comum.' },
    { id: 'fc2', frente: 'Qual a função do bloco de reserva?', verso: 'Cobrir emergências sem obrigar você a vender outro investimento em queda. É o que protege a estratégia inteira.' },
    { id: 'fc3', frente: 'Qual o prazo mínimo do bloco de crescimento?', verso: 'Cinco anos ou mais. Abaixo disso, a probabilidade de precisar resgatar durante uma queda é alta demais.' },
    { id: 'fc4', frente: 'O que entra no bloco satélite?', verso: 'Cripto, small caps e teses específicas — coisas de retorno potencial alto e risco alto. O limite é o que você aceitaria perder inteiro.' },
    { id: 'fc5', frente: 'Por que a carteira deve caber em uma folha?', verso: 'Porque carteira complexa demais deixa de ser acompanhada e mantida. Simplicidade que você segue vence sofisticação que você abandona.' },
    { id: 'fc6', frente: 'Qual a diferença entre o bloco de crescimento e o de renda?', verso: 'Crescimento busca valorização ao longo de anos e reinveste tudo. Renda busca fluxo de caixa mensal, sem precisar vender ativo.' },
  ],

  quiz: [
    {
      pergunta: 'Você vai comprar um carro em 18 meses. Em qual bloco esse dinheiro deve ficar?',
      alternativas: ['Crescimento, em ações', 'Objetivo com data, em renda fixa com vencimento casado', 'Satélite, em cripto', 'Renda, em FIIs'],
      correta: 1,
      explicacao: 'Dinheiro com data próxima não pode oscilar. Renda fixa com vencimento próximo do prazo do objetivo elimina o risco de precisar vender num momento ruim.',
    },
    {
      pergunta: 'Qual é o erro mais comum na montagem de carteira?',
      alternativas: ['Ter renda fixa demais', 'Começar escolhendo produtos antes de definir objetivos', 'Investir em ações', 'Rebalancear com frequência'],
      correta: 1,
      explicacao: 'Escolher produtos primeiro produz uma coleção de ativos sem função. Sem objetivo declarado, não existe critério para avaliar se a carteira está indo bem.',
    },
    {
      pergunta: 'Qual deve ser o tamanho do bloco satélite?',
      alternativas: ['Metade da carteira, para maximizar retorno', 'O que você aceitaria perder inteiro sem mudar seus planos', 'Zero, sempre', 'O mesmo tamanho do bloco de crescimento'],
      correta: 1,
      explicacao: 'O satélite existe para buscar assimetria com risco alto. O dimensionamento correto é aquele em que a perda total não altera nenhum plano seu.',
    },
    {
      pergunta: 'Por que a reserva vem antes de todos os outros blocos?',
      alternativas: ['Porque rende mais', 'Porque sem ela a primeira emergência obriga a resgatar investimentos em queda', 'Por exigência da corretora', 'Porque é isenta de imposto'],
      correta: 1,
      explicacao: 'A reserva protege a estratégia inteira. Sem ela, qualquer imprevisto transforma um investimento de longo prazo em venda forçada no pior momento.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ter todos os blocos desde o começo?',
      resposta: 'Não. Nos primeiros anos, reserva e um bloco de crescimento já bastam. Proteção, renda e satélite fazem sentido conforme o patrimônio cresce. Tentar montar todos com pouco dinheiro só cria complexidade sem benefício.',
    },
    {
      pergunta: 'Com que frequência devo revisar a carteira?',
      resposta: 'A cada seis meses, ou sempre que a vida mudar — casamento, filho, troca de emprego, mudança de renda. O que não deve mudar a carteira é o noticiário da semana.',
    },
    {
      pergunta: 'Posso ter o mesmo ativo em dois blocos?',
      resposta: 'Pode, desde que você saiba qual parte cumpre qual função. Um FII pode estar no bloco de renda e outro no de crescimento, por exemplo. O problema é ter o mesmo ativo sem saber por que ele está lá.',
    },
  ],
}
