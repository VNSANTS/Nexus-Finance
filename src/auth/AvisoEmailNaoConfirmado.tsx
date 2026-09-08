import { useState } from 'react'
import { MailWarning, Loader2 } from 'lucide-react'
import { useAuth } from './AuthContext'

const COOLDOWN_MS = 60_000 // evita a pessoa clicar "reenviar" várias vezes seguidas e estourar o rate limit do Supabase

/**
 * Banner fixo no topo do app enquanto o e-mail da conta não foi confirmado
 * — `sessao.user.email_confirmed_at` já vem de graça na própria sessão
 * (dado do próprio usuário, não precisa de Edge Function pra isso, ao
 * contrário da versão que o admin vê de outros usuários). Some sozinho
 * assim que a pessoa confirma (o onAuthStateChange do AuthContext atualiza
 * a sessão quando ela volta pro app depois de clicar no link do e-mail).
 */
export default function AvisoEmailNaoConfirmado() {
  const { sessao, reenviarConfirmacaoPropria } = useAuth()
  const [enviando, setEnviando] = useState(false)
  const [enviadoEm, setEnviadoEm] = useState<number | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  if (!sessao || sessao.user.email_confirmed_at) return null

  const emCooldown = enviadoEm !== null && Date.now() - enviadoEm < COOLDOWN_MS

  async function handleReenviar() {
    if (enviando || emCooldown) return
    setEnviando(true)
    setErro(null)
    const resultado = await reenviarConfirmacaoPropria()
    if (resultado.erro) setErro(resultado.erro)
    else setEnviadoEm(Date.now())
    setEnviando(false)
  }

  return (
    <div className="bg-accent-gold/10 border-b border-accent-gold/25 px-4 py-2.5 flex flex-col gap-1">
      <div className="flex items-center gap-2.5">
        <MailWarning size={15} className="text-accent-gold shrink-0" />
        <p className="text-[11.5px] text-texto flex-1 min-w-0">
          Confirme seu e-mail ({sessao.user.email}) — verifique sua caixa de entrada e o spam.
        </p>
        <button
          onClick={handleReenviar}
          disabled={enviando || emCooldown}
          className="text-[11px] font-semibold text-accent-gold shrink-0 disabled:opacity-50 flex items-center gap-1"
        >
          {enviando && <Loader2 size={11} className="animate-spin" />}
          {emCooldown ? 'Enviado!' : 'Reenviar'}
        </button>
      </div>
      {erro && <p className="text-[10.5px] text-accent-red pl-[23px]">{erro}</p>}
    </div>
  )
}
