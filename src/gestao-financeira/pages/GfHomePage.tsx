import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  Eye,
  EyeOff,
  Wallet2,
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowLeftRight,
  ChevronRight,
  Landmark,
  PieChart,
  Radar,
  CalendarClock,
  CalendarDays,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import NexusLogo from '@/components/NexusLogo'
import { useUserProgress } from '@/hooks/useUserProgress'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import {
  contasProximasDoVencimento,
  gastosPorCategoria,
  gerarInsights,
  mesAnteriorStr,
  resumoDoMes,
  resumoOrcamentos,
  saldoTotalContas,
  serieDiariaDoMes,
  transacoesDoDia,
  variacaoPercentual,
} from '../selectors'
import { formatPercent } from '@/utils/format'
import { formatMoeda } from '../formatMoeda'
import { iconePorNome } from '../iconMap'
import MiniGrafico from '../components/MiniGrafico'
import GfGraficoFluxo from '../components/GfGraficoFluxo'
import GfDonutCategorias from '../components/GfDonutCategorias'
import GfCalendarioFinanceiro from '../components/GfCalendarioFinanceiro'
import { gerarNotificacoes } from '../notificacoes'

// Home da Gestão Financeira — versão mobile do dashboard, com todos os
// blocos que existem na versão desktop (fluxo completo, categorias,
// orçamento, contas, transações, metas, investidor, insights, agenda,
// calendário), só que empilhados e redimensionados pro formato de celular
// em vez do grid lado a lado do desktop.
export default function GfHomePage() {
  const navigate = useNavigate()
  const { estado, permissoes } = useGestaoFinanceira()
  const { progress } = useUserProgress()
  // Ponto de partida vem da preferência "Abrir com valores ocultos"
  // (tela Privacidade) — dali em diante o olho na tela funciona normal,
  // isso só decide o estado inicial toda vez que a Home é montada.
  const [saldoVisivel, setSaldoVisivel] = useState(!estado.preferenciasPrivacidade.ocultarValoresAoAbrir)

  const resumoAtual = useMemo(() => resumoDoMes(estado.transacoes), [estado.transacoes])
  const resumoAnterior = useMemo(() => resumoDoMes(estado.transacoes, mesAnteriorStr()), [estado.transacoes])
  const saldoTotal = useMemo(() => saldoTotalContas(estado.contas, estado.transacoes), [estado.contas, estado.transacoes])
  const serieDiaria = useMemo(() => serieDiariaDoMes(estado.transacoes), [estado.transacoes])
  const categorias = useMemo(() => gastosPorCategoria(estado.transacoes, estado.categorias), [estado.transacoes, estado.categorias])
  const orcamentos = useMemo(() => resumoOrcamentos(estado), [estado])
  const transacoesHoje = useMemo(() => transacoesDoDia(estado.transacoes).slice(0, 4), [estado.transacoes])
  const metasAtivas = useMemo(() => {
    const ordem: Record<string, number> = { alta: 0, media: 1, baixa: 2 }
    return estado.metas
      .filter((m) => !m.arquivada && !m.pausada)
      .sort((a, b) => (ordem[a.prioridade] ?? 1) - (ordem[b.prioridade] ?? 1))
      .slice(0, 3)
  }, [estado.metas])
  const vencimentos = useMemo(() => contasProximasDoVencimento(estado, 7), [estado])
  const insights = useMemo(() => gerarInsights(estado), [estado])
  const notificacoesNaoLidas = useMemo(
    () => gerarNotificacoes(estado).filter((n) => !estado.notificacoesLidas.includes(n.id)).length,
    [estado]
  )

  const varReceitas = variacaoPercentual(resumoAtual.receitas, resumoAnterior.receitas)
  const varDespesas = variacaoPercentual(resumoAtual.despesas, resumoAnterior.despesas)
  const varSaldo = variacaoPercentual(resumoAtual.saldo, resumoAnterior.saldo)

  const hoje = new Date()
  const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })

  const metaEconomia = estado.metaEconomiaMensal
  const pctMetaEconomia = metaEconomia > 0 ? Math.min(100, Math.max(0, (resumoAtual.saldo / metaEconomia) * 100)) : 0
  const totalDespesasCategoria = categorias.reduce((s, c) => s + c.total, 0)

  const v = (n: number) => (permissoes.verSaldos && saldoVisivel ? formatMoeda(n, estado) : '••••••')

  return (
    <div className="pb-4">
      {/* Header: voltar + logo | sino de notificações */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-slate-300" aria-label="Voltar para o Nexus Finance">
            <ArrowLeft size={21} />
          </button>
          <NexusLogo size={30} />
        </div>
        <button className="relative text-slate-300" aria-label="Notificações" onClick={() => navigate('/gestao-financeira/notificacoes')}>
          <Bell size={19} />
          {notificacoesNaoLidas > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 px-[3px] rounded-full bg-accent-red text-[8px] font-bold text-white flex items-center justify-center">
              {notificacoesNaoLidas > 9 ? '9+' : notificacoesNaoLidas}
            </span>
          )}
        </button>
      </div>

      {/* Saudação */}
      <div className="px-4 mt-4">
        <h1 className="text-[19px] font-display font-extrabold text-white">Olá, {progress.perfilPessoal.nome}! 👋</h1>
        <p className="text-[13px] text-slate-500 capitalize mt-0.5">Hoje é {dataFormatada}.</p>
      </div>

      {/* Card: Saldo atual */}
      <div className="px-4 mt-4">
        <div className="card-surface rounded-[20px] p-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-accent-cyan flex items-center justify-center shrink-0">
              <Wallet2 size={22} className="text-bg" strokeWidth={2.2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-slate-300 font-medium">Saldo atual</p>
                {permissoes.verSaldos && (
                  <button onClick={() => setSaldoVisivel((val) => !val)} aria-label={saldoVisivel ? 'Ocultar valores' : 'Mostrar valores'}>
                    {saldoVisivel ? <Eye size={16} className="text-slate-500" /> : <EyeOff size={16} className="text-slate-500" />}
                  </button>
                )}
              </div>
              <p className="text-[24px] font-display font-extrabold text-accent-cyan leading-tight mt-0.5">{v(saldoTotal)}</p>
              <p className="text-[11.5px] text-slate-500 mt-0.5">em todas as contas</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-green bg-accent-green/15 rounded-full px-2 py-1">
              ▲ 0% esta semana
            </span>
            <MiniGrafico cor="#00D4FF" />
          </div>
        </div>
      </div>

      {/* Card: Receitas */}
      <div className="px-4 mt-3">
        <CardMetrica titulo="Receitas" legenda="este mês" valor={v(resumoAtual.receitas)} Icon={TrendingUp} corIcone="#22C55E" corValor="#22C55E" variacao={varReceitas} />
      </div>

      {/* Card: Despesas */}
      <div className="px-4 mt-3">
        <CardMetrica
          titulo="Despesas"
          legenda="este mês"
          valor={v(resumoAtual.despesas)}
          Icon={TrendingDown}
          corIcone="#EF4444"
          corValor="#EF4444"
          variacao={varDespesas}
          variacaoInvertida
        />
      </div>

      {/* Card: Você economizou */}
      <div className="px-4 mt-3">
        <div className="card-surface rounded-[20px] p-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6] flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-slate-300 font-medium">Você economizou</p>
                {varSaldo != null && (
                  <span className={`text-[11px] font-bold ${varSaldo >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {varSaldo >= 0 ? '▲' : '▼'} {formatPercent(Math.abs(varSaldo), 1).replace('+', '')}
                  </span>
                )}
              </div>
              <p className="text-[22px] font-display font-extrabold text-[#8B5CF6] leading-tight mt-0.5">{v(resumoAtual.saldo)}</p>
              <p className="text-[11.5px] text-slate-500 mt-0.5">este mês</p>
            </div>
          </div>
          {metaEconomia > 0 && (
            <div className="mt-3.5">
              <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-accent-cyan" style={{ width: `${pctMetaEconomia}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-[11px] text-slate-500">Meta: Economizar {v(metaEconomia)}</p>
                <p className="text-[13px] font-bold text-white">{pctMetaEconomia.toFixed(0)}%</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card: Fluxo de caixa completo */}
      <SecaoCard titulo="Fluxo de caixa" subtitulo="Entradas vs Saídas · este mês" Icon={ArrowLeftRight} corIcone="#22C55E">
        <GfGraficoFluxo pontos={serieDiaria} visivel={permissoes.verSaldos && saldoVisivel} />
      </SecaoCard>

      {/* Card: Gastos por categoria (donut) */}
      <SecaoCard titulo="Gastos por categoria" subtitulo="Este mês" Icon={PieChart} corIcone="#EC4899" acao={() => navigate('/gestao-financeira/relatorios')}>
        <GfDonutCategorias categorias={categorias} total={totalDespesasCategoria} visivel={permissoes.verSaldos && saldoVisivel} />
      </SecaoCard>

      {/* Card: Orçamento */}
      <SecaoCard titulo="Orçamento" subtitulo="Este mês" Icon={PieChart} corIcone="#00D4FF" acao={() => navigate('/gestao-financeira/orcamento')}>
        {orcamentos.length === 0 ? (
          <BotaoVazio texto="Definir seu primeiro orçamento" onClick={() => navigate('/gestao-financeira/orcamento')} Icon={PieChart} />
        ) : (
          <div className="flex flex-col gap-3.5">
            {orcamentos.slice(0, 4).map((o) => {
              const Icone = iconePorNome(o.categoria.icone)
              const estourado = o.percentual >= 100
              return (
                <div key={o.categoria.id}>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: `${o.categoria.cor}22` }}>
                      <Icone size={12} style={{ color: o.categoria.cor }} />
                    </div>
                    <span className="text-[12px] text-slate-300 font-medium flex-1 truncate">{o.categoria.nome}</span>
                    <span className="text-[11.5px] text-slate-500 shrink-0">
                      {v(o.gasto)} / {v(o.limite)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${o.percentual}%`, background: estourado ? '#EF4444' : o.categoria.cor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </SecaoCard>

      {/* Card: Contas e carteiras */}
      <SecaoCard titulo="Contas e carteiras" Icon={Landmark} corIcone="#FFC93C" acao={() => navigate('/gestao-financeira/contas-cartoes')}>
        {estado.contas.length === 0 ? (
          <BotaoVazio texto="Adicionar sua primeira conta" onClick={() => navigate('/gestao-financeira/contas-cartoes')} Icon={Landmark} />
        ) : (
          <div className="flex flex-col gap-2.5">
            {estado.contas
              .filter((c) => !c.arquivada)
              .slice(0, 4)
              .map((conta) => (
                <div key={conta.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${conta.cor}22` }}>
                    <Wallet size={15} style={{ color: conta.cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-white font-semibold truncate">{conta.nome}</p>
                  </div>
                  <span className="text-[12.5px] font-semibold text-accent-green shrink-0">{v(conta.saldoInicial)}</span>
                </div>
              ))}
          </div>
        )}
      </SecaoCard>

      {/* Card: Últimas transações */}
      <SecaoCard titulo="Lançamentos de hoje" Icon={ArrowLeftRight} corIcone="#00D4FF" acao={() => navigate('/gestao-financeira/lancamentos')}>
        {transacoesHoje.length === 0 ? (
          <BotaoVazio texto="Registrar um lançamento" onClick={() => navigate('/gestao-financeira/lancamentos/novo')} Icon={ArrowLeftRight} />
        ) : (
          <div className="flex flex-col gap-2.5">
            {transacoesHoje.map((t) => {
              const cat = estado.categorias.find((c) => c.id === t.categoriaId)
              const Icone = cat ? iconePorNome(cat.icone) : ArrowLeftRight
              const cor = cat?.cor ?? '#64748B'
              const positivo = t.tipo === 'receita'
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
                    <Icone size={15} style={{ color: cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-white font-semibold truncate">{t.descricao || cat?.nome || 'Lançamento'}</p>
                    <p className="text-[11px] text-slate-500">{t.hora}</p>
                  </div>
                  <span className={`text-[12.5px] font-semibold shrink-0 ${positivo ? 'text-accent-green' : 'text-accent-red'}`}>
                    {positivo ? '+' : '-'} {v(t.valor)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </SecaoCard>

      {/* Card: Metas em andamento */}
      <SecaoCard titulo="Metas em andamento" Icon={Sparkles} corIcone="#8B5CF6" acao={() => navigate('/gestao-financeira/metas')}>
        {metasAtivas.length === 0 ? (
          <BotaoVazio texto="Criar uma meta" onClick={() => navigate('/gestao-financeira/metas')} Icon={Sparkles} />
        ) : (
          <div className="flex flex-col gap-3.5">
            {metasAtivas.map((m) => {
              const pct = m.valorObjetivo > 0 ? Math.min(100, (m.valorAtual / m.valorObjetivo) * 100) : 0
              const concluida = m.valorAtual >= m.valorObjetivo && m.valorObjetivo > 0
              const falta = Math.max(0, m.valorObjetivo - m.valorAtual)
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                    <span className="text-slate-300 font-medium">{m.nome}</span>
                    <span className={concluida ? 'text-accent-green font-semibold' : 'text-white font-semibold'}>
                      {concluida ? 'Concluída' : `${pct.toFixed(0)}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: concluida ? '#22C55E' : m.cor }} />
                  </div>
                  {!concluida && <p className="text-[10.5px] text-slate-600 mt-1">Faltam {v(falta)}</p>}
                </div>
              )
            })}
          </div>
        )}
      </SecaoCard>

      {/* Card: Área do investidor (resumo) */}
      <SecaoCard titulo="Área do investidor" subtitulo="Carteira" Icon={Radar} corIcone="#EC4899" acao={() => navigate('/gestao-financeira/investidor')}>
        <BotaoVazio texto="Configurar sua carteira de investimentos" onClick={() => navigate('/gestao-financeira/investidor')} Icon={Radar} />
      </SecaoCard>

      {/* Card: Insights automáticos */}
      <SecaoCard titulo="Insights para você" Icon={Lightbulb} corIcone="#FFC93C">
        <div className="flex flex-col gap-2.5">
          {insights.map((i) => (
            <div key={i.id} className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${corInsight(i.tipo)}22` }}>
                <IconeInsight tipo={i.tipo} cor={corInsight(i.tipo)} />
              </div>
              <p className="text-[12px] text-slate-300 leading-relaxed">{i.texto}</p>
            </div>
          ))}
        </div>
      </SecaoCard>

      {/* Card: Agenda financeira */}
      <SecaoCard titulo="Agenda financeira" Icon={CalendarClock} corIcone="#EF4444" acao={() => navigate('/gestao-financeira/dividas')}>
        {vencimentos.length === 0 ? (
          <p className="text-[12.5px] text-slate-500 py-1">Nenhuma conta próxima do vencimento nos próximos 7 dias.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {vencimentos.slice(0, 4).map(({ divida, diffDias }) => (
              <div key={divida.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-red/15 flex items-center justify-center shrink-0">
                  <CalendarClock size={14} className="text-accent-red" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] text-white font-semibold truncate">{divida.nome}</p>
                  <p className="text-[11px] text-slate-500">
                    {diffDias === 0 ? 'Vence hoje' : diffDias < 0 ? `Venceu há ${Math.abs(diffDias)}d` : `Vence em ${diffDias}d`}
                  </p>
                </div>
                <span className="text-[12.5px] font-semibold text-white shrink-0">{v(divida.valorTotal - divida.valorPago)}</span>
              </div>
            ))}
          </div>
        )}
      </SecaoCard>

      {/* Card: Calendário financeiro */}
      <SecaoCard titulo="Calendário financeiro" Icon={CalendarDays} corIcone="#3B82F6">
        <GfCalendarioFinanceiro transacoes={estado.transacoes} />
      </SecaoCard>

      <div className="mb-2" />
    </div>
  )
}

function corInsight(tipo: 'positivo' | 'atencao' | 'neutro') {
  if (tipo === 'positivo') return '#22C55E'
  if (tipo === 'atencao') return '#FFC93C'
  return '#64748B'
}

function IconeInsight({ tipo, cor }: { tipo: 'positivo' | 'atencao' | 'neutro'; cor: string }) {
  if (tipo === 'positivo') return <CheckCircle2 size={13} style={{ color: cor }} />
  if (tipo === 'atencao') return <AlertTriangle size={13} style={{ color: cor }} />
  return <Lightbulb size={13} style={{ color: cor }} />
}

function CardMetrica({
  titulo,
  legenda,
  valor,
  Icon,
  corIcone,
  corValor,
  variacao,
  variacaoInvertida,
}: {
  titulo: string
  legenda: string
  valor: string
  Icon: typeof TrendingUp
  corIcone: string
  corValor: string
  variacao: number | null
  variacaoInvertida?: boolean
}) {
  const positivo = variacaoInvertida ? (variacao ?? 0) <= 0 : (variacao ?? 0) >= 0
  return (
    <div className="card-surface rounded-[20px] p-4 flex items-center gap-3.5">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: corIcone }}>
        <Icon size={22} className="text-white" strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-slate-300 font-medium">{titulo}</p>
        <p className="text-[21px] font-display font-extrabold leading-tight mt-0.5" style={{ color: corValor }}>
          {valor}
        </p>
        <p className="text-[11.5px] text-slate-500 mt-0.5">{legenda}</p>
      </div>
      {variacao != null && (
        <div className="text-right shrink-0 rounded-xl px-2.5 py-2" style={{ background: positivo ? '#22C55E1A' : '#EF44441A' }}>
          <p className={`text-[12px] font-bold ${positivo ? 'text-accent-green' : 'text-accent-red'}`}>
            {variacao >= 0 ? '▲' : '▼'} {formatPercent(Math.abs(variacao), 1).replace('+', '')}
          </p>
          <p className="text-[9.5px] text-slate-500 mt-0.5 whitespace-nowrap">vs mês anterior</p>
        </div>
      )}
    </div>
  )
}

function SecaoCard({
  titulo,
  subtitulo,
  Icon,
  corIcone,
  acao,
  children,
}: {
  titulo: string
  subtitulo?: string
  Icon: typeof TrendingUp
  corIcone: string
  acao?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="px-4 mt-3">
      <div className="card-surface rounded-[20px] p-4">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${corIcone}22` }}>
              <Icon size={16} style={{ color: corIcone }} />
            </div>
            <div>
              <h2 className="text-[13.5px] font-bold text-white leading-tight">{titulo}</h2>
              {subtitulo && <p className="text-[10.5px] text-slate-500">{subtitulo}</p>}
            </div>
          </div>
          {acao && (
            <button onClick={acao} className="flex items-center gap-0.5 text-[11px] text-accent-cyan font-semibold shrink-0">
              Ver todos <ChevronRight size={12} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

function BotaoVazio({ texto, onClick, Icon }: { texto: string; onClick: () => void; Icon: typeof Wallet2 }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 py-1.5 text-left">
      <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-accent-cyan" />
      </div>
      <span className="text-[12.5px] text-accent-cyan font-semibold">{texto}</span>
      <ChevronRight size={14} className="text-accent-cyan ml-auto" />
    </button>
  )
}
