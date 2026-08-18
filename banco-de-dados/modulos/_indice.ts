export interface ModuloMeta {
  id: string
  trilhaId: string
  numero: number
  titulo: string
  iconName: string
  duracaoMin: number
  temConteudoCompleto: boolean // true = as 4 abas já estão prontas
}

// duracaoMin estimado por complexidade do tema (8-18min de leitura + atividades)
export const MODULOS: ModuloMeta[] = [
  // Trilha 1 — Fundamentos e Mentalidade
  { id: 'educacao-financeira', trilhaId: 'fundamentos', numero: 1, titulo: 'Educação Financeira', iconName: 'GraduationCap', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'organizacao-financeira', trilhaId: 'fundamentos', numero: 2, titulo: 'Organização Financeira', iconName: 'ClipboardList', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'mentalidade-investidor', trilhaId: 'fundamentos', numero: 3, titulo: 'Mentalidade de Investidor', iconName: 'BrainCircuit', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'psicologia-financeira', trilhaId: 'fundamentos', numero: 4, titulo: 'Psicologia Financeira', iconName: 'HeartHandshake', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'psicologia-do-dinheiro', trilhaId: 'fundamentos', numero: 5, titulo: 'Psicologia do Dinheiro', iconName: 'CircleDollarSign', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'vieses-comportamentais', trilhaId: 'fundamentos', numero: 6, titulo: 'Vieses Comportamentais', iconName: 'Scale', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'educacao-financeira-infantil', trilhaId: 'fundamentos', numero: 7, titulo: 'Educação Financeira Infantil', iconName: 'Baby', duracaoMin: 9, temConteudoCompleto: true },
  { id: 'formacao-investidor', trilhaId: 'fundamentos', numero: 8, titulo: 'Formação do Investidor', iconName: 'Route', duracaoMin: 10, temConteudoCompleto: true },

  // Trilha 2 — Economia e Mercado
  { id: 'mercado-financeiro', trilhaId: 'economia-mercado', numero: 1, titulo: 'Mercado Financeiro', iconName: 'Landmark', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'economia', trilhaId: 'economia-mercado', numero: 2, titulo: 'Economia', iconName: 'Globe2', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'matematica-financeira', trilhaId: 'economia-mercado', numero: 3, titulo: 'Matemática Financeira', iconName: 'Calculator', duracaoMin: 15, temConteudoCompleto: true },
  { id: 'contabilidade-investidores', trilhaId: 'economia-mercado', numero: 4, titulo: 'Contabilidade para Investidores', iconName: 'FileSpreadsheet', duracaoMin: 16, temConteudoCompleto: true },
  { id: 'financas-publicas', trilhaId: 'economia-mercado', numero: 5, titulo: 'Finanças Públicas', iconName: 'Building2', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'cenario-macroeconomico', trilhaId: 'economia-mercado', numero: 6, titulo: 'Cenário Macroeconômico', iconName: 'Globe', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'ciclos-economicos', trilhaId: 'economia-mercado', numero: 7, titulo: 'Ciclos Econômicos', iconName: 'RefreshCw', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'juros-inflacao', trilhaId: 'economia-mercado', numero: 8, titulo: 'Juros e Inflação', iconName: 'Percent', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'cambio', trilhaId: 'economia-mercado', numero: 9, titulo: 'Câmbio', iconName: 'ArrowLeftRight', duracaoMin: 11, temConteudoCompleto: true },

  // Trilha 3 — Renda Fixa e Previdência
  { id: 'renda-fixa', trilhaId: 'renda-fixa-previdencia', numero: 1, titulo: 'Renda Fixa', iconName: 'ShieldCheck', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'tesouro-direto', trilhaId: 'renda-fixa-previdencia', numero: 2, titulo: 'Tesouro Direto', iconName: 'Landmark', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'previdencia', trilhaId: 'renda-fixa-previdencia', numero: 3, titulo: 'Previdência', iconName: 'Umbrella', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'imposto-de-renda', trilhaId: 'renda-fixa-previdencia', numero: 4, titulo: 'Imposto de Renda', iconName: 'Receipt', duracaoMin: 15, temConteudoCompleto: true },

  // Trilha 4 — Fundos
  { id: 'fundos-investimento', trilhaId: 'fundos', numero: 1, titulo: 'Fundos de Investimento', iconName: 'Layers', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'fundos-imobiliarios', trilhaId: 'fundos', numero: 2, titulo: 'Fundos Imobiliários (FIIs)', iconName: 'Building', duracaoMin: 14, temConteudoCompleto: true },

  // Trilha 5 — Ações e Bolsa
  { id: 'bolsa-de-valores', trilhaId: 'acoes-bolsa', numero: 1, titulo: 'Bolsa de Valores', iconName: 'BarChart3', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'fundamentos-bolsa', trilhaId: 'acoes-bolsa', numero: 2, titulo: 'Fundamentos da Bolsa', iconName: 'BookOpenCheck', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'acoes', trilhaId: 'acoes-bolsa', numero: 3, titulo: 'Ações', iconName: 'TrendingUp', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'small-caps', trilhaId: 'acoes-bolsa', numero: 4, titulo: 'Small Caps', iconName: 'Sprout', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'analise-fundamentalista', trilhaId: 'acoes-bolsa', numero: 5, titulo: 'Análise Fundamentalista', iconName: 'SearchCheck', duracaoMin: 16, temConteudoCompleto: true },
  { id: 'analise-indicadores', trilhaId: 'acoes-bolsa', numero: 6, titulo: 'Análise de Indicadores', iconName: 'Gauge', duracaoMin: 17, temConteudoCompleto: true },
  { id: 'analise-tecnica', trilhaId: 'acoes-bolsa', numero: 7, titulo: 'Análise Técnica', iconName: 'CandlestickChart', duracaoMin: 16, temConteudoCompleto: true },
  { id: 'valuation', trilhaId: 'acoes-bolsa', numero: 8, titulo: 'Valuation', iconName: 'Calculator', duracaoMin: 18, temConteudoCompleto: true },
  { id: 'dividendos', trilhaId: 'acoes-bolsa', numero: 9, titulo: 'Dividendos', iconName: 'Coins', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'buy-and-hold', trilhaId: 'acoes-bolsa', numero: 10, titulo: 'Buy and Hold', iconName: 'Anchor', duracaoMin: 10, temConteudoCompleto: true },

  // Trilha 6 — Estratégia e Gestão
  { id: 'primeiros-passos', trilhaId: 'estrategia-gestao', numero: 1, titulo: 'Primeiros Passos para Investir', iconName: 'Footprints', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'carteira-investimentos', trilhaId: 'estrategia-gestao', numero: 2, titulo: 'Carteira de Investimentos', iconName: 'Briefcase', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'diversificacao', trilhaId: 'estrategia-gestao', numero: 3, titulo: 'Diversificação', iconName: 'PieChart', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'alocacao-ativos', trilhaId: 'estrategia-gestao', numero: 4, titulo: 'Alocação de Ativos', iconName: 'Target', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'gestao-de-risco', trilhaId: 'estrategia-gestao', numero: 5, titulo: 'Gestão de Risco', iconName: 'ShieldAlert', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'estrategias-grandes-gestores', trilhaId: 'estrategia-gestao', numero: 6, titulo: 'Estratégias dos Grandes Gestores', iconName: 'Crown', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'investimento-internacional', trilhaId: 'estrategia-gestao', numero: 7, titulo: 'Investimento Internacional', iconName: 'Plane', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'macro-aplicada-carteira', trilhaId: 'estrategia-gestao', numero: 8, titulo: 'Macroeconomia Aplicada à Carteira', iconName: 'LineChart', duracaoMin: 13, temConteudoCompleto: true },

  // Trilha 7 — Alternativos e Derivativos
  { id: 'criptomoedas', trilhaId: 'alternativos-derivativos', numero: 1, titulo: 'Criptomoedas', iconName: 'Bitcoin', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'reserva-de-valor', trilhaId: 'alternativos-derivativos', numero: 2, titulo: 'Reserva de Valor', iconName: 'Vault', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'ouro', trilhaId: 'alternativos-derivativos', numero: 3, titulo: 'Ouro', iconName: 'Gem', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'equity', trilhaId: 'alternativos-derivativos', numero: 4, titulo: 'Equity', iconName: 'Handshake', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'opcoes', trilhaId: 'alternativos-derivativos', numero: 5, titulo: 'Opções', iconName: 'GitBranch', duracaoMin: 17, temConteudoCompleto: true },
  { id: 'investimentos-alternativos', trilhaId: 'alternativos-derivativos', numero: 6, titulo: 'Investimentos Alternativos', iconName: 'Shapes', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'esg', trilhaId: 'alternativos-derivativos', numero: 7, titulo: 'ESG', iconName: 'Leaf', duracaoMin: 10, temConteudoCompleto: true },

  // Trilha 8 — Vida Financeira
  { id: 'independencia-financeira', trilhaId: 'vida-financeira', numero: 1, titulo: 'Independência Financeira', iconName: 'Mountain', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'liberdade-financeira', trilhaId: 'vida-financeira', numero: 2, titulo: 'Liberdade Financeira', iconName: 'Wind', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'construcao-patrimonio', trilhaId: 'vida-financeira', numero: 3, titulo: 'Construção de Patrimônio', iconName: 'Building2', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'renda-passiva', trilhaId: 'vida-financeira', numero: 4, titulo: 'Renda Passiva', iconName: 'Coins', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'planejamento-financeiro', trilhaId: 'vida-financeira', numero: 5, titulo: 'Planejamento Financeiro', iconName: 'CalendarCheck', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'planejamento-patrimonial', trilhaId: 'vida-financeira', numero: 6, titulo: 'Planejamento Patrimonial', iconName: 'FileLock', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'renda-fixa-avancada', trilhaId: 'vida-financeira', numero: 7, titulo: 'Renda Fixa Avançada para Renda Mensal', iconName: 'Wallet2', duracaoMin: 13, temConteudoCompleto: true },

  // Trilha 9 — Carreira e Negócios
  { id: 'empresas-negocios', trilhaId: 'carreira-negocios', numero: 1, titulo: 'Empresas e Negócios', iconName: 'Building2', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'empreendedorismo', trilhaId: 'carreira-negocios', numero: 2, titulo: 'Empreendedorismo', iconName: 'Rocket', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'lideranca', trilhaId: 'carreira-negocios', numero: 3, titulo: 'Liderança', iconName: 'Users', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'carreira', trilhaId: 'carreira-negocios', numero: 4, titulo: 'Carreira', iconName: 'TrendingUp', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'negociacao', trilhaId: 'carreira-negocios', numero: 5, titulo: 'Negociação', iconName: 'MessageSquare', duracaoMin: 12, temConteudoCompleto: true },

  // Trilha 10 — Cultura de Investimentos
  { id: 'historia-grandes-investidores', trilhaId: 'cultura-investimentos', numero: 1, titulo: 'História de Grandes Investidores', iconName: 'ScrollText', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'biografias-investidores', trilhaId: 'cultura-investimentos', numero: 2, titulo: 'Biografias de Investidores', iconName: 'UserCircle', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'estudos-de-caso', trilhaId: 'cultura-investimentos', numero: 3, titulo: 'Estudos de Caso de Empresas', iconName: 'FileSearch', duracaoMin: 14, temConteudoCompleto: true },
  { id: 'documentarios', trilhaId: 'cultura-investimentos', numero: 4, titulo: 'Documentários sobre Economia', iconName: 'Film', duracaoMin: 9, temConteudoCompleto: true },
  { id: 'resumos-livros', trilhaId: 'cultura-investimentos', numero: 5, titulo: 'Resumos de Livros Financeiros', iconName: 'BookMarked', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'relatorios-investimentos', trilhaId: 'cultura-investimentos', numero: 6, titulo: 'Relatórios de Investimentos', iconName: 'FileBarChart', duracaoMin: 12, temConteudoCompleto: true },

  // Trilha 11 — Geração de Receita
  { id: 'introducao-geracao-de-receita', trilhaId: 'geracao-de-receita', numero: 1, titulo: 'Introdução: Geração de Receita', iconName: 'Rocket', duracaoMin: 8, temConteudoCompleto: true },
  { id: 'fases-da-receita', trilhaId: 'geracao-de-receita', numero: 2, titulo: 'As Quatro Fases da Receita', iconName: 'Layers', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'ltv-cac', trilhaId: 'geracao-de-receita', numero: 3, titulo: 'LTV/CAC: A Régua que Decide se Vale a Pena Crescer', iconName: 'Scale', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'icp', trilhaId: 'geracao-de-receita', numero: 4, titulo: 'ICP: O Perfil de Cliente Ideal', iconName: 'Target', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'funil-de-conversao', trilhaId: 'geracao-de-receita', numero: 5, titulo: 'Funil de Conversão: Onde o Dinheiro Vaza', iconName: 'Filter', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'cross-sell-up-sell-nrr', trilhaId: 'geracao-de-receita', numero: 6, titulo: 'Cross-sell, Up-sell e NRR', iconName: 'PackagePlus', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'priorizacao-de-canais', trilhaId: 'geracao-de-receita', numero: 7, titulo: 'Priorização de Canais e o Coeficiente Viral', iconName: 'Radar', duracaoMin: 12, temConteudoCompleto: true },

  // Trilha 12 — Cultura Organizacional
  { id: 'introducao-cultura-organizacional', trilhaId: 'cultura-organizacional', numero: 1, titulo: 'Introdução: Cultura Organizacional', iconName: 'Users', duracaoMin: 8, temConteudoCompleto: true },
  { id: 'informed-captain', trilhaId: 'cultura-organizacional', numero: 2, titulo: 'Informed Captain', iconName: 'Anchor', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'keeper-test', trilhaId: 'cultura-organizacional', numero: 3, titulo: 'Keeper Test', iconName: 'UserCheck', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'estrutura-e-contratacao', trilhaId: 'cultura-organizacional', numero: 4, titulo: 'Estrutura e Contratação', iconName: 'Handshake', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'disagree-and-commit', trilhaId: 'cultura-organizacional', numero: 5, titulo: 'Disagree and Commit', iconName: 'Handshake', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'conversas-1-1', trilhaId: 'cultura-organizacional', numero: 6, titulo: 'Conversas 1:1', iconName: 'MessageSquare', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'okrs', trilhaId: 'cultura-organizacional', numero: 7, titulo: 'OKRs', iconName: 'Target', duracaoMin: 12, temConteudoCompleto: true },

  // Trilha 13 — Eficiência Operacional
  { id: 'introducao-eficiencia-operacional', trilhaId: 'eficiencia-operacional', numero: 1, titulo: 'Introdução: Eficiência Operacional', iconName: 'Settings2', duracaoMin: 8, temConteudoCompleto: true },
  { id: 'oito-desperdicios', trilhaId: 'eficiencia-operacional', numero: 2, titulo: 'Os Oito Desperdícios (Muda)', iconName: 'Trash2', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'vsm', trilhaId: 'eficiencia-operacional', numero: 3, titulo: 'VSM: Mapeamento do Fluxo de Valor', iconName: 'Workflow', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'kaizen-pdca', trilhaId: 'eficiencia-operacional', numero: 4, titulo: 'Kaizen e PDCA', iconName: 'RefreshCw', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'oee', trilhaId: 'eficiencia-operacional', numero: 5, titulo: 'OEE: A Métrica que Mede Eficiência Real', iconName: 'Gauge', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'pessoas-processos-tecnologia', trilhaId: 'eficiencia-operacional', numero: 6, titulo: 'A Ordem Certa: Pessoas, Processos, Tecnologia', iconName: 'ListOrdered', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'alavancagem-corte-custo', trilhaId: 'eficiencia-operacional', numero: 7, titulo: 'Alavancagem de Corte de Custo', iconName: 'Scissors', duracaoMin: 11, temConteudoCompleto: true },

  // Trilha 14 — Gestão Financeira de Negócios
  { id: 'introducao-gestao-financeira-negocios', trilhaId: 'gestao-financeira-negocios', numero: 1, titulo: 'Introdução: Gestão Financeira de Negócios', iconName: 'LineChart', duracaoMin: 8, temConteudoCompleto: true },
  { id: 'custo-vs-investimento', trilhaId: 'gestao-financeira-negocios', numero: 2, titulo: 'Custo vs. Investimento', iconName: 'ArrowLeftRight', duracaoMin: 10, temConteudoCompleto: true },
  { id: 'dre', trilhaId: 'gestao-financeira-negocios', numero: 3, titulo: 'DRE: O Demonstrativo que Conta a Verdade', iconName: 'FileBarChart', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'orcamento-base-zero', trilhaId: 'gestao-financeira-negocios', numero: 4, titulo: 'Orçamento Base Zero', iconName: 'CalendarClock', duracaoMin: 11, temConteudoCompleto: true },
  { id: 'ccc', trilhaId: 'gestao-financeira-negocios', numero: 5, titulo: 'CCC: O Tempo que o Dinheiro Fica Preso', iconName: 'Hourglass', duracaoMin: 12, temConteudoCompleto: true },
  { id: 'roic-vs-wacc', trilhaId: 'gestao-financeira-negocios', numero: 6, titulo: 'ROIC vs. WACC: A Régua dos Investidores', iconName: 'Scale', duracaoMin: 13, temConteudoCompleto: true },
  { id: 'forecast-cenarios', trilhaId: 'gestao-financeira-negocios', numero: 7, titulo: 'Forecast em Cenários', iconName: 'GitBranch', duracaoMin: 12, temConteudoCompleto: true },
]

export function getModulosByTrilha(trilhaId: string): ModuloMeta[] {
  return MODULOS.filter((m) => m.trilhaId === trilhaId).sort((a, b) => a.numero - b.numero)
}
