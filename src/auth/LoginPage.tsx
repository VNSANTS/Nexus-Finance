import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, Mail, Lock, User, LogIn, UserPlus, TrendingUp } from 'lucide-react'
import { useAuth, type ProvedorOAuth } from './AuthContext'

// Ícones de marca não fazem parte do lucide-react (é uma biblioteca de
// ícones genéricos) — SVGs oficiais simplificados, um por provedor.
function IconeGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.9c1.7-1.57 2.68-3.88 2.68-6.61Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
    </svg>
  )
}
function IconeFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#1877F2" d="M18 9a9 9 0 1 0-10.4 8.9v-6.3H5.3V9h2.3V7.02c0-2.27 1.35-3.52 3.42-3.52.99 0 2.03.18 2.03.18v2.23h-1.14c-1.13 0-1.48.7-1.48 1.42V9h2.52l-.4 2.6h-2.12v6.3A9 9 0 0 0 18 9Z" />
    </svg>
  )
}
function IconeGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

const PROVEDORES: { id: ProvedorOAuth; nome: string; icone: () => React.JSX.Element }[] = [
  { id: 'google', nome: 'Google', icone: IconeGoogle },
  { id: 'facebook', nome: 'Facebook', icone: IconeFacebook },
  { id: 'github', nome: 'GitHub', icone: IconeGitHub },
]

export default function LoginPage() {
  const { sessao, carregando, entrar, cadastrar, entrarComOAuth } = useAuth()
  const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [provedorEnviando, setProvedorEnviando] = useState<ProvedorOAuth | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [avisoCadastro, setAvisoCadastro] = useState<string | null>(null)

  // Já logado — não faz sentido mostrar a tela de login de novo.
  if (!carregando && sessao) return <Navigate to="/" replace />

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const podeEnviar = emailValido && senha.length >= 6 && (modo === 'entrar' || nome.trim().length >= 2)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!podeEnviar || enviando) return
    setEnviando(true)
    setErro(null)
    setAvisoCadastro(null)

    const resultado = modo === 'entrar' ? await entrar(email, senha) : await cadastrar(nome.trim(), email, senha)

    if (resultado.erro) {
      setErro(resultado.erro)
    } else if (modo === 'cadastrar') {
      setAvisoCadastro('Conta criada! Verifique seu e-mail para confirmar antes de entrar.')
      setModo('entrar')
    }
    setEnviando(false)
  }

  async function handleOAuth(provedor: ProvedorOAuth) {
    if (provedorEnviando) return
    setProvedorEnviando(provedor)
    setErro(null)
    const resultado = await entrarComOAuth(provedor)
    // Em caso de sucesso, o navegador já saiu da página (redirecionado
    // pro provedor) — só chega aqui de fato se der erro.
    if (resultado.erro) setErro(resultado.erro)
    setProvedorEnviando(null)
  }

  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-10 max-w-[420px] mx-auto">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-accent-cyan/15 flex items-center justify-center">
          <TrendingUp size={26} className="text-accent-cyan" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-texto">Nexus Finance</h1>
        <p className="text-sm text-texto-secundario text-center">
          {modo === 'entrar' ? 'Entre na sua conta para continuar' : 'Crie sua conta gratuita'}
        </p>
      </div>

      <div className="flex rounded-full bg-bg-card border border-border p-1 mb-6">
        <button
          onClick={() => { setModo('entrar'); setErro(null) }}
          className={`flex-1 text-sm font-semibold py-2 rounded-full transition-colors ${
            modo === 'entrar' ? 'bg-accent-cyan text-black' : 'text-texto-secundario'
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => { setModo('cadastrar'); setErro(null) }}
          className={`flex-1 text-sm font-semibold py-2 rounded-full transition-colors ${
            modo === 'cadastrar' ? 'bg-accent-cyan text-black' : 'text-texto-secundario'
          }`}
        >
          Cadastrar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {modo === 'cadastrar' && (
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-texto-secundario">Nome</span>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-secundario" />
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl bg-bg-card border border-border pl-10 pr-3.5 py-3 text-sm text-texto outline-none focus:border-accent-cyan"
              />
            </div>
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-texto-secundario">E-mail</span>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-secundario" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@exemplo.com"
              className="w-full rounded-xl bg-bg-card border border-border pl-10 pr-3.5 py-3 text-sm text-texto outline-none focus:border-accent-cyan"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-texto-secundario">Senha</span>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-secundario" />
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-xl bg-bg-card border border-border pl-10 pr-3.5 py-3 text-sm text-texto outline-none focus:border-accent-cyan"
            />
          </div>
        </label>

        {erro && <p className="text-xs text-accent-red text-center">{erro}</p>}
        {avisoCadastro && <p className="text-xs text-accent-green text-center">{avisoCadastro}</p>}

        <button
          type="submit"
          disabled={!podeEnviar || enviando}
          className="mt-2 rounded-full bg-accent-cyan text-black font-semibold py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {enviando ? (
            <Loader2 size={16} className="animate-spin" />
          ) : modo === 'entrar' ? (
            <LogIn size={16} />
          ) : (
            <UserPlus size={16} />
          )}
          {modo === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-texto-secundario">ou continue com</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {PROVEDORES.map(({ id, nome, icone: Icone }) => (
          <button
            key={id}
            onClick={() => handleOAuth(id)}
            disabled={provedorEnviando !== null}
            aria-label={`Continuar com ${nome}`}
            className="flex items-center justify-center rounded-xl border border-border bg-bg-card py-3 disabled:opacity-50"
          >
            {provedorEnviando === id ? <Loader2 size={16} className="animate-spin text-texto-secundario" /> : <Icone />}
          </button>
        ))}
      </div>
    </div>
  )
}
