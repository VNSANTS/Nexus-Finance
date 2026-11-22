import { useCallback } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Capacitor } from '@capacitor/core'
import { forcarAtualizacaoCompleta } from '@/lib/forcarAtualizacao'

// O PWA é exclusivo do site. Instalar Service Worker no WebView do APK pode
// manter chunks antigos após uma atualização Android, inclusive o fluxo Auth.
export function RegistrarPwa() {
  useRegisterSW()
  return null
}

export function useAtualizacaoApp() {
  const aplicarAtualizacao = useCallback(() => {
    if (Capacitor.isNativePlatform()) {
      window.alert('No Android, as atualizações são instaladas por um novo APK assinado. Não é possível atualizar os arquivos internos só recarregando a tela.')
      return
    }
    void forcarAtualizacaoCompleta()
  }, [])
  return { aplicarAtualizacao }
}
