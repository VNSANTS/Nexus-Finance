-- =============================================================================
-- Nexus Finance — Progresso do usuário (XP, level, streak, badges etc.)
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode (New query → cola → Run). Seguro
-- rodar de novo.
--
-- Por que uma tabela nova em vez de usar `user_progress_modules` (já criada
-- em 001_auth_profiles.sql): aquela é por MÓDULO (uma linha por
-- usuário+módulo, pensada para o conteúdo educacional migrar pro banco no
-- futuro). Esta aqui é o AGREGADO por usuário — uma linha só, espelhando
-- exatamente o objeto `UserProgress` do frontend (src/types/index.ts):
-- xp, level, streak, badges etc. É essa que:
--   1. sincroniza com o localStorage de cada usuário (ver
--      src/backend/remoto/progressStore.ts)
--   2. o painel admin lê e edita (ver src/admin/backend/remoto.ts)
--
-- Estratégia de schema: colunas próprias só para os campos que o admin
-- precisa filtrar/editar diretamente (xp, level, level_name, streak,
-- badges_count, desafios_completos, risk_profile) + uma coluna `dados_jsonb`
-- com o UserProgress COMPLETO (todos os 30+ campos: goals, watchlist,
-- itensRevisao, preferências de notificação etc.). Isso evita ter que
-- desenhar 30 colunas agora, e ainda assim dá pro admin editar os campos que
-- importam sem precisar entender o JSON inteiro.

create table if not exists public.user_progress (
  user_id uuid primary key references public.profiles (id) on delete cascade,

  -- Campos "espelhados" fora do JSON — o admin edita estes diretamente, e a
  -- listagem do painel admin filtra/ordena por eles sem precisar abrir o
  -- JSON inteiro.
  xp integer not null default 0,
  level integer not null default 1,
  level_name text not null default 'Novato',
  streak integer not null default 0,
  badges_count integer not null default 0,
  desafios_completos integer not null default 0,
  modulos_concluidos integer not null default 0,
  risk_profile text, -- 'conservador' | 'moderado' | 'agressivo' | null

  -- UserProgress completo (src/types/index.ts), como o frontend já salva no
  -- localStorage hoje — nenhum campo se perde na migração.
  dados_jsonb jsonb not null default '{}'::jsonb,

  updated_at timestamp with time zone default now(),
  ultima_atividade timestamp with time zone
);

comment on table public.user_progress is
  'Progresso agregado por usuário (1 linha cada). Espelha UserProgress do frontend. Sincronizado com localStorage.';

create or replace function public.set_updated_at_progress()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_progress_set_updated_at on public.user_progress;
create trigger user_progress_set_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at_progress();

-- RLS: cada usuário só lê/escreve a própria linha; admin lê e escreve
-- qualquer linha (é isso que sustenta o painel editar XP de outra pessoa).
alter table public.user_progress enable row level security;

drop policy if exists "usuario_ve_proprio_progresso_agregado" on public.user_progress;
create policy "usuario_ve_proprio_progresso_agregado"
  on public.user_progress for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "usuario_edita_proprio_progresso_agregado" on public.user_progress;
create policy "usuario_edita_proprio_progresso_agregado"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "usuario_atualiza_proprio_progresso_agregado" on public.user_progress;
create policy "usuario_atualiza_proprio_progresso_agregado"
  on public.user_progress for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- =============================================================================
-- Fim.
-- =============================================================================
