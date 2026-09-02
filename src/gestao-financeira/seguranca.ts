import type { PreferenciasSeguranca, TamanhoPin, TempoAutoBloqueio } from './types'

// Bloqueio por PIN da Gestão Financeira (menu Mais → Segurança). Mesma
// política de honestidade das outras telas deste módulo (ver comentários em
// GfPrivacidadePage.tsx e GfPrivacyOverlay.tsx):
//
// - Isto é uma trava de ACESSO À TELA, não criptografia dos dados. Os
//   lançamentos, contas, cartões, dívidas e metas continuam salvos como
//   sempre estiveram no localStorage do navegador (ver comentário no topo de
//   GestaoFinanceiraContext.tsx) — o PIN só impede abrir a Gestão Financeira
//   sem o código certo, não impede alguém com acesso ao aparelho e ao
//   DevTools de ler o localStorage diretamente.
// - O PIN em si nunca é guardado. Só guardamos um hash (PBKDF2-SHA256, 100
//   mil iterações, salt aleatório de 16 bytes) via Web Crypto API nativa do
//   navegador — sem biblioteca nova, sem dependência adicionada ao projeto.
//   Não existe forma de "recuperar" o PIN a partir do que fica salvo, só de
//   verificar se uma tentativa bate com o hash.
// - Não existe recuperação por e-mail/SMS — não há servidor, não há conta.
//   Esquecer o PIN só deixa uma saída: remover a trava (fluxo "Esqueci meu
//   PIN" na tela de bloqueio, ver GfBloqueioOverlay.tsx). Isso não apaga
//   nenhum dado financeiro, só desliga a exigência de PIN até configurar um
//   novo — mesma filosofia de "boa-fé" já usada em Família e perfis.

export const PREFERENCIAS_SEGURANCA_PADRAO: PreferenciasSeguranca = {
  pinAtivo: false,
  pinHash: null,
  pinSalt: null,
  pinTamanho: null,
  bloquearAoAbrirApp: true,
  bloquearAoTrocarDeApp: true,
  tempoAutoBloqueio: 0,
}

export const OPCOES_TAMANHO_PIN: { valor: TamanhoPin; label: string }[] = [
  { valor: 4, label: '4 dígitos' },
  { valor: 6, label: '6 dígitos' },
]

export const OPCOES_TEMPO_AUTO_BLOQUEIO: { valor: TempoAutoBloqueio; label: string; desc: string }[] = [
  { valor: 0, label: 'Imediato', desc: 'Pede o PIN assim que você volta pro app' },
  { valor: 1, label: '1 minuto', desc: 'Só pede de novo se ficar mais de 1 minuto fora' },
  { valor: 5, label: '5 minutos', desc: 'Tolerância maior — bom pra trocar de app rapidinho' },
  { valor: 15, label: '15 minutos', desc: 'Só pede de novo se ficar bastante tempo fora' },
]

const ITERACOES_PBKDF2 = 100_000
const TAMANHO_HASH_BITS = 256

function paraHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexParaBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(new ArrayBuffer(hex.length / 2))
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
  return bytes
}

export function pinValido(pin: string, tamanho: TamanhoPin): boolean {
  return new RegExp(`^\\d{${tamanho}}$`).test(pin)
}

async function derivarHash(pin: string, saltHex: string): Promise<string> {
  const encoder = new TextEncoder()
  const chaveBase = await crypto.subtle.importKey('raw', encoder.encode(pin), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: hexParaBytes(saltHex), iterations: ITERACOES_PBKDF2, hash: 'SHA-256' },
    chaveBase,
    TAMANHO_HASH_BITS,
  )
  return paraHex(bits)
}

// Gera hash + salt novos pra um PIN (usado ao ativar ou trocar o PIN).
export async function criarHashPin(pin: string): Promise<{ hash: string; salt: string }> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16))
  const salt = paraHex(saltBytes.buffer)
  const hash = await derivarHash(pin, salt)
  return { hash, salt }
}

// Confere se um PIN digitado bate com o hash salvo. Assíncrono porque
// PBKDF2 é deliberadamente "lento" (isso é o ponto — dificulta força bruta).
export async function verificarPin(pin: string, saltHex: string, hashEsperado: string): Promise<boolean> {
  const hash = await derivarHash(pin, saltHex)
  return hash === hashEsperado
}
