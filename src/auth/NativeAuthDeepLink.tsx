import { useEffect } from 'react'
import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { lerDestino, limparDestino } from './destinoAposLogin'

const SCHEME = 'com.nexusfinance.app:'
const HOST = 'auth'
const CHAVE_DESTINO_AUTH_NATIVO = 'nexus-finance-auth-native-next'

function resgatarDestinoPendente(): string | null {
  try {
    const raw = localStorage.getItem(CHAVE_DESTINO_AUTH_NATIVO)
    localStorage.removeItem(CHAVE_DESTINO_AUTH_NATIVO)
    if (!raw) return null
    const parsed: { next?: string; at?: number } = JSON.parse(raw)
    // Email de recuperação pode demorar a ser aberto. Após 48h, rota padrão.
    if (!parsed.at || !Number.isFinite(parsed.at) || Date.now() - parsed.at > 48 * 60 * 60 * 1000) return null
    return parsed.next ?? null
  } catch {
    return null
  }
}

function rotaSegura(value: string | null): '/login' | '/redefinir-senha' | '/' {
  if (value === '/redefinir-senha' || value === '/login') return value
  return '/'
}

/** Completes Supabase PKCE callbacks delivered to the installed Android app. */
export default function NativeAuthDeepLink() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    let ativo = true
    const processadas = new Set<string>()

    const processar = async (rawUrl: string) => {
      if (!ativo || processadas.has(rawUrl)) return

      let callback: URL
      try {
        callback = new URL(rawUrl)
      } catch {
        return
      }
      if (callback.protocol !== SCHEME || callback.hostname !== HOST || callback.pathname !== '/callback') return

      // Não consumir a rota de recuperação até verificar um código válido.
      // Links malformados/de outra origem não devem apagar uma tentativa.
      processadas.add(rawUrl)
      const erroUrl = callback.searchParams.get('error') || callback.searchParams.get('error_description')
      const code = callback.searchParams.get('code')
      let sucesso = false
      let recuperacao = false
      const funcaoDesejada = lerDestino()

      try {
        if (erroUrl) throw new Error('OAuth callback returned an error')
        // O app exige PKCE. Não aceitar JWTs diretamente em um deep link
        // personalizado: outro aplicativo poderia injetar uma sessão própria.
        if (!code) throw new Error('Missing PKCE authorization code')
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) throw error
        recuperacao = 'redirectType' in data && data.redirectType === 'recovery'
        sucesso = true
      } catch {
        // Erros de rede, código expirado, consentimento negado e JWT inválido
        // devem ir para uma tela de erro, jamais gerar Promise rejeitada solta.
      }

      try { await Browser.close() } catch { /* Android pode não suportar close() */ }
      if (!ativo) return

      if (!sucesso) {
        // O erro pertence ao fluxo atual; descartar o destino pendente.
        resgatarDestinoPendente()
        navigate('/login?auth_error=1', { replace: true })
        return
      }

      const destinoPendente = resgatarDestinoPendente()
      const fluxo = destinoPendente === '/redefinir-senha' ? destinoPendente : rotaSegura(callback.searchParams.get('next') || destinoPendente)
      const destino = recuperacao || fluxo === '/redefinir-senha' ? '/redefinir-senha' : funcaoDesejada || fluxo
      if (destino === '/redefinir-senha') limparDestino()
      navigate(destino, { replace: true })
    }

    const listener = App.addListener('appUrlOpen', ({ url }) => { void processar(url) })
    void App.getLaunchUrl().then((launch) => {
      if (launch?.url) return processar(launch.url)
    }).catch(() => undefined)

    return () => {
      ativo = false
      void listener.then((handle) => handle.remove())
    }
  }, [navigate])

  return null
}
