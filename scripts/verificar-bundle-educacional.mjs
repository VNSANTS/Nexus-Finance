import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import ts from 'typescript'

const catalogo = JSON.parse(readFileSync('supabase/functions/education-module/catalogo.json', 'utf8'))
const privados = new Set(Object.values(catalogo).flatMap((m) => [
  m.aprender.porQueImporta, ...m.quiz.map((q) => q.explicacao),
]).filter((s) => typeof s === 'string' && s.length > 60))
function inspecionar(pasta) {
  for (const arq of readdirSync(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, arq.name)
    if (arq.isDirectory()) { inspecionar(caminho); continue }
    assert.doesNotMatch(arq.name, /^m\d+-.+\.(?:ts|js|json|map)$|^catalogo\.json$/i, caminho)
    if (!['.js', '.html', '.json', '.map'].includes(extname(caminho))) continue
    const texto = readFileSync(caminho, 'utf8')
    for (const s of privados) assert(!texto.includes(s), 'Texto restrito em ' + caminho)
    if (!caminho.endsWith('.js')) continue
    const ast = ts.createSourceFile(caminho, texto, ts.ScriptTarget.Latest, false, ts.ScriptKind.JS)
    function visitar(n) {
      if (ts.isStringLiteralLike(n)) assert(!privados.has(n.text), 'Literal restrito em ' + caminho)
      ts.forEachChild(n, visitar)
    }
    visitar(ast)
  }
}
inspecionar('dist')
console.log('Bundle público sem chunks dos módulos e sem os ' + privados.size + ' textos restritos verificados.')
