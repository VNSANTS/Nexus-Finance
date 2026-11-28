import ts from 'typescript'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'

// Avalia somente literais de dados. Uma expressão dinâmica nova exige revisão.
function lerLiteral(node) {
  if (ts.isStringLiteralLike(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isIdentifier(node) && node.text === 'undefined') return undefined
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(lerLiteral)
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map((prop) => {
    if (!ts.isPropertyAssignment(prop) || !(ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name))) {
      throw Error('Propriedade não literal no módulo: ' + prop.getText().slice(0, 100))
    }
    return [prop.name.text, lerLiteral(prop.initializer)]
  }))
  throw Error('Expressão inválida no catálogo: ' + node.getText().slice(0, 100))
}

const pasta = new URL('../banco-de-dados/modulos/', import.meta.url)
const privado = new URL('../supabase/functions/education-module/', import.meta.url)
const previas = Object.create(null)
const completos = Object.create(null)
for (const nome of readdirSync(pasta).filter((n) => /^m\d+-.+\.ts$/.test(n)).sort()) {
  const fonte = ts.createSourceFile(nome, readFileSync(new URL(nome, pasta), 'utf8'), ts.ScriptTarget.Latest, true)
  const candidatos = fonte.statements.filter(ts.isVariableStatement)
    .flatMap((s) => [...s.declarationList.declarations])
    .filter((d) => d.initializer && ts.isObjectLiteralExpression(d.initializer))
    .map((d) => lerLiteral(d.initializer))
    .filter((obj) => typeof obj.aprender?.oQueE === 'string')
  const [modulo] = candidatos
  const id = nome.replace(/^m\d+-|\.ts$/g, '')
  if (candidatos.length !== 1 || modulo.id !== id || completos[id]) throw Error('Catálogo inconsistente em ' + nome)
  previas[id] = modulo.aprender.oQueE
  completos[id] = modulo
}
mkdirSync(privado, { recursive: true })
writeFileSync(new URL('catalogo.json', privado), JSON.stringify(completos) + '\n')
writeFileSync(new URL('previas.json', pasta), JSON.stringify(previas, null, 2) + '\n')
console.log(Object.keys(previas).length + ' prévias públicas e módulos para a Edge Function gerados.')
