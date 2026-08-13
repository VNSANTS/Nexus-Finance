// Dados de mercado (categorias, notícias, rankings) moraram aqui antes e
// agora vivem em banco-de-dados/mercado/categorias.ts, editável sem tocar
// em código de app. Este arquivo só faz a ponte para quem já importa daqui.
import { CATEGORIAS_MERCADO } from '@banco-de-dados/mercado/categorias'
import type { CategoriaMercado } from '@banco-de-dados/mercado/categorias'

export type Mercado = CategoriaMercado

export function buildMercados(): Mercado[] {
  return CATEGORIAS_MERCADO
}

export {
  TICKER_TAPE_ITENS,
  RANKING_ALTAS,
  RANKING_BAIXAS,
  SETORES_HEATMAP,
  CALENDARIO_ECONOMICO,
  TICKERS_DISPONIVEIS,
} from '@banco-de-dados/mercado/categorias'
