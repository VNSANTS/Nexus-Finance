import { useCallback, useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

// Controla a atualização do Service Worker "na mão" — resolve o problema
// clássico de PWA/APK instalado: o app fica preso numa versão em cache e
// só mostra a novidade depois que o usuário desinstala e reinstala.
//
// Como funciona: o vite-plugin-pwa (registerType: 'autoUpdate' +
// injectRegister: false) já baixa o SW novo em segundo plano sozinho, mas
// ele fica "esperando" (estado waiting) até todas as abas fecharem. Aqui a
// gente expõe esse estado pro usuário poder forçar a troca na hora —
// equivalente a chamar skipWaiting() + recarregar a página — sem precisar
// fechar o app manualmente.
export function useAtualizacaoApp() {
  const [verificando, setVerificando] = useState(false)
  const [semAtualizacao, setSemAtualizacao] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError() {
      setErro('Não foi possível verificar atualizações agora.')
    },
  })

  // Some sozinho o "sem atualização" / erro depois de um tempo, igual ao
  // padrão dos outros botões de status desta tela (ex: "Sincronizar agora").
  useEffect(() => {
    if (!semAtualizacao) return
    const t = setTimeout(() => setSemAtualizacao(false), 2500)
    return () => clearTimeout(t)
  }, [semAtualizacao])

  useEffect(() => {
    if (!erro) return
    const t = setTimeout(() => setErro(null), 3500)
    return () => clearTimeout(t)
  }, [erro])

  // Verifica agora se existe um Service Worker mais novo publicado. Se
  // existir, `needRefresh` vira true automaticamente (o hook do plugin
  // escuta o evento) e o botão passa a oferecer "Atualizar agora".
  const verificarAgora = useCallback(async () => {
    if (verificando || needRefresh) return
    setVerificando(true)
    setErro(null)
    try {
      const registro = await navigator.serviceWorker?.getRegistration()
      await registro?.update()
      // Pequeno respiro pra deixar o evento de needRefresh (se houver)
      // propagar antes de decidir que não tem nada novo.
      await new Promise((r) => setTimeout(r, 600))
      if (!needRefresh) setSemAtualizacao(true)
    } catch {
      setErro('Não foi possível verificar atualizações agora.')
    } finally {
      setVerificando(false)
    }
  }, [verificando, needRefresh])

  // Aplica a atualização: manda o novo SW assumir e recarrega a página
  // automaticamente (comportamento do updateServiceWorker(true) do plugin).
  const aplicarAtualizacao = useCallback(() => {
    updateServiceWorker(true)
  }, [updateServiceWorker])

  return {
    atualizacaoDisponivel: needRefresh,
    verificando,
    semAtualizacao,
    erro,
    verificarAgora,
    aplicarAtualizacao,
  }
}
