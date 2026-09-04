import { motion, AnimatePresence } from 'framer-motion'
import NexusLogo from '@/components/NexusLogo'
import { Wallet2 } from 'lucide-react'

interface GfTransicaoProps {
  ativa: boolean
  destino: 'entrando' | 'saindo'
}

// Cortina de transição full-screen: cobre a tela, mostra o selo da Gestão
// Financeira com uma respiração suave por 5s (duração definida pelo
// Vinícius) e depois dá fade-out revelando a tela nova por baixo.
export default function GfTransicao({ ativa, destino }: GfTransicaoProps) {
  return (
    <AnimatePresence>
      {ativa && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0.2, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: [0.85, 1, 1, 0.95], y: [0, 0, 0, -6] }}
            transition={{ duration: 4.6, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <NexusLogo size={40} showWordmark={false} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-green flex items-center justify-center border-2 border-bg">
                <Wallet2 size={12} className="text-bg" />
              </div>
            </motion.div>
            <p className="text-[12px] font-semibold text-slate-400">
              {destino === 'entrando' ? 'Abrindo Gestão Financeira' : 'Voltando ao Nexus Finance'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
