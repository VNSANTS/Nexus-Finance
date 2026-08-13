import type { Modulo } from '@/types'

export const moduloPrevidencia: Modulo = {
  id: 'previdencia',
  trilhaId: 'renda-fixa-previdencia',
  numero: 3,
  titulo: 'Previdência',
  subtitulo: 'O que decide o resultado é o fundo que está dentro do plano',
  iconName: 'Hourglass',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'Previdência privada é uma embalagem, com regras próprias de imposto e de sucessão. Dentro dela mora um fundo de investimento comum, e é ele quem faz o dinheiro render. PGBL e VGBL são as duas formas de tributar essa mesma embalagem. Trocar de plano não muda a natureza da coisa: muda o fundo lá dentro e o custo que você paga por ele.',
    porQueImporta:
      'A reforma da previdência empurrou boa parte da conta da aposentadoria para o indivíduo, e o produto mais vendido no balcão do banco costuma ser o pior da prateleira: taxa de administração alta em cima de uma carteira que só compra título público. Como o prazo aqui é de décadas, cada décimo de taxa a mais vira uma fatia grande do patrimônio final.',
    naPratica:
      'Uma pergunta resolve a maior parte da decisão: você declara imposto de renda no modelo completo e contribui para o INSS? Se sim, o PGBL faz sentido, porque permite abater os aportes até o limite de 12% da renda bruta anual tributável. Se você declara no simplificado ou é isento, o VGBL é o caminho, porque o imposto no resgate incide só sobre o rendimento. Depois disso sobram duas contas: escolher a tabela de imposto pelo prazo e brigar pela taxa mais baixa que você conseguir.',
    passoAPasso: [
      'Confira se você declara no modelo completo e contribui para o INSS',
      'Escolha PGBL ou VGBL a partir dessa resposta, não pela sugestão do gerente',
      'Opte pela tabela regressiva se o dinheiro vai ficar mais de dez anos parado',
      'Compare a taxa de administração e recuse qualquer taxa de carregamento',
      'Abra a carteira do fundo antes de assinar e lembre que a portabilidade existe',
    ],
    errosComuns: [
      'Contratar PGBL declarando no simplificado e não usar o benefício nenhum',
      'Escolher a tabela progressiva para um dinheiro que vai ficar vinte anos guardado',
      'Aceitar taxa de carregamento em cada aporte por comodidade',
      'Tratar previdência como investimento em si, ignorando o fundo que está dentro',
      'Resgatar antes de completar o prazo que derruba a alíquota na tabela regressiva',
    ],
    comparativo: {
      titulo: 'PGBL x VGBL: a tabela que decide',
      linhas: [
        { label: 'PGBL · dedução no IR', valor: 'Abate os aportes até o limite de 12% da renda bruta anual tributável' },
        { label: 'PGBL · IR no resgate', valor: 'Incide sobre o valor total resgatado, aporte e rendimento juntos' },
        { label: 'PGBL · para quem', valor: 'Declara no completo e contribui para o INSS ou regime próprio' },
        { label: 'VGBL · dedução no IR', valor: 'Não existe' },
        { label: 'VGBL · IR no resgate', valor: 'Incide apenas sobre o rendimento' },
        { label: 'VGBL · para quem', valor: 'Declara no simplificado, é isento ou já usou o limite de dedução' },
      ],
    },
    checklist: [
      'Sei em qual modelo eu declaro imposto de renda',
      'Escolhi entre PGBL e VGBL com um motivo que sei explicar',
      'Escolhi a tabela de imposto pensando no prazo, não no mês que vem',
      'Sei a taxa de administração do meu plano e se há taxa de carregamento',
      'Já olhei quais ativos o fundo compra e quem é o gestor',
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'Sabatier discute como usar estruturas ligadas ao emprego (como planos de previdência com contrapartida) como acelerador da independência financeira — a previdência privada deste módulo é uma dessas ferramentas de longo prazo.',
    },
  },

  mapaMental: {
    label: 'Previdência Privada',
    subtitulo: 'Uma embalagem com regras próprias, e o que rende é o fundo lá dentro',
    ramos: [
      {
        id: 'pgbl-vgbl',
        label: 'PGBL x VGBL',
        cor: '#00D4FF',
        resumo: 'A primeira decisão',
        filhos: [
          {
            label: 'PGBL',
            desc: 'Permite abater os aportes na declaração completa, até o limite percentual da renda bruta anual tributável.',
            netos: [
              { label: 'O benefício real', desc: 'Você adia imposto e investe hoje um dinheiro que iria para a Receita. Ele volta a ser cobrado lá na frente.' },
              { label: 'A contrapartida', desc: 'No resgate o imposto incide sobre tudo que você tirar, incluindo o que você mesmo aportou.' },
            ],
          },
          {
            label: 'VGBL',
            desc: 'Sem abatimento na declaração, mas o imposto no resgate morde apenas o rendimento.',
            netos: [
              { label: 'Para quem serve', desc: 'Quem declara no simplificado, quem é isento e quem já estourou o limite de dedução do PGBL.' },
            ],
          },
          { label: 'Como escolher', desc: 'Declaração completa mais contribuição ao INSS aponta para PGBL. Qualquer outro cenário aponta para VGBL.' },
          { label: 'Erro caro', desc: 'Contratar PGBL declarando no simplificado. Você não aproveita a dedução e ainda paga imposto sobre o valor inteiro no fim.' },
        ],
      },
      {
        id: 'tabela',
        label: 'Tabela de imposto',
        cor: '#FFC93C',
        resumo: 'Regressiva ou progressiva',
        filhos: [
          {
            label: 'Regressiva',
            desc: 'A alíquota parte de um patamar alto e vai caindo conforme o tempo de cada aporte, chegando ao mínimo depois de uma década.',
            netos: [
              { label: 'Quando faz sentido', desc: 'Aposentadoria de verdade, com dinheiro que você não vai tocar por muitos anos.' },
              { label: 'A pegada', desc: 'O prazo conta por aporte, não pela data em que você abriu o plano. Aporte novo começa a contagem do zero.' },
            ],
          },
          { label: 'Progressiva', desc: 'Segue a mesma tabela do salário, de isento até a alíquota máxima. Serve para quem vai resgatar valores pequenos por mês.' },
          { label: 'Só dá para migrar num sentido', desc: 'É possível trocar progressiva por regressiva, mas não o contrário. Pense antes de marcar a caixinha.' },
          { label: 'Decisão pelo prazo', desc: 'A pergunta não é qual alíquota parece menor hoje, e sim quanto tempo esse dinheiro vai ficar parado.' },
        ],
      },
      {
        id: 'custos',
        label: 'Custos',
        cor: '#EF4444',
        resumo: 'Onde o plano é ganho ou perdido',
        filhos: [
          {
            label: 'Taxa de administração',
            desc: 'Cobrada todo ano sobre o total acumulado, tenha o fundo rendido ou não. É o item que mais destrói o resultado final.',
            netos: [
              { label: 'Referência prática', desc: 'Plano conservador que só compra título público e cobra acima de 1,5% ao ano está caro. Confira o número vigente da concorrência.' },
              { label: 'Por que dói tanto aqui', desc: 'Em vinte e cinco anos, a taxa incide sobre um bolo que cresce todo ano. O custo cresce junto com o patrimônio.' },
            ],
          },
          { label: 'Taxa de carregamento', desc: 'Cobrança sobre cada aporte, antes mesmo de o dinheiro começar a render. O ideal é zero, e ainda existe produto de banco cobrando.' },
          { label: 'Efeito no longo prazo', desc: 'Um ponto percentual a mais de taxa ao ano, por décadas, consome uma fatia grande do patrimônio final. Vale simular esse número.' },
          { label: 'O que negociar', desc: 'Taxa é negociável, principalmente com saldo maior ou aporte mensal alto. Pedir custa uma ligação.' },
        ],
      },
      {
        id: 'vantagens',
        label: 'Vantagens reais',
        cor: '#22C55E',
        resumo: 'O que só a previdência tem',
        filhos: [
          { label: 'Sem come-cotas', desc: 'Diferente dos fundos abertos comuns, não há antecipação semestral de imposto. O dinheiro segue rendendo inteiro até o resgate.' },
          { label: 'Portabilidade', desc: 'Dá para trocar de fundo ou de instituição sem pagar imposto no caminho, e sem zerar a contagem da tabela regressiva.' },
          { label: 'Sucessão', desc: 'Costuma ir direto para o beneficiário indicado, fora do inventário. Confira o entendimento vigente antes de contar com isso.' },
          { label: 'Disciplina', desc: 'A fricção para resgatar ajuda quem tem o hábito de mexer no dinheiro de longo prazo por qualquer motivo.' },
        ],
      },
      {
        id: 'antes-de-assinar',
        label: 'O que olhar antes',
        cor: '#8B5CF6',
        resumo: 'A checagem que quase ninguém faz',
        filhos: [
          { label: 'O fundo por dentro', desc: 'Abra a carteira. Plano conservador que só compra título público não justifica taxa de fundo sofisticado.' },
          { label: 'Histórico e gestor', desc: 'Compare com o CDI e com planos parecidos, ao longo de vários anos. Comparar com a poupança não diz nada.' },
          { label: 'Beneficiário atualizado', desc: 'Campo esquecido com frequência, principalmente depois de casamento, separação ou nascimento de filho.' },
          { label: 'O INSS continua existindo', desc: 'Previdência privada complementa a pública. Contar só com uma delas é apostar tudo em uma carta.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'O argumento mais forte deste módulo não está em nenhum texto: está no gráfico. Rode a mesma simulação duas vezes, mudando só a taxa de administração, e a diferença aparece sozinha.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Informe o aporte mensal que você conseguiria manter e um prazo de 25 anos',
      'Na primeira rodada, use uma taxa líquida que já desconte 0,5% ao ano de administração',
      'Anote o valor final e rode de novo descontando 2% ao ano no lugar',
      'Compare os dois resultados e veja quanto da diferença é dinheiro que nunca foi seu',
    ],
    exemploGuiado:
      'Exemplo: dois planos com o mesmo aporte mensal, o mesmo prazo de 25 anos e a mesma carteira por dentro. Um cobra 0,5% ao ano de administração, o outro cobra 2%. A diferença de 1,5 ponto percentual parece pequena em um extrato mensal, mas ela incide todo ano sobre um saldo que só cresce. No fim do período, a distância entre os dois valores finais é grande o bastante para mudar o padrão da sua aposentadoria. Nenhum dos dois planos precisou render diferente para isso acontecer.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Previdência privada é um investimento?', verso: 'É um veículo com regras próprias de imposto e sucessão. Quem rende é o fundo que está dentro dele, e é esse fundo que você precisa avaliar.' },
    { id: 'fc2', frente: 'Quando o PGBL faz sentido?', verso: 'Quando você declara imposto de renda no modelo completo e contribui para o INSS ou regime próprio. Aí dá para abater os aportes até o limite da renda bruta anual tributável.' },
    { id: 'fc3', frente: 'Sobre o que incide o imposto no resgate de cada tipo?', verso: 'No PGBL, sobre o valor total resgatado. No VGBL, apenas sobre o rendimento. Essa é a contrapartida da dedução que o PGBL oferece na entrada.' },
    { id: 'fc4', frente: 'Regressiva ou progressiva?', verso: 'Regressiva para dinheiro de prazo longo, porque a alíquota cai com o tempo de cada aporte. Progressiva para quem vai resgatar valores pequenos por mês. Dá para migrar só de progressiva para regressiva.' },
    { id: 'fc5', frente: 'O que é come-cotas e por que a previdência escapa dele?', verso: 'É a antecipação semestral do imposto nos fundos abertos comuns, que reduz o efeito dos juros compostos. Planos de previdência não sofrem essa antecipação, então o saldo segue rendendo inteiro.' },
    { id: 'fc6', frente: 'O que é portabilidade?', verso: 'A troca de fundo ou de instituição sem pagar imposto no caminho e sem reiniciar a contagem da tabela regressiva. É a saída para quem descobriu tarde que está em um plano caro.' },
  ],

  quiz: [
    {
      pergunta: 'Você declara imposto de renda no modelo simplificado. Qual plano faz mais sentido?',
      alternativas: ['PGBL, para abater os aportes', 'VGBL, porque o imposto no resgate pega só o rendimento', 'Tanto faz, os dois são iguais', 'Nenhum dos dois serve para quem declara no simplificado'],
      correta: 1,
      explicacao: 'A dedução do PGBL só existe na declaração completa. No simplificado você não aproveitaria o benefício e ainda pagaria imposto sobre o valor total no resgate.',
    },
    {
      pergunta: 'Qual destas é uma vantagem real da previdência sobre um fundo aberto comum?',
      alternativas: ['Rendimento garantido pelo banco', 'Ausência de come-cotas', 'Isenção total de imposto de renda', 'Cobertura do FGC'],
      correta: 1,
      explicacao: 'Não há antecipação semestral de imposto, então o saldo segue rendendo inteiro. Não existe rendimento garantido, a isenção total não existe e o FGC não cobre previdência.',
    },
    {
      pergunta: 'Você contratou um plano com tabela progressiva e depois percebeu que o dinheiro vai ficar vinte anos parado. O que dá para fazer?',
      alternativas: ['Nada, a escolha é definitiva', 'Migrar para a regressiva', 'Migrar para a regressiva pagando multa', 'Só resgatando tudo e recomeçando'],
      correta: 1,
      explicacao: 'A migração de progressiva para regressiva é permitida. O caminho inverso não é, e por isso a escolha inicial merece atenção.',
    },
    {
      pergunta: 'Dois planos têm exatamente a mesma carteira por dentro. Um cobra 0,5% de administração ao ano e o outro cobra 2%. Em 25 anos, o que acontece?',
      alternativas: ['A diferença é irrelevante, é só 1,5%', 'O mais caro compensa com melhor atendimento', 'A diferença no valor final é grande, porque a taxa incide todo ano sobre um saldo crescente', 'Os dois terminam iguais, já que a carteira é a mesma'],
      correta: 2,
      explicacao: 'A taxa é cobrada sobre o total acumulado, ano após ano. Como o saldo cresce, o custo cresce junto, e o efeito composto disso ao longo de décadas é enorme.',
    },
  ],

  faq: [
    {
      pergunta: 'Meu gerente insiste que a previdência do banco é a melhor opção. Como saber se ele tem razão?',
      resposta: 'Peça três números por escrito: taxa de administração, taxa de carregamento e a composição da carteira do fundo. Depois compare com planos de corretoras independentes que tenham a mesma estratégia. Se o plano do banco cobra bem mais para comprar praticamente os mesmos ativos, a resposta apareceu sozinha. Vale lembrar que o gerente costuma ter meta de venda desse produto.',
    },
    {
      pergunta: 'Já estou em um plano caro há anos. Perdi o dinheiro que paguei de taxa?',
      resposta: 'O que já foi cobrado não volta, mas o estrago futuro dá para cortar hoje mesmo. A portabilidade permite levar o saldo para um plano mais barato sem pagar imposto no caminho e sem reiniciar a contagem da tabela regressiva. Quanto antes você faz, menos anos de taxa alta incidem sobre um saldo que só cresce.',
    },
    {
      pergunta: 'Não seria melhor montar minha própria carteira no lugar da previdência?',
      resposta: 'Para muita gente, sim, principalmente se o plano disponível for caro. A previdência ganha em três pontos específicos: ausência de come-cotas, tratamento sucessório fora do inventário e a dedução do PGBL para quem declara no completo. Fora esses casos, uma carteira própria bem montada com custo baixo tende a entregar mais. A escolha depende de qual dessas vantagens realmente se aplica a você.',
    },
  ],
}
