/**
 * Ponto único de entrada do "backend" do painel admin.
 *
 * Agora aponta pra ./remoto (Supabase real, tabela `profiles`). O mock
 * (./mock, array em memória) continua existindo em src/admin/backend/mock.ts
 * caso seja útil pra testar a tela sem depender de rede/Supabase — é só
 * trocar a linha abaixo de volta pra './mock'.
 *
 * Nenhuma página do admin importa de ./mock ou ./remoto diretamente — só
 * daqui, então essa troca nunca exige mexer em mais nada.
 */
export { listarUsuarios, atualizarPapel, atualizarStatus, editarUsuario, excluirUsuario } from './remoto'
