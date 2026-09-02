import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ListChecks, Search, CalendarDays, Trash2, X } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfCalendarioFinanceiro from '../components/GfCalendarioFinanceiro'
import GfFormLancamento from '../components/GfFormLancamento'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { transacoesDoDia } from '../selectors'
import { iconePorNome } from '../iconMap'
import { formatMoeda } from '../formatMoeda'
import type { FormaPagamento, TipoTransacao } from '../types'

interface Props {
  novoAberto?: boolean
}

function hojeISO() {
  return new Date().toISOString().slice(0, 10)
}

const TIPOS_VALIDOS: TipoTransacao[] = ['receita', 'despesa', 'transferencia']
const FORMAS_VALIDAS: FormaPagamento[] = ['dinheiro', 'pix', 'debito', 'credito', 'transferencia', 'boleto', 'carteira-digital', 'outro']

// Tela de Lançamentos: calendário compacto pra escolher o dia, lista dos
// lançamentos daquele dia, busca/filtro por texto e tipo, e o formulário de
// novo lançamento (aberto automaticamente quando `novoAberto` vem true, ou
// via query string ?tipo=&forma= vindos do botão radial de ações rápidas).
export default function GfLancamentosPage({ novoAberto }: Props) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { estado, permissoes, excluirTransacao } = useGestaoFinanceira()

  const [diaSelecionado, setDiaSelecionado] = useState(hojeISO())
  const [calendarioAberto, setCalendarioAberto] = useState(false)
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<TipoTransacao | 'todos'>('todos')

  const tipoParam = searchParams.get('tipo')
  const formaParam = searchParams.get('forma')
  const tipoInicial: TipoTransacao = tipoParam && TIPOS_VALIDOS.includes(tipoParam as TipoTransacao) ? (tipoParam as TipoTransacao) : 'despesa'
  const formaInicial: FormaPagamento | undefined = formaParam && FORMAS_VALIDAS.includes(formaParam as FormaPagamento) ? (formaParam as FormaPagamento) : undefined

  const [formularioAberto, setFormularioAberto] = useState(Boolean(novoAberto))

  useEffect(() => {
    // Perfil sem permissão de lançar (ex.: Visualizador) não abre o
    // formulário mesmo chegando aqui por URL direta (/lancamentos/novo)
    // ou pelo atalho ?tipo= — o FAB que normalmente leva pra cá já some
    // pra esse perfil, isto é o reforço pra quando o link é acessado
    // de outro jeito.
    if (novoAberto && permissoes.lancar) setFormularioAberto(true)
  }, [novoAberto, permissoes.lancar])

  function fecharFormulario() {
    setFormularioAberto(false)
    if (searchParams.toString()) setSearchParams({})
    if (novoAberto) navigate('/gestao-financeira/lancamentos', { replace: true })
  }

  const transacoesDia = useMemo(() => transacoesDoDia(estado.transacoes, diaSelecionado), [estado.transacoes, diaSelecionado])

  const transacoesFiltradas = useMemo(() => {
    return transacoesDia.filter((t) => {
      if (filtroTipo !== 'todos' && t.tipo !== filtroTipo) return false
      if (busca.trim()) {
        const cat = estado.categorias.find((c) => c.id === t.categoriaId)
        const alvo = `${t.descricao} ${cat?.nome ?? ''}`.toLowerCase()
        if (!alvo.includes(busca.trim().toLowerCase())) return false
      }
      return true
    })
  }, [transacoesDia, filtroTipo, busca, estado.categorias])

  const dataFormatada = new Date(`${diaSelecionado}T12:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })
  const ehHoje = diaSelecionado === hojeISO()

  return (
    <div>
      <GfHeader
        titulo="Lançamentos"
        subtitulo="Receitas, despesas e transferências"
        icone={ListChecks}
        corIcone="#00D4FF"
        voltarPara="/gestao-financeira"
        acoes={
          <button
            onClick={() => setCalendarioAberto((v) => !v)}
            className="w-9 h-9 rounded-xl card-surface border border-border flex items-center justify-center text-accent-cyan"
            aria-label="Abrir calendário"
          >
            <CalendarDays size={16} />
          </button>
        }
      />

      {/* Calendário retrátil */}
      <AnimatePresence>
        {calendarioAberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 overflow-hidden"
          >
            <div className="card-surface rounded-2xl p-4 mb-1">
              <GfCalendarioFinanceiro
                transacoes={estado.transacoes}
                diaSelecionado={diaSelecionado}
                onSelecionarDia={(d) => {
                  setDiaSelecionado(d)
                  setCalendarioAberto(false)
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dia selecionado + atalho pra hoje */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <p className="text-[13px] text-white font-semibold capitalize">{dataFormatada}</p>
        {!ehHoje && (
          <button onClick={() => setDiaSelecionado(hojeISO())} className="text-[11.5px] text-accent-cyan font-semibold">
            Voltar para hoje
          </button>
        )}
      </div>

      {/* Busca */}
      <div className="px-4 mt-3">
        <div className="flex items-center gap-2 card-surface rounded-2xl px-3.5 py-2.5 border border-border">
          <Search size={15} className="text-slate-500 shrink-0" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por descrição ou categoria..."
            className="flex-1 bg-transparent text-[12.5px] text-white placeholder:text-slate-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Filtro por tipo */}
      <div className="px-4 mt-3 flex gap-2">
        <FiltroChip label="Todos" ativo={filtroTipo === 'todos'} onClick={() => setFiltroTipo('todos')} />
        <FiltroChip label="Receitas" ativo={filtroTipo === 'receita'} cor="#22C55E" onClick={() => setFiltroTipo('receita')} />
        <FiltroChip label="Despesas" ativo={filtroTipo === 'despesa'} cor="#EF4444" onClick={() => setFiltroTipo('despesa')} />
        <FiltroChip label="Transf." ativo={filtroTipo === 'transferencia'} cor="#8B5CF6" onClick={() => setFiltroTipo('transferencia')} />
      </div>

      {/* Lista */}
      <div className="px-4 mt-4 flex flex-col gap-2.5 pb-4">
        {transacoesFiltradas.length === 0 ? (
          <div className="card-surface rounded-2xl p-6 text-center">
            <p className="text-[12.5px] text-slate-500">
              {transacoesDia.length === 0 ? 'Nenhum lançamento neste dia ainda.' : 'Nenhum resultado para esse filtro.'}
            </p>
          </div>
        ) : (
          transacoesFiltradas.map((t) => {
            const cat = estado.categorias.find((c) => c.id === t.categoriaId)
            const Icone = cat ? iconePorNome(cat.icone) : ListChecks
            const cor = t.tipo === 'transferencia' ? '#8B5CF6' : cat?.cor ?? '#64748B'
            const positivo = t.tipo === 'receita'
            return (
              <div key={t.id} className="card-surface rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
                  <Icone size={17} style={{ color: cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white font-semibold truncate">{t.descricao || cat?.nome || 'Lançamento'}</p>
                  <p className="text-[11px] text-slate-500">
                    {t.hora} {cat && `· ${cat.nome}`}
                  </p>
                </div>
                <span className={`text-[13px] font-bold shrink-0 ${positivo ? 'text-accent-green' : t.tipo === 'despesa' ? 'text-accent-red' : 'text-[#8B5CF6]'}`}>
                  {positivo ? '+' : t.tipo === 'despesa' ? '-' : ''} {formatMoeda(t.valor, estado)}
                </span>
                {permissoes.excluir && (
                  <button
                    onClick={() => excluirTransacao(t.id)}
                    className="text-slate-600 shrink-0 p-1"
                    aria-label="Excluir lançamento"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Modal de novo lançamento */}
      <AnimatePresence>
        {formularioAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-end justify-center"
            onClick={fecharFormulario}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] max-h-[88vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[15px] font-display font-extrabold text-white">Novo lançamento</p>
                <button onClick={fecharFormulario} className="text-slate-500" aria-label="Fechar">
                  <X size={20} />
                </button>
              </div>
              <GfFormLancamento tipoInicial={tipoInicial} formaInicial={formaInicial} onSalvar={fecharFormulario} onCancelar={fecharFormulario} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FiltroChip({ label, ativo, cor = '#00D4FF', onClick }: { label: string; ativo: boolean; cor?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-colors"
      style={{
        borderColor: ativo ? cor : '#1C2740',
        background: ativo ? `${cor}1a` : 'transparent',
        color: ativo ? cor : '#94A3B8',
      }}
    >
      {label}
    </button>
  )
}
