import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GestaoFinanceiraProvider, useGestaoFinanceira } from './GestaoFinanceiraContext'
import GfBottomNav from './components/GfBottomNav'
import GfPrivacyOverlay from './components/GfPrivacyOverlay'
import GfBloqueioOverlay from './components/GfBloqueioOverlay'
import GfPrimeiroAcesso from './pages/GfPrimeiroAcesso'

const GfHomePage = lazy(() => import('./pages/GfHomePage'))
const GfLancamentosPage = lazy(() => import('./pages/GfLancamentosPage'))
const GfContasCartoesPage = lazy(() => import('./pages/GfContasCartoesPage'))
const GfDividasPage = lazy(() => import('./pages/GfDividasPage'))
const GfMetasPage = lazy(() => import('./pages/GfMetasPage'))
const GfOrcamentoPage = lazy(() => import('./pages/GfOrcamentoPage'))
const GfCategoriasPage = lazy(() => import('./pages/GfCategoriasPage'))
const GfConfiguracoesGeraisPage = lazy(() => import('./pages/GfConfiguracoesGeraisPage'))
const GfAcessibilidadePage = lazy(() => import('./pages/GfAcessibilidadePage'))
const GfInvestidorPage = lazy(() => import('./pages/GfInvestidorPage'))
const GfRelatoriosPage = lazy(() => import('./pages/GfRelatoriosPage'))
const GfMovimentacoesPage = lazy(() => import('./pages/GfMovimentacoesPage'))
const GfDetalheMovimentacaoPage = lazy(() => import('./pages/GfDetalheMovimentacaoPage'))
const GfRetrospectivaPage = lazy(() => import('./pages/GfRetrospectivaPage'))
const GfNotificacoesPage = lazy(() => import('./pages/GfNotificacoesPage'))
const GfNotificacoesConfigPage = lazy(() => import('./pages/GfNotificacoesConfigPage'))
const GfMaisPage = lazy(() => import('./pages/GfMaisPage'))
const GfFamiliaPerfisPage = lazy(() => import('./pages/GfFamiliaPerfisPage'))
const GfSegurancaPage = lazy(() => import('./pages/GfSegurancaPage'))
const GfPrivacidadePage = lazy(() => import('./pages/GfPrivacidadePage'))
const GfDadosBackupPage = lazy(() => import('./pages/GfDadosBackupPage'))
const GfSobrePage = lazy(() => import('./pages/GfSobrePage'))

function GfCarregando() {
  return (
    <div className="px-4 pt-6 flex flex-col gap-3" aria-busy="true" aria-label="Carregando">
      <div className="h-6 w-40 rounded bg-bg-card animate-pulse" />
      <div className="h-3 w-56 rounded bg-bg-card animate-pulse" />
      <div className="h-28 w-full rounded-card bg-bg-card animate-pulse mt-3" />
      <div className="h-28 w-full rounded-card bg-bg-card animate-pulse" />
    </div>
  )
}

// A "raiz" da Gestão Financeira: um app dentro do app, com estado, tema visual
// e navegação próprios. Tudo que está aqui dentro é isolado do restante do
// Nexus Finance — só compartilha o mesmo bundle e o container de 480px.
export default function GestaoFinanceiraShell() {
  return (
    <GestaoFinanceiraProvider>
      <GestaoFinanceiraConteudo />
    </GestaoFinanceiraProvider>
  )
}

function GestaoFinanceiraConteudo() {
  const { estado, marcarPrimeiroAcesso } = useGestaoFinanceira()

  if (!estado.primeiroAcessoFeito) {
    return <GfPrimeiroAcesso aoConcluir={marcarPrimeiroAcesso} />
  }

  return (
    <>
      <div className="pb-[80px]">
        <Suspense fallback={<GfCarregando />}>
          <Routes>
            <Route index element={<GfHomePage />} />
            <Route path="lancamentos" element={<GfLancamentosPage />} />
            <Route path="lancamentos/novo" element={<GfLancamentosPage novoAberto />} />
            <Route path="contas-cartoes" element={<GfContasCartoesPage />} />
            <Route path="dividas" element={<GfDividasPage />} />
            <Route path="metas" element={<GfMetasPage />} />
            <Route path="orcamento" element={<GfOrcamentoPage />} />
            <Route path="categorias" element={<GfCategoriasPage />} />
            <Route path="configuracoes-gerais" element={<GfConfiguracoesGeraisPage />} />
            <Route path="acessibilidade" element={<GfAcessibilidadePage />} />
            <Route path="investidor" element={<GfInvestidorPage />} />
            <Route path="relatorios" element={<GfRelatoriosPage />} />
            <Route path="movimentacoes" element={<GfMovimentacoesPage />} />
            <Route path="movimentacoes/:id" element={<GfDetalheMovimentacaoPage />} />
            <Route path="retrospectiva" element={<GfRetrospectivaPage />} />
            <Route path="notificacoes" element={<GfNotificacoesPage />} />
            <Route path="notificacoes/configurar" element={<GfNotificacoesConfigPage />} />
            <Route path="mais" element={<GfMaisPage />} />
            <Route path="familia-perfis" element={<GfFamiliaPerfisPage />} />
            <Route path="seguranca" element={<GfSegurancaPage />} />
            <Route path="privacidade" element={<GfPrivacidadePage />} />
            <Route path="dados-backup" element={<GfDadosBackupPage />} />
            <Route path="sobre" element={<GfSobrePage />} />
          </Routes>
        </Suspense>
      </div>
      <GfBottomNav />
      <GfPrivacyOverlay />
      <GfBloqueioOverlay />
    </>
  )
}
