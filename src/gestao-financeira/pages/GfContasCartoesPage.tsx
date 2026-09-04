import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark, Plus, X, Pencil, Trash2, Eye, EyeOff, Star, Archive, ArchiveRestore,
  ChevronDown, CreditCard, Wallet2,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormConta from '../components/GfFormConta'
import GfFormCartao from '../components/GfFormCartao'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { saldoDaConta, saldoTotalContas, gastoDoCartaoNoMes } from '../selectors'
import { formatMoeda } from '../formatMoeda'
import type { Conta, Cartao } from '../types'

const LABEL_TIPO_CONTA: Record<Conta['tipo'], string> = {
  corrente: 'Conta corrente',
  poupanca: 'Poupança',
  carteira: 'Carteira',
  dinheiro: 'Dinheiro',
  digital: 'Carteira digital',
  investimento: 'Investimento',
  outra: 'Outra',
}

const LABEL_TIPO_CARTAO: Record<Cartao['tipo'], string> = {
  credito: 'Crédito',
  debito: 'Débito',
  multiplo: 'Múltiplo',
}

type ModalConta = { modo: 'novo' } | { modo: 'editar'; conta: Conta } | null
type ModalCartao = { modo: 'novo' } | { modo: 'editar'; cartao: Cartao } | null

