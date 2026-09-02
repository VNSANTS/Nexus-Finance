import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { LABEL_PERMISSAO, PAPEIS, PERMISSOES_PADRAO, quantosAdministradores } from '../permissoes'
import type { Membro, PapelMembro, PermissoesMembro } from '../types'

interface Props {
  membroEditando: Membro | null
  onSalvar: () => void
  onCancelar: () => void
}

const EMOJIS = ['👤', '🧑', '👩', '👨', '👧', '👦', '🧓', '👵', '👴', '🐶', '🐱', '⭐']
const CORES = ['#00D4FF', '#22C55E', '#FFC93C', '#EC4899', '#8B5CF6', '#EF4444', '#3B82F6', '#64748B']

// Formulário de membro da família — cria ou edita (quando `membroEditando`
// vem preenchido). O papel escolhido preenche as permissões com um padrão
// sensato; "Personalizar permissões" abre os switches individuais pra quem
// quiser ajustar fino, sem obrigar ninguém a mexer nisso.
export default function GfFormMembro({ membroEditando, onSalvar, onCancelar }: Props) {
  const { estado, adicionarMembro, editarMembro } = useGestaoFinanceira()
  const [nome, setNome] = useState(membroEditando?.nome ?? '')
  const [emoji, setEmoji] = useState(membroEditando?.emoji ?? EMOJIS[0])
  const [cor, setCor] = useState(membroEditando?.cor ?? CORES[0])
  const [papel, setPapel] = useState<PapelMembro>(membroEditando?.papel ?? 'adulto')
  const [permissoes, setPermissoes] = useState<PermissoesMembro>(membroEditando?.permissoes ?? PERMISSOES_PADRAO.adulto)
  const [personalizarAberto, setPersonalizarAberto] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const podeSalvar = nome.trim().length > 0

  function escolherPapel(novoPapel: PapelMembro) {
    setPapel(novoPapel)
    setPermissoes({ ...PERMISSOES_PADRAO[novoPapel] })
  }

  function alternarPermissao(chave: keyof PermissoesMembro) {
    setPermissoes((p) => ({ ...p, [chave]: !p[chave] }))
  }

  function salvar() {
    if (!podeSalvar) return

    // Sempre precisa sobrar pelo menos um administrador — se este é o
    // único hoje e a edição está tirando "gerenciar membros" dele, bloqueia.
    if (membroEditando?.principal || (membroEditando && quantosAdministradores(estado.membros) === 1 && membroEditando.permissoes.gerenciarMembros)) {
      if (!permissoes.gerenciarMembros) {
        setErro('Precisa sobrar pelo menos um administrador na família — ajuste as permissões de outro membro antes.')
        return
      }
    }

    const membro: Membro = {
      id: membroEditando?.id ?? `membro-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      emoji,
      cor,
      papel,
      permissoes,
      criadoEm: membroEditando?.criadoEm ?? new Date().toISOString(),
      principal: membroEditando?.principal ?? false,
    }
    if (membroEditando) {
      editarMembro(membro)
    } else {
      adicionarMembro(membro)
    }
    onSalvar()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {erro && (
        <div className="rounded-xl border border-accent-red/30 bg-accent-red/10 px-3 py-2">
          <p className="text-[11px] text-accent-red font-medium leading-relaxed">{erro}</p>
        </div>
      )}

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Nome</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Mãe, Pedro, Vovó..."
          className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white placeholder:text-slate-600 border border-border focus:outline-none focus:border-accent-cyan"
          autoFocus
        />
      </div>

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Avatar</label>
        <div className="flex flex-wrap gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-[16px] border ${
                emoji === e ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
              aria-label={`Avatar ${e}`}
            >
              {e}
            </button>
          ))}
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

      <div>
        <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Papel na família</label>
        <div className="flex flex-col gap-2">
          {PAPEIS.map((p) => (
            <button
              key={p.id}
              onClick={() => escolherPapel(p.id)}
              className={`text-left rounded-xl px-3.5 py-2.5 border ${
                papel === p.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
            >
              <p className={`text-[12.5px] font-semibold ${papel === p.id ? 'text-accent-cyan' : 'text-white'}`}>{p.label}</p>
              <p className="text-[10.5px] text-slate-500">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={() => setPersonalizarAberto((v) => !v)}
          className="w-full flex items-center justify-between text-[12px] font-semibold text-slate-400"
        >
          Personalizar permissões
          {personalizarAberto ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {personalizarAberto && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 card-surface rounded-2xl p-3.5 flex flex-col gap-3.5">
            {(Object.keys(LABEL_PERMISSAO) as (keyof PermissoesMembro)[]).map((chave) => (
              <button key={chave} onClick={() => alternarPermissao(chave)} className="w-full flex items-center justify-between gap-3">
                <span className="text-[12px] text-slate-300 text-left">{LABEL_PERMISSAO[chave]}</span>
                <span
                  className="relative w-11 h-6 rounded-full shrink-0 transition-colors"
                  style={{ background: permissoes[chave] ? 'var(--accent-primaria)' : '#1C2740' }}
                >
                  <motion.span className="absolute top-0.5 w-5 h-5 rounded-full bg-white" animate={{ left: permissoes[chave] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 32 }} />
                </span>
              </button>
            ))}
          </motion.div>
        )}
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
          {membroEditando ? 'Salvar alterações' : 'Adicionar membro'}
        </motion.button>
      </div>
    </div>
  )
}
