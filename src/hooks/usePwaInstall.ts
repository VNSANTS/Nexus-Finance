import { useEffect, useState } from 'react'

type EventoInstalacao = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

export type PlataformaPwa = 'ios' | 'android' | 'desktop'

function detectarPlataforma(): PlataformaPwa {
  const ua = navigator.userAgent
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  return 'desktop'
}

// Navegadores embutidos de apps (Instagram, Facebook, TikTok etc.) — não
// suportam instalação de PWA de jeito nenhum, mesmo no Android/Chrome por
// baixo dos panos. A única saída é abrir no navegador de verdade.
function ehNavegadorEmbutido(): boolean {
  const ua = navigator.userAgent.toLowerCase()
  return ['instagram', 'fban', 'fbav', 'tiktok', 'line/', 'micromessenger'].some((marca) => ua.includes(marca))
}

function ehStandaloneAgora(): boolean {
  const iosStandalone = (navigator as unknown as { standalone?: boolean }).standalone
  return window.matchMedia('(display-mode: standalone)').matches || iosStandalone === true
}

export function usePwaInstall() {
  const [ehStandalone, setEhStandalone] = useState(ehStandaloneAgora)
  const [promptNativo, setPromptNativo] = useState<EventoInstalacao | null>(null)
  const [instalando, setInstalando] = useState(false)

  useEffect(() => {
    function aoTerPrompt(e: Event) {
      e.preventDefault()
      setPromptNativo(e as EventoInstalacao)
    }
    function aoInstalar() {
      setEhStandalone(true)
    }
    window.addEventListener('beforeinstallprompt', aoTerPrompt)
    window.addEventListener('appinstalled', aoInstalar)

    // display-mode pode mudar em tempo real (ex: pessoa instala em outra
    // aba e volta) — escuta em vez de checar só uma vez no mount.
    const mql = window.matchMedia('(display-mode: standalone)')
    const aoMudarDisplay = () => setEhStandalone(ehStandaloneAgora())
    mql.addEventListener('change', aoMudarDisplay)

    return () => {
      window.removeEventListener('beforeinstallprompt', aoTerPrompt)
      window.removeEventListener('appinstalled', aoInstalar)
      mql.removeEventListener('change', aoMudarDisplay)
    }
  }, [])

  async function instalar() {
    if (!promptNativo) return
    setInstalando(true)
    await promptNativo.prompt()
    await promptNativo.userChoice
    setPromptNativo(null)
    setInstalando(false)
  }

  return {
    ehStandalone,
    plataforma: detectarPlataforma(),
    navegadorEmbutido: ehNavegadorEmbutido(),
    podeInstalarNativo: promptNativo !== null,
    instalando,
    instalar,
  }
}
