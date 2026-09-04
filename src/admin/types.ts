// Tipos do painel de administração (controle de usuários).
//
// Hoje os dados vêm de src/admin/mockUsers.ts (array em memória). Quando a
// API existir, a ideia é a mesma separação que já existe em
// src/backend/index.ts: criar src/admin/backend/remoto.ts com as mesmas
// funções exportadas por src/admin/backend/index.ts (hoje apontando pro
// mock) e trocar só o import — nenhuma página do admin muda.
//
// Os campos abaixo espelham a tabela `users` do schema.sql (id, email,
// name, meta) mais os campos de controle que essa tabela ainda não tem
// (role, status) e que precisarão ser adicionados por migration quando o
// backend real for criado — ver nota em mockUsers.ts.

export type PapelUsuario = 'admin' | 'usuario'

export type StatusUsuario = 'ativo' | 'bloqueado'

// Espelha o que já existe em UserProgress (src/types/index.ts), mas achatado
// pra só os campos que fazem sentido mostrar numa lista/detalhe de admin.
export interface MetricasUsuario {
  xp: number
  level: number
  levelName: string
  streak: number
  modulosConcluidos: number
  totalModulos: number
  badges: number
  desafiosCompletos: number
  riskProfile: 'conservador' | 'moderado' | 'agressivo' | null
  ultimaAtividade: string | null // ISO date, null = nunca acessou
}

export interface UsuarioAdmin {
  id: string // UUID, bate com users.id do schema.sql
  email: string
  nome: string
  papel: PapelUsuario
  status: StatusUsuario
  criadoEm: string // ISO date
  metricas: MetricasUsuario
}

// Payload de edição — subconjunto editável de UsuarioAdmin (id/criadoEm/
// metricas não são editáveis diretamente pelo admin).
export interface EdicaoUsuarioAdmin {
  nome: string
  email: string
}

export interface FiltrosAdmin {
  busca: string
  papel: PapelUsuario | 'todos'
  status: StatusUsuario | 'todos'
}

export type OrdenacaoAdmin = 'nome' | 'xp' | 'criadoEm' | 'ultimaAtividade'
