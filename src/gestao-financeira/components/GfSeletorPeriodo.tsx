import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'
import type { PeriodoRelatorio } from '../relatorios'
import { periodosPreDefinidos } from '../relatorios'

interface Props {
  ativo: PeriodoRelatorio
  onEscolher: (p: PeriodoRelatorio) => void
}

const PRESETS = periodosPreDefinidos()

function hojeISO() {
  return new Date().toISOString().slice(0, 10)
}

// Antes esses dois campos eram "defaultValue" (não-controlados) amarrados
// no estado externo `ativo` — funcionava só na primeira renderização; se o
// período personalizado mudasse por fora (ex.: trocar pra um preset e
// voltar pra "Personalizado"), o valor mostrado no input ficava
// desatualizado. Agora os dois campos têm estado próprio controlado, que
// se resincroniza sempre que `ativo` muda por fora.
export default function GfSeletorPeriodo({ ativo, onEscolher }: Props) {
  const [personalizadoAberto, setPersonalizadoAberto] = useState(ativo.id === 'personalizado')
  const [de, setDe] = useState(ativo.id === 'personalizado' ? ativo.de : '')
  const [ate, setAte] = useState(ativo.id === 'personalizado' ? ativo.ate : '')

  useEffect(() => {
    if (ativo.id === 'personalizado') {
      setDe(ativo.de)
      setAte(ativo.ate)
    }
  }, [ativo])

  function mudarDe(novoDe: string) {
    setDe(novoDe)
    // Antes, se a data escolhida ficasse depois de "até", o filtro
    // simplesmente não mudava (nem avisava por quê). Agora ajusta "até"
    // junto, pra sempre existir um intervalo válido depois de cada escolha.
    const novoAte = ate && ate >= novoDe ? ate : novoDe
    setAte(novoAte)
    if (novoDe) onEscolher({ id: 'personalizado', label: 'Personalizado', de: novoDe, ate: novoAte })
  }

  function mudarAte(novoAte: string) {
    setAte(novoAte)
    const novoDe = de && de <= novoAte ? de : novoAte
    setDe(novoDe)
    if (novoAte) onEscolher({ id: 'personalizado', label: 'Personalizado', de: novoDe, ate: novoAte })
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPersonalizadoAberto(false)
              onEscolher(p)
            }}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors ${
              ativo.id === p.id ? 'bg-accent-green text-bg' : 'card-surface text-slate-400'
            }`}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setPersonalizadoAberto((v) => !v)}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors ${
            ativo.id === 'personalizado' ? 'bg-accent-green text-bg' : 'card-surface text-slate-400'
          }`}
        >
          <Calendar size={13} /> Personalizado
        </button>
      </div>

      {personalizadoAberto && (
        <div className="flex items-center gap-2 mt-2.5">
          <input
            type="date"
            value={de}
            max={hojeISO()}
            onChange={(e) => mudarDe(e.target.value)}
            className="card-surface rounded-xl px-3 py-2 text-[12.5px] text-white flex-1"
            aria-label="Data inicial"
          />
          <span className="text-slate-600 text-[12px]">até</span>
          <input
            type="date"
            value={ate}
            max={hojeISO()}
            onChange={(e) => mudarAte(e.target.value)}
            className="card-surface rounded-xl px-3 py-2 text-[12.5px] text-white flex-1"
            aria-label="Data final"
          />
        </div>
      )}
    </div>
  )
}
