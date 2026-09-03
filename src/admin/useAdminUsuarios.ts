import { useCallback, useEffect, useMemo, useState } from 'react'
import type { EdicaoUsuarioAdmin, FiltrosAdmin, OrdenacaoAdmin, PapelUsuario, StatusUsuario, UsuarioAdmin } from './types'
import { atualizarPapel, atualizarStatus, editarUsuario, excluirUsuario, listarUsuarios } from './backend'

const FILTROS_INICIAIS: FiltrosAdmin = { busca: '', papel: 'todos', status: 'todos' }

export function useAdminUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [filtros, setFiltros] = useState<FiltrosAdmin>(FILTROS_INICIAIS)
  const [ordenacao, setOrdenacao] = useState<OrdenacaoAdmin>('nome')
  // ids em operação (spinner por linha, sem travar a tela inteira)
  const [pendentes, setPendentes] = useState<Set<string>>(new Set())

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      const dados = await listarUsuarios()
      setUsuarios(dados)
    } catch {
      setErro('Não foi possível carregar os usuários. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const marcarPendente = (id: string, ativo: boolean) => {
    setPendentes((prev) => {
      const novo = new Set(prev)
      if (ativo) novo.add(id)
      else novo.delete(id)
      return novo
    })
  }

  const alternarPapel = useCallback(async (id: string, papelAtual: PapelUsuario) => {
    const novoPapel: PapelUsuario = papelAtual === 'admin' ? 'usuario' : 'admin'
    marcarPendente(id, true)
    try {
      const atualizado = await atualizarPapel(id, novoPapel)
      setUsuarios((prev) => prev.map((u) => (u.id === id ? atualizado : u)))
    } finally {
      marcarPendente(id, false)
    }
  }, [])

  const alternarStatus = useCallback(async (id: string, statusAtual: StatusUsuario) => {
    const novoStatus: StatusUsuario = statusAtual === 'ativo' ? 'bloqueado' : 'ativo'
    marcarPendente(id, true)
    try {
      const atualizado = await atualizarStatus(id, novoStatus)
      setUsuarios((prev) => prev.map((u) => (u.id === id ? atualizado : u)))
    } finally {
      marcarPendente(id, false)
    }
  }, [])

  const salvarEdicao = useCallback(async (id: string, dados: EdicaoUsuarioAdmin) => {
    marcarPendente(id, true)
    try {
      const atualizado = await editarUsuario(id, dados)
      setUsuarios((prev) => prev.map((u) => (u.id === id ? atualizado : u)))
    } finally {
      marcarPendente(id, false)
    }
  }, [])

  const remover = useCallback(async (id: string) => {
    marcarPendente(id, true)
    try {
      await excluirUsuario(id)
      setUsuarios((prev) => prev.filter((u) => u.id !== id))
    } finally {
      marcarPendente(id, false)
    }
  }, [])

  const usuariosFiltrados = useMemo(() => {
    const buscaNorm = filtros.busca.trim().toLowerCase()
    let lista = usuarios.filter((u) => {
      const bateBusca = !buscaNorm || u.nome.toLowerCase().includes(buscaNorm) || u.email.toLowerCase().includes(buscaNorm)
      const batePapel = filtros.papel === 'todos' || u.papel === filtros.papel
      const bateStatus = filtros.status === 'todos' || u.status === filtros.status
      return bateBusca && batePapel && bateStatus
    })

    lista = [...lista].sort((a, b) => {
      switch (ordenacao) {
        case 'xp':
          return b.metricas.xp - a.metricas.xp
        case 'criadoEm':
          return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
        case 'ultimaAtividade': {
          const ta = a.metricas.ultimaAtividade ? new Date(a.metricas.ultimaAtividade).getTime() : 0
          const tb = b.metricas.ultimaAtividade ? new Date(b.metricas.ultimaAtividade).getTime() : 0
          return tb - ta
        }
        case 'nome':
        default:
          return a.nome.localeCompare(b.nome, 'pt-BR')
      }
    })

    return lista
  }, [usuarios, filtros, ordenacao])

  const estatisticas = useMemo(() => {
    return {
      total: usuarios.length,
      ativos: usuarios.filter((u) => u.status === 'ativo').length,
      bloqueados: usuarios.filter((u) => u.status === 'bloqueado').length,
      admins: usuarios.filter((u) => u.papel === 'admin').length,
    }
  }, [usuarios])

  return {
    usuarios: usuariosFiltrados,
    totalSemFiltro: usuarios.length,
    estatisticas,
    carregando,
    erro,
    filtros,
    setFiltros,
    ordenacao,
    setOrdenacao,
    pendentes,
    recarregar: carregar,
    alternarPapel,
    alternarStatus,
    salvarEdicao,
    remover,
  }
}
