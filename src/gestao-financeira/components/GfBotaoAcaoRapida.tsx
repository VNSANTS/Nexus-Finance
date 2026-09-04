import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X, TrendingUp, TrendingDown, ArrowLeftRight, CreditCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'

interface Acao {
  id: string
  label: string
  Icon: LucideIcon
  cor: string
  x: number
  y: number
  destino: string
}

const RAIO_MAX_ANALOGICO = 22
const DELAY_ABRIR_MS = 220
const DISTANCIA_MINIMA_SELECAO = 18

const ACOES: Acao[] = [
  { id: 'receita', label: 'Receita', Icon: TrendingUp, cor: '#22C55E', x: -62, y: -168, destino: '/gestao-financeira/lancamentos/novo?tipo=receita' },
  { id: 'despesa-cartao', label: 'Despesa cartão', Icon: CreditCard, cor: '#00D4FF', x: 62, y: -168, destino: '/gestao-financeira/lancamentos/novo?tipo=despesa&forma=credito' },
  { id: 'transferencia', label: 'Transferência', Icon: ArrowLeftRight, cor: '#8B5CF6', x: -108, y: -76, destino: '/gestao-financeira/lancamentos/novo?tipo=transferencia' },
  { id: 'despesa', label: 'Despesa', Icon: TrendingDown, cor: '#EF4444', x: 108, y: -76, destino: '/gestao-financeira/lancamentos/novo?tipo=despesa' },
]

function anguloDoPonto(x: number, y: number) {
  return (Math.atan2(y, x) * 180) / Math.PI
}

function diferencaAngular(a: number, b: number) {
  let diff = Math.abs(a - b) % 360
  if (diff > 180) diff = 360 - diff
  return diff
}

function pegarPontoToque(e: TouchEvent | React.TouchEvent, identifier: number | null = null) {
  if (identifier !== null) {
    // Trava no dedo que iniciou o gesto. Sem isso, se um SEGUNDO dedo
    // tocasse a tela durante o arrasto (multi-touch acidental), touches[0]
    // podia passar a apontar para esse novo dedo — o cálculo de dx/dy
    // saltava para a posição do dedo errado de um frame para o outro,
    // fazendo a bolha selecionada "pular" ou o gesto parecer quebrado.
    const lista = e.touches.length > 0 ? e.touches : e.changedTouches
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].identifier === identifier) return { x: lista[i].clientX, y: lista[i].clientY }
    }
    return null
  }
  const t = e.touches[0] ?? e.changedTouches[0]
  return t ? { x: t.clientX, y: t.clientY } : null
}

