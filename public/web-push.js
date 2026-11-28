/* Carregado pelo service worker do Vite no escopo do PWA. */
const NEXUS_LINK_OFICIAL = 'https://nexus-finance-vn.lovable.app'

// Limpa somente os chunks de módulos de versões anteriores no escopo
// desta PWA. As respostas autenticadas novas têm Cache-Control: no-store.
self.addEventListener('activate', (evento) => {
  evento.waitUntil((async () => {
    if (!(await caches.has('nexus-chunks'))) return
    const cache = await caches.open('nexus-chunks')
    const prefixo = new URL('assets/', self.registration.scope).href
    const legados = (await cache.keys()).filter((req) =>
      req.url.startsWith(prefixo) && /^m\d+-[^/]+\.js$/.test(req.url.slice(prefixo.length).split('?')[0]))
    await Promise.all(legados.map((req) => cache.delete(req)))
  })())
})

self.addEventListener('push', (evento) => {
  if (!evento.data) return
  let aviso
  try {
    aviso = evento.data.json()
  } catch {
    return
  }
  if (aviso?.url !== NEXUS_LINK_OFICIAL || typeof aviso.title !== 'string' || typeof aviso.body !== 'string') return
  evento.waitUntil(self.registration.showNotification(aviso.title, {
    body: aviso.body,
    icon: new URL('icon-192.png', self.registration.scope).href,
    tag: 'nexus-atualizacao-geral',
    data: { nexusAtualizacao: true },
  }))
})

self.addEventListener('notificationclick', (evento) => {
  if (evento.notification.data?.nexusAtualizacao !== true) return
  evento.notification.close()
  evento.waitUntil(self.clients.openWindow(NEXUS_LINK_OFICIAL))
})
