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

/**
 * Busca cotação real de ações/FIIs da B3 (via brapi.dev, proxy na Edge
 * Function). Tickers que a brapi não libera sem token configurado voltam
 * com `requerToken: true` em vez de erro — a tela decide como exibir isso
 * (ex: "cadastre um token grátis pra ver este ativo").
 */
export async function buscarCotacoesAcoes(tickers: string[]): Promise<CotacaoAcao[] | null> {
  if (tickers.length === 0) return []
  try {
    const { data, error } = await supabase.functions.invoke('mercado-cotacoes', {
      body: { tickers },
    })
    if (error || !data?.ok) return null
    return data.dados.cotacoes as CotacaoAcao[]
  } catch {
    return null
  }
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarPercent(v: number): string {
  return `${v >= 0 ? '+' : ''}${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
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
