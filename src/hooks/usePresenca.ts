import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const INTERVALO_MS = 60_000 // 1 min — frequência do heartbeat; o admin considera "online" quem teve um heartbeat nos últimos 2 min (ver AdminUsuariosPage)

/**
 * Heartbeat de presença: atualiza `profiles.last_seen_at` pro próprio
 * usuário a cada ~1 min enquanto o app está aberto e em primeiro plano —
 * é o dado que o painel admin usa pra mostrar online/offline (ver
 * supabase/008_presenca.sql). Roda só com sessão ativa; não faz nada no
 * `/login`.
 */
export function usePresenca(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return

    function marcarPresenca() {
      // Melhor esforço — se falhar (offline, RLS, etc.) não faz sentido
      // avisar o usuário por causa de um heartbeat perdido.
      supabase.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', userId).then(
        () => {},
        () => {}
      )
    }

    marcarPresenca() // imediato ao montar/logar, não espera o primeiro intervalo
    const intervalo = setInterval(marcarPresenca, INTERVALO_MS)

    // Também marca ao voltar o foco (ex: usuário deixou o app em segundo
    // plano por um tempo maior que o intervalo e voltou agora).
    function aoFocar() {
      if (document.visibilityState === 'visible') marcarPresenca()
    }
    document.addEventListener('visibilitychange', aoFocar)

    return () => {
      clearInterval(intervalo)
      document.removeEventListener('visibilitychange', aoFocar)
    }
  }, [userId])
}
