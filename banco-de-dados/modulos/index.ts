import type { Modulo, Trilha } from '@/types'

// Índice leve de todos os módulos (id, trilha, ícone, ordem) e a lista das
// 10 trilhas — carregados sempre, ao contrário do conteúdo completo dos
// módulos abaixo, que é sob demanda. Ficam em arquivos com "_" na frente
// para não serem capturados pelo glob `./m*.ts` que varre o conteúdo.
export { MODULOS, getModulosByTrilha } from './_indice'
export type { ModuloMeta } from './_indice'
export { TRILHAS } from './_trilhas'
export type { Trilha }

/**
 * Registro de conteúdo dos módulos — carregado sob demanda.
 *
 * Antes este arquivo importava os 60 módulos de forma estática. Como cada um
 * tem entre 8 KB e 24 KB de texto, os ~1,2 MB de conteúdo entravam inteiros no
 * bundle inicial: quem abria o app na Home baixava os 60 módulos antes de ver
 * a primeira tela. Agora o Vite gera um chunk por módulo e só o que o usuário
 * abrir é baixado.
 *
 * Bônus: o mapa é montado a partir dos nomes dos arquivos, então adicionar um
 * módulo novo é só criar o arquivo. Não precisa mais editar este index em três
 * lugares (import, entrada do mapa, contagem) — que era onde o registro
 * costumava sair de sincronia com a pasta.
 *
 * Convenção: `mNN-<slug>.ts` → o id do módulo é o `<slug>`.
 */
const carregadores = import.meta.glob<Record<string, unknown>>('./m*.ts')

const porId: Record<string, () => Promise<Record<string, unknown>>> = {}
for (const [caminho, carregar] of Object.entries(carregadores)) {
  const arquivo = caminho.replace('./', '').replace(/\.ts$/, '')
  const id = arquivo.replace(/^m\d+-/, '')
  porId[id] = carregar
}

export const IDS_MODULOS_COMPLETOS = Object.keys(porId).sort()
export const TOTAL_MODULOS_COMPLETOS = IDS_MODULOS_COMPLETOS.length

/** Checagem síncrona e barata: dá para marcar o card sem baixar o conteúdo. */
export function temConteudoCompleto(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(porId, id)
}

const cache = new Map<string, Modulo>()
const emVoo = new Map<string, Promise<Modulo | null>>()

function extrairModulo(mod: Record<string, unknown>): Modulo | null {
  // Os arquivos exportam com nomes variados (moduloRendaFixa, opcoes, esg...),
  // então procuramos o export que tem cara de Modulo em vez de fixar um nome.
  for (const valor of Object.values(mod)) {
    if (valor && typeof valor === 'object' && 'id' in valor && 'titulo' in valor) {
      return valor as Modulo
    }
  }
  return null
}

/** Carrega o conteúdo de um módulo. Resolve para null se o módulo não existe. */
export function carregarModulo(id: string): Promise<Modulo | null> {
  const emCache = cache.get(id)
  if (emCache) return Promise.resolve(emCache)

  const jaPedido = emVoo.get(id)
  if (jaPedido) return jaPedido

  const carregar = porId[id]
  if (!carregar) return Promise.resolve(null)

  const promessa = carregar()
    .then((mod) => {
      const modulo = extrairModulo(mod)
      if (modulo) cache.set(id, modulo)
      return modulo
    })
    .catch(() => null)
    .finally(() => {
      emVoo.delete(id)
    })

  emVoo.set(id, promessa)
  return promessa
}

/** Pré-carrega em segundo plano — bom para o hover/toque no card do módulo. */
export function prefetchModulo(id: string): void {
  if (!cache.has(id)) void carregarModulo(id)
}
