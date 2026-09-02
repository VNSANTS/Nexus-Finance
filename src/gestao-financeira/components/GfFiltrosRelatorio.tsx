import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Categoria, Conta, FormaPagamento } from '../types'

export interface FiltrosRelatorio {
  tipo: 'todos' | 'receita' | 'despesa'
  categorias: string[]
  contas: string[]
  formas: FormaPagamento[]
}

export const FILTROS_VAZIOS: FiltrosRelatorio = { tipo: 'todos', categorias: [], contas: [], formas: [] }

export function contarFiltrosAtivos(f: FiltrosRelatorio): number {
  return (f.tipo !== 'todos' ? 1 : 0) + f.categorias.length + f.contas.length + f.formas.length
}

export const LABEL_FORMA_PAGAMENTO: Record<FormaPagamento, string> = {
  dinheiro: 'Dinheiro',
  pix: 'Pix',
  debito: 'Débito',
  credito: 'Crédito',
  transferencia: 'Transferência',
  boleto: 'Boleto',
  'carteira-digital': 'Carteira digital',
  outro: 'Outro',
}

const FORMAS: FormaPagamento[] = ['dinheiro', 'pix', 'debito', 'credito', 'transferencia', 'boleto', 'carteira-digital', 'outro']

function alternar<T>(lista: T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
}

interface Props {
  aberto: boolean
  categorias: Categoria[]
  contas: Conta[]
  filtros: FiltrosRelatorio
  onMudar: (f: FiltrosRelatorio) => void
  onFechar: () => void
}

// Sheet de filtros do Relatório: Tipo, Categoria, Conta e Forma de
// pagamento. Cada toque já aplica na hora (sem passo extra de "aplicar") —
// os cards por trás atualizam em tempo real, então dá pra ver o efeito do
// filtro sem fechar o sheet.
export default function GfFiltrosRelatorio({ aberto, categorias, contas, filtros, onMudar, onFechar }: Props) {
  const ativos = contarFiltrosAtivos(filtros)

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-[var(--cor-overlay)] flex items-end justify-center"
          onClick={onFechar}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] max-h-[85vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-display font-extrabold text-white">Filtros</p>
              <button onClick={onFechar} className="text-slate-500" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <Secao titulo="Tipo">
              <div className="flex gap-2">
                <Chip label="Tudo" ativo={filtros.tipo === 'todos'} onClick={() => onMudar({ ...filtros, tipo: 'todos' })} />
                <Chip
                  label="Receitas"
                  cor="#22C55E"
                  ativo={filtros.tipo === 'receita'}
                  onClick={() => onMudar({ ...filtros, tipo: 'receita' })}
                />
                <Chip
                  label="Despesas"
                  cor="#EF4444"
                  ativo={filtros.tipo === 'despesa'}
                  onClick={() => onMudar({ ...filtros, tipo: 'despesa' })}
                />
              </div>
            </Secao>

            {categorias.length > 0 && (
              <Secao titulo="Categoria">
                <div className="flex flex-wrap gap-2">
                  {categorias.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.nome}
                      cor={c.cor}
                      ativo={filtros.categorias.includes(c.id)}
                      onClick={() => onMudar({ ...filtros, categorias: alternar(filtros.categorias, c.id) })}
                    />
                  ))}
                </div>
              </Secao>
            )}

            {contas.length > 0 && (
              <Secao titulo="Conta">
                <div className="flex flex-wrap gap-2">
                  {contas.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.nome}
                      cor={c.cor}
                      ativo={filtros.contas.includes(c.id)}
                      onClick={() => onMudar({ ...filtros, contas: alternar(filtros.contas, c.id) })}
                    />
                  ))}
                </div>
              </Secao>
            )}

            <Secao titulo="Forma de pagamento">
              <div className="flex flex-wrap gap-2">
                {FORMAS.map((f) => (
                  <Chip
                    key={f}
                    label={LABEL_FORMA_PAGAMENTO[f]}
                    ativo={filtros.formas.includes(f)}
                    onClick={() => onMudar({ ...filtros, formas: alternar(filtros.formas, f) })}
                  />
                ))}
              </div>
            </Secao>

            <div className="flex items-center gap-2.5 mt-2">
              <button
                onClick={() => onMudar(FILTROS_VAZIOS)}
                disabled={ativos === 0}
                className="flex-1 rounded-2xl py-3 text-[13px] font-semibold card-surface border border-border text-slate-400 disabled:opacity-40"
              >
                Limpar filtros
              </button>
              <button onClick={onFechar} className="flex-1 rounded-2xl py-3 text-[13px] font-bold bg-accent-cyan text-bg">
                Ver resultado
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[11.5px] text-slate-500 font-medium mb-2">{titulo}</p>
      {children}
    </div>
  )
}

function Chip({ label, ativo, cor = '#00D4FF', onClick }: { label: string; ativo: boolean; cor?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold border transition-colors"
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
