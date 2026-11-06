// Testa o JavaScript publico sem navegador, rede, bibliotecas ou credenciais.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const handlers = new Map()
const elementos = new Map(
  ['simulador', 'valor', 'dias', 'total', 'detalhe', 'erro'].map(id => [id, {
    value: id === 'valor' ? '5' : id === 'dias' ? '30' : '',
    textContent: '',
    addEventListener: (evento, callback) => handlers.set(`${id}:${evento}`, callback),
  }])
)
const document = { getElementById: id => elementos.get(id) }
vm.runInNewContext(readFileSync('public/simulador-reserva.js', 'utf8'), { document, Intl, Number })

const valor = elementos.get('valor')
const dias = elementos.get('dias')
const total = elementos.get('total')
const erro = elementos.get('erro')
function alterar(novoValor, novoPrazo) {
  valor.value = novoValor
  dias.value = novoPrazo
  handlers.get('valor:input')()
}

assert.equal(total.textContent, 'R$ 150,00'.replace(' ', ' ')) // pt-BR usa espaço não separável
alterar('0.50', '4')
assert.equal(total.textContent, 'R$ 2,00')
alterar('5', '1')
assert.equal(total.textContent, 'R$ 5,00')
assert.match(elementos.get('detalhe').textContent, /1 dia\./)
alterar('5', '3651')
assert.equal(total.textContent, '—')
assert.ok(erro.textContent.length > 0)
alterar('-1', '30')
assert.equal(total.textContent, '—')
alterar('0.001', '30')
assert.equal(total.textContent, '—')
alterar('5', '30')
assert.equal(erro.textContent, '')
assert.equal(total.textContent, 'R$ 150,00')

const landing = readFileSync('public/apresentacao.html', 'utf8')
const page = readFileSync('public/simulador-reserva.html', 'utf8')
const sitemap = readFileSync('public/sitemap.xml', 'utf8')
assert.match(landing, /href="\.\/simulador-reserva\.html"/)
assert.match(page, /src="\.\/simulador-reserva\.js"/)
assert.match(sitemap, /Nexus-Finance\/simulador-reserva\.html/)
console.log('PASS: simulador (calculos, validacao e links publicos)')
