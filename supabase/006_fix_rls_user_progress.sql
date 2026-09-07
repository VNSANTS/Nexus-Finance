-- =============================================================================
-- Nexus Finance — Corrige RLS de user_progress para admin poder inserir
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode. Seguro rodar de novo.
--
-- Bug corrigido: a policy de INSERT em user_progress (002_user_progress.sql)
-- só permitia auth.uid() = user_id, sem exceção para admin. Como o painel
-- admin usa upsert() para editar progresso, se a linha do usuário alvo
-- ainda não existisse (usuário nunca sincronizou progresso — cadastro
-- recente ou nunca abriu o app depois de logar), o Postgres tentava fazer
-- o INSERT do upsert, a policy bloqueava, e a edição falhava
-- silenciosamente no frontend (sem erro visível, sem persistir).

drop policy if exists "usuario_edita_proprio_progresso_agregado" on public.user_progress;
create policy "usuario_edita_proprio_progresso_agregado"
  on public.user_progress for insert
  with check (auth.uid() = user_id or public.is_admin());

-- =============================================================================
-- Fim.
-- =============================================================================
