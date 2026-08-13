import type { Modulo } from '@/types'

export const moduloPrimeirosPassos: Modulo = {
  id: 'primeiros-passos',
  trilhaId: 'estrategia-gestao',
  numero: 1,
  titulo: 'Primeiros Passos para Investir',
  subtitulo: 'Do zero ao primeiro aporte, sem pular etapa',
  iconName: 'Footprints',
  duracaoMin: 11,

  aprender: {
    oQueE:
      'Este é o módulo mais prático do app. Não é sobre entender investimentos — é sobre sair dele com a conta aberta e o primeiro aporte feito. Tudo aqui foi escrito para ser executado hoje, com o celular na mão.',
    porQueImporta:
      'A distância entre saber e fazer é onde a maioria das pessoas trava. Gente que já leu sobre juro composto, entende inflação e sabe o que é Tesouro Selic continua com o dinheiro parado na conta corrente por anos. O obstáculo não é conhecimento, é o primeiro clique.',
    naPratica:
      'Dá para começar com cerca de R$ 30 no Tesouro Direto. A abertura de conta em corretora costuma ser aprovada no mesmo dia, com CPF, documento, comprovante de residência e uma selfie. A transferência é por Pix, sempre de conta do seu próprio CPF. E existe uma ordem que não deve ser invertida: quitar dívida cara vem antes de montar reserva, que vem antes de investir para crescer. Investir com rotativo aberto é perder dos dois lados ao mesmo tempo.',
    passoAPasso: [
      'Confira os pré-requisitos: dívida cara quitada e reserva iniciada',
      'Escolha uma corretora com corretagem e custódia zeradas, e cheque o registro dela na CVM',
      'Abra a conta e responda o questionário de suitability com honestidade',
      'Transfira por Pix e faça o primeiro aporte no Tesouro Selic',
      'Antes de fechar o app, programe o segundo aporte para o dia do próximo pagamento',
    ],
    errosComuns: [
      'Esperar "ter mais dinheiro" para começar',
      'Começar por renda variável antes de ter reserva',
      'Mentir no suitability para liberar produtos de risco maior',
      'Abrir a conta e nunca fazer o segundo aporte',
      'Escolher corretora por propaganda em vez de custo e registro',
    ],
    comparativo: {
      titulo: 'Onde colocar o primeiro dinheiro',
      linhas: [
        { label: 'Tesouro Selic', valor: 'Acompanha a Selic · resgate D+1 · risco soberano' },
        { label: 'CDB liquidez diária', valor: 'Perto de 100% do CDI · com FGC · saque imediato' },
        { label: 'Poupança', valor: 'Trava em 0,5% a.m. + TR com Selic alta · evitar' },
        { label: 'Ações', valor: 'Só depois da reserva pronta · horizonte de 5 anos+' },
      ],
    },
    checklist: [
      'Não tenho dívida com juro acima de 100% ao ano',
      'Escolhi uma corretora sem taxas e registrada na CVM',
      'Abri a conta e respondi o suitability com honestidade',
      'Fiz meu primeiro aporte, mesmo que pequeno',
      'Programei o segundo aporte para o dia do próximo pagamento',
    ],
    livroRelacionado: {
      livroId: 'pai-rico-pai-pobre',
      textoConexao:
        'Kiyosaki repete que a diferença não está em quanto você ganha, e sim no que você faz com o primeiro real que sobra. Este módulo é exatamente esse primeiro real saindo da conta corrente.',
    },
  },

  mapaMental: {
    label: 'Primeiros Passos',
    subtitulo: 'Do zero até o primeiro aporte, sem pular etapa',
    ramos: [
      {
        id: 'antes',
        label: 'Antes de investir',
        cor: '#EF4444',
        resumo: 'A ordem que não se inverte',
        filhos: [
          {
            label: 'Dívida cara quitada',
            desc: 'Nenhum investimento no Brasil rende perto do rotativo do cartão. Quitar é o melhor retorno garantido que existe.',
            netos: [
              { label: 'O limite prático', desc: 'Dívida acima de 100% ao ano é emergência absoluta e vem antes de tudo.' },
              { label: 'Dívida barata', desc: 'Consignado e financiamento imobiliário podem conviver com o começo dos aportes.' },
            ],
          },
          { label: 'Reserva iniciada', desc: 'Mesmo que seja um mês de gastos. Sem ela, a primeira emergência obriga você a resgatar no pior momento.' },
          { label: 'Objetivo definido', desc: 'O dinheiro é para quando? A resposta define onde ele deve ficar. Sem prazo, não há escolha correta.' },
        ],
      },
      {
        id: 'corretora',
        label: 'Escolher a corretora',
        cor: '#00D4FF',
        resumo: 'Custo zero e registro na CVM',
        filhos: [
          { label: 'Taxa zero', desc: 'Corretagem e custódia zeradas são o padrão do mercado hoje. Se a sua cobra, troque.' },
          { label: 'Registro na CVM', desc: 'Verificar antes de transferir qualquer valor. Leva dois minutos no site e elimina o risco de plataforma irregular.' },
          { label: 'Facilidade de uso', desc: 'Um app que você entende vale mais que um cheio de produtos que você não vai usar.' },
        ],
      },
      {
        id: 'conta',
        label: 'Abrir a conta',
        cor: '#22C55E',
        resumo: 'Costuma sair no mesmo dia',
        filhos: [
          { label: 'Documentos', desc: 'CPF, documento de identidade, comprovante de residência e selfie. Aprovação normalmente no mesmo dia.' },
          {
            label: 'Suitability',
            desc: 'Questionário que define seu perfil de investidor. Responda com honestidade.',
            netos: [
              { label: 'Por que não mentir', desc: 'Marcar "agressivo" sem ser libera produtos que você não deveria comprar, e a proteção existe para o seu lado.' },
            ],
          },
          { label: 'Transferir por Pix', desc: 'Sempre de conta do seu próprio CPF. Transferência de terceiros costuma ser bloqueada por regra de prevenção.' },
        ],
      },
      {
        id: 'aporte',
        label: 'O primeiro aporte',
        cor: '#FFC93C',
        resumo: 'Vencer o medo, não ficar rico',
        filhos: [
          { label: 'Comece pelo simples', desc: 'Tesouro Selic ou CDB de liquidez diária a 100% do CDI ou mais. Nada de renda variável no primeiro dia.' },
          { label: 'Valor pequeno', desc: 'A partir de cerca de R$ 30. O objetivo do primeiro aporte é psicológico: quebrar a barreira.' },
          { label: 'Conferir', desc: 'Ver o ativo aparecer na sua conta fecha o ciclo e dá a confiança que nenhum texto dá.' },
        ],
      },
      {
        id: 'rotina',
        label: 'Criar rotina',
        cor: '#8B5CF6',
        resumo: 'O passo que quase todo mundo pula',
        filhos: [
          { label: 'Programar o segundo aporte', desc: 'Antes de fechar o app. Sem isso, a maioria abre a conta, aporta uma vez e nunca volta.' },
          { label: 'Data fixa', desc: 'No dia do salário, com valor definido. Aporte que depende de sobrar não acontece.' },
          { label: 'Não conferir todo dia', desc: 'Olhar demais é a porta de entrada da ansiedade e das decisões ruins.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'A desculpa mais comum para não começar é "o valor que eu consigo guardar não muda nada". A calculadora existe para desmontar exatamente essa frase, com o seu número real.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Deixe o aporte inicial em R$ 0 — você está começando do zero mesmo',
      'Digite o valor que você consegue guardar por mês, mesmo que sejam R$ 50',
      'Use 0,8% ao mês como referência conservadora',
      'Compare o resultado em 10, 20 e 30 anos e repare quanto do total não é dinheiro seu',
    ],
    exemploGuiado:
      'Exemplo: R$ 50 por mês a 0,8% ao mês. Em 10 anos, cerca de R$ 9.700, sendo R$ 6.000 de aporte. Em 30 anos, mais de R$ 74 mil, sendo apenas R$ 18 mil de aporte — o resto é juro sobre juro. O valor mensal não é o que decide; o tempo é.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual a ordem correta antes de investir?', verso: 'Primeiro quitar dívida cara, depois montar reserva de emergência, só então investir para crescer. Inverter a ordem custa dinheiro garantido.' },
    { id: 'fc2', frente: 'O que é o suitability?', verso: 'O questionário que define seu perfil de investidor na corretora. Responder com honestidade é proteção sua, não burocracia.' },
    { id: 'fc3', frente: 'Com quanto dá para começar?', verso: 'Cerca de R$ 30 no Tesouro Direto, ou o preço de uma ação no fracionário. O obstáculo real nunca foi o valor mínimo.' },
    { id: 'fc4', frente: 'Onde fazer o primeiro aporte?', verso: 'Tesouro Selic ou CDB de liquidez diária pagando perto de 100% do CDI. Simples, líquido e sem oscilação.' },
    { id: 'fc5', frente: 'Qual passo quase todo mundo pula?', verso: 'Programar o segundo aporte antes de fechar o app. É o que separa quem abriu uma conta de quem virou investidor.' },
    { id: 'fc6', frente: 'Por que não escolher corretora por propaganda?', verso: 'Porque o que importa é custo zero e registro na CVM. Propaganda não diz nada sobre nenhum dos dois.' },
  ],

  quiz: [
    {
      pergunta: 'Você tem R$ 2.000 guardados e uma dívida de R$ 2.000 no rotativo do cartão. O que fazer?',
      alternativas: ['Investir os R$ 2.000 em Tesouro Selic', 'Quitar a dívida do rotativo', 'Dividir metade em cada', 'Investir em ações para render mais rápido'],
      correta: 1,
      explicacao: 'O rotativo cobra muito mais do que qualquer investimento rende. Quitá-lo é o único movimento com retorno garantido nessa situação.',
    },
    {
      pergunta: 'Por que responder o suitability com honestidade?',
      alternativas: ['É exigência da Receita Federal', 'Porque ele libera produtos compatíveis com o seu perfil e é uma proteção sua', 'Porque define quanto imposto você paga', 'Não faz diferença nenhuma'],
      correta: 1,
      explicacao: 'O questionário existe para impedir que você seja empurrado a produtos incompatíveis com seu conhecimento e sua tolerância a risco. Mentir só remove a proteção.',
    },
    {
      pergunta: 'Qual é o melhor primeiro investimento para quem está começando?',
      alternativas: ['Ações de empresas conhecidas', 'Criptomoedas, que rendem mais', 'Tesouro Selic ou CDB de liquidez diária', 'Um fundo multimercado do banco'],
      correta: 2,
      explicacao: 'O primeiro aporte precisa ser simples, líquido e sem oscilação. O objetivo é criar o hábito e a confiança, não maximizar retorno.',
    },
    {
      pergunta: 'Qual atitude mais aumenta a chance de continuar investindo?',
      alternativas: ['Acompanhar a cotação todos os dias', 'Programar o próximo aporte no dia do pagamento', 'Escolher o investimento de maior rentabilidade histórica', 'Entrar em grupos de dicas'],
      correta: 1,
      explicacao: 'A automação do aporte tira a decisão do caminho todo mês. É o único hábito que funciona de forma consistente para praticamente todo mundo.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso ter reserva completa antes de comprar qualquer coisa?',
      resposta: 'Reserva completa, não. Mas pelo menos uma reserva inicial, sim. Sem nenhum colchão, a primeira emergência te obriga a resgatar investimento em queda — e essa é a forma mais comum de alguém desistir de investir.',
    },
    {
      pergunta: 'Qual corretora escolher?',
      resposta: 'Qualquer uma com corretagem e custódia zeradas e registro ativo na CVM. Comparar custo e verificar registro resolve 90% da decisão; o resto é preferência de interface.',
    },
    {
      pergunta: 'Meu banco me ofereceu um fundo. Aceito?',
      resposta: 'Leia a lâmina antes: taxa de administração, benchmark e prazo de resgate. Fundo de renda fixa com taxa acima de 1% ao ano dificilmente vence o Tesouro Selic comprado direto, sem intermediário.',
    },
  ],
}
