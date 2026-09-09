import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
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

  // Posição do botão flutuante — arrastável livremente pela tela. Guardado
  // só em memória (useMotionValue), de propósito: ao fechar e reabrir o
  // app, sempre volta pro canto padrão (bottom-right). Não persiste em
  // localStorage nem em estado global.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const arrastandoRef = useRef(false)
  const [foiArrastado, setFoiArrastado] = useState(false)

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
      {/* Botão flutuante — posição padrão no canto inferior direito, acima
          do BottomNav, mas arrastável pra qualquer lugar da tela. x/y são
          um deslocamento (delta) a partir dessa posição padrão, então ao
          fechar e reabrir o app o botão volta sempre pro lugar de origem —
          nada é salvo em disco de propósito. */}
      {!painelDeveEstarAberto && (
        <motion.button
          drag
          dragMomentum={false}
          dragElastic={0.05}
          dragConstraints={{ top: -window.innerHeight + 140, left: -Math.min(window.innerWidth, 480) + 72, right: 0, bottom: 0 }}
          style={{ x, y }}
          onDragStart={() => {
            arrastandoRef.current = true
            setFoiArrastado(true)
          }}
          onDragEnd={() => {
            // Pequeno delay pra o onClick (que dispara logo depois do
            // pointerup) checar arrastandoRef antes dele ser zerado.
            setTimeout(() => {
              arrastandoRef.current = false
            }, 0)
          }}
          onClick={() => {
            if (arrastandoRef.current) return
            setAberto(true)
          }}
          className="fixed z-[70] bottom-[86px] right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-bg-card/60 backdrop-blur-sm touch-none"
          aria-label="Abrir Nexus AI"
          title={foiArrastado ? undefined : 'Segure e arraste para mover'}
        >
          <NexusAIIcone size={44} />
        </motion.button>
      )}

      <AnimatePresence>
        {painelDeveEstarAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-end justify-center"
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
