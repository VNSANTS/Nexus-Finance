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

// Exige sessão logada. Sem sessão, manda pro login.
export function RotaProtegida({ children }: { children: ReactNode }) {
  const { sessao, carregando } = useAuth()

  if (carregando) return <TelaCarregandoAuth />
  if (!sessao) return <Navigate to="/login" replace />
  return <>{children}</>
}

// Exige sessão logada E role === 'admin'. Usuário comum logado vê uma tela
// de acesso negado em vez de simplesmente sumir/redirecionar — mais claro
// sobre o motivo de não conseguir entrar.
export function RotaAdmin({ children }: { children: ReactNode }) {
  const { sessao, perfil, carregando, ehAdmin } = useAuth()

  if (carregando) return <TelaCarregandoAuth />
  if (!sessao) return <Navigate to="/login" replace />

  if (perfil?.status === 'bloqueado') {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3 px-6 text-center">
        <ShieldAlert size={32} className="text-accent-red" />
        <p className="text-sm text-texto">Sua conta está bloqueada. Entre em contato com o suporte.</p>
      </div>
    )
  }

  if (!ehAdmin) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3 px-6 text-center">
        <ShieldAlert size={32} className="text-accent-gold" />
        <p className="text-sm text-texto">Essa área é restrita a administradores.</p>
      </div>
    )
  }

  return <>{children}</>
}
