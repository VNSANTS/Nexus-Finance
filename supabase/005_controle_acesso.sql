-- =============================================================================
-- Nexus Finance — Controle global de acesso (fechar cadastro / manutenção)
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode. Seguro rodar de novo.
--
-- Cria um "painel de interruptores" global do app:
--   - cadastro_fechado: quando true, ninguém consegue criar conta nova
--     (nem e-mail/senha, nem OAuth) — bloqueado DE VERDADE por um trigger
--     em auth.users (BEFORE INSERT), não só escondendo o formulário no
--     frontend. Alguém tentando contornar o app e chamar a API do
--     Supabase diretamente também é barrado.
--   - modo_manutencao: quando true, só contas com role='admin' conseguem
--     LOGAR (não afeta quem já está logado numa sessão aberta, só novos
--     logins) — checado no frontend a cada carregamento do app.

create table if not exists public.app_config (
  id boolean primary key default true check (id = true), -- trava a tabela em 1 linha só (singleton)
  cadastro_fechado boolean not null default false,
  modo_manutencao boolean not null default false,
  atualizado_em timestamp with time zone default now(),
  atualizado_por uuid references public.profiles (id)
);

comment on table public.app_config is
  'Configuração global singleton do app: interruptores de cadastro fechado e modo manutenção.';

-- Garante que a linha única já existe (senão o app não tem o que ler).
insert into public.app_config (id, cadastro_fechado, modo_manutencao)
values (true, false, false)
on conflict (id) do nothing;

alter table public.app_config enable row level security;

-- Todo mundo (inclusive deslogado) precisa poder LER — é assim que a tela
-- de login sabe se deve mostrar "cadastros pausados" antes mesmo de a
-- pessoa ter conta.
drop policy if exists "qualquer_um_le_config" on public.app_config;
create policy "qualquer_um_le_config"
  on public.app_config for select
  using (true);

-- Só admin edita.
drop policy if exists "admin_edita_config" on public.app_config;
create policy "admin_edita_config"
  on public.app_config for update
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.set_atualizado_em_config()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists app_config_set_atualizado_em on public.app_config;
create trigger app_config_set_atualizado_em
  before update on public.app_config
  for each row execute function public.set_atualizado_em_config();

-- Trigger que bloqueia cadastro de verdade, no banco — roda ANTES do
-- insert em auth.users acontecer, então se cadastro_fechado = true, a
-- exceção cancela a transação inteira (a conta nunca chega a existir).
-- Isto é o que torna o bloqueio impossível de contornar via API direta,
-- diferente de só esconder o formulário de cadastro no frontend.
create or replace function public.bloquear_cadastro_se_fechado()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  fechado boolean;
begin
  select cadastro_fechado into fechado from public.app_config where id = true;
  if fechado then
    raise exception 'CADASTRO_FECHADO: novos cadastros estão temporariamente pausados.';
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_before_insert on auth.users;
create trigger on_auth_user_before_insert
  before insert on auth.users
  for each row execute function public.bloquear_cadastro_se_fechado();

-- =============================================================================
-- Fim. Para ligar/desligar manualmente pelo SQL Editor (fallback caso o
-- painel admin não esteja acessível por algum motivo):
--
--   update public.app_config set cadastro_fechado = true;
--   update public.app_config set modo_manutencao = true;
-- =============================================================================
