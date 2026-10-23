// Edge Function: admin-users
//
// Centraliza ações que o app não consegue fazer só com a publishable key
// (porque exigem privilégio total sobre auth.users):
//   - excluirUsuario (admin): remove o login de verdade (auth.users) de
//     OUTRO usuário, não só o perfil (public.profiles)
//   - editarEmail (admin): troca o e-mail de LOGIN de outro usuário, não
//     só o de exibição
//   - alternarBloqueio (admin): usa o "ban" nativo do Supabase Auth, então
//     um usuário bloqueado não consegue mais logar de verdade
//   - excluirPropriaConta (qualquer usuário logado): exclui A PRÓPRIA
//     conta — única ação aqui que não exige ser admin, só exige que
//     alvoId bata com quem está fazendo a chamada
//
// SEGURANÇA: esta function roda com a service_role key (acesso total),
// mas a service_role key NUNCA sai do servidor — ela vive só nas variáveis
// de ambiente da própria function, nunca no bundle do frontend. Todo
// request chega aqui com o token JWT de quem está chamando; a function
// nunca confia em nada vindo do frontend sobre quem é o usuário ou se ele
// é admin — sempre confirma direto no banco.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const ORIGENS_PERMITIDAS = new Set([
  'https://vnsants.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

function corsHeaders(req: Request) {
  const origin = req.headers.get('Origin')
  const originPermitida = origin && ORIGENS_PERMITIDAS.has(origin) ? origin : 'https://vnsants.github.io'
  return {
    'Access-Control-Allow-Origin': originPermitida,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  }
}

