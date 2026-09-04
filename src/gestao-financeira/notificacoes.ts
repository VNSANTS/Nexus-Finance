import type { GestaoFinanceiraState } from './types'
import { contasProximasDoVencimento, gerarInsights, resumoOrcamentos } from './selectors'

export type TipoNotificacao = 'divida' | 'orcamento' | 'meta' | 'insight'
export type PrioridadeNotificacao = 'alta' | 'media' | 'baixa'

export interface Notificacao {
  id: string
  tipo: TipoNotificacao
  prioridade: PrioridadeNotificacao
  titulo: string
  mensagem: string
  rota: string
}

const ORDEM_PRIORIDADE: Record<PrioridadeNotificacao, number> = { alta: 0, media: 1, baixa: 2 }

/**
 * Gera a lista de notificações a partir dos próprios dados já lançados —
 * nada de notificação "decorativa": toda notificação aqui aponta pra algo
 * real (uma dívida vencendo, um orçamento estourando, uma meta com prazo
 * apertado, um insight automático). Recalculada a cada render a partir do
 * estado; o que é persistido é só a lista de IDs já lidos.
 */
export function gerarNotificacoes(estado: GestaoFinanceiraState): Notificacao[] {
  const prefs = estado.preferenciasNotificacoes
  if (!prefs.ativas) return []
  const notificacoes: Notificacao[] = []

  // Dívidas vencidas/a vencer — antecedência configurável (padrão 7 dias)
  if (prefs.dividas.ativa)
  for (const { divida, diffDias } of contasProximasDoVencimento(estado, prefs.dividas.diasAntecedencia)) {
    const prioridade: PrioridadeNotificacao = diffDias <= 0 ? 'alta' : diffDias <= 3 ? 'media' : 'baixa'
    const mensagem =
      diffDias < 0
        ? `Venceu há ${Math.abs(diffDias)} dia${Math.abs(diffDias) > 1 ? 's' : ''}`
        : diffDias === 0
          ? 'Vence hoje'
          : `Vence em ${diffDias} dia${diffDias > 1 ? 's' : ''}`
    notificacoes.push({
      id: `divida-${divida.id}`,
      tipo: 'divida',
      prioridade,
      titulo: divida.nome,
      mensagem,
      rota: '/gestao-financeira/dividas',
    })
  }

  // Orçamentos acima do limiar configurado (padrão 90%)
  if (prefs.orcamento.ativa)
  for (const o of resumoOrcamentos(estado)) {
    if (o.percentual < prefs.orcamento.percentualAlerta) continue
    const estourou = o.percentual >= 100
    notificacoes.push({
      id: `orcamento-${o.categoria.id}`,
      tipo: 'orcamento',
      prioridade: estourou ? 'alta' : 'media',
      titulo: `Orçamento de ${o.categoria.nome}`,
      mensagem: estourou ? `Já passou do limite (${o.percentual.toFixed(0)}%)` : `Em ${o.percentual.toFixed(0)}% do limite`,
      rota: '/gestao-financeira/orcamento',
    })
  }

  // Metas com prazo dentro da antecedência configurada (padrão 14 dias), ainda não concluídas
  const hoje = new Date()
  if (prefs.metas.ativa)
  for (const m of estado.metas) {
    if (m.arquivada || m.pausada || !m.prazo || m.valorAtual >= m.valorObjetivo) continue
    const prazo = new Date(`${m.prazo}T12:00:00`)
    const diffDias = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDias > prefs.metas.diasAntecedencia) continue
    notificacoes.push({
      id: `meta-${m.id}`,
      tipo: 'meta',
      prioridade: diffDias <= 3 ? 'alta' : 'media',
      titulo: m.nome,
      mensagem: diffDias < 0 ? 'Prazo já passou' : diffDias === 0 ? 'Prazo é hoje' : `Faltam ${diffDias} dias pro prazo`,
      rota: '/gestao-financeira/metas',
    })
  }

  // Insights automáticos (positivos e de atenção — "sem dados" fica de fora),
  // cada subtipo pode ser ligado/desligado separadamente
  if (prefs.insights.ativa)
  for (const i of gerarInsights(estado)) {
    if (i.tipo === 'neutro') continue
    if (i.tipo === 'atencao' && !prefs.insights.pontosAtencao) continue
    if (i.tipo === 'positivo' && !prefs.insights.boasNoticias) continue
    notificacoes.push({
      id: `insight-${i.id}`,
      tipo: 'insight',
      prioridade: i.tipo === 'atencao' ? 'media' : 'baixa',
      titulo: i.tipo === 'atencao' ? 'Vale atenção' : 'Boa notícia',
      mensagem: i.texto,
      rota: '/gestao-financeira/relatorios',
    })
  }

  return notificacoes.sort((a, b) => ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade])
}
