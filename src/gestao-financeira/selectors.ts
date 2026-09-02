import type { Cartao, Categoria, Conta, GestaoFinanceiraState, Transacao } from './types'

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function mesAtualStr(data = new Date()): string {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
}

export function ehMesmoMes(dataISO: string, mesStr: string): boolean {
  return dataISO.startsWith(mesStr)
}

export function transacoesDoMes(transacoes: Transacao[], mesStr = mesAtualStr()): Transacao[] {
  return transacoes.filter((t) => ehMesmoMes(t.data, mesStr))
}

export function transacoesDoDia(transacoes: Transacao[], diaISO = hojeISO()): Transacao[] {
  return transacoes.filter((t) => t.data === diaISO).sort((a, b) => b.hora.localeCompare(a.hora))
}

export interface ResumoMes {
  receitas: number
  despesas: number
  saldo: number
}

export function resumoDoMes(transacoes: Transacao[], mesStr = mesAtualStr()): ResumoMes {
  const doMes = transacoesDoMes(transacoes, mesStr)
  const receitas = doMes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const despesas = doMes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
  return { receitas, despesas, saldo: receitas - despesas }
}

export function mesAnteriorStr(mesStr = mesAtualStr()): string {
  const [ano, mes] = mesStr.split('-').map(Number)
  const data = new Date(ano, mes - 2, 1)
  return mesAtualStr(data)
}

export function variacaoPercentual(atual: number, anterior: number): number | null {
  if (anterior === 0) return atual === 0 ? 0 : null
  return ((atual - anterior) / Math.abs(anterior)) * 100
}

export function saldoTotalContas(contas: Conta[], transacoes: Transacao[]): number {
  const contasAtivas = contas.filter((c) => !c.arquivada)
  const idsContasAtivas = new Set(contasAtivas.map((c) => c.id))

  const saldoContas = contasAtivas.reduce((soma, conta) => {
    const movimentacoes = transacoes
      .filter((t) => t.contaId === conta.id)
      .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)
    return soma + conta.saldoInicial + movimentacoes
  }, 0)

  // Lançamentos sem conta vinculada (ex.: a pessoa ainda não cadastrou
  // nenhuma conta em "Contas & Cartões", ou a conta foi excluída depois)
  // também precisam entrar no saldo — sem essa soma, o saldo ficava
  // travado em zero mesmo com receitas/despesas lançadas normalmente.
  const saldoSemConta = transacoes
    .filter((t) => !t.contaId || !idsContasAtivas.has(t.contaId))
    .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)

  return saldoContas + saldoSemConta
}

/** Saldo de uma conta específica: saldo inicial + todas as movimentações lançadas nela. */
export function saldoDaConta(conta: Conta, transacoes: Transacao[]): number {
  return (
    conta.saldoInicial +
    transacoes
      .filter((t) => t.contaId === conta.id)
      .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)
  )
}

/** Total gasto num cartão dentro de um mês — soma as despesas lançadas com esse cartão vinculado. */
export function gastoDoCartaoNoMes(cartao: Cartao, transacoes: Transacao[], mesStr = mesAtualStr()): number {
  return transacoes
    .filter((t) => t.cartaoId === cartao.id && t.tipo === 'despesa' && ehMesmoMes(t.data, mesStr))
    .reduce((s, t) => s + t.valor, 0)
}

export interface GastoPorCategoria {
  categoria: Categoria
  total: number
  percentual: number
}

export function gastosPorCategoria(
  transacoes: Transacao[],
  categorias: Categoria[],
  mesStr = mesAtualStr()
): GastoPorCategoria[] {
  const despesasDoMes = transacoesDoMes(transacoes, mesStr).filter((t) => t.tipo === 'despesa')
  const totalGeral = despesasDoMes.reduce((s, t) => s + t.valor, 0)

  const mapa = new Map<string, number>()
  for (const t of despesasDoMes) {
    const chave = t.categoriaId ?? 'sem-categoria'
    mapa.set(chave, (mapa.get(chave) ?? 0) + t.valor)
  }

  const resultado: GastoPorCategoria[] = []
  for (const [categoriaId, total] of mapa.entries()) {
    const categoria = categorias.find((c) => c.id === categoriaId)
    resultado.push({
      categoria: categoria ?? { id: 'sem-categoria', nome: 'Sem categoria', tipo: 'despesa', icone: 'MoreHorizontal', cor: '#64748B', categoriaPaiId: null, padrao: false },
      total,
      percentual: totalGeral > 0 ? (total / totalGeral) * 100 : 0,
    })
  }
  return resultado.sort((a, b) => b.total - a.total)
}

