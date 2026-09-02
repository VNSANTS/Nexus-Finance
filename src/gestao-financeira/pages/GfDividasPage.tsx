import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HandCoins, Eye, EyeOff, Plus, X, AlertTriangle, Pencil, Trash2, CircleDollarSign, ChevronDown, CheckCircle2 } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormDivida from '../components/GfFormDivida'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { contasProximasDoVencimento } from '../selectors'
import { formatMoeda } from '../formatMoeda'
import type { Divida } from '../types'

type ModalForm = { modo: 'nova' } | { modo: 'editar'; divida: Divida } | null

export default function GfDividasPage() {
  const { estado, permissoes, excluirDivida } = useGestaoFinanceira()
  const [valoresVisiveis, setValoresVisiveis] = useState(true)
  const [modalForm, setModalForm] = useState<ModalForm>(null)
  const [dividaPagando, setDividaPagando] = useState<Divida | null>(null)
  const [verQuitadas, setVerQuitadas] = useState(false)

  const v = (n: number) => (permissoes.verSaldos && valoresVisiveis ? formatMoeda(n, estado) : '••••••')

  const ativas = useMemo(() => estado.dividas.filter((d) => !d.quitada).sort((a, b) => (a.vencimento ?? '9999').localeCompare(b.vencimento ?? '9999')), [estado.dividas])
  const quitadas = useMemo(() => estado.dividas.filter((d) => d.quitada), [estado.dividas])
  const proximasVencimento = useMemo(() => contasProximasDoVencimento(estado, 7), [estado])

  const totalDevido = ativas.reduce((s, d) => s + Math.max(0, d.valorTotal - d.valorPago), 0)

  function confirmarExcluir(d: Divida) {
    if (window.confirm(`Excluir "${d.nome}"? Essa ação não pode ser desfeita.`)) {
      excluirDivida(d.id)
    }
  }

  return (
    <div className="pb-28">
      <GfHeader
        titulo="Dívidas"
        subtitulo="Contas a pagar"
        icone={HandCoins}
        corIcone="#EF4444"
        voltarPara="/gestao-financeira"
        acoes={
          permissoes.verSaldos ? (
            <button onClick={() => setValoresVisiveis((val) => !val)} aria-label={valoresVisiveis ? 'Ocultar valores' : 'Mostrar valores'}>
              {valoresVisiveis ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
            </button>
          ) : undefined
        }
      />

      {estado.dividas.length === 0 ? (
        <div className="px-4 mt-4">
          <div className="card-surface rounded-[20px] p-6 text-center flex flex-col items-center gap-2.5">
            <HandCoins size={22} className="text-slate-600" />
            <p className="text-[13px] text-slate-400 font-medium">Nenhuma dívida cadastrada.</p>
            <p className="text-[11.5px] text-slate-600">Cadastre financiamentos, empréstimos ou parcelamentos pra acompanhar o quanto falta pagar.</p>
            {permissoes.editar && (
              <button
                onClick={() => setModalForm({ modo: 'nova' })}
                className="mt-1.5 flex items-center gap-1.5 bg-accent-red text-white rounded-xl px-4 py-2 text-[12.5px] font-bold"
              >
                <Plus size={14} /> Adicionar dívida
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 mt-4">
            <div className="card-surface rounded-[20px] p-4">
              <p className="text-[12.5px] text-slate-400 font-medium">Total ainda devendo</p>
              <p className="text-[20px] font-display font-extrabold text-accent-red mt-1">{v(totalDevido)}</p>
              <p className="text-[11px] text-slate-500 mt-1">{ativas.length} dívida{ativas.length !== 1 ? 's' : ''} ativa{ativas.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {proximasVencimento.length > 0 && (
            <div className="px-4 mt-3">
              <div className="card-surface rounded-2xl p-3.5 border border-accent-red/30">
                <p className="text-[11.5px] text-accent-red font-semibold flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={13} /> Vencendo nos próximos dias
                </p>
                <div className="flex flex-col gap-1.5">
                  {proximasVencimento.map(({ divida, diffDias }) => (
                    <div key={divida.id} className="flex items-center justify-between text-[12px]">
                      <span className="text-slate-300 truncate flex-1">{divida.nome}</span>
                      <span className={diffDias < 0 ? 'text-accent-red font-semibold' : 'text-slate-500'}>
                        {diffDias < 0 ? `${Math.abs(diffDias)}d atrasada` : diffDias === 0 ? 'Vence hoje' : `em ${diffDias}d`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="px-4 mt-3 flex flex-col gap-2.5">
            {ativas.map((d) => {
              const pct = d.valorTotal > 0 ? Math.min(100, (d.valorPago / d.valorTotal) * 100) : 0
              return (
                <div key={d.id} className="card-surface rounded-2xl p-3.5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-red/15">
                      <HandCoins size={15} className="text-accent-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-200 font-semibold truncate">{d.nome}</p>
                      {d.parcelas && (
                        <p className="text-[10.5px] text-slate-500">
                          Parcela {Math.min(d.parcelaAtual ?? 1, d.parcelas)}/{d.parcelas}
                          {d.vencimento && ` · vence ${d.vencimento.split('-').reverse().join('/')}`}
                        </p>
                      )}
                      {!d.parcelas && d.vencimento && <p className="text-[10.5px] text-slate-500">vence {d.vencimento.split('-').reverse().join('/')}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <span className="text-slate-400">{v(d.valorPago)} pago</span>
                    <span className="text-slate-600">de {v(d.valorTotal)}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden mb-3">
                    <div className="h-full rounded-full bg-accent-green" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex items-center gap-2">
                    {permissoes.editar && (
                      <button
                        onClick={() => setDividaPagando(d)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-accent-green/15 text-accent-green rounded-xl py-2 text-[12px] font-semibold"
                      >
                        <CircleDollarSign size={14} /> Registrar pagamento
                      </button>
                    )}
                    {permissoes.editar && (
                      <button onClick={() => setModalForm({ modo: 'editar', divida: d })} className="p-2 text-slate-500" aria-label="Editar dívida">
                        <Pencil size={14} />
                      </button>
                    )}
                    {permissoes.excluir && (
                      <button onClick={() => confirmarExcluir(d)} className="p-2 text-slate-500" aria-label="Excluir dívida">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="px-4 mt-3">
            {permissoes.editar && (
              <button
                onClick={() => setModalForm({ modo: 'nova' })}
                className="w-full flex items-center justify-center gap-1.5 card-surface rounded-2xl py-3 text-[13px] font-semibold text-accent-red"
              >
                <Plus size={15} /> Nova dívida
              </button>
            )}
          </div>

          {quitadas.length > 0 && (
            <div className="px-4 mt-4">
              <button onClick={() => setVerQuitadas((v2) => !v2)} className="flex items-center gap-1.5 text-[12.5px] text-slate-500 font-semibold">
                <ChevronDown size={14} className={`transition-transform ${verQuitadas ? 'rotate-180' : ''}`} />
                Quitadas ({quitadas.length})
              </button>
              {verQuitadas && (
                <div className="flex flex-col gap-2 mt-2.5">
                  {quitadas.map((d) => (
                    <div key={d.id} className="card-surface rounded-2xl p-3 flex items-center gap-2.5 opacity-60">
                      <CheckCircle2 size={16} className="text-accent-green shrink-0" />
                      <span className="text-[12.5px] text-slate-300 flex-1 truncate">{d.nome}</span>
                      <span className="text-[11.5px] text-slate-500">{v(d.valorTotal)}</span>
                      {permissoes.excluir && (
                        <button onClick={() => confirmarExcluir(d)} className="p-1 text-slate-600" aria-label="Excluir dívida quitada">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <ModalSheet aberto={modalForm !== null} titulo={modalForm?.modo === 'editar' ? 'Editar dívida' : 'Nova dívida'} onFechar={() => setModalForm(null)}>
        <GfFormDivida
          dividaEditando={modalForm?.modo === 'editar' ? modalForm.divida : null}
          onSalvar={() => setModalForm(null)}
          onCancelar={() => setModalForm(null)}
        />
      </ModalSheet>

      <ModalSheet aberto={dividaPagando !== null} titulo="Registrar pagamento" onFechar={() => setDividaPagando(null)}>
        {dividaPagando && <FormPagarDivida divida={dividaPagando} onFechar={() => setDividaPagando(null)} />}
      </ModalSheet>
    </div>
  )
}

function FormPagarDivida({ divida, onFechar }: { divida: Divida; onFechar: () => void }) {
  const { editarDivida, estado } = useGestaoFinanceira()
  const [texto, setTexto] = useState('')

  function formatarEntrada(t: string) {
    const digitos = t.replace(/\D/g, '')
    if (!digitos) return ''
    return (parseInt(digitos, 10) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const valor = (() => {
    const limpo = texto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  })()

  const falta = Math.max(0, divida.valorTotal - divida.valorPago)

  function confirmar() {
    if (valor <= 0) return
    const novoValorPago = Math.min(divida.valorTotal, divida.valorPago + valor)
    const quitada = novoValorPago >= divida.valorTotal
    const novaParcelaAtual = divida.parcelas ? Math.min(divida.parcelas, (divida.parcelaAtual ?? 1) + 1) : divida.parcelaAtual
    editarDivida({ ...divida, valorPago: novoValorPago, quitada, parcelaAtual: quitada ? divida.parcelaAtual : novaParcelaAtual })
    onFechar()
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <p className="text-[12.5px] text-slate-400">
        Quanto você pagou de <span className="text-white font-semibold">{divida.nome}</span>? Falta {formatMoeda(falta, estado)}.
      </p>
      <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-green">
        <span className="text-[18px] text-slate-500 font-semibold">R$</span>
        <input
          inputMode="numeric"
          placeholder="0,00"
          value={texto}
          onChange={(e) => setTexto(formatarEntrada(e.target.value))}
          className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
          autoFocus
        />
      </div>
      <div className="flex items-center gap-2.5">
        <button onClick={onFechar} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400 text-[13px]">
          ✕
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={confirmar}
          disabled={valor <= 0}
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-green text-bg"
        >
          Confirmar pagamento
        </motion.button>
      </div>
    </div>
  )
}

function ModalSheet({ aberto, titulo, onFechar, children }: { aberto: boolean; titulo: string; onFechar: () => void; children: React.ReactNode }) {
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
            className="w-full max-w-[480px] max-h-[88vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-display font-extrabold text-white">{titulo}</p>
              <button onClick={onFechar} className="text-slate-500" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
