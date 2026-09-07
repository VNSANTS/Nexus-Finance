import type { GestaoFinanceiraState } from '../types'
import { supabase } from '@/lib/supabase'

/**
 * Sincronização remota do estado da Gestão Financeira (tabela
 * `gestao_financeira_estado`, ver supabase/007_gestao_financeira_sync.sql).
 *
 * Mesmo modelo de src/backend/remoto/progressSync.ts (progresso
 * educacional): localStorage continua sendo a fonte instantânea — isto
 * roda por cima, em segundo plano, sem nunca bloquear a UI.
 */

let usuarioAtualId: string | null = null

export function setUsuarioAtualGf(userId: string | null) {
  usuarioAtualId = userId
}

export async function enviarGfParaServidor(estado: GestaoFinanceiraState): Promise<void> {
  if (!usuarioAtualId) return // sem sessão, segue só local

  const { error } = await supabase
    .from('gestao_financeira_estado')
    .upsert({ user_id: usuarioAtualId, dados_jsonb: estado }, { onConflict: 'user_id' })

  if (error) throw new Error(error.message)
}

export async function buscarGfDoServidor(userId: string): Promise<GestaoFinanceiraState | null> {
  const { data, error } = await supabase
    .from('gestao_financeira_estado')
    .select('dados_jsonb')
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data) return null
  return data.dados_jsonb as GestaoFinanceiraState
}
