// Engine de som sintetizado (Web Audio API, sem arquivos de áudio) para
// notificações do lado "Aprender".
//
// Isto é uma cópia deliberada de gestao-financeira/somNotificacao.ts, não uma
// extração compartilhada — a tarefa que criou este arquivo definiu que, em
// caso de qualquer dúvida sobre risco de quebrar o módulo isolado da Gestão
// Financeira, é preferível duplicar uma função pequena a arriscar mexer nela.
// Se um dia os dois lados forem unificados, é aqui e em somNotificacao.ts que
// a fusão deveria acontecer.

export type EstiloSomAprender = 'suave' | 'classico' | 'alerta'
// "Prioridade" aqui é só uma variação de tom (grave/médio/agudo) — não existe
// conceito de prioridade de notificação no lado Aprender, mas reaproveitar a
// mesma forma (3 níveis) mantém a engine idêntica à da Gestão Financeira.
export type VariacaoTomAprender = 'padrao' | 'suave' | 'destaque'

export const ESTILOS_SOM_APRENDER: { id: EstiloSomAprender; label: string; desc: string }[] = [
  { id: 'suave', label: 'Suave', desc: 'Um tom único e discreto' },
  { id: 'classico', label: 'Clássico', desc: 'Dois tons, tipo lembrete' },
  { id: 'alerta', label: 'Alerta', desc: 'Bipes rápidos, mais chamativo' },
]

// Um único AudioContext reaproveitado — criar um novo a cada som soa mal e
// vaza memória. É criado sob demanda (primeira interação do usuário) porque
// navegadores bloqueiam autoplay de áudio sem gesto prévio.
let contexto: AudioContext | null = null
function obterContexto(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return null
  if (!contexto) contexto = new AudioCtx()
  if (contexto.state === 'suspended') void contexto.resume()
  return contexto
}

function tocarTom(ctx: AudioContext, freq: number, inicioEm: number, duracaoS: number, volume: number, forma: OscillatorType) {
  const osc = ctx.createOscillator()
  const ganho = ctx.createGain()
  osc.type = forma
  osc.frequency.value = freq
  const agora = ctx.currentTime + inicioEm
  // Envelope simples (ataque rápido, decaimento suave) pra não estalar
  ganho.gain.setValueAtTime(0, agora)
  ganho.gain.linearRampToValueAtTime(volume, agora + 0.015)
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + duracaoS)
  osc.connect(ganho)
  ganho.connect(ctx.destination)
  osc.start(agora)
  osc.stop(agora + duracaoS + 0.02)
}

// volumeBase: 0–100 (o que o usuário escolhe no slider)
export function tocarSomAprender(estilo: EstiloSomAprender, variacao: VariacaoTomAprender, volumeBase: number) {
  const ctx = obterContexto()
  if (!ctx || volumeBase <= 0) return
  const v = (Math.min(Math.max(volumeBase, 0), 100) / 100) * 0.22 // teto baixo pra nunca soar alto/agressivo
  const grave = variacao === 'suave'
  const agudo = variacao === 'destaque'

  if (estilo === 'suave') {
    tocarTom(ctx, agudo ? 740 : grave ? 520 : 620, 0, 0.32, v, 'sine')
  } else if (estilo === 'classico') {
    const base = agudo ? 660 : grave ? 440 : 550
    tocarTom(ctx, base, 0, 0.16, v, 'triangle')
    tocarTom(ctx, base * 1.5, 0.14, 0.22, v * 0.9, 'triangle')
  } else {
    // alerta: dois ou três bipes curtos, mais bipes quanto maior o destaque
    const base = agudo ? 880 : grave ? 620 : 740
    const repeticoes = agudo ? 3 : 2
    for (let i = 0; i < repeticoes; i++) {
      tocarTom(ctx, base, i * 0.13, 0.09, v, 'square')
    }
  }
}
