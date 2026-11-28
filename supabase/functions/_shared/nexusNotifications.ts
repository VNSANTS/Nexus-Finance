import { createClient } from 'jsr:@supabase/supabase-js@2'

import { LINK_OFICIAL, ORIGENS } from './origensApp.ts'
export { LINK_OFICIAL }
export const AVISO_ATUALIZACAO = {
  title: 'Atualização do Nexus Finance',
  body: 'Confira as novidades no site oficial do Nexus Finance.',
  url: LINK_OFICIAL,
}

export function cabecalhos(req: Request) {
  const origin = req.headers.get('Origin')
  return {
    'Access-Control-Allow-Origin': origin && ORIGENS.has(origin) ? origin : LINK_OFICIAL,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Cache-Control': 'no-store', Vary: 'Origin',
  }
}

export function resposta(req: Request, body: Record<string, unknown>, status = 200) {
  return Response.json(body, { headers: cabecalhos(req), status })
}

export function rejeitarMetodoOuOrigem(req: Request) {
  const origin = req.headers.get('Origin')
  if (origin && !ORIGENS.has(origin)) return resposta(req, { error: 'Origem não permitida.' }, 403)
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cabecalhos(req) })
  if (req.method !== 'POST') return resposta(req, { error: 'Método não permitido.' }, 405)
  return null
}

export async function autenticar(req: Request) {
  const bearer = /^Bearer (\S+)$/i.exec(req.headers.get('Authorization') ?? '')?.[1]
  if (!bearer) return null
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data: { user }, error } = await db.auth.getUser(bearer)
  if (error || !user || user.is_anonymous) return null
  const { data: perfil } = await db.from('profiles').select('role,status').eq('id', user.id).maybeSingle()
  return { db, userId: user.id, perfil }
}

export function enderecoWebPushValido(endereco: string) {
  if (endereco.length > 2048) return false
  try {
    const url = new URL(endereco)
    if (url.protocol !== 'https:' || url.port || url.username || url.password || url.hash) return false
    if (url.hostname === 'fcm.googleapis.com') return /^\/(?:fcm\/send|wp)\/.+/.test(url.pathname)
    if (url.hostname === 'updates.push.services.mozilla.com') return /^\/wpush\/.+/.test(url.pathname)
    return url.hostname === 'web.push.apple.com' && url.pathname.length > 1
  } catch {
    return false
  }
}

export function chavesWebPushValidas(valor: unknown): valor is { p256dh: string; auth: string } {
  if (!valor || typeof valor !== 'object') return false
  const { p256dh, auth } = valor as Record<string, unknown>
  return typeof p256dh === 'string' && /^[A-Za-z0-9_-]{87}={0,1}$/.test(p256dh)
    && typeof auth === 'string' && /^[A-Za-z0-9_-]{22}={0,2}$/.test(auth)
}
