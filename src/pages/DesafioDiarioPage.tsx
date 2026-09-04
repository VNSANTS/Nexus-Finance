import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, PartyPopper, Lock, Zap } from 'lucide-react'
import QuizDesafio from '@/components/QuizDesafio'
import { useUserProgress } from '@/hooks/useUserProgress'
import { BANCO_PERGUNTAS_DESAFIO } from '@banco-de-dados/desafio-diario/perguntas'
import type { PerguntaDesafio } from '@/types'

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export default function DesafioDiarioPage() {
  const navigate = useNavigate()
  const { progress, ganharXp, perderXp, registrarAcertoQuiz, registrarDesafioCompleto, marcarDesafioErrado, sortearPerguntasDesafio } =
    useUserProgress()

  const jaFeitoHoje = progress.ultimoDesafioData === hojeISO()

  // Desafio DIÁRIO: 1 pergunta por dia, sorteada individualmente por usuário
  // (ver sortearPerguntasDesafio em useUserProgress) sem repetir nenhuma até
  // o banco inteiro se esgotar para essa pessoa.
  const [perguntas] = useState<PerguntaDesafio[]>(() => sortearPerguntasDesafio(BANCO_PERGUNTAS_DESAFIO, 1))
  const [concluido, setConcluido] = useState(false)
  const [resultado, setResultado] = useState({ xp: 0, acertos: 0 })

  function handleFinalizar(xpLiquido: number, acertos: number) {
    const numerosUsados = perguntas.map((p) => p.numero)
    registrarDesafioCompleto(numerosUsados, BANCO_PERGUNTAS_DESAFIO.length)
    setResultado({ xp: xpLiquido, acertos })
    setConcluido(true)
  }

  function handleErrar(pergunta: PerguntaDesafio) {
    marcarDesafioErrado(String(pergunta.numero), {
      pergunta: pergunta.pergunta,
      alternativas: pergunta.alternativas,
      correta: pergunta.correta,
      explicacao: pergunta.explicacao,
    })
  }

  if (jaFeitoHoje) {
    return (
      <div className="px-4 pt-5 pb-28">
        <VoltarBtn onBack={() => navigate('/')} />
        <div className="flex flex-col items-center text-center gap-3 mt-16">
          <div className="w-16 h-16 rounded-full bg-accent-gold/15 flex items-center justify-center">
            <Lock size={26} className="text-accent-gold" />
          </div>
          <h1 className="text-lg font-display font-extrabold text-white">Desafio de hoje já concluído</h1>
          <p className="text-sm text-slate-400 max-w-[280px]">
            Volte amanhã para um novo desafio. Sua sequência de estudos continua contando normalmente.
          </p>
        </div>
      </div>
    )
  }

  if (concluido) {
    return (
      <div className="px-4 pt-5 pb-28">
        <VoltarBtn onBack={() => navigate('/')} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center gap-3 mt-14"
        >
          <div className="w-16 h-16 rounded-full bg-accent-cyan/15 flex items-center justify-center">
            <PartyPopper size={26} className="text-accent-cyan" />
          </div>
          <h1 className="text-lg font-display font-extrabold text-white">Desafio concluído!</h1>
          <p className="text-sm text-slate-400">{resultado.acertos > 0 ? 'Você acertou!' : 'Você errou desta vez'}</p>
          <div
            className={`px-4 py-2 rounded-full border text-sm font-semibold ${
              resultado.xp >= 0
                ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                : 'bg-accent-red/10 border-accent-red/30 text-accent-red'
            }`}
          >
            {resultado.xp >= 0 ? '+' : ''}
            {resultado.xp} XP no total
          </div>
          <p className="text-xs text-slate-500 max-w-[260px] mt-1">
            Errou alguma? Já está na sua lista de Revisão. Volte amanhã para o próximo desafio.
          </p>
          <div className="flex gap-2.5 mt-3">
            <button
              onClick={() => navigate('/revisao')}
              className="px-4 py-2.5 rounded-full card-surface text-slate-300 text-sm font-bold"
            >
              Ver revisão
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-full bg-accent-cyan text-bg text-sm font-bold"
            >
              Início
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (perguntas.length === 0) {
    return (
      <div className="px-4 pt-5 pb-28">
        <VoltarBtn onBack={() => navigate('/')} />
        <div className="flex flex-col items-center text-center gap-2 mt-16">
          <Zap size={24} className="text-slate-600" />
          <p className="text-sm text-slate-400 max-w-[260px]">Nenhuma pergunta de desafio disponível ainda. Volte em breve.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5 pb-28">
      <VoltarBtn onBack={() => navigate('/')} />
      <div className="flex items-center gap-1.5 mb-1">
        <h1 className="text-xl font-display font-extrabold text-white">Desafio diário</h1>
        <span className="text-[9px] font-bold text-accent-gold bg-accent-gold/20 px-1.5 py-0.5 rounded-full">1 PERGUNTA</span>
      </div>
      <p className="text-xs text-slate-500 mb-5">Sua pergunta de hoje. Difícil, sem segunda chance — vale a pena ler com calma.</p>

      <QuizDesafio
        perguntas={perguntas}
        onGanharXp={ganharXp}
        onPerderXp={perderXp}
        onAcertar={registrarAcertoQuiz}
        onErrar={handleErrar}
        onFinalizar={handleFinalizar}
      />
    </div>
  )
}

function VoltarBtn({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
      <ChevronLeft size={16} /> Início
    </button>
  )
}
