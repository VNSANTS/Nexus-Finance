import type { Modulo } from '@/types'

export const moduloRendaFixaAvancada: Modulo = {
  id: 'renda-fixa-avancada',
  trilhaId: 'vida-financeira',
  numero: 7,
  titulo: 'Renda Fixa Avançada para Renda Mensal',
  subtitulo: 'Transformar patrimônio acumulado em salário todo mês, sem corroer o principal',
  iconName: 'Wallet2',
  duracaoMin: 13,

  nivel: 'avancado',
  erroFatal: 'Montar uma carteira só com títulos que pagam juros no vencimento (não semestrais) achando que vai gerar renda mensal. Título com cupom só no fim significa: o dinheiro rende, mas não vira caixa disponível até o papel vencer — quem precisa de renda todo mês fica ilíquido justamente quando mais precisa do fluxo.',
  numeroChave: { valor: '2 em 2', legenda: 'meses é o intervalo típico de pagamento de cupom em muitos títulos de renda fixa — por isso escalonar vencimentos é essencial pra ter fluxo mensal real' },

  aprender: {
    oQueE: 'Renda fixa avançada para renda mensal é a estratégia de estruturar uma carteira de títulos (Tesouro, CDB, debêntures) de forma escalonada, para que sempre haja algum pagamento — de juros ou de vencimento — caindo na conta todo mês, gerando um fluxo parecido com salário.',
    porQueImporta: 'Ter patrimônio investido não é o mesmo que ter renda disponível. Uma carteira mal estruturada pode ter R$ 1 milhão aplicado e zero de liquidez num determinado mês, porque todos os títulos vencem no mesmo período do ano.',
    naPratica: 'A técnica central chama-se "escada de vencimentos" (bond laddering): em vez de comprar um único título grande, você distribui o capital em vários títulos com vencimentos e pagamentos de cupom espalhados ao longo do ano, criando previsibilidade de caixa.',
    passoAPasso: [
      'Defina o valor mensal de renda desejado (ex: R$ 4.000/mês) e o total de capital disponível para gerar essa renda',
      'Priorize títulos com pagamento de cupom periódico (semestral ou trimestral) em vez de só no vencimento, como Tesouro IPCA+ com juros semestrais',
      'Distribua o capital entre vários títulos com datas de pagamento de cupom diferentes, escalonadas ao longo do ano',
      'Combine títulos pós-fixados (CDI) para proteção em cenário de alta de juros com títulos IPCA+ para proteção contra inflação',
      'Reinvista o que não for usado como renda naquele mês, mantendo o principal trabalhando',
      'Considere isenção de IR em LCI/LCA e debêntures incentivadas para aumentar a renda líquida disponível',
    ],
    errosComuns: [
      'Concentrar tudo em um único título ou uma única data de vencimento',
      'Ignorar o IR regressivo e calcular a renda mensal com base no valor bruto, não líquido',
      'Não considerar risco de crédito ao buscar taxas mais altas em CDBs de bancos menores sem checar o FGC',
      'Esquecer que produtos de renda fixa isentos (LCI/LCA) não têm rendimento maior sozinho — a comparação justa é sempre pelo retorno líquido',
      'Resgatar título antes do vencimento sem considerar a marcação a mercado, que pode gerar perda se as taxas subiram desde a compra',
    ],
    comparativo: {
      titulo: 'Estruturas de carteira para renda mensal',
      linhas: [
        { label: 'Um único título grande', valor: 'Renda concentrada numa data, ilíquido no resto do ano' },
        { label: 'Escada de vencimentos', valor: 'Pagamentos escalonados, fluxo de caixa mais próximo do mensal' },
        { label: 'Só pós-fixado (CDI)', valor: 'Protege contra alta de juros, mas perde para inflação em cenários de queda de Selic' },
        { label: 'Só IPCA+', valor: 'Protege poder de compra, mas cupom semestral exige planejamento de meses sem pagamento' },
        { label: 'Mix CDI + IPCA+ + isentos', valor: 'Equilíbrio entre liquidez, proteção e renda líquida maior' },
      ],
    },
    checklist: [
      'Defini o valor mensal de renda que preciso e o capital disponível para gerar isso',
      'Priorizei títulos com pagamento de cupom periódico em vez de só no vencimento',
      'Escalonei os vencimentos e pagamentos ao longo dos 12 meses do ano',
      'Calculei a renda com base no valor líquido de IR, não no bruto',
      'Verifiquei a cobertura do FGC nos CDBs escolhidos',
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'O livro trata da transição de acumular patrimônio para viver da renda gerada por ele — exatamente o desafio prático de transformar uma carteira de renda fixa em fluxo de caixa mensal confiável.',
    },
  },

  mapaMental: {
    label: 'Renda Fixa Avançada para Renda Mensal',
    subtitulo: 'Como estruturar uma carteira que paga todo mês',
    ramos: [
      {
        id: 'escada-vencimentos',
        label: 'Escada de Vencimentos',
        cor: '#22C55E',
        resumo: 'A técnica central da estratégia',
        filhos: [
          { label: 'Distribuir por datas diferentes', desc: 'Evita concentração num único mês' },
          { label: 'Cupons periódicos preferidos', desc: 'Semestral ou trimestral, não só no vencimento' },
          { label: 'Reinvestir o excedente', desc: 'O que não vira renda continua rendendo' },
        ],
      },
      {
        id: 'tipos-titulos',
        label: 'Tipos de Título',
        cor: '#00D4FF',
        resumo: 'Cada um cumpre um papel diferente',
        filhos: [
          { label: 'Pós-fixado (CDI)', desc: 'Protege contra alta de juros' },
          { label: 'IPCA+', desc: 'Protege o poder de compra da renda' },
          { label: 'Isentos (LCI/LCA)', desc: 'Sem IR, mas comparar sempre pelo líquido' },
          { label: 'Debêntures incentivadas', desc: 'Isentas, geralmente com prazo mais longo' },
        ],
      },
      {
        id: 'riscos',
        label: 'Riscos a Gerenciar',
        cor: '#EF4444',
        resumo: 'O que pode quebrar o plano de renda',
        filhos: [
          { label: 'Risco de crédito', desc: 'Checar cobertura do FGC em CDBs' },
          { label: 'Marcação a mercado', desc: 'Resgate antecipado pode gerar perda' },
          { label: 'Concentração de vencimentos', desc: 'O erro mais comum e mais fácil de evitar' },
        ],
      },
      {
        id: 'tributacao',
        label: 'Tributação',
        cor: '#FFC93C',
        resumo: 'O que sobra depois do IR define a renda real',
        filhos: [
          { label: 'IR regressivo em CDB e Tesouro', desc: 'De 22,5% a 15%, conforme o prazo' },
          { label: 'Isenção em LCI/LCA', desc: 'Rendimento líquido pode superar CDB bruto maior' },
          { label: 'Calcular sempre pelo líquido', desc: 'Comparar taxas brutas é comparação incompleta' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Calculadora de Renda Fixa',
    intro: 'Vamos estruturar uma carteira de R$ 500 mil buscando gerar renda mensal escalonada.',
    passos: [
      'Dividir o capital entre diferentes tipos de título',
      'Escalonar os vencimentos e pagamentos de cupom ao longo do ano',
      'Calcular a renda mensal líquida aproximada',
      'Verificar se a renda cobre o objetivo mensal definido',
    ],
    exemploGuiado: 'Capital de R$ 500 mil dividido em três blocos: R$ 200 mil em CDBs pós-fixados de bancos diferentes (100% do CDI, dentro do limite do FGC de R$ 250 mil por instituição), com vencimentos escalonados a cada 4 meses; R$ 200 mil em Tesouro IPCA+ com juros semestrais, com duas séries de vencimentos diferentes para os pagamentos caírem em meses alternados; R$ 100 mil em LCI isenta de IR, vencimento único de 2 anos, servindo como reserva de reforço. Com uma taxa média líquida de cerca de 0,7% ao mês (considerando IR regressivo nos tributados e isenção na LCI), a carteira gera aproximadamente R$ 3.500/mês de renda combinada entre cupons e parcelas de vencimento, sem precisar tocar no principal na maior parte dos meses.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é a técnica de "escada de vencimentos" (bond laddering)?', verso: 'Distribuir o capital em vários títulos com datas de vencimento e pagamento de cupom escalonadas, para gerar fluxo de caixa mais constante.' },
    { id: 'fc2', frente: 'Por que título com cupom só no vencimento não gera renda mensal de verdade?', verso: 'Porque o dinheiro só fica disponível quando o título vence — não há fluxo de caixa intermediário, apenas rendimento "preso" até o final.' },
    { id: 'fc3', frente: 'Qual a diferença de proteção entre título pós-fixado (CDI) e IPCA+?', verso: 'Pós-fixado protege contra alta de juros; IPCA+ protege o poder de compra da renda contra a inflação.' },
    { id: 'fc4', frente: 'Por que sempre comparar rendimentos pelo valor líquido, não bruto?', verso: 'Porque títulos isentos de IR (LCI/LCA) podem render menos em taxa bruta e ainda assim entregar mais dinheiro líquido no bolso do que um CDB tributado.' },
    { id: 'fc5', frente: 'O que é marcação a mercado e por que importa nessa estratégia?', verso: 'É a variação do valor de um título antes do vencimento; resgatar antecipadamente pode gerar perda se as taxas de juros subiram desde a compra.' },
    { id: 'fc6', frente: 'Qual é o limite de cobertura do FGC por CPF e por instituição em CDBs?', verso: 'R$ 250 mil por instituição financeira, por CPF — por isso diversificar entre bancos diferentes reduz o risco de crédito.' },
  ],

  quiz: [
    {
      pergunta: 'Qual é o erro fatal mais comum ao tentar gerar renda mensal com renda fixa?',
      alternativas: [
        'Investir em títulos isentos de IR',
        'Montar a carteira só com títulos que pagam juros apenas no vencimento, sem fluxo de caixa intermediário',
        'Usar o Tesouro Direto em vez de CDB',
        'Diversificar entre CDI e IPCA+',
      ],
      correta: 1,
      explicacao: 'Sem cupons periódicos, o dinheiro rende mas não vira caixa disponível até o vencimento — o investidor fica ilíquido mesmo tendo patrimônio considerável aplicado.',
    },
    {
      pergunta: 'Por que combinar títulos pós-fixados (CDI) com IPCA+ na carteira?',
      alternativas: [
        'Porque a lei exige diversificação de indexadores',
        'Porque CDI protege contra alta de juros e IPCA+ protege o poder de compra, cobrindo cenários diferentes',
        'Porque títulos IPCA+ sempre rendem mais que CDI',
        'Não há vantagem real nessa combinação',
      ],
      correta: 1,
      explicacao: 'Cada indexador protege contra um risco diferente — combinar os dois reduz a dependência de um único cenário econômico se repetir durante todo o período de geração de renda.',
    },
    {
      pergunta: 'Um CDB isento não existe, mas uma LCI com taxa bruta menor que um CDB pode ainda assim ser melhor. Por quê?',
      alternativas: [
        'Porque LCI sempre tem prazo mais curto',
        'Porque a LCI é isenta de IR, então o rendimento líquido pode superar o do CDB tributado mesmo com taxa bruta menor',
        'Porque LCI tem cobertura do FGC maior que CDB',
        'Isso nunca acontece na prática',
      ],
      correta: 1,
      explicacao: 'A comparação correta é sempre pelo valor líquido recebido — um CDB com taxa bruta maior pode perder para uma LCI isenta depois de descontado o IR regressivo.',
    },
    {
      pergunta: 'O que acontece se um investidor precisar resgatar um título de renda fixa antes do vencimento em um cenário de alta de juros?',
      alternativas: [
        'Ele sempre recebe exatamente o valor investido mais os juros proporcionais',
        'Ele pode ter perda por marcação a mercado, pois o valor do título cai quando as taxas de juros sobem',
        'O resgate antecipado é sempre proibido em renda fixa',
        'A marcação a mercado só afeta ações, não renda fixa',
      ],
      correta: 1,
      explicacao: 'Títulos prefixados e IPCA+ sofrem marcação a mercado: quando as taxas de juros sobem após a compra, o valor de revenda do título cai, gerando perda se resgatado antes do vencimento.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso de quanto capital pra viver só de renda fixa?',
      resposta: 'Depende da taxa líquida média da carteira e da renda mensal desejada. Como referência grosseira, com uma taxa líquida de cerca de 0,7% ao mês, cada R$ 100 mil de capital gera em torno de R$ 700/mês de renda combinada — mas isso varia com o cenário de juros e a estrutura escolhida.',
    },
    {
      pergunta: 'Escada de vencimentos funciona só com Tesouro Direto ou também com CDB?',
      resposta: 'Funciona com qualquer título de renda fixa — Tesouro, CDB, LCI/LCA, debêntures. O princípio é o mesmo: escalonar datas de pagamento, independente do tipo de papel.',
    },
    {
      pergunta: 'Vale a pena contratar uma renda fixa "automática" (fundo de renda fixa) em vez de montar a escada sozinho?',
      resposta: 'Fundos de renda fixa dão praticidade, mas cobram taxa de administração e geralmente não garantem o mesmo controle sobre datas de pagamento que uma escada montada manualmente. Para quem quer previsibilidade de fluxo mensal, montar a própria escada costuma ser mais eficiente.',
    },
  ],
}
