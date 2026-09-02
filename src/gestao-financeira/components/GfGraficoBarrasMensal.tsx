import { useState } from 'react'
import type { PontoMensal } from '../relatorios'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  pontos: PontoMensal[]
  visivel: boolean
}

// Barras pareadas (receita/despesa) por mês — mesmo espírito visual do
// GfGraficoFluxo (SVG simples, sem lib de gráfico), só que agregado por mês
// em vez de por dia, pra caber vários meses lado a lado sem poluir.
export default function GfGraficoBarrasMensal({ pontos, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  const [ativoIndex, setAtivoIndex] = useState<number | null>(null)

  const maior = Math.max(1, ...pontos.flatMap((p) => [p.receitas, p.despesas]))
  const alturaMax = 110
  const largura = 320
  const larguraGrupo = largura / Math.max(1, pontos.length)
  const larguraBarra = Math.min(14, larguraGrupo / 3)

  const ativo = ativoIndex != null ? pontos[ativoIndex] : null

  if (pontos.length === 0) {
    return <p className="text-[12.5px] text-slate-500 py-3 text-center">Sem lançamentos nesse período.</p>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-green" />
          <span className="text-[10.5px] text-slate-400">Receitas</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <span className="text-[10.5px] text-slate-400">Despesas</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${largura} ${alturaMax + 20}`} className="w-full">
        {pontos.map((p, i) => {
          const cx = larguraGrupo * i + larguraGrupo / 2
          const hReceita = (p.receitas / maior) * alturaMax
          const hDespesa = (p.despesas / maior) * alturaMax
          return (
            <g key={p.mesStr} onClick={() => setAtivoIndex(i === ativoIndex ? null : i)} className="cursor-pointer">
              <rect x={cx - larguraBarra - 1} y={alturaMax - hReceita} width={larguraBarra} height={Math.max(1, hReceita)} rx={3} fill="#22C55E" opacity={ativoIndex === null || ativoIndex === i ? 1 : 0.35} />
              <rect x={cx + 1} y={alturaMax - hDespesa} width={larguraBarra} height={Math.max(1, hDespesa)} rx={3} fill="#EF4444" opacity={ativoIndex === null || ativoIndex === i ? 1 : 0.35} />
              <text x={cx} y={alturaMax + 14} textAnchor="middle" fontSize={9.5} fill="#64748B">
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>

      {ativo && (
        <div className="mt-2 card-surface rounded-xl p-3 flex flex-col gap-1.5">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5 capitalize">{ativo.label}</p>
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-slate-400">Receitas</span>
            <span className="font-semibold text-white">{visivel ? formatMoeda(ativo.receitas, estado) : '••••'}</span>
          </div>
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-slate-400">Despesas</span>
            <span className="font-semibold text-white">{visivel ? formatMoeda(ativo.despesas, estado) : '••••'}</span>
          </div>
        </div>
      )}
      {!ativo && <p className="text-[11px] text-slate-600 mt-1">Toque num mês para ver o valor exato.</p>}
    </div>
  )
}
