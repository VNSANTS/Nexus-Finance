// Util central pra combinar uma cor hex (#RRGGBB ou #RRGGBBAA) com uma
// opacidade extra, sem o problema de concatenar sufixo hex direto na
// string (`${cor}2E`) — isso só funciona se `cor` for sempre 6 dígitos.
// Desde que a cor de perfil passou a aceitar opacidade própria, ela pode
// vir com 8 dígitos, e a concatenação de sufixo virava um hex inválido
// (11 dígitos), quebrando o CSS silenciosamente.
//
// `corComAlfa(cor, 18)` faz o mesmo papel visual que `${cor}2E` fazia
// quando `cor` era sempre opaca — mas combina corretamente com a opacidade
// que o próprio usuário já escolheu pra essa cor (multiplica as duas),
// em vez de tentar concatenar por cima.

const HEX_VALIDO = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

function hexParaRgb(hex: string): { r: number; g: number; b: number } {
  const seguro = HEX_VALIDO.test(hex) ? hex : '#000000'
  const num = parseInt(seguro.slice(1, 7), 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

// Alpha embutido na própria cor (0–255). Hex de 6 dígitos = opaco (255).
function hexParaAlfa(hex: string): number {
  if (!HEX_VALIDO.test(hex) || hex.length < 9) return 255
  return parseInt(hex.slice(7, 9), 16)
}

/**
 * Combina `cor` (que pode já ter sua própria opacidade) com uma opacidade
 * extra em %, multiplicando as duas — pra usar como "cor de fundo suave",
 * "borda sutil" etc, sem o risco de gerar hex inválido.
 */
export function corComAlfa(cor: string, alfaExtraPct: number): string {
  const { r, g, b } = hexParaRgb(cor)
  const alfaBase = hexParaAlfa(cor)
  const alfaFinal = Math.round(alfaBase * (Math.max(0, Math.min(100, alfaExtraPct)) / 100))
  const canais = [r, g, b, alfaFinal]
  return `#${canais.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

/** Corta o canal alpha, se tiver algum — usado onde a cor precisa ser
 * garantidamente opaca (ex: cor de texto, cor sólida de ícone). */
export function corOpaca(cor: string): string {
  return cor.length > 7 ? cor.slice(0, 7) : cor
}
