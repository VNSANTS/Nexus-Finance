const CHAVE = 'nexus-auth-intent:v1'
const VALIDADE_MS = 30 * 60 * 1000
const PARAMETROS = new Set(['trilha', 'modulo', 'novo', 'tipo', 'forma', 'calc', 'aba'])

export function validarDestino(valor: unknown): string | null {
  if (typeof valor !== 'string' || valor.length > 1024 || !/^\/(?!\/)/.test(valor) || /[\\\u0000-\u001f]/.test(valor)) return null
  try {
    const url = new URL(valor, 'https://nexus.invalid')
    if (url.origin !== 'https://nexus.invalid' || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)?$/.test(url.pathname)) return null
    if (/^\/(?:login|redefinir-senha)(?:\/|$)/.test(url.pathname)) return null
    const params = new URLSearchParams()
    url.searchParams.forEach((v, k) => { if (PARAMETROS.has(k) && v.length <= 100) params.set(k, v) })
    const busca = params.toString()
    return url.pathname + (busca ? '?' + busca : '')
  } catch { return null }
}

export function limparDestino() {
  try { localStorage.removeItem(CHAVE) } catch { /* storage indisponível */ }
}

export function guardarDestino(valor: unknown) {
  const destino = validarDestino(valor)
  if (!destino || destino === '/') return limparDestino()
  try { localStorage.setItem(CHAVE, JSON.stringify({ destino, em: Date.now() })) } catch { /* storage indisponível */ }
}

export function lerDestino(): string | null {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null')
    const idade = Date.now() - salvo?.em
    if (Number.isFinite(idade) && idade >= 0 && idade < VALIDADE_MS) return validarDestino(salvo.destino)
  } catch { /* registro ausente ou inválido */ }
  return null
}
