import { supabase } from '@/lib/supabase'
import type { EdicaoUsuarioAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from '../types'

// Implementação real (Supabase) do backend do admin. Troque o import em
// ./index.ts de './mock' para './remoto' quando quiser sair do modo mock —
// nenhuma página do admin precisa mudar.
//
// Duas camadas de ação aqui:
//  - Promover/rebaixar admin e editar nome: update direto em `profiles`,
//    já protegido por RLS (só admin pode fazer update em linha alheia —
//    ver supabase/001_auth_profiles.sql).
//  - Excluir usuário, editar e-mail de LOGIN e bloquear de verdade: essas
//    três exigem privilégio total sobre auth.users, que a publishable key
//    não tem (de propósito). Passam pela Edge Function `admin-users`
//    (supabase/functions/admin-users/index.ts), que roda com a
//    service_role key só no servidor e confirma que quem está chamando é
//    admin antes de fazer qualquer coisa.
//
// LIMITAÇÃO ATUAL: a tabela `profiles` só guarda id/email/nome/role/status
// — não tem xp, level, streak, badges etc. Esses dados hoje vivem só no
// localStorage de cada usuário (ver src/backend/local/progressStore.ts),
// não em `user_progress_modules` no banco. Até o app passar a sincronizar
// progresso pro Supabase de verdade, as métricas abaixo vêm zeradas.

type LinhaProfile = {
  id: string
  email: string
  nome: string
  role: PapelUsuario
  status: StatusUsuario
  created_at: string
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

function mapearLinha(linha: LinhaProfile): UsuarioAdmin {
  return {
    id: linha.id,
    email: linha.email,
    nome: linha.nome,
    papel: linha.role,
    status: linha.status,
    criadoEm: linha.created_at,
    metricas: metricasVazias(),
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

export async function listarUsuarios(): Promise<UsuarioAdmin[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nome, role, status, created_at')
    .order('nome', { ascending: true })

  if (error) throw new Error(error.message)
  return (data as LinhaProfile[]).map(mapearLinha)
}

export async function atualizarPapel(id: string, papel: PapelUsuario): Promise<UsuarioAdmin> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: papel })
    .eq('id', id)
    .select('id, email, nome, role, status, created_at')
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile)
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
  return mapearLinha(data as LinhaProfile)
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
  return mapearLinha(data as LinhaProfile)
}

export async function excluirUsuario(id: string): Promise<void> {
  // Remove o login de verdade (auth.users) via Edge Function; o perfil em
  // `profiles` some sozinho por causa do ON DELETE CASCADE.
  await chamarAdminFunction({ tipo: 'excluirUsuario', alvoId: id })
}
