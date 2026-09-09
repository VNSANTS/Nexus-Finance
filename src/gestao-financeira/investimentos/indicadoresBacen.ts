// =============================================================================
// Indicadores econômicos reais — API do Banco Central do Brasil (SGS,
// Sistema Gerenciador de Séries Temporais). Oficial, 100% gratuita, sem
// chave, sem cadastro: https://dadosabertos.bcb.gov.br
//
// Séries usadas:
//   12  = CDI diário (% ao dia)
//   11  = Selic diária (% ao dia)
//   433 = IPCA mensal (variação % no mês)
//
// Usado pra projetar o valor de investimentos de Renda Fixa (que não têm
// "cotação" — ver calculos.ts pra fórmula completa).
// =============================================================================

const CACHE_TTL_MS = 6 * 60 * 60_000 // 6h — esses indicadores mudam no máximo 1x/dia útil, não faz sentido buscar toda hora
let cache: { dados: IndicadoresEconomicos; buscadoEm: number } | null = null

export interface IndicadoresEconomicos {
  cdiDiarioPercent: number // % ao dia
  selicDiariaPercent: number // % ao dia
  ipcaMensalPercent: number // % no último mês fechado
}

async function buscarUltimoValorSerie(codigo: number): Promise<number | null> {
  try {
    const resp = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/1?formato=json`)
    if (!resp.ok) return null
    const dados = await resp.json()
    const valor = Number(dados?.[0]?.valor)
    return Number.isNaN(valor) ? null : valor
  } catch {
    return null
  }
}

/**
 * Busca os 3 indicadores de uma vez. Se qualquer um falhar (BCB fora do
 * ar, sem internet), essa função inteira devolve null — os cálculos de
 * Renda Fixa então usam a última taxa conhecida gravada em cada
 * investimento (ver calculos.ts), nunca travam a tela.
 */
export async function buscarIndicadores(): Promise<IndicadoresEconomicos | null> {
  if (cache && Date.now() - cache.buscadoEm < CACHE_TTL_MS) return cache.dados

  const [cdi, selic, ipca] = await Promise.all([buscarUltimoValorSerie(12), buscarUltimoValorSerie(11), buscarUltimoValorSerie(433)])
  if (cdi === null || selic === null || ipca === null) return null

  const dados: IndicadoresEconomicos = { cdiDiarioPercent: cdi, selicDiariaPercent: selic, ipcaMensalPercent: ipca }
  cache = { dados, buscadoEm: Date.now() }
  return dados
}
