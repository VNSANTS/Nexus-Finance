import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, PartyPopper, Zap, TrendingDown } from 'lucide-react'
import type { QuizQuestion } from '@/types'
import { XP_POR_DIFICULDADE } from '@/types'

interface QuizInlineProps {
  questions: QuizQuestion[]
  onComplete: (score: number, xpLiquido: number) => void
  onErrar?: (pergunta: QuizQuestion, indice: number) => void
  // Aplicados pergunta a pergunta, na hora — não só no final — para que sair do
  // quiz no meio não perca nem esconda o XP já ganho/perdido até ali.
  onGanharXp: (xp: number) => void
  onPerderXp: (xp: number) => void
  onAcertar?: () => void // sequência de acertos, para a conquista "10 acertos seguidos"
}

function xpDaPergunta(q: QuizQuestion): number {
  return XP_POR_DIFICULDADE[q.dificuldade ?? 'medio']
}

export default function QuizInline({ questions, onComplete, onErrar, onGanharXp, onPerderXp, onAcertar }: QuizInlineProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [erros, setErros] = useState(0)
  const [bonusGanho, setBonusGanho] = useState(0)
  const [xpLiquido, setXpLiquido] = useState(0) // soma real: +xp por acerto, -xp por erro, por dificuldade
  const [tentativasPorPergunta, setTentativasPorPergunta] = useState<Record<number, number>>({})
  const [ganhouBonusAgora, setGanhouBonusAgora] = useState(false)
  const [perdeuXpAgora, setPerdeuXpAgora] = useState(0)
  // Perguntas já erradas ficam "queimadas": ao tentar de novo, não revelamos qual é a certa,
  // só que a escolhida está errada — senão a segunda tentativa vira só clicar na única
  // alternativa que ainda não foi tentada e ficou marcada em verde.
  const [respostaRevelada, setRespostaRevelada] = useState(true)
  const [finished, setFinished] = useState(false)

  const q = questions[current]
  const tentativaAtual = (tentativasPorPergunta[current] || 0) + 1
  const isPrimeiraTentativa = tentativaAtual === 1
  const xpPergunta = xpDaPergunta(q)

  function selectAnswer(idx: number) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    setTentativasPorPergunta((prev) => ({ ...prev, [current]: tentativaAtual }))

    if (idx === q.correta) {
      setAcertos((a) => a + 1)
      setScore((s) => s + 1)
      setXpLiquido((x) => x + xpPergunta)
      setRespostaRevelada(true)
      onGanharXp(xpPergunta)
      if (isPrimeiraTentativa) {
        setBonusGanho((b) => b + 5)
        setGanhouBonusAgora(true)
      } else {
        setGanhouBonusAgora(false)
      }
      setPerdeuXpAgora(0)
      onAcertar?.()
    } else {
      setErros((e) => e + 1)
      setGanhouBonusAgora(false)
      setXpLiquido((x) => x - xpPergunta)
      setPerdeuXpAgora(xpPergunta)
      setRespostaRevelada(false) // erro: não mostra qual era a certa
      onPerderXp(xpPergunta)
      onErrar?.(q, current)
    }
  }

  function tentarNovamente() {
    setSelected(null)
    setAnswered(false)
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
      setGanhouBonusAgora(false)
      setPerdeuXpAgora(0)
      setRespostaRevelada(true)
    } else {
      setFinished(true)
      onComplete(score, xpLiquido)
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-10 gap-3"
      >
        <PartyPopper size={40} className="text-accent-gold" />
        <h3 className="text-lg font-display font-bold text-white">Quiz concluído!</h3>
        <p className="text-sm text-slate-400">
          Você acertou {score} de {questions.length} ({pct}%)
        </p>
        <div className="flex gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-accent-green" />
            <span className="text-xs text-accent-green font-semibold">{acertos} certas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle size={14} className="text-accent-red" />
            <span className="text-xs text-accent-red font-semibold">{erros} erradas</span>
          </div>
        </div>
        <div
          className={`mt-1 px-4 py-2 rounded-full border text-sm font-semibold ${
            xpLiquido >= 0
              ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
              : 'bg-accent-red/10 border-accent-red/30 text-accent-red'
          }`}
        >
          {xpLiquido >= 0 ? '+' : ''}
          {xpLiquido} XP {xpLiquido >= 0 ? 'conquistados' : '— os erros custaram mais que os acertos'}
        </div>
        {bonusGanho > 0 && (
          <div className="px-3.5 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-semibold">
            +{bonusGanho} XP bônus de primeira tentativa
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          Pergunta {current + 1} de {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <span key={i} className={`w-6 h-1 rounded-full ${i <= current ? 'bg-accent-cyan' : 'bg-border'}`} />
          ))}
        </div>
      </div>

      {/* Contador de acertos/erros ao vivo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <CheckCircle2 size={13} className="text-accent-green" />
          <span className="text-xs text-accent-green font-semibold">{acertos}</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle size={13} className="text-accent-red" />
          <span className="text-xs text-accent-red font-semibold">{erros}</span>
        </div>
        {!isPrimeiraTentativa && !answered && (
          <span className="text-[10.5px] text-slate-500 italic">Sem bônus nesta tentativa</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-semibold text-white leading-snug">{q.pergunta}</p>
          </div>
          <div className="flex items-center gap-1 mb-3 text-[10.5px] font-semibold text-slate-500">
            <Zap size={11} className="text-accent-gold" />
            <span>Vale {xpPergunta} XP{q.dificuldade ? ` · ${q.dificuldade}` : ''}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {q.alternativas.map((alt, idx) => {
              // Só revelamos qual é a correta quando a pergunta foi acertada (respostaRevelada).
              // Em caso de erro, mostramos apenas que a escolha do usuário estava errada —
              // a resposta certa continua escondida para a nova tentativa valer alguma coisa.
              const isCorrect = idx === q.correta
              const isSelected = idx === selected
              let style = 'card-surface text-slate-200'
              if (answered && respostaRevelada && isCorrect) style = 'bg-accent-green/10 border-accent-green text-accent-green'
              else if (answered && isSelected && !isCorrect) style = 'bg-accent-red/10 border-accent-red text-accent-red'

              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  disabled={answered}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-[13.5px] font-medium text-left transition-colors ${style}`}
                >
                  {alt}
                  {answered && respostaRevelada && isCorrect && <CheckCircle2 size={18} className="text-accent-green shrink-0 ml-2" />}
                  {answered && isSelected && !isCorrect && <XCircle size={18} className="text-accent-red shrink-0 ml-2" />}
                </button>
              )
            })}
          </div>

          {answered && perdeuXpAgora > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-red/10 border border-accent-red/30"
            >
              <TrendingDown size={13} className="text-accent-red" />
              <span className="text-[11.5px] text-accent-red font-semibold">-{perdeuXpAgora} XP — tente de novo, mas a resposta certa fica escondida agora</span>
            </motion.div>
          )}

          {answered && respostaRevelada && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3.5 rounded-2xl bg-bg-card border border-border"
            >
              <p className="text-[12.5px] text-slate-400 leading-relaxed">{q.explicacao}</p>
            </motion.div>
          )}

          {answered && selected === q.correta && ganhouBonusAgora && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gold/10 border border-accent-gold/30"
            >
              <Zap size={13} className="text-accent-gold" />
              <span className="text-[11.5px] text-accent-gold font-semibold">+5 XP bônus — acertou de primeira!</span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {answered && selected !== q.correta && (
        <button onClick={tentarNovamente} className="h-11 rounded-2xl border border-border text-slate-300 font-semibold text-sm">
          Tentar novamente
        </button>
      )}

      {answered && (
        <button onClick={next} className="h-12 rounded-2xl bg-accent-cyan text-bg font-bold text-sm mt-1">
          {current < questions.length - 1 ? 'Próxima pergunta' : 'Ver resultado'}
        </button>
      )}
    </div>
  )
}
