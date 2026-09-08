import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NexusAIChatCorpo from '@/nexus-ai/NexusAIChatCorpo'

export default function NexusAIPage() {
  const navigate = useNavigate()

  return (
    <div className="h-dvh flex flex-col max-w-[480px] mx-auto">
      <NexusAIChatCorpo
        escopo="geral"
        subtitulo="Tire dúvidas sobre finanças"
        placeholderVazio="Pergunte sobre finanças, investimentos, ou sobre qualquer módulo do app."
        acaoInicioCabecalho={
          <button onClick={() => navigate(-1)} className="text-texto-secundario p-1.5 -ml-1.5 mr-1" aria-label="Voltar">
            <ArrowLeft size={19} />
          </button>
        }
      />
    </div>
  )
}
