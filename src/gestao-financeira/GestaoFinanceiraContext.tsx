import { createContext, createElement, useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import type { ReactNode } from 'react'
import type { Cartao, Categoria, Conta, Divida, GestaoFinanceiraState, Membro, Meta, OrcamentoCategoria, PreferenciasNotificacoes, PreferenciasPrivacidade, Transacao } from './types'
import { CATEGORIAS_PADRAO } from './categoriasPadrao'
import { novoMembroPrincipal, permissoesAtivas } from './permissoes'
import type { PermissoesMembro } from './types'

// Estado 100% isolado do useUserProgress: chave própria no localStorage,
// contexto próprio, nenhum import cruzado. É literalmente "um novo app"
// vivendo dentro do mesmo bundle, como pedido.
const STORAGE_KEY = 'nexus-gestao-financeira'
const STORAGE_VERSION = 1
const PERSIST_DEBOUNCE_MS = 400

function estadoInicial(): GestaoFinanceiraState {
  const membroPrincipal = novoMembroPrincipal()
  return {
    versao: STORAGE_VERSION,
    membros: [membroPrincipal],
    membroAtivoId: membroPrincipal.id,
    contas: [],
    cartoes: [],
    categorias: CATEGORIAS_PADRAO,
    transacoes: [],
    dividas: [],
    metas: [],
    orcamentos: [],
    metaEconomiaMensal: 0,
    primeiroAcessoFeito: false,
    moedaPadrao: 'BRL',
    notificacoesLidas: [],
    idioma: 'pt-BR',
    formatoValor: 'simbolo-antes',
    casasDecimais: 2,
    separadorDecimal: ',',
    separadorMilhares: '.',
    primeiroDiaMesFinanceiro: 1,
    semanaComecaEm: 'domingo',
    formatoData: 'DD/MM/AAAA',
    preferenciasNotificacoes: {
      ativas: true,
      notificacaoNavegador: false,
      vibrar: true,
      dividas: { ativa: true, diasAntecedencia: 7 },
      orcamento: { ativa: true, percentualAlerta: 90 },
      metas: { ativa: true, diasAntecedencia: 14 },
      insights: { ativa: true, boasNoticias: true, pontosAtencao: true },
      estiloExibicao: 'detalhado',
      agruparPor: 'prioridade',
      ocultarValores: false,
      som: { ativo: true, volume: 70, estilo: 'classico' },
    },
    preferenciasPrivacidade: {
      ocultarValoresAoAbrir: false,
      ocultarAoTrocarDeApp: false,
      permitirFotoMetas: true,
    },
  }
}

function carregarEstado(): GestaoFinanceiraState {
  if (typeof window === 'undefined') return estadoInicial()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return estadoInicial()
    const salvo = JSON.parse(raw) as Partial<GestaoFinanceiraState>
    if (salvo.versao !== STORAGE_VERSION) return estadoInicial()
    return { ...estadoInicial(), ...salvo }
  } catch {
    return estadoInicial()
  }
}