export function contasProximasDoVencimento(estado: GestaoFinanceiraState, dias = 7) {
  const hoje = new Date(hojeISO())
  return estado.dividas
    .filter((d) => !d.quitada && d.vencimento)
    .map((d) => {
      const venc = new Date(d.vencimento as string)
      const diffDias = Math.ceil((venc.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
      return { divida: d, diffDias }
    })
    .filter((x) => x.diffDias >= -30 && x.diffDias <= dias)
    .sort((a, b) => a.diffDias - b.diffDias)
}

export interface PontoDiario {
  dia: number
  receitas: number
  despesas: number
  saldoAcumulado: number
}

function diasNoMes(mesStr: string): number {
  const [ano, mes] = mesStr.split('-').map(Number)
  return new Date(ano, mes, 0).getDate()
}

// Série diária do mês para o gráfico de linha de "Fluxo de caixa" — soma
// receitas/despesas de cada dia e acumula o saldo dia a dia (igual ao
// gráfico do dashboard desktop). Dias sem lançamento ficam com valor 0 e o
// saldo acumulado repete o do dia anterior.
export function serieDiariaDoMes(transacoes: Transacao[], mesStr = mesAtualStr()): PontoDiario[] {
  const total = diasNoMes(mesStr)
  const doMes = transacoesDoMes(transacoes, mesStr)
  const pontos: PontoDiario[] = []
  let acumulado = 0

  for (let dia = 1; dia <= total; dia++) {
    const diaStr = `${mesStr}-${String(dia).padStart(2, '0')}`
    const doDia = doMes.filter((t) => t.data === diaStr)
    const receitas = doDia.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
    const despesas = doDia.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
    acumulado += receitas - despesas
    pontos.push({ dia, receitas, despesas, saldoAcumulado: acumulado })
  }
  return pontos
}

export interface OrcamentoResumo {
  categoria: Categoria
  limite: number
  gasto: number
  percentual: number
}

// Cruza os limites definidos em `orcamentos` com o gasto real de cada
// categoria no mês — usado no card "Orçamento" do dashboard.
export function resumoOrcamentos(estado: GestaoFinanceiraState, mesStr = mesAtualStr()): OrcamentoResumo[] {
  const gastos = gastosPorCategoria(estado.transacoes, estado.categorias, mesStr)
  return estado.orcamentos
    .map((o) => {
      const categoria = estado.categorias.find((c) => c.id === o.categoriaId)
      const gasto = gastos.find((g) => g.categoria.id === o.categoriaId)?.total ?? 0
      return {
        categoria: categoria ?? { id: o.categoriaId, nome: 'Categoria', tipo: 'despesa' as const, icone: 'MoreHorizontal', cor: '#64748B', categoriaPaiId: null, padrao: false },
        limite: o.limite,
        gasto,
        percentual: o.limite > 0 ? Math.min(100, (gasto / o.limite) * 100) : 0,
      }
    })
    .sort((a, b) => b.percentual - a.percentual)
}

export interface Insight {
  id: string
  tipo: 'positivo' | 'atencao' | 'neutro'
  texto: string
}

// Gera os "insights" automáticos do dashboard a partir dos próprios dados —
// nada de IA/API externa, só comparações simples (economia vs mês anterior,
// categoria que mais cresceu, contas perto do vencimento, orçamento estourando).
export function gerarInsights(estado: GestaoFinanceiraState): Insight[] {
  const insights: Insight[] = []
  const atual = resumoDoMes(estado.transacoes)
  const anterior = resumoDoMes(estado.transacoes, mesAnteriorStr())

  const varSaldo = variacaoPercentual(atual.saldo, anterior.saldo)
  if (varSaldo != null && atual.saldo > 0 && varSaldo > 0) {
    insights.push({
      id: 'economia-alta',
      tipo: 'positivo',
      texto: `Você economizou ${varSaldo.toFixed(0)}% a mais este mês! Continue assim e alcance suas metas ainda mais rápido.`,
    })
  }

  const catsAtual = gastosPorCategoria(estado.transacoes, estado.categorias)
  const catsAnterior = gastosPorCategoria(estado.transacoes, estado.categorias, mesAnteriorStr())
  for (const catAtual of catsAtual.slice(0, 3)) {
    const catAnteriorMatch = catsAnterior.find((c) => c.categoria.id === catAtual.categoria.id)
    const variacao = catAnteriorMatch ? variacaoPercentual(catAtual.total, catAnteriorMatch.total) : null
    if (variacao != null && variacao > 10) {
      insights.push({
        id: `categoria-alta-${catAtual.categoria.id}`,
        tipo: 'atencao',
        texto: `Seus gastos com ${catAtual.categoria.nome.toLowerCase()} aumentaram ${variacao.toFixed(0)}% em relação ao mês passado.`,
      })
      break
    }
  }

  const vencimentos = contasProximasDoVencimento(estado, 7)
  if (vencimentos.length > 0) {
    insights.push({
      id: 'contas-vencendo',
      tipo: 'atencao',
      texto: `Você tem ${vencimentos.length} conta${vencimentos.length > 1 ? 's' : ''} próxima${vencimentos.length > 1 ? 's' : ''} do vencimento.`,
    })
  }

  const orcamentosEstourando = resumoOrcamentos(estado).filter((o) => o.percentual >= 90)
  if (orcamentosEstourando.length > 0) {
    insights.push({
      id: 'orcamento-estourando',
      tipo: 'atencao',
      texto: `${orcamentosEstourando[0].categoria.nome} já está em ${orcamentosEstourando[0].percentual.toFixed(0)}% do orçamento definido.`,
    })
  }

  if (insights.length === 0) {
    insights.push({
      id: 'sem-dados',
      tipo: 'neutro',
      texto: 'Assim que você tiver mais lançamentos, seus insights automáticos aparecem aqui.',
    })
  }

  return insights.slice(0, 4)
}
