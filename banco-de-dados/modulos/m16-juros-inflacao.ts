import type { Modulo } from '@/types'

export const moduloJurosInflacao: Modulo = {
  id: 'juros-inflacao',
  trilhaId: 'economia-mercado',
  numero: 8,
  titulo: 'Juros e Inflação',
  subtitulo: 'O par de números que define tudo no Brasil',
  iconName: 'Percent',
  duracaoMin: 13,

  aprender: {
    oQueE:
      'Inflação é a perda de valor do dinheiro ao longo do tempo: os preços sobem e o mesmo salário compra menos. Juro é o preço do dinheiro no tempo: quanto se paga para pegar emprestado e quanto se recebe para emprestar. No Brasil, os dois andam colados — quando a inflação sobe, o Banco Central sobe os juros para segurá-la.',
    porQueImporta:
      'Praticamente todo produto de renda fixa do país é indexado à Selic, ao CDI ou ao IPCA. Entender esses três nomes é o que separa quem escolhe onde investir de quem aceita o que o gerente oferece. E entender juro real — o que sobra depois da inflação — é o que impede alguém de comemorar um rendimento de 10% em um ano de inflação de 9%.',
    naPratica:
      'A Selic é decidida pelo Copom a cada 45 dias aproximadamente, e o CDI anda praticamente colado nela. Quando a Selic passa de 8,5% ao ano, a poupança fica travada em 0,5% ao mês mais TR — e perde de qualquer CDB de liquidez diária que pague perto de 100% do CDI. Já quem tem título prefixado comprado vê o preço dele cair quando os juros sobem, porque um título antigo com taxa menor vale menos que os novos. Esse efeito se chama marcação a mercado e só importa para quem vende antes do vencimento.',
    passoAPasso: [
      'Descubra a Selic atual e a meta de inflação vigente (site do Banco Central)',
      'Calcule o juro real: divida (1 + taxa) por (1 + inflação) e subtraia 1 — nunca subtraia direto',
      'Classifique seus investimentos em pós-fixado, prefixado e IPCA+',
      'Verifique se sua reserva está em algo que acompanha a Selic',
      'Decida agora o que faria se a Selic subisse ou caísse 3 pontos — antes de acontecer',
    ],
    errosComuns: [
      'Achar que juro alto é ruim para tudo — é ótimo para quem tem dinheiro guardado',
      'Não saber que título prefixado oscila de preço antes do vencimento',
      'Usar IPCA e IGP-M como sinônimos (o IGP-M é o histórico de contratos de aluguel)',
      'Comemorar rendimento nominal sem descontar a inflação',
      'Deixar dinheiro na poupança em ciclo de juro alto',
    ],
    comparativo: {
      titulo: 'Selic sobe: quem ganha e quem perde',
      linhas: [
        { label: 'Pós-fixado (CDI)', valor: 'Ganha — rende mais na hora' },
        { label: 'Prefixado já comprado', valor: 'Perde no preço, mantém a taxa no vencimento' },
        { label: 'Tesouro IPCA+ longo', valor: 'Perde no preço, protege no vencimento' },
        { label: 'Bolsa', valor: 'Tende a sofrer — crédito caro e renda fixa atraente' },
        { label: 'Quem tem dívida', valor: 'Perde — parcelas e rotativo encarecem' },
        { label: 'Poupança', valor: 'Trava em 0,5% a.m. + TR acima de 8,5% de Selic' },
      ],
    },
    checklist: [
      'Sei a Selic e o IPCA atuais',
      'Calculei o juro real de pelo menos um investimento meu',
      'Sei classificar meus investimentos em pós, pré e IPCA+',
      'Minha reserva está em algo que acompanha a Selic',
      'Escrevi o que faria se a Selic subisse ou caísse fortemente',
    ],
    livroRelacionado: {
      livroId: 'i-will-teach-you-to-be-rich',
      textoConexao: 'Ramit Sethi defende automatizar decisões financeiras em vez de reagir a cada notícia — o mesmo princípio por trás de já ter definido, com antecedência, o que fazer se a Selic mudar de direção.',
    },
  },

  mapaMental: {
    label: 'Juros e Inflação',
    subtitulo: 'O par de números que define quase tudo na vida financeira do brasileiro',
    ramos: [
      {
        id: 'inflacao',
        label: 'Inflação',
        cor: '#EF4444',
        resumo: 'O dinheiro encolhendo em silêncio',
        filhos: [
          { label: 'IPCA', desc: 'O índice oficial, do IBGE, baseado no consumo das famílias. É o que corrige o Tesouro IPCA+.' },
          { label: 'IGP-M', desc: 'Mais sensível a atacado e câmbio. Historicamente usado em contrato de aluguel, e costuma ser bem mais volátil que o IPCA.' },
          { label: 'Núcleo da inflação', desc: 'Versão que tira os itens mais voláteis, como alimento e energia, para enxergar a tendência real.' },
          {
            label: 'Efeito prático',
            desc: 'Inflação de 6% significa que o dinheiro parado perdeu 6% de poder de compra no ano — sem você gastar nada.',
            netos: [
              { label: 'Dinheiro em espécie', desc: 'A pior situação possível: rende zero e perde tudo que a inflação levar.' },
              { label: 'Conta corrente', desc: 'Mesmo caso. Rende zero e some devagar.' },
            ],
          },
        ],
      },
      {
        id: 'selic',
        label: 'Selic e Copom',
        cor: '#FFC93C',
        resumo: 'A taxa que ancora todo o resto',
        filhos: [
          { label: 'Selic', desc: 'A taxa básica da economia. É a referência a partir da qual todo investimento e todo crédito são precificados.' },
          {
            label: 'Copom',
            desc: 'Comitê do Banco Central que se reúne a cada 45 dias aproximadamente para decidir a Selic.',
            netos: [
              { label: 'Comunicado', desc: 'Sai no mesmo dia, é curto e explica o raciocínio. Fonte primária, gratuita.' },
              { label: 'Ata', desc: 'Sai dias depois com mais detalhe do debate interno.' },
            ],
          },
          { label: 'Meta de inflação', desc: 'O alvo que o Banco Central precisa perseguir. Se a inflação foge, ele sobe juros mesmo com a economia fraca.' },
          { label: 'CDI', desc: 'Taxa de empréstimo entre bancos, que anda praticamente colada na Selic. É o "quanto rendeu" da renda fixa.' },
        ],
      },
      {
        id: 'real',
        label: 'Juro real',
        cor: '#22C55E',
        resumo: 'O único que aumenta seu poder de compra',
        filhos: [
          {
            label: 'O que é',
            desc: 'O juro depois de descontar a inflação. É o único número que diz se você ficou mais rico.',
            netos: [
              { label: 'A conta certa', desc: 'Divida (1 + taxa) por (1 + inflação) e subtraia 1. Subtrair direto dá quase certo em taxa baixa e errado em taxa alta.' },
              { label: 'Exemplo', desc: 'Render 10% com inflação de 6% dá pouco menos de 4% real — não 4% exatos.' },
            ],
          },
          { label: 'Brasil', desc: 'Historicamente um dos maiores juros reais do mundo. Isso torna a renda fixa brasileira incomum e explica por que aqui a bolsa disputa espaço com o Tesouro.' },
          { label: 'Juro real negativo', desc: 'Quando a inflação supera o rendimento. Já aconteceu com a poupança em vários anos, e a pessoa nem percebeu.' },
        ],
      },
      {
        id: 'efeitos',
        label: 'Quem ganha e quem perde',
        cor: '#3B82F6',
        resumo: 'A mesma notícia é boa e ruim',
        filhos: [
          { label: 'Selic sobe', desc: 'Ganha quem tem dinheiro em pós-fixado. Perde quem deve, quem tem prefixado comprado e, em geral, a bolsa.' },
          { label: 'Selic cai', desc: 'Ganha quem travou prefixado antes e ganha a bolsa. O pós-fixado passa a render menos.' },
          { label: 'Regra da poupança', desc: 'Com Selic acima de 8,5% ao ano ela rende 0,5% ao mês mais TR — quase sempre menos que um pós-fixado simples.' },
          { label: 'Marcação a mercado', desc: 'Juro sobe, preço do título antigo cai. Só machuca quem precisa vender antes do vencimento.' },
        ],
      },
      {
        id: 'tipos',
        label: 'Os três tipos de rendimento',
        cor: '#8B5CF6',
        resumo: 'Pós, pré e IPCA+',
        filhos: [
          { label: 'Pós-fixado', desc: 'Acompanha a Selic ou o CDI. Rende mais quando o juro sobe. É o certo para reserva de emergência.' },
          { label: 'Prefixado', desc: 'Taxa travada na compra. Ótimo se o juro cair depois, ruim se subir — e oscila de preço no meio do caminho.' },
          { label: 'IPCA+', desc: 'Inflação mais uma taxa fixa. Garante ganho acima da inflação, seja qual for ela. Ideal para prazo longo.' },
          { label: 'Como escolher', desc: 'Prazo curto e reserva: pós. Aposta em queda de juro: pré. Aposentadoria e longo prazo: IPCA+.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Conversor de Taxas',
    intro:
      'A parte mais útil deste módulo é uma conta só: transformar rendimento nominal em rendimento real. É nesse momento que a maioria das pessoas descobre que ganhou bem menos do que achava.',
    passos: [
      'Abra Ferramentas → Conversor de Taxas',
      'Digite o rendimento anual do seu investimento (o número que aparece no extrato)',
      'Digite o IPCA do mesmo período',
      'Veja o resultado no campo de taxa real',
      'Repita com um ano de inflação alta e um de inflação baixa para sentir a diferença',
    ],
    exemploGuiado:
      'Exemplo: um CDB rendeu 11% no ano. Parece ótimo. Com IPCA de 5% no mesmo período, o ganho real fica em torno de 5,7% — pouco mais da metade do que aparecia na tela. Foi esse número, e não o 11%, que aumentou o seu poder de compra.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que é a Selic?', verso: 'A taxa básica de juros da economia brasileira, definida pelo Copom. É a referência a partir da qual praticamente todo investimento e todo crédito do país são precificados.' },
    { id: 'fc2', frente: 'Qual a diferença entre juro nominal e juro real?', verso: 'Nominal é o número que aparece no extrato. Real é o que sobra depois de descontar a inflação — e só ele diz se você ficou mais rico.' },
    { id: 'fc3', frente: 'Por que o preço de um título prefixado cai quando os juros sobem?', verso: 'Porque um título antigo, com taxa menor, passa a valer menos que os novos, que pagam mais. Isso só importa se você vender antes do vencimento.' },
    { id: 'fc4', frente: 'Quando a poupança fica travada?', verso: 'Com a Selic acima de 8,5% ao ano ela rende 0,5% ao mês mais TR — e passa a perder de praticamente qualquer pós-fixado simples.' },
    { id: 'fc5', frente: 'IPCA e IGP-M são a mesma coisa?', verso: 'Não. O IPCA é a inflação oficial ao consumidor, medida pelo IBGE. O IGP-M é mais sensível a atacado e câmbio, e foi historicamente usado em contratos de aluguel.' },
    { id: 'fc6', frente: 'Qual tipo de rendimento serve para a reserva de emergência?', verso: 'Pós-fixado, que acompanha a Selic ou o CDI. Não oscila de preço e rende mais justamente quando os juros sobem.' },
  ],

  quiz: [
    {
      pergunta: 'Seu investimento rendeu 12% no ano e a inflação foi de 7%. Qual foi o ganho real aproximado?',
      alternativas: ['12%', '7%', 'Pouco menos de 5%', '19%'],
      correta: 2,
      explicacao: 'O ganho real é o que sobra depois da inflação. A conta correta divide (1 + 0,12) por (1 + 0,07), o que dá pouco menos de 5% — não os 5% exatos que a subtração direta sugeriria.',
    },
    {
      pergunta: 'A Selic subiu forte. O que acontece com quem já tinha um Tesouro Prefixado comprado?',
      alternativas: ['Passa a render mais imediatamente', 'O preço de mercado do título cai, mas a taxa contratada é mantida se levar até o vencimento', 'Perde o dinheiro investido', 'Nada muda em nenhuma hipótese'],
      correta: 1,
      explicacao: 'É a marcação a mercado. O título antigo, com taxa menor, vale menos que os novos. Quem segura até o vencimento recebe exatamente a taxa combinada na compra.',
    },
    {
      pergunta: 'Quem decide a Selic?',
      alternativas: ['O Ministério da Fazenda', 'O Congresso Nacional', 'O Copom, comitê do Banco Central', 'A B3'],
      correta: 2,
      explicacao: 'O Copom é o Comitê de Política Monetária do Banco Central e se reúne a cada 45 dias aproximadamente para definir a Selic.',
    },
    {
      pergunta: 'Qual afirmação sobre juro alto está correta?',
      alternativas: ['É ruim para todo mundo', 'É bom para quem tem dinheiro guardado em pós-fixado e ruim para quem deve', 'Só afeta quem investe em bolsa', 'Não tem relação com a inflação'],
      correta: 1,
      explicacao: 'Juro alto tem dois lados: beneficia quem é credor, com dinheiro rendendo, e penaliza quem é devedor, com parcelas e rotativo mais caros.',
    },
  ],

  faq: [
    {
      pergunta: 'Se a Selic está alta, vale a pena sair da bolsa e ir tudo para renda fixa?',
      resposta: 'Juro alto realmente torna a renda fixa mais atraente, mas trocar a carteira inteira por causa de um ciclo é aposta, não estratégia. O ajuste saudável é na margem — aumentar a fatia de renda fixa sem abandonar o longo prazo.',
    },
    {
      pergunta: 'Por que meu aluguel sobe pelo IGP-M e não pelo IPCA?',
      resposta: 'Por tradição contratual. O IGP-M é mais sensível a preços no atacado e ao câmbio, o que o torna bem mais volátil. Muitos contratos passaram a usar o IPCA justamente por isso — é um ponto negociável na renovação.',
    },
    {
      pergunta: 'Inflação baixa é sempre bom?',
      resposta: 'Inflação controlada é bom. Mas deflação prolongada, que é queda generalizada de preços, costuma vir acompanhada de economia parada, desemprego e empresas com lucro caindo. O alvo do Banco Central não é zero, é a meta.',
    },
  ],
}
