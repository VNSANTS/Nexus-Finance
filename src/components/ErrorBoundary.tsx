import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  erro: Error | null
}

/**
 * Sem isto, qualquer exceção durante o render (um campo faltando no conteúdo de
 * um módulo, por exemplo) apaga o app inteiro e deixa a tela preta, sem nenhuma
 * saída para o usuário — que num PWA instalado significa reinstalar.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null }

  static getDerivedStateFromError(erro: Error): State {
    return { erro }
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    // Ponto de entrada para Sentry/LogRocket quando você plugar monitoramento.
    console.error('[Nexus] erro não tratado:', erro, info.componentStack)
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <div className="px-6 pt-24 pb-16 flex flex-col items-center text-center gap-3">
        <h1 className="text-lg font-display font-extrabold text-white">Algo quebrou nesta tela</h1>
        <p className="text-sm text-slate-400">
          Seu progresso está salvo. Recarregue para continuar de onde parou.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-5 py-2.5 rounded-full bg-accent-cyan text-bg text-sm font-bold"
        >
          Recarregar o app
        </button>
        {import.meta.env.DEV && (
          <pre className="mt-6 w-full text-left text-[11px] text-slate-500 whitespace-pre-wrap break-words">
            {this.state.erro.message}
          </pre>
        )}
      </div>
    )
  }
}
