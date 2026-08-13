import type { Livro } from '@/types'

/**
 * Registro de livros — carregado automaticamente a partir dos arquivos desta
 * pasta. Para adicionar um livro novo:
 *
 * 1. Crie um arquivo `<slug-do-livro>.ts` nesta pasta
 * 2. Exporte uma constante do tipo `Livro` (o nome da constante não importa,
 *    só o tipo — este arquivo encontra automaticamente)
 * 3. Pronto. Não precisa editar este index nem nenhum outro lugar do código.
 *
 * Diferente dos módulos (que são carregados sob demanda, um por vez, porque
 * são muito maiores), os livros são poucos e leves o bastante para carregar
 * todos de uma vez — é assim que a Biblioteca e a Busca já esperam usá-los.
 */
const arquivos = import.meta.glob<Record<string, unknown>>('./*.ts', { eager: true })

function extrairLivro(mod: Record<string, unknown>): Livro | null {
  for (const valor of Object.values(mod)) {
    if (valor && typeof valor === 'object' && 'id' in valor && 'titulo' in valor && 'autor' in valor) {
      return valor as Livro
    }
  }
  return null
}

export const LIVROS: Livro[] = Object.values(arquivos)
  .map(extrairLivro)
  .filter((l): l is Livro => l !== null)
