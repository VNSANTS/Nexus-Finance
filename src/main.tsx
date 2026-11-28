import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ProgressProvider } from './hooks/useUserProgress'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './auth/AuthContext'
import NativeAuthDeepLink from './auth/NativeAuthDeepLink'
import { Capacitor } from '@capacitor/core'
import { RegistrarPwa } from './hooks/useAtualizacaoApp'
import { useAuth } from './auth/AuthContext'
import { App as NativeApp } from '@capacitor/app'
import { useContaNotificacoesLocais } from './lib/notificacoesDispositivo'
import './styles/globals.css'

function ProvidersByIdentity({ children }: { children: React.ReactNode }) {
  const { sessao, guestId, perfil, carregando, carregandoPerfil, appConfig, recarregarAppConfig } = useAuth()
  const [versionCode, setVersionCode] = React.useState<number | null>(null)
  React.useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    let ativo = true
    void NativeApp.getInfo().then((info) => {
      if (ativo) setVersionCode(Number.parseInt(info.build, 10) || 1)
    }).catch(() => { if (ativo) setVersionCode(1) })
    return () => { ativo = false }
  }, [])
  const nativo = Capacitor.isNativePlatform()
  React.useEffect(() => {
    if (!nativo) return
    let ativo = true
    let remocao: { remove: () => Promise<void> } | null = null
    void NativeApp.addListener('appStateChange', ({ isActive }) => {
      if (ativo && isActive) void recarregarAppConfig()
    }).then((listener) => {
      if (!ativo) void listener.remove()
      else remocao = listener
    }).catch(() => {})
    return () => { ativo = false; if (remocao) void remocao.remove() }
  }, [nativo, recarregarAppConfig])
  const maintenanceBlocked = Boolean(appConfig?.modoManutencao && (!sessao || (perfil && perfil.role !== 'admin')))
  const versionKnown = !nativo || Boolean(appConfig?.carregada && versionCode !== null)
  const waiting = carregando || (Boolean(sessao) && carregandoPerfil) || (nativo && !versionKnown)
  const precisaAtualizar = Capacitor.isNativePlatform() && appConfig?.carregada && versionCode !== null
    && !appConfig.androidUpdateRevoked && versionCode < appConfig.androidMinVersionCode
  const contaAtivaOuNull = !waiting && !maintenanceBlocked && !precisaAtualizar && sessao?.user?.id
    && perfil?.id === sessao.user.id && perfil.status === 'ativo' ? sessao.user.id : null
  useContaNotificacoesLocais(contaAtivaOuNull, waiting)
  if (carregando) return <div className="min-h-dvh" aria-busy="true" />
  if (Capacitor.isNativePlatform() && (!appConfig?.carregada || versionCode === null)) {
    return <div className="grid min-h-dvh place-items-center bg-[#080D18] px-6 text-center text-slate-300" role="status">Verificando compatibilidade do aplicativo…</div>
  }
  if (precisaAtualizar) return <TelaAtualizacaoObrigatoria min={appConfig!.androidMinVersionCode} url={appConfig!.androidApkDownloadUrl} />
  const identity = sessao?.user?.id ? `user:${sessao.user.id}` : guestId ? `guest:${guestId}` : 'anonymous'
  return (
    <ThemeProvider key={identity} identity={identity}>
      <ProgressProvider identity={identity}>{children}</ProgressProvider>
    </ThemeProvider>
  )
}

function TelaAtualizacaoObrigatoria({ min, url }: { min: number; url: string }) {
  return <main className="grid min-h-dvh place-items-center bg-[#080D18] px-6 py-10 text-center text-white">
    <section className="max-w-sm rounded-3xl border border-[#00D4FF]/20 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#00D4FF]/10 text-3xl text-[#00D4FF]">↻</div>
      <h1 className="text-xl font-extrabold">Atualização obrigatória</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">Esta versão do aplicativo não é mais compatível. Instale a versão mais recente para continuar.</p>
      <a href={url} target="_blank" rel="noreferrer" className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-[#00D4FF] px-4 font-bold text-slate-950">Baixar atualização</a>
      <p className="mt-3 text-[11px] text-slate-500">Código mínimo requerido: {min}</p>
    </section>
  </main>
}

// O 404 do GitHub Pages redireciona rotas profundas à raiz e guarda a rota
// original. Restauramos a URL antes do Router e do cliente Supabase iniciarem.
try {
  const rotaPendente = sessionStorage.getItem('redirecionarPara')
  if (rotaPendente) {
    sessionStorage.removeItem('redirecionarPara')
    if (rotaPendente.startsWith('/') && !rotaPendente.startsWith('//') && !rotaPendente.includes('\\')) {
      const base = import.meta.env.BASE_URL
      const destino = new URL(rotaPendente.slice(1), window.location.origin + base)
      if (destino.origin === window.location.origin && destino.pathname.startsWith(base)) {
        window.history.replaceState(window.history.state, '', destino.pathname + destino.search + destino.hash)
      }
    }
  }
} catch {
  // Storage indisponível: mantém a página inicial acessível.
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {!Capacitor.isNativePlatform() && <RegistrarPwa />}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
          {/* AuthProvider por fora do Router: qualquer tela (inclusive o
              próprio /login) precisa poder ler sessão/perfil. */}
          <AuthProvider>
            <NativeAuthDeepLink />
            {/* Armazenamento local e tema são separados por usuário/convidado. */}
            <ProvidersByIdentity>
              <App />
            </ProvidersByIdentity>
          </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
