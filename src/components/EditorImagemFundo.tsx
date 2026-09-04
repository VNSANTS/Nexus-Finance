import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { AjusteFoto } from '@/types'

interface Props {
  imagemUrl: string
  ajusteInicial: AjusteFoto | null
  opacidade: number // 0–100, só pra pré-visualizar com a opacidade real escolhida
  onSalvar: (ajuste: AjusteFoto) => void
  onCancelar: () => void
}

const AJUSTE_PADRAO: AjusteFoto = { zoom: 1, deslocX: 0, deslocY: 0, rotacaoGraus: 0 }

function distancia(t1: React.Touch, t2: React.Touch) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
}

function anguloEntre(t1: React.Touch, t2: React.Touch) {
  return (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI
}

// Editor de fundo em tela cheia — mesma mecânica de gestos do
// EditorFotoPerfil.tsx (um dedo arrasta / pinça dá zoom / dois dedos giram),
// mas sem a máscara circular: aqui a tela inteira já É o "recorte" (é
// literalmente como o fundo vai ficar atrás do conteúdo do app depois de
// salvo), então o preview já mostra o resultado final, sem overlay
// escurecendo nada em volta.
export default function EditorImagemFundo({ imagemUrl, ajusteInicial, opacidade, onSalvar, onCancelar }: Props) {
  const [ajuste, setAjuste] = useState<AjusteFoto>(ajusteInicial ?? AJUSTE_PADRAO)
  const containerRef = useRef<HTMLDivElement>(null)
  const gestoRef = useRef<{
    modo: 'pan' | 'pinca' | null
    ultimoX: number
    ultimoY: number
    ultimaDistancia: number
    ultimoAngulo: number
  }>({ modo: null, ultimoX: 0, ultimoY: 0, ultimaDistancia: 0, ultimoAngulo: 0 })

  const aoTocarInicio = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      gestoRef.current.modo = 'pan'
      gestoRef.current.ultimoX = e.touches[0].clientX
      gestoRef.current.ultimoY = e.touches[0].clientY
    } else if (e.touches.length === 2) {
      gestoRef.current.modo = 'pinca'
      gestoRef.current.ultimaDistancia = distancia(e.touches[0], e.touches[1])
      gestoRef.current.ultimoAngulo = anguloEntre(e.touches[0], e.touches[1])
    }
  }, [])

  const aoTocarMover = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const g = gestoRef.current
    // Referência em px pra converter o arrasto em %, igual o
    // EditorFotoPerfil faz com o diâmetro do círculo — aqui é a altura do
    // próprio editor (tela cheia), medida de verdade em vez de um valor
    // fixo, já que a proporção da tela varia muito mais entre aparelhos do
    // que o tamanho de um círculo de avatar.
    const altura = containerRef.current?.clientHeight || 600

    if (g.modo === 'pan' && e.touches.length === 1) {
      const dx = e.touches[0].clientX - g.ultimoX
      const dy = e.touches[0].clientY - g.ultimoY
      g.ultimoX = e.touches[0].clientX
      g.ultimoY = e.touches[0].clientY
      setAjuste((a) => ({
        ...a,
        deslocX: a.deslocX + (dx / altura) * 100,
        deslocY: a.deslocY + (dy / altura) * 100,
      }))
    } else if (g.modo === 'pinca' && e.touches.length === 2) {
      const novaDistancia = distancia(e.touches[0], e.touches[1])
      const novoAngulo = anguloEntre(e.touches[0], e.touches[1])
      const fatorZoom = novaDistancia / (g.ultimaDistancia || novaDistancia)
      const deltaAngulo = novoAngulo - g.ultimoAngulo
      g.ultimaDistancia = novaDistancia
      g.ultimoAngulo = novoAngulo
      setAjuste((a) => ({
        ...a,
        zoom: Math.min(4, Math.max(0.5, a.zoom * fatorZoom)),
        rotacaoGraus: a.rotacaoGraus + deltaAngulo,
      }))
    }
  }, [])

  const aoTocarFim = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      gestoRef.current.modo = null
    } else if (e.touches.length === 1) {
      gestoRef.current.modo = 'pan'
      gestoRef.current.ultimoX = e.touches[0].clientX
      gestoRef.current.ultimoY = e.touches[0].clientY
    }
  }, [])

  function resetar() {
    setAjuste(AJUSTE_PADRAO)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden touch-none select-none"
        onTouchStart={aoTocarInicio}
        onTouchMove={aoTocarMover}
        onTouchEnd={aoTocarFim}
      >
        <img
          src={imagemUrl}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: opacidade / 100,
            transform: `translate(${ajuste.deslocX}%, ${ajuste.deslocY}%) scale(${ajuste.zoom}) rotate(${ajuste.rotacaoGraus}deg)`,
            transformOrigin: 'center',
          }}
        />
        {/* Mesmo overlay que fica por cima do fundo no app real — só pra a
            pré-visualização já mostrar como a legibilidade fica de verdade. */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--cor-overlay-leve)' }} />
      </div>

      <div className="px-5 py-3 text-center">
        <p className="text-[11.5px] text-slate-400">Arraste para mover · pinça para zoom · gire com 2 dedos</p>
        <button onClick={resetar} className="text-[11.5px] text-accent-cyan font-semibold mt-1.5">
          Restaurar ajuste padrão
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 pb-8 pt-2">
        <button onClick={onCancelar} className="flex-1 h-12 rounded-full bg-[#1C1C1E] text-white text-[14px] font-semibold">
          Cancelar
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onSalvar(ajuste)}
          className="flex-1 h-12 rounded-full bg-white text-black text-[14px] font-bold"
        >
          Salvar
        </motion.button>
      </div>
    </div>
  )
}
