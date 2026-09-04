import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Plus, X, Pencil, Trash2, Eye, EyeOff, ChevronDown, PiggyBank,
  Pause, Play, Archive, ArchiveRestore, PartyPopper, TrendingUp,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormMeta from '../components/GfFormMeta'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome } from '../iconMap'
import { formatMoeda } from '../formatMoeda'
import type { Meta } from '../types'

type ModalMeta = { modo: 'novo' } | { modo: 'editar'; meta: Meta } | null

const ORDEM_PRIORIDADE: Record<Meta['prioridade'], number> = { alta: 0, media: 1, baixa: 2 }
const LABEL_PRIORIDADE: Record<Meta['prioridade'], string> = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }
const COR_PRIORIDADE: Record<Meta['prioridade'], string> = { alta: '#EF4444', media: '#FFC93C', baixa: '#22C55E' }

function diasRestantes(prazo: string | null): number | null {
  if (!prazo) return null
  const hoje = new Date()
  const d = new Date(`${prazo}T12:00:00`)
  return Math.ceil((d.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
}

// Tela de Metas: criar, editar, contribuir, pausar/retomar, arquivar e
// excluir. Metas concluídas (valorAtual >= valorObjetivo) saem sozinhas da
// lista "Em andamento" e ganham uma seção própria — sem precisar marcar
// nada manualmente.
export default function GfMetasPage() {
  const { estado, permissoes, excluirMeta, editarMeta } = useGestaoFinanceira()
  const [valoresVisiveis, setValoresVisiveis] = useState(true)
  const [modalMeta, setModalMeta] = useState<ModalMeta>(null)
  const [metaContribuindo, setMetaContribuindo] = useState<Meta | null>(null)
  const [verPausadas, setVerPausadas] = useState(false)
  const [verArquivadas, setVerArquivadas] = useState(false)

  const v = (n: number) => (permissoes.verSaldos && valoresVisiveis ? formatMoeda(n, estado) : '••••••')

  const naoArquivadas = estado.metas.filter((m) => !m.arquivada)
  const concluidas = naoArquivadas.filter((m) => m.valorAtual >= m.valorObjetivo && m.valorObjetivo > 0)
  const emAndamento = naoArquivadas
    .filter((m) => !m.pausada && m.valorAtual < m.valorObjetivo)
    .sort((a, b) => ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade])
  const pausadas = naoArquivadas.filter((m) => m.pausada && m.valorAtual < m.valorObjetivo)
  const arquivadas = estado.metas.filter((m) => m.arquivada)

  const totalEconomizado = useMemo(() => naoArquivadas.reduce((s, m) => s + m.valorAtual, 0), [naoArquivadas])

  function pedirExclusao(meta: Meta) {
    if (window.confirm(`Excluir a meta "${meta.nome}"? Essa ação não pode ser desfeita.`)) {
      excluirMeta(meta.id)
    }
  }

  function alternarPausa(meta: Meta) {
    editarMeta({ ...meta, pausada: !meta.pausada })
  }

  function alternarArquivo(meta: Meta, arquivada: boolean) {
    editarMeta({ ...meta, arquivada })
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Metas"
        subtitulo="Objetivos e progresso"
        icone={PiggyBank}
        corIcone="#8B5CF6"
        voltarPara="/gestao-financeira"
        acoes={
          permissoes.verSaldos ? (
            <button onClick={() => setValoresVisiveis((val) => !val)} aria-label={valoresVisiveis ? 'Ocultar valores' : 'Mostrar valores'}>
              {valoresVisiveis ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
            </button>
          ) : undefined
        }
      />

      {/* Resumo consolidado */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <p className="text-[11px] text-slate-500 font-medium">Total economizado em metas</p>
          <p className="text-[22px] font-display font-extrabold text-[#8B5CF6] mt-1">{v(totalEconomizado)}</p>
          <p className="text-[10.5px] text-slate-600 mt-0.5">
            {emAndamento.length} meta{emAndamento.length !== 1 && 's'} em andamento
          </p>
        </div>
      </div>

      {/* Seção: Em andamento */}
      <div className="px-4 mt-5 flex items-center justify-between">
        <p className="text-[13px] text-white font-bold">Em andamento</p>
        {permissoes.editar && (
          <button onClick={() => setModalMeta({ modo: 'novo' })} className="flex items-center gap-1 text-[11.5px] text-accent-cyan font-semibold">
            <Plus size={14} /> Nova meta
          </button>
        )}
      </div>

      <div className="px-4 mt-2.5 flex flex-col gap-2.5">
        {emAndamento.length === 0 ? (
          <div className="card-surface rounded-2xl p-5 text-center flex flex-col items-center gap-2.5">
            <Sparkles size={20} className="text-slate-600" />
            <p className="text-[12.5px] text-slate-500">Nenhuma meta em andamento ainda.</p>
            {permissoes.editar && (
              <button onClick={() => setModalMeta({ modo: 'novo' })} className="text-[12px] font-semibold text-accent-cyan">
                Criar primeira meta
              </button>
            )}
          </div>
        ) : (
          emAndamento.map((meta) => (
            <CardMeta
              key={meta.id}
              meta={meta}
              v={v}
              onContribuir={() => setMetaContribuindo(meta)}
              onEditar={() => setModalMeta({ modo: 'editar', meta })}
              onExcluir={() => pedirExclusao(meta)}
              onPausar={() => alternarPausa(meta)}
              onArquivar={() => alternarArquivo(meta, true)}
            />
          ))
        )}
      </div>

      {/* Seção: Concluídas */}
      {concluidas.length > 0 && (
        <>
          <div className="px-4 mt-6">
            <p className="text-[13px] text-white font-bold flex items-center gap-1.5">
              <PartyPopper size={14} className="text-accent-green" /> Concluídas
            </p>
          </div>
          <div className="px-4 mt-2.5 flex flex-col gap-2.5">
            {concluidas.map((meta) => (
              <CardMeta
                key={meta.id}
                meta={meta}
                v={v}
                concluida
                onContribuir={() => setMetaContribuindo(meta)}
                onEditar={() => setModalMeta({ modo: 'editar', meta })}
                onExcluir={() => pedirExclusao(meta)}
                onPausar={() => alternarPausa(meta)}
                onArquivar={() => alternarArquivo(meta, true)}
              />
            ))}
          </div>
        </>
      )}

      {/* Seção: Pausadas */}
      {pausadas.length > 0 && (
        <div className="px-4 mt-5">
          <button onClick={() => setVerPausadas((v2) => !v2)} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
            <ChevronDown size={13} className={`transition-transform ${verPausadas ? 'rotate-180' : ''}`} />
            {verPausadas ? 'Ocultar' : 'Ver'} pausadas ({pausadas.length})
          </button>
          {verPausadas && (
            <div className="flex flex-col gap-2.5 mt-2.5">
              {pausadas.map((meta) => (
                <CardMeta
                  key={meta.id}
                  meta={meta}
                  v={v}
                  onContribuir={() => setMetaContribuindo(meta)}
                  onEditar={() => setModalMeta({ modo: 'editar', meta })}
                  onExcluir={() => pedirExclusao(meta)}
                  onPausar={() => alternarPausa(meta)}
                  onArquivar={() => alternarArquivo(meta, true)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seção: Arquivadas */}
      {arquivadas.length > 0 && (
        <div className="px-4 mt-5">
          <button onClick={() => setVerArquivadas((v2) => !v2)} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
            <ChevronDown size={13} className={`transition-transform ${verArquivadas ? 'rotate-180' : ''}`} />
            {verArquivadas ? 'Ocultar' : 'Ver'} arquivadas ({arquivadas.length})
          </button>
          {verArquivadas && (
            <div className="flex flex-col gap-2 mt-2.5">
              {arquivadas.map((meta) => {
                const Icone = iconePorNome(meta.icone)
                return (
                  <div key={meta.id} className="card-surface rounded-2xl p-3 flex items-center gap-3 opacity-60">
                    {meta.fotoUrl ? (
                      <img src={meta.fotoUrl} alt="" className="w-8 h-8 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${meta.cor}22` }}>
                        <Icone size={15} style={{ color: meta.cor }} />
                      </div>
                    )}
                    <p className="flex-1 text-[12px] text-slate-300 truncate">{meta.nome}</p>
                    {permissoes.editar && (
                      <button onClick={() => alternarArquivo(meta, false)} className="p-1.5 text-accent-cyan" aria-label="Desarquivar meta">
                        <ArchiveRestore size={14} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal: nova/editar meta */}
      <ModalFormulario aberto={modalMeta !== null} titulo={modalMeta?.modo === 'editar' ? 'Editar meta' : 'Nova meta'} onFechar={() => setModalMeta(null)}>
        <GfFormMeta
          metaEditando={modalMeta?.modo === 'editar' ? modalMeta.meta : null}
          onSalvar={() => setModalMeta(null)}
          onCancelar={() => setModalMeta(null)}
        />
      </ModalFormulario>

      {/* Modal: contribuir */}
      <ModalFormulario aberto={metaContribuindo !== null} titulo="Adicionar valor" onFechar={() => setMetaContribuindo(null)}>
        {metaContribuindo && <FormContribuir meta={metaContribuindo} onFechar={() => setMetaContribuindo(null)} />}
      </ModalFormulario>
    </div>
  )
}

function CardMeta({
  meta,
  v,
  concluida,
  onContribuir,
  onEditar,
  onExcluir,
  onPausar,
  onArquivar,
}: {
  meta: Meta
  v: (n: number) => string
  concluida?: boolean
  onContribuir: () => void
  onEditar: () => void
  onExcluir: () => void
  onPausar: () => void
  onArquivar: () => void
}) {
  const { permissoes } = useGestaoFinanceira()
  const Icone = iconePorNome(meta.icone)
  const pct = meta.valorObjetivo > 0 ? Math.min(100, (meta.valorAtual / meta.valorObjetivo) * 100) : 0
  const dias = diasRestantes(meta.prazo)

  return (
    <div className={`card-surface rounded-2xl overflow-hidden ${meta.pausada ? 'opacity-60' : ''}`}>
      {meta.fotoUrl && <img src={meta.fotoUrl} alt="" className="w-full h-28 object-cover" />}
      <div className="p-3.5">
        <div className="flex items-center gap-3">
          {!meta.fotoUrl && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${meta.cor}22` }}>
              <Icone size={18} style={{ color: meta.cor }} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] text-white font-semibold truncate">{meta.nome}</p>
              {meta.pausada && <Pause size={11} className="text-slate-500 shrink-0" />}
            </div>
            <p className="text-[11px] text-slate-500">
              {v(meta.valorAtual)} de {v(meta.valorObjetivo)}
            </p>
          </div>
          <span
            className="text-[9.5px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: `${COR_PRIORIDADE[meta.prioridade]}22`, color: COR_PRIORIDADE[meta.prioridade] }}
          >
            {LABEL_PRIORIDADE[meta.prioridade]}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className={concluida ? 'text-accent-green font-semibold' : 'text-slate-400'}>
              {concluida ? 'Concluída! 🎉' : `${pct.toFixed(0)}%`}
            </span>
            {dias != null && !concluida && (
              <span className={dias < 0 ? 'text-accent-red' : dias <= 7 ? 'text-accent-gold' : 'text-slate-500'}>
                {dias < 0 ? 'Prazo passou' : dias === 0 ? 'Prazo é hoje' : `${dias} dias restantes`}
              </span>
            )}
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: concluida ? '#22C55E' : meta.cor }} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {!concluida && permissoes.editar && (
            <button
              onClick={onContribuir}
              className="flex items-center gap-1.5 text-[11.5px] font-semibold text-accent-cyan bg-accent-cyan/10 rounded-lg px-2.5 py-1.5"
            >
              <TrendingUp size={12} /> Adicionar valor
            </button>
          )}
          <div className="flex-1" />
          {permissoes.editar && (
            <button onClick={onPausar} className="p-1.5 text-slate-500" aria-label={meta.pausada ? 'Retomar meta' : 'Pausar meta'}>
              {meta.pausada ? <Play size={13} /> : <Pause size={13} />}
            </button>
          )}
          {permissoes.editar && (
            <button onClick={onEditar} className="p-1.5 text-slate-500" aria-label="Editar meta">
              <Pencil size={13} />
            </button>
          )}
          {permissoes.editar && (
            <button onClick={onArquivar} className="p-1.5 text-slate-500" aria-label="Arquivar meta">
              <Archive size={13} />
            </button>
          )}
          {permissoes.excluir && (
            <button onClick={onExcluir} className="p-1.5 text-slate-500" aria-label="Excluir meta">
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function FormContribuir({ meta, onFechar }: { meta: Meta; onFechar: () => void }) {
  const { editarMeta } = useGestaoFinanceira()
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

  function confirmar() {
    if (valor <= 0) return
    editarMeta({ ...meta, valorAtual: meta.valorAtual + valor })
    onFechar()
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <p className="text-[12.5px] text-slate-400">
        Quanto você quer somar à meta <span className="text-white font-semibold">{meta.nome}</span>?
      </p>
      <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-cyan">
        <span className="text-[18px] text-slate-500 font-semibold">R$</span>
        <input
          inputMode="numeric"
          autoFocus
          placeholder="0,00"
          value={texto}
          onChange={(e) => setTexto(formatarEntrada(e.target.value))}
          className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
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
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-cyan text-bg"
        >
          Adicionar
        </motion.button>
      </div>
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
