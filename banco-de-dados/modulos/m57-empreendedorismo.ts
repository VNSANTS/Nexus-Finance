// m02-empreendedorismo.ts
import { Modulo } from '@/types'

export const empreendedorismo: Modulo = {
  id: 'empreendedorismo',
  trilhaId: 'carreira-negocios',
  numero: 2,
  titulo: 'Empreendedorismo',
  subtitulo: 'Por que a maioria dos negócios quebra por falta de caixa, não por falta de ideia',
  iconName: 'Rocket',
  duracaoMin: 13,

  nivel: 'intermediario',
  preRequisitos: ['empresas-negocios'],
  objetivoAprendizagem: 'Você vai sair sabendo estruturar as finanças básicas de um negócio próprio — separação de contas, precificação e fluxo de caixa — para não ser mais uma estatística de empresa que fecha por gestão financeira, não por falta de mercado.',
  erroFatal: 'Misturar as finanças pessoais com as finanças da empresa (usar a mesma conta bancária, pagar contas pessoais com o caixa do negócio) — isso impede saber se o negócio é de fato lucrativo, dificulta o planejamento tributário e, em caso de dívidas da empresa, pode expor o patrimônio pessoal do empreendedor dependendo do tipo societário escolhido.',
  numeroChave: { valor: '6 em cada 10', legenda: 'proporção aproximada de pequenas empresas brasileiras que fecham as portas antes de completar 5 anos de atividade, segundo levantamentos recorrentes do Sebrae — a maior parte por problemas de gestão financeira, não de mercado ou produto' },
  glossarioDoModulo: ['Fluxo de caixa', 'Precificação (markup e margem)', 'Ponto de equilíbrio', 'Capital de giro', 'MEI, ME e EPP', 'Pró-labore', 'Separação patrimonial'],
  proximoPasso: { moduloId: 'lideranca', motivo: 'Depois de estruturar as finanças de um negócio próprio, o próximo passo natural é desenvolver a capacidade de liderar pessoas, essencial para quem pretende crescer além de um negócio unipessoal.' },

  aprender: {
    oQueE: 'Empreendedorismo, do ponto de vista financeiro, é a disciplina de estruturar e gerir o dinheiro de um negócio de forma que ele sobreviva e cresça de maneira sustentável — o que envolve separar finanças pessoais das empresariais, precificar produtos e serviços corretamente, entender o ponto de equilíbrio do negócio e manter fluxo de caixa saudável. Ter uma boa ideia ou produto é apenas o ponto de partida; a maioria dos negócios que fecham no Brasil não fecha por falta de mercado, mas por problemas de gestão financeira básica.',
    porQueImporta: 'Empreendedores de primeira viagem frequentemente subestimam a importância da disciplina financeira, focando energia quase exclusivamente no produto ou serviço oferecido. Sem separação clara entre finanças pessoais e empresariais, sem precificação correta (que cubra custos, impostos e ainda gere margem de lucro) e sem controle de fluxo de caixa, é comum que o negócio pareça estar indo bem no dia a dia enquanto na verdade está acumulando prejuízo silencioso, até um ponto de ruptura financeira difícil de reverter.',
    naPratica: 'No Brasil, a escolha do enquadramento jurídico e tributário certo desde o início — MEI (Microempreendedor Individual, para faturamento até R$ 81.000 por ano), ME (Microempresa) ou EPP (Empresa de Pequeno Porte), dentro do regime Simples Nacional — impacta diretamente a carga tributária e a complexidade de gestão. A precificação correta precisa considerar não apenas o custo direto do produto ou serviço, mas também custos fixos rateados, impostos do regime tributário escolhido e a margem de lucro desejada — muitos empreendedores precificam olhando apenas o custo direto, esquecendo de rateio de custos fixos e impostos, e descobrem meses depois que estavam vendendo no prejuízo. O ponto de equilíbrio (quanto é preciso vender para cobrir todos os custos fixos e variáveis, sem lucro nem prejuízo) é uma métrica essencial que poucos empreendedores calculam antes de abrir o negócio. Manter uma reserva de capital de giro de pelo menos alguns meses de despesas operacionais ajuda a atravessar períodos de faturamento mais baixo sem comprometer a operação.',
    passoAPasso: [
      'Abra uma conta bancária exclusiva para o negócio, separada completamente das finanças pessoais, desde o primeiro dia de operação.',
      'Escolha o enquadramento jurídico e tributário adequado ao seu faturamento esperado e tipo de atividade (MEI, ME ou EPP dentro do Simples Nacional, entre outras opções).',
      'Calcule o preço de venda considerando custo direto, rateio de custos fixos, impostos do regime escolhido e margem de lucro desejada — não apenas o custo direto do produto ou serviço.',
      'Calcule o ponto de equilíbrio do negócio: o volume de vendas necessário para cobrir todos os custos fixos e variáveis, sem lucro nem prejuízo.',
      'Defina um pró-labore fixo mensal para você mesmo, tratando-o como uma despesa da empresa, em vez de retirar valores de forma irregular conforme a necessidade pessoal.',
      'Construa uma reserva de capital de giro equivalente a alguns meses de despesas operacionais fixas, antes de expandir ou assumir compromissos financeiros maiores.',
      'Acompanhe o fluxo de caixa semanalmente nos primeiros meses de operação, ajustando rapidamente qualquer desvio significativo do planejado.'
    ],
    errosComuns: [
      'Misturar finanças pessoais e empresariais na mesma conta bancária, perdendo visibilidade real sobre a lucratividade do negócio.',
      'Precificar produtos ou serviços considerando apenas o custo direto, esquecendo de ratear custos fixos e considerar a carga tributária.',
      'Não calcular o ponto de equilíbrio antes de abrir o negócio, operando sem saber exatamente quanto é necessário vender para não ter prejuízo.',
      'Retirar valores da empresa de forma irregular, sem um pró-labore fixo definido, dificultando o controle financeiro tanto pessoal quanto empresarial.',
      'Não constituir nenhuma reserva de capital de giro, ficando vulnerável a qualquer período de faturamento mais baixo ou imprevisto.',
      'Escolher o enquadramento tributário errado para o porte e tipo de atividade do negócio, pagando mais impostos do que seria necessário ou enfrentando complexidade desnecessária.'
    ],
    comparativo: {
      titulo: 'Principais enquadramentos para pequenos negócios no Brasil',
      linhas: [
        { label: 'MEI', valor: 'Faturamento: até R$ 81.000/ano | Tributação: valor fixo mensal (DAS) | Complexidade: baixa, ideal para início de operação' },
        { label: 'ME (Simples Nacional)', valor: 'Faturamento: até R$ 360.000/ano | Tributação: percentual sobre faturamento, por faixa | Complexidade: média, permite contratar funcionários' },
        { label: 'EPP (Simples Nacional)', valor: 'Faturamento: até R$ 4.800.000/ano | Tributação: percentual sobre faturamento, por faixa | Complexidade: média a alta, conforme o porte' }
      ]
    },
    checklist: [
      'Abra uma conta bancária exclusiva para o negócio antes de começar a operar.',
      'Calcule o preço de venda considerando custo direto, custos fixos rateados, impostos e margem de lucro.',
      'Calcule o ponto de equilíbrio do seu negócio antes de assumir compromissos financeiros relevantes.',
      'Defina um pró-labore fixo mensal para você mesmo, tratado como despesa da empresa.',
      'Construa uma reserva de capital de giro equivalente a pelo menos alguns meses de despesas operacionais.',
      'Revise o enquadramento tributário do negócio anualmente, conforme o faturamento evolui.'
    ],
    livroRelacionado: {
      livroId: 'the-go-giver',
      textoConexao: 'O livro defende que negócios sustentáveis nascem de entregar valor real de forma consistente, não de atalhos — princípio que só funciona na prática quando a base financeira do negócio (preço, ponto de equilíbrio, reserva) está organizada como este módulo ensina.',
    },
    naoConfundirCom: [
      { moduloId: 'empresas-negocios', diferenca: 'Empresas e Negócios foca em como avaliar a saúde financeira de empresas já estabelecidas por meio de demonstrativos; Empreendedorismo foca no processo prático de estruturar as finanças de um negócio desde o início.' },
      { moduloId: 'carreira', diferenca: 'Este módulo trata da gestão financeira de um negócio próprio; Carreira foca na trajetória profissional dentro de organizações, incluindo negociação salarial e desenvolvimento profissional como empregado.' }
    ]
  },

  mapaMental: {
    label: 'Empreendedorismo',
    subtitulo: 'A disciplina financeira por trás de um negócio sustentável',
    ramos: [
      {
        id: 'estruturacao-inicial',
        label: 'Estruturação Inicial',
        cor: '#3B82F6',
        resumo: 'As decisões que precisam vir antes de operar',
        filhos: [
          { label: 'Separação patrimonial', desc: 'Conta bancária exclusiva para o negócio, desde o primeiro dia' },
          { label: 'Enquadramento jurídico', desc: 'MEI, ME ou EPP, conforme faturamento esperado' },
          { label: 'Pró-labore definido', desc: 'Retirada fixa mensal, tratada como despesa da empresa' }
        ]
      },
      {
        id: 'precificacao',
        label: 'Precificação',
        cor: '#F59E0B',
        resumo: 'Como calcular o preço correto de venda',
        filhos: [
          { label: 'Custo direto', desc: 'Insumos e mão de obra diretamente ligados ao produto ou serviço' },
          { label: 'Custos fixos rateados', desc: 'Aluguel, contas e outras despesas fixas divididas entre as vendas' },
          { label: 'Margem e impostos', desc: 'Lucro desejado e carga tributária do regime escolhido' }
        ]
      },
      {
        id: 'fluxo-e-equilibrio',
        label: 'Fluxo e Equilíbrio',
        cor: '#22C55E',
        resumo: 'Como acompanhar a saúde financeira do dia a dia',
        filhos: [
          { label: 'Ponto de equilíbrio', desc: 'Volume de vendas necessário para não ter lucro nem prejuízo' },
          { label: 'Fluxo de caixa', desc: 'Acompanhamento da entrada e saída real de dinheiro' },
          { label: 'Capital de giro', desc: 'Reserva para atravessar períodos de faturamento mais baixo' }
        ]
      },
      {
        id: 'riscos-comuns',
        label: 'Riscos Comuns',
        cor: '#EF4444',
        resumo: 'Por que negócios com bom produto ainda fecham',
        filhos: [
          { label: 'Mistura de contas', desc: 'Perda de visibilidade sobre a real lucratividade do negócio' },
          { label: 'Precificação errada', desc: 'Vender abaixo do custo real sem perceber' },
          { label: 'Falta de reserva', desc: 'Vulnerabilidade a qualquer imprevisto de faturamento' }
        ]
      }
    ]
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Aqui você avalia decisões práticas de gestão financeira de um pequeno negócio e vê o resultado esperado de cada escolha, considerando os fundamentos de precificação e fluxo de caixa.',
    passos: [
      'Leia a situação envolvendo uma decisão financeira de um negócio próprio.',
      'Escolha a alternativa que representa sua decisão.',
      'Veja a análise do resultado, considerando os princípios de gestão financeira empresarial.'
    ],
    exemploGuiado: 'Uma empreendedora abre um pequeno ateliê de confeitaria e precifica seus bolos considerando apenas o custo dos ingredientes (R$ 25 por bolo), vendendo por R$ 45, achando que tem margem de quase 45%. Depois de alguns meses, percebe que o negócio não está sobrando dinheiro no fim do mês, apesar das vendas consistentes. Ao recalcular o preço considerando também o rateio de custos fixos (aluguel do espaço, conta de luz, gás) e os impostos do MEI, ela descobre que o custo total real por bolo é de R$ 38, não R$ 25 — o que reduz sua margem real para menos de 15%. Com esse ajuste, ela reprecifica os bolos para R$ 58, mantendo uma margem saudável de aproximadamente 35% após todos os custos, e passa a acompanhar mensalmente se o volume de vendas está acima do seu ponto de equilíbrio recalculado.',
    cenarioGuiado: [
      {
        pergunta: 'Você está abrindo um pequeno negócio e recebe o primeiro pagamento de um cliente diretamente na sua conta pessoal, "só dessa vez, para agilizar".',
        opcoes: [
          { texto: 'Aceito, já abro uma conta específica para o negócio depois, quando crescer mais', resultado: 'Misturar finanças desde o início, mesmo "só dessa vez", dificulta o controle real da lucratividade do negócio e tende a se tornar um hábito recorrente, não uma exceção pontual.' },
          { texto: 'Abro uma conta bancária exclusiva para o negócio antes de aceitar o primeiro pagamento', resultado: 'Separar as contas desde o início, mesmo com movimento pequeno, cria o hábito correto de gestão financeira e evita a confusão entre dinheiro pessoal e empresarial desde a primeira transação.' }
        ]
      },
      {
        pergunta: 'Você está precificando um serviço e calcula apenas o tempo direto gasto na entrega, sem considerar outros custos fixos do negócio.',
        opcoes: [
          { texto: 'Uso apenas o custo direto de tempo para definir o preço final', resultado: 'Ignorar o rateio de custos fixos (como aluguel, ferramentas, contas) e impostos na precificação é uma das causas mais comuns de negócios que parecem lucrativos no volume de vendas, mas na verdade operam no prejuízo.' },
          { texto: 'Calculo o preço incluindo custo direto, rateio de custos fixos e impostos do meu regime tributário', resultado: 'Precificação completa, considerando todos os custos reais envolvidos, é essencial para garantir que o preço cobrado realmente gere a margem de lucro pretendida.' }
        ]
      },
      {
        pergunta: 'Seu negócio está com bom volume de vendas nos últimos meses e você está pensando em usar todo o caixa disponível para expandir rapidamente, sem reserva.',
        opcoes: [
          { texto: 'Uso todo o caixa disponível na expansão, o momento parece favorável', resultado: 'Expandir sem manter nenhuma reserva de capital de giro deixa o negócio extremamente vulnerável a qualquer período de faturamento mais baixo logo após o investimento, o que pode comprometer toda a operação.' },
          { texto: 'Mantenho uma reserva de capital de giro e uso apenas parte do caixa disponível para a expansão', resultado: 'Manter reserva de capital de giro, mesmo em momentos de bom faturamento, é uma prática essencial para atravessar imprevistos sem comprometer a operação do negócio já estabelecido.' }
        ]
      }
    ]
  },

  flashcards: [
    { id: 'emp-01', frente: 'Por que a maioria dos pequenos negócios brasileiros fecha antes de completar 5 anos, segundo levantamentos do Sebrae?', verso: 'Principalmente por problemas de gestão financeira, não por falta de mercado ou de um bom produto/serviço.' },
    { id: 'emp-02', frente: 'Qual é o erro mais caro na gestão financeira de um negócio próprio, segundo o módulo?', verso: 'Misturar finanças pessoais com as finanças da empresa, o que impede saber se o negócio é realmente lucrativo e pode expor o patrimônio pessoal.' },
    { id: 'emp-03', frente: 'O que deve ser considerado na precificação correta de um produto ou serviço?', verso: 'Custo direto, rateio de custos fixos, impostos do regime tributário e margem de lucro desejada — não apenas o custo direto isolado.' },
    { id: 'emp-04', frente: 'O que é ponto de equilíbrio?', verso: 'O volume de vendas necessário para cobrir todos os custos fixos e variáveis do negócio, sem gerar lucro nem prejuízo.' },
    { id: 'emp-05', frente: 'Qual é o limite de faturamento anual para se enquadrar como MEI no Brasil?', verso: 'Até R$ 81.000 por ano, com tributação por valor fixo mensal (DAS).' },
    { id: 'emp-06', frente: 'O que é pró-labore?', verso: 'A retirada fixa mensal que o empreendedor faz para si próprio, tratada como uma despesa da empresa, em vez de retiradas irregulares conforme a necessidade pessoal.' },
    { id: 'emp-07', frente: 'Por que manter uma reserva de capital de giro é importante para um negócio?', verso: 'Porque permite atravessar períodos de faturamento mais baixo ou imprevistos sem comprometer a operação do negócio.' },
    { id: 'emp-08', frente: 'Qual a diferença entre ME e EPP no Simples Nacional?', verso: 'ME atende faturamento até R$ 360.000/ano; EPP atende faturamento entre esse valor e R$ 4.800.000/ano, ambas dentro do regime Simples Nacional, com tributação por faixas percentuais sobre o faturamento.' }
  ],

  quiz: [
    {
      pergunta: 'Segundo levantamentos recorrentes do Sebrae, qual é a principal causa de fechamento de pequenas empresas brasileiras nos primeiros 5 anos?',
      alternativas: [
        'Falta de mercado consumidor para o produto ou serviço',
        'Problemas de gestão financeira, não necessariamente falta de mercado ou produto',
        'Excesso de concorrência em qualquer setor',
        'Falta de tecnologia disponível para pequenos negócios'
      ],
      correta: 1,
      explicacao: 'A maior parte dos fechamentos está relacionada a problemas de gestão financeira básica — precificação errada, mistura de contas, falta de controle de fluxo de caixa — não à ausência de mercado ou qualidade do produto oferecido.'
    },
    {
      pergunta: 'Por que misturar finanças pessoais com as da empresa é considerado o erro mais grave na gestão de um negócio próprio?',
      alternativas: [
        'Porque é proibido por lei em qualquer situação',
        'Porque impede saber se o negócio é realmente lucrativo e pode expor o patrimônio pessoal dependendo do tipo societário',
        'Porque gera automaticamente multa da Receita Federal',
        'Porque só é permitido para empresas de grande porte'
      ],
      correta: 1,
      explicacao: 'Sem separação clara, o empreendedor perde visibilidade sobre a real lucratividade do negócio, dificulta o planejamento tributário e, dependendo do tipo societário, pode expor o patrimônio pessoal em caso de dívidas da empresa.'
    },
    {
      pergunta: 'O que deve ser incluído no cálculo de precificação de um produto ou serviço, além do custo direto?',
      alternativas: [
        'Apenas o preço praticado pela concorrência mais próxima',
        'Rateio de custos fixos, impostos do regime tributário e margem de lucro desejada',
        'Somente o valor que o cliente está disposto a pagar, sem outros cálculos',
        'Nenhum outro fator, o custo direto já é suficiente'
      ],
      correta: 1,
      explicacao: 'Precificar considerando apenas o custo direto, sem ratear custos fixos e considerar impostos, é uma das causas mais comuns de negócios que parecem lucrativos, mas na prática vendem no prejuízo ou com margem muito menor do que o esperado.'
    },
    {
      pergunta: 'O que é ponto de equilíbrio de um negócio?',
      alternativas: [
        'O momento em que a empresa atinge o maior lucro possível',
        'O volume de vendas necessário para cobrir todos os custos fixos e variáveis, sem lucro nem prejuízo',
        'O valor mínimo de capital para abrir uma empresa',
        'A quantidade de funcionários ideal para o negócio'
      ],
      correta: 1,
      explicacao: 'O ponto de equilíbrio indica exatamente quanto é preciso vender para cobrir todos os custos do negócio — abaixo desse volume, a empresa opera no prejuízo; acima, começa a gerar lucro real.'
    },
    {
      pergunta: 'Qual é o limite de faturamento anual para uma empresa se enquadrar como MEI no Brasil?',
      alternativas: ['Até R$ 4.800.000', 'Até R$ 360.000', 'Até R$ 81.000', 'Não existe limite para MEI'],
      correta: 2,
      explicacao: 'O MEI (Microempreendedor Individual) atende negócios com faturamento anual de até R$ 81.000, com tributação simplificada por valor fixo mensal (DAS), sendo indicado para o início da operação.'
    },
    {
      pergunta: 'Por que definir um pró-labore fixo mensal é uma prática recomendada para empreendedores?',
      alternativas: [
        'Porque é uma exigência legal para qualquer tipo de negócio',
        'Porque trata a retirada do empreendedor como uma despesa fixa da empresa, facilitando o controle financeiro tanto pessoal quanto empresarial',
        'Porque elimina completamente a necessidade de pagar impostos',
        'Porque aumenta automaticamente o lucro do negócio'
      ],
      correta: 1,
      explicacao: 'Um pró-labore fixo, tratado como despesa regular da empresa, evita retiradas irregulares e ajuda tanto no controle do fluxo de caixa do negócio quanto no planejamento financeiro pessoal do empreendedor.'
    }
  ],

  faq: [
    { pergunta: 'Qual a diferença entre lucro do negócio e pró-labore?', resposta: 'Pró-labore é a remuneração fixa mensal do empreendedor pelo trabalho realizado na empresa, tratada como despesa; lucro é o que sobra depois de todas as despesas (incluindo o pró-labore) serem pagas, podendo ser reinvestido no negócio ou distribuído aos sócios.' },
    { pergunta: 'Preciso de um contador desde o início do negócio?', resposta: 'Para a maioria dos enquadramentos além do MEI (que tem gestão simplificada), contar com um contador é altamente recomendado, já que ele ajuda a escolher o regime tributário mais vantajoso e garante conformidade com as obrigações fiscais, que variam conforme o porte e a atividade do negócio.' },
    { pergunta: 'Como calculo o ponto de equilíbrio do meu negócio na prática?', resposta: 'De forma simplificada, divida os custos fixos totais pela margem de contribuição unitária (preço de venda menos custo variável por unidade) — o resultado indica quantas unidades você precisa vender para cobrir todos os custos, sem lucro nem prejuízo.' },
    { pergunta: 'É normal um negócio não dar lucro nos primeiros meses?', resposta: 'Sim, é relativamente comum, especialmente considerando investimentos iniciais e curva de aprendizado do mercado — por isso a importância de ter uma reserva de capital de giro planejada antes de abrir o negócio, para sustentar esse período inicial sem comprometer a operação.' },
    { pergunta: 'Qual a diferença entre MEI, ME e EPP além do limite de faturamento?', resposta: 'Além do teto de faturamento, cada enquadramento tem regras diferentes sobre contratação de funcionários, obrigações contábeis e complexidade de gestão — o MEI é o mais simplificado, mas com mais restrições, enquanto ME e EPP permitem operações maiores com mais obrigações associadas.' },
    { pergunta: 'Vale a pena buscar um sócio para dividir os riscos financeiros do negócio?', resposta: 'Pode fazer sentido dependendo do tipo de negócio e da complementaridade de competências entre os sócios, mas é importante formalizar claramente a divisão de responsabilidades, capital investido e participação nos lucros desde o início, evitando conflitos financeiros futuros.' }
  ]
}
