import { useMemo, useState } from 'react'
import {
  PartyPopper, TrendingUp, TrendingDown, Trophy, Frown, Sparkles, Receipt,
  Download, Image as ImageIcon, ChevronLeft, ChevronRight,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { retrospectivaAnual } from '../relatorios'
import { exportarComoImagem, exportarComoPdf } from '../exportar'
import { formatMoeda } from '../formatMoeda'
import { iconePorNome } from '../iconMap'

// Retrospectiva anual — um "resumo do ano" no estilo Spotify Wrapped, só que
// com os números financeiros da pessoa. Usa os mesmos dados de sempre
// (transações + categorias), sem nenhuma fonte nova.
export default function GfRetrospectivaPage() {
  const { estado } = useGestaoFinanceira()
  const [ano, setAno] = useState(new Date().getFullYear())
  const [exportando, setExportando] = useState<'pdf' | 'imagem' | null>(null)

  const retro = useMemo(() => retrospectivaAnual(estado.transacoes, estado.categorias, ano), [estado.transacoes, estado.categorias, ano])

  const anoAtual = new Date().getFullYear()
  const CategoriaIcone = retro.categoriaTop ? iconePorNome(retro.categoriaTop.categoria.icone) : Sparkles

  async function exportarImagem() {
    setExportando('imagem')
    try {
      await exportarComoImagem('gf-retrospectiva-conteudo', `nexus-retrospectiva-${ano}`)
    } catch {
      alert('Não foi possível gerar a imagem agora. Tenta de novo em alguns segundos.')
    } finally {
      setExportando(null)
    }
  }

  async function exportarPdf() {
    setExportando('pdf')
    try {
      await exportarComoPdf('gf-retrospectiva-conteudo', `nexus-retrospectiva-${ano}`)
    } catch {
      alert('Não foi possível gerar o PDF agora. Tenta de novo em alguns segundos.')
    } finally {
      setExportando(null)
    }
  }

  return (
    <div className="pb-28">
      <GfHeader
        titulo="Retrospectiva"
        subtitulo="O resumo financeiro do seu ano"
        icone={PartyPopper}
        corIcone="#8B5CF6"
        voltarPara="/gestao-financeira/relatorios"
      />

      {/* Navegação entre anos */}
      <div className="px-4 mt-3 flex items-center justify-center gap-4">
        <button
          onClick={() => setAno((a) => a - 1)}
          className="w-8 h-8 rounded-full card-surface flex items-center justify-center"
          aria-label="Ano anterior"
        >
          <ChevronLeft size={16} className="text-slate-400" />
        </button>
        <p className="text-[18px] font-display font-extrabold text-white w-16 text-center">{ano}</p>
        <button
          onClick={() => setAno((a) => Math.min(anoAtual, a + 1))}
          disabled={ano >= anoAtual}
          className="w-8 h-8 rounded-full card-surface flex items-center justify-center disabled:opacity-40"
          aria-label="Próximo ano"
        >
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      </div>

      <div id="gf-retrospectiva-conteudo" className="bg-bg">

      {retro.totalLancamentos === 0 ? (
        <div className="px-4 mt-6">
          <div className="card-surface rounded-[20px] p-6 text-center">
            <Sparkles size={28} className="text-slate-600 mx-auto mb-2" />
            <p className="text-[13px] text-slate-400">Nenhum lançamento encontrado em {ano} ainda.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Card: destaque — quanto sobrou no ano */}
          <div className="px-4 mt-5">
            <div className="card-surface rounded-[24px] p-5 text-center bg-gradient-to-b from-[#8B5CF6]/10 to-transparent">
              <p className="text-[12px] text-slate-400 mb-1">Em {ano}, você economizou</p>
              <p className={`text-[32px] font-display font-extrabold ${retro.totalEconomizado >= 0 ? 'text-[#8B5CF6]' : 'text-accent-red'}`}>
                {formatMoeda(retro.totalEconomizado, estado)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                em média {formatMoeda(retro.mediaEconomiaMensal, estado)} por mês, ao longo de {retro.mesesComDados} {retro.mesesComDados === 1 ? 'mês' : 'meses'}
              </p>
            </div>
          </div>

          {/* Grid: receitas x despesas do ano */}
          <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
            <div className="card-surface rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp size={13} className="text-accent-green" />
                <p className="text-[11px] text-slate-500 font-medium">Total recebido</p>
              </div>
              <p className="text-[16px] font-display font-extrabold text-accent-green">{formatMoeda(retro.totalReceitas, estado)}</p>
            </div>
            <div className="card-surface rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingDown size={13} className="text-accent-red" />
                <p className="text-[11px] text-slate-500 font-medium">Total gasto</p>
              </div>
              <p className="text-[16px] font-display font-extrabold text-accent-red">{formatMoeda(retro.totalDespesas, estado)}</p>
            </div>
          </div>

          {/* Melhor e pior mês */}
          <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
            <div className="card-surface rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Trophy size={13} className="text-accent-gold" />
                <p className="text-[11px] text-slate-500 font-medium">Melhor mês</p>
              </div>
              {retro.melhorMes ? (
                <>
                  <p className="text-[14px] font-bold text-white capitalize">{retro.melhorMes.label}</p>
                  <p className="text-[11px] text-accent-green mt-0.5">{formatMoeda(retro.melhorMes.receitas - retro.melhorMes.despesas, estado)}</p>
                </>
              ) : (
                <p className="text-[12px] text-slate-500">—</p>
              )}
            </div>
            <div className="card-surface rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Frown size={13} className="text-accent-red" />
                <p className="text-[11px] text-slate-500 font-medium">Mês mais apertado</p>
              </div>
              {retro.piorMes ? (
                <>
                  <p className="text-[14px] font-bold text-white capitalize">{retro.piorMes.label}</p>
                  <p className="text-[11px] text-accent-red mt-0.5">{formatMoeda(retro.piorMes.receitas - retro.piorMes.despesas, estado)}</p>
                </>
              ) : (
                <p className="text-[12px] text-slate-500">—</p>
              )}
            </div>
          </div>

          {/* Categoria campeã de gastos */}
          {retro.categoriaTop && (
            <div className="px-4 mt-3">
              <div className="card-surface rounded-[20px] p-4 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${retro.categoriaTop.categoria.cor}22` }}>
                  <CategoriaIcone size={22} style={{ color: retro.categoriaTop.categoria.cor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-500">Categoria onde mais gastou</p>
                  <p className="text-[15px] font-bold text-white truncate">{retro.categoriaTop.categoria.nome}</p>
                </div>
                <p className="text-[15px] font-display font-extrabold text-white shrink-0">{formatMoeda(retro.categoriaTop.total, estado)}</p>
              </div>
            </div>
          )}

          {/* Maior gasto único do ano */}
          {retro.maiorGastoUnico && (
            <div className="px-4 mt-3">
              <div className="card-surface rounded-[20px] p-4 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-accent-red/15 flex items-center justify-center shrink-0">
                  <Receipt size={20} className="text-accent-red" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-500">Maior gasto único do ano</p>
                  <p className="text-[13px] font-semibold text-white truncate">{retro.maiorGastoUnico.descricao || '(sem descrição)'}</p>
                </div>
                <p className="text-[15px] font-display font-extrabold text-white shrink-0">{formatMoeda(retro.maiorGastoUnico.valor, estado)}</p>
              </div>
            </div>
          )}

          {/* Total de lançamentos */}
          <div className="px-4 mt-3">
            <div className="card-surface rounded-[20px] p-4 text-center">
              <p className="text-[22px] font-display font-extrabold text-white">{retro.totalLancamentos}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">lançamentos registrados em {ano}</p>
            </div>
          </div>
        </>
      )}

      </div>
      {/* fim da área exportável */}

      {retro.totalLancamentos > 0 && (
        <div className="px-4 mt-4 flex gap-2">
          <button
            onClick={exportarImagem}
            disabled={exportando !== null}
            className="flex-1 flex items-center justify-center gap-2 card-surface rounded-2xl py-3 text-[13px] font-semibold text-slate-300 disabled:opacity-60"
          >
            <ImageIcon size={15} /> {exportando === 'imagem' ? 'Gerando...' : 'Imagem'}
          </button>
          <button
            onClick={exportarPdf}
            disabled={exportando !== null}
            className="flex-1 flex items-center justify-center gap-2 card-surface rounded-2xl py-3 text-[13px] font-semibold text-slate-300 disabled:opacity-60"
          >
            <Download size={15} /> {exportando === 'pdf' ? 'Gerando...' : 'PDF'}
          </button>
        </div>
      )}
    </div>
  )
}
