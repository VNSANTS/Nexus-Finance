import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import NexusLogo from '@/components/NexusLogo'
import { PERFIS_CARTEIRA } from '@banco-de-dados/perfis-carteira/perfis'
import { SLIDES_ONBOARDING } from '@/assets/onboarding'
import type { UserProgress } from '@/types'

const PERGUNTAS_SUITABILITY = [
  {
    pergunta: 'Se seus investimentos caíssem 15% em um mês, o que você faria?',
    opcoes: [
      { texto: 'Venderia tudo para não perder mais', pontos: 0 },
      { texto: 'Ficaria preocupado, mas esperaria melhorar', pontos: 1 },
      { texto: 'Manteria a calma, é normal oscilar', pontos: 2 },
      { texto: 'Aproveitaria para comprar mais, mais barato', pontos: 3 },
    ],
  },
  {
    pergunta: 'Qual é o seu principal objetivo ao investir?',
    opcoes: [
      { texto: 'Não perder o que já tenho', pontos: 0 },
      { texto: 'Ter uma reserva segura com algum rendimento', pontos: 1 },
      { texto: 'Fazer meu patrimônio crescer ao longo do tempo', pontos: 2 },
      { texto: 'Buscar o máximo retorno possível', pontos: 3 },
    ],
  },
  {
    pergunta: 'Por quanto tempo você pretende deixar esse dinheiro investido?',
    opcoes: [
      { texto: 'Posso precisar dele a qualquer momento', pontos: 0 },
      { texto: 'Alguns meses a 1 ano', pontos: 1 },
      { texto: 'De 2 a 5 anos', pontos: 2 },
      { texto: 'Mais de 5 anos', pontos: 3 },
    ],
  },
  {
    pergunta: 'Qual dessas frases mais combina com você?',
    opcoes: [
      { texto: 'Prefiro ganhar pouco, mas com segurança total', pontos: 0 },
      { texto: 'Aceito um pouco de risco por um retorno melhor', pontos: 1 },
      { texto: 'Risco moderado não me assusta, penso no longo prazo', pontos: 2 },
      { texto: 'Estou disposto a arriscar bastante por retornos altos', pontos: 3 },
    ],
  },
  {
    pergunta: 'Você já investiu em ações ou fundos imobiliários antes?',
    opcoes: [
      { texto: 'Nunca, só poupança ou nada', pontos: 0 },
      { texto: 'Já tive, mas pouco contato', pontos: 1 },
      { texto: 'Sim, tenho alguma experiência', pontos: 2 },
      { texto: 'Sim, invisto regularmente há tempos', pontos: 3 },
    ],
  },
  {
    pergunta: 'Se pudesse escolher, qual cenário prefere?',
    opcoes: [
      { texto: 'Retorno pequeno mas garantido', pontos: 0 },
      { texto: 'Retorno moderado com baixo risco', pontos: 1 },
      { texto: 'Retorno bom, aceitando alguma variação', pontos: 2 },
      { texto: 'Retorno alto, mesmo com risco de perdas no caminho', pontos: 3 },
    ],
  },
]

function calcularPerfil(pontosTotal: number): NonNullable<UserProgress['riskProfile']> {
  if (pontosTotal <= 6) return 'conservador'
  if (pontosTotal <= 12) return 'moderado'
  return 'agressivo'
}

interface OnboardingProps {
  onFinalizar: (perfil: UserProgress['riskProfile']) => void
}

