import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Check, AlertTriangle, FileDown } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { formatMoeda } from '../formatMoeda'
import type { Transacao } from '../types'
import { parseArquivoExtrato, type TransacaoImportada } from './parsers'

function novoId() {
  return `tx-import-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function ImportarExtratoPage() {
  const { estado, importarTransacoes } = useGestaoFinanceira()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const [contaId, setContaId] = useState<string | null>(estado.contas.find((c) => c.principal)?.id ?? estado.contas[0]?.id ?? null)
  const [nomeArquivo, setNomeArquivo] = useState<string | null>(null)
  const [prevendo, setPrevendo] = useState<TransacaoImportada[]>([])
  const [avisos, setAvisos] = useState<string[]>([])
  const [selecionadas, setSelecionadas] = useState<Set<number>>(new Set())
  const [importado, setImportado] = useState(false)

  function lerArquivo(file: File) {
    const leitor = new FileReader()
    leitor.onload = () => {
      const conteudo = String(leitor.result ?? '')
      const resultado = parseArquivoExtrato(file.name, conteudo)
      setNomeArquivo(file.name)
      setPrevendo(resultado.transacoes)
      setAvisos(resultado.avisos)
      setSelecionadas(new Set(resultado.transacoes.map((_, i) => i))) // tudo marcado por padrão — a pessoa desmarca o que não quer
      setImportado(false)
    }
    leitor.readAsText(file, 'utf-8')
  }

  function alternarSelecao(i: number) {
    setSelecionadas((prev) => {
      const nova = new Set(prev)
      if (nova.has(i)) nova.delete(i)
      else nova.add(i)
      return nova
    })
  }

  function confirmarImportacao() {
    const escolhidas = prevendo.filter((_, i) => selecionadas.has(i))
    const transacoes: Transacao[] = escolhidas.map((t) => ({
      id: novoId(),
      tipo: t.tipo,
      valor: t.valor,
      data: t.data,
      hora: '12:00',
      descricao: t.descricao,
      categoriaId: null, // a pessoa categoriza depois, editando cada lançamento — evita adivinhar errado
      contaId,
      cartaoId: null,
      formaPagamento: 'outro',
      pago: true,
      criadaEm: new Date().toISOString(),
    }))
    importarTransacoes(transacoes)
    setImportado(true)
  }

  const totalSelecionado = prevendo.filter((_, i) => selecionadas.has(i)).reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : -t.valor), 0)

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Importar extrato"
        subtitulo="CSV ou OFX do seu banco"
        icone={FileDown}
        corIcone="#00D4FF"
        voltarPara="/gestao-financeira/lancamentos"
      />

      <div className="px-4 mt-4">
        <p className="text-xs text-slate-500 -mt-2 mb-4">
          Exporta o extrato no app/site do seu banco (CSV ou OFX) e importa aqui — sem precisar conectar a conta de verdade.
        </p>
        {importado ? (
          <div className="card-surface rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-green/15 flex items-center justify-center mx-auto mb-3">
              <Check size={22} className="text-accent-green" />
            </div>
            <p className="text-sm font-semibold text-white mb-1">
              {selecionadas.size} lançamento{selecionadas.size === 1 ? '' : 's'} importado{selecionadas.size === 1 ? '' : 's'}!
            </p>
            <p className="text-xs text-slate-500 mb-4">Eles já aparecem na tela de Lançamentos, sem categoria — é só ajustar quando quiser.</p>
            <button onClick={() => navigate('/gestao-financeira/lancamentos')} className="rounded-full bg-accent-cyan text-black text-sm font-semibold px-5 py-2.5">
              Voltar pra Gestão Financeira
            </button>
          </div>
        ) : (
          <>
            {/* Conta destino */}
            <div className="mb-4">
              <label className="text-[11.5px] text-slate-500 font-medium mb-1.5 block">Importar pra qual conta?</label>
              <select
                value={contaId ?? ''}
                onChange={(e) => setContaId(e.target.value || null)}
                className="w-full card-surface rounded-2xl px-4 py-3 text-[13px] text-white border border-border focus:outline-none focus:border-accent-cyan"
              >
                {estado.contas.length === 0 && <option value="">Nenhuma conta cadastrada ainda</option>}
                {estado.contas.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            {/* Upload */}
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.ofx,text/csv,application/x-ofx,.txt"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && lerArquivo(e.target.files[0])}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border py-8 mb-4"
            >
              <Upload size={22} className="text-accent-cyan" />
              <span className="text-[13px] font-semibold text-white">{nomeArquivo ?? 'Escolher arquivo CSV ou OFX'}</span>
              <span className="text-[11px] text-slate-500">Baixa esse arquivo no app/site do seu banco, em "Extrato" → "Exportar"</span>
            </button>

            {avisos.length > 0 && (
              <div className="rounded-xl border border-accent-gold/30 bg-accent-gold/5 p-3 mb-4 flex gap-2">
                <AlertTriangle size={14} className="text-accent-gold shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-400">
                  {avisos.length} linha{avisos.length === 1 ? '' : 's'} do arquivo não {avisos.length === 1 ? 'foi entendida' : 'foram entendidas'} e {avisos.length === 1 ? 'foi' : 'foram'} ignorada{avisos.length === 1 ? '' : 's'} — o resto importa normalmente.
                </div>
              </div>
            )}

            {prevendo.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[12.5px] font-bold text-white">
                    {selecionadas.size} de {prevendo.length} selecionado{prevendo.length === 1 ? '' : 's'}
                  </p>
                  <p className={`text-[12.5px] font-bold ${totalSelecionado >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatMoeda(totalSelecionado, estado)}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 mb-5 max-h-[340px] overflow-y-auto">
                  {prevendo.map((t, i) => {
                    const marcado = selecionadas.has(i)
                    return (
                      <button
                        key={i}
                        onClick={() => alternarSelecao(i)}
                        className="flex items-center gap-2.5 rounded-xl p-2.5 text-left"
                        style={{ background: marcado ? 'rgba(0,212,255,0.06)' : 'transparent', opacity: marcado ? 1 : 0.45 }}
                      >
                        <div
                          className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0"
                          style={{ borderColor: marcado ? '#00D4FF' : '#1C2740', background: marcado ? '#00D4FF' : 'transparent' }}
                        >
                          {marcado && <Check size={13} className="text-black" />}
                        </div>
                        <FileText size={14} className="text-slate-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] text-white truncate">{t.descricao}</p>
                          <p className="text-[10.5px] text-slate-500">{new Date(t.data + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
                        </div>
                        <span className={`text-[12.5px] font-bold shrink-0 ${t.tipo === 'receita' ? 'text-accent-green' : 'text-accent-red'}`}>
                          {t.tipo === 'receita' ? '+' : '-'} {formatMoeda(t.valor, estado)}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={confirmarImportacao}
                  disabled={selecionadas.size === 0 || !contaId}
                  className="w-full rounded-full bg-accent-cyan text-black font-semibold py-3.5 text-sm disabled:opacity-50"
                >
                  Importar {selecionadas.size} lançamento{selecionadas.size === 1 ? '' : 's'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
