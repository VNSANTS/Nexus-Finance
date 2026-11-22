// Nexus Finance link inventory. Does not send requests to external APIs.
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
const roots=['src','banco-de-dados','public','docs','android/app/src/main','scripts']
const extensions=/\.(tsx?|jsx?|html|md|json|xml|mjs|yml|yaml)$/
const ignored=new Set(['node_modules','build','dist','.git','.gradle','.temp'])
const files=[]
function walk(root){
  if(!existsSync(root))return
  for(const e of readdirSync(root,{withFileTypes:true})){
    if(ignored.has(e.name))continue
    const p=path.join(root,e.name)
    if(e.isDirectory())walk(p)
    else if(extensions.test(e.name)&&e.name!=='nexus-ai-indice-modulos.json')files.push(p)
  }
}
for(const p of roots)walk(p)
for(const p of ['index.html','README.md','vite.config.ts','capacitor.config.ts'])if(existsSync(p))files.push(p)
function loc(file,source,index){return {file:file.replaceAll('\\','/'),line:source.slice(0,index).split('\n').length}}
function routeList(source,prefix=''){
  const out=[]
  for(const m of source.matchAll(/<Route\b[^>]*\bpath\s*=\s*["']([^"']+)["']/g)){
    const route=m[1].startsWith('/')?m[1]:prefix+m[1]
    if(!route.endsWith('*'))out.push(route)
  }
  if(prefix&&/<Route\s+index\b/.test(source))out.push(prefix.replace(/\/$/,''))
  return out
}
const routes=[...new Set([
  ...routeList(readFileSync('src/App.tsx','utf8')),
  ...routeList(readFileSync('src/gestao-financeira/GestaoFinanceiraShell.tsx','utf8'),'/gestao-financeira/')
])]
const routePatterns=routes.map(p=>new RegExp('^'+p.replace(/[.*+?^$()|[\]{}]/g,'\\$&').replace(/:[a-zA-Z]\w*/g,'[^/]+')+'/?$'))
const refs=[],external=[],dynamic=[]
function collect(file,source,regex,kind){
  for(const m of source.matchAll(regex)){
    if(/^(\/|https?:\/\/|mailto:|tel:)/.test(m[1]))refs.push({...loc(file,source,m.index),kind,url:m[1]})
  }
}
for(const file of files){
  const s=readFileSync(file,'utf8')
  collect(file,s,/\b(?:to|href|voltarPara)\s*[:=]\s*["']([^"'\n]+)["']/g,'property')
  collect(file,s,/\b(?:navigate|location\.assign|location\.replace)\s*\(\s*["']([^"']+)["']/g,'navigate')
  collect(file,s,/\b(?:navigate|location\.assign|location\.replace)\s*\(\s*\x60([^\x60]+)\x60/g,'template')
  for(const m of s.matchAll(/\b(?:href|to|src)\s*=\s*\{([^}]+)\}/g)){
    if(!/^["'\x60]/.test(m[1].trim()))dynamic.push({...loc(file,s,m.index),expression:m[1].trim().slice(0,85)})
  }
  for(const m of s.matchAll(/https?:\/\/[^\s"'<> \x60]+/g)){
    external.push({...loc(file,s,m.index),url:m[0].replace(/[),;}\]]+$/,'')})
  }
}
function isAsset(u){
  const p=u.split(/[?#]/)[0].replace(/^\/Nexus-Finance\//,'/')
  return existsSync('public'+p)||existsSync('.'+p)
}
function checkUrl(raw){
  if(/^(mailto:|tel:)/.test(raw))return 'scheme'
  if(/^https?:\/\//.test(raw))return 'external'
  if(!raw.startsWith('/'))return 'other'
  if(raw.startsWith('//'))return 'invalid'
  let pathname
  try{pathname=new URL(raw.replace(/\x24\{[^}]*\}/g,'test'),'https://app.invalid').pathname}catch{return 'invalid'}
  if(routePatterns.some(x=>x.test(pathname)))return 'route'
  if(isAsset(pathname))return 'asset'
  if(/\x24\{|\*|:id\b/.test(raw))return 'dynamic-review'
  return 'missing-route'
}
const checked=refs.map(x=>({...x,result:checkUrl(x.url)}))
const broken=checked.filter(x=>['missing-route','invalid'].includes(x.result))
const urls=[...new Map(external.map(x=>[x.url,x])).values()]
const summary={scannedFiles:files.length,declaredRoutes:routes.length,linkReferences:checked.length,internalRoutes:checked.filter(x=>x.result==='route').length,publicAssets:checked.filter(x=>x.result==='asset').length,broken:broken.length,dynamicExpressions:dynamic.length,externalLiterals:urls.length}
const tick=String.fromCharCode(96)
const item=(x)=>'- '+tick+x.file+':'+x.line+tick+' -> '+tick+x.url+tick
const report=[
  '# Auditoria de links do Nexus Finance',
  'Gerado automaticamente do código. Não substitui testes de OAuth, links gerados dinamicamente nem testes no Android.',
  '',
  '## Resumo',...Object.entries(summary).map(([k,v])=>'- '+k+': '+v),
  '',
  '## Rotas',...routes.sort().map(x=>'- '+tick+x+tick),
  '',
  '## Rotas e referências inválidas',...(broken.length?broken.map(item):['_Nenhuma rota estática inválida detectada_']),
  '',
  '## Todas as referências internas',...checked.filter(x=>x.url.startsWith('/')).map(x=>item(x)+' ('+x.result+')'),
  '',
  '## Todos os links externos literais',...urls.map(item),
  '',
  '## Links e expressões dinâmicas (revisão manual)',...dynamic.map(x=>'- '+tick+x.file+':'+x.line+tick+' -> '+tick+x.expression+tick),
  '',
  '## Limites da verificação',
  '- Serviços que exigem sessão, códigos OAuth, dados do usuário ou tokens não foram chamados.',
  '- Texto de lições e documentação aparece no inventário mesmo quando não é clicável.',
  '- Links construídos durante a execução exigem revisão e teste em Android real.'
].join('\n')
mkdirSync('reports',{recursive:true})
writeFileSync('reports/auditoria-links.md',report+'\n')
writeFileSync('reports/auditoria-links.json',JSON.stringify({summary,routes,checked,external:urls,dynamic},null,2)+'\n')
console.log('Auditoria de links:',JSON.stringify(summary))
for(const x of broken.slice(0,50))console.error('ROTA INVÁLIDA',x.file+':'+x.line,x.url)
if(broken.length)process.exitCode=1
