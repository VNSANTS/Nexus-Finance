// Checagem sem dependencias externas: executa apos o build, antes do deploy.
// Impede publicar um pacote Vite compilado com base '/' no GitHub Pages.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const base = '/Nexus-Finance/'
const html = readFileSync('dist/index.html', 'utf8')
const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'))

assert.match(html, /src="\/Nexus-Finance\/assets\/[^"]+\.js"/, 'JS deve usar o prefixo do GitHub Pages')
assert.match(html, /href="\/Nexus-Finance\/assets\/[^"]+\.css"/, 'CSS deve usar o prefixo do GitHub Pages')
assert.match(html, /href="\/Nexus-Finance\/favicon\.svg"/, 'Favicon deve usar o prefixo do GitHub Pages')
assert.match(html, /href="\/Nexus-Finance\/apple-touch-icon\.png"/, 'Icone iOS deve usar o prefixo do GitHub Pages')

for (const campo of ['id', 'scope', 'start_url']) {
  assert.equal(manifest[campo], base, `PWA: ${campo} deve usar ${base}`)
}

for (const arquivo of ['dist/404.html', 'dist/apresentacao.html']) {
  assert.ok(existsSync(arquivo), `Pagina obrigatoria nao encontrada: ${arquivo}`)
}

console.log('PASS: build GitHub Pages com scripts, CSS, icones, PWA e paginas estaticas no lugar correto.')
