// m06-investimentos-alternativos.ts
import type { Modulo } from '@/types'

export const investimentosAlternativos: Modulo = {
  id: 'investimentos-alternativos',
  trilhaId: 'alternativos-derivativos',
  numero: 6,
  titulo: 'Investimentos Alternativos',
  subtitulo: 'Arte, vinhos, whisky, terras e outras categorias fora do tradicional — o que vale a pena e o que é ilusão de retorno',
  iconName: 'Gem',
  duracaoMin: 11,

  nivel: 'avancado',
  preRequisitos: ['ouro', 'equity'],
  objetivoAprendizagem: 'Você vai sair sabendo avaliar criticamente investimentos alternativos "exóticos" — separando categorias com mercado real de estratégias de marketing disfarçadas de investimento.',
  erroFatal: 'Comprar ativos colecionáveis (arte, vinho, relógios, terras rurais sem documentação) baseado apenas na narrativa de "valorização certa" de quem está vendendo, sem considerar liquidez, custos de manutenção e a dificuldade real de encontrar comprador pelo preço esperado no futuro.',
  numeroChave: { valor: '10% a 15%', legenda: 'faixa aproximada que consultores patrimoniais mais conservadores recomendam como limite máximo de exposição total a investimentos alternativos ilíquidos dentro de uma carteira diversificada' },
  glossarioDoModulo: ['Ativo ilíquido', 'Colecionável de investimento', 'Deságio de revenda', 'Custo de manutenção', 'Mercado secundário', 'Ativo real', 'Prêmio de iliquidez'],
  proximoPasso: { moduloId: 'esg', motivo: 'Depois de aprender a avaliar investimentos alternativos com ceticismo saudável, o próximo passo é entender ESG — um critério de análise que também exige cuidado para separar substância de marketing.' },

  aprender: {
    oQueE: 'Investimentos alternativos são qualquer classe de ativo fora das categorias tradicionais como ações, renda fixa e imóveis convencionais — isso inclui arte, vinhos e whiskies de coleção, relógios de luxo, terras rurais, obras raras, veículos clássicos e cotas de fundos de private equity e venture capital (já vistos no módulo de Equity). Alguns têm mercado secundário estabelecido e histórico de valorização documentado; outros são vendidos com uma narrativa atraente de "investimento exclusivo" que, na prática, tem pouquíssima liquidez e retorno real incerto.',
    porQueImporta: 'O apelo emocional de investimentos alternativos é forte: parecem exclusivos, tangíveis e "diferentes do óbvio". Mas justamente por isso são um terreno fértil para vendas baseadas em status e exclusividade, não em fundamentos reais de mercado. Sem entender liquidez, custos de manutenção e a diferença entre um mercado secundário ativo e um mercado quase inexistente, é fácil imobilizar capital relevante em algo que, na hora de vender, vale muito menos do que a narrativa de compra sugeria — ou que simplesmente não encontra comprador.',
    naPratica: 'No Brasil, terras rurais têm histórico de valorização consistente em regiões de agricultura produtiva, mas exigem devida diligência documental rigorosa (matrícula, georreferenciamento, ausência de disputas judiciais) e envolvem custos de manutenção, impostos como o ITR e, muitas vezes, gestão à distância. Vinhos e whiskies de coleção têm mercado secundário real, mas concentrado em rótulos específicos com histórico de leilão comprovado — a grande maioria das garrafas vendidas como "investimento" no varejo não tem esse tipo de demanda genuína. Relógios de luxo de marcas específicas (com lista de espera e escassez controlada pelo fabricante) valorizaram significativamente na última década, mas o mercado é volátil e sujeito a modismos. Arte de artistas consagrados, com histórico de leilão em casas reconhecidas (Christie’s, Sotheby’s), é a categoria mais próxima de um "mercado financeiro" de fato, mas exige capital elevado, custos de autenticação, seguro e armazenagem climatizada.',
    passoAPasso: [
      'Antes de considerar qualquer ativo alternativo como investimento, pesquise se existe mercado secundário documentado e histórico de preços de venda real (não apenas de avaliação).',
      'Calcule todos os custos de manutenção: seguro, armazenagem, impostos, autenticação, manutenção física — eles corroem o retorno líquido de forma significativa.',
      'Desconfie de qualquer oferta que prometa "valorização garantida" ou compare o ativo diretamente a investimentos tradicionais sem mencionar a diferença de liquidez.',
      'Verifique a documentação legal completa do ativo (procedência, propriedade, ausência de disputas) antes de qualquer compra de valor relevante.',
      'Limite a exposição total a investimentos alternativos ilíquidos a uma fração pequena do patrimônio, dado o baixo grau de liquidez da categoria como um todo.',
      'Considere o horizonte de tempo necessário para realizar valor: a maioria dos alternativos exige anos, não meses, para encontrar comprador pelo preço esperado.'
    ],
    errosComuns: [
      'Comprar ativos colecionáveis baseado em status ou desejo pessoal, mas tratando a compra como decisão de investimento com expectativa de retorno financeiro.',
      'Ignorar os custos recorrentes de manutenção (seguro, armazenagem, impostos), que podem consumir boa parte do ganho de capital esperado ao longo dos anos.',
      'Não verificar se existe mercado secundário real para o item específico, confiando apenas na palavra de quem está vendendo.',
      'Concentrar parte desproporcional do patrimônio em um único ativo ilíquido, comprometendo a flexibilidade financeira geral.',
      'Comprar terras rurais sem due diligence documental completa, expondo-se a disputas de propriedade ou passivos ambientais.',
      'Confundir raridade com valorização garantida — nem todo item raro tem demanda de mercado suficiente para sustentar um preço de revenda alto.'
    ],
    comparativo: {
      titulo: 'Categorias de investimentos alternativos: liquidez e maturidade de mercado',
      linhas: [
        { label: 'Arte de artistas consagrados', valor: 'Mercado: maduro, com casas de leilão reconhecidas | Liquidez: baixa, mas com histórico documentado | Capital mínimo: alto' },
        { label: 'Terras rurais produtivas', valor: 'Mercado: estabelecido no Brasil | Liquidez: baixa, venda pode levar meses ou anos | Capital mínimo: alto' },
        { label: 'Vinhos e whiskies de coleção', valor: 'Mercado: concentrado em rótulos específicos | Liquidez: muito baixa para a maioria das garrafas | Capital mínimo: variável' },
        { label: 'Relógios de luxo', valor: 'Mercado: ativo, mas volátil e sujeito a modismo | Liquidez: moderada para marcas específicas | Capital mínimo: médio a alto' }
      ]
    },
    checklist: [
      'Antes de comprar qualquer alternativo, pesquise histórico de preços de venda real em leilões ou mercado secundário documentado.',
      'Liste todos os custos recorrentes de manutenção do ativo antes de decidir.',
      'Verifique a documentação legal completa, especialmente em terras rurais e obras de arte.',
      'Limite a exposição total a alternativos ilíquidos a uma fração pequena do seu patrimônio.',
      'Pergunte a si mesmo se compraria o item mesmo sem expectativa de valorização — isso ajuda a separar desejo pessoal de decisão de investimento.'
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O livro mostra que quem acumula patrimônio real evita confundir consumo pessoal com investimento — a pergunta final do checklist, sobre comprar o item mesmo sem expectativa de valorização, é exatamente esse teste de honestidade.',
    },
    naoConfundirCom: [
      { moduloId: 'ouro', diferenca: 'Ouro é um ativo alternativo com mercado extremamente líquido e padronizado globalmente; a maioria dos investimentos alternativos deste módulo tem liquidez muito menor e mercado mais fragmentado.' },
      { moduloId: 'equity', diferenca: 'Equity de empresas (private equity, venture capital) é tratado com profundidade em módulo próprio; aqui o foco está em ativos físicos colecionáveis e terras, categorias com dinâmica de mercado bem diferente.' }
    ]
  },

  mapaMental: {
    label: 'Investimentos Alternativos',
    subtitulo: 'Categorias fora do tradicional e como avaliá-las',
    ramos: [
      {
        id: 'categorias-principais',
        label: 'Categorias Principais',
        cor: '#EC4899',
        resumo: 'Os tipos mais comuns de investimentos alternativos',
        filhos: [
          { label: 'Arte', desc: 'Obras de artistas consagrados, com histórico de leilão documentado' },
          { label: 'Terras rurais', desc: 'Propriedades produtivas, com valorização histórica em regiões específicas' },
          { label: 'Vinhos e whiskies', desc: 'Rótulos específicos com mercado secundário de colecionadores' },
          { label: 'Relógios de luxo', desc: 'Marcas com escassez controlada e lista de espera' }
        ]
      },
      {
        id: 'fatores-de-avaliacao',
        label: 'Fatores de Avaliação',
        cor: '#3B82F6',
        resumo: 'O que separa um alternativo real de uma ilusão de investimento',
        filhos: [
          { label: 'Mercado secundário documentado', desc: 'Existência de histórico de vendas reais, não apenas avaliações' },
          { label: 'Custos de manutenção', desc: 'Seguro, armazenagem, impostos e autenticação' },
          { label: 'Liquidez esperada', desc: 'Tempo realista necessário para encontrar comprador' },
          { label: 'Documentação legal', desc: 'Procedência, propriedade e ausência de disputas' }
        ]
      },
      {
        id: 'riscos',
        label: 'Riscos Específicos',
        cor: '#EF4444',
        resumo: 'O que costuma dar errado nessa categoria',
        filhos: [
          { label: 'Iliquidez severa', desc: 'Dificuldade real de vender pelo preço esperado quando necessário' },
          { label: 'Narrativa de vendedor', desc: 'Promessas de valorização garantida sem lastro em mercado real' },
          { label: 'Concentração excessiva', desc: 'Comprometer parcela desproporcional do patrimônio num único ativo ilíquido' },
          { label: 'Modismo de mercado', desc: 'Categorias que valorizam por tendência passageira, sem sustentação de longo prazo' }
        ]
      },
      {
        id: 'papel-na-carteira',
        label: 'Papel na Carteira',
        cor: '#22C55E',
        resumo: 'Como esses ativos se encaixam numa estratégia diversificada',
        filhos: [
          { label: 'Fração limitada', desc: 'Consultores conservadores recomendam entre 10% e 15% no máximo' },
          { label: 'Diversificação adicional', desc: 'Baixa correlação com ações e renda fixa tradicionais' },
          { label: 'Horizonte longo', desc: 'Retorno, quando existe, costuma se realizar apenas no longo prazo' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões reais sobre investimentos alternativos e vê o resultado esperado de cada escolha, considerando liquidez, custos e documentação.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre um ativo alternativo.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando os fatores reais de avaliação da categoria.'
    ],
    exemploGuiado: 'Uma pessoa recebe uma oferta de compra de um "lote de vinhos de investimento" por R$ 30.000, com a promessa de valorização de 12% ao ano nos próximos 5 anos. Antes de decidir, ela pesquisa se os rótulos específicos oferecidos têm histórico de venda em leilões de vinho reconhecidos e descobre que apenas 2 dos 12 rótulos do lote têm esse tipo de demanda documentada — os outros 10 são vinhos de qualidade boa, mas sem mercado secundário de colecionador estabelecido. Ela também calcula o custo anual de armazenagem em condições adequadas (temperatura e umidade controladas), que giraria em torno de R$ 1.200 por ano. Com essa análise, ela decide não comprar o lote completo, mas negocia adquirir apenas os 2 rótulos com histórico de leilão comprovado, por um valor bem menor, reduzindo a exposição a itens sem liquidez real.',
    cenarioGuiado: [
      {
        pergunta: 'Um vendedor oferece um relógio de luxo como "investimento garantido", citando a valorização de outros modelos da mesma marca nos últimos anos.',
        opcoes: [
          { texto: 'Compro, já que a marca tem histórico recente de valorização forte', resultado: 'Valorização passada de outros modelos não garante o comportamento futuro do modelo específico oferecido — é essencial verificar o histórico de revenda daquele modelo exato, não apenas da marca de forma genérica.' },
          { texto: 'Pesquiso o histórico de revenda específico daquele modelo antes de decidir', resultado: 'Abordagem mais criteriosa: modelos diferentes da mesma marca podem ter comportamentos de mercado muito distintos, e a pesquisa específica evita comprar baseado numa generalização enganosa.' }
        ]
      },
      {
        pergunta: 'Você está considerando comprar uma área de terra rural como investimento, oferecida por um preço abaixo do mercado da região.',
        opcoes: [
          { texto: 'Fecho negócio rápido, o preço está muito bom para perder', resultado: 'Preço abaixo do mercado em terras rurais frequentemente está associado a problemas de documentação, disputas de propriedade ou passivos ambientais — decidir sem due diligence completa é um risco significativo, mesmo com preço atrativo.' },
          { texto: 'Faço due diligence documental completa (matrícula, georreferenciamento, disputas judiciais) antes de decidir', resultado: 'Postura correta diante de qualquer compra de terra: a verificação documental completa é essencial para evitar problemas legais que podem inviabilizar ou desvalorizar o ativo no futuro.' }
        ]
      },
      {
        pergunta: 'Você já tem 25% do seu patrimônio total em diferentes ativos alternativos ilíquidos (arte, vinhos, terras) e está avaliando aumentar essa exposição.',
        opcoes: [
          { texto: 'Aumento a exposição, gosto desses ativos e confio no potencial deles', resultado: 'Uma exposição de 25% já está acima da faixa recomendada por consultores mais conservadores (10% a 15%) — aumentar ainda mais reduz sua flexibilidade financeira, dado o baixo grau de liquidez conjunto dessa categoria.' },
          { texto: 'Mantenho a exposição atual e direciono novos aportes para ativos mais líquidos', resultado: 'Decisão alinhada a uma gestão de risco mais equilibrada, evitando concentração excessiva numa categoria de baixa liquidez que já ultrapassa a faixa recomendada.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'ia-01', frente: 'O que caracteriza um investimento alternativo?', verso: 'Qualquer classe de ativo fora das categorias tradicionais (ações, renda fixa, imóveis convencionais), como arte, vinhos, relógios de luxo e terras rurais.' },
    { id: 'ia-02', frente: 'Qual é o principal risco estrutural de investimentos alternativos como categoria?', verso: 'Baixa liquidez — a dificuldade real de encontrar comprador pelo preço esperado quando for necessário vender.' },
    { id: 'ia-03', frente: 'O que verificar antes de comprar qualquer ativo alternativo como investimento?', verso: 'Se existe mercado secundário documentado, com histórico real de vendas (não apenas avaliações), além dos custos recorrentes de manutenção.' },
    { id: 'ia-04', frente: 'Qual é a faixa recomendada por consultores conservadores para exposição total a alternativos ilíquidos numa carteira?', verso: 'Entre 10% e 15% no máximo do patrimônio total.' },
    { id: 'ia-05', frente: 'Por que due diligence documental é especialmente crítica na compra de terras rurais?', verso: 'Porque problemas de matrícula, georreferenciamento ou disputas judiciais podem inviabilizar ou desvalorizar significativamente o ativo, mesmo que o preço de compra pareça atrativo.' },
    { id: 'ia-06', frente: 'Por que a maioria dos vinhos vendidos como "investimento" no varejo não tem demanda genuína de colecionador?', verso: 'Porque o mercado secundário real está concentrado em rótulos específicos com histórico comprovado de leilão, e a maioria das garrafas vendidas no varejo não pertence a essa categoria.' },
    { id: 'ia-07', frente: 'Qual erro comum mistura desejo pessoal com decisão de investimento?', verso: 'Comprar um ativo colecionável baseado em status ou gosto pessoal, mas tratando a compra como se fosse uma decisão financeira racional com expectativa de retorno garantido.' },
    { id: 'ia-08', frente: 'Qual categoria de investimento alternativo tem o mercado mais maduro e documentado, segundo o módulo?', verso: 'Arte de artistas consagrados, com histórico de leilão em casas reconhecidas como Christie\'s e Sotheby\'s.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o principal risco estrutural comum a praticamente todas as categorias de investimentos alternativos?',
      alternativas: [
        'Alta tributação obrigatória',
        'Baixa liquidez — dificuldade de vender pelo preço esperado quando necessário',
        'Proibição legal de revenda',
        'Ausência total de valorização histórica'
      ],
      correta: 1,
      explicacao: 'Diferente de ativos financeiros tradicionais, investimentos alternativos costumam ter mercado secundário restrito e concentrado, tornando a venda mais demorada e incerta em termos de preço final obtido.'
    },
    {
      pergunta: 'Por que comprar ativos colecionáveis baseado apenas na narrativa do vendedor é considerado o erro mais caro do tema?',
      alternativas: [
        'Porque colecionáveis são sempre ilegais de comprar',
        'Porque ignora liquidez, custos de manutenção e a dificuldade real de encontrar comprador no futuro pelo preço esperado',
        'Porque colecionáveis nunca valorizam de fato',
        'Porque é obrigatório ter um corretor credenciado para esse tipo de compra'
      ],
      correta: 1,
      explicacao: 'A narrativa de venda frequentemente omite fatores essenciais como liquidez real, custos recorrentes e existência (ou ausência) de mercado secundário documentado, levando a decisões de compra mal fundamentadas.'
    },
    {
      pergunta: 'Qual é a faixa de exposição total a investimentos alternativos ilíquidos recomendada por consultores patrimoniais mais conservadores?',
      alternativas: ['Entre 40% e 50%', 'Entre 25% e 35%', 'Entre 10% e 15%', 'Não existe limite recomendado'],
      correta: 2,
      explicacao: 'Consultores mais conservadores recomendam limitar a exposição total a essa categoria de baixa liquidez a uma faixa entre 10% e 15% do patrimônio, preservando flexibilidade financeira geral.'
    },
    {
      pergunta: 'O que é essencial verificar antes de comprar terras rurais como investimento?',
      alternativas: [
        'Apenas o preço por hectare em comparação com a região',
        'Documentação completa: matrícula, georreferenciamento e ausência de disputas judiciais',
        'Somente a opinião do vendedor sobre o potencial da área',
        'Nenhuma verificação adicional é necessária se o preço for justo'
      ],
      correta: 1,
      explicacao: 'Terras rurais exigem due diligence documental rigorosa, já que problemas de propriedade ou passivos podem inviabilizar ou desvalorizar significativamente o ativo, independente do preço de compra.'
    },
    {
      pergunta: 'Por que a maioria dos vinhos vendidos no varejo como "investimento" não é considerada um investimento alternativo real, segundo o módulo?',
      alternativas: [
        'Porque vinho não pode ser revendido legalmente no Brasil',
        'Porque falta mercado secundário documentado de colecionador para a maioria dos rótulos vendidos dessa forma',
        'Porque vinho sempre perde valor com o tempo',
        'Porque não existe forma de armazenar vinho corretamente'
      ],
      correta: 1,
      explicacao: 'O mercado secundário real de vinhos como investimento está concentrado em rótulos específicos com histórico de leilão comprovado — a maior parte das garrafas vendidas no varejo como "investimento" não tem essa demanda genuína.'
    },
    {
      pergunta: 'Qual categoria de investimento alternativo é descrita no módulo como tendo o mercado mais maduro e documentado?',
      alternativas: ['Relógios de luxo', 'Vinhos de coleção', 'Arte de artistas consagrados', 'Terras rurais'],
      correta: 2,
      explicacao: 'Arte de artistas consagrados, com histórico de leilão em casas reconhecidas internacionalmente, é apresentada como a categoria mais próxima de um mercado financeiro estruturado dentro dos alternativos.'
    }
  ],

  faq: [
    { pergunta: 'Investimentos alternativos rendem mais que investimentos tradicionais?', resposta: 'Alguns podem ter valorização expressiva em determinados períodos, mas isso não é garantido nem consistente — além disso, o retorno líquido precisa descontar custos de manutenção, seguro e a dificuldade de vender pelo preço esperado, o que muitas vezes reduz significativamente o ganho real.' },
    { pergunta: 'Como sei se um ativo colecionável tem mercado secundário real?', resposta: 'Pesquise histórico de vendas efetivas (não apenas avaliações ou estimativas) em leilões reconhecidos, plataformas especializadas ou registros de negociação — a ausência desse histórico documentado é um sinal de alerta importante.' },
    { pergunta: 'Vale a pena comprar arte pensando em investimento se eu não entendo do assunto?', resposta: 'O mercado de arte como investimento exige conhecimento especializado ou assessoria de curadores e consultores experientes — comprar sem esse conhecimento, baseado apenas em gosto pessoal ou tendência, aproxima a decisão mais de consumo do que de investimento propriamente dito.' },
    { pergunta: 'Terras rurais são um bom investimento no Brasil?', resposta: 'Regiões de agricultura produtiva têm histórico de valorização consistente, mas o investimento exige due diligence documental rigorosa, gestão (própria ou terceirizada) e custos recorrentes como ITR — não é um ativo passivo como um título de renda fixa.' },
    { pergunta: 'Quanto do meu patrimônio deveria estar em investimentos alternativos?', resposta: 'Consultores mais conservadores recomendam limitar essa exposição a uma faixa entre 10% e 15% do patrimônio total, justamente pela baixa liquidez estrutural dessa categoria como um todo.' },
    { pergunta: 'É possível perder dinheiro com investimentos alternativos mesmo comprando itens genuínos e de qualidade?', resposta: 'Sim. Mesmo itens genuínos podem não encontrar comprador pelo preço esperado, sofrer deságio significativo na revenda, ou ter seus custos de manutenção ao longo dos anos superarem a valorização obtida.' }
  ]
}
