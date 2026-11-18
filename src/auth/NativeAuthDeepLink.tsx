import { useEffect } from 'react'
import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const SCHEME = 'com.nexusfinance.app:'
const HOST = 'auth'

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
      processadas.add(rawUrl)

      let callback: URL
      try {
        callback = new URL(rawUrl)
      } catch {
        return
      }
      if (callback.protocol !== SCHEME || callback.hostname !== HOST || callback.pathname !== '/callback') return

      const erroUrl = callback.searchParams.get('error') || callback.searchParams.get('error_description')
      const code = callback.searchParams.get('code')
      if (erroUrl) {
        navigate('/login?auth_error=1', { replace: true })
        return
      }
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          navigate('/login?auth_error=1', { replace: true })
          return
        }
      } else {
        // Support Supabase templates that return an implicit session, while
        // keeping PKCE as the configured default for all new auth flows.
        const hashParams = new URLSearchParams(callback.hash.slice(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (error) {
            navigate('/login?auth_error=1', { replace: true })
            return
          }
        }
      }

      try { await Browser.close() } catch { /* No browser tab may be open for email links. */ }
      if (ativo) navigate(rotaSegura(callback.searchParams.get('next')), { replace: true })
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
