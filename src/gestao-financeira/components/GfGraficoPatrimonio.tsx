import { useMemo, useState } from 'react'
import type { PontoProjecao } from '../relatorios'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  pontos: PontoProjecao[]
  visivel: boolean
}

// Linha do patrimônio ao longo dos meses (histórico) + continuação tracejada
// com a projeção. Mesmo espírito visual do GfGraficoFluxo (SVG simples, sem
// lib de gráfico) — só que aqui é uma única série, com um trecho sólido
// (real) e um trecho tracejado (projetado).
export default function GfGraficoPatrimonio({ pontos, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null)

  const w = 320
  const h = 130
  const padY = 10

  const { pathReal, pathProjetado, escalaX, escalaY, temDados, indicePrimeiroProjetado } = useMemo(() => {
    const valores = pontos.map((p) => p.valor)
    const max = Math.max(...valores, 0)
    const min = Math.min(...valores, 0)
    const amplitude = Math.max(max - min, 1)
    const escalaXFn = (i: number) => (i / Math.max(1, pontos.length - 1)) * w
    const escalaYFn = (valor: number) => h - padY - ((valor - min) / amplitude) * (h - padY * 2)

    const primeiroProjetadoIdx = pontos.findIndex((p) => p.projetado)

    const linha = (de: number, ate: number) =>
      pontos
        .slice(de, ate + 1)
        .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${escalaXFn(de + idx)} ${escalaYFn(p.valor)}`)
        .join(' ')

    const fimReal = primeiroProjetadoIdx === -1 ? pontos.length - 1 : primeiroProjetadoIdx
    return {
      pathReal: linha(0, fimReal),
      pathProjetado: primeiroProjetadoIdx === -1 ? '' : linha(primeiroProjetadoIdx - 1, pontos.length - 1),
      escalaX: escalaXFn,
      escalaY: escalaYFn,
      temDados: pontos.some((p) => p.valor !== 0),
      indicePrimeiroProjetado: primeiroProjetadoIdx,
    }
  }, [pontos])

  const ativo = indiceAtivo != null ? pontos[indiceAtivo] : null

  function aoTocar(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * w
    const i = Math.round((x / w) * (pontos.length - 1))
    setIndiceAtivo(Math.min(pontos.length - 1, Math.max(0, i)))
  }

  if (pontos.length === 0) {
    return <p className="text-[12.5px] text-slate-500 py-3 text-center">Sem contas cadastradas ainda.</p>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full bg-accent-cyan" />
          <span className="text-[10.5px] text-slate-400">Histórico</span>
        </div>
        {indicePrimeiroProjetado !== -1 && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-accent-cyan opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(90deg,#00D4FF 0,#00D4FF 3px,transparent 3px,transparent 6px)' }} />
            <span className="text-[10.5px] text-slate-400">Projeção</span>
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full touch-none"
        onPointerDown={aoTocar}
        onPointerMove={(e) => e.buttons === 1 && aoTocar(e)}
        onPointerLeave={() => setIndiceAtivo(null)}
      >
        <line x1={0} y1={escalaY(0)} x2={w} y2={escalaY(0)} stroke="#1C2740" strokeWidth={1} strokeDasharray="3 3" />
        <path d={pathReal} fill="none" stroke="#00D4FF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {pathProjetado && (
          <path d={pathProjetado} fill="none" stroke="#00D4FF" strokeWidth={2.5} strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
        )}
        {indiceAtivo != null && (
          <line x1={escalaX(indiceAtivo)} y1={0} x2={escalaX(indiceAtivo)} y2={h} stroke="#334155" strokeWidth={1} />
        )}
      </svg>

      <div className="flex justify-between text-[9.5px] text-slate-600 mt-1 px-0.5">
        <span>{pontos[0]?.label}</span>
        <span>{pontos[pontos.length - 1]?.label}</span>
      </div>

      {ativo && (
        <div className="mt-3 card-surface rounded-xl p-3 flex items-center justify-between">
          <p className="text-[11.5px] text-slate-400 font-semibold capitalize">
            {ativo.label} {ativo.projetado && <span className="text-accent-cyan">(projetado)</span>}
          </p>
          <p className="text-[13px] font-bold text-white">{visivel ? formatMoeda(ativo.valor, estado) : '••••'}</p>
        </div>
      )}
      {!ativo && !temDados && <p className="text-[11px] text-slate-600 mt-2">Ainda sem movimentação suficiente pra montar o histórico.</p>}
      {!ativo && temDados && <p className="text-[11px] text-slate-600 mt-2">Toque na linha pra ver o valor de cada mês.</p>}
    </div>
  )
}
