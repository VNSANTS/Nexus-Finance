import { useEffect, useMemo, useState } from 'react'
import {
  Radar, Plus, TrendingUp, TrendingDown, Landmark, LineChart, Coins,
  Pencil, Trash2, ChevronLeft, RefreshCw, Newspaper,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'
import type { Investimento, ClasseAtivo } from '../types'
import { calcularValorAtivo, calcularResumoCarteira, type ValorAtivo } from '../investimentos/calculos'
import { buscarIndicadores, type IndicadoresEconomicos } from '../investimentos/indicadoresBacen'
import { buscarPrecosAcoes, buscarPrecosCripto } from '../investimentos/apiInvestimentos'
import FormularioInvestimento from '../investimentos/FormularioInvestimento'
import NoticiasMercado from '../investimentos/NoticiasMercado'
import GraficoEvolucao from '../investimentos/GraficoEvolucao'

const INFO_CLASSE: Record<ClasseAtivo, { label: string; icone: typeof Landmark; cor: string }> = {
  'renda-fixa': { label: 'Renda Fixa', icone: Landmark, cor: '#22C55E' },
  'renda-variavel': { label: 'Renda Variável', icone: LineChart, cor: '#00D4FF' },
  cripto: { label: 'Cripto', icone: Coins, cor: '#F59E0B' },
}

type Tela = { nome: 'geral' } | { nome: 'form'; editando: Investimento | null } | { nome: 'detalhe'; inv: Investimento } | { nome: 'noticias' }

export default function GfInvestidorPage() {
  const { estado, adicionarInvestimento, editarInvestimento, excluirInvestimento, registrarHistoricoPatrimonio } = useGestaoFinanceira()
  const [tela, setTela] = useState<Tela>({ nome: 'geral' })

  const [indicadores, setIndicadores] = useState<IndicadoresEconomicos | null>(null)
  const [cotacoes, setCotacoes] = useState<Map<string, number>>(new Map())
  const [atualizando, setAtualizando] = useState(false)

  const tickers = useMemo(
    () => [...new Set(estado.investimentos.filter((i): i is Extract<Investimento, { classe: 'renda-variavel' }> => i.classe === 'renda-variavel').map((i) => i.ticker))],
    [estado.investimentos]
  )
  const coingeckoIds = useMemo(
    () => [...new Set(estado.investimentos.filter((i): i is Extract<Investimento, { classe: 'cripto' }> => i.classe === 'cripto').map((i) => i.coingeckoId))],
    [estado.investimentos]
  )
  const temRendaFixa = estado.investimentos.some((i) => i.classe === 'renda-fixa')

  async function atualizarCotacoes() {
    setAtualizando(true)
    const [acoesMap, criptoMap, ind] = await Promise.all([
      buscarPrecosAcoes(tickers),
      buscarPrecosCripto(coingeckoIds),
      temRendaFixa ? buscarIndicadores() : Promise.resolve(null),
    ])
    setCotacoes(new Map([...acoesMap, ...criptoMap]))
    if (ind) setIndicadores(ind)
    setAtualizando(false)
  }

  useEffect(() => {
    atualizarCotacoes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers.join(','), coingeckoIds.join(','), temRendaFixa])

  const resumo = useMemo(() => calcularResumoCarteira(estado.investimentos, indicadores, cotacoes), [estado.investimentos, indicadores, cotacoes])

  // Registra 1 retrato do patrimônio por dia (upsert por data — reabrir a
  // tela várias vezes no mesmo dia só refina o mesmo ponto). Só depois que
  // a primeira leva de cotações/indicadores já chegou (ou falhou de vez),
  // pra não gravar um ponto zerado por causa da corrida com o fetch inicial.
  useEffect(() => {
    if (estado.investimentos.length === 0 || atualizando) return
    const hoje = new Date().toISOString().slice(0, 10)
    registrarHistoricoPatrimonio({
      data: hoje,
      valorTotal: resumo.valorAtual,
      rendaFixa: resumo.porClasse['renda-fixa'].valorAtual,
      rendaVariavel: resumo.porClasse['renda-variavel'].valorAtual,
      cripto: resumo.porClasse.cripto.valorAtual,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atualizando])

  function pedirExclusao(inv: Investimento) {
    if (window.confirm(`Excluir "${inv.nome}" da carteira? Essa ação não pode ser desfeita.`)) {
      excluirInvestimento(inv.id)
      setTela({ nome: 'geral' })
    }
  }

  if (tela.nome === 'form') {
    return (
      <FormularioInvestimento
        editando={tela.editando}
        onCancelar={() => setTela({ nome: 'geral' })}
        onSalvar={(inv) => {
          if (tela.editando) editarInvestimento(inv)
          else adicionarInvestimento(inv)
          setTela({ nome: 'geral' })
        }}
      />
    )
  }

  if (tela.nome === 'noticias') {
    return <NoticiasMercado onVoltar={() => setTela({ nome: 'geral' })} />
  }

  if (tela.nome === 'detalhe') {
    const v = calcularValorAtivo(tela.inv, indicadores, cotacoes)
    return (
      <DetalheInvestimento
        inv={tela.inv}
        valor={v}
        onVoltar={() => setTela({ nome: 'geral' })}
        onEditar={() => setTela({ nome: 'form', editando: tela.inv })}
        onExcluir={() => pedirExclusao(tela.inv)}
      />
    )
  }

  const positivo = resumo.rentabilidadeReais >= 0

  return (
    <div className="pb-24">
      <GfHeader
        titulo="Área do Investidor"
        subtitulo="Sua carteira real de investimentos"
        icone={Radar}
        corIcone="#EC4899"
        voltarPara="/gestao-financeira"
        acoes={
          <button onClick={() => setTela({ nome: 'noticias' })} className="w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center">
            <Newspaper size={16} className="text-slate-400" />
          </button>
        }
      />

      <div className="px-4 mt-2">
        {/* Patrimônio total */}
        <div className="card-surface rounded-[20px] p-4 mb-3.5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-slate-500">Patrimônio total investido</p>
            <button onClick={atualizarCotacoes} disabled={atualizando} className="text-slate-500">
              <RefreshCw size={13} className={atualizando ? 'animate-spin' : ''} />
            </button>
          </div>
          <p className="text-2xl font-display font-extrabold text-white">{formatMoeda(resumo.valorAtual, estado)}</p>
          <div className="flex items-center gap-1.5 mt-1">
            {positivo ? <TrendingUp size={13} className="text-accent-green" /> : <TrendingDown size={13} className="text-accent-red" />}
            <span className="text-[12.5px] font-semibold" style={{ color: positivo ? '#22C55E' : '#EF4444' }}>
              {positivo ? '+' : ''}{formatMoeda(resumo.rentabilidadeReais, estado)} ({positivo ? '+' : ''}{resumo.rentabilidadePercent.toFixed(2)}%)
            </span>
            <span className="text-[11px] text-slate-600">desde a aplicação</span>
          </div>
        </div>

        {estado.investimentos.length > 0 && <GraficoEvolucao dados={estado.historicoPatrimonio} />}

        {/* Resumo por classe */}
        {estado.investimentos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3.5">
            {(Object.keys(INFO_CLASSE) as ClasseAtivo[]).map((classe) => {
              const info = INFO_CLASSE[classe]
              const c = resumo.porClasse[classe]
              const rent = c.valorAplicado > 0 ? (c.valorAtual / c.valorAplicado - 1) * 100 : 0
              return (
                <div key={classe} className="card-surface rounded-[16px] p-2.5">
                  <info.icone size={14} style={{ color: info.cor }} />
                  <p className="text-[10px] text-slate-500 mt-1">{info.label}</p>
                  <p className="text-[12.5px] font-bold text-white">{formatMoeda(c.valorAtual, estado)}</p>
                  {c.valorAplicado > 0 && (
                    <p className="text-[10px] font-semibold" style={{ color: rent >= 0 ? '#22C55E' : '#EF4444' }}>
                      {rent >= 0 ? '+' : ''}{rent.toFixed(1)}%
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Lista de ativos */}
        {estado.investimentos.length === 0 ? (
          <div className="card-surface rounded-[20px] p-6 text-center">
            <Radar size={28} className="text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white mb-1">Sua carteira está vazia</p>
            <p className="text-xs text-slate-500">Adicione os investimentos que você já tem pra acompanhar tudo aqui.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {estado.investimentos.map((inv) => {
              const v = calcularValorAtivo(inv, indicadores, cotacoes)
              const info = INFO_CLASSE[inv.classe]
              const pos = v.rentabilidadeReais >= 0
              return (
                <button
                  key={inv.id}
                  onClick={() => setTela({ nome: 'detalhe', inv })}
                  className="card-surface rounded-[16px] p-3.5 flex items-center gap-3 text-left"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${info.cor}22` }}>
                    <info.icone size={16} style={{ color: info.cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-white truncate">{inv.nome}</p>
                    <p className="text-[11px] text-slate-500">{info.label}{!v.dadoAtualizado && ' · estimado'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[12.5px] font-bold text-white">{formatMoeda(v.valorAtual, estado)}</p>
                    <p className="text-[11px] font-semibold" style={{ color: pos ? '#22C55E' : '#EF4444' }}>
                      {pos ? '+' : ''}{v.rentabilidadePercent.toFixed(2)}%
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => setTela({ nome: 'form', editando: null })}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-accent-cyan text-black flex items-center justify-center shadow-lg z-20"
        aria-label="Adicionar investimento"
      >
        <Plus size={24} />
      </button>
    </div>
  )
}

function DetalheInvestimento({
  inv, valor, onVoltar, onEditar, onExcluir,
}: {
  inv: Investimento
  valor: ValorAtivo
  onVoltar: () => void
  onEditar: () => void
  onExcluir: () => void
}) {
  const { estado } = useGestaoFinanceira()
  const info = INFO_CLASSE[inv.classe]
  const positivo = valor.rentabilidadeReais >= 0

  return (
    <div className="pb-10">
      <div className="px-4 pt-5 pb-1">
        <button onClick={onVoltar} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
          <ChevronLeft size={16} /> Voltar
        </button>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${info.cor}22` }}>
            <info.icone size={22} style={{ color: info.cor }} />
          </div>
          <div>
            <h1 className="text-xl font-display font-extrabold text-white leading-tight">{inv.nome}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{info.label}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="card-surface rounded-[20px] p-4 mb-3.5">
          <p className="text-xs text-slate-500 mb-1">Valor atual{!valor.dadoAtualizado && ' (estimado — sem cotação agora)'}</p>
          <p className="text-2xl font-display font-extrabold text-white">{formatMoeda(valor.valorAtual, estado)}</p>
          <div className="flex items-center gap-1.5 mt-1">
            {positivo ? <TrendingUp size={13} className="text-accent-green" /> : <TrendingDown size={13} className="text-accent-red" />}
            <span className="text-[12.5px] font-semibold" style={{ color: positivo ? '#22C55E' : '#EF4444' }}>
              {positivo ? '+' : ''}{formatMoeda(valor.rentabilidadeReais, estado)} ({positivo ? '+' : ''}{valor.rentabilidadePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="h-px bg-border my-3" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10.5px] text-slate-500">Valor aplicado</p>
              <p className="text-[13px] font-semibold text-white">{formatMoeda(valor.valorAplicado, estado)}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-slate-500">Data da aplicação</p>
              <p className="text-[13px] font-semibold text-white">{new Date(inv.dataAplicacao + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-slate-500">Quantidade</p>
              <p className="text-[13px] font-semibold text-white">{inv.quantidade}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-slate-500">Preço médio</p>
              <p className="text-[13px] font-semibold text-white">{formatMoeda(inv.precoCompra, estado)}</p>
            </div>
            {inv.classe === 'renda-fixa' && (
              <>
                <div>
                  <p className="text-[10.5px] text-slate-500">Indexador</p>
                  <p className="text-[13px] font-semibold text-white">
                    {inv.indexador === 'PREFIXADO' ? `${inv.taxaContratada}% a.a.` : inv.indexador === 'IPCA' ? `IPCA + ${inv.taxaContratada}% a.a.` : `${inv.taxaContratada}% do ${inv.indexador}`}
                  </p>
                </div>
                <div>
                  <p className="text-[10.5px] text-slate-500">Vencimento</p>
                  <p className="text-[13px] font-semibold text-white">
                    {inv.dataVencimento ? new Date(inv.dataVencimento + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {inv.classe === 'renda-fixa' && (
          <p className="text-[10.5px] text-slate-600 mb-3.5 px-1">
            Valor estimado com a taxa do indexador de hoje projetada desde a aplicação — não é o valor exato de resgate (que considera a taxa de cada dia).
          </p>
        )}

        <div className="flex gap-2">
          <button onClick={onEditar} className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-border text-white text-sm font-semibold py-3">
            <Pencil size={14} /> Editar
          </button>
          <button onClick={onExcluir} className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-accent-red/40 text-accent-red text-sm font-semibold py-3">
            <Trash2 size={14} /> Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
