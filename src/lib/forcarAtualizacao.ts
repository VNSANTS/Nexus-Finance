// Reset "nuclear" do PWA — o jeito mais confiável de garantir que a pessoa
// pega a versão mais nova do app, sem depender do ciclo normal de troca do
// Service Worker (que às vezes fica "preso" esperando um momento que nunca
// chega, mesmo com skipWaiting/clientsClaim configurados). Usado tanto pelo
// botão pessoal ("Verificar atualização" no Perfil) quanto pela atualização
// forçada pelo admin pra todo mundo (ver AuthContext.tsx).
export async function forcarAtualizacaoCompleta() {
  try {
    if ('serviceWorker' in navigator) {
      const registros = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registros.map((r) => r.unregister()))
    }
    if ('caches' in window) {
      const chaves = await caches.keys()
      await Promise.all(chaves.map((k) => caches.delete(k)))
    }
  } finally {
    // Mesmo se algo acima falhar, ainda vale recarregar — na pior das
    // hipóteses volta pra versão em cache, mas nunca trava a pessoa numa
    // tela quebrada por causa dessa limpeza.
    window.location.reload()
  }
}
