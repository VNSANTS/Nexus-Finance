import type { Modulo } from '@/types'

export const moduloCenarioMacroeconomico: Modulo = {
  id: 'cenario-macroeconomico',
  trilhaId: 'economia-mercado',
  numero: 6,
  titulo: 'Cenário Macroeconômico',
  subtitulo: 'Uma rotina de 15 minutos por semana',
  iconName: 'Gauge',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Este é o módulo operacional da trilha. A teoria já veio nos anteriores; aqui o assunto é montar uma rotina prática de leitura de cenário, com poucos indicadores, poucas fontes e tempo definido. O objetivo não é prever o futuro, é não ser surpreendido por ele.',
    porQueImporta:
      'Consumir muita notícia econômica e entender pouco é pior que não acompanhar. Gera ansiedade, dá sensação falsa de informação e aumenta a vontade de mexer na carteira. Uma rotina enxuta e regular resolve melhor e custa menos tempo.',
    naPratica:
      'Cinco ou seis indicadores bastam, e as melhores fontes são primárias e gratuitas. O comunicado do Copom é curto e diz diretamente o que o Banco Central está pensando — melhor que qualquer interpretação de terceiro. O Boletim Focus, publicado semanalmente, traz a média das expectativas de economistas: é expectativa, não profecia, e erra com frequência. O ponto mais valioso da rotina é escrever três linhas com o seu próprio cenário e revisá-las três meses depois. Comparar o que você achou com o que aconteceu ensina mais que ler mil análises.',
    passoAPasso: [
      'Escolha cinco indicadores e ignore o resto',
      'Marque no calendário as datas de divulgação de cada um',
      'Reserve 15 minutos em um dia fixo da semana',
      'Leia o comunicado do Copom quando houver reunião e escreva três linhas do seu cenário',
      'Revise o que você escreveu três meses depois e compare com o que aconteceu',
    ],
    errosComuns: [
      'Consumir notícia demais e informação de menos',
      'Tratar previsão de curto prazo como certeza',
      'Mudar a alocação estratégica por causa de um dado mensal',
      'Ignorar o cenário externo, principalmente os juros americanos',
      'Confundir análise com opinião de rede social',
    ],
    comparativo: {
      titulo: 'O painel mínimo',
      linhas: [
        { label: 'Selic', valor: 'Copom, a cada 45 dias · define a renda fixa' },
        { label: 'IPCA', valor: 'IBGE, mensal · corrige títulos e mede poder de compra' },
        { label: 'Câmbio', valor: 'Diário · afeta preços e ativos internacionais' },
        { label: 'Curva de juros futuros', valor: 'B3, diário · o que o mercado espera dos juros' },
        { label: 'PIB e desemprego', valor: 'IBGE, trimestral e mensal · saúde da economia' },
        { label: 'Juros nos EUA', valor: 'Fed · move capital global e o dólar' },
      ],
    },
    checklist: [
      'Escolhi meus cinco indicadores',
      'Marquei as datas de divulgação no calendário',
      'Defini o dia e a hora da minha leitura semanal',
      'Li um comunicado do Copom inteiro',
      'Escrevi três linhas com o meu cenário',
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman explica por que o Sistema 1 (rápido, reativo) nos faz superreagir a manchetes isoladas — a rotina semanal de leitura de indicadores deste módulo é uma forma prática de forçar o Sistema 2 (lento, deliberado) a interpretar o cenário.',
    },
  },

  mapaMental: {
    label: 'Cenário Macroeconômico',
    subtitulo: 'Uma rotina de 15 minutos por semana que substitui horas de notícia',
    ramos: [
      {
        id: 'painel',
        label: 'Painel de indicadores',
        cor: '#3B82F6',
        resumo: 'Cinco bastam',
        filhos: [
          { label: 'Selic', desc: 'Decidida a cada 45 dias aproximadamente pelo Copom. Define o rendimento de quase toda a renda fixa do país.' },
          { label: 'IPCA', desc: 'Divulgado mensalmente pelo IBGE. Determina o rendimento do Tesouro IPCA+ e o reajuste de muita coisa.' },
          { label: 'Câmbio', desc: 'Muda todo dia. Afeta preço de combustível, alimento e eletrônico, e o valor em reais dos ativos internacionais.' },
          {
            label: 'Curva de juros futuros',
            desc: 'Mostra o que o mercado espera dos juros nos próximos anos. É a previsão coletiva, não uma certeza.',
            netos: [
              { label: 'Como usar', desc: 'Se a curva já embute queda de juros, comprar prefixado apostando nisso não traz vantagem — o preço já reflete.' },
            ],
          },
        ],
      },
      {
        id: 'fontes',
        label: 'Fontes primárias',
        cor: '#00D4FF',
        resumo: 'Gratuitas e sem intermediário',
        filhos: [
          { label: 'Comunicado do Copom', desc: 'Sai no mesmo dia da decisão, é curto e diz diretamente o raciocínio do Banco Central.' },
          { label: 'Ata do Copom', desc: 'Publicada dias depois, com mais detalhe do debate interno e das divergências.' },
          { label: 'Boletim Focus', desc: 'Média das expectativas de economistas, divulgada semanalmente. É expectativa, e erra com frequência.' },
          { label: 'IBGE e Banco Central', desc: 'Dados brutos, sem interpretação e sem opinião. É de onde todo mundo tira os números antes de comentar.' },
        ],
      },
      {
        id: 'rotina',
        label: 'A rotina',
        cor: '#22C55E',
        resumo: '15 minutos, dia fixo',
        filhos: [
          { label: 'Dia e hora fixos', desc: 'Mesmo horário toda semana funciona muito melhor que ler um pouco todo dia sem estrutura.' },
          { label: 'Escrever três linhas', desc: 'O seu cenário, com suas palavras. É o que transforma leitura passiva em entendimento.' },
          { label: 'Revisar em três meses', desc: 'Comparar o que você achou com o que aconteceu. Nenhuma análise alheia ensina tanto quanto essa comparação.' },
          { label: 'Calendário de divulgações', desc: 'Saber quando cada dado sai evita ser pego de surpresa e reduz a checagem compulsiva.' },
        ],
      },
      {
        id: 'externo',
        label: 'Cenário externo',
        cor: '#FFC93C',
        resumo: 'O Brasil não decide sozinho',
        filhos: [
          { label: 'Juros nos EUA', desc: 'Quando sobem, capital sai de países emergentes e o dólar tende a se fortalecer aqui.' },
          { label: 'China', desc: 'Principal compradora das nossas commodities. Desaceleração lá afeta exportadoras, câmbio e a bolsa daqui.' },
          { label: 'Commodities', desc: 'Minério, soja e petróleo movem exportação, câmbio e boa parte do Ibovespa.' },
        ],
      },
      {
        id: 'erros',
        label: 'Erros de leitura',
        cor: '#EF4444',
        resumo: 'O que estraga a rotina',
        filhos: [
          { label: 'Notícia demais', desc: 'Consumir muito e entender pouco aumenta a ansiedade e a chance de mexer na carteira sem motivo.' },
          { label: 'Previsão como certeza', desc: 'O Focus é média de expectativas e erra. Tratar como profecia leva a decisões concentradas em um único cenário.' },
          { label: 'Reagir a dado mensal', desc: 'Cenário serve para ajuste na margem, nunca para virar a alocação estratégica.' },
          { label: 'Análise de rede social', desc: 'Conteúdo feito para engajamento é otimizado para gerar reação, não para informar bem.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'Cenário só vira decisão quando encontra uma regra. O rebalanceamento é essa regra: ele define o quanto você pode ajustar sem transformar leitura de conjuntura em aposta.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Digite sua alocação estratégica alvo por classe',
      'Digite sua alocação atual',
      'Defina um limite de desvio tático, por exemplo 10 pontos percentuais',
      'Direcione os próximos aportes respeitando esse limite, sem ultrapassá-lo por convicção',
    ],
    exemploGuiado:
      'Exemplo: seu alvo é 50% renda fixa e 50% renda variável. Sua leitura de cenário indica juros altos por mais tempo. O ajuste razoável é ir para 60% e 40%, dentro do limite de 10 pontos. Ir para 90% e 10% não é ajuste, é aposta — e se o cenário não se confirmar, o custo de estar fora é grande e difícil de recuperar.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a melhor fonte para saber o que o Banco Central pensa?', verso: 'O comunicado do Copom, publicado no mesmo dia da decisão. É curto, gratuito e é a fonte primária, sem interpretação de terceiros.' },
    { id: 'fc2', frente: 'O que é o Boletim Focus?', verso: 'A média das expectativas de economistas de mercado, divulgada semanalmente pelo Banco Central. É expectativa coletiva, não previsão confiável.' },
    { id: 'fc3', frente: 'O que a curva de juros futuros mostra?', verso: 'O que o mercado espera dos juros nos próximos anos. Se algo já está na curva, o preço dos ativos já reflete essa expectativa.' },
    { id: 'fc4', frente: 'Qual o passo mais valioso da rotina de cenário?', verso: 'Escrever três linhas com o seu próprio cenário e revisá-las três meses depois, comparando com o que de fato aconteceu.' },
    { id: 'fc5', frente: 'Por que os juros dos EUA afetam o Brasil?', verso: 'Quando sobem, o capital global migra para lá em busca de retorno seguro. Isso pressiona o câmbio e reduz o fluxo para países emergentes.' },
    { id: 'fc6', frente: 'Cenário macro deve mudar a alocação estratégica?', verso: 'Não. Serve para ajuste na margem, dentro de um limite definido. Virar a carteira por leitura de conjuntura é aposta, não estratégia.' },
  ],

  quiz: [
    {
      pergunta: 'O Boletim Focus projeta Selic menor no fim do ano. Como usar essa informação?',
      alternativas: ['Vender tudo e comprar prefixado longo imediatamente', 'Lembrar que é expectativa média e que os preços já refletem parte dela, usando no máximo para ajuste na margem', 'Ignorar completamente', 'Alavancar a posição para aproveitar'],
      correta: 1,
      explicacao: 'O Focus é média de expectativas e erra com frequência. Além disso, o que o mercado já espera está embutido nos preços — você só ganha se o futuro for diferente do consenso.',
    },
    {
      pergunta: 'Quanto tempo por semana basta para acompanhar cenário como investidor pessoa física?',
      alternativas: ['Ao menos duas horas por dia', 'Cerca de 15 minutos por semana, com fontes primárias e indicadores definidos', 'Nenhum, cenário é irrelevante', 'Depende do tamanho da carteira'],
      correta: 1,
      explicacao: 'Uma rotina curta e regular com fontes primárias supera o consumo constante de notícias, que aumenta ansiedade sem melhorar a decisão.',
    },
    {
      pergunta: 'Qual destas é uma fonte primária de informação econômica?',
      alternativas: ['Análise de influenciador no Instagram', 'Comunicado do Copom no site do Banco Central', 'Comentário em grupo de mensagens', 'Manchete de portal de notícias'],
      correta: 1,
      explicacao: 'Fonte primária é o documento original, sem interpretação intermediária. Comunicado do Copom, dados do IBGE e relatórios do Tesouro entram nessa categoria.',
    },
    {
      pergunta: 'A inflação de um mês veio bem acima do esperado. Qual a reação adequada?',
      alternativas: ['Vender toda a renda variável', 'Registrar o dado, observar se é tendência ou ponto fora da curva, e não alterar a alocação estratégica por causa dele', 'Comprar dólar imediatamente', 'Zerar a renda fixa'],
      correta: 1,
      explicacao: 'Um dado mensal isolado pode ser ruído. Mudanças de alocação estratégica devem responder a mudanças na sua vida e no seu horizonte, não a um número de um mês.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ler as atas do Copom inteiras?',
      resposta: 'O comunicado já basta para a maioria — são poucos parágrafos e trazem o essencial. A ata é útil quando você quer entender divergências internas ou quando a decisão surpreendeu o mercado.',
    },
    {
      pergunta: 'De que adianta ler cenário se não vou mudar a carteira?',
      resposta: 'Adianta para não entrar em pânico. Quem entende por que os ativos estão caindo tem muito mais chance de manter a estratégia. A maior parte do valor da rotina é comportamental, não preditiva.',
    },
    {
      pergunta: 'Vale a pena assinar relatórios de casa de análise?',
      resposta: 'Pode ajudar como insumo, desde que você saiba separar fato de premissa e de opinião. O risco é substituir tese própria por recomendação de terceiro — você fica sabendo da entrada e raramente da saída.',
    },
  ],
}
