import { useMemo, useState } from 'react'
import type { PontoDiario } from '../selectors'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'

interface Props {
  pontos: PontoDiario[]
  visivel: boolean
}

// Gráfico de linha "Receitas x Despesas x Saldo" — versão mobile do gráfico
// de fluxo de caixa que aparece no dashboard desktop. Em vez de recharts
// (pesado pro que precisamos aqui), desenha um SVG simples com 3 linhas e
// tooltip ao tocar/passar o mouse num ponto, igual ao comportamento do
// mockup original.
export default function GfGraficoFluxo({ pontos, visivel }: Props) {
  const [indiceAtivo, setIndiceAtivo] = useState<number | null>(null)

  const w = 320
  const h = 150
  const padY = 10

  const { pathReceitas, pathDespesas, pathSaldo, escalaX, escalaY, temDados } = useMemo(() => {
    const todos = pontos.flatMap((p) => [p.receitas, p.despesas, p.saldoAcumulado, -p.saldoAcumulado])
    const maiorValor = Math.max(...todos, 0)
    const max = Math.max(maiorValor, 1)
    const escalaXFn = (i: number) => (i / Math.max(1, pontos.length - 1)) * w
    const escalaYFn = (valor: number) => h - padY - ((valor + max) / (max * 2)) * (h - padY * 2)

    const linha = (chave: 'receitas' | 'despesas' | 'saldoAcumulado') =>
      pontos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${escalaXFn(i)} ${escalaYFn(p[chave])}`).join(' ')

    return {
      pathReceitas: linha('receitas'),
      pathDespesas: linha('despesas'),
      pathSaldo: linha('saldoAcumulado'),
      escalaX: escalaXFn,
      escalaY: escalaYFn,
      temDados: maiorValor > 0,
    }
  }, [pontos, w, h])

  const ativo = indiceAtivo != null ? pontos[indiceAtivo] : null

  function aoTocar(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * w
    const i = Math.round((x / w) * (pontos.length - 1))
    setIndiceAtivo(Math.min(pontos.length - 1, Math.max(0, i)))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Legenda cor="#22C55E" label="Receitas" />
        <Legenda cor="#EF4444" label="Despesas" />
        <Legenda cor="#00D4FF" label="Saldo" />
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full touch-none"
        onPointerDown={aoTocar}
        onPointerMove={(e) => e.buttons === 1 && aoTocar(e)}
        onPointerLeave={() => setIndiceAtivo(null)}
      >
        <line x1={0} y1={escalaY(0)} x2={w} y2={escalaY(0)} stroke="#1C2740" strokeWidth={1} strokeDasharray="3 3" />
        <path d={pathReceitas} fill="none" stroke="#22C55E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathDespesas} fill="none" stroke="#EF4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathSaldo} fill="none" stroke="#00D4FF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {indiceAtivo != null && (
          <line x1={escalaX(indiceAtivo)} y1={0} x2={escalaX(indiceAtivo)} y2={h} stroke="#334155" strokeWidth={1} />
        )}
      </svg>

      <div className="flex justify-between text-[9.5px] text-slate-600 mt-1 px-0.5">
        <span>1</span>
        <span>{Math.ceil(pontos.length / 2)}</span>
        <span>{pontos.length}</span>
      </div>

      {ativo && (
        <div className="mt-3 card-surface rounded-xl p-3 flex flex-col gap-1.5">
          <p className="text-[11px] text-slate-400 font-semibold mb-0.5">Dia {ativo.dia}</p>
          <LinhaTooltip cor="#22C55E" label="Receitas" valor={ativo.receitas} visivel={visivel} />
          <LinhaTooltip cor="#EF4444" label="Despesas" valor={ativo.despesas} visivel={visivel} />
          <LinhaTooltip cor="#00D4FF" label="Saldo" valor={ativo.saldoAcumulado} visivel={visivel} />
        </div>
      )}
      {!temDados && !ativo && <p className="text-[11px] text-slate-600 mt-2">Toque na linha para ver o detalhe de cada dia.</p>}
    </div>
  )
}

function Legenda({ cor, label }: { cor: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: cor }} />
      <span className="text-[10.5px] text-slate-400">{label}</span>
    </div>
  )
}

function LinhaTooltip({ cor, label, valor, visivel }: { cor: string; label: string; valor: number; visivel: boolean }) {
  const { estado } = useGestaoFinanceira()
  return (
    <div className="flex items-center justify-between text-[11.5px]">
      <span className="flex items-center gap-1.5 text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cor }} /> {label}
      </span>
      <span className="font-semibold text-white">{visivel ? formatMoeda(valor, estado) : '••••'}</span>
    </div>
  )
}
