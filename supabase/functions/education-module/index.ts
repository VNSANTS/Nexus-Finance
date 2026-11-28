import catalogo from './catalogo.json' with { type: 'json' }
import { criarGateway } from './handler.ts'

Deno.serve(criarGateway(catalogo, {
  url: Deno.env.get('SUPABASE_URL') ?? '',
  chavePublica: Deno.env.get('SUPABASE_ANON_KEY') ?? '',
}))
