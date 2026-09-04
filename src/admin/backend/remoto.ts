import { supabase } from '@/lib/supabase'
import type { EdicaoMetricasAdmin, EdicaoUsuarioAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from '../types'

// Implementação real (Supabase) do backend do admin. Troque o import em
// ./index.ts de './mock' para './remoto' quando quiser sair do modo mock —
// nenhuma página do admin precisa mudar.
//
// Três camadas de ação aqui:
//  - Promover/rebaixar admin e editar nome: update direto em `profiles`,
//    já protegido por RLS (só admin pode fazer update em linha alheia —
//    ver supabase/001_auth_profiles.sql).
//  - Editar métricas (XP, level, streak, badges, desafios): update direto
//    em `user_progress` (ver supabase/002_user_progress.sql) — RLS já
//    permite admin escrever em qualquer linha, não precisa de Edge
//    Function pra isso (não mexe em auth.users).
//  - Excluir usuário, editar e-mail de LOGIN e bloquear de verdade: essas
//    três exigem privilégio total sobre auth.users, que a publishable key
//    não tem (de propósito). Passam pela Edge Function `admin-users`
//    (supabase/functions/admin-users/index.ts), que roda com a
//    service_role key só no servidor e confirma que quem está chamando é
//    admin antes de fazer qualquer coisa.
//
// `profiles` e `user_progress` são tabelas separadas (progresso é opcional
// — usuário recém-cadastrado ainda não tem linha em user_progress até
// sincronizar pela primeira vez), então listarUsuarios faz duas queries e
// mescla em memória em vez de um join no Supabase JS.

type LinhaProfile = {
  id: string
  email: string
  nome: string
  role: PapelUsuario
  status: StatusUsuario
  created_at: string
}

type LinhaProgresso = {
  user_id: string
  xp: number
  level: number
  level_name: string
  streak: number
  badges_count: number
  desafios_completos: number
  modulos_concluidos: number
  risk_profile: 'conservador' | 'moderado' | 'agressivo' | null
  ultima_atividade: string | null
}

function metricasVazias(): UsuarioAdmin['metricas'] {
  return {
    xp: 0,
    level: 1,
    levelName: 'Novato',
    streak: 0,
    modulosConcluidos: 0,
    totalModulos: 66,
    badges: 0,
    desafiosCompletos: 0,
    riskProfile: null,
    ultimaAtividade: null,
  }
}

function mapearMetricas(linha: LinhaProgresso | undefined): UsuarioAdmin['metricas'] {
  if (!linha) return metricasVazias()
  return {
    xp: linha.xp,
    level: linha.level,
    levelName: linha.level_name,
    streak: linha.streak,
    modulosConcluidos: linha.modulos_concluidos,
    totalModulos: 66,
    badges: linha.badges_count,
    desafiosCompletos: linha.desafios_completos,
    riskProfile: linha.risk_profile,
    ultimaAtividade: linha.ultima_atividade,
  }
}

function mapearLinha(linha: LinhaProfile, progresso: LinhaProgresso | undefined): UsuarioAdmin {
  return {
    id: linha.id,
    email: linha.email,
    nome: linha.nome,
    papel: linha.role,
    status: linha.status,
    criadoEm: linha.created_at,
    metricas: mapearMetricas(progresso),
  }
}

// Chama a Edge Function admin-users, repassando o token da sessão atual
// (é esse token que a function usa pra confirmar que quem está chamando é
// admin de verdade, do lado do servidor).
async function chamarAdminFunction<T>(payload: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-users', { body: payload })
  if (error) throw new Error(error.message)
  if (!data?.ok) throw new Error(data?.erro ?? 'Falha na operação administrativa.')
  return data.dados as T
}

async function buscarProgressoPorId(id: string): Promise<LinhaProgresso | undefined> {
  const { data } = await supabase
    .from('user_progress')
    .select('user_id, xp, level, level_name, streak, badges_count, desafios_completos, modulos_concluidos, risk_profile, ultima_atividade')
    .eq('user_id', id)
    .maybeSingle()
  return (data as LinhaProgresso | null) ?? undefined
}

export async function listarUsuarios(): Promise<UsuarioAdmin[]> {
  const [{ data: perfis, error: erroPerfis }, { data: progressos, error: erroProgresso }] = await Promise.all([
    supabase.from('profiles').select('id, email, nome, role, status, created_at').order('nome', { ascending: true }),
    supabase
      .from('user_progress')
      .select('user_id, xp, level, level_name, streak, badges_count, desafios_completos, modulos_concluidos, risk_profile, ultima_atividade'),
  ])

  if (erroPerfis) throw new Error(erroPerfis.message)
  // Se user_progress ainda não existir no banco (ex: SQL 002 não rodado
  // ainda), não derruba a listagem — só mostra métricas zeradas pra todos.
  const progressoPorId = new Map(
    (erroProgresso ? [] : ((progressos as LinhaProgresso[] | null) ?? [])).map((p) => [p.user_id, p])
  )

  return (perfis as LinhaProfile[]).map((p) => mapearLinha(p, progressoPorId.get(p.id)))
}

export async function atualizarPapel(id: string, papel: PapelUsuario): Promise<UsuarioAdmin> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: papel })
    .eq('id', id)
    .select('id, email, nome, role, status, created_at')
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile, await buscarProgressoPorId(id))
}

