import type { EdicaoUsuarioAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from '../types'
import { USUARIOS_MOCK } from '../mockUsers'

// "Banco de dados" em memória. Recarrega do zero a cada refresh da página —
// é só pra desenvolver a tela sem precisar da API ainda.
let base: UsuarioAdmin[] = USUARIOS_MOCK.map((u) => ({ ...u, metricas: { ...u.metricas } }))

function delay<T>(valor: T, ms = 220): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms))
}

export async function listarUsuarios(): Promise<UsuarioAdmin[]> {
  return delay([...base])
}

export async function atualizarPapel(id: string, papel: PapelUsuario): Promise<UsuarioAdmin> {
  base = base.map((u) => (u.id === id ? { ...u, papel } : u))
  const alvo = base.find((u) => u.id === id)
  if (!alvo) throw new Error('Usuário não encontrado')
  return delay(alvo)
}

export async function atualizarStatus(id: string, status: StatusUsuario): Promise<UsuarioAdmin> {
  base = base.map((u) => (u.id === id ? { ...u, status } : u))
  const alvo = base.find((u) => u.id === id)
  if (!alvo) throw new Error('Usuário não encontrado')
  return delay(alvo)
}

export async function editarUsuario(id: string, dados: EdicaoUsuarioAdmin): Promise<UsuarioAdmin> {
  base = base.map((u) => (u.id === id ? { ...u, nome: dados.nome, email: dados.email } : u))
  const alvo = base.find((u) => u.id === id)
  if (!alvo) throw new Error('Usuário não encontrado')
  return delay(alvo)
}

export async function excluirUsuario(id: string): Promise<void> {
  base = base.filter((u) => u.id !== id)
  return delay(undefined)
}
