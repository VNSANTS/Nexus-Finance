import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'

// Efeito real (não decorativo) da preferência "Ocultar valores ao trocar
// de app" da tela Privacidade: escuta o visibilitychange do navegador e,
// se a preferência estiver ativa, cobre a tela toda com um blur ao
// perceber que o app saiu de foco (troca de aba/app, minimizar). Some de
// novo só quando a pessoa toca em "Continuar", como nos apps de banco.
// Não é uma trava de segurança de verdade (não pede PIN) — é só um véu
// visual pra alguém olhando por cima do ombro não ver valores na hora
// de voltar pro app. PIN/biometria de fato é escopo da tela Segurança.
export default function GfPrivacyOverlay() {
  const { estado } = useGestaoFinanceira()
  const ativo = estado.preferenciasPrivacidade.ocultarAoTrocarDeApp
  const [bloqueado, setBloqueado] = useState(false)

  useEffect(() => {
    if (!ativo) {
      setBloqueado(false)
      return
    }
    function aoMudarVisibilidade() {
      if (document.visibilityState === 'hidden') setBloqueado(true)
    }
    document.addEventListener('visibilitychange', aoMudarVisibilidade)
    return () => document.removeEventListener('visibilitychange', aoMudarVisibilidade)
  }, [ativo])

  if (!ativo || !bloqueado) return null

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 backdrop-blur-2xl bg-bg/92 px-6">
      <div className="w-14 h-14 rounded-2xl bg-accent-cyan/15 flex items-center justify-center">
        <ShieldCheck size={26} className="text-accent-cyan" />
      </div>
      <p className="text-[13.5px] font-semibold text-white text-center">Seus valores estão protegidos</p>
      <p className="text-[11px] text-slate-500 text-center max-w-[240px]">
        Ativado em Privacidade → Ocultar valores ao trocar de app
      </p>
      <button
        onClick={() => setBloqueado(false)}
        className="mt-1 px-6 py-2.5 rounded-xl bg-accent-cyan text-[#04121A] text-[12.5px] font-bold"
      >
        Toque para continuar
      </button>
    </div>
  )
}
