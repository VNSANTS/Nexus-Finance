import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  receitas: number
  despesas: number
  saldo: number
  visivel: boolean
}

// Reproduz as 3 barras (Receitas verde / Despesas vermelha / Saldo azul) do
// card "Fluxo de caixa" no mockup, com o valor em cima de cada barra e o
// rótulo embaixo.
export default function MiniBarrasFluxo({ receitas, despesas, saldo, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  const itens = [
    { label: 'Receitas', valor: receitas, cor: '#22C55E' },
    { label: 'Despesas', valor: despesas, cor: '#EF4444' },
    { label: 'Saldo', valor: Math.abs(saldo), cor: '#00D4FF' },
  ]
  const maior = Math.max(receitas, despesas, Math.abs(saldo), 1)

  return (
    <div className="flex items-end justify-between gap-4 pt-2">
      {itens.map((item) => {
        const alturaPct = Math.max(6, (item.valor / maior) * 100)
        return (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-1.5">
            <p className="text-[10.5px] font-bold text-white whitespace-nowrap">{visivel ? formatMoeda(item.valor, estado) : '••••'}</p>
            <div className="w-full h-16 flex items-end">
              <div className="w-full rounded-t-md" style={{ height: `${alturaPct}%`, background: item.cor }} />
            </div>
            <div className="w-full border-t border-dashed border-border" />
            <p className="text-[10.5px] text-slate-500 font-medium">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
