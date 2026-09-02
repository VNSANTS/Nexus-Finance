import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Zap, TrendingDown, ChevronRight } from 'lucide-react'
import { XP_DESAFIO_ACERTO, XP_DESAFIO_ERRO } from '@/types'
import type { PerguntaDesafio } from '@/types'

interface QuizDesafioProps {
  perguntas: PerguntaDesafio[]
  onGanharXp: (xp: number) => void
  onPerderXp: (xp: number) => void
  onAcertar: () => void
  onErrar: (pergunta: PerguntaDesafio) => void
  onFinalizar: (xpLiquido: number, acertos: number) => void
}

// Diferente do QuizInline (usado nos módulos): aqui NÃO existe segunda
// tentativa. Errou, o XP já foi descontado, a resposta certa nem aparece —
// só a confirmação de que errou — e some para a próxima pergunta. É de
// propósito: perguntas difíceis, risco real, e quem erra estuda depois na
// tela de Revisão, não ali na hora.
export default function QuizDesafio({ perguntas, onGanharXp, onPerderXp, onAcertar, onErrar, onFinalizar }: QuizDesafioProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [xpLiquido, setXpLiquido] = useState(0)
  const [acertouAgora, setAcertouAgora] = useState(false)

  const p = perguntas[current]

  function responder(idx: number) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)

    if (idx === p.correta) {
      setAcertos((a) => a + 1)
      setXpLiquido((x) => x + XP_DESAFIO_ACERTO)
      setAcertouAgora(true)
      onGanharXp(XP_DESAFIO_ACERTO)
      onAcertar()
    } else {
      setXpLiquido((x) => x + XP_DESAFIO_ERRO)
      setAcertouAgora(false)
      onPerderXp(Math.abs(XP_DESAFIO_ERRO))
      onErrar(p)
    }
  }

  function proxima() {
    if (current < perguntas.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      onFinalizar(xpLiquido, acertos)
    }
  }

  return (
    <div>
      {perguntas.length > 1 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {perguntas.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-colors"
                style={{
                  width: 16,
                  background: i < current ? '#00D4FF' : i === current ? '#FFC93C' : '#1C2740',
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold shrink-0 ml-3">
            {current + 1}/{perguntas.length}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={p.numero}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="card-surface rounded-2xl p-4"
        >
          <div className="flex items-center gap-1 mb-3 text-[10.5px] font-semibold text-slate-500">
            <Zap size={11} className="text-accent-gold" />
            <span>
              Acertar: +{XP_DESAFIO_ACERTO} XP · Errar: {XP_DESAFIO_ERRO} XP · sem segunda chance
            </span>
          </div>
          <p className="text-[15px] font-semibold text-white leading-snug mb-4">{p.pergunta}</p>

          <div className="flex flex-col gap-2.5">
            {p.alternativas.map((alt, idx) => {
              const isSelected = idx === selected
              // Sem segunda tentativa: quando erra, NÃO revelamos qual era a
              // correta — só marcamos a escolhida como errada. A resposta
              // certa fica só na explicação, depois, na tela de Revisão.
              let style = 'card-surface text-slate-200'
              if (answered && isSelected && acertouAgora) style = 'bg-accent-green/10 border-accent-green text-accent-green'
              else if (answered && isSelected && !acertouAgora) style = 'bg-accent-red/10 border-accent-red text-accent-red'

              return (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  disabled={answered}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-[13px] font-medium text-left transition-colors ${style}`}
                >
                  <span className="flex-1">{alt}</span>
                  {answered && isSelected && acertouAgora && <CheckCircle2 size={18} className="text-accent-green shrink-0 ml-2" />}
                  {answered && isSelected && !acertouAgora && <XCircle size={18} className="text-accent-red shrink-0 ml-2" />}
                </button>
              )
            })}
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3.5 flex flex-col gap-2.5">
              {acertouAgora ? (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-green/10 border border-accent-green/30">
                  <Zap size={13} className="text-accent-green" />
                  <span className="text-[11.5px] text-accent-green font-semibold">+{XP_DESAFIO_ACERTO} XP</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-red/10 border border-accent-red/30">
                  <TrendingDown size={13} className="text-accent-red" />
                  <span className="text-[11.5px] text-accent-red font-semibold">
                    {XP_DESAFIO_ERRO} XP — foi para sua lista de Revisão
                  </span>
                </div>
              )}

              {acertouAgora && (
                <div className="p-3.5 rounded-2xl bg-bg-card border border-border">
                  <p className="text-[12.5px] text-slate-400 leading-relaxed">{p.explicacao}</p>
                </div>
              )}

              <button
                onClick={proxima}
                className="w-full h-11 rounded-2xl bg-accent-cyan text-bg text-sm font-bold flex items-center justify-center gap-1.5"
              >
                {current < perguntas.length - 1 ? 'Próxima pergunta' : 'Concluir'}
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
