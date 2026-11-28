import assert from 'node:assert/strict'
import test from 'node:test'
import { resolve } from 'node:path'
import { createServer } from 'vite'

test('o armazenamento local separa duas contas, convidado e dados legados', async () => {
  const server = await createServer({
    configFile: false,
    resolve: { alias: { '@': resolve('src') } },
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
  })
  const itens = new Map()
  const anterior = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (k) => itens.get(k) ?? null, setItem: (k, v) => itens.set(k, v) },
  })
  try {
    const { defaultProgress, salvarProgresso, carregarProgressoSincrono, existeProgressoLocal } =
      await server.ssrLoadModule('/src/backend/local/progressStore.ts')
    const a = 'user:11111111-1111-4111-8111-111111111111'
    const b = 'user:22222222-2222-4222-8222-222222222222'
    const convidado = 'guest:33333333-3333-4333-8333-333333333333'
    const legado = JSON.stringify({ v: 2, data: { ...defaultProgress(), xp: 900 } })
    itens.set('nexus-finance-progress', legado)
    for (const identidade of [a, b, convidado]) {
      assert.equal(existeProgressoLocal(identidade), false)
      assert.equal(carregarProgressoSincrono(identidade).xp, 0)
    }
    await salvarProgresso({ ...defaultProgress(), xp: 77 }, a)
    await salvarProgresso({ ...defaultProgress(), xp: 14 }, b)
    assert.equal(carregarProgressoSincrono(b).xp, 14)
    assert.equal(carregarProgressoSincrono(convidado).xp, 0)
    assert.equal(carregarProgressoSincrono(a).xp, 77)
    assert.equal(itens.get('nexus-finance-progress'), legado)
  } finally {
    if (anterior) Object.defineProperty(globalThis, 'localStorage', anterior)
    else delete globalThis.localStorage
    await server.close()
  }
})
