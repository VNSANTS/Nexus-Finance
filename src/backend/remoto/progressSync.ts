import type { UserProgress } from '@/types'
import { supabase } from '@/lib/supabase'

/**
 * Sincronização remota do progresso (tabela `user_progress`, ver
 * supabase/002_user_progress.sql).
 *
 * IMPORTANTE — isto NÃO substitui src/backend/local/progressStore.ts, ele
 * continua sendo a fonte síncrona que o hook usa pra renderizar sem esperar
 * rede nenhuma (localStorage responde na hora, Supabase não). Este arquivo
 * roda por cima, em paralelo:
 *   - `sincronizarDoServidor`: ao logar, busca o progresso salvo no Supabase
 *     e devolve pro hook aplicar por cima do localStorage (last-write-wins
 *     por `updated_at` — evita que um progresso local velho de outro
 *     aparelho sobrescreva um mais novo do servidor).
 *   - `enviarParaServidor`: no mesmo debounce que já salva no localStorage
 *     (ver useUserProgress.ts), também manda pro Supabase. Falha de rede
 *     aqui NUNCA quebra o app — localStorage já garantiu que nada se perde
 *     localmente, o envio ao servidor só re-tenta na próxima mudança.
 *
 * Login/logout são avisados via setUsuarioAtual() pelo AuthContext — este
 * módulo não importa useAuth() (evitaria um ciclo de dependência
 * hook-dentro-de-módulo-não-React).
 */

let usuarioAtualId: string | null = null

export function setUsuarioAtual(userId: string | null) {
  usuarioAtualId = userId
}

// Extrai só os campos que a tabela espelha em colunas próprias (ver SQL) —
// usados pelo painel admin pra listar/filtrar sem abrir o JSON inteiro.
function extrairCamposEspelhados(p: UserProgress) {
  return {
    xp: p.xp,
    level: p.level,
    level_name: p.levelName,
    streak: p.streak,
    badges_count: p.badges.length,
    desafios_completos: p.desafiosCompletos,
    modulos_concluidos: Object.keys(p.abasConcluidas).length,
    risk_profile: p.riskProfile,
  }
}

export async function enviarParaServidor(progress: UserProgress): Promise<void> {
  if (!usuarioAtualId) return // sem sessão, não há onde sincronizar (app ainda funciona 100% local)

  const { error } = await supabase.from('user_progress').upsert(
    {
      user_id: usuarioAtualId,
      ...extrairCamposEspelhados(progress),
      dados_jsonb: progress,
      ultima_atividade: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) throw new Error(error.message)
}

// Busca o progresso salvo no servidor. Retorna null se não houver linha
// ainda (usuário novo, primeira sincronização) — o hook, nesse caso,
// simplesmente mantém o que já tinha no localStorage e deixa o próximo save
// criar a linha.
export async function buscarDoServidor(userId: string): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('dados_jsonb')
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data) return null
  return data.dados_jsonb as UserProgress
}
