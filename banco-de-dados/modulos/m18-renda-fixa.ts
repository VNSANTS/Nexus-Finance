import type { Modulo } from '@/types'

export const moduloRendaFixa: Modulo = {
  id: 'renda-fixa',
  trilhaId: 'renda-fixa-previdencia',
  numero: 1,
  titulo: 'Renda Fixa',
  subtitulo: 'Emprestar dinheiro sabendo a regra desde o começo',
  iconName: 'ShieldCheck',
  duracaoMin: 14,

  aprender: {
    oQueE:
      'Renda fixa é empréstimo. Você empresta para o governo, para um banco ou para uma empresa, e recebe juros conforme uma regra combinada na compra. O nome engana um pouco: "fixa" quer dizer que a regra de rendimento é conhecida, não que o valor vai ser sempre o mesmo. Prefixado e IPCA+ oscilam de preço no meio do caminho.',
    porQueImporta:
      'É onde mora a reserva de emergência e o dinheiro de todo objetivo com data marcada nos próximos anos. Errar aqui não empolga ninguém, mas custa dinheiro de graça: escolher um CDB de 95% do CDI quando havia 110% na mesma prateleira é perder rendimento sem correr nenhum risco a mais.',
    naPratica:
      'A comparação que mais confunde é entre produtos tributados e isentos. Um CDB de 110% do CDI parece melhor que uma LCI de 95%, mas o CDB paga imposto de renda e a LCI não. Dependendo do prazo, a LCI de 95% entrega mais no bolso. A conta que importa é sempre a do rendimento líquido. Além disso, o FGC protege CDB, LCI, LCA e poupança até um limite por CPF e por instituição — e não cobre ação, fundo, CRI, CRA nem debênture.',
    passoAPasso: [
      'Defina o prazo do objetivo antes de escolher o produto',
      'Escolha o indexador coerente com o prazo: pós para curto, IPCA+ para longo',
      'Compare sempre o rendimento líquido, considerando isenção de IR',
      'Verifique o FGC e a qualidade do emissor',
      'Confirme a liquidez e a carência antes de aplicar',
    ],
    errosComuns: [
      'Comparar LCI isenta com CDB tributado usando o número bruto',
      'Achar que renda fixa nunca perde valor — prefixado e IPCA+ oscilam',
      'Concentrar acima do limite do FGC no mesmo banco',
      'Comprar prazo longo com dinheiro de curto prazo',
      'Ignorar a carência e descobrir que não dá para sacar',
    ],
    comparativo: {
      titulo: 'Os principais produtos de renda fixa',
      linhas: [
        { label: 'Tesouro Selic', valor: 'Governo · IR regressivo · sem FGC · liquidez D+1' },
        { label: 'CDB', valor: 'Banco · IR regressivo · com FGC · liquidez varia' },
        { label: 'LCI / LCA', valor: 'Banco · isento PF · com FGC · tem carência' },
        { label: 'CRI / CRA', valor: 'Securitizadora · isento PF · sem FGC · baixa liquidez' },
        { label: 'Debênture comum', valor: 'Empresa · IR regressivo · sem FGC · baixa liquidez' },
        { label: 'Debênture incentivada', valor: 'Empresa de infra · isento PF · sem FGC · baixa liquidez' },
      ],
    },
    checklist: [
      'Sei o prazo do objetivo de cada dinheiro meu',
      'Sei diferenciar pós-fixado, prefixado e IPCA+',
      'Comparei pelo menos dois produtos pelo rendimento líquido',
      'Verifiquei o FGC e o emissor do que comprei',
      'Confirmei a liquidez antes de aplicar',
    ],
    livroRelacionado: {
      livroId: 'total-money-makeover',
      textoConexao: 'Dave Ramsey defende construir uma base de segurança sólida e líquida antes de qualquer investimento mais arriscado — a renda fixa deste módulo é exatamente essa camada de estabilidade que o método dele prioriza.',
    },
  },

  mapaMental: {
    label: 'Renda Fixa',
    subtitulo: 'Você empresta dinheiro e sabe a regra do rendimento desde o começo',
    ramos: [
      {
        id: 'emissores',
        label: 'Quem emite',
        cor: '#22C55E',
        resumo: 'Governo, banco ou empresa',
        filhos: [
          { label: 'Governo', desc: 'Tesouro Direto. Menor risco de calote do país. Não tem FGC porque é o próprio governo devendo.' },
          { label: 'Banco', desc: 'CDB, LCI e LCA. Protegidos pelo FGC dentro do limite por CPF e por instituição.' },
          { label: 'Empresa', desc: 'Debênture, CRI e CRA. Rendem mais porque o risco é maior e não há FGC.' },
          { label: 'Regra geral', desc: 'Quanto maior o rendimento oferecido, maior o risco embutido. Sempre. Não existe exceção escondida.' },
        ],
      },
      {
        id: 'indexadores',
        label: 'Tipos de rendimento',
        cor: '#00D4FF',
        resumo: 'Pós, pré e IPCA+',
        filhos: [
          {
            label: 'Pós-fixado',
            desc: 'Segue o CDI. "100% do CDI" é render igual à taxa básica; 110% é render 10% a mais que ela.',
            netos: [
              { label: 'Para que serve', desc: 'Reserva de emergência e dinheiro de curto prazo. Não oscila de preço.' },
            ],
          },
          {
            label: 'Prefixado',
            desc: 'Taxa travada na compra, tipo 12% ao ano. Você sabe o valor final se levar até o vencimento.',
            netos: [
              { label: 'Quando faz sentido', desc: 'Quando você acredita que os juros vão cair e quer travar a taxa alta de hoje.' },
              { label: 'O risco', desc: 'Se o juro subir, o preço do seu título cai. Só machuca se precisar vender antes.' },
            ],
          },
          { label: 'IPCA+', desc: 'Inflação mais uma taxa fixa. Garante ganho acima da inflação, seja qual for ela. Ideal para prazo longo.' },
          { label: 'Como escolher', desc: 'Curto prazo e reserva: pós. Aposta em queda de juro: pré. Aposentadoria: IPCA+.' },
        ],
      },
      {
        id: 'impostos',
        label: 'Impostos',
        cor: '#EF4444',
        resumo: 'Onde a comparação se decide',
        filhos: [
          {
            label: 'Tabela regressiva',
            desc: 'Quanto mais tempo você fica, menos imposto paga: começa em 22,5% e cai até 15% após dois anos.',
            netos: [
              { label: 'Até 180 dias', desc: '22,5% sobre o rendimento.' },
              { label: 'Acima de 720 dias', desc: '15%, a menor alíquota. Vale a pena planejar o prazo pensando nisso.' },
            ],
          },
          { label: 'Isentos para pessoa física', desc: 'LCI, LCA, CRI, CRA e debênture incentivada. Por isso 95% do CDI isento pode ganhar de 110% tributado.' },
          { label: 'IOF', desc: 'Cobrado apenas em resgates antes de 30 dias, e some depois disso. Regra simples, mas pega quem aplica e saca rápido.' },
          { label: 'Comparar líquido', desc: 'Nunca compare a taxa bruta de um produto tributado com a de um isento. É a conta que mais faz gente perder dinheiro sem perceber.' },
        ],
      },
      {
        id: 'seguranca',
        label: 'Segurança',
        cor: '#FFC93C',
        resumo: 'FGC, emissor e concentração',
        filhos: [
          { label: 'FGC', desc: 'Devolve até um limite por CPF e por instituição se o banco quebrar. Cobre poupança, CDB, LCI e LCA.' },
          { label: 'O que o FGC não cobre', desc: 'Ação, FII, fundo, CRI, CRA, debênture e Tesouro. Cada um tem outra proteção ou nenhuma.' },
          { label: 'Diversificar emissor', desc: 'Dividir entre bancos diferentes para ficar dentro do limite em cada um.' },
          { label: 'Risco de crédito', desc: 'A chance de quem pegou emprestado não pagar. É o risco principal de CRI, CRA e debênture.' },
          { label: 'Rating', desc: 'Nota de risco dada por agências. Ajuda como filtro, mas não substitui olhar quem é o emissor.' },
        ],
      },
      {
        id: 'liquidez',
        label: 'Liquidez e prazo',
        cor: '#8B5CF6',
        resumo: 'Poder sacar quando precisa',
        filhos: [
          { label: 'Liquidez diária', desc: 'Dá para sacar quando quiser. É obrigatório para a reserva de emergência.' },
          { label: 'Carência', desc: 'Período em que o dinheiro fica preso. LCI e LCA costumam ter, e isso as desqualifica como reserva.' },
          { label: 'Marcação a mercado', desc: 'Se vender antes do vencimento, você recebe o preço do dia, que pode ser menor que o esperado.' },
          { label: 'Casar prazo com objetivo', desc: 'Vencimento próximo da data em que você vai usar o dinheiro elimina esse risco por completo.' },
        ],
      },
    ],
  },

  simulacao: {
    calculadoraRelacionada: 'Comparador de Renda Fixa',
    intro:
      'A decisão mais comum e mais mal feita em renda fixa é escolher entre um CDB tributado e uma LCI isenta. Os dois números não são comparáveis direto — é preciso descontar o imposto do primeiro antes de olhar.',
    passos: [
      'Abra Ferramentas → Comparador de Renda Fixa',
      'Digite o percentual do CDI do CDB que você está avaliando',
      'Digite o percentual do CDI da LCI ou LCA isenta',
      'Informe o prazo em meses, porque a alíquota de IR depende dele',
      'Compare os dois rendimentos líquidos — é o único número que decide',
    ],
    exemploGuiado:
      'Exemplo: um CDB de 110% do CDI resgatado em 12 meses paga 17,5% de imposto sobre o rendimento, o que derruba o retorno efetivo. Uma LCI de 95% do CDI, isenta, entrega tudo. Nesse prazo os dois ficam muito próximos, e a LCI pode até ganhar. A diferença aparece nos detalhes: a LCI costuma ter carência, o CDB pode ter liquidez diária.',
  },

  flashcards: [
    { id: 'fc1', frente: 'O que significa "renda fixa"?', verso: 'Que a regra de rendimento é conhecida na compra — não que o valor não oscila. Prefixado e IPCA+ variam de preço até o vencimento.' },
    { id: 'fc2', frente: 'Por que 95% do CDI pode render mais que 110%?', verso: 'Porque LCI e LCA são isentas de imposto de renda para pessoa física, e o CDB não. O que decide é o rendimento líquido, nunca o bruto.' },
    { id: 'fc3', frente: 'O que o FGC cobre e o que não cobre?', verso: 'Cobre poupança, CDB, LCI e LCA até um limite por CPF e por instituição. Não cobre ação, fundo, CRI, CRA, debênture nem Tesouro Direto.' },
    { id: 'fc4', frente: 'Qual produto serve para reserva de emergência?', verso: 'Pós-fixado com liquidez diária: Tesouro Selic ou CDB de resgate imediato que pague perto de 100% do CDI. Nada com carência.' },
    { id: 'fc5', frente: 'Como funciona a tabela regressiva de IR?', verso: 'Quanto mais tempo o dinheiro fica aplicado, menor a alíquota: começa em 22,5% e desce até 15% após dois anos.' },
    { id: 'fc6', frente: 'Por que o Tesouro Direto não tem FGC?', verso: 'Porque o devedor é o próprio governo. Não faria sentido um fundo garantidor bancário cobrir quem emite a moeda — é considerado o menor risco de crédito do país.' },
  ],

  quiz: [
    {
      pergunta: 'Você precisa de um lugar para a reserva de emergência. Qual opção serve?',
      alternativas: ['LCI de 97% do CDI com carência de 90 dias', 'Tesouro Selic com resgate em D+1', 'Debênture incentivada com vencimento em 5 anos', 'CDB de 120% do CDI com vencimento em 3 anos'],
      correta: 1,
      explicacao: 'Reserva exige liquidez diária. As outras três opções podem render mais, mas prendem o dinheiro justamente quando você pode precisar dele.',
    },
    {
      pergunta: 'O que o FGC NÃO cobre?',
      alternativas: ['CDB de banco médio', 'LCI', 'Debênture de empresa', 'Poupança'],
      correta: 2,
      explicacao: 'Debêntures são dívida de empresa, não de banco. Não há cobertura do FGC — o risco é inteiramente do emissor, e é por isso que costumam pagar mais.',
    },
    {
      pergunta: 'Um título prefixado pode perder valor?',
      alternativas: ['Não, renda fixa nunca perde', 'Sim, se os juros subirem e você vender antes do vencimento', 'Só se o emissor quebrar', 'Só em caso de inflação'],
      correta: 1,
      explicacao: 'É a marcação a mercado. O título antigo, com taxa menor, vale menos que os novos. Quem segura até o vencimento recebe a taxa contratada.',
    },
    {
      pergunta: 'Qual destes produtos é isento de imposto de renda para pessoa física?',
      alternativas: ['CDB', 'Tesouro Prefixado', 'LCA', 'Fundo de renda fixa'],
      correta: 2,
      explicacao: 'LCI, LCA, CRI, CRA e debêntures incentivadas são isentas para pessoa física. Essa isenção é o que torna a comparação por taxa bruta enganosa.',
    },
  ],

  faq: [
    {
      pergunta: 'CDB de banco pequeno é seguro?',
      resposta: 'Dentro do limite do FGC, o risco é bem controlado — e é justamente por serem menos conhecidos que esses bancos pagam mais. O cuidado é não concentrar acima do limite na mesma instituição e observar também o teto global do FGC por período.',
    },
    {
      pergunta: 'Vale a pena renda fixa quando os juros estão baixos?',
      resposta: 'A função dela não muda: reserva e objetivos com data. O que muda é a proporção da carteira. Com juro real baixo, faz sentido olhar mais para IPCA+ longo e para renda variável no dinheiro de prazo longo.',
    },
    {
      pergunta: 'Posso perder dinheiro em renda fixa?',
      resposta: 'Sim, em três situações: vendendo prefixado ou IPCA+ antes do vencimento com o juro em alta, com o calote de um emissor sem FGC, ou perdendo para a inflação num rendimento real negativo. O terceiro é o mais comum e o menos percebido.',
    },
  ],
}
