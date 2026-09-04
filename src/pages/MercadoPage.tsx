import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, CalendarClock, ChevronLeft, Grid3x3, Newspaper, Star, X } from 'lucide-react'
import { getIcon } from '@/components/Icon'
import {
  buildMercados, TICKER_TAPE_ITENS, RANKING_ALTAS, RANKING_BAIXAS,
  SETORES_HEATMAP, CALENDARIO_ECONOMICO, TICKERS_DISPONIVEIS, type Mercado,
} from '@/data/mercado'
import { useUserProgress } from '@/hooks/useUserProgress'

export default function MercadoPage() {
  const mercados = buildMercados()
  const [selecionado, setSelecionado] = useState<Mercado | null>(null)
  const { progress, toggleWatchlist } = useUserProgress()

  if (selecionado) {
    return <MercadoDetalhe mercado={selecionado} onBack={() => setSelecionado(null)} />
  }

  return (
    <div>
      <TickerTape />
      <div className="px-4 pt-4 pb-28">
        <h1 className="text-xl font-display font-extrabold text-white">Mercado ao vivo</h1>
        <p className="text-xs text-slate-500 mt-1 mb-4.5">Toque em um mercado para ver as notícias</p>

        <div className="flex flex-col gap-3.5 mb-5">
          <RankingMercado />
          <Watchlist watchlist={progress.watchlist} onToggle={toggleWatchlist} />
          <HeatmapSetores />
          <CalendarioEconomico />
        </div>

        <p className="text-[12.5px] font-bold text-white mb-2.5">Todos os mercados</p>
        <div className="flex flex-col gap-2.5">
          {mercados.map((m) => {
            const Icon = getIcon(m.iconName, BarChart3)
            return (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelecionado(m)}
                className="flex items-center gap-3 card-surface rounded-2xl p-3.5 text-left"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${m.cor}1A` }}>
                  <Icon size={19} style={{ color: m.cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-white">{m.nome}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{m.noticias.length} notícias recentes</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-white">{m.valor}</p>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: m.up === null ? '#64748B' : m.up ? '#22C55E' : '#EF4444' }}>
                    {m.delta}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TickerTape() {
  const itens = [...TICKER_TAPE_ITENS, ...TICKER_TAPE_ITENS]
  return (
    <div className="overflow-hidden bg-bg-card border-b border-border py-2">
      <motion.div className="flex gap-5.5 whitespace-nowrap w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        {itens.map((it, i) => (
          <div key={i} className="flex items-center gap-1.5 pl-3.5">
            <span className="text-[11px] font-bold text-slate-400">{it.label}</span>
            <span className="text-[11px] font-semibold text-white">{it.valor}</span>
            <span className="text-[10.5px] font-semibold" style={{ color: it.up === null ? '#64748B' : it.up ? '#22C55E' : '#EF4444' }}>
              {it.delta}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function RankingMercado() {
  const [aba, setAba] = useState<'altas' | 'baixas'>('altas')
  const lista = aba === 'altas' ? RANKING_ALTAS : RANKING_BAIXAS
  return (
    <div className="card-surface rounded-[18px] p-4">
      <div className="flex gap-1.5 mb-3">
        <SubTab label="Maiores altas" active={aba === 'altas'} onClick={() => setAba('altas')} />
        <SubTab label="Maiores baixas" active={aba === 'baixas'} onClick={() => setAba('baixas')} />
      </div>
      <div className="flex flex-col gap-2">
        {lista.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] text-slate-500 w-3.5">{i + 1}</span>
              <span className="text-xs font-bold text-white">{item.ticker}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11.5px] text-slate-300">{item.preco}</span>
              <span className="text-[11.5px] font-bold w-12 text-right" style={{ color: aba === 'altas' ? '#22C55E' : '#EF4444' }}>
                {item.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SubTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 h-8 rounded-xl text-[11.5px] font-semibold"
      style={{ background: active ? '#EC4899' : '#0E1526', color: active ? '#fff' : '#94A3B8', border: `1px solid ${active ? '#EC4899' : '#1C2740'}` }}
    >
      {label}
    </button>
  )
}

function Watchlist({ watchlist, onToggle }: { watchlist: string[]; onToggle: (t: string) => void }) {
  const [buscando, setBuscando] = useState(false)
  const [busca, setBusca] = useState('')
  const disponiveis = TICKERS_DISPONIVEIS.filter((t) => !watchlist.includes(t) && t.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div className="card-surface rounded-[18px] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-accent-gold" />
          <p className="text-[12.5px] font-bold text-white">Sua watchlist</p>
        </div>
        <button onClick={() => setBuscando((b) => !b)} className="w-[26px] h-[26px] rounded-full bg-accent-cyan/10 flex items-center justify-center">
          {buscando ? <X size={13} className="text-accent-cyan" /> : <span className="text-accent-cyan text-[15px] font-bold">+</span>}
        </button>
      </div>

      {buscando && (
        <div className="mb-3">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value.toUpperCase())}
            placeholder="Buscar ticker..."
            className="w-full h-9 rounded-[10px] bg-bg border border-border text-white text-xs px-3 outline-none mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {disponiveis.map((t) => (
              <button
                key={t}
                onClick={() => {
                  onToggle(t)
                  setBusca('')
                }}
                className="px-2.5 py-1.5 rounded-[10px] bg-bg border border-border text-slate-300 text-[11px] font-semibold"
              >
                + {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {watchlist.length === 0 ? (
        <div className="text-center py-3.5">
          <p className="text-[11.5px] font-semibold text-slate-400">Você ainda não acompanha nenhum ativo</p>
          <p className="text-[10.5px] text-slate-500 mt-0.5">Toque no + acima para adicionar seus primeiros tickers</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {watchlist.map((t) => (
            <div key={t} className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{t}</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[11.5px] text-accent-green font-semibold">+1,2%</span>
                <button onClick={() => onToggle(t)}>
                  <X size={13} className="text-slate-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HeatmapSetores() {
  function corPorVariacao(v: number) {
    if (v > 1) return '#22C55E'
    if (v > 0) return '#22C55E99'
    if (v > -1) return '#EF444499'
    return '#EF4444'
  }
  return (
    <div className="card-surface rounded-[18px] p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Grid3x3 size={14} className="text-slate-400" />
        <p className="text-[12.5px] font-bold text-white">Heatmap de setores</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {SETORES_HEATMAP.map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${corPorVariacao(s.variacao)}33`, border: `1px solid ${corPorVariacao(s.variacao)}66` }}>
            <p className="text-[10px] text-white font-semibold leading-tight">{s.nome}</p>
            <p className="text-[11px] font-extrabold mt-0.5" style={{ color: corPorVariacao(s.variacao) }}>
              {s.variacao > 0 ? '+' : ''}
              {s.variacao}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarioEconomico() {
  return (
    <div className="card-surface rounded-[18px] p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <CalendarClock size={14} className="text-slate-400" />
        <p className="text-[12.5px] font-bold text-white">Calendário econômico da semana</p>
      </div>
      <div className="flex flex-col gap-2">
        {CALENDARIO_ECONOMICO.map((ev, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-[10.5px] font-bold text-slate-500 w-[30px]">{ev.dia}</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ev.relevancia === 'alta' ? '#EF4444' : '#FFC93C' }} />
            <span className="text-xs text-slate-300 flex-1">{ev.evento}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MercadoDetalhe({ mercado, onBack }: { mercado: Mercado; onBack: () => void }) {
  const Icon = getIcon(mercado.iconName, BarChart3)
  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-4">
        <ChevronLeft size={16} /> Mercado
      </button>

      <div className="flex items-center gap-3 mb-4.5">
        <div className="w-[46px] h-[46px] rounded-2xl flex items-center justify-center" style={{ background: `${mercado.cor}1A` }}>
          <Icon size={22} style={{ color: mercado.cor }} />
        </div>
        <div>
          <h1 className="text-lg font-display font-extrabold text-white">{mercado.nome}</h1>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-[15px] font-bold text-white">{mercado.valor}</span>
            <span className="text-xs font-semibold" style={{ color: mercado.up === null ? '#64748B' : mercado.up ? '#22C55E' : '#EF4444' }}>
              {mercado.delta}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-2.5">
        <Newspaper size={14} className="text-slate-500" />
        <h3 className="text-[13px] font-bold text-white">Principais notícias</h3>
      </div>
      <div className="flex flex-col gap-2.5">
        {mercado.noticias.map((n, i) => (
          <div key={i} className="card-surface rounded-2xl p-3.5">
            <p className="text-[13px] font-semibold text-white leading-snug">{n.titulo}</p>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {n.fonte} · {n.tempo}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
