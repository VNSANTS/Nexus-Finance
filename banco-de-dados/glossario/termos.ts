import type { GlossarioTermo } from '@/types'

/**
 * ===================================================================
 * GLOSSÁRIO — TERMOS FINANCEIROS
 * ===================================================================
 *
 * Um termo por linha. Para adicionar um termo novo, copie uma linha
 * existente, cole no final da lista (antes do `]`) e preencha:
 *
 * - termo: a palavra ou sigla (ex: 'CDB')
 * - def: a definição, em 1-2 frases
 * - modulo: o nome do módulo relacionado (precisa bater com o título de
 *   um módulo existente em banco-de-dados/modulos/, para o glossário
 *   conseguir linkar o termo até o módulo certo)
 *
 * Não precisa editar mais nada — a tela do Glossário já lê esta lista
 * inteira automaticamente.
 * ===================================================================
 */
export const GLOSSARIO_TERMOS: GlossarioTermo[] = [
  { termo: 'Ação', def: 'Menor parte do capital social de uma empresa. Ao comprar uma ação, você se torna sócio dela.', modulo: 'Ações' },
  { termo: 'Ativo', def: 'Tudo que coloca dinheiro no seu bolso: ações, imóveis alugados, títulos que pagam juros.', modulo: 'Educação Financeira' },
  { termo: 'Passivo', def: 'Tudo que tira dinheiro do seu bolso: financiamentos, dívidas, carro que só gera custo.', modulo: 'Educação Financeira' },
  { termo: 'B3', def: 'Bolsa de valores oficial do Brasil, onde ações, FIIs e outros ativos são negociados.', modulo: 'Bolsa de Valores' },
  { termo: 'CDI', def: 'Certificado de Depósito Interbancário — taxa usada como referência para grande parte dos investimentos de renda fixa no Brasil.', modulo: 'Renda Fixa' },
  { termo: 'Selic', def: 'Taxa básica de juros da economia brasileira, definida pelo Banco Central. Referência para praticamente todo investimento no país.', modulo: 'Juros e Inflação' },
  { termo: 'IPCA', def: 'Índice oficial de inflação do Brasil, medido mensalmente pelo IBGE.', modulo: 'Juros e Inflação' },
  { termo: 'Tesouro Direto', def: 'Programa do governo que permite pessoas físicas comprarem títulos públicos diretamente pela internet.', modulo: 'Tesouro Direto' },
  { termo: 'CDB', def: 'Certificado de Depósito Bancário — título de renda fixa emitido por bancos, protegido pelo FGC até certo limite.', modulo: 'Renda Fixa' },
  { termo: 'FII', def: 'Fundo de Investimento Imobiliário — permite investir em imóveis (ou recebíveis imobiliários) através da bolsa, com renda mensal via aluguéis.', modulo: 'Fundos Imobiliários (FIIs)' },
  { termo: 'Dividendo', def: 'Parte do lucro de uma empresa distribuída aos acionistas, geralmente em dinheiro.', modulo: 'Dividendos' },
  { termo: 'Dividend Yield', def: 'Percentual que representa quanto uma ação ou FII pagou de dividendos em relação ao seu preço.', modulo: 'Dividendos' },
  { termo: 'P/L', def: 'Preço sobre Lucro — indicador que mostra quantos anos levaria para recuperar o investimento apenas com os lucros da empresa.', modulo: 'Análise de Indicadores' },
  { termo: 'P/VP', def: 'Preço sobre Valor Patrimonial — compara o preço de mercado de uma ação com seu valor contábil.', modulo: 'Análise de Indicadores' },
  { termo: 'ROE', def: 'Retorno sobre o Patrimônio Líquido — mede a eficiência de uma empresa em gerar lucro com o capital dos acionistas.', modulo: 'Análise de Indicadores' },
  { termo: 'Juro Composto', def: "Juro que incide sobre o valor original mais os juros já acumulados — 'juro sobre juro'.", modulo: 'Educação Financeira' },
  { termo: 'Reserva de Emergência', def: 'Quantia guardada com alta liquidez, equivalente a 3-6 meses de gastos, para imprevistos.', modulo: 'Organização Financeira' },
  { termo: 'Diversificação', def: 'Estratégia de distribuir investimentos entre diferentes ativos para reduzir o risco total da carteira.', modulo: 'Diversificação' },
  { termo: 'Liquidez', def: 'Facilidade e velocidade com que um ativo pode ser convertido em dinheiro sem perda significativa de valor.', modulo: 'Renda Fixa' },
  { termo: 'Volatilidade', def: 'Medida de quanto o preço de um ativo varia ao longo do tempo — quanto maior, mais arriscado no curto prazo.', modulo: 'Gestão de Risco' },
  { termo: 'IFIX', def: 'Índice que mede o desempenho médio dos Fundos Imobiliários mais negociados na B3.', modulo: 'Fundos Imobiliários (FIIs)' },
  { termo: 'Ibovespa', def: 'Principal índice da bolsa brasileira, representando o desempenho médio das ações mais negociadas.', modulo: 'Bolsa de Valores' },
  { termo: 'BDR', def: 'Brazilian Depositary Receipt — permite investir em empresas estrangeiras através da bolsa brasileira.', modulo: 'Investimento Internacional' },
  { termo: 'ETF', def: 'Fundo negociado em bolsa que replica um índice, permitindo investir em uma cesta de ativos com uma única compra.', modulo: 'Investimento Internacional' },
  { termo: 'Small Cap', def: 'Ação de empresa de menor valor de mercado — costuma ter mais potencial de crescimento, mas também mais volatilidade e risco.', modulo: 'Small Caps' },
  { termo: 'Blue Chip', def: 'Ação de empresa grande, consolidada e historicamente estável, geralmente líder no seu setor.', modulo: 'Ações' },
  { termo: 'Valuation', def: 'Processo de estimar o valor justo de uma empresa, usado para decidir se uma ação está cara ou barata em relação ao seu preço de mercado.', modulo: 'Valuation' },
  { termo: 'Buy and Hold', def: 'Estratégia de comprar ativos de qualidade e mantê-los por longos períodos, evitando negociação frequente.', modulo: 'Buy and Hold' },
  { termo: 'Alocação de Ativos', def: 'Como o dinheiro de uma carteira é dividido entre diferentes classes de investimento (renda fixa, ações, FIIs, etc.) de acordo com objetivos e perfil de risco.', modulo: 'Alocação de Ativos' },
  { termo: 'Perfil de Investidor', def: 'Classificação (conservador, moderado ou agressivo) que indica a tolerância ao risco de uma pessoa ao investir.', modulo: 'Carteira de Investimentos' },
  { termo: 'Gestão de Risco', def: 'Conjunto de práticas para identificar, medir e reduzir os riscos de uma carteira de investimentos.', modulo: 'Gestão de Risco' },
  { termo: 'FGC', def: 'Fundo Garantidor de Créditos — protege até R$ 250 mil por CPF e por instituição financeira em investimentos como CDB, LCI e LCA, em caso de falência do banco emissor.', modulo: 'Renda Fixa' },
  { termo: 'LCI', def: 'Letra de Crédito Imobiliário — título de renda fixa isento de Imposto de Renda para pessoa física, usado para financiar o setor imobiliário.', modulo: 'Renda Fixa' },
  { termo: 'LCA', def: 'Letra de Crédito do Agronegócio — título de renda fixa isento de Imposto de Renda para pessoa física, usado para financiar o agronegócio.', modulo: 'Renda Fixa' },
  { termo: 'Debênture', def: 'Título de dívida emitido por empresas (não bancos) para captar recursos, com rentabilidade definida e prazo determinado.', modulo: 'Renda Fixa' },
  { termo: 'Marcação a Mercado', def: 'Atualização diária do preço de um título com base no que ele valeria se fosse vendido naquele momento — pode gerar ganho ou perda antes do vencimento.', modulo: 'Renda Fixa Avançada para Renda Mensal' },
  { termo: 'Come-cotas', def: 'Antecipação semestral do Imposto de Renda em fundos de renda fixa e multimercado, feita automaticamente pela redução do número de cotas do investidor.', modulo: 'Fundos de Investimento' },
  { termo: 'Ganho de Capital', def: 'Lucro obtido na venda de um ativo por um valor maior do que o pago na compra — geralmente sujeito a Imposto de Renda.', modulo: 'Imposto de Renda' },
  { termo: 'Opção', def: 'Contrato que dá o direito (mas não a obrigação) de comprar ou vender um ativo por um preço definido até uma data específica.', modulo: 'Opções' },
  { termo: 'Derivativo', def: 'Instrumento financeiro cujo valor deriva do preço de outro ativo (ação, moeda, commodity) — usado para proteção (hedge) ou especulação.', modulo: 'Opções' },
  { termo: 'IPO', def: 'Oferta Pública Inicial — o momento em que uma empresa vende ações ao público pela primeira vez e passa a ser negociada em bolsa.', modulo: 'Bolsa de Valores' },
  { termo: 'Home Broker', def: 'Plataforma online oferecida por corretoras para comprar e vender ativos na bolsa de valores.', modulo: 'Fundamentos da Bolsa' },
  { termo: 'Corretora', def: 'Instituição financeira autorizada a intermediar a compra e venda de ativos na bolsa de valores em nome do investidor.', modulo: 'Fundamentos da Bolsa' },
  { termo: 'ESG', def: 'Sigla para critérios Ambientais (Environmental), Sociais (Social) e de Governança (Governance) usados para avaliar a sustentabilidade e o impacto de uma empresa.', modulo: 'ESG' },
  { termo: 'FIRE', def: 'Financial Independence, Retire Early — movimento e estratégia focada em acumular patrimônio suficiente para viver de renda e se aposentar mais cedo.', modulo: 'Independência Financeira' },
  { termo: 'Renda Passiva', def: 'Renda recebida de forma recorrente sem exigir trabalho ativo constante, como dividendos, aluguéis ou juros de investimentos.', modulo: 'Renda Passiva' },
  { termo: 'Holding Familiar', def: 'Estrutura societária usada para organizar e planejar a sucessão de bens de uma família, geralmente reduzindo custos e tempo de inventário.', modulo: 'Planejamento Patrimonial' },
  { termo: 'Inventário', def: 'Processo judicial ou extrajudicial de partilha dos bens de uma pessoa falecida entre seus herdeiros.', modulo: 'Planejamento Patrimonial' },
  { termo: 'Taxa DI', def: 'Outro nome para o CDI — taxa média das operações de empréstimo entre bancos, usada como referência para investimentos de renda fixa.', modulo: 'Renda Fixa' },
  { termo: 'Taxa Selic Meta', def: 'Taxa de juros definida pelo Copom a cada reunião, que serve de referência oficial para a política monetária do país.', modulo: 'Juros e Inflação' },
  { termo: 'Duration', def: 'Medida que indica o quanto o preço de um título de renda fixa é sensível a mudanças na taxa de juros — quanto maior a duration, maior a sensibilidade.', modulo: 'Renda Fixa Avançada para Renda Mensal' },
  { termo: 'Beta', def: 'Medida estatística que indica o quanto uma ação tende a variar em relação ao mercado — beta acima de 1 indica maior volatilidade que o índice de referência.', modulo: 'Análise de Indicadores' },
  { termo: 'Stop Loss', def: 'Ordem automática de venda usada para limitar prejuízos, executada quando o preço de um ativo cai até um nível pré-definido.', modulo: 'Gestão de Risco' },
  { termo: 'Yield on Cost', def: 'Rendimento de dividendos calculado sobre o preço que o investidor pagou originalmente por um ativo, não sobre o preço atual de mercado.', modulo: 'Dividendos' },
]
