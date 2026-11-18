// Checa a estrutura do listener de autenticação para evitar deadlocks.
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const auth = readFileSync(new URL('../src/auth/AuthContext.tsx', import.meta.url), 'utf8')
assert.match(auth, /onAuthStateChange\(\(_evento, novaSessao\) =>/, 'O listener deve ser síncrono')
assert.doesNotMatch(auth, /onAuthStateChange\(async\s*\(/, 'Não use callback async no onAuthStateChange')
assert.match(auth, /buscarPerfil\(usuarioId\)\.then/, 'O perfil deve ser carregado fora do callback')
console.log('Fluxo de autenticação sem await no listener: PASSOU.')
