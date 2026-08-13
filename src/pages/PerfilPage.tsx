import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Bell, Calendar, CheckCircle2, ChevronRight, Download, Edit3, Flame, GraduationCap, Lock, LogOut, Share2, Smile, Star } from 'lucide-react'
import { getIcon } from '@/components/Icon'
import ProgressRing from '@/components/ProgressRing'
import { useUserProgress } from '@/hooks/useUserProgress'
import { BADGES } from '@/data/badges'
import { TRILHAS, MODULOS } from '@banco-de-dados/modulos'
import { ARTES_BADGE } from '@/assets/badges'
import type { BadgeStats } from '@/types'

const AVATAR_EMOJIS = ['🐂', '🦁', '🦊', '🐺', '🦉', '🐢', '🐙', '🦅']
const AVATAR_CORES = ['#00D4FF', '#FFC93C', '#22C55E', '#EC4899', '#8B5CF6', '#3B82F6']

export default function PerfilPage() {
  const navigate = useNavigate()
  const { progress, levelInfo, setPerfilPessoal, resetProgress } = useUserProgress()

  const modulosCompletos = Object.values(progress.abasConcluidas).filter((abas) => abas.length === 6).length

  // Uma trilha está completa quando todos os módulos que pertencem a ela
  // (via trilhaId) têm as 6 abas concluídas. Antes esse número vinha fixo em 0.
  const trilhasCompletas = TRILHAS.filter((trilha) => {
    const modulosDaTrilha = MODULOS.filter((m) => m.trilhaId === trilha.id)
    if (modulosDaTrilha.length === 0) return false
    return modulosDaTrilha.every((m) => (progress.abasConcluidas[m.id]?.length ?? 0) === 6)
  }).length

  const statsUsuario: BadgeStats = {
    modulosCompletos,
    streak: progress.streak,
    maiorSequenciaAcertos: progress.maiorSequenciaAcertos,
    trilhasCompletas,
    itensRevisados: progress.itensRevisadosTotal,
    livrosAbertos: progress.livrosAbertos.length,
    nivel: levelInfo.level,
    calculadorasUsadas: progress.calculadorasUsadas.length,
    perfisCarteiraVistos: progress.perfisCarteiraVistos.length,
    desafiosCompletos: progress.desafiosCompletos,
    xp: progress.xp,
  }

  const [editandoPerfil, setEditandoPerfil] = useState(false)
  const [badgeCompartilhando, setBadgeCompartilhando] = useState<(typeof BADGES)[number] | null>(null)
  const [notificacoes, setNotificacoes] = useState(false)
  const [confirmandoReset, setConfirmandoReset] = useState(false)
  const [exportado, setExportado] = useState(false)
  const [avisoNotificacao, setAvisoNotificacao] = useState(false)

  const hoje = new Date().getDate()
  const diasAtivos = Array.from({ length: progress.streak }, (_, i) => hoje - i).filter((d) => d > 0)

  async function handleToggleNotificacoes(ligar: boolean) {
    if (!ligar) {
      setNotificacoes(false)
      return
    }
    if (!('Notification' in window)) {
      setAvisoNotificacao(true)
      setTimeout(() => setAvisoNotificacao(false), 3500)
      return
    }
    const permissao = await Notification.requestPermission()
    if (permissao === 'granted') {
      setNotificacoes(true)
      new Notification('Nexus Finance', { body: 'Notificações ativadas! Vamos te lembrar de manter sua sequência de estudos.' })
    } else {
      setNotificacoes(false)
      setAvisoNotificacao(true)
      setTimeout(() => setAvisoNotificacao(false), 3500)
    }
  }

  function handleExportar() {
    const dados = {
      exportadoEm: new Date().toISOString(),
      xp: progress.xp,
      nivel: levelInfo.level,
      nivelNome: levelInfo.levelName,
      streak: progress.streak,
      modulosCompletos,
      badgesDesbloqueados: BADGES.filter((b) => b.condicao(statsUsuario)).map((b) => b.nome),
      itensRevisaoPendentes: progress.itensRevisao.length,
    }
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nexus-finance-progresso-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportado(true)
    setTimeout(() => setExportado(false), 2500)
  }

  return (
    <div className="px-4 pt-5 pb-28 relative">
      <h1 className="text-xl font-display font-extrabold text-white">Perfil</h1>
      <p className="text-xs text-slate-500 mt-1 mb-4.5">Seu progresso, conquistas e configurações</p>

      {/* Avatar + nome */}
      <button onClick={() => setEditandoPerfil(true)} className="flex items-center gap-3.5 mb-4.5 w-full text-left">
        <Avatar nome={progress.perfilPessoal.nome} emoji={progress.perfilPessoal.emoji} cor={progress.perfilPessoal.cor} size={58} editavel />
        <div className="flex-1 min-w-0">
          <p className="text-base font-display font-bold text-white">{progress.perfilPessoal.nome}</p>
          <p className="text-[11.5px] text-accent-cyan font-semibold mt-0.5">Toque para editar</p>
        </div>
      </button>

      {/* Continuar de onde parei */}
      {modulosCompletos === 0 && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/modulo/educacao-financeira')}
          className="flex items-center gap-3 w-full p-3.5 mb-4.5 rounded-2xl"
          style={{ background: '#00D4FF14', border: '1px solid #00D4FF44' }}
        >
          <div className="w-[38px] h-[38px] rounded-xl bg-accent-cyan/20 flex items-center justify-center shrink-0">
            <GraduationCap size={18} className="text-accent-cyan" />
          </div>
          <div className="flex-1">
            <p className="text-[12.5px] font-bold text-white">Continuar de onde parei</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Educação Financeira</p>
          </div>
          <ChevronRight size={16} className="text-accent-cyan" />
        </motion.button>
      )}

      {/* Resumo XP */}
      <div className="card-surface rounded-[20px] py-5.5 px-4.5 flex flex-col items-center gap-3 mb-4.5">
        <ProgressRing progress={levelInfo.progressToNext} size={100} strokeWidth={9}>
          <span className="text-xl font-display font-extrabold text-white leading-none">{levelInfo.level}</span>
          <span className="text-[9.5px] text-slate-500 mt-0.5">nível</span>
        </ProgressRing>
        <div className="text-center">
          <p className="text-[15px] font-bold text-accent-cyan">{levelInfo.levelName}</p>
          <p className="text-[11.5px] text-slate-400 mt-0.5">{progress.xp} XP total</p>
        </div>
        <div className="flex gap-5 mt-1.5">
          <Stat value={progress.streak} label="dias seguidos" />
          <Stat value={modulosCompletos} label="módulos" />
          <Stat value={BADGES.filter((b) => b.condicao(statsUsuario)).length} label="badges" />
        </div>
      </div>

      {/* Calendário de streak */}
      <div className="mb-4.5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Calendar size={14} className="text-slate-500" />
          <p className="text-[12.5px] font-bold text-white">Sua sequência</p>
        </div>
        <CalendarioStreak diasAtivos={diasAtivos} />
      </div>

      {/* Conquistas */}
      <div className="mb-5.5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-white">Conquistas</p>
          <span className="text-[11px] text-slate-500 font-semibold">
            {BADGES.filter((b) => b.condicao(statsUsuario)).length}/{BADGES.length}
          </span>
        </div>
        <ConquistasCarrossel badges={BADGES} statsUsuario={statsUsuario} onCompartilhar={setBadgeCompartilhando} />
      </div>

      {/* Nível Profissional — em breve */}
      <div className="mb-5.5">
        <div className="flex items-center gap-3.5 p-4 rounded-[18px]" style={{ background: 'linear-gradient(135deg, #FFC93C14, #EF44440D)', border: '1px solid #FFC93C33' }}>
          <div className="w-11 h-11 rounded-2xl bg-accent-gold/20 flex items-center justify-center shrink-0">
            <Lock size={19} className="text-accent-gold" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[13.5px] font-bold text-white">Nível Profissional</p>
              <span className="text-[9px] font-bold text-accent-gold bg-accent-gold/20 px-1.5 py-0.5 rounded-full">EM BREVE</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Prove que você sabe: 100 perguntas de altíssimo nível liberam um caminho exclusivo dentro do Nexus Finance
            </p>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div>
        <p className="text-[12.5px] font-bold text-white mb-2.5">Configurações</p>
        <div className="flex flex-col gap-2">
          <ConfigRow icon={Bell} label="Notificações" cor="#FFC93C" control={<Toggle value={notificacoes} onChange={handleToggleNotificacoes} />} />
          <ConfigRow
            icon={exportado ? CheckCircle2 : Download}
            label={exportado ? 'Progresso exportado!' : 'Exportar meu progresso'}
            cor={exportado ? '#22C55E' : '#00D4FF'}
            onClick={handleExportar}
            chevron={!exportado}
          />
          <ConfigRow icon={LogOut} label="Reiniciar progresso" cor="#EF4444" onClick={() => setConfirmandoReset(true)} chevron />
          <ConfigRow icon={Lock} label="Sair da conta" cor="#475569" desabilitado />
        </div>
      </div>

      {/* Toast de notificação bloqueada */}
      <AnimatePresence>
        {avisoNotificacao && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] max-w-[320px] px-4 py-3 rounded-2xl card-surface flex items-center gap-2.5"
            style={{ borderColor: '#FFC93C44' }}
          >
            <Bell size={16} className="text-accent-gold shrink-0" />
            <p className="text-[11.5px] text-slate-200 leading-snug">
              Permissão de notificação negada ou indisponível neste navegador. Ative manualmente nas configurações.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal editar perfil */}
      <AnimatePresence>
        {editandoPerfil && (
          <EditarPerfilModal
            nome={progress.perfilPessoal.nome}
            emoji={progress.perfilPessoal.emoji}
            cor={progress.perfilPessoal.cor}
            onSalvar={setPerfilPessoal}
            onFechar={() => setEditandoPerfil(false)}
          />
        )}
      </AnimatePresence>

      {/* Modal compartilhar conquista */}
      <AnimatePresence>
        {badgeCompartilhando && <CompartilharConquista badge={badgeCompartilhando} onFechar={() => setBadgeCompartilhando(null)} />}
      </AnimatePresence>

      {/* Modal confirmar reset */}
      <AnimatePresence>
        {confirmandoReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-[100] flex items-end justify-center"
            onClick={() => setConfirmandoReset(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[380px] bg-bg-card border-t border-border rounded-t-[24px] p-6 pb-8"
            >
              <div className="w-9 h-1 rounded-full bg-border mx-auto mb-4.5" />
              <div className="w-[46px] h-[46px] rounded-2xl bg-accent-red/10 flex items-center justify-center mb-3.5">
                <LogOut size={21} className="text-accent-red" />
              </div>
              <p className="text-[15px] font-bold text-white mb-2">Reiniciar todo o progresso?</p>
              <p className="text-[12.5px] text-slate-400 leading-relaxed mb-5">
                Isso apaga permanentemente seu XP, streak, módulos concluídos, badges e itens de revisão salvos neste dispositivo. Essa ação não pode ser desfeita.
              </p>
              <div className="flex gap-2.5">
                <button onClick={() => setConfirmandoReset(false)} className="flex-1 h-[46px] rounded-2xl border border-border text-slate-300 text-[13px] font-semibold">
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setConfirmandoReset(false)
                    resetProgress()
                  }}
                  className="flex-1 h-[46px] rounded-2xl bg-accent-red text-white text-[13px] font-bold"
                >
                  Sim, reiniciar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Carrossel arrastável de conquistas: agrupa em páginas de 6 (2 linhas x 3 colunas)
// com scroll-snap horizontal — antes era um grid único de 12 que empurrava o resto
// da tela pra baixo. Os dots abaixo indicam em qual página o usuário está.
function ConquistasCarrossel({
  badges,
  statsUsuario,
  onCompartilhar,
}: {
  badges: typeof BADGES
  statsUsuario: BadgeStats
  onCompartilhar: (b: (typeof BADGES)[number]) => void
}) {
  const POR_PAGINA = 6
  const paginas: (typeof BADGES)[] = []
  for (let i = 0; i < badges.length; i += POR_PAGINA) paginas.push(badges.slice(i, i + POR_PAGINA))

  const [paginaAtual, setPaginaAtual] = useState(0)

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const pagina = Math.round(el.scrollLeft / el.clientWidth)
    if (pagina !== paginaAtual) setPaginaAtual(pagina)
  }

  return (
    <div>
      <div
        onScroll={handleScroll}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {paginas.map((pagina, pIdx) => (
          <div key={pIdx} className="grid grid-cols-3 gap-2.5 w-full shrink-0 snap-start pr-0.5" style={{ scrollSnapAlign: 'start' }}>
            {pagina.map((b) => {
              const desbloqueado = b.condicao(statsUsuario)
              const Icon = getIcon(b.iconName, Star)
              const arte = ARTES_BADGE[b.id]
              return (
                <motion.button
                  key={b.id}
                  onClick={() => desbloqueado && onCompartilhar(b)}
                  whileTap={desbloqueado ? { scale: 0.88 } : undefined}
                  className="flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl"
                  style={{
                    background: desbloqueado ? `${b.cor}14` : '#0E1526',
                    border: `1px solid ${desbloqueado ? b.cor + '44' : '#1C2740'}`,
                    opacity: desbloqueado ? 1 : 0.55,
                  }}
                >
                  <motion.div
                    whileTap={desbloqueado ? { scale: 1.25, rotate: [0, -8, 8, 0] } : undefined}
                    transition={{ duration: 0.4 }}
                    className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
                    style={{ background: arte ? 'transparent' : desbloqueado ? `${b.cor}22` : 'rgba(100,116,139,0.15)' }}
                  >
                    {desbloqueado ? (
                      arte ? (
                        <img src={arte} alt="" className="w-[38px] h-[38px]" draggable={false} />
                      ) : (
                        <Icon size={18} style={{ color: b.cor }} />
                      )
                    ) : (
                      <Lock size={15} className="text-slate-600" />
                    )}
                  </motion.div>
                  <span className={`text-[9.5px] font-semibold text-center leading-tight ${desbloqueado ? 'text-white' : 'text-slate-500'}`}>{b.nome}</span>
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>
      {paginas.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {paginas.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === paginaAtual ? 16 : 6,
                background: i === paginaAtual ? '#00D4FF' : '#1C2740',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="text-[17px] font-display font-extrabold text-white">{value}</p>
      <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

function Avatar({ nome, emoji, cor, size = 64, editavel }: { nome: string; emoji: string | null; cor: string; size?: number; editavel?: boolean }) {
  const iniciais = nome ? nome.trim().split(' ').slice(0, 2).map((p) => p[0]?.toUpperCase()).join('') : '?'
  return (
    <div
      className="rounded-full flex items-center justify-center relative shrink-0"
      style={{ width: size, height: size, background: `${cor}26`, border: `2px solid ${cor}` }}
    >
      {emoji ? <span style={{ fontSize: size * 0.45 }}>{emoji}</span> : <span className="font-display font-extrabold" style={{ fontSize: size * 0.32, color: cor }}>{iniciais}</span>}
      {editavel && (
        <div className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-accent-cyan border-2 border-bg flex items-center justify-center">
          <Edit3 size={11} className="text-bg" />
        </div>
      )}
    </div>
  )
}

function EditarPerfilModal({
  nome,
  emoji,
  cor,
  onSalvar,
  onFechar,
}: {
  nome: string
  emoji: string | null
  cor: string
  onSalvar: (p: { nome: string; emoji: string | null; cor: string }) => void
  onFechar: () => void
}) {
  const [nomeTemp, setNomeTemp] = useState(nome)
  const [emojiTemp, setEmojiTemp] = useState(emoji)
  const [corTemp, setCorTemp] = useState(cor)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/85 z-[100] flex items-end justify-center" onClick={onFechar}>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] bg-bg-card border-t border-border rounded-t-[24px] p-6 pb-8"
      >
        <div className="w-9 h-1 rounded-full bg-border mx-auto mb-4.5" />
        <p className="text-[15px] font-bold text-white text-center mb-4.5">Editar perfil</p>

        <div className="flex justify-center mb-5">
          <Avatar nome={nomeTemp} emoji={emojiTemp} cor={corTemp} size={72} />
        </div>

        <p className="text-[11.5px] font-semibold text-slate-400 mb-2">Nome</p>
        <input
          type="text"
          value={nomeTemp}
          onChange={(e) => setNomeTemp(e.target.value)}
          placeholder="Seu nome"
          maxLength={30}
          className="w-full h-11 rounded-2xl bg-bg border border-border text-white text-[13px] px-3.5 mb-4.5 outline-none"
        />

        <p className="text-[11.5px] font-semibold text-slate-400 mb-2">Avatar</p>
        <div className="flex gap-2 mb-4.5 flex-wrap">
          <button
            onClick={() => setEmojiTemp(null)}
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
            style={{ background: !emojiTemp ? `${corTemp}33` : '#070B16', border: `1.5px solid ${!emojiTemp ? corTemp : '#1C2740'}` }}
          >
            <Smile size={16} style={{ color: !emojiTemp ? corTemp : '#64748B' }} />
          </button>
          {AVATAR_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmojiTemp(e)}
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-base"
              style={{ background: emojiTemp === e ? `${corTemp}33` : '#070B16', border: `1.5px solid ${emojiTemp === e ? corTemp : '#1C2740'}` }}
            >
              {e}
            </button>
          ))}
        </div>

        <p className="text-[11.5px] font-semibold text-slate-400 mb-2">Cor</p>
        <div className="flex gap-2 mb-5.5">
          {AVATAR_CORES.map((c) => (
            <button
              key={c}
              onClick={() => setCorTemp(c)}
              className="w-[30px] h-[30px] rounded-full"
              style={{ background: c, border: corTemp === c ? '2.5px solid #fff' : '2.5px solid transparent' }}
            />
          ))}
        </div>

        <div className="flex gap-2.5">
          <button onClick={onFechar} className="flex-1 h-[46px] rounded-2xl border border-border text-slate-300 text-[13px] font-semibold">
            Cancelar
          </button>
          <button
            onClick={() => {
              onSalvar({ nome: nomeTemp.trim() || 'Investidor', emoji: emojiTemp, cor: corTemp })
              onFechar()
            }}
            className="flex-1 h-[46px] rounded-2xl bg-accent-cyan text-bg text-[13px] font-bold"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CompartilharConquista({ badge, onFechar }: { badge: (typeof BADGES)[number]; onFechar: () => void }) {
  const Icon = getIcon(badge.iconName, Star)
  const arte = ARTES_BADGE[badge.id]
  const [copiado, setCopiado] = useState(false)

  async function compartilhar() {
    const texto = `Desbloqueei a conquista "${badge.nome}" no Nexus Finance! ${badge.descricao}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Nexus Finance', text: texto })
      } catch {
        // usuário cancelou o compartilhamento nativo — não é erro, não faz nada
      }
      return
    }
    // Sem suporte a Web Share API (ex: desktop): copia pro clipboard como fallback
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // clipboard também indisponível — silenciosamente não faz nada, sem quebrar a UI
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6" onClick={onFechar}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-[300px]">
        <div
          className="rounded-3xl p-7 text-center mb-4"
          style={{ background: `linear-gradient(145deg, ${badge.cor}22, #070B16)`, border: `1px solid ${badge.cor}55` }}
        >
          {arte ? (
            <img src={arte} alt="" className="w-[88px] h-[88px] mx-auto mb-4 mt-2" draggable={false} />
          ) : (
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-4 mt-2" style={{ background: `${badge.cor}26` }}>
              <Icon size={32} style={{ color: badge.cor }} />
            </div>
          )}
          <p className="text-base font-display font-extrabold text-white">{badge.nome}</p>
          <p className="text-xs text-slate-400 mt-1.5">{badge.descricao}</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={onFechar} className="flex-1 h-11 rounded-2xl card-surface text-slate-300 text-xs font-semibold">
            Fechar
          </button>
          <button
            onClick={compartilhar}
            className="flex-1 h-11 rounded-2xl text-bg text-xs font-bold flex items-center justify-center gap-1.5"
            style={{ background: badge.cor }}
          >
            <Share2 size={14} /> {copiado ? 'Copiado!' : 'Compartilhar'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CalendarioStreak({ diasAtivos }: { diasAtivos: number[] }) {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = hoje.getMonth()
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const totalDias = new Date(ano, mes + 1, 0).getDate()
  const nomesMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const celulas: (number | null)[] = []
  for (let i = 0; i < primeiroDia; i++) celulas.push(null)
  for (let d = 1; d <= totalDias; d++) celulas.push(d)

  return (
    <div className="card-surface rounded-[18px] p-4">
      <p className="text-[13px] font-bold text-white mb-3.5">
        {nomesMes[mes]} {ano}
      </p>
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {diasSemana.map((d, i) => (
          <div key={i} className="text-center text-[9.5px] text-slate-500 font-semibold">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {celulas.map((dia, i) => {
          const isHoje = dia === hoje.getDate()
          const isAtivo = dia !== null && diasAtivos.includes(dia)
          return (
            <div
              key={i}
              className="aspect-square rounded-lg flex items-center justify-center text-[10.5px]"
              style={{
                fontWeight: isAtivo ? 700 : 500,
                background: isAtivo ? '#00D4FF' : 'transparent',
                color: isAtivo ? '#070B16' : dia ? '#64748B' : 'transparent',
                border: isHoje && !isAtivo ? '1px solid #00D4FF' : 'none',
              }}
            >
              {dia || ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ConfigRow({
  icon: Icon,
  label,
  cor,
  control,
  onClick,
  chevron,
  desabilitado,
}: {
  icon: any
  label: string
  cor: string
  control?: React.ReactNode
  onClick?: () => void
  chevron?: boolean
  desabilitado?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className="flex items-center gap-3 p-3.5 rounded-2xl card-surface w-full text-left"
      style={{ opacity: desabilitado ? 0.55 : 1, cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${cor}1A` }}>
        <Icon size={15} style={{ color: cor }} />
      </div>
      <span className={`text-[12.5px] font-semibold flex-1 ${desabilitado ? 'text-slate-500' : 'text-slate-200'}`}>{label}</span>
      {desabilitado && <span className="text-[9.5px] font-bold text-slate-500 bg-slate-500/15 px-1.5 py-0.5 rounded-full">EM BREVE</span>}
      {control}
      {chevron && <ChevronRight size={16} className="text-slate-500" />}
    </button>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onChange(!value)
      }}
      className="w-10 h-[22px] rounded-full relative cursor-pointer shrink-0"
      style={{ background: value ? '#00D4FF' : '#1C2740' }}
    >
      <motion.div animate={{ x: value ? 20 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-[18px] h-[18px] rounded-full bg-white absolute top-0.5" />
    </div>
  )
}
