import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ProgressProvider } from './hooks/useUserProgress'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './auth/AuthContext'
import './styles/globals.css'

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
      {/* ThemeProvider fica por fora de tudo: aplica classes/CSS vars no
          <html> antes de qualquer outra coisa renderizar, e cobre tanto o
          app principal quanto a Gestão Financeira (tema é preferência de
          app inteiro, não específica de nenhum dos dois). */}
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          {/* AuthProvider por fora do Router: qualquer tela (inclusive o
              próprio /login) precisa poder ler sessão/perfil. */}
          <AuthProvider>
            {/* Uma instância única do progresso para o app inteiro. */}
            <ProgressProvider>
              <App />
            </ProgressProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
)