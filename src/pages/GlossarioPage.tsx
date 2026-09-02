import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'
import { GLOSSARIO_TERMOS } from '@banco-de-dados/glossario/termos'

export default function GlossarioPage() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  const termosFiltrados = GLOSSARIO_TERMOS.filter((t) => t.termo.toLowerCase().includes(busca.toLowerCase())).sort((a, b) =>
    a.termo.localeCompare(b.termo)
  )

  const agrupados: Record<string, typeof GLOSSARIO_TERMOS> = {}
  termosFiltrados.forEach((t) => {
    const letra = t.termo[0].toUpperCase()
    if (!agrupados[letra]) agrupados[letra] = []
    agrupados[letra].push(t)
  })

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/biblioteca')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Voltar
      </button>

      <h1 className="text-xl font-display font-extrabold text-white">Glossário</h1>
      <p className="text-xs text-slate-500 mt-1 mb-4">{GLOSSARIO_TERMOS.length} termos financeiros explicados de forma simples</p>

      <div className="relative mb-4.5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar termo..."
          className="w-full h-[42px] pl-[38px] rounded-2xl bg-bg-card border border-border text-white text-[13px] outline-none"
        />
      </div>

      {Object.keys(agrupados).length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Search size={26} className="mx-auto mb-2.5" />
          <p className="text-[13px]">Nenhum termo encontrado</p>
        </div>
      ) : (
        Object.keys(agrupados)
          .sort()
          .map((letra) => (
            <div key={letra} className="mb-4.5">
              <p className="text-xs font-display font-extrabold text-accent-cyan mb-2">{letra}</p>
              <div className="flex flex-col gap-2">
                {agrupados[letra].map((t, i) => (
                  <div key={i} className="p-3.5 rounded-2xl card-surface">
                    <p className="text-[13px] font-bold text-white">{t.termo}</p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t.def}</p>
                    {t.modulo && <p className="text-[10.5px] text-accent-cyan mt-1.5 font-semibold">Relacionado: {t.modulo}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  )
}
