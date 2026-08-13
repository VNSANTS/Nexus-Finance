interface GraficoEvolucaoProps {
  retornoMensal: number
  cor: string
}

// Compara evolução simulada de 5 anos da carteira vs. CDI, usando polyline SVG puro (sem lib externa)
export default function GraficoEvolucao({ retornoMensal, cor }: GraficoEvolucaoProps) {
  const meses = 60
  const cdiMensal = 0.85
  const pontosCarteira: number[] = []
  const pontosCdi: number[] = []
  let saldoC = 10000
  let saldoCdi = 10000
  for (let m = 0; m <= meses; m += 6) {
    pontosCarteira.push(saldoC)
    pontosCdi.push(saldoCdi)
    for (let k = 0; k < 6; k++) {
      saldoC *= 1 + retornoMensal / 100
      saldoCdi *= 1 + cdiMensal / 100
    }
  }
  const max = Math.max(...pontosCarteira, ...pontosCdi)
  const w = 300
  const h = 100
  const toPoints = (arr: number[]) => arr.map((v, i) => `${(i / (arr.length - 1)) * w},${h - (v / max) * h}`).join(' ')

  return (
    <div>
      <svg width="100%" height={h + 20} viewBox={`0 0 ${w} ${h + 20}`} style={{ overflow: 'visible' }}>
        <polyline points={toPoints(pontosCdi)} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 3" />
        <polyline points={toPoints(pontosCarteira)} fill="none" stroke={cor} strokeWidth="2.5" />
      </svg>
      <div className="flex gap-3.5 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-[2.5px] rounded-sm" style={{ background: cor }} />
          <span className="text-[10.5px] text-slate-400">Sua carteira</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0.5 rounded-sm bg-slate-500" />
          <span className="text-[10.5px] text-slate-400">CDI</span>
        </div>
      </div>
    </div>
  )
}
