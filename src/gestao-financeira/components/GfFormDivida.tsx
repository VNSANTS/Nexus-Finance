import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import type { Divida } from '../types'

interface Props {
  dividaEditando: Divida | null
  onSalvar: () => void
  onCancelar: () => void
}

function formatarEntradaValor(texto: string) {
  const somenteDigitos = texto.replace(/\D/g, '')
  if (!somenteDigitos) return ''
  const numero = parseInt(somenteDigitos, 10) / 100
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Formulário de dívida — cria ou edita (quando `dividaEditando` vem
// preenchido). Parcelas, vencimento e conta são opcionais: dá pra cadastrar
// só "nome + valor total" pra uma dívida simples, sem parcelamento.
export default function GfFormDivida({ dividaEditando, onSalvar, onCancelar }: Props) {
  const { estado, adicionarDivida, editarDivida } = useGestaoFinanceira()
  const [nome, setNome] = useState(dividaEditando?.nome ?? '')
  const [valorTotalTexto, setValorTotalTexto] = useState(
    dividaEditando ? dividaEditando.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [temParcelas, setTemParcelas] = useState(dividaEditando?.parcelas != null)
  const [parcelasTexto, setParcelasTexto] = useState(dividaEditando?.parcelas != null ? String(dividaEditando.parcelas) : '')
  const [temVencimento, setTemVencimento] = useState(dividaEditando?.vencimento != null)
  const [vencimento, setVencimento] = useState(dividaEditando?.vencimento ?? '')
  const [contaId, setContaId] = useState<string | null>(dividaEditando?.contaId ?? null)

  const valorTotal = (() => {
    const limpo = valorTotalTexto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  })()
  const parcelas = temParcelas ? parseInt(parcelasTexto, 10) || null : null

  const podeSalvar = nome.trim().length > 0 && valorTotal > 0

  function salvar() {
    if (!podeSalvar) return
    const divida: Divida = {
      id: dividaEditando?.id ?? `divida-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      valorTotal,
      valorPago: dividaEditando?.valorPago ?? 0,
      vencimento: temVencimento && vencimento ? vencimento : null,
      contaId,
      parcelas,
      parcelaAtual: dividaEditando?.parcelaAtual ?? (parcelas ? 1 : null),
      quitada: dividaEditando?.quitada ?? false,
      criadaEm: dividaEditando?.criadaEm ?? new Date().toISOString(),
    }
    if (dividaEditando) {
      editarDivida(divida)
    } else {
      adicionarDivida(divida)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Nome da dívida</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Financiamento do carro, Empréstimo..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-red"
          autoFocus
        />
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">
          {dividaEditando ? 'Valor total (não muda o quanto já foi pago)' : 'Valor total'}
        </label>
        <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-red">
          <span className="text-[18px] text-slate-500 font-semibold">R$</span>
          <input
            inputMode="numeric"
            placeholder="0,00"
            value={valorTotalTexto}
            onChange={(e) => setValorTotalTexto(formatarEntradaValor(e.target.value))}
            className="flex-1 bg-transparent text-[18px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => setTemParcelas((v) => !v)}
        className="flex items-center justify-between card-surface rounded-2xl px-4 py-3 border border-border"
      >
        <span className="text-[12.5px] text-slate-300 font-medium">É parcelado</span>
        <span className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${temParcelas ? 'bg-accent-red justify-end' : 'bg-border justify-start'}`}>
          <span className="w-5 h-5 rounded-full bg-white" />
        </span>
      </button>
      {temParcelas && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Número de parcelas</label>
          <input
            inputMode="numeric"
            placeholder="Ex: 12"
            value={parcelasTexto}
            onChange={(e) => setParcelasTexto(e.target.value.replace(/\D/g, ''))}
            className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-red"
          />
        </div>
      )}

      <button
        onClick={() => setTemVencimento((v) => !v)}
        className="flex items-center justify-between card-surface rounded-2xl px-4 py-3 border border-border"
      >
        <span className="text-[12.5px] text-slate-300 font-medium">Tem data de vencimento</span>
        <span className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${temVencimento ? 'bg-accent-red justify-end' : 'bg-border justify-start'}`}>
          <span className="w-5 h-5 rounded-full bg-white" />
        </span>
      </button>
      {temVencimento && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Próximo vencimento</label>
          <input
            type="date"
            value={vencimento}
            onChange={(e) => setVencimento(e.target.value)}
            className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white border border-border focus:outline-none focus:border-accent-red"
          />
        </div>
      )}

      {estado.contas.length > 0 && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Sai de qual conta (opcional)</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setContaId(null)}
              className={`rounded-xl px-3 py-2 text-[11.5px] font-semibold border flex items-center gap-1.5 ${
                contaId === null ? 'border-accent-red bg-accent-red/10 text-accent-red' : 'border-border card-surface text-slate-400'
              }`}
            >
              {contaId === null && <Check size={13} />} Nenhuma
            </button>
            {estado.contas
              .filter((c) => !c.arquivada)
              .map((c) => (
                <button
                  key={c.id}
                  onClick={() => setContaId(c.id)}
                  className={`rounded-xl px-3 py-2 text-[11.5px] font-semibold border flex items-center gap-1.5 ${
                    contaId === c.id ? 'border-accent-red bg-accent-red/10 text-accent-red' : 'border-border card-surface text-slate-400'
                  }`}
                >
                  {contaId === c.id && <Check size={13} />} {c.nome}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2.5 mt-1">
        <button onClick={onCancelar} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400 text-[13px]">
          ✕
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-red text-white"
        >
          {dividaEditando ? 'Salvar alterações' : 'Adicionar dívida'}
        </motion.button>
      </div>
    </div>
  )
}
