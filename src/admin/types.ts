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
  // Campos de auth.users (só a Edge Function admin-users enxerga essa
  // tabela — a publishable key não tem acesso). Opcionais porque vêm de uma
  // segunda chamada separada (listarStatusAuth) que roda depois da lista
  // principal; a tela mostra "carregando" pros usuários até isso chegar.
  emailConfirmado?: boolean
  ultimoLogin?: string | null
  // "Online" é um heartbeat simples (ver src/hooks/usePresenca.ts e
  // supabase/008_presenca.sql), não WebSocket em tempo real — calculado no
  // frontend a partir de `ultimoVistoEm` (heartbeat nos últimos 2 min).
  ultimoVistoEm?: string | null
}

// Payload de edição — subconjunto editável de UsuarioAdmin (id/criadoEm/
// metricas não são editáveis diretamente pelo admin).
export interface EdicaoUsuarioAdmin {
  nome: string
  email: string
}

// Payload de edição de métricas de progresso (XP, level, streak etc.) —
// separado de EdicaoUsuarioAdmin porque tem sua própria função no backend
// (atualizarMetricas) e seu próprio modal na tela.
export interface EdicaoMetricasAdmin {
  xp: number
  level: number
  streak: number
  badges: number
  desafiosCompletos: number
}

export interface FiltrosAdmin {
  busca: string
  papel: PapelUsuario | 'todos'
  status: StatusUsuario | 'todos'
}

export type OrdenacaoAdmin = 'nome' | 'xp' | 'criadoEm' | 'ultimaAtividade'
