import { useEffect, useState } from 'react'
import { HeartHandshake, ImagePlus, Loader2, Save, X } from 'lucide-react'
import { buscarApoioPix, salvarApoioPix, urlPublicaQrPix, type ApoioPixConfig } from '@/lib/apoioPix'

export default function PainelApoioPix() {
  const [config, setConfig] = useState<ApoioPixConfig | null>(null)
  const [chave, setChave] = useState('')
  const [nomeRecebedor, setNomeRecebedor] = useState('')
  const [arquivoQr, setArquivoQr] = useState<File | null>(null)
  const [removerQr, setRemoverQr] = useState(false)
  const [previaLocal, setPreviaLocal] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true
    buscarApoioPix()
      .then((dados) => {
        if (!ativo) return
        setConfig(dados)
        setChave(dados.chave)
        setNomeRecebedor(dados.nomeRecebedor)
      })
      .catch((e) => {
        if (ativo) setErro(e instanceof Error ? e.message : 'Não foi possível carregar a configuração Pix.')
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
  }, [])

  useEffect(() => {
    if (!arquivoQr) {
      setPreviaLocal(null)
      return
    }
    const url = URL.createObjectURL(arquivoQr)
    setPreviaLocal(url)
    return () => URL.revokeObjectURL(url)
  }, [arquivoQr])

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (salvando) return
    setSalvando(true)
    setMensagem('')
    setErro('')
    try {
      const atualizado = await salvarApoioPix({ chave, nomeRecebedor }, arquivoQr, removerQr)
      setConfig(atualizado)
      setChave(atualizado.chave)
      setNomeRecebedor(atualizado.nomeRecebedor)
      setArquivoQr(null)
      setRemoverQr(false)
      setMensagem('Apoio Pix atualizado. Ele já aparece publicamente no Perfil.')
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível salvar a configuração Pix.')
    } finally {
      setSalvando(false)
    }
  }

  const urlQrSalvo = !removerQr && !arquivoQr ? urlPublicaQrPix(config?.caminhoQr ?? null) : null
  const urlQr = previaLocal ?? urlQrSalvo

  return (
    <section className="rounded-card border border-border bg-bg-card p-4">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
          <HeartHandshake size={18} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-texto">Apoio via Pix</h2>
          <p className="mt-0.5 text-xs text-texto-secundario">Configure a chave e o QR que aparecem para todos no Perfil.</p>
        </div>
      </div>

      {carregando ? (
        <div className="h-32 animate-pulse rounded-xl bg-bg-card" />
      ) : (
        <form onSubmit={salvar} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-texto">
            Chave Pix
            <input
              value={chave}
              onChange={(e) => setChave(e.target.value)}
              maxLength={200}
              autoComplete="off"
              placeholder="Cole aqui sua chave Pix"
              className="w-full rounded-xl border border-border bg-bg-card px-3 py-2.5 text-sm font-normal text-texto outline-none focus:border-accent-cyan"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-texto">
            Nome do recebedor (opcional)
            <input
              value={nomeRecebedor}
              onChange={(e) => setNomeRecebedor(e.target.value)}
              maxLength={100}
              autoComplete="off"
              placeholder="Nome que os apoiadores verão"
              className="w-full rounded-xl border border-border bg-bg-card px-3 py-2.5 text-sm font-normal text-texto outline-none focus:border-accent-cyan"
            />
          </label>

          <label className="flex cursor-pointer flex-col gap-1.5 text-xs font-semibold text-texto">
            QR Code do Pix
            <span className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-3 py-3 text-xs font-medium text-texto-secundario hover:border-accent-cyan">
              <ImagePlus size={15} />
              {arquivoQr ? arquivoQr.name : 'Selecionar imagem PNG, JPG ou WebP (até 1 MB)'}
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(e) => {
                setArquivoQr(e.target.files?.[0] ?? null)
                setRemoverQr(false)
              }}
            />
          </label>

          {urlQr && (
            <div className="mx-auto w-fit rounded-xl bg-white p-2.5">
              <img src={urlQr} alt="Prévia do QR Code Pix" className="h-36 w-36 object-contain" />
            </div>
          )}

          {(config?.caminhoQr || arquivoQr) && (
            <button
              type="button"
              onClick={() => {
                setArquivoQr(null)
                setRemoverQr(true)
              }}
              className="flex items-center justify-center gap-1.5 self-start text-xs font-medium text-accent-red"
            >
              <X size={14} /> Remover QR atual
            </button>
          )}

          <p className="text-[11px] leading-relaxed text-texto-secundario">
            O apoio é opcional e o app continua gratuito. A chave e a imagem do QR serão públicas para os usuários.
          </p>

          {mensagem && <p role="status" className="text-xs font-medium text-accent-green">{mensagem}</p>}
          {erro && <p role="alert" className="text-xs font-medium text-accent-red">{erro}</p>}

          <button
            type="submit"
            disabled={salvando || carregando}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent-cyan px-3 py-2.5 text-xs font-bold text-black disabled:opacity-50"
          >
            {salvando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {salvando ? 'Salvando…' : 'Salvar apoio Pix'}
          </button>
        </form>
      )}
    </section>
  )
}
