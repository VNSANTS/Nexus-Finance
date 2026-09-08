import { supabase } from '@/lib/supabase'

// Mesmo padrão de src/lib/resumoDiarioIA.ts e insightDiarioIA.ts: reaproveita
// a Edge Function `nexus-ai` já existente (sem custo/deploy novo), 1
// chamada por usuário por dia (cache em localStorage), `semHistorico: true`
// pra não virar uma "conversa fantasma" na lista de sessões do chat.
//
// Diferença importante daqui pros outros dois: não precisa montar um prompt
// com números — o escopo 'gestao-financeira' da nexus-ai já busca e injeta
// o resumo financeiro REAL da pessoa sozinho (ver montarContextoFinanceiro
// em supabase/functions/nexus-ai/index.ts), então a mensagem só pede a
// dica; quem monta o contexto de verdade é o backend.

function hojeStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const CHAVE_CACHE = (userId: string) => `nexus-insight-gf:${userId}:${hojeStr()}`

const PROMPT =
  'Com base nos meus dados financeiros reais acima, me dê UMA dica prática e específica (2-3 frases, ' +
  'português do Brasil, tom direto e sem enrolação) pra melhorar minha situação agora — não repita os ' +
  'números de volta, vá direto pra recomendação. Se não houver dado suficiente ainda, incentive a cadastrar ' +
  'as primeiras contas/transações em vez de inventar números.'

export async function gerarInsightDiarioGF(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const chave = CHAVE_CACHE(user.id)
  const cacheado = localStorage.getItem(chave)
  if (cacheado) return cacheado

  try {
    const { data, error } = await supabase.functions.invoke('nexus-ai', {
      body: {
        mensagem: PROMPT,
        sessaoId: `insight-gf-${hojeStr()}`,
        escopo: 'gestao-financeira', // é isso que injeta o contexto financeiro real automaticamente
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
