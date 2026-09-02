import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Flame, ChevronRight, RotateCw, Zap, Lock, Radar, Wallet2 } from 'lucide-react'
import ProgressRing from '@/components/ProgressRing'
import TrilhaCard from '@/components/TrilhaCard'
import NexusLogo from '@/components/NexusLogo'
import { useUserProgress } from '@/hooks/useUserProgress'
import { TRILHAS, MODULOS } from '@banco-de-dados/modulos'
import type { Frase } from '@/data/frasesMotivadoras'

// As 456 frases foram movidas pra @/data/frasesMotivadoras.ts e agora são
// carregadas sob demanda (import dinâmico logo abaixo), em vez de entrarem
// no bundle inicial da Home — só uma frase é mostrada por vez.

const MODULOS_PARA_DESAFIO = 3 // precisa de banco de perguntas suficiente para misturar; 94 módulos completos hoje, então isso libera rápido

function getSaudacao() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function HomePage() {
  const navigate = useNavigate()
  const { progress, levelInfo, isModuloCompleto } = useUserProgress()
  const modulosCompletos = Object.values(progress.abasConcluidas).filter((abas) => abas.length === 6).length
  const desafioDisponivel = modulosCompletos >= MODULOS_PARA_DESAFIO
  const jaFezDesafioHoje = progress.ultimoDesafioData === new Date().toISOString().slice(0, 10)

  const [frases, setFrases] = useState<Frase[] | null>(null)
  const [fraseIndex, setFraseIndex] = useState(0)

  useEffect(() => {
    let cancelado = false
    import('@/data/frasesMotivadoras').then(({ FRASES_MOTIVADORAS }) => {
      if (cancelado) return
      setFrases(FRASES_MOTIVADORAS)
      setFraseIndex(Math.floor(Math.random() * FRASES_MOTIVADORAS.length))
    })
    return () => {
      cancelado = true
    }
  }, [])

  const frase = frases?.[fraseIndex]

  function proximaFrase() {
    if (!frases) return
    setFraseIndex((atual) => {
      if (frases.length <= 1) return atual
      let proximo
      do {
        proximo = Math.floor(Math.random() * frases.length)
      } while (proximo === atual)
      return proximo
    })
  }

  return (
    <div className="px-4 pt-5 pb-28 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <NexusLogo size={34} />
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/busca')} className="w-8 h-8 rounded-full card-surface flex items-center justify-center">
            <Search size={15} className="text-slate-400" />
          </button>
          <div className="flex items-center gap-1.5 card-surface rounded-full px-3 py-1.5">
            <Flame size={15} className="text-accent-gold" fill="#FFC93C" />
            <span className="text-[13px] font-bold text-white">{progress.streak}</span>
          </div>
        </div>
      </div>

      {/* Saudação + frase motivadora clicável */}
      <div>
        <p className="text-lg font-display font-extrabold text-white">
          {getSaudacao()}, {progress.perfilPessoal.nome} 👋
        </p>
        <button onClick={proximaFrase} className="text-left mt-1.5 w-full" disabled={!frase}>
          <AnimatePresence mode="wait">
            {frase && (
              <motion.div key={fraseIndex} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
                <p className="text-xs text-slate-400 italic leading-relaxed">"{frase.texto}"</p>
                <p className="text-[10.5px] text-accent-gold font-semibold mt-0.5">— {frase.fonte}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Card de revisão */}
      {progress.itensRevisao.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/revisao')}
          className="flex items-center gap-3 p-3.5 rounded-[18px] w-full text-left"
          style={{ background: 'linear-gradient(135deg, #EC48991A, #8B5CF61A)', border: '1px solid #EC489944' }}
        >
          <div className="w-10 h-10 rounded-xl bg-accent-pink/20 flex items-center justify-center shrink-0">
            <RotateCw size={19} className="text-accent-pink" />
          </div>
          <div className="flex-1">
            <p className="text-[13.5px] font-bold text-white">Revisar agora</p>
            <p className="text-[11.5px] text-slate-400 mt-0.5">
              {progress.itensRevisao.length} {progress.itensRevisao.length === 1 ? 'item pendente' : 'itens pendentes'} de reforço
            </p>
          </div>
          <ChevronRight size={17} className="text-accent-pink" />
        </motion.button>
      )}

      {/* XP Card */}
      <div className="card-surface rounded-[20px] p-4.5 flex items-center gap-4">
        <ProgressRing progress={levelInfo.progressToNext} size={92} strokeWidth={9}>
          <span className="text-[19px] font-display font-extrabold text-white leading-none">{levelInfo.level}</span>
          <span className="text-[8.5px] text-slate-500 mt-0.5">nível</span>
        </ProgressRing>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-accent-cyan">{levelInfo.levelName}</p>
          <p className="text-xs font-bold text-white mt-0.5">{progress.xp} XP</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {levelInfo.nextLevelName ? `faltam ${100 - levelInfo.progressToNext}% para ${levelInfo.nextLevelName}` : 'nível máximo alcançado'}
          </p>
        </div>
      </div>

      {/* Desafio diário */}
      {desafioDisponivel ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/desafio-diario')}
          className="flex items-center gap-3.5 p-4 rounded-[18px] w-full text-left"
          style={{ background: 'linear-gradient(135deg, #00D4FF14, #8B5CF614)', border: '1px solid #00D4FF33' }}
        >
          <div className="w-[42px] h-[42px] rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0">
            <Zap size={20} className="text-accent-gold" fill="#FFC93C" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[14px] font-bold text-white">Desafio diário</p>
              <span className="text-[9px] font-bold text-accent-gold bg-accent-gold/20 px-1.5 py-0.5 rounded-full">1 PERGUNTA</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {jaFezDesafioHoje ? 'Concluído hoje — volte amanhã' : 'Uma pergunta difícil · +100 XP se acertar · expira à meia-noite'}
            </p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </motion.button>
      ) : (
        <div className="flex items-center gap-3.5 p-4 rounded-[18px] card-surface" style={{ borderStyle: 'dashed' }}>
          <div className="w-[42px] h-[42px] rounded-xl bg-border flex items-center justify-center shrink-0">
            <Lock size={18} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-slate-400">Desafio diário bloqueado</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Conclua mais {Math.max(0, MODULOS_PARA_DESAFIO - modulosCompletos)} módulo(s) para desbloquear
            </p>
          </div>
        </div>
      )}

      {/* Área do Investidor */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/investidor')}
        className="flex items-center gap-3 w-full p-3.5 rounded-[18px] text-left"
        style={{ background: 'linear-gradient(135deg, #8B5CF614, #3B82F614)', border: '1px solid #8B5CF644' }}
      >
        <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center shrink-0">
          <Radar size={19} className="text-accent-purple" />
        </div>
        <div className="flex-1">
          <p className="text-[13.5px] font-bold text-white">Área do Investidor</p>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Teses, carteiras recomendadas e relatórios</p>
        </div>
        <ChevronRight size={17} className="text-accent-purple" />
      </motion.button>

      {/* Gestão Financeira — acompanhamento de gastos pessoais (em construção) */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/gestao-financeira')}
        className="flex items-center gap-3 w-full p-3.5 rounded-[18px] text-left"
        style={{ background: 'linear-gradient(135deg, #22C55E14, #00D4FF14)', border: '1px solid #22C55E44' }}
      >
        <div className="w-10 h-10 rounded-xl bg-accent-green/20 flex items-center justify-center shrink-0">
          <Wallet2 size={19} className="text-accent-green" />
        </div>
        <div className="flex-1">
          <p className="text-[13.5px] font-bold text-white">Gestão Financeira</p>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Acompanhe seus gastos e receba dicas com base no que você já aprendeu</p>
        </div>
        <ChevronRight size={17} className="text-accent-green" />
      </motion.button>

      {/* Trilhas */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-display font-extrabold text-white">Suas trilhas</h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {TRILHAS.map((trilha) => {
            const modulosDaTrilha = MODULOS.filter((m) => m.trilhaId === trilha.id)
            const concluidos = modulosDaTrilha.filter((m) => isModuloCompleto(m.id)).length
            // "Onde parou": primeiro módulo não concluído da trilha, se algum já foi concluído
            // (senão não faz sentido oferecer "continuar" — a pessoa ainda nem começou).
            const primeiroNaoConcluido = modulosDaTrilha.find((m) => !isModuloCompleto(m.id))
            const jaComecou = concluidos > 0 && concluidos < modulosDaTrilha.length
            return (
              <TrilhaCard
                key={trilha.id}
                trilha={trilha}
                totalModulos={modulosDaTrilha.length}
                concluidos={concluidos}
                onClick={() => navigate(`/aprender?trilha=${trilha.id}`)}
                onContinuar={
                  jaComecou && primeiroNaoConcluido ? () => navigate(`/modulo/${primeiroNaoConcluido.id}`) : undefined
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
