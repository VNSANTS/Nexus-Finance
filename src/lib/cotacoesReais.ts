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
