import assert from 'node:assert/strict'
import test from 'node:test'
import { guardarDestino, lerDestino, limparDestino, validarDestino } from '../src/auth/destinoAposLogin.ts'

test('conserva a função escolhida e os parâmetros aceitos', () => {
  assert.equal(validarDestino('/ferramentas?calc=juros-compostos'), '/ferramentas?calc=juros-compostos')
  assert.equal(validarDestino('/modulo/renda-fixa?aba=Teste&code=secreto#access_token=privado'), '/modulo/renda-fixa?aba=Teste')
})

test('rejeita destinos externos e o fluxo de recuperação', () => {
  for (const rota of ['https://example.org', '//example.org', '/\\example.org', '/login', '/redefinir-senha', '/%5cexample.org']) {
    assert.equal(validarDestino(rota), null)
  }
})

test('destino sobrevive à navegação, expira e pode ser descartado', (ctx) => {
  const itens = new Map()
  globalThis.localStorage = {
    getItem: (k) => itens.get(k) ?? null,
    setItem: (k, v) => itens.set(k, v),
    removeItem: (k) => itens.delete(k),
  }
  const agora = 1_000_000_000
  const clock = ctx.mock.method(Date, 'now', () => agora)
  guardarDestino('/gestao-financeira/lancamentos/novo?tipo=despesa')
  assert.equal(lerDestino(), '/gestao-financeira/lancamentos/novo?tipo=despesa')
  clock.mock.mockImplementation(() => agora + 30 * 60_000)
  assert.equal(lerDestino(), null)
  guardarDestino('/biblioteca')
  limparDestino()
  assert.equal(lerDestino(), null)
})
