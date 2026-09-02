import { motion } from 'framer-motion'
import { Delete } from 'lucide-react'

interface GfTecladoPinProps {
  valor: string
  tamanho: number
  onMudar: (novoValor: string) => void
  erro?: boolean
  desabilitado?: boolean
}

// Teclado numérico + indicador de dígitos, reaproveitado tanto na tela de
// bloqueio (GfBloqueioOverlay) quanto nos fluxos de ativar/alterar/desativar
// PIN em GfSegurancaPage. `tamanho` decide quantos pontinhos aparecem — o
// PIN é sempre de 4 ou 6 dígitos, fixo, escolhido na hora de ativar (ver
// OPCOES_TAMANHO_PIN em seguranca.ts), pra dar pra "auto-enviar" assim que a
// pessoa termina de digitar, sem precisar de um botão "OK" separado.
export default function GfTecladoPin({ valor, tamanho, onMudar, erro, desabilitado }: GfTecladoPinProps) {
  function aoTocar(digito: string) {
    if (desabilitado || valor.length >= tamanho) return
    onMudar(valor + digito)
  }
  function apagar() {
    if (desabilitado) return
    onMudar(valor.slice(0, -1))
  }

  return (
    <div className="flex flex-col items-center gap-7">
      <motion.div
        className="flex items-center gap-3"
        animate={erro ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length: tamanho }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full border-2 transition-colors ${
              i < valor.length
                ? erro
                  ? 'bg-accent-red border-accent-red'
                  : 'bg-accent-cyan border-accent-cyan'
                : 'border-slate-600'
            }`}
          />
        ))}
      </motion.div>

      <div className={`grid grid-cols-3 gap-4 ${desabilitado ? 'opacity-40 pointer-events-none' : ''}`}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <button
            key={d}
            onClick={() => aoTocar(d)}
            className="w-16 h-16 rounded-full card-surface border border-border text-[20px] font-semibold text-white active:scale-95 transition-transform"
          >
            {d}
          </button>
        ))}
        <div />
        <button
          onClick={() => aoTocar('0')}
          className="w-16 h-16 rounded-full card-surface border border-border text-[20px] font-semibold text-white active:scale-95 transition-transform"
        >
          0
        </button>
        <button
          onClick={apagar}
          disabled={valor.length === 0}
          className="w-16 h-16 rounded-full flex items-center justify-center text-slate-400 disabled:opacity-30 active:scale-95 transition-transform"
        >
          <Delete size={20} />
        </button>
      </div>
    </div>
  )
}
