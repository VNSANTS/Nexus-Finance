// Gera public/nexus-ai-indice-modulos.json a partir de
// banco-de-dados/modulos/_indice.ts e _trilhas.ts.
//
// Por que um JSON gerado em vez de a Edge Function importar o .ts direto:
// a function roda em Deno, fora do projeto Vite/React — não tem acesso aos
// aliases (@/, @banco-de-dados) nem ao pipeline de build TS. Gerar este
// JSON como parte do `npm run build` (ver package.json, "prebuild") garante
// que o índice que a IA usa nunca fica desatualizado manualmente: sempre
// que um módulo novo é adicionado em _indice.ts, o próximo build já
// republica o JSON com ele.
//
// Parsing feito com regex simples (não um parser TS de verdade) de
// propósito — os arquivos-fonte têm formato bem regular (um objeto por
// linha), então isso é suficiente e evita puxar uma dependência de
// parsing/typescript-eslint só para isto.
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raizProjeto = path.resolve(__dirname, '..')

const indiceSrc = readFileSync(path.join(raizProjeto, 'banco-de-dados/modulos/_indice.ts'), 'utf-8')
const trilhasSrc = readFileSync(path.join(raizProjeto, 'banco-de-dados/modulos/_trilhas.ts'), 'utf-8')

function extrairCampo(bloco, campo) {
  const m = bloco.match(new RegExp(`${campo}:\\s*'([^']*)'`))
  return m ? m[1] : null
}

// Cada módulo é um objeto `{ id: '...', trilhaId: '...', ..., titulo: '...', ... }`
// em uma linha só dentro do array MODULOS.
const linhasModulo = [...indiceSrc.matchAll(/\{\s*id:\s*'[^']*'.*?\}/g)].map((m) => m[0])
const modulos = linhasModulo.map((bloco) => ({
  id: extrairCampo(bloco, 'id'),
  trilhaId: extrairCampo(bloco, 'trilhaId'),
  titulo: extrairCampo(bloco, 'titulo'),
}))

const blocosTrilha = [...trilhasSrc.matchAll(/\{\s*id:\s*'[^']*'[\s\S]*?descricao:\s*'[^']*'[\s\S]*?\}/g)].map((m) => m[0])
const trilhas = blocosTrilha.map((bloco) => ({
  id: extrairCampo(bloco, 'id'),
  nome: extrairCampo(bloco, 'nome'),
  descricao: extrairCampo(bloco, 'descricao'),
}))

const indice = { trilhas, modulos }

writeFileSync(path.join(raizProjeto, 'public/nexus-ai-indice-modulos.json'), JSON.stringify(indice, null, 2))

console.log(`nexus-ai-indice-modulos.json gerado: ${trilhas.length} trilhas, ${modulos.length} módulos.`)
