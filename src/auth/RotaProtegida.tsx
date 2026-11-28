import { useEffect, type ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { LockKeyhole, Loader2, ShieldAlert } from 'lucide-react'
import { useAuth } from './AuthContext'
import { lerDestino, limparDestino, validarDestino } from './destinoAposLogin'

function TelaCarregandoAuth() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-accent-cyan" />
    </div>
  )
}

function TelaAcessoRestrito({ mensagem, tentarNovamente = false }: { mensagem: string; tentarNovamente?: boolean }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-3 px-6 text-center">
      <ShieldAlert size={32} className="text-accent-red" />
      <p className="text-sm text-texto">{mensagem}</p>
      {tentarNovamente && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl border border-accent-cyan px-4 py-2 text-sm text-accent-cyan"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}

function StatusDoPerfil({ perfil }: { perfil: ReturnType<typeof useAuth>['perfil'] }) {
  if (!perfil) {
    return <TelaAcessoRestrito mensagem="Não foi possível verificar seu perfil. Confira a conexão e tente novamente." tentarNovamente />
  }
  if (perfil.status === 'bloqueado') {
    return <TelaAcessoRestrito mensagem="Sua conta está bloqueada. Entre em contato com o suporte." />
  }
  return null
}

// A rota não libera o app antes de obter o perfil do servidor: uma sessão
// válida isoladamente não comprova que a conta permanece ativa.
export function RotaProtegida({ children }: { children: ReactNode }) {
  const { sessao, perfil, guestId, ehConvidado, carregando, carregandoPerfil, appConfig } = useAuth()
  const location = useLocation()
  const pendente = sessao && perfil?.status === 'ativo' && perfil.id === sessao.user.id ? lerDestino() : null
  const atual = validarDestino(location.pathname + location.search)
  useEffect(() => {
    if (pendente && atual === pendente) limparDestino()
  }, [pendente, atual])

  if (carregando || (sessao && carregandoPerfil)) return <TelaCarregandoAuth />
  if (!sessao && !guestId) return <Navigate to="/login" replace state={{ from: location }} />
  if (!sessao && guestId && (!appConfig?.carregada || appConfig.modoManutencao)) {
    return <TelaAcessoRestrito mensagem={appConfig?.modoManutencao ? 'O Nexus Finance está em manutenção. Tente novamente mais tarde.' : 'Não foi possível verificar a disponibilidade do app. Conecte-se e tente novamente.'} tentarNovamente />
  }
  if (!sessao && ehConvidado && !rotaPermitidaParaConvidado(location.pathname, location.search)) {
    return <AcessoConvidadoBloqueado />
  }
  if (!sessao && ehConvidado) return <>{children}</>
  if (!perfil || perfil.status === 'bloqueado') return <StatusDoPerfil perfil={perfil} />
  if (pendente && location.pathname === '/' && pendente !== '/') return <Navigate to={pendente} replace />
  return <>{children}</>
}

const ROTAS_GF_CONVIDADO = [
  '/gestao-financeira',
  '/gestao-financeira/retrospectiva',
  '/gestao-financeira/relatorios',
  '/gestao-financeira/movimentacoes',
  '/gestao-financeira/acessibilidade',
]

function rotaPermitidaParaConvidado(pathname: string, search: string) {
  const params = new URLSearchParams(search)
  if (pathname === '/ferramentas' && params.has('calc') && params.get('calc') !== 'basica') return false
  if (pathname.startsWith('/modulo/') && params.has('aba')) return false
  return pathname === '/' || pathname === '/glossario' || pathname === '/ferramentas' ||
    pathname === '/personalizacao' || pathname === '/feedback-beta' ||
    /^\/modulo\/[a-z0-9-]+$/.test(pathname) || ROTAS_GF_CONVIDADO.includes(pathname) ||
    /^\/gestao-financeira\/movimentacoes\/[^/]+$/.test(pathname)
}

function AcessoConvidadoBloqueado() {
  const location = useLocation()
  const destino = `${location.pathname}${location.search}${location.hash}`
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 px-5 backdrop-blur-md" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="guest-lock-title" className="w-full max-w-sm rounded-3xl border border-[#00D4FF]/30 bg-slate-900/80 p-6 text-center shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]"><LockKeyhole size={26} /></div>
        <h1 id="guest-lock-title" className="text-lg font-bold text-white">Recurso para quem tem conta</h1>
        <p className="mt-2 text-sm text-slate-300">Entre ou crie sua conta para continuar. Seu destino será retomado depois da autenticação.</p>
        <Link to="/login" state={{ from: { pathname: destino } }} className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[#00D4FF] px-4 text-sm font-bold text-slate-950">Entrar ou criar conta</Link>
        <Link to="/" className="mt-3 inline-flex min-h-10 items-center text-sm text-slate-300">Voltar ao início</Link>
        <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400"><a href={import.meta.env.BASE_URL + 'termos-de-uso.html'} target="_blank" rel="noreferrer">Termos de uso</a><a href={import.meta.env.BASE_URL + 'privacy-policy.html'} target="_blank" rel="noreferrer">Privacidade</a></div>
      </section>
    </div>
  )
}

export function RotaAdmin({ children }: { children: ReactNode }) {
  const { sessao, perfil, carregando, carregandoPerfil, ehAdmin } = useAuth()

  if (carregando || (sessao && carregandoPerfil)) return <TelaCarregandoAuth />
  if (!sessao) return <Navigate to="/login" replace />
  if (!perfil || perfil.status === 'bloqueado') return <StatusDoPerfil perfil={perfil} />

  if (!ehAdmin) {
    return <TelaAcessoRestrito mensagem="Essa área é restrita a administradores." />
  }
  return <>{children}</>
}
