import type { GestaoFinanceiraState, Membro, PapelMembro, PermissoesMembro } from './types'

// Papéis pré-definidos de Família e perfis. Cada um já vem com um conjunto
// de permissões padrão sensato — a tela permite ajustar as permissões de
// cada membro individualmente depois, então isso aqui é só o ponto de
// partida ao escolher um papel, não uma trava fixa.
export const PAPEIS: { id: PapelMembro; label: string; desc: string }[] = [
  { id: 'administrador', label: 'Administrador', desc: 'Acesso total, inclusive gerenciar outros membros' },
  { id: 'adulto', label: 'Adulto', desc: 'Lança, edita e exclui — não mexe nos membros da família' },
  { id: 'jovem', label: 'Jovem / dependente', desc: 'Lança e edita, mas não exclui nada' },
  { id: 'visualizador', label: 'Visualizador', desc: 'Só consulta — não lança, edita nem exclui' },
]

export const PERMISSOES_PADRAO: Record<PapelMembro, PermissoesMembro> = {
  administrador: { lancar: true, editar: true, excluir: true, verSaldos: true, gerenciarMembros: true },
  adulto: { lancar: true, editar: true, excluir: true, verSaldos: true, gerenciarMembros: false },
  jovem: { lancar: true, editar: true, excluir: false, verSaldos: true, gerenciarMembros: false },
  visualizador: { lancar: false, editar: false, excluir: false, verSaldos: true, gerenciarMembros: false },
}

export const LABEL_PERMISSAO: Record<keyof PermissoesMembro, string> = {
  lancar: 'Lançar receitas e despesas',
  editar: 'Editar contas, cartões, dívidas e metas',
  excluir: 'Excluir lançamentos e cadastros',
  verSaldos: 'Ver saldos e valores',
  gerenciarMembros: 'Gerenciar membros da família',
}

export function novoMembroPrincipal(): Membro {
  return {
    id: `membro-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome: 'Eu',
    emoji: '👤',
    cor: '#00D4FF',
    papel: 'administrador',
    permissoes: { ...PERMISSOES_PADRAO.administrador },
    criadoEm: new Date().toISOString(),
    principal: true,
  }
}

export function membroAtivo(estado: Pick<GestaoFinanceiraState, 'membros' | 'membroAtivoId'>): Membro | null {
  if (estado.membros.length === 0) return null
  return estado.membros.find((m) => m.id === estado.membroAtivoId) ?? estado.membros[0]
}

// Permissões efetivas do perfil ativo agora. Sem membros cadastrados (ex.:
// estado corrompido) libera tudo, pra não travar o app por causa desta
// tela — Família e perfis é organização extra, não deve virar um bloqueio.
export function permissoesAtivas(estado: Pick<GestaoFinanceiraState, 'membros' | 'membroAtivoId'>): PermissoesMembro {
  const membro = membroAtivo(estado)
  return membro ? membro.permissoes : { lancar: true, editar: true, excluir: true, verSaldos: true, gerenciarMembros: true }
}

export function quantosAdministradores(membros: Membro[]): number {
  return membros.filter((m) => m.permissoes.gerenciarMembros).length
}

// Aviso padrão quando o perfil ativo não tem uma permissão. Usado nos
// pontos de ação (botões escondidos/desabilitados já cobrem o caminho
// normal; isto é o cinto de segurança pra quem tenta mesmo assim, ex.:
// atalho de teclado ou estado que mudou entre renders).
export function avisoSemPermissao(acao: string): void {
  window.alert(`Seu perfil não tem permissão pra ${acao}. Peça pra um administrador da família ajustar isso em Família e perfis.`)
}
