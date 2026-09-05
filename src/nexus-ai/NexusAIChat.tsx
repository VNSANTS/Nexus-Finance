import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { useNexusAI } from './useNexusAI'
import NexusAIIcone from './NexusAIIcone'

// Extrai o id do módulo da URL atual (/modulo/:id), se a pessoa estiver
// dentro de um módulo — usado para dar contexto automático à IA sem o
// usuário precisar explicar em que módulo está.
function useModuloAtualId(): string | null {
  const location = useLocation()
  const match = location.pathname.match(/^\/modulo\/([^/]+)/)
  return match ? match[1] : null
}

function BolhaMensagem({ papel, conteudo, pendente }: { papel: 'user' | 'model'; conteudo: string; pendente?: boolean }) {
  const ehUsuario = papel === 'user'
  return (
    <div className={`flex ${ehUsuario ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          ehUsuario ? 'bg-accent-cyan text-black rounded-br-sm' : 'bg-bg-card border border-border text-texto rounded-bl-sm'
        }`}
      >
        {pendente ? (
          <span className="flex items-center gap-1.5 text-texto-secundario">
            <Loader2 size={13} className="animate-spin" />
            Pensando...
          </span>
        ) : (
          conteudo
        )}
      </div>
    </div>
  )
}

export default function NexusAIChat() {
  const { sessao } = useAuth()
  const [aberto, setAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const { mensagens, carregandoHistorico, enviando, erro, enviarMensagem } = useNexusAI()
  const moduloAtualId = useModuloAtualId()
  const fimDaListaRef = useRef<HTMLDivElement>(null)

  // Rola para a última mensagem sempre que a lista muda.
  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  // Sem sessão (não deveria acontecer, já que RotaProtegida cobre o app
  // inteiro, mas a tela de /login em si não tem sessão) — não mostra o FAB.
  if (!sessao) return null

  function handleEnviar() {
    if (!texto.trim() || enviando) return
    enviarMensagem(texto, moduloAtualId)
    setTexto('')
  }

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
              className="w-full max-w-[480px] h-[80dvh] bg-bg border-t border-border rounded-t-[24px] flex flex-col overflow-hidden"
            >
              {/* Cabeçalho */}
              <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border shrink-0">
                <NexusAIIcone size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-bold text-texto">Nexus AI</p>
                  <p className="text-[10.5px] text-texto-secundario">
                    {moduloAtualId ? 'Vendo o módulo atual com você' : 'Tire dúvidas sobre finanças'}
                  </p>
                </div>
                <button onClick={() => setAberto(false)} className="text-texto-secundario p-1">
                  <X size={20} />
                </button>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {carregandoHistorico && (
                  <div className="flex justify-center py-6">
                    <Loader2 size={18} className="animate-spin text-texto-secundario" />
                  </div>
                )}

                {!carregandoHistorico && mensagens.length === 0 && (
                  <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center px-6">
                    <NexusAIIcone size={64} />
                    <p className="text-[13px] text-texto-secundario">
                      Pergunte sobre finanças, investimentos, ou sobre qualquer módulo do app.
                    </p>
                  </div>
                )}

                {mensagens.map((m) => (
                  <BolhaMensagem key={m.id} papel={m.papel} conteudo={m.conteudo} pendente={m.pendente} />
                ))}

                {erro && <p className="text-[12px] text-accent-red text-center">{erro}</p>}

                <div ref={fimDaListaRef} />
              </div>

              {/* Campo de digitação */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0">
                <input
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleEnviar()
                    }
                  }}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 rounded-full bg-bg-card border border-border px-4 py-2.5 text-[13px] text-texto outline-none focus:border-accent-cyan"
                />
                <button
                  onClick={handleEnviar}
                  disabled={!texto.trim() || enviando}
                  className="w-10 h-10 rounded-full bg-accent-cyan flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                  <Send size={16} className="text-black" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
