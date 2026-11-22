// Tests the actual AuthContext and NativeAuthDeepLink code with simulated native APIs.
// No real user, auth credential, email, Google request or database mutation.
import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {Script} from 'node:vm'
import {transformSync} from 'esbuild'
const REDIRECT='com.nexusfinance.app://auth/callback'
const KEY='nexus-finance-auth-native-next'
const jsx={jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props}),Fragment:Symbol.for('react.fragment')}
const storage=()=>{const m=new Map();return{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}}
function backend(extra={}){
  const calls=[]
  const auth={
    signInWithOAuth:async data=>{calls.push({name:'oauth',data});return{data:{url:'https://accounts.google.com/o/oauth2/v2/auth?test=1'},error:null}},
    signUp:async data=>{calls.push({name:'signup',data});return{error:null}},
    resetPasswordForEmail:async(email,options)=>{calls.push({name:'reset',email,options});return{error:null}},
    resend:async data=>{calls.push({name:'resend',data});return{error:null}},
    exchangeCodeForSession:async code=>{calls.push({name:'exchange',code});return{error:null}},
    setSession:async tokens=>{calls.push({name:'session',tokens});return{error:null}},
    signInWithPassword:async data=>{calls.push({name:'password',data});return{data:{user:{id:'user1'}},error:null}},
    signOut:async()=>{calls.push({name:'signout'});return{error:null}},
    onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
    ...extra,
  }
  return{auth,calls,from:table=>{
    assert.ok(table==='app_config'||table==='profiles')
    const q={select:()=>q,eq:()=>q,maybeSingle:async()=>({data:{cadastro_fechado:false,modo_manutencao:false,forcar_atualizacao_em:null}}),single:async()=>({data:{id:'user1',status:'ativo',role:'usuario'}})}
    return q
  },functions:{invoke:async()=>({data:{ok:true},error:null})}}
}
function compile(path,dependencies,s){
  const src=readFileSync(path,'utf8').replaceAll('import.meta.env.BASE_URL',"'/'")
  const code=transformSync(src,{loader:'tsx',format:'cjs',target:'es2022',jsx:'automatic'}).code
  const module={exports:{}}
  new Script(code,{filename:path}).runInNewContext({
    module,exports:module.exports,URL,URLSearchParams,Date,console,localStorage:s,
    window:{location:{origin:'https://web.nexusfinance.invalid'}},
    navigator:{},setInterval:()=>1,clearInterval:()=>{},
    require:n=>n==='react/jsx-runtime'?jsx:dependencies[n]??(()=>{throw Error('Mock module missing '+n)})(),
  })
  return module.exports
}
function authEnv({native=true,store=storage(),db=backend(),session=null,closed=false,browserFails=false}={}){
  let count=0
  const opened=[]
  if(closed)db.from=()=>{const q={select:()=>q,eq:()=>q,maybeSingle:async()=>({data:{cadastro_fechado:true,modo_manutencao:false}})};return q}
  const react={createContext:()=>({Provider:'Provider'}),useEffect:()=>{},useCallback:fn=>fn,useContext:()=>null,useState:initial=>[++count===1?session:initial,()=>{}]}
  const mod=compile('src/auth/AuthContext.tsx',{
    react,'@capacitor/core':{Capacitor:{isNativePlatform:()=>native}},
    '@capacitor/browser':{Browser:{open:async({url})=>{opened.push(url);if(browserFails)throw Error('Browser failed')}}},
    '@/lib/supabase':{supabase:db},
    '@/lib/forcarAtualizacao':{forcarAtualizacaoCompleta:()=>{}},
  },store)
  return{api:mod.AuthProvider({children:null}).props.value,db,opened,store}
}
function nativeEnv({store=storage(),db=backend(),cold=null,closeFails=false}={}){
  const navigations=[]
  let listener,cleaner,closeCount=0
  const react={useEffect:fn=>{cleaner=fn()}}
  const mod=compile('src/auth/NativeAuthDeepLink.tsx',{
    react,'@capacitor/app':{App:{
      addListener:(name,fn)=>{assert.equal(name,'appUrlOpen');listener=fn;return Promise.resolve({remove(){}})},
      getLaunchUrl:async()=>cold?{url:cold}:null,
    }},'@capacitor/browser':{Browser:{close:async()=>{closeCount++;if(closeFails)throw Error('Unsupported')}}},
    '@capacitor/core':{Capacitor:{isNativePlatform:()=>true}},
    'react-router-dom':{useNavigate:()=> (path)=>navigations.push(path)},
    '@/lib/supabase':{supabase:db},
  },store)
  mod.default()
  const flush=async()=>{for(let n=0;n<5;n++)await new Promise(done=>setImmediate(done))}
  return{db,store,navigations,event:async url=>{listener({url});await flush()},flush,cleanup:()=>cleaner?.(),get closeCount(){return closeCount}}
}
test('Google: native exact Supabase callback, PKCE browser open',async()=>{
  const a=authEnv();assert.equal((await a.api.entrarComOAuth('google')).erro,null)
  const {data}=a.db.calls[0]
  assert.equal(data.provider,'google')
  assert.equal(data.options.redirectTo,REDIRECT)
  assert.equal(data.options.skipBrowserRedirect,true)
  assert.equal(a.opened.length,1)
})
test('GitHub: same exact native callback',async()=>{
  const a=authEnv();await a.api.entrarComOAuth('github')
  assert.equal(a.db.calls[0].data.provider,'github')
  assert.equal(a.db.calls[0].data.options.redirectTo,REDIRECT)
})
test('Existing Google user can log in even when new signup is closed',async()=>{
  const a=authEnv({closed:true})
  assert.equal((await a.api.entrarComOAuth('google')).erro,null)
  assert.equal(a.db.calls[0].name,'oauth')
})
test('Signup and resend email confirmation always use native redirect',async()=>{
  const a=authEnv({session:{user:{email:'synthetic@example.invalid'}}})
  await a.api.cadastrar('Tester','synthetic@example.invalid','SafePassword123')
  await a.api.reenviarConfirmacaoPropria()
  assert.equal(a.db.calls[0].data.options.emailRedirectTo,REDIRECT)
  assert.equal(a.db.calls[1].data.options.emailRedirectTo,REDIRECT)
  const newUser=authEnv()
  assert.equal((await newUser.api.reenviarConfirmacaoCadastro('no-session@example.invalid')).erro,null)
  assert.equal(newUser.db.calls[0].data.options.emailRedirectTo,REDIRECT)
})
test('Reset email stores route and PKCE callback opens reset form',async()=>{
  const s=storage(),db=backend(),a=authEnv({store:s,db})
  await a.api.resetarSenha('synthetic@example.invalid')
  assert.equal(db.calls[0].options.redirectTo,REDIRECT)
  assert.equal(JSON.parse(s.getItem(KEY)).next,'/redefinir-senha')
  const d=nativeEnv({store:s,db});await d.event(REDIRECT+'?code=recovery-code')
  assert.equal(db.calls.at(-1).code,'recovery-code')
  assert.equal(d.navigations.at(-1),'/redefinir-senha')
  assert.equal(s.getItem(KEY),null)
})
test('OAuth exchange navigates home once on duplicate callback',async()=>{
  const s=storage(),db=backend();await authEnv({store:s,db}).api.entrarComOAuth('google')
  const d=nativeEnv({store:s,db})
  await d.event(REDIRECT+'?code=google-code');await d.event(REDIRECT+'?code=google-code')
  assert.equal(db.calls.filter(c=>c.name==='exchange').length,1)
  assert.equal(d.navigations.length,1);assert.equal(d.navigations[0],'/')
})
test('Ignores invalid scheme, host and callback path',async()=>{
  const d=nativeEnv()
  for(const u of ['https://evil.invalid/auth/callback?code=a','com.nexusfinance.app://evil/callback?code=a','com.nexusfinance.app://auth/nope?code=a'])
    await d.event(u)
  assert.equal(d.db.calls.length,0);assert.equal(d.navigations.length,0)
})
test('Invalid callback does not consume pending password recovery route',async()=>{
  const s=storage();s.setItem(KEY,JSON.stringify({next:'/redefinir-senha',at:Date.now()}))
  const d=nativeEnv({store:s});await d.event('https://evil.invalid/?code=a')
  await d.event(REDIRECT+'?code=valid-code')
  assert.equal(d.navigations.at(-1),'/redefinir-senha')
})
test('Disallows arbitrary open redirects even when next supplied in link',async()=>{
  const d=nativeEnv();await d.event(REDIRECT+'?code=ok&next=https%3A%2F%2Fevil.invalid')
  assert.equal(d.navigations.at(-1),'/')
})
test('Missing code and denied provider show login error, not app home',async()=>{
  for(const path of [REDIRECT,REDIRECT+'?error=access_denied']){
    const d=nativeEnv();await d.event(path)
    assert.equal(d.navigations.at(-1),'/login?auth_error=1')
  }
})
test('Invalid exchange result handled and navigates to login',async()=>{
  const db=backend({exchangeCodeForSession:async()=>({error:new Error('invalid code')})})
  const d=nativeEnv({db});await d.event(REDIRECT+'?code=fail')
  assert.equal(d.navigations.at(-1),'/login?auth_error=1')
})
test('Network rejection while exchanging PKCE handled without crashing app',async()=>{
  const db=backend({exchangeCodeForSession:async()=>{throw Error('network offline')}})
  const d=nativeEnv({db});await d.event(REDIRECT+'?code=fail')
  assert.equal(d.navigations.at(-1),'/login?auth_error=1')
})
test('Android Browser.close is optional',async()=>{
  const d=nativeEnv({closeFails:true});await d.event(REDIRECT+'?code=ok')
  assert.equal(d.navigations.at(-1),'/');assert.equal(d.closeCount,1)
})
test('Cold-start deep link works without appUrlOpen event',async()=>{
  const d=nativeEnv({cold:REDIRECT+'?code=cold'});await d.flush()
  assert.equal(d.db.calls.at(-1).code,'cold')
  assert.equal(d.navigations.at(-1),'/')
})
test('Expired recovery target cannot linger beyond 48 hours',async()=>{
  const s=storage();s.setItem(KEY,JSON.stringify({next:'/redefinir-senha',at:Date.now()-49*3600000}))
  const d=nativeEnv({store:s});await d.event(REDIRECT+'?code=ok')
  assert.equal(d.navigations.at(-1),'/')
})
test('Native missing provider link or failed browser open yields readable error',async()=>{
  const db=backend({signInWithOAuth:async()=>({data:{url:null},error:null})})
  const a=authEnv({db});assert.match((await a.api.entrarComOAuth('google')).erro,/não forneceu/)
  const b=authEnv({browserFails:true});assert.match((await b.api.entrarComOAuth('google')).erro,/Não foi possível abrir/)
})
test('Web OAuth uses site origin, not native Android deep link',async()=>{
  const a=authEnv({native:false});await a.api.entrarComOAuth('google')
  assert.equal(a.db.calls[0].data.options.redirectTo,'https://web.nexusfinance.invalid/')
  assert.equal(a.opened.length,0)
})

test('Real supabase-js generates PKCE authorize URL with exact native redirect, no Vercel',async()=>{
  const {createClient}=await import('@supabase/supabase-js')
  const cache=new Map()
  const storageAdapter={
    getItem:async key=>cache.get(key)??null,
    setItem:async(key,v)=>{cache.set(key,v)},
    removeItem:async key=>{cache.delete(key)},
  }
  const client=createClient('https://test-only.supabase.co','sb_publishable_test',{
    auth:{flowType:'pkce',detectSessionInUrl:false,persistSession:true,autoRefreshToken:false,storage:storageAdapter}
  })
  const {data,error}=await client.auth.signInWithOAuth({
    provider:'google',options:{redirectTo:REDIRECT,skipBrowserRedirect:true}
  })
  assert.equal(error,null)
  assert.ok(data.url)
  const u=new URL(data.url)
  assert.equal(u.searchParams.get('provider'),'google')
  assert.equal(u.searchParams.get('redirect_to'),REDIRECT)
  assert.equal(u.searchParams.get('code_challenge_method'),'s256')
  assert.ok(u.searchParams.get('code_challenge'))
  assert.ok(!data.url.includes('vercel.app'))
  assert.ok([...cache.keys()].some(k=>k.includes('code-verifier')))
})
