// Edge Function: mercado-ia
//
// Fallback via IA com busca real (Google Search grounding do Gemini) —
// usada em 3 situações onde não achamos (ou não existe) fonte gratuita
// direta pro dado:
//   tipo 'cotacoes' (padrão): tickers que a brapi.dev não libera sem token
//     (ver mercado-cotacoes) — nunca substitui a brapi, só complementa.
//   tipo 'setores': heatmap de setores da B3 (sem fonte gratuita conhecida
//     pra isso hoje).
//   tipo 'calendario': calendário econômico da semana (idem).
//
// CUSTO: o "grounding" (busca real na hora) tem cota grátis de 5.000
// buscas/mês por projeto Gemini (família 3.x) — cada chamada aqui é 1
// busca só (cobre vários tickers/setores/eventos de uma vez), e o cliente
// cacheia o resultado por 1h (ver src/lib/cotacoesReais.ts), então mesmo
// com uso normal do app isso fica bem abaixo da cota grátis. Depois dela,
// é pago (~$14 a cada 1.000 buscas) — se a cota acabar num mês, essas
// telas simplesmente voltam a mostrar "sem dado" até o mês seguinte (erro
// tratado, nunca trava o app).

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const GEMINI_MODEL = 'gemini-3.6-flash'
const MAX_TICKERS_POR_CHAMADA = 6 // mantém o prompt pequeno e a busca rápida/barata

type CotacaoIA = { ticker: string; preco: number | null; variacaoPercent: number | null }
type SetorIA = { nome: string; variacao: number }
type EventoCalendarioIA = { dia: string; evento: string; relevancia: 'alta' | 'media' }

const SETORES_PADRAO = ['Bancos', 'Commodities', 'Energia', 'Varejo', 'Tecnologia', 'Saúde', 'Industrial', 'Imobiliário', 'Telecom']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return respostaErro('Não autenticado.', 401)

    const { createClient } = await import('jsr:@supabase/supabase-js@2')
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user }, error: erroUsuario } = await supabase.auth.getUser()
    if (erroUsuario || !user) return respostaErro('Sessão inválida.', 401)

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) return respostaErro('IA de mercado ainda não está configurada.', 500)

    const corpo: { tipo?: 'cotacoes' | 'setores' | 'calendario'; tickers?: string[] } = await req.json()
    const tipo = corpo.tipo ?? 'cotacoes'

    if (tipo === 'setores') {
      const prompt =
        `Busque agora na web o desempenho de hoje (variação percentual, positiva ou negativa) da bolsa brasileira (B3) ` +
        `por setor, para estes setores: ${SETORES_PADRAO.join(', ')}. Se não achar o número exato de um setor específico, ` +
        `estime com base no desempenho das principais empresas/ações daquele setor hoje. ` +
        `Responda SOMENTE com um JSON válido, sem markdown, sem texto antes ou depois, no formato exato: ` +
        `[{"nome":"Bancos","variacao":1.8}]. Inclua todos os ${SETORES_PADRAO.length} setores pedidos, nessa ordem.`
      const cotacoes = await chamarGeminiJSON<SetorIA[]>(geminiApiKey, prompt)
      if (!cotacoes) return respostaErro('Não consegui buscar os setores agora.', 502)
      return respostaOk({ setores: cotacoes })
    }

    if (tipo === 'calendario') {
      const prompt =
        `Busque agora na web os principais eventos econômicos agendados para ESTA semana no Brasil e EUA que ` +
        `afetam o mercado financeiro brasileiro (ex: reunião do Copom, IPCA, decisão de juros do Fed, payroll, PIB). ` +
        `Responda SOMENTE com um JSON válido, sem markdown, sem texto antes ou depois, com no máximo 6 eventos, no formato exato: ` +
        `[{"dia":"Seg","evento":"Ata do Copom","relevancia":"alta"}]. "dia" é a abreviação em português (Seg/Ter/Qua/Qui/Sex). ` +
        `"relevancia" é só "alta" ou "media".`
      const eventos = await chamarGeminiJSON<EventoCalendarioIA[]>(geminiApiKey, prompt)
      if (!eventos) return respostaErro('Não consegui buscar o calendário agora.', 502)
      return respostaOk({ eventos })
    }

    const tickers = corpo.tickers ?? []
    const tickersLimpos = [...new Set(tickers.map((t) => t.trim().toUpperCase()).filter(Boolean))].slice(0, MAX_TICKERS_POR_CHAMADA)
    if (tickersLimpos.length === 0) return respostaErro('Envie ao menos um ticker.', 400)

    const prompt =
      `Busque agora na web a cotação atual (preço em reais e variação percentual do dia) de cada um destes ` +
      `ativos da bolsa brasileira (B3): ${tickersLimpos.join(', ')}. ` +
      `Responda SOMENTE com um JSON válido, sem markdown, sem texto antes ou depois, no formato exato: ` +
      `[{"ticker":"XXXX11","preco":12.34,"variacaoPercent":-0.56}]. ` +
      `Se não achar um ativo específico, use null em "preco" e "variacaoPercent" pra ele, mas ainda assim inclua no array.`

    const cotacoes = await chamarGeminiJSON<CotacaoIA[]>(geminiApiKey, prompt)
    if (!cotacoes) return respostaErro('Não consegui buscar essas cotações agora.', 502)
    return respostaOk({ cotacoes })
  } catch (erro) {
    console.error('Erro inesperado na mercado-ia:', erro)
    return respostaErro('Erro interno.', 500)
  }
})

async function chamarGeminiJSON<T>(geminiApiKey: string, prompt: string): Promise<T | null> {
  const respGemini = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 800 },
    }),
  })

  if (!respGemini.ok) {
    console.error('Erro Gemini (mercado-ia):', await respGemini.text())
    return null
  }

  const dados = await respGemini.json()
  const texto: string | undefined = dados?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!texto) return null

  return parsearJsonDaResposta(texto) as T | null
}

// O Gemini às vezes devolve o JSON dentro de ```json ... ``` mesmo pedindo
// pra não fazer isso — limpa antes de tentar parsear.
function parsearJsonDaResposta(texto: string): unknown | null {
  const limpo = texto.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '')
  try {
    const parsed = JSON.parse(limpo)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function respostaOk(dados: unknown) {
  return new Response(JSON.stringify({ ok: true, dados }), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 200 })
}
function respostaErro(mensagem: string, status: number) {
  return new Response(JSON.stringify({ ok: false, erro: mensagem }), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status })
}
