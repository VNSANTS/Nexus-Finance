// m01-criptomoedas.ts
import type { Modulo } from '@/types'

export const criptomoedas: Modulo = {
  id: 'criptomoedas',
  trilhaId: 'alternativos-derivativos',
  numero: 1,
  titulo: 'Criptomoedas',
  subtitulo: 'O que você está comprando de verdade quando compra Bitcoin',
  iconName: 'Bitcoin',
  duracaoMin: 14,

  nivel: 'intermediario',
  preRequisitos: ['alocacao-ativos', 'formacao-investidor'],
  objetivoAprendizagem: 'Você vai sair sabendo como custodiar, declarar e tributar criptoativos no Brasil sem virar estatística de quem perdeu tudo numa exchange.',
  erroFatal: 'Deixar 100% dos criptoativos numa exchange, sem levar nenhuma parte para uma carteira própria (self-custody) — se a exchange quebrar, for hackeada ou tiver os ativos bloqueados judicialmente, você vira credor comum numa fila de recuperação judicial e pode nunca reaver o dinheiro.',
  numeroChave: { valor: 'R$ 35.000', legenda: 'limite mensal de vendas de ações isento de IR — em criptoativos esse limite cai para R$ 5.000 mensais somando todas as moedas, uma diferença que pega muita gente de surpresa na hora de declarar' },
  glossarioDoModulo: ['Blockchain', 'Self-custody (autocustódia)', 'Carteira fria (cold wallet)', 'Exchange', 'Stablecoin', 'Halving', 'Chave privada', 'Volatilidade implícita'],
  proximoPasso: { moduloId: 'reserva-de-valor', motivo: 'Depois de entender como Bitcoin funciona na prática, vale comparar o papel dele como reserva de valor com o do ouro e de outros ativos que competem pela mesma função na carteira.' },

  aprender: {
    oQueE: 'Criptomoedas são ativos digitais registrados numa blockchain, um livro-razão público e distribuído que nenhuma instituição controla sozinha. O Bitcoin nasceu em 2009 como alternativa ao sistema bancário tradicional, com oferta máxima fixa de 21 milhões de unidades; hoje existem milhares de outras moedas (altcoins), com propósitos que vão de reserva de valor a infraestrutura de contratos inteligentes, como o Ethereum. No Brasil, a Receita Federal trata criptoativos como bens patrimoniais para fins de tributação, não como moeda de curso legal.',
    porQueImporta: 'Quem compra cripto sem entender custódia, tributação e volatilidade normalmente comete um de três erros caros: perde a chave privada e perde o ativo para sempre (sem nenhum SAC ou ouvidoria para recorrer), esquece de declarar e cai na malha fina anos depois com multa e juros acumulados, ou compra no pico de euforia de um ciclo e vende no fundo do pânico seguinte. Cripto pode ter espaço numa carteira diversificada, mas exige disciplina e conhecimento técnico que a maioria dos iniciantes claramente subestima.',
    naPratica: 'No Brasil, você compra cripto em exchanges regulamentadas — Mercado Bitcoin, Binance, Foxbit, entre outras — usando Pix ou TED. A Instrução Normativa RFB 1.888 obriga exchanges brasileiras a informar mensalmente suas operações à Receita, e operações em exchanges estrangeiras acima de R$ 30.000 no mês também precisam ser declaradas diretamente por você. Além disso, todo criptoativo em posse em 31 de dezembro entra na Declaração de Ajuste Anual, na ficha de Bens e Direitos, código 81 (criptoativo tipo Bitcoin) ou 89 (outros criptoativos), pelo valor de custo de aquisição. Na venda, o primeiro R$ 5.000 em vendas totais no mês (somando todas as moedas, em todas as exchanges e carteiras) é isento; acima disso, o ganho de capital paga de 15% a 22,5% de IR via DARF, com código de receita 4600, recolhido até o último dia útil do mês seguinte à venda — não existe retenção automática como na fonte de outros investimentos.',
    passoAPasso: [
      'Escolha uma exchange regulamentada no Brasil e complete o cadastro com verificação de identidade (KYC).',
      'Defina antes de comprar o percentual máximo da sua carteira total dedicado a cripto — a maioria dos planejadores recomenda entre 1% e 10%, nunca mais que você aceitaria perder por completo.',
      'Compre aos poucos, em aportes regulares, em vez de uma única compra concentrada tentando acertar o timing do mercado.',
      'Transfira parte relevante do saldo para uma carteira própria (hardware wallet ou carteira de software com backup seguro da seed phrase), especialmente valores que você não vai movimentar no curto prazo.',
      'Registre todas as compras, com data, valor em reais e taxa paga, para calcular o custo médio na hora de declarar.',
      'Ao vender, calcule se o total de vendas do mês (somando tudo) ultrapassa R$ 5.000; se sim, apure o ganho de capital e gere o DARF.',
      'Declare a posição em 31 de dezembro na ficha de Bens e Direitos, mesmo que não tenha vendido nada no ano.'
    ],
    errosComuns: [
      'Guardar a seed phrase (frase de recuperação da carteira) em foto no celular ou em nuvem, expondo-a a qualquer invasão digital.',
      'Comprar posições grandes de uma vez só durante períodos de euforia extrema, sem considerar o histórico de quedas superiores a 70% do Bitcoin em ciclos anteriores.',
      'Confundir o limite de isenção de R$ 35.000 (ações) com o de cripto, que é R$ 5.000 mensais, e deixar de recolher DARF por engano.',
      'Não declarar posições em exchanges estrangeiras, achando que a Receita não tem visibilidade sobre isso.',
      'Manter senhas e acessos de carteira sem nenhum plano de sucessão, deixando herdeiros sem forma de acessar o patrimônio em caso de falecimento.',
      'Tratar altcoins de baixa liquidez e sem histórico como investimento sério, quando na prática funcionam como aposta especulativa de altíssimo risco.'
    ],
    comparativo: {
      titulo: 'Guardar na exchange vs. self-custody (carteira própria)',
      linhas: [
        { label: 'Quem controla a chave privada', valor: 'Exchange: a corretora | Self-custody: você mesmo' },
        { label: 'Risco em caso de falência da empresa', valor: 'Exchange: você vira credor comum, pode perder tudo | Self-custody: risco zero relacionado à empresa' },
        { label: 'Facilidade de uso no dia a dia', valor: 'Exchange: mais simples para comprar/vender | Self-custody: exige mais conhecimento técnico' },
        { label: 'Risco de perda por erro próprio', valor: 'Exchange: baixo (a empresa guarda o acesso) | Self-custody: alto se você perder a seed phrase' },
        { label: 'Recomendação prática', valor: 'Manter na exchange só o necessário para operar, e mover o restante para carteira própria' }
      ]
    },
    checklist: [
      'Defina por escrito o percentual máximo da sua carteira total que vai para cripto.',
      'Configure autenticação de dois fatores (2FA) em todas as exchanges que você usa.',
      'Se tiver mais de um valor pequeno em cripto, pesquise como transferir parte para uma carteira própria (hardware wallet).',
      'Guarde a seed phrase em papel, em local físico seguro, nunca em foto ou nuvem.',
      'Verifique se você já ultrapassou R$ 5.000 em vendas no mês antes de vender mais nada.',
      'Confirme se sua posição em cripto está corretamente declarada na ficha de Bens e Direitos do ano anterior.'
    ],
    livroRelacionado: {
      livroId: 'quit-like-a-millionaire',
      textoConexao: 'Os autores discutem criptoativos como parte de uma carteira diversificada de longo prazo, com o mesmo cuidado prático sobre custódia e risco que este módulo detalha — sem hype, com foco em segurança e limite de exposição.',
    },
    naoConfundirCom: [
      { moduloId: 'reserva-de-valor', diferenca: 'Este módulo foca no funcionamento prático, custódia e tributação de cripto; o módulo de Reserva de Valor compara Bitcoin, ouro e outros ativos pelo papel específico de proteger patrimônio da inflação no longo prazo.' },
      { moduloId: 'opcoes', diferenca: 'Aqui você compra o ativo (cripto) diretamente; Opções é um derivativo que dá direito de comprar ou vender um ativo por um preço combinado, incluindo derivativos sobre cripto em mercados internacionais.' }
    ]
  },

  mapaMental: {
    label: 'Criptomoedas',
    subtitulo: 'Como funcionam, como custodiar e como declarar',
    ramos: [
      {
        id: 'fundamentos',
        label: 'Fundamentos Técnicos',
        cor: '#F59E0B',
        resumo: 'O que é blockchain e como o Bitcoin foi desenhado',
        filhos: [
          { label: 'Blockchain', desc: 'Livro-razão público e distribuído, sem controle centralizado' },
          { label: 'Oferta fixa do Bitcoin', desc: '21 milhões de unidades no total, nunca mais que isso' },
          { label: 'Halving', desc: 'Evento que corta pela metade a emissão de novos Bitcoins a cada ~4 anos' },
          { label: 'Altcoins', desc: 'Moedas além do Bitcoin, com propósitos diferentes (Ethereum, stablecoins, etc.)' }
        ]
      },
      {
        id: 'custodia',
        label: 'Custódia',
        cor: '#3B82F6',
        resumo: 'Onde e como guardar seus criptoativos com segurança',
        filhos: [
          { label: 'Exchange', desc: 'Corretora guarda a chave privada por você; mais simples, mas com risco de contraparte' },
          { label: 'Self-custody', desc: 'Você controla a chave privada diretamente, via carteira própria' },
          {
            label: 'Hardware wallet',
            desc: 'Dispositivo físico dedicado a guardar chaves offline',
            netos: [
              { label: 'Seed phrase', desc: 'Frase de 12 a 24 palavras que recupera a carteira inteira se o dispositivo for perdido' },
              { label: 'Backup físico', desc: 'Guardar a seed phrase em papel, em local seguro, nunca digitalmente' }
            ]
          }
        ]
      },
      {
        id: 'tributacao',
        label: 'Tributação no Brasil',
        cor: '#22C55E',
        resumo: 'Regras da Receita Federal para criptoativos',
        filhos: [
          { label: 'Isenção de R$ 5.000/mês', desc: 'Soma de todas as vendas no mês, todas as moedas, todas as exchanges' },
          { label: 'Alíquotas de 15% a 22,5%', desc: 'Sobre o ganho de capital, progressivas conforme o valor do lucro' },
          { label: 'DARF código 4600', desc: 'Recolhimento manual, até o último dia útil do mês seguinte à venda' },
          { label: 'Instrução Normativa 1.888', desc: 'Obriga exchanges brasileiras a informar operações à Receita automaticamente' }
        ]
      },
      {
        id: 'riscos',
        label: 'Riscos Específicos',
        cor: '#EF4444',
        resumo: 'O que pode dar errado e como mitigar',
        filhos: [
          { label: 'Volatilidade extrema', desc: 'Quedas históricas de mais de 70% já ocorreram em ciclos anteriores' },
          { label: 'Risco de contraparte', desc: 'Falência ou hack de exchange pode significar perda total do saldo lá guardado' },
          { label: 'Perda de chave privada', desc: 'Sem chave, não existe recuperação — nenhuma central de atendimento resolve isso' },
          { label: 'Golpes e projetos fraudulentos', desc: 'Altcoins sem utilidade real, promovidas com promessas de retorno garantido' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você decide como agir em situações reais de quem investe em cripto e vê a consequência prática de cada escolha, do ponto de vista de risco e de tributação.',
    passos: [
      'Leia a situação envolvendo uma decisão real sobre cripto.',
      'Escolha a opção que representa o que você faria.',
      'Veja o resultado explicado de cada escolha, incluindo impacto tributário quando aplicável.'
    ],
    exemploGuiado: 'Você investiu R$ 10.000 em Bitcoin ao longo de 8 meses, em aportes mensais de R$ 1.250. O custo médio de aquisição ficou em R$ 10.000 no total. Passado um ano, o valor de mercado da posição subiu para R$ 16.000 e você decide vender R$ 8.000 num único mês. Cálculo: como a venda de R$ 8.000 ultrapassa o limite de isenção de R$ 5.000, todo o ganho proporcional é tributado. O custo proporcional aos R$ 8.000 vendidos é R$ 5.000 (metade do total investido, já que você vendeu metade da posição), então o ganho de capital é R$ 3.000. Sobre esse ganho, aplica-se a alíquota de 15% (primeira faixa, até R$ 5 milhões de ganho no mês), resultando em R$ 450 de IR devido via DARF, a ser pago até o último dia útil do mês seguinte.',
    cenarioGuiado: [
      {
        pergunta: 'Você tem R$ 15.000 em Bitcoin guardados há dois anos numa exchange e nunca moveu para uma carteira própria.',
        opcoes: [
          { texto: 'Deixo tudo na exchange, é mais prático', resultado: 'Você mantém risco de contraparte total sobre R$ 15.000 — se a exchange tiver problemas, esse valor pode ficar preso ou ser perdido, mesmo sem culpa sua.' },
          { texto: 'Transfiro a maior parte para uma carteira própria, deixando só um pouco na exchange', resultado: 'Você reduz drasticamente o risco de contraparte, mantendo apenas o necessário para operações no curto prazo dentro da exchange.' }
        ]
      },
      {
        pergunta: 'Você vendeu R$ 4.500 em criptoativos em um mês, seu único movimento do ano.',
        opcoes: [
          { texto: 'Não preciso pagar nada nem declarar, já que fiquei abaixo do limite de isenção', resultado: 'Parcialmente correto: você não paga IR sobre o ganho, porque ficou abaixo dos R$ 5.000 mensais — mas ainda precisa declarar a posição remanescente na ficha de Bens e Direitos no fim do ano.' },
          { texto: 'Recolho DARF mesmo assim, por precaução', resultado: 'Não é necessário — abaixo de R$ 5.000 em vendas no mês, o ganho é isento de IR, então gerar DARF nesse caso seria pagamento indevido.' }
        ]
      },
      {
        pergunta: 'Uma altcoin nova, promovida por influenciadores, promete "retorno garantido de 20% ao mês".',
        opcoes: [
          { texto: 'Invisto uma parte pequena, "só para testar"', resultado: 'Promessas de retorno garantido e fixo são a característica clássica de esquemas fraudulentos — nenhum ativo de risco real, cripto incluído, garante retorno fixo, e mesmo um valor pequeno pode ser perda total.' },
          { texto: 'Não invisto e pesquiso se o projeto tem utilidade real e histórico verificável', resultado: 'Postura correta diante de promessas de retorno garantido, que não existem em nenhum ativo de mercado — cripto inclusa.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'cripto-01', frente: 'Qual é o limite mensal de isenção de IR para vendas de criptoativos?', verso: 'R$ 5.000 por mês, somando todas as moedas, todas as exchanges e carteiras — diferente do limite de R$ 35.000 aplicado às ações.' },
    { id: 'cripto-02', frente: 'O que é self-custody?', verso: 'Manter você mesmo o controle da chave privada dos seus criptoativos, em vez de deixá-los custodiados por uma exchange.' },
    { id: 'cripto-03', frente: 'Qual código de receita é usado para pagar o DARF sobre ganho de capital em cripto?', verso: 'Código 4600, com pagamento até o último dia útil do mês seguinte ao da venda.' },
    { id: 'cripto-04', frente: 'O que acontece se você perder a seed phrase de uma carteira própria?', verso: 'Você perde acesso permanente aos criptoativos guardados nela — não existe recuperação de senha como em bancos tradicionais.' },
    { id: 'cripto-05', frente: 'Qual é o principal risco de deixar tudo numa exchange?', verso: 'Risco de contraparte: se a exchange quebrar, for hackeada ou tiver bens bloqueados judicialmente, você pode perder o acesso ao seu saldo.' },
    { id: 'cripto-06', frente: 'O que é o halving do Bitcoin?', verso: 'Um evento programado que corta pela metade a emissão de novos Bitcoins a cada aproximadamente quatro anos.' },
    { id: 'cripto-07', frente: 'Todo criptoativo precisa ser declarado no Imposto de Renda, mesmo sem venda no ano?', verso: 'Sim — a posição em 31 de dezembro deve constar na ficha de Bens e Direitos, mesmo que não tenha havido nenhuma venda naquele ano.' },
    { id: 'cripto-08', frente: 'Qual código é usado na ficha de Bens e Direitos para Bitcoin?', verso: 'Código 81, para criptoativos do tipo Bitcoin; outros criptoativos usam o código 89.' },
    { id: 'cripto-09', frente: 'Qual faixa de percentual da carteira costuma ser recomendada para cripto por planejadores conservadores?', verso: 'Geralmente entre 1% e 10% do total investido, nunca mais do que se aceitaria perder por completo.' },
    { id: 'cripto-10', frente: 'Por que "retorno garantido" em cripto é um sinal de alerta?', verso: 'Nenhum ativo de risco real garante retorno fixo — essa promessa é característica clássica de esquemas fraudulentos.' }
  ],

  quiz: [
    {
      pergunta: 'Qual é o limite mensal de vendas de criptoativos isento de Imposto de Renda?',
      alternativas: ['R$ 35.000', 'R$ 20.000', 'R$ 5.000', 'Não existe isenção para cripto'],
      correta: 2,
      explicacao: 'O limite de isenção para cripto é R$ 5.000 mensais somando todas as vendas — diferente do limite de R$ 35.000 aplicado a ações, o que causa confusão comum entre investidores.'
    },
    {
      pergunta: 'O que significa "self-custody" no contexto de criptoativos?',
      alternativas: [
        'Deixar o dinheiro investido em fundos geridos por terceiros',
        'Controlar você mesmo a chave privada dos seus criptoativos',
        'Comprar cripto apenas em exchanges internacionais',
        'Um tipo específico de criptomoeda'
      ],
      correta: 1,
      explicacao: 'Self-custody significa manter o controle direto da chave privada, sem depender de uma exchange como intermediária — isso elimina o risco de contraparte, mas exige mais responsabilidade do usuário.'
    },
    {
      pergunta: 'Por que deixar todos os criptoativos numa exchange é considerado o erro mais caro do tema?',
      alternativas: [
        'Porque exchanges cobram taxas altas demais',
        'Porque, em caso de falência ou hack da exchange, você vira credor comum e pode perder tudo',
        'Porque exchanges não são reguladas no Brasil',
        'Porque isso é proibido por lei'
      ],
      correta: 1,
      explicacao: 'Se a exchange quebra ou é hackeada, o cliente entra numa fila de credores comuns, sem garantia de recuperar o valor — daí a importância de mover parte relevante do saldo para custódia própria.'
    },
    {
      pergunta: 'O que acontece se você perder a seed phrase de uma carteira própria (self-custody)?',
      alternativas: [
        'Você pode recuperar o acesso ligando para o suporte da carteira',
        'A perda é permanente, sem nenhuma forma de recuperação',
        'O banco central pode restaurar o acesso mediante comprovação de identidade',
        'A exchange onde você comprou o ativo consegue restaurar'
      ],
      correta: 1,
      explicacao: 'Diferente de contas bancárias tradicionais, carteiras self-custody não têm central de recuperação de senha — perder a seed phrase significa perda definitiva do acesso aos ativos.'
    },
    {
      pergunta: 'Qual código de receita é usado para o DARF de ganho de capital em criptoativos?',
      alternativas: ['1732', '4600', '0190', '6015'],
      correta: 1,
      explicacao: 'O código 4600 é o específico para ganho de capital na alienação de criptoativos, recolhido via DARF até o último dia útil do mês seguinte à venda.'
    },
    {
      pergunta: 'Uma pessoa vendeu R$ 4.000 em Bitcoin em um único mês, seu único movimento no ano. O que ela precisa fazer em relação ao IR sobre esse ganho?',
      alternativas: [
        'Pagar 15% de IR sobre o ganho, via DARF',
        'Nada — está abaixo do limite de isenção de R$ 5.000 mensais',
        'Pagar 22,5% de IR, alíquota máxima',
        'Consultar a Receita antes de qualquer decisão'
      ],
      correta: 1,
      explicacao: 'Como a venda de R$ 4.000 fica abaixo do limite de isenção de R$ 5.000 mensais, o ganho de capital dessa operação é isento de IR — mas a posição ainda deve ser declarada na ficha de Bens e Direitos.'
    },
    {
      pergunta: 'Qual é a principal característica de um esquema fraudulento envolvendo criptoativos?',
      alternativas: [
        'Ter um site com design profissional',
        'Prometer retorno garantido e fixo, algo que nenhum ativo de risco real oferece',
        'Estar listado numa exchange regulamentada',
        'Ter existido por mais de um ano'
      ],
      correta: 1,
      explicacao: 'Nenhum ativo de risco, cripto incluído, garante retorno fixo — essa promessa é o sinal de alerta clássico de esquemas fraudulentos, independente da qualidade visual do marketing.'
    },
    {
      pergunta: 'O que é o halving do Bitcoin?',
      alternativas: [
        'Uma taxa cobrada pelas exchanges brasileiras',
        'Um evento que corta pela metade a emissão de novos Bitcoins a cada aproximadamente quatro anos',
        'A divisão do Bitcoin em duas moedas diferentes',
        'Um tipo de imposto cobrado pela Receita Federal'
      ],
      correta: 1,
      explicacao: 'O halving é um mecanismo programado no protocolo do Bitcoin que reduz pela metade a recompensa de mineração periodicamente, limitando o ritmo de emissão de novas moedas até o teto de 21 milhões.'
    }
  ],

  faq: [
    { pergunta: 'Preciso declarar cripto mesmo que nunca tenha vendido nada?', resposta: 'Sim. Toda posição em criptoativos em 31 de dezembro deve constar na ficha de Bens e Direitos da Declaração de Ajuste Anual, pelo valor de custo de aquisição, independente de ter havido venda no ano.' },
    { pergunta: 'Perdi acesso à minha carteira, existe alguma forma de recuperar?', resposta: 'Se você tinha a seed phrase guardada, é possível restaurar a carteira em qualquer dispositivo compatível. Se perdeu a seed phrase também, não existe recuperação — nenhuma empresa ou órgão consegue restaurar o acesso sem ela.' },
    { pergunta: 'Cripto é considerada moeda legal no Brasil?', resposta: 'Não. A Receita Federal trata criptoativos como bens patrimoniais para fins tributários, não como moeda de curso legal — por isso a tributação segue a lógica de ganho de capital, semelhante à venda de outros bens.' },
    { pergunta: 'Vale a pena investir em altcoins pouco conhecidas buscando retornos maiores?', resposta: 'Altcoins de baixa liquidez e sem histórico consolidado funcionam, na prática, como apostas de altíssimo risco, com chance real de perda total. Isso pode ter espaço numa carteira apenas como parcela mínima e claramente identificada como especulativa, nunca como parte central da estratégia.' },
    { pergunta: 'É melhor comprar tudo de uma vez ou aos poucos?', resposta: 'Aportes regulares e escalonados ao longo do tempo reduzem o risco de comprar tudo próximo a um topo de ciclo, já que o Bitcoin historicamente tem tido quedas superiores a 70% após picos de euforia.' },
    { pergunta: 'Como funciona a herança de criptoativos?', resposta: 'Como cripto não passa automaticamente por instituições financeiras tradicionais, é essencial deixar instruções claras e seguras (nunca a seed phrase em texto aberto) para que os herdeiros consigam acessar os ativos — sem isso, o patrimônio pode ficar irrecuperável mesmo dentro de um processo de inventário.' },
    { pergunta: 'Stablecoins têm o mesmo risco de volatilidade do Bitcoin?', resposta: 'Não. Stablecoins são desenhadas para manter paridade com uma moeda de referência, geralmente o dólar, e por isso têm volatilidade muito menor — mas carregam outros riscos, como a solidez das reservas que sustentam essa paridade.' }
  ]
}