// Tela de Contas & Cartões: cadastro e edição de contas bancárias/carteiras
// e de cartões, com saldo/uso calculados a partir dos lançamentos reais
// (mesmas funções que o resto do app usa, pra nunca divergir do saldo
// mostrado em outro lugar). Antes era só um "Em construção" — as ações de
// contas/cartões (adicionar, editar, excluir) já existiam no contexto, só
// faltava essa tela pra usá-las.
export default function GfContasCartoesPage() {
  const { estado, permissoes, excluirConta, editarConta, excluirCartao } = useGestaoFinanceira()
  const [valoresVisiveis, setValoresVisiveis] = useState(true)
  const [verArquivadas, setVerArquivadas] = useState(false)
  const [modalConta, setModalConta] = useState<ModalConta>(null)
  const [modalCartao, setModalCartao] = useState<ModalCartao>(null)

  // Perfil sem "ver saldos" (ex.: um perfil restrito) nunca vê os valores
  // aqui — nem o botão de olho existe pra "revelar", igual não existiria
  // pra alguém sem acesso mesmo.
  const v = (n: number) => (permissoes.verSaldos && valoresVisiveis ? formatMoeda(n, estado) : '••••••')

  const contasAtivas = useMemo(() => estado.contas.filter((c) => !c.arquivada), [estado.contas])
  const contasArquivadas = useMemo(() => estado.contas.filter((c) => c.arquivada), [estado.contas])
  const cartoesAtivos = useMemo(() => estado.cartoes.filter((c) => !c.arquivado), [estado.cartoes])

  const saldoTotal = useMemo(() => saldoTotalContas(estado.contas, estado.transacoes), [estado.contas, estado.transacoes])

  function pedirExclusaoConta(conta: Conta) {
    if (window.confirm(`Excluir "${conta.nome}"? Os lançamentos já feitos nela continuam existindo, só ficam sem conta vinculada.`)) {
      excluirConta(conta.id)
    }
  }

  function arquivarConta(conta: Conta, arquivada: boolean) {
    editarConta({ ...conta, arquivada })
  }

  function pedirExclusaoCartao(cartao: Cartao) {
    if (window.confirm(`Excluir "${cartao.nome}"? Os lançamentos já feitos nele continuam existindo, só ficam sem cartão vinculado.`)) {
      excluirCartao(cartao.id)
    }
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Contas & Cartões"
        subtitulo="Bancos, carteiras e cartões"
        icone={Landmark}
        corIcone="#FFC93C"
        voltarPara="/gestao-financeira"
        acoes={
          permissoes.verSaldos ? (
            <button onClick={() => setValoresVisiveis((val) => !val)} aria-label={valoresVisiveis ? 'Ocultar valores' : 'Mostrar valores'}>
              {valoresVisiveis ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
            </button>
          ) : undefined
        }
      />

      {/* Saldo total consolidado */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[11px] text-slate-500 font-medium">Saldo total em contas</p>
          <p className={`text-[22px] font-display font-extrabold mt-1 ${saldoTotal >= 0 ? 'text-white' : 'text-accent-red'}`}>{v(saldoTotal)}</p>
          <p className="text-[10.5px] text-slate-600 mt-0.5">
            {contasAtivas.length} conta{contasAtivas.length !== 1 && 's'} ativa{contasAtivas.length !== 1 && 's'}
          </p>
        </div>
      </div>

      {/* Seção: Contas */}
      <div className="px-4 mt-5 flex items-center justify-between">
        <p className="text-[13px] text-white font-bold">Contas</p>
        {permissoes.editar && (
          <button
            onClick={() => setModalConta({ modo: 'novo' })}
            className="flex items-center gap-1 text-[11.5px] text-accent-cyan font-semibold"
          >
            <Plus size={14} /> Nova conta
          </button>
        )}
      </div>

      <div className="px-4 mt-2.5 flex flex-col gap-2.5">
        {contasAtivas.length === 0 ? (
          permissoes.editar ? (
            <EstadoVazio texto="Nenhuma conta cadastrada ainda." botaoLabel="Adicionar primeira conta" onClick={() => setModalConta({ modo: 'novo' })} />
          ) : (
            <p className="text-[12px] text-slate-500 text-center py-6">Nenhuma conta cadastrada ainda.</p>
          )
        ) : (
          contasAtivas.map((conta) => {
            const saldo = saldoDaConta(conta, estado.transacoes)
            return (
              <div key={conta.id} className="card-surface rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${conta.cor}22` }}>
                  <Wallet2 size={18} style={{ color: conta.cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] text-white font-semibold truncate">{conta.nome}</p>
                    {conta.principal && <Star size={11} className="text-accent-gold shrink-0" fill="currentColor" />}
                  </div>
                  <p className="text-[11px] text-slate-500">{LABEL_TIPO_CONTA[conta.tipo]}</p>
                </div>
                <p className={`text-[13px] font-bold shrink-0 ${saldo >= 0 ? 'text-white' : 'text-accent-red'}`}>{v(saldo)}</p>
                <div className="flex items-center gap-0.5 shrink-0">
                  {permissoes.editar && (
                    <button onClick={() => setModalConta({ modo: 'editar', conta })} className="p-1.5 text-slate-500" aria-label="Editar conta">
                      <Pencil size={13} />
                    </button>
                  )}
                  {permissoes.excluir && (
                    <button onClick={() => pedirExclusaoConta(conta)} className="p-1.5 text-slate-500" aria-label="Excluir conta">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {contasArquivadas.length > 0 && (
        <div className="px-4 mt-2.5">
          <button onClick={() => setVerArquivadas((v) => !v)} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
            <ChevronDown size={13} className={`transition-transform ${verArquivadas ? 'rotate-180' : ''}`} />
            {verArquivadas ? 'Ocultar' : 'Ver'} arquivadas ({contasArquivadas.length})
          </button>
          {verArquivadas && (
            <div className="flex flex-col gap-2 mt-2">
              {contasArquivadas.map((conta) => (
                <div key={conta.id} className="card-surface rounded-2xl p-3 flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${conta.cor}22` }}>
                    <Wallet2 size={15} style={{ color: conta.cor }} />
                  </div>
                  <p className="flex-1 text-[12px] text-slate-300 truncate">{conta.nome}</p>
                  {permissoes.editar && (
                    <button onClick={() => arquivarConta(conta, false)} className="p-1.5 text-accent-cyan" aria-label="Desarquivar conta">
                      <ArchiveRestore size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seção: Cartões */}
      <div className="px-4 mt-6 flex items-center justify-between">
        <p className="text-[13px] text-white font-bold">Cartões</p>
        {permissoes.editar && (
          <button
            onClick={() => setModalCartao({ modo: 'novo' })}
            className="flex items-center gap-1 text-[11.5px] text-accent-cyan font-semibold"
          >
            <Plus size={14} /> Novo cartão
          </button>
        )}
      </div>

      <div className="px-4 mt-2.5 flex flex-col gap-2.5">
        {cartoesAtivos.length === 0 ? (
          permissoes.editar ? (
            <EstadoVazio texto="Nenhum cartão cadastrado ainda." botaoLabel="Adicionar primeiro cartão" onClick={() => setModalCartao({ modo: 'novo' })} />
          ) : (
            <p className="text-[12px] text-slate-500 text-center py-6">Nenhum cartão cadastrado ainda.</p>
          )
        ) : (
          cartoesAtivos.map((cartao) => {
            const gastoMes = gastoDoCartaoNoMes(cartao, estado.transacoes)
            const pctLimite = cartao.limite > 0 ? Math.min(100, (gastoMes / cartao.limite) * 100) : 0
            return (
              <div key={cartao.id} className="card-surface rounded-2xl p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cartao.cor}22` }}>
                    <CreditCard size={18} style={{ color: cartao.cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white font-semibold truncate">{cartao.nome}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {cartao.banco ? `${cartao.banco} · ` : ''}
                      {LABEL_TIPO_CARTAO[cartao.tipo]}
                      {cartao.tipo !== 'debito' && ` · fecha dia ${cartao.diaFechamento}, vence dia ${cartao.diaVencimento}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {permissoes.editar && (
                      <button onClick={() => setModalCartao({ modo: 'editar', cartao })} className="p-1.5 text-slate-500" aria-label="Editar cartão">
                        <Pencil size={13} />
                      </button>
                    )}
                    {permissoes.excluir && (
                      <button onClick={() => pedirExclusaoCartao(cartao)} className="p-1.5 text-slate-500" aria-label="Excluir cartão">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
                {cartao.tipo !== 'debito' && cartao.limite > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Fatura atual</span>
                      <span className={pctLimite >= 90 ? 'text-accent-red font-semibold' : 'text-slate-400'}>
                        {v(gastoMes)} / {v(cartao.limite)}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pctLimite >= 90 ? 'bg-accent-red' : pctLimite >= 70 ? 'bg-amber-400' : 'bg-accent-cyan'}`}
                        style={{ width: `${pctLimite}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Modal: nova/editar conta */}
      <ModalFormulario
        aberto={modalConta !== null}
        titulo={modalConta?.modo === 'editar' ? 'Editar conta' : 'Nova conta'}
        onFechar={() => setModalConta(null)}
      >
        <GfFormConta
          contaEditando={modalConta?.modo === 'editar' ? modalConta.conta : null}
          onSalvar={() => setModalConta(null)}
          onCancelar={() => setModalConta(null)}
        />
      </ModalFormulario>

      {/* Modal: novo/editar cartão */}
      <ModalFormulario
        aberto={modalCartao !== null}
        titulo={modalCartao?.modo === 'editar' ? 'Editar cartão' : 'Novo cartão'}
        onFechar={() => setModalCartao(null)}
      >
        <GfFormCartao
          cartaoEditando={modalCartao?.modo === 'editar' ? modalCartao.cartao : null}
          onSalvar={() => setModalCartao(null)}
          onCancelar={() => setModalCartao(null)}
        />
      </ModalFormulario>
    </div>
  )
}

function EstadoVazio({ texto, botaoLabel, onClick }: { texto: string; botaoLabel: string; onClick: () => void }) {
  return (
    <div className="card-surface rounded-2xl p-5 text-center flex flex-col items-center gap-2.5">
      <Archive size={20} className="text-slate-600" />
      <p className="text-[12.5px] text-slate-500">{texto}</p>
      <button onClick={onClick} className="text-[12px] font-semibold text-accent-cyan">
        {botaoLabel}
      </button>
    </div>
  )
}

function ModalFormulario({ aberto, titulo, onFechar, children }: { aberto: boolean; titulo: string; onFechar: () => void; children: React.ReactNode }) {
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
