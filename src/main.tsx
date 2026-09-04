import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ProgressProvider } from './hooks/useUserProgress'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './auth/AuthContext'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* ThemeProvider fica por fora de tudo: aplica classes/CSS vars no
          <html> antes de qualquer outra coisa renderizar, e cobre tanto o
          app principal quanto a Gestão Financeira (tema é preferência de
          app inteiro, não específica de nenhum dos dois). */}
      <ThemeProvider>
        <BrowserRouter basename="/Nexus-Finance/">
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