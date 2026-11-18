-- 014: Uma conta bloqueada não deve usar seu token JWT até a expiração
-- para continuar lendo/alterando dados privados. Não apaga dados.
-- A função é privada, com SECURITY DEFINER para não recursar a RLS de profiles.
CREATE OR REPLACE FUNCTION private.is_active_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'pg_catalog', 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid()) AND status = 'ativo'
  );
$$;

REVOKE ALL ON FUNCTION private.is_active_user() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.is_active_user() TO authenticated;

-- Restrictive policies são combinadas por AND com as permissivas existentes.
-- Preservam o isolamento por dono e os privilégios do admin ativo.
-- A leitura do próprio profile continua liberada para exibir motivo do bloqueio.
DROP POLICY IF EXISTS somente_conta_ativa_nexus ON public.gestao_financeira_estado;
CREATE POLICY somente_conta_ativa_nexus ON public.gestao_financeira_estado
  AS RESTRICTIVE FOR ALL TO authenticated
  USING ((SELECT private.is_active_user()))
  WITH CHECK ((SELECT private.is_active_user()));

DROP POLICY IF EXISTS somente_conta_ativa_nexus ON public.nexus_ai_mensagens;
CREATE POLICY somente_conta_ativa_nexus ON public.nexus_ai_mensagens
  AS RESTRICTIVE FOR ALL TO authenticated
  USING ((SELECT private.is_active_user()))
  WITH CHECK ((SELECT private.is_active_user()));

DROP POLICY IF EXISTS somente_conta_ativa_nexus ON public.user_progress;
CREATE POLICY somente_conta_ativa_nexus ON public.user_progress
  AS RESTRICTIVE FOR ALL TO authenticated
  USING ((SELECT private.is_active_user()))
  WITH CHECK ((SELECT private.is_active_user()));

DROP POLICY IF EXISTS somente_conta_ativa_nexus ON public.user_progress_modules;
CREATE POLICY somente_conta_ativa_nexus ON public.user_progress_modules
  AS RESTRICTIVE FOR ALL TO authenticated
  USING ((SELECT private.is_active_user()))
  WITH CHECK ((SELECT private.is_active_user()));

-- Validar com JWTs de conta ativa e bloqueada, sem copiar dados reais.
