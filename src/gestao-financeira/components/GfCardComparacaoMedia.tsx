import type { ComparacaoMedia } from '../relatorios'
import { formatPercent } from '@/utils/format'
import { iconePorNome } from '../iconMap'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  comparacao: ComparacaoMedia
  visivel: boolean
}

function Selo({ variacao, invertida }: { variacao: number | null; invertida?: boolean }) {
  if (variacao == null) return <span className="text-[10.5px] text-slate-600">novo</span>
  const positivo = invertida ? variacao <= 0 : variacao >= 0
  return (
    <span className={`text-[10.5px] font-bold ${positivo ? 'text-accent-green' : 'text-accent-red'}`}>
      {variacao >= 0 ? '▲' : '▼'} {formatPercent(Math.abs(variacao), 0).replace('+', '')}
    </span>
  )
}

// Compara o período escolhido no Relatório com a própria média histórica do
// usuário (ver compararComPropriaMedia em relatorios.ts) — nada de comparar
// com terceiros, só "você, agora" x "você, na média dos últimos meses".
export default function GfCardComparacaoMedia({ comparacao, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  const v = (n: number) => (visivel ? formatMoeda(n, estado) : '••••••')

  if (comparacao.mesesBaseUsados === 0) {
    return (
      <p className="text-[12px] text-slate-500 py-2">
        Ainda não há meses anteriores suficientes pra calcular sua média — volte aqui depois de mais alguns meses de uso.
      </p>
    )
  }

  const varReceitas = comparacao.receitasMedia > 0 ? ((comparacao.receitasAtual - comparacao.receitasMedia) / comparacao.receitasMedia) * 100 : null
  const varDespesas = comparacao.despesasMedia > 0 ? ((comparacao.despesasAtual - comparacao.despesasMedia) / comparacao.despesasMedia) * 100 : null

  return (
    <div>
      <p className="text-[10.5px] text-slate-500 mb-3">Comparado com a média dos últimos {comparacao.mesesBaseUsados} meses</p>

      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
        <div className="rounded-xl bg-bg-card p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10.5px] text-slate-500">Receitas</p>
            <Selo variacao={varReceitas} />
          </div>
          <p className="text-[14px] font-bold text-white">{v(comparacao.receitasAtual)}</p>
          <p className="text-[10px] text-slate-600 mt-0.5">média: {v(comparacao.receitasMedia)}</p>
        </div>
        <div className="rounded-xl bg-bg-card p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10.5px] text-slate-500">Despesas</p>
            <Selo variacao={varDespesas} invertida />
          </div>
          <p className="text-[14px] font-bold text-white">{v(comparacao.despesasAtual)}</p>
          <p className="text-[10px] text-slate-600 mt-0.5">média: {v(comparacao.despesasMedia)}</p>
        </div>
      </div>

      {comparacao.categorias.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-3 border-t border-border">
          {comparacao.categorias.slice(0, 5).map((c) => {
            const Icone = iconePorNome(c.categoria.icone)
            return (
              <div key={c.categoria.id} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${c.categoria.cor}22` }}>
                  <Icone size={13} style={{ color: c.categoria.cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-slate-300 font-medium truncate">{c.categoria.nome}</p>
                  <p className="text-[10px] text-slate-600">média: {v(c.media)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-semibold text-white">{v(c.atual)}</p>
                  <Selo variacao={c.variacaoPercentual} invertida />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
