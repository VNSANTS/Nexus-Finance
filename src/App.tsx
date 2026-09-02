import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import Onboarding from '@/components/Onboarding'
import ErrorBoundary from '@/components/ErrorBoundary'
import HomePage from '@/pages/HomePage'
import { useUserProgress } from '@/hooks/useUserProgress'
import GfTransicao from '@/gestao-financeira/components/GfTransicao'

// A Home entra no bundle inicial (é a primeira tela). O resto é carregado ao
// navegar: cada tela vira um chunk próprio, então abrir o app não custa mais
// baixar a Biblioteca inteira, o Glossário e as calculadoras junto.
const AprenderPage = lazy(() => import('@/pages/AprenderPage'))
const ModuloPage = lazy(() => import('@/pages/ModuloPage'))
const CarteiraPage = lazy(() => import('@/pages/CarteiraPage'))
const FerramentasPage = lazy(() => import('@/pages/FerramentasPage'))
const PerfilPage = lazy(() => import('@/pages/PerfilPage'))
const BibliotecaPage = lazy(() => import('@/pages/BibliotecaPage'))
const GlossarioPage = lazy(() => import('@/pages/GlossarioPage'))
const MercadoPage = lazy(() => import('@/pages/MercadoPage'))
const InvestidorPage = lazy(() => import('@/pages/InvestidorPage'))
const RevisaoPage = lazy(() => import('@/pages/RevisaoPage'))
const BuscaPage = lazy(() => import('@/pages/BuscaPage'))
const DesafioDiarioPage = lazy(() => import('@/pages/DesafioDiarioPage'))
const GestaoFinanceiraShell = lazy(() => import('@/gestao-financeira/GestaoFinanceiraShell'))

function TelaCarregando() {
  return (
    <div className="px-4 pt-6 flex flex-col gap-3" aria-busy="true" aria-label="Carregando">
      <div className="h-6 w-40 rounded bg-bg-card animate-pulse" />
      <div className="h-3 w-56 rounded bg-bg-card animate-pulse" />
      <div className="h-28 w-full rounded-card bg-bg-card animate-pulse mt-3" />
      <div className="h-28 w-full rounded-card bg-bg-card animate-pulse" />
    </div>
  )
}

function NaoEncontrada() {
  return (
    <div className="px-6 pt-24 text-center flex flex-col items-center gap-3">
      <h1 className="text-lg font-display font-extrabold text-white">Página não encontrada</h1>
      <p className="text-sm text-slate-400">O link que você abriu não existe mais.</p>
      <Link to="/" className="mt-3 text-accent-cyan text-sm font-semibold">
        Voltar para a Home
      </Link>
    </div>
  )
}

// Detecta a troca de "app" (dentro vs fora de /gestao-financeira) e dispara
// a cortina de transição por cima de tudo. Fica de olho na URL em vez de
// exigir que cada botão de entrada/saída dispare isso manualmente — assim
// funciona também com o botão "voltar" do navegador/gesto do celular.
function useTransicaoGestaoFinanceira() {
  const location = useLocation()
  const dentroDeGf = location.pathname.startsWith('/gestao-financeira')
  const eraDentroRef = useRef(dentroDeGf)
  const [transicao, setTransicao] = useState<{ ativa: boolean; destino: 'entrando' | 'saindo' }>({
    ativa: false,
    destino: 'entrando',
  })

  useEffect(() => {
    if (dentroDeGf !== eraDentroRef.current) {
      setTransicao({ ativa: true, destino: dentroDeGf ? 'entrando' : 'saindo' })
      const timer = setTimeout(() => setTransicao((t) => ({ ...t, ativa: false })), 5000)
      eraDentroRef.current = dentroDeGf
      return () => clearTimeout(timer)
    }
    eraDentroRef.current = dentroDeGf
  }, [dentroDeGf])

  return transicao
}

function AppRotas() {
  const transicao = useTransicaoGestaoFinanceira()

  return (
    <>
      <GfTransicao ativa={transicao.ativa} destino={transicao.destino} />
      <ErrorBoundary>
        <Suspense fallback={<TelaCarregando />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aprender" element={<AprenderPage />} />
            <Route path="/modulo/:id" element={<ModuloPage />} />
            <Route path="/mercado" element={<MercadoPage />} />
            <Route path="/biblioteca" element={<BibliotecaPage />} />
            <Route path="/glossario" element={<GlossarioPage />} />
            <Route path="/carteira" element={<CarteiraPage />} />
            <Route path="/ferramentas" element={<FerramentasPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/investidor" element={<InvestidorPage />} />
            <Route path="/revisao" element={<RevisaoPage />} />
            <Route path="/busca" element={<BuscaPage />} />
            <Route path="/desafio-diario" element={<DesafioDiarioPage />} />
            <Route path="/gestao-financeira/*" element={<GestaoFinanceiraShell />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default function App() {
  const { progress, setOnboardingDone } = useUserProgress()
  const location = useLocation()
  const dentroDeGf = location.pathname.startsWith('/gestao-financeira')

  if (!progress.onboardingDone) {
    return (
      <div className="max-w-[480px] mx-auto min-h-dvh relative bg-bg">
        <Onboarding onFinalizar={setOnboardingDone} />
      </div>
    )
  }

  return (
    <div className="max-w-[480px] mx-auto min-h-dvh relative bg-bg">
      <AppRotas />
      {!dentroDeGf && <BottomNav />}
    </div>
  )
}
