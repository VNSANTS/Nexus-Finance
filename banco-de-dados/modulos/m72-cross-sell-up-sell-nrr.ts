import { Modulo } from '@/types'

export const crossSellUpSellNrr: Modulo = {
  id: 'cross-sell-up-sell-nrr',
  trilhaId: 'geracao-de-receita',
  numero: 6,
  titulo: 'Cross-sell, Up-sell e NRR',
  subtitulo: 'Vender mais para quem já confia custa uma fração de conquistar alguém novo',
  iconName: 'PackagePlus',
  duracaoMin: 11,

  nivel: 'intermediario',
  preRequisitos: ['funil-de-conversao'],
  objetivoAprendizagem: 'Você vai sair sabendo a diferença entre cross-sell e up-sell, e como o NRR mede se uma empresa consegue crescer a receita mesmo sem conquistar nenhum cliente novo.',
  erroFatal: 'Focar 100% do esforço comercial em conquistar clientes novos, ignorando a receita disponível dentro da própria base de clientes já existente — que custa uma fração do CAC para conquistar cada real adicional.',
  numeroChave: { valor: '100%', legenda: 'um NRR (Net Revenue Retention) acima de 100% significa que a empresa cresceria em receita mesmo que parasse totalmente de vender para clientes novos — é o indicador mais valorizado por investidores em empresas de assinatura' },
  glossarioDoModulo: ['Cross-sell', 'Up-sell', 'NRR', 'Downgrade'],
  proximoPasso: { moduloId: 'priorizacao-de-canais', motivo: 'Depois de aprender a expandir receita da base atual, o último módulo da trilha ensina a priorizar entre os canais que trazem clientes novos.' },

  aprender: {
    oQueE: 'Cross-sell é vender um produto ou serviço diferente e complementar para um cliente que já comprou algo (por exemplo, vender uma capinha para quem comprou um celular). Up-sell é vender uma versão superior, mais completa ou mais cara do que o cliente já usa (por exemplo, migrar um cliente do plano básico para o plano premium). NRR, sigla para Net Revenue Retention (Retenção Líquida de Receita), é o indicador que mede o resultado líquido dessas duas forças, somadas ao cancelamento, dentro da base de clientes já existente, sem contar nenhum cliente novo.',
    porQueImporta: 'Conquistar um cliente novo custa o CAC inteiro, calculado em módulo anterior. Vender mais para um cliente que já confia na empresa custa uma fração disso, porque a confiança e o relacionamento já existem. Empresas de assinatura maduras sabem disso e monitoram o NRR de perto: um NRR acima de 100% significa que a receita da base atual, sozinha, já cresce — mesmo que a empresa não trouxesse nenhum cliente novo naquele período, ainda assim faturaria mais que no período anterior.',
    naPratica: 'O cálculo do NRR parte da receita da base de clientes existente no início do período, soma as expansões (cross-sell e up-sell que esses mesmos clientes compraram) e subtrai as perdas (cancelamentos e downgrades, quando o cliente migra para um plano mais barato), sem incluir receita de nenhum cliente novo. O resultado é dividido pela receita inicial da base para chegar ao percentual. Um NRR de 110% significa que, para cada R$ 100 de receita da base no início do período, a empresa terminou com R$ 110 vindos apenas dessa mesma base — os clientes que ficaram compraram mais do que os que saíram ou reduziram.',
    passoAPasso: [
      'Identifique a receita total da base de clientes existente no início de um período (por exemplo, um trimestre).',
      'Some as expansões dentro dessa mesma base: quanto os clientes atuais compraram a mais via cross-sell ou up-sell.',
      'Subtraia as perdas: quanto foi perdido em cancelamentos totais e downgrades (clientes que reduziram o plano ou volume comprado).',
      'Divida o resultado pela receita inicial da base para chegar ao percentual de NRR.',
      'Se o NRR está abaixo de 100%, priorize ações de retenção e expansão antes de acelerar aquisição de clientes novos.',
    ],
    errosComuns: [
      'Confundir cross-sell (produto complementar diferente) com up-sell (versão superior do mesmo produto) — são estratégias diferentes, com abordagens de venda diferentes.',
      'Calcular o NRR incluindo receita de clientes novos, o que na verdade mede crescimento total, não retenção líquida da base existente.',
      'Empurrar cross-sell e up-sell de forma agressiva demais, aumentando o churn no processo — a expansão só vale a pena se não custar retenção.',
      'Ignorar o downgrade como uma forma de perda — um cliente que reduz o plano não cancelou, mas também não está gerando o mesmo valor de antes.',
    ],
    comparativo: {
      titulo: 'Cross-sell vs. Up-sell',
      linhas: [
        { label: 'Cross-sell', valor: 'O quê: produto complementar, diferente do original | Exemplo: vender uma capinha para quem comprou um celular' },
        { label: 'Up-sell', valor: 'O quê: versão superior do mesmo produto | Exemplo: migrar cliente do plano básico para o premium' },
      ],
    },
    checklist: [
      'Sei calcular a receita da base existente no início e no fim do período.',
      'Diferencio claramente cross-sell de up-sell nas minhas ofertas.',
      'Calculei o NRR considerando expansão, cancelamento e downgrade — sem incluir clientes novos.',
      'Se o NRR está abaixo de 100%, priorizei ações de retenção antes de acelerar aquisição.',
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O livro mostra que riqueza real cresce de forma silenciosa e composta, não por eventos isolados — o NRR aplica essa mesma lógica de crescimento composto à receita de uma empresa, medindo o efeito acumulado de reter e expandir a base já conquistada.',
    },
  },

  mapaMental: {
    label: 'Cross-sell, Up-sell e NRR',
    subtitulo: 'Expandir a receita de quem já é cliente',
    ramos: [
      {
        id: 'cross-sell',
        label: 'Cross-sell',
        cor: '#3B82F6',
        resumo: 'Produto complementar e diferente',
        filhos: [
          { label: 'Exemplo', desc: 'Capinha para quem comprou celular' },
        ],
      },
      {
        id: 'up-sell',
        label: 'Up-sell',
        cor: '#8B5CF6',
        resumo: 'Versão superior do mesmo produto',
        filhos: [
          { label: 'Exemplo', desc: 'Migrar do plano básico para o premium' },
        ],
      },
      {
        id: 'nrr',
        label: 'NRR',
        cor: '#22C55E',
        resumo: 'Net Revenue Retention',
        filhos: [
          { label: 'Receita da base + expansão − perdas', desc: 'Tudo dividido pela receita inicial da base' },
          { label: 'Acima de 100%', desc: 'A empresa cresce mesmo sem clientes novos' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de NRR',
    intro: 'Vamos calcular o NRR de uma empresa fictícia de assinatura.',
    passos: [
      'Somar a receita inicial da base de clientes existente.',
      'Somar as expansões (cross-sell e up-sell) da mesma base.',
      'Subtrair cancelamentos e downgrades.',
      'Dividir o resultado pela receita inicial para achar o percentual de NRR.',
    ],
    exemploGuiado: 'Uma empresa de assinatura começa o trimestre com R$ 100.000 de receita mensal vindos da base de clientes existente. Durante o trimestre, essa mesma base gerou R$ 15.000 a mais via up-sell (upgrades de plano) e R$ 5.000 a mais via cross-sell (produtos complementares). Ao mesmo tempo, perdeu R$ 8.000 em cancelamentos e R$ 4.000 em downgrades. NRR = (100.000 + 15.000 + 5.000 − 8.000 − 4.000) ÷ 100.000 = 108.000 ÷ 100.000 = 108%. Mesmo sem contar nenhum cliente novo, a receita da base cresceu 8% no período — um NRR saudável, acima do benchmark de 100%.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é cross-sell?', verso: 'Vender um produto complementar e diferente do que o cliente já comprou (ex: capinha para quem comprou celular).' },
    { id: 'fc2', frente: 'O que é up-sell?', verso: 'Vender uma versão superior, mais completa ou mais cara do que o cliente já usa (ex: migrar do plano básico para o premium).' },
    { id: 'fc3', frente: 'O que significa NRR?', verso: 'Net Revenue Retention (Retenção Líquida de Receita) — mede se a base de clientes existente cresce ou encolhe em receita, sem contar clientes novos.' },
    { id: 'fc4', frente: 'O que significa um NRR acima de 100%?', verso: 'Que a empresa cresceria em receita mesmo que parasse totalmente de conquistar clientes novos naquele período.' },
    { id: 'fc5', frente: 'Por que vender mais para clientes existentes custa menos que conquistar clientes novos?', verso: 'Porque a confiança e o relacionamento já existem — não é preciso pagar o CAC inteiro de novo.' },
  ],

  quiz: [
    {
      pergunta: 'Uma loja de eletrônicos vende um seguro de garantia estendida para quem acabou de comprar um notebook. Isso é um exemplo de:',
      alternativas: ['Up-sell', 'Cross-sell', 'Churn', 'NRR'],
      correta: 1,
      explicacao: 'É cross-sell: um produto complementar e diferente do notebook original, não uma versão superior do mesmo produto.',
      dificuldade: 'facil',
    },
    {
      pergunta: 'Uma empresa de assinatura tinha R$ 50.000 de receita da base no início do trimestre, ganhou R$ 8.000 em expansão e perdeu R$ 12.000 em cancelamentos e downgrades. Qual é o NRR?',
      alternativas: ['84%', '92%', '100%', '116%'],
      correta: 1,
      explicacao: '(50.000 + 8.000 − 12.000) ÷ 50.000 = 46.000 ÷ 50.000 = 92%.',
      dificuldade: 'medio',
    },
    {
      pergunta: 'Por que empurrar cross-sell e up-sell de forma muito agressiva pode ser um erro?',
      alternativas: [
        'Porque cross-sell e up-sell são ilegais em alguns setores',
        'Porque pode aumentar o churn, anulando o ganho de expansão',
        'Porque reduz automaticamente o CAC da empresa',
        'Porque só funciona em empresas de tecnologia',
      ],
      correta: 1,
      explicacao: 'Se a expansão é feita de forma agressiva demais, pode irritar o cliente e aumentar o cancelamento — a expansão só vale a pena se não custar retenção.',
      dificuldade: 'dificil',
    },
  ],

  faq: [
    {
      pergunta: 'Meu negócio não tem assinatura — ainda faz sentido calcular NRR?',
      resposta: 'O conceito é mais natural em negócios recorrentes, mas a lógica de expansão (cross-sell/up-sell) vale para qualquer negócio. Para calcular um NRR aproximado sem assinatura, use a receita total da mesma base de clientes em dois períodos comparáveis, mesmo sem contrato formal.',
    },
    {
      pergunta: 'Qual é considerado um bom NRR no mercado?',
      resposta: 'Empresas de tecnologia de alto desempenho costumam mirar NRR acima de 110-120%. Um NRR entre 100% e 110% já é considerado saudável na maioria dos setores. Abaixo de 100% é sinal de alerta — a base está encolhendo em receita.',
    },
  ],
}
