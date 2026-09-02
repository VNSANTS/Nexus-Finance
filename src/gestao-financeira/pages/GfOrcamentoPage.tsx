import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Eye, EyeOff, Plus, X, AlertTriangle } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormOrcamento from '../components/GfFormOrcamento'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { resumoOrcamentos } from '../selectors'
import { formatMoeda } from '../formatMoeda'
import { iconePorNome } from '../iconMap'

type Modal = { modo: 'novo' } | { modo: 'editar'; categoriaId: string } | null

export default function GfOrcamentoPage() {
  const { estado, permissoes } = useGestaoFinanceira()
  const [valoresVisiveis, setValoresVisiveis] = useState(true)
  const [modal, setModal] = useState<Modal>(null)

  const v = (n: number) => (permissoes.verSaldos && valoresVisiveis ? formatMoeda(n, estado) : '••••••')

  const orcamentos = resumoOrcamentos(estado)
  const totalOrcado = orcamentos.reduce((s, o) => s + o.limite, 0)
  const totalGasto = orcamentos.reduce((s, o) => s + o.gasto, 0)
  const percentualGeral = totalOrcado > 0 ? Math.min(100, (totalGasto / totalOrcado) * 100) : 0

  const categoriasDespesa = estado.categorias.filter((c) => c.tipo === 'despesa')
  const todasCategoriasTemOrcamento = orcamentos.length >= categoriasDespesa.length

  return (
    <div className="pb-28">
      <GfHeader
        titulo="Orçamento"
        subtitulo="Limites de gastos por categoria"
        icone={PieChart}
        corIcone="#00D4FF"
        voltarPara="/gestao-financeira"
        acoes={
          permissoes.verSaldos ? (
            <button onClick={() => setValoresVisiveis((val) => !val)} aria-label={valoresVisiveis ? 'Ocultar valores' : 'Mostrar valores'}>
              {valoresVisiveis ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
            </button>
          ) : undefined
        }
      />

      {orcamentos.length === 0 ? (
        <div className="px-4 mt-4">
          <div className="card-surface rounded-[20px] p-6 text-center flex flex-col items-center gap-2.5">
            <PieChart size={22} className="text-slate-600" />
            <p className="text-[13px] text-slate-400 font-medium">Você ainda não definiu nenhum orçamento.</p>
            <p className="text-[11.5px] text-slate-600">Defina um limite mensal por categoria e acompanhe o quanto já gastou.</p>
            {permissoes.editar && (
              <button
                onClick={() => setModal({ modo: 'novo' })}
                className="mt-1.5 flex items-center gap-1.5 bg-accent-cyan text-bg rounded-xl px-4 py-2 text-[12.5px] font-bold"
              >
                <Plus size={14} /> Definir orçamento
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Resumo geral do mês */}
          <div className="px-4 mt-4">
            <div className="card-surface rounded-[20px] p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[12.5px] text-slate-400 font-medium">Total orçado este mês</p>
                <span className={`text-[11.5px] font-semibold ${percentualGeral >= 100 ? 'text-accent-red' : 'text-slate-500'}`}>
                  {percentualGeral.toFixed(0)}%
                </span>
              </div>
              <p className="text-[20px] font-display font-extrabold text-white">
                {v(totalGasto)} <span className="text-[13px] text-slate-500 font-semibold">/ {v(totalOrcado)}</span>
              </p>
              <div className="w-full h-2 rounded-full bg-border overflow-hidden mt-2.5">
                <div
                  className={`h-full rounded-full ${percentualGeral >= 100 ? 'bg-accent-red' : percentualGeral >= 90 ? 'bg-amber-400' : 'bg-accent-cyan'}`}
                  style={{ width: `${percentualGeral}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lista por categoria */}
          <div className="px-4 mt-3 flex flex-col gap-2.5">
            {orcamentos.map((o) => {
              const Icone = iconePorNome(o.categoria.icone)
              const estourou = o.percentual >= 100
              const quaseLa = o.percentual >= 90 && !estourou
              return (
                <button
                  key={o.categoria.id}
                  onClick={() => permissoes.editar && setModal({ modo: 'editar', categoriaId: o.categoria.id })}
                  disabled={!permissoes.editar}
                  className="card-surface rounded-2xl p-3.5 text-left disabled:opacity-100"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${o.categoria.cor}22` }}>
                      <Icone size={15} style={{ color: o.categoria.cor }} />
                    </div>
                    <span className="text-[13px] text-slate-200 font-semibold flex-1 truncate">{o.categoria.nome}</span>
                    {estourou && <AlertTriangle size={14} className="text-accent-red shrink-0" />}
                    <span className={`text-[11.5px] font-semibold shrink-0 ${estourou ? 'text-accent-red' : quaseLa ? 'text-amber-400' : 'text-slate-500'}`}>
                      {o.percentual.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <span className="text-slate-400">{v(o.gasto)}</span>
                    <span className="text-slate-600">de {v(o.limite)}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full ${estourou ? 'bg-accent-red' : quaseLa ? 'bg-amber-400' : 'bg-accent-cyan'}`}
                      style={{ width: `${Math.min(100, o.percentual)}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {!todasCategoriasTemOrcamento && permissoes.editar && (
            <div className="px-4 mt-3">
              <button
                onClick={() => setModal({ modo: 'novo' })}
                className="w-full flex items-center justify-center gap-1.5 card-surface rounded-2xl py-3 text-[13px] font-semibold text-accent-cyan"
              >
                <Plus size={15} /> Definir orçamento pra outra categoria
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-end justify-center"
            onClick={() => setModal(null)}
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
                <p className="text-[15px] font-display font-extrabold text-white">
                  {modal.modo === 'editar' ? 'Editar orçamento' : 'Novo orçamento'}
                </p>
                <button onClick={() => setModal(null)} className="text-slate-500" aria-label="Fechar">
                  <X size={20} />
                </button>
              </div>
              <GfFormOrcamento
                categoriaId={modal.modo === 'editar' ? modal.categoriaId : null}
                onSalvar={() => setModal(null)}
                onCancelar={() => setModal(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
