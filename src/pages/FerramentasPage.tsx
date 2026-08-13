import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Calculator, TrendingDown, PiggyBank, Flag, Percent, Milestone,
  Home, ShieldAlert, CreditCard, Landmark, ArrowLeftRight, ReceiptText, Hourglass,
  BarChart3, PiggyBank as PiggyBankIcon, Coins, Scale, CalendarClock,
} from 'lucide-react'
import SliderInput from '@/components/SliderInput'
import { useUserProgress } from '@/hooks/useUserProgress'

const CALCULADORAS = [
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
      <p className="text-xs text-slate-500 mt-1 mb-4">21 calculadoras para planejar sua vida financeira</p>

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

function CalcShell({ onBack, icon: Icon, iconColor, titulo, subtitulo, children }: any) {
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
      <p className="text-[26px] font-display font-extrabold text-white mt-1">{value}</p>
      {sub && (
        <p className="text-xs font-semibold mt-2" style={{ color }}>
          {sub}
        </p>
      )}
    </motion.div>
  )
}

function CalculadoraRouter({ id, onBack }: { id: string; onBack: () => void }) {
  switch (id) {
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
    default:
      return null
  }
}

function fmt(v: number) {
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
        <SliderInput label="Aporte inicial" value={aporteInicial} onChange={setAporteInicial} min={0} max={50000} step={100} prefix="R$ " />
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={0} max={5000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de juros" value={taxaMensal} onChange={setTaxaMensal} min={0.1} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
              <div key={ano} className={`flex justify-between px-3.5 py-2.5 ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-card/50'}`}>
                <span className="text-xs text-slate-300">Ano {ano}</span>
                <span className="text-xs font-bold text-white">{fmt(ponto.saldo)}</span>
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
        <SliderInput label="Taxa de juros ao ano" value={taxa} onChange={setTaxa} min={1} max={30} step={0.25} suffix="% a.a." decimals={2} />
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
        <SliderInput label="Dividend Yield anual" value={yieldAnual} onChange={setYieldAnual} min={1} max={15} step={0.5} suffix="% a.a." decimals={1} />
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
        <SliderInput label="Gasto mensal desejado" value={gastoMensal} onChange={setGastoMensal} min={1000} max={30000} step={100} prefix="R$ " />
        <SliderInput label="Aporte mensal atual" value={aporteMensal} onChange={setAporteMensal} min={0} max={10000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Taxa ao ano (nominal)" value={taxaAno} onChange={setTaxaAno} min={0.5} max={30} step={0.25} suffix="% a.a." decimals={2} />
        <SliderInput label="IPCA (inflação) estimado" value={ipca} onChange={setIpca} min={0} max={15} step={0.1} suffix="% a.a." decimals={1} />
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
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={50} max={10000} step={50} prefix="R$ " />
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Taxa de retorno" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Taxa de juros" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={2.5} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Gasto mensal essencial" value={gastoMensal} onChange={setGastoMensal} min={500} max={30000} step={100} prefix="R$ " />
        <SliderInput label="Meses de cobertura desejados" value={meses} onChange={setMeses} min={3} max={12} step={1} suffix=" meses" />
        <SliderInput label="Quanto consigo guardar por mês" value={aporteMensal} onChange={setAporteMensal} min={50} max={10000} step={50} prefix="R$ " />
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
        <SliderInput label="Total da dívida hoje" value={totalDivida} onChange={setTotalDivida} min={500} max={100000} step={100} prefix="R$ " />
        <SliderInput label="Juros da dívida" value={jurosMensal} onChange={setJurosMensal} min={1} max={20} step={0.5} suffix="% ao mês" decimals={1} />
        <SliderInput label="Quanto consigo pagar por mês" value={pagamentoMensal} onChange={setPagamentoMensal} min={50} max={20000} step={50} prefix="R$ " />
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
        <SliderInput label="Inflação anual esperada" value={inflacaoAnual} onChange={setInflacaoAnual} min={1} max={15} step={0.1} suffix="% a.a." decimals={1} />
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
        <SliderInput label="Renda mensal desejada na aposentadoria" value={rendaMensalDesejada} onChange={setRendaMensalDesejada} min={1000} max={50000} step={100} prefix="R$ " />
        <SliderInput label="Taxa de retirada anual" value={taxaRetiradaAnual} onChange={setTaxaRetiradaAnual} min={2} max={8} step={0.5} suffix="% a.a." decimals={1} />
        <SliderInput label="Anos até se aposentar" value={anosParaAposentar} onChange={setAnosParaAposentar} min={1} max={45} step={1} suffix=" anos" />
        <SliderInput label="Retorno esperado na acumulação" value={taxaMensalAcumulacao} onChange={setTaxaMensalAcumulacao} min={0.3} max={1.5} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Rentabilidade nominal (bruta)" value={rentabilidadeNominal} onChange={setRentabilidadeNominal} min={0} max={30} step={0.25} suffix="% a.a." decimals={2} />
        <SliderInput label="Inflação no período" value={inflacaoAnual} onChange={setInflacaoAnual} min={0} max={15} step={0.1} suffix="% a.a." decimals={1} />
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
        <SliderInput label="Rendimento bruto no período" value={rendimentoBruto} onChange={setRendimentoBruto} min={10} max={100000} step={10} prefix="R$ " />
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
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={0} max={30000} step={50} prefix="R$ " />
        <SliderInput label="Retorno esperado" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1.5} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Gasto mensal desejado (livre)" value={gastoMensalDesejado} onChange={setGastoMensalDesejado} min={1000} max={50000} step={100} prefix="R$ " />
        <SliderInput label="Taxa de retirada anual" value={taxaRetiradaAnual} onChange={setTaxaRetiradaAnual} min={2} max={8} step={0.5} suffix="% a.a." decimals={1} />
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
        <SliderInput label="Valor a investir" value={valorInicial} onChange={setValorInicial} min={100} max={500000} step={100} prefix="R$ " />
        <SliderInput label="Prazo" value={anos} onChange={setAnos} min={1} max={30} step={1} suffix=" anos" />
        <SliderInput label="Investimento A — taxa mensal" value={taxaA} onChange={setTaxaA} min={0.1} max={2} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Investimento B — taxa mensal" value={taxaB} onChange={setTaxaB} min={0.1} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Renda mensal líquida" value={rendaMensal} onChange={setRendaMensal} min={500} max={100000} step={100} prefix="R$ " />
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
        <SliderInput label="Aporte mensal" value={aporteMensal} onChange={setAporteMensal} min={50} max={20000} step={50} prefix="R$ " />
        <SliderInput label="Prazo até o resgate" value={anos} onChange={setAnos} min={1} max={40} step={1} suffix=" anos" />
        <SliderInput label="Retorno bruto esperado" value={taxaMensal} onChange={setTaxaMensal} min={0.2} max={1.5} step={0.05} suffix="% ao mês" decimals={2} />
        <SliderInput label="Taxa de administração" value={taxaAdministracao} onChange={setTaxaAdministracao} min={0} max={4} step={0.1} suffix="% ao ano" decimals={1} />
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
        <SliderInput label="Dividendos pagos nos últimos 12 meses" value={dividendosAnuais} onChange={setDividendosAnuais} min={0} max={100} step={0.1} prefix="R$ " decimals={2} />
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
        <SliderInput label="Valor do gasto (ou compra)" value={valorGasto} onChange={setValorGasto} min={10} max={200000} step={10} prefix="R$ " />
        <SliderInput label="Retorno que poderia ter tido" value={taxaMensal} onChange={setTaxaMensal} min={0.1} max={2} step={0.05} suffix="% ao mês" decimals={2} />
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
        <SliderInput label="Valor do objetivo" value={valorObjetivo} onChange={setValorObjetivo} min={500} max={200000} step={100} prefix="R$ " />
        <SliderInput label="Prazo" value={prazoMeses} onChange={setPrazoMeses} min={1} max={36} step={1} suffix=" meses" />
        <SliderInput label="Taxa de retorno (liquidez diária)" value={taxaMensal} onChange={setTaxaMensal} min={0.3} max={1.2} step={0.05} suffix="% ao mês" decimals={2} />
      </div>
      <ResultCard label="Aporte mensal necessário" value={fmt(aporteMensal)} sub={`Para juntar ${fmt(valorObjetivo)} em ${prazoMeses} meses`} color="#3B82F6" />
      <ResultCard label="Rendimento gerado no período" value={fmt(rendimentoGerado)} sub={`De ${fmt(totalAportado)} aportados, chega a ${fmt(valorObjetivo)}`} color="#22C55E" />
    </CalcShell>
  )
}
