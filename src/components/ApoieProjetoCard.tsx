import { useEffect, useState } from 'react'
import { Check, Copy, HeartHandshake } from 'lucide-react'
import { buscarApoioPix, urlPublicaQrPix, type ApoioPixConfig } from '@/lib/apoioPix'

async function copiarTexto(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    const campo = document.createElement('textarea')
    campo.value = texto
    campo.setAttribute('readonly', '')
    campo.style.position = 'fixed'
    campo.style.opacity = '0'
    document.body.appendChild(campo)
    campo.select()
    const copiado = document.execCommand('copy')
    campo.remove()
    return copiado
  }
}

export default function ApoieProjetoCard() {
  const [config, setConfig] = useState<ApoioPixConfig | null>(null)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    let ativo = true
    buscarApoioPix()
      .then((dados) => {
        if (ativo) setConfig(dados)
      })
      .catch(() => {
        if (ativo) setConfig(null)
      })
    return () => {
      ativo = false
    }
  }, [])

  if (!config) return null
  const { chave, nomeRecebedor, caminhoQr } = config
  if (!chave.trim()) return null

  const urlQr = urlPublicaQrPix(caminhoQr)

  async function copiarChave() {
    const ok = await copiarTexto(chave)
    setCopiado(ok)
    window.setTimeout(() => setCopiado(false), 2500)
  }

  return (
    <section className="relative mb-5 overflow-hidden rounded-card border border-accent-cyan/30 bg-bg-card p-4 shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-accent-cyan/10 blur-3xl" />
      <div className="relative flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-cyan/25 bg-gradient-to-br from-accent-cyan/20 to-blue-500/10 text-accent-cyan shadow-inner">
          <HeartHandshake size={21} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-bold text-texto">Apoie o projeto</h2>
            <span className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-cyan">Pix voluntário</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-texto-secundario">
            Está gostando do Nexus? Sua contribuição ajuda o projeto a continuar crescendo.
          </p>
        </div>
      </div>

      {nomeRecebedor && (
        <p className="relative mt-3 text-[11px] text-texto-secundario">
          Recebedor <span className="ml-1 font-semibold text-texto">{nomeRecebedor}</span>
        </p>
      )}

      {urlQr && (
        <div className="relative mx-auto mt-4 w-fit rounded-2xl border border-white/70 bg-white p-2.5 shadow-lg shadow-black/20">
          <img src={urlQr} alt="QR Code para apoiar o projeto via Pix" className="h-44 w-44 object-contain" loading="lazy" />
        </div>
      )}

      <div className="relative mt-3 rounded-2xl border border-border bg-black/10 px-3.5 py-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-texto-secundario">Chave Pix</p>
        <p className="mt-1.5 break-all text-[13px] font-semibold tracking-wide text-texto">{chave}</p>
      </div>

      <button
        type="button"
        onClick={copiarChave}
        className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-cyan to-sky-400 px-3 py-3 text-xs font-bold text-[#03121A] shadow-md shadow-accent-cyan/15 transition-transform active:scale-[0.99] hover:brightness-105"
      >
        {copiado ? <Check size={15} /> : <Copy size={15} />}
        {copiado ? 'Chave copiada' : 'Copiar chave Pix'}
      </button>
      <p role="status" className="sr-only">{copiado ? 'Chave Pix copiada para a área de transferência.' : ''}</p>
      <p className="relative mt-2.5 text-center text-[10px] text-texto-secundario">Apoio opcional. O Nexus continua gratuito.</p>
    </section>
  )
}
