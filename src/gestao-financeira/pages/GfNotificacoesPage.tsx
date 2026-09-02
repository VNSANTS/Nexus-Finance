import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CheckCheck, HandCoins, PieChart, Sparkles, Lightbulb, ChevronRight, PartyPopper, SlidersHorizontal } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { gerarNotificacoes, type Notificacao, type TipoNotificacao, type PrioridadeNotificacao } from '../notificacoes'
import { tocarSomNotificacao } from '../somNotificacao'

function iconePorTipo(tipo: TipoNotificacao) {
  if (tipo === 'divida') return HandCoins
  if (tipo === 'orcamento') return PieChart
  if (tipo === 'meta') return Sparkles
  return Lightbulb
}

function corPorPrioridade(prioridade: PrioridadeNotificacao) {
  if (prioridade === 'alta') return '#EF4444'
  if (prioridade === 'media') return '#FFC93C'
  return '#22C55E'
}

const LABEL_TIPO: Record<TipoNotificacao, string> = {
  divida: 'Dívidas e contas',
  orcamento: 'Orçamento',
  meta: 'Metas',
  insight: 'Insights',
}

const LABEL_PRIORIDADE: Record<PrioridadeNotificacao, string> = {
  alta: 'Alta prioridade',
  media: 'Média prioridade',
  baixa: 'Baixa prioridade',
}

// Mascara valores em R$ nas mensagens quando "ocultar valores" está ativo —
// mesma ideia do "Ocultar valores nas notificações" do documento de projeto.
function ocultarValoresEm(texto: string): string {
  return texto.replace(/R\$\s?[\d.,]+/g, 'R$ ••••').replace(/\(\s?\d{1,3}%\s?\)/g, '(••%)').replace(/em \d{1,3}% do limite/, 'em ••% do limite')
}

function ORDEM(p: PrioridadeNotificacao) {
  return p === 'alta' ? 0 : p === 'media' ? 1 : 2
}

