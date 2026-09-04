// Tipos do módulo de autenticação. `Perfil` espelha a tabela `profiles` do
// Supabase (ver supabase/001_auth_profiles.sql) — é o que diferencia admin
// de usuário comum no app inteiro.

export type PapelUsuario = 'admin' | 'usuario'
export type StatusConta = 'ativo' | 'bloqueado'

export interface Perfil {
  id: string
  email: string
  nome: string
  role: PapelUsuario
  status: StatusConta
}

export interface ErroAuth {
  mensagem: string
}
