import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ListFilter, Search, ChevronDown, ChevronUp, ChevronRight, ArrowUpDown, X, PieChart } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import {
  periodosPreDefinidos,
  periodoAnteriorEquivalente,
  resumoDoPeriodo,
  transacoesNoPeriodo,
  type PeriodoRelatorio,
} from '../relatorios'
import { variacaoPercentual } from '../selectors'
import { iconePorNome } from '../iconMap'
import { formatPercent } from '@/utils/format'
import { formatMoeda } from '../formatMoeda'
import type { Transacao, GestaoFinanceiraState } from '../types'

type Ordenacao = 'recentes' | 'antigos' | 'maior-valor' | 'menor-valor'

const LABEL_ORDENACAO: Record<Ordenacao, string> = {
  recentes: 'Mais recentes',
  antigos: 'Mais antigos',
  'maior-valor': 'Maior valor',
  'menor-valor': 'Menor valor',
}
const PROXIMA_ORDENACAO: Record<Ordenacao, Ordenacao> = {
  recentes: 'antigos',
  antigos: 'maior-valor',
  'maior-valor': 'menor-valor',
  'menor-valor': 'recentes',
}

function rotuloDia(dataStr: string): string {
  const hoje = new Date().toISOString().slice(0, 10)
  const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (dataStr === hoje) return 'Hoje'
  if (dataStr === ontem) return 'Ontem'
  const d = new Date(`${dataStr}T12:00:00`)
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', weekday: 'short' })
}