export default function Onboarding({ onFinalizar }: OnboardingProps) {
  const [etapa, setEtapa] = useState<'intro' | 'boas-vindas' | number | 'resultado'>('intro')
  const [slideAtual, setSlideAtual] = useState(0)
  const [respostas, setRespostas] = useState<number[]>([])

  function responder(pontos: number) {
    const novasRespostas = [...respostas, pontos]
    setRespostas(novasRespostas)
    if (novasRespostas.length < PERGUNTAS_SUITABILITY.length) {
      setEtapa(novasRespostas.length)
    } else {
      setEtapa('resultado')
    }
  }

  const pontosTotal = respostas.reduce((a, b) => a + b, 0)
  const perfilSugerido = calcularPerfil(pontosTotal)
  const perfilInfo = PERFIS_CARTEIRA[perfilSugerido]

  if (etapa === 'intro') {
    const slide = SLIDES_ONBOARDING[slideAtual]
    const ultimoSlide = slideAtual === SLIDES_ONBOARDING.length - 1

    return (
      <div className="px-6 py-8 flex flex-col items-center text-center min-h-[500px] justify-between">
        <button onClick={() => setEtapa('boas-vindas')} className="self-end text-slate-500 text-xs">
          Pular
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={slideAtual}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <img src={slide.imagem} alt="" className="w-[220px] h-[220px] mb-7" draggable={false} />
            <h1 className="text-xl font-display font-extrabold text-white mb-2.5">{slide.titulo}</h1>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-[280px]">{slide.descricao}</p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[260px]">
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {SLIDES_ONBOARDING.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === slideAtual ? 20 : 6,
                  background: i === slideAtual ? slide.cor : '#1C2740',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => (ultimoSlide ? setEtapa('boas-vindas') : setSlideAtual((s) => s + 1))}
            className="w-full h-[50px] rounded-2xl text-bg text-sm font-bold flex items-center justify-center gap-2"
            style={{ background: slide.cor }}
          >
            {ultimoSlide ? 'Continuar' : 'Próximo'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  if (etapa === 'boas-vindas') {
    return (
      <div className="px-6 py-10 flex flex-col items-center text-center min-h-[500px] justify-center">
        <NexusLogo size={52} />
        <h1 className="text-xl font-display font-extrabold text-white mt-7 mb-2.5">Vamos te conhecer melhor</h1>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-8 max-w-[280px]">
          6 perguntas rápidas para sugerir a trilha e o perfil de investidor que mais combinam com você.
        </p>
        <button
          onClick={() => setEtapa(0)}
          className="w-full max-w-[260px] h-[50px] rounded-2xl bg-accent-cyan text-bg text-sm font-bold flex items-center justify-center gap-2"
        >
          Começar <ArrowRight size={16} />
        </button>
        <button onClick={() => onFinalizar(null)} className="mt-3.5 text-slate-500 text-xs">
          Pular por agora
        </button>
      </div>
    )
  }

  if (etapa === 'resultado') {
    return (
      <div className="px-6 py-10 flex flex-col items-center text-center min-h-[500px] justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${perfilInfo.cor}26` }}>
            <Sparkles size={32} style={{ color: perfilInfo.cor }} />
          </div>
        </motion.div>
        <p className="text-xs text-slate-500 mb-1.5">Seu perfil sugerido é</p>
        <h1 className="text-2xl font-display font-extrabold mb-3.5" style={{ color: perfilInfo.cor }}>
          {perfilInfo.nome}
        </h1>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-8 max-w-[280px]">{perfilInfo.descricao}</p>
        <button
          onClick={() => onFinalizar(perfilSugerido)}
          className="w-full max-w-[260px] h-[50px] rounded-2xl text-bg text-sm font-bold"
          style={{ background: perfilInfo.cor }}
        >
          Começar a usar o Nexus Finance
        </button>
      </div>
    )
  }

  const indice = etapa as number
  const perguntaAtual = PERGUNTAS_SUITABILITY[indice]

  return (
    <div className="px-5 py-6 min-h-[500px] flex flex-col">
      <div className="flex gap-1 mb-6">
        {PERGUNTAS_SUITABILITY.map((_, i) => (
          <span key={i} className={`flex-1 h-1 rounded-full ${i <= indice ? 'bg-accent-cyan' : 'bg-border'}`} />
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mb-2">
        Pergunta {indice + 1} de {PERGUNTAS_SUITABILITY.length}
      </p>
      <h2 className="text-[17px] font-display font-bold text-white leading-snug mb-6">{perguntaAtual.pergunta}</h2>
      <div className="flex flex-col gap-2.5">
        {perguntaAtual.opcoes.map((op, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => responder(op.pontos)}
            className="p-4 rounded-2xl card-surface text-slate-200 text-[13px] font-medium text-left"
          >
            {op.texto}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
