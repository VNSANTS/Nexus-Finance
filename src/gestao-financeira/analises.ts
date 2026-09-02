import type { Categoria, Conta, Transacao } from './types'
import { periodoAnteriorEquivalente, resumoDoPeriodo, type PeriodoRelatorio, type ResumoPeriodo } from './relatorios'

// ---------------------------------------------------------------------------
// Análises avançadas do Relatório: tudo aqui é derivado só de `transacoes`,
// `contas` e `categorias` que já existem no estado — nenhuma dessas funções
// grava nada novo, é tudo cálculo em cima do que o usuário já lançou.
// ---------------------------------------------------------------------------

const NOMES_MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function mesStrDe(ano: number, mesIndex0: number): string {
  return `${ano}-${String(mesIndex0 + 1).padStart(2, '0')}`
}

function ultimoDiaISODoMes(mesStr: string): string {
  const [ano, mes] = mesStr.split('-').map(Number)
  const ultimoDia = new Date(ano, mes, 0).getDate()
  return `${mesStr}-${String(ultimoDia).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// 1) Patrimônio histórico
// ---------------------------------------------------------------------------

export interface PontoPatrimonio {
  mesStr: string
  label: string
  valor: number
}

/** Saldo total de todas as contas (não arquivadas) até o fim de cada um dos últimos `meses` meses. */
export function patrimonioHistorico(contas: Conta[], transacoes: Transacao[], meses = 12, hoje = new Date()): PontoPatrimonio[] {
  const contasValidas = contas.filter((c) => !c.arquivada)
  const pontos: PontoPatrimonio[] = []

  for (let i = meses - 1; i >= 0; i--) {
    const cursor = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const mesStr = mesStrDe(cursor.getFullYear(), cursor.getMonth())
    const dataCorte = i === 0 ? `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}` : ultimoDiaISODoMes(mesStr)

    const valor = contasValidas.reduce((soma, conta) => {
      const movimentacoes = transacoes
        .filter((t) => t.contaId === conta.id && t.data <= dataCorte)
        .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)
      return soma + conta.saldoInicial + movimentacoes
    }, 0)

    pontos.push({ mesStr, label: `${NOMES_MES[cursor.getMonth()]}/${String(cursor.getFullYear()).slice(2)}`, valor })
  }
  return pontos
}

// ---------------------------------------------------------------------------
// 2) Projeção de saldo
// ---------------------------------------------------------------------------

export interface PontoProjecao {
  mesStr: string
  label: string
  valor: number
  projetado: boolean
}

/**
 * Projeta o saldo dos próximos meses com base na média de receita-despesa
 * dos últimos `mesesHistorico` meses fechados (sem contar o mês atual, que
 * ainda está incompleto). É uma média simples, não é IA nem promete nada —
 * só estica a tendência recente pra frente.
 */
export function projecaoSaldo(
  contas: Conta[],
  transacoes: Transacao[],
  mesesHistorico = 3,
  mesesProjecao = 3,
  hoje = new Date()
): { historico: PontoProjecao[]; mediaMovimentoMensal: number } {
  const contasValidas = contas.filter((c) => !c.arquivada)
  const saldoAtual = contasValidas.reduce((soma, conta) => {
    const movimentacoes = transacoes
      .filter((t) => t.contaId === conta.id)
      .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)
    return soma + conta.saldoInicial + movimentacoes
  }, 0)

  // Média do saldo líquido (receita - despesa) dos últimos meses fechados.
  let somaLiquido = 0
  let mesesComDados = 0
  for (let i = 1; i <= mesesHistorico; i++) {
    const cursor = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const mesStr = mesStrDe(cursor.getFullYear(), cursor.getMonth())
    const doMes = transacoes.filter((t) => t.data.startsWith(mesStr))
    if (doMes.length === 0) continue
    const receitas = doMes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
    const despesas = doMes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
    somaLiquido += receitas - despesas
    mesesComDados++
  }
  const mediaMovimentoMensal = mesesComDados > 0 ? somaLiquido / mesesComDados : 0

  const historico: PontoProjecao[] = [
    { mesStr: mesStrDe(hoje.getFullYear(), hoje.getMonth()), label: `${NOMES_MES[hoje.getMonth()]}/${String(hoje.getFullYear()).slice(2)} (hoje)`, valor: saldoAtual, projetado: false },
  ]
  for (let i = 1; i <= mesesProjecao; i++) {
    const cursor = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1)
    historico.push({
      mesStr: mesStrDe(cursor.getFullYear(), cursor.getMonth()),
      label: `${NOMES_MES[cursor.getMonth()]}/${String(cursor.getFullYear()).slice(2)}`,
      valor: saldoAtual + mediaMovimentoMensal * i,
      projetado: true,
    })
  }

  return { historico, mediaMovimentoMensal }
}

// ---------------------------------------------------------------------------
// 3) Detecção de assinaturas / gastos recorrentes
// ---------------------------------------------------------------------------

export interface AssinaturaDetectada {
  chave: string
  descricao: string
  categoriaId: string | null
  valorMedio: number
  ocorrencias: number
  ultimaData: string
}

function normalizarDescricao(desc: string): string {
  return desc
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\d+/g, '') // remove números (ex.: "netflix 03/26")
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Detecta despesas que se repetem mês a mês com valor parecido — indício de
 * assinatura/gasto fixo. Critério: mesma descrição normalizada aparecendo em
 * pelo menos 3 meses distintos, com valores dentro de 15% de variação entre si.
 */
export function detectarAssinaturas(transacoes: Transacao[], minOcorrencias = 3): AssinaturaDetectada[] {
  const despesas = transacoes.filter((t) => t.tipo === 'despesa' && t.descricao.trim().length > 0)

  const grupos = new Map<string, Transacao[]>()
  for (const t of despesas) {
    const chave = normalizarDescricao(t.descricao)
    if (!chave) continue
    const lista = grupos.get(chave) ?? []
    lista.push(t)
    grupos.set(chave, lista)
  }

  const resultado: AssinaturaDetectada[] = []
  for (const [chave, lista] of grupos.entries()) {
    const mesesDistintos = new Set(lista.map((t) => t.data.slice(0, 7)))
    if (mesesDistintos.size < minOcorrencias) continue

    const media = lista.reduce((s, t) => s + t.valor, 0) / lista.length
    const dentroDaFaixa = lista.every((t) => Math.abs(t.valor - media) / media <= 0.15)
    if (!dentroDaFaixa) continue

    const maisRecente = [...lista].sort((a, b) => b.data.localeCompare(a.data))[0]
    resultado.push({
      chave,
      descricao: maisRecente.descricao,
      categoriaId: maisRecente.categoriaId,
      valorMedio: media,
      ocorrencias: mesesDistintos.size,
      ultimaData: maisRecente.data,
    })
  }

  return resultado.sort((a, b) => b.valorMedio - a.valorMedio)
}

// ---------------------------------------------------------------------------
// 4) Comparação com a própria média histórica
// ---------------------------------------------------------------------------

export interface ComparacaoMedia {
  atual: ResumoPeriodo
  mediaReceitas: number
  mediaDespesas: number
  diffReceitasPct: number | null
  diffDespesasPct: number | null
  periodosComparados: number
}

/** Compara o período escolhido com a média dos `n` períodos anteriores de mesma duração. */
export function comparacaoComMedia(transacoes: Transacao[], periodo: PeriodoRelatorio, n = 6): ComparacaoMedia {
  const atual = resumoDoPeriodo(transacoes, periodo)

  let cursor = periodo
  let somaReceitas = 0
  let somaDespesas = 0
  let contados = 0
  for (let i = 0; i < n; i++) {
    cursor = periodoAnteriorEquivalente(cursor)
    const resumo = resumoDoPeriodo(transacoes, cursor)
    if (resumo.receitas === 0 && resumo.despesas === 0) continue
    somaReceitas += resumo.receitas
    somaDespesas += resumo.despesas
    contados++
  }

  const mediaReceitas = contados > 0 ? somaReceitas / contados : 0
  const mediaDespesas = contados > 0 ? somaDespesas / contados : 0

  return {
    atual,
    mediaReceitas,
    mediaDespesas,
    diffReceitasPct: mediaReceitas > 0 ? ((atual.receitas - mediaReceitas) / mediaReceitas) * 100 : null,
    diffDespesasPct: mediaDespesas > 0 ? ((atual.despesas - mediaDespesas) / mediaDespesas) * 100 : null,
    periodosComparados: contados,
  }
}

// ---------------------------------------------------------------------------
// 5) Retrospectiva anual
// ---------------------------------------------------------------------------

export interface RetrospectivaAnual {
  ano: number
  totalReceitas: number
  totalDespesas: number
  totalEconomizado: number
  mesesComLancamento: number
  melhorMes: { mesStr: string; label: string; saldo: number } | null
  piorMes: { mesStr: string; label: string; saldo: number } | null
  categoriaTop: { categoria: Categoria; total: number } | null
  maiorGastoUnico: Transacao | null
}

export function retrospectivaAnual(transacoes: Transacao[], categorias: Categoria[], ano: number): RetrospectivaAnual {
  const doAno = transacoes.filter((t) => t.data.startsWith(String(ano)))
  const totalReceitas = doAno.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const totalDespesas = doAno.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)

  let melhorMes: RetrospectivaAnual['melhorMes'] = null
  let piorMes: RetrospectivaAnual['piorMes'] = null
  let mesesComLancamento = 0
  for (let m = 0; m < 12; m++) {
    const mesStr = mesStrDe(ano, m)
    const doMes = doAno.filter((t) => t.data.startsWith(mesStr))
    if (doMes.length === 0) continue
    mesesComLancamento++
    const receitas = doMes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
    const despesas = doMes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
    const saldo = receitas - despesas
    const label = `${NOMES_MES[m]}/${String(ano).slice(2)}`
    if (!melhorMes || saldo > melhorMes.saldo) melhorMes = { mesStr, label, saldo }
    if (!piorMes || saldo < piorMes.saldo) piorMes = { mesStr, label, saldo }
  }

  const gastosPorCat = new Map<string, number>()
  for (const t of doAno.filter((t) => t.tipo === 'despesa')) {
    const chave = t.categoriaId ?? 'sem-categoria'
    gastosPorCat.set(chave, (gastosPorCat.get(chave) ?? 0) + t.valor)
  }
  let categoriaTop: RetrospectivaAnual['categoriaTop'] = null
  for (const [categoriaId, total] of gastosPorCat.entries()) {
    if (!categoriaTop || total > categoriaTop.total) {
      const categoria = categorias.find((c) => c.id === categoriaId)
      if (categoria) categoriaTop = { categoria, total }
    }
  }

  const despesasDoAno = doAno.filter((t) => t.tipo === 'despesa')
  const maiorGastoUnico = despesasDoAno.length > 0 ? despesasDoAno.reduce((maior, t) => (t.valor > maior.valor ? t : maior)) : null

  return {
    ano,
    totalReceitas,
    totalDespesas,
    totalEconomizado: totalReceitas - totalDespesas,
    mesesComLancamento,
    melhorMes,
    piorMes,
    categoriaTop,
    maiorGastoUnico,
  }
}
