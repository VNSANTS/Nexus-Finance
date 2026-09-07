-- =============================================================================
-- Nexus Finance — Sincronização da Gestão Financeira com o Supabase
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode. Seguro rodar de novo.
--
-- Mesmo modelo de supabase/002_user_progress.sql (progresso educacional):
-- localStorage continua sendo a fonte instantânea (a GF responde na hora,
-- sem esperar rede), e a cada 30s o app manda o estado completo pro banco
-- em segundo plano (ver src/gestao-financeira/GestaoFinanceiraContext.tsx).
--
-- Diferente de user_progress, aqui NÃO expomos os dados para o painel
-- admin (isso é dinheiro pessoal, não faz sentido nenhum admin ver as
-- finanças de outro usuário) — só o próprio usuário e a Edge Function
-- nexus-ai (com o token do próprio usuário, nunca com privilégio total)
-- podem ler.

create table if not exists public.gestao_financeira_estado (
  user_id uuid primary key references public.profiles (id) on delete cascade,

  -- Estado completo (GestaoFinanceiraState do frontend) — todas as contas,
  -- cartões, transações, dívidas, metas, orçamentos, preferências.
  dados_jsonb jsonb not null default '{}'::jsonb,

  updated_at timestamp with time zone default now()
);

comment on table public.gestao_financeira_estado is
  'Estado completo da Gestão Financeira por usuário (1 linha cada). Espelha GestaoFinanceiraState do frontend. Dado financeiro pessoal — sem exceção de leitura para admin.';

create or replace function public.set_updated_at_gf()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gf_estado_set_updated_at on public.gestao_financeira_estado;
create trigger gf_estado_set_updated_at
  before update on public.gestao_financeira_estado
  for each row execute function public.set_updated_at_gf();

alter table public.gestao_financeira_estado enable row level security;

-- Só o próprio usuário — nunca admin, nunca ninguém além do dono do dado.
drop policy if exists "usuario_ve_propria_gf" on public.gestao_financeira_estado;
create policy "usuario_ve_propria_gf"
  on public.gestao_financeira_estado for select
  using (auth.uid() = user_id);

drop policy if exists "usuario_insere_propria_gf" on public.gestao_financeira_estado;
create policy "usuario_insere_propria_gf"
  on public.gestao_financeira_estado for insert
  with check (auth.uid() = user_id);

drop policy if exists "usuario_atualiza_propria_gf" on public.gestao_financeira_estado;
create policy "usuario_atualiza_propria_gf"
  on public.gestao_financeira_estado for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- Fim.
-- =============================================================================
