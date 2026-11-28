import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { criarGateway } from '../supabase/functions/education-module/handler.ts'

const catalogo = JSON.parse(readFileSync(new URL('../supabase/functions/education-module/catalogo.json', import.meta.url)))
const previas = JSON.parse(readFileSync(new URL('../banco-de-dados/modulos/previas.json', import.meta.url)))
const id = Object.keys(catalogo)[0]
const origem = 'https://nexus-finance-web.pages.dev'
const uid = '11111111-1111-4111-8111-111111111111'
function preparar({ anonimo = false, authStatus = 200, status = 'ativo', role = 'user', manutencao = false, falha = false } = {}) {
  const chamadas = []
  const consultar = async (url, opcoes) => {
    chamadas.push(url)
    assert.equal(opcoes.headers.Authorization, 'Bearer token-de-teste')
    assert.equal(opcoes.headers.apikey, 'publica-de-teste')
    if (falha) throw Error('Indisponível')
    if (url.endsWith('/auth/v1/user')) return Response.json({ id: uid, is_anonymous: anonimo }, { status: authStatus })
    if (url.includes('/rest/v1/profiles?')) {
      assert.equal(new URL(url).searchParams.get('id'), 'eq.' + uid)
      return Response.json([{ id: uid, role, status }])
    }
    if (url.includes('/rest/v1/app_config?')) return Response.json([{ modo_manutencao: manutencao }])
    throw Error('Consulta inesperada')
  }
  return { endpoint: criarGateway(catalogo, { url: 'https://supabase.invalid', chavePublica: 'publica-de-teste', consultar }), chamadas }
}
const requisicao = (slug = id, headers = { Authorization: 'Bearer token-de-teste', Origin: origem }) =>
  new Request('https://edge.invalid/education-module?id=' + encodeURIComponent(slug), { headers })

test('preflight aceita Cloudflare sem carregar o catálogo e rejeita outra origem', async () => {
  const { endpoint, chamadas } = preparar()
  const r = await endpoint(new Request('https://edge.invalid', { method: 'OPTIONS', headers: { Origin: origem } }))
  assert.equal(r.status, 204)
  assert.equal(r.headers.get('Access-Control-Allow-Origin'), origem)
  assert.equal((await endpoint(requisicao(id, { Origin: 'https://example.org' }))).status, 403)
  assert.equal(chamadas.length, 0)
})
test('visitante sem bearer e sessão inválida não recebem o módulo', async () => {
  const sem = preparar()
  const r = await sem.endpoint(requisicao(id, {}))
  assert.equal(r.status, 401)
  assert.equal(sem.chamadas.length, 0)
  assert.equal((await preparar({ authStatus: 401 }).endpoint(requisicao())).status, 401)
})
test('sessão anônima e perfil bloqueado não recebem o módulo', async () => {
  const anon = preparar({ anonimo: true })
  assert.equal((await anon.endpoint(requisicao())).status, 403)
  assert.equal(anon.chamadas.length, 1)
  assert.equal((await preparar({ status: 'bloqueado' }).endpoint(requisicao())).status, 403)
})
test('manutenção admite somente administrador ativo; indisponibilidade falha fechada', async () => {
  assert.equal((await preparar({ manutencao: true }).endpoint(requisicao())).status, 503)
  assert.equal((await preparar({ manutencao: true, role: 'admin' }).endpoint(requisicao())).status, 200)
  assert.equal((await preparar({ falha: true }).endpoint(requisicao())).status, 503)
})
test('chaves inválidas e caminhos arbitrários não resolvem módulos nem propriedades herdadas', async () => {
  const { endpoint } = preparar()
  for (const slug of ['__proto__', '../index', '', '*']) assert.equal((await endpoint(requisicao(slug))).status, 400)
  for (const slug of ['constructor', 'desconhecido']) assert.equal((await endpoint(requisicao(slug))).status, 404)
})
test('todas as prévias correspondem ao primeiro fundamento e o gateway entrega apenas o módulo solicitado com no-store', async () => {
  const { endpoint } = preparar()
  assert.deepEqual(Object.keys(previas).sort(), Object.keys(catalogo).sort())
  for (const [slug, modulo] of Object.entries(catalogo)) {
    assert.equal(previas[slug], modulo.aprender.oQueE)
    const r = await endpoint(requisicao(slug))
    assert.equal(r.status, 200)
    assert.match(r.headers.get('Cache-Control'), /no-store/)
    assert.deepEqual(await r.json(), modulo)
  }
})
