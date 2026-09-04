import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Perfil } from './types'

interface AuthContextValor {
  sessao: Session | null
  perfil: Perfil | null
  carregando: boolean // true só durante o carregamento inicial da sessão
  entrar: (email: string, senha: string) => Promise<{ erro: string | null }>
  cadastrar: (nome: string, email: string, senha: string) => Promise<{ erro: string | null }>
  sair: () => Promise<void>
  ehAdmin: boolean
}

const AuthContext = createContext<AuthContextValor | null>(null)

async function buscarPerfil(userId: string): Promise<Perfil | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nome, role, status')
    .eq('id', userId)
    .single()

  if (error || !data) return null
  return data as Perfil
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Carrega a sessão existente (usuário já logado antes, cookie/local
    // storage do supabase-js) uma vez ao montar o app.
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSessao(session)
      if (session?.user) {
        const p = await buscarPerfil(session.user.id)
        setPerfil(p)
      }
      setCarregando(false)
    })

    // Escuta mudanças de sessão (login, logout, token refresh) em qualquer
    // lugar do app — não precisa cada componente escutar isso.
    const { data: listener } = supabase.auth.onAuthStateChange(async (_evento, novaSessao) => {
      setSessao(novaSessao)
      if (novaSessao?.user) {
        const p = await buscarPerfil(novaSessao.user.id)
        setPerfil(p)
      } else {
        setPerfil(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const entrar = useCallback(async (email: string, senha: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  const cadastrar = useCallback(async (nome: string, email: string, senha: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome } }, // vira raw_user_meta_data, o trigger de signup usa isso pro nome inicial
    })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  const sair = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        sessao,
        perfil,
        carregando,
        entrar,
        cadastrar,
        sair,
        ehAdmin: perfil?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}

// Mensagens de erro do Supabase vêm em inglês — traduz as mais comuns pra
// não expor jargão técnico pro usuário final.
function traduzirErro(mensagem: string): string {
  const mapa: Record<string, string> = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'User already registered': 'Esse e-mail já está cadastrado.',
    'Password should be at least 6 characters': 'A senha precisa ter pelo menos 6 caracteres.',
    'Email not confirmed': 'Confirme seu e-mail antes de entrar (verifique sua caixa de entrada).',
  }
  return mapa[mensagem] ?? mensagem
}
