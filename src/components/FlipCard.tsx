import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import type { Flashcard } from '@/types'

interface FlipCardProps {
  card: Flashcard
  onMark?: (acertou: boolean) => void
}

export default function FlipCard({ card, onMark }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div>
      <div
        className={`flip-card cursor-pointer ${flipped ? 'flipped' : ''}`}
        style={{ height: 180 }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-card-inner relative w-full h-full">
          <div className="flip-card-face absolute inset-0 card-surface rounded-card-lg p-5 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-[15px] font-semibold text-white leading-snug">{card.frente}</p>
            <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-1">
              <RotateCw size={12} /> Toque para virar
            </div>
          </div>
          <div className="flip-card-face flip-card-back absolute inset-0 rounded-card-lg p-5 flex items-center justify-center text-center bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 border border-accent-cyan/20">
            <p className="text-[13px] text-slate-200 leading-relaxed">{card.verso}</p>
          </div>
        </div>
      </div>
      {flipped && onMark && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mt-3"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMark(false)
            }}
            className="flex-1 h-10 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm font-semibold"
          >
            Errei
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMark(true)
            }}
            className="flex-1 h-10 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm font-semibold"
          >
            Acertei
          </button>
        </motion.div>
      )}
    </div>
  )
}
