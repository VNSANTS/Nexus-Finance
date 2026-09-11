import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import NexusAIChat from '@/nexus-ai/NexusAIChat'
import FundoPersonalizado from '@/components/FundoPersonalizado'
import Onboarding from '@/components/Onboarding'
import ErrorBoundary from '@/components/ErrorBoundary'
import HomePage from '@/pages/HomePage'
import { useUserProgress } from '@/hooks/useUserProgress'
import { usePresenca } from '@/hooks/usePresenca'
import { useAuth } from '@/auth/AuthContext'
import AvisoEmailNaoConfirmado from '@/auth/AvisoEmailNaoConfirmado'
import InstalarAppObrigatorio from '@/components/InstalarAppObrigatorio'
import { usePwaInstall } from '@/hooks/usePwaInstall'
import { useAgendadorNotificacoesAprender } from '@/lib/notificacoesAprender'
import GfTransicao from '@/gestao-financeira/components/GfTransicao'
import { RotaAdmin, RotaProtegida } from '@/auth/RotaProtegida'

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
const NotificacoesConfigPage = lazy(() => import('@/pages/NotificacoesConfigPage'))
const PersonalizacaoPage = lazy(() => import('@/pages/PersonalizacaoPage'))
const GestaoFinanceiraShell = lazy(() => import('@/gestao-financeira/GestaoFinanceiraShell'))
const AdminUsuariosPage = lazy(() => import('@/admin/AdminUsuariosPage'))
const NexusAIPage = lazy(() => import('@/pages/NexusAIPage'))
const LoginPage = lazy(() => import('@/auth/LoginPage'))
const RedefinirSenhaPage = lazy(() => import('@/auth/RedefinirSenhaPage'))

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/redefinir-senha" element={<RedefinirSenhaPage />} />
            <Route
              path="/*"
              element={
                <RotaProtegida>
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
                    <Route path="/notificacoes" element={<NotificacoesConfigPage />} />
                    <Route path="/personalizacao" element={<PersonalizacaoPage />} />
                    <Route path="/nexus-ai" element={<NexusAIPage />} />
                    <Route path="/gestao-financeira/*" element={<GestaoFinanceiraShell />} />
                    <Route
                      path="/admin/usuarios"
                      element={
                        <RotaAdmin>
                          <AdminUsuariosPage />
                        </RotaAdmin>
                      }
                    />
                    <Route path="*" element={<NaoEncontrada />} />
                  </Routes>
                </RotaProtegida>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default function App() {
  const { progress, setOnboardingDone } = useUserProgress()
  const { sessao } = useAuth()
  const { ehStandalone } = usePwaInstall()
  const location = useLocation()
  const dentroDeGf = location.pathname.startsWith('/gestao-financeira')

  usePresenca(sessao?.user?.id)

  // Roda em segundo plano (checagem a cada 60s + ao voltar o foco) enquanto
  // o app estiver aberto — ver src/lib/notificacoesAprender.ts para o motor
  // e a ressalva sobre agendamento fora do app (sem Service Worker próprio).
  // Precisa ficar ANTES de qualquer return condicional abaixo (regra dos
  // hooks: sempre chamados na mesma ordem, nunca só às vezes).
  useAgendadorNotificacoesAprender(progress, progress.preferenciasNotificacoesAprender)

  // Bloqueio obrigatório: ninguém vê o resto do app (nem o login) sem
  // instalar primeiro. Único jeito de passar por aqui é rodando em modo
  // standalone (app instalado) — ver src/hooks/usePwaInstall.ts.
  if (!ehStandalone) {
    return <InstalarAppObrigatorio />
  }

  // Antes usava `bg-bg` (Tailwind, var(--cor-bg)) aqui — opaco, cobria o
  // `body` por baixo. O `body` já provê o fundo geral do app via
  // `--bg-fundo-app` (sólido, degradê ou imagem, ver globals.css e
  // useTheme.tsx), então este wrapper agora fica transparente pra deixar
  // esse fundo aparecer. Ver PROXIMA_SESSAO.md, "Sessão A"/"Sessão D", pro
  // histórico desse ajuste. Cards continuam opacos via `--cor-bg-card`
  // (`card-surface`), então nenhuma tela fica com texto sobre fundo errado.
  if (!progress.onboardingDone) {
    return (
      <>
        <FundoPersonalizado />
        {/* h-dvh + overflow-hidden (em vez de min-h-dvh): o container NUNCA
            cresce com o conteúdo, sempre exatamente a altura da tela. Isso é
            o que faz o `transform` abaixo funcionar direito pros elementos
            fixed (Onboarding usa "Pular"/"Próximo" fixos na base) — sem
            isso, um "fixed" dentro de um container mais alto que a tela
            gruda no fim do CONTAINER, não no fim da TELA visível. */}
        <div
          className="max-w-[480px] mx-auto h-dvh relative bg-transparent overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <Onboarding onFinalizar={setOnboardingDone} />
        </div>
      </>
    )
  }

  const rotaSemChrome = location.pathname === '/login' || location.pathname === '/redefinir-senha'

  return (
    <>
      <FundoPersonalizado />
      {/* Mesma lógica do onboarding acima: h-dvh fixo + transform cria o
          "containing block" certo pros elementos fixed (BottomNav, botão do
          Nexus AI, avisos) — presos à TELA visível e limitados aos 480px do
          app, nunca "fugindo" pro resto de uma janela larga (PC) nem
          escorregando pro fim do conteúdo quando a página é longa. O
          conteúdo em si (AppRotas) rola numa div interna separada. */}
      <div
        className="max-w-[480px] mx-auto h-dvh relative bg-transparent overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="h-full overflow-y-auto">
          {!rotaSemChrome && <AvisoEmailNaoConfirmado />}
          <AppRotas />
        </div>
        {!dentroDeGf && !rotaSemChrome && <BottomNav />}
        {!dentroDeGf && !rotaSemChrome && <NexusAIChat />}
      </div>
    </>
  )
}
