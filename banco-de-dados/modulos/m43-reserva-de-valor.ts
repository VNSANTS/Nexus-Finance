// m02-reserva-de-valor.ts
import type { Modulo } from '@/types'

export const reservaDeValor: Modulo = {
  id: 'reserva-de-valor',
  trilhaId: 'alternativos-derivativos',
  numero: 2,
  titulo: 'Reserva de Valor',
  subtitulo: 'Por que nem todo ativo que sobe de preço protege seu dinheiro da inflação',
  iconName: 'ShieldCheck',
  duracaoMin: 10,

  nivel: 'intermediario',
  preRequisitos: ['macro-aplicada-carteira'],
  objetivoAprendizagem: 'Você vai sair sabendo diferenciar um ativo que realmente preserva poder de compra no longo prazo de um ativo que só parece proteger, mas historicamente não protege.',
  erroFatal: 'Tratar qualquer ativo que "sobe mais que a poupança" como reserva de valor, sem checar o histórico de correlação com a inflação em ciclos longos — muita gente descobre na prática, durante uma crise, que o ativo escolhido cai junto com tudo o mais exatamente quando mais precisava de proteção.',
  numeroChave: { valor: '5.000 anos', legenda: 'tempo aproximado em que o ouro é usado pela humanidade como reserva de valor, o histórico mais longo entre todos os ativos considerados hoje para esse papel' },
  glossarioDoModulo: ['Reserva de valor', 'Poder de compra', 'Correlação com inflação', 'Ativo de risco', 'Ativo real', 'Debasement (desvalorização monetária)'],
  proximoPasso: { moduloId: 'ouro', motivo: 'Depois de entender o conceito de reserva de valor, o próximo passo é estudar em profundidade o ativo com o histórico mais longo nesse papel: o ouro.' },

  aprender: {
    oQueE: 'Reserva de valor é a capacidade de um ativo manter (ou aumentar) seu poder de compra ao longo de décadas, mesmo diante de inflação, crises e mudanças de governo. Diferente de um investimento comum, que busca retorno absoluto, um ativo de reserva de valor é escolhido primeiro pela previsibilidade de preservar patrimônio no muito longo prazo, e só depois pelo potencial de valorização. Ouro, algumas moedas fortes, imóveis bem localizados e, mais recentemente, o Bitcoin, disputam esse papel — cada um com um histórico e um grau de confiabilidade diferente.',
    porQueImporta: 'Quem confunde "ativo que sobe" com "reserva de valor" corre o risco de concentrar parte relevante do patrimônio em algo que, historicamente, despenca justamente nos momentos de crise — que é exatamente quando mais se precisa de proteção. Entender a diferença evita decisões como trocar reserva de emergência por ativos voláteis "porque estão subindo", ou ignorar completamente a inflação ao planejar o longo prazo, corroendo poder de compra sem perceber.',
    naPratica: 'No Brasil, o debate sobre reserva de valor ganhou força em períodos de inflação alta e desvalorização do real frente ao dólar. Historicamente, o Tesouro IPCA+ (títulos públicos indexados à inflação) é a forma mais direta e garantida pelo governo federal de proteger poder de compra no longo prazo, com risco de crédito mínimo. Já ouro físico ou via ETFs (como o GOLD11 na B3) funciona como proteção adicional, menos correlacionada com a economia brasileira especificamente. Dólar e ativos dolarizados protegem contra desvalorização cambial do real, mas não necessariamente contra a inflação americana. Bitcoin é defendido por parte do mercado como "ouro digital", mas seu histórico de apenas pouco mais de uma década, com quedas superiores a 70% em mais de uma ocasião, ainda gera divergência real entre analistas sobre se ele já provou, de fato, ser reserva de valor confiável.',
    passoAPasso: [
      'Defina qual risco específico você quer se proteger: inflação doméstica, desvalorização cambial, ou instabilidade institucional.',
      'Para proteção direta contra inflação no Brasil, considere Tesouro IPCA+ como base — é garantido pelo governo federal e paga a inflação mais uma taxa real.',
      'Para diversificação de moeda, avalie exposição em dólar ou ativos dolarizados, sem exagerar a concentração.',
      'Se optar por ouro, decida entre ouro físico (custo de armazenagem e seguro) ou ETFs de ouro negociados na B3, mais líquidos e práticos.',
      'Trate ativos com histórico curto (como Bitcoin) como parte especulativa e limitada da estratégia, não como substituto total de reservas mais testadas.',
      'Revise a alocação periodicamente, sem trocar reserva de valor por ativos de risco só porque estão em alta no momento.'
    ],
    errosComuns: [
      'Confundir ativos que sobem em ciclos de euforia com reserva de valor comprovada — alta recente não é histórico de longo prazo.',
      'Concentrar toda proteção contra inflação em um único ativo, quando diversificar entre Tesouro IPCA+, ouro e dólar reduz risco específico de cada um.',
      'Ignorar o custo de oportunidade de manter reserva de valor em excesso, quando parte desse dinheiro poderia estar em ativos de maior crescimento no longo prazo.',
      'Tratar Bitcoin como reserva de valor testada da mesma forma que o ouro, ignorando a diferença de histórico entre 5.000 anos e pouco mais de uma década.',
      'Comprar ouro físico sem considerar custos de armazenagem e seguro, que corroem parte do retorno real ao longo dos anos.',
      'Esperar que reserva de valor gere retornos altos no curto prazo — o papel dela é preservar poder de compra, não maximizar ganho.'
    ],
    comparativo: {
      titulo: 'Candidatos a reserva de valor: histórico e características',
      linhas: [
        { label: 'Tesouro IPCA+', valor: 'Histórico: desde 2005 no Brasil | Risco: mínimo (garantia do governo federal) | Protege contra: inflação doméstica' },
        { label: 'Ouro', valor: 'Histórico: milhares de anos globalmente | Risco: baixo, mas com volatilidade de preço em reais | Protege contra: inflação global e crises sistêmicas' },
        { label: 'Dólar / ativos dolarizados', valor: 'Histórico: décadas como moeda de reserva global | Risco: baixo, mas exposto à política americana | Protege contra: desvalorização cambial do real' },
        { label: 'Bitcoin', valor: 'Histórico: pouco mais de uma década | Risco: alta volatilidade, sem consenso de mercado | Protege contra: tese ainda em teste, defendida por parte dos analistas' }
      ]
    },
    checklist: [
      'Identifique qual risco específico (inflação, câmbio, instabilidade) você mais quer mitigar.',
      'Verifique se sua reserva de emergência está pelo menos parcialmente protegida da inflação, e não só em ativos de liquidez diária sem correção.',
      'Avalie se há concentração excessiva em um único candidato a reserva de valor.',
      'Compare o custo de manter ouro físico com o custo de um ETF de ouro antes de decidir onde alocar.',
      'Revise anualmente se a proporção de reserva de valor na carteira ainda faz sentido para seus objetivos.'
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'A ideia de margem de segurança de Graham se estende naturalmente à proteção patrimonial: reservar parte da carteira em ativos resistentes à inflação é uma forma de margem de segurança contra a erosão do poder de compra ao longo do tempo.',
    },
    naoConfundirCom: [
      { moduloId: 'ouro', diferenca: 'Este módulo trata do conceito amplo de reserva de valor e compara diferentes candidatos; o módulo de Ouro aprofunda especificamente as formas de investir nesse ativo no Brasil.' },
      { moduloId: 'criptomoedas', diferenca: 'Este módulo discute se Bitcoin cumpre ou não o papel de reserva de valor; o módulo de Criptomoedas foca no funcionamento prático, custódia e tributação desses ativos.' }
    ]
  },

  mapaMental: {
    label: 'Reserva de Valor',
    subtitulo: 'O que protege poder de compra no longo prazo',
    ramos: [
      {
        id: 'conceito',
        label: 'O Conceito',
        cor: '#3B82F6',
        resumo: 'O que diferencia reserva de valor de investimento comum',
        filhos: [
          { label: 'Poder de compra', desc: 'Capacidade do ativo de manter o que ele compra hoje ao longo do tempo' },
          { label: 'Longo prazo', desc: 'Avaliado em décadas, não em meses ou poucos anos' },
          { label: 'Previsibilidade acima de retorno', desc: 'Prioriza estabilidade de proteção, não maximização de ganho' }
        ]
      },
      {
        id: 'candidatos-tradicionais',
        label: 'Candidatos Tradicionais',
        cor: '#FFC93C',
        resumo: 'Ativos com histórico longo e testado',
        filhos: [
          { label: 'Ouro', desc: 'Histórico de milhares de anos, aceito globalmente' },
          { label: 'Tesouro IPCA+', desc: 'Garantido pelo governo federal, indexado diretamente à inflação brasileira' },
          { label: 'Dólar e moedas fortes', desc: 'Proteção contra desvalorização cambial de moedas locais' }
        ]
      },
      {
        id: 'candidatos-emergentes',
        label: 'Candidatos Emergentes',
        cor: '#8B5CF6',
        resumo: 'Ativos mais novos, com tese ainda em teste',
        filhos: [
          { label: 'Bitcoin ("ouro digital")', desc: 'Defendido por parte do mercado, mas com histórico curto e alta volatilidade' },
          { label: 'Imóveis bem localizados', desc: 'Historicamente acompanham ou superam a inflação em regiões de demanda consistente' }
        ]
      },
      {
        id: 'riscos-especificos',
        label: 'Riscos que Cada Um Mitiga',
        cor: '#EF4444',
        resumo: 'Nenhum ativo protege contra tudo ao mesmo tempo',
        filhos: [
          { label: 'Inflação doméstica', desc: 'Melhor mitigada por Tesouro IPCA+' },
          { label: 'Desvalorização cambial', desc: 'Melhor mitigada por dólar e ativos dolarizados' },
          { label: 'Crise sistêmica global', desc: 'Historicamente, ouro tem sido o refúgio mais consistente' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões reais sobre como proteger patrimônio da inflação e vê o resultado esperado de cada escolha, com base no histórico de cada tipo de ativo.',
    passos: [
      'Leia a situação sobre uma decisão de proteção patrimonial.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado esperado, considerando o histórico de cada ativo envolvido.'
    ],
    exemploGuiado: 'Uma pessoa tem R$ 50.000 de reserva de emergência parados numa conta que rende próximo de zero. Ao entender o conceito de reserva de valor, ela decide manter R$ 30.000 em liquidez imediata (CDB com liquidez diária, protegido pelo FGC) para emergências reais, e realocar os R$ 20.000 restantes, que não usa há mais de um ano, para Tesouro IPCA+ com vencimento em 5 anos. Resultado: ela preserva acesso rápido à parte necessária para emergências e garante que os R$ 20.000 excedentes deixem de perder poder de compra para a inflação, passando a render a inflação mais uma taxa real prefixada no momento da compra.',
    cenarioGuiado: [
      {
        pergunta: 'Você tem R$ 20.000 parados numa poupança e quer proteger esse valor da inflação no longo prazo.',
        opcoes: [
          { texto: 'Deixo na poupança mesmo, é mais simples', resultado: 'A poupança historicamente rende abaixo da inflação em períodos de juros mais baixos, corroendo poder de compra ao longo dos anos sem que isso seja perceptível no curto prazo.' },
          { texto: 'Transfiro para Tesouro IPCA+, que paga inflação mais uma taxa real', resultado: 'Essa é a forma mais direta de garantir que o valor pelo menos acompanhe a inflação oficial, com risco mínimo por ser garantido pelo governo federal.' }
        ]
      },
      {
        pergunta: 'Um amigo sugere trocar toda a sua reserva de emergência por Bitcoin, "porque é o ouro digital e só sobe no longo prazo".',
        opcoes: [
          { texto: 'Faço a troca, o histórico recente parece convincente', resultado: 'Reserva de emergência precisa de estabilidade e liquidez imediata — trocá-la por um ativo com histórico de quedas superiores a 70% em ciclos anteriores expõe você a ficar sem acesso a dinheiro exatamente quando mais precisar dele, numa crise.' },
          { texto: 'Mantenho a reserva de emergência em ativos de baixa volatilidade e avalio Bitcoin separadamente, com uma parcela limitada do patrimônio', resultado: 'Separa corretamente o papel de cada tipo de ativo: reserva de emergência precisa de estabilidade, enquanto uma tese de longo prazo mais arriscada pode ter espaço limitado e isolado no restante da carteira.' }
        ]
      },
      {
        pergunta: 'Você quer se proteger especificamente contra uma possível desvalorização forte do real frente ao dólar.',
        opcoes: [
          { texto: 'Compro apenas Tesouro IPCA+, que já protege da inflação', resultado: 'Tesouro IPCA+ protege da inflação medida no Brasil, mas não necessariamente de uma desvalorização cambial — os dois riscos são diferentes e pedem instrumentos diferentes.' },
          { texto: 'Adiciono exposição em dólar ou ativos dolarizados à carteira', resultado: 'Essa é a proteção mais direta contra desvalorização cambial especificamente, complementando (não substituindo) a proteção contra inflação doméstica.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'rv-01', frente: 'O que define um ativo como "reserva de valor"?', verso: 'A capacidade de manter ou aumentar o poder de compra ao longo de décadas, mesmo diante de inflação e crises, priorizando previsibilidade sobre retorno máximo.' },
    { id: 'rv-02', frente: 'Qual é o ativo com o histórico mais longo como reserva de valor?', verso: 'O ouro, usado pela humanidade nesse papel há aproximadamente 5.000 anos.' },
    { id: 'rv-03', frente: 'Qual instrumento protege diretamente contra a inflação doméstica no Brasil, com risco mínimo?', verso: 'O Tesouro IPCA+, título público federal indexado à inflação oficial mais uma taxa real.' },
    { id: 'rv-04', frente: 'Por que o dólar é usado como reserva de valor?', verso: 'Porque protege contra a desvalorização cambial da moeda local, sendo historicamente uma moeda de reserva global — embora não proteja necessariamente contra a inflação americana.' },
    { id: 'rv-05', frente: 'Por que a tese de Bitcoin como reserva de valor ainda gera divergência entre analistas?', verso: 'Porque seu histórico é de pouco mais de uma década, com quedas superiores a 70% em mais de um ciclo — tempo curto demais para ser considerado comprovado da mesma forma que o ouro.' },
    { id: 'rv-06', frente: 'Qual é o erro mais comum ao escolher um ativo como reserva de valor?', verso: 'Confundir um ativo que está subindo de preço recentemente com um ativo de reserva de valor comprovada, sem checar o histórico de longo prazo.' },
    { id: 'rv-07', frente: 'Reserva de emergência deve ser alocada em ativos voláteis buscando maior retorno?', verso: 'Não — reserva de emergência exige estabilidade e liquidez imediata, funções diferentes das de uma reserva de valor de longo prazo mais arriscada.' },
    { id: 'rv-08', frente: 'Qual é o principal trade-off de manter ouro físico como reserva de valor?', verso: 'Custos de armazenagem e seguro, que corroem parte do retorno real ao longo do tempo, em comparação com alternativas como ETFs de ouro.' }
  ],

  quiz: [
    {
      pergunta: 'O que diferencia um ativo de "reserva de valor" de um investimento comum?',
      alternativas: [
        'Reserva de valor sempre rende mais no curto prazo',
        'Reserva de valor prioriza previsibilidade e preservação de poder de compra no longo prazo, acima de retorno máximo',
        'Reserva de valor é sempre isenta de Imposto de Renda',
        'Não existe diferença real entre os dois conceitos'
      ],
      correta: 1,
      explicacao: 'O papel de uma reserva de valor é preservar poder de compra de forma previsível ao longo de décadas, não maximizar retorno no curto prazo — essa é a diferença central em relação a um investimento comum de risco.'
    },
    {
      pergunta: 'Qual ativo tem o histórico mais longo como reserva de valor globalmente?',
      alternativas: ['Dólar americano', 'Bitcoin', 'Ouro', 'Tesouro Direto'],
      correta: 2,
      explicacao: 'O ouro é usado como reserva de valor há aproximadamente 5.000 anos, o histórico mais longo entre todos os candidatos considerados atualmente, incluindo moedas fiduciárias modernas e criptoativos.'
    },
    {
      pergunta: 'Qual instrumento oferece proteção direta contra a inflação doméstica brasileira, com risco mínimo de crédito?',
      alternativas: ['Ações de empresas exportadoras', 'Tesouro IPCA+', 'Fundos imobiliários', 'Bitcoin'],
      correta: 1,
      explicacao: 'O Tesouro IPCA+ é garantido pelo governo federal e indexado diretamente à inflação oficial (IPCA) mais uma taxa real, tornando-o a forma mais direta de proteção contra inflação doméstica com risco mínimo.'
    },
    {
      pergunta: 'Por que trocar reserva de emergência por um ativo de alta volatilidade é considerado um erro grave?',
      alternativas: [
        'Porque ativos voláteis são sempre proibidos para pessoa física',
        'Porque reserva de emergência precisa de estabilidade e liquidez imediata, exatamente o oposto de ativos que podem cair muito num momento de crise',
        'Porque isso gera cobrança automática de Imposto de Renda',
        'Porque bancos não aceitam esse tipo de troca'
      ],
      correta: 1,
      explicacao: 'Reserva de emergência existe para ser usada em momentos de necessidade, muitas vezes coincidindo com crises — exatamente quando ativos voláteis tendem a estar em queda, o que pode forçar a pessoa a vender no pior momento possível.'
    },
    {
      pergunta: 'O que ainda gera divergência entre analistas sobre o Bitcoin como reserva de valor?',
      alternativas: [
        'O fato de ele ser ilegal em alguns países',
        'Seu histórico curto (pouco mais de uma década) e quedas superiores a 70% em mais de um ciclo',
        'O fato de não existir nenhuma exchange regulamentada para comprá-lo',
        'A impossibilidade de guardar Bitcoin em carteira própria'
      ],
      correta: 1,
      explicacao: 'O histórico relativamente curto do Bitcoin, combinado com quedas históricas superiores a 70% em mais de uma ocasião, ainda não é suficiente, na visão de parte do mercado, para considerá-lo uma reserva de valor comprovada da mesma forma que o ouro.'
    },
    {
      pergunta: 'Qual risco especificamente o dólar (ou ativos dolarizados) ajuda a mitigar?',
      alternativas: [
        'Risco de crédito de empresas brasileiras',
        'Desvalorização cambial do real',
        'Volatilidade de ações da bolsa brasileira',
        'Risco de liquidez em fundos imobiliários'
      ],
      correta: 1,
      explicacao: 'O dólar protege especificamente contra a desvalorização cambial da moeda local, um risco diferente da inflação doméstica — por isso os dois riscos costumam pedir instrumentos de proteção diferentes e complementares.'
    },
    {
      pergunta: 'Qual é o principal trade-off de manter ouro físico em vez de um ETF de ouro negociado na bolsa?',
      alternativas: [
        'Ouro físico paga mais Imposto de Renda',
        'Ouro físico envolve custos de armazenagem e seguro que corroem parte do retorno real',
        'ETFs de ouro não existem no Brasil',
        'Ouro físico não pode ser vendido em nenhuma hipótese'
      ],
      correta: 1,
      explicacao: 'Guardar ouro físico implica custos recorrentes de armazenagem e seguro, que reduzem o retorno real ao longo do tempo — um ETF de ouro listado na B3 costuma ser mais prático e líquido para a maioria dos investidores.'
    }
  ],

  faq: [
    { pergunta: 'Reserva de valor e reserva de emergência são a mesma coisa?', resposta: 'Não. Reserva de emergência precisa de liquidez imediata e estabilidade para cobrir imprevistos de curto prazo. Reserva de valor é uma estratégia de longo prazo para preservar poder de compra, podendo incluir ativos com menos liquidez imediata, desde que estáveis no histórico.' },
    { pergunta: 'Vale a pena colocar toda a reserva de valor só em ouro?', resposta: 'Concentrar tudo em um único ativo, mesmo que historicamente sólido como o ouro, expõe você aos riscos específicos daquele ativo. Diversificar entre Tesouro IPCA+, ouro e exposição em dólar costuma reduzir riscos específicos de cada um.' },
    { pergunta: 'Bitcoin algum dia pode ser considerado reserva de valor tão confiável quanto o ouro?', resposta: 'É uma tese defendida por parte do mercado, mas ainda não comprovada pelo tempo — o histórico do ouro é de milênios, o do Bitcoin é de pouco mais de uma década, com volatilidade muito maior nesse período.' },
    { pergunta: 'Imóveis são uma boa reserva de valor?', resposta: 'Imóveis bem localizados historicamente acompanham ou superam a inflação no longo prazo, mas têm baixa liquidez e custos de manutenção, o que os torna diferentes de instrumentos mais líquidos como Tesouro IPCA+ ou ouro em ETF.' },
    { pergunta: 'Quanto do meu patrimônio deveria estar em reserva de valor?', resposta: 'Não existe uma porcentagem universal — depende do seu horizonte de tempo, tolerância a risco e outros objetivos financeiros. O importante é que a parcela dedicada a isso realmente tenha histórico de preservar poder de compra, e não seja escolhida só por estar em alta no momento.' },
    { pergunta: 'A poupança serve como reserva de valor no Brasil?', resposta: 'Historicamente, a poupança já rendeu abaixo da inflação em diversos períodos, especialmente quando a Selic está em patamares mais baixos, o que significa que ela nem sempre cumpre o papel de preservar poder de compra no longo prazo.' }
  ]
}
