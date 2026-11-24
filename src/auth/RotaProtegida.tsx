import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, ShieldAlert } from 'lucide-react'
import { useAuth } from './AuthContext'

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
  const { sessao, perfil, carregando, carregandoPerfil } = useAuth()

  if (carregando || (sessao && carregandoPerfil)) return <TelaCarregandoAuth />
  if (!sessao) return <Navigate to="/login" replace />
  if (!perfil || perfil.status === 'bloqueado') return <StatusDoPerfil perfil={perfil} />
  return <>{children}</>
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
