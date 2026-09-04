import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface GfHeaderProps {
  titulo: string
  subtitulo?: string
  icone: LucideIcon
  corIcone?: string
  voltarPara?: string
  acoes?: React.ReactNode
}

// Header padrão de qualquer tela interna da Gestão Financeira. O botão
// "voltar" nunca sai do sub-app (não navega pro '/' do app principal) —
// a saída total é feita só pelo item "Início" da barra ou pela ação
// explícita de sair, mantendo a separação entre os dois "apps".
export default function GfHeader({ titulo, subtitulo, icone: Icone, corIcone = '#22C55E', voltarPara, acoes }: GfHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-5 pb-1">
      {voltarPara && (
        <button
          onClick={() => navigate(voltarPara)}
          className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5"
        >
          <ChevronLeft size={16} /> Voltar
        </button>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${corIcone}22` }}>
            <Icone size={22} style={{ color: corIcone }} />
          </div>
          <div>
            <h1 className="text-xl font-display font-extrabold text-white leading-tight">{titulo}</h1>
            {subtitulo && <p className="text-xs text-slate-500 mt-0.5">{subtitulo}</p>}
          </div>
        </div>
        {acoes}
      </div>
    </div>
  )
}
