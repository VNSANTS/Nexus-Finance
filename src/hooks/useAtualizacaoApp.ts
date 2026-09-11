import { useCallback } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { forcarAtualizacaoCompleta } from '@/lib/forcarAtualizacao'

/**
 * Registra o Service Worker (necessário porque vite.config.ts usa
 * `injectRegister: false` — sem isso, nada registraria o SW) e expõe um
 * botão de "forçar atualização" direto, sem etapa de verificação prévia:
 * desregistra o SW atual, limpa os caches e recarrega. É mais garantido
 * que confiar no ciclo normal de troca do Service Worker, que é
 * exatamente o que ficava "preso" antes (relato: "muitas vezes eu atualizo
 * mas o pwa instalado não atualiza").
 */
export function useAtualizacaoApp() {
  useRegisterSW() // só o registro em si — sem isso o SW nunca é instalado

  const aplicarAtualizacao = useCallback(() => {
    forcarAtualizacaoCompleta()
  }, [])

  return { aplicarAtualizacao }
}
