import webPush from 'npm:web-push@3.6.7'
import { autenticar, AVISO_ATUALIZACAO, chavesWebPushValidas, enderecoWebPushValido, rejeitarMetodoOuOrigem, resposta } from '../_shared/nexusNotifications.ts'

const OAUTH_URL = 'https://oauth2.googleapis.com/token'
const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i

type Dispositivo = { installation_id: string; lease: string; provider: 'fcm' | 'webpush' | null; address: string; web_keys: unknown }
type EstadoEnvio = 'accepted' | 'failed' | 'expired' | 'unavailable' | 'uncertain'
type ServicoFcm = { project_id: string; client_email: string; private_key: string }
let cacheFcm: { valor: { access_token: string; project: string }; ate: number } | null = null

function base64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function acessarFcm(config: ServicoFcm) {
  if (cacheFcm && cacheFcm.ate > Date.now() && cacheFcm.valor.project === config.project_id) return cacheFcm.valor
  if (!/^[a-z][a-z0-9-]{4,29}$/.test(config.project_id) || !config.client_email?.endsWith('.gserviceaccount.com')) throw new Error('Configuração FCM inválida.')
  const pem = config.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '')
  const privada = await crypto.subtle.importKey('pkcs8', Uint8Array.from(atob(pem), (byte) => byte.charCodeAt(0)), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const codificar = (parte: object) => base64Url(new TextEncoder().encode(JSON.stringify(parte)))
  const iat = Math.floor(Date.now() / 1000)
  const assinatura = `${codificar({ alg: 'RS256', typ: 'JWT' })}.${codificar({
    iss: config.client_email, scope: 'https://www.googleapis.com/auth/firebase.messaging', aud: OAUTH_URL, iat, exp: iat + 300,
  })}`
  const token = `${assinatura}.${base64Url(new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privada, new TextEncoder().encode(assinatura))))}`
  const response = await fetch(OAUTH_URL, {
    method: 'POST', signal: AbortSignal.timeout(7000),
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: token }),
  })
  if (!response.ok) throw new Error('Autorização FCM indisponível.')
  const { access_token } = await response.json()
  if (typeof access_token !== 'string') throw new Error('Autorização FCM inválida.')
  const valor = { access_token, project: config.project_id }
  cacheFcm = { valor, ate: Date.now() + 20 * 60_000 }
  return valor
}

async function enviarFcm(destino: Dispositivo, fcm: Awaited<ReturnType<typeof acessarFcm>>): Promise<EstadoEnvio> {
  const resposta = await fetch(`https://fcm.googleapis.com/v1/projects/${fcm.project}/messages:send`, {
    method: 'POST', signal: AbortSignal.timeout(5500),
    headers: { Authorization: `Bearer ${fcm.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: {
      token: destino.address,
      notification: { title: AVISO_ATUALIZACAO.title, body: AVISO_ATUALIZACAO.body },
      data: { url: AVISO_ATUALIZACAO.url }, android: { ttl: '3600s' },
    } }),
  })
  if (resposta.ok) return 'accepted'
  const { error } = await resposta.json().catch(() => ({}))
  return error?.details?.some((item: { errorCode?: string }) => item.errorCode === 'UNREGISTERED') ? 'expired' : 'failed'
}

function opcoesVapid() {
  const subject = Deno.env.get('WEB_PUSH_SUBJECT')
  const publicKey = Deno.env.get('WEB_PUSH_PUBLIC_KEY')
  const privateKey = Deno.env.get('WEB_PUSH_PRIVATE_KEY')
  return subject && publicKey && privateKey ? { subject, publicKey, privateKey } : null
}

async function enviarWebPush(destino: Dispositivo, vapidDetails: NonNullable<ReturnType<typeof opcoesVapid>>): Promise<EstadoEnvio> {
  if (!enderecoWebPushValido(destino.address) || !chavesWebPushValidas(destino.web_keys)) return 'expired'
  try {
    await webPush.sendNotification({ endpoint: destino.address, keys: destino.web_keys }, JSON.stringify(AVISO_ATUALIZACAO), {
      vapidDetails, TTL: 3600, timeout: 5500,
    })
    return 'accepted'
  } catch (e) {
    const codigo = (e as { statusCode?: number }).statusCode
    if (!codigo) return 'uncertain'
    return codigo === 404 || codigo === 410 ? 'expired' : 'failed'
  }
}

Deno.serve(async (req) => {
  const rejeitada = rejeitarMetodoOuOrigem(req)
  if (rejeitada) return rejeitada
  try {
    const sessao = await autenticar(req)
    if (!sessao) return resposta(req, { error: 'Sessão inválida.' }, 401)
    if (sessao.perfil?.role !== 'admin' || sessao.perfil.status !== 'ativo') return resposta(req, { error: 'Apenas administradores ativos podem enviar avisos.' }, 403)

    const fcmConfig = Deno.env.get('FCM_SERVICE_ACCOUNT_JSON')
    const vapid = opcoesVapid()
    if (!fcmConfig && !vapid) return resposta(req, { error: 'Configure a integração FCM ou Web Push no servidor.' }, 503)

    const { db, userId } = sessao
    let job = new URL(req.url).searchParams.get('job')
    if (job && !UUID.test(job)) return resposta(req, { error: 'Envio inválido.' }, 400)
    if (!job) {
      const { data, error } = await db.rpc('start_nexus_update_notice', { p_sender: userId })
      if (error) throw error
      if (!data) return resposta(req, { error: 'Aguarde cinco minutos entre avisos de atualização.' }, 429)
      job = data as string
    }

    const { data: lote, error: erroLote } = await db.rpc('claim_nexus_notice_recipients', { p_job: job })
    if (erroLote) throw erroLote
    const destinos = lote as Dispositivo[]
    let fcm: Awaited<ReturnType<typeof acessarFcm>> | null = null
    if (fcmConfig && destinos.some((d) => d.provider === 'fcm')) {
      try { fcm = await acessarFcm(JSON.parse(fcmConfig)) } catch { /* Warnings reported as unavailable. */ }
    }
    await Promise.all(destinos.map(async (destino) => {
      let estado: EstadoEnvio = 'unavailable'
      try {
        if (destino.provider === 'fcm' && fcm) estado = await enviarFcm(destino, fcm)
        if (destino.provider === 'webpush' && vapid) estado = await enviarWebPush(destino, vapid)
      } catch {
        estado = 'uncertain'
      }
      const { error } = await db.from('nexus_notice_recipients')
        .update({ state: estado === 'expired' ? 'failed' : estado, lease: null, lease_expires_at: null })
        .eq('job_id', job).eq('installation_id', destino.installation_id).eq('lease', destino.lease)
      if (error) throw error
      if (estado === 'expired') await db.from('nexus_notification_devices').delete().eq('installation_id', destino.installation_id).eq('address', destino.address)
    }))

    const { data: status, error: erroStatus } = await db.rpc('nexus_notice_status', { p_job: job })
    if (erroStatus) throw erroStatus
    if (!status) return resposta(req, { error: 'Envio não encontrado.' }, 404)
    return resposta(req, { ...status, aguardando: destinos.length === 0 && !status.concluido })
  } catch {
    return resposta(req, { error: 'Não foi possível enviar o aviso de atualização.' }, 503)
  }
})
