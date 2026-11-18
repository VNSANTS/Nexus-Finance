// Verificação de regressão para o APK local. Não substitui testes em Android.
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const capacitor = read('capacitor.config.ts')
const manifest = read('android/app/src/main/AndroidManifest.xml')

assert.doesNotMatch(capacitor, /\burl:\s*['"]https?:\/\//, 'O APK não pode carregar um site remoto via server.url')
assert.match(capacitor, /webDir:\s*['"]dist['"]/, 'O app precisa empacotar dist/')
assert.match(manifest, /android:allowBackup="false"/, 'Desabilitar backup do Android com dados sensíveis')
assert.match(manifest, /android:usesCleartextTraffic="false"/, 'Desabilitar HTTP sem TLS')
for (const name of ['admin-users', 'nexus-ai', 'mercado-ia', 'mercado-cotacoes']) {
  const functionSource = read(`supabase/functions/${name}/index.ts`)
  assert.match(functionSource, /'https:\/\/localhost'/, `Origem Capacitor ausente em ${name}`)
}
console.log('Verificações estáticas do APK local: PASSOU.')
