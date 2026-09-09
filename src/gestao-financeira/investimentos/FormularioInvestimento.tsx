import { useEffect, useState } from 'react'
import { ChevronLeft, Landmark, LineChart, Coins, Loader2, Search } from 'lucide-react'
import type { Investimento, ClasseAtivo, IndexadorRendaFixa, TipoAtivoRendaVariavel } from '../types'
import { buscarPrecosAcoes } from '../investimentos/apiInvestimentos'
import { CRIPTOS_COMUNS, buscarTesouroDireto, type TituloTesouro } from '../investimentos/apiInvestimentos'

const CLASSES: { id: ClasseAtivo; label: string; icone: typeof Landmark }[] = [
  { id: 'renda-variavel', label: 'Renda Variável', icone: LineChart },
  { id: 'renda-fixa', label: 'Renda Fixa', icone: Landmark },
  { id: 'cripto', label: 'Cripto', icone: Coins },
]

function novoId() {
  return `inv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
function hojeISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function FormularioInvestimento({
  editando, onSalvar, onCancelar,
}: {
  editando: Investimento | null
  onSalvar: (inv: Investimento) => void
  onCancelar: () => void
}) {
  const [classe, setClasse] = useState<ClasseAtivo>(editando?.classe ?? 'renda-variavel')

  return (
    <div className="pb-10">
      <div className="px-4 pt-5 pb-1">
        <button onClick={onCancelar} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
          <ChevronLeft size={16} /> Cancelar
        </button>
        <h1 className="text-xl font-display font-extrabold text-white">{editando ? 'Editar investimento' : 'Adicionar investimento'}</h1>
      </div>

      {!editando && (
        <div className="px-4 mt-3 mb-4">
          <div className="flex rounded-2xl bg-bg-card border border-border p-1">
            {CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setClasse(c.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  classe === c.id ? 'bg-accent-cyan text-black' : 'text-slate-400'
                }`}
              >
                <c.icone size={16} />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4">
        {classe === 'renda-variavel' && (
          <FormRendaVariavel editando={editando?.classe === 'renda-variavel' ? editando : null} onSalvar={onSalvar} />
        )}
        {classe === 'cripto' && (
          <FormCripto editando={editando?.classe === 'cripto' ? editando : null} onSalvar={onSalvar} />
        )}
        {classe === 'renda-fixa' && (
          <FormRendaFixa editando={editando?.classe === 'renda-fixa' ? editando : null} onSalvar={onSalvar} />
        )}
      </div>
    </div>
  )
}

// Campos comuns aos 3 formulários — estilo consistente com o resto da GF.
function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 mb-3.5">
      <span className="text-xs font-semibold text-slate-400">{label}</span>
      {children}
    </label>
  )
}
const inputClasse = 'w-full rounded-xl bg-bg-card border border-border px-3.5 py-3 text-sm text-white outline-none focus:border-accent-cyan'

function BotaoSalvar({ desabilitado, onClick }: { desabilitado: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className="w-full rounded-full bg-accent-cyan text-black font-semibold py-3.5 text-sm mt-2 disabled:opacity-50"
    >
      Salvar
    </button>
  )
}

