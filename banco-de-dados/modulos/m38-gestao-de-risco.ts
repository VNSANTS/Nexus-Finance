import type { Modulo } from '@/types'

export const moduloGestaoDeRisco: Modulo = {
  id: 'gestao-de-risco',
  trilhaId: 'estrategia-gestao',
  numero: 5,
  titulo: 'Gestão de Risco',
  subtitulo: 'Saber quais riscos você corre e em que tamanho',
  iconName: 'ShieldAlert',
  duracaoMin: 14,

  aprender: {
    oQueE:
      'Gestão de risco não é evitar risco — sem risco não há retorno. É saber exatamente quais riscos você está correndo, em que proporção, e ter uma medida concreta para cada um. A diferença entre um investidor e alguém apostando é essa: um sabe o que pode dar errado, o outro descobre depois.',
    porQueImporta:
      'A maioria das perdas relevantes de investidor pessoa física não vem de escolher a ação errada. Vem de posição grande demais, de dinheiro de curto prazo em ativo volátil, e de vender no fundo. Todos são falhas de dimensionamento, não de análise.',
    naPratica:
      'São seis riscos, e o mais destrutivo não é nenhum dos técnicos: é o comportamental. Vender no pior momento já destruiu mais patrimônio de pessoa física do que qualquer crise. Depois dele, os que mais aparecem são liquidez, quando o ativo não pode ser vendido na hora necessária, e concentração, quando uma única posição decide o resultado da carteira inteira. Um teste simples resolve boa parte: se a carteira tira o seu sono, o problema é o tamanho do risco, não o tamanho do retorno.',
    passoAPasso: [
      'Mapeie qual risco predomina em cada ativo que você tem',
      'Estabeleça limite máximo por ativo e por emissor',
      'Confirme que sua reserva cobre o suficiente para não vender nada em emergência',
      'Escreva suas regras de venda antes de precisar delas',
      'Simule o pior cenário e verifique se você ainda dormiria tranquilo',
    ],
    errosComuns: [
      'Confundir volatilidade com risco permanente',
      'Achar que renda fixa não tem risco',
      'Ignorar risco de liquidez em small caps e FIIs pequenos',
      'Não ter limite máximo por posição',
      'Achar que diversificar elimina todo o risco',
    ],
    comparativo: {
      titulo: 'Os seis riscos e como mitigar',
      linhas: [
        { label: 'Mercado', valor: 'Preço cai · horizonte longo e alocação equilibrada' },
        { label: 'Crédito', valor: 'Emissor não paga · FGC, qualidade e diversificação' },
        { label: 'Liquidez', valor: 'Não consegue vender · reserva e checar volume' },
        { label: 'Câmbio', valor: 'Real desvaloriza · exposição internacional' },
        { label: 'Inflação', valor: 'Poder de compra cai · IPCA+, ações, ativos reais' },
        { label: 'Comportamental', valor: 'Você mesmo · regras escritas e automação' },
      ],
    },
    checklist: [
      'Sei qual risco predomina em cada ativo da minha carteira',
      'Defini limite máximo por ativo e por emissor',
      'Minha reserva me impede de vender ativo em queda',
      'Escrevi minhas regras de venda',
      'Simulei uma queda de 30% e sei o que faria',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey trata a reserva de emergência como a primeira linha de defesa contra decisões financeiras ruins sob pressão — é exatamente essa reserva que, neste módulo, impede vender um ativo em queda por necessidade.',
    },
  },

  mapaMental: {
    label: 'Gestão de Risco',
    subtitulo: 'Não é evitar risco — é saber quais você corre e em que tamanho',
    ramos: [
      {
        id: 'mercado',
        label: 'Risco de mercado',
        cor: '#EC4899',
        resumo: 'O preço cai porque tudo caiu',
        filhos: [
          { label: 'O que é', desc: 'A queda que atinge quase todos os ativos ao mesmo tempo, independentemente da qualidade de cada um.' },
          { label: 'Como medir', desc: 'Calcule quanto a sua carteira cairia numa queda de 30% da bolsa. O número precisa ser suportável.' },
          { label: 'Como mitigar', desc: 'Horizonte longo, alocação equilibrada entre classes e reserva que evita venda forçada.' },
          { label: 'O que não funciona', desc: 'Diversificar só dentro de renda variável. Numa crise, quase tudo cai junto.' },
        ],
      },
      {
        id: 'credito',
        label: 'Risco de crédito',
        cor: '#EF4444',
        resumo: 'Quem te deve não paga',
        filhos: [
          { label: 'O que é', desc: 'A chance de o emissor não honrar o pagamento combinado.' },
          { label: 'Onde aparece', desc: 'CDB de banco pequeno, CRI, CRA, debênture e FII de papel.' },
          {
            label: 'Como mitigar',
            desc: 'FGC dentro do limite, avaliar a qualidade do emissor e diversificar entre vários.',
            netos: [
              { label: 'O sinal de alerta', desc: 'Taxa muito acima da média não é generosidade: é o mercado precificando risco maior.' },
            ],
          },
        ],
      },
      {
        id: 'liquidez',
        label: 'Risco de liquidez',
        cor: '#FFC93C',
        resumo: 'Não conseguir vender na hora certa',
        filhos: [
          { label: 'O que é', desc: 'Não conseguir transformar o ativo em dinheiro quando precisa, ou só conseguir com desconto grande.' },
          { label: 'Onde aparece', desc: 'Small caps, FIIs pequenos, imóveis, produtos com carência e investimentos alternativos.' },
          { label: 'Como mitigar', desc: 'Manter reserva líquida e checar o volume médio negociado antes de montar posição.' },
          { label: 'A regra prática', desc: 'Se a sua posição é grande perto do que o ativo negocia por dia, você virou o mercado daquele papel.' },
        ],
      },
      {
        id: 'silenciosos',
        label: 'Riscos silenciosos',
        cor: '#3B82F6',
        resumo: 'Os que não aparecem no extrato',
        filhos: [
          { label: 'Inflação', desc: 'Corrói o poder de compra de quem fica só em ativo sem correção. É a perda mais garantida e menos percebida.' },
          { label: 'Câmbio', desc: 'Patrimônio 100% em real é uma aposta concentrada no Brasil, mesmo que nunca pareça uma aposta.' },
          { label: 'Reinvestimento', desc: 'Quando o título vence e a taxa disponível é muito menor. Atinge quem vive de renda fixa.' },
          { label: 'Concentração escondida', desc: 'Salário, benefícios e ações da mesma empresa. Tudo cai junto se ela quebrar.' },
        ],
      },
      {
        id: 'comportamental',
        label: 'Risco comportamental',
        cor: '#8B5CF6',
        resumo: 'O maior de todos',
        filhos: [
          { label: 'Vender no fundo', desc: 'Já destruiu mais patrimônio de pessoa física do que qualquer crise por si só.' },
          { label: 'Como mitigar', desc: 'Regras escritas antes, aporte automático e menos exposição a telas e notícias.' },
          { label: 'Teste do sono', desc: 'Se a carteira tira o seu sono, o risco está grande demais — não o retorno pequeno demais.' },
        ],
      },
      {
        id: 'dimensionar',
        label: 'Dimensionar',
        cor: '#00D4FF',
        resumo: 'O tamanho decide tudo',
        filhos: [
          { label: 'Limite por ativo', desc: 'Definir um teto, como 5% ou 10% da carteira em uma única empresa, e respeitá-lo mesmo quando ela sobe.' },
          { label: 'Limite por emissor', desc: 'Em renda fixa, respeitar o teto do FGC por instituição e dividir entre bancos.' },
          {
            label: 'Alavancagem',
            desc: 'O único risco capaz de fazer você dever mais do que investiu.',
            netos: [
              { label: 'A recomendação', desc: 'Para investidor pessoa física em formação de patrimônio, simplesmente não usar.' },
            ],
          },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'A melhor ferramenta de gestão de risco disponível hoje no app é o rebalanceamento: ele impede que uma posição vencedora cresça até virar o risco principal da carteira sem você ter decidido isso.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Digite sua alocação alvo por classe',
      'Digite os valores atuais de cada uma',
      'Identifique a classe que mais se afastou do alvo para cima',
      'Direcione os próximos aportes para as classes abaixo do alvo, sem vender nada',
    ],
    exemploGuiado:
      'Exemplo: você definiu 10% em uma ação específica. Depois de uma alta forte, ela virou 28% da carteira. O retorno foi ótimo, mas o risco também mudou: agora um problema nessa empresa afeta quase um terço do seu patrimônio. Reduzir para o alvo não é desistir do acerto, é impedir que ele vire o risco principal.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é o maior risco da carteira do investidor pessoa física?', verso: 'O comportamental. Vender no pior momento destrói mais patrimônio do que qualquer crise isoladamente.' },
    { id: 'fc2', frente: 'O que é risco de liquidez?', verso: 'Não conseguir vender o ativo quando precisa, ou só conseguir com desconto grande. Aparece em small caps, FIIs pequenos e imóveis.' },
    { id: 'fc3', frente: 'Renda fixa tem risco?', verso: 'Tem: crédito, quando o emissor não paga; marcação a mercado, se vender antes do vencimento; e inflação, quando o rendimento real fica negativo.' },
    { id: 'fc4', frente: 'O que é o teste do sono?', verso: 'Se a carteira tira o seu sono, o risco está grande demais para você. O ajuste correto é reduzir risco, não aumentar tolerância à força.' },
    { id: 'fc5', frente: 'Por que ter limite máximo por ativo?', verso: 'Porque impede que uma posição vencedora cresça até virar o risco principal da carteira sem que você tenha decidido isso.' },
    { id: 'fc6', frente: 'Qual risco pode fazer você dever mais do que investiu?', verso: 'Alavancagem. É o único mecanismo que transforma prejuízo em dívida, e por isso não se recomenda para quem está formando patrimônio.' },
  ],

  quiz: [
    {
      pergunta: 'Uma ação sua subiu muito e agora representa 30% da carteira. Qual o problema?',
      alternativas: ['Nenhum, é resultado de um bom acerto', 'Concentração: um problema nessa empresa afeta quase um terço do patrimônio', 'Que você vai pagar mais imposto', 'Que a corretora vai cobrar mais'],
      correta: 1,
      explicacao: 'Bom acerto e bom dimensionamento são coisas diferentes. Deixar a posição crescer sem limite transfere o risco da carteira inteira para uma única empresa.',
    },
    {
      pergunta: 'Qual afirmação sobre volatilidade está correta?',
      alternativas: ['Volatilidade é o mesmo que perda', 'Volatilidade é oscilação de preço; perda permanente é quando o valor não volta', 'Volatilidade só existe em cripto', 'Volatilidade alta significa retorno garantido maior'],
      correta: 1,
      explicacao: 'Volatilidade é o custo de entrada da renda variável e se dilui com o tempo. Perda permanente vem de quebra, fraude ou venda forçada no fundo.',
    },
    {
      pergunta: 'Você tem R$ 400 mil em CDBs de um único banco médio. Qual o risco?',
      alternativas: ['Nenhum, CDB tem FGC', 'Concentração acima do limite do FGC por instituição — o excedente não está coberto', 'Risco cambial', 'Risco de liquidez apenas'],
      correta: 1,
      explicacao: 'O FGC cobre até um limite por CPF e por instituição. Valores acima disso ficam expostos ao risco de crédito do banco. A solução é dividir entre emissores diferentes.',
    },
    {
      pergunta: 'Qual medida NÃO reduz risco de forma efetiva?',
      alternativas: ['Manter reserva de emergência', 'Definir limite máximo por ativo', 'Acompanhar a cotação várias vezes por dia', 'Diversificar entre classes de ativo'],
      correta: 2,
      explicacao: 'Acompanhar demais aumenta a chance de decisão impulsiva, que é justamente o maior risco da carteira. Reduz sensação de descontrole, não risco real.',
    },
  ],

  faq: [
    {
      pergunta: 'Como sei se estou correndo risco demais?',
      resposta: 'Três sinais: você confere a carteira várias vezes ao dia, perde sono com oscilações, ou uma única posição decidiria o seu resultado do ano. Qualquer um deles indica que o dimensionamento está errado para o seu perfil.',
    },
    {
      pergunta: 'Diversificar elimina o risco?',
      resposta: 'Reduz o risco específico de uma empresa ou emissor, que é o que dá para eliminar. O risco de mercado, que atinge quase tudo ao mesmo tempo, permanece — e é enfrentado com horizonte longo e reserva, não com diversificação.',
    },
    {
      pergunta: 'Devo usar stop loss?',
      resposta: 'Faz sentido para quem opera prazos curtos com critério técnico. Para quem investe por fundamento e prazo longo, stop transforma volatilidade normal em perda realizada — e costuma acionar exatamente no pior ponto.',
    },
  ],
}
