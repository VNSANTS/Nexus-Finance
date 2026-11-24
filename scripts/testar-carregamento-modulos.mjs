// Tests real module loader code, replacing only Vite's compile-time glob import.
// No external requests or user credentials.
import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {Script} from 'node:vm'
import {transformSync} from 'esbuild'

const source=readFileSync('banco-de-dados/modulos/index.ts','utf8')
const marker="import.meta.glob<Record<string, unknown>>('./m*.ts')"
assert.ok(source.includes(marker),'Expected Vite module glob is present')
const prepared=source.replace(marker,'globalThis.__TEST_MODULE_LOADERS__')
const compiled=transformSync(prepared,{loader:'ts',format:'cjs',target:'es2022'}).code

function load(loaders){
  const module={exports:{}}
  const env={
    module,exports:module.exports,Map,Object,Promise,console,
    __TEST_MODULE_LOADERS__:loaders,
    require(name){
      if(name==='./_indice')return{MODULOS:[],getModulosByTrilha:()=>[]}
      if(name==='./_trilhas')return{TRILHAS:[]}
      throw Error('Unexpected dependency: '+name)
    }
  }
  new Script(compiled,{filename:'banco-de-dados/modulos/index.ts'}).runInNewContext(env)
  return module.exports
}

test('Loads only registered Vite modules and caches the result',async()=>{
  let calls=0
  const m={id:'alfabeto',titulo:'Alfabeto'}
  const registry={
    './m01-alfabeto.ts':()=>{calls++;return Promise.resolve({module:m})},
    './m02-beta.ts':()=>Promise.resolve({module:{id:'beta',titulo:'Beta'}})
  }
  const x=load(registry)
  assert.equal(x.TOTAL_MODULOS_COMPLETOS,2)
  assert.deepEqual(Array.from(x.IDS_MODULOS_COMPLETOS),['alfabeto','beta'])
  assert.equal(x.temConteudoCompleto('alfabeto'),true)
  assert.equal(await x.carregarModulo('alfabeto'),m)
  assert.equal(await x.carregarModulo('alfabeto'),m)
  assert.equal(calls,1)
})

test('Rejects inherited Object method names with no executable lookup',async()=>{
  let calls=0
  const registry={'./m01-alfabeto.ts':()=>{calls++;return Promise.resolve({module:{id:'alfabeto',titulo:'Alfabeto'}})}}
  const x=load(registry)
  for(const id of ['constructor','__proto__','prototype','toString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','__defineGetter__','__lookupSetter__']){
    assert.equal(x.temConteudoCompleto(id),false,id)
    assert.equal(await x.carregarModulo(id),null,id)
    x.prefetchModulo(id)
  }
  assert.equal(calls,0)
})

test('Unknown, malformed or missing module never executes a loader',async()=>{
  const x=load({'./m01-alfabeto.ts':()=>Promise.resolve({module:{id:'alfabeto',titulo:'Alfabeto'}})})
  for(const id of ['missing','', '../../../admin','non-existent','alfabeto/extra','alfabeto?query=1']){
    assert.equal(x.temConteudoCompleto(id),false)
    assert.equal(await x.carregarModulo(id),null)
  }
})

test('Catches rejected Vite dynamic imports without crashing route',async()=>{
  const x=load({'./m01-broken.ts':()=>Promise.reject(Error('asset offline'))})
  assert.equal(await x.carregarModulo('broken'),null)
  assert.equal(await x.carregarModulo('broken'),null)
})

test('Deduplicates simultaneous module fetches and clears in-flight state',async()=>{
  let calls=0
  const x=load({'./m01-test.ts':()=>{
    calls++
    return new Promise(resolve=>setTimeout(()=>resolve({modulo:{id:'test',titulo:'Test'}}),1))
  }})
  const [a,b]=await Promise.all([x.carregarModulo('test'),x.carregarModulo('test')])
  assert.equal(a.id,'test')
  assert.equal(b.id,'test')
  assert.equal(calls,1)
})