// Botão "+" central da barra — chamado de "analógico" pelo Vinícius. Toque
// rápido navega direto para um novo lançamento. Pressionar e segurar abre
// um leque radial: o PRÓPRIO botão se inclina na direção do dedo, e a bolha
// mais próxima do ângulo apontado se destaca — soltar sempre seleciona a
// ação apontada.
//
// Ponto crítico de implementação (motivo de um bug de "às vezes para de
// funcionar, depois volta sozinho" corrigido aqui): os handlers de
// touchmove/touchend/touchcancel são registrados no `window` (não no
// botão), porque o dedo pode sair da área do elemento durante o arrasto.
// window.addEventListener/removeEventListener exigem a MESMA referência de
// função para remover corretamente — funções recriadas a cada render (sem
// estabilização) quebram essa remoção silenciosamente, porque o JS as
// trata como diferentes mesmo com corpo idêntico. O sintoma observado era
// o gesto funcionar, parar, e "voltar sozinho" de forma aparentemente
// aleatória — na real, cada gesto que abria e fechava o leque ia deixando
// para trás um listener "fantasma" grudado no window (nunca removido de
// verdade), e o comportamento dependia de qual desses fantasmas capturava
// o evento em cada tentativa seguinte.
//
// A correção guarda os handlers em uma ref (handlersRef): cada função é
// criada uma única vez e nunca muda de identidade, então a MESMA referência
// é sempre usada tanto para adicionar quanto para remover os listeners.
export default function GfBotaoAcaoRapida() {
  const { permissoes } = useGestaoFinanceira()
  const navigate = useNavigate()
  const location = useLocation()
  const [aberto, setAberto] = useState(false)
  const [acaoAtiva, setAcaoAtiva] = useState<string | null>(null)
  const [deslocAnalogico, setDeslocAnalogico] = useState({ x: 0, y: 0 })

  const origemPxRef = useRef<{ x: number; y: number } | null>(null)
  const identificadorToqueRef = useRef<number | null>(null)
  // abertoRef é a fonte da verdade lida por TODOS os handlers (incluindo o
  // sintético aoTocarFimRapido). Antes ela só era atualizada por um
  // useEffect reagindo a `aberto` — efeitos rodam depois do commit/pintura,
  // de forma assíncrona em relação ao instante exato de um setTimeout. Isso
  // abria uma janela real (poucos ms) onde: o timer de 220ms chamava
  // setAberto(true), mas o efeito ainda não tinha rodado quando um touchend
  // chegava logo em seguida (gesto bem na borda do delay). Como o
  // onTouchEnd sintético do React dispara ANTES do listener nativo
  // registrado no window (o bubble passa pela raiz de delegação do React
  // antes de chegar no window), aoTocarFimRapido lia abertoRef.current
  // ainda como false, tratava como "toque rápido", navegava para o destino
  // genérico e removia os listeners — MAS o setAberto(true) enfileirado
  // ainda ia aplicar um instante depois, abrindo o leque visualmente sem
  // nenhum listener de touchmove/touchend/touchcancel vivo. Resultado:
  // leque "fantasma" na tela, sem responder a nada, até o próximo toque do
  // zero. Agora abertoRef é escrita SINCRONAMENTE em todo lugar que chama
  // setAberto, então não existe mais essa janela — abertoRef.current
  // sempre reflete a decisão no exato instante em que foi tomada, nunca
  // depende do agendamento do efeito.
  const abertoRef = useRef(false)
  const acaoAtivaRef = useRef<string | null>(null)
  const timerAbrirRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerSegurancaRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const ouvintesAtivosRef = useRef(false)
  const navigateRef = useRef(navigate)

  const definirAberto = useCallback((valor: boolean) => {
    abertoRef.current = valor
    setAberto(valor)
  }, [])

  useEffect(() => {
    acaoAtivaRef.current = acaoAtiva
  }, [acaoAtiva])
  useEffect(() => {
    navigateRef.current = navigate
  }, [navigate])

  const limparTimers = useCallback(() => {
    if (timerAbrirRef.current) {
      clearTimeout(timerAbrirRef.current)
      timerAbrirRef.current = null
    }
    if (timerSegurancaRef.current) {
      clearTimeout(timerSegurancaRef.current)
      timerSegurancaRef.current = null
    }
  }, [])

  // resetarTudoRef é preenchida logo abaixo (depois de resetarTudo ser
  // definido) — os handlers em handlersRef chamam sempre via
  // resetarTudoRef.current(), nunca diretamente, para não precisar entrar
  // na lista de dependências e evitar recriação.
  const resetarTudoRef = useRef<() => void>(() => {})

  const removerOuvintes = useCallback(() => {
    // Incondicional de propósito: remover um listener que não está mais
    // registrado é no-op seguro no DOM. Depender só da flag
    // ouvintesAtivosRef.current para decidir se remove é o que permitia a
    // ref e o estado real do window ficarem dessincronizados (flag=true
    // sem o listener ter sido removido de fato, ou o contrário).
    window.removeEventListener('touchmove', handlersRef.current.mover)
    window.removeEventListener('touchend', handlersRef.current.soltar)
    window.removeEventListener('touchcancel', handlersRef.current.cancelar)
    ouvintesAtivosRef.current = false
  }, [])

  const resetarTudo = useCallback(() => {
    limparTimers()
    definirAberto(false)
    setAcaoAtiva(null)
    setDeslocAnalogico({ x: 0, y: 0 })
    origemPxRef.current = null
    identificadorToqueRef.current = null
    removerOuvintes()
  }, [limparTimers, removerOuvintes, definirAberto])

  useEffect(() => {
    resetarTudoRef.current = resetarTudo
  }, [resetarTudo])

  // Handlers guardados em ref: cada um é definido uma única vez (na
  // primeira renderização) e nunca muda de identidade — garante que
  // add/removeEventListener sempre operem sobre a mesma referência.
  const handlersRef = useRef({
    mover: (e: TouchEvent) => {
      if (!origemPxRef.current || identificadorToqueRef.current === null) return
      const ponto = pegarPontoToque(e, identificadorToqueRef.current)
      if (!ponto) return

      // Timer de segurança (4s) é reiniciado a cada touchmove real: antes
      // ele era um prazo FIXO a partir do touchstart, então se o usuário
      // segurasse o leque aberto "estudando" as opções por mais de 4s
      // (comum em quem tá usando o gesto pela primeira vez), o reset
      // forçado disparava com o dedo ainda na tela — fechava tudo e
      // removia os listeners do window por baixo do dedo. Depois disso o
      // dedo continuava encostado mas nenhum evento tinha mais efeito
      // (nada fora removerOuvintes já rodou), o que parecia exatamente
      // "trava, não faz nada" até o usuário soltar e tocar de novo. Agora
      // o prazo é de INATIVIDADE (sem movimento), não de duração total do
      // toque, então segurar decidindo não derruba mais o leque sozinho.
      if (timerSegurancaRef.current) clearTimeout(timerSegurancaRef.current)
      timerSegurancaRef.current = setTimeout(() => resetarTudoRef.current(), 4000)

      const dx = ponto.x - origemPxRef.current.x
      const dy = ponto.y - origemPxRef.current.y

      // Corrige dessincronia: antes, se o dedo se movesse ANTES do leque
      // abrir (delay de DELAY_ABRIR_MS), o cálculo de deslocamento/bolha
      // ativa era pulado inteiramente (só rodava dentro do `if
      // (abertoRef.current)`). Resultado: o leque podia abrir já com o
      // dedo longe da origem, sem nenhuma bolha destacada até o PRÓXIMO
      // touchmove — parecia "travado" no instante da abertura. Agora o
      // deslocamento é sempre recalculado; só a decisão de qual bolha
      // destacar/preventDefault fica condicionada a `aberto`, então o
      // leque já nasce sincronizado com a posição real do dedo.
      const distTotal = Math.hypot(dx, dy)
      const fator = distTotal > 0 ? Math.min(1, RAIO_MAX_ANALOGICO / distTotal) : 0
      setDeslocAnalogico({ x: dx * fator, y: dy * fator })

      if (!abertoRef.current) return

      e.preventDefault()

      if (distTotal < DISTANCIA_MINIMA_SELECAO) {
        setAcaoAtiva(null)
        return
      }

      const anguloDedo = (Math.atan2(dy, dx) * 180) / Math.PI
      let maisProxima = ACOES[0]
      let menorDiferenca = Infinity
      for (const acao of ACOES) {
        const diff = diferencaAngular(anguloDedo, anguloDoPonto(acao.x, acao.y))
        if (diff < menorDiferenca) {
          menorDiferenca = diff
          maisProxima = acao
        }
      }
      setAcaoAtiva(maisProxima.id)
    },
    soltar: (e: TouchEvent) => {
      // Confere se o dedo que soltou é o MESMO que iniciou o gesto — sem
      // isso, se um segundo dedo tocasse e soltasse a tela durante o
      // arrasto (ex: rolando com a outra mão), esse touchend do dedo
      // errado fechava o leque no meio do gesto do dedo certo.
      if (identificadorToqueRef.current !== null) {
        const aindaTem = Array.from(e.changedTouches).some(
          (t) => t.identifier === identificadorToqueRef.current,
        )
        if (!aindaTem) return
      }
      if (abertoRef.current) {
        const acao = ACOES.find((a) => a.id === acaoAtivaRef.current)
        resetarTudoRef.current()
        if (acao) navigateRef.current(acao.destino)
      } else {
        resetarTudoRef.current()
      }
    },
    cancelar: (e: TouchEvent) => {
      if (identificadorToqueRef.current !== null) {
        const aindaTem = Array.from(e.changedTouches).some(
          (t) => t.identifier === identificadorToqueRef.current,
        )
        if (!aindaTem) return
      }
      resetarTudoRef.current()
    },
  })

  useEffect(() => limparTimers, [limparTimers])

  // Fecha o leque/limpa listeners quando a ROTA muda por qualquer motivo
  // externo (ex: back do navegador, link em outro lugar da tela). Guard
  // extra: só age se não há um toque físico em andamento nesse exato
  // instante (origemPxRef preenchida) — sem isso, um touchstart que
  // aconteça bem no instante da troca de rota (ex: navegação da própria
  // ação selecionada, ou o dedo ainda encostado quando a tela troca) podia
  // ter seus listeners recém-registrados derrubados por este effect antes
  // do usuário completar o gesto, fazendo o botão "não responder" até o
  // próximo toque do zero.
  useEffect(() => {
    if (origemPxRef.current) return
    if (abertoRef.current || ouvintesAtivosRef.current) {
      resetarTudo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search])

  const aoTocarInicio = useCallback((e: React.TouchEvent) => {
    const toque = e.changedTouches[0]
    if (!toque) return
    origemPxRef.current = { x: toque.clientX, y: toque.clientY }
    identificadorToqueRef.current = toque.identifier

    if (!ouvintesAtivosRef.current) {
      window.addEventListener('touchmove', handlersRef.current.mover, { passive: false })
      window.addEventListener('touchend', handlersRef.current.soltar)
      window.addEventListener('touchcancel', handlersRef.current.cancelar)
      ouvintesAtivosRef.current = true
    }

    timerAbrirRef.current = setTimeout(() => definirAberto(true), DELAY_ABRIR_MS)
    timerSegurancaRef.current = setTimeout(() => resetarTudoRef.current(), 4000)
  }, [definirAberto])

  const aoTocarFimRapido = useCallback(
    (e: React.TouchEvent) => {
      // CRÍTICO: quando o leque está aberto, o touchend já é 100% tratado
      // pelo listener global (handlersRef.current.soltar, registrado no
      // window). Esse handler local do botão só deve agir no caminho de
      // "toque rápido" (leque nunca abriu) — se ele também chamasse
      // resetarTudo aqui, os dois handlers (o do window, nativo, e este,
      // sintético do React) disparavam em ordem não garantida e competiam
      // pelo mesmo reset: um zerava o estado antes do outro ler qual bolha
      // estava ativa, então a navegação da ação selecionada às vezes não
      // acontecia e, pior, o "toque rápido" podia disparar por engano
      // (navigate para novo lançamento) no meio da animação de saída do
      // overlay — travando a tela até a exit-animation do Framer Motion
      // resolver sozinha. Por isso: se o leque já abriu, este handler não
      // faz NADA, deixa o window cuidar de tudo.
      if (abertoRef.current) return
      limparTimers()
      removerOuvintes()
      e.preventDefault()
      navigate('/gestao-financeira/lancamentos/novo')
    },
    [navigate, limparTimers, removerOuvintes],
  )

  // Perfil sem permissão de lançar (ex.: Visualizador): o FAB inteiro some.
  // Não faz sentido desabilitar visualmente um botão de "ação rápida" —
  // se a ação não é permitida, ela simplesmente não aparece.
  if (!permissoes.lancar) return null

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {aberto && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetarTudo}
                className="fixed inset-0 z-[9990]"
                style={{ background: 'var(--cor-overlay)' }}
              />

              <div
                className="fixed z-[9995] pointer-events-none left-1/2 -translate-x-1/2"
                style={{ bottom: 'calc(12px + env(safe-area-inset-bottom) + 34px)' }}
              >
                {ACOES.map((acao) => {
                  const ativa = acaoAtiva === acao.id
                  return (
                    <motion.div
                      key={acao.id}
                      initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: acao.x, y: acao.y }}
                      exit={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform"
                        style={{
                          background: ativa ? acao.cor : '#141C31',
                          border: ativa ? 'none' : `1.5px solid ${acao.cor}66`,
                          transform: ativa ? 'scale(1.18)' : 'scale(1)',
                        }}
                      >
                        <acao.Icon size={22} className={ativa ? 'text-bg' : 'text-white'} strokeWidth={2.2} />
                      </div>
                      {ativa && (
                        <span
                          className="text-[10.5px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded-md"
                          style={{ color: acao.cor, background: '#05070Dcc' }}
                        >
                          {acao.label}
                        </span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <button
        ref={botaoRef}
        onTouchStart={aoTocarInicio}
        onTouchEnd={aoTocarFimRapido}
        onClick={(e) => {
          // Guarda só para acesso via mouse/desktop (sem eventos touch).
          // Em touch devices o navegador dispara um click sintético logo
          // após o touchend, que já tratou tudo — sem esse preventDefault
          // ali em cima (e.preventDefault() no touchend) o click sintético
          // duplicava a navegação em toques rápidos.
          if ('ontouchstart' in window) return
          if (!abertoRef.current) navigate('/gestao-financeira/lancamentos/novo')
        }}
        aria-label="Ações rápidas de lançamento — toque para novo lançamento, segure para mais opções"
        className={`relative w-[56px] h-[56px] -mt-5 rounded-full flex items-center justify-center touch-none active:scale-95 transition-transform ${aberto ? 'z-[9999]' : 'z-[80]'}`}
        style={{ background: 'linear-gradient(135deg, #00D4FF, #8B5CF6)', padding: 3.5 }}
      >
        <span className="w-full h-full rounded-full bg-bg flex items-center justify-center overflow-hidden">
          {aberto ? (
            <motion.span animate={{ x: deslocAnalogico.x, y: deslocAnalogico.y }} transition={{ type: 'tween', duration: 0.05 }}>
              <X size={22} className="text-white" strokeWidth={2.2} />
            </motion.span>
          ) : (
            <Plus size={24} className="text-white" strokeWidth={2.2} />
          )}
        </span>
      </button>
    </>
  )
}
