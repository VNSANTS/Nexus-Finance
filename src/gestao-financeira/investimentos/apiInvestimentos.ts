import { buscarCotacoesAcoes } from '@/lib/cotacoesReais'

// =============================================================================
// Cotações da carteira de investimentos — 3 fontes:
//
// 1. Ações/FIIs/ETFs: reaproveita buscarCotacoesAcoes de src/lib/cotacoesReais.ts
//    (mesma Edge Function mercado-cotacoes → brapi.dev já usada na tela de
//    Mercado) — zero código novo de backend pra isso.
//
// 2. Cripto: CoinGecko, pública e gratuita, sem chave, chamada direto do
//    navegador (mesmo padrão do AwesomeAPI em cotacoesReais.ts).
//
// 3. Tesouro Direto: endpoint novo da brapi.dev (lançado em 2026). Ao
//    contrário do endpoint de cotação, não está confirmado se libera sem
//    token — tentamos direto; se falhar, a Tela 2 deixa a pessoa preencher
//    os campos manualmente em vez de travar a busca.
// =============================================================================

export async function buscarPrecosAcoes(tickers: string[]): Promise<Map<string, number>> {
  const mapa = new Map<string, number>()
  if (tickers.length === 0) return mapa
  const cotacoes = await buscarCotacoesAcoes(tickers)
  if (!cotacoes) return mapa
  for (const c of cotacoes) if (c.preco !== null) mapa.set(c.ticker, c.preco)
  return mapa
}

export async function buscarPrecosCripto(coingeckoIds: string[]): Promise<Map<string, number>> {
  const mapa = new Map<string, number>()
  if (coingeckoIds.length === 0) return mapa
  try {
    const ids = [...new Set(coingeckoIds)].join(',')
    const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=brl`)
    if (!resp.ok) return mapa
    const dados = await resp.json()
    for (const id of Object.keys(dados)) {
      const preco = dados[id]?.brl
      if (typeof preco === 'number') mapa.set(id, preco)
    }
  } catch {
    // sem internet / CoinGecko fora do ar — mapa vazio, calculos.ts cai no fallback
  }
  return mapa
}

// Lista curada das criptos mais comuns — evita a pessoa ter que saber o
// "id" exato da CoinGecko (que às vezes não bate com o ticker, ex: o id de
// Cardano é "cardano", não "ADA").
export const CRIPTOS_COMUNS = [
  { id: 'bitcoin', simbolo: 'BTC', nome: 'Bitcoin' },
  { id: 'ethereum', simbolo: 'ETH', nome: 'Ethereum' },
  { id: 'solana', simbolo: 'SOL', nome: 'Solana' },
  { id: 'ripple', simbolo: 'XRP', nome: 'XRP' },
  { id: 'cardano', simbolo: 'ADA', nome: 'Cardano' },
  { id: 'dogecoin', simbolo: 'DOGE', nome: 'Dogecoin' },
  { id: 'binancecoin', simbolo: 'BNB', nome: 'BNB' },
  { id: 'tron', simbolo: 'TRX', nome: 'Tron' },
  { id: 'litecoin', simbolo: 'LTC', nome: 'Litecoin' },
  { id: 'polkadot', simbolo: 'DOT', nome: 'Polkadot' },
]

export interface TituloTesouro {
  slug: string
  nome: string
  indexador: 'PREFIXADO' | 'IPCA' | 'SELIC'
  vencimento: string // YYYY-MM-DD
  taxaAnual: number // % ao ano (prefixado) ou % acima do índice (IPCA); Selic geralmente ~100
  precoUnitario: number | null
}

/**
 * Busca a lista de títulos do Tesouro Direto disponíveis hoje. Devolve []
 * (não null) em caso de falha — a Tela 2 trata lista vazia mostrando um
 * aviso e liberando o preenchimento manual, sem parecer um erro travado.
 */
export async function buscarTesouroDireto(): Promise<TituloTesouro[]> {
  try {
    const resp = await fetch('https://brapi.dev/api/v2/treasury')
    if (!resp.ok) return []
    const dados = await resp.json()
    const lista = dados?.treasuries ?? dados?.results ?? []
    return lista
      .map((t: Record<string, unknown>) => normalizarTitulo(t))
      .filter((t: TituloTesouro | null): t is TituloTesouro => t !== null)
  } catch {
    return []
  }
}

function normalizarTitulo(t: Record<string, unknown>): TituloTesouro | null {
  const slug = String(t.slug ?? t.id ?? '')
  const nome = String(t.name ?? t.nome ?? slug)
  if (!slug) return null

  const nomeMin = nome.toLowerCase()
  const indexador: TituloTesouro['indexador'] = nomeMin.includes('ipca') ? 'IPCA' : nomeMin.includes('selic') ? 'SELIC' : 'PREFIXADO'

  return {
    slug,
    nome,
    indexador,
    vencimento: String(t.maturityDate ?? t.vencimento ?? ''),
    taxaAnual: Number(t.annualRate ?? t.taxa ?? 0),
    precoUnitario: typeof t.unitPrice === 'number' ? t.unitPrice : typeof t.price === 'number' ? t.price : null,
  }
}

// =============================================================================
// Notícias de mercado — MarketAux (marketaux.com). Diferente das outras
// fontes desta sessão, essa PRECISA de cadastro (grátis, sem cartão) e uma
// chave — o plano gratuito dá ~100 requisições/dia, e cada uma já devolve
// algumas notícias, então dá bastante folga pro uso normal de um app
// pessoal. A chave fica em VITE_MARKETAUX_KEY (ver .env.example);
// sem ela configurada, a Tela de Notícias mostra um aviso explicando como
// ativar em vez de tentar chamar a API e falhar silenciosamente.
// =============================================================================

const MARKETAUX_KEY = import.meta.env.VITE_MARKETAUX_KEY

export type CategoriaNoticia = 'todas' | 'renda-fixa' | 'acoes' | 'cripto'

export interface NoticiaMercado {
  titulo: string
  fonte: string
  url: string
  publicadaEm: string // ISO
  imagemUrl: string | null
}

const QUERY_POR_CATEGORIA: Record<CategoriaNoticia, string> = {
  todas: 'economia OR mercado financeiro OR bolsa de valores',
  'renda-fixa': 'tesouro direto OR CDI OR selic OR renda fixa',
  acoes: 'ibovespa OR ações OR B3',
  cripto: 'bitcoin OR criptomoeda OR ethereum',
}

export function marketauxConfigurado(): boolean {
  return Boolean(MARKETAUX_KEY)
}

export async function buscarNoticiasMercado(categoria: CategoriaNoticia): Promise<NoticiaMercado[] | null> {
  if (!MARKETAUX_KEY) return null
  try {
    const params = new URLSearchParams({
      search: QUERY_POR_CATEGORIA[categoria],
      language: 'pt',
      limit: '3', // teto do plano gratuito por requisição
      api_token: MARKETAUX_KEY,
    })
    const resp = await fetch(`https://api.marketaux.com/v1/news/all?${params}`)
    if (!resp.ok) return null
    const dados = await resp.json()
    const artigos = dados?.data ?? []
    return artigos.map((a: Record<string, unknown>) => ({
      titulo: String(a.title ?? ''),
      fonte: String(a.source ?? 'Fonte desconhecida'),
      url: String(a.url ?? ''),
      publicadaEm: String(a.published_at ?? ''),
      imagemUrl: typeof a.image_url === 'string' ? a.image_url : null,
    }))
  } catch {
    return null
  }
}
