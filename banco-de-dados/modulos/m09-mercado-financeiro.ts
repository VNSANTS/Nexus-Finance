import type { Modulo } from '@/types'

export const moduloMercadoFinanceiro: Modulo = {
  id: 'mercado-financeiro',
  trilhaId: 'economia-mercado',
  numero: 1,
  titulo: 'Mercado Financeiro',
  subtitulo: 'Quem é quem e onde o seu dinheiro entra',
  iconName: 'Building2',
  duracaoMin: 12,

  aprender: {
    oQueE:
      'O mercado financeiro é o encanamento que liga quem tem dinheiro sobrando a quem precisa de dinheiro. De um lado, você e outros poupadores. Do outro, governo, bancos e empresas. No meio, corretoras, bolsa, reguladores e sistemas de garantia que fazem a coisa funcionar sem que você precise confiar em estranhos.',
    porQueImporta:
      'Entender quem faz o quê elimina o medo que trava a maioria das pessoas na hora de abrir a primeira conta. A dúvida número um de quem vai começar é "e se a corretora quebrar?" — e a resposta muda completamente conforme o ativo. Saber isso vale mais que qualquer dica de investimento.',
    naPratica:
      'Sua corretora não é dona do seu dinheiro nem dos seus ativos. Ações e FIIs ficam registrados no seu CPF na custódia da B3, e você pode conferir isso de graça na área do investidor, sem depender da plataforma. CDB e LCI têm a proteção do FGC dentro do limite por CPF e por instituição. Fundos têm patrimônio segregado, o que significa que o dinheiro do fundo não se mistura com o da gestora. O que se perde numa quebra de corretora é o acesso pela plataforma, não o patrimônio.',
    passoAPasso: [
      'Entenda os quatro papéis: quem regula, quem intermedia, quem custodia e quem garante',
      'Verifique se a instituição onde você vai investir tem registro na CVM ou no Banco Central',
      'Cadastre-se na área do investidor da B3 e confira sua posição direto na fonte',
      'Saiba o que o FGC cobre e o que não cobre antes de aplicar em renda fixa bancária',
      'Ao ouvir uma oferta, pergunte sempre: quem é a contraparte e quem fiscaliza isso',
    ],
    errosComuns: [
      'Achar que a corretora guarda o seu dinheiro',
      'Confundir a CVM com o Banco Central',
      'Achar que o FGC cobre ação, fundo e debênture',
      'Investir em plataforma sem registro em nenhum órgão',
      'Confundir mercado primário com secundário',
    ],
    comparativo: {
      titulo: 'Quem é quem',
      linhas: [
        { label: 'Banco Central', valor: 'Política monetária, Selic e saúde dos bancos' },
        { label: 'CVM', valor: 'Fiscaliza ações, fundos, FIIs e ofertas ao público' },
        { label: 'B3', valor: 'Negociação, liquidação e custódia dos ativos' },
        { label: 'Corretora', valor: 'Intermediária · não é dona do seu patrimônio' },
        { label: 'FGC', valor: 'Garante renda fixa bancária até o limite por CPF' },
        { label: 'Tesouro Nacional', valor: 'Emite os títulos públicos do Tesouro Direto' },
      ],
    },
    checklist: [
      'Sei diferenciar o papel do Banco Central e o da CVM',
      'Sei que meus ativos ficam custodiados no meu CPF na B3',
      'Verifiquei o registro da minha corretora',
      'Sei exatamente o que o FGC cobre e o que não cobre',
      'Sei a diferença entre mercado primário e secundário',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Benjamin Graham parte do princípio de que entender a estrutura do mercado — não só os ativos — é o que separa o investidor disciplinado do especulador; este módulo é a base institucional que sustenta essa disciplina.',
    },
  },

  mapaMental: {
    label: 'Mercado Financeiro',
    subtitulo: 'O encanamento por onde o seu dinheiro passa, e quem cuida de cada cano',
    ramos: [
      {
        id: 'reguladores',
        label: 'Reguladores',
        cor: '#3B82F6',
        resumo: 'Quem fiscaliza o quê',
        filhos: [
          { label: 'Banco Central', desc: 'Cuida da moeda, dos juros e da saúde dos bancos. É quem define a Selic, através do Copom.' },
          { label: 'CVM', desc: 'Fiscaliza ações, fundos, FIIs e qualquer oferta de investimento ao público. Antes de aplicar, cheque o registro lá.' },
          { label: 'Anbima', desc: 'Associação do mercado. Cria regras de conduta e classifica os fundos por tipo e por risco.' },
          { label: 'Tesouro Nacional', desc: 'Emite os títulos da dívida pública que você compra no Tesouro Direto.' },
        ],
      },
      {
        id: 'intermediarios',
        label: 'Intermediários',
        cor: '#00D4FF',
        resumo: 'Quem leva sua ordem ao mercado',
        filhos: [
          { label: 'Corretora', desc: 'Recebe sua ordem e a envia ao mercado. Ela não fica com o seu dinheiro nem com os seus ativos.' },
          {
            label: 'Banco',
            desc: 'Além de intermediar, também emite produtos próprios como CDB e fundos.',
            netos: [
              { label: 'O conflito', desc: 'Quem vende o produto e também o emite tem incentivo para oferecer o dele, não o melhor para você.' },
            ],
          },
          { label: 'Assessor e distribuidor', desc: 'Quem vende. Vale sempre perguntar como a pessoa é remunerada — a resposta explica muita recomendação.' },
          { label: 'Gestor x administrador', desc: 'No fundo, o gestor escolhe os ativos e o administrador cuida da estrutura, do cálculo da cota e da fiscalização.' },
        ],
      },
      {
        id: 'custodia',
        label: 'Onde fica seu dinheiro',
        cor: '#22C55E',
        resumo: 'A resposta que tira o medo',
        filhos: [
          { label: 'Custódia na B3', desc: 'Ações e FIIs ficam registrados no seu CPF na B3, não na corretora.' },
          { label: 'Área do investidor B3', desc: 'Site gratuito onde você confere sua posição sem depender da plataforma onde comprou.' },
          { label: 'Patrimônio segregado', desc: 'O dinheiro do fundo é separado do da instituição. Se ela quebra, o fundo não vai junto.' },
          {
            label: 'Se a corretora quebrar',
            desc: 'Ação e FII continuam seus; CDB tem FGC; fundo tem patrimônio segregado.',
            netos: [
              { label: 'O que você perde', desc: 'O acesso pela plataforma e o tempo até transferir tudo para outra corretora. Não o patrimônio.' },
            ],
          },
        ],
      },
      {
        id: 'garantias',
        label: 'Garantias',
        cor: '#FFC93C',
        resumo: 'O que é protegido e o que não é',
        filhos: [
          { label: 'FGC', desc: 'Devolve até um limite por CPF e por instituição em caso de quebra de banco. Cobre poupança, CDB, LCI e LCA.' },
          { label: 'O que o FGC não cobre', desc: 'Ação, FII, fundo, CRI, CRA, debênture e Tesouro. Cada um tem outra proteção, ou nenhuma.' },
          { label: 'Risco soberano', desc: 'O Tesouro Direto não tem FGC porque o devedor é o próprio governo — considerado o menor risco de crédito em real.' },
          { label: 'Teto global', desc: 'Além do limite por instituição, o FGC tem um teto total por CPF em um período. Confira a regra vigente.' },
        ],
      },
      {
        id: 'mercados',
        label: 'Os mercados',
        cor: '#8B5CF6',
        resumo: 'Primário, secundário e os outros',
        filhos: [
          { label: 'Primário', desc: 'Quando o dinheiro vai para quem emitiu: IPO, emissão de CDB, nova oferta de FII.' },
          { label: 'Secundário', desc: 'Quando você compra de outro investidor. É a bolsa do dia a dia, e a empresa não recebe nada aí.' },
          { label: 'Mercado de crédito', desc: 'Empréstimos entre bancos, empresas e pessoas. É onde a Selic vira taxa de cartão e de financiamento.' },
          { label: 'Mercado de câmbio', desc: 'Troca de moedas, onde se forma a cotação do dólar que aparece no noticiário.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Comparador de Renda Fixa',
    intro:
      'Entender quem emite cada produto muda a leitura do rendimento. Emissor com mais risco paga mais — e o comparador ajuda a ver quanto desse "mais" realmente chega no seu bolso depois do imposto.',
    passos: [
      'Abra Ferramentas → Comparador de Renda Fixa',
      'Compare um CDB de banco grande com um de banco médio, ambos dentro do limite do FGC',
      'Repare que o segundo paga mais porque o risco de crédito é maior',
      'Compare agora com uma LCI isenta do mesmo emissor',
      'Conclua qual combinação de emissor e produto entrega mais líquido',
    ],
    exemploGuiado:
      'Exemplo: banco grande oferece 98% do CDI, banco médio oferece 112%. A diferença não é generosidade, é preço do risco. Dentro do limite do FGC, esse risco fica bastante mitigado — e é por isso que dividir entre vários emissores médios, sempre abaixo do teto de cada um, costuma ser mais eficiente que concentrar em um banco grande.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que acontece com suas ações se a corretora quebrar?', verso: 'Nada com o patrimônio. Elas ficam custodiadas no seu CPF na B3 e podem ser transferidas para outra corretora. O que se perde é o acesso pela plataforma.' },
    { id: 'fc2', frente: 'Qual a diferença entre Banco Central e CVM?', verso: 'O Banco Central cuida da moeda, dos juros e da saúde dos bancos. A CVM fiscaliza o mercado de valores mobiliários: ações, fundos, FIIs e ofertas ao público.' },
    { id: 'fc3', frente: 'O que o FGC não cobre?', verso: 'Ação, FII, fundo de investimento, CRI, CRA, debênture e Tesouro Direto. Ele cobre poupança, CDB, LCI e LCA de bancos.' },
    { id: 'fc4', frente: 'O que é patrimônio segregado?', verso: 'A separação entre o dinheiro do fundo e o da instituição que o administra. Se ela quebrar, o patrimônio do fundo não é atingido.' },
    { id: 'fc5', frente: 'Qual a diferença entre mercado primário e secundário?', verso: 'No primário, o dinheiro vai para quem emitiu o ativo. No secundário, você compra de outro investidor e o emissor não recebe nada.' },
    { id: 'fc6', frente: 'Por que o Tesouro Direto não tem FGC?', verso: 'Porque o devedor é o próprio governo federal. Não faria sentido um fundo bancário garantir quem emite a moeda — é o menor risco de crédito em real que existe.' },
  ],

  quiz: [
    {
      pergunta: 'Você tem R$ 100 mil em CDB e R$ 50 mil em ações na mesma corretora, que vai à falência. O que acontece?',
      alternativas: ['Você perde tudo', 'O CDB é coberto pelo FGC dentro do limite e as ações continuam suas na custódia da B3', 'Só as ações são protegidas', 'O FGC cobre os dois'],
      correta: 1,
      explicacao: 'São proteções diferentes: o FGC cobre a renda fixa bancária até o limite, e as ações permanecem registradas no seu CPF na B3, podendo ser transferidas.',
    },
    {
      pergunta: 'Uma plataforma promete investimentos com retorno alto e não aparece no cadastro da CVM. O que isso significa?',
      alternativas: ['Que ela é nova no mercado', 'Que ela opera fora do sistema regulado, e nenhuma garantia alcança esse dinheiro', 'Que ela é isenta de fiscalização por ser pequena', 'Que só investidores qualificados podem usar'],
      correta: 1,
      explicacao: 'Oferta pública de investimento exige registro. Sem ele, não há fiscalização nem garantia, e recuperar dinheiro nesses casos é praticamente impossível.',
    },
    {
      pergunta: 'Quem faz a liquidação das operações de bolsa, garantindo que comprador e vendedor cumpram o combinado?',
      alternativas: ['A corretora', 'A câmara de liquidação da B3', 'O Banco Central', 'A CVM'],
      correta: 1,
      explicacao: 'A câmara de liquidação da B3 garante o cumprimento das operações. É isso que permite negociar com um desconhecido sem risco de calote na ponta.',
    },
    {
      pergunta: 'Em qual situação a empresa emissora recebe o dinheiro da sua compra?',
      alternativas: ['Sempre que você compra a ação dela', 'Apenas no mercado primário, como em um IPO ou nova emissão', 'Quando você vende a ação', 'Quando ela paga dividendos'],
      correta: 1,
      explicacao: 'No mercado secundário você compra de outro investidor, e o dinheiro vai para ele. A empresa só capta recursos no mercado primário.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso confiar na corretora?',
      resposta: 'Menos do que parece. Ela é intermediária: não guarda seus ativos nem seu dinheiro de forma definitiva. O que importa é o registro na CVM e o custo. Confiança cega em plataforma é justamente o que se evita entendendo a estrutura.',
    },
    {
      pergunta: 'Banco ou corretora, onde investir?',
      resposta: 'Corretora costuma ter mais opções e menos custo, porque não precisa empurrar produto próprio. Banco tem conveniência. O ponto de atenção é o conflito de interesse: quem emite e vende o mesmo produto tende a oferecer o dele.',
    },
    {
      pergunta: 'Como verifico se uma instituição é autorizada?',
      resposta: 'Nos sites da CVM e do Banco Central existem consultas públicas e gratuitas de instituições autorizadas. Leva dois minutos e elimina o principal risco de fraude, que é aplicar em quem nunca entrou no sistema regulado.',
    },
  ],
}
