import { useState } from 'react'
import { useAuth } from '@/auth/AuthContext'
import { ativarAvisosRemotos, avisosRemotosAutorizados, avisosRemotosDisponiveis, desvincularAvisosRemotos } from '@/lib/notificacoesRemotas'

export default function PreferenciaAvisosAtualizacao() {
  const { sessao, perfil } = useAuth()
  const id = sessao?.user.id
  if (!id || perfil?.id !== id || perfil.status !== 'ativo' || !avisosRemotosDisponiveis()) return null
  return <Preferencia key={id} conta={id} />
}

function Preferencia({ conta }: { conta: string }) {
  const [ativo, setAtivo] = useState(() => avisosRemotosAutorizados(conta))
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function alternar() {
    setEnviando(true)
    setErro('')
    try {
      if (ativo) await desvincularAvisosRemotos(conta, true)
      else await ativarAvisosRemotos(conta)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível atualizar sua preferência.')
    } finally {
      setAtivo(avisosRemotosAutorizados(conta))
      setEnviando(false)
    }
  }

  return (
    <div className="rounded-xl border border-border p-3">
      <button type="button" role="switch" aria-checked={ativo} aria-label="Avisos gerais de atualização" disabled={enviando} onClick={alternar} className="flex w-full items-center justify-between gap-3 text-left disabled:opacity-60">
        <span>
          <span className="block text-xs font-semibold text-texto">Avisos gerais de atualização</span>
          <span className="mt-1 block text-[11px] text-texto-secundario">Receba avisos de novas versões neste dispositivo.</span>
        </span>
        <span aria-hidden="true" className={ativo ? 'text-xs font-semibold text-accent-cyan' : 'text-xs text-texto-secundario'}>{ativo ? 'Ativado' : 'Desativado'}</span>
      </button>
      {erro && <p role="alert" className="mt-2 text-[11px] text-accent-red">{erro}</p>}
    </div>
  )
}
