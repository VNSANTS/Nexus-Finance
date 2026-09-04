import type { Modulo } from '@/types'

export const moduloAcoes: Modulo = {
  id: 'acoes',
  trilhaId: 'acoes-bolsa',
  numero: 3,
  titulo: 'Ações',
  subtitulo: 'O que você comprou quando comprou uma ação',
  iconName: 'TrendingUp',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Uma ação é a menor fração da propriedade de uma empresa. Comprando uma, você vira sócio: tem direito a uma parte do lucro distribuído e do patrimônio, na proporção do que possui. O retorno vem de duas fontes, a valorização da sua fatia e os proventos que a empresa paga.',
    porQueImporta:
      'A diferença entre quem ganha e quem perde dinheiro em bolsa raramente está na escolha da ação. Está em uma frase: quem entende que é sócio carrega a posição numa queda e continua aportando; quem entende que comprou "um papel que sobe e desce" vende no fundo. Toda a diferença de resultado de longo prazo mora aí.',
    naPratica:
      'O preço de uma ação não diz se ela é cara ou barata. Uma ação de R$ 5 pode ser muito mais cara que uma de R$ 50 — depende de quantas existem e de quanto a empresa lucra. Também vale separar duas coisas que costumam ser confundidas: empresa boa e investimento bom não são a mesma coisa. Pagar caro demais por uma empresa excelente também dá prejuízo. E o preço reflete expectativa de lucros futuros, não desempenho passado — por isso ação boa cai quando a empresa apenas confirma o esperado.',
    passoAPasso: [
      'Entenda que a ação é participação, não bilhete de aposta',
      'Identifique as duas fontes de retorno: valorização e proventos',
      'Verifique se o dinheiro que você vai usar pode ficar aplicado por 5 anos ou mais',
      'Escreva sua tese em três linhas: por que comprei, o que precisa dar certo, o que me faria vender',
      'Comece pequeno, no fracionário, e acompanhe resultado trimestral em vez de cotação diária',
    ],
    errosComuns: [
      'Confundir empresa conhecida com bom investimento',
      'Achar que ação com preço baixo em reais é ação barata',
      'Vender na primeira queda forte',
      'Comprar depois de uma queda sem entender o motivo dela',
      'Investir em ações dinheiro que será necessário em menos de 5 anos',
    ],
    comparativo: {
      titulo: 'Tipos de ação na B3',
      linhas: [
        { label: 'ON (final 3)', valor: 'Direito a voto · tag along mínimo de 80% por lei' },
        { label: 'PN (final 4)', valor: 'Sem voto · preferência na distribuição de lucro' },
        { label: 'Unit (final 11)', valor: 'Pacote que junta ON e PN em um só papel' },
        { label: 'BDR', valor: 'Recibo de ação estrangeira, negociado aqui em reais' },
      ],
    },
    checklist: [
      'Entendi que comprar ação é virar sócio da empresa',
      'Sei de onde vem o retorno: valorização e proventos',
      'Confirmei que meu dinheiro pode ficar 5 anos ou mais aplicado',
      'Escrevi minha tese em três linhas',
      'Defini o que me faria vender, antes de comprar',
    ],
    livroRelacionado: {
      livroId: 'pai-rico-pai-pobre',
      textoConexao:
        'Ação é o exemplo mais direto do que Kiyosaki chama de ativo: um bem que coloca dinheiro no seu bolso sem exigir o seu tempo, através do lucro que a empresa gera.',
    },
  },

  mapaMental: {
    label: 'Ações',
    subtitulo: 'Comprar ação é virar sócio de uma empresa — com tudo que isso implica',
    ramos: [
      {
        id: 'oque',
        label: 'O que você comprou',
        cor: '#EC4899',
        resumo: 'Participação, não bilhete',
        filhos: [
          { label: 'Fração da empresa', desc: 'Direito sobre lucro e patrimônio, na proporção do que você tem. Se a empresa vale mais, sua fatia vale mais.' },
          {
            label: 'Direitos do acionista',
            desc: 'Receber proventos, votar em assembleia no caso das ON, e ser tratado conforme as regras do segmento de listagem.',
            netos: [
              { label: 'Tag along', desc: 'Se o controlador vender a empresa, você tem direito de vender junto por um percentual do mesmo preço.' },
              { label: 'Novo Mercado', desc: 'Segmento com as regras de governança mais rígidas da B3, incluindo só ações ON e tag along de 100%.' },
            ],
          },
          { label: 'Free float', desc: 'A fatia das ações que está em mãos do público. Quanto menor, menos líquida e mais sujeita a oscilação brusca.' },
        ],
      },
      {
        id: 'retorno',
        label: 'De onde vem o retorno',
        cor: '#22C55E',
        resumo: 'Duas fontes, não uma',
        filhos: [
          { label: 'Valorização', desc: 'A empresa passa a valer mais e sua fatia acompanha. Só vira dinheiro quando você vende.' },
          { label: 'Proventos', desc: 'Dividendos e juros sobre capital próprio: parte do lucro distribuída aos sócios, sem precisar vender nada.' },
          { label: 'Recompra de ações', desc: 'A empresa compra as próprias ações e as cancela, aumentando a fatia de quem ficou.' },
          { label: 'Reinvestimento', desc: 'Lucro que fica na empresa para crescer. Não aparece no seu bolso hoje, mas constrói o valor de amanhã.' },
        ],
      },
      {
        id: 'preco',
        label: 'Preço',
        cor: '#3B82F6',
        resumo: 'Expectativa, não histórico',
        filhos: [
          { label: 'Preço é expectativa', desc: 'O mercado precifica os lucros que espera do futuro. Por isso uma empresa pode cair mesmo divulgando lucro recorde, se o esperado era mais.' },
          {
            label: 'Preço unitário não diz nada',
            desc: 'Ação de R$ 5 não é mais barata que a de R$ 50. Depende de quantas existem e de quanto a empresa lucra.',
            netos: [
              { label: 'O que comparar', desc: 'Valor de mercado e múltiplos como P/L. O preço da tela, sozinho, é informação vazia.' },
            ],
          },
          { label: 'Empresa boa ≠ investimento bom', desc: 'Pagar caro demais por uma empresa excelente também dá prejuízo. O preço faz parte da análise.' },
          { label: 'Volatilidade', desc: 'O preço balança todo dia; o valor do negócio não muda na mesma velocidade. A diferença entre os dois é onde mora a oportunidade.' },
        ],
      },
      {
        id: 'tipos',
        label: 'Tipos de ação',
        cor: '#FFC93C',
        resumo: 'ON, PN, unit e BDR',
        filhos: [
          { label: 'ON — final 3', desc: 'Ordinária. Dá direito a voto em assembleia e, por lei, tag along mínimo de 80%.' },
          { label: 'PN — final 4', desc: 'Preferencial. Sem voto, mas com preferência na distribuição de lucro e, às vezes, dividendo mínimo.' },
          { label: 'Unit — final 11', desc: 'Pacote que junta ON e PN num único papel negociado.' },
          { label: 'BDR', desc: 'Recibo de ação estrangeira negociado na B3, em reais, sem precisar de conta no exterior.' },
        ],
      },
      {
        id: 'riscos',
        label: 'Riscos',
        cor: '#EF4444',
        resumo: 'O que pode dar errado',
        filhos: [
          { label: 'Risco do negócio', desc: 'A empresa pode perder mercado, errar a estratégia, se endividar demais ou quebrar.' },
          { label: 'Risco de governança', desc: 'Controlador que age contra o minoritário destrói valor rápido — e é o risco mais difícil de recuperar.' },
          { label: 'Risco de preço', desc: 'Comprar no auge do otimismo. Uma boa empresa comprada cara pode levar anos para dar retorno.' },
          { label: 'Risco de prazo', desc: 'Precisar do dinheiro num ano ruim. É o único risco totalmente sob seu controle: basta não investir em ações o que você vai usar em breve.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'Renda variável exige prazo, e a melhor forma de entender isso é ver o efeito do tempo com uma taxa realista. Só que a curva suave da calculadora esconde algo importante — e é essa diferença que o exercício aqui quer mostrar.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Use um aporte mensal realista para você',
      'Aplique uma taxa conservadora para renda variável de longo prazo, entre 0,7% e 0,9% ao mês',
      'Compare o resultado em 5, 10 e 20 anos',
      'Agora imagine dois anos negativos de 25% no meio do caminho e pergunte-se: eu teria continuado aportando?',
    ],
    exemploGuiado:
      'Exemplo: R$ 500 por mês a 0,8% ao mês por 20 anos passam de R$ 290 mil. Mas essa curva nunca é lisa na vida real. Haverá anos de queda de 20% ou 30%, e é exatamente neles que a maioria para de aportar ou vende. O resultado final depende muito mais dessa decisão do que da escolha da ação.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é uma ação?', verso: 'A menor fração da propriedade de uma empresa. Comprando uma, você vira sócio e tem direito a parte do lucro distribuído e do patrimônio.' },
    { id: 'fc2', frente: 'Quais são as duas fontes de retorno de uma ação?', verso: 'A valorização da sua fatia e os proventos distribuídos pela empresa, como dividendos e juros sobre capital próprio.' },
    { id: 'fc3', frente: 'Ação de R$ 5 é mais barata que ação de R$ 50?', verso: 'Não necessariamente. O preço unitário não diz nada sozinho — depende de quantas ações existem e de quanto a empresa lucra.' },
    { id: 'fc4', frente: 'O que é tag along?', verso: 'O direito de vender sua ação junto com o controlador, por um percentual do preço que ele recebeu, caso a empresa seja vendida. Nas ON é de no mínimo 80% por lei.' },
    { id: 'fc5', frente: 'Qual a diferença entre ON e PN?', verso: 'ON dá direito a voto em assembleia e mais tag along. PN não vota, mas tem preferência na distribuição de lucro.' },
    { id: 'fc6', frente: 'Qual o prazo mínimo recomendado para investir em ações?', verso: 'Cinco anos ou mais. Abaixo disso, a chance de precisar vender num período de queda é grande demais.' },
  ],

  quiz: [
    {
      pergunta: 'A empresa divulgou lucro recorde e a ação caiu 8%. Como isso é possível?',
      alternativas: ['Houve erro na bolsa', 'O preço reflete expectativa: o mercado esperava um resultado ainda melhor', 'Lucro alto sempre derruba a ação', 'A empresa deve ter mentido no balanço'],
      correta: 1,
      explicacao: 'O preço já embutia uma expectativa. Se o resultado vem bom, mas abaixo do que se esperava, o ajuste é para baixo. Preço é expectativa futura, não retrato do passado.',
    },
    {
      pergunta: 'Qual dinheiro NÃO deve ir para ações?',
      alternativas: ['O que você não vai precisar nos próximos 10 anos', 'A entrada do apartamento que você compra ano que vem', 'Um valor pequeno para aprender', 'O aporte mensal da aposentadoria'],
      correta: 1,
      explicacao: 'Dinheiro com data próxima não pode ficar sujeito a oscilação. Um ano ruim bem na hora do uso transforma volatilidade em prejuízo real.',
    },
    {
      pergunta: 'O que significa "empresa boa não é o mesmo que investimento bom"?',
      alternativas: ['Que empresas boas costumam dar prejuízo', 'Que o preço pago faz parte do resultado: pagar caro demais por uma ótima empresa também gera perda', 'Que só empresas ruins valem a pena', 'Que a qualidade da empresa é irrelevante'],
      correta: 1,
      explicacao: 'Qualidade e preço são duas variáveis diferentes. Uma excelente empresa comprada em um momento de euforia pode levar muitos anos para justificar o preço pago.',
    },
    {
      pergunta: 'O que é free float?',
      alternativas: ['O lucro distribuído aos acionistas', 'A parcela das ações em circulação nas mãos do público', 'A variação diária do preço', 'O total de ações emitidas'],
      correta: 1,
      explicacao: 'Free float é o percentual das ações efetivamente negociado no mercado, fora das mãos de controladores. Quanto menor, menor a liquidez e maior a oscilação.',
    },
  ],

  faq: [
    {
      pergunta: 'Quantas ações diferentes devo ter?',
      resposta: 'Não existe número mágico, mas a partir de 10 a 15 empresas de setores diferentes o benefício adicional de diversificar cai bastante. Mais importante que a quantidade é não ter 15 empresas do mesmo setor.',
    },
    {
      pergunta: 'Se a ação cair 30%, devo comprar mais?',
      resposta: 'Só se a queda for de preço e não de fundamento. A pergunta certa é: o motivo pelo qual eu comprei ainda existe? Se sim, queda é oportunidade. Se a tese quebrou, comprar mais é aumentar o erro.',
    },
    {
      pergunta: 'Posso perder mais do que investi?',
      resposta: 'Comprando ações à vista, não — o máximo é o valor aplicado. Isso muda completamente se você operar alavancado ou vender opções descobertas, que são justamente as operações onde se perde mais do que se tem.',
    },
  ],
}
