// Public HTTP link smoke checks. Do not call private APIs, billing endpoints,
// OAuth URLs, or live endpoints that may consume third-party quotas.
import { readFileSync, writeFileSync } from 'node:fs'
const audit=JSON.parse(readFileSync('reports/auditoria-links.json','utf8'))
const excludedHosts=/^(api\.|economia\.|brapi\.dev$|fonts\.gstatic\.com$|localhost$|app\.invalid$|schemas\.android\.com$|www\.sitemaps\.org$)/
const excludedDomains=new Set(['dadosabertos.bcb.gov.br','fonts.googleapis.com','www.googleapis.com'])
const refs=audit.external
function eligibility(item){
  try {
    const u=new URL(item.url)
    if(!['https:','http:'].includes(u.protocol))return 'not-http'
    if(/[{}\x24]/.test(item.url))return 'templated'
    if(excludedHosts.test(u.hostname)||excludedDomains.has(u.hostname))return 'api-or-infrastructure'
    if(u.pathname.endsWith('.git'))return 'repository-clone-endpoint'
    if(u.hostname==='ygtroklufolvixwazkne.supabase.co')return 'auth-api'
    return 'public'
  }catch{return 'not-a-concrete-url'}
}
const candidates=refs.map(x=>({...x,scope:eligibility(x)}))
const publicLinks=candidates.filter(x=>x.scope==='public')
const checked=[]
let next=0
async function worker(){
  while(next<publicLinks.length){
    const item=publicLinks[next++]
    const out={...item}
    try {
      let resp=await fetch(item.url,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(8000)})
      if([404,405,501].includes(resp.status)){
        await resp.body?.cancel()
        resp=await fetch(item.url,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(8000)})
      }
      out.status=resp.status
      out.finalUrl=resp.url
      out.result=resp.status>=200&&resp.status<400?'ok':
        [401,403,429].includes(resp.status)?'restricted':
        [404,410].includes(resp.status)?'broken':'unknown'
      await resp.body?.cancel()
    }catch(e){
      out.result='unknown'
      out.error=e?.name==='TimeoutError'?'timeout':'network-or-blocked'
    }
    checked.push(out)
  }
}
await Promise.all(Array.from({length:Math.min(6,publicLinks.length)},()=>worker()))
checked.sort((a,b)=>a.url.localeCompare(b.url))
const summary={
  publicCandidates:publicLinks.length,
  reachable:checked.filter(x=>x.result==='ok').length,
  http404or410:checked.filter(x=>x.result==='broken').length,
  restricted:checked.filter(x=>x.result==='restricted').length,
  indeterminate:checked.filter(x=>x.result==='unknown').length,
  skippedNonPublic:candidates.length-publicLinks.length
}
const tick=String.fromCharCode(96)
const lines=[
 '# Verificação HTTP de links públicos do Nexus Finance',
 'Execução no CI. Testes GET/HEAD somente para páginas públicas. Status 403/429, timeout e erros de rede **não comprovam** link quebrado.',
 '',
 ...Object.entries(summary).map(([k,v])=>'- '+k+': '+v),
 '',
 '## Resultados das páginas públicas',
 ...checked.map(x=>'- '+tick+x.file+':'+x.line+tick+' '+x.url+' -> '+x.result+' ('+(x.status??x.error??'indeterminado')+')'+(x.finalUrl&&x.finalUrl!==x.url?' -> '+x.finalUrl:'')),
 '',
 '## URLs não acessadas deliberadamente',
 ...candidates.filter(x=>x.scope!=='public').map(x=>'- '+tick+x.file+':'+x.line+tick+' '+x.url+' -> '+x.scope),
 '',
 'Links de notícias, OAuth, login, links de confirmação, imagens remotas e demais destinos dinâmicos exigem teste no app Android. Nenhuma API privada foi chamada.'
]
writeFileSync('reports/auditoria-links-publicos.md',lines.join('\n')+'\n')
writeFileSync('reports/auditoria-links-publicos.json',JSON.stringify({summary,checked,skipped:candidates.filter(x=>x.scope!=='public')},null,2)+'\n')
console.log('Verificação de URLs públicas',JSON.stringify(summary))
for(const x of checked.filter(x=>x.result!=='ok'))console.log('REVISAR',x.result,x.status??x.error,x.url)
