// Edge Function: mercado-cotacoes
//
// Ponte entre o app e a API da brapi.dev (cotações reais de ações, FIIs,
// ETFs e BDRs da B3). Existe pelo mesmo motivo da nexus-ai: a brapi.dev
// recomenda explicitamente NUNCA expor o token no frontend ("faça as
// chamadas a partir do seu backend") — aqui ele vive só como variável de
// ambiente da function, nunca no bundle do navegador.
//
// IMPORTANTE — funciona SEM custo, com ou sem token:
//   - Sem BRAPI_TOKEN configurado: só os 4 tickers de teste da brapi
//     funcionam (PETR4, MGLU3, VALE3, ITUB4) — sem cadastro, sem limite.
//     Qualquer outro ticker pedido volta marcado como `requerToken: true`
//     em vez de dar erro, pra não quebrar a tela.
//   - Com BRAPI_TOKEN configurado (conta gratuita em brapi.dev/dashboard,
//     plano Grátis = 15.000 requisições/mês, sem custo): todos os tickers
//     da B3 funcionam normalmente.
//
// Pra ativar o plano completo (opcional, grátis):
//   1. Criar conta em https://brapi.dev
//   2. Gerar o token em brapi.dev/dashboard
//   3. supabase secrets set BRAPI_TOKEN=seu_token_aqui
//   4. supabase functions deploy mercado-cotacoes
// Sem fazer isso, o app continua funcionando normalmente, só limitado aos
// 4 tickers de teste.

const ORIGENS_PERMITIDAS = new Set([
  'https://vnsants.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

function corsHeaders(req: Request) {
  const origin = req.headers.get('Origin')
  const originPermitida = origin && ORIGENS_PERMITIDAS.has(origin) ? origin : 'https://vnsants.github.io'
  return {
    'Access-Control-Allow-Origin': originPermitida,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  }
}

// Únicos tickers que a brapi.dev libera sem token e sem limite de uso.
const TICKERS_LIVRES = new Set(['PETR4', 'MGLU3', 'VALE3', 'ITUB4'])

type CorpoRequisicao = { tickers: string[] }

type CotacaoResultado = {
  ticker: string
  preco: number | null
  variacaoPercent: number | null
  requerToken: boolean
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(req) })
  }

  const origin = req.headers.get('Origin')
  if (origin && !ORIGENS_PERMITIDAS.has(origin)) {
    return new Response('Origem não permitida.', { status: 403 })
  }
  if (req.method !== 'POST') {
    return new Response('Método não permitido.', { status: 405, headers: { Allow: 'POST, OPTIONS' } })
  }

  try {
    // Exige sessão válida (não precisa ser admin) — só pra evitar que a
    // cota mensal da brapi.dev seja consumida por alguém fora do app.
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return respostaErro('Não autenticado.', 401, req)

    const { createClient } = await import('jsr:@supabase/supabase-js@2')
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user }, error: erroUsuario } = await supabase.auth.getUser()
    if (erroUsuario || !user) return respostaErro('Sessão inválida.', 401, req)

    const corpoDesconhecido: unknown = await req.json()
    if (!corpoDesconhecido || typeof corpoDesconhecido !== 'object' || Array.isArray(corpoDesconhecido)) {
      return respostaErro('Corpo da requisição inválido.', 400, req)
    }
    const { tickers } = corpoDesconhecido as Partial<CorpoRequisicao>
    if (!Array.isArray(tickers) || tickers.length === 0 || tickers.some((t) => typeof t !== 'string')) {
      return respostaErro('Envie uma lista válida de tickers.', 400, req)
    }
    if (tickers.length > 20) return respostaErro('Máximo de 20 tickers por chamada.', 400, req)
    const tickersLimpos = [...new Set(tickers.map((t) => t.trim().toUpperCase()).filter((t) => /^[A-Z0-9]{4,12}$/.test(t)))]
    if (tickersLimpos.length === 0) return respostaErro('Nenhum ticker válido foi informado.', 400, req)

    const brapiToken = Deno.env.get('BRAPI_TOKEN')

    // Sem token: só passa adiante os tickers de teste; o resto já volta
    // marcado como "precisa de token", sem nem chamar a brapi.dev à toa.
    const tickersParaBuscar = brapiToken ? tickersLimpos : tickersLimpos.filter((t) => TICKERS_LIVRES.has(t))
    const tickersBloqueados = brapiToken ? [] : tickersLimpos.filter((t) => !TICKERS_LIVRES.has(t))

    const resultados: CotacaoResultado[] = tickersBloqueados.map((t) => ({
      ticker: t,
      preco: null,
      variacaoPercent: null,
      requerToken: true,
    }))

    if (tickersParaBuscar.length > 0) {
      const url = `https://brapi.dev/api/quote/${tickersParaBuscar.join(',')}${brapiToken ? `?token=${brapiToken}` : ''}`
      const respBrapi = await fetch(url)

      if (respBrapi.ok) {
        const dados = await respBrapi.json()
        const encontrados = new Set<string>()
        for (const r of dados?.results ?? []) {
          encontrados.add(r.symbol)
          resultados.push({
            ticker: r.symbol,
            preco: typeof r.regularMarketPrice === 'number' ? r.regularMarketPrice : null,
            variacaoPercent: typeof r.regularMarketChangePercent === 'number' ? r.regularMarketChangePercent : null,
            requerToken: false,
          })
        }
        // Ticker pedido mas que a brapi não devolveu (código inválido/deslistado).
        for (const t of tickersParaBuscar) {
          if (!encontrados.has(t)) resultados.push({ ticker: t, preco: null, variacaoPercent: null, requerToken: false })
        }
      } else {
        // brapi fora do ar ou token inválido — devolve os que não pôde
        // buscar como "sem dado" (não derruba a resposta inteira).
        console.error('Erro brapi.dev:', respBrapi.status, await respBrapi.text())
        for (const t of tickersParaBuscar) {
          resultados.push({ ticker: t, preco: null, variacaoPercent: null, requerToken: false })
        }
      }
    }

    return respostaOk({ cotacoes: resultados, temToken: Boolean(brapiToken) }, req)
  } catch (erro) {
    console.error('Erro inesperado na mercado-cotacoes:', erro)
    return respostaErro('Erro interno.', 500, req)
  }
})

function respostaOk(dados: unknown, req: Request) {
  return new Response(JSON.stringify({ ok: true, dados }), {
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json' },
    status: 200,
  })
}

function respostaErro(mensagem: string, status: number, req: Request) {
  return new Response(JSON.stringify({ ok: false, erro: mensagem }), {
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json' },
    status,
  })
}
