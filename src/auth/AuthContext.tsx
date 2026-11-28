import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { supabase } from '@/lib/supabase'
import { avisosRemotosAutorizados, desvincularAvisosRemotos } from '@/lib/notificacoesRemotas'
import { limparDestino } from './destinoAposLogin'
import { manterUltimaAppConfigValida, type AppConfig } from './appConfigState'
import type { Perfil } from './types'


interface AuthContextValor {
  sessao: Session | null
  guestId: string | null
  ehConvidado: boolean
  perfil: Perfil | null
  carregando: boolean // true só durante o carregamento inicial da sessão
  carregandoPerfil: boolean // bloqueia rotas até validar status e papel do usuário
  appConfig: AppConfig | null
  recarregarAppConfig: () => Promise<void>
  continuarComoConvidado: () => boolean
  entrar: (email: string, senha: string) => Promise<{ erro: string | null }>
  cadastrar: (nome: string, email: string, senha: string) => Promise<{ erro: string | null }>
  entrarComOAuth: (provedor: ProvedorOAuth) => Promise<{ erro: string | null }>
  sair: () => Promise<void>
  excluirPropriaConta: () => Promise<{ erro: string | null }>
  encerrarOutrasSessoes: () => Promise<{ erro: string | null }>
  resetarSenha: (email: string) => Promise<{ erro: string | null }>
  atualizarSenha: (novaSenha: string) => Promise<{ erro: string | null }>
  alterarSenhaComSenhaAtual: (senhaAtual: string, novaSenha: string) => Promise<{ erro: string | null }>
  reenviarConfirmacaoPropria: () => Promise<{ erro: string | null }>
  reenviarConfirmacaoCadastro: (email: string) => Promise<{ erro: string | null }>
  ehAdmin: boolean
}
// Os 3 provedores configurados. Cada um precisa ser habilitado e
// configurado separadamente em Supabase → Authentication → Providers
// (client ID/secret gerados no site de cada provedor) antes do botão
// funcionar de verdade — sem isso, o Supabase retorna erro "provider is
// not enabled" ao clicar.
export type ProvedorOAuth = 'google' | 'github'

const REDIRECT_NATIVE = 'com.nexusfinance.app://auth/callback'
// Este endereço deve corresponder exatamente à allowlist do Supabase.
// Anexar ?next= à URL pode fazê-la cair na Site URL (Vercel).
const CHAVE_DESTINO_AUTH_NATIVO = 'nexus-finance-auth-native-next'
const CHAVE_CONVIDADO_INSTALACAO = 'nexus-finance-guest-installation-v1'

function lerIdConvidado(): string | null {
  try { return localStorage.getItem(CHAVE_CONVIDADO_INSTALACAO) } catch { return null }
}

function novoIdConvidado(): string {
  return crypto.randomUUID()
}

