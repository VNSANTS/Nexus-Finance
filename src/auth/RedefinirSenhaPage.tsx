import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, Lock, ShieldCheck, TrendingUp } from 'lucide-react'
import { useAuth } from './AuthContext'

/**
 * Tela aberta pelo link do e-mail de "esqueci minha senha"
 * (supabase.auth.resetPasswordForEmail, ver AuthContext.tsx). O supabase-js
 * já processa o token que vem no hash da URL e cria uma sessão temporária
 * de recuperação sozinho, ao carregar a página — aqui só falta o formulário
 * pra trocar a senha de fato.
 */
export default function RedefinirSenhaPage() {
  const { sessao, carregando, atualizarSenha, sair } = useAuth()
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [concluido, setConcluido] = useState(false)

  // Sem sessão nenhuma (nem normal, nem de recuperação) — o link não é
  // válido pra essa pessoa agora (expirado, já usado, ou acesso direto sem
  // vir do e-mail). Manda pro login em vez de mostrar um formulário que só
  // vai dar erro ao enviar.
  if (!carregando && !sessao) return <Navigate to="/login" replace />

  const senhasBatem = senha.length >= 6 && senha === confirmarSenha
  const podeEnviar = senhasBatem && !enviando

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!podeEnviar) return
    setEnviando(true)
    setErro(null)

    const resultado = await atualizarSenha(senha)
    if (resultado.erro) {
      setErro(resultado.erro)
      setEnviando(false)
      return
    }

    setConcluido(true)
    setEnviando(false)
    // A sessão de recuperação criada pelo link não deve continuar valendo
    // como uma sessão normal — desloga pra pessoa entrar de novo já com a
    // senha nova, do jeito normal.
    setTimeout(() => sair(), 2500)
  }

  if (concluido) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center max-w-[420px] mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-accent-green/15 flex items-center justify-center mb-4">
          <ShieldCheck size={26} className="text-accent-green" />
        </div>
        <h1 className="font-display font-extrabold text-xl text-texto mb-1.5">Senha redefinida!</h1>
        <p className="text-sm text-texto-secundario">Já pode entrar com a sua senha nova. Levando você pro login…</p>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-10 max-w-[420px] mx-auto">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-accent-cyan/15 flex items-center justify-center">
          <TrendingUp size={26} className="text-accent-cyan" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-texto">Nova senha</h1>
        <p className="text-sm text-texto-secundario text-center">Escolha uma senha nova pra sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-texto-secundario">Nova senha</span>
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

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-texto-secundario">Confirmar nova senha</span>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-secundario" />
            <input
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              type="password"
              placeholder="Repita a senha"
              className="w-full rounded-xl bg-bg-card border border-border pl-10 pr-3.5 py-3 text-sm text-texto outline-none focus:border-accent-cyan"
            />
          </div>
        </label>

        {confirmarSenha.length > 0 && senha !== confirmarSenha && (
          <p className="text-xs text-accent-red text-center">As senhas não são iguais.</p>
        )}
        {erro && <p className="text-xs text-accent-red text-center">{erro}</p>}

        <button
          type="submit"
          disabled={!podeEnviar}
          className="mt-2 rounded-full bg-accent-cyan text-black font-semibold py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {enviando ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
          Salvar nova senha
        </button>
      </form>
    </div>
  )
}
