-- =============================================================================
-- Nexus Finance — Presença online/offline dos usuários (pro painel admin)
-- =============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase e rode uma vez. Seguro
-- rodar de novo (IF NOT EXISTS / DROP POLICY IF EXISTS em tudo).
--
-- "Online" aqui não é WebSocket/tempo real de verdade — é um "heartbeat"
-- simples: o app do usuário atualiza `last_seen_at` a cada ~60s enquanto
-- está aberto (ver src/hooks/usePresenca.ts). O painel admin considera
-- "online" quem teve um heartbeat nos últimos 2 minutos. Gratuito e simples,
-- sem precisar de Realtime/Presence do Supabase (que também é grátis no
-- plano Free, mas essa abordagem já resolve sem complexidade extra).
-- =============================================================================

alter table public.profiles add column if not exists last_seen_at timestamptz;

-- A policy "usuario_edita_proprio_perfil" (001_auth_profiles.sql) já libera
-- o próprio usuário atualizar sua linha em profiles (o WITH CHECK só trava a
-- coluna `role`), então nenhuma policy nova é necessária pra esse heartbeat
-- funcionar — só documentando aqui pra não parecer que falta algo.
