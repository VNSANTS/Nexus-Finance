import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import NexusAIIcone from './NexusAIIcone'
import NexusAIChatCorpo from './NexusAIChatCorpo'

// Extrai o id do módulo da URL atual (/modulo/:id), se a pessoa estiver
// dentro de um módulo — usado para dar contexto automático à IA sem o
// usuário precisar explicar em que módulo está.
function useModuloAtualId(): string | null {
  const location = useLocation()
  const match = location.pathname.match(/^\/modulo\/([^/]+)/)
  return match ? match[1] : null
}

export default function NexusAIChat() {
  const { sessao } = useAuth()
  const [aberto, setAberto] = useState(false)
  const moduloAtualId = useModuloAtualId()

  // Sem sessão (não deveria acontecer, já que RotaProtegida cobre o app
  // inteiro, mas a tela de /login em si não tem sessão) — não mostra o FAB.
  if (!sessao) return null

  return (
    <>
      {/* Botão flutuante — fica acima do BottomNav, canto inferior direito */}
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="fixed z-[9990] bottom-[86px] right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-bg-card/60 backdrop-blur-sm"
          aria-label="Abrir Nexus AI"
        >
          <NexusAIIcone size={44} />
        </button>
      )}

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9995] bg-black/70 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setAberto(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] h-[80dvh] bg-bg border-t border-border rounded-t-[24px] overflow-hidden"
            >
              <NexusAIChatCorpo
                escopo="geral"
                moduloContexto={moduloAtualId}
                subtitulo={moduloAtualId ? 'Vendo o módulo atual com você' : 'Tire dúvidas sobre finanças'}
                placeholderVazio="Pergunte sobre finanças, investimentos, ou sobre qualquer módulo do app."
                acaoFimCabecalho={
                  <button onClick={() => setAberto(false)} className="text-texto-secundario p-1.5" aria-label="Fechar">
                    <X size={19} />
                  </button>
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
