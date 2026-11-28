import { LINK_OFICIAL, ORIGENS } from '../_shared/origensApp.ts'

interface Configuracao {
  url: string
  chavePublica: string
  consultar?: typeof fetch
}

export function criarGateway(catalogo: Record<string, unknown>, config: Configuracao) {
  const consultar = config.consultar ?? fetch
  return async (req: Request): Promise<Response> => {
    const origem = req.headers.get('Origin')
    const headers = {
      'Access-Control-Allow-Origin': origem && ORIGENS.has(origem) ? origem : LINK_OFICIAL,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'private, no-store',
      Vary: 'Origin, Authorization',
    }
    const erro = (status: number, motivo: string) => Response.json({ error: motivo }, { status, headers })
    if (origem && !ORIGENS.has(origem)) return erro(403, 'Origem não permitida.')
    if (req.method === 'OPTIONS') return new Response(null, { headers, status: 204 })
    if (req.method !== 'GET') return erro(405, 'Use GET.')
    const authorization = req.headers.get('Authorization') ?? ''
    if (!/^Bearer [^\s]{1,8192}$/i.test(authorization)) return erro(401, 'Sessão necessária.')
    const ids = new URL(req.url).searchParams.getAll('id')
    if (ids.length !== 1 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(ids[0]) || ids[0].length > 100) return erro(400, 'Identificador inválido.')
    if (!config.url || !config.chavePublica) return erro(503, 'Serviço indisponível.')
    const opcoes = {
      headers: { Authorization: authorization, apikey: config.chavePublica },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store' as const,
    }
    try {
      // O Auth verifica o bearer no servidor. PostgREST aplica RLS ao mesmo
      // bearer, com a chave pública do projeto, em ambas as leituras.
      const auth = await consultar(config.url + '/auth/v1/user', opcoes)
      if (!auth.ok) return auth.status === 401 || auth.status === 403 ? erro(401, 'Sessão inválida.') : erro(503, 'Autenticação indisponível.')
      const user = await auth.json()
      if (!user.id || user.is_anonymous === true) return erro(403, 'Uma conta cadastrada é necessária.')
      const [perfilRes, configRes] = await Promise.all([
        consultar(config.url + '/rest/v1/profiles?id=eq.' + encodeURIComponent(user.id) + '&select=id,role,status', opcoes),
        consultar(config.url + '/rest/v1/app_config?id=eq.true&select=modo_manutencao', opcoes),
      ])
      if (!perfilRes.ok || !configRes.ok) return erro(503, 'Verificação de acesso indisponível.')
      const [perfis, configs] = await Promise.all([perfilRes.json(), configRes.json()])
      const perfil = Array.isArray(perfis) && perfis.length === 1 ? perfis[0] : null
      if (perfil?.id !== user.id || perfil.status !== 'ativo') return erro(403, 'Conta sem acesso.')
      if (configs?.length !== 1 || typeof configs[0]?.modo_manutencao !== 'boolean') return erro(503, 'Configuração indisponível.')
      if (configs[0].modo_manutencao && perfil.role !== 'admin') return erro(503, 'Manutenção em andamento.')
      if (!Object.hasOwn(catalogo, ids[0])) return erro(404, 'Módulo não encontrado.')
      return Response.json(catalogo[ids[0]], { headers })
    } catch {
      return erro(503, 'Não foi possível verificar o acesso agora.')
    }
  }
}
