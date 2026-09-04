import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import type { Conta, TipoConta } from '../types'

interface Props {
  contaEditando: Conta | null
  onSalvar: () => void
  onCancelar: () => void
}

const TIPOS: { id: TipoConta; label: string }[] = [
  { id: 'corrente', label: 'Conta corrente' },
  { id: 'poupanca', label: 'Poupança' },
  { id: 'carteira', label: 'Carteira' },
  { id: 'dinheiro', label: 'Dinheiro' },
  { id: 'digital', label: 'Carteira digital' },
  { id: 'investimento', label: 'Investimento' },
  { id: 'outra', label: 'Outra' },
]

const CORES = ['#00D4FF', '#22C55E', '#FFC93C', '#EC4899', '#8B5CF6', '#EF4444', '#3B82F6', '#64748B']

function formatarEntradaValor(texto: string) {
  const somenteDigitos = texto.replace(/\D/g, '')
  if (!somenteDigitos) return ''
  const numero = parseInt(somenteDigitos, 10) / 100
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Formulário de conta — usado tanto pra criar quanto editar (quando
// `contaEditando` vem preenchido). Só o nome é obrigatório; o resto tem
// valor padrão sensato pra cadastro rápido.
export default function GfFormConta({ contaEditando, onSalvar, onCancelar }: Props) {
  const { estado, adicionarConta, editarConta } = useGestaoFinanceira()
  const [nome, setNome] = useState(contaEditando?.nome ?? '')
  const [tipo, setTipo] = useState<TipoConta>(contaEditando?.tipo ?? 'corrente')
  const [saldoTexto, setSaldoTexto] = useState(
    contaEditando ? contaEditando.saldoInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [cor, setCor] = useState(contaEditando?.cor ?? CORES[0])
  const [principal, setPrincipal] = useState(contaEditando?.principal ?? estado.contas.length === 0)

  const saldoNumerico = (() => {
    const limpo = saldoTexto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  })()

  const podeSalvar = nome.trim().length > 0

  function salvar() {
    if (!podeSalvar) return
    const conta: Conta = {
      id: contaEditando?.id ?? `conta-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      tipo,
      saldoInicial: saldoNumerico,
      moeda: contaEditando?.moeda ?? 'BRL',
      icone: 'Wallet2',
      cor,
      principal,
      arquivada: contaEditando?.arquivada ?? false,
      criadaEm: contaEditando?.criadaEm ?? new Date().toISOString(),
    }
    if (contaEditando) {
      editarConta(conta)
    } else {
      adicionarConta(conta)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Nome da conta</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Nubank, Carteira, Caixinha..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
          autoFocus
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

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">
          {contaEditando ? 'Saldo inicial (não muda o histórico de lançamentos)' : 'Saldo inicial'}
        </label>
        <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-cyan">
          <span className="text-[18px] text-slate-500 font-semibold">R$</span>
          <input
            inputMode="numeric"
            placeholder="0,00"
            value={saldoTexto}
            onChange={(e) => setSaldoTexto(formatarEntradaValor(e.target.value))}
            className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
          />
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

      <button
        onClick={() => setPrincipal((v) => !v)}
        className="flex items-center justify-between card-surface rounded-2xl px-4 py-3 border border-border"
      >
        <span className="text-[12.5px] text-slate-300 font-medium">Definir como conta principal</span>
        <span className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${principal ? 'bg-accent-cyan justify-end' : 'bg-border justify-start'}`}>
          <span className="w-5 h-5 rounded-full bg-white" />
        </span>
      </button>

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
          {contaEditando ? 'Salvar alterações' : 'Adicionar conta'}
        </motion.button>
      </div>
    </div>
  )
}
