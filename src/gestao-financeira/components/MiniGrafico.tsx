// Mini sparkline usado no card "Saldo atual", reproduzindo o traçado azul em
// zigue-zague do mockup. Sem dados históricos reais ainda (isso depende do
// módulo de Lançamentos), então desenha uma curva estável neutra em vez de
// inventar números — assim que houver histórico diário isso substitui pelo
// saldo real dos últimos dias.
export default function MiniGrafico({ cor }: { cor: string }) {
  const pontos = [18, 22, 16, 26, 20, 30, 25, 34, 28, 38]
  const w = 110
  const h = 34
  const max = Math.max(...pontos)
  const min = Math.min(...pontos)
  const passo = w / (pontos.length - 1)

  const coords = pontos.map((p, i) => {
    const x = i * passo
    const y = h - ((p - min) / (max - min || 1)) * h
    return `${x},${y}`
  })

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <polyline points={coords.join(' ')} stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
