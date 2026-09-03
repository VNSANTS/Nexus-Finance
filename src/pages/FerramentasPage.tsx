import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Calculator, TrendingDown, PiggyBank, Flag, Percent, Milestone,
  Home, ShieldAlert, CreditCard, Landmark, ArrowLeftRight, ReceiptText, Hourglass,
  BarChart3, PiggyBank as PiggyBankIcon, Coins, Scale, CalendarClock,
  FileBarChart, Gauge, Scissors, Filter, Radar, History, Trash2, X,
  type LucideIcon,
} from 'lucide-react'
import SliderInput from '@/components/SliderInput'
import { useUserProgress } from '@/hooks/useUserProgress'

const CALCULADORAS = [
  { id: 'basica', nome: 'Calculadora Básica', desc: 'Soma, subtração, multiplicação e divisão', Icon: Calculator, cor: '#00D4FF' },
  { id: 'juros-compostos', nome: 'Juros Compostos', desc: 'Veja seu dinheiro crescer com aportes constantes', Icon: Calculator, cor: '#FFC93C' },
  { id: 'regra-72', nome: 'Regra dos 72', desc: 'Em quanto tempo seu capital dobra', Icon: TrendingDown, cor: '#22C55E' },
  { id: 'dividendos', nome: 'Renda de Dividendos', desc: 'Estime sua renda passiva mensal', Icon: PiggyBank, cor: '#FFC93C' },
  { id: 'fire', nome: 'Aposentadoria (FIRE)', desc: 'Patrimônio necessário para viver de renda', Icon: Flag, cor: '#8B5CF6' },
  { id: 'conversor-taxas', nome: 'Conversor de Taxas', desc: 'Ao ano, ao mês, nominal e real', Icon: Percent, cor: '#3B82F6' },
  { id: 'primeiro-milhao', nome: 'Primeiro Milhão', desc: 'Quando você chega no R$ 1.000.000', Icon: Milestone, cor: '#FFC93C' },
  { id: 'planejador-metas', nome: 'Planejador de Metas', desc: 'Quanto guardar por mês para uma meta', Icon: Flag, cor: '#EC4899' },
  { id: 'financiamento', nome: 'Financiamento / Amortização', desc: 'Parcela, juros totais e tabela SAC vs. Price', Icon: Home, cor: '#3B82F6' },
  { id: 'fundo-emergencia', nome: 'Fundo de Emergência', desc: 'Quanto guardar e em quanto tempo', Icon: ShieldAlert, cor: '#22C55E' },
  { id: 'quitacao-dividas', nome: 'Quitação de Dívidas', desc: 'Estratégia bola de neve para sair do vermelho', Icon: CreditCard, cor: '#EF4444' },
  { id: 'inflacao', nome: 'Inflação / Poder de Compra', desc: 'Quanto seu dinheiro vale no futuro', Icon: TrendingDown, cor: '#FFC93C' },
  { id: 'aporte-aposentadoria', nome: 'Aporte para Aposentadoria', desc: 'Quanto investir por mês para se aposentar', Icon: Landmark, cor: '#8B5CF6' },
  { id: 'rentabilidade-real', nome: 'Rentabilidade Real', desc: 'Retorno já descontada a inflação', Icon: Percent, cor: '#00D4FF' },
  { id: 'ir-investimentos', nome: 'Imposto de Renda sobre Investimentos', desc: 'IR regressivo por prazo em renda fixa', Icon: ReceiptText, cor: '#EC4899' },
  { id: 'independencia-por-idade', nome: 'Independência Financeira por Idade', desc: 'Com quantos anos você para de precisar trabalhar', Icon: Hourglass, cor: '#3B82F6' },
  { id: 'comparador-investimentos', nome: 'Comparação de Investimentos', desc: 'Compare dois investimentos lado a lado', Icon: BarChart3, cor: '#22C55E' },
  { id: 'orcamento-50-30-20', nome: 'Orçamento 50-30-20', desc: 'Divida sua renda em necessidades, desejos e poupança', Icon: Scale, cor: '#FFC93C' },
  { id: 'previdencia-privada', nome: 'Previdência Privada (PGBL/VGBL)', desc: 'Simule sua reserva de previdência', Icon: PiggyBankIcon, cor: '#8B5CF6' },
  { id: 'dividend-yield-oncost', nome: 'Dividend Yield / Yield on Cost', desc: 'Rendimento sobre preço atual e sobre preço pago', Icon: Coins, cor: '#22C55E' },
  { id: 'custo-oportunidade', nome: 'Custo de Oportunidade', desc: 'O que você deixa de ganhar ao escolher uma opção', Icon: ArrowLeftRight, cor: '#EF4444' },
  { id: 'reserva-objetivo-curto', nome: 'Reserva para Objetivo de Curto Prazo', desc: 'Quanto guardar por mês para uma meta próxima', Icon: CalendarClock, cor: '#3B82F6' },
  { id: 'ltv-cac-calc', nome: 'LTV/CAC', desc: 'A régua que decide se vale a pena crescer', Icon: Scale, cor: '#EC4899' },
  { id: 'funil-conversao-calc', nome: 'Funil de Conversão', desc: 'Onde o dinheiro vaza no seu processo de vendas', Icon: Filter, cor: '#3B82F6' },
  { id: 'k-factor-calc', nome: 'k-factor (Coeficiente Viral)', desc: 'Quantos clientes cada cliente traz sozinho', Icon: Radar, cor: '#22C55E' },
  { id: 'dre-calc', nome: 'DRE Simplificado', desc: 'Da receita bruta ao lucro líquido, camada por camada', Icon: FileBarChart, cor: '#8B5CF6' },
  { id: 'ccc-calc', nome: 'CCC — Ciclo de Conversão de Caixa', desc: 'Quanto tempo seu dinheiro fica preso no ciclo', Icon: Hourglass, cor: '#F97316' },
  { id: 'roic-wacc-calc', nome: 'ROIC vs. WACC', desc: 'Esse investimento cria ou destrói valor?', Icon: Scale, cor: '#00D4FF' },
  { id: 'oee-calc', nome: 'OEE — Eficiência Real', desc: 'Disponibilidade, performance e qualidade combinadas', Icon: Gauge, cor: '#FFC93C' },
  { id: 'alavancagem-custo-calc', nome: 'Alavancagem de Corte de Custo', desc: 'Qual corte tem o maior efeito no lucro', Icon: Scissors, cor: '#EF4444' },
]

