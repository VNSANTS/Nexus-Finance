import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings2 } from 'lucide-react'
import DonutChart from '@/components/DonutChart'
import GraficoEvolucao from '@/components/GraficoEvolucao'
import SliderInput from '@/components/SliderInput'
import { PERFIS_CARTEIRA } from '@banco-de-dados/perfis-carteira/perfis'
import { useUserProgress } from '@/hooks/useUserProgress'

type PerfilKey = 'conservador' | 'moderado' | 'agressivo'

export default function CarteiraPage() {
  const navigate = useNavigate()
  const { registrarPerfilCarteiraVisto } = useUserProgress()
  const [perfilAtivo, setPerfilAtivo] = useState<PerfilKey>('moderado')
  const [aba, setAba] = useState<'perfis' | 'dividendos' | 'passiva'>('perfis')
  const [valorSimulado, setValorSimulado] = useState(10000)

  // O perfil inicial ('moderado') já conta como "visto" mesmo sem clique —
  // senão a conquista "Explorador de Carteiras" nunca fecha os 3/3 pra quem
  // só troca de perfil duas vezes.
  useEffect(() => {
    registrarPerfilCarteiraVisto(perfilAtivo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfilAtivo])

  function trocarPerfil(key: PerfilKey) {
    setPerfilAtivo(key)
    registrarPerfilCarteiraVisto(key)
  }

  const perfil = PERFIS_CARTEIRA[perfilAtivo]
  const rendaAnualEstimada = valorSimulado * (perfil.retornoMensalEstimado / 100) * 12
  const fmt = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR')

  return (
    <div className="px-4 pt-5 pb-28">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-display font-extrabold text-white">Carteira</h1>
        <button
          onClick={() => navigate('/ferramentas')}
          className="flex items-center gap-1.5 card-surface rounded-full px-3 py-1.5"
        >
          <Settings2 size={13} className="text-slate-400" />
          <span className="text-[11.5px] text-slate-400 font-semibold">Ferramentas</span>
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-1 mb-4">Simule perfis e veja como sua carteira poderia render</p>

      <div className="flex gap-1.5 mb-4">
        <FiltroBtn label="Perfis" active={aba === 'perfis'} onClick={() => setAba('perfis')} />
        <FiltroBtn label="Dividendos" active={aba === 'dividendos'} onClick={() => setAba('dividendos')} />
        <FiltroBtn label="Renda Passiva" active={aba === 'passiva'} onClick={() => setAba('passiva')} />
      </div>

      {aba === 'perfis' && (
        <>
          <div className="flex gap-2 mb-5">
            {(Object.entries(PERFIS_CARTEIRA) as [PerfilKey, typeof perfil][]).map(([key, p]) => (
              <button
                key={key}
                onClick={() => trocarPerfil(key)}
                className="flex-1 h-10 rounded-2xl text-xs font-bold"
                style={{
                  background: perfilAtivo === key ? p.cor : '#0E1526',
                  color: perfilAtivo === key ? '#04070D' : '#94A3B8',
                  border: `1px solid ${perfilAtivo === key ? p.cor : '#1C2740'}`,
                }}
              >
                {p.nome}
              </button>
            ))}
          </div>

          <motion.div key={perfilAtivo} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-xs text-slate-400 leading-relaxed mb-5">{perfil.descricao}</p>

            <div className="flex flex-col items-center gap-4 mb-5">
              <div className="relative">
                <DonutChart dados={perfil.alocacao} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[11px] text-slate-500">retorno est.</span>
                  <span className="text-[15px] font-display font-extrabold text-white">{perfil.retornoMensalEstimado}%/mês</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                {perfil.alocacao.map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: a.cor }} />
                      <span className="text-xs text-slate-300">{a.classe}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{a.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-bold text-white mb-3">Evolução simulada (5 anos) vs. CDI</p>
              <div className="card-surface rounded-2xl p-3.5">
                <GraficoEvolucao retornoMensal={perfil.retornoMensalEstimado} cor={perfil.cor} />
              </div>
            </div>

            <div className="rounded-[18px] p-4" style={{ background: `${perfil.cor}14`, border: `1px solid ${perfil.cor}44` }}>
              <p className="text-xs font-bold text-white mb-2.5">Quanto renderia?</p>
              <SliderInput label="Valor investido" value={valorSimulado} onChange={setValorSimulado} min={1000} max={500000} step={500} prefix="R$ " />
              <div className="mt-3 flex justify-between items-baseline">
                <span className="text-[11px] text-slate-400">Renda estimada ao ano</span>
                <span className="text-[17px] font-display font-extrabold text-white">{fmt(rendaAnualEstimada)}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {aba === 'dividendos' && (
        <CarteiraComposicao
          texto="Foco em renda mensal: ações historicamente boas pagadoras combinadas com FIIs de tijolo e papel, buscando fluxo de caixa recorrente."
          composicao={[
            { classe: 'Ações pagadoras de dividendos', pct: 55, cor: '#EC4899' },
            { classe: 'Fundos Imobiliários', pct: 35, cor: '#FFC93C' },
            { classe: 'Renda Fixa (colchão)', pct: 10, cor: '#22C55E' },
          ]}
          nota="Calendário de proventos do mês chega em breve"
        />
      )}

      {aba === 'passiva' && (
        <CarteiraComposicao
          texto="Mix pensado para quem quer viver de renda: previsibilidade da renda fixa combinada com o potencial de crescimento dos dividendos."
          composicao={[
            { classe: 'Renda Fixa (Tesouro, CDB)', pct: 60, cor: '#22C55E' },
            { classe: 'Dividendos (ações + FIIs)', pct: 40, cor: '#FFC93C' },
          ]}
        />
      )}
    </div>
  )
}

function FiltroBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 h-[34px] rounded-xl text-[11.5px] font-semibold whitespace-nowrap px-2"
      style={{
        background: active ? '#EC4899' : '#0E1526',
        color: active ? '#fff' : '#94A3B8',
        border: `1px solid ${active ? '#EC4899' : '#1C2740'}`,
      }}
    >
      {label}
    </button>
  )
}

function CarteiraComposicao({
  texto,
  composicao,
  nota,
}: {
  texto: string
  composicao: { classe: string; pct: number; cor: string }[]
  nota?: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-xs text-slate-400 leading-relaxed mb-5">{texto}</p>
      <div className="flex flex-col items-center gap-4">
        <DonutChart dados={composicao} />
        <div className="flex flex-col gap-1.5 w-full">
          {composicao.map((a, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: a.cor }} />
                <span className="text-xs text-slate-300">{a.classe}</span>
              </div>
              <span className="text-xs font-bold text-white">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      {nota && (
        <div className="mt-4 p-3.5 rounded-2xl border border-dashed border-border text-center">
          <p className="text-[11.5px] text-slate-500">{nota}</p>
        </div>
      )}
    </motion.div>
  )
}
