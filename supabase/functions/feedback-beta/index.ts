import { createClient } from 'jsr:@supabase/supabase-js@2.119.2'
import { gatewayAddress, requestIdentity } from './request.ts'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const CATEGORIAS = new Set(['Erro', 'Sugestão', 'Dificuldade', 'Elogio'])

function resposta(status: number, dados: Record<string, unknown>) {
  return new Response(JSON.stringify(dados), { status, headers })
}

async function hash(valor: string, secret: string): Promise<string> {
  const chave = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const digest = await crypto.subtle.sign('HMAC', chave, new TextEncoder().encode(valor))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function texto(valor: unknown, max: number): string | null {
  if (typeof valor !== 'string') return null
  const limpo = valor.trim()
  return limpo.length <= max ? limpo : null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })
  if (req.method !== 'POST') return resposta(405, { ok: false, error: 'method_not_allowed' })

  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > 8_000) return resposta(413, { ok: false, error: 'payload_too_large' })
    if (!req.body) return resposta(400, { ok: false, error: 'invalid_request' })
    const reader = req.body.getReader()
    const chunks: Uint8Array[] = []
    let totalBytes = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      totalBytes += value.byteLength
      if (totalBytes > 8_000) {
        await reader.cancel()
        return resposta(413, { ok: false, error: 'payload_too_large' })
      }
      chunks.push(value)
    }
    const raw = new Uint8Array(totalBytes)
    let offset = 0
    for (const chunk of chunks) { raw.set(chunk, offset); offset += chunk.byteLength }
    const body = JSON.parse(new TextDecoder().decode(raw))
    const installationId = body?.installationId
    const requestId = body?.requestId
    const categoria = body?.categoria
    const tela = texto(body?.tela ?? '', 120)
    const descricao = texto(body?.descricao, 2_000)
    const passos = texto(body?.passos ?? '', 1_200)
    const esperado = texto(body?.esperado ?? '', 600)

    if (typeof installationId !== 'string' || !UUID.test(installationId) ||
        typeof requestId !== 'string' || !UUID.test(requestId) || !CATEGORIAS.has(categoria) ||
        tela === null || descricao === null || descricao.length < 10 || passos === null || esperado === null) {
      return resposta(400, { ok: false, error: 'invalid_feedback' })
    }

    const url = Deno.env.get('SUPABASE_URL')
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !serviceKey) return resposta(503, { ok: false, error: 'service_unavailable' })

    const keys = Object.values(JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') ?? '{}'))
    const publicKeys = new Set([Deno.env.get('SUPABASE_ANON_KEY'), ...keys]
      .filter((key): key is string => typeof key === 'string' && key.length > 0))
    const identity = requestIdentity(req.headers, publicKeys)
    if (identity.kind === 'invalid') return resposta(401, { ok: false, error: 'invalid_session' })
    const remoteAddress = gatewayAddress(req.headers)
    if (!remoteAddress) return resposta(503, { ok: false, error: 'origin_unavailable' })
    const client = createClient(url, serviceKey, { auth: { persistSession: false } })
    let userId: string | null = null
    if (identity.kind === 'verify') {
      const { data, error } = await client.auth.getUser(identity.token)
      if (error || !data.user) return resposta(401, { ok: false, error: 'invalid_session' })
      userId = data.user.id
    }
    const installationHash = await hash(`nexus-feedback-installation:${installationId.toLowerCase()}`, serviceKey)
    const ipHash = await hash(`nexus-feedback-ip:${remoteAddress}`, serviceKey)
    const { data, error } = await client.rpc('submit_feedback_beta', {
      p_installation_hash: installationHash,
      p_request_id: requestId,
      p_ip_hash: ipHash,
      p_user_id: userId,
      p_category: categoria,
      p_screen: tela,
      p_description: descricao,
      p_steps: passos,
      p_expected: esperado,
    })
    if (error || !data) return resposta(503, { ok: false, error: 'submission_failed' })
    if (data.reason === 'idempotency_conflict') return resposta(409, { ok: false, error: data.reason })
    if (data.reason === 'rate_limited') return resposta(429, { ok: false, error: data.reason })
    if (data.accepted !== true) return resposta(503, { ok: false, error: 'submission_failed' })
    return resposta(200, { ok: true, accepted: true, duplicate: Boolean(data.duplicate) })
  } catch {
    return resposta(400, { ok: false, error: 'invalid_request' })
  }
})
