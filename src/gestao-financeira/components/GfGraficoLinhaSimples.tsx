import { useMemo, useState } from 'react'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface PontoLinha {
  label: string
  valor: number
  projetado?: boolean
}

interface Props {
  pontos: PontoLinha[]
  visivel: boolean
  cor?: string
}

// Gráfico de linha única (patrimônio ao longo do tempo, ou saldo
// projetado) — mesmo espírito dos outros gráficos do módulo: SVG desenhado
// à mão, sem lib externa, com toque pra ver o valor de cada ponto. Pontos
// marcados como `projetado` desenham o trecho da linha tracejado.
export default function GfGraficoLinhaSimples({ pontos, visivel, cor = '#00D4FF' }: Props) {
  const { estado } = useGestaoFinanceira()
  const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null)

  const w = 320
  const h = 130
  const padY = 10

  const { path, pathTracejado, escalaX, escalaY, indicePrimeiroProjetado } = useMemo(() => {
    const valores = pontos.map((p) => p.valor)
    const max = Math.max(...valores, 1)
    const min = Math.min(...valores, 0)
    const faixa = Math.max(max - min, 1)
    const escalaXFn = (i: number) => (i / Math.max(1, pontos.length - 1)) * w
    const escalaYFn = (valor: number) => h - padY - ((valor - min) / faixa) * (h - padY * 2)

    const primeiroProjetado = pontos.findIndex((p) => p.projetado)

    const construirPath = (de: number, ate: number) =>
      pontos
        .slice(de, ate)
        .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${escalaXFn(de + idx)} ${escalaYFn(p.valor)}`)
        .join(' ')

    return {
      path: primeiroProjetado === -1 ? construirPath(0, pontos.length) : construirPath(0, primeiroProjetado + 1),
      pathTracejado: primeiroProjetado === -1 ? '' : construirPath(primeiroProjetado, pontos.length),
      escalaX: escalaXFn,
      escalaY: escalaYFn,
      indicePrimeiroProjetado: primeiroProjetado,
    }
  }, [pontos, w, h])

  const ativo = indiceAtivo != null ? pontos[indiceAtivo] : null

  function aoTocar(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * w
    const i = Math.round((x / w) * (pontos.length - 1))
    setIndiceAtivo(Math.min(pontos.length - 1, Math.max(0, i)))
  }

  if (pontos.length === 0) {
    return <p className="text-[12.5px] text-slate-500 py-3 text-center">Sem dados suficientes ainda.</p>
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full touch-none"
        onPointerDown={aoTocar}
        onPointerMove={(e) => e.buttons === 1 && aoTocar(e)}
        onPointerLeave={() => setIndiceAtivo(null)}
      >
        <path d={path} fill="none" stroke={cor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {pathTracejado && (
          <path d={pathTracejado} fill="none" stroke={cor} strokeWidth={2.5} strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
        )}
        {pontos.map((p, i) => (
          <circle key={i} cx={escalaX(i)} cy={escalaY(p.valor)} r={i === indiceAtivo ? 4 : 2.5} fill={p.projetado ? '#0B0F1A' : cor} stroke={cor} strokeWidth={p.projetado ? 2 : 0} />
        ))}
        {indiceAtivo != null && <line x1={escalaX(indiceAtivo)} y1={0} x2={escalaX(indiceAtivo)} y2={h} stroke="#334155" strokeWidth={1} />}
      </svg>

      <div className="flex justify-between text-[9.5px] text-slate-600 mt-1 px-0.5">
        <span>{pontos[0]?.label}</span>
        {indicePrimeiroProjetado > 0 && <span className="text-slate-500">projeção a partir daqui ⤏</span>}
        <span>{pontos[pontos.length - 1]?.label}</span>
      </div>

      {ativo ? (
        <div className="mt-2 card-surface rounded-xl p-3 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 font-semibold">
            {ativo.label} {ativo.projetado && <span className="text-slate-600">(projetado)</span>}
          </p>
          <p className="text-[13px] font-bold text-white">{visivel ? formatMoeda(ativo.valor, estado) : '••••'}</p>
        </div>
      ) : (
        <p className="text-[11px] text-slate-600 mt-1">Toque na linha para ver o valor de cada ponto.</p>
      )}
    </div>
  )
}
