import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, Plus, X, Pencil, Trash2, Lock } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormCategoria from '../components/GfFormCategoria'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome } from '../iconMap'
import type { Categoria } from '../types'

type Modal = { modo: 'novo'; tipo: 'receita' | 'despesa' } | { modo: 'editar'; categoria: Categoria } | null

// Tela de Categorias: cria, edita e exclui categorias de receita/despesa.
// Categorias padrão (padrao: true) podem ser editadas (cor, ícone, natureza)
// mas não excluídas — são a base que o app espera sempre existir. As ações
// já existiam no contexto (adicionarCategoria/editarCategoria/excluirCategoria);
// só faltava a tela.
export default function GfCategoriasPage() {
  const { estado, permissoes, excluirCategoria } = useGestaoFinanceira()
  const [aba, setAba] = useState<'despesa' | 'receita'>('despesa')
  const [modal, setModal] = useState<Modal>(null)

  const categorias = useMemo(
    () => estado.categorias.filter((c) => c.tipo === aba),
    [estado.categorias, aba]
  )

  function contarUsos(categoriaId: string) {
    return estado.transacoes.filter((t) => t.categoriaId === categoriaId).length
  }

  function pedirExclusao(categoria: Categoria) {
    const usos = contarUsos(categoria.id)
    const aviso = usos > 0
      ? `Excluir "${categoria.nome}"? Ela está usada em ${usos} lançamento${usos !== 1 ? 's' : ''}, que continuam existindo mas ficam sem categoria.`
      : `Excluir "${categoria.nome}"?`
    if (window.confirm(aviso)) {
      excluirCategoria(categoria.id)
    }
  }

  return (
    <div className="pb-10">
      <GfHeader titulo="Categorias" subtitulo="Organize receitas e despesas" icone={Tag} corIcone="#3B82F6" voltarPara="/gestao-financeira/mais" />

      {/* Abas */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 card-surface rounded-2xl p-1 border border-border">
          <button
            onClick={() => setAba('despesa')}
            className={`flex-1 rounded-xl py-2 text-[12.5px] font-semibold transition-colors ${
              aba === 'despesa' ? 'bg-accent-red/15 text-accent-red' : 'text-slate-500'
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setAba('receita')}
            className={`flex-1 rounded-xl py-2 text-[12.5px] font-semibold transition-colors ${
              aba === 'receita' ? 'bg-accent-green/15 text-accent-green' : 'text-slate-500'
            }`}
          >
            Receitas
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 flex items-center justify-between">
        <p className="text-[13px] text-white font-bold">
          {categorias.length} categoria{categorias.length !== 1 && 's'}
        </p>
        {permissoes.editar && (
          <button
            onClick={() => setModal({ modo: 'novo', tipo: aba })}
            className="flex items-center gap-1 text-[11.5px] text-accent-cyan font-semibold"
          >
            <Plus size={14} /> Nova categoria
          </button>
        )}
      </div>

      <div className="px-4 mt-2.5 flex flex-col gap-2.5">
        {categorias.length === 0 ? (
          <div className="card-surface rounded-2xl p-5 text-center flex flex-col items-center gap-2.5">
            <Tag size={20} className="text-slate-600" />
            <p className="text-[12.5px] text-slate-500">Nenhuma categoria de {aba} ainda.</p>
            {permissoes.editar && (
              <button onClick={() => setModal({ modo: 'novo', tipo: aba })} className="text-[12px] font-semibold text-accent-cyan">
                Criar primeira categoria
              </button>
            )}
          </div>
        ) : (
          categorias.map((categoria) => {
            const Icone = iconePorNome(categoria.icone)
            const usos = contarUsos(categoria.id)
            return (
              <div key={categoria.id} className="card-surface rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${categoria.cor}22` }}>
                  <Icone size={18} style={{ color: categoria.cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] text-white font-semibold truncate">{categoria.nome}</p>
                    {categoria.padrao && <Lock size={10} className="text-slate-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {usos > 0 ? `${usos} lançamento${usos !== 1 ? 's' : ''}` : 'Sem lançamentos'}
                    {categoria.tipo === 'despesa' && categoria.natureza && ` · ${categoria.natureza === 'fixo' ? 'Fixo' : 'Variável'}`}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {permissoes.editar && (
                    <button onClick={() => setModal({ modo: 'editar', categoria })} className="p-1.5 text-slate-500" aria-label="Editar categoria">
                      <Pencil size={13} />
                    </button>
                  )}
                  {permissoes.excluir && (
                    <button
                      onClick={() => (categoria.padrao ? undefined : pedirExclusao(categoria))}
                      disabled={categoria.padrao}
                      className="p-1.5 text-slate-500 disabled:opacity-30"
                      aria-label="Excluir categoria"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Modal: nova/editar categoria */}
      <ModalFormulario
        aberto={modal !== null}
        titulo={modal?.modo === 'editar' ? 'Editar categoria' : 'Nova categoria'}
        onFechar={() => setModal(null)}
      >
        <GfFormCategoria
          categoriaEditando={modal?.modo === 'editar' ? modal.categoria : null}
          tipoInicial={modal?.modo === 'novo' ? modal.tipo : aba}
          onSalvar={() => setModal(null)}
          onCancelar={() => setModal(null)}
        />
      </ModalFormulario>
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