type Acao =
  | { tipo: 'ADICIONAR_TRANSACAO'; payload: Transacao }
  | { tipo: 'EDITAR_TRANSACAO'; payload: Transacao }
  | { tipo: 'EXCLUIR_TRANSACAO'; payload: { id: string } }
  | { tipo: 'ADICIONAR_CONTA'; payload: Conta }
  | { tipo: 'EDITAR_CONTA'; payload: Conta }
  | { tipo: 'EXCLUIR_CONTA'; payload: { id: string } }
  | { tipo: 'ADICIONAR_CARTAO'; payload: Cartao }
  | { tipo: 'EDITAR_CARTAO'; payload: Cartao }
  | { tipo: 'EXCLUIR_CARTAO'; payload: { id: string } }
  | { tipo: 'ADICIONAR_DIVIDA'; payload: Divida }
  | { tipo: 'EDITAR_DIVIDA'; payload: Divida }
  | { tipo: 'EXCLUIR_DIVIDA'; payload: { id: string } }
  | { tipo: 'ADICIONAR_META'; payload: Meta }
  | { tipo: 'EDITAR_META'; payload: Meta }
  | { tipo: 'EXCLUIR_META'; payload: { id: string } }
  | { tipo: 'ADICIONAR_CATEGORIA'; payload: Categoria }
  | { tipo: 'EDITAR_CATEGORIA'; payload: Categoria }
  | { tipo: 'EXCLUIR_CATEGORIA'; payload: { id: string } }
  | { tipo: 'DEFINIR_ORCAMENTO'; payload: OrcamentoCategoria }
  | { tipo: 'REMOVER_ORCAMENTO'; payload: { categoriaId: string } }
  | { tipo: 'DEFINIR_META_ECONOMIA'; payload: { valor: number } }
  | { tipo: 'MARCAR_PRIMEIRO_ACESSO' }
  | { tipo: 'DEFINIR_MOEDA'; payload: { moeda: string } }
  | { tipo: 'MARCAR_NOTIFICACAO_LIDA'; payload: { id: string } }
  | { tipo: 'MARCAR_NOTIFICACOES_LIDAS'; payload: { ids: string[] } }
  | { tipo: 'DEFINIR_CONFIG_FINANCEIRA'; payload: Partial<Pick<GestaoFinanceiraState,
      'idioma' | 'formatoValor' | 'casasDecimais' | 'separadorDecimal' | 'separadorMilhares' | 'primeiroDiaMesFinanceiro' | 'semanaComecaEm' | 'formatoData'>> }
  | { tipo: 'DEFINIR_PREFERENCIAS_NOTIFICACOES'; payload: Partial<PreferenciasNotificacoes> }
  | { tipo: 'RESTAURAR_PREFERENCIAS_NOTIFICACOES' }
  | { tipo: 'DEFINIR_PREFERENCIAS_PRIVACIDADE'; payload: Partial<PreferenciasPrivacidade> }
  | { tipo: 'ADICIONAR_MEMBRO'; payload: Membro }
  | { tipo: 'EDITAR_MEMBRO'; payload: Membro }
  | { tipo: 'EXCLUIR_MEMBRO'; payload: { id: string } }
  | { tipo: 'DEFINIR_MEMBRO_ATIVO'; payload: { id: string } }
  | { tipo: 'LIMPAR_TODOS_DADOS' }
  | { tipo: 'RESTAURAR_BACKUP'; payload: GestaoFinanceiraState }

