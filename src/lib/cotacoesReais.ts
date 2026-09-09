import { supabase } from './supabase'

// =============================================================================
// Cotações reais de mercado — duas fontes, as duas 100% gratuitas:
//
// 1. Câmbio e cripto: AwesomeAPI (economia.awesomeapi.com.br) — pública,
//    sem chave, sem cadastro, CORS liberado. Chamada direto do navegador.
//
// 2. Ações/FIIs da B3: brapi.dev via Edge Function `mercado-cotacoes` (ver
//    supabase/functions/mercado-cotacoes) — a brapi.dev pede pra nunca
//    expor o token no frontend, por isso passa pelo backend. Sem token
//    configurado no Supabase, só os 4 tickers de teste da brapi funcionam
//    (PETR4, MGLU3, VALE3, ITUB4); com um token grátis (cadastro em
//    brapi.dev, plano Grátis = 15.000 requisições/mês), todos funcionam.
//
// As duas falham "graciosamente": se a rede cair ou a API estiver fora do
// ar, devolvem null e quem chamou decide o que mostrar (normalmente os
// dados de exemplo já existentes na tela, sem travar nada).
// =============================================================================

export interface CambioCripto {
  usdBrl: { valor: number; variacaoPercent: number }
  eurBrl: { valor: number; variacaoPercent: number }
  btcBrl: { valor: number; variacaoPercent: number }
}

let cacheCambio: { dados: CambioCripto; buscadoEm: number } | null = null
const TTL_CACHE_MS = 60_000 // 1 min — cotação de câmbio/cripto não muda tão rápido a ponto de valer bater a API a cada re-render

export async function buscarCambioCripto(): Promise<CambioCripto | null> {
  if (cacheCambio && Date.now() - cacheCambio.buscadoEm < TTL_CACHE_MS) {
    return cacheCambio.dados
  }
  try {
    const resp = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL')
    if (!resp.ok) return null
    const dados = await resp.json()

    const par = (chave: string) => {
      const p = dados?.[chave]
      if (!p) return null
      const valor = Number(p.bid)
      const variacaoPercent = Number(p.pctChange)
      if (Number.isNaN(valor) || Number.isNaN(variacaoPercent)) return null
      return { valor, variacaoPercent }
    }

    const usdBrl = par('USDBRL')
    const eurBrl = par('EURBRL')
    const btcBrl = par('BTCBRL')
    if (!usdBrl || !eurBrl || !btcBrl) return null

    const resultado: CambioCripto = { usdBrl, eurBrl, btcBrl }
    cacheCambio = { dados: resultado, buscadoEm: Date.now() }
    return resultado
  } catch {
    return null // sem internet / API fora do ar — quem chamou usa o fallback mockado
  }
}

export interface CotacaoAcao {
  ticker: string
  preco: number | null
  variacaoPercent: number | null
  requerToken: boolean
}

// Cache de 1h por conjunto de tickers pedidos à IA — evita bater na cota
// gratuita do Gemini Search toda vez que a tela reabre. Fica em memória
// (não localStorage) porque o valor já é uma cotação "ao vivo" da hora;
// persistir entre sessões só envelheceria o dado sem necessidade.
const cacheCotacoesIA = new Map<string, { dados: Map<string, { preco: number | null; variacaoPercent: number | null }>; buscadoEm: number }>()
const TTL_CACHE_IA_MS = 60 * 60_000 // 1h — pedido explícito do usuário

async function buscarCotacoesViaIA(tickers: string[]): Promise<Map<string, { preco: number | null; variacaoPercent: number | null }>> {
  const chave = [...tickers].sort().join(',')
  const cache = cacheCotacoesIA.get(chave)
  if (cache && Date.now() - cache.buscadoEm < TTL_CACHE_IA_MS) return cache.dados

  const mapa = new Map<string, { preco: number | null; variacaoPercent: number | null }>()
  try {
    const { data, error } = await supabase.functions.invoke('mercado-ia', { body: { tickers } })
    if (!error && data?.ok) {
      for (const c of data.dados.cotacoes as { ticker: string; preco: number | null; variacaoPercent: number | null }[]) {
        mapa.set(c.ticker, { preco: c.preco, variacaoPercent: c.variacaoPercent })
      }
    }
  } catch {
    // Gemini fora do ar / cota estourada — mapa fica vazio, quem chamou mantém "requer token"
  }
  cacheCotacoesIA.set(chave, { dados: mapa, buscadoEm: Date.now() })
  return mapa
}

/**
 * Busca cotação real de ações/FIIs da B3: primeiro via brapi.dev (grátis,
 * rápido — ver Edge Function mercado-cotacoes), e pros tickers que ela não
 * libera sem token, tenta um fallback via IA com busca real (Gemini
 * Google Search grounding, cacheado 1h) antes de desistir e devolver
 * `requerToken: true`. Assim, tickers fora dos 4 grátis da brapi (ex:
 * VGIR11, MXRF11) ainda conseguem cotação real sem precisar configurar
 * nenhum token.
 */