// Central de notificações — nada aqui é decorativo: cada item vem de
// gerarNotificacoes() (dívidas vencendo, orçamento estourando, metas com
// prazo perto, insights automáticos), já filtrado pelas preferências do
// usuário. O que fica salvo é só a lista de IDs já lidos; a lista em si é
// recalculada toda vez a partir dos dados atuais.
export default function GfNotificacoesPage() {
  const navigate = useNavigate()
  const { estado, marcarNotificacaoLida, marcarNotificacoesLidas } = useGestaoFinanceira()
  const prefs = estado.preferenciasNotificacoes

  const todas = useMemo(() => gerarNotificacoes(estado), [estado])
  const naoLidas = todas.filter((n) => !estado.notificacoesLidas.includes(n.id))

  // Som + notificação nativa + vibração pra itens novos. Só alcança
  // notificações geradas enquanto esta tela está aberta (o app é 100%
  // client-side, sem processo em segundo plano) — é a versão possível de
  // "push" sem servidor.
  const idsConhecidosRef = useRef<Set<string> | null>(null)
  const idsNaoLidasChave = naoLidas.map((n) => n.id).join(',')
  useEffect(() => {
    const idsAtuais = new Set(naoLidas.map((n) => n.id))
    if (idsConhecidosRef.current) {
      const novas = naoLidas.filter((n) => !idsConhecidosRef.current!.has(n.id))
      if (novas.length > 0 && prefs.ativas) {
        const maisUrgente = novas.reduce((a, b) => (ORDEM(b.prioridade) < ORDEM(a.prioridade) ? b : a))
        if (prefs.som.ativo) tocarSomNotificacao(prefs.som.estilo, maisUrgente.prioridade, prefs.som.volume)
        if (prefs.vibrar && 'vibrate' in navigator) navigator.vibrate(maisUrgente.prioridade === 'alta' ? [40, 60, 40] : [30])
        if (prefs.notificacaoNavegador && 'Notification' in window && Notification.permission === 'granted' && document.hidden) {
          new Notification(maisUrgente.titulo, { body: maisUrgente.mensagem })
        }
      }
    }
    idsConhecidosRef.current = idsAtuais
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsNaoLidasChave])

  function abrir(n: Notificacao) {
    marcarNotificacaoLida(n.id)
    navigate(n.rota)
  }

  const grupos = useMemo(() => agrupar(todas, estado.notificacoesLidas, prefs.agruparPor), [todas, estado.notificacoesLidas, prefs.agruparPor])

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Notificações"
        subtitulo={naoLidas.length > 0 ? `${naoLidas.length} não lida${naoLidas.length > 1 ? 's' : ''}` : 'Tudo em dia'}
        icone={Bell}
        corIcone="#FFC93C"
        voltarPara="/gestao-financeira"
        acoes={
          <div className="flex items-center gap-3">
            {naoLidas.length > 0 && (
              <button
                onClick={() => marcarNotificacoesLidas(naoLidas.map((n) => n.id))}
                className="flex items-center gap-1 text-[11.5px] text-accent-cyan font-semibold"
              >
                <CheckCheck size={14} /> Marcar todas
              </button>
            )}
            <button
              onClick={() => navigate('/gestao-financeira/notificacoes/configurar')}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-bg-card shrink-0"
              aria-label="Configurar notificações"
            >
              <SlidersHorizontal size={15} className="text-slate-300" />
            </button>
          </div>
        }
      />

      {!prefs.ativas ? (
        <div className="px-4 mt-8">
          <div className="card-surface rounded-[20px] p-6 text-center">
            <Bell size={28} className="text-slate-500 mx-auto mb-2" />
            <p className="text-[13px] text-white font-semibold">Notificações desativadas</p>
            <p className="text-[11.5px] text-slate-500 mt-1">Ative de novo em Configurar notificações pra voltar a receber alertas.</p>
            <button
              onClick={() => navigate('/gestao-financeira/notificacoes/configurar')}
              className="mt-3 text-[11.5px] text-accent-cyan font-semibold"
            >
              Abrir configurações
            </button>
          </div>
        </div>
      ) : todas.length === 0 ? (
        <div className="px-4 mt-8">
          <div className="card-surface rounded-[20px] p-6 text-center">
            <PartyPopper size={28} className="text-accent-green mx-auto mb-2" />
            <p className="text-[13px] text-white font-semibold">Tudo em dia!</p>
            <p className="text-[11.5px] text-slate-500 mt-1">Nenhuma dívida vencendo, orçamento estourando ou meta apertada agora.</p>
          </div>
        </div>
      ) : (
        grupos.map((g) => (
          <div key={g.chave} className="px-4 mt-4">
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide mb-2">{g.titulo}</p>
            <div className="flex flex-col gap-2">
              {g.itens.map((n) => (
                <CardNotificacao
                  key={n.id}
                  n={n}
                  lida={estado.notificacoesLidas.includes(n.id)}
                  detalhado={prefs.estiloExibicao === 'detalhado'}
                  ocultarValores={prefs.ocultarValores}
                  onClick={() => (estado.notificacoesLidas.includes(n.id) ? navigate(n.rota) : abrir(n))}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function agrupar(
  todas: Notificacao[],
  lidasIds: string[],
  por: 'prioridade' | 'categoria' | 'status',
): { chave: string; titulo: string; itens: Notificacao[] }[] {
  if (por === 'status') {
    const naoLidas = todas.filter((n) => !lidasIds.includes(n.id))
    const lidas = todas.filter((n) => lidasIds.includes(n.id))
    const grupos: { chave: string; titulo: string; itens: Notificacao[] }[] = []
    if (naoLidas.length > 0) grupos.push({ chave: 'novas', titulo: 'Novas', itens: naoLidas })
    if (lidas.length > 0) grupos.push({ chave: 'lidas', titulo: 'Lidas', itens: lidas })
    return grupos
  }

  if (por === 'prioridade') {
    return (['alta', 'media', 'baixa'] as PrioridadeNotificacao[])
      .map((p) => ({ chave: p, titulo: LABEL_PRIORIDADE[p], itens: todas.filter((n) => n.prioridade === p) }))
      .filter((g) => g.itens.length > 0)
  }

  return (['divida', 'orcamento', 'meta', 'insight'] as TipoNotificacao[])
    .map((t) => ({ chave: t, titulo: LABEL_TIPO[t], itens: todas.filter((n) => n.tipo === t) }))
    .filter((g) => g.itens.length > 0)
}

function CardNotificacao({
  n,
  lida,
  detalhado,
  ocultarValores,
  onClick,
}: {
  n: Notificacao
  lida: boolean
  detalhado: boolean
  ocultarValores: boolean
  onClick: () => void
}) {
  const Icone = iconePorTipo(n.tipo)
  const cor = corPorPrioridade(n.prioridade)
  const mensagem = ocultarValores ? ocultarValoresEm(n.mensagem) : n.mensagem

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 rounded-2xl p-3.5 text-left border ${
        lida ? 'border-transparent bg-transparent opacity-60' : 'card-surface border-border'
      }`}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
        <Icone size={16} style={{ color: cor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[12.5px] text-white font-semibold ${detalhado ? '' : 'truncate'}`}>{n.titulo}</p>
        <p className={`text-[11px] text-slate-500 ${detalhado ? '' : 'truncate'}`}>{mensagem}</p>
        {detalhado && (
          <p className="text-[9.5px] font-semibold uppercase tracking-wide mt-1" style={{ color: cor }}>
            {LABEL_TIPO[n.tipo]} · {LABEL_PRIORIDADE[n.prioridade]}
          </p>
        )}
      </div>
      {!lida && <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: cor }} />}
      <ChevronRight size={14} className="text-slate-600 shrink-0 mt-1" />
    </button>
  )
}