function reducer(estado: GestaoFinanceiraState, acao: Acao): GestaoFinanceiraState {
  switch (acao.tipo) {
    case 'ADICIONAR_TRANSACAO':
      return { ...estado, transacoes: [acao.payload, ...estado.transacoes] }
    case 'EDITAR_TRANSACAO':
      return { ...estado, transacoes: estado.transacoes.map((t) => (t.id === acao.payload.id ? acao.payload : t)) }
    case 'EXCLUIR_TRANSACAO':
      return { ...estado, transacoes: estado.transacoes.filter((t) => t.id !== acao.payload.id) }

    case 'ADICIONAR_CONTA':
      return { ...estado, contas: [...estado.contas, acao.payload] }
    case 'EDITAR_CONTA':
      return { ...estado, contas: estado.contas.map((c) => (c.id === acao.payload.id ? acao.payload : c)) }
    case 'EXCLUIR_CONTA':
      return { ...estado, contas: estado.contas.filter((c) => c.id !== acao.payload.id) }

    case 'ADICIONAR_CARTAO':
      return { ...estado, cartoes: [...estado.cartoes, acao.payload] }
    case 'EDITAR_CARTAO':
      return { ...estado, cartoes: estado.cartoes.map((c) => (c.id === acao.payload.id ? acao.payload : c)) }
    case 'EXCLUIR_CARTAO':
      return { ...estado, cartoes: estado.cartoes.filter((c) => c.id !== acao.payload.id) }

    case 'ADICIONAR_DIVIDA':
      return { ...estado, dividas: [...estado.dividas, acao.payload] }
    case 'EDITAR_DIVIDA':
      return { ...estado, dividas: estado.dividas.map((d) => (d.id === acao.payload.id ? acao.payload : d)) }
    case 'EXCLUIR_DIVIDA':
      return { ...estado, dividas: estado.dividas.filter((d) => d.id !== acao.payload.id) }

    case 'ADICIONAR_META':
      return { ...estado, metas: [...estado.metas, acao.payload] }
    case 'EDITAR_META':
      return { ...estado, metas: estado.metas.map((m) => (m.id === acao.payload.id ? acao.payload : m)) }
    case 'EXCLUIR_META':
      return { ...estado, metas: estado.metas.filter((m) => m.id !== acao.payload.id) }

    case 'ADICIONAR_CATEGORIA':
      return { ...estado, categorias: [...estado.categorias, acao.payload] }
    case 'EDITAR_CATEGORIA':
      return { ...estado, categorias: estado.categorias.map((c) => (c.id === acao.payload.id ? acao.payload : c)) }
    case 'EXCLUIR_CATEGORIA':
      return { ...estado, categorias: estado.categorias.filter((c) => c.id !== acao.payload.id) }

    case 'DEFINIR_ORCAMENTO': {
      const outros = estado.orcamentos.filter((o) => o.categoriaId !== acao.payload.categoriaId)
      return { ...estado, orcamentos: [...outros, acao.payload] }
    }
    case 'REMOVER_ORCAMENTO':
      return { ...estado, orcamentos: estado.orcamentos.filter((o) => o.categoriaId !== acao.payload.categoriaId) }
    case 'DEFINIR_META_ECONOMIA':
      return { ...estado, metaEconomiaMensal: acao.payload.valor }
    case 'MARCAR_PRIMEIRO_ACESSO':
      return { ...estado, primeiroAcessoFeito: true }
    case 'DEFINIR_MOEDA':
      return { ...estado, moedaPadrao: acao.payload.moeda }
    case 'DEFINIR_CONFIG_FINANCEIRA':
      return { ...estado, ...acao.payload }
    case 'DEFINIR_PREFERENCIAS_NOTIFICACOES':
      return { ...estado, preferenciasNotificacoes: { ...estado.preferenciasNotificacoes, ...acao.payload } }
    case 'RESTAURAR_PREFERENCIAS_NOTIFICACOES':
      return { ...estado, preferenciasNotificacoes: estadoInicial().preferenciasNotificacoes }
    case 'DEFINIR_PREFERENCIAS_PRIVACIDADE':
      return { ...estado, preferenciasPrivacidade: { ...estado.preferenciasPrivacidade, ...acao.payload } }

    case 'ADICIONAR_MEMBRO':
      return { ...estado, membros: [...estado.membros, acao.payload] }
    case 'EDITAR_MEMBRO':
      return { ...estado, membros: estado.membros.map((m) => (m.id === acao.payload.id ? acao.payload : m)) }
    case 'EXCLUIR_MEMBRO': {
      // Guarda de verdade fica na tela (não deixa clicar em excluir pro
      // membro principal nem pro último administrador) — aqui é só uma
      // segunda trava, silenciosa, caso a ação chegue de outro lugar.
      const alvo = estado.membros.find((m) => m.id === acao.payload.id)
      if (!alvo || alvo.principal) return estado
      const membros = estado.membros.filter((m) => m.id !== acao.payload.id)
      const membroAtivoId = estado.membroAtivoId === acao.payload.id ? (membros.find((m) => m.principal)?.id ?? membros[0]?.id ?? null) : estado.membroAtivoId
      return { ...estado, membros, membroAtivoId }
    }
    case 'DEFINIR_MEMBRO_ATIVO':
      return estado.membros.some((m) => m.id === acao.payload.id) ? { ...estado, membroAtivoId: acao.payload.id } : estado

    case 'LIMPAR_TODOS_DADOS':
      // Apaga tudo (lançamentos, contas, cartões, dívidas, metas,
      // orçamentos) mas preserva as preferências (aparência, moeda,
      // notificações, privacidade) e não força o onboarding de novo —
      // é uma limpeza de dados, não um "resetar o app".
      return {
        ...estadoInicial(),
        primeiroAcessoFeito: true,
        moedaPadrao: estado.moedaPadrao,
        idioma: estado.idioma,
        formatoValor: estado.formatoValor,
        casasDecimais: estado.casasDecimais,
        separadorDecimal: estado.separadorDecimal,
        separadorMilhares: estado.separadorMilhares,
        primeiroDiaMesFinanceiro: estado.primeiroDiaMesFinanceiro,
        semanaComecaEm: estado.semanaComecaEm,
        formatoData: estado.formatoData,
        preferenciasNotificacoes: estado.preferenciasNotificacoes,
        preferenciasPrivacidade: estado.preferenciasPrivacidade,
        membros: estado.membros,
        membroAtivoId: estado.membroAtivoId,
      }
    case 'RESTAURAR_BACKUP':
      // Mesma lógica de carregarEstado(): funde com estadoInicial() pra
      // qualquer campo que o backup não tenha (ex.: backup antigo, de
      // antes de uma preferência nova existir) cair no padrão em vez de
      // quebrar a tela. versao e primeiroAcessoFeito são forçados aqui
      // pra não reabrir o onboarding nem herdar uma versão de schema
      // desatualizada do arquivo importado.
      return { ...estadoInicial(), ...acao.payload, versao: STORAGE_VERSION, primeiroAcessoFeito: true }
    case 'MARCAR_NOTIFICACAO_LIDA':
      return estado.notificacoesLidas.includes(acao.payload.id)
        ? estado
        : { ...estado, notificacoesLidas: [...estado.notificacoesLidas, acao.payload.id] }
    case 'MARCAR_NOTIFICACOES_LIDAS': {
      const novas = acao.payload.ids.filter((id) => !estado.notificacoesLidas.includes(id))
      return novas.length === 0 ? estado : { ...estado, notificacoesLidas: [...estado.notificacoesLidas, ...novas] }
    }

    default:
      return estado
  }
}

