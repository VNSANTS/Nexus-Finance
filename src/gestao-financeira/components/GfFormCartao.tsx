import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import type { Cartao, TipoCartao } from '../types'

interface Props {
  cartaoEditando: Cartao | null
  onSalvar: () => void
  onCancelar: () => void
}

const TIPOS: { id: TipoCartao; label: string }[] = [
  { id: 'credito', label: 'Crédito' },
  { id: 'debito', label: 'Débito' },
  { id: 'multiplo', label: 'Múltiplo' },
]

const CORES = ['#00D4FF', '#22C55E', '#FFC93C', '#EC4899', '#8B5CF6', '#EF4444', '#3B82F6', '#64748B']

function formatarEntradaValor(texto: string) {
  const somenteDigitos = texto.replace(/\D/g, '')
  if (!somenteDigitos) return ''
  const numero = parseInt(somenteDigitos, 10) / 100
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function diaValido(texto: string): number {
  const n = parseInt(texto, 10)
  if (isNaN(n)) return 1
  return Math.min(31, Math.max(1, n))
}

// Formulário de cartão — mesmo espírito do GfFormConta (nome + tipo
// obrigatórios de fato, resto com padrão sensato pra cadastro rápido).
export default function GfFormCartao({ cartaoEditando, onSalvar, onCancelar }: Props) {
  const { adicionarCartao, editarCartao } = useGestaoFinanceira()
  const [nome, setNome] = useState(cartaoEditando?.nome ?? '')
  const [banco, setBanco] = useState(cartaoEditando?.banco ?? '')
  const [tipo, setTipo] = useState<TipoCartao>(cartaoEditando?.tipo ?? 'credito')
  const [limiteTexto, setLimiteTexto] = useState(
    cartaoEditando ? cartaoEditando.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [diaFechamento, setDiaFechamento] = useState(String(cartaoEditando?.diaFechamento ?? 1))
  const [diaVencimento, setDiaVencimento] = useState(String(cartaoEditando?.diaVencimento ?? 10))
  const [cor, setCor] = useState(cartaoEditando?.cor ?? CORES[4])

  const limiteNumerico = (() => {
    const limpo = limiteTexto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  })()

  const podeSalvar = nome.trim().length > 0

  function salvar() {
    if (!podeSalvar) return
    const cartao: Cartao = {
      id: cartaoEditando?.id ?? `cartao-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      banco: banco.trim(),
      tipo,
      limite: limiteNumerico,
      diaFechamento: diaValido(diaFechamento),
      diaVencimento: diaValido(diaVencimento),
      cor,
      icone: 'Landmark',
      arquivado: cartaoEditando?.arquivado ?? false,
      criadoEm: cartaoEditando?.criadoEm ?? new Date().toISOString(),
    }
    if (cartaoEditando) {
      editarCartao(cartao)
    } else {
      adicionarCartao(cartao)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Apelido do cartão</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Nubank Ultravioleta, Inter Gold..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
          autoFocus
        />
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Banco / emissor</label>
        <input
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          placeholder="Ex: Nubank, Itaú, Inter..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
        />
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Tipo</label>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTipo(t.id)}
              className={`rounded-xl px-3 py-2 text-[11.5px] font-semibold border ${
                tipo === t.id ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tipo !== 'debito' && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Limite</label>
          <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-cyan">
            <span className="text-[18px] text-slate-500 font-semibold">R$</span>
            <input
              inputMode="numeric"
              placeholder="0,00"
              value={limiteTexto}
              onChange={(e) => setLimiteTexto(formatarEntradaValor(e.target.value))}
              className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
            />
          </div>
        </div>
      )}

      {tipo !== 'debito' && (
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Dia do fechamento</label>
            <input
              inputMode="numeric"
              value={diaFechamento}
              onChange={(e) => setDiaFechamento(e.target.value.replace(/\D/g, '').slice(0, 2))}
              className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white border border-border focus:outline-none focus:border-accent-cyan"
            />
          </div>
          <div className="flex-1">
            <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Dia do vencimento</label>
            <input
              inputMode="numeric"
              value={diaVencimento}
              onChange={(e) => setDiaVencimento(e.target.value.replace(/\D/g, '').slice(0, 2))}
              className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white border border-border focus:outline-none focus:border-accent-cyan"
            />
          </div>
        </div>
      )}

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
          {cartaoEditando ? 'Salvar alterações' : 'Adicionar cartão'}
        </motion.button>
      </div>
    </div>
  )
}
