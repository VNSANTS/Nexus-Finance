import type { Modulo } from '@/types'

export const moduloFundosImobiliarios: Modulo = {
  id: 'fundos-imobiliarios',
  trilhaId: 'fundos',
  numero: 2,
  titulo: 'Fundos Imobiliários (FIIs)',
  subtitulo: 'Ser dono de imóvel sem comprar imóvel',
  iconName: 'Building',
  duracaoMin: 14,

  aprender: {
    oQueE:
      'Um fundo imobiliário reúne o dinheiro de muitos investidores para comprar imóveis ou títulos de crédito imobiliário. Você compra cotas na bolsa, como se fossem ações, e recebe mensalmente a parte que te cabe do aluguel ou dos juros. É a forma mais acessível de investir em imóveis no Brasil.',
    porQueImporta:
      'É a porta de entrada mais popular para renda passiva no país, e por bons motivos: paga todo mês, tem isenção de imposto de renda sobre o rendimento para pessoa física dentro das regras, e o ticket de entrada é o preço de uma cota. Também é onde mais gente compra pelo motivo errado — perseguindo o maior dividend yield da lista.',
    naPratica:
      'Existem dois grandes grupos. Os fundos de tijolo são donos de imóveis reais, como galpões logísticos, lajes corporativas e shoppings, e ganham com aluguel. Os fundos de papel investem em títulos de crédito imobiliário, os CRIs, e ganham com juros. Eles reagem de formas diferentes ao mesmo cenário: com juro alto, o fundo de papel tende a distribuir mais, enquanto o de tijolo sofre com o custo de capital e com a comparação contra a renda fixa. Quatro números resolvem a maior parte da análise inicial: dividend yield, P/VP, vacância e liquidez diária.',
    passoAPasso: [
      'Decida a proporção entre tijolo e papel na sua carteira de FIIs',
      'Verifique o P/VP e entenda o motivo de estar acima ou abaixo de 1',
      'Cheque a vacância e a concentração de inquilinos no relatório gerencial',
      'Confirme a liquidez média diária antes de montar posição',
      'Reinvista os rendimentos enquanto estiver na fase de acumulação',
    ],
    errosComuns: [
      'Comprar apenas pelo maior dividend yield da lista',
      'Ignorar vacância crescente e contratos prestes a vencer',
      'Comprar fundo com um único inquilino sem saber disso',
      'Achar que a isenção vale também na venda da cota',
      'Confundir P/VP baixo com barganha sem investigar a causa',
    ],
    comparativo: {
      titulo: 'Tipos de FII',
      linhas: [
        { label: 'Tijolo', valor: 'Dono de imóveis · ganha aluguel · risco de vacância' },
        { label: 'Papel (CRI)', valor: 'Títulos de crédito · ganha juros · risco de calote' },
        { label: 'Fundo de fundos', valor: 'Compra cotas de outros FIIs · dupla camada de taxa' },
        { label: 'Desenvolvimento', valor: 'Constrói para vender · retorno maior · risco de obra' },
        { label: 'Híbrido', valor: 'Mistura tijolo e papel na mesma carteira' },
      ],
    },
    checklist: [
      'Sei diferenciar fundo de tijolo de fundo de papel',
      'Sei interpretar dividend yield, P/VP, vacância e liquidez',
      'Li o relatório gerencial de pelo menos um fundo',
      'Verifiquei a concentração de inquilinos antes de comprar',
      'Entendi que a isenção vale no rendimento, não na venda da cota',
    ],
    livroRelacionado: {
      livroId: 'milionario-mora-ao-lado',
      textoConexao: 'O livro mostra que riqueza real é medida pelo patrimônio que gera renda, não pela aparência — FIIs são um exemplo direto disso: um ativo silencioso que paga aluguel todo mês, sem status ou ostentação envolvidos.',
    },
  },

  mapaMental: {
    label: 'Fundos Imobiliários',
    subtitulo: 'Virar sócio de imóveis com pouco dinheiro e receber aluguel todo mês',
    ramos: [
      {
        id: 'tipos',
        label: 'Tipos',
        cor: '#8B5CF6',
        resumo: 'Tijolo, papel e o resto',
        filhos: [
          {
            label: 'Tijolo',
            desc: 'Dono de imóveis de verdade: galpões, lajes corporativas, shoppings, hospitais. Ganha com aluguel.',
            netos: [
              { label: 'Logística', desc: 'Galpões alugados para varejo e indústria. Contratos longos e vacância historicamente baixa.' },
              { label: 'Lajes corporativas', desc: 'Escritórios. Mais sensíveis a ciclo econômico e a mudanças de hábito de trabalho.' },
              { label: 'Shoppings', desc: 'Receita ligada ao consumo e ao faturamento das lojas.' },
            ],
          },
          { label: 'Papel', desc: 'Investe em CRIs, títulos de crédito imobiliário. Ganha com juros, e é mais sensível a inflação e a calote.' },
          { label: 'Fundo de fundos', desc: 'Compra cotas de outros FIIs. Diversifica de uma vez, mas você paga taxa sobre taxa.' },
          { label: 'Desenvolvimento', desc: 'Constrói para vender. Retorno potencial maior, com o risco da obra e do mercado no momento da entrega.' },
        ],
      },
      {
        id: 'indicadores',
        label: 'Os quatro indicadores',
        cor: '#00D4FF',
        resumo: 'O que olhar antes de comprar',
        filhos: [
          {
            label: 'Dividend Yield',
            desc: 'Quanto o fundo paga por ano em relação ao preço da cota. Yield muito acima da média costuma ser alerta, não oportunidade.',
            netos: [
              { label: 'De onde vem', desc: 'Distribuição de ganho não recorrente e venda de ativo inflam o yield uma vez e somem depois.' },
              { label: 'Cota em queda', desc: 'Se o preço cai, o yield sobe sem que o fundo tenha melhorado em nada.' },
            ],
          },
          {
            label: 'P/VP',
            desc: 'Preço da cota dividido pelo valor patrimonial. Abaixo de 1 significa comprar por menos que o valor dos imóveis.',
            netos: [
              { label: 'Por que investigar', desc: 'Desconto pode indicar oportunidade ou problema real: vacância, contrato vencendo, imóvel superavaliado no laudo.' },
            ],
          },
          { label: 'Vacância', desc: 'Percentual do imóvel vazio. Vacância subindo hoje é aluguel caindo nos próximos meses.' },
          { label: 'Liquidez diária', desc: 'Quanto o fundo negocia por dia. Fundo pouco líquido é difícil de vender na hora em que você precisa.' },
        ],
      },
      {
        id: 'riscos',
        label: 'Riscos',
        cor: '#EF4444',
        resumo: 'O que derruba o rendimento',
        filhos: [
          { label: 'Vacância', desc: 'Inquilino sai e a receita cai imediatamente. Em fundo com poucos imóveis, o impacto é grande.' },
          { label: 'Inquilino único', desc: 'Se uma só empresa paga todo o aluguel do fundo, o risco de crédito dela virou o seu risco.' },
          { label: 'Contrato vencendo', desc: 'A renovação pode vir com aluguel menor. O relatório gerencial informa os vencimentos — vale conferir.' },
          { label: 'Emissões seguidas', desc: 'O fundo emite cotas novas e dilui quem já estava dentro, se o dinheiro captado não for bem aplicado.' },
          { label: 'Juro alto', desc: 'Quando a renda fixa paga muito, o investidor migra e a cota dos FIIs tende a cair.' },
        ],
      },
      {
        id: 'tributacao',
        label: 'Tributação',
        cor: '#22C55E',
        resumo: 'A confusão mais comum',
        filhos: [
          {
            label: 'Rendimento mensal',
            desc: 'Isento de imposto de renda para pessoa física, desde que cumpridos os requisitos da lei.',
            netos: [
              { label: 'Os requisitos', desc: 'Fundo listado em bolsa, com pelo menos 50 cotistas, e o investidor não pode deter 10% ou mais das cotas.' },
            ],
          },
          { label: 'Venda de cota', desc: '20% sobre o ganho, sem nenhuma isenção. É a confusão mais comum do investidor de FII.' },
          { label: 'DARF', desc: 'Você mesmo calcula e recolhe até o último dia útil do mês seguinte à venda com lucro.' },
          { label: 'Prejuízo compensa', desc: 'Perdas em FII abatem lucros futuros de FII — não se misturam com ações.' },
        ],
      },
      {
        id: 'carteira',
        label: 'Montar carteira',
        cor: '#FFC93C',
        resumo: 'Como não virar colecionador de problema',
        filhos: [
          { label: 'Diversificar tipo e setor', desc: 'Logística, lajes, shopping e papel. Não concentrar no que paga mais no momento.' },
          { label: 'Ler o relatório gerencial', desc: 'Sai todo mês, é curto e traz vacância, inadimplência, contratos e novidades. É a melhor fonte gratuita que existe.' },
          { label: 'Reinvestir os rendimentos', desc: 'Na fase de acumulação, é o que faz a bola de neve girar. Consumir o provento cedo demais atrasa a meta em anos.' },
          { label: 'Não perseguir yield', desc: 'O maior pagador do ranking costuma ser o que tem o maior problema. Yield sustentável vale mais que yield alto.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Renda de Dividendos',
    intro:
      'A pergunta que todo mundo faz sobre FII é quantas cotas seriam necessárias para viver de renda. A calculadora responde — mas o exercício útil é refazer a conta com um yield mais conservador, para não construir um plano sobre o melhor cenário possível.',
    passos: [
      'Abra Ferramentas → Renda de Dividendos',
      'Digite a renda mensal que você quer receber',
      'Use um dividend yield conservador, algo em torno de 8% ao ano',
      'Anote o patrimônio necessário que apareceu',
      'Refaça a conta com um yield 30% menor e compare os dois números',
    ],
    exemploGuiado:
      'Exemplo: para receber R$ 2.000 por mês com yield de 8% ao ano, o patrimônio necessário fica em torno de R$ 300 mil. Com yield de 5,6%, sobe para cerca de R$ 428 mil. Os dois cenários são plausíveis ao longo de uma década, e é por isso que projeção de renda passiva precisa ser feita com margem — não com o melhor número disponível hoje.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a diferença entre FII de tijolo e de papel?', verso: 'Tijolo é dono de imóveis reais e ganha com aluguel. Papel investe em títulos de crédito imobiliário, os CRIs, e ganha com juros.' },
    { id: 'fc2', frente: 'O rendimento de FII é isento de imposto?', verso: 'O rendimento mensal é isento para pessoa física, se atendidos os requisitos da lei. A venda da cota com lucro paga 20%, sem isenção.' },
    { id: 'fc3', frente: 'O que é P/VP?', verso: 'Preço da cota dividido pelo valor patrimonial. Abaixo de 1 significa comprar por menos que o valor dos imóveis — e exige investigar por quê.' },
    { id: 'fc4', frente: 'Por que dividend yield muito alto é um alerta?', verso: 'Porque costuma vir de distribuição não recorrente, contrato prestes a vencer ou cota em queda. Yield alto é consequência, não qualidade.' },
    { id: 'fc5', frente: 'Quais são os requisitos da isenção de FII?', verso: 'Fundo listado em bolsa, com no mínimo 50 cotistas, e o investidor não pode deter 10% ou mais das cotas do fundo.' },
    { id: 'fc6', frente: 'Onde encontrar informações confiáveis sobre um FII?', verso: 'No relatório gerencial, publicado mensalmente pelo próprio fundo. É curto, gratuito e traz vacância, inadimplência e vencimento de contratos.' },
  ],

  quiz: [
    {
      pergunta: 'Você vendeu cotas de um FII com lucro de R$ 3.000. Qual a tributação?',
      alternativas: ['Isento, porque FII é isento', 'Isento, porque a venda foi abaixo de R$ 20 mil', '20% sobre o ganho, recolhidos via DARF', '15% sobre o ganho'],
      correta: 2,
      explicacao: 'A isenção vale apenas para o rendimento mensal. Ganho de capital na venda de cotas paga 20%, e não existe a isenção mensal de R$ 20 mil que se aplica às ações.',
    },
    {
      pergunta: 'Um FII tem dividend yield de 18% ao ano, muito acima da média. O que investigar primeiro?',
      alternativas: ['Nada, é uma oportunidade clara', 'Se a distribuição é recorrente ou veio de venda de ativo, e se a cota não está caindo', 'Se o fundo é de tijolo ou de papel', 'Se paga no dia 15'],
      correta: 1,
      explicacao: 'Yield muito acima da média quase sempre tem explicação: receita não recorrente, contrato vencendo ou cota em queda livre. O número alto é o começo da análise, não a conclusão.',
    },
    {
      pergunta: 'O que significa vacância de 25% em um fundo de tijolo?',
      alternativas: ['Que 25% dos cotistas venderam', 'Que 25% da área do fundo está sem inquilino', 'Que o fundo distribuiu 25% do lucro', 'Que a cota caiu 25%'],
      correta: 1,
      explicacao: 'Vacância é o percentual de área desocupada. Vacância alta significa receita menor de aluguel e, em geral, distribuição menor nos meses seguintes.',
    },
    {
      pergunta: 'Qual risco é maior em um FII com um único inquilino?',
      alternativas: ['Risco cambial', 'Risco de o inquilino sair ou não pagar, derrubando toda a receita do fundo', 'Risco de o imóvel valorizar demais', 'Nenhum, é mais simples de administrar'],
      correta: 1,
      explicacao: 'Com um único inquilino, o risco de crédito e de saída dele vira o risco integral do fundo. É concentração disfarçada de simplicidade.',
    },
  ],

  faq: [
    {
      pergunta: 'FII é melhor que comprar um imóvel para alugar?',
      resposta: 'São coisas diferentes. FII tem liquidez, ticket baixo, isenção no rendimento e diversificação; imóvel próprio dá controle e possibilidade de uso. Em termos financeiros puros, o FII costuma vencer em custo de transação, imposto e facilidade de diversificar.',
    },
    {
      pergunta: 'Por que meu FII caiu se o aluguel continua sendo pago?',
      resposta: 'O preço da cota reflete expectativa e concorrência com a renda fixa. Quando a Selic sobe, o investidor migra e a cota cai, mesmo com a receita do fundo intacta. Para quem vive do rendimento e não pretende vender, o efeito no bolso é pequeno.',
    },
    {
      pergunta: 'Quantos FIIs devo ter na carteira?',
      resposta: 'Entre 8 e 15 costuma ser suficiente para diversificar tipo, setor e gestor sem virar uma carteira que você não consegue acompanhar. Mais importante que a quantidade é não concentrar tudo em um único segmento.',
    },
  ],
}
