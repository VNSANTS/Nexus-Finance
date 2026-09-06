import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NexusAIChatCorpo from '@/nexus-ai/NexusAIChatCorpo'

// Mesma engrenagem de chat do app principal (NexusAIChatCorpo), só que com
// escopo='gestao-financeira' — troca o system prompt no backend (ver
// supabase/functions/nexus-ai/index.ts, SYSTEM_PROMPTS) para focar em
// ajudar com organização financeira pessoal em vez de educação financeira
// geral, e mantém o histórico de conversas completamente separado do chat
// geral (mesmo usuário, duas "memórias" diferentes).
export default function GfChatIaPage() {
  const navigate = useNavigate()

  return (
    <div className="h-dvh flex flex-col">
      <NexusAIChatCorpo
        escopo="gestao-financeira"
        subtitulo="Ajuda com suas finanças"
        placeholderVazio="Pergunte sobre como organizar seus gastos, montar um orçamento, ou definir uma meta."
        acaoInicioCabecalho={
          <button onClick={() => navigate(-1)} className="text-texto-secundario p-1.5 -ml-1.5 mr-1" aria-label="Voltar">
            <ArrowLeft size={19} />
          </button>
        }
      />
    </div>
  )
}
