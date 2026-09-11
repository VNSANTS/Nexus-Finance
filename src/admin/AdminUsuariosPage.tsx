import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Search, ShieldCheck, ShieldOff, Lock, Unlock, Pencil, Trash2,
  Users, UserCheck, UserX, Crown, X, Loader2, AlertTriangle, ChevronDown, Sparkles,
  MailWarning, MailCheck, SendHorizonal, Wifi, RefreshCw,
} from 'lucide-react'
import { useAdminUsuarios } from './useAdminUsuarios'
import { buscarAppConfig, atualizarAppConfig, forcarAtualizacaoTodos } from './backend'
import type { EdicaoMetricasAdmin, EdicaoUsuarioAdmin, OrdenacaoAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from './types'

function formatarData(iso: string | null) {
  if (!iso) return 'Nunca acessou'
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatarDataHora(iso: string | null | undefined) {
  if (!iso) return 'Nunca'
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const LIMIAR_ONLINE_MS = 2 * 60_000 // mesmo limiar de useAdminUsuarios.ts (estatisticas.online)
function estaOnline(usuario: UsuarioAdmin) {
  return Boolean(usuario.ultimoVistoEm) && Date.now() - new Date(usuario.ultimoVistoEm!).getTime() < LIMIAR_ONLINE_MS
}

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/)
  return ((partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '')).toUpperCase()
}

// --- Cartões de estatística no topo ---------------------------------------

function CartaoEstatistica({ icone, label, valor, cor }: { icone: React.ReactNode; label: string; valor: number; cor: string }) {
  return (
    <div className="rounded-card bg-bg-card border border-border px-3 py-3 flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5" style={{ color: cor }}>
        {icone}
      </div>
      <span className="text-lg font-display font-extrabold text-texto leading-none">{valor}</span>
      <span className="text-[11px] text-texto-secundario truncate">{label}</span>
    </div>
  )
}

// --- Modal de confirmação genérico -----------------------------------------

function ModalConfirmacao({
  titulo, descricao, corBotao = 'bg-accent-red', textoBotao, carregando, onConfirmar, onCancelar,
}: {
  titulo: string
  descricao: string
  corBotao?: string
  textoBotao: string
  carregando: boolean
  onConfirmar: () => void
  onCancelar: () => void
}) {
  return (
    <div className="fixed inset-0 z-[9997] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onCancelar}>
      <div
        className="w-full max-w-sm rounded-card-lg bg-bg-card border border-border p-5 flex flex-col gap-4 mb-6 sm:mb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-accent-red/15 flex items-center justify-center text-accent-red">
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-texto text-sm">{titulo}</h3>
            <p className="text-xs text-texto-secundario mt-1">{descricao}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancelar}
            className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-texto"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={carregando}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-1.5 disabled:opacity-60 ${corBotao}`}
          >
            {carregando && <Loader2 size={14} className="animate-spin" />}
            {textoBotao}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Modal de edição ---------------------------------------------------

function ModalEdicao({
  usuario, carregando, onSalvar, onCancelar,
}: {
  usuario: UsuarioAdmin
  carregando: boolean
  onSalvar: (dados: EdicaoUsuarioAdmin) => void
  onCancelar: () => void
}) {
  const [nome, setNome] = useState(usuario.nome)
  const [email, setEmail] = useState(usuario.email)
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const podeSalvar = nome.trim().length >= 2 && emailValido

  return (
    <div className="fixed inset-0 z-[9997] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onCancelar}>
      <div
        className="w-full max-w-sm rounded-card-lg bg-bg-card border border-border p-5 flex flex-col gap-4 mb-6 sm:mb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-texto text-sm">Editar usuário</h3>
          <button onClick={onCancelar} className="text-texto-secundario">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-texto-secundario">Nome</span>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-xl bg-bg border border-border px-3 py-2.5 text-sm text-texto outline-none focus:border-accent-cyan"
              placeholder="Nome completo"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-texto-secundario">E-mail</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-xl bg-bg border border-border px-3 py-2.5 text-sm text-texto outline-none focus:border-accent-cyan"
              placeholder="email@exemplo.com"
            />
            {!emailValido && email.length > 0 && (
              <span className="text-[11px] text-accent-red">E-mail inválido</span>
            )}
          </label>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancelar} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-texto">
            Cancelar
          </button>
          <button
            onClick={() => podeSalvar && onSalvar({ nome: nome.trim(), email: email.trim() })}
            disabled={!podeSalvar || carregando}
            className="flex-1 rounded-full bg-accent-cyan py-2.5 text-sm font-semibold text-black flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {carregando && <Loader2 size={14} className="animate-spin" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Modal de edição de métricas (XP, level, streak etc.) -----------------

function ModalMetricas({
  usuario, carregando, onSalvar, onCancelar,
}: {
  usuario: UsuarioAdmin
  carregando: boolean
  onSalvar: (dados: EdicaoMetricasAdmin) => void
  onCancelar: () => void
}) {
  const [xp, setXp] = useState(String(usuario.metricas.xp))
  const [level, setLevel] = useState(String(usuario.metricas.level))
  const [streak, setStreak] = useState(String(usuario.metricas.streak))
  const [badges, setBadges] = useState(String(usuario.metricas.badges))
  const [desafios, setDesafios] = useState(String(usuario.metricas.desafiosCompletos))

  // Aceita negativo só em XP (o próprio app permite XP negativo — ver
  // useUserProgress.ts, perderXp). Os demais campos não fazem sentido
  // negativos, então ficam presos em >= 0.
  const numOuNull = (v: string, permiteNegativo = false) => {
    if (v.trim() === '' || v.trim() === '-') return null
    const n = Number(v)
    if (!Number.isFinite(n)) return null
    if (!permiteNegativo && n < 0) return null
    return Math.trunc(n)
  }

  const xpNum = numOuNull(xp, true)
  const levelNum = numOuNull(level)
  const streakNum = numOuNull(streak)
  const badgesNum = numOuNull(badges)
  const desafiosNum = numOuNull(desafios)
  const podeSalvar =
    xpNum !== null && levelNum !== null && levelNum >= 1 && streakNum !== null && badgesNum !== null && desafiosNum !== null

  function campoNumerico(label: string, valor: string, onChange: (v: string) => void, valido: boolean) {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-texto-secundario">{label}</span>
        <input
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          inputMode="numeric"
          className={`rounded-xl bg-bg border px-3 py-2.5 text-sm text-texto outline-none focus:border-accent-cyan ${
            valido ? 'border-border' : 'border-accent-red'
          }`}
        />
      </label>
    )
  }

  return (
    <div className="fixed inset-0 z-[9997] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onCancelar}>
      <div
        className="w-full max-w-sm rounded-card-lg bg-bg-card border border-border p-5 flex flex-col gap-4 mb-6 sm:mb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-gold" />
            <h3 className="font-display font-bold text-texto text-sm">Editar progresso</h3>
          </div>
          <button onClick={onCancelar} className="text-texto-secundario">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-texto-secundario -mt-2">
          Editar aqui muda o progresso salvo no servidor. O nível/título (ex: "{usuario.metricas.levelName}") não
          muda sozinho — ajuste também se fizer sentido.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {campoNumerico('XP', xp, setXp, xpNum !== null)}
          {campoNumerico('Nível (1-6)', level, setLevel, levelNum !== null && levelNum >= 1)}
          {campoNumerico('Sequência (dias)', streak, setStreak, streakNum !== null)}
          {campoNumerico('Badges', badges, setBadges, badgesNum !== null)}
        </div>
        {campoNumerico('Desafios diários completos', desafios, setDesafios, desafiosNum !== null)}

        <div className="flex gap-2">
          <button onClick={onCancelar} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-texto">
            Cancelar
          </button>
          <button
            onClick={() =>
              podeSalvar &&
              onSalvar({ xp: xpNum!, level: levelNum!, streak: streakNum!, badges: badgesNum!, desafiosCompletos: desafiosNum! })
            }
            disabled={!podeSalvar || carregando}
            className="flex-1 rounded-full bg-accent-cyan py-2.5 text-sm font-semibold text-black flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {carregando && <Loader2 size={14} className="animate-spin" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Cartão de métricas expandido ---------------------------------------

function LinhaMetrica({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-texto-secundario uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-texto">{valor}</span>
    </div>
  )
}

// --- Linha de usuário (cartão) -------------------------------------------

function CartaoUsuario({
  usuario, pendente, onAlternarPapel, onAlternarStatus, onEditar, onEditarMetricas, onExcluir, onReenviarEmail, onConfirmarEmail,
}: {
  usuario: UsuarioAdmin
  pendente: boolean
  onAlternarPapel: () => void
  onAlternarStatus: () => void
  onEditar: () => void
  onEditarMetricas: () => void
  onExcluir: () => void
  onReenviarEmail: () => void
  onConfirmarEmail: () => void
}) {
  const [expandido, setExpandido] = useState(false)
  const bloqueado = usuario.status === 'bloqueado'
  const isAdmin = usuario.papel === 'admin'
  const online = estaOnline(usuario)
  const pct = usuario.metricas.totalModulos > 0
    ? Math.round((usuario.metricas.modulosConcluidos / usuario.metricas.totalModulos) * 100)
    : 0

  return (
    <div className={`rounded-card bg-bg-card border transition-colors ${bloqueado ? 'border-accent-red/40' : 'border-border'}`}>
      <button
        onClick={() => setExpandido((v) => !v)}
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left"
      >
        <div className="relative shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${
              isAdmin ? 'bg-accent-gold/20 text-accent-gold' : 'bg-accent-cyan/15 text-accent-cyan'
            }`}
          >
            {iniciais(usuario.nome)}
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-bg-card"
            style={{ background: online ? '#22C55E' : '#64748B' }}
            title={online ? 'Online agora' : 'Offline'}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-texto truncate">{usuario.nome}</span>
            {isAdmin && <Crown size={12} className="text-accent-gold shrink-0" />}
            {usuario.emailConfirmado === false && (
              <span title="E-mail não validado">
                <MailWarning size={12} className="text-accent-gold shrink-0" />
              </span>
            )}
          </div>
          <span className="text-xs text-texto-secundario truncate block">{usuario.email}</span>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              bloqueado ? 'bg-accent-red/15 text-accent-red' : 'bg-accent-green/15 text-accent-green'
            }`}
          >
            {bloqueado ? 'Bloqueado' : 'Ativo'}
          </span>
          <span className="text-[11px] text-texto-secundario">{usuario.metricas.xp} XP</span>
        </div>

        <ChevronDown size={16} className={`shrink-0 text-texto-secundario transition-transform ${expandido ? 'rotate-180' : ''}`} />
      </button>

      {expandido && (
        <div className="px-3.5 pb-3.5 flex flex-col gap-3 border-t border-border pt-3">
          <div className="grid grid-cols-3 gap-2">
            <LinhaMetrica label="Nível" valor={`${usuario.metricas.level} · ${usuario.metricas.levelName}`} />
            <LinhaMetrica label="Sequência" valor={`${usuario.metricas.streak} dias`} />
            <LinhaMetrica label="Badges" valor={`${usuario.metricas.badges}`} />
            <LinhaMetrica label="Módulos" valor={`${usuario.metricas.modulosConcluidos}/${usuario.metricas.totalModulos} (${pct}%)`} />
            <LinhaMetrica label="Desafios" valor={`${usuario.metricas.desafiosCompletos}`} />
            <LinhaMetrica label="Perfil de risco" valor={usuario.metricas.riskProfile ?? '—'} />
            <LinhaMetrica label="Cadastro" valor={formatarData(usuario.criadoEm)} />
            <LinhaMetrica label="Última atividade" valor={formatarData(usuario.metricas.ultimaAtividade)} />
            <LinhaMetrica label="Presença" valor={online ? 'Online agora' : `Visto: ${formatarDataHora(usuario.ultimoVistoEm)}`} />
            <LinhaMetrica
              label="E-mail"
              valor={usuario.emailConfirmado === undefined ? 'verificando…' : usuario.emailConfirmado ? 'Validado' : 'Não validado'}
            />
            <LinhaMetrica label="Último login" valor={usuario.ultimoLogin === undefined ? 'verificando…' : formatarDataHora(usuario.ultimoLogin)} />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={onAlternarPapel}
              disabled={pendente}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-border text-texto disabled:opacity-50"
            >
              {isAdmin ? <ShieldOff size={13} /> : <ShieldCheck size={13} />}
              {isAdmin ? 'Rebaixar p/ usuário' : 'Promover a admin'}
            </button>
            <button
              onClick={onAlternarStatus}
              disabled={pendente}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border disabled:opacity-50 ${
                bloqueado ? 'border-accent-green/40 text-accent-green' : 'border-accent-red/40 text-accent-red'
              }`}
            >
              {bloqueado ? <Unlock size={13} /> : <Lock size={13} />}
              {bloqueado ? 'Desbloquear' : 'Bloquear'}
            </button>
            <button
              onClick={onEditar}
              disabled={pendente}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-border text-texto disabled:opacity-50"
            >
              <Pencil size={13} />
              Editar
            </button>
            <button
              onClick={onEditarMetricas}
              disabled={pendente}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-accent-gold/40 text-accent-gold disabled:opacity-50"
            >
              <Sparkles size={13} />
              Progresso
            </button>
            {usuario.emailConfirmado === false && (
              <>
                <button
                  onClick={onReenviarEmail}
                  disabled={pendente}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-accent-cyan/40 text-accent-cyan disabled:opacity-50"
                >
                  <SendHorizonal size={13} />
                  Reenviar e-mail
                </button>
                <button
                  onClick={onConfirmarEmail}
                  disabled={pendente}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-accent-green/40 text-accent-green disabled:opacity-50"
                >
                  <MailCheck size={13} />
                  Confirmar manualmente
                </button>
              </>
            )}
            <button
              onClick={onExcluir}
              disabled={pendente}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border border-accent-red/40 text-accent-red disabled:opacity-50 ml-auto"
            >
              {pendente ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Página principal ------------------------------------------------------

// --- Painel de controle global de acesso (fechar cadastro / manutenção) ---

function ToggleAcesso({
  titulo, descricao, ativo, cor, carregando, onToggle,
}: {
  titulo: string
  descricao: string
  ativo: boolean
  cor: string
  carregando: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-card bg-bg-card border border-border px-3.5 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-texto">{titulo}</p>
        <p className="text-xs text-texto-secundario mt-0.5">{descricao}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={carregando}
        className="shrink-0 w-11 h-6 rounded-full relative transition-colors disabled:opacity-50"
        style={{ background: ativo ? cor : 'var(--border)' }}
        aria-label={titulo}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
          style={{ transform: ativo ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  )
}

function PainelControleAcesso() {
  const [config, setConfig] = useState<{ cadastroFechado: boolean; modoManutencao: boolean } | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState<'cadastro' | 'manutencao' | null>(null)

  useEffect(() => {
    buscarAppConfig()
      .then((c) => {
        setConfig(c)
        setCarregando(false)
      })
      .catch((e) => {
        setErro(e instanceof Error ? e.message : 'Erro ao carregar configuração.')
        setCarregando(false)
      })
  }, [])

  async function alternar(campo: 'cadastroFechado' | 'modoManutencao', chave: 'cadastro' | 'manutencao') {
    if (!config) return
    setSalvando(chave)
    setErro(null)
    try {
      const atualizado = await atualizarAppConfig({ [campo]: !config[campo] })
      setConfig(atualizado)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao salvar.')
    } finally {
      setSalvando(null)
    }
  }

  if (carregando) {
    return <div className="h-[136px] rounded-card bg-bg-card animate-pulse" />
  }

  if (erro || !config) {
    return (
      <div className="rounded-card bg-accent-red/10 border border-accent-red/30 px-3.5 py-3 text-xs text-accent-red">
        Não foi possível carregar o controle de acesso: {erro ?? 'dados ausentes'}. Confirme se o SQL
        005_controle_acesso.sql foi executado no Supabase.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-texto-secundario px-0.5">Controle de acesso ao app</p>
      <ToggleAcesso
        titulo="Bloquear novos cadastros"
        descricao="Ninguém consegue criar conta nova até você desligar (quem já tem conta não é afetado)."
        ativo={config.cadastroFechado}
        cor="var(--accent-gold)"
        carregando={salvando === 'cadastro'}
        onToggle={() => alternar('cadastroFechado', 'cadastro')}
      />
      <ToggleAcesso
        titulo="Modo manutenção"
        descricao="Só administradores conseguem entrar. Quem já estava logado é desconectado automaticamente."
        ativo={config.modoManutencao}
        cor="var(--accent-red)"
        carregando={salvando === 'manutencao'}
        onToggle={() => alternar('modoManutencao', 'manutencao')}
      />
      <BotaoForcarAtualizacao />
    </div>
  )
}

function BotaoForcarAtualizacao() {
  const [enviando, setEnviando] = useState(false)
  const [feito, setFeito] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function disparar() {
    if (enviando) return
    if (!window.confirm('Forçar todo mundo com o app aberto a recarregar com a versão mais nova agora?')) return
    setEnviando(true)
    setErro(null)
    try {
      await forcarAtualizacaoTodos()
      setFeito(true)
      setTimeout(() => setFeito(false), 3000)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao forçar atualização.')
      setTimeout(() => setErro(null), 3500)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <button
      onClick={disparar}
      disabled={enviando}
      className="flex items-center justify-between rounded-card bg-bg-card border border-border px-3.5 py-3 disabled:opacity-60"
    >
      <div className="text-left">
        <p className="text-[13px] font-semibold text-texto">
          {feito ? 'Atualização disparada!' : erro ?? 'Forçar atualização pra todo mundo'}
        </p>
        <p className="text-[11px] text-texto-secundario">
          Todo aparelho com o app aberto recarrega sozinho com a versão mais nova em até ~25s.
        </p>
      </div>
      <RefreshCw size={16} className={`shrink-0 text-accent-cyan ${enviando ? 'animate-spin' : ''}`} />
    </button>
  )
}

export default function AdminUsuariosPage() {
  const {
    usuarios, totalSemFiltro, estatisticas, carregando, erro, filtros, setFiltros,
    ordenacao, setOrdenacao, pendentes, recarregar, alternarPapel, alternarStatus, salvarEdicao, salvarMetricas, remover,
    reenviarEmail, confirmarEmail,
  } = useAdminUsuarios()

  const [editando, setEditando] = useState<UsuarioAdmin | null>(null)
  const [editandoMetricas, setEditandoMetricas] = useState<UsuarioAdmin | null>(null)
  const [excluindo, setExcluindo] = useState<UsuarioAdmin | null>(null)

  return (
    <div className="px-4 pt-6 pb-28 flex flex-col gap-5 max-w-[480px] mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/perfil" className="text-texto-secundario">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display font-extrabold text-texto text-lg leading-tight">Controle de usuários</h1>
          <p className="text-xs text-texto-secundario">Painel de administração — {totalSemFiltro} usuários cadastrados</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-2">
        <CartaoEstatistica icone={<Users size={15} />} label="Total" valor={estatisticas.total} cor="var(--accent-primaria)" />
        <CartaoEstatistica icone={<Wifi size={15} />} label="Online agora" valor={estatisticas.online} cor="var(--accent-green)" />
        <CartaoEstatistica icone={<UserCheck size={15} />} label="Ativos" valor={estatisticas.ativos} cor="var(--accent-green)" />
        <CartaoEstatistica icone={<UserX size={15} />} label="Bloqueados" valor={estatisticas.bloqueados} cor="var(--accent-red)" />
        <CartaoEstatistica icone={<Crown size={15} />} label="Admins" valor={estatisticas.admins} cor="var(--accent-gold)" />
      </div>

      <PainelControleAcesso />

      {/* Busca */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-secundario" />
        <input
          value={filtros.busca}
          onChange={(e) => setFiltros((f) => ({ ...f, busca: e.target.value }))}
          placeholder="Buscar por nome ou e-mail"
          className="w-full rounded-full bg-bg-card border border-border pl-10 pr-3.5 py-2.5 text-sm text-texto outline-none focus:border-accent-cyan"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        {(['todos', 'admin', 'usuario'] as const).map((papel) => (
          <button
            key={papel}
            onClick={() => setFiltros((f) => ({ ...f, papel }))}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${
              filtros.papel === papel ? 'bg-accent-cyan text-black border-accent-cyan' : 'border-border text-texto-secundario'
            }`}
          >
            {papel === 'todos' ? 'Todos os papéis' : papel === 'admin' ? 'Admins' : 'Usuários comuns'}
          </button>
        ))}
        {(['todos', 'ativo', 'bloqueado'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFiltros((f) => ({ ...f, status }))}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${
              filtros.status === status ? 'bg-accent-cyan text-black border-accent-cyan' : 'border-border text-texto-secundario'
            }`}
          >
            {status === 'todos' ? 'Todos os status' : status === 'ativo' ? 'Ativos' : 'Bloqueados'}
          </button>
        ))}
        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value as OrdenacaoAdmin)}
          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-border text-texto-secundario bg-transparent"
        >
          <option value="nome">Ordenar: Nome</option>
          <option value="xp">Ordenar: XP</option>
          <option value="criadoEm">Ordenar: Cadastro</option>
          <option value="ultimaAtividade">Ordenar: Atividade</option>
        </select>
      </div>

      {/* Lista */}
      {carregando && (
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-card bg-bg-card animate-pulse" />
          ))}
        </div>
      )}

      {!carregando && erro && (
        <div className="rounded-card bg-accent-red/10 border border-accent-red/30 px-4 py-4 text-center flex flex-col gap-2">
          <p className="text-sm text-accent-red">{erro}</p>
          <button onClick={recarregar} className="text-xs font-semibold text-accent-cyan self-center">
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && usuarios.length === 0 && (
        <div className="rounded-card bg-bg-card border border-border px-4 py-8 text-center">
          <p className="text-sm text-texto-secundario">Nenhum usuário encontrado com esses filtros.</p>
        </div>
      )}

      {!carregando && !erro && usuarios.length > 0 && (
        <div className="flex flex-col gap-2">
          {usuarios.map((u) => (
            <CartaoUsuario
              key={u.id}
              usuario={u}
              pendente={pendentes.has(u.id)}
              onAlternarPapel={() => alternarPapel(u.id, u.papel).catch((e) => alert(e instanceof Error ? e.message : 'Erro ao alterar papel.'))}
              onAlternarStatus={() => alternarStatus(u.id, u.status).catch((e) => alert(e instanceof Error ? e.message : 'Erro ao alterar status.'))}
              onEditar={() => setEditando(u)}
              onEditarMetricas={() => setEditandoMetricas(u)}
              onExcluir={() => setExcluindo(u)}
              onReenviarEmail={() => reenviarEmail(u.id, u.email).catch((e) => alert(e instanceof Error ? e.message : 'Erro ao reenviar e-mail.'))}
              onConfirmarEmail={() => confirmarEmail(u.id).catch((e) => alert(e instanceof Error ? e.message : 'Erro ao confirmar usuário.'))}
            />
          ))}
        </div>
      )}

      {editando && (
        <ModalEdicao
          usuario={editando}
          carregando={pendentes.has(editando.id)}
          onCancelar={() => setEditando(null)}
          onSalvar={async (dados) => {
            try {
              await salvarEdicao(editando.id, dados)
              setEditando(null)
            } catch (e) {
              alert(e instanceof Error ? e.message : 'Não foi possível salvar as alterações.')
            }
          }}
        />
      )}

      {editandoMetricas && (
        <ModalMetricas
          usuario={editandoMetricas}
          carregando={pendentes.has(editandoMetricas.id)}
          onCancelar={() => setEditandoMetricas(null)}
          onSalvar={async (dados) => {
            try {
              await salvarMetricas(editandoMetricas.id, dados)
              setEditandoMetricas(null)
            } catch (e) {
              alert(e instanceof Error ? e.message : 'Não foi possível salvar o progresso.')
            }
          }}
        />
      )}

      {excluindo && (
        <ModalConfirmacao
          titulo={`Excluir ${excluindo.nome}?`}
          descricao="Essa ação remove a conta e todo o progresso do usuário. Não pode ser desfeita."
          textoBotao="Excluir conta"
          carregando={pendentes.has(excluindo.id)}
          onCancelar={() => setExcluindo(null)}
          onConfirmar={async () => {
            await remover(excluindo.id)
            setExcluindo(null)
          }}
        />
      )}
    </div>
  )
}