type Acao =
  | { tipo: 'excluirUsuario'; alvoId: string }
  | { tipo: 'editarEmail'; alvoId: string; novoEmail: string }
  | { tipo: 'alternarBloqueio'; alvoId: string; bloquear: boolean }
  | { tipo: 'excluirPropriaConta'; alvoId: string }
  | { tipo: 'listarStatusAuth' }
  | { tipo: 'reenviarConfirmacao'; alvoId: string; email: string }
  | { tipo: 'confirmarUsuario'; alvoId: string }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(req) })
  }

  const origin = req.headers.get('Origin')
  if (origin && !ORIGENS_PERMITIDAS.has(origin)) {
    return new Response('Origem não permitida.', { status: 403 })
  }
  if (req.method !== 'POST') {
    return new Response('Método não permitido.', { status: 405, headers: { Allow: 'POST, OPTIONS' } })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return respostaErro('Não autenticado.', 401, req)
    }

    // Cliente "de serviço" (privilégio total) — só usado depois de
    // confirmarmos que quem chamou é admin.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Cliente "do usuário" (mesmo token de quem chamou) — usado só pra
    // descobrir quem é essa pessoa e checar o role dela, sem privilégio
    // nenhum extra.
    const supabaseUsuario = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: erroUsuario } = await supabaseUsuario.auth.getUser()
    if (erroUsuario || !user) {
      return respostaErro('Sessão inválida.', 401, req)
    }

    const acaoDesconhecida: unknown = await req.json()
    if (!acaoDesconhecida || typeof acaoDesconhecida !== 'object' || Array.isArray(acaoDesconhecida)) {
      return respostaErro('Corpo da requisição inválido.', 400, req)
    }
    const acaoRecord = acaoDesconhecida as Record<string, unknown>
    const tiposPermitidos = ['excluirUsuario', 'editarEmail', 'alternarBloqueio', 'excluirPropriaConta', 'listarStatusAuth', 'reenviarConfirmacao', 'confirmarUsuario']
    if (typeof acaoRecord.tipo !== 'string' || !tiposPermitidos.includes(acaoRecord.tipo as string)) {
      return respostaErro('Ação inválida.', 400, req)
    }
    const acoesComAlvo = ['excluirUsuario', 'editarEmail', 'alternarBloqueio', 'excluirPropriaConta', 'reenviarConfirmacao', 'confirmarUsuario']
    if (acoesComAlvo.includes(acaoRecord.tipo as string) && (typeof acaoRecord.alvoId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(acaoRecord.alvoId as string))) {
      return respostaErro('Identificador de usuário inválido.', 400, req)
    }
    if (acaoRecord.tipo === 'editarEmail' && (typeof acaoRecord.novoEmail !== 'string' || (acaoRecord.novoEmail as string).length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(acaoRecord.novoEmail as string))) {
      return respostaErro('E-mail inválido.', 400, req)
    }
    if (acaoRecord.tipo === 'reenviarConfirmacao' && (typeof acaoRecord.email !== 'string' || (acaoRecord.email as string).length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(acaoRecord.email as string))) {
      return respostaErro('E-mail inválido.', 400, req)
    }
    if (acaoRecord.tipo === 'alternarBloqueio' && typeof acaoRecord.bloquear !== 'boolean') {
      return respostaErro('Estado de bloqueio inválido.', 400, req)
    }

    const acao = acaoDesconhecida as Acao

    // 'excluirPropriaConta' é a única ação que NÃO exige ser admin — só
    // exige que a pessoa esteja excluindo a própria conta (alvoId tem que
    // bater com o id de quem está logado). Todas as outras ações mexem em
    // conta de terceiros e continuam exigindo role='admin' no banco.
    if (acao.tipo === 'excluirPropriaConta') {
      if (acao.alvoId !== user.id) {
        return respostaErro('Só é possível excluir a própria conta.', 403, req)
      }
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
      if (error) return respostaErro('Não foi possível concluir a operação.', 400, req)
      return respostaOk({ excluido: true }, req)
    }

    const { data: perfil, error: erroPerfil } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (erroPerfil || perfil?.role !== 'admin') {
      return respostaErro('Apenas administradores podem executar essa ação.', 403, req)
    }

    switch (acao.tipo) {
      case 'excluirUsuario': {
        // Apaga o login (auth.users). O ON DELETE CASCADE em
        // public.profiles.id (ver supabase/001_auth_profiles.sql) já
        // remove o perfil automaticamente junto.
        const { error } = await supabaseAdmin.auth.admin.deleteUser(acao.alvoId)
        if (error) return respostaErro('Não foi possível concluir a operação.', 400, req)
        return respostaOk({ excluido: true }, req)
      }

      case 'editarEmail': {
        // Troca o e-mail de LOGIN de verdade. O Supabase manda confirmação
        // pro e-mail novo automaticamente por padrão.
        const { error: erroAuth } = await supabaseAdmin.auth.admin.updateUserById(acao.alvoId, {
          email: acao.novoEmail,
        })
        if (erroAuth) return respostaErro('Não foi possível atualizar a conta.', 400, req)

        // Mantém profiles.email em sincronia com o e-mail de login.
        const { error: erroPerfilUpdate } = await supabaseAdmin
          .from('profiles')
          .update({ email: acao.novoEmail })
          .eq('id', acao.alvoId)
        if (erroPerfilUpdate) return respostaErro('Não foi possível atualizar o perfil.', 400, req)

        return respostaOk({ email: acao.novoEmail }, req)
      }

      case 'alternarBloqueio': {
        // ban_duration nativo do Supabase Auth: '876000h' (~100 anos) é a
        // forma padrão de "bloquear até eu desbloquear manualmente" — não
        // existe um ban permanente literal na API, então usamos uma
        // duração bem longa. 'none' remove o ban.
        const { error: erroAuth } = await supabaseAdmin.auth.admin.updateUserById(acao.alvoId, {
          ban_duration: acao.bloquear ? '876000h' : 'none',
        })
        if (erroAuth) return respostaErro('Não foi possível atualizar a conta.', 400, req)

        const { error: erroPerfilUpdate } = await supabaseAdmin
          .from('profiles')
          .update({ status: acao.bloquear ? 'bloqueado' : 'ativo' })
          .eq('id', acao.alvoId)
        if (erroPerfilUpdate) return respostaErro('Não foi possível atualizar o perfil.', 400, req)

        return respostaOk({ status: acao.bloquear ? 'bloqueado' : 'ativo' }, req)
      }

      // Status de confirmação de e-mail (email_confirmed_at), último login
      // e banimento vêm de auth.users — a publishable key não enxerga essa
      // tabela (só a service_role, por isso passa por aqui). listUsers só
      // devolve até 1000 por página; suficiente pra esse app hoje. Se um
      // dia passar disso, precisa paginar (page/perPage) e juntar os lotes.
      case 'listarStatusAuth': {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })
        if (error) return respostaErro('Não foi possível concluir a operação.', 400, req)

        const status = data.users.map((u) => ({
          id: u.id,
          emailConfirmado: Boolean(u.email_confirmed_at),
          ultimoLogin: u.last_sign_in_at ?? null,
        }))
        return respostaOk({ status }, req)
      }

      // Reenvia o e-mail de confirmação de cadastro (usa a config de SMTP
      // do próprio projeto Supabase — gratuita, mas com limite baixo no
      // plano Free; ok pro volume de um app pessoal).
      case 'reenviarConfirmacao': {
        const { error } = await supabaseAdmin.auth.resend({ type: 'signup', email: acao.email })
        if (error) return respostaErro('Não foi possível concluir a operação.', 400, req)
        return respostaOk({ reenviado: true }, req)
      }

      // Confirma o e-mail manualmente (sem depender do usuário clicar no
      // link) — útil quando o e-mail de confirmação não chegou por algum
      // motivo e o admin já verificou a identidade da pessoa por outro meio.
      case 'confirmarUsuario': {
        const { error } = await supabaseAdmin.auth.admin.updateUserById(acao.alvoId, { email_confirm: true })
        if (error) return respostaErro('Não foi possível concluir a operação.', 400, req)
        return respostaOk({ confirmado: true }, req)
      }

      default:
        return respostaErro('Ação desconhecida.', 400, req)
    }
  } catch (erro) {
    console.error('Erro inesperado na admin-users:', erro)\n    return respostaErro('Erro interno.', 500, req)
  }
})

function respostaOk(dados: unknown, req: Request) {
  return new Response(JSON.stringify({ ok: true, dados }), {
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json' },
    status: 200,
  })
}

function respostaErro(mensagem: string, status: number, req: Request) {
  return new Response(JSON.stringify({ ok: false, erro: mensagem }), {
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json' },
    status,
  })
}
