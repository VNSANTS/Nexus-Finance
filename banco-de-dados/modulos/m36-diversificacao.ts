import type { Modulo } from '@/types'

export const moduloDiversificacao: Modulo = {
  id: 'diversificacao',
  trilhaId: 'estrategia-gestao',
  numero: 3,
  titulo: 'Diversificação',
  subtitulo: 'Vinte ações do mesmo setor não é diversificar',
  iconName: 'PieChart',
  duracaoMin: 10,

  aprender: {
    oQueE:
      'Diversificar é distribuir o dinheiro entre ativos que reagem de formas diferentes ao mesmo acontecimento. A palavra-chave é essa: diferentes. Ter quinze ações que sobem e caem juntas não é uma carteira diversificada, é uma aposta grande dividida em quinze pedaços.',
    porQueImporta:
      'É a única coisa em investimentos que reduz risco sem reduzir o retorno esperado na mesma proporção. Não existe muita coisa assim — por isso costuma ser chamada de o almoço mais próximo de grátis que o mercado oferece. E é gratuita: não exige acertar previsão nenhuma.',
    naPratica:
      'A diversificação real acontece em quatro dimensões: classe de ativo, setor, emissor e moeda. A maioria das pessoas diversifica só na primeira e acha que está protegida. Três exemplos de concentração escondida que aparecem o tempo todo: ter três fundos diferentes que compram as mesmas ações; ter CDBs de cinco bancos, mas todos acima do limite do FGC; e ter salário, plano de saúde e ações da mesma empresa, o que significa perder tudo ao mesmo tempo se ela quebrar.',
    passoAPasso: [
      'Liste todos os seus ativos em uma folha só',
      'Agrupe por classe, por setor, por moeda e por emissor',
      'Procure concentrações escondidas nesses quatro agrupamentos',
      'Some sua exposição ao empregador: salário, benefícios e ações da mesma empresa',
      'Diversifique na dimensão que estiver mais concentrada, não na que já está bem',
    ],
    errosComuns: [
      'Pulverizar demais: 30 ativos que você não consegue acompanhar',
      'Diversificar só dentro da mesma classe de ativo',
      'Concentrar acima do limite do FGC no mesmo emissor',
      'Esquecer que o próprio salário é exposição a um setor',
      'Comprar fundos diferentes que carregam as mesmas ações',
    ],
    comparativo: {
      titulo: 'Diversificação real x aparente',
      linhas: [
        { label: '15 bancos brasileiros', valor: 'Aparente · uma crise bancária derruba todos' },
        { label: '3 fundos com as mesmas ações', valor: 'Aparente · mesma exposição, três taxas' },
        { label: 'Ações + renda fixa + FII + internacional', valor: 'Real · reagem de formas diferentes' },
        { label: 'CDBs de 5 bancos dentro do FGC', valor: 'Real · risco de emissor distribuído' },
      ],
    },
    checklist: [
      'Listei todos os meus ativos em um só lugar',
      'Agrupei por classe, setor, moeda e emissor',
      'Identifiquei minha maior concentração escondida',
      'Calculei minha exposição total ao empregador',
      'Sei que diversificar não elimina o risco de mercado',
    ],
    livroRelacionado: {
      livroId: 'investidor-inteligente',
      textoConexao: 'Graham defende a diversificação como parte da margem de segurança de um investidor — mas alerta que ela só funciona de verdade quando os ativos não estão escondidamente correlacionados, exatamente o ponto central deste módulo.',
    },
  },

  mapaMental: {
    label: 'Diversificação',
    subtitulo: 'Não colocar tudo no mesmo lugar — e entender o que "lugar" significa',
    ramos: [
      {
        id: 'classe',
        label: 'Por classe',
        cor: '#00D4FF',
        resumo: 'A dimensão que todo mundo conhece',
        filhos: [
          { label: 'As classes', desc: 'Renda fixa, ações, imobiliário, internacional, alternativos. Cada uma reage de um jeito ao mesmo cenário.' },
          {
            label: 'Correlação',
            desc: 'Quando dois ativos sobem e caem juntos, ter os dois quase não diversifica nada.',
            netos: [
              { label: 'Correlação baixa', desc: 'É o que se procura: ativos cujo comportamento não depende um do outro.' },
              { label: 'Em crise', desc: 'As correlações tendem a subir justamente na crise, que é quando você mais precisaria delas baixas.' },
            ],
          },
          { label: 'O objetivo', desc: 'Reduzir o tranco da carteira sem abrir mão do retorno esperado na mesma proporção.' },
        ],
      },
      {
        id: 'setor',
        label: 'Por setor',
        cor: '#EC4899',
        resumo: 'Onde a ilusão é maior',
        filhos: [
          { label: '15 bancos não é diversificado', desc: 'Uma crise de crédito derruba todos ao mesmo tempo. Quantidade não é o mesmo que variedade.' },
          { label: 'Setores diferentes', desc: 'Energia, varejo, commodity, saúde, tecnologia e financeiro reagem a gatilhos distintos.' },
          { label: 'Cíclico x defensivo', desc: 'Cíclicos sofrem mais na crise; defensivos como energia e saneamento sustentam a carteira.' },
          { label: 'Exportador x doméstico', desc: 'Exportadores ganham com dólar alto; empresas de consumo interno perdem. Ter os dois é proteção cambial embutida.' },
        ],
      },
      {
        id: 'emissor',
        label: 'Por emissor',
        cor: '#EF4444',
        resumo: 'A concentração que ninguém vê',
        filhos: [
          { label: 'Limite do FGC', desc: 'Em renda fixa bancária, respeitar o teto por CPF e por instituição e dividir entre bancos diferentes.' },
          { label: 'Fundos com os mesmos ativos', desc: 'Três fundos de ações diferentes podem carregar praticamente a mesma carteira. Você paga três taxas pela mesma exposição.' },
          {
            label: 'O empregador',
            desc: 'Salário, plano de saúde e ações da mesma empresa significam perder tudo ao mesmo tempo se ela quebrar.',
            netos: [
              { label: 'Programas de ações', desc: 'Vale participar, mas com regra de venda: não deixar a posição crescer sem limite só porque veio "de graça".' },
            ],
          },
        ],
      },
      {
        id: 'moeda',
        label: 'Por moeda e geografia',
        cor: '#3B82F6',
        resumo: 'Você já é 100% Brasil',
        filhos: [
          { label: 'Sua exposição atual', desc: 'Salário, gastos, imóvel e quase todos os ativos estão em real. Isso já é uma aposta concentrada, mesmo sem parecer.' },
          { label: 'Brasil é pequeno', desc: 'Representa uma fração mínima do mercado acionário mundial e é concentrado em commodities e bancos.' },
          { label: 'Como diversificar', desc: 'ETF internacional ou BDR na própria B3, em reais, sem conta no exterior. É o caminho mais simples.' },
        ],
      },
      {
        id: 'limites',
        label: 'Limites',
        cor: '#FFC93C',
        resumo: 'Diversificar demais também custa',
        filhos: [
          { label: 'Pulverização', desc: '30 ativos que você não acompanha não é diversificação, é dispersão. Você perde a capacidade de saber o que tem.' },
          { label: 'Faixa razoável', desc: 'A partir de 10 a 15 ações de setores distintos, o benefício adicional de acrescentar mais uma cai bastante.' },
          { label: 'Risco que não some', desc: 'Diversificar reduz o risco específico de uma empresa. O risco do mercado inteiro permanece, e nenhuma carteira escapa dele.' },
          { label: 'Custo de complexidade', desc: 'Carteira complicada demais deixa de ser mantida. Simplicidade que você consegue seguir vence sofisticação que você abandona.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Rebalanceamento',
    intro:
      'Diversificar não é só escolher ativos diferentes, é manter as proporções ao longo do tempo. A calculadora de rebalanceamento mostra o quanto sua carteira se desalinhou e quanto aportar em cada classe para voltar ao alvo.',
    passos: [
      'Abra Ferramentas → Rebalanceamento',
      'Digite sua alocação alvo por classe: renda fixa, ações, FIIs, internacional',
      'Digite o valor que você tem hoje em cada uma',
      'Veja o desvio de cada classe em relação ao alvo',
      'Informe seu próximo aporte e veja quanto direcionar para cada classe',
    ],
    exemploGuiado:
      'Exemplo: alvo de 60% renda fixa e 40% ações. Depois de um ano de bolsa forte, você está com 50% e 50%. Rebalancear vendendo ações geraria imposto. Direcionando os próximos aportes só para renda fixa, você volta ao alvo sem vender nada e sem pagar IR — é o rebalanceamento por aporte, o melhor método para quem ainda está acumulando.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Ter 15 ações é o mesmo que estar diversificado?', verso: 'Não. Se as 15 forem do mesmo setor, todas caem juntas na mesma crise. Diversificação é sobre reagir de formas diferentes, não sobre quantidade.' },
    { id: 'fc2', frente: 'O que é correlação?', verso: 'A medida de quanto dois ativos se movem juntos. Quanto mais baixa, mais eles diversificam de verdade a carteira.' },
    { id: 'fc3', frente: 'Qual a concentração escondida mais perigosa?', verso: 'A exposição ao empregador: salário, benefícios e ações da mesma empresa. Se ela quebra, você perde renda e patrimônio no mesmo dia.' },
    { id: 'fc4', frente: 'A partir de quantas ações o benefício de diversificar cai?', verso: 'Em torno de 10 a 15 empresas de setores diferentes. Acrescentar a vigésima ação reduz muito pouco o risco e aumenta bastante o trabalho.' },
    { id: 'fc5', frente: 'Diversificação elimina todo o risco?', verso: 'Não. Ela reduz o risco específico de uma empresa ou emissor. O risco do mercado inteiro, o sistêmico, permanece em qualquer carteira.' },
    { id: 'fc6', frente: 'Por que ter três fundos de ações pode não diversificar nada?', verso: 'Porque eles podem carregar praticamente as mesmas empresas. Você acaba pagando três taxas de administração pela mesma exposição.' },
  ],

  quiz: [
    {
      pergunta: 'Qual carteira está mais diversificada?',
      alternativas: ['15 ações de bancos e seguradoras', 'Tesouro Selic, 8 ações de setores diferentes, 3 FIIs e um ETF internacional', '20 ações de empresas de commodities', '5 fundos de ações da mesma gestora'],
      correta: 1,
      explicacao: 'Diversificação real acontece entre classes, setores e moedas. As outras opções concentram em uma única classe ou em setores que reagem aos mesmos gatilhos.',
    },
    {
      pergunta: 'Você trabalha em uma empresa listada, recebe ações dela como bônus e já acumulou 40% do patrimônio nesse papel. Qual o problema?',
      alternativas: ['Nenhum, é vantagem conhecer a empresa por dentro', 'Concentração extrema: se a empresa quebrar, você perde emprego e patrimônio ao mesmo tempo', 'Só o imposto sobre o bônus', 'Que ações de bônus rendem menos'],
      correta: 1,
      explicacao: 'É a concentração mais perigosa que existe, porque as duas perdas acontecem juntas e exatamente quando você mais precisaria de reserva.',
    },
    {
      pergunta: 'O que a diversificação NÃO consegue reduzir?',
      alternativas: ['O risco de uma empresa específica quebrar', 'O risco de um setor entrar em crise', 'O risco de mercado, que atinge quase todos os ativos ao mesmo tempo', 'O risco de um emissor de renda fixa dar calote'],
      correta: 2,
      explicacao: 'O risco sistêmico atinge o mercado inteiro e não desaparece com diversificação. O que o mitiga é horizonte longo e reserva que evita venda forçada.',
    },
    {
      pergunta: 'Qual é o custo de diversificar demais?',
      alternativas: ['Aumenta o risco da carteira', 'Você perde a capacidade de acompanhar o que tem, e o benefício adicional é mínimo', 'Gera mais imposto automaticamente', 'Reduz a liquidez'],
      correta: 1,
      explicacao: 'Passado certo ponto, cada ativo novo quase não reduz risco e aumenta muito o trabalho de acompanhamento. Carteira que você não consegue manter deixa de ser mantida.',
    },
  ],

  faq: [
    {
      pergunta: 'Investir em um ETF de índice já é diversificar?',
      resposta: 'Diversifica dentro daquela classe e daquele mercado, o que já é bastante. Mas um ETF de Ibovespa continua sendo 100% Brasil e 100% ações, concentrado em commodities e bancos. Ele resolve a diversificação por empresa, não a por classe e por moeda.',
    },
    {
      pergunta: 'Quanto devo ter fora do Brasil?',
      resposta: 'Não existe número correto, mas uma faixa entre 10% e 30% aparece com frequência em carteiras equilibradas. O que importa mais que o percentual exato é escolher um, manter e não tentar acertar o momento do câmbio.',
    },
    {
      pergunta: 'Se eu diversificar muito, não vou ganhar menos?',
      resposta: 'Você abre mão de acertar em cheio a melhor aposta, e também de errar em cheio a pior. Historicamente, a redução de risco compensa mais que a redução de retorno esperado — principalmente porque evita a perda grande que faria você desistir de investir.',
    },
  ],
}
