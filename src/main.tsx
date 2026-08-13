import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ProgressProvider } from './hooks/useUserProgress'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/Nexus-Finance/">
        {/* Uma instância única do progresso para o app inteiro. */}
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)