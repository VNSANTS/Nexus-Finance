import { autenticar, chavesWebPushValidas, enderecoWebPushValido, rejeitarMetodoOuOrigem, resposta } from '../_shared/nexusNotifications.ts'
import { lerCadastro } from './body.ts'

const UUID_V4 = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i

Deno.serve(async (req) => {
  const rejeitada = rejeitarMetodoOuOrigem(req)
  if (rejeitada) return rejeitada
  try {
    const sessao = await autenticar(req)
    if (!sessao) return resposta(req, { error: 'Sessão inválida.' }, 401)
    const texto = await lerCadastro(req)
    if (texto === null) return resposta(req, { error: 'Cadastro ausente ou grande demais.' }, 413)
    let corpo: Record<string, unknown>
    try {
      corpo = JSON.parse(texto)
      if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) throw new Error()
    } catch {
      return resposta(req, { error: 'Cadastro inválido.' }, 400)
    }
    const { acao, instalacao, prova, provider, address, keys } = corpo
    if (typeof instalacao !== 'string' || !UUID_V4.test(instalacao) ||
        typeof prova !== 'string' || !/^[0-9a-f]{64}$/.test(prova)) return resposta(req, { error: 'Instalação inválida.' }, 400)

    const { db, userId, perfil } = sessao
    if (acao !== 'remover') {
      if (acao !== 'registrar' || typeof address !== 'string') return resposta(req, { error: 'Cadastro inválido.' }, 400)
      if (perfil?.status !== 'ativo') return resposta(req, { error: 'Conta sem acesso.' }, 403)
      const fcm = provider === 'fcm' && /^[A-Za-z\d_:.-]{24,2048}$/.test(address)
      const webpush = provider === 'webpush' && enderecoWebPushValido(address) && chavesWebPushValidas(keys)
      if (!fcm && !webpush) return resposta(req, { error: 'Dispositivo ou navegador incompatível.' }, 422)
      const { data: config, error } = await db.from('app_config').select('modo_manutencao').eq('id', true).single()
      if (error) throw error
      if (config.modo_manutencao && perfil.role !== 'admin') return resposta(req, { error: 'Aplicativo em manutenção.' }, 503)
    }
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(prova))
    const proofHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
    const { data, error } = await db.rpc('manage_nexus_notification_device', {
      p_user: userId, p_install: instalacao, p_proof_hash: proofHash, p_action: acao,
      p_provider: acao === 'registrar' ? provider : null, p_address: acao === 'registrar' ? address : null,
      p_keys: acao === 'registrar' && provider === 'webpush' ? { p256dh: (keys as Record<string,string>).p256dh, auth: (keys as Record<string,string>).auth } : null,
    })
    if (error) throw error
    if (data === 'limited') return resposta(req, { error: 'Limite de cadastro de dispositivos atingido.' }, 429)
    if (data !== 'ok') return resposta(req, { error: 'Não foi possível vincular ou remover esta instalação.' }, 403)
    return resposta(req, { ok: true })
  } catch {
    return resposta(req, { error: 'Falha ao registrar ou remover o dispositivo.' }, 503)
  }
})
