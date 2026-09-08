import { useEffect, useRef, useState } from 'react'
import { History, Plus, Send, Loader2 } from 'lucide-react'
import { useNexusAI, type EscopoNexusAI } from './useNexusAI'
import NexusAIIcone from './NexusAIIcone'
import NexusAIHistorico from './NexusAIHistorico'

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

interface NexusAIChatCorpoProps {
  escopo: EscopoNexusAI
  moduloContexto?: string | null
  subtitulo: string
  placeholderVazio: string
  // Slot para um botão extra no início do cabeçalho (ex: voltar, na página cheia).
  acaoInicioCabecalho?: React.ReactNode
  // Slot para um botão extra no fim do cabeçalho (ex: fechar, no painel flutuante).
  acaoFimCabecalho?: React.ReactNode
  // Quando true, força uma sessão nova ao montar — usado pelo atalho "Nova
  // conversa" do joystick radial da Gestão Financeira (GfBotaoAcaoRapida),
  // que abre o chat já pedindo uma conversa em branco em vez de continuar
  // a sessão anterior.
  iniciarEmNovoChat?: boolean
}

export default function NexusAIChatCorpo({
  escopo,
  moduloContexto = null,
  subtitulo,
  placeholderVazio,
  acaoInicioCabecalho,
  acaoFimCabecalho,
  iniciarEmNovoChat = false,
}: NexusAIChatCorpoProps) {
  const [texto, setTexto] = useState('')
  const [historicoAberto, setHistoricoAberto] = useState(false)
  const {
    sessaoId,
    mensagens,
    carregandoHistorico,
    enviando,
    erro,
    enviarMensagem,
    iniciarNovoChat,
    abrirSessao,
    listarHistoricoSessoes,
  } = useNexusAI(escopo)
  const fimDaListaRef = useRef<HTMLDivElement>(null)
  const jaIniciouNovoChatRef = useRef(false)

  // Dispara iniciarNovoChat() uma única vez ao montar, se pedido — não
  // fica re-disparando a cada re-render (o botão "Nova conversa" no
  // joystick da GF continua montado/desmontado a cada abertura do painel,
  // então "ao montar" já é o comportamento certo aqui).
  useEffect(() => {
    if (iniciarEmNovoChat && !jaIniciouNovoChatRef.current) {
      jaIniciouNovoChatRef.current = true
      iniciarNovoChat()
    }
  }, [iniciarEmNovoChat, iniciarNovoChat])

  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  function handleEnviar() {
    if (!texto.trim() || enviando) return
    enviarMensagem(texto, moduloContexto)
    setTexto('')
  }

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border shrink-0">
        {acaoInicioCabecalho}
        <NexusAIIcone size={36} />
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-bold text-texto">Nexus AI</p>
          <p className="text-[10.5px] text-texto-secundario truncate">{subtitulo}</p>
        </div>
        <button onClick={iniciarNovoChat} className="text-texto-secundario p-1.5" aria-label="Novo chat">
          <Plus size={19} />
        </button>
        <button onClick={() => setHistoricoAberto(true)} className="text-texto-secundario p-1.5" aria-label="Histórico de conversas">
          <History size={18} />
        </button>
        {acaoFimCabecalho}
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
            <p className="text-[13px] text-texto-secundario">{placeholderVazio}</p>
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

      <NexusAIHistorico
        aberto={historicoAberto}
        onFechar={() => setHistoricoAberto(false)}
        onAbrirSessao={abrirSessao}
        sessaoAtualId={sessaoId}
        listarHistoricoSessoes={listarHistoricoSessoes}
      />
    </div>
  )
}
