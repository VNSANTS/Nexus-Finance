import { Modulo } from '@/types'

export const fasesDaReceita: Modulo = {
  id: 'fases-da-receita',
  trilhaId: 'geracao-de-receita',
  numero: 2,
  titulo: 'As Quatro Fases da Receita',
  subtitulo: 'Venda única, esteira, recorrência e embaixador — elas não se substituem, se acumulam',
  iconName: 'Layers',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['introducao-geracao-de-receita'],
  objetivoAprendizagem: 'Você vai sair sabendo identificar em qual das quatro fases de receita o seu negócio está hoje, e o que falta para acumular a próxima.',
  erroFatal: 'Achar que uma fase substitui a anterior — uma empresa madura de verdade ainda vende uma vez para quem nunca comprou (fase 1), ao mesmo tempo em que fideliza via recorrência (fase 3). Abandonar a venda única achando que só recorrência importa é perder uma fatia real de receita.',
  numeroChave: { valor: '4 fases', legenda: 'venda única, esteira (product line), recorrência e embaixador (referral loop) — elas se acumulam, uma sobre a outra' },
  glossarioDoModulo: ['Expansion Revenue', 'MRR', 'Churn', 'Referral Loop'],
  proximoPasso: { moduloId: 'ltv-cac', motivo: 'Depois de mapear as fases de receita, o próximo passo é medir se o investimento em conquistar clientes está valendo a pena — é isso que o LTV/CAC responde.' },

  aprender: {
    oQueE: 'As quatro fases da receita descrevem os estágios pelos quais toda empresa passa, ou deveria passar, na forma como constrói sua receita: venda única (cada venda começa do zero), esteira ou product line (o que o cliente compra antes e depois do produto principal), recorrência (o cliente volta sozinho, por hábito ou assinatura) e embaixador ou referral loop (o cliente vira canal de aquisição sem custo, indicando por conta própria).',
    porQueImporta: 'Imagine dois donos de padaria na mesma rua. Um vende só pão, do jeito que o pai dele vendia — cada venda começa do zero, e ele precisa de um cliente novo entrando pela porta todo dia. O outro vende o café da manhã inteiro, tem cartão de fidelidade, e os clientes fiéis trazem os vizinhos. Os dois vendem a mesma matéria-prima, mas um construiu um sistema e o outro só um hábito repetido. Quando vem um mês ruim, só um dos dois sobrevive sem quebrar.',
    naPratica: 'Fase 1, venda única, é o estágio mais caro de sustentar, porque toda venda nova exige conquistar alguém do zero, sem nenhum efeito acumulado de uma venda para a próxima. Fase 2, esteira, organiza o que o cliente compra antes e depois do produto principal — em empresas de tecnologia, essa receita extra de quem já é cliente se chama expansion revenue, e custa uma fração do que custa conquistar alguém novo. Fase 3, recorrência, é a lógica do MRR (Monthly Recurring Revenue), a métrica que hoje domina a avaliação de empresas de tecnologia: não quanto a empresa vendeu esse mês, mas quanto ela já sabe que vai vender no mês que vem. Fase 4, embaixador, é o estágio mais avançado — quando a taxa de indicação supera o churn (taxa de perda de clientes), a empresa cresce mesmo sem aumentar o investimento em anúncio.',
    passoAPasso: [
      'Liste as formas atuais pelas quais seu negócio gera receita, e classifique cada uma nas quatro fases.',
      'Identifique se você tem alguma fase completamente ausente — a maioria dos negócios pequenos para na fase 1 ou 2.',
      'Se está preso na fase 1 (venda única), pense no que o cliente poderia comprar antes ou depois do produto principal (fase 2).',
      'Se já tem fase 2, pergunte: existe algo que faria esse cliente voltar sozinho, por hábito, sem precisar ser convencido de novo (fase 3)?',
      'Se já tem recorrência, pergunte: os clientes mais fiéis indicam a empresa espontaneamente, ou isso nunca foi estimulado (fase 4)?',
    ],
    errosComuns: [
      'Achar que a fase 4 (embaixador) substitui as fases anteriores — ela é a mais avançada, mas as outras continuam gerando receita em paralelo.',
      'Investir pesado em conseguir indicações (fase 4) antes de ter uma base sólida de recorrência (fase 3) — sem recorrência, não há uma base fiel o suficiente para indicar.',
      'Confundir uma promoção pontual com "esteira" de verdade — esteira é um caminho estruturado do que o cliente compra antes e depois, não um desconto avulso.',
      'Ignorar o custo real da fase 1: cada venda nova nesse estágio carrega o custo de aquisição inteiro, sem diluição nenhuma.',
    ],
    comparativo: {
      titulo: 'As quatro fases lado a lado',
      linhas: [
        { label: 'Venda única', valor: 'Custo: todo o CAC recai sobre cada venda | Exemplo: padaria que só vende pão, sem fidelização' },
        { label: 'Esteira (product line)', valor: 'Custo: fração do CAC, já é cliente | Exemplo: quem compra pão também compra queijo e café' },
        { label: 'Recorrência (MRR)', valor: 'Custo: baixo, cliente volta sozinho | Exemplo: cartão de fidelidade, assinatura mensal' },
        { label: 'Embaixador (referral loop)', valor: 'Custo: quase zero, cliente indica | Exemplo: cliente fiel traz vizinhos e colegas' },
      ],
    },
    checklist: [
      'Mapeei em qual fase (ou fases) meu negócio está hoje.',
      'Identifiquei a fase mais ausente ou mais fraca no meu modelo atual.',
      'Pensei em pelo menos uma ação concreta para avançar para a próxima fase.',
      'Entendi que as quatro fases coexistem — não preciso "abandonar" nenhuma para avançar.',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Assim como o método de Dave Ramsey defende construir camadas de segurança financeira de forma sistemática, as quatro fases de receita defendem construir camadas de receita — uma sobre a outra — em vez de depender de um único mecanismo frágil.',
    },
    naoConfundirCom: [
      { moduloId: 'cross-sell-up-sell-nrr', diferenca: 'Este módulo mapeia as quatro fases estruturais de receita (o "mapa geral"); Cross-sell/Up-sell/NRR aprofunda especificamente a técnica de expandir receita da fase 2 (esteira) e mede isso com um indicador.' },
    ],
  },

  mapaMental: {
    label: 'As Quatro Fases da Receita',
    subtitulo: 'Elas se acumulam, não se substituem',
    ramos: [
      {
        id: 'venda-unica',
        label: 'Venda Única',
        cor: '#EF4444',
        resumo: 'A fase mais cara de sustentar',
        filhos: [
          { label: 'Cada venda começa do zero', desc: 'Todo esforço de aquisição recai sobre a transação' },
          { label: 'Sem efeito acumulado', desc: 'Uma venda não ajuda a próxima' },
        ],
      },
      {
        id: 'esteira',
        label: 'Esteira (Product Line)',
        cor: '#FFC93C',
        resumo: 'O caminho antes e depois do produto principal',
        filhos: [
          { label: 'Expansion revenue', desc: 'Receita extra de quem já é cliente' },
          { label: 'Custa uma fração', desc: 'Do que custa conquistar alguém novo' },
        ],
      },
      {
        id: 'recorrencia',
        label: 'Recorrência',
        cor: '#3B82F6',
        resumo: 'O cliente volta sozinho',
        filhos: [
          { label: 'MRR', desc: 'Monthly Recurring Revenue — receita que já se sabe que vai entrar' },
          { label: 'Por hábito ou assinatura', desc: 'Sem precisar convencer de novo a cada compra' },
        ],
      },
      {
        id: 'embaixador',
        label: 'Embaixador (Referral Loop)',
        cor: '#22C55E',
        resumo: 'O estágio mais avançado',
        filhos: [
          { label: 'Cliente vira canal de aquisição', desc: 'Indica por conta própria, sem custo' },
          { label: 'Cresce sem aumentar investimento', desc: 'Quando indicação supera o churn' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos simular a jornada de um negócio subindo pelas quatro fases, uma decisão de cada vez.',
    passos: [
      'Identificar em qual fase o negócio do cenário está atualmente.',
      'Avaliar cada opção de próximo passo considerando se ela constrói a fase seguinte de forma sólida ou pula etapas.',
      'Escolher a opção que constrói a estrutura, não só o volume de vendas.',
    ],
    exemploGuiado: 'Uma loja de roupas presa na fase 1 (venda única) tenta avançar de forma gradual: primeiro cria uma esteira sugerindo acessórios (fase 2), depois, com esse hábito de compra combinada consolidado, lança um clube de assinatura com desconto progressivo (fase 3). Pular direto para recorrência sem antes ter esteira normalmente falha, porque a loja ainda não sabe, com dados, o que o cliente recompra com previsibilidade.',
    cenarioGuiado: [
      {
        pergunta: 'Você tem uma loja de roupas que só vende peças avulsas, sem nenhum programa de fidelidade. Qual é o primeiro passo mais lógico para sair da fase 1 (venda única)?',
        opcoes: [
          { texto: 'Criar uma esteira: sugerir acessórios que combinam com a peça comprada', resultado: 'Correto para avançar de forma gradual: isso constrói a fase 2 (esteira) sem exigir mudança de modelo de negócio, aproveitando a venda que já está acontecendo.' },
          { texto: 'Lançar direto um programa de assinatura mensal de roupas', resultado: 'Pular direto para recorrência (fase 3) sem ter esteira (fase 2) constrói uma estrutura sofisticada demais, cedo demais — normalmente falha por falta de dados sobre o que o cliente realmente recompra.' },
          { texto: 'Investir mais em anúncios para trazer clientes novos', resultado: 'Isso mantém a loja presa na fase 1 — mais tráfego não resolve a ausência de estrutura, só aumenta o volume de vendas isoladas, cada uma pagando o custo de aquisição inteiro.' },
        ],
      },
      {
        pergunta: 'A esteira está funcionando: os clientes compram acessórios junto com as roupas. Qual é o próximo movimento natural para chegar à fase 3 (recorrência)?',
        opcoes: [
          { texto: 'Criar um clube com desconto progressivo para quem compra todo mês', resultado: 'Essa é a lógica certa de recorrência: dá ao cliente um motivo estruturado para voltar por hábito, não por lembrança aleatória.' },
          { texto: 'Fazer uma liquidação pontual de fim de ano', resultado: 'Uma liquidação pontual gera vendas de uma vez, mas não constrói nenhum mecanismo que faça o cliente voltar sozinho no mês seguinte — continua sendo fase 1 ou 2, disfarçada de promoção.' },
          { texto: 'Contratar mais vendedores para atender mais gente na loja física', resultado: 'Mais atendimento pode melhorar a experiência, mas não cria, por si só, um motivo estrutural para o cliente voltar todo mês — isso é operação, não fase de receita.' },
        ],
      },
    ],
  },

  flashcards: [
    { id: 'fc1', frente: 'Quais são as quatro fases da receita, na ordem?', verso: 'Venda única, esteira (product line), recorrência e embaixador (referral loop).' },
    { id: 'fc2', frente: 'Por que a fase 1 (venda única) é a mais cara de sustentar?', verso: 'Porque toda venda nova exige conquistar alguém do zero — todo o custo de aquisição recai sobre cada transação, sem efeito acumulado.' },
    { id: 'fc3', frente: 'O que é expansion revenue?', verso: 'A receita extra que vem de clientes que já compraram antes (fase esteira), custando uma fração do que custa conquistar alguém novo.' },
    { id: 'fc4', frente: 'O que significa MRR?', verso: 'Monthly Recurring Revenue (Receita Recorrente Mensal) — não quanto a empresa vendeu no mês, mas quanto ela já sabe que vai vender no mês seguinte.' },
    { id: 'fc5', frente: 'Quando uma empresa consegue crescer mesmo sem aumentar o investimento em anúncio?', verso: 'Na fase embaixador (referral loop), quando a taxa de indicação de clientes supera a taxa de churn.' },
    { id: 'fc6', frente: 'As quatro fases se substituem ou se acumulam?', verso: 'Se acumulam — uma empresa madura vende ao mesmo tempo por venda única, esteira, recorrência e indicação.' },
  ],

  quiz: [
    {
      pergunta: 'Qual das quatro fases é a mais cara de sustentar, e por quê?',
      alternativas: [
        'Recorrência, porque exige um sistema de assinatura caro de manter',
        'Venda única, porque cada venda exige conquistar o cliente do zero, sem efeito acumulado',
        'Esteira, porque exige estoque adicional de produtos complementares',
        'Embaixador, porque o programa de indicação custa caro para administrar',
      ],
      correta: 1,
      explicacao: 'Na venda única, todo o esforço e custo de aquisição recai sobre cada transação individual, sem nenhum efeito acumulado de uma venda para a próxima — é o estágio mais caro por definição.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Uma empresa de SaaS relata que "sabe, hoje, quanto vai faturar no mês que vem, mesmo sem vender para ninguém novo". A qual fase e métrica isso se refere?',
      alternativas: [
        'Fase esteira, medida pelo CAC',
        'Fase recorrência, medida pelo MRR',
        'Fase embaixador, medida pelo k-factor',
        'Fase venda única, medida pelo ticket médio',
      ],
      correta: 1,
      explicacao: 'Essa previsibilidade de receita futura sem depender de vendas novas é exatamente a lógica do MRR (Monthly Recurring Revenue), a métrica central da fase de recorrência.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que é um erro achar que a fase "embaixador" substitui as fases anteriores?',
      alternativas: [
        'Porque a fase embaixador não gera receita real, só marketing',
        'Porque uma empresa madura ainda vende para quem nunca comprou, fideliza via recorrência e colhe indicação — tudo ao mesmo tempo',
        'Porque a fase embaixador só funciona para empresas de tecnologia',
        'Porque o referral loop é ilegal em alguns setores regulados',
      ],
      correta: 1,
      explicacao: 'As quatro fases coexistem numa empresa madura: cada uma traz uma fatia diferente da receita total, e nenhuma elimina a necessidade das outras.',
      dificuldade: 'medio',
    },
  ],

  faq: [
    {
      pergunta: 'Meu negócio está preso na fase 1 há anos. Isso é normal?',
      resposta: 'É comum, principalmente em negócios que vendem produtos de compra única e espaçada (como uma reforma de casa). Mesmo nesses casos, geralmente dá para construir uma esteira (indicar produtos complementares) ou um mecanismo de indicação, mesmo sem recorrência mensal clássica.',
    },
    {
      pergunta: 'É possível pular direto para a fase 4 (embaixador) sem passar pelas outras?',
      resposta: 'Tecnicamente algumas empresas nascem virais, mas isso é raro e difícil de sustentar. Na prática, indicação forte costuma vir de uma base de clientes fiéis (fase 3), que só existe depois de uma esteira que aumenta o valor percebido (fase 2).',
    },
  ],
}
