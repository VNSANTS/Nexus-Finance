import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Receipt, Calendar, Tag, FileText, Landmark, CreditCard as CreditCardIcon, DollarSign, CircleDot,
  TrendingDown, PieChart, Pencil, Trash2, X,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormLancamento from '../components/GfFormLancamento'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome } from '../iconMap'
import { formatMoeda } from '../formatMoeda'
import { mesAtualStr, ehMesmoMes } from '../selectors'

const LABEL_FORMA: Record<string, string> = {
  dinheiro: 'Dinheiro',
  pix: 'Pix',
  debito: 'Débito',
  credito: 'Crédito',
  transferencia: 'Transferência',
  boleto: 'Boleto',
  'carteira-digital': 'Carteira digital',
  outro: 'Outro',
}

// Detalhe de uma movimentação — chegada só via drill-down (lista de
// movimentações ou lançamentos). Editar reaproveita o mesmo formulário usado
// pra criar lançamentos, agora com suporte a edição.
export default function GfDetalheMovimentacaoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { estado, permissoes, excluirTransacao } = useGestaoFinanceira()
  const [editando, setEditando] = useState(false)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  const t = estado.transacoes.find((x) => x.id === id)
  const cat = t ? estado.categorias.find((c) => c.id === t.categoriaId) : null
  const conta = t ? estado.contas.find((c) => c.id === t.contaId) : null
  const cartao = t?.cartaoId ? estado.cartoes.find((c) => c.id === t.cartaoId) : null

  const totalNaCategoriaEsteMes = useMemo(() => {
    if (!t || !cat) return 0
    return estado.transacoes
      .filter((x) => x.categoriaId === cat.id && x.tipo === t.tipo && ehMesmoMes(x.data, mesAtualStr()))
      .reduce((s, x) => s + x.valor, 0)
  }, [estado.transacoes, t, cat])

  if (!t) {
    return (
      <div>
        <GfHeader titulo="Detalhes" subtitulo="Movimentação" icone={Receipt} corIcone="#00D4FF" voltarPara="/gestao-financeira/movimentacoes" />
        <div className="px-4 mt-6">
          <div className="card-surface rounded-2xl p-6 text-center">
            <p className="text-[12.5px] text-slate-500">Essa movimentação não existe mais (talvez já tenha sido excluída).</p>
          </div>
        </div>
      </div>
    )
  }

  const Icone = cat ? iconePorNome(cat.icone) : Receipt
  const cor = t.tipo === 'transferencia' ? '#8B5CF6' : cat?.cor ?? '#64748B'
  const positivo = t.tipo === 'receita'
  const dataFormatada = new Date(`${t.data}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

  const transacaoId = t.id

  function confirmarExclusao() {
    excluirTransacao(transacaoId)
    navigate('/gestao-financeira/movimentacoes', { replace: true })
  }

  return (
    <div className="pb-10">
      <GfHeader titulo="Detalhes" subtitulo="Movimentação" icone={Receipt} corIcone="#00D4FF" voltarPara="/gestao-financeira/movimentacoes" />

      {/* Card principal */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
            <Icone size={22} style={{ color: cor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] text-white font-bold truncate">{t.descricao || cat?.nome || 'Lançamento'}</p>
            <p className="text-[11.5px] text-slate-500">{cat?.nome ?? 'Sem categoria'}</p>
          </div>
          <div className="text-right shrink-0">
            <p className={`text-[16px] font-display font-extrabold ${positivo ? 'text-accent-green' : t.tipo === 'despesa' ? 'text-accent-red' : 'text-[#8B5CF6]'}`}>
              {positivo ? '+' : t.tipo === 'despesa' ? '-' : ''} {formatMoeda(t.valor, estado)}
            </p>
            <span
              className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${cor}22`, color: cor }}
            >
              {t.tipo === 'receita' ? 'Receita' : t.tipo === 'despesa' ? 'Despesa' : 'Transferência'}
            </span>
          </div>
        </div>

        {(conta || cartao) && (
          <div className="flex items-center gap-3 mt-2.5 px-1 text-[11.5px] text-slate-500">
            {conta && (
              <span className="flex items-center gap-1.5">
                <Landmark size={13} /> {conta.nome}
              </span>
            )}
            {cartao && (
              <span className="flex items-center gap-1.5">
                <CreditCardIcon size={13} /> {cartao.nome}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Campos */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] divide-y divide-border">
          <Campo icone={Calendar} label="Data e hora" valor={`${dataFormatada} · ${t.hora}`} />
          <Campo icone={Tag} label="Categoria" valor={cat?.nome ?? 'Sem categoria'} cor={cat?.cor} />
          <Campo icone={FileText} label="Descrição" valor={t.descricao || '—'} />
          <Campo icone={Landmark} label="Conta" valor={conta?.nome ?? '—'} />
          <Campo icone={CreditCardIcon} label="Forma de pagamento" valor={LABEL_FORMA[t.formaPagamento] ?? t.formaPagamento} />
          <Campo icone={DollarSign} label="Valor" valor={formatMoeda(t.valor, estado)} />
          <Campo
            icone={CircleDot}
            label="Status"
            valor={t.pago ? (t.tipo === 'receita' ? 'Recebido' : 'Pago') : 'Pendente'}
            cor={t.pago ? '#22C55E' : '#FFC93C'}
          />
        </div>
      </div>

      {/* Resumo financeiro */}
      <div className="px-4 mt-3">
        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide mb-2">Resumo financeiro</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="card-surface rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown size={13} className={positivo ? 'text-accent-green' : 'text-accent-red'} />
              <p className="text-[10.5px] text-slate-500">Tipo</p>
            </div>
            <p className={`text-[14px] font-bold ${positivo ? 'text-accent-green' : 'text-accent-red'}`}>
              {positivo ? 'Entrada' : 'Saída'}
            </p>
          </div>
          <div className="card-surface rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <PieChart size={13} className="text-accent-cyan" />
              <p className="text-[10.5px] text-slate-500">Total na categoria (este mês)</p>
            </div>
            <p className="text-[14px] font-bold text-white">{formatMoeda(totalNaCategoriaEsteMes, estado)}</p>
          </div>
        </div>
      </div>

      {/* Ações — cada botão só existe se o perfil ativo tem a permissão */}
      {(permissoes.editar || permissoes.excluir) && (
        <div className="px-4 mt-4 flex gap-2.5">
          {permissoes.editar && (
            <button
              onClick={() => setEditando(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-[13.5px] border border-accent-cyan text-accent-cyan"
            >
              <Pencil size={15} /> Editar
            </button>
          )}
          {permissoes.excluir && (
            <button
              onClick={() => setConfirmandoExclusao(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-[13.5px] border border-accent-red text-accent-red"
            >
              <Trash2 size={15} /> Excluir
            </button>
          )}
        </div>
      )}

      {/* Modal de edição */}
      <AnimatePresence>
        {editando && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-end justify-center"
            onClick={() => setEditando(false)}
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
                <p className="text-[15px] font-display font-extrabold text-white">Editar lançamento</p>
                <button onClick={() => setEditando(false)} className="text-slate-500" aria-label="Fechar">
                  <X size={20} />
                </button>
              </div>
              <GfFormLancamento
                tipoInicial={t.tipo}
                transacaoEditando={t}
                onSalvar={() => setEditando(false)}
                onCancelar={() => setEditando(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmação de exclusão */}
      <AnimatePresence>
        {confirmandoExclusao && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-center justify-center px-6"
            onClick={() => setConfirmandoExclusao(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[340px] bg-bg rounded-[24px] border border-border p-5 text-center"
            >
              <p className="text-[14px] font-bold text-white mb-1.5">Excluir esse lançamento?</p>
              <p className="text-[12px] text-slate-500 mb-5">Essa ação não pode ser desfeita.</p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setConfirmandoExclusao(false)}
                  className="flex-1 rounded-2xl py-3 font-semibold text-[13px] card-surface text-slate-300 border border-border"
                >
                  Cancelar
                </button>
                <button onClick={confirmarExclusao} className="flex-1 rounded-2xl py-3 font-bold text-[13px] bg-accent-red text-white">
                  Excluir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Campo({ icone: Icone, label, valor, cor }: { icone: typeof Receipt; label: string; valor: string; cor?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icone size={15} className="text-slate-500 shrink-0" />
      <span className="text-[12px] text-slate-500 flex-1">{label}</span>
      <span className="text-[12.5px] font-semibold text-right truncate max-w-[55%]" style={{ color: cor ?? '#FFFFFF' }}>
        {valor}
      </span>
    </div>
  )
}
