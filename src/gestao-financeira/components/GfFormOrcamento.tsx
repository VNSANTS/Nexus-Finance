import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import type { OrcamentoCategoria } from '../types'
import { iconePorNome } from '../iconMap'

interface Props {
  categoriaId: string | null // null = criando novo (escolhe a categoria); preenchido = editando
  onSalvar: () => void
  onCancelar: () => void
}

function formatarEntradaValor(texto: string) {
  const somenteDigitos = texto.replace(/\D/g, '')
  if (!somenteDigitos) return ''
  const numero = parseInt(somenteDigitos, 10) / 100
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function GfFormOrcamento({ categoriaId, onSalvar, onCancelar }: Props) {
  const { estado, definirOrcamento, removerOrcamento } = useGestaoFinanceira()

  const categoriasComOrcamento = new Set(estado.orcamentos.map((o) => o.categoriaId))
  const categoriasDisponiveis = estado.categorias.filter(
    (c) => c.tipo === 'despesa' && (c.id === categoriaId || !categoriasComOrcamento.has(c.id))
  )

  const orcamentoAtual = estado.orcamentos.find((o) => o.categoriaId === categoriaId) ?? null
  const [categoriaEscolhidaId, setCategoriaEscolhidaId] = useState<string | null>(categoriaId ?? categoriasDisponiveis[0]?.id ?? null)
  const [limiteTexto, setLimiteTexto] = useState(orcamentoAtual ? orcamentoAtual.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '')

  const limiteNumerico = (() => {
    const limpo = limiteTexto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  })()

  const podeSalvar = categoriaEscolhidaId !== null && limiteNumerico > 0

  function salvar() {
    if (!podeSalvar || !categoriaEscolhidaId) return
    const payload: OrcamentoCategoria = { categoriaId: categoriaEscolhidaId, limite: limiteNumerico }
    definirOrcamento(payload)
    onSalvar()
  }

  function excluir() {
    if (!categoriaId) return
    removerOrcamento(categoriaId)
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Categoria</label>
        {categoriaId ? (
          // Editando: categoria já fixada, não dá pra trocar (senão vira duplicar orçamento)
          <div className="flex items-center gap-2.5 card-surface rounded-2xl px-4 py-3 border border-border opacity-80">
            {(() => {
              const cat = estado.categorias.find((c) => c.id === categoriaId)
              if (!cat) return <span className="text-[13px] text-slate-400">Categoria</span>
              const Icone = iconePorNome(cat.icone)
              return (
                <>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cat.cor}22` }}>
                    <Icone size={13} style={{ color: cat.cor }} />
                  </div>
                  <span className="text-[13px] text-white font-medium">{cat.nome}</span>
                </>
              )
            })()}
          </div>
        ) : categoriasDisponiveis.length === 0 ? (
          <p className="text-[12.5px] text-slate-500 card-surface rounded-2xl px-4 py-3 border border-border">
            Todas as categorias de despesa já têm um orçamento definido.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categoriasDisponiveis.map((c) => {
              const Icone = iconePorNome(c.icone)
              const selecionada = categoriaEscolhidaId === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setCategoriaEscolhidaId(c.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11.5px] font-semibold border ${
                    selecionada ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                  }`}
                >
                  <Icone size={13} style={{ color: selecionada ? undefined : c.cor }} />
                  {c.nome}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Limite mensal</label>
        <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-cyan">
          <span className="text-[18px] text-slate-500 font-semibold">R$</span>
          <input
            inputMode="numeric"
            placeholder="0,00"
            value={limiteTexto}
            onChange={(e) => setLimiteTexto(formatarEntradaValor(e.target.value))}
            className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
            autoFocus
          />
        </div>
        <p className="text-[11px] text-slate-600 mt-1.5">Esse limite se repete todo mês — não precisa redefinir.</p>
      </div>

      <div className="flex items-center gap-2.5 mt-1">
        <button onClick={onCancelar} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400 text-[13px]">
          ✕
        </button>
        {categoriaId && (
          <button onClick={excluir} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-accent-red">
            <Trash2 size={16} />
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-cyan text-bg"
        >
          {categoriaId ? 'Salvar alterações' : 'Definir orçamento'}
        </motion.button>
      </div>
    </div>
  )
}
