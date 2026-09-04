import { useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { verificarPin } from '../seguranca'
import GfTecladoPin from './GfTecladoPin'

const MAX_TENTATIVAS_ANTES_DE_ESPERAR = 5
const ESPERA_MS = 30_000

// Efeito real da preferência "Bloqueio por PIN" (tela Segurança): cobre a
// Gestão Financeira inteira com uma tela de PIN até a pessoa acertar o
// código. Duas situações abrem o bloqueio:
// 1) Carregar o app do zero, se "Bloquear ao abrir o app" estiver ligado.
// 2) Voltar de outro app/aba, se "Bloquear ao voltar de outro app" estiver
//    ligado e o tempo fora passar da tolerância configurada
//    (tempoAutoBloqueio) — mesmo mecanismo de visibilitychange já usado em
//    GfPrivacyOverlay.tsx, mas aqui exige o PIN de verdade, não é só um véu
//    visual com "toque pra continuar".
// Diferente do GfPrivacyOverlay (z-[999], translúcido), este cobre com fundo
// sólido e fica acima dele (z-[1000]) — quando o PIN está ativo, ele é a
// trava que manda.
export default function GfBloqueioOverlay() {
  const { estado, definirPreferenciasSeguranca } = useGestaoFinanceira()
  const prefs = estado.preferenciasSeguranca

  const [bloqueado, setBloqueado] = useState(() => prefs.pinAtivo && prefs.bloquearAoAbrirApp)
  const [pin, setPin] = useState('')
  const [erro, setErro] = useState(false)
  const [tentativas, setTentativas] = useState(0)
  const [esperandoAte, setEsperandoAte] = useState<number | null>(null)
  const [segundosRestantes, setSegundosRestantes] = useState(0)
  const [confirmandoEsquecimento, setConfirmandoEsquecimento] = useState(false)
  const saidaEmRef = useRef<number | null>(null)
  const verificandoRef = useRef(false)

  // Ficou fora / voltou. Só relevante se o PIN estiver ativo.
  useEffect(() => {
    if (!prefs.pinAtivo) return
    function aoMudarVisibilidade() {
      if (document.visibilityState === 'hidden') {
        saidaEmRef.current = Date.now()
        return
      }
      if (document.visibilityState !== 'visible') return
      const saida = saidaEmRef.current
      saidaEmRef.current = null
      if (saida === null || !prefs.bloquearAoTrocarDeApp) return
      const minutosFora = (Date.now() - saida) / 60_000
      if (minutosFora >= prefs.tempoAutoBloqueio) {
        setPin('')
        setBloqueado(true)
      }
    }
    document.addEventListener('visibilitychange', aoMudarVisibilidade)
    return () => document.removeEventListener('visibilitychange', aoMudarVisibilidade)
  }, [prefs.pinAtivo, prefs.bloquearAoTrocarDeApp, prefs.tempoAutoBloqueio])

  // Contagem regressiva do "muitas tentativas erradas, espera um pouco".
  useEffect(() => {
    if (esperandoAte === null) return
    const id = setInterval(() => {
      const restante = Math.ceil((esperandoAte - Date.now()) / 1000)
      if (restante <= 0) {
        setEsperandoAte(null)
        setSegundosRestantes(0)
        setTentativas(0)
      } else {
        setSegundosRestantes(restante)
      }
    }, 250)
    return () => clearInterval(id)
  }, [esperandoAte])

  const tamanho = prefs.pinTamanho ?? 4

  // Confere o PIN assim que a pessoa termina de digitar todos os dígitos.
  useEffect(() => {
    if (!bloqueado || pin.length !== tamanho || verificandoRef.current) return
    if (!prefs.pinHash || !prefs.pinSalt) {
      // Estado inconsistente (PIN marcado como ativo sem hash salvo) — não
      // trava a pessoa fora do próprio app por causa de um bug de dados.
      setBloqueado(false)
      return
    }
    verificandoRef.current = true
    verificarPin(pin, prefs.pinSalt, prefs.pinHash).then((ok) => {
      verificandoRef.current = false
      if (ok) {
        setBloqueado(false)
        setPin('')
        setErro(false)
        setTentativas(0)
        return
      }
      setErro(true)
      setPin('')
      setTentativas((t) => {
        const novo = t + 1
        if (novo >= MAX_TENTATIVAS_ANTES_DE_ESPERAR) setEsperandoAte(Date.now() + ESPERA_MS)
        return novo
      })
      setTimeout(() => setErro(false), 450)
    })
  }, [pin, bloqueado, tamanho, prefs.pinHash, prefs.pinSalt])

  function aoConfirmarEsquecimento() {
    definirPreferenciasSeguranca({ pinAtivo: false, pinHash: null, pinSalt: null, pinTamanho: null })
    setConfirmandoEsquecimento(false)
    setBloqueado(false)
    setPin('')
  }

  if (!prefs.pinAtivo || !bloqueado) return null

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-6 bg-bg px-6">
      <div className="w-14 h-14 rounded-2xl bg-accent-cyan/15 flex items-center justify-center">
        <Lock size={26} className="text-accent-cyan" />
      </div>
      <div className="text-center">
        <p className="text-[15px] font-bold text-white">Gestão Financeira bloqueada</p>
        <p className="text-[11.5px] text-slate-500 mt-1">
          {esperandoAte ? `Muitas tentativas erradas — tente de novo em ${segundosRestantes}s` : 'Digite seu PIN pra continuar'}
        </p>
      </div>

      <GfTecladoPin valor={pin} tamanho={tamanho} onMudar={setPin} erro={erro} desabilitado={!!esperandoAte} />

      {!confirmandoEsquecimento ? (
        <button onClick={() => setConfirmandoEsquecimento(true)} className="text-[11.5px] text-slate-500 underline mt-1">
          Esqueci meu PIN
        </button>
      ) : (
        <div className="max-w-[280px] flex flex-col gap-2.5 items-center">
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Isso remove a trava de PIN — seus dados financeiros continuam salvos normalmente. Você pode configurar um PIN
            novo depois, em Segurança.
          </p>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setConfirmandoEsquecimento(false)}
              className="flex-1 rounded-xl py-2 text-[11.5px] font-semibold text-slate-300 card-surface border border-border"
            >
              Cancelar
            </button>
            <button onClick={aoConfirmarEsquecimento} className="flex-1 rounded-xl py-2 text-[11.5px] font-bold text-white bg-accent-red">
              Remover PIN
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
