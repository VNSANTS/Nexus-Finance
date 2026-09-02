import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { AjusteFoto } from '@/types'

interface Props {
  fotoUrl: string
  ajusteInicial: AjusteFoto | null
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

// Editor de foto de perfil em tela cheia: a foto fica atrás de uma máscara
// escura com um círculo recortado no meio (mostrando só o que vai aparecer
// no avatar). Gestos suportados:
// - Um dedo arrastando: reposiciona a foto (pan)
// - Dois dedos afastando/aproximando: zoom (pinça)
// - Dois dedos girando: rotação
// Tudo calculado a partir do estado anterior do gesto (delta), não posição
// absoluta, para não "pular" quando o número de dedos muda no meio do toque.
export default function EditorFotoPerfil({ fotoUrl, ajusteInicial, onSalvar, onCancelar }: Props) {
  const [ajuste, setAjuste] = useState<AjusteFoto>(ajusteInicial ?? AJUSTE_PADRAO)
  const gestoRef = useRef<{
    modo: 'pan' | 'pinca' | null
    ultimoX: number
    ultimoY: number
    ultimaDistancia: number
    ultimoAngulo: number
  }>({ modo: null, ultimoX: 0, ultimoY: 0, ultimaDistancia: 0, ultimoAngulo: 0 })

  const TAMANHO_CIRCULO = 260 // px, tamanho do círculo de recorte na tela

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

    if (g.modo === 'pan' && e.touches.length === 1) {
      const dx = e.touches[0].clientX - g.ultimoX
      const dy = e.touches[0].clientY - g.ultimoY
      g.ultimoX = e.touches[0].clientX
      g.ultimoY = e.touches[0].clientY
      setAjuste((a) => ({
        ...a,
        deslocX: a.deslocX + (dx / TAMANHO_CIRCULO) * 100,
        deslocY: a.deslocY + (dy / TAMANHO_CIRCULO) * 100,
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
      // Passou de pinça (2 dedos) pra pan (1 dedo) sem soltar tudo — reancora
      // a referência de pan no dedo restante para não pular.
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
        className="flex-1 relative overflow-hidden touch-none select-none"
        onTouchStart={aoTocarInicio}
        onTouchMove={aoTocarMover}
        onTouchEnd={aoTocarFim}
      >
        {/* Imagem de fundo, transformada pelos gestos */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={fotoUrl}
            alt=""
            draggable={false}
            className="max-w-none pointer-events-none"
            style={{
              width: TAMANHO_CIRCULO,
              height: TAMANHO_CIRCULO,
              objectFit: 'cover',
              transform: `translate(${ajuste.deslocX}%, ${ajuste.deslocY}%) scale(${ajuste.zoom}) rotate(${ajuste.rotacaoGraus}deg)`,
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* Máscara escura com "janela" circular recortada */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(0,0,0,0.72)',
            maskImage: `radial-gradient(circle ${TAMANHO_CIRCULO / 2}px at center, transparent 99%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${TAMANHO_CIRCULO / 2}px at center, transparent 99%, black 100%)`,
          }}
        />
        {/* Contorno do círculo */}
        <div
          className="absolute rounded-full border-2 border-white/70 pointer-events-none"
          style={{
            width: TAMANHO_CIRCULO,
            height: TAMANHO_CIRCULO,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
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
