-- Beta feedback is written only by the Edge Function. The anonymous key is
-- never allowed to read or write either table directly.
create schema if not exists nexus_feedback;
grant usage on schema nexus_feedback to service_role;

create table if not exists public.feedback_beta (
  id uuid primary key default gen_random_uuid(),
  installation_hash text not null,
  request_id uuid not null,
  user_id uuid references auth.users (id) on delete set null,
  category text not null check (category in ('Erro', 'Sugestão', 'Dificuldade', 'Elogio')),
  screen text not null default '',
  description text not null check (char_length(description) between 10 and 2000),
  steps text not null default '',
  expected text not null default '',
  created_at timestamptz not null default now(),
  unique (installation_hash, request_id),
  check (char_length(screen) <= 120),
  check (char_length(steps) <= 1200),
  check (char_length(expected) <= 600)
);

create index if not exists feedback_beta_created_at_idx
  on public.feedback_beta (created_at desc);

alter table public.feedback_beta enable row level security;
revoke all on public.feedback_beta from public, anon, authenticated;
grant all on public.feedback_beta to service_role;

create table if not exists nexus_feedback.feedback_beta_rate_events (
  id bigint generated always as identity primary key,
  installation_hash text not null,
  ip_hash text not null,
  request_id uuid not null,
  created_at timestamptz not null default now(),
  unique (installation_hash, request_id)
);

create index if not exists feedback_beta_rate_ip_time_idx on nexus_feedback.feedback_beta_rate_events(ip_hash, created_at);
create index if not exists feedback_beta_rate_expiry_idx on nexus_feedback.feedback_beta_rate_events(created_at);

revoke all on nexus_feedback.feedback_beta_rate_events from public, anon, authenticated;
grant all on nexus_feedback.feedback_beta_rate_events to service_role;

create or replace function public.submit_feedback_beta(
  p_installation_hash text,
  p_request_id uuid,
  p_ip_hash text,
  p_user_id uuid,
  p_category text,
  p_screen text,
  p_description text,
  p_steps text,
  p_expected text
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public, nexus_feedback, auth
as $$
declare
  v_existing_id uuid;
  v_existing_category text;
  v_existing_screen text;
  v_existing_description text;
  v_existing_steps text;
  v_existing_expected text;
  v_installation_count integer;
  v_ip_count integer;
  v_feedback_id uuid;
begin
  if coalesce(auth.jwt() ->> 'role', '') <> 'service_role' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  if p_ip_hash is null then
    raise exception 'origin_unavailable' using errcode = '22004';
  end if;

  -- Serialize writes for the installation and, when present, its network
  -- address. Every caller acquires locks in the same order.
  perform pg_advisory_xact_lock(hashtextextended(p_installation_hash, 0));
  if p_ip_hash is not null then
    perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 1));
  end if;

  select id, category, screen, description, steps, expected
    into v_existing_id, v_existing_category, v_existing_screen,
      v_existing_description, v_existing_steps, v_existing_expected
  from public.feedback_beta
  where installation_hash = p_installation_hash and request_id = p_request_id;
  if v_existing_id is not null then
    if v_existing_category = p_category and v_existing_screen = coalesce(p_screen, '')
      and v_existing_description = btrim(p_description)
      and v_existing_steps = coalesce(p_steps, '')
      and v_existing_expected = coalesce(p_expected, '') then
      return jsonb_build_object('accepted', true, 'duplicate', true, 'id', v_existing_id);
    end if;
    return jsonb_build_object('accepted', false, 'reason', 'idempotency_conflict');
  end if;

  select count(*) into v_installation_count
  from nexus_feedback.feedback_beta_rate_events
  where installation_hash = p_installation_hash
    and created_at > now() - interval '24 hours';
  if v_installation_count >= 3 then
    return jsonb_build_object('accepted', false, 'reason', 'rate_limited');
  end if;

  if p_ip_hash is not null then
    select count(*) into v_ip_count
    from nexus_feedback.feedback_beta_rate_events
    where ip_hash = p_ip_hash and created_at > now() - interval '24 hours';
    if v_ip_count >= 20 then
      return jsonb_build_object('accepted', false, 'reason', 'rate_limited');
    end if;
  end if;

  insert into public.feedback_beta (
    installation_hash, request_id, user_id, category, screen, description, steps, expected
  ) values (
    p_installation_hash, p_request_id, p_user_id, p_category,
    coalesce(p_screen, ''), btrim(p_description), coalesce(p_steps, ''), coalesce(p_expected, '')
  ) returning id into v_feedback_id;

  insert into nexus_feedback.feedback_beta_rate_events (installation_hash, ip_hash, request_id)
  values (p_installation_hash, p_ip_hash, p_request_id);

  -- Keep quota fingerprints only for the active rolling window.
  delete from nexus_feedback.feedback_beta_rate_events
  where created_at < now() - interval '24 hours';

  return jsonb_build_object('accepted', true, 'duplicate', false, 'id', v_feedback_id);
end;
$$;

revoke all on function public.submit_feedback_beta(text, uuid, text, uuid, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.submit_feedback_beta(text, uuid, text, uuid, text, text, text, text, text)
  to service_role;
