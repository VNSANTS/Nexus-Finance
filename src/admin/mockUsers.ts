import type { UsuarioAdmin } from './types'

// Base mockada do painel de admin. Fica isolada aqui pra facilitar a troca
// futura por uma API real — ver src/admin/backend/index.ts.
//
// NOTA PRA QUANDO O BACKEND REAL FOR CRIADO: a tabela `users` do schema.sql
// hoje só tem (id, email, name, password_hash, meta, created_at,
// updated_at). Os campos `papel`/`status` usados aqui não existem ainda —
// dá pra guardar como chaves dentro de `meta` (jsonb) sem migration, ex:
// meta = { role: 'admin', status: 'ativo' }, ou criar colunas próprias
// (role TEXT, status TEXT) se preferir consultas/índices diretos. As
// métricas (xp, level, streak etc.) não vêm de `users` — vêm de
// `user_progress_modules.progress` (jsonb), agregadas por usuário.

const NOMES = [
  'Ana Beatriz Souza', 'Carlos Eduardo Lima', 'Marina Costa', 'Pedro Henrique Alves',
  'Juliana Ferreira', 'Rafael Santos', 'Camila Oliveira', 'Lucas Pereira',
  'Fernanda Ribeiro', 'Gustavo Martins', 'Beatriz Almeida', 'Thiago Rodrigues',
  'Larissa Carvalho', 'Bruno Nascimento', 'Vinícius Santos',
]

const NIVEIS = ['Novato', 'Aprendiz', 'Investidor Jr.', 'Estrategista', 'Mestre das Finanças']
const PERFIS: UsuarioAdmin['metricas']['riskProfile'][] = ['conservador', 'moderado', 'agressivo', null]

function slug(nome: string) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '.')
}

function diasAtras(dias: number) {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  return d.toISOString()
}

function gerarUsuarios(): UsuarioAdmin[] {
  return NOMES.map((nome, i) => {
    const xp = (i * 137 + 40) % 3200
    const level = Math.min(5, Math.floor(xp / 650) + 1)
    const ultimaAtividadeDias = i === 3 ? null : (i * 5) % 40 // um deles nunca voltou
    return {
      id: `usr_${String(i + 1).padStart(3, '0')}`,
      email: `${slug(nome)}@exemplo.com`,
      nome,
      papel: i === 0 || i === 14 ? 'admin' : 'usuario', // Vinícius (dono) e mais 1 como admin de exemplo
      status: i === 7 ? 'bloqueado' : 'ativo',
      criadoEm: diasAtras(200 - i * 8),
      metricas: {
        xp,
        level,
        levelName: NIVEIS[level - 1],
        streak: (i * 3) % 21,
        modulosConcluidos: (i * 4) % 66,
        totalModulos: 66,
        badges: (i * 2) % 12,
        desafiosCompletos: (i * 5) % 40,
        riskProfile: PERFIS[i % PERFIS.length],
        ultimaAtividade: ultimaAtividadeDias === null ? null : diasAtras(ultimaAtividadeDias),
      },
    }
  })
}

export const USUARIOS_MOCK: UsuarioAdmin[] = gerarUsuarios()