export async function buscarCotacoesAcoes(tickers: string[]): Promise<CotacaoAcao[] | null> {
  if (tickers.length === 0) return []
  let cotacoes: CotacaoAcao[]
  try {
    const { data, error } = await supabase.functions.invoke('mercado-cotacoes', { body: { tickers } })
    if (error || !data?.ok) return null
    cotacoes = data.dados.cotacoes as CotacaoAcao[]
  } catch {
    return null
  }

  const faltando = cotacoes.filter((c) => c.requerToken).map((c) => c.ticker)
  if (faltando.length === 0) return cotacoes

  const viaIA = await buscarCotacoesViaIA(faltando)
  return cotacoes.map((c) => {
    if (!c.requerToken) return c
    const daIA = viaIA.get(c.ticker)
    if (!daIA || daIA.preco === null) return c // IA também não achou — mantém "requer token" pra tela explicar
    return { ticker: c.ticker, preco: daIA.preco, variacaoPercent: daIA.variacaoPercent, requerToken: false }
  })
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarPercent(v: number): string {
  return `${v >= 0 ? '+' : ''}${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
}

// =============================================================================
// Setores (heatmap) e calendário econômico — sem fonte gratuita direta
// conhecida pra isso, então usam o fallback de IA com busca real
// (Edge Function mercado-ia, tipo 'setores'/'calendario'). Mesmo cache de
// 1h em memória dos outros fallbacks de IA desta sessão.
// =============================================================================

export interface SetorMercado { nome: string; variacao: number }
export interface EventoCalendario { dia: string; evento: string; relevancia: 'alta' | 'media' }

let cacheSetores: { dados: SetorMercado[]; buscadoEm: number } | null = null
let cacheCalendario: { dados: EventoCalendario[]; buscadoEm: number } | null = null

export async function buscarSetoresIA(): Promise<SetorMercado[] | null> {
  if (cacheSetores && Date.now() - cacheSetores.buscadoEm < TTL_CACHE_IA_MS) return cacheSetores.dados
  try {
    const { data, error } = await supabase.functions.invoke('mercado-ia', { body: { tipo: 'setores' } })
    if (error || !data?.ok) return null
    const setores = data.dados.setores as SetorMercado[]
    cacheSetores = { dados: setores, buscadoEm: Date.now() }
    return setores
  } catch {
    return null
  }
}

export async function buscarCalendarioIA(): Promise<EventoCalendario[] | null> {
  if (cacheCalendario && Date.now() - cacheCalendario.buscadoEm < TTL_CACHE_IA_MS) return cacheCalendario.dados
  try {
    const { data, error } = await supabase.functions.invoke('mercado-ia', { body: { tipo: 'calendario' } })
    if (error || !data?.ok) return null
    const eventos = data.dados.eventos as EventoCalendario[]
    cacheCalendario = { dados: eventos, buscadoEm: Date.now() }
    return eventos
  } catch {
    return null
  }
}

// =============================================================================
// Ranking de altas/baixas — lista curada de tickers grandes/líquidos da B3
// (não é "o mercado inteiro ordenado", que exigiria o endpoint pago/com
// token /quote/list da brapi; isso aqui é uma amostra representativa que
// funciona com o mesmo proxy mercado-cotacoes já usado na watchlist).
// =============================================================================
const TICKERS_RANKING = [
  'PETR4', 'VALE3', 'ITUB4', 'MGLU3', // os 4 grátis sem token
  'BBAS3', 'BBDC4', 'ABEV3', 'WEGE3', 'B3SA3', 'RENT3', 'SUZB3', 'GGBR4',
  'CSNA3', 'USIM5', 'AZUL4', 'CVCB3', 'COGN3', 'PETZ3', 'YDUQ3',
]

export interface ItemRanking {
  ticker: string
  preco: number
  variacaoPercent: number
}

/**
 * Busca cotações reais dos tickers curados e monta os top 5 de alta e
 * baixa. Sem BRAPI_TOKEN configurado no Supabase, só os 4 tickers de teste
 * grátis (PETR4, VALE3, ITUB4, MGLU3) voltam com dado real — poucos demais
 * pra formar um "top 5" com sentido, então nesse caso devolve null e a
 * tela usa os dados de exemplo (mesma lógica graciosa dos outros dados
 * reais desta sessão: nunca quebra a UI, só deixa de mostrar dado real).
 */
export async function buscarRankingReal(): Promise<{ altas: ItemRanking[]; baixas: ItemRanking[] } | null> {
  const cotacoes = await buscarCotacoesAcoes(TICKERS_RANKING)
  if (!cotacoes) return null

  const validos: ItemRanking[] = cotacoes
    .filter((c): c is CotacaoAcao & { preco: number; variacaoPercent: number } => !c.requerToken && c.preco !== null && c.variacaoPercent !== null)
    .map((c) => ({ ticker: c.ticker, preco: c.preco, variacaoPercent: c.variacaoPercent }))

  if (validos.length < 5) return null // amostra pequena demais pra um ranking fazer sentido

  const ordenado = [...validos].sort((a, b) => b.variacaoPercent - a.variacaoPercent)
  return { altas: ordenado.slice(0, 5), baixas: ordenado.slice(-5).reverse() }
}
