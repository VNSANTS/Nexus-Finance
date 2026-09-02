import type { Modulo } from '@/types'

export const moduloPlanejamentoFinanceiro: Modulo = {
  id: 'planejamento-financeiro',
  trilhaId: 'vida-financeira',
  numero: 5,
  titulo: 'Planejamento Financeiro',
  subtitulo: 'Dinheiro sem plano vira desculpa depois que acaba',
  iconName: 'CalendarCheck',
  duracaoMin: 13,

  nivel: 'iniciante',
  erroFatal: 'Planejar só o mês corrente. Quem só olha os próximos 30 dias é pego de surpresa por IPVA, matrícula escolar, 13º negativo (quando já gastou antes de receber) e conserto de carro — e resolve tudo no crédito rotativo, que é o jeito mais caro de se afogar.',
  numeroChave: { valor: '3 meses', legenda: 'É o horizonte mínimo de planejamento pra parar de viver de surpresa em surpresa' },

  aprender: {
    oQueE: 'Planejamento financeiro é decidir, antes do dinheiro entrar, para onde ele vai. Não é planilha bonita nem controle obsessivo de cada cafezinho — é ter um plano simples que roda sozinho na maior parte do tempo.',
    porQueImporta: 'Sem plano, toda decisão financeira é reativa: você gasta, depois vê o que sobrou, depois se assusta. Com plano, você inverte a ordem — decide o destino do dinheiro primeiro e só executa.',
    naPratica: 'Um planejamento funcional tem três camadas: orçamento mensal (o de sempre), reserva para gastos anuais previsíveis (IPTU, seguro, presentes) e metas de médio prazo (viagem, entrada de imóvel). A maioria das pessoas só faz a primeira e se pergunta por que "sempre sobra pouco".',
    passoAPasso: [
      'Liste todos os gastos anuais previsíveis (IPVA, IPTU, seguro, material escolar, presentes de fim de ano) e some o total',
      'Divida esse total por 12 — esse é o valor mensal que precisa ser reservado à parte, todo mês, numa conta separada',
      'Defina o orçamento mensal normal (moradia, alimentação, transporte, lazer) com percentuais, não valores fixos, pra se adaptar a variações de renda',
      'Estabeleça de 1 a 3 metas de médio prazo (6 meses a 3 anos) com valor e prazo definidos, não "quero juntar dinheiro"',
      'Automatize: crie transferências automáticas no dia do pagamento para reserva anual e metas, antes de qualquer gasto',
      'Revise o plano a cada 3 meses — renda muda, gastos mudam, o plano tem que acompanhar',
    ],
    errosComuns: [
      'Fazer orçamento só com valores fixos em reais, que quebram no primeiro mês de renda variável ou gasto extra',
      'Ignorar gastos anuais até o mês em que eles chegam e virarem "emergência"',
      'Confundir meta de médio prazo com reserva de emergência e usar uma pra cobrir a outra',
      'Planejar em planilha complexa demais, abandonar em 3 semanas e voltar a não ter plano nenhum',
      'Não revisar o plano depois de mudança de renda, achando que o número antigo ainda serve',
    ],
    comparativo: {
      titulo: 'Com plano vs. sem plano (mesma renda de R$ 5.000/mês)',
      linhas: [
        { label: 'IPVA de R$ 1.800 em janeiro', valor: 'Com plano: já reservado. Sem plano: parcelado no cartão a 12%' },
        { label: 'Conserto de carro de R$ 900', valor: 'Com plano: sai da reserva anual. Sem plano: compromete o mês inteiro' },
        { label: 'Meta de viagem R$ 6.000', valor: 'Com plano: R$ 500/mês por 12 meses. Sem plano: "ano que vem eu junto"' },
        { label: 'Fim do ano (13º + gastos)', valor: 'Com plano: previsto e separado. Sem plano: cartão estourado em janeiro' },
      ],
    },
    checklist: [
      'Listei meus gastos anuais previsíveis e calculei o valor mensal de reserva',
      'Defini meu orçamento mensal em percentuais, não em valores fixos',
      'Estabeleci pelo menos uma meta de médio prazo com valor e prazo claros',
      'Automatizei as transferências para reserva e metas no dia do pagamento',
      'Marquei uma revisão trimestral do meu plano no calendário',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'O livro defende um plano passo a passo, sem depender de força de vontade constante — exatamente o princípio por trás de automatizar reserva anual e metas antes de gastar.',
    },
  },

  mapaMental: {
    label: 'Planejamento Financeiro',
    subtitulo: 'As três camadas que sustentam um plano que funciona',
    ramos: [
      {
        id: 'orcamento-mensal',
        label: 'Orçamento Mensal',
        cor: '#22C55E',
        resumo: 'A base recorrente, todo mês',
        filhos: [
          { label: 'Percentuais, não valores fixos', desc: 'Se adapta a mudanças de renda' },
          { label: 'Moradia + contas fixas', desc: 'Geralmente 30-40% da renda' },
          { label: 'Variáveis (alimentação, transporte)', desc: 'A parte que dá pra ajustar rápido' },
          { label: 'Lazer com limite definido', desc: 'Sem culpa, mas com teto' },
        ],
      },
      {
        id: 'reserva-anual',
        label: 'Reserva para Gastos Anuais',
        cor: '#00D4FF',
        resumo: 'O que todo mundo esquece de planejar',
        filhos: [
          { label: 'IPVA e IPTU', desc: 'Previsíveis, datas fixas, chegam sempre' },
          { label: 'Seguros anuais', desc: 'Carro, celular, vida' },
          { label: 'Presentes e fim de ano', desc: 'Dezembro não é surpresa' },
          { label: 'Manutenções (carro, casa)', desc: 'Uma média mensal cobre picos' },
        ],
      },
      {
        id: 'metas-medio-prazo',
        label: 'Metas de Médio Prazo',
        cor: '#FFC93C',
        resumo: 'Onde o dinheiro vai de propósito',
        filhos: [
          { label: 'Valor e prazo definidos', desc: '"Juntar dinheiro" não é meta' },
          { label: 'Conta separada da reserva', desc: 'Nunca misturar com emergência' },
          { label: 'Aporte mensal calculado', desc: 'Valor ÷ meses = aporte necessário' },
          { label: 'Revisão se a renda mudar', desc: 'Meta se ajusta, não desaparece' },
        ],
      },
      {
        id: 'automatizacao',
        label: 'Automatização',
        cor: '#3B82F6',
        resumo: 'O plano roda sem depender de disciplina diária',
        filhos: [
          { label: 'Transferência no dia do pagamento', desc: 'Antes de qualquer gasto acontecer' },
          { label: 'Conta separada para cada finalidade', desc: 'Reserva, metas e gasto do dia a dia' },
          { label: 'Revisão trimestral, não diária', desc: 'Plano bom não exige monitoramento constante' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: null,
    intro: 'Vamos montar um plano completo pra uma renda de R$ 5.000/mês, do zero, em quatro decisões.',
    passos: [
      'Mapear os gastos anuais previsíveis e transformar em reserva mensal',
      'Definir o orçamento mensal em percentuais',
      'Calcular o aporte necessário pra uma meta de médio prazo',
      'Somar tudo e ver o que sobra pro dia a dia',
    ],
    exemploGuiado: 'Renda de R$ 5.000/mês. Gastos anuais previstos: IPVA R$ 1.200, seguro do carro R$ 1.800, presentes de fim de ano R$ 800, manutenções diversas R$ 1.200 — total R$ 5.000/ano, ou R$ 417/mês de reserva. Meta de médio prazo: viagem de R$ 6.000 em 12 meses = R$ 500/mês. Orçamento mensal em percentuais: 35% moradia (R$ 1.750), 20% alimentação (R$ 1.000), 10% transporte (R$ 500), 10% lazer (R$ 500). Somando reserva (R$ 417) e meta (R$ 500) aos 75% de gastos fixos (R$ 3.750), sobram R$ 333 de folga — que pode virar reserva de emergência extra ou investimento livre.',
  },

  flashcards: [
    { id: 'fc1', frente: 'Qual é o horizonte mínimo de um planejamento financeiro funcional?', verso: '3 meses — menos que isso, você só está reagindo ao mês corrente, não planejando.' },
    { id: 'fc2', frente: 'Por que orçamento em valores fixos costuma falhar?', verso: 'Porque não se adapta a mudanças de renda ou gastos extras — percentuais são mais resilientes.' },
    { id: 'fc3', frente: 'O que diferencia reserva anual de reserva de emergência?', verso: 'A reserva anual cobre gastos previsíveis (IPVA, seguro); a de emergência cobre o imprevisível (perda de renda, saúde).' },
    { id: 'fc4', frente: 'Como transformar um gasto anual em valor mensal de reserva?', verso: 'Soma-se todos os gastos anuais previsíveis e divide-se por 12.' },
    { id: 'fc5', frente: 'O que torna uma meta de médio prazo válida, e não só um desejo vago?', verso: 'Ter valor e prazo definidos — "R$ 6.000 em 12 meses", não "juntar dinheiro pra viajar algum dia".' },
    { id: 'fc6', frente: 'Qual é o princípio por trás de automatizar transferências no dia do pagamento?', verso: 'O plano executa antes de depender de força de vontade — o dinheiro já sai reservado antes de virar gasto do dia a dia.' },
  ],

  quiz: [
    {
      pergunta: 'Por que planejar só o mês corrente é o erro mais comum no planejamento financeiro?',
      alternativas: [
        'Porque é trabalhoso demais fazer isso todo mês',
        'Porque gastos anuais previsíveis (IPVA, seguro) pegam a pessoa de surpresa e acabam no crédito rotativo',
        'Porque bancos não permitem planejamento de curto prazo',
        'Porque o mês corrente já está definido e não pode mudar',
      ],
      correta: 1,
      explicacao: 'Quem só olha os próximos 30 dias não vê gastos anuais chegando e acaba resolvendo no crédito rotativo — a forma mais cara de cobrir um imprevisto que, na verdade, era previsível.',
    },
    {
      pergunta: 'Uma pessoa tem gastos anuais previsíveis somando R$ 4.800. Quanto deve reservar por mês?',
      alternativas: ['R$ 4.800', 'R$ 400', 'R$ 40', 'R$ 480'],
      correta: 1,
      explicacao: 'R$ 4.800 ÷ 12 meses = R$ 400/mês. Esse valor deve ir para uma conta separada, todo mês, antes de qualquer outro gasto.',
    },
    {
      pergunta: 'Qual a vantagem de definir o orçamento mensal em percentuais em vez de valores fixos?',
      alternativas: [
        'Percentuais são mais fáceis de calcular no papel',
        'Bancos exigem que o orçamento seja em percentuais',
        'O orçamento se adapta automaticamente quando a renda varia, sem precisar refazer tudo',
        'Não há vantagem real, é só estética',
      ],
      correta: 2,
      explicacao: 'Com percentuais, se a renda cai ou sobe, os valores em reais se ajustam proporcionalmente — o plano continua válido sem precisar ser recalculado do zero.',
    },
    {
      pergunta: 'O que caracteriza uma meta de médio prazo bem definida?',
      alternativas: [
        'Estar na mesma conta da reserva de emergência',
        'Ter valor e prazo específicos, com aporte mensal calculado',
        'Não ter data definida, pra dar flexibilidade',
        'Ser revisada apenas uma vez, no início',
      ],
      correta: 1,
      explicacao: 'Meta sem valor e prazo definidos é só um desejo. "R$ 6.000 em 12 meses" permite calcular o aporte mensal (R$ 500) e acompanhar o progresso de verdade.',
    },
  ],

  faq: [
    {
      pergunta: 'Preciso de uma planilha complexa pra fazer isso funcionar?',
      resposta: 'Não. Planilhas complexas são o principal motivo de as pessoas abandonarem o planejamento em poucas semanas. Três contas separadas (gasto do dia a dia, reserva anual, metas) com transferência automática já resolvem 90% do problema.',
    },
    {
      pergunta: 'Reserva anual e reserva de emergência podem ser a mesma conta?',
      resposta: 'Não é recomendado. Se misturar, você não sabe quanto está realmente disponível pra emergência de verdade quando o IPVA "invade" o valor guardado. Contas separadas evitam essa confusão.',
    },
    {
      pergunta: 'E se minha renda for muito variável, mês a mês?',
      resposta: 'Use percentuais sobre a renda real de cada mês, não um valor fixo. Nos meses bons, reserva e metas recebem mais; nos meses fracos, menos — mas nunca zero, se possível.',
    },
  ],
}
