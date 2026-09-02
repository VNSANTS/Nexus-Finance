import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

interface GfEmConstrucaoProps {
  titulo: string
  descricao: string
  topicos?: string[]
}

// Bloco padrão usado nas telas que já têm rota, header e navegação
// funcionando, mas cujo conteúdo interno ainda será preenchido nas
// próximas entregas. Mantém a promessa: estrutura pronta pra receber
// o conteúdo, sem telas quebradas ou links mortos.
export default function GfEmConstrucao({ titulo, descricao, topicos }: GfEmConstrucaoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4 rounded-3xl p-6 flex flex-col items-center gap-3 text-center"
      style={{ background: 'linear-gradient(135deg, #22C55E14, #00D4FF14)', border: '1px solid #22C55E33' }}
    >
      <div className="w-14 h-14 rounded-2xl bg-accent-green/15 flex items-center justify-center">
        <Construction size={26} className="text-accent-green" />
      </div>
      <h2 className="text-base font-display font-extrabold text-white">{titulo}</h2>
      <p className="text-[13px] text-slate-400 leading-relaxed max-w-[300px]">{descricao}</p>

      {topicos && topicos.length > 0 && (
        <div className="w-full mt-2 flex flex-col gap-2 text-left">
          {topicos.map((t) => (
            <div key={t} className="flex items-center gap-2 text-[12px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0" />
              {t}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
