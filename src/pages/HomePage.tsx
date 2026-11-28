import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Flame, ChevronRight, RotateCw, Zap, Lock, Radar, Wallet2, Sparkles, BookOpen, Calculator, Palette, MessageSquare, Share2, LockKeyhole } from 'lucide-react'
import ProgressRing from '@/components/ProgressRing'
import TrilhaCard from '@/components/TrilhaCard'
import NexusLogo from '@/components/NexusLogo'
import { useUserProgress } from '@/hooks/useUserProgress'
import { TRILHAS, MODULOS } from '@banco-de-dados/modulos'
import type { Frase } from '@/data/frasesMotivadoras'
import { gerarInsightDiarioHome } from '@/lib/insightDiarioIA'
import { useAuth } from '@/auth/AuthContext'

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
  const { ehConvidado } = useAuth()
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

  const [insightIA, setInsightIA] = useState<string | null>(null)
  useEffect(() => {
    if (ehConvidado) return
    gerarInsightDiarioHome({
      nome: progress.perfilPessoal.nome,
      nivel: levelInfo.level,
      nivelNome: levelInfo.levelName,
      xp: progress.xp,
      streak: progress.streak,
      modulosCompletos,
      totalModulos: MODULOS.length,
      itensRevisaoPendentes: progress.itensRevisao.length,
    }).then(setInsightIA) // se falhar (offline/Gemini fora do ar), fica null e o card some — não trava a Home
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ehConvidado])

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

  if (ehConvidado) {
    const abertos = [
      { titulo: 'Primeiro fundamento', texto: 'Prévia: Educação Financeira', rota: '/modulo/educacao-financeira', Icon: BookOpen },
      { titulo: 'Glossário', texto: 'Consulte conceitos financeiros', rota: '/glossario', Icon: BookOpen },
      { titulo: 'Calculadora básica', texto: 'Faça contas sem salvar histórico', rota: '/ferramentas', Icon: Calculator },
      { titulo: 'Gestão Financeira', texto: 'Painel, gráficos e histórico em modo de leitura', rota: '/gestao-financeira', Icon: Wallet2 },
      { titulo: 'Personalização', texto: 'Ajuste aparência e acessibilidade', rota: '/personalizacao', Icon: Palette },
      { titulo: 'Acessibilidade', texto: 'Ajuste fonte, contraste e interação', rota: '/gestao-financeira/acessibilidade', Icon: Palette },
      { titulo: 'Feedback beta', texto: 'Envie uma sugestão ou reporte um problema', rota: '/feedback-beta', Icon: MessageSquare },
    ]
    const bloqueados = [
      ['Aprendizado completo', '/aprender'], ['Busca', '/busca'], ['Biblioteca', '/biblioteca'],
      ['Mercado', '/mercado'], ['Carteira', '/carteira'], ['Questionários e desafios', '/desafio-diario'],
      ['Nexus AI', '/nexus-ai'], ['Perfil e progresso', '/perfil'],
    ]
    return (
      <div className="px-4 pt-5 pb-28 flex flex-col gap-4">
        <div className="flex items-center justify-between"><NexusLogo size={34} /><span className="rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-3 py-1 text-xs font-semibold text-[#00D4FF]">Modo convidado</span></div>
        <div><h1 className="text-lg font-display font-extrabold text-white">Bem-vindo ao Nexus Finance</h1><p className="mt-1 text-xs text-slate-400">Explore uma prévia e conheça as ferramentas disponíveis.</p></div>
        <div className="grid grid-cols-2 gap-2.5">
          {abertos.map(({ titulo, texto, rota, Icon }) => <button key={rota} onClick={() => navigate(rota)} className="card-surface rounded-2xl border border-[#00D4FF]/15 p-3 text-left"><Icon size={18} className="text-[#00D4FF]"/><p className="mt-2 text-[12px] font-bold text-white">{titulo}</p><p className="mt-1 text-[10px] leading-snug text-slate-400">{texto}</p></button>)}
        </div>
        <section className="rounded-2xl border border-border bg-white/[0.03] p-3">
          <h2 className="mb-2 text-xs font-bold text-slate-300">Prévia do primeiro fundamento de cada módulo</h2>
          <div className="grid grid-cols-2 gap-2">{MODULOS.map((modulo) => <button key={modulo.id} onClick={() => navigate(`/modulo/${modulo.id}`)} className="flex min-h-10 items-center gap-2 rounded-xl border border-white/5 px-2 text-left text-[10px] text-slate-300"><BookOpen size={13} className="shrink-0 text-[#00D4FF]"/>{modulo.titulo}</button>)}</div>
        </section>
        <button onClick={async () => { const url = 'https://nexus-finance-vn.lovable.app'; try { if (navigator.share) await navigator.share({ title: 'Nexus Finance', url }); else await navigator.clipboard?.writeText(url) } catch { /* compartilhamento cancelado pelo usuário */ } }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-slate-200"><Share2 size={16}/> Compartilhar Nexus Finance</button>
        <section className="rounded-2xl border border-border bg-white/[0.03] p-3"><h2 className="mb-2 text-xs font-bold text-slate-300">Outros recursos</h2><div className="grid grid-cols-2 gap-2">{bloqueados.map(([titulo, rota]) => <button key={rota} onClick={() => navigate(rota)} className="flex min-h-10 items-center gap-2 rounded-xl border border-white/5 px-2 text-left text-[10px] text-slate-400"><LockKeyhole size={13} className="shrink-0 text-[#00D4FF]"/>{titulo}</button>)}</div></section>
        <div className="flex justify-center gap-4 text-xs text-slate-400"><a href={`${import.meta.env.BASE_URL}termos-de-uso.html`} target="_blank" rel="noreferrer">Termos de uso</a><a href={`${import.meta.env.BASE_URL}privacy-policy.html`} target="_blank" rel="noreferrer">Política de privacidade</a></div>
      </div>
    )
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
      <div className="card-surface card-highlight rounded-[20px] p-4.5 flex items-center gap-4">
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

      {/* Insight do Nexus AI — 1x por dia, baseado no progresso real */}
      {insightIA && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 p-3.5 rounded-[18px]"
          style={{ background: 'linear-gradient(135deg, #8B5CF61A, #00D4FF1A)', border: '1px solid #8B5CF64D' }}
        >
          <Sparkles size={15} className="text-accent-purple shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-slate-200 leading-snug">{insightIA}</p>
        </motion.div>
      )}

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
