import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3, Eye, EyeOff, Trophy, Download, ChevronDown, PiggyBank, ArrowUpCircle, ArrowDownCircle,
  Landmark, Scale, Repeat, Image as ImageIcon, FileText, PartyPopper, ChevronRight, ListFilter,
  SlidersHorizontal, X, TrendingDown, Layers, Sparkles,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfSeletorPeriodo from '../components/GfSeletorPeriodo'
import GfGraficoBarrasMensal from '../components/GfGraficoBarrasMensal'
import GfDonutCategorias from '../components/GfDonutCategorias'
import GfDonutDuplo from '../components/GfDonutDuplo'
import GfGraficoLinhaSimples from '../components/GfGraficoLinhaSimples'
import GfGraficoPatrimonio from '../components/GfGraficoPatrimonio'
import GfCardAssinaturas from '../components/GfCardAssinaturas'
import GfCardComparacaoMedia from '../components/GfCardComparacaoMedia'
import GfFiltrosRelatorio, {
  FILTROS_VAZIOS,
  contarFiltrosAtivos,
  LABEL_FORMA_PAGAMENTO,
  type FiltrosRelatorio,
} from '../components/GfFiltrosRelatorio'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { resumoOrcamentos } from '../selectors'
import {
  periodosPreDefinidos,
  resumoDoPeriodo,
  gastosPorCategoriaNoPeriodo,
  gastosFixosVariaveis,
  gastosNecessidadesDesejos,
  receitaDespesaPorMes,
  topGastos,
  categoriaQueMaisCresceu,
  maiorGastoUnico,
  gerarCsvTransacoes,
  projecaoPatrimonio,
  detectarAssinaturas,
  compararComPropriaMedia,
  type PeriodoRelatorio,
} from '../relatorios'
import { exportarComoImagem, exportarComoPdf } from '../exportar'
import { formatPercent } from '@/utils/format'
import { formatMoeda } from '../formatMoeda'
import { iconePorNome } from '../iconMap'

