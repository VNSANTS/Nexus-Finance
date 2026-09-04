import type { Livro } from '@/types'

export { LIVROS_META } from './_indice'
export type { LivroMeta } from './_indice'

/**
 * Registro de conteúdo dos livros — carregado sob demanda.
 *
 * Antes este arquivo importava os 19 livros de forma eager (`import.meta.glob`
 * com `eager: true`), com o comentário de que eram "poucos e leves o
 * bastante para carregar todos de uma vez". Isso ficou desatualizado depois
 * que os resumos foram expandidos (quase o texto completo de cada livro):
 * os 19 juntos passaram a formar um chunk de ~900 KB, baixado inteiro assim
 * que alguém abria a Biblioteca ou a Busca — mesmo que só quisesse ler 1
 * livro. Agora, igual aos módulos, cada livro vira um chunk próprio e só é
 * baixado quando o usuário abre aquele livro específico. A lista da
 * Biblioteca e a Busca usam só o LIVROS_META (leve, sempre carregado).
 *
 * Convenção: `<id-do-livro>.ts` → o id do livro é o próprio nome do arquivo.
 */
const carregadores = import.meta.glob<Record<string, unknown>>('./*.ts')

const porId: Record<string, () => Promise<Record<string, unknown>>> = {}
for (const [caminho, carregar] of Object.entries(carregadores)) {
  const arquivo = caminho.replace('./', '').replace(/\.ts$/, '')
  if (arquivo === 'index' || arquivo === '_indice') continue
  porId[arquivo] = carregar
}

function extrairLivro(mod: Record<string, unknown>): Livro | null {
  for (const valor of Object.values(mod)) {
    if (valor && typeof valor === 'object' && 'id' in valor && 'titulo' in valor && 'autor' in valor) {
      return valor as Livro
    }
  }
  return null
}

const cache = new Map<string, Livro>()
const emVoo = new Map<string, Promise<Livro | null>>()

/** Carrega o conteúdo completo de um livro (incluindo resumoCompleto). Resolve para null se não existir. */
export function carregarLivro(id: string): Promise<Livro | null> {
  const emCache = cache.get(id)
  if (emCache) return Promise.resolve(emCache)

  const jaPedido = emVoo.get(id)
  if (jaPedido) return jaPedido

  const carregar = porId[id]
  if (!carregar) return Promise.resolve(null)

  const promessa = carregar()
    .then((mod) => {
      const livro = extrairLivro(mod)
      if (livro) cache.set(id, livro)
      return livro
    })
    .catch(() => null)
    .finally(() => {
      emVoo.delete(id)
    })

  emVoo.set(id, promessa)
  return promessa
}

/** Pré-carrega em segundo plano — bom para o toque no card do livro. */
export function prefetchLivro(id: string): void {
  if (!cache.has(id)) void carregarLivro(id)
}
