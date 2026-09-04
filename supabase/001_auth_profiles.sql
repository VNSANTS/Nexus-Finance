-- =============================================================================
-- Nexus Finance — Supabase Auth + Perfis (admin / usuário comum)
-- =============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase (Project → SQL Editor
-- → New query) e rode uma vez. É seguro rodar de novo (usa IF NOT EXISTS /
-- CREATE OR REPLACE / DROP POLICY IF EXISTS em tudo).
--
-- O que isso substitui: a tabela `users` do schema.sql original guardava
-- `password_hash` manualmente — com Supabase Auth isso não é mais necessário,
-- quem cuida de senha/hash/sessão é o `auth.users` interno do Supabase. Este
-- arquivo cria `profiles`, que é o "perfil público" 1:1 com `auth.users`,
-- e é essa tabela que `user_progress_modules.user_id` deve referenciar daqui
-- pra frente (ver ajuste no final do arquivo).
-- =============================================================================

-- 1. Tabela de perfis ---------------------------------------------------------
-- 1 linha por usuário autenticado, criada automaticamente no signup (trigger
-- abaixo). `role` é o campo que diferencia admin de usuário comum.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  nome text not null default 'Investidor',
  role text not null default 'usuario' check (role in ('admin', 'usuario')),
  status text not null default 'ativo' check (status in ('ativo', 'bloqueado')),
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.profiles is 'Perfil público 1:1 com auth.users. role controla admin x usuário comum.';

-- 2. Trigger: cria o profile automaticamente ao registrar em auth.users -------
-- security definer é necessário aqui porque o trigger roda no schema `auth`,
-- fora do controle direto do usuário — sem isso o insert em profiles falharia
-- por causa da RLS abaixo.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, nome)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'nome', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. updated_at automático -----------------------------------------------

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 4. Row Level Security --------------------------------------------------

alter table public.profiles enable row level security;

-- Todo usuário logado pode ver o próprio perfil
drop policy if exists "usuario_ve_proprio_perfil" on public.profiles;
create policy "usuario_ve_proprio_perfil"
  on public.profiles for select
  using (auth.uid() = id);

-- Todo usuário logado pode editar nome/meta do próprio perfil (não role/status)
drop policy if exists "usuario_edita_proprio_perfil" on public.profiles;
create policy "usuario_edita_proprio_perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

-- Helper: função que checa se o usuário logado é admin (evita recursão de
-- RLS ao consultar profiles dentro de uma policy de profiles)
create or replace function public.is_admin()
returns boolean
language sql security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Admin vê todos os perfis (painel de controle)
drop policy if exists "admin_ve_todos" on public.profiles;
create policy "admin_ve_todos"
  on public.profiles for select
  using (public.is_admin());

-- Admin pode atualizar qualquer perfil (promover, bloquear, editar)
drop policy if exists "admin_edita_todos" on public.profiles;
create policy "admin_edita_todos"
  on public.profiles for update
  using (public.is_admin());

-- Admin pode excluir perfis (o auth.users associado precisa ser removido à
-- parte via Admin API — ver nota no backend)
drop policy if exists "admin_exclui" on public.profiles;
create policy "admin_exclui"
  on public.profiles for delete
  using (public.is_admin());

-- 5. Ajuste em user_progress_modules (schema.sql original) -------------------
-- O schema.sql original criava `users` com password_hash e apontava
-- user_progress_modules.user_id pra ela. Com Supabase Auth, isso deve
-- apontar pra profiles (mesmo id de auth.users). Rode isto SÓ se você já
-- rodou o schema.sql original antes E ele criou a tabela `users` antiga:

-- drop table if exists public.users cascade; -- descomente se `users` antiga já existia e está vazia
-- alter table public.user_progress_modules
--   drop constraint if exists user_progress_modules_user_id_fkey,
--   add constraint user_progress_modules_user_id_fkey
--     foreign key (user_id) references public.profiles (id) on delete cascade;

-- Se `user_progress_modules` ainda não existe, crie já apontando certo:
create table if not exists public.user_progress_modules (
  id bigserial primary key,
  user_id uuid references public.profiles (id) on delete cascade,
  module_id text references public.modules (id) on delete cascade,
  completed boolean default false,
  progress jsonb,
  updated_at timestamp with time zone default now()
);
create index if not exists idx_user_module on public.user_progress_modules (user_id, module_id);

alter table public.user_progress_modules enable row level security;

drop policy if exists "usuario_ve_proprio_progresso" on public.user_progress_modules;
create policy "usuario_ve_proprio_progresso"
  on public.user_progress_modules for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "usuario_edita_proprio_progresso" on public.user_progress_modules;
create policy "usuario_edita_proprio_progresso"
  on public.user_progress_modules for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- Fim. Depois de rodar isto, o primeiro usuário que você criar via signup vai
-- nascer com role = 'usuario'. Pra virar admin, rode manualmente (troque o
-- e-mail):
--
--   update public.profiles set role = 'admin' where email = 'voce@exemplo.com';
--
-- (precisa criar a conta primeiro pelo app ou por Authentication → Add user
-- no painel do Supabase, senão o profile ainda não existe pra dar update)
-- =============================================================================
