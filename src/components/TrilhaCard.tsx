import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import { getIcon } from '@/components/Icon'
import { CAPAS_TRILHA } from '@/assets/trilhas'
import type { Trilha } from '@/types'

interface TrilhaCardProps {
  trilha: Trilha
  totalModulos: number
  concluidos: number
  onClick: () => void
  // Quando fornecido, mostra um botão "Continuar" separado do clique geral do
  // card — o card abre a trilha inteira (expandida); o botão pula direto para
  // onde o usuário parou. Omitir quando a trilha ainda não foi começada.
  onContinuar?: () => void
}

export default function TrilhaCard({ trilha, totalModulos, concluidos, onClick, onContinuar }: TrilhaCardProps) {
  const Icon = getIcon(trilha.iconName, BookOpen)
  const capa = CAPAS_TRILHA[trilha.id]
  const pct = totalModulos > 0 ? Math.round((concluidos / totalModulos) * 100) : 0

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="w-full text-left card-surface rounded-card p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        {capa ? (
          <img src={capa} alt="" className="w-11 h-11 rounded-2xl shrink-0" draggable={false} />
        ) : (
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${trilha.cor}1A` }}
          >
            <Icon size={22} style={{ color: trilha.cor }} strokeWidth={2} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-slate-500 font-medium">Trilha {trilha.numero}</p>
          <h3 className="text-[15px] font-display font-bold text-white leading-tight line-clamp-2">
            {trilha.nome}
          </h3>
        </div>
      </div>
      <p className="text-[13px] text-slate-400 line-clamp-2">{trilha.descricao}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: trilha.cor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[11px] text-slate-500 font-medium shrink-0">
          {concluidos}/{totalModulos}
        </span>
      </div>
      {onContinuar && (
        <div
          role="button"
          onClick={(e) => {
            e.stopPropagation()
            onContinuar()
          }}
          className="flex items-center justify-center gap-1.5 h-9 rounded-xl text-[12px] font-semibold"
          style={{ backgroundColor: `${trilha.cor}1A`, color: trilha.cor }}
        >
          Continuar de onde parei <ArrowRight size={14} />
        </div>
      )}
    </motion.button>
  )
}
