import { supabase } from './supabase'
import { formatarMoeda, formatarPercent, type CambioCripto } from './cotacoesReais'

// =============================================================================
// Resumo diário de mercado gerado por IA — reaproveita 100% a Edge Function
// `nexus-ai` que já existe (mesmo Gemini, mesma chave, sem custo novo, sem
// deploy novo) — só manda uma mensagem já pronta com os números reais do
// dia, num "chat" técnico separado (sessaoId próprio) que o usuário nunca
// vê como conversa, só o texto final.
//
// Cacheado em localStorage por usuário+dia: no máximo 1 chamada ao Gemini
// por dia por pessoa, mesmo se ela abrir a tela de Mercado várias vezes —
// respeita a cota gratuita do Gemini em vez de gastar à toa.
// =============================================================================

function hojeStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const CHAVE_CACHE = (userId: string) => `nexus-resumo-mercado:${userId}:${hojeStr()}`

function montarPrompt(cambio: CambioCripto): string {
  return (
    `Gere um resumo curto (2-3 frases, português do Brasil, tom direto e didático) do dia no mercado ` +
    `financeiro brasileiro, usando SÓ estes números reais de agora (não invente outros dados nem fale de ` +
    `ações específicas, já que não temos esse dado aqui):\n` +
    `Dólar (USD/BRL): ${formatarMoeda(cambio.usdBrl.valor)} (${formatarPercent(cambio.usdBrl.variacaoPercent)})\n` +
    `Euro (EUR/BRL): ${formatarMoeda(cambio.eurBrl.valor)} (${formatarPercent(cambio.eurBrl.variacaoPercent)})\n` +
    `Bitcoin (BTC/BRL): ${formatarMoeda(cambio.btcBrl.valor)} (${formatarPercent(cambio.btcBrl.variacaoPercent)})\n` +
    `Não repita os números formatados como eu mandei, escreva como um resumo natural de jornal econômico.`
  )
}

export async function gerarResumoDiarioMercado(cambio: CambioCripto | null): Promise<string | null> {
  if (!cambio) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const chave = CHAVE_CACHE(user.id)
  const cacheado = localStorage.getItem(chave)
  if (cacheado) return cacheado

  try {
    const { data, error } = await supabase.functions.invoke('nexus-ai', {
      body: {
        mensagem: montarPrompt(cambio),
        sessaoId: `resumo-mercado-${hojeStr()}`, // só existe pro Gemini enxergar a msg como "conversa"; nunca é salvo (semHistorico)
        escopo: 'geral',
        semHistorico: true, // não deve poluir a lista de conversas reais do usuário no chat do Nexus AI
      },
    })
    if (error || !data?.ok) return null

    const resposta: string = data.dados.resposta
    localStorage.setItem(chave, resposta)
    return resposta
  } catch {
    return null // Gemini fora do ar / sem internet — a tela simplesmente não mostra o card, sem travar nada
  }
}