export default function FerramentasPage() {
  const navigate = useNavigate()
  const { registrarCalculadoraUsada } = useUserProgress()
  const [ativa, setAtiva] = useState<string | null>(null)

  function abrirCalculadora(id: string) {
    setAtiva(id)
    registrarCalculadoraUsada(id)
  }

  if (ativa) {
    return <CalculadoraRouter id={ativa} onBack={() => setAtiva(null)} />
  }

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/carteira')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Carteira
      </button>
      <h1 className="text-xl font-display font-extrabold text-white">Ferramentas</h1>
      <p className="text-xs text-slate-500 mt-1 mb-4">30 calculadoras para planejar sua vida financeira e seus negócios</p>

      <div className="flex flex-col gap-2.5">
        {CALCULADORAS.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => abrirCalculadora(c.id)}
            className="flex items-center gap-3 card-surface rounded-2xl p-3.5 text-left"
          >
            <div className="w-[42px] h-[42px] rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${c.cor}1A` }}>
              <c.Icon size={19} style={{ color: c.cor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-bold text-white">{c.nome}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
            </div>
            <ChevronRight size={17} className="text-slate-500 shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function CalcShell({
  onBack,
  icon: Icon,
  iconColor,
  titulo,
  subtitulo,
  children,
}: {
  onBack: () => void
  icon: LucideIcon
  iconColor: string
  titulo: string
  subtitulo: string
  children: ReactNode
}) {
  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Voltar
      </button>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-[42px] h-[42px] rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${iconColor}1A` }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white">{titulo}</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">{subtitulo}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function ResultCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.6, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="rounded-[20px] p-5 mb-4"
      style={{ background: `linear-gradient(135deg, ${color}1A, #3B82F61A)`, border: `1px solid ${color}44` }}
    >
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-[26px] font-display font-extrabold text-white mt-1 truncate" title={value}>
        {value}
      </p>
      {sub && (
        <p className="text-xs font-semibold mt-2 truncate" style={{ color }} title={sub}>
          {sub}
        </p>
      )}
    </motion.div>
  )
}

function CalculadoraRouter({ id, onBack }: { id: string; onBack: () => void }) {
  switch (id) {
    case 'basica':
      return <CalcBasica onBack={onBack} />
    case 'juros-compostos':
      return <CalcJurosCompostos onBack={onBack} />
    case 'regra-72':
      return <CalcRegra72 onBack={onBack} />
    case 'dividendos':
      return <CalcDividendos onBack={onBack} />
    case 'fire':
      return <CalcFire onBack={onBack} />
    case 'conversor-taxas':
      return <CalcConversorTaxas onBack={onBack} />
    case 'primeiro-milhao':
      return <CalcPrimeiroMilhao onBack={onBack} />
    case 'planejador-metas':
      return <CalcPlanejadorMetas onBack={onBack} />
    case 'financiamento':
      return <CalcFinanciamento onBack={onBack} />
    case 'fundo-emergencia':
      return <CalcFundoEmergencia onBack={onBack} />
    case 'quitacao-dividas':
      return <CalcQuitacaoDividas onBack={onBack} />
    case 'inflacao':
      return <CalcInflacao onBack={onBack} />
    case 'aporte-aposentadoria':
      return <CalcAporteAposentadoria onBack={onBack} />
    case 'rentabilidade-real':
      return <CalcRentabilidadeReal onBack={onBack} />
    case 'ir-investimentos':
      return <CalcIRInvestimentos onBack={onBack} />
    case 'independencia-por-idade':
      return <CalcIndependenciaPorIdade onBack={onBack} />
    case 'comparador-investimentos':
      return <CalcComparadorInvestimentos onBack={onBack} />
    case 'orcamento-50-30-20':
      return <CalcOrcamento503020 onBack={onBack} />
    case 'previdencia-privada':
      return <CalcPrevidenciaPrivada onBack={onBack} />
    case 'dividend-yield-oncost':
      return <CalcDividendYieldOnCost onBack={onBack} />
    case 'custo-oportunidade':
      return <CalcCustoOportunidade onBack={onBack} />
    case 'reserva-objetivo-curto':
      return <CalcReservaObjetivoCurto onBack={onBack} />
    case 'ltv-cac-calc':
      return <CalcLtvCac onBack={onBack} />
    case 'funil-conversao-calc':
      return <CalcFunilConversao onBack={onBack} />
    case 'k-factor-calc':
      return <CalcKFactor onBack={onBack} />
    case 'dre-calc':
      return <CalcDreSimplificado onBack={onBack} />
    case 'ccc-calc':
      return <CalcCCC onBack={onBack} />
    case 'roic-wacc-calc':
      return <CalcRoicWacc onBack={onBack} />
    case 'oee-calc':
      return <CalcOEE onBack={onBack} />
    case 'alavancagem-custo-calc':
      return <CalcAlavancagemCorteCusto onBack={onBack} />
    default:
      return null
  }
}

function fmt(v: number) {
  // Valores não-finitos (Infinity/NaN, comuns com taxas/prazos extremos) não têm representação numérica útil
  if (!isFinite(v)) return 'R$ —'
  // Acima de 1 quatrilhão o valor deixa de ser um cenário financeiro plausível — mostramos em notação
  // científica compacta em vez de uma string com centenas de dígitos, que é cara de formatar/renderizar
  // e é a principal causa do travamento ao arrastar os sliders com valores exagerados.
  if (Math.abs(v) >= 1e15) {
    return 'R$ ' + v.toExponential(2).replace('.', ',').replace('e+', ' × 10^').replace('e-', ' × 10^-')
  }
  return 'R$ ' + Math.round(v).toLocaleString('pt-BR')
}

function CalcJurosCompostos({ onBack }: { onBack: () => void }) {
  const [aporteInicial, setAporteInicial] = useState(1000)
  const [aporteMensal, setAporteMensal] = useState(200)
  const [taxaMensal, setTaxaMensal] = useState(0.8)
  const [anos, setAnos] = useState(20)

  const meses = anos * 12
  let saldo = aporteInicial
  let totalInvestido = aporteInicial
  const historico: { ano: number; saldo: number }[] = [{ ano: 0, saldo: aporteInicial }]
  for (let m = 1; m <= meses; m++) {
    saldo = saldo * (1 + taxaMensal / 100) + aporteMensal
    totalInvestido += aporteMensal
    if (m % 12 === 0) historico.push({ ano: m / 12, saldo: Math.round(saldo) })
  }
  const totalJuros = saldo - totalInvestido

  return (
    <CalcShell onBack={onBack} icon={Calculator} iconColor="#FFC93C" titulo="Juros Compostos" subtitulo="Simule o crescimento do seu dinheiro ao longo do tempo">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Aporte inicial" value={aporteInicial} onChange={setAporteInicial} min={0} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={0} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de juros" value={taxaMensal} onChange={setTaxaMensal} min={0.1} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Prazo" value={anos} onChange={setAnos} min={1} max={40} step={1} suffix=" anos" />
      </div>
      <ResultCard label="Valor final estimado" value={fmt(saldo)} sub={`Investido: ${fmt(totalInvestido)} · Juros: ${fmt(totalJuros)}`} color="#00D4FF" />
      <div className="rounded-2xl overflow-hidden border border-border">
        {[5, 10, 15, 20, anos]
          .filter((a, i, arr) => a <= anos && arr.indexOf(a) === i)
          .sort((a, b) => a - b)
          .map((ano, i) => {
            const ponto = historico.find((h) => h.ano === ano) || historico[historico.length - 1]
            return (
              <div key={ano} className={`flex justify-between items-center gap-2 px-3.5 py-2.5 ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-card/50'}`}>
                <span className="text-xs text-slate-300 shrink-0">Ano {ano}</span>
                <span className="text-xs font-bold text-white truncate text-right flex-1 min-w-0" title={fmt(ponto.saldo)}>
                  {fmt(ponto.saldo)}
                </span>
              </div>
            )
          })}
      </div>
    </CalcShell>
  )
}

function CalcRegra72({ onBack }: { onBack: () => void }) {
  const [taxa, setTaxa] = useState(10.75)
  const anos = (72 / taxa).toFixed(1)
  const anosPoupanca = (72 / 6).toFixed(1)
  return (
    <CalcShell onBack={onBack} icon={TrendingDown} iconColor="#22C55E" titulo="Regra dos 72" subtitulo="Em quanto tempo seu dinheiro dobra">
      <div className="mb-5">
        <SliderInput label="Taxa de juros ao ano" value={taxa} onChange={setTaxa} min={1} max={1000} step={0.25} suffix="% a.a." decimals={2} />
      </div>
      <ResultCard label="Tempo para dobrar o capital" value={`${anos} anos`} sub="À Selic atual (~10,75% a.a.)" color="#22C55E" />
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">Na taxa escolhida</span>
          <span className="text-xs font-bold text-white">{anos} anos</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">Na poupança (~6% a.a.)</span>
          <span className="text-xs font-bold text-white">{anosPoupanca} anos</span>
        </div>
      </div>
    </CalcShell>
  )
}

function CalcDividendos({ onBack }: { onBack: () => void }) {
  const [patrimonio, setPatrimonio] = useState(100000)
  const [yieldAnual, setYieldAnual] = useState(8)
  const rendaAnual = patrimonio * (yieldAnual / 100)
  const rendaMensal = rendaAnual / 12
  return (
    <CalcShell onBack={onBack} icon={PiggyBank} iconColor="#FFC93C" titulo="Renda de Dividendos" subtitulo="Estime sua renda passiva mensal">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Patrimônio investido" value={patrimonio} onChange={setPatrimonio} min={1000} max={2000000} step={1000} prefix="R$ " />
        <SliderInput label="Dividend Yield anual" value={yieldAnual} onChange={setYieldAnual} min={1} max={1000} step={0.5} suffix="% a.a." decimals={1} />
      </div>
      <ResultCard label="Renda mensal estimada" value={fmt(rendaMensal)} sub={`${fmt(rendaAnual)} por ano`} color="#FFC93C" />
      <p className="text-[11.5px] text-slate-500 leading-relaxed">
        Estimativa baseada em yield constante — na prática, dividendos variam mês a mês conforme os resultados das empresas ou FIIs.
      </p>
    </CalcShell>
  )
}

function CalcFire({ onBack }: { onBack: () => void }) {
  const [gastoMensal, setGastoMensal] = useState(5000)
  const [aporteMensal, setAporteMensal] = useState(1500)
  const [taxaMensal, setTaxaMensal] = useState(0.8)
  const patrimonioNecessario = (gastoMensal * 12) / 0.04
  let saldo = 0
  let meses = 0
  while (saldo < patrimonioNecessario && meses < 720) {
    saldo = saldo * (1 + taxaMensal / 100) + aporteMensal
    meses++
  }
  const anosResult = Math.floor(meses / 12)
  const mesesRestantes = meses % 12
  return (
    <CalcShell onBack={onBack} icon={Flag} iconColor="#8B5CF6" titulo="Aposentadoria (FIRE)" subtitulo="Patrimônio necessário para viver de renda">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Gasto mensal desejado" value={gastoMensal} onChange={setGastoMensal} min={1000} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Aporte mensal atual" value={aporteMensal} onChange={setAporteMensal} min={0} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Patrimônio necessário" value={fmt(patrimonioNecessario)} sub="Regra dos 4% ao ano" color="#8B5CF6" />
      <div className="p-3.5 rounded-2xl card-surface">
        <p className="text-[11px] text-slate-500">No ritmo atual de aportes, você chega lá em</p>
        <p className="text-base font-bold text-white mt-1">
          {meses >= 720 ? 'mais de 60 anos' : `${anosResult} anos${mesesRestantes ? ` e ${mesesRestantes} meses` : ''}`}
        </p>
      </div>
    </CalcShell>
  )
}

function CalcConversorTaxas({ onBack }: { onBack: () => void }) {
  const [taxaAno, setTaxaAno] = useState(10.75)
  const [ipca, setIpca] = useState(4.5)
  const taxaMes = (Math.pow(1 + taxaAno / 100, 1 / 12) - 1) * 100
  const taxaReal = ((1 + taxaAno / 100) / (1 + ipca / 100) - 1) * 100
  return (
    <CalcShell onBack={onBack} icon={Percent} iconColor="#3B82F6" titulo="Conversor de Taxas" subtitulo="Ao ano, ao mês, nominal e real">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Taxa ao ano (nominal)" value={taxaAno} onChange={setTaxaAno} min={0.5} max={1000} step={0.25} suffix="% a.a." decimals={2} />
        <SliderInput label="IPCA (inflação) estimado" value={ipca} onChange={setIpca} min={0} max={1000} step={0.1} suffix="% a.a." decimals={1} />
      </div>
      <ResultCard label="Equivalente ao mês" value={`${taxaMes.toFixed(3)}%`} color="#3B82F6" />
      <div className="rounded-2xl p-4" style={{ background: '#22C55E14', border: '1px solid #22C55E44' }}>
        <p className="text-[11px] text-slate-400">Taxa real (descontando IPCA)</p>
        <p className="text-[22px] font-display font-extrabold text-white mt-1">{taxaReal.toFixed(2)}% a.a.</p>
      </div>
    </CalcShell>
  )
}

function CalcPrimeiroMilhao({ onBack }: { onBack: () => void }) {
  const [aporteMensal, setAporteMensal] = useState(1000)
  const [taxaMensal, setTaxaMensal] = useState(0.8)
  let saldo = 0
  let meses = 0
  const marcos: Record<number, number> = {}
  while (saldo < 1000000 && meses < 720) {
    saldo = saldo * (1 + taxaMensal / 100) + aporteMensal
    meses++
    ;[100000, 250000, 500000].forEach((marco) => {
      if (!marcos[marco] && saldo >= marco) marcos[marco] = meses
    })
  }
  const anosResult = Math.floor(meses / 12)
  const mesesRestantes = meses % 12
  return (
    <CalcShell onBack={onBack} icon={Milestone} iconColor="#FFC93C" titulo="Simulador do Primeiro Milhão" subtitulo="Quando você chega lá, com marcos no caminho">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={50} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard
        label="Seu primeiro milhão em"
        value={meses >= 720 ? '60+ anos' : `${anosResult}a ${mesesRestantes}m`}
        sub="Mantendo o aporte constante"
        color="#FFC93C"
      />
      <div className="rounded-2xl overflow-hidden border border-border">
        {[100000, 250000, 500000].map((marco, i) => (
          <div key={marco} className={`flex justify-between px-3.5 py-2.5 ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-card/50'}`}>
            <span className="text-xs text-slate-300">{fmt(marco)}</span>
            <span className="text-xs font-bold text-white">
              {marcos[marco] ? `${Math.floor(marcos[marco] / 12)}a ${marcos[marco] % 12}m` : '—'}
            </span>
          </div>
        ))}
      </div>
    </CalcShell>
  )
}

function CalcPlanejadorMetas({ onBack }: { onBack: () => void }) {
  const [metaValor, setMetaValor] = useState(50000)
  const [prazoAnos, setPrazoAnos] = useState(5)
  const [taxaMensal, setTaxaMensal] = useState(0.8)
  const meses = prazoAnos * 12
  const i = taxaMensal / 100
  const aporteNecessario = i === 0 ? metaValor / meses : (metaValor * i) / (Math.pow(1 + i, meses) - 1)
  return (
    <CalcShell onBack={onBack} icon={Flag} iconColor="#EC4899" titulo="Planejador de Metas" subtitulo="Quanto guardar por mês para chegar lá">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor da meta" value={metaValor} onChange={setMetaValor} min={1000} max={1000000} step={500} prefix="R$ " />
        <SliderInput label="Prazo" value={prazoAnos} onChange={setPrazoAnos} min={1} max={30} step={1} suffix=" anos" />
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Aporte mensal necessário" value={fmt(aporteNecessario)} sub={`Para juntar ${fmt(metaValor)} em ${prazoAnos} anos`} color="#EC4899" />
    </CalcShell>
  )
}

// 1. Financiamento / Amortização (SAC vs Price)
function CalcFinanciamento({ onBack }: { onBack: () => void }) {
  const [valorFinanciado, setValorFinanciado] = useState(300000)
  const [taxaMensal, setTaxaMensal] = useState(0.9)
  const [prazoAnos, setPrazoAnos] = useState(30)
  const meses = prazoAnos * 12
  const i = taxaMensal / 100

  // Price: parcela fixa
  const parcelaPrice = i === 0 ? valorFinanciado / meses : (valorFinanciado * i) / (1 - Math.pow(1 + i, -meses))
  const totalPrice = parcelaPrice * meses
  const jurosPrice = totalPrice - valorFinanciado

  // SAC: amortização fixa, parcela decrescente
  const amortizacaoSac = valorFinanciado / meses
  let saldoSac = valorFinanciado
  let totalSac = 0
  const primeiraParcelaSac = amortizacaoSac + saldoSac * i
  for (let m = 0; m < meses; m++) {
    const jurosDoMes = saldoSac * i
    totalSac += amortizacaoSac + jurosDoMes
    saldoSac -= amortizacaoSac
  }
  const jurosSac = totalSac - valorFinanciado

  return (
    <CalcShell onBack={onBack} icon={Home} iconColor="#3B82F6" titulo="Financiamento / Amortização" subtitulo="Compare o sistema SAC com o sistema Price">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor financiado" value={valorFinanciado} onChange={setValorFinanciado} min={20000} max={2000000} step={5000} prefix="R$ " />
        <SliderInput label="Taxa de juros" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Prazo" value={prazoAnos} onChange={setPrazoAnos} min={1} max={35} step={1} suffix=" anos" />
      </div>
      <ResultCard label="Parcela Price (fixa)" value={fmt(parcelaPrice)} sub={`Total pago: ${fmt(totalPrice)} · Juros: ${fmt(jurosPrice)}`} color="#3B82F6" />
      <ResultCard label="Parcela SAC (1ª, decrescente)" value={fmt(primeiraParcelaSac)} sub={`Total pago: ${fmt(totalSac)} · Juros: ${fmt(jurosSac)}`} color="#22C55E" />
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">Price: parcela constante, começa mais leve</span>
          <span className="text-xs font-bold text-white">{fmt(parcelaPrice)}/mês</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">SAC: parcela decrescente, menos juros no total</span>
          <span className="text-xs font-bold text-white">{fmt(jurosSac)} de juros</span>
        </div>
      </div>
    </CalcShell>
  )
}

// 2. Fundo de Emergência
function CalcFundoEmergencia({ onBack }: { onBack: () => void }) {
  const [gastoMensal, setGastoMensal] = useState(3000)
  const [meses, setMeses] = useState(6)
  const [aporteMensal, setAporteMensal] = useState(500)
  const metaTotal = gastoMensal * meses
  const mesesParaJuntar = aporteMensal > 0 ? Math.ceil(metaTotal / aporteMensal) : Infinity

  return (
    <CalcShell onBack={onBack} icon={ShieldAlert} iconColor="#22C55E" titulo="Fundo de Emergência" subtitulo="Quanto guardar e em quanto tempo você chega lá">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Gasto mensal essencial" value={gastoMensal} onChange={setGastoMensal} min={500} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Meses de cobertura desejados" value={meses} onChange={setMeses} min={3} max={12} step={1} suffix=" meses" />
        <SliderInput label="Quanto consigo guardar por mês" value={aporteMensal} onChange={setAporteMensal} min={50} max={1000000} step={50} prefix="R$ " />
      </div>
      <ResultCard label="Meta da reserva" value={fmt(metaTotal)} sub={`${meses} meses de gasto essencial cobertos`} color="#22C55E" />
      <ResultCard
        label="Tempo para juntar"
        value={isFinite(mesesParaJuntar) ? `${mesesParaJuntar} meses` : '—'}
        sub={isFinite(mesesParaJuntar) ? `Aportando ${fmt(aporteMensal)}/mês` : 'Defina um aporte mensal maior que zero'}
        color="#00D4FF"
      />
    </CalcShell>
  )
}

// 3. Quitação de Dívidas (bola de neve)
function CalcQuitacaoDividas({ onBack }: { onBack: () => void }) {
  const [totalDivida, setTotalDivida] = useState(8000)
  const [jurosMensal, setJurosMensal] = useState(12)
  const [pagamentoMensal, setPagamentoMensal] = useState(1200)

  const i = jurosMensal / 100
  let saldo = totalDivida
  let meses = 0
  let totalPago = 0
  const limiteIteracoes = 600 // 50 anos de teto de segurança contra loop infinito
  const nuncaQuita = pagamentoMensal <= totalDivida * i
  if (!nuncaQuita) {
    while (saldo > 0 && meses < limiteIteracoes) {
      const jurosDoMes = saldo * i
      const pagamentoEfetivo = Math.min(pagamentoMensal, saldo + jurosDoMes)
      saldo = saldo + jurosDoMes - pagamentoEfetivo
      totalPago += pagamentoEfetivo
      meses++
    }
  }
  const jurosTotais = totalPago - totalDivida

  return (
    <CalcShell onBack={onBack} icon={CreditCard} iconColor="#EF4444" titulo="Quitação de Dívidas" subtitulo="Quanto tempo e quanto custa sair do vermelho">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Total da dívida hoje" value={totalDivida} onChange={setTotalDivida} min={500} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Juros da dívida" value={jurosMensal} onChange={setJurosMensal} min={1} max={1000} step={0.5} suffix="% ao mês" decimals={1} />
        <SliderInput label="Quanto consigo pagar por mês" value={pagamentoMensal} onChange={setPagamentoMensal} min={50} max={1000000} step={50} prefix="R$ " />
      </div>
      {nuncaQuita ? (
        <ResultCard label="Atenção" value="Nunca quita assim" sub="O pagamento mensal não cobre nem os juros — a dívida só cresce. Aumente o valor pago." color="#EF4444" />
      ) : (
        <>
          <ResultCard label="Tempo para quitar" value={`${meses} meses`} sub={`Aproximadamente ${(meses / 12).toFixed(1)} anos`} color="#EF4444" />
          <ResultCard label="Total pago (com juros)" value={fmt(totalPago)} sub={`Juros pagos: ${fmt(jurosTotais)}`} color="#FFC93C" />
        </>
      )}
    </CalcShell>
  )
}

// 4. Inflação / Poder de Compra
function CalcInflacao({ onBack }: { onBack: () => void }) {
  const [valorHoje, setValorHoje] = useState(1000)
  const [inflacaoAnual, setInflacaoAnual] = useState(4.5)
  const [anos, setAnos] = useState(10)

  const valorFuturoNecessario = valorHoje * Math.pow(1 + inflacaoAnual / 100, anos)
  const poderDeCompraFuturo = valorHoje / Math.pow(1 + inflacaoAnual / 100, anos)

  return (
    <CalcShell onBack={onBack} icon={TrendingDown} iconColor="#FFC93C" titulo="Inflação / Poder de Compra" subtitulo="Quanto seu dinheiro vale no futuro">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor hoje" value={valorHoje} onChange={setValorHoje} min={10} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Inflação anual esperada" value={inflacaoAnual} onChange={setInflacaoAnual} min={1} max={1000} step={0.1} suffix="% a.a." decimals={1} />
        <SliderInput label="Prazo" value={anos} onChange={setAnos} min={1} max={40} step={1} suffix=" anos" />
      </div>
      <ResultCard
        label={`Para ter o mesmo poder de compra em ${anos} anos`}
        value={fmt(valorFuturoNecessario)}
        sub={`Precisará desse valor no futuro para comprar o que ${fmt(valorHoje)} compra hoje`}
        color="#FFC93C"
      />
      <ResultCard
        label={`Poder de compra de ${fmt(valorHoje)} daqui a ${anos} anos`}
        value={fmt(poderDeCompraFuturo)}
        sub="Em valores de hoje, se esse dinheiro ficar parado sem render"
        color="#EF4444"
      />
    </CalcShell>
  )
}

// 5. Aporte Necessário para Aposentadoria
function CalcAporteAposentadoria({ onBack }: { onBack: () => void }) {
  const [rendaMensalDesejada, setRendaMensalDesejada] = useState(6000)
  const [taxaRetiradaAnual, setTaxaRetiradaAnual] = useState(4)
  const [anosParaAposentar, setAnosParaAposentar] = useState(25)
  const [taxaMensalAcumulacao, setTaxaMensalAcumulacao] = useState(0.7)

  const patrimonioNecessario = (rendaMensalDesejada * 12) / (taxaRetiradaAnual / 100)
  const meses = anosParaAposentar * 12
  const i = taxaMensalAcumulacao / 100
  const aporteMensal = i === 0 ? patrimonioNecessario / meses : (patrimonioNecessario * i) / (Math.pow(1 + i, meses) - 1)

  return (
    <CalcShell onBack={onBack} icon={Landmark} iconColor="#8B5CF6" titulo="Aporte para Aposentadoria" subtitulo="Quanto investir por mês para se aposentar com a renda que você quer">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Renda mensal desejada na aposentadoria" value={rendaMensalDesejada} onChange={setRendaMensalDesejada} min={1000} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Taxa de retirada anual" value={taxaRetiradaAnual} onChange={setTaxaRetiradaAnual} min={2} max={1000} step={0.5} suffix="% a.a." decimals={1} />
        <SliderInput label="Anos até se aposentar" value={anosParaAposentar} onChange={setAnosParaAposentar} min={1} max={45} step={1} suffix=" anos" />
        <SliderInput label="Retorno esperado na acumulação" value={taxaMensalAcumulacao} onChange={setTaxaMensalAcumulacao} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Patrimônio necessário" value={fmt(patrimonioNecessario)} sub={`Para gerar ${fmt(rendaMensalDesejada)}/mês a uma taxa de retirada de ${taxaRetiradaAnual}% a.a.`} color="#8B5CF6" />
      <ResultCard label="Aporte mensal necessário" value={fmt(aporteMensal)} sub={`Por ${anosParaAposentar} anos, para chegar ao patrimônio necessário`} color="#00D4FF" />
    </CalcShell>
  )
}

// 6. Rentabilidade Real (descontada a inflação)
function CalcRentabilidadeReal({ onBack }: { onBack: () => void }) {
  const [rentabilidadeNominal, setRentabilidadeNominal] = useState(11)
  const [inflacaoAnual, setInflacaoAnual] = useState(4.5)

  const rentabilidadeReal = ((1 + rentabilidadeNominal / 100) / (1 + inflacaoAnual / 100) - 1) * 100
  const rentabilidadeRealAproximada = rentabilidadeNominal - inflacaoAnual

  return (
    <CalcShell onBack={onBack} icon={Percent} iconColor="#00D4FF" titulo="Rentabilidade Real" subtitulo="O retorno que realmente importa: descontada a inflação">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Rentabilidade nominal (bruta)" value={rentabilidadeNominal} onChange={setRentabilidadeNominal} min={0} max={1000} step={0.25} suffix="% a.a." decimals={2} />
        <SliderInput label="Inflação no período" value={inflacaoAnual} onChange={setInflacaoAnual} min={0} max={1000} step={0.1} suffix="% a.a." decimals={1} />
      </div>
      <ResultCard
        label="Rentabilidade real"
        value={`${rentabilidadeReal >= 0 ? '+' : ''}${rentabilidadeReal.toFixed(2)}%`}
        sub={rentabilidadeReal >= 0 ? 'Seu dinheiro ganhou poder de compra' : 'Seu dinheiro perdeu poder de compra, mesmo rendendo'}
        color={rentabilidadeReal >= 0 ? '#22C55E' : '#EF4444'}
      />
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">Cálculo exato (composto)</span>
          <span className="text-xs font-bold text-white">{rentabilidadeReal.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">Aproximação simples (nominal − inflação)</span>
          <span className="text-xs font-bold text-white">{rentabilidadeRealAproximada.toFixed(2)}%</span>
        </div>
      </div>
    </CalcShell>
  )
}

// 7. Imposto de Renda sobre Investimentos (tabela regressiva)
function CalcIRInvestimentos({ onBack }: { onBack: () => void }) {
  const [rendimentoBruto, setRendimentoBruto] = useState(1000)
  const [diasAplicacao, setDiasAplicacao] = useState(400)

  function aliquotaPorDias(dias: number): number {
    if (dias <= 180) return 22.5
    if (dias <= 360) return 20
    if (dias <= 720) return 17.5
    return 15
  }

  const aliquota = aliquotaPorDias(diasAplicacao)
  const impostoDevido = rendimentoBruto * (aliquota / 100)
  const rendimentoLiquido = rendimentoBruto - impostoDevido

  return (
    <CalcShell onBack={onBack} icon={ReceiptText} iconColor="#EC4899" titulo="Imposto de Renda sobre Investimentos" subtitulo="Tabela regressiva para renda fixa (CDB, Tesouro, fundos)">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Rendimento bruto no período" value={rendimentoBruto} onChange={setRendimentoBruto} min={10} max={1000000} step={10} prefix="R$ " />
        <SliderInput label="Dias desde a aplicação" value={diasAplicacao} onChange={setDiasAplicacao} min={1} max={1500} step={1} suffix=" dias" />
      </div>
      <ResultCard label={`Alíquota aplicável: ${aliquota}%`} value={fmt(rendimentoLiquido)} sub={`Rendimento líquido, após ${fmt(impostoDevido)} de IR`} color="#EC4899" />
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">Até 180 dias</span>
          <span className="text-xs font-bold text-white">22,5%</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">181 a 360 dias</span>
          <span className="text-xs font-bold text-white">20%</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">361 a 720 dias</span>
          <span className="text-xs font-bold text-white">17,5%</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">Acima de 720 dias</span>
          <span className="text-xs font-bold text-white">15%</span>
        </div>
      </div>
    </CalcShell>
  )
}

// 8. Independência Financeira por Idade
function CalcIndependenciaPorIdade({ onBack }: { onBack: () => void }) {
  const [idadeAtual, setIdadeAtual] = useState(30)
  const [patrimonioAtual, setPatrimonioAtual] = useState(20000)
  const [aporteMensal, setAporteMensal] = useState(1000)
  const [taxaMensal, setTaxaMensal] = useState(0.7)
  const [gastoMensalDesejado, setGastoMensalDesejado] = useState(5000)
  const [taxaRetiradaAnual, setTaxaRetiradaAnual] = useState(4)

  const patrimonioAlvo = (gastoMensalDesejado * 12) / (taxaRetiradaAnual / 100)
  const i = taxaMensal / 100
  let saldo = patrimonioAtual
  let mesesParaAlvo = 0
  const limiteIteracoes = 900 // 75 anos de teto de segurança
  while (saldo < patrimonioAlvo && mesesParaAlvo < limiteIteracoes) {
    saldo = saldo * (1 + i) + aporteMensal
    mesesParaAlvo++
  }
  const idadeIndependencia = idadeAtual + mesesParaAlvo / 12
  const atingivel = saldo >= patrimonioAlvo

  return (
    <CalcShell onBack={onBack} icon={Hourglass} iconColor="#3B82F6" titulo="Independência Financeira por Idade" subtitulo="Com quantos anos seu patrimônio sustenta seus gastos">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Sua idade hoje" value={idadeAtual} onChange={setIdadeAtual} min={16} max={70} step={1} suffix=" anos" />
        <SliderInput label="Patrimônio investido hoje" value={patrimonioAtual} onChange={setPatrimonioAtual} min={0} max={2000000} step={1000} prefix="R$ " />
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={0} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Retorno esperado" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Gasto mensal desejado (livre)" value={gastoMensalDesejado} onChange={setGastoMensalDesejado} min={1000} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Taxa de retirada anual" value={taxaRetiradaAnual} onChange={setTaxaRetiradaAnual} min={2} max={1000} step={0.5} suffix="% a.a." decimals={1} />
      </div>
      <ResultCard label="Patrimônio necessário para viver de renda" value={fmt(patrimonioAlvo)} sub={`Gerando ${fmt(gastoMensalDesejado)}/mês à taxa de ${taxaRetiradaAnual}% a.a.`} color="#8B5CF6" />
      {atingivel ? (
        <ResultCard
          label="Idade estimada de independência financeira"
          value={`${idadeIndependencia.toFixed(1)} anos`}
          sub={`Em aproximadamente ${(mesesParaAlvo / 12).toFixed(1)} anos a partir de hoje`}
          color="#00D4FF"
        />
      ) : (
        <ResultCard label="Fora do alcance nesse ritmo" value="Ajuste os valores" sub="Aumente o aporte mensal ou o retorno esperado para ver um resultado" color="#EF4444" />
      )}
    </CalcShell>
  )
}

// 9. Comparação de Investimentos
function CalcComparadorInvestimentos({ onBack }: { onBack: () => void }) {
  const [valorInicial, setValorInicial] = useState(10000)
  const [anos, setAnos] = useState(5)
  const [taxaA, setTaxaA] = useState(0.8)
  const [taxaB, setTaxaB] = useState(1.0)

  const meses = anos * 12
  const resultadoA = valorInicial * Math.pow(1 + taxaA / 100, meses)
  const resultadoB = valorInicial * Math.pow(1 + taxaB / 100, meses)
  const diferenca = resultadoB - resultadoA

  return (
    <CalcShell onBack={onBack} icon={BarChart3} iconColor="#22C55E" titulo="Comparação de Investimentos" subtitulo="Coloque duas taxas lado a lado e veja a diferença no tempo">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor a investir" value={valorInicial} onChange={setValorInicial} min={100} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Prazo" value={anos} onChange={setAnos} min={1} max={30} step={1} suffix=" anos" />
        <SliderInput label="Investimento A — taxa mensal" value={taxaA} onChange={setTaxaA} min={0.1} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Investimento B — taxa mensal" value={taxaB} onChange={setTaxaB} min={0.1} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Investimento A" value={fmt(resultadoA)} sub={`Taxa de ${taxaA}% ao mês por ${anos} anos`} color="#3B82F6" />
      <ResultCard label="Investimento B" value={fmt(resultadoB)} sub={`Taxa de ${taxaB}% ao mês por ${anos} anos`} color="#22C55E" />
      <ResultCard
        label={diferenca >= 0 ? 'B rende a mais que A' : 'A rende a mais que B'}
        value={fmt(Math.abs(diferenca))}
        sub="Diferença acumulada ao final do prazo"
        color={diferenca >= 0 ? '#22C55E' : '#3B82F6'}
      />
    </CalcShell>
  )
}

// 10. Orçamento 50-30-20
function CalcOrcamento503020({ onBack }: { onBack: () => void }) {
  const [rendaMensal, setRendaMensal] = useState(5000)
  const necessidades = rendaMensal * 0.5
  const desejos = rendaMensal * 0.3
  const poupanca = rendaMensal * 0.2

  return (
    <CalcShell onBack={onBack} icon={Scale} iconColor="#FFC93C" titulo="Orçamento 50-30-20" subtitulo="Divida sua renda entre necessidades, desejos e poupança">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Renda mensal líquida" value={rendaMensal} onChange={setRendaMensal} min={500} max={1000000} step={100} prefix="R$ " />
      </div>
      <ResultCard label="50% — Necessidades (moradia, contas, alimentação)" value={fmt(necessidades)} color="#EF4444" />
      <ResultCard label="30% — Desejos (lazer, assinaturas, extras)" value={fmt(desejos)} color="#FFC93C" />
      <ResultCard label="20% — Poupança e investimentos" value={fmt(poupanca)} color="#22C55E" />
    </CalcShell>
  )
}

// 11. Previdência Privada (PGBL/VGBL)
function CalcPrevidenciaPrivada({ onBack }: { onBack: () => void }) {
  const [aporteMensal, setAporteMensal] = useState(500)
  const [anos, setAnos] = useState(20)
  const [taxaMensal, setTaxaMensal] = useState(0.6)
  const [taxaAdministracao, setTaxaAdministracao] = useState(1.5)

  const meses = anos * 12
  const taxaLiquidaMensal = taxaMensal / 100 - taxaAdministracao / 100 / 12
  let saldo = 0
  let totalAportado = 0
  for (let m = 0; m < meses; m++) {
    saldo = saldo * (1 + taxaLiquidaMensal) + aporteMensal
    totalAportado += aporteMensal
  }
  const rendimento = saldo - totalAportado

  return (
    <CalcShell onBack={onBack} icon={PiggyBankIcon} iconColor="#8B5CF6" titulo="Previdência Privada (PGBL/VGBL)" subtitulo="Simule sua reserva já descontando a taxa de administração">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={50} max={1000000} step={50} prefix="R$ " />
        <SliderInput label="Prazo até o resgate" value={anos} onChange={setAnos} min={1} max={40} step={1} suffix=" anos" />
        <SliderInput label="Retorno bruto esperado" value={taxaMensal} onChange={setTaxaMensal} min={0.2} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Taxa de administração" value={taxaAdministracao} onChange={setTaxaAdministracao} min={0} max={1000} step={0.1} suffix="% ao ano" decimals={1} />
      </div>
      <ResultCard label="Saldo estimado ao final" value={fmt(saldo)} sub={`Aportado: ${fmt(totalAportado)} · Rendimento líquido de taxa: ${fmt(rendimento)}`} color="#8B5CF6" />
    </CalcShell>
  )
}

// 12. Dividend Yield / Yield on Cost
function CalcDividendYieldOnCost({ onBack }: { onBack: () => void }) {
  const [precoCompra, setPrecoCompra] = useState(25)
  const [precoAtual, setPrecoAtual] = useState(32)
  const [dividendosAnuais, setDividendosAnuais] = useState(2)

  const dividendYield = (dividendosAnuais / precoAtual) * 100
  const yieldOnCost = (dividendosAnuais / precoCompra) * 100

  return (
    <CalcShell onBack={onBack} icon={Coins} iconColor="#22C55E" titulo="Dividend Yield / Yield on Cost" subtitulo="O rendimento sobre o preço de hoje é diferente do rendimento sobre o que você pagou">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Preço de compra (o que você pagou)" value={precoCompra} onChange={setPrecoCompra} min={1} max={1000} step={0.5} prefix="R$ " decimals={2} />
        <SliderInput label="Preço atual de mercado" value={precoAtual} onChange={setPrecoAtual} min={1} max={1000} step={0.5} prefix="R$ " decimals={2} />
        <SliderInput label="Dividendos pagos nos últimos 12 meses" value={dividendosAnuais} onChange={setDividendosAnuais} min={0} max={1000000} step={0.1} prefix="R$ " decimals={2} />
      </div>
      <ResultCard label="Dividend Yield (sobre preço atual)" value={`${dividendYield.toFixed(2)}%`} sub="O que um comprador novo receberia hoje" color="#3B82F6" />
      <ResultCard
        label="Yield on Cost (sobre seu preço pago)"
        value={`${yieldOnCost.toFixed(2)}%`}
        sub={yieldOnCost >= dividendYield ? 'Seu retorno sobre o que pagou é maior que o yield atual — bom sinal' : 'Seu retorno sobre o que pagou é menor que o yield atual'}
        color="#22C55E"
      />
    </CalcShell>
  )
}

// 13. Custo de Oportunidade
function CalcCustoOportunidade({ onBack }: { onBack: () => void }) {
  const [valorGasto, setValorGasto] = useState(3000)
  const [taxaMensal, setTaxaMensal] = useState(0.8)
  const [anos, setAnos] = useState(10)

  const meses = anos * 12
  const valorSeInvestido = valorGasto * Math.pow(1 + taxaMensal / 100, meses)
  const custoOportunidade = valorSeInvestido - valorGasto

  return (
    <CalcShell onBack={onBack} icon={ArrowLeftRight} iconColor="#EF4444" titulo="Custo de Oportunidade" subtitulo="O que esse gasto valeria se tivesse sido investido">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor do gasto (ou compra)" value={valorGasto} onChange={setValorGasto} min={10} max={1000000} step={10} prefix="R$ " />
        <SliderInput label="Retorno que poderia ter tido" value={taxaMensal} onChange={setTaxaMensal} min={0.1} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Prazo considerado" value={anos} onChange={setAnos} min={1} max={40} step={1} suffix=" anos" />
      </div>
      <ResultCard
        label={`Se tivesse investido em vez de gastar`}
        value={fmt(valorSeInvestido)}
        sub={`Custo de oportunidade: ${fmt(custoOportunidade)} em ${anos} anos`}
        color="#EF4444"
      />
    </CalcShell>
  )
}

// 14. Reserva para Objetivos de Curto Prazo
function CalcReservaObjetivoCurto({ onBack }: { onBack: () => void }) {
  const [valorObjetivo, setValorObjetivo] = useState(10000)
  const [prazoMeses, setPrazoMeses] = useState(12)
  const [taxaMensal, setTaxaMensal] = useState(0.9)

  const i = taxaMensal / 100
  const aporteMensal = i === 0 ? valorObjetivo / prazoMeses : (valorObjetivo * i) / (Math.pow(1 + i, prazoMeses) - 1)
  const totalAportado = aporteMensal * prazoMeses
  const rendimentoGerado = valorObjetivo - totalAportado

  return (
    <CalcShell onBack={onBack} icon={CalendarClock} iconColor="#3B82F6" titulo="Reserva para Objetivo de Curto Prazo" subtitulo="Quanto guardar por mês para uma meta de até 2-3 anos">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Valor do objetivo" value={valorObjetivo} onChange={setValorObjetivo} min={500} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Prazo" value={prazoMeses} onChange={setPrazoMeses} min={1} max={36} step={1} suffix=" meses" />
        <SliderInput label="Taxa de retorno (liquidez diária)" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1000} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Aporte mensal necessário" value={fmt(aporteMensal)} sub={`Para juntar ${fmt(valorObjetivo)} em ${prazoMeses} meses`} color="#3B82F6" />
      <ResultCard label="Rendimento gerado no período" value={fmt(rendimentoGerado)} sub={`De ${fmt(totalAportado)} aportados, chega a ${fmt(valorObjetivo)}`} color="#22C55E" />
    </CalcShell>
  )
}

// 15. LTV/CAC — trilha Geração de Receita
function CalcLtvCac({ onBack }: { onBack: () => void }) {
  const [gastoAquisicao, setGastoAquisicao] = useState(10000)
  const [clientesNovos, setClientesNovos] = useState(50)
  const [receitaMensalPorCliente, setReceitaMensalPorCliente] = useState(100)
  const [margemBruta, setMargemBruta] = useState(70)
  const [churnMensal, setChurnMensal] = useState(5)

  const cac = clientesNovos > 0 ? gastoAquisicao / clientesNovos : 0
  const ltv = churnMensal > 0 ? (receitaMensalPorCliente * (margemBruta / 100)) / (churnMensal / 100) : 0
  const relacao = cac > 0 ? ltv / cac : 0

  let statusCor = '#EF4444'
  let statusTexto = 'Aquisição cara demais — revise o CAC antes de escalar'
  if (relacao >= 5) {
    statusCor = '#22C55E'
    statusTexto = 'Possível subinvestimento — pode acelerar aquisição sem risco'
  } else if (relacao >= 3) {
    statusCor = '#22C55E'
    statusTexto = 'Saudável — dentro ou acima do benchmark de mercado (3:1)'
  } else if (relacao >= 2) {
    statusCor = '#FFC93C'
    statusTexto = 'Zona de atenção — sustentável, mas com pouca margem'
  }

  return (
    <CalcShell onBack={onBack} icon={Scale} iconColor="#EC4899" titulo="LTV/CAC" subtitulo="A régua que decide se vale a pena crescer">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Gasto de marketing e vendas no período" value={gastoAquisicao} onChange={setGastoAquisicao} min={100} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Clientes novos conquistados no período" value={clientesNovos} onChange={setClientesNovos} min={1} max={10000} step={1} />
        <SliderInput label="Receita média mensal por cliente" value={receitaMensalPorCliente} onChange={setReceitaMensalPorCliente} min={1} max={1000000} step={10} prefix="R$ " />
        <SliderInput label="Margem bruta" value={margemBruta} onChange={setMargemBruta} min={1} max={1000} step={1} suffix="%" />
        <SliderInput label="Taxa de churn mensal" value={churnMensal} onChange={setChurnMensal} min={0.1} max={1000} step={0.1} suffix="%" decimals={1} />
      </div>
      <ResultCard label="CAC — Custo de Aquisição de Cliente" value={fmt(cac)} color="#3B82F6" />
      <ResultCard label="LTV — Valor do Cliente ao Longo do Tempo" value={fmt(ltv)} color="#22C55E" />
      <ResultCard label={`Relação LTV/CAC: ${relacao.toFixed(1)}:1`} value={statusTexto} color={statusCor} />
    </CalcShell>
  )
}

// 16. Funil de Conversão — trilha Geração de Receita
function CalcFunilConversao({ onBack }: { onBack: () => void }) {
  const [visitantes, setVisitantes] = useState(1000)
  const [leads, setLeads] = useState(200)
  const [oportunidades, setOportunidades] = useState(40)
  const [vendas, setVendas] = useState(8)

  const taxaVisitanteLead = visitantes > 0 ? (leads / visitantes) * 100 : 0
  const taxaLeadOportunidade = leads > 0 ? (oportunidades / leads) * 100 : 0
  const taxaOportunidadeVenda = oportunidades > 0 ? (vendas / oportunidades) * 100 : 0
  const taxas = [
    { nome: 'Visitante → Lead', valor: taxaVisitanteLead },
    { nome: 'Lead → Oportunidade', valor: taxaLeadOportunidade },
    { nome: 'Oportunidade → Venda', valor: taxaOportunidadeVenda },
  ]
  const gargalo = taxas.reduce((menor, atual) => (atual.valor < menor.valor ? atual : menor), taxas[0])

  return (
    <CalcShell onBack={onBack} icon={Filter} iconColor="#3B82F6" titulo="Funil de Conversão" subtitulo="Onde o dinheiro vaza no seu processo de vendas">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Visitantes" value={visitantes} onChange={setVisitantes} min={1} max={1000000} step={10} />
        <SliderInput label="Leads" value={leads} onChange={setLeads} min={0} max={1000000} step={5} />
        <SliderInput label="Oportunidades" value={oportunidades} onChange={setOportunidades} min={0} max={1000000} step={1} />
        <SliderInput label="Vendas" value={vendas} onChange={setVendas} min={0} max={1000000} step={1} />
      </div>
      <ResultCard label="Visitante → Lead" value={`${taxaVisitanteLead.toFixed(1)}%`} color="#3B82F6" />
      <ResultCard label="Lead → Oportunidade" value={`${taxaLeadOportunidade.toFixed(1)}%`} color="#8B5CF6" />
      <ResultCard label="Oportunidade → Venda" value={`${taxaOportunidadeVenda.toFixed(1)}%`} color="#22C55E" />
      <ResultCard label="Maior gargalo do funil" value={gargalo.nome} sub={`Taxa de ${gargalo.valor.toFixed(1)}% — priorize resolver aqui antes de investir em mais topo de funil`} color="#EF4444" />
    </CalcShell>
  )
}

// 17. k-factor — trilha Geração de Receita
function CalcKFactor({ onBack }: { onBack: () => void }) {
  const [convitesPorCliente, setConvitesPorCliente] = useState(4)
  const [taxaConversaoConvite, setTaxaConversaoConvite] = useState(15)

  const kFactor = convitesPorCliente * (taxaConversaoConvite / 100)
  const cresceSozinho = kFactor >= 1

  return (
    <CalcShell onBack={onBack} icon={Radar} iconColor="#22C55E" titulo="k-factor (Coeficiente Viral)" subtitulo="Quantos clientes cada cliente traz sozinho">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Convites médios por cliente" value={convitesPorCliente} onChange={setConvitesPorCliente} min={0} max={1000} step={0.5} decimals={1} />
        <SliderInput label="Taxa de conversão dos convites" value={taxaConversaoConvite} onChange={setTaxaConversaoConvite} min={0} max={1000} step={1} suffix="%" />
      </div>
      <ResultCard
        label="k-factor"
        value={kFactor.toFixed(2)}
        sub={cresceSozinho ? 'Acima de 1,0 — crescimento exponencial e autossustentado' : 'Abaixo de 1,0 — reduz dependência de outros canais, mas não substitui'}
        color={cresceSozinho ? '#22C55E' : '#FFC93C'}
      />
    </CalcShell>
  )
}

// 18. DRE Simplificado — trilha Gestão Financeira de Negócios
function CalcDreSimplificado({ onBack }: { onBack: () => void }) {
  const [receitaBruta, setReceitaBruta] = useState(100000)
  const [impostosDevolucoes, setImpostosDevolucoes] = useState(8000)
  const [custoDireto, setCustoDireto] = useState(30000)
  const [despesasOperacionais, setDespesasOperacionais] = useState(35000)
  const [despesasFinanceiras, setDespesasFinanceiras] = useState(5000)
  const [impostosLucro, setImpostosLucro] = useState(4000)

  const receitaLiquida = receitaBruta - impostosDevolucoes
  const lucroBruto = receitaLiquida - custoDireto
  const margemBruta = receitaLiquida > 0 ? (lucroBruto / receitaLiquida) * 100 : 0
  const ebitda = lucroBruto - despesasOperacionais
  const lucroLiquido = ebitda - despesasFinanceiras - impostosLucro
  const margemLiquida = receitaBruta > 0 ? (lucroLiquido / receitaBruta) * 100 : 0

  return (
    <CalcShell onBack={onBack} icon={FileBarChart} iconColor="#8B5CF6" titulo="DRE Simplificado" subtitulo="Da receita bruta ao lucro líquido, camada por camada">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Receita bruta" value={receitaBruta} onChange={setReceitaBruta} min={0} max={1000000} step={1000} prefix="R$ " />
        <SliderInput label="Impostos sobre venda e devoluções" value={impostosDevolucoes} onChange={setImpostosDevolucoes} min={0} max={1000000} step={500} prefix="R$ " />
        <SliderInput label="Custo direto do produto/serviço" value={custoDireto} onChange={setCustoDireto} min={0} max={1000000} step={500} prefix="R$ " />
        <SliderInput label="Despesas operacionais" value={despesasOperacionais} onChange={setDespesasOperacionais} min={0} max={1000000} step={500} prefix="R$ " />
        <SliderInput label="Despesas financeiras (juros)" value={despesasFinanceiras} onChange={setDespesasFinanceiras} min={0} max={1000000} step={100} prefix="R$ " />
        <SliderInput label="Impostos sobre o lucro" value={impostosLucro} onChange={setImpostosLucro} min={0} max={1000000} step={100} prefix="R$ " />
      </div>
      <div className="rounded-2xl overflow-hidden border border-border mb-4">
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">Receita Líquida</span>
          <span className="text-xs font-bold text-white">{fmt(receitaLiquida)}</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card/50">
          <span className="text-xs text-slate-300">Lucro Bruto (margem {margemBruta.toFixed(1)}%)</span>
          <span className="text-xs font-bold text-white">{fmt(lucroBruto)}</span>
        </div>
        <div className="flex justify-between px-3.5 py-2.5 bg-bg-card">
          <span className="text-xs text-slate-300">EBITDA</span>
          <span className="text-xs font-bold text-white">{fmt(ebitda)}</span>
        </div>
      </div>
      <ResultCard label={`Lucro Líquido (margem ${margemLiquida.toFixed(1)}%)`} value={fmt(lucroLiquido)} color={lucroLiquido >= 0 ? '#22C55E' : '#EF4444'} />
    </CalcShell>
  )
}

// 19. CCC — trilha Gestão Financeira de Negócios
function CalcCCC({ onBack }: { onBack: () => void }) {
  const [prazoEstoque, setPrazoEstoque] = useState(60)
  const [prazoRecebimento, setPrazoRecebimento] = useState(35)
  const [prazoPagamento, setPrazoPagamento] = useState(30)

  const ccc = prazoEstoque + prazoRecebimento - prazoPagamento

  return (
    <CalcShell onBack={onBack} icon={Hourglass} iconColor="#F97316" titulo="CCC — Ciclo de Conversão de Caixa" subtitulo="Quanto tempo seu dinheiro fica preso no ciclo operacional">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Prazo médio de estoque" value={prazoEstoque} onChange={setPrazoEstoque} min={0} max={1000} step={1} suffix=" dias" />
        <SliderInput label="Prazo médio de recebimento" value={prazoRecebimento} onChange={setPrazoRecebimento} min={0} max={1000} step={1} suffix=" dias" />
        <SliderInput label="Prazo médio de pagamento a fornecedores" value={prazoPagamento} onChange={setPrazoPagamento} min={0} max={1000} step={1} suffix=" dias" />
      </div>
      <ResultCard
        label="Ciclo de Conversão de Caixa"
        value={`${ccc} dias`}
        sub={ccc <= 0 ? 'Excelente — o dinheiro do cliente chega antes de você precisar pagar o fornecedor' : 'Tempo que seu caixa fica sequestrado entre pagar e receber'}
        color={ccc <= 0 ? '#22C55E' : ccc <= 30 ? '#FFC93C' : '#EF4444'}
      />
    </CalcShell>
  )
}

// 20. ROIC vs. WACC — trilha Gestão Financeira de Negócios
function CalcRoicWacc({ onBack }: { onBack: () => void }) {
  const [lucroOperacional, setLucroOperacional] = useState(45000)
  const [capitalInvestido, setCapitalInvestido] = useState(500000)
  const [custoDivida, setCustoDivida] = useState(14)
  const [custoCapitalProprio, setCustoCapitalProprio] = useState(18)
  const [percentualDivida, setPercentualDivida] = useState(40)

  const roic = capitalInvestido > 0 ? (lucroOperacional / capitalInvestido) * 100 : 0
  const wacc = (percentualDivida / 100) * custoDivida + ((100 - percentualDivida) / 100) * custoCapitalProprio
  const criaValor = roic > wacc

  return (
    <CalcShell onBack={onBack} icon={Scale} iconColor="#00D4FF" titulo="ROIC vs. WACC" subtitulo="Esse investimento cria ou destrói valor?">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Lucro operacional gerado" value={lucroOperacional} onChange={setLucroOperacional} min={0} max={1000000} step={1000} prefix="R$ " />
        <SliderInput label="Capital total investido" value={capitalInvestido} onChange={setCapitalInvestido} min={1} max={1000000} step={1000} prefix="R$ " />
        <SliderInput label="Custo da dívida" value={custoDivida} onChange={setCustoDivida} min={0} max={1000} step={0.5} suffix="% a.a." decimals={1} />
        <SliderInput label="Custo do capital próprio exigido" value={custoCapitalProprio} onChange={setCustoCapitalProprio} min={0} max={1000} step={0.5} suffix="% a.a." decimals={1} />
        <SliderInput label="% da estrutura em dívida (o resto é capital próprio)" value={percentualDivida} onChange={setPercentualDivida} min={0} max={1000} step={5} suffix="%" />
      </div>
      <ResultCard label="ROIC" value={`${roic.toFixed(1)}%`} color="#3B82F6" />
      <ResultCard label="WACC" value={`${wacc.toFixed(1)}%`} color="#8B5CF6" />
      <ResultCard
        label={criaValor ? 'Cria valor' : 'Destrói valor'}
        value={criaValor ? 'ROIC supera o WACC' : 'ROIC abaixo do WACC, mesmo com lucro positivo'}
        color={criaValor ? '#22C55E' : '#EF4444'}
      />
    </CalcShell>
  )
}

// 21. OEE — trilha Eficiência Operacional
function CalcOEE({ onBack }: { onBack: () => void }) {
  const [tempoReal, setTempoReal] = useState(7)
  const [tempoPlanejado, setTempoPlanejado] = useState(8)
  const [velocidadeReal, setVelocidadeReal] = useState(80)
  const [velocidadeMaxima, setVelocidadeMaxima] = useState(100)
  const [unidadesBoas, setUnidadesBoas] = useState(532)
  const [unidadesTotais, setUnidadesTotais] = useState(560)

  const disponibilidade = tempoPlanejado > 0 ? (tempoReal / tempoPlanejado) * 100 : 0
  const performance = velocidadeMaxima > 0 ? (velocidadeReal / velocidadeMaxima) * 100 : 0
  const qualidade = unidadesTotais > 0 ? (unidadesBoas / unidadesTotais) * 100 : 0
  const oee = (disponibilidade / 100) * (performance / 100) * (qualidade / 100) * 100

  return (
    <CalcShell onBack={onBack} icon={Gauge} iconColor="#FFC93C" titulo="OEE — Eficiência Real" subtitulo="Disponibilidade, performance e qualidade combinadas">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Tempo real de operação" value={tempoReal} onChange={setTempoReal} min={0} max={1000} step={0.5} suffix=" horas" decimals={1} />
        <SliderInput label="Tempo total planejado" value={tempoPlanejado} onChange={setTempoPlanejado} min={0.1} max={1000} step={0.5} suffix=" horas" decimals={1} />
        <SliderInput label="Velocidade real de produção" value={velocidadeReal} onChange={setVelocidadeReal} min={0} max={1000000} step={1} suffix=" un/h" />
        <SliderInput label="Velocidade máxima teórica" value={velocidadeMaxima} onChange={setVelocidadeMaxima} min={1} max={1000000} step={1} suffix=" un/h" />
        <SliderInput label="Unidades boas produzidas" value={unidadesBoas} onChange={setUnidadesBoas} min={0} max={1000000} step={1} />
        <SliderInput label="Total de unidades produzidas" value={unidadesTotais} onChange={setUnidadesTotais} min={1} max={1000000} step={1} />
      </div>
      <ResultCard label="Disponibilidade" value={`${disponibilidade.toFixed(1)}%`} color="#3B82F6" />
      <ResultCard label="Performance" value={`${performance.toFixed(1)}%`} color="#FFC93C" />
      <ResultCard label="Qualidade" value={`${qualidade.toFixed(1)}%`} color="#22C55E" />
      <ResultCard
        label="OEE final"
        value={`${oee.toFixed(1)}%`}
        sub={oee >= 85 ? 'Excelente — nível de classe mundial' : 'Abaixo do benchmark de excelência (85%) — há espaço de melhoria'}
        color={oee >= 85 ? '#22C55E' : oee >= 60 ? '#FFC93C' : '#EF4444'}
      />
    </CalcShell>
  )
}

// 22. Alavancagem de Corte de Custo — trilha Eficiência Operacional
function CalcAlavancagemCorteCusto({ onBack }: { onBack: () => void }) {
  const [corteA, setCorteA] = useState(300)
  const [recorrenteA, setRecorrenteA] = useState(true)
  const [corteB, setCorteB] = useState(3000)
  const [recorrenteB, setRecorrenteB] = useState(false)

  const efeitoAnualA = recorrenteA ? corteA * 12 : corteA
  const efeitoAnualB = recorrenteB ? corteB * 12 : corteB
  const melhorOpcao = efeitoAnualA >= efeitoAnualB ? 'A' : 'B'

  return (
    <CalcShell onBack={onBack} icon={Scissors} iconColor="#EF4444" titulo="Alavancagem de Corte de Custo" subtitulo="Qual corte tem o maior efeito no lucro">
      <div className="flex flex-col gap-4 mb-5">
        <SliderInput label="Corte A — valor" value={corteA} onChange={setCorteA} min={0} max={1000000} step={50} prefix="R$ " />
        <button
          onClick={() => setRecorrenteA((r) => !r)}
          className={`h-10 rounded-xl text-xs font-semibold border ${recorrenteA ? 'bg-accent-cyan/10 border-accent-cyan/40 text-accent-cyan' : 'card-surface text-slate-400'}`}
        >
          {recorrenteA ? 'Corte A é recorrente (mensal)' : 'Corte A é único (pontual)'}
        </button>
        <SliderInput label="Corte B — valor" value={corteB} onChange={setCorteB} min={0} max={1000000} step={50} prefix="R$ " />
        <button
          onClick={() => setRecorrenteB((r) => !r)}
          className={`h-10 rounded-xl text-xs font-semibold border ${recorrenteB ? 'bg-accent-cyan/10 border-accent-cyan/40 text-accent-cyan' : 'card-surface text-slate-400'}`}
        >
          {recorrenteB ? 'Corte B é recorrente (mensal)' : 'Corte B é único (pontual)'}
        </button>
      </div>
      <ResultCard label="Efeito anualizado — Corte A" value={fmt(efeitoAnualA)} color="#3B82F6" />
      <ResultCard label="Efeito anualizado — Corte B" value={fmt(efeitoAnualB)} color="#8B5CF6" />
      <ResultCard label={`Maior alavancagem: Corte ${melhorOpcao}`} value={fmt(Math.max(efeitoAnualA, efeitoAnualB))} sub="Priorize este corte primeiro" color="#22C55E" />
    </CalcShell>
  )
}

// 0. Calculadora Básica — resolve equação completa respeitando ordem das operações (× e ÷ antes de + e -)
type OperadorBasico = '+' | '-' | '×' | '÷'

interface HistoricoItemBasica {
  expressao: string
  resultado: string
  quando: number
}

const CHAVE_HISTORICO_BASICA = 'nexus-finance-historico-calc-basica'

function carregarHistoricoBasica(): HistoricoItemBasica[] {
  try {
    const bruto = localStorage.getItem(CHAVE_HISTORICO_BASICA)
    if (!bruto) return []
    const parsed = JSON.parse(bruto)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function salvarHistoricoBasica(itens: HistoricoItemBasica[]) {
  try {
    localStorage.setItem(CHAVE_HISTORICO_BASICA, JSON.stringify(itens.slice(0, 50)))
  } catch {
    // localStorage indisponível — histórico simplesmente não persiste, sem quebrar a calculadora
  }
}

function CalcBasica({ onBack }: { onBack: () => void }) {
  // `partes` é a expressão inteira como sequência de tokens: números (string bruta, com vírgula)
  // alternados com operadores. Ex.: ['20', '+', '20', '+', '20', '+', '7']
  const [partes, setPartes] = useState<string[]>([])
  const [emEdicaoNumero, setEmEdicaoNumero] = useState(false)
  const [resultado, setResultado] = useState<string | null>(null)
  const [historico, setHistorico] = useState<HistoricoItemBasica[]>(() => carregarHistoricoBasica())
  const [mostrarHistorico, setMostrarHistorico] = useState(false)

  function paraNumero(str: string): number {
    return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0
  }

  function formatarDisplay(valor: number): string {
    if (!isFinite(valor)) return 'Erro'
    const arredondado = Math.round(valor * 1e8) / 1e8
    return arredondado.toLocaleString('pt-BR', { maximumFractionDigits: 8 })
  }

  // Resolve a expressão respeitando a ordem correta das operações matemáticas:
  // primeiro todas as multiplicações e divisões (esquerda pra direita), depois soma e subtração.
  function avaliarExpressao(tokens: string[]): number {
    if (tokens.length === 0) return 0
    const numeros = tokens.filter((_, i) => i % 2 === 0).map(paraNumero)
    const operadores = tokens.filter((_, i) => i % 2 === 1) as OperadorBasico[]

    // Passo 1 — resolve × e ÷ primeiro, produzindo uma lista só com + e -
    const numerosPass2: number[] = [numeros[0]]
    const opsPass2: ('+' | '-')[] = []
    for (let i = 0; i < operadores.length; i++) {
      const op = operadores[i]
      const proximo = numeros[i + 1]
      if (op === '×' || op === '÷') {
        const anterior = numerosPass2.pop() as number
        numerosPass2.push(op === '×' ? anterior * proximo : proximo === 0 ? NaN : anterior / proximo)
      } else {
        opsPass2.push(op)
        numerosPass2.push(proximo)
      }
    }

    // Passo 2 — resolve + e - da esquerda pra direita
    let total = numerosPass2[0]
    for (let i = 0; i < opsPass2.length; i++) {
      total = opsPass2[i] === '+' ? total + numerosPass2[i + 1] : total - numerosPass2[i + 1]
    }
    return total
  }

  function digitarNumero(digito: string) {
    if (resultado !== null) {
      setPartes([digito === ',' ? '0,' : digito])
      setResultado(null)
      setEmEdicaoNumero(true)
      return
    }
    if (emEdicaoNumero) {
      const atual = partes[partes.length - 1]
      if (digito === ',' && atual.includes(',')) return
      if (atual.replace(/[,-]/g, '').length >= 15) return
      const novo = atual === '0' && digito !== ',' ? digito : atual + digito
      setPartes([...partes.slice(0, -1), novo])
    } else {
      setPartes([...partes, digito === ',' ? '0,' : digito])
      setEmEdicaoNumero(true)
    }
  }

  function escolherOperador(novoOp: OperadorBasico) {
    if (resultado !== null) {
      setPartes([resultado.replace(/\./g, ''), novoOp])
      setResultado(null)
      setEmEdicaoNumero(false)
      return
    }
    if (partes.length === 0) return
    if (!emEdicaoNumero) {
      // Usuário já tinha escolhido um operador — troca pelo novo, sem precisar apagar
      setPartes([...partes.slice(0, -1), novoOp])
    } else {
      setPartes([...partes, novoOp])
      setEmEdicaoNumero(false)
    }
  }

  function calcularIgual() {
    let tokens = partes
    // Se o usuário deixou um operador pendurado no final (ex: "20+"), ignora ele antes de calcular
    if (!emEdicaoNumero && tokens.length > 0) tokens = tokens.slice(0, -1)
    if (tokens.length === 0) return

    const valor = avaliarExpressao(tokens)
    const textoResultado = formatarDisplay(valor)
    const textoExpressao = tokens.join(' ')

    setResultado(textoResultado)
    setPartes(tokens)
    setEmEdicaoNumero(true)

    if (textoResultado !== 'Erro') {
      const novoItem: HistoricoItemBasica = { expressao: textoExpressao, resultado: textoResultado, quando: Date.now() }
      const novoHistorico = [novoItem, ...historico].slice(0, 50)
      setHistorico(novoHistorico)
      salvarHistoricoBasica(novoHistorico)
    }
  }

  function limparTudo() {
    setPartes([])
    setResultado(null)
    setEmEdicaoNumero(false)
  }

  function apagarUltimo() {
    if (resultado !== null) {
      limparTudo()
      return
    }
    if (partes.length === 0) return
    const ultima = partes[partes.length - 1]
    if (emEdicaoNumero && ultima.length > 1) {
      setPartes([...partes.slice(0, -1), ultima.slice(0, -1)])
    } else {
      // Remove o token inteiro (número de 1 dígito, ou o operador pendurado)
      const restante = partes.slice(0, -1)
      setPartes(restante)
      setEmEdicaoNumero(restante.length > 0)
    }
  }

  function inverterSinal() {
    if (resultado !== null) {
      const invertido = paraNumero(resultado) * -1
      setPartes([formatarDisplay(invertido).replace(/\./g, '')])
      setResultado(null)
      setEmEdicaoNumero(true)
      return
    }
    if (emEdicaoNumero && partes.length > 0) {
      const atual = paraNumero(partes[partes.length - 1]) * -1
      setPartes([...partes.slice(0, -1), formatarDisplay(atual).replace(/\./g, '')])
    } else if (partes.length === 0) {
      setPartes(['-'])
      setEmEdicaoNumero(true)
    }
  }

  function limparHistorico() {
    setHistorico([])
    salvarHistoricoBasica([])
  }

  function usarResultadoDoHistorico(valorResultado: string) {
    setPartes([valorResultado.replace(/\./g, '')])
    setResultado(null)
    setEmEdicaoNumero(true)
    setMostrarHistorico(false)
  }

  const BOTOES: { label: string; tipo: 'num' | 'op' | 'acao'; valor?: string; span?: number }[] = [
    { label: 'C', tipo: 'acao', valor: 'clear' },
    { label: '±', tipo: 'acao', valor: 'sinal' },
    { label: '⌫', tipo: 'acao', valor: 'apagar' },
    { label: '÷', tipo: 'op', valor: '÷' },
    { label: '7', tipo: 'num', valor: '7' },
    { label: '8', tipo: 'num', valor: '8' },
    { label: '9', tipo: 'num', valor: '9' },
    { label: '×', tipo: 'op', valor: '×' },
    { label: '4', tipo: 'num', valor: '4' },
    { label: '5', tipo: 'num', valor: '5' },
    { label: '6', tipo: 'num', valor: '6' },
    { label: '−', tipo: 'op', valor: '-' },
    { label: '1', tipo: 'num', valor: '1' },
    { label: '2', tipo: 'num', valor: '2' },
    { label: '3', tipo: 'num', valor: '3' },
    { label: '+', tipo: 'op', valor: '+' },
    { label: '0', tipo: 'num', valor: '0', span: 2 },
    { label: ',', tipo: 'num', valor: ',' },
    { label: '=', tipo: 'op', valor: '=' },
  ]

  function handleBotao(tipo: string, valor?: string) {
    if (tipo === 'num' && valor !== undefined) {
      digitarNumero(valor)
    } else if (tipo === 'op' && valor === '=') {
      calcularIgual()
    } else if (tipo === 'op' && valor) {
      escolherOperador(valor as OperadorBasico)
    } else if (valor === 'clear') {
      limparTudo()
    } else if (valor === 'apagar') {
      apagarUltimo()
    } else if (valor === 'sinal') {
      inverterSinal()
    }
  }

  const expressaoTopo = partes.length > 0 ? partes.join(' ') + (resultado !== null ? ' =' : '') : '\u00A0'
  const numeroEmEdicao = emEdicaoNumero && partes.length > 0 ? partes[partes.length - 1] : null
  const displayGrande = resultado !== null ? resultado : numeroEmEdicao !== null ? numeroEmEdicao : '0'

  return (
    <div className="px-4 pt-5 pb-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold">
          <ChevronLeft size={16} /> Ferramentas
        </button>
        <button
          onClick={() => setMostrarHistorico(true)}
          className="flex items-center gap-1.5 text-[12.5px] font-semibold text-accent-cyan px-3 py-1.5 rounded-full"
          style={{ background: '#00D4FF1A' }}
        >
          <History size={15} /> Histórico
        </button>
      </div>

      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#00D4FF1A' }}>
          <Calculator size={20} style={{ color: '#00D4FF' }} />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white leading-tight">Calculadora Básica</h1>
          <p className="text-[11.5px] text-slate-500">Soma, subtração, multiplicação e divisão</p>
        </div>
      </div>

      <div className="card-surface rounded-3xl p-5 mb-4 flex flex-col items-end justify-end min-h-[110px] gap-1">
        <span className="text-[15px] text-slate-500 leading-snug text-right break-all">{expressaoTopo}</span>
        <span className="text-[40px] font-display font-bold text-white leading-tight truncate max-w-full">{displayGrande}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 flex-1">
        {BOTOES.map((b, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleBotao(b.tipo, b.valor)}
            className={`rounded-2xl text-[24px] font-semibold flex items-center justify-center min-h-[60px] ${b.span === 2 ? 'col-span-2' : ''}`}
            style={
              b.tipo === 'op'
                ? { background: '#00D4FF', color: '#070B16' }
                : b.tipo === 'acao'
                  ? { background: '#1C2740', color: '#EF4444' }
                  : { background: '#0E1526', color: '#FFFFFF', border: '1px solid #1C2740' }
            }
          >
            {b.label}
          </motion.button>
        ))}
      </div>

      {mostrarHistorico && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setMostrarHistorico(false)}>
          <div
            className="card-surface rounded-t-3xl p-5 max-h-[75vh] flex flex-col"
            style={{ background: '#0E1526' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-display font-extrabold text-white">Histórico de contas</h2>
              <div className="flex items-center gap-2">
                {historico.length > 0 && (
                  <button onClick={limparHistorico} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#1C2740' }}>
                    <Trash2 size={15} style={{ color: '#EF4444' }} />
                  </button>
                )}
                <button onClick={() => setMostrarHistorico(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#1C2740' }}>
                  <X size={15} className="text-slate-300" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex flex-col gap-2 pb-2">
              {historico.length === 0 && (
                <p className="text-[13px] text-slate-500 text-center py-8">Nenhuma conta calculada ainda</p>
              )}
              {historico.map((item, i) => (
                <button
                  key={i}
                  onClick={() => usarResultadoDoHistorico(item.resultado)}
                  className="rounded-2xl p-3.5 flex flex-col items-end text-right"
                  style={{ background: '#151D33' }}
                >
                  <span className="text-[12.5px] text-slate-500 break-all">{item.expressao} =</span>
                  <span className="text-[20px] font-display font-bold text-white">{item.resultado}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
