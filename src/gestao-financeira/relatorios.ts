import type { Categoria, GestaoFinanceiraState, Transacao } from './types'
import type { GastoPorCategoria } from './selectors'
import { saldoTotalContas } from './selectors'

// ---------------------------------------------------------------------------
// Período livre (de/até), separado dos seletores de "mês fechado" que a Home
// já usa (selectors.ts). O Relatório precisa de intervalos arbitrários
// (últimos 3 meses, ano, período personalizado), então em vez de forçar
// esses seletores existentes a fazer algo que não foram pensados pra fazer,
// criamos uma segunda família de funções aqui — a Home continua chamando as
// dela normalmente, nada nela muda.
// ---------------------------------------------------------------------------

export interface PeriodoRelatorio {
  id: string
  label: string
  de: string // YYYY-MM-DD
  ate: string // YYYY-MM-DD
}

function paraISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function primeiroDiaDoMes(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function ultimoDiaDoMes(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

const NOMES_MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export function periodosPreDefinidos(hoje = new Date()): PeriodoRelatorio[] {
  const inicioMesAtual = primeiroDiaDoMes(hoje)
  const fimMesAtual = ultimoDiaDoMes(hoje)
  const inicioMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1)
  const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0)
  // Semana começando no domingo, mesmo critério do resto do app pra calendário.
  const inicioSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - hoje.getDay())

  const periodo = (id: string, label: string, mesesAtras: number): PeriodoRelatorio => ({
    id,
    label,
    de: paraISO(new Date(hoje.getFullYear(), hoje.getMonth() - (mesesAtras - 1), 1)),
    ate: paraISO(hoje),
  })

  // "este-mes" fica sempre no índice 0 — algumas telas usam
  // periodosPreDefinidos()[0] como período padrão ao abrir.
  return [
    { id: 'este-mes', label: 'Este mês', de: paraISO(inicioMesAtual), ate: paraISO(fimMesAtual) },
    { id: 'hoje', label: 'Hoje', de: paraISO(hoje), ate: paraISO(hoje) },
    { id: 'esta-semana', label: 'Esta semana', de: paraISO(inicioSemana), ate: paraISO(hoje) },
    { id: 'mes-passado', label: 'Mês passado', de: paraISO(inicioMesAnterior), ate: paraISO(fimMesAnterior) },
    periodo('ultimos-3', 'Últimos 3 meses', 3),
    periodo('ultimos-6', 'Últimos 6 meses', 6),
    periodo('ultimos-12', 'Últimos 12 meses', 12),
    { id: 'este-ano', label: 'Este ano', de: paraISO(new Date(hoje.getFullYear(), 0, 1)), ate: paraISO(hoje) },
  ]
}