export async function atualizarStatus(id: string, status: StatusUsuario): Promise<UsuarioAdmin> {
  // Bloqueio de verdade — passa pela Edge Function pra usar o "ban" nativo
  // do Supabase Auth, senão a pessoa bloqueada continuaria conseguindo
  // logar normalmente (só `profiles.status` mudando não impede login).
  await chamarAdminFunction({ tipo: 'alternarBloqueio', alvoId: id, bloquear: status === 'bloqueado' })

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nome, role, status, created_at')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile, await buscarProgressoPorId(id))
}

export async function editarUsuario(id: string, dados: EdicaoUsuarioAdmin): Promise<UsuarioAdmin> {
  // E-mail passa pela Edge Function (troca o login de verdade em
  // auth.users, não só a exibição). Nome é update direto, não precisa de
  // privilégio extra.
  await chamarAdminFunction({ tipo: 'editarEmail', alvoId: id, novoEmail: dados.email })

  const { data, error } = await supabase
    .from('profiles')
    .update({ nome: dados.nome })
    .eq('id', id)
    .select('id, email, nome, role, status, created_at')
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile, await buscarProgressoPorId(id))
}

// Edita XP, level, streak, badges e desafios completos de um usuário.
// Update direto em `user_progress` — RLS (ver 002_user_progress.sql) já
// libera admin escrever em qualquer linha, não precisa de Edge Function
// (só as ações que mexem em auth.users precisam disso).
//
// Se a linha ainda não existir (usuário nunca sincronizou progresso —
// cadastro muito recente, ou ainda não abriu o app depois de logar), faz
// upsert: cria a linha já com os valores editados pelo admin.
export async function atualizarMetricas(id: string, dados: EdicaoMetricasAdmin): Promise<UsuarioAdmin> {
  const { error } = await supabase.from('user_progress').upsert(
    {
      user_id: id,
      xp: dados.xp,
      level: dados.level,
      streak: dados.streak,
      badges_count: dados.badges,
      desafios_completos: dados.desafiosCompletos,
    },
    { onConflict: 'user_id' }
  )
  if (error) throw new Error(error.message)

  const { data: perfil, error: erroPerfil } = await supabase
    .from('profiles')
    .select('id, email, nome, role, status, created_at')
    .eq('id', id)
    .single()

  if (erroPerfil) throw new Error(erroPerfil.message)
  return mapearLinha(perfil as LinhaProfile, await buscarProgressoPorId(id))
}

export async function excluirUsuario(id: string): Promise<void> {
  // Remove o login de verdade (auth.users) via Edge Function; o perfil em
  // `profiles` some sozinho por causa do ON DELETE CASCADE (e a linha em
  // user_progress também, mesmo mecanismo).
  await chamarAdminFunction({ tipo: 'excluirUsuario', alvoId: id })
}
