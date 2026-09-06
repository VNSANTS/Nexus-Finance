import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, Loader2 } from 'lucide-react'
import type { SessaoHistorico } from './useNexusAI'

function formatarData(iso: string) {
  const d = new Date(iso)
  const hoje = new Date()
  const ehHoje = d.toDateString() === hoje.toDateString()
  if (ehHoje) return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function NexusAIHistorico({
  aberto,
  onFechar,
  onAbrirSessao,
  sessaoAtualId,
  listarHistoricoSessoes,
}: {
  aberto: boolean
  onFechar: () => void
  onAbrirSessao: (sessaoId: string) => void
  sessaoAtualId: string
  listarHistoricoSessoes: () => Promise<SessaoHistorico[]>
}) {
  const [sessoes, setSessoes] = useState<SessaoHistorico[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!aberto) return
    setCarregando(true)
    listarHistoricoSessoes().then((lista) => {
      setSessoes(lista)
      setCarregando(false)
    })
  }, [aberto, listarHistoricoSessoes])

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-10 bg-bg flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border shrink-0">
            <p className="text-[13.5px] font-bold text-texto">Conversas anteriores</p>
            <button onClick={onFechar} className="text-texto-secundario p-1">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3">
            {carregando && (
              <div className="flex justify-center py-8">
                <Loader2 size={18} className="animate-spin text-texto-secundario" />
              </div>
            )}

            {!carregando && sessoes.length === 0 && (
              <p className="text-[12.5px] text-texto-secundario text-center py-8">Nenhuma conversa ainda.</p>
            )}

            {!carregando &&
              sessoes.map((s) => (
                <button
                  key={s.sessaoId}
                  onClick={() => {
                    onAbrirSessao(s.sessaoId)
                    onFechar()
                  }}
                  className={`w-full flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left mb-1.5 ${
                    s.sessaoId === sessaoAtualId ? 'bg-accent-cyan/10 border border-accent-cyan/30' : 'bg-bg-card border border-border'
                  }`}
                >
                  <MessageSquare size={15} className="text-texto-secundario shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-texto truncate">{s.primeiraMensagem}</p>
                    <p className="text-[10.5px] text-texto-secundario mt-0.5">
                      {formatarData(s.ultimaMensagemEm)} · {s.totalMensagens} mensagens
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