interface GestaoFinanceiraContextValue {
  estado: GestaoFinanceiraState
  // Permissões efetivas do perfil ativo agora (deriva de estado.membros +
  // estado.membroAtivoId — ver permissoesAtivas em permissoes.ts). Exposto
  // aqui pra ser a fonte única que telas e componentes consultam antes de
  // permitir lançar, editar, excluir, ver saldos ou gerenciar membros —
  // trocar de perfil em Família e perfis muda isto instantaneamente pro
  // app inteiro, como trocar de usuário com permissões definidas por quem
  // administra a família.
  permissoes: PermissoesMembro
  adicionarTransacao: (t: Transacao) => void
  editarTransacao: (t: Transacao) => void
  excluirTransacao: (id: string) => void
  adicionarConta: (c: Conta) => void
  editarConta: (c: Conta) => void
  excluirConta: (id: string) => void
  adicionarCartao: (c: Cartao) => void
  editarCartao: (c: Cartao) => void
  excluirCartao: (id: string) => void
  adicionarDivida: (d: Divida) => void
  editarDivida: (d: Divida) => void
  excluirDivida: (id: string) => void
  adicionarMeta: (m: Meta) => void
  editarMeta: (m: Meta) => void
  excluirMeta: (id: string) => void
  adicionarCategoria: (c: Categoria) => void
  editarCategoria: (c: Categoria) => void
  excluirCategoria: (id: string) => void
  definirOrcamento: (o: OrcamentoCategoria) => void
  removerOrcamento: (categoriaId: string) => void
  definirMetaEconomia: (valor: number) => void
  marcarPrimeiroAcesso: () => void
  definirMoeda: (moeda: string) => void
  marcarNotificacaoLida: (id: string) => void
  marcarNotificacoesLidas: (ids: string[]) => void
  definirConfigFinanceira: (config: Partial<Pick<GestaoFinanceiraState,
    'idioma' | 'formatoValor' | 'casasDecimais' | 'separadorDecimal' | 'separadorMilhares' | 'primeiroDiaMesFinanceiro' | 'semanaComecaEm' | 'formatoData'>>) => void
  definirPreferenciasNotificacoes: (prefs: Partial<PreferenciasNotificacoes>) => void
  restaurarPreferenciasNotificacoes: () => void
  definirPreferenciasPrivacidade: (prefs: Partial<PreferenciasPrivacidade>) => void
  adicionarMembro: (m: Membro) => void
  editarMembro: (m: Membro) => void
  excluirMembro: (id: string) => void
  definirMembroAtivo: (id: string) => void
  limparTodosDados: () => void
  restaurarBackup: (dados: GestaoFinanceiraState) => void
}

