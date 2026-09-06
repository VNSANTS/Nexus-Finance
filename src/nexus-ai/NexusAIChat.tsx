import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import NexusAIIcone from './NexusAIIcone'
import NexusAIChatCorpo from './NexusAIChatCorpo'
import type { EscopoNexusAI } from './useNexusAI'

// Extrai o id do módulo da URL atual (/modulo/:id), se a pessoa estiver
// dentro de um módulo — usado para dar contexto automático à IA sem o
// usuário precisar explicar em que módulo está. Só faz sentido no escopo
// geral (a GF não tem módulos educacionais).
function useModuloAtualId(): string | null {
  const location = useLocation()
  const match = location.pathname.match(/^\/modulo\/([^/]+)/)
  return match ? match[1] : null
}

interface NexusAIChatProps {
  // 'geral' = app principal (educação financeira, com contexto de módulo).
  // 'gestao-financeira' = dentro da GF (foco em organização financeira
  // pessoal) — histórico e memória de conversa completamente separados do
  // escopo geral (ver useNexusAI.ts).
  escopo?: EscopoNexusAI
  // Controle externo opcional de abertura — usado pelo atalho "Nova
  // conversa" no joystick radial da GF (GfBotaoAcaoRapida), que precisa
  // abrir o chat já em modo "novo chat" a partir de outro botão.
  abrirExternamente?: boolean
  onAbrirExternamenteConsumido?: () => void
}

export default function NexusAIChat({ escopo = 'geral', abrirExternamente, onAbrirExternamenteConsumido }: NexusAIChatProps) {
  const { sessao } = useAuth()
  const [aberto, setAberto] = useState(false)
  const moduloAtualId = useModuloAtualId()

  // Sem sessão (não deveria acontecer, já que RotaProtegida cobre o app
  // inteiro, mas a tela de /login em si não tem sessão) — não mostra o FAB.
  if (!sessao) return null

  const fecharPainel = () => {
    setAberto(false)
    onAbrirExternamenteConsumido?.()
  }

  const painelDeveEstarAberto = aberto || !!abrirExternamente
  const ehEscopoGf = escopo === 'gestao-financeira'

  return (
    <>
      {/* Botão flutuante — fica acima do BottomNav, canto inferior direito */}
      {!painelDeveEstarAberto && (
        <button
          onClick={() => setAberto(true)}
          className="fixed z-[9990] bottom-[86px] right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-bg-card/60 backdrop-blur-sm"
          aria-label="Abrir Nexus AI"
        >
          <NexusAIIcone size={44} />
        </button>
      )}

      <AnimatePresence>
        {painelDeveEstarAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9995] bg-black/70 backdrop-blur-sm flex items-end justify-center"
            onClick={fecharPainel}
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
                escopo={escopo}
                moduloContexto={ehEscopoGf ? null : moduloAtualId}
                iniciarEmNovoChat={abrirExternamente}
                subtitulo={
                  ehEscopoGf ? 'Ajuda com suas finanças' : moduloAtualId ? 'Vendo o módulo atual com você' : 'Tire dúvidas sobre finanças'
                }
                placeholderVazio={
                  ehEscopoGf
                    ? 'Pergunte sobre como organizar seus gastos, montar um orçamento, ou definir uma meta.'
                    : 'Pergunte sobre finanças, investimentos, ou sobre qualquer módulo do app.'
                }
                acaoFimCabecalho={
                  <button onClick={fecharPainel} className="text-texto-secundario p-1.5" aria-label="Fechar">
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
