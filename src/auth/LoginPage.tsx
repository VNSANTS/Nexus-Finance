import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, Mail, Lock, User, LogIn, UserPlus, TrendingUp } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function LoginPage() {
  const { sessao, carregando, entrar, cadastrar } = useAuth()
  const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
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
    </div>
  )
}
