import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Transacao } from '../types'

interface Props {
  transacoes: Transacao[]
  diaSelecionado?: string | null
  onSelecionarDia?: (diaISO: string) => void
}

const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

// Calendário mensal compacto — mostra pontinhos nos dias com lançamento e
// destaca o dia de hoje, igual ao "Calendário Financeiro" do dashboard
// desktop. Navegação entre meses com as setas. Quando `onSelecionarDia` é
// passado, os dias ficam clicáveis e o dia escolhido (`diaSelecionado`)
// ganha um destaque próprio — usado pela tela de Lançamentos para editar
// outros dias sem sair da tela.
export default function GfCalendarioFinanceiro({ transacoes, diaSelecionado, onSelecionarDia }: Props) {
  const hoje = new Date()
  const [mesRef, setMesRef] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1))

  const diasComLancamento = useMemo(() => {
    const mesStr = `${mesRef.getFullYear()}-${String(mesRef.getMonth() + 1).padStart(2, '0')}`
    const set = new Set<number>()
    for (const t of transacoes) {
      if (t.data.startsWith(mesStr)) set.add(Number(t.data.slice(8, 10)))
    }
    return set
  }, [transacoes, mesRef])

  const grade = useMemo(() => {
    const primeiroDiaSemana = new Date(mesRef.getFullYear(), mesRef.getMonth(), 1).getDay()
    const totalDias = new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 0).getDate()
    const celulas: (number | null)[] = Array.from({ length: primeiroDiaSemana }, () => null)
    for (let d = 1; d <= totalDias; d++) celulas.push(d)
    while (celulas.length % 7 !== 0) celulas.push(null)
    return celulas
  }, [mesRef])

  const ehHoje = (dia: number) =>
    dia === hoje.getDate() && mesRef.getMonth() === hoje.getMonth() && mesRef.getFullYear() === hoje.getFullYear()

  const diaISO = (dia: number) => `${mesRef.getFullYear()}-${String(mesRef.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
  const ehSelecionado = (dia: number) => diaSelecionado === diaISO(dia)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setMesRef(new Date(mesRef.getFullYear(), mesRef.getMonth() - 1, 1))} className="text-slate-500 p-1" aria-label="Mês anterior">
          <ChevronLeft size={16} />
        </button>
        <p className="text-[13px] font-bold text-white">
          {MESES[mesRef.getMonth()]} {mesRef.getFullYear()}
        </p>
        <button onClick={() => setMesRef(new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 1))} className="text-slate-500 p-1" aria-label="Próximo mês">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1.5">
        {DIAS_SEMANA.map((d) => (
          <span key={d} className="text-[9px] text-slate-600 font-semibold text-center">
            {d}
          </span>
        ))}
        {grade.map((dia, i) => (
          <div key={i} className="flex flex-col items-center justify-center h-8">
            {dia != null && (
              <>
                <button
                  onClick={() => onSelecionarDia?.(diaISO(dia))}
                  disabled={!onSelecionarDia}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${
                    ehSelecionado(dia)
                      ? 'bg-accent-cyan text-bg font-bold'
                      : ehHoje(dia)
                        ? 'border border-accent-cyan text-accent-cyan font-bold'
                        : 'text-slate-300'
                  }`}
                >
                  {dia}
                </button>
                {diasComLancamento.has(dia) && !ehSelecionado(dia) && <span className="w-1 h-1 rounded-full bg-accent-cyan mt-0.5" />}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
