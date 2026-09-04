import type { Modulo } from '@/types'

export const moduloViesesComportamentais: Modulo = {
  id: 'vieses-comportamentais',
  trilhaId: 'fundamentos',
  numero: 6,
  titulo: 'Vieses Comportamentais',
  subtitulo: 'Atalhos mentais que falham com dinheiro',
  iconName: 'Shuffle',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Vieses são atalhos que o cérebro usa para decidir rápido. Funcionam bem na vida cotidiana e falham de forma previsível quando o assunto envolve dinheiro, probabilidade e prazo longo. Não são burrice: são o mesmo mecanismo que permite atravessar a rua sem calcular a velocidade dos carros.',
    porQueImporta:
      'Viés não se elimina com força de vontade. Se elimina com processo. Quem sabe o nome do erro consegue montar a regra que o neutraliza — e essa regra, escrita antes, é o que resiste ao momento em que a emoção assume.',
    naPratica:
      'A perda dói cerca do dobro do prazer de ganhar o mesmo valor. Essa assimetria explica dois comportamentos que aparecem em quase toda carteira: segurar a ação que caiu esperando "voltar ao preço que paguei", e vender rápido a que subiu para "garantir o lucro". O resultado é uma carteira que acumula perdedores e descarta vencedores — exatamente o oposto do que faria sentido.',
    passoAPasso: [
      'Escolha os três vieses que mais se parecem com você',
      'Escreva a regra antídoto de cada um, em uma frase',
      'Comece um diário de decisões: o que decidi, por quê, o que esperava',
      'Revise esse diário a cada seis meses e compare com o que aconteceu',
      'Automatize tudo que puder — aporte automático neutraliza vários vieses de uma vez',
    ],
    errosComuns: [
      'Achar que conhecer o viés já basta para não cair nele',
      'Confundir sorte com competência nos próprios acertos',
      'Procurar apenas informação que confirma a opinião já formada',
      'Aumentar muito a posição depois de um acerto',
      'Insistir em uma posição perdedora por causa do que já foi perdido',
    ],
    comparativo: {
      titulo: 'Viés, como aparece e o antídoto',
      linhas: [
        { label: 'Aversão à perda', valor: 'Segura o perdedor, vende o vencedor · regra de venda escrita antes' },
        { label: 'Ancoragem', valor: '"Só vendo pelo que paguei" · o preço de compra é irrelevante hoje' },
        { label: 'Confirmação', valor: 'Só lê quem concorda · procurar a tese contrária de propósito' },
        { label: 'Manada', valor: 'Compra porque todos compram · a tese é sua ou emprestada?' },
        { label: 'Excesso de confiança', valor: 'Acerta e dobra a aposta · limite fixo por ativo' },
        { label: 'Custo afundado', valor: '"Já perdi tanto que vou até o fim" · decidir olhando só o futuro' },
        { label: 'Viés do presente', valor: 'Adia o aporte, antecipa o consumo · automatizar' },
      ],
    },
    checklist: [
      'Identifiquei os três vieses que mais me afetam',
      'Escrevi a regra antídoto de cada um',
      'Comecei um diário de decisões',
      'Automatizei meu aporte mensal',
      'Defini limite máximo por ativo na carteira',
    ],
    livroRelacionado: {
      livroId: 'rapido-e-devagar',
      textoConexao: 'Kahneman é a fonte acadêmica por trás de praticamente todo viés cognitivo listado neste módulo — do excesso de confiança à aversão à perda — com o rigor de décadas de pesquisa em psicologia comportamental.',
    },
  },

  mapaMental: {
    label: 'Vieses Comportamentais',
    subtitulo: 'Atalhos mentais que funcionam na vida e falham com dinheiro',
    ramos: [
      {
        id: 'perda',
        label: 'Perda',
        cor: '#EF4444',
        resumo: 'Perder dói o dobro',
        filhos: [
          {
            label: 'Aversão à perda',
            desc: 'A dor de perder pesa cerca do dobro do prazer de ganhar o mesmo valor.',
            netos: [
              { label: 'Como aparece', desc: 'Segura a ação caindo e vende rápido a que subiu. A carteira acumula perdedores.' },
              { label: 'Antídoto', desc: 'Regra de venda escrita antes de comprar, com critério de fundamento e não de preço.' },
            ],
          },
          { label: 'Custo afundado', desc: '"Já perdi tanto que agora vou até o fim." O dinheiro perdido não volta pela sua insistência.' },
          { label: 'Efeito posse', desc: 'O que é seu parece valer mais só por ser seu. Vale para ação, imóvel e carro.' },
          { label: 'Medo de arrepender', desc: 'Não decidir para não errar. Não decidir também é decisão, e costuma ser a mais cara.' },
        ],
      },
      {
        id: 'percepcao',
        label: 'Percepção',
        cor: '#3B82F6',
        resumo: 'O que você vê e o que existe',
        filhos: [
          { label: 'Ancoragem', desc: 'O primeiro número visto vira referência. "Comprei a 30, só vendo a 30" — mas o mercado não sabe quanto você pagou.' },
          { label: 'Viés de confirmação', desc: 'Procurar só o que concorda com a sua opinião. O antídoto é buscar de propósito a tese contrária.' },
          { label: 'Viés retrospectivo', desc: '"Eu sabia que ia cair", depois que caiu. O antídoto é anotar a previsão antes.' },
          { label: 'Disponibilidade', desc: 'O que aparece muito na mídia parece mais provável do que realmente é.' },
        ],
      },
      {
        id: 'social',
        label: 'Social',
        cor: '#EC4899',
        resumo: 'O erro que vem em grupo',
        filhos: [
          { label: 'Efeito manada', desc: 'Comprar porque todo mundo está comprando. É o motor de toda bolha da história.' },
          { label: 'Prova social', desc: 'Muita gente falando bem parece prova de qualidade. Não é — é apenas muita gente falando.' },
          { label: 'Autoridade', desc: 'Aceitar sem checar porque quem falou é famoso, usa terno ou tem muitos seguidores.' },
          { label: 'FOMO', desc: 'Medo de ficar de fora. É aversão à perda vestida de oportunidade.' },
        ],
      },
      {
        id: 'tempo',
        label: 'Tempo',
        cor: '#FFC93C',
        resumo: 'Hoje pesa demais',
        filhos: [
          {
            label: 'Viés do presente',
            desc: 'Prazer agora vale mais que um ganho maior depois. É por isso que o aporte é adiado e o consumo não.',
            netos: [
              { label: 'Antídoto', desc: 'Automatizar o aporte, retirando a decisão do momento em que a tentação existe.' },
            ],
          },
          { label: 'Otimismo irreal', desc: 'Achar que o azar acontece com os outros. Explica ausência de reserva e de seguro.' },
          { label: 'Contabilidade mental', desc: 'Tratar 13º e restituição como dinheiro "extra", quando é dinheiro igual a qualquer outro.' },
        ],
      },
      {
        id: 'ego',
        label: 'Ego',
        cor: '#8B5CF6',
        resumo: 'O acerto que vira armadilha',
        filhos: [
          { label: 'Excesso de confiança', desc: 'Acertar uma vez e aumentar muito a posição na próxima. O antídoto é limite fixo por ativo.' },
          { label: 'Ilusão de controle', desc: 'Achar que acompanhar mais gráficos melhora o resultado. Costuma piorar.' },
          { label: 'Viés de sobrevivência', desc: 'Só ouvimos falar de quem deu certo. Quem quebrou não dá entrevista nem escreve livro.' },
          { label: 'Diário de decisões', desc: 'O antídoto geral: registrar o que decidiu, por quê e o que esperava. Revisar em seis meses cura mais viés que qualquer texto.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Juros Compostos',
    intro:
      'O custo dos vieses é difícil de ver porque ele não aparece no extrato — aparece na diferença entre o que você teria e o que você tem. A simulação aqui é do investidor que para de aportar nas crises.',
    passos: [
      'Abra Ferramentas → Juros Compostos',
      'Simule 20 anos de aporte mensal constante com taxa de 0,8% ao mês',
      'Anote o resultado final',
      'Simule agora apenas 16 anos com o mesmo aporte, representando 4 anos parados durante crises',
      'Compare os dois números: a diferença é o custo comportamental',
    ],
    exemploGuiado:
      'Exemplo: R$ 500 por mês por 20 anos passam de R$ 290 mil. Os mesmos R$ 500 por 16 anos, porque a pessoa parou de aportar durante quatro anos de crise, ficam perto de R$ 190 mil. São R$ 100 mil de diferença sem que nenhuma escolha de ativo tenha mudado. O erro não foi na análise, foi no comportamento.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é aversão à perda?', verso: 'A dor de perder pesa cerca do dobro do prazer de ganhar o mesmo valor. Faz o investidor segurar perdedores e vender vencedores.' },
    { id: 'fc2', frente: 'O que é ancoragem?', verso: 'Usar um número de referência irrelevante para decidir, como o preço que você pagou. O mercado não sabe nem se importa com o seu preço médio.' },
    { id: 'fc3', frente: 'Como neutralizar o viés de confirmação?', verso: 'Procurando de propósito a tese contrária antes de decidir. Se você não consegue defender o outro lado, ainda não entendeu o assunto.' },
    { id: 'fc4', frente: 'O que é custo afundado?', verso: 'Insistir numa decisão ruim por causa do que já foi gasto ou perdido. A decisão correta olha só o futuro, nunca o passado.' },
    { id: 'fc5', frente: 'Qual o antídoto do viés do presente?', verso: 'Automatizar. Aporte programado retira a decisão do momento em que a tentação de gastar existe.' },
    { id: 'fc6', frente: 'O que é viés de sobrevivência?', verso: 'Formar opinião só a partir dos casos que deram certo, porque os que fracassaram não aparecem. Faz qualquer estratégia parecer mais confiável do que é.' },
  ],

  quiz: [
    {
      pergunta: 'Você segura uma ação em queda dizendo "só vendo quando voltar ao que paguei". Qual viés é esse?',
      alternativas: ['Efeito manada', 'Ancoragem combinada com aversão à perda', 'Excesso de confiança', 'Viés de disponibilidade'],
      correta: 1,
      explicacao: 'O preço que você pagou é uma âncora irrelevante para a decisão de hoje, e a recusa em realizar a perda é aversão à perda. A pergunta correta é: eu compraria essa ação hoje, neste preço?',
    },
    {
      pergunta: 'Um investidor acerta uma operação e triplica o tamanho da próxima posição. Qual viés está agindo?',
      alternativas: ['Custo afundado', 'Excesso de confiança', 'Viés retrospectivo', 'Ancoragem'],
      correta: 1,
      explicacao: 'Um acerto isolado não prova competência — pode ter sido sorte. Aumentar muito a posição depois de um acerto é excesso de confiança, e o antídoto é ter limite fixo por ativo.',
    },
    {
      pergunta: 'Qual é o antídoto mais eficaz contra a maioria dos vieses?',
      alternativas: ['Ler mais notícias', 'Regras escritas antes da decisão e automação dos aportes', 'Acompanhar o mercado diariamente', 'Seguir analistas experientes'],
      correta: 1,
      explicacao: 'Viés não se vence com informação, se vence com processo. Regra definida em momento calmo e aporte automático removem a decisão do momento emocional.',
    },
    {
      pergunta: 'Você lê apenas análises que concordam com a sua tese. Qual viés é esse?',
      alternativas: ['Viés de confirmação', 'Efeito manada', 'Contabilidade mental', 'Aversão à perda'],
      correta: 0,
      explicacao: 'Viés de confirmação é a tendência de buscar e valorizar informação que sustenta o que já se acredita, descartando o que contradiz.',
    },
  ],

  faq: [
    {
      pergunta: 'Dá para eliminar os vieses?',
      resposta: 'Não. Eles são parte do funcionamento normal do cérebro e continuam agindo mesmo em quem os estuda. O que dá para fazer é criar regras e automações que reduzem o número de decisões tomadas no calor do momento.',
    },
    {
      pergunta: 'O diário de decisões funciona mesmo?',
      resposta: 'É a ferramenta mais eficaz e a menos usada. Registrar o que você decidiu, por quê e o que esperava impede o viés retrospectivo — aquele "eu sabia" que aparece depois. Revisar em seis meses mostra padrões que você não veria de outro jeito.',
    },
    {
      pergunta: 'Conhecer os vieses me deixa imune?',
      resposta: 'Infelizmente não, e achar que sim é excesso de confiança. Conhecer ajuda a reconhecer o padrão depois, e principalmente a construir a regra antes. A proteção vem da regra, não do conhecimento.',
    },
  ],
}