function baixarArquivo(nome: string, conteudo: string, tipo: string) {
  const blob = new Blob([conteudo], { type: tipo })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function GfRelatoriosPage() {
  const navigate = useNavigate()
  const { estado, permissoes } = useGestaoFinanceira()
  const [valoresVisiveis, setValoresVisiveis] = useState(true)
  const [periodo, setPeriodo] = useState<PeriodoRelatorio>(
    () => periodosPreDefinidos().find((p) => p.id === 'este-mes') ?? periodosPreDefinidos()[0]
  )
  const [categoriaAberta, setCategoriaAberta] = useState<string | null>(null)
  const [exportando, setExportando] = useState<'pdf' | 'imagem' | null>(null)
  const [filtros, setFiltros] = useState<FiltrosRelatorio>(FILTROS_VAZIOS)
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const filtrosAtivos = contarFiltrosAtivos(filtros)

  const v = (n: number) => (permissoes.verSaldos && valoresVisiveis ? formatMoeda(n, estado) : '••••••')

  // Universo de transações depois dos filtros (Tipo, Categoria, Conta,
  // Forma de pagamento) — aplicado ANTES do recorte por período, que cada
  // seletor abaixo já faz internamente. Assim os filtros valem pra tudo:
  // resumo, gráficos, top gastos, assinaturas etc., sem duplicar lógica de
  // filtro dentro de cada função de relatorios.ts.
  const transacoesFiltradas = useMemo(() => {
    if (filtrosAtivos === 0) return estado.transacoes
    return estado.transacoes.filter((t) => {
      if (filtros.tipo !== 'todos' && t.tipo !== filtros.tipo) return false
      if (filtros.categorias.length > 0 && !filtros.categorias.includes(t.categoriaId ?? '')) return false
      if (filtros.contas.length > 0 && !filtros.contas.includes(t.contaId ?? '')) return false
      if (filtros.formas.length > 0 && !filtros.formas.includes(t.formaPagamento)) return false
      return true
    })
  }, [estado.transacoes, filtros, filtrosAtivos])

  const resumo = useMemo(() => resumoDoPeriodo(transacoesFiltradas, periodo), [transacoesFiltradas, periodo])
  const categorias = useMemo(
    () => gastosPorCategoriaNoPeriodo(transacoesFiltradas, estado.categorias, periodo),
    [transacoesFiltradas, estado.categorias, periodo]
  )
  const porMes = useMemo(() => receitaDespesaPorMes(transacoesFiltradas, periodo), [transacoesFiltradas, periodo])
  const gastosMensais = useMemo(() => porMes.map((m) => ({ label: m.label, valor: m.despesas })), [porMes])
  const fixosVariaveis = useMemo(
    () => gastosFixosVariaveis(transacoesFiltradas, estado.categorias, periodo),
    [transacoesFiltradas, estado.categorias, periodo]
  )
  const necessidadesDesejos = useMemo(
    () => gastosNecessidadesDesejos(transacoesFiltradas, estado.categorias, periodo),
    [transacoesFiltradas, estado.categorias, periodo]
  )
  const top10 = useMemo(
    () => topGastos(transacoesFiltradas, estado.categorias, periodo, 10),
    [transacoesFiltradas, estado.categorias, periodo]
  )
  const maiorCrescimento = useMemo(
    () => categoriaQueMaisCresceu(transacoesFiltradas, estado.categorias, periodo),
    [transacoesFiltradas, estado.categorias, periodo]
  )
  const maiorGasto = useMemo(() => maiorGastoUnico(transacoesFiltradas, periodo), [transacoesFiltradas, periodo])
  // Patrimônio reflete o saldo real de todas as contas — não é filtrado
  // por Tipo/Categoria/Forma, senão o gráfico passaria a mostrar um
  // "patrimônio" que não bate com o saldo de verdade das contas.
  const patrimonio = useMemo(() => projecaoPatrimonio(estado, 6, 3), [estado])
  const assinaturas = useMemo(
    () => detectarAssinaturas(transacoesFiltradas, estado.categorias),
    [transacoesFiltradas, estado.categorias]
  )
  const comparacaoMedia = useMemo(
    () => compararComPropriaMedia(transacoesFiltradas, estado.categorias, periodo, 6),
    [transacoesFiltradas, estado.categorias, periodo]
  )

  // Orçamento é definido por mês — só faz sentido comparar quando o período
  // escolhido é exatamente um mês fechado (não numa janela de "últimos N meses").
  const mesUnico =
    periodo.de.slice(8, 10) === '01' && periodo.de.slice(0, 7) === periodo.ate.slice(0, 7) ? periodo.de.slice(0, 7) : null
  const orcamentos = useMemo(() => (mesUnico ? resumoOrcamentos(estado, mesUnico) : []), [estado, mesUnico])

  const totalDespesasCategoria = categorias.reduce((s, c) => s + c.total, 0)

  // Proporção entrou x saiu, pra desenhar a barrinha comparativa do card novo.
  const movimentoTotal = resumo.receitas + resumo.despesas
  const pctEntrou = movimentoTotal > 0 ? (resumo.receitas / movimentoTotal) * 100 : 50

  function exportarCsv() {
    const csv = gerarCsvTransacoes(estado.transacoes, estado.categorias, periodo)
    baixarArquivo(`nexus-relatorio-${periodo.de}_a_${periodo.ate}.csv`, csv, 'text/csv;charset=utf-8')
  }

  async function exportarImagem() {
    setExportando('imagem')
    try {
      await exportarComoImagem('gf-relatorio-conteudo', `nexus-relatorio-${periodo.de}_a_${periodo.ate}`)
    } catch {
      alert('Não foi possível gerar a imagem agora. Tenta de novo em alguns segundos.')
    } finally {
      setExportando(null)
    }
  }

  async function exportarPdf() {
    setExportando('pdf')
    try {
      await exportarComoPdf('gf-relatorio-conteudo', `nexus-relatorio-${periodo.de}_a_${periodo.ate}`)
    } catch {
      alert('Não foi possível gerar o PDF agora. Tenta de novo em alguns segundos.')
    } finally {
      setExportando(null)
    }
  }

  return (
    <div className="pb-28">
      <GfHeader
        titulo="Relatórios"
        subtitulo="Análises do período escolhido"
        icone={BarChart3}
        corIcone="#22C55E"
        acoes={
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setFiltrosAbertos(true)}
              className="relative w-8 h-8 rounded-xl card-surface border border-border flex items-center justify-center text-slate-400"
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal size={14} />
              {filtrosAtivos > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-accent-cyan text-bg text-[9.5px] font-bold flex items-center justify-center">
                  {filtrosAtivos}
                </span>
              )}
            </button>
            {permissoes.verSaldos && (
              <button onClick={() => setValoresVisiveis((val) => !val)} aria-label={valoresVisiveis ? 'Ocultar valores' : 'Mostrar valores'}>
                {valoresVisiveis ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
              </button>
            )}
          </div>
        }
      />

      <div className="px-4 mt-3">
        <GfSeletorPeriodo ativo={periodo} onEscolher={setPeriodo} />
      </div>

      {/* Resumo dos filtros ativos, com atalho pra remover cada um sem reabrir o sheet inteiro */}
      {filtrosAtivos > 0 && (
        <div className="px-4 mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5 -mx-4 px-4 scrollbar-none">
          {filtros.tipo !== 'todos' && (
            <FiltroAtivoChip
              label={filtros.tipo === 'receita' ? 'Receitas' : 'Despesas'}
              onRemover={() => setFiltros({ ...filtros, tipo: 'todos' })}
            />
          )}
          {filtros.categorias.map((id) => {
            const cat = estado.categorias.find((c) => c.id === id)
            if (!cat) return null
            return (
              <FiltroAtivoChip
                key={id}
                label={cat.nome}
                onRemover={() => setFiltros({ ...filtros, categorias: filtros.categorias.filter((c) => c !== id) })}
              />
            )
          })}
          {filtros.contas.map((id) => {
            const conta = estado.contas.find((c) => c.id === id)
            if (!conta) return null
            return (
              <FiltroAtivoChip
                key={id}
                label={conta.nome}
                onRemover={() => setFiltros({ ...filtros, contas: filtros.contas.filter((c) => c !== id) })}
              />
            )
          })}
          {filtros.formas.map((f) => (
            <FiltroAtivoChip
              key={f}
              label={LABEL_FORMA_PAGAMENTO[f]}
              onRemover={() => setFiltros({ ...filtros, formas: filtros.formas.filter((x) => x !== f) })}
            />
          ))}
          <button onClick={() => setFiltros(FILTROS_VAZIOS)} className="shrink-0 text-[11px] text-slate-500 font-semibold px-1">
            Limpar
          </button>
        </div>
      )}

      <GfFiltrosRelatorio
        aberto={filtrosAbertos}
        categorias={estado.categorias}
        contas={estado.contas}
        filtros={filtros}
        onMudar={setFiltros}
        onFechar={() => setFiltrosAbertos(false)}
      />

      {/* Entrada pro drill-down: Relatórios → Lista de movimentações → Detalhes */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate('/gestao-financeira/movimentacoes')}
          className="w-full card-surface rounded-2xl p-3.5 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-cyan/15 flex items-center justify-center shrink-0">
            <ListFilter size={16} className="text-accent-cyan" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[12.5px] text-white font-semibold">Ver movimentações</p>
            <p className="text-[10.5px] text-slate-500">Lista detalhada, com busca e filtros</p>
          </div>
          <ChevronRight size={15} className="text-slate-600" />
        </button>
      </div>

      {/* Tudo daqui até o fechamento desta div é o que entra na exportação em PDF/imagem */}
      <div id="gf-relatorio-conteudo" className="bg-bg">

      {/* Card: Entrou x Saiu — visão rápida do que movimentou no período, antes de entrar nos detalhes */}
      <div className="px-4 mt-4">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-3">Entrou x Saiu</p>
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-accent-green/15 flex items-center justify-center shrink-0">
                <ArrowUpCircle size={20} className="text-accent-green" />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] text-slate-500">Entrou</p>
                <p className="text-[16px] font-display font-extrabold text-accent-green truncate">{v(resumo.receitas)}</p>
              </div>
            </div>
            <div className="w-px h-9 bg-border mx-2.5 shrink-0" />
            <div className="flex-1 flex items-center justify-end gap-2.5 min-w-0 text-right">
              <div className="min-w-0">
                <p className="text-[10.5px] text-slate-500">Saiu</p>
                <p className="text-[16px] font-display font-extrabold text-accent-red truncate">{v(resumo.despesas)}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-accent-red/15 flex items-center justify-center shrink-0">
                <ArrowDownCircle size={20} className="text-accent-red" />
              </div>
            </div>
          </div>
          {movimentoTotal > 0 && (
            <div className="mt-3.5">
              <div className="w-full h-2 rounded-full bg-border overflow-hidden flex">
                <div className="h-full bg-accent-green" style={{ width: `${pctEntrou}%` }} />
                <div className="h-full bg-accent-red" style={{ width: `${100 - pctEntrou}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-slate-500">{pctEntrou.toFixed(0)}% entrou</span>
                <span className="text-[10px] text-slate-500">{(100 - pctEntrou).toFixed(0)}% saiu</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[11px] text-slate-500 font-medium">Saldo do período</p>
          <p className={`text-[17px] font-display font-extrabold mt-1 ${resumo.saldo >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{v(resumo.saldo)}</p>
        </div>
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[11px] text-slate-500 font-medium">Taxa de economia</p>
          <p className="text-[17px] font-display font-extrabold text-white mt-1">
            {resumo.taxaEconomia != null ? formatPercent(resumo.taxaEconomia, 0) : '—'}
          </p>
        </div>
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[11px] text-slate-500 font-medium">Maior gasto único</p>
          <p className="text-[14px] font-display font-extrabold text-white mt-1 truncate">{maiorGasto ? v(maiorGasto.valor) : '—'}</p>
          {maiorGasto && <p className="text-[10.5px] text-slate-500 truncate mt-0.5">{maiorGasto.descricao}</p>}
        </div>
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[11px] text-slate-500 font-medium">Categoria em alta</p>
          {maiorCrescimento ? (
            <>
              <p className="text-[14px] font-display font-extrabold text-accent-red mt-1 truncate">{maiorCrescimento.categoria.nome}</p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">+{maiorCrescimento.variacaoPercentual.toFixed(0)}% vs período anterior</p>
            </>
          ) : (
            <p className="text-[13px] text-slate-500 mt-1">Nenhuma em alta</p>
          )}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-2">Receita x despesa por mês</p>
          <GfGraficoBarrasMensal pontos={porMes} visivel={permissoes.verSaldos && valoresVisiveis} />
        </div>
      </div>

      {/* Card: Patrimônio histórico + projeção */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Landmark size={14} className="text-accent-cyan" /> Patrimônio ao longo do tempo
          </p>
          <p className="text-[10.5px] text-slate-500 mb-2">Saldo de todas as contas mês a mês, com projeção pros próximos 3 meses</p>
          <GfGraficoPatrimonio pontos={patrimonio} visivel={permissoes.verSaldos && valoresVisiveis} />
        </div>
      </div>

      {/* Card: Gastos ao longo dos meses — só a linha de despesas, pra ver a tendência isolada do fluxo entrou/saiu */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <TrendingDown size={14} className="text-accent-red" /> Gastos ao longo dos meses
          </p>
          <p className="text-[10.5px] text-slate-500 mb-2">Total de despesas em cada mês do período escolhido</p>
          <GfGraficoLinhaSimples pontos={gastosMensais} visivel={permissoes.verSaldos && valoresVisiveis} cor="#EF4444" />
        </div>
      </div>

      {/* Card: Comparação com a própria média */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Scale size={14} className="text-accent-cyan" /> Comparado com você mesmo
          </p>
          <GfCardComparacaoMedia comparacao={comparacaoMedia} visivel={permissoes.verSaldos && valoresVisiveis} />
        </div>
      </div>

      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-1">Gastos por categoria</p>
          <GfDonutCategorias categorias={categorias} total={totalDespesasCategoria} visivel={permissoes.verSaldos && valoresVisiveis} />

          {categorias.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-border">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Toque numa categoria para ver os lançamentos</p>
              {categorias.map((cat) => {
                const Icone = iconePorNome(cat.categoria.icone)
                const aberta = categoriaAberta === cat.categoria.id
                return (
                  <div key={cat.categoria.id}>
                    <button
                      onClick={() => setCategoriaAberta(aberta ? null : cat.categoria.id)}
                      className="w-full flex items-center gap-2.5 py-1.5"
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cat.categoria.cor}22` }}>
                        <Icone size={12} style={{ color: cat.categoria.cor }} />
                      </div>
                      <span className="text-[12px] text-slate-300 font-medium flex-1 text-left truncate">{cat.categoria.nome}</span>
                      <span className="text-[11.5px] text-slate-500">{cat.transacoes.length} lanç.</span>
                      <ChevronDown size={14} className={`text-slate-600 transition-transform ${aberta ? 'rotate-180' : ''}`} />
                    </button>
                    {aberta && (
                      <div className="flex flex-col gap-1 pl-8 pb-2">
                        {cat.transacoes.map((t) => (
                          <div key={t.id} className="flex items-center justify-between text-[11.5px]">
                            <span className="text-slate-400 truncate flex-1">{t.descricao || '(sem descrição)'}</span>
                            <span className="text-slate-500 shrink-0 ml-2">{t.data.split('-').reverse().join('/')}</span>
                            <span className="text-white font-semibold shrink-0 ml-2 w-[72px] text-right">{v(t.valor)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Card: Gastos fixos x variáveis */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
            <Layers size={14} className="text-accent-cyan" /> Gastos fixos x variáveis
          </p>
          <GfDonutDuplo segmentos={fixosVariaveis} total={totalDespesasCategoria} visivel={permissoes.verSaldos && valoresVisiveis} legenda="Total" />
          {fixosVariaveis.length === 0 && categorias.length > 0 && (
            <p className="text-[10.5px] text-slate-600 mt-2">Nenhuma categoria classificada como fixa ou variável ainda.</p>
          )}
        </div>
      </div>

      {/* Card: Necessidades x desejos */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
            <Sparkles size={14} className="text-accent-cyan" /> Necessidades x desejos
          </p>
          <GfDonutDuplo segmentos={necessidadesDesejos} total={totalDespesasCategoria} visivel={permissoes.verSaldos && valoresVisiveis} legenda="Total" />
        </div>
      </div>

      {/* Card: Assinaturas / gastos recorrentes detectados */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[13px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Repeat size={14} className="text-accent-cyan" /> Assinaturas detectadas
          </p>
          <GfCardAssinaturas assinaturas={assinaturas} visivel={permissoes.verSaldos && valoresVisiveis} />
        </div>
      </div>

      {top10.length > 0 && (
        <div className="px-4 mt-3">
          <div className="card-surface rounded-[20px] p-4">
            <p className="text-[13px] text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
              <Trophy size={14} className="text-accent-gold" /> Maiores gastos do período
            </p>
            <div className="flex flex-col gap-2">
              {top10.map(({ transacao, categoria }, i) => (
                <div key={transacao.id} className="flex items-center gap-2.5">
                  <span className="text-[11px] text-slate-600 font-bold w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-slate-300 font-medium truncate">{transacao.descricao || '(sem descrição)'}</p>
                    <p className="text-[10.5px] text-slate-500">{categoria?.nome ?? 'Sem categoria'} · {transacao.data.split('-').reverse().join('/')}</p>
                  </div>
                  <span className="text-[12.5px] font-semibold text-white shrink-0">{v(transacao.valor)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mesUnico && orcamentos.length > 0 && (
        <div className="px-4 mt-3">
          <div className="card-surface rounded-[20px] p-4">
            <p className="text-[13px] text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
              <PiggyBank size={14} className="text-accent-green" /> Orçado x realizado
            </p>
            <div className="flex flex-col gap-3">
              {orcamentos.map((o) => (
                <div key={o.categoria.id}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="text-slate-300 font-medium">{o.categoria.nome}</span>
                    <span className={o.percentual >= 100 ? 'text-accent-red font-semibold' : 'text-slate-500'}>
                      {v(o.gasto)} / {v(o.limite)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full ${o.percentual >= 100 ? 'bg-accent-red' : o.percentual >= 90 ? 'bg-amber-400' : 'bg-accent-green'}`}
                      style={{ width: `${Math.min(100, o.percentual)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!mesUnico && (
        <div className="px-4 mt-3">
          <p className="text-[11.5px] text-slate-600 text-center">Orçado x realizado fica disponível quando o período escolhido é um mês inteiro.</p>
        </div>
      )}

      </div>
      {/* fim da área exportável em PDF/imagem */}

      {/* Card: link pra Retrospectiva anual */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate('/gestao-financeira/retrospectiva')}
          className="w-full card-surface rounded-[20px] p-4 flex items-center gap-3.5 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6]/15 flex items-center justify-center shrink-0">
            <PartyPopper size={20} className="text-[#8B5CF6]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-bold text-white">Retrospectiva anual</p>
            <p className="text-[11px] text-slate-500">Veja o resumo completo do seu ano</p>
          </div>
          <ChevronRight size={16} className="text-slate-600 shrink-0" />
        </button>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-2">
        <button
          onClick={exportarCsv}
          className="w-full flex items-center justify-center gap-2 card-surface rounded-2xl py-3 text-[13px] font-semibold text-slate-300"
        >
          <Download size={15} /> Exportar transações do período (CSV)
        </button>
        <div className="flex gap-2">
          <button
            onClick={exportarImagem}
            disabled={exportando !== null}
            className="flex-1 flex items-center justify-center gap-2 card-surface rounded-2xl py-3 text-[13px] font-semibold text-slate-300 disabled:opacity-60"
          >
            <ImageIcon size={15} /> {exportando === 'imagem' ? 'Gerando...' : 'Imagem'}
          </button>
          <button
            onClick={exportarPdf}
            disabled={exportando !== null}
            className="flex-1 flex items-center justify-center gap-2 card-surface rounded-2xl py-3 text-[13px] font-semibold text-slate-300 disabled:opacity-60"
          >
            <FileText size={15} /> {exportando === 'pdf' ? 'Gerando...' : 'PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FiltroAtivoChip({ label, onRemover }: { label: string; onRemover: () => void }) {
  return (
    <button
      onClick={onRemover}
      className="shrink-0 flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[11px] font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30"
    >
      {label} <X size={11} />
    </button>
  )
}
