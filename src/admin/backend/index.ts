/**
 * Ponto único de entrada do "backend" do painel admin.
 *
 * Hoje aponta pra ./mock (array em memória, ver src/admin/mockUsers.ts).
 * Quando a API real existir:
 *
 *   1. Criar src/admin/backend/remoto.ts com as MESMAS 5 funções
 *      exportadas aqui (listarUsuarios, atualizarPapel, atualizarStatus,
 *      editarUsuario, excluirUsuario), fazendo fetch pra API em vez de
 *      mexer no array em memória.
 *   2. Trocar a linha abaixo pra importar de './remoto'.
 *
 * Nenhuma página do admin importa de ./mock ou ./remoto diretamente — só
 * daqui. No dia da troca é 1 linha, igual foi pensado em src/backend/.
 */
export { listarUsuarios, atualizarPapel, atualizarStatus, editarUsuario, excluirUsuario } from './mock'
