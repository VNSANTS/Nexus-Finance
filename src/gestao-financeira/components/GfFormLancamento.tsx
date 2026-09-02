import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Landmark, CreditCard as CreditCardIcon } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome } from '../iconMap'
import type { FormaPagamento, Transacao, TipoTransacao } from '../types'

interface Props {
  tipoInicial: TipoTransacao
  formaInicial?: FormaPagamento
  transacaoEditando?: Transacao | null
  onSalvar: () => void
  onCancelar: () => void
}

const FORMAS: { id: FormaPagamento; label: string }[] = [
  { id: 'pix', label: 'Pix' },
  { id: 'dinheiro', label: 'Dinheiro' },
  { id: 'debito', label: 'Débito' },
  { id: 'credito', label: 'Crédito' },
  { id: 'transferencia', label: 'Transferência' },
  { id: 'boleto', label: 'Boleto' },
  { id: 'carteira-digital', label: 'Carteira digital' },
  { id: 'outro', label: 'Outro' },
]

function agoraISO() {
  const d = new Date()
  return {
    data: d.toISOString().slice(0, 10),
    hora: d.toTimeString().slice(0, 5),
  }
}

// Formulário de novo lançamento — receita, despesa ou transferência. Campos
// obrigatórios: valor, tipo, data. Categoria, conta, cartão, forma de
// pagamento e descrição são preenchíveis mas não bloqueiam o salvamento
// (fica fácil registrar rápido e completar detalhes depois).
export default function GfFormLancamento({ tipoInicial, formaInicial, transacaoEditando, onSalvar, onCancelar }: Props) {
  const { estado, adicionarTransacao, editarTransacao } = useGestaoFinanceira()
  const [tipo, setTipo] = useState<TipoTransacao>(transacaoEditando?.tipo ?? tipoInicial)
  const [valorTexto, setValorTexto] = useState(
    transacaoEditando ? transacaoEditando.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [descricao, setDescricao] = useState(transacaoEditando?.descricao ?? '')
  const [categoriaId, setCategoriaId] = useState<string | null>(transacaoEditando?.categoriaId ?? null)
  const [contaId, setContaId] = useState<string | null>(
    transacaoEditando?.contaId ?? estado.contas.find((c) => c.principal)?.id ?? estado.contas[0]?.id ?? null
  )
  const [cartaoId, setCartaoId] = useState<string | null>(transacaoEditando?.cartaoId ?? null)
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>(transacaoEditando?.formaPagamento ?? formaInicial ?? 'pix')
  const [dataHora] = useState(transacaoEditando ? { data: transacaoEditando.data, hora: transacaoEditando.hora } : agoraISO())

  const categoriasDoTipo = useMemo(
    () => estado.categorias.filter((c) => (tipo === 'transferencia' ? true : c.tipo === tipo)),
    [estado.categorias, tipo]
  )

  const valorNumerico = useMemo(() => {
    const limpo = valorTexto.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(limpo)
    return isNaN(n) ? 0 : n
  }, [valorTexto])

  const podeSalvar = valorNumerico > 0

  function formatarEntradaValor(texto: string) {
    const somenteDigitos = texto.replace(/\D/g, '')
    if (!somenteDigitos) return ''
    const numero = parseInt(somenteDigitos, 10) / 100
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  function salvar() {
    if (!podeSalvar) return
    const transacao: Transacao = {
      id: transacaoEditando?.id ?? `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      tipo,
      valor: valorNumerico,
      data: dataHora.data,
      hora: dataHora.hora,
      descricao: descricao.trim(),
      categoriaId,
      contaId,
      cartaoId: formaPagamento === 'credito' ? cartaoId : null,
      formaPagamento,
      pago: transacaoEditando?.pago ?? true,
      criadaEm: transacaoEditando?.criadaEm ?? new Date().toISOString(),
    }
    if (transacaoEditando) {
      editarTransacao(transacao)
    } else {
      adicionarTransacao(transacao)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Tipo */}
      <div className="grid grid-cols-3 gap-2">
        <BotaoTipo label="Receita" ativo={tipo === 'receita'} cor="#22C55E" onClick={() => setTipo('receita')} />
        <BotaoTipo label="Despesa" ativo={tipo === 'despesa'} cor="#EF4444" onClick={() => setTipo('despesa')} />
        <BotaoTipo label="Transferência" ativo={tipo === 'transferencia'} cor="#8B5CF6" onClick={() => setTipo('transferencia')} />
      </div>

      {/* Valor */}
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Valor</label>
        <div className="flex items-center gap-2 card-surface rounded-2xl px-4 py-3.5 border border-border focus-within:border-accent-cyan">
          <span className="text-[20px] text-slate-500 font-semibold">R$</span>
          <input
            inputMode="numeric"
            placeholder="0,00"
            value={valorTexto}
            onChange={(e) => setValorTexto(formatarEntradaValor(e.target.value))}
            className="flex-1 bg-transparent text-[24px] font-display font-extrabold text-white placeholder:text-slate-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Descrição (opcional)</label>
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Supermercado, salário..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
        />
      </div>

      {/* Categoria */}
      {tipo !== 'transferencia' && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Categoria</label>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {categoriasDoTipo.map((cat) => {
              const Icone = iconePorNome(cat.icone)
              const ativo = categoriaId === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaId(ativo ? null : cat.id)}
                  className="flex flex-col items-center gap-1 shrink-0 w-[64px]"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                    style={{ background: ativo ? cat.cor : `${cat.cor}18`, borderColor: ativo ? cat.cor : 'transparent' }}
                  >
                    <Icone size={18} className={ativo ? 'text-bg' : ''} style={!ativo ? { color: cat.cor } : undefined} />
                  </div>
                  <span className={`text-[9.5px] text-center leading-tight ${ativo ? 'text-white font-semibold' : 'text-slate-500'}`}>
                    {cat.nome}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Conta */}
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Conta</label>
        {estado.contas.length === 0 ? (
          <p className="text-[12px] text-slate-500">Nenhuma conta cadastrada ainda — você pode adicionar depois em Contas & Cartões.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {estado.contas
              .filter((c) => !c.arquivada)
              .map((conta) => (
                <button
                  key={conta.id}
                  onClick={() => setContaId(conta.id)}
                  className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 border ${
                    contaId === conta.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${conta.cor}22` }}>
                    <Landmark size={14} style={{ color: conta.cor }} />
                  </div>
                  <span className="text-[13px] text-white font-medium flex-1 text-left truncate">{conta.nome}</span>
                  {contaId === conta.id && <Check size={16} className="text-accent-cyan shrink-0" />}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Forma de pagamento */}
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Forma de pagamento</label>
        <div className="grid grid-cols-4 gap-2">
          {FORMAS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormaPagamento(f.id)}
              className={`rounded-xl py-2.5 text-[10.5px] font-semibold border ${
                formaPagamento === f.id ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cartão (só se crédito) */}
      {formaPagamento === 'credito' && (
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Cartão</label>
          {estado.cartoes.length === 0 ? (
            <p className="text-[12px] text-slate-500">Nenhum cartão cadastrado ainda — você pode adicionar depois em Contas & Cartões.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {estado.cartoes
                .filter((c) => !c.arquivado)
                .map((cartao) => (
                  <button
                    key={cartao.id}
                    onClick={() => setCartaoId(cartao.id)}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 border ${
                      cartaoId === cartao.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cartao.cor}22` }}>
                      <CreditCardIcon size={14} style={{ color: cartao.cor }} />
                    </div>
                    <span className="text-[13px] text-white font-medium flex-1 text-left truncate">{cartao.nome}</span>
                    {cartaoId === cartao.id && <Check size={16} className="text-accent-cyan shrink-0" />}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-2.5 mt-1">
        <button onClick={onCancelar} className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-400 text-[13px]">
          ✕
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 rounded-2xl py-3.5 font-bold text-[14px] disabled:opacity-40 bg-accent-green text-bg"
        >
          {transacaoEditando ? 'Salvar alterações' : 'Salvar lançamento'}
        </motion.button>
      </div>
    </div>
  )
}

function BotaoTipo({ label, ativo, cor, onClick }: { label: string; ativo: boolean; cor: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl py-3 text-[11.5px] font-bold border transition-colors"
      style={{
        borderColor: ativo ? cor : '#1C2740',
        background: ativo ? `${cor}1a` : undefined,
        color: ativo ? cor : '#94A3B8',
      }}
    >
      {label}
    </button>
  )
}
