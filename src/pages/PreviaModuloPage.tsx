import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, LockKeyhole } from 'lucide-react'
import { MODULOS } from '@banco-de-dados/modulos/_indice'
import fundamentos from '@banco-de-dados/modulos/previas.json'
import { TODAS_ABAS } from '@/types'

export default function PreviaModuloPage() {
  const { id } = useParams()
  const modulo = MODULOS.find((item) => item.id === id)
  const fundamento = modulo && (fundamentos as Record<string, string>)[modulo.id]
  return (
    <main className="flex flex-col gap-5 px-4 pb-28 pt-5">
      <Link to="/" className="flex items-center gap-1 self-start text-sm text-slate-400"><ChevronLeft size={16} /> Início</Link>
      <h1 className="text-xl font-bold text-white">{modulo?.titulo || 'Módulo não encontrado'}</h1>
      {fundamento && <>
        <section className="card-surface rounded-2xl p-4">
          <h2 className="mb-2 text-sm font-bold text-[#00D4FF]">Primeiro fundamento: o que é</h2>
          <p className="text-sm leading-relaxed text-slate-300">{fundamento}</p>
        </section>
        <nav aria-label="Conteúdo do módulo" className="grid grid-cols-2 gap-2">
          {TODAS_ABAS.map((aba) => (
            <Link key={aba} to={'/modulo/' + modulo.id + '?aba=' + encodeURIComponent(aba)}
              className="flex min-h-12 items-center gap-2 rounded-xl border border-[#00D4FF]/20 bg-slate-900/60 p-3 text-xs text-white backdrop-blur-md">
              <LockKeyhole size={16} color="#00D4FF" aria-hidden />{aba === 'Aprender' ? 'Continuar aprendendo' : aba}
            </Link>
          ))}
        </nav>
      </>}
    </main>
  )
}
