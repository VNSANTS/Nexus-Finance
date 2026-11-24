import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronLeft,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Loader2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'

export default function PrivacidadeSegurancaPage() {
  const navigate = useNavigate()
  const { sessao, alterarSenhaComSenhaAtual, resetarSenha, encerrarOutrasSessoes } = useAuth()
  const email = sessao?.user.email ?? ''
  const providers = sessao?.user.app_metadata.providers
  const podeTrocarSenha = sessao?.user.app_metadata.provider === 'email' || (Array.isArray(providers) && providers.includes('email'))

  const [senhaAtual, setSenhaAtual] = useState('')
  const [senhaNova, setSenhaNova] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenhas, setMostrarSenhas] = useState(false)
  const [salvandoSenha, setSalvandoSenha] = useState(false)
  const [erroSenha, setErroSenha] = useState<string | null>(null)
  const [sucessoSenha, setSucessoSenha] = useState<string | null>(null)
  const [enviandoReset, setEnviandoReset] = useState(false)
  const [avisoReset, setAvisoReset] = useState<string | null>(null)
  const [erroSessoes, setErroSessoes] = useState<string | null>(null)
  const [sucessoSessoes, setSucessoSessoes] = useState(false)
  const [confirmandoSessoes, setConfirmandoSessoes] = useState(false)
  const [encerrandoSessoes, setEncerrandoSessoes] = useState(false)

  async function aoAlterarSenha(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErroSenha(null)
    setSucessoSenha(null)

    if (senhaNova.length < 8) {
      setErroSenha('A nova senha precisa ter pelo menos 8 caracteres.')
      return
    }
    if (senhaNova !== confirmarSenha) {
      setErroSenha('A confirmação não corresponde à nova senha.')
      return
    }
    if (senhaNova === senhaAtual) {
      setErroSenha('Escolha uma senha diferente da atual.')
      return
    }

    setSalvandoSenha(true)
    try {
      const resultado = await alterarSenhaComSenhaAtual(senhaAtual, senhaNova)
      if (resultado.erro) {
        setErroSenha(resultado.erro)
        return
      }
      setSenhaAtual('')
      setSenhaNova('')
      setConfirmarSenha('')
      setSucessoSenha('Senha alterada com sucesso.')
    } catch {
      setErroSenha('Não foi possível alterar a senha agora. Tente novamente.')
    } finally {
      setSalvandoSenha(false)
    }
  }

  async function aoPedirRedefinicao() {
    if (!email || enviandoReset) return
    setEnviandoReset(true)
    setAvisoReset(null)
    const resultado = await resetarSenha(email)
    setAvisoReset(resultado.erro ?? 'Se esse e-mail puder redefinir senha, enviaremos um link para ele.')
    setEnviandoReset(false)
  }

  async function aoEncerrarOutrasSessoes() {
    setErroSessoes(null)
    setSucessoSessoes(false)
    setEncerrandoSessoes(true)
    try {
      const resultado = await encerrarOutrasSessoes()
      if (resultado.erro) {
        setErroSessoes(resultado.erro)
        return
      }
      setSucessoSessoes(true)
      setConfirmandoSessoes(false)
    } catch {
      setErroSessoes('Não foi possível encerrar as outras sessões. Tente novamente.')
    } finally {
      setEncerrandoSessoes(false)
    }
  }

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/perfil')} className="mb-3.5 flex items-center gap-1 text-[13px] font-semibold text-slate-400">
        <ChevronLeft size={16} /> Perfil
      </button>

      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-2xl bg-accent-green/15">
          <ShieldCheck size={19} className="text-accent-green" />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white">Privacidade e segurança</h1>
          <p className="mt-0.5 text-[11px] text-slate-500">Conta, senha e sessões</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <section className="card-surface flex flex-col gap-3.5 rounded-2xl p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/15">
              <KeyRound size={15} className="text-accent-cyan" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[13.5px] font-semibold text-white">Senha da conta</h2>
              <p className="truncate text-[10.5px] text-slate-500">{email || 'Conta conectada'}</p>
            </div>
          </div>

          {podeTrocarSenha ? (
            <form onSubmit={aoAlterarSenha} className="flex flex-col gap-3">
              {sucessoSenha && <Aviso tipo="sucesso" texto={sucessoSenha} />}
              {erroSenha && <Aviso tipo="erro" texto={erroSenha} />}

              <CampoSenha label="Senha atual" value={senhaAtual} onChange={setSenhaAtual} mostrar={mostrarSenhas} autoComplete="current-password" />
              <CampoSenha label="Nova senha" value={senhaNova} onChange={setSenhaNova} mostrar={mostrarSenhas} autoComplete="new-password" />
              <CampoSenha label="Confirme a nova senha" value={confirmarSenha} onChange={setConfirmarSenha} mostrar={mostrarSenhas} autoComplete="new-password" />

              <button type="button" onClick={() => setMostrarSenhas((atual) => !atual)} className="flex items-center gap-1.5 self-start text-[11px] text-slate-400">
                {mostrarSenhas ? <EyeOff size={14} /> : <Eye size={14} />}
                {mostrarSenhas ? 'Ocultar senhas' : 'Mostrar senhas'}
              </button>
              <p className="text-[10.5px] leading-relaxed text-slate-500">Use uma senha única com pelo menos 8 caracteres. Sua senha atual é verificada antes da troca.</p>
              <button type="submit" disabled={salvandoSenha || !senhaAtual || !senhaNova || !confirmarSenha} className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-cyan py-2.5 text-[12px] font-bold text-black disabled:opacity-50">
                {salvandoSenha ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
                {salvandoSenha ? 'Salvando...' : 'Alterar senha'}
              </button>
              <button type="button" onClick={aoPedirRedefinicao} disabled={enviandoReset || !email} className="self-center text-[11px] font-semibold text-accent-cyan disabled:opacity-50">
                {enviandoReset ? 'Enviando link...' : 'Esqueci minha senha atual'}
              </button>
              {avisoReset && <p role="status" className="text-center text-[10.5px] text-slate-400">{avisoReset}</p>}
            </form>
          ) : (
            <p className="text-[11.5px] leading-relaxed text-slate-400">Sua entrada usa um provedor externo. A senha é gerenciada nas configurações desse provedor.</p>
          )}
        </section>

        <section className="card-surface flex flex-col gap-3 rounded-2xl p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-green/15">
              <Smartphone size={15} className="text-accent-green" />
            </div>
            <div>
              <h2 className="text-[13.5px] font-semibold text-white">Sessões em outros aparelhos</h2>
              <p className="text-[10.5px] text-slate-500">Mantenha somente este aparelho conectado</p>
            </div>
          </div>

          {sucessoSessoes && <Aviso tipo="sucesso" texto="As outras sessões foram encerradas. Este aparelho continua conectado." />}
          {erroSessoes && <Aviso tipo="erro" texto={erroSessoes} />}

          {!confirmandoSessoes ? (
            <button type="button" onClick={() => setConfirmandoSessoes(true)} className="w-full rounded-xl border border-border py-2.5 text-[12px] font-semibold text-white">
              Encerrar outras sessões
            </button>
          ) : (
            <div className="flex flex-col gap-2 rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-yellow-400" />
                <p className="text-[10.5px] leading-relaxed text-slate-300">Os outros aparelhos perderão a sessão quando o token for renovado. Este aparelho permanecerá conectado.</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConfirmandoSessoes(false)} disabled={encerrandoSessoes} className="flex-1 rounded-xl border border-border py-2 text-[11px] font-semibold text-slate-300">Cancelar</button>
                <button type="button" onClick={aoEncerrarOutrasSessoes} disabled={encerrandoSessoes} className="flex-1 rounded-xl bg-accent-red py-2 text-[11px] font-bold text-white disabled:opacity-50">
                  {encerrandoSessoes ? 'Encerrando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          )}
        </section>

        <button type="button" onClick={() => navigate('/notificacoes')} className="card-surface flex w-full items-center gap-3 rounded-2xl p-3.5 text-left">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
            <Bell size={17} className="text-accent-gold" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-semibold text-white">Preferências de notificações</p>
            <p className="text-[10.5px] text-slate-500">Revise quais avisos o app pode mostrar</p>
          </div>
          <ChevronLeft size={15} className="rotate-180 text-slate-500" />
        </button>

        <div className="flex items-center justify-center gap-4 py-1 text-[10.5px] text-slate-500">
          <a className="flex items-center gap-1 underline" href={`${import.meta.env.BASE_URL}privacy-policy.html`}>
            <FileText size={12} /> Política de Privacidade
          </a>
          <a className="underline" href={`${import.meta.env.BASE_URL}termos-de-uso.html`}>Termos de Uso</a>
        </div>
      </div>
    </div>
  )
}

function CampoSenha({
  label,
  value,
  onChange,
  mostrar,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  mostrar: boolean
  autoComplete: 'current-password' | 'new-password'
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-medium text-slate-300">{label}</span>
      <input
        type={mostrar ? 'text' : 'password'}
        autoComplete={autoComplete}
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        minLength={autoComplete === 'new-password' ? 8 : undefined}
        required
        className="w-full rounded-xl border border-border bg-[#0B1220] px-3 py-2.5 text-[12px] text-white outline-none focus:border-accent-cyan"
      />
    </label>
  )
}

function Aviso({ tipo, texto }: { tipo: 'sucesso' | 'erro'; texto: string }) {
  const sucesso = tipo === 'sucesso'
  return (
    <div role={sucesso ? 'status' : 'alert'} className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${sucesso ? 'border-accent-green/30 bg-accent-green/10' : 'border-accent-red/30 bg-accent-red/10'}`}>
      {sucesso && <Check size={14} className="shrink-0 text-accent-green" />}
      <p className={`text-[11.5px] ${sucesso ? 'text-accent-green' : 'text-accent-red'}`}>{texto}</p>
    </div>
  )
}
