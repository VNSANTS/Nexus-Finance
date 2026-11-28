import type { Modulo, Trilha } from '@/types'
import { MODULOS } from './_indice'
export { MODULOS, getModulosByTrilha } from './_indice'
export type { ModuloMeta } from './_indice'
export { TRILHAS } from './_trilhas'
export type { Trilha }

export const IDS_MODULOS_COMPLETOS = MODULOS.filter((m) => m.temConteudoCompleto).map((m) => m.id).sort()
export const TOTAL_MODULOS_COMPLETOS = IDS_MODULOS_COMPLETOS.length
const ids = new Set(IDS_MODULOS_COMPLETOS)
export function temConteudoCompleto(id: string): boolean { return ids.has(id) }

export async function carregarModulo(id: string, signal?: AbortSignal): Promise<Modulo | null> {
  if (!temConteudoCompleto(id)) return null
  const { supabase } = await import('@/lib/supabase')
  const { data: { session } } = await supabase.auth.getSession()
  if (!session || session.user.is_anonymous) throw Error('Entre com uma conta ativa para abrir este módulo.')
  const { data, error } = await supabase.functions.invoke<Modulo>('education-module?id=' + encodeURIComponent(id), {
    method: 'GET', signal, timeout: 15000, headers: { Authorization: 'Bearer ' + session.access_token },
  })
  if (error || data?.id !== id) throw Error('Não foi possível carregar o módulo. Verifique sua conexão e o acesso da conta.')
  if ((await supabase.auth.getSession()).data.session?.user.id !== session.user.id) throw Error('A conta mudou. Abra o módulo novamente.')
  return data
}