function FormRendaVariavel({
  editando, onSalvar,
}: { editando: Extract<Investimento, { classe: 'renda-variavel' }> | null; onSalvar: (inv: Investimento) => void }) {
  const [ticker, setTicker] = useState(editando?.ticker ?? '')
  const [tipoAtivo, setTipoAtivo] = useState<TipoAtivoRendaVariavel>(editando?.tipoAtivo ?? 'acao')
  const [quantidade, setQuantidade] = useState(String(editando?.quantidade ?? ''))
  const [precoCompra, setPrecoCompra] = useState(String(editando?.precoCompra ?? ''))
  const [dataAplicacao, setDataAplicacao] = useState(editando?.dataAplicacao ?? hojeISO())
  const [nome, setNome] = useState(editando?.nome ?? '')

  const [buscando, setBuscando] = useState(false)
  const [precoAtual, setPrecoAtual] = useState<number | null>(null)
  const [naoEncontrado, setNaoEncontrado] = useState(false)

  useEffect(() => {
    const t = ticker.trim().toUpperCase()
    if (t.length < 4) {
      setPrecoAtual(null)
      setNaoEncontrado(false)
      return
    }
    setBuscando(true)
    setNaoEncontrado(false)
    const timeout = setTimeout(async () => {
      const mapa = await buscarPrecosAcoes([t])
      const preco = mapa.get(t) ?? null
      setPrecoAtual(preco)
      setNaoEncontrado(preco === null)
      if (preco !== null && !nome) setNome(t)
      setBuscando(false)
    }, 500)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker])

  const podeSalvar = ticker.trim().length >= 4 && Number(quantidade) > 0 && Number(precoCompra) > 0 && dataAplicacao && nome.trim()

  function salvar() {
    onSalvar({
      id: editando?.id ?? novoId(),
      classe: 'renda-variavel',
      nome: nome.trim(),
      ticker: ticker.trim().toUpperCase(),
      tipoAtivo,
      quantidade: Number(quantidade),
      precoCompra: Number(precoCompra),
      dataAplicacao,
      criadoEm: editando?.criadoEm ?? new Date().toISOString(),
    })
  }

  return (
    <>
      <Campo label="Ticker (ex: PETR4, MXRF11)">
        <div className="relative">
          <input value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} placeholder="PETR4" className={inputClasse} maxLength={8} />
          {buscando && <Loader2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 animate-spin" />}
          {!buscando && precoAtual !== null && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-accent-green font-semibold">
              R$ {precoAtual.toFixed(2)}
            </span>
          )}
        </div>
        {naoEncontrado && (
          <p className="text-[10.5px] text-slate-500">
            Não achei cotação pra esse ticker agora (pode precisar de token da brapi.dev) — dá pra salvar mesmo assim e completar depois.
          </p>
        )}
      </Campo>

      <Campo label="Tipo">
        <div className="flex gap-2">
          {(['acao', 'fii', 'etf'] as TipoAtivoRendaVariavel[]).map((t) => (
            <button
              key={t}
              onClick={() => setTipoAtivo(t)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-semibold border ${
                tipoAtivo === t ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan' : 'border-border text-slate-400'
              }`}
            >
              {t === 'acao' ? 'Ação' : t.toUpperCase()}
            </button>
          ))}
        </div>
      </Campo>

      <Campo label="Nome de exibição">
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Petrobras PN" className={inputClasse} />
      </Campo>

      <div className="grid grid-cols-2 gap-3">
        <Campo label="Quantidade">
          <input value={quantidade} onChange={(e) => setQuantidade(e.target.value)} type="number" inputMode="decimal" placeholder="100" className={inputClasse} />
        </Campo>
        <Campo label="Preço médio pago">
          <input value={precoCompra} onChange={(e) => setPrecoCompra(e.target.value)} type="number" inputMode="decimal" placeholder="32,50" className={inputClasse} />
        </Campo>
      </div>

      <Campo label="Data da aplicação">
        <input value={dataAplicacao} onChange={(e) => setDataAplicacao(e.target.value)} type="date" max={hojeISO()} className={inputClasse} />
      </Campo>

      <BotaoSalvar desabilitado={!podeSalvar} onClick={salvar} />
    </>
  )
}

function FormCripto({
  editando, onSalvar,
}: { editando: Extract<Investimento, { classe: 'cripto' }> | null; onSalvar: (inv: Investimento) => void }) {
  const [coingeckoId, setCoingeckoId] = useState(editando?.coingeckoId ?? CRIPTOS_COMUNS[0].id)
  const [quantidade, setQuantidade] = useState(String(editando?.quantidade ?? ''))
  const [precoCompra, setPrecoCompra] = useState(String(editando?.precoCompra ?? ''))
  const [dataAplicacao, setDataAplicacao] = useState(editando?.dataAplicacao ?? hojeISO())

  const selecionada = CRIPTOS_COMUNS.find((c) => c.id === coingeckoId) ?? CRIPTOS_COMUNS[0]
  const podeSalvar = Number(quantidade) > 0 && Number(precoCompra) > 0 && dataAplicacao

  function salvar() {
    onSalvar({
      id: editando?.id ?? novoId(),
      classe: 'cripto',
      nome: selecionada.nome,
      coingeckoId,
      simbolo: selecionada.simbolo,
      quantidade: Number(quantidade),
      precoCompra: Number(precoCompra),
      dataAplicacao,
      criadoEm: editando?.criadoEm ?? new Date().toISOString(),
    })
  }

  return (
    <>
      <Campo label="Criptomoeda">
        <select value={coingeckoId} onChange={(e) => setCoingeckoId(e.target.value)} className={inputClasse}>
          {CRIPTOS_COMUNS.map((c) => (
            <option key={c.id} value={c.id}>{c.nome} ({c.simbolo})</option>
          ))}
        </select>
      </Campo>

      <div className="grid grid-cols-2 gap-3">
        <Campo label={`Quantidade de ${selecionada.simbolo}`}>
          <input value={quantidade} onChange={(e) => setQuantidade(e.target.value)} type="number" inputMode="decimal" step="any" placeholder="0,05" className={inputClasse} />
        </Campo>
        <Campo label="Preço médio pago (R$)">
          <input value={precoCompra} onChange={(e) => setPrecoCompra(e.target.value)} type="number" inputMode="decimal" placeholder="320000" className={inputClasse} />
        </Campo>
      </div>

      <Campo label="Data da aplicação">
        <input value={dataAplicacao} onChange={(e) => setDataAplicacao(e.target.value)} type="date" max={hojeISO()} className={inputClasse} />
      </Campo>

      <BotaoSalvar desabilitado={!podeSalvar} onClick={salvar} />
    </>
  )
}

const LABEL_INDEXADOR: Record<IndexadorRendaFixa, string> = {
  CDI: '% do CDI',
  SELIC: '% da Selic',
  IPCA: '% ao ano acima do IPCA',
  PREFIXADO: '% ao ano (taxa fixa)',
}

function FormRendaFixa({
  editando, onSalvar,
}: { editando: Extract<Investimento, { classe: 'renda-fixa' }> | null; onSalvar: (inv: Investimento) => void }) {
  const [nome, setNome] = useState(editando?.nome ?? '')
  const [indexador, setIndexador] = useState<IndexadorRendaFixa>(editando?.indexador ?? 'CDI')
  const [taxaContratada, setTaxaContratada] = useState(String(editando?.taxaContratada ?? ''))
  const [valorAplicado, setValorAplicado] = useState(String(editando?.precoCompra ?? ''))
  const [dataAplicacao, setDataAplicacao] = useState(editando?.dataAplicacao ?? hojeISO())
  const [dataVencimento, setDataVencimento] = useState(editando?.dataVencimento ?? '')

  const [titulos, setTitulos] = useState<TituloTesouro[]>([])
  const [carregandoTesouro, setCarregandoTesouro] = useState(false)
  const [mostrarTesouro, setMostrarTesouro] = useState(false)

  async function abrirBuscaTesouro() {
    setMostrarTesouro(true)
    if (titulos.length === 0) {
      setCarregandoTesouro(true)
      const lista = await buscarTesouroDireto()
      setTitulos(lista)
      setCarregandoTesouro(false)
    }
  }

  function escolherTitulo(t: TituloTesouro) {
    setNome(t.nome)
    setIndexador(t.indexador)
    setTaxaContratada(String(t.taxaAnual || ''))
    setDataVencimento(t.vencimento || '')
    setMostrarTesouro(false)
  }

  const podeSalvar = nome.trim() && Number(taxaContratada) > 0 && Number(valorAplicado) > 0 && dataAplicacao

  function salvar() {
    onSalvar({
      id: editando?.id ?? novoId(),
      classe: 'renda-fixa',
      nome: nome.trim(),
      indexador,
      taxaContratada: Number(taxaContratada),
      quantidade: 1,
      precoCompra: Number(valorAplicado),
      dataAplicacao,
      dataVencimento: dataVencimento || null,
      criadoEm: editando?.criadoEm ?? new Date().toISOString(),
    })
  }

  return (
    <>
      {!editando && (
        <button
          onClick={abrirBuscaTesouro}
          className="w-full flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 px-3.5 py-3 text-[12.5px] text-accent-cyan font-semibold mb-3.5"
        >
          <Search size={14} /> Buscar título do Tesouro Direto
        </button>
      )}

      {mostrarTesouro && (
        <div className="rounded-xl border border-border bg-bg-card p-3 mb-3.5 max-h-[220px] overflow-y-auto">
          {carregandoTesouro ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
              <Loader2 size={13} className="animate-spin" /> Buscando títulos…
            </div>
          ) : titulos.length === 0 ? (
            <p className="text-[11.5px] text-slate-500 py-2">
              Não consegui buscar a lista agora. Sem problema — preencha os campos abaixo manualmente com os dados do seu título (extrato do Tesouro Direto ou do seu banco).
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {titulos.map((t) => (
                <button key={t.slug} onClick={() => escolherTitulo(t)} className="text-left px-2 py-2 rounded-lg hover:bg-white/5">
                  <p className="text-[12px] font-semibold text-white">{t.nome}</p>
                  <p className="text-[10.5px] text-slate-500">Vence {t.vencimento || '—'} · {t.taxaAnual}% a.a.</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Campo label="Nome do título">
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: CDB Banco X, Tesouro Selic 2029" className={inputClasse} />
      </Campo>

      <Campo label="Indexador">
        <div className="grid grid-cols-4 gap-1.5">
          {(Object.keys(LABEL_INDEXADOR) as IndexadorRendaFixa[]).map((i) => (
            <button
              key={i}
              onClick={() => setIndexador(i)}
              className={`rounded-lg py-2 text-[10.5px] font-semibold border ${
                indexador === i ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan' : 'border-border text-slate-400'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </Campo>

      <Campo label={`Taxa contratada (${LABEL_INDEXADOR[indexador]})`}>
        <input value={taxaContratada} onChange={(e) => setTaxaContratada(e.target.value)} type="number" inputMode="decimal" placeholder={indexador === 'CDI' ? '110' : '6'} className={inputClasse} />
      </Campo>

      <Campo label="Valor aplicado (R$)">
        <input value={valorAplicado} onChange={(e) => setValorAplicado(e.target.value)} type="number" inputMode="decimal" placeholder="5000" className={inputClasse} />
      </Campo>

      <div className="grid grid-cols-2 gap-3">
        <Campo label="Data da aplicação">
          <input value={dataAplicacao} onChange={(e) => setDataAplicacao(e.target.value)} type="date" max={hojeISO()} className={inputClasse} />
        </Campo>
        <Campo label="Vencimento (opcional)">
          <input value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} type="date" className={inputClasse} />
        </Campo>
      </div>

      <BotaoSalvar desabilitado={!podeSalvar} onClick={salvar} />
    </>
  )
}
