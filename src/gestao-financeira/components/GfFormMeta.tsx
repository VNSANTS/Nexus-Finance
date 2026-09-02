import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ImagePlus, X as XIcon, Loader2, Lock } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { iconePorNome } from '../iconMap'
import { comprimirImagem } from '../comprimirImagem'
import type { Meta } from '../types'

interface Props {
  metaEditando: Meta | null
  onSalvar: () => void
  onCancelar: () => void
}

const ICONES = ['PiggyBank', 'Home', 'Car', 'Plane', 'GraduationCap', 'HeartPulse', 'Gift', 'Smartphone', 'Sparkles']
const CORES = ['#8B5CF6', '#00D4FF', '#22C55E', '#FFC93C', '#EC4899', '#EF4444', '#3B82F6', '#64748B']
const PRIORIDADES: { id: Meta['prioridade']; label: string }[] = [
  { id: 'alta', label: 'Alta' },
  { id: 'media', label: 'Média' },
  { id: 'baixa', label: 'Baixa' },
]

function formatarEntradaValor(texto: string) {
  const somenteDigitos = texto.replace(/\D/g, '')
  if (!somenteDigitos) return ''
  const numero = parseInt(somenteDigitos, 10) / 100
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function paraNumero(texto: string): number {
  const limpo = texto.replace(/\./g, '').replace(',', '.')
  const n = parseFloat(limpo)
  return isNaN(n) ? 0 : n
}

// Formulário de meta — cria ou edita (quando `metaEditando` vem
// preenchido). Nome e valor objetivo são obrigatórios; prazo é opcional
// (a meta funciona sem data-limite, só sem o "faltam X dias").
export default function GfFormMeta({ metaEditando, onSalvar, onCancelar }: Props) {
  const { estado, adicionarMeta, editarMeta } = useGestaoFinanceira()
  const fotoPermitida = estado.preferenciasPrivacidade.permitirFotoMetas
  const [nome, setNome] = useState(metaEditando?.nome ?? '')
  const [objetivoTexto, setObjetivoTexto] = useState(
    metaEditando ? metaEditando.valorObjetivo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [atualTexto, setAtualTexto] = useState(
    metaEditando ? metaEditando.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  )
  const [prazo, setPrazo] = useState(metaEditando?.prazo ?? '')
  const [icone, setIcone] = useState(metaEditando?.icone ?? ICONES[0])
  const [cor, setCor] = useState(metaEditando?.cor ?? CORES[0])
  const [prioridade, setPrioridade] = useState<Meta['prioridade']>(metaEditando?.prioridade ?? 'media')
  const [fotoUrl, setFotoUrl] = useState<string | null>(metaEditando?.fotoUrl ?? null)
  const [comprimindo, setComprimindo] = useState(false)
  const [erroFoto, setErroFoto] = useState<string | null>(null)

  async function aoEscolherFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    e.target.value = '' // permite escolher o mesmo arquivo de novo depois
    if (!arquivo) return
    if (!arquivo.type.startsWith('image/')) {
      setErroFoto('Escolhe um arquivo de imagem.')
      return
    }
    setErroFoto(null)
    setComprimindo(true)
    try {
      const dataUrl = await comprimirImagem(arquivo)
      setFotoUrl(dataUrl)
    } catch {
      setErroFoto('Não deu pra processar essa imagem. Tenta outra.')
    } finally {
      setComprimindo(false)
    }
  }

  const podeSalvar = nome.trim().length > 0 && paraNumero(objetivoTexto) > 0 && !comprimindo

  function salvar() {
    if (!podeSalvar) return
    const meta: Meta = {
      id: metaEditando?.id ?? `meta-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      valorObjetivo: paraNumero(objetivoTexto),
      valorAtual: paraNumero(atualTexto),
      prazo: prazo || null,
      icone,
      cor,
      prioridade,
      fotoUrl,
      pausada: metaEditando?.pausada ?? false,
      arquivada: metaEditando?.arquivada ?? false,
      criadaEm: metaEditando?.criadaEm ?? new Date().toISOString(),
    }
    if (metaEditando) {
      editarMeta(meta)
    } else {
      adicionarMeta(meta)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Foto (opcional)</label>
        {fotoUrl ? (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-border">
            <img src={fotoUrl} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => setFotoUrl(null)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[var(--cor-overlay)] flex items-center justify-center text-white"
              aria-label="Remover foto"
            >
              <XIcon size={14} />
            </button>
          </div>
        ) : fotoPermitida ? (
          <label className="w-full h-24 rounded-2xl card-surface border border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-slate-500 cursor-pointer">
            {comprimindo ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <ImagePlus size={18} />
                <span className="text-[11.5px]">Escolher uma foto</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={aoEscolherFoto} className="hidden" disabled={comprimindo} />
          </label>
        ) : (
          <div className="w-full h-24 rounded-2xl card-surface border border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-slate-600">
            <Lock size={16} />
            <span className="text-[11px] text-center px-4">Fotos desativadas em Privacidade → Permissões</span>
          </div>
        )}
        {erroFoto && <p className="text-[10.5px] text-accent-red mt-1.5">{erroFoto}</p>}
        <p className="text-[10px] text-slate-600 mt-1.5">Sem foto, a meta usa o ícone escolhido abaixo.</p>
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Nome da meta</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Viagem, Reserva de emergência..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Valor objetivo</label>
          <div className="flex items-center gap-1.5 card-surface rounded-2xl px-3.5 py-3 border border-border focus-within:border-accent-cyan">
            <span className="text-[13px] text-slate-500 font-semibold">R$</span>
            <input
              inputMode="numeric"
              placeholder="0,00"
              value={objetivoTexto}
              onChange={(e) => setObjetivoTexto(formatarEntradaValor(e.target.value))}
              className="flex-1 min-w-0 bg-transparent text-[14px] font-bold text-white placeholder:text-slate-700 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Já economizado</label>
          <div className="flex items-center gap-1.5 card-surface rounded-2xl px-3.5 py-3 border border-border focus-within:border-accent-cyan">
            <span className="text-[13px] text-slate-500 font-semibold">R$</span>
            <input
              inputMode="numeric"
              placeholder="0,00"
              value={atualTexto}
              onChange={(e) => setAtualTexto(formatarEntradaValor(e.target.value))}
              className="flex-1 min-w-0 bg-transparent text-[14px] font-bold text-white placeholder:text-slate-700 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Prazo (opcional)</label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white border border-border focus:outline-none focus:border-accent-cyan"
        />
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Prioridade</label>
        <div className="flex gap-2">
          {PRIORIDADES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPrioridade(p.id)}
              className={`flex-1 rounded-xl py-2 text-[12px] font-semibold border ${
                prioridade === p.id ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Ícone</label>
        <div className="flex flex-wrap gap-2">
          {ICONES.map((nomeIcone) => {
            const Icone = iconePorNome(nomeIcone)
            return (
              <button
                key={nomeIcone}
                onClick={() => setIcone(nomeIcone)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  icone === nomeIcone ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                }`}
              >
                <Icone size={17} style={{ color: icone === nomeIcone ? '#00D4FF' : '#94A3B8' }} />
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
          {metaEditando ? 'Salvar alterações' : 'Criar meta'}
        </motion.button>
      </div>
    </div>
  )
}
