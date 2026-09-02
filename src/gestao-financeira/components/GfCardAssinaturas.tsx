import { Repeat } from 'lucide-react'
import type { AssinaturaDetectada } from '../relatorios'
import { iconePorNome } from '../iconMap'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  assinaturas: AssinaturaDetectada[]
  visivel: boolean
}

// Lista as assinaturas/gastos recorrentes detectados automaticamente
// (ver detectarAssinaturas em relatorios.ts). É uma detecção heurística a
// partir dos próprios lançamentos — vale a pena deixar claro pro usuário que
// é uma estimativa, não uma leitura de fatura.
export default function GfCardAssinaturas({ assinaturas, visivel }: Props) {
  const { estado } = useGestaoFinanceira()
  if (assinaturas.length === 0) {
    return (
      <p className="text-[12px] text-slate-500 py-2">
        Nenhuma assinatura recorrente identificada ainda. Quando um mesmo gasto aparecer em 3 meses seguidos com valor parecido, ele aparece aqui.
      </p>
    )
  }

  const totalMensal = assinaturas.reduce((s, a) => s + a.valorMedio, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-border">
        <p className="text-[11.5px] text-slate-500">Total estimado por mês</p>
        <p className="text-[15px] font-display font-extrabold text-white">{visivel ? formatMoeda(totalMensal, estado) : '••••'}</p>
      </div>
      <div className="flex flex-col gap-3">
        {assinaturas.map((a) => {
          const Icone = a.categoria ? iconePorNome(a.categoria.icone) : Repeat
          const cor = a.categoria?.cor ?? '#64748B'
          return (
            <div key={a.descricao} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
                <Icone size={14} style={{ color: cor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] text-white font-semibold truncate">{a.descricao}</p>
                <p className="text-[10.5px] text-slate-500">
                  {a.ocorrencias}x nos últimos meses · {a.categoria?.nome ?? 'Sem categoria'}
                </p>
              </div>
              <span className="text-[12.5px] font-semibold text-slate-300 shrink-0">
                ~{visivel ? formatMoeda(a.valorMedio, estado) : '••••'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
