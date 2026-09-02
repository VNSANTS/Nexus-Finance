import type { GastoPorCategoria } from '../selectors'
import { iconePorNome } from '../iconMap'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  categorias: GastoPorCategoria[]
  total: number
  visivel: boolean
}

// Donut de "Gastos por categoria" — réplica do card do dashboard desktop,
// desenhado como SVG (arcos por stroke-dasharray) com o total no centro e
// a legenda com barra de progresso embaixo, no mesmo padrão visual dos
// outros cards da Gestão Financeira.
export default function GfDonutCategorias({ categorias, total, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  const raio = 60
  const espessura = 18
  const circunferencia = 2 * Math.PI * raio

  let acumulado = 0
  const arcos = categorias.map((g) => {
    const fracao = g.percentual / 100
    const offset = circunferencia * (1 - acumulado)
    const tamanho = circunferencia * fracao
    acumulado += fracao
    return { ...g, offset, tamanho }
  })

  if (categorias.length === 0) {
    return <p className="text-[12.5px] text-slate-500 py-3 text-center">Nenhum gasto registrado este mês ainda.</p>
  }

  return (
    <div>
      <div className="relative flex items-center justify-center py-2">
        <svg viewBox="0 0 140 140" width={150} height={150} className="-rotate-90">
          <circle cx={70} cy={70} r={raio} fill="none" stroke="var(--cor-border)" strokeWidth={espessura} />
          {arcos.map((a) => (
            <circle
              key={a.categoria.id}
              cx={70}
              cy={70}
              r={raio}
              fill="none"
              stroke={a.categoria.cor}
              strokeWidth={espessura}
              strokeDasharray={`${a.tamanho} ${circunferencia}`}
              strokeDashoffset={a.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute flex flex-col items-center">
          <p className="text-[15px] font-display font-extrabold text-white">{visivel ? formatMoeda(total, estado) : '••••'}</p>
          <p className="text-[10px] text-slate-500">Total de despesas</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-2">
        {categorias.map((g) => {
          const Icone = iconePorNome(g.categoria.icone)
          return (
            <div key={g.categoria.id} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${g.categoria.cor}22` }}>
                <Icone size={13} style={{ color: g.categoria.cor }} />
              </div>
              <span className="text-[12px] text-slate-300 font-medium flex-1 truncate">{g.categoria.nome}</span>
              <span className="text-[11px] text-slate-500 shrink-0">{g.percentual.toFixed(1)}%</span>
              <span className="text-[12px] font-semibold text-white shrink-0 w-[72px] text-right">
                {visivel ? formatMoeda(g.total, estado) : '••••'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