/** Período imediatamente anterior, com a mesma duração — base de comparação. */
export function periodoAnteriorEquivalente(p: PeriodoRelatorio): PeriodoRelatorio {
  const de = new Date(p.de + 'T12:00:00')
  const ate = new Date(p.ate + 'T12:00:00')
  const duracaoDias = Math.round((ate.getTime() - de.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const novoAte = new Date(de.getTime() - 24 * 60 * 60 * 1000)
  const novoDe = new Date(novoAte.getTime() - (duracaoDias - 1) * 24 * 60 * 60 * 1000)
  return { id: `${p.id}-anterior`, label: 'Período anterior', de: paraISO(novoDe), ate: paraISO(novoAte) }
}

export function transacoesNoPeriodo(transacoes: Transacao[], p: PeriodoRelatorio): Transacao[] {
  return transacoes.filter((t) => t.data >= p.de && t.data <= p.ate)
}

export interface ResumoPeriodo {
  receitas: number
  despesas: number
  saldo: number
  taxaEconomia: number | null // % da receita que sobrou; null se não teve receita
}

export function resumoDoPeriodo(transacoes: Transacao[], p: PeriodoRelatorio): ResumoPeriodo {
  const doPeriodo = transacoesNoPeriodo(transacoes, p)
  const receitas = doPeriodo.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const despesas = doPeriodo.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
  return {
    receitas,
    despesas,
    saldo: receitas - despesas,
    taxaEconomia: receitas > 0 ? ((receitas - despesas) / receitas) * 100 : null,
  }
}

export interface GastoPorCategoriaDetalhado extends GastoPorCategoria {
  transacoes: Transacao[]
}

/** Igual a gastosPorCategoria (selectors.ts), só que pra um período livre e trazendo as transações de cada categoria (drill-down). */
export function gastosPorCategoriaNoPeriodo(
  transacoes: Transacao[],
  categorias: Categoria[],
  p: PeriodoRelatorio
): GastoPorCategoriaDetalhado[] {
  const despesas = transacoesNoPeriodo(transacoes, p).filter((t) => t.tipo === 'despesa')
  const totalGeral = despesas.reduce((s, t) => s + t.valor, 0)

  const porCategoria = new Map<string, Transacao[]>()
  for (const t of despesas) {
    const chave = t.categoriaId ?? 'sem-categoria'
    const lista = porCategoria.get(chave) ?? []
    lista.push(t)
    porCategoria.set(chave, lista)
  }

  const resultado: GastoPorCategoriaDetalhado[] = []
  for (const [categoriaId, lista] of porCategoria.entries()) {
    const categoria = categorias.find((c) => c.id === categoriaId)
    const total = lista.reduce((s, t) => s + t.valor, 0)
    resultado.push({
      categoria: categoria ?? { id: 'sem-categoria', nome: 'Sem categoria', tipo: 'despesa', icone: 'MoreHorizontal', cor: '#64748B', categoriaPaiId: null, padrao: false },
      total,
      percentual: totalGeral > 0 ? (total / totalGeral) * 100 : 0,
      transacoes: lista.sort((a, b) => b.valor - a.valor),
    })
  }
  return resultado.sort((a, b) => b.total - a.total)
}

export interface GastoAgrupadoSimples {
  chave: string
  label: string
  total: number
  percentual: number
  cor: string
}

const GRUPOS_NATUREZA: Record<'fixo' | 'variavel', { label: string; cor: string }> = {
  fixo: { label: 'Fixos', cor: '#3B82F6' },
  variavel: { label: 'Variáveis', cor: '#8B5CF6' },
}

const GRUPOS_ESSENCIALIDADE: Record<'necessidade' | 'desejo', { label: string; cor: string }> = {
  necessidade: { label: 'Necessidades', cor: '#22C55E' },
  desejo: { label: 'Desejos', cor: '#EC4899' },
}

/**
 * Despesas do período agrupadas em Fixos x Variáveis. Categorias sem
 * classificação (ex.: criadas pelo usuário) entram como "Variável" — é o
 * padrão mais seguro, já que a maioria dos gastos do dia a dia varia mês a
 * mês (só moradia, assinaturas etc. costumam ser realmente fixos).
 */
export function gastosFixosVariaveis(
  transacoes: Transacao[],
  categorias: Categoria[],
  p: PeriodoRelatorio
): GastoAgrupadoSimples[] {
  const despesas = transacoesNoPeriodo(transacoes, p).filter((t) => t.tipo === 'despesa')
  const totalGeral = despesas.reduce((s, t) => s + t.valor, 0)

  const totais: Record<'fixo' | 'variavel', number> = { fixo: 0, variavel: 0 }
  for (const t of despesas) {
    const categoria = categorias.find((c) => c.id === t.categoriaId)
    totais[categoria?.natureza ?? 'variavel'] += t.valor
  }

  return (['fixo', 'variavel'] as const)
    .filter((chave) => totais[chave] > 0)
    .map((chave) => ({
      chave,
      label: GRUPOS_NATUREZA[chave].label,
      total: totais[chave],
      percentual: totalGeral > 0 ? (totais[chave] / totalGeral) * 100 : 0,
      cor: GRUPOS_NATUREZA[chave].cor,
    }))
}

/**
 * Despesas do período agrupadas em Necessidades x Desejos (lógica igual à
 * de gastosFixosVariaveis, só muda o critério). Sem classificação, entra
 * como "Necessidade" — evita marcar gasto essencial como supérfluo por
 * padrão.
 */
export function gastosNecessidadesDesejos(
  transacoes: Transacao[],
  categorias: Categoria[],
  p: PeriodoRelatorio
): GastoAgrupadoSimples[] {
  const despesas = transacoesNoPeriodo(transacoes, p).filter((t) => t.tipo === 'despesa')
  const totalGeral = despesas.reduce((s, t) => s + t.valor, 0)

  const totais: Record<'necessidade' | 'desejo', number> = { necessidade: 0, desejo: 0 }
  for (const t of despesas) {
    const categoria = categorias.find((c) => c.id === t.categoriaId)
    totais[categoria?.essencialidade ?? 'necessidade'] += t.valor
  }

  return (['necessidade', 'desejo'] as const)
    .filter((chave) => totais[chave] > 0)
    .map((chave) => ({
      chave,
      label: GRUPOS_ESSENCIALIDADE[chave].label,
      total: totais[chave],
      percentual: totalGeral > 0 ? (totais[chave] / totalGeral) * 100 : 0,
      cor: GRUPOS_ESSENCIALIDADE[chave].cor,
    }))
}

export interface PontoMensal {
  mesStr: string
  label: string
  receitas: number
  despesas: number
}

/** Receita x despesa mês a mês, cobrindo todos os meses dentro do período (pro gráfico de barras). */
export function receitaDespesaPorMes(transacoes: Transacao[], p: PeriodoRelatorio): PontoMensal[] {
  const de = new Date(p.de + 'T12:00:00')
  const ate = new Date(p.ate + 'T12:00:00')
  const pontos: PontoMensal[] = []
  const cursor = new Date(de.getFullYear(), de.getMonth(), 1)
  while (cursor <= ate) {
    const mesStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`
    const doMes = transacoes.filter((t) => t.data.startsWith(mesStr))
    pontos.push({
      mesStr,
      label: `${NOMES_MES[cursor.getMonth()]}/${String(cursor.getFullYear()).slice(2)}`,
      receitas: doMes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0),
      despesas: doMes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0),
    })
    cursor.setMonth(cursor.getMonth() + 1)
  }
  return pontos
}

/** As N maiores despesas do período, já com a categoria resolvida. */
export function topGastos(
  transacoes: Transacao[],
  categorias: Categoria[],
  p: PeriodoRelatorio,
  n = 10
): { transacao: Transacao; categoria: Categoria | null }[] {
  return transacoesNoPeriodo(transacoes, p)
    .filter((t) => t.tipo === 'despesa')
    .sort((a, b) => b.valor - a.valor)
    .slice(0, n)
    .map((t) => ({ transacao: t, categoria: categorias.find((c) => c.id === t.categoriaId) ?? null }))
}

/** Categoria cujo gasto mais cresceu (em %) frente ao período anterior equivalente. */
export function categoriaQueMaisCresceu(
  transacoes: Transacao[],
  categorias: Categoria[],
  p: PeriodoRelatorio
): { categoria: Categoria; variacaoPercentual: number; totalAtual: number } | null {
  const atual = gastosPorCategoriaNoPeriodo(transacoes, categorias, p)
  const anterior = gastosPorCategoriaNoPeriodo(transacoes, categorias, periodoAnteriorEquivalente(p))

  let melhor: { categoria: Categoria; variacaoPercentual: number; totalAtual: number } | null = null
  for (const cat of atual) {
    if (cat.categoria.id === 'sem-categoria') continue
    const match = anterior.find((c) => c.categoria.id === cat.categoria.id)
    const totalAnterior = match?.total ?? 0
    if (totalAnterior <= 0) continue // categoria nova no período — não dá pra falar em "crescimento"
    const variacao = ((cat.total - totalAnterior) / totalAnterior) * 100
    if (variacao > 0 && (melhor === null || variacao > melhor.variacaoPercentual)) {
      melhor = { categoria: cat.categoria, variacaoPercentual: variacao, totalAtual: cat.total }
    }
  }
  return melhor
}

/** A única maior transação de despesa do período. */
export function maiorGastoUnico(transacoes: Transacao[], p: PeriodoRelatorio): Transacao | null {
  const despesas = transacoesNoPeriodo(transacoes, p).filter((t) => t.tipo === 'despesa')
  if (despesas.length === 0) return null
  return despesas.reduce((maior, t) => (t.valor > maior.valor ? t : maior))
}

// ---------------------------------------------------------------------------
// Patrimônio histórico + projeção
// ---------------------------------------------------------------------------

export interface PontoPatrimonio {
  mesStr: string
  label: string
  valor: number
}

/**
 * Patrimônio (saldo total de todas as contas não arquivadas) no fim de cada
 * um dos últimos `meses` meses, calculado retroativamente a partir do saldo
 * inicial de cada conta + as transações lançadas até aquela data. Não exige
 * nenhum "snapshot" salvo — reconstitui o histórico a partir do que já existe.
 */
export function patrimonioHistorico(estado: GestaoFinanceiraState, meses = 12): PontoPatrimonio[] {
  const hoje = new Date()
  const pontos: PontoPatrimonio[] = []

  for (let i = meses - 1; i >= 0; i--) {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const fimMes = new Date(data.getFullYear(), data.getMonth() + 1, 0)
    const fimMesStr = paraISO(fimMes)

    // Reaproveita saldoTotalContas (já corrigida pra contar também
    // lançamentos sem conta vinculada) só limitando as transações às que
    // aconteceram até o fim daquele mês — assim os dois cálculos de saldo
    // do app nunca ficam divergentes entre si.
    const transacoesAteOMes = estado.transacoes.filter((t) => t.data <= fimMesStr)
    const valor = saldoTotalContas(estado.contas, transacoesAteOMes)

    pontos.push({
      mesStr: `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`,
      label: `${NOMES_MES[data.getMonth()]}/${String(data.getFullYear()).slice(2)}`,
      valor,
    })
  }

  return pontos
}

export interface PontoProjecao extends PontoPatrimonio {
  projetado: boolean
}

/**
 * Projeta o patrimônio dos próximos `mesesProjecao` meses, aplicando a
 * variação média mensal (receitas - despesas) dos `mesesHistorico` meses
 * fechados anteriores ao atual. É uma projeção simples e linear — assume que
 * o padrão recente se mantém, não prevê eventos futuros.
 */
export function projecaoPatrimonio(
  estado: GestaoFinanceiraState,
  mesesHistorico = 6,
  mesesProjecao = 3
): PontoProjecao[] {
  const hoje = new Date()
  const historico = patrimonioHistorico(estado, mesesHistorico)
  const pontos: PontoProjecao[] = historico.map((p) => ({ ...p, projetado: false }))

  const inicioBase = new Date(hoje.getFullYear(), hoje.getMonth() - mesesHistorico, 1)
  const fimBase = new Date(hoje.getFullYear(), hoje.getMonth(), 0) // último dia do mês anterior ao atual
  const periodoBase: PeriodoRelatorio = { id: 'base-projecao', label: '', de: paraISO(inicioBase), ate: paraISO(fimBase) }
  const mesesBase = receitaDespesaPorMes(estado.transacoes, periodoBase)
  const variacaoMedia =
    mesesBase.length > 0 ? mesesBase.reduce((s, m) => s + (m.receitas - m.despesas), 0) / mesesBase.length : 0

  let ultimoValor = pontos.length > 0 ? pontos[pontos.length - 1].valor : 0
  for (let i = 1; i <= mesesProjecao; i++) {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1)
    ultimoValor += variacaoMedia
    pontos.push({
      mesStr: `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`,
      label: `${NOMES_MES[data.getMonth()]}/${String(data.getFullYear()).slice(2)}`,
      valor: ultimoValor,
      projetado: true,
    })
  }

  return pontos
}

// ---------------------------------------------------------------------------
// Detecção de assinaturas / gastos recorrentes
// ---------------------------------------------------------------------------

export interface AssinaturaDetectada {
  descricao: string
  categoria: Categoria | null
  valorMedio: number
  ocorrencias: number
  mesesDetectados: string[]
  ultimaData: string
}

/**
 * Detecta possíveis assinaturas/gastos recorrentes: despesas com a mesma
 * descrição (ex.: "Netflix") aparecendo em pelo menos 3 meses diferentes
 * dentro da janela de análise, com valor estável (variação de até 20% entre
 * ocorrências). Heurística simples baseada só nos dados já lançados — não
 * lê fatura de cartão nem faz nenhuma chamada externa.
 */
export function detectarAssinaturas(
  transacoes: Transacao[],
  categorias: Categoria[],
  mesesAnalise = 6
): AssinaturaDetectada[] {
  const hoje = new Date()
  const inicio = new Date(hoje.getFullYear(), hoje.getMonth() - (mesesAnalise - 1), 1)
  const inicioStr = paraISO(inicio)

  const despesas = transacoes.filter((t) => t.tipo === 'despesa' && t.data >= inicioStr && t.descricao.trim().length > 0)

  const grupos = new Map<string, Transacao[]>()
  for (const t of despesas) {
    const chave = t.descricao.trim().toLowerCase()
    const lista = grupos.get(chave) ?? []
    lista.push(t)
    grupos.set(chave, lista)
  }

  const resultado: AssinaturaDetectada[] = []
  for (const lista of grupos.values()) {
    const meses = new Set(lista.map((t) => t.data.slice(0, 7)))
    if (meses.size < 3) continue // precisa repetir em pelo menos 3 meses pra não ser coincidência

    const valores = lista.map((t) => t.valor)
    const media = valores.reduce((s, v) => s + v, 0) / valores.length
    const maiorDesvio = media > 0 ? Math.max(...valores.map((v) => Math.abs(v - media) / media)) : 0
    if (maiorDesvio > 0.2) continue // valor varia demais entre ocorrências — não parece fixo

    const ultima = [...lista].sort((a, b) => b.data.localeCompare(a.data))[0]
    resultado.push({
      descricao: ultima.descricao,
      categoria: categorias.find((c) => c.id === ultima.categoriaId) ?? null,
      valorMedio: media,
      ocorrencias: lista.length,
      mesesDetectados: Array.from(meses).sort(),
      ultimaData: ultima.data,
    })
  }

  return resultado.sort((a, b) => b.valorMedio - a.valorMedio)
}

// ---------------------------------------------------------------------------
// Comparação com a própria média histórica
// ---------------------------------------------------------------------------

export interface CategoriaComparadaMedia {
  categoria: Categoria
  atual: number
  media: number
  variacaoPercentual: number | null
}

export interface ComparacaoMedia {
  receitasAtual: number
  despesasAtual: number
  receitasMedia: number
  despesasMedia: number
  mesesBaseUsados: number
  categorias: CategoriaComparadaMedia[]
}

/**
 * Compara o período escolhido com a própria média do usuário nos
 * `mesesBase` meses imediatamente anteriores ao início desse período — tanto
 * no total quanto por categoria. Não compara com "outras pessoas", só com o
 * histórico da própria pessoa.
 */
export function compararComPropriaMedia(
  transacoes: Transacao[],
  categorias: Categoria[],
  periodoAtual: PeriodoRelatorio,
  mesesBase = 6
): ComparacaoMedia {
  const atual = resumoDoPeriodo(transacoes, periodoAtual)
  const catsAtual = gastosPorCategoriaNoPeriodo(transacoes, categorias, periodoAtual)

  const inicioAtual = new Date(periodoAtual.de + 'T12:00:00')
  const fimBase = new Date(inicioAtual.getTime() - 24 * 60 * 60 * 1000)
  const inicioBase = new Date(fimBase.getFullYear(), fimBase.getMonth() - (mesesBase - 1), 1)
  const periodoBase: PeriodoRelatorio = { id: 'base-media', label: '', de: paraISO(inicioBase), ate: paraISO(fimBase) }

  const mesesNoBase = receitaDespesaPorMes(transacoes, periodoBase)
  const nMeses = Math.max(1, mesesNoBase.length)
  const receitasMedia = mesesNoBase.reduce((s, m) => s + m.receitas, 0) / nMeses
  const despesasMedia = mesesNoBase.reduce((s, m) => s + m.despesas, 0) / nMeses

  const catsBase = gastosPorCategoriaNoPeriodo(transacoes, categorias, periodoBase)
  const categoriasComparadas: CategoriaComparadaMedia[] = catsAtual.map((c) => {
    const base = catsBase.find((b) => b.categoria.id === c.categoria.id)
    const mediaCategoria = base ? base.total / nMeses : 0
    return {
      categoria: c.categoria,
      atual: c.total,
      media: mediaCategoria,
      variacaoPercentual: mediaCategoria > 0 ? ((c.total - mediaCategoria) / mediaCategoria) * 100 : null,
    }
  })

  return {
    receitasAtual: atual.receitas,
    despesasAtual: atual.despesas,
    receitasMedia,
    despesasMedia,
    mesesBaseUsados: mesesNoBase.length,
    categorias: categoriasComparadas.sort((a, b) => b.atual - a.atual),
  }
}

// ---------------------------------------------------------------------------
// Retrospectiva anual
// ---------------------------------------------------------------------------

export interface RetrospectivaAnual {
  ano: number
  totalReceitas: number
  totalDespesas: number
  totalEconomizado: number
  mediaEconomiaMensal: number
  melhorMes: PontoMensal | null
  piorMes: PontoMensal | null
  categoriaTop: { categoria: Categoria; total: number } | null
  maiorGastoUnico: Transacao | null
  totalLancamentos: number
  mesesComDados: number
}

/** Resumo "retrospectiva do ano" com os principais números do período — pensado pra uma tela de fechamento anual. */
export function retrospectivaAnual(
  transacoes: Transacao[],
  categorias: Categoria[],
  ano = new Date().getFullYear()
): RetrospectivaAnual {
  const periodoAno: PeriodoRelatorio = { id: `ano-${ano}`, label: `${ano}`, de: `${ano}-01-01`, ate: `${ano}-12-31` }
  const doAno = transacoesNoPeriodo(transacoes, periodoAno)
  const porMes = receitaDespesaPorMes(transacoes, periodoAno)
  const mesesComDados = porMes.filter((m) => m.receitas > 0 || m.despesas > 0)

  const totalReceitas = doAno.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const totalDespesas = doAno.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)

  let melhorMes: PontoMensal | null = null
  let piorMes: PontoMensal | null = null
  for (const m of mesesComDados) {
    const saldo = m.receitas - m.despesas
    if (melhorMes === null || saldo > melhorMes.receitas - melhorMes.despesas) melhorMes = m
    if (piorMes === null || saldo < piorMes.receitas - piorMes.despesas) piorMes = m
  }

  const cats = gastosPorCategoriaNoPeriodo(transacoes, categorias, periodoAno)
  const categoriaTop = cats.length > 0 ? { categoria: cats[0].categoria, total: cats[0].total } : null

  const maiorGastoUnico = doAno
    .filter((t) => t.tipo === 'despesa')
    .reduce<Transacao | null>((maior, t) => (!maior || t.valor > maior.valor ? t : maior), null)

  return {
    ano,
    totalReceitas,
    totalDespesas,
    totalEconomizado: totalReceitas - totalDespesas,
    mediaEconomiaMensal: mesesComDados.length > 0 ? (totalReceitas - totalDespesas) / mesesComDados.length : 0,
    melhorMes,
    piorMes,
    categoriaTop,
    maiorGastoUnico,
    totalLancamentos: doAno.length,
    mesesComDados: mesesComDados.length,
  }
}

/** Gera o conteúdo de um CSV simples (separado por ;, padrão Excel BR) com as transações do período. */
export function gerarCsvTransacoes(transacoes: Transacao[], categorias: Categoria[], p: PeriodoRelatorio): string {
  const linhas = [['Data', 'Hora', 'Tipo', 'Descrição', 'Categoria', 'Forma de pagamento', 'Valor'].join(';')]
  const doPeriodo = transacoesNoPeriodo(transacoes, p).sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora))
  for (const t of doPeriodo) {
    const categoria = categorias.find((c) => c.id === t.categoriaId)?.nome ?? 'Sem categoria'
    const valor = t.valor.toFixed(2).replace('.', ',')
    linhas.push(
      [t.data, t.hora, t.tipo, `"${t.descricao.replace(/"/g, '""')}"`, categoria, t.formaPagamento, valor].join(';')
    )
  }
  return linhas.join('\n')
}
