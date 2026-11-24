// Verificação de regressão para o APK local. Não substitui testes em Android.
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const capacitor = read('capacitor.config.ts')
const manifest = read('android/app/src/main/AndroidManifest.xml')
const supabase = read('src/lib/supabase.ts')
const auth = read('src/auth/AuthContext.tsx')
const deepLink = read('src/auth/NativeAuthDeepLink.tsx')
const main = read('src/main.tsx')

assert.doesNotMatch(capacitor, /\burl:\s*['"]https?:\/\//, 'O APK não pode carregar um site remoto via server.url')
assert.match(capacitor, /webDir:\s*['"]dist['"]/, 'O app precisa empacotar dist/')
assert.match(manifest, /android:allowBackup="false"/, 'Desabilitar backup do Android com dados sensíveis')
assert.match(manifest, /android:usesCleartextTraffic="false"/, 'Desabilitar HTTP sem TLS')
assert.match(manifest, /android:scheme="@string\/custom_url_scheme"[\s\S]*android:host="auth"/, 'Callback nativo deve estar registrado no Android')
assert.match(supabase, /flowType:\s*'pkce'/, 'Autenticação deve usar PKCE')
assert.match(supabase, /detectSessionInUrl:\s*!Capacitor\.isNativePlatform\(\)/, 'No Android o callback deve ser processado pelo listener nativo')
assert.match(auth, /emailRedirectTo:\s*redirectAuth\('\/'\)/, 'Confirmação de e-mail deve retornar ao app')
assert.match(auth, /return REDIRECT_NATIVE\b/, 'O retorno nativo precisa usar a URL exata cadastrada no Supabase')
assert.doesNotMatch(auth, /REDIRECT_NATIVE\}\?next=|REDIRECT_NATIVE\?next=/, 'Não adicionar query à URL nativa cadastrada')
assert.match(auth, /options:\s*\{\s*emailRedirectTo:\s*redirectAuth\('\/'\)/, 'Reenvio de confirmação deve retornar ao app')
assert.match(deepLink, /resgatarDestinoPendente\(\)/, 'Callback deve restaurar a rota após a URL nativa fixa')
assert.match(auth, /redirectTo:\s*redirectAuth\('\/redefinir-senha'\)/, 'Reset de senha deve abrir a rota correta')
assert.match(auth, /skipBrowserRedirect:\s*true/, 'OAuth nativo precisa ser aberto fora do WebView')
assert.match(deepLink, /exchangeCodeForSession\(code\)/, 'Callback PKCE precisa trocar o código por sessão')
assert.doesNotMatch(deepLink, /setSession\s*\(/, 'Não aceitar sessão injetada por fragmento em deep link nativo')
assert.match(deepLink, /callback\.protocol !== SCHEME/, 'Callback deve validar o esquema')
assert.match(main, /<NativeAuthDeepLink\s*\/>/, 'Listener nativo deve montar dentro do Router e AuthProvider')
assert.match(main, /!Capacitor\.isNativePlatform\(\) && <RegistrarPwa\s*\/>/, 'O Android não deve registrar PWA Service Worker')
const updateHook = read('src/hooks/useAtualizacaoApp.ts')
assert.match(updateHook, /export function RegistrarPwa\(\)/, 'PWA web deve continuar registrável')
assert.match(updateHook, /Capacitor\.isNativePlatform\(\)/, 'Atualização no Android exige APK assinado')
for (const name of ['admin-users', 'nexus-ai', 'mercado-ia', 'mercado-cotacoes']) {
  const functionSource = read(`supabase/functions/${name}/index.ts`)
  assert.match(functionSource, /'https:\/\/localhost'/, `Origem Capacitor ausente em ${name}`)
}
console.log('Verificações estáticas do APK local: PASSOU.')
