import { useEffect, useRef } from 'react'
import { aoRetomarAndroid, mostrarLembreteAndroid, notificacoesLocaisAndroid, sincronizarLembretesAndroid, type LembreteDispositivo } from '@/lib/notificacoesDispositivo'
import { gerarNotificacoes, type TipoNotificacao } from './notificacoes'
import type { GestaoFinanceiraState } from './types'

const MENSAGENS: Record<TipoNotificacao, string> = {
  divida: 'Você tem um prazo financeiro para acompanhar.',
  meta: 'Uma meta financeira está com o prazo se aproximando.',
  orcamento: 'Há um novo alerta sobre seu orçamento.',
  insight: 'Há um novo insight na Gestão Financeira.',
}

function horarioDeAviso(prazo: string, dias: number) {
  const data = new Date(`${prazo}T09:00:00`)
  data.setDate(data.getDate() - dias)
  return Number.isFinite(data.getTime()) ? data : null
}

function planejarPrazos(estado: GestaoFinanceiraState) {
  const prefs = estado.preferenciasNotificacoes
  const lembretes: (LembreteDispositivo & { horario: Date })[] = []
  if (prefs.dividas.ativa) {
    for (const divida of estado.dividas) {
      if (divida.quitada || !divida.vencimento) continue
      const horario = horarioDeAviso(divida.vencimento, prefs.dividas.diasAntecedencia)
      if (horario) lembretes.push({ chave: `divida-${divida.id}`, titulo: 'Lembrete financeiro', mensagem: MENSAGENS.divida, rota: '/gestao-financeira/dividas', horario })
    }
  }
  if (prefs.metas.ativa) {
    for (const meta of estado.metas) {
      if (!meta.prazo || meta.pausada || meta.arquivada || meta.valorAtual >= meta.valorObjetivo) continue
      const horario = horarioDeAviso(meta.prazo, prefs.metas.diasAntecedencia)
      if (horario) lembretes.push({ chave: `meta-${meta.id}`, titulo: 'Lembrete financeiro', mensagem: MENSAGENS.meta, rota: '/gestao-financeira/metas', horario })
    }
  }
  const ontem = Date.now() - 86_400_000
  return lembretes.filter((n) => n.horario.getTime() > ontem)
    .sort((a, b) => a.horario.getTime() - b.horario.getTime()).slice(0, 40)
}

export function useLembretesFinanceiros(estado: GestaoFinanceiraState, conta: string | null) {
  const conhecidos = useRef<Set<string> | null>(null)
  useEffect(() => {
    if (!notificacoesLocaisAndroid || !conta) return
    const prefs = estado.preferenciasNotificacoes
    const habilitado = prefs.ativas && prefs.notificacaoNavegador
    const configuracao = { som: prefs.som.ativo && prefs.som.volume > 0, vibrar: prefs.vibrar }
    const agendados = habilitado ? planejarPrazos(estado) : []
    const opcoesImediatas = gerarNotificacoes(estado).filter((n) => !estado.notificacoesLidas.includes(n.id))
    const novosIds = new Set(opcoesImediatas.map((n) => n.id))
    if (habilitado && conhecidos.current) {
      const lembreteFuturo = new Set(agendados.filter((n) => n.horario.getTime() >= Date.now()).map((n) => n.chave))
      const novo = opcoesImediatas.find((n) => !conhecidos.current?.has(n.id) && !lembreteFuturo.has(n.id))
      if (novo) mostrarLembreteAndroid(conta, 'financas', {
        chave: `agora-${novo.id}`, titulo: 'Gestão Financeira', mensagem: MENSAGENS[novo.tipo], rota: novo.rota,
      }, configuracao)
    }
    conhecidos.current = novosIds
    sincronizarLembretesAndroid(conta, 'financas', agendados, configuracao)

    return aoRetomarAndroid(() => {
      sincronizarLembretesAndroid(conta, 'financas', habilitado ? planejarPrazos(estado) : [], configuracao)
    })
  }, [conta, estado])
}
