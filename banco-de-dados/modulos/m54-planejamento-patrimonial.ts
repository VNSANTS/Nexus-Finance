import type { Modulo } from '@/types'

export const moduloPlanejamentoPatrimonial: Modulo = {
  id: 'planejamento-patrimonial',
  trilhaId: 'vida-financeira',
  numero: 6,
  titulo: 'Planejamento Patrimonial',
  subtitulo: 'Quem organiza o patrimônio em vida poupa a família de um inventário de anos',
  iconName: 'FileLock',
  duracaoMin: 14,

  nivel: 'intermediario',
  erroFatal: 'Morrer sem testamento nem organização de bens achando que "não tenho patrimônio suficiente pra isso". Sem planejamento, mesmo um patrimônio modesto entra em inventário judicial — processo que pode levar anos, custa entre 4% e 20% do valor dos bens em taxas e honorários, e trava o acesso da família ao dinheiro no pior momento possível.',
  numeroChave: { valor: 'até 20%', legenda: 'do valor do patrimônio pode ser consumido em custas e honorários num inventário judicial sem planejamento' },

  aprender: {
    oQueE: 'Planejamento patrimonial é organizar em vida como seus bens serão geridos e transferidos — por meio de testamento, seguro de vida, holding familiar ou doação em vida — em vez de deixar tudo para o inventário judicial resolver depois que você morrer.',
    porQueImporta: 'Sem planejamento, todo o patrimônio (contas, imóveis, investimentos) fica bloqueado até o fim do inventário, que no Brasil costuma levar de 1 a 5 anos. A família paga contas com dinheiro próprio enquanto o patrimônio do falecido está congelado.',
    naPratica: 'Não é assunto só para milionários. Quem tem casa própria, carro financiado quitado ou uma reserva de investimentos já tem patrimônio suficiente para gerar dor de cabeça em inventário. As ferramentas vão do simples (testamento, seguro de vida) ao mais estruturado (holding familiar), e a escolha depende do tamanho e da complexidade do patrimônio.',
    passoAPasso: [
      'Faça um inventário informal dos seus bens hoje: imóveis, veículos, investimentos, contas, participações societárias',
      'Verifique o regime de bens do seu casamento (comunhão parcial, separação total etc.) — ele define automaticamente parte da partilha',
      'Contrate um seguro de vida com beneficiários definidos — o valor pago não entra em inventário e cai direto na conta dos beneficiários',
      'Avalie com um advogado se compensa fazer testamento, considerando a "legítima" (metade obrigatória aos herdeiros necessários)',
      'Para patrimônio maior ou com imóveis/empresa, avalie holding familiar com um advogado especializado em planejamento sucessório',
      'Revise o planejamento a cada grande mudança de vida: casamento, filhos, divórcio, compra de imóvel relevante',
    ],
    errosComuns: [
      'Achar que planejamento patrimonial é "coisa de rico" e não fazer nada',
      'Deixar beneficiário de seguro de vida desatualizado após separação ou nascimento de filho',
      'Confundir doação em vida com holding familiar — são ferramentas diferentes, com efeitos tributários e sucessórios distintos',
      'Não considerar a "legítima" ao planejar, criando um testamento que será contestado e anulado em parte',
      'Deixar bens em nome de empresa sem organização societária clara, o que trava tudo em caso de falecimento de sócio',
    ],
    comparativo: {
      titulo: 'Ferramentas de planejamento patrimonial',
      linhas: [
        { label: 'Seguro de vida', valor: 'Não entra em inventário, pago direto ao beneficiário, rápido' },
        { label: 'Testamento', valor: 'Direciona a parte disponível do patrimônio, mas ainda passa por inventário' },
        { label: 'Doação em vida', valor: 'Transfere bens antes da morte, com ITCMD já pago; reduz inventário futuro' },
        { label: 'Holding familiar', valor: 'Estrutura societária que organiza bens e sucessão; ideal para patrimônio maior ou empresa familiar' },
        { label: 'Nada planejado', valor: 'Inventário judicial: 1-5 anos, 4-20% de custas, bens bloqueados' },
      ],
    },
    checklist: [
      'Listei todos os meus bens e verifiquei meu regime de casamento',
      'Contratei ou revisei um seguro de vida com beneficiários atualizados',
      'Conversei com um advogado sobre a necessidade de testamento no meu caso',
      'Entendi o que é a "legítima" e como ela afeta meu planejamento',
      'Marquei revisar meu planejamento na próxima grande mudança de vida',
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O livro mostra que patrimônio real muitas vezes é invisível — construído com disciplina, não ostentação. Planejamento patrimonial é a extensão lógica disso: proteger e transmitir o que foi construído com cuidado, sem deixar o inventário judicial ditar o destino.',
    },
  },

  mapaMental: {
    label: 'Planejamento Patrimonial',
    subtitulo: 'As ferramentas para organizar bens em vida',
    ramos: [
      {
        id: 'seguro-de-vida',
        label: 'Seguro de Vida',
        cor: '#22C55E',
        resumo: 'A ferramenta mais simples e rápida',
        filhos: [
          { label: 'Não entra em inventário', desc: 'Vai direto ao beneficiário indicado' },
          { label: 'Beneficiários sempre atualizados', desc: 'Revisar após casamento, filho, divórcio' },
          { label: 'Cobertura proporcional a dependentes', desc: 'Pensar em quantos anos de sustento cobre' },
        ],
      },
      {
        id: 'testamento',
        label: 'Testamento',
        cor: '#00D4FF',
        resumo: 'Direciona a parte disponível do patrimônio',
        filhos: [
          { label: 'Respeita a legítima', desc: 'Metade obrigatória aos herdeiros necessários' },
          { label: 'Parte disponível é livre', desc: 'A outra metade pode ir a quem você quiser' },
          { label: 'Ainda passa por inventário', desc: 'Reduz disputas, mas não elimina o processo' },
        ],
      },
      {
        id: 'doacao-em-vida',
        label: 'Doação em Vida',
        cor: '#FFC93C',
        resumo: 'Transferir bens antes de morrer',
        filhos: [
          { label: 'ITCMD pago em vida', desc: 'Imposto sobre transmissão, já quitado' },
          { label: 'Reduz inventário futuro', desc: 'Menos bens para partilhar depois' },
          { label: 'Pode ter usufruto reservado', desc: 'Doador continua usando o bem em vida' },
        ],
      },
      {
        id: 'holding-familiar',
        label: 'Holding Familiar',
        cor: '#3B82F6',
        resumo: 'Estrutura para patrimônio maior ou empresa',
        filhos: [
          { label: 'Organiza bens numa empresa', desc: 'Imóveis e participações centralizados' },
          { label: 'Sucessão via quotas, não inventário', desc: 'Transferência mais rápida e planejada' },
          { label: 'Exige assessoria jurídica especializada', desc: 'Não é DIY, custo inicial existe' },
        ],
      },
      {
        id: 'sem-planejamento',
        label: 'Sem Planejamento',
        cor: '#EF4444',
        resumo: 'O que acontece por omissão',
        filhos: [
          { label: 'Inventário judicial obrigatório', desc: '1 a 5 anos de processo' },
          { label: 'Bens bloqueados nesse período', desc: 'Família sem acesso ao patrimônio' },
          { label: 'Custas de até 20%', desc: 'Taxas, honorários e ITCMD consomem valor' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos comparar o custo de um patrimônio de R$ 800 mil (imóvel + investimentos) com e sem planejamento.',
    passos: [
      'Estimar o patrimônio total sujeito a inventário',
      'Calcular o custo aproximado de um inventário judicial sem planejamento',
      'Comparar com o custo de um seguro de vida como alternativa parcial',
      'Avaliar o tempo de bloqueio dos bens em cada cenário',
    ],
    exemploGuiado: 'Patrimônio de R$ 800 mil: imóvel de R$ 600 mil e investimentos de R$ 200 mil, sem nenhum planejamento. Em inventário judicial, considerando ITCMD (varia por estado, média de 4-8%), honorários advocatícios (geralmente 6-10%) e custas cartorárias, o custo total pode chegar a R$ 120-160 mil (15-20% do patrimônio) — e o processo levar de 1 a 3 anos até a família ter acesso pleno aos bens. Com um seguro de vida de R$ 200 mil contratado em vida (prêmio mensal aproximado de R$ 80 a R$ 150, dependendo de idade e saúde), a família recebe esse valor em poucas semanas, sem entrar em inventário, cobrindo despesas imediatas enquanto o restante do patrimônio segue seu curso legal.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é planejamento patrimonial?', verso: 'Organizar em vida como os bens serão geridos e transferidos, evitando depender só do inventário judicial após a morte.' },
    { id: 'fc2', frente: 'Por que o seguro de vida não entra em inventário?', verso: 'Porque o valor é pago diretamente ao beneficiário indicado na apólice, sem passar pela partilha judicial dos bens.' },
    { id: 'fc3', frente: 'O que é a "legítima" no planejamento sucessório?', verso: 'A metade do patrimônio que é obrigatoriamente destinada aos herdeiros necessários, não podendo ser livremente distribuída por testamento.' },
    { id: 'fc4', frente: 'Qual a diferença entre doação em vida e holding familiar?', verso: 'Doação em vida transfere bens específicos com ITCMD já pago; holding familiar organiza todo o patrimônio numa estrutura societária para facilitar sucessão futura.' },
    { id: 'fc5', frente: 'Quanto pode custar um inventário judicial sem planejamento?', verso: 'De 4% a 20% do valor do patrimônio em custas, honorários e impostos, além de levar de 1 a 5 anos.' },
    { id: 'fc6', frente: 'Planejamento patrimonial é só para quem tem muito dinheiro?', verso: 'Não — quem tem casa própria, carro quitado ou uma reserva de investimentos já tem patrimônio suficiente para gerar complicação em inventário sem planejamento.' },
  ],

  quiz: [
    {
      pergunta: 'Por que "não tenho patrimônio suficiente" é uma justificativa arriscada para não planejar?',
      alternativas: [
        'Porque o governo exige planejamento patrimonial de todos os cidadãos',
        'Porque mesmo um patrimônio modesto (casa própria, investimentos) entra em inventário judicial, que trava e consome recursos da família',
        'Porque só bilionários podem contratar seguro de vida',
        'Porque não é verdade, todo mundo tem patrimônio suficiente por definição',
      ],
      correta: 1,
      explicacao: 'Qualquer patrimônio, por menor que seja, sujeito a inventário judicial gera custas, tempo de bloqueio e potencial disputa — o valor do bem não muda essa mecânica.',
    },
    {
      pergunta: 'Qual a principal vantagem prática do seguro de vida no planejamento patrimonial?',
      alternativas: [
        'Ele substitui totalmente a necessidade de inventário',
        'Ele paga o beneficiário diretamente, sem entrar em inventário, oferecendo liquidez rápida à família',
        'Ele elimina o imposto ITCMD sobre todo o patrimônio',
        'Ele é obrigatório por lei para quem tem imóveis',
      ],
      correta: 1,
      explicacao: 'O seguro de vida não substitui o planejamento do restante do patrimônio, mas garante que a família tenha acesso rápido a um valor definido, sem depender do fim do inventário.',
    },
    {
      pergunta: 'O que acontece se um testamento tentar distribuir 100% do patrimônio livremente, ignorando a legítima?',
      alternativas: [
        'O testamento é válido integralmente, pois a vontade do falecido prevalece',
        'A parte que fere a legítima dos herdeiros necessários pode ser contestada e anulada',
        'O testamento vira automaticamente uma holding familiar',
        'Nada acontece, a legítima só se aplica a empresas',
      ],
      correta: 1,
      explicacao: 'A legítima é uma proteção legal aos herdeiros necessários (filhos, cônjuge, pais); um testamento que a ignora fica sujeito a contestação judicial na parte que a violar.',
    },
    {
      pergunta: 'Quando a holding familiar costuma fazer mais sentido como estratégia?',
      alternativas: [
        'Para qualquer pessoa, independente do tamanho do patrimônio',
        'Apenas para quem já é aposentado',
        'Para patrimônio maior, com imóveis diversos ou empresa familiar, onde a estrutura societária facilita a sucessão',
        'Apenas para quem não tem herdeiros',
      ],
      correta: 2,
      explicacao: 'A holding familiar tem custo e complexidade de estruturação que só se justificam quando o patrimônio é grande ou envolve ativos como empresas e múltiplos imóveis.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso de um advogado para fazer planejamento patrimonial ou dá pra fazer sozinho?',
      resposta: 'O seguro de vida você contrata direto. Mas testamento, doação em vida e holding familiar têm implicações jurídicas e tributárias que exigem um advogado especializado em direito sucessório — erro nesses instrumentos pode invalidar o planejamento inteiro.',
    },
    {
      pergunta: 'Doação em vida tem algum risco?',
      resposta: 'Sim — uma vez doado, o bem sai do seu patrimônio (a não ser que você reserve usufruto). É importante avaliar se isso não compromete sua própria segurança financeira antes de doar.',
    },
    {
      pergunta: 'Se eu não tenho filhos nem sou casado, ainda preciso planejar?',
      resposta: 'Sim. Sem herdeiros necessários diretos, a ordem de sucessão legal pode incluir pais, irmãos ou até o Estado, dependendo do caso — planejar garante que seus bens vão para quem você realmente escolher.',
    },
  ],
}
