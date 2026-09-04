// m04-equity.ts
import type { Modulo } from '@/types'

export const equity: Modulo = {
  id: 'equity',
  trilhaId: 'alternativos-derivativos',
  numero: 4,
  titulo: 'Equity',
  subtitulo: 'Participação acionária além da bolsa: private equity, venture capital e equity de startup',
  iconName: 'Building2',
  duracaoMin: 12,

  nivel: 'avancado',
  preRequisitos: ['alocacao-ativos', 'estrategias-grandes-gestores'],
  objetivoAprendizagem: 'Você vai sair sabendo o que significa ter equity numa empresa fora da bolsa, quais os riscos reais desse tipo de investimento e como isso se diferencia de comprar ações listadas na B3.',
  erroFatal: 'Aceitar equity de startup (opções de ações ou participação direta) como parte relevante da remuneração sem entender vesting, diluição e liquidez — muita gente descobre anos depois que aquele "equity valioso" perdeu quase todo o valor numa rodada de investimento subsequente, ou nunca teve como ser vendido.',
  numeroChave: { valor: '90%', legenda: 'proporção aproximada de startups que fecham ou fracassam antes de gerar qualquer retorno líquido para investidores de equity, segundo estudos recorrentes sobre o setor' },
  glossarioDoModulo: ['Equity', 'Private equity', 'Venture capital', 'Vesting', 'Diluição', 'Cap table', 'Liquidez', 'Rodada de investimento (Series A, B, C)'],
  proximoPasso: { moduloId: 'opcoes', motivo: 'Depois de entender equity direto em empresas, o próximo passo é estudar opções — um tipo de derivativo que, entre outras aplicações, também está presente em planos de remuneração via ações.' },

  aprender: {
    oQueE: 'Equity é a participação no capital social de uma empresa — ser dono de uma fração dela. Quando você compra uma ação na B3, está comprando equity de uma empresa listada, com liquidez diária e preço público. Mas equity também existe fora da bolsa: private equity (fundos que compram participação em empresas maduras, não listadas, buscando reestruturá-las e vendê-las com lucro) e venture capital (fundos que investem em startups em estágio inicial, apostando em crescimento acelerado). Equity de startup, oferecido como parte de remuneração a funcionários, é outra forma comum desse conceito no Brasil, especialmente em empresas de tecnologia.',
    porQueImporta: 'Equity fora da bolsa não tem o mesmo tipo de proteção, transparência e liquidez que uma ação listada. Quem recebe ou compra esse tipo de participação sem entender conceitos como vesting (tempo necessário para ter direito pleno às ações), diluição (redução do seu percentual quando a empresa capta mais investimento) e ausência de mercado líquido para vender, pode ter uma péssima surpresa: um "equity" que parece valioso no papel, mas que na prática nunca vira dinheiro, ou vale muito menos do que parecia inicialmente.',
    naPratica: 'No Brasil, equity de startup geralmente é oferecido via planos de stock options (opção de compra de ações a um preço fixo no futuro) ou phantom shares (direito a um valor equivalente à valorização das ações, sem ser sócio de fato, mais simples do ponto de vista jurídico e tributário para a empresa). O vesting típico segue um cliff de 1 ano (você só começa a ter direito a qualquer parte depois de completar 12 meses na empresa) seguido de vesting mensal ou trimestral ao longo de mais 3 a 4 anos. Cada nova rodada de investimento (Series A, B, C) costuma diluir o percentual de quem já tinha equity, a menos que existam cláusulas específicas de proteção anti-diluição, raras para funcionários. A liquidez normalmente só aparece em eventos específicos: a empresa ser vendida (M&A), abrir capital na bolsa (IPO) ou, em casos mais raros, programas de recompra (tender offer) organizados pela própria empresa.',
    passoAPasso: [
      'Ao receber uma oferta de equity como parte da remuneração, pergunte explicitamente sobre o cronograma de vesting e a existência de cliff.',
      'Pergunte sobre o cap table (quadro de participação societária) para entender seu percentual real e o histórico de diluição da empresa.',
      'Entenda se você está recebendo ações de fato, opções de compra (stock options) ou phantom shares, já que cada formato tem implicações jurídicas e tributárias diferentes.',
      'Avalie o estágio da empresa: quanto mais early-stage, maior o risco de diluição futura e de a empresa nunca gerar liquidez.',
      'Se for investidor (não funcionário) considerando aportar em private equity ou venture capital via fundos, verifique o histórico do gestor e o horizonte de tempo esperado até a liquidez (geralmente 5 a 10 anos).',
      'Nunca trate equity ilíquido como parte líquida do seu patrimônio ao planejar gastos ou metas de curto prazo.'
    ],
    errosComuns: [
      'Tratar o valor "de mercado" de equity de startup não listada como dinheiro garantido, ignorando que ele só se realiza em um evento de liquidez.',
      'Não perguntar sobre cliff e vesting antes de aceitar uma oferta com equity relevante, descobrindo tarde demais as condições reais.',
      'Ignorar o efeito cumulativo da diluição ao longo de múltiplas rodadas de investimento, que pode reduzir o percentual original a uma fração pequena.',
      'Confundir opções de compra (stock options) com ações já efetivamente possuídas — opções exigem exercício, muitas vezes com custo tributário na hora de exercer.',
      'Investir em fundos de private equity ou venture capital sem considerar o horizonte de iliquidez de vários anos até haver qualquer retorno.',
      'Concentrar patrimônio pessoal relevante em equity de uma única empresa não listada, sem diversificação, apostando tudo no sucesso de um único negócio.'
    ],
    comparativo: {
      titulo: 'Ação listada na bolsa vs. equity de empresa não listada',
      linhas: [
        { label: 'Liquidez', valor: 'Bolsa: diária, a qualquer momento | Não listada: apenas em eventos específicos (M&A, IPO, tender offer)' },
        { label: 'Preço', valor: 'Bolsa: público e atualizado a cada negociação | Não listada: definido em rodadas de investimento, sem cotação diária' },
        { label: 'Transparência', valor: 'Bolsa: obrigações regulatórias de divulgação (CVM) | Não listada: informação limitada, geralmente restrita a investidores da rodada' },
        { label: 'Risco de diluição', valor: 'Bolsa: existe, mas mais previsível e público | Não listada: pode ser significativo e menos previsível para minoritários' },
        { label: 'Horizonte típico até retorno', valor: 'Bolsa: pode ser vendida a qualquer momento | Não listada: geralmente 5 a 10 anos, ou nunca' }
      ]
    },
    checklist: [
      'Se você recebe equity como parte de remuneração, peça por escrito o cronograma completo de vesting e cliff.',
      'Pergunte sobre o cap table e seu percentual real de participação, não apenas o número de ações ou opções.',
      'Entenda se está recebendo ações, opções de compra ou phantom shares, e as implicações de cada formato.',
      'Nunca conte equity ilíquido como parte do seu planejamento financeiro de curto ou médio prazo.',
      'Se for investir em fundos de private equity ou venture capital, confirme o horizonte de iliquidez esperado antes de aportar.',
      'Diversifique — evite que uma única empresa não listada represente parcela desproporcional do seu patrimônio total.'
    ],
    livroRelacionado: {
      livroId: 'liberdade-financeira-sabatier',
      textoConexao: 'Sabatier discute como negociar e aproveitar remuneração além do salário (incluindo participação societária) como acelerador da independência financeira — o cuidado com vesting, cliff e diversificação deste módulo é a aplicação prática disso.',
    },
    naoConfundirCom: [
      { moduloId: 'opcoes', diferenca: 'Este módulo trata de equity direto (participação societária) em empresas não listadas; o módulo de Opções aborda o derivativo financeiro de opções, negociado em bolsa, que é um instrumento diferente mesmo quando usado também em planos de remuneração.' },
      { moduloId: 'investimentos-alternativos', diferenca: 'Equity de empresas (private equity, venture capital, startups) é uma categoria específica; o módulo de Investimentos Alternativos cobre outras categorias fora do tradicional, de forma mais ampla.' }
    ]
  },

  mapaMental: {
    label: 'Equity',
    subtitulo: 'Participação societária dentro e fora da bolsa',
    ramos: [
      {
        id: 'formas-de-equity',
        label: 'Formas de Equity',
        cor: '#3B82F6',
        resumo: 'Diferentes maneiras de ter participação numa empresa',
        filhos: [
          { label: 'Ações listadas', desc: 'Negociadas em bolsa, com liquidez diária e preço público' },
          { label: 'Private equity', desc: 'Fundos que compram participação em empresas maduras não listadas' },
          { label: 'Venture capital', desc: 'Fundos que investem em startups em estágio inicial' },
          { label: 'Equity de remuneração', desc: 'Ações, opções ou phantom shares oferecidas a funcionários' }
        ]
      },
      {
        id: 'mecanica-de-startup',
        label: 'Mecânica em Startups',
        cor: '#F59E0B',
        resumo: 'Como funciona equity oferecido como remuneração',
        filhos: [
          {
            label: 'Vesting',
            desc: 'Processo pelo qual você ganha direito às ações ao longo do tempo',
            netos: [
              { label: 'Cliff', desc: 'Período inicial (geralmente 1 ano) sem nenhum direito adquirido' },
              { label: 'Vesting gradual', desc: 'Após o cliff, direito adquirido mensal ou trimestralmente por mais 3-4 anos' }
            ]
          },
          { label: 'Stock options', desc: 'Direito de comprar ações a um preço fixo no futuro, exigindo exercício' },
          { label: 'Phantom shares', desc: 'Direito a valor equivalente à valorização, sem ser sócio de fato' }
        ]
      },
      {
        id: 'riscos',
        label: 'Riscos Específicos',
        cor: '#EF4444',
        resumo: 'O que torna equity fora da bolsa mais arriscado',
        filhos: [
          { label: 'Diluição', desc: 'Novas rodadas de investimento reduzem seu percentual de participação' },
          { label: 'Iliquidez', desc: 'Sem mercado para vender fora de eventos específicos' },
          { label: 'Alta taxa de fracasso', desc: 'A maioria das startups não gera retorno para quem tem equity' },
          { label: 'Falta de transparência', desc: 'Informação limitada em comparação com empresas listadas' }
        ]
      },
      {
        id: 'eventos-de-liquidez',
        label: 'Eventos de Liquidez',
        cor: '#22C55E',
        resumo: 'Quando equity ilíquido finalmente pode virar dinheiro',
        filhos: [
          { label: 'M&A (venda da empresa)', desc: 'Empresa é adquirida por outra, gerando pagamento aos acionistas' },
          { label: 'IPO', desc: 'Empresa abre capital e passa a ser negociada em bolsa' },
          { label: 'Tender offer', desc: 'Programa específico de recompra de ações organizado pela empresa' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões reais envolvendo equity de startup ou fundos de private equity/venture capital, e vê o resultado esperado de cada escolha.',
    passos: [
      'Leia a situação envolvendo uma decisão sobre equity.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando vesting, diluição e liquidez.'
    ],
    exemploGuiado: 'Uma pessoa recebe oferta de emprego numa startup com 0,5% de equity em stock options, cliff de 1 ano e vesting de 4 anos. Ela pergunta sobre o cap table e descobre que a empresa já captou duas rodadas de investimento e provavelmente captará mais duas antes de um evento de liquidez. Considerando uma diluição média de 15% a 20% por rodada futura, o percentual de 0,5% pode cair para algo entre 0,3% e 0,35% até um eventual IPO ou venda, anos depois. Além disso, ela descobre que precisará desembolsar recursos próprios para exercer as stock options quando sair da empresa (ou perderá o direito a elas), o que exige planejamento financeiro específico, não apenas contar com um valor "no papel" que nunca foi de fato dela até o exercício.',
    cenarioGuiado: [
      {
        pergunta: 'Você recebe uma proposta de emprego com salário mais baixo, compensado por "equity relevante" numa startup, sem detalhes claros sobre vesting.',
        opcoes: [
          { texto: 'Aceito, equity em startup costuma valer muito no futuro', resultado: 'Aceitar sem entender vesting, cliff e diluição é decidir no escuro — o "valor" do equity é apenas potencial, e cerca de 90% das startups não geram retorno líquido para quem tem participação.' },
          { texto: 'Peço detalhes específicos sobre vesting, cliff, cap table e histórico de diluição antes de decidir', resultado: 'Postura correta: essas informações são essenciais para avaliar se a compensação em equity de fato equilibra um salário menor, ou se o risco está sendo subestimado.' }
        ]
      },
      {
        pergunta: 'Você já trabalha há 2 anos numa startup e tem equity em vesting, mas a empresa está prestes a fazer uma nova rodada de investimento.',
        opcoes: [
          { texto: 'Não me preocupo, meu número de ações não muda', resultado: 'O número de ações pode não mudar, mas o percentual de participação (e portanto o valor relativo) tende a diminuir com a diluição causada pela entrada de novos investidores na rodada.' },
          { texto: 'Pergunto à empresa como a nova rodada deve impactar meu percentual de participação', resultado: 'Atitude proativa correta — entender o efeito da diluição ajuda a ter uma expectativa realista do valor futuro do seu equity, em vez de presumir que ele se mantém intocado.' }
        ]
      },
      {
        pergunta: 'Um fundo de venture capital oferece a você, como investidor, participar de uma rodada com aporte mínimo de R$ 50.000, prometendo retorno "muito acima da bolsa" em 3 anos.',
        opcoes: [
          { texto: 'Invisto, o potencial de retorno parece alto demais para ignorar', resultado: 'Investimentos em venture capital tipicamente exigem horizonte de 5 a 10 anos até qualquer evento de liquidez — uma promessa de retorno "em 3 anos" contraria o padrão real do setor e deveria ser questionada com cautela redobrada.' },
          { texto: 'Pergunto sobre o horizonte real de liquidez esperado e o histórico do gestor antes de decidir', resultado: 'Abordagem correta: verificar se o horizonte de tempo prometido é realista para o tipo de ativo, e avaliar o histórico do gestor do fundo antes de comprometer capital de longo prazo.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'eq-01', frente: 'O que é equity?', verso: 'Participação no capital social de uma empresa — ser dono de uma fração dela, seja via ações listadas em bolsa ou participação em empresa não listada.' },
    { id: 'eq-02', frente: 'O que é vesting?', verso: 'O processo pelo qual uma pessoa ganha direito pleno a ações ou opções ao longo do tempo, geralmente ao longo de vários anos de permanência na empresa.' },
    { id: 'eq-03', frente: 'O que é cliff no contexto de vesting?', verso: 'Um período inicial, geralmente de 1 ano, em que a pessoa não tem nenhum direito adquirido às ações — se sair antes do cliff, perde tudo.' },
    { id: 'eq-04', frente: 'O que é diluição?', verso: 'A redução do percentual de participação de um acionista quando a empresa emite novas ações, geralmente em novas rodadas de investimento.' },
    { id: 'eq-05', frente: 'Qual a diferença entre stock options e ações diretas?', verso: 'Stock options dão o direito de comprar ações a um preço fixo no futuro, exigindo exercício (e muitas vezes desembolso e implicação tributária); ações diretas já são propriedade efetiva.' },
    { id: 'eq-06', frente: 'O que são phantom shares?', verso: 'Um direito contratual a receber valor equivalente à valorização das ações da empresa, sem tornar a pessoa sócia de fato — mais simples juridicamente para a empresa oferecer.' },
    { id: 'eq-07', frente: 'Quais são os principais eventos que geram liquidez para equity de empresa não listada?', verso: 'Venda da empresa (M&A), abertura de capital (IPO) ou, mais raramente, programas de recompra organizados pela própria empresa (tender offer).' },
    { id: 'eq-08', frente: 'Qual a diferença entre private equity e venture capital?', verso: 'Private equity investe em empresas maduras não listadas, buscando reestruturá-las; venture capital investe em startups em estágio inicial, apostando em crescimento acelerado.' },
    { id: 'eq-09', frente: 'Qual é a taxa aproximada de fracasso de startups sem retorno para investidores de equity?', verso: 'Cerca de 90%, segundo estudos recorrentes sobre o setor de venture capital.' },
    { id: 'eq-10', frente: 'Por que equity ilíquido não deve ser contado no planejamento financeiro de curto prazo?', verso: 'Porque ele só se converte em dinheiro real em eventos específicos de liquidez, que podem levar anos para acontecer ou nunca ocorrer.' }
  ],

  quiz: [
    {
      pergunta: 'O que é vesting no contexto de equity de startup?',
      alternativas: [
        'O valor de mercado das ações da empresa',
        'O processo pelo qual a pessoa ganha direito pleno às ações ou opções ao longo do tempo',
        'Um tipo de imposto cobrado sobre equity',
        'O nome do documento que registra o cap table'
      ],
      correta: 1,
      explicacao: 'Vesting é o cronograma segundo o qual o funcionário adquire progressivamente o direito às ações ou opções oferecidas, geralmente ao longo de vários anos, condicionado à permanência na empresa.'
    },
    {
      pergunta: 'O que acontece se um funcionário sai da empresa antes de completar o cliff?',
      alternativas: [
        'Ele recebe todas as ações prometidas de qualquer forma',
        'Ele geralmente perde o direito a qualquer parte do equity prometido',
        'A empresa é obrigada a pagar em dinheiro o valor equivalente',
        'O cliff não afeta a situação de saída antecipada'
      ],
      correta: 1,
      explicacao: 'O cliff é justamente o período inicial (tipicamente 1 ano) em que nenhum direito foi adquirido ainda — sair antes disso normalmente significa perder todo o equity prometido.'
    },
    {
      pergunta: 'O que é diluição, no contexto de equity?',
      alternativas: [
        'Uma taxa cobrada pela CVM sobre equity de startups',
        'A redução do percentual de participação de um acionista quando a empresa emite novas ações',
        'O processo de vender ações na bolsa',
        'Um tipo de imposto sobre ganho de capital'
      ],
      correta: 1,
      explicacao: 'Quando uma empresa capta uma nova rodada de investimento e emite novas ações para os novos investidores, o percentual de participação de quem já tinha equity diminui, mesmo que o número de ações permaneça o mesmo — isso é diluição.'
    },
    {
      pergunta: 'Qual é a principal diferença entre stock options e ações diretas recebidas como remuneração?',
      alternativas: [
        'Não há diferença prática entre os dois formatos',
        'Stock options exigem exercício (e possível desembolso) para se tornarem ações de fato; ações diretas já são propriedade efetiva',
        'Stock options são sempre mais valiosas que ações diretas',
        'Ações diretas não podem ser oferecidas a funcionários no Brasil'
      ],
      correta: 1,
      explicacao: 'Stock options dão apenas o direito de comprar ações a um preço fixo no futuro — é preciso exercer essa opção, muitas vezes desembolsando recursos e gerando implicação tributária, diferente de já possuir as ações diretamente.'
    },
    {
      pergunta: 'Por que equity de empresa não listada é considerado significativamente menos líquido que ações na bolsa?',
      alternativas: [
        'Porque é proibido vender equity de empresas não listadas',
        'Porque só existe liquidez em eventos específicos como M&A, IPO ou tender offer, que podem nunca ocorrer',
        'Porque o governo bloqueia a venda até a empresa completar 10 anos',
        'Porque equity de empresa não listada não tem valor nenhum'
      ],
      correta: 1,
      explicacao: 'Diferente de ações na bolsa, que podem ser vendidas a qualquer momento no mercado, equity de empresas não listadas só se converte em dinheiro em eventos específicos e pouco previsíveis, que podem demorar anos ou nunca acontecer.'
    },
    {
      pergunta: 'Qual é aproximadamente a taxa de startups que fracassam sem gerar retorno líquido para investidores de equity?',
      alternativas: ['Cerca de 10%', 'Cerca de 50%', 'Cerca de 90%', 'Cerca de 99,9%'],
      correta: 2,
      explicacao: 'Estudos recorrentes sobre o setor de venture capital apontam que cerca de 90% das startups fecham ou fracassam antes de gerar qualquer retorno líquido para quem detém equity nelas.'
    },
    {
      pergunta: 'Qual é o horizonte típico de tempo até um evento de liquidez em investimentos de venture capital?',
      alternativas: ['Menos de 1 ano', 'Entre 5 e 10 anos', 'Exatamente 2 anos', 'Não existe prazo típico, é sempre imediato'],
      correta: 1,
      explicacao: 'Investimentos em venture capital costumam ter um horizonte de iliquidez longo, geralmente entre 5 e 10 anos, até que ocorra um evento como venda da empresa ou abertura de capital.'
    }
  ],

  faq: [
    { pergunta: 'Vale a pena aceitar um salário mais baixo em troca de equity numa startup?', resposta: 'Depende do estágio da empresa, do percentual real de participação (considerando diluição futura esperada) e da sua tolerância a risco. É essencial entender vesting, cliff e cap table antes de tratar o equity como parte confiável da remuneração.' },
    { pergunta: 'Preciso pagar imposto ao exercer stock options?', resposta: 'Sim, geralmente há implicação tributária no momento do exercício e/ou na venda posterior das ações, dependendo da estrutura do plano — vale consultar um contador especializado em equity de startups antes de exercer, para entender o momento e o valor devido.' },
    { pergunta: 'Como sei quanto vale o meu equity de startup?', resposta: 'O valor só se realiza de fato em um evento de liquidez (venda da empresa, IPO, etc.). Antes disso, qualquer valor é apenas uma estimativa baseada na última rodada de investimento, que pode mudar significativamente com diluição e variações de mercado.' },
    { pergunta: 'Private equity e venture capital são acessíveis para qualquer investidor pessoa física?', resposta: 'Geralmente não diretamente — a maioria dos fundos desse tipo exige aporte mínimo alto e classifica o investidor como qualificado ou profissional, conforme regras da CVM, o que limita o acesso a investidores com maior patrimônio ou renda comprovada.' },
    { pergunta: 'O que é cap table e por que ele importa?', resposta: 'Cap table é o quadro que mostra todos os sócios e detentores de equity de uma empresa, incluindo seus percentuais. Entender o cap table ajuda a avaliar seu percentual real de participação e o histórico de diluição da empresa ao longo das rodadas.' },
    { pergunta: 'É possível vender equity de startup antes de um evento de liquidez oficial?', resposta: 'Em alguns casos específicos, sim, por meio de mercados secundários ou negociações diretas com outros investidores, mas isso costuma ser raro, burocrático e sujeito a aprovação da própria empresa — não é a regra geral.' }
  ]
}
