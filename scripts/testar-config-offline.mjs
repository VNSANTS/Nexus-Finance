import assert from 'node:assert/strict'
import test from 'node:test'
import { manterUltimaAppConfigValida } from '../src/auth/appConfigState.ts'

const config = (overrides = {}) => ({
  cadastroFechado: false,
  modoManutencao: false,
  carregada: true,
  androidMinVersionCode: 1,
  androidUpdateRevoked: false,
  androidApkDownloadUrl: 'https://nexus-finance-vn.lovable.app',
  ...overrides,
})

test('mantém a última configuração confirmada durante falha de rede', () => {
  const anterior = config({ androidMinVersionCode: 8 })
  const indisponivel = config({ carregada: false, androidMinVersionCode: 1 })
  assert.equal(manterUltimaAppConfigValida(anterior, indisponivel), anterior)
})

test('usa a configuração recebida quando o servidor responde', () => {
  const atualizada = config({ androidMinVersionCode: 9, modoManutencao: true })
  assert.equal(manterUltimaAppConfigValida(config(), atualizada), atualizada)
})

test('preserva estado inicial não carregado até obter uma leitura válida', () => {
  const falhaInicial = config({ carregada: false })
  assert.equal(manterUltimaAppConfigValida(null, falhaInicial), falhaInicial)
})
