// Edge Function: admin-users
//
// Centraliza as 3 ações que o painel admin não consegue fazer só com a
// publishable key (porque exigem privilégio total sobre auth.users):
//   - excluirUsuario: remove o login de verdade (auth.users), não só o
//     perfil (public.profiles)
//   - editarEmail: troca o e-mail de LOGIN, não só o de exibição
//   - alternarBloqueio: usa o "ban" nativo do Supabase Auth, então um
//     usuário bloqueado não consegue mais logar de verdade (hoje o campo
//     `status` em profiles só é decorativo, não impede login nenhum)
//
// SEGURANÇA: esta function roda com a service_role key (acesso total),
// mas a service_role key NUNCA sai do servidor — ela vive só nas variáveis
// de ambiente da própria function, nunca no bundle do frontend. Todo
// request chega aqui com o token JWT de quem está chamando; a primeira
// coisa que a function faz é confirmar que esse usuário é admin de
// verdade no banco (nunca confia em nada vindo do frontend, nem que a
// pessoa diga "sou admin" — ela consulta profiles.role ela mesma).

import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Acao =
  | { tipo: 'excluirUsuario'; alvoId: string }
  | { tipo: 'editarEmail'; alvoId: string; novoEmail: string }
  | { tipo: 'alternarBloqueio'; alvoId: string; bloquear: boolean }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return respostaErro('Não autenticado.', 401)
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
      return respostaErro('Sessão inválida.', 401)
    }

    const { data: perfil, error: erroPerfil } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (erroPerfil || perfil?.role !== 'admin') {
      return respostaErro('Apenas administradores podem executar essa ação.', 403)
    }

    const acao: Acao = await req.json()

    switch (acao.tipo) {
      case 'excluirUsuario': {
        // Apaga o login (auth.users). O ON DELETE CASCADE em
        // public.profiles.id (ver supabase/001_auth_profiles.sql) já
        // remove o perfil automaticamente junto.
        const { error } = await supabaseAdmin.auth.admin.deleteUser(acao.alvoId)
        if (error) return respostaErro(error.message, 400)
        return respostaOk({ excluido: true })
      }

      case 'editarEmail': {
        // Troca o e-mail de LOGIN de verdade. O Supabase manda confirmação
        // pro e-mail novo automaticamente por padrão.
        const { error: erroAuth } = await supabaseAdmin.auth.admin.updateUserById(acao.alvoId, {
          email: acao.novoEmail,
        })
        if (erroAuth) return respostaErro(erroAuth.message, 400)

        // Mantém profiles.email em sincronia com o e-mail de login.
        const { error: erroPerfilUpdate } = await supabaseAdmin
          .from('profiles')
          .update({ email: acao.novoEmail })
          .eq('id', acao.alvoId)
        if (erroPerfilUpdate) return respostaErro(erroPerfilUpdate.message, 400)

        return respostaOk({ email: acao.novoEmail })
      }

      case 'alternarBloqueio': {
        // ban_duration nativo do Supabase Auth: '876000h' (~100 anos) é a
        // forma padrão de "bloquear até eu desbloquear manualmente" — não
        // existe um ban permanente literal na API, então usamos uma
        // duração bem longa. 'none' remove o ban.
        const { error: erroAuth } = await supabaseAdmin.auth.admin.updateUserById(acao.alvoId, {
          ban_duration: acao.bloquear ? '876000h' : 'none',
        })
        if (erroAuth) return respostaErro(erroAuth.message, 400)

        const { error: erroPerfilUpdate } = await supabaseAdmin
          .from('profiles')
          .update({ status: acao.bloquear ? 'bloqueado' : 'ativo' })
          .eq('id', acao.alvoId)
        if (erroPerfilUpdate) return respostaErro(erroPerfilUpdate.message, 400)

        return respostaOk({ status: acao.bloquear ? 'bloqueado' : 'ativo' })
      }

      default:
        return respostaErro('Ação desconhecida.', 400)
    }
  } catch (erro) {
    return respostaErro(erro instanceof Error ? erro.message : 'Erro interno.', 500)
  }
})

function respostaOk(dados: unknown) {
  return new Response(JSON.stringify({ ok: true, dados }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    status: 200,
  })
}

function respostaErro(mensagem: string, status: number) {
  return new Response(JSON.stringify({ ok: false, erro: mensagem }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    status,
  })
}
