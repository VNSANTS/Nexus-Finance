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
  entrarComOAuth: (provedor: ProvedorOAuth) => Promise<{ erro: string | null }>
  sair: () => Promise<void>
  excluirPropriaConta: () => Promise<{ erro: string | null }>
  ehAdmin: boolean
}

// Os 4 provedores pedidos. Cada um precisa ser habilitado e configurado
// separadamente em Supabase → Authentication → Providers (client
// ID/secret gerados no site de cada provedor) antes do botão funcionar de
// verdade — sem isso, o Supabase retorna erro "provider is not enabled"
// ao clicar. O código já suporta os 4; ativar um novo depois é só
// configuração no painel do Supabase, não precisa mexer aqui.
export type ProvedorOAuth = 'google' | 'facebook' | 'github'

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

  const entrarComOAuth = useCallback(async (provedor: ProvedorOAuth) => {
    // redirectTo garante que, depois de autorizar no Google/Facebook/etc.,
    // a pessoa volta pro app (e não pra localhost, mesmo problema que
    // tivemos com o e-mail de confirmação — aqui resolvido de saída
    // porque usa a URL real do navegador, não uma configurada à parte).
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provedor,
      options: { redirectTo: window.location.origin + '/Nexus-Finance/' },
    })
    // Em fluxo OAuth, sucesso não retorna aqui — o navegador é redirecionado
    // pro provedor (Google etc.) e depois volta pro app já logado, o
    // onAuthStateChange (acima) capta a sessão nova sozinho. Só chega
    // neste ponto do código se o REDIRECIONAMENTO falhou (provedor não
    // habilitado no Supabase, bloqueador de pop-up, etc.).
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  const sair = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const excluirPropriaConta = useCallback(async () => {
    const userId = sessao?.user?.id
    if (!userId) return { erro: 'Sessão inválida.' }

    const { data, error } = await supabase.functions.invoke('admin-users', {
      body: { tipo: 'excluirPropriaConta', alvoId: userId },
    })
    if (error) return { erro: traduzirErro(error.message) }
    if (!data?.ok) return { erro: data?.erro ?? 'Não foi possível excluir a conta.' }

    // A conta já foi apagada no servidor — desloga localmente pra limpar
    // a sessão (que agora aponta pra um usuário que não existe mais).
    await supabase.auth.signOut()
    return { erro: null }
  }, [sessao])

  return (
    <AuthContext.Provider
      value={{
        sessao,
        perfil,
        carregando,
        entrar,
        cadastrar,
        entrarComOAuth,
        sair,
        excluirPropriaConta,
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
  if (mensagem.toLowerCase().includes('banned') || mensagem.toLowerCase().includes('suspended')) {
    return 'Sua conta está bloqueada. Entre em contato com o suporte.'
  }
  if (mensagem.toLowerCase().includes('provider is not enabled')) {
    return 'Esse jeito de entrar ainda não está disponível. Tente com e-mail e senha.'
  }
  return mapa[mensagem] ?? mensagem
}