function redirectAuth(next: '/login' | '/redefinir-senha' | '/'): string {
  if (Capacitor.isNativePlatform()) {
    // Preserva a rota no WebView sem alterar a URL cadastrada. Os destinos
    // são restritos pelo tipo, impedindo redirects externos injetados.
    try {
      localStorage.setItem(CHAVE_DESTINO_AUTH_NATIVO, JSON.stringify({ next, at: Date.now() }))
    } catch { /* armazenamento pode estar indisponível */ }
    return REDIRECT_NATIVE
  }
  return new URL(next === '/' ? '' : next.slice(1), new URL(import.meta.env.BASE_URL, window.location.origin)).toString()
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

async function buscarAppConfig(): Promise<AppConfig> {
  const { data, error } = await supabase
    .from('app_config')
    .select('cadastro_fechado, modo_manutencao, android_min_version_code, android_update_revoked, android_apk_download_url')
    .eq('id', true)
    .maybeSingle()
  // Se a linha não existir ainda (SQL 005 não rodado) ou a leitura falhar,
  // assume tudo aberto — nunca trava o app por causa de uma config ausente.
  return {
    cadastroFechado: data?.cadastro_fechado ?? false,
    modoManutencao: data?.modo_manutencao ?? false,
    carregada: !error && Boolean(data),
    androidMinVersionCode: data?.android_min_version_code ?? 1,
    androidUpdateRevoked: data?.android_update_revoked ?? false,
    androidApkDownloadUrl: data?.android_apk_download_url ?? 'https://nexus-finance-vn.lovable.app',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null)
  const [guestId, setGuestId] = useState<string | null>(lerIdConvidado)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [carregandoPerfil, setCarregandoPerfil] = useState(false)
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null)
  const [versaoConsultaPerfil, setVersaoConsultaPerfil] = useState(0)
  const aplicarAppConfig = useCallback((recebida: AppConfig) => {
    setAppConfig((anterior) => manterUltimaAppConfigValida(anterior, recebida))
  }, [])
  const recarregarAppConfig = useCallback(async () => {
    const config = await buscarAppConfig()
    aplicarAppConfig(config)
  }, [aplicarAppConfig])

  const continuarComoConvidado = useCallback(() => {
    if (!appConfig?.carregada || appConfig.modoManutencao || sessao) return false
    try {
      const id = guestId ?? novoIdConvidado()
      localStorage.setItem(CHAVE_CONVIDADO_INSTALACAO, id)
      setGuestId(id)
      return true
    } catch {
      return false
    }
  }, [appConfig, guestId, sessao])

  useEffect(() => {
    let ativo = true
    buscarAppConfig().then((config) => {
      if (ativo) aplicarAppConfig(config)
    })

    // O Supabase emite INITIAL_SESSION quando lê a sessão salva.
    // Importante: o callback de auth é SÍNCRONO. Fazer await de outra
    // consulta Supabase aqui pode provocar deadlock com o auth lock.
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      if (!ativo) return
      setSessao(novaSessao)
      setVersaoConsultaPerfil((v) => v + 1)
      setCarregandoPerfil(Boolean(novaSessao?.user))
      setCarregando(false)
    })

    return () => {
      ativo = false
      listener.subscription.unsubscribe()
    }
  }, [aplicarAppConfig])

  // Busca o perfil FORA do callback de autenticação. Revalida nos eventos
  // de auth (inclusive SIGNED_IN e TOKEN_REFRESHED) e descarta resultados
  // antigos se a pessoa trocar de conta ou sair antes da resposta.
  useEffect(() => {
    let ativo = true
    const usuarioId = sessao?.user?.id
    if (!usuarioId) {
      setPerfil(null)
      setCarregandoPerfil(false)
      return
    }
    setPerfil(null)
    setCarregandoPerfil(true)
    buscarPerfil(usuarioId)
      .then((resultado) => {
        if (ativo) setPerfil(resultado)
      })
      .catch(() => {
        if (ativo) setPerfil(null)
      })
      .finally(() => {
        if (ativo) setCarregandoPerfil(false)
      })
    return () => { ativo = false }
  }, [sessao?.user?.id, versaoConsultaPerfil])

  // Modo manutenção — reforço: o check de entrar() só pega quem está
  // LOGANDO agora. Isso aqui cobre quem JÁ estava com o app aberto quando
  // o admin ativou o modo manutenção — reconsulta a cada 25s e desloga na
  // hora quem não é admin, sem esperar a pessoa fechar e abrir o app de
  // novo. Pedido explícito: ninguém além de admin usa o app em manutenção,
  // nem quem já estava logado.
  useEffect(() => {
    const intervalo = setInterval(async () => {
      const configAtual = await buscarAppConfig()
      aplicarAppConfig(configAtual)
    }, 25_000)
    return () => clearInterval(intervalo)
  }, [aplicarAppConfig])

  useEffect(() => {
    if (appConfig?.modoManutencao && sessao && perfil && perfil.role !== 'admin') {
      supabase.auth.signOut({ scope: 'local' })
    }
  }, [appConfig, sessao, perfil])

  const entrar = useCallback(async (email: string, senha: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) return { erro: traduzirErro(error.message) }

    // Modo manutenção: só admin consegue efetivamente ENTRAR. Checa depois
    // do login (não dá pra saber o role antes de autenticar), e desloga na
    // hora se a pessoa não for admin — a sessão nunca fica "meio aberta".
    const configAtual = await buscarAppConfig()
    aplicarAppConfig(configAtual)
    if (configAtual.modoManutencao && data.user) {
      const p = await buscarPerfil(data.user.id)
      if (p?.role !== 'admin') {
        await supabase.auth.signOut({ scope: 'local' })
        return { erro: 'O app está em manutenção no momento. Tente novamente mais tarde.' }
      }
    }

    return { erro: null }
  }, [aplicarAppConfig])

  const cadastrar = useCallback(async (nome: string, email: string, senha: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome }, // vira raw_user_meta_data, o trigger de signup usa isso pro nome inicial
        emailRedirectTo: redirectAuth('/'),
      },
    })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  const entrarComOAuth = useCallback(async (provedor: ProvedorOAuth) => {
    // Mesmo com novos cadastros fechados, o OAuth precisa permitir o login
    // de quem já existe. A restrição a NOVAS contas é imposta no trigger
    // de auth.users; bloquear antes de chamar OAuth impediria o login legítimo.
    const configAtual = await buscarAppConfig()
    aplicarAppConfig(configAtual)

    // redirectTo garante que, depois de autorizar no Google/GitHub/etc.,
    // a pessoa volta pro app (e não pra localhost, mesmo problema que
    // tivemos com o e-mail de confirmação — aqui resolvido de saída
    // porque usa a URL real do navegador, não uma configurada à parte).
    const native = Capacitor.isNativePlatform()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provedor,
      options: {
        redirectTo: redirectAuth('/'),
        ...(native ? { skipBrowserRedirect: true } : {}),
      },
    })
    if (!error && native) {
      if (!data.url) return { erro: 'O provedor não forneceu o link de autenticação.' }
      try {
        await Browser.open({ url: data.url })
      } catch {
        return { erro: 'Não foi possível abrir o navegador para autenticação.' }
      }
    }
    // Em fluxo OAuth, sucesso não retorna aqui — o navegador é redirecionado
    // pro provedor (Google etc.) e depois volta pro app já logado, o
    // onAuthStateChange (acima) capta a sessão nova sozinho. Só chega
    // neste ponto do código se o REDIRECIONAMENTO falhou (provedor não
    // habilitado no Supabase, bloqueador de pop-up, etc.).
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [aplicarAppConfig])

  const sair = useCallback(async () => {
    limparDestino()
    const conta = sessao?.user.id
    if (conta && avisosRemotosAutorizados(conta)) await desvincularAvisosRemotos(conta).catch(() => {})
    // Sair deste aparelho não deve derrubar as sessões de outros dispositivos.
    await supabase.auth.signOut({ scope: 'local' })
  }, [sessao?.user.id])

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
    await supabase.auth.signOut({ scope: 'local' })
    return { erro: null }
  }, [sessao])

  const encerrarOutrasSessoes = useCallback(async () => {
    const { error } = await supabase.auth.signOut({ scope: 'others' })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  // "Esqueci minha senha" — manda o e-mail com o link de recuperação. Não
  // avisa se o e-mail existe ou não (Supabase não retorna erro nesse caso
  // de propósito, pra não vazar quais e-mails têm conta) — a tela sempre
  // mostra a mesma mensagem de sucesso.
  const resetarSenha = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectAuth('/redefinir-senha'),
    })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  // Chamado na tela /redefinir-senha depois que a pessoa clica no link do
  // e-mail — nesse ponto o supabase-js já processou o token da URL e criou
  // uma sessão temporária de recuperação sozinho, então só falta trocar a
  // senha de fato.
  const atualizarSenha = useCallback(async (novaSenha: string) => {
    const { error } = await supabase.auth.updateUser({ password: novaSenha })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  // Troca iniciada em Conta > Privacidade: exige a senha atual para
  // confirmar a identidade antes de atualizar a credencial.
  const alterarSenhaComSenhaAtual = useCallback(async (senhaAtual: string, novaSenha: string) => {
    const { error } = await supabase.auth.updateUser({
      current_password: senhaAtual,
      password: novaSenha,
    })
    if (error) {
      const mensagem = error.message.toLowerCase()
      if (mensagem.includes('current password') || mensagem.includes('current_password')) {
        return { erro: 'A senha atual está incorreta.' }
      }
      return { erro: traduzirErro(error.message) }
    }
    return { erro: null }
  }, [])

  // Reenvia a confirmação pro PRÓPRIO e-mail (diferente da versão no
  // painel admin, que reenvia pra qualquer usuário) — `auth.resend()` não
  // exige privilégio nenhum além de já estar logado.
  // O cadastro pode não retornar sessão enquanto o e-mail está pendente.
  // Permitir reenvio também na tela de login; GoTrue aplica limites de envio.
  const reenviarConfirmacaoCadastro = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: redirectAuth('/') },
    })
    if (error) return { erro: traduzirErro(error.message) }
    return { erro: null }
  }, [])

  const reenviarConfirmacaoPropria = useCallback(async () => {
    const email = sessao?.user?.email
    if (!email) return { erro: 'Sessão inválida.' }
    return reenviarConfirmacaoCadastro(email)
  }, [sessao, reenviarConfirmacaoCadastro])

  return (
    <AuthContext.Provider
      value={{
        sessao,
        guestId,
        ehConvidado: !sessao && Boolean(guestId),
        perfil,
        carregando,
        carregandoPerfil,
        appConfig,
        recarregarAppConfig,
        continuarComoConvidado,
        entrar,
        cadastrar,
        entrarComOAuth,
        sair,
        excluirPropriaConta,
        encerrarOutrasSessoes,
        resetarSenha,
        atualizarSenha,
        alterarSenhaComSenhaAtual,
        reenviarConfirmacaoPropria,
        reenviarConfirmacaoCadastro,
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
    'New password should be different from the old password.': 'A nova senha precisa ser diferente da senha atual.',
    'Auth session missing!': 'Esse link de redefinição expirou ou já foi usado. Peça um novo.',
  }
  if (mensagem.toLowerCase().includes('rate limit')) {
    return 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.'
  }
  if (mensagem.toLowerCase().includes('banned') || mensagem.toLowerCase().includes('suspended')) {
    return 'Sua conta está bloqueada. Entre em contato com o suporte.'
  }
  if (mensagem.toLowerCase().includes('provider is not enabled')) {
    return 'Esse jeito de entrar ainda não está disponível. Tente com e-mail e senha.'
  }
  if (mensagem.includes('CADASTRO_FECHADO')) {
    return 'Novos cadastros estão temporariamente pausados. Se você já tem conta, isso não te afeta — tente entrar normalmente.'
  }
  return mapa[mensagem] ?? mensagem
}