const GestaoFinanceiraContext = createContext<GestaoFinanceiraContextValue | null>(null)

export function GestaoFinanceiraProvider({ children }: { children: ReactNode }) {
  const [estado, dispatch] = useReducer(reducer, undefined, carregarEstado)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
      } catch {
        // localStorage indisponível (modo privado/quota) — segue sem persistir
      }
    }, PERSIST_DEBOUNCE_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [estado])

  const adicionarTransacao = useCallback((t: Transacao) => dispatch({ tipo: 'ADICIONAR_TRANSACAO', payload: t }), [])
  const editarTransacao = useCallback((t: Transacao) => dispatch({ tipo: 'EDITAR_TRANSACAO', payload: t }), [])
  const excluirTransacao = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_TRANSACAO', payload: { id } }), [])

  const adicionarConta = useCallback((c: Conta) => dispatch({ tipo: 'ADICIONAR_CONTA', payload: c }), [])
  const editarConta = useCallback((c: Conta) => dispatch({ tipo: 'EDITAR_CONTA', payload: c }), [])
  const excluirConta = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_CONTA', payload: { id } }), [])

  const adicionarCartao = useCallback((c: Cartao) => dispatch({ tipo: 'ADICIONAR_CARTAO', payload: c }), [])
  const editarCartao = useCallback((c: Cartao) => dispatch({ tipo: 'EDITAR_CARTAO', payload: c }), [])
  const excluirCartao = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_CARTAO', payload: { id } }), [])

  const adicionarDivida = useCallback((d: Divida) => dispatch({ tipo: 'ADICIONAR_DIVIDA', payload: d }), [])
  const editarDivida = useCallback((d: Divida) => dispatch({ tipo: 'EDITAR_DIVIDA', payload: d }), [])
  const excluirDivida = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_DIVIDA', payload: { id } }), [])

  const adicionarMeta = useCallback((m: Meta) => dispatch({ tipo: 'ADICIONAR_META', payload: m }), [])
  const editarMeta = useCallback((m: Meta) => dispatch({ tipo: 'EDITAR_META', payload: m }), [])
  const excluirMeta = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_META', payload: { id } }), [])

  const adicionarCategoria = useCallback((c: Categoria) => dispatch({ tipo: 'ADICIONAR_CATEGORIA', payload: c }), [])
  const editarCategoria = useCallback((c: Categoria) => dispatch({ tipo: 'EDITAR_CATEGORIA', payload: c }), [])
  const excluirCategoria = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_CATEGORIA', payload: { id } }), [])

  const definirOrcamento = useCallback((o: OrcamentoCategoria) => dispatch({ tipo: 'DEFINIR_ORCAMENTO', payload: o }), [])
  const removerOrcamento = useCallback((categoriaId: string) => dispatch({ tipo: 'REMOVER_ORCAMENTO', payload: { categoriaId } }), [])
  const definirMetaEconomia = useCallback((valor: number) => dispatch({ tipo: 'DEFINIR_META_ECONOMIA', payload: { valor } }), [])
  const marcarPrimeiroAcesso = useCallback(() => dispatch({ tipo: 'MARCAR_PRIMEIRO_ACESSO' }), [])
  const definirMoeda = useCallback((moeda: string) => dispatch({ tipo: 'DEFINIR_MOEDA', payload: { moeda } }), [])
  const marcarNotificacaoLida = useCallback((id: string) => dispatch({ tipo: 'MARCAR_NOTIFICACAO_LIDA', payload: { id } }), [])
  const marcarNotificacoesLidas = useCallback((ids: string[]) => dispatch({ tipo: 'MARCAR_NOTIFICACOES_LIDAS', payload: { ids } }), [])
  const definirConfigFinanceira = useCallback(
    (config: Parameters<GestaoFinanceiraContextValue['definirConfigFinanceira']>[0]) =>
      dispatch({ tipo: 'DEFINIR_CONFIG_FINANCEIRA', payload: config }),
    [],
  )
  const definirPreferenciasNotificacoes = useCallback(
    (prefs: Partial<PreferenciasNotificacoes>) => dispatch({ tipo: 'DEFINIR_PREFERENCIAS_NOTIFICACOES', payload: prefs }),
    [],
  )
  const restaurarPreferenciasNotificacoes = useCallback(() => dispatch({ tipo: 'RESTAURAR_PREFERENCIAS_NOTIFICACOES' }), [])
  const definirPreferenciasPrivacidade = useCallback(
    (prefs: Partial<PreferenciasPrivacidade>) => dispatch({ tipo: 'DEFINIR_PREFERENCIAS_PRIVACIDADE', payload: prefs }),
    [],
  )
  const adicionarMembro = useCallback((m: Membro) => dispatch({ tipo: 'ADICIONAR_MEMBRO', payload: m }), [])
  const editarMembro = useCallback((m: Membro) => dispatch({ tipo: 'EDITAR_MEMBRO', payload: m }), [])
  const excluirMembro = useCallback((id: string) => dispatch({ tipo: 'EXCLUIR_MEMBRO', payload: { id } }), [])
  const definirMembroAtivo = useCallback((id: string) => dispatch({ tipo: 'DEFINIR_MEMBRO_ATIVO', payload: { id } }), [])
  const limparTodosDados = useCallback(() => dispatch({ tipo: 'LIMPAR_TODOS_DADOS' }), [])
  const restaurarBackup = useCallback((dados: GestaoFinanceiraState) => dispatch({ tipo: 'RESTAURAR_BACKUP', payload: dados }), [])

  const permissoes = permissoesAtivas(estado)

  const value: GestaoFinanceiraContextValue = {
    estado,
    permissoes,
    adicionarTransacao,
    editarTransacao,
    excluirTransacao,
    adicionarConta,
    editarConta,
    excluirConta,
    adicionarCartao,
    editarCartao,
    excluirCartao,
    adicionarDivida,
    editarDivida,
    excluirDivida,
    adicionarMeta,
    editarMeta,
    excluirMeta,
    adicionarCategoria,
    editarCategoria,
    excluirCategoria,
    definirOrcamento,
    removerOrcamento,
    definirMetaEconomia,
    marcarPrimeiroAcesso,
    definirMoeda,
    marcarNotificacaoLida,
    marcarNotificacoesLidas,
    definirConfigFinanceira,
    definirPreferenciasNotificacoes,
    restaurarPreferenciasNotificacoes,
    definirPreferenciasPrivacidade,
    adicionarMembro,
    editarMembro,
    excluirMembro,
    definirMembroAtivo,
    limparTodosDados,
    restaurarBackup,
  }

  return createElement(GestaoFinanceiraContext.Provider, { value }, children)
}

export function useGestaoFinanceira() {
  const ctx = useContext(GestaoFinanceiraContext)
  if (!ctx) throw new Error('useGestaoFinanceira precisa estar dentro de <GestaoFinanceiraProvider>')
  return ctx
}
