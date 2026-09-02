/**
 * Ponto único de entrada do "backend" do app.
 *
 * Hoje aponta pra src/backend/local (localStorage). Quando o backend real
 * existir (Supabase, API própria, etc.), a ideia é:
 *
 *   1. Criar src/backend/remoto/progressStore.ts com as mesmas 3 funções
 *      exportadas aqui (defaultProgress, carregarProgresso, salvarProgresso),
 *      mas fazendo a chamada de API/Supabase em vez de localStorage.
 *   2. Trocar a linha abaixo pra importar de './remoto/progressStore'.
 *
 * Nenhum outro arquivo do app (hook, páginas) importa de ./local ou
 * ./remoto diretamente — todo mundo importa só daqui. Assim, no dia da
 * troca, é 1 linha, não um import em cada tela.
 */
export { defaultProgress, carregarProgresso, carregarProgressoSincrono, salvarProgresso } from './local/progressStore'
