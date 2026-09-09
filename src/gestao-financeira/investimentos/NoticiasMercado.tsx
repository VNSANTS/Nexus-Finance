import { useEffect, useState } from 'react'
import { ChevronLeft, Newspaper, ExternalLink, AlertCircle } from 'lucide-react'
import { buscarNoticiasMercado, marketauxConfigurado, type CategoriaNoticia, type NoticiaMercado } from './apiInvestimentos'

const CATEGORIAS: { id: CategoriaNoticia; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'renda-fixa', label: 'Renda Fixa' },
  { id: 'acoes', label: 'Ações' },
  { id: 'cripto', label: 'Cripto' },
]

function tempoRelativo(iso: string): string {
  if (!iso) return ''
  const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60_000)
  if (diffMin < 60) return `há ${Math.max(diffMin, 1)} min`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `há ${diffH}h`
  return `há ${Math.round(diffH / 24)}d`
}

export default function NoticiasMercado({ onVoltar }: { onVoltar: () => void }) {
  const [categoria, setCategoria] = useState<CategoriaNoticia>('todas')
  const [noticias, setNoticias] = useState<NoticiaMercado[] | null>(null)
  const [carregando, setCarregando] = useState(true)
  const configurado = marketauxConfigurado()

  useEffect(() => {
    if (!configurado) {
      setCarregando(false)
      return
    }
    setCarregando(true)
    buscarNoticiasMercado(categoria).then((r) => {
      setNoticias(r)
      setCarregando(false)
    })
  }, [categoria, configurado])

  return (
    <div className="pb-10">
      <div className="px-4 pt-5 pb-1">
        <button onClick={onVoltar} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
          <ChevronLeft size={16} /> Voltar
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-accent-cyan/15">
            <Newspaper size={20} className="text-accent-cyan" />
          </div>
          <h1 className="text-xl font-display font-extrabold text-white leading-tight">Notícias do mercado</h1>
        </div>
      </div>

      <div className="px-4">
        {!configurado ? (
          <div className="rounded-2xl border border-accent-gold/30 bg-accent-gold/5 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-accent-gold">
              <AlertCircle size={15} />
              <p className="text-sm font-semibold">Notícias ainda não configuradas</p>
            </div>
            <p className="text-[12.5px] text-slate-400 leading-snug">
              Essa tela usa a MarketAux (grátis, sem cartão) pra buscar notícias reais. Pra ativar: crie uma conta em{' '}
              <span className="text-accent-cyan">marketaux.com</span>, copie sua chave gratuita e adicione como{' '}
              <code className="text-[11px] bg-bg-card px-1 py-0.5 rounded">VITE_MARKETAUX_KEY</code> no arquivo <code className="text-[11px] bg-bg-card px-1 py-0.5 rounded">.env.local</code> do projeto.
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-1.5 mb-4 overflow-x-auto">
              {CATEGORIAS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoria(c.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-[12px] font-semibold border ${
                    categoria === c.id ? 'bg-accent-cyan text-black border-accent-cyan' : 'border-border text-slate-400'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {carregando ? (
              <div className="flex flex-col gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-20 rounded-2xl bg-bg-card animate-pulse" />
                ))}
              </div>
            ) : !noticias || noticias.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                Não encontrei notícias agora. Tenta de novo em instantes ou troca de categoria.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {noticias.map((n, i) => (
                  <a
                    key={i}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface rounded-2xl p-3.5 flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white leading-snug mb-1.5">{n.titulo}</p>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                        <span>{n.fonte}</span>
                        <span>·</span>
                        <span>{tempoRelativo(n.publicadaEm)}</span>
                        <ExternalLink size={10} className="ml-auto shrink-0" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