// Lista de movimentações — o drill-down que fica entre o dashboard de
// Relatórios e o Detalhe de uma movimentação específica. Filtros de período,
// categoria e conta reaproveitam os mesmos dados/funções já usados nos
// Relatórios, então os números batem entre as duas telas.
export default function GfMovimentacoesPage() {
  const navigate = useNavigate()
  const { estado, permissoes } = useGestaoFinanceira()

  const [periodo, setPeriodo] = useState<PeriodoRelatorio>(periodosPreDefinidos()[0])
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | 'todas'>('todas')
  const [contaFiltro, setContaFiltro] = useState<string | 'todas'>('todas')
  const [busca, setBusca] = useState('')
  const v = (n: number) => (permissoes.verSaldos ? formatMoeda(n, estado) : '••••••')
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('recentes')
  const [sheetAberto, setSheetAberto] = useState<'periodo' | 'categoria' | 'conta' | null>(null)
  const [gruposAlternados, setGruposAlternados] = useState<Set<string>>(new Set())

  const resumoAtual = useMemo(() => resumoDoPeriodo(estado.transacoes, periodo), [estado.transacoes, periodo])
  const resumoAnterior = useMemo(
    () => resumoDoPeriodo(estado.transacoes, periodoAnteriorEquivalente(periodo)),
    [estado.transacoes, periodo]
  )
  const varReceitas = variacaoPercentual(resumoAtual.receitas, resumoAnterior.receitas)
  const varDespesas = variacaoPercentual(resumoAtual.despesas, resumoAnterior.despesas)
  const varSaldo = variacaoPercentual(resumoAtual.saldo, resumoAnterior.saldo)
  const economiaAnterior = resumoAnterior.taxaEconomia
  const varEconomia =
    resumoAtual.taxaEconomia != null && economiaAnterior != null ? resumoAtual.taxaEconomia - economiaAnterior : null

  const transacoesFiltradas = useMemo(() => {
    let lista = transacoesNoPeriodo(estado.transacoes, periodo)
    if (categoriaFiltro !== 'todas') lista = lista.filter((t) => t.categoriaId === categoriaFiltro)
    if (contaFiltro !== 'todas') lista = lista.filter((t) => t.contaId === contaFiltro)
    if (busca.trim()) {
      const termo = busca.trim().toLowerCase()
      lista = lista.filter((t) => {
        const cat = estado.categorias.find((c) => c.id === t.categoriaId)
        return `${t.descricao} ${cat?.nome ?? ''}`.toLowerCase().includes(termo)
      })
    }
    const porData = [...lista].sort((a, b) => `${b.data}${b.hora}`.localeCompare(`${a.data}${a.hora}`))
    if (ordenacao === 'recentes') return porData
    if (ordenacao === 'antigos') return [...porData].reverse()
    if (ordenacao === 'maior-valor') return [...porData].sort((a, b) => b.valor - a.valor)
    return [...porData].sort((a, b) => a.valor - b.valor)
  }, [estado.transacoes, estado.categorias, periodo, categoriaFiltro, contaFiltro, busca, ordenacao])

  const grupos = useMemo(() => {
    const mapa = new Map<string, Transacao[]>()
    for (const t of transacoesFiltradas) {
      const lista = mapa.get(t.data) ?? []
      lista.push(t)
      mapa.set(t.data, lista)
    }
    return Array.from(mapa.entries())
      .sort((a, b) => (ordenacao === 'antigos' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])))
      .map(([data, transacoes]) => ({
        data,
        transacoes,
        total: transacoes.reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0),
      }))
  }, [transacoesFiltradas, ordenacao])

  function grupoAberto(idx: number, chave: string) {
    const padrao = idx < 2
    return gruposAlternados.has(chave) ? !padrao : padrao
  }

  function alternarGrupo(chave: string) {
    setGruposAlternados((prev) => {
      const novo = new Set(prev)
      novo.has(chave) ? novo.delete(chave) : novo.add(chave)
      return novo
    })
  }

  const categoriaAtiva = estado.categorias.find((c) => c.id === categoriaFiltro)
  const contaAtiva = estado.contas.find((c) => c.id === contaFiltro)

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Relatórios"
        subtitulo="Movimentações"
        icone={ListFilter}
        corIcone="#00D4FF"
        voltarPara="/gestao-financeira/relatorios"
      />

      {/* Filtros: período, categoria, conta */}
      <div className="px-4 mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <ChipFiltro label={periodo.label} onClick={() => setSheetAberto('periodo')} />
        <ChipFiltro label={categoriaAtiva ? categoriaAtiva.nome : 'Todas categorias'} onClick={() => setSheetAberto('categoria')} ativo={categoriaFiltro !== 'todas'} />
        <ChipFiltro label={contaAtiva ? contaAtiva.nome : 'Todas contas'} onClick={() => setSheetAberto('conta')} ativo={contaFiltro !== 'todas'} />
      </div>

      {/* Resumo do período */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        <CardResumo label="Receitas" valor={resumoAtual.receitas} variacao={varReceitas} cor="#00D4FF" />
        <CardResumo label="Despesas" valor={resumoAtual.despesas} variacao={varDespesas} cor="#EF4444" inverterCorVariacao />
        <CardResumo label="Saldo" valor={resumoAtual.saldo} variacao={varSaldo} cor="#22C55E" />
        <CardResumo
          label="Economia"
          valor={resumoAtual.taxaEconomia}
          variacao={varEconomia}
          cor="#FFC93C"
          percentual
        />
      </div>

      {/* Busca + ordenação */}
      <div className="px-4 mt-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 card-surface rounded-2xl px-3.5 py-2.5 border border-border">
          <Search size={15} className="text-slate-500 shrink-0" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar movimentações..."
            className="flex-1 bg-transparent text-[12.5px] text-white placeholder:text-slate-600 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setOrdenacao((o) => PROXIMA_ORDENACAO[o])}
          aria-label={`Ordenar: ${LABEL_ORDENACAO[ordenacao]}`}
          className="w-10 h-10 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400"
        >
          <ArrowUpDown size={15} />
        </button>
      </div>
      <p className="px-4 mt-1.5 text-[10.5px] text-slate-600">Ordenado por: {LABEL_ORDENACAO[ordenacao]}</p>

      {/* Lista agrupada por dia */}
      <div className="px-4 mt-3 flex flex-col gap-3">
        {grupos.length === 0 ? (
          <div className="card-surface rounded-2xl p-6 text-center">
            <p className="text-[12.5px] text-slate-500">Nenhuma movimentação encontrada nesse filtro.</p>
          </div>
        ) : (
          grupos.map((g, idx) => {
            const aberto = grupoAberto(idx, g.data)
            return (
              <div key={g.data} className="card-surface rounded-2xl overflow-hidden">
                <button onClick={() => alternarGrupo(g.data)} className="w-full flex items-center justify-between px-3.5 py-3">
                  <span className="text-[12px] text-accent-cyan font-semibold capitalize">{rotuloDia(g.data)}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12.5px] font-bold ${g.total >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {g.total >= 0 ? '+' : '-'} {v(Math.abs(g.total))}
                    </span>
                    {aberto ? <ChevronUp size={15} className="text-slate-500" /> : <ChevronDown size={15} className="text-slate-500" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {aberto && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="flex flex-col divide-y divide-border">
                        {g.transacoes.map((t) => (
                          <LinhaMovimentacao key={t.id} t={t} onClick={() => navigate(`/gestao-financeira/movimentacoes/${t.id}`)} estado={estado} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>

      {/* Atalho pros gráficos/análises completas (essas sim já existem) */}
      <div className="px-4 mt-4">
        <button
          onClick={() => navigate('/gestao-financeira/relatorios')}
          className="w-full card-surface rounded-2xl p-3.5 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-green/15 flex items-center justify-center shrink-0">
            <PieChart size={16} className="text-accent-green" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[12.5px] text-white font-semibold">Gráficos e análises</p>
            <p className="text-[10.5px] text-slate-500">Categorias, patrimônio, comparações e mais</p>
          </div>
          <ChevronRight size={15} className="text-slate-600" />
        </button>
      </div>

      {/* Sheets de filtro */}
      <SheetFiltro
        aberto={sheetAberto === 'periodo'}
        titulo="Período"
        onFechar={() => setSheetAberto(null)}
        opcoes={periodosPreDefinidos().map((p) => ({ id: p.id, label: p.label }))}
        valorAtual={periodo.id}
        onEscolher={(id) => {
          const p = periodosPreDefinidos().find((x) => x.id === id)
          if (p) setPeriodo(p)
          setSheetAberto(null)
        }}
      />
      <SheetFiltro
        aberto={sheetAberto === 'categoria'}
        titulo="Categoria"
        onFechar={() => setSheetAberto(null)}
        opcoes={[{ id: 'todas', label: 'Todas categorias' }, ...estado.categorias.map((c) => ({ id: c.id, label: c.nome }))]}
        valorAtual={categoriaFiltro}
        onEscolher={(id) => {
          setCategoriaFiltro(id)
          setSheetAberto(null)
        }}
      />
      <SheetFiltro
        aberto={sheetAberto === 'conta'}
        titulo="Conta"
        onFechar={() => setSheetAberto(null)}
        opcoes={[{ id: 'todas', label: 'Todas contas' }, ...estado.contas.filter((c) => !c.arquivada).map((c) => ({ id: c.id, label: c.nome }))]}
        valorAtual={contaFiltro}
        onEscolher={(id) => {
          setContaFiltro(id)
          setSheetAberto(null)
        }}
      />
    </div>
  )
}

function ChipFiltro({ label, onClick, ativo }: { label: string; onClick: () => void; ativo?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3.5 py-2 rounded-xl text-[11.5px] font-semibold border whitespace-nowrap ${
        ativo ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

function CardResumo({
  label,
  valor,
  variacao,
  cor,
  percentual,
  inverterCorVariacao,
}: {
  label: string
  valor: number | null
  variacao: number | null
  cor: string
  percentual?: boolean
  inverterCorVariacao?: boolean
}) {
  const { estado, permissoes } = useGestaoFinanceira()
  const positivo = variacao != null ? (inverterCorVariacao ? variacao <= 0 : variacao >= 0) : null
  const v = (n: number) => (permissoes.verSaldos ? formatMoeda(n, estado) : '••••••')
  return (
    <div className="card-surface rounded-2xl p-3.5">
      <p className="text-[11px] text-slate-500 font-medium mb-1">{label}</p>
      <p className="text-[16px] font-display font-extrabold" style={{ color: cor }}>
        {valor == null ? '—' : percentual ? `${valor.toFixed(1)}%` : v(valor)}
      </p>
      {variacao != null && (
        <p className={`text-[10.5px] font-semibold mt-0.5 ${positivo ? 'text-accent-green' : 'text-accent-red'}`}>
          {variacao >= 0 ? '↑' : '↓'} {formatPercent(Math.abs(variacao), 1).replace('+', '')}
        </p>
      )}
    </div>
  )
}

function LinhaMovimentacao({ t, onClick, estado }: { t: Transacao; onClick: () => void; estado: GestaoFinanceiraState }) {
  const { permissoes } = useGestaoFinanceira()
  const cat = estado.categorias.find((c) => c.id === t.categoriaId)
  const conta = estado.contas.find((c) => c.id === t.contaId)
  const Icone = cat ? iconePorNome(cat.icone) : ListFilter
  const cor = t.tipo === 'transferencia' ? '#8B5CF6' : cat?.cor ?? '#64748B'
  const positivo = t.tipo === 'receita'
  const v = (n: number) => (permissoes.verSaldos ? formatMoeda(n, estado) : '••••••')
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3.5 py-3 text-left">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
        <Icone size={16} style={{ color: cor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] text-white font-semibold truncate">{t.descricao || cat?.nome || 'Lançamento'}</p>
        <p className="text-[10.5px] text-slate-500 truncate">
          {cat?.nome ?? 'Sem categoria'} {conta && `· ${conta.nome}`}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-[12.5px] font-bold ${positivo ? 'text-accent-green' : t.tipo === 'despesa' ? 'text-accent-red' : 'text-[#8B5CF6]'}`}>
          {positivo ? '+' : t.tipo === 'despesa' ? '-' : ''} {v(t.valor)}
        </p>
        <p className="text-[10px] text-slate-600">{t.hora}</p>
      </div>
      <ChevronRight size={14} className="text-slate-700 shrink-0" />
    </button>
  )
}

function SheetFiltro({
  aberto,
  titulo,
  opcoes,
  valorAtual,
  onEscolher,
  onFechar,
}: {
  aberto: boolean
  titulo: string
  opcoes: { id: string; label: string }[]
  valorAtual: string
  onEscolher: (id: string) => void
  onFechar: () => void
}) {
  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-end justify-center"
          onClick={onFechar}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] max-h-[70vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-display font-extrabold text-white">{titulo}</p>
              <button onClick={onFechar} className="text-slate-500" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {opcoes.map((o) => (
                <button
                  key={o.id}
                  onClick={() => onEscolher(o.id)}
                  className={`text-left rounded-xl px-4 py-3 text-[13px] font-medium ${
                    valorAtual === o.id ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-slate-300'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
