import type { GastoAgrupadoSimples } from '../relatorios'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  segmentos: GastoAgrupadoSimples[]
  total: number
  visivel: boolean
  legenda?: string
}

// Donut genérico de 2 (ou mais) fatias com legenda embaixo — mesmo desenho
// à mão do GfDonutCategorias, só que sem depender de ícone por categoria.
// Usado nos cards "Gastos fixos x variáveis" e "Necessidades x desejos".
export default function GfDonutDuplo({ segmentos, total, visivel, legenda = 'Total' }: Props) {
  const { estado } = useGestaoFinanceira()
  const raio = 50
  const espessura = 16
  const circunferencia = 2 * Math.PI * raio

  let acumulado = 0
  const arcos = segmentos.map((s) => {
    const fracao = s.percentual / 100
    const offset = circunferencia * (1 - acumulado)
    const tamanho = circunferencia * fracao
    acumulado += fracao
    return { ...s, offset, tamanho }
  })

  if (segmentos.length === 0) {
    return <p className="text-[12px] text-slate-500 py-3 text-center">Sem despesas classificadas neste período.</p>
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center shrink-0">
        <svg viewBox="0 0 120 120" width={104} height={104} className="-rotate-90">
          <circle cx={60} cy={60} r={raio} fill="none" stroke="var(--cor-border)" strokeWidth={espessura} />
          {arcos.map((a) => (
            <circle
              key={a.chave}
              cx={60}
              cy={60}
              r={raio}
              fill="none"
              stroke={a.cor}
              strokeWidth={espessura}
              strokeDasharray={`${a.tamanho} ${circunferencia}`}
              strokeDashoffset={a.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute flex flex-col items-center px-2">
          <p className="text-[12.5px] font-display font-extrabold text-white">{visivel ? formatMoeda(total, estado) : '••••'}</p>
          <p className="text-[9px] text-slate-500">{legenda}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 min-w-0">
        {segmentos.map((s) => (
          <div key={s.chave} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.cor }} />
            <span className="text-[12px] text-slate-300 font-medium flex-1 truncate">{s.label}</span>
            <span className="text-[11px] text-slate-500 shrink-0">{s.percentual.toFixed(0)}%</span>
            <span className="text-[11.5px] font-semibold text-white shrink-0 w-[76px] text-right">
              {visivel ? formatMoeda(s.total, estado) : '••••'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
