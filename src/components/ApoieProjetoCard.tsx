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
    <section className="mb-5 rounded-card border border-accent-cyan/25 bg-bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
          <HeartHandshake size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-texto">Apoie o projeto</h2>
          <p className="mt-1 text-xs leading-relaxed text-texto-secundario">
            Se o Nexus está te ajudando, você pode contribuir via Pix. É totalmente voluntário.
          </p>
        </div>
      </div>

      {nomeRecebedor && (
        <p className="mt-3 text-xs text-texto-secundario">
          Recebedor: <span className="font-semibold text-texto">{nomeRecebedor}</span>
        </p>
      )}

      {urlQr && (
        <div className="mx-auto mt-4 w-fit rounded-xl bg-white p-2.5">
          <img src={urlQr} alt="QR Code para apoiar o projeto via Pix" className="h-44 w-44 object-contain" loading="lazy" />
        </div>
      )}

      <div className="mt-3 rounded-xl border border-border bg-black/10 px-3 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-texto-secundario">Chave Pix</p>
        <p className="mt-1 break-all text-xs font-medium text-texto">{chave}</p>
      </div>

      <button
        type="button"
        onClick={copiarChave}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-cyan px-3 py-2.5 text-xs font-bold text-black transition-opacity hover:opacity-90"
      >
        {copiado ? <Check size={15} /> : <Copy size={15} />}
        {copiado ? 'Chave copiada' : 'Copiar chave Pix'}
      </button>
      <p role="status" className="sr-only">{copiado ? 'Chave Pix copiada para a área de transferência.' : ''}</p>
      <p className="mt-2 text-center text-[10px] text-texto-secundario">O app continua gratuito com ou sem doação.</p>
    </section>
  )
}
