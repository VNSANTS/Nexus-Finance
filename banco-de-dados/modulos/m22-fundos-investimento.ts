import type { Modulo } from '@/types'

export const moduloFundosInvestimento: Modulo = {
  id: 'fundos-investimento',
  trilhaId: 'fundos',
  numero: 1,
  titulo: 'Fundos de Investimento',
  subtitulo: 'Ler a lâmina e decidir se a taxa cobrada se justifica',
  iconName: 'Layers',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Fundo de investimento é um condomínio: várias pessoas juntam dinheiro e um gestor profissional cuida da carteira. Você compra cotas, não os ativos em si. O preço da cota sobe e desce conforme o que está lá dentro rende ou perde. Existem quatro grandes famílias na classificação da Anbima, cada uma com risco, prazo e tributação próprios.',
    porQueImporta:
      'É o produto mais empurrado pelo gerente de banco e o que mais destrói retorno por taxa. Um fundo de renda fixa cobrando 2% ao ano dificilmente vence o Tesouro Selic comprado direto, que dá praticamente o mesmo trabalho. Saber ler uma lâmina em cinco minutos é defesa direta do seu bolso, e vale para o resto da vida.',
    naPratica:
      'A lâmina é um documento curto e obrigatório, e ela responde quase tudo: qual o objetivo do fundo, contra qual benchmark ele se compara, quanto cobra de administração e de performance, e em quantos dias o dinheiro volta se você resgatar. O erro mais comum é comparar um fundo de ações com o CDI, o que não diz absolutamente nada sobre a competência do gestor. Fundo de ações se compara ao Ibovespa. Fundo de renda fixa se compara ao CDI e ao custo de fazer sozinho.',
    passoAPasso: [
      'Leia a lâmina inteira: objetivo, benchmark, taxas e prazo de resgate',
      'Compare a rentabilidade com o benchmark correto do fundo, não com o CDI genérico',
      'Verifique se há taxa de performance e se ela tem marca d\u2019água',
      'Cheque o D+ do resgate e pergunte se você aguenta esperar esse prazo',
      'Olhe patrimônio, tempo de casa e histórico do gestor em anos ruins',
    ],
    errosComuns: [
      'Comparar fundo de ações com o CDI e concluir que o gestor é ruim',
      'Ignorar o come-cotas ao projetar quanto o fundo vai render em dez anos',
      'Não olhar o prazo de resgate e descobrir o D+30 na hora da emergência',
      'Escolher pela rentabilidade dos últimos doze meses, que quase nada informa',
      'Achar que taxa de performance é sempre ruim, mesmo quando bem estruturada',
    ],
    comparativo: {
      titulo: 'Os quatro tipos na classificação Anbima',
      linhas: [
        { label: 'Renda Fixa', valor: 'Títulos públicos e privados · risco baixo · compare com o CDI e com fazer sozinho' },
        { label: 'Multimercado', valor: 'Juros, câmbio, bolsa e exterior · risco médio a alto · depende quase todo do gestor' },
        { label: 'Ações', valor: 'Ao menos dois terços em bolsa · risco alto · compare com o Ibovespa' },
        { label: 'Cambial', valor: 'Segue dólar ou euro · risco alto · serve para proteção, não para retorno' },
        { label: 'Tributação · abertos', valor: 'Tabela regressiva mais come-cotas duas vezes por ano' },
        { label: 'Tributação · ações', valor: 'Alíquota única no resgate, sem come-cotas' },
      ],
    },
    checklist: [
      'Já li a lâmina completa de pelo menos um fundo que tenho',
      'Sei qual é o benchmark correto de cada fundo da minha carteira',
      'Conheço a taxa de administração e a de performance que estou pagando',
      'Sei em quantos dias o dinheiro cai na conta se eu resgatar hoje',
      'Comparei o resultado do fundo com o custo de montar a mesma coisa sozinho',
    ],
    livroRelacionado: {
      livroId: 'bogleheads-guide-to-investing',
      textoConexao: 'A comunidade Boglehead é conhecida justamente por questionar se a taxa de administração de um fundo ativo compensa frente a alternativas de baixo custo — o último item deste checklist é exatamente essa pergunta.',
    },
  },

  mapaMental: {
    label: 'Fundos de Investimento',
    subtitulo: 'Um condomínio de investidores com um gestor profissional cuidando da carteira',
    ramos: [
      {
        id: 'estrutura',
        label: 'Como funciona',
        cor: '#00D4FF',
        resumo: 'Quem é quem no fundo',
        filhos: [
          {
            label: 'Cota',
            desc: 'Sua fatia do fundo. Você é dono de cotas, e são elas que sobem e descem de preço conforme a carteira rende.',
            netos: [
              { label: 'Como o preço se forma', desc: 'O patrimônio total dividido pelo número de cotas, calculado todo dia útil pelo administrador.' },
            ],
          },
          { label: 'Gestor', desc: 'Quem decide onde o dinheiro é investido. É a peça que você está de fato contratando quando paga a taxa.' },
          { label: 'Administrador', desc: 'Cuida da estrutura, calcula a cota, fiscaliza o gestor e responde pelo fundo perante o regulador.' },
          { label: 'Patrimônio segregado', desc: 'O dinheiro do fundo é separado do da instituição. Se o banco quebrar, os ativos do fundo não entram no bolo.' },
        ],
      },
      {
        id: 'tipos',
        label: 'Tipos',
        cor: '#8B5CF6',
        resumo: 'As quatro famílias da Anbima',
        filhos: [
          {
            label: 'Renda fixa',
            desc: 'Compra títulos públicos e privados. Compare sempre com o CDI e com o custo de comprar os mesmos títulos direto.',
            netos: [
              { label: 'A pergunta honesta', desc: 'O que esse fundo faz que você não faria sozinho comprando Tesouro Selic? Se a resposta é nada, a taxa não se justifica.' },
            ],
          },
          {
            label: 'Multimercado',
            desc: 'Pode misturar juros, câmbio, bolsa e exterior. A qualidade depende quase inteiramente de quem está gerindo.',
            netos: [
              { label: 'Por que é o mais difícil de avaliar', desc: 'Sem uma estratégia única, não existe benchmark óbvio. Olhe consistência ao longo de anos, incluindo os ruins.' },
            ],
          },
          { label: 'Ações', desc: 'Pelo menos dois terços do patrimônio em bolsa. O benchmark é o Ibovespa ou um índice setorial, nunca o CDI.' },
          { label: 'Cambial', desc: 'Acompanha o dólar ou o euro. Faz sentido como proteção de uma parte da carteira, não como motor de retorno.' },
        ],
      },
      {
        id: 'custos',
        label: 'Custos',
        cor: '#EF4444',
        resumo: 'O que sai do seu bolso todo ano',
        filhos: [
          {
            label: 'Taxa de administração',
            desc: 'Cobrada todo ano sobre o total, mesmo nos anos em que o fundo perde dinheiro. É o custo que você paga sem condição nenhuma.',
            netos: [
              { label: 'Referência prática', desc: 'Fundo de renda fixa com taxa acima de 1% ao ano dificilmente vence o Tesouro Selic comprado direto.' },
              { label: 'Já está descontada', desc: 'A rentabilidade divulgada costuma vir líquida de administração. Confirme na lâmina antes de comparar.' },
            ],
          },
          {
            label: 'Taxa de performance',
            desc: 'Normalmente uma fatia do que exceder o benchmark. Só é justa quando existe marca d\u2019água.',
            netos: [
              { label: 'Quando é boa', desc: 'Alinha gestor e cotista: ele só ganha mais se você ganhar mais. O problema é o benchmark fácil demais.' },
            ],
          },
          { label: 'Marca d\u2019água', desc: 'O gestor só volta a cobrar performance depois de recuperar a perda anterior. Sem isso, ele pode cobrar duas vezes pelo mesmo ganho.' },
          { label: 'O padrão 2 e 20', desc: 'Dois por cento de administração mais vinte por cento de performance. Sobre um retorno de doze por cento, essa conta pesa muito.' },
        ],
      },
      {
        id: 'impostos',
        label: 'Impostos',
        cor: '#FFC93C',
        resumo: 'O come-cotas e a regressiva',
        filhos: [
          {
            label: 'Come-cotas',
            desc: 'Antecipação do imposto duas vezes por ano nos fundos abertos, feita pela redução do número de cotas que você tem.',
            netos: [
              { label: 'Por que atrapalha', desc: 'O imposto sai antes da hora, então o dinheiro que sairia lá na frente deixa de render pelo caminho todo.' },
            ],
          },
          { label: 'Tabela regressiva', desc: 'Nos fundos de longo prazo, a alíquota cai conforme o tempo de aplicação, do patamar mais alto até o mínimo.' },
          { label: 'Fundo de ações', desc: 'Alíquota única cobrada só no resgate, sem come-cotas. É a exceção mais relevante da categoria.' },
          { label: 'Compare sempre líquido', desc: 'Rentabilidade divulgada costuma ser antes do imposto. Dois fundos com o mesmo número podem entregar coisas diferentes no bolso.' },
        ],
      },
      {
        id: 'avaliar',
        label: 'Como avaliar',
        cor: '#22C55E',
        resumo: 'Cinco minutos de lâmina',
        filhos: [
          { label: 'Lâmina', desc: 'Documento curto e obrigatório com objetivo, benchmark, taxas e prazo de resgate. Leia antes de aplicar, sempre.' },
          { label: 'Benchmark certo', desc: 'Fundo de ações contra Ibovespa, renda fixa contra CDI. Comparar categorias diferentes não informa nada.' },
          { label: 'Prazo de resgate', desc: 'D+30 significa trinta dias até o dinheiro cair na conta. Isso muda tudo se o dinheiro era da reserva.' },
          { label: 'Histórico', desc: 'Olhe vários anos, principalmente os ruins. Rentabilidade de doze meses diz muito pouco sobre o gestor.' },
          { label: 'Patrimônio do fundo', desc: 'Fundo muito pequeno pode fechar, e fundo grande demais tem dificuldade de girar posição. Os dois extremos merecem atenção.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'A taxa de administração parece um detalhe quando você olha um extrato mensal. Em vinte anos ela vira uma das maiores linhas de custo da sua vida financeira. A calculadora mostra isso melhor que qualquer texto.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Informe o aporte mensal e um prazo de 20 anos',
      'Rode a primeira simulação com a rentabilidade líquida de um fundo barato',
      'Rode de novo descontando mais 1,5 ponto percentual ao ano de taxa',
      'Compare os dois valores finais e veja o tamanho do que foi para a taxa',
    ],
    exemploGuiado:
      'Exemplo: dois fundos de renda fixa com carteiras praticamente idênticas, ambos comprando título público. Um cobra 0,3% de administração ao ano, o outro cobra 1,8%. Em vinte anos, com o mesmo aporte mensal, o valor final do fundo caro fica bem abaixo. E o come-cotas acentua a diferença, porque parte do imposto sai duas vezes por ano e deixa de render junto com o resto. Nenhum dos dois gestores precisou errar uma decisão sequer para esse resultado aparecer.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que você compra quando entra em um fundo?', verso: 'Cotas, e não os ativos diretamente. O preço da cota é o patrimônio total dividido pelo número de cotas, calculado todo dia útil pelo administrador.' },
    { id: 'fc2', frente: 'Qual a diferença entre gestor e administrador?', verso: 'O gestor decide onde investir. O administrador cuida da estrutura, calcula a cota e fiscaliza o gestor. Você paga taxa principalmente pelo trabalho do primeiro.' },
    { id: 'fc3', frente: 'O que é come-cotas?', verso: 'A antecipação do imposto duas vezes por ano nos fundos abertos, feita reduzindo o número de cotas. Ela tira do bolo um dinheiro que continuaria rendendo até o resgate.' },
    { id: 'fc4', frente: 'O que é marca d\u2019água?', verso: 'A regra que impede o gestor de cobrar performance de novo antes de recuperar a perda anterior. Sem ela, ele pode cobrar duas vezes pelo mesmo ganho.' },
    { id: 'fc5', frente: 'Contra o que se compara um fundo de ações?', verso: 'Contra o Ibovespa ou um índice setorial adequado. Comparar com o CDI não diz nada sobre a competência do gestor, só sobre o momento do mercado.' },
    { id: 'fc6', frente: 'O que significa D+30 no resgate?', verso: 'Que o dinheiro leva trinta dias para cair na sua conta depois do pedido. É informação obrigatória na lâmina e desqualifica o fundo como reserva de emergência.' },
  ],

  quiz: [
    {
      pergunta: 'Um fundo de renda fixa cobra 2% de administração ao ano e compra basicamente título público. Qual é o problema?',
      alternativas: ['Nenhum, título público é seguro', 'A taxa dificilmente será compensada, já que o Tesouro Selic direto entrega quase o mesmo com custo baixo', 'O risco de crédito é alto demais', 'Fundos de renda fixa não podem comprar título público'],
      correta: 1,
      explicacao: 'Você está pagando caro por uma decisão que tomaria sozinho em dois cliques. É o caso clássico em que a taxa não se justifica pelo que o gestor entrega.',
    },
    {
      pergunta: 'Qual comparação faz sentido para avaliar um fundo de ações?',
      alternativas: ['Contra o CDI', 'Contra a poupança', 'Contra o Ibovespa ou um índice setorial adequado', 'Contra a inflação apenas'],
      correta: 2,
      explicacao: 'O benchmark precisa refletir o universo em que o gestor atua. Comparar renda variável com juros mede o momento do mercado, não a habilidade de quem gere.',
    },
    {
      pergunta: 'Você precisa deixar a reserva de emergência em algum lugar. Um multimercado com D+30 serve?',
      alternativas: ['Sim, se a rentabilidade for boa', 'Sim, desde que a taxa seja baixa', 'Não, porque o dinheiro demora trinta dias para chegar', 'Não, porque multimercado não aceita resgate'],
      correta: 2,
      explicacao: 'Reserva exige dinheiro disponível quase na hora. Trinta dias de espera transforma um imprevisto pequeno em dívida no cartão, que era exatamente o que a reserva deveria evitar.',
    },
    {
      pergunta: 'Qual destes tipos de fundo não sofre come-cotas?',
      alternativas: ['Renda fixa', 'Multimercado de longo prazo', 'Fundo de ações', 'Cambial'],
      correta: 2,
      explicacao: 'Fundos de ações são tributados apenas no resgate, com alíquota única. Nos demais tipos abertos, a antecipação semestral do imposto reduz o efeito dos juros compostos.',
    },
  ],

  faq: [
    {
      pergunta: 'O gerente me mostrou um fundo que rendeu bem mais que o CDI no último ano. Devo entrar?',
      resposta: 'Doze meses dizem quase nada. Peça o histórico de vários anos, inclusive os ruins, e confira contra o benchmark certo daquela categoria. Um fundo de ações que bateu o CDI num ano de alta da bolsa apenas acompanhou o mercado. O que importa é como ele se comportou quando as coisas apertaram, e se a taxa cobrada se justifica diante disso.',
    },
    {
      pergunta: 'Taxa de performance é sempre ruim?',
      resposta: 'Não, quando bem estruturada ela alinha os interesses: o gestor só ganha a mais se você ganhar a mais. Os dois pontos que definem se ela é justa são o benchmark e a marca d\u2019água. Benchmark fácil demais faz o gestor cobrar por um resultado medíocre, e a ausência de marca d\u2019água permite cobrar duas vezes pelo mesmo ganho depois de uma queda.',
    },
    {
      pergunta: 'Se o banco onde eu tenho o fundo quebrar, perco tudo?',
      resposta: 'O patrimônio do fundo é segregado do patrimônio da instituição, então os ativos não entram no bolo da falência. O que você continua correndo é o risco dos ativos que estão dentro da carteira, que é bem diferente. Vale saber que o FGC não cobre fundos, justamente porque a proteção aqui vem dessa separação e não de um seguro.',
    },
  ],
}
