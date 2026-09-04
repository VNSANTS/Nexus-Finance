import trilhaCompleta from './badge-trilha-completa.svg'
import sequencia30Dias from './badge-sequencia-30-dias.svg'
import primeiroModulo from './badge-primeiro-modulo.svg'
import leitorVoraz from './badge-leitor-voraz.svg'

// Mapeado pelo id de cada badge em src/data/badges.ts.
// Só 4 dos 12 badges têm arte ilustrada por enquanto — os outros usam o
// fallback de ícone + cor normalmente.
export const ARTES_BADGE: Record<string, string> = {
  'trilha-completa': trilhaCompleta,
  'streak-30': sequencia30Dias,
  'primeira-licao': primeiroModulo,
  'leitor': leitorVoraz,
}
