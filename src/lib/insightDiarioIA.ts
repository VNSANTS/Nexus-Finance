import { supabase } from './supabase'

// Mesmo padrão de src/lib/resumoDiarioIA.ts: reaproveita a Edge Function
// `nexus-ai` já existente (sem custo/deploy novo), 1 chamada por usuário
// por dia (cache em localStorage), e usa `semHistorico: true` pra não virar
// uma "conversa fantasma" na lista de sessões do chat.
//
// Diferença: aqui o contexto é o progresso de aprendizado da pessoa (nível,
// XP, sequência de dias, itens de revisão pendentes) em vez de dados de
// mercado — gera uma frase curta de acompanhamento/incentivo personalizada.

function hojeStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const CHAVE_CACHE = (userId: string) => `nexus-insight-home:${userId}:${hojeStr()}`

export interface ContextoProgresso {
  nome: string
  nivel: number
  nivelNome: string
  xp: number
  streak: number
  modulosCompletos: number
  totalModulos: number
  itensRevisaoPendentes: number
}

function montarPrompt(ctx: ContextoProgresso): string {
  return (
    `Gere UMA frase curta (máx. 20 palavras, português do Brasil, tom acolhedor e direto, sem emoji) de ` +
    `acompanhamento pro progresso de aprendizado financeiro de ${ctx.nome} no app. Dados reais dela agora:\n` +
    `Nível ${ctx.nivel} (${ctx.nivelNome}), ${ctx.xp} XP, sequência de ${ctx.streak} dia(s) seguido(s), ` +
    `${ctx.modulosCompletos} de ${ctx.totalModulos} módulos concluídos, ${ctx.itensRevisaoPendentes} item(ns) de revisão pendente(s).\n` +
    `Se a sequência estiver alta, celebre. Se tiver revisão pendente, mencione com leveza. Se estiver no início, incentive sem pressão. ` +
    `Responda só a frase, sem aspas, sem introdução.`
  )
}

export async function gerarInsightDiarioHome(ctx: ContextoProgresso): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const chave = CHAVE_CACHE(user.id)
  const cacheado = localStorage.getItem(chave)
  if (cacheado) return cacheado

  try {
    const { data, error } = await supabase.functions.invoke('nexus-ai', {
      body: {
        mensagem: montarPrompt(ctx),
        sessaoId: `insight-home-${hojeStr()}`,
        escopo: 'geral',
        semHistorico: true,
      },
    })
    if (error || !data?.ok) return null

    const resposta: string = data.dados.resposta
    localStorage.setItem(chave, resposta)
    return resposta
  } catch {
    return null
  }
}
