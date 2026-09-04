import { supabase } from '@/lib/supabase'
import type { EdicaoUsuarioAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from '../types'

// Implementação real (Supabase) do backend do admin. Troque o import em
// ./index.ts de './mock' para './remoto' quando quiser sair do modo mock —
// nenhuma página do admin precisa mudar.
//
// LIMITAÇÃO ATUAL: a tabela `profiles` (supabase/001_auth_profiles.sql) só
// guarda id/email/nome/role/status — não tem xp, level, streak, badges etc.
// Esses dados hoje vivem só no localStorage de cada usuário (ver
// src/backend/local/progressStore.ts), não em `user_progress_modules` no
// banco. Até o app passar a sincronizar progresso pro Supabase de verdade,
// as métricas abaixo vêm zeradas — a lista de usuários e as ações
// (promover/bloquear/editar/excluir) já funcionam de verdade.

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
  const { data, error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', id)
    .select('id, email, nome, role, status, created_at')
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile)
}

export async function editarUsuario(id: string, dados: EdicaoUsuarioAdmin): Promise<UsuarioAdmin> {
  // Nota: mudar o e-mail aqui só atualiza a tabela `profiles` (exibição).
  // O e-mail de LOGIN em auth.users é uma coisa separada — trocar isso
  // exige supabase.auth.admin.updateUserById via service_role, ou seja, um
  // backend/Edge Function próprio (a publishable key não tem esse poder,
  // de propósito). Deixado assim por enquanto: edição de nome funciona
  // 100%; edição de e-mail atualiza só o perfil, não o login.
  const { data, error } = await supabase
    .from('profiles')
    .update({ nome: dados.nome, email: dados.email })
    .eq('id', id)
    .select('id, email, nome, role, status, created_at')
    .single()

  if (error) throw new Error(error.message)
  return mapearLinha(data as LinhaProfile)
}

export async function excluirUsuario(id: string): Promise<void> {
  // Isto apaga o PERFIL (linha em `profiles`), não a conta de login em
  // auth.users — excluir o login de fato exige a Admin API
  // (supabase.auth.admin.deleteUser), que só funciona com a service_role
  // key, e por segurança essa chave não pode ficar no frontend. Pra excluir
  // a conta por completo, é necessário criar uma Supabase Edge Function que
  // guarde a service_role key no servidor e seja chamada daqui via
  // supabase.functions.invoke(...). Deixei esse ponto sinalizado em vez de
  // implementar parcialmente algo que pareceria "excluído" mas deixaria o
  // login órfão ainda funcionando.
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
