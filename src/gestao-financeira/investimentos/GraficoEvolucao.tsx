import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import type { RegistroHistoricoPatrimonio } from '../types'
import { formatMoeda } from '../formatMoeda'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'

/**
 * Gráfico de evolução do patrimônio (Tela 1 do doc de referência): 3
 * linhas sobrepostas (Renda Fixa / Renda Variável / Cripto). Os pontos vêm
 * de estado.historicoPatrimonio — 1 registro por dia, criado a partir de
 * agora (ver GfInvestidorPage.tsx). Sem dado retroativo: quem já tinha
 * investimentos antes dessa versão existir só vê o histórico crescer a
 * partir de hoje, não é possível reconstruir o passado.
 */
export default function GraficoEvolucao({ dados }: { dados: RegistroHistoricoPatrimonio[] }) {
  const { estado } = useGestaoFinanceira()

  if (dados.length < 2) {
    return (
      <div className="card-surface rounded-[18px] p-4 mb-3.5 flex items-center justify-center h-[140px]">
        <p className="text-[12px] text-slate-500 text-center px-4">
          O gráfico de evolução aparece aqui a partir de amanhã — precisa de pelo menos 2 dias de dados pra desenhar uma linha.
        </p>
      </div>
    )
  }

  const pontos = dados.map((r) => ({
    data: new Date(r.data + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    'Renda Fixa': Math.round(r.rendaFixa),
    'Renda Variável': Math.round(r.rendaVariavel),
    Cripto: Math.round(r.cripto),
  }))

  return (
    <div className="card-surface rounded-[18px] p-4 mb-3.5">
      <p className="text-xs text-slate-500 mb-2">Evolução do patrimônio</p>
      <div style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer>
          <LineChart data={pontos} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="data" tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1F2937', borderRadius: 10, fontSize: 11 }}
              formatter={(valor: number) => formatMoeda(valor, estado)}
            />
            <Line type="monotone" dataKey="Renda Fixa" stroke="#22C55E" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Renda Variável" stroke="#00D4FF" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Cripto" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-3.5 mt-2 justify-center">
        <LegendaCor cor="#22C55E" label="Renda Fixa" />
        <LegendaCor cor="#00D4FF" label="Renda Variável" />
        <LegendaCor cor="#F59E0B" label="Cripto" />
      </div>
    </div>
  )
}

function LegendaCor({ cor, label }: { cor: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ background: cor }} />
      <span className="text-[10px] text-slate-500">{label}</span>
    </div>
  )
}
