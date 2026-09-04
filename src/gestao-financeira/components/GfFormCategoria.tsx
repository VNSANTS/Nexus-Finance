import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome, ICONES_DESPESA, ICONES_RECEITA } from '../iconMap'
import type { Categoria, EssencialidadeGasto, NaturezaGasto } from '../types'

interface Props {
  categoriaEditando: Categoria | null
  tipoInicial: 'receita' | 'despesa'
  onSalvar: () => void
  onCancelar: () => void
}

const CORES = ['#00D4FF', '#22C55E', '#FFC93C', '#EC4899', '#8B5CF6', '#EF4444', '#3B82F6', '#64748B']

// Formulário de categoria — cria ou edita (quando `categoriaEditando` vem
// preenchido). Natureza e essencialidade só fazem sentido pra despesa (são
// usadas nos relatórios "Fixos x Variáveis" e "Necessidades x Desejos");
// pra receita esses campos ficam de fora.
export default function GfFormCategoria({ categoriaEditando, tipoInicial, onSalvar, onCancelar }: Props) {
  const { adicionarCategoria, editarCategoria } = useGestaoFinanceira()
  const [nome, setNome] = useState(categoriaEditando?.nome ?? '')
  const [tipo, setTipo] = useState<'receita' | 'despesa'>(categoriaEditando?.tipo ?? tipoInicial)
  const [icone, setIcone] = useState(categoriaEditando?.icone ?? (tipo === 'receita' ? ICONES_RECEITA[0] : ICONES_DESPESA[0]))
  const [cor, setCor] = useState(categoriaEditando?.cor ?? CORES[0])
  const [natureza, setNatureza] = useState<NaturezaGasto>(categoriaEditando?.natureza ?? 'variavel')
  const [essencialidade, setEssencialidade] = useState<EssencialidadeGasto>(categoriaEditando?.essencialidade ?? 'necessidade')

  const listaIcones = tipo === 'receita' ? ICONES_RECEITA : ICONES_DESPESA
  const podeSalvar = nome.trim().length > 0

  function trocarTipo(novoTipo: 'receita' | 'despesa') {
    setTipo(novoTipo)
    const lista = novoTipo === 'receita' ? ICONES_RECEITA : ICONES_DESPESA
    if (!lista.includes(icone)) setIcone(lista[0])
  }

  function salvar() {
    if (!podeSalvar) return
    const categoria: Categoria = {
      id: categoriaEditando?.id ?? `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      tipo,
      icone,
      cor,
      categoriaPaiId: categoriaEditando?.categoriaPaiId ?? null,
      padrao: categoriaEditando?.padrao ?? false,
      ...(tipo === 'despesa' ? { natureza, essencialidade } : {}),
    }
    if (categoriaEditando) {
      editarCategoria(categoria)
    } else {
      adicionarCategoria(categoria)
    }
    onSalvar()
  }

  const IconeSelecionado = iconePorNome(icone)

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Prévia */}
      <div className="flex items-center gap-3 card-surface rounded-2xl p-3.5 border border-border">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
          <IconeSelecionado size={20} style={{ color: cor }} />
        </div>
        <p className="text-[13.5px] text-white font-semibold truncate">{nome.trim() || 'Nome da categoria'}</p>
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Nome</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Pets, Academia, Streaming..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
          autoFocus
        />
      </div>

      {!categoriaEditando?.padrao && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Tipo</label>
          <div className="flex gap-2">
            <button
              onClick={() => trocarTipo('despesa')}
              className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                tipo === 'despesa' ? 'border-accent-red bg-accent-red/10 text-accent-red' : 'border-border card-surface text-slate-400'
              }`}
            >
              Despesa
            </button>
            <button
              onClick={() => trocarTipo('receita')}
              className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                tipo === 'receita' ? 'border-accent-green bg-accent-green/10 text-accent-green' : 'border-border card-surface text-slate-400'
              }`}
            >
              Receita
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Ícone</label>
        <div className="grid grid-cols-7 gap-2">
          {listaIcones.map((nomeIcone) => {
            const Icone = iconePorNome(nomeIcone)
            const selecionado = icone === nomeIcone
            return (
              <button
                key={nomeIcone}
                onClick={() => setIcone(nomeIcone)}
                className={`aspect-square rounded-xl flex items-center justify-center border ${
                  selecionado ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                }`}
                aria-label={nomeIcone}
              >
                <Icone size={16} style={{ color: selecionado ? '#00D4FF' : '#64748B' }} />
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Cor</label>
        <div className="flex gap-2.5">
          {CORES.map((c) => (
            <button
              key={c}
              onClick={() => setCor(c)}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: c }}
              aria-label={`Cor ${c}`}
            >
              {cor === c && <Check size={14} className="text-white" />}
            </button>
          ))}
        </div>
      </div>

      {tipo === 'despesa' && (
        <>
          <div>
            <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Natureza do gasto</label>
            <div className="flex gap-2">
              <button
                onClick={() => setNatureza('fixo')}
                className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                  natureza === 'fixo' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                }`}
              >
                Fixo
              </button>
              <button
                onClick={() => setNatureza('variavel')}
                className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                  natureza === 'variavel' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                }`}
              >
                Variável
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Essencialidade</label>
            <div className="flex gap-2">
              <button
                onClick={() => setEssencialidade('necessidade')}
                className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                  essencialidade === 'necessidade' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                }`}
              >
                Necessidade
              </button>
              <button
                onClick={() => setEssencialidade('desejo')}
                className={`flex-1 rounded-xl py-2.5 text-[12.5px] font-semibold border ${
                  essencialidade === 'desejo' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                }`}
              >
                Desejo
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center gap-2.5 mt-1">
        <button onClick={onCancelar} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400 text-[13px]">
          ✕
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-cyan text-bg"
        >
          {categoriaEditando ? 'Salvar alterações' : 'Adicionar categoria'}
        </motion.button>
      </div>
    </div>
  )
}
