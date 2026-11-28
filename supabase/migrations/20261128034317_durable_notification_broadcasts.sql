create table public.nexus_notice_jobs (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.nexus_notice_recipients (
  job_id uuid not null references public.nexus_notice_jobs(id) on delete cascade,
  installation_id uuid not null,
  user_id uuid references public.profiles(id) on delete set null,
  state text not null default 'queued' check (state in ('queued', 'processing', 'accepted', 'failed', 'unavailable', 'uncertain')),
  lease uuid,
  lease_expires_at timestamptz,
  primary key (job_id, installation_id)
);

alter table public.nexus_notice_jobs enable row level security;
alter table public.nexus_notice_recipients enable row level security;
revoke all on public.nexus_notice_jobs, public.nexus_notice_recipients from public, anon, authenticated;
grant select, insert, update, delete on public.nexus_notice_jobs, public.nexus_notice_recipients to service_role;
create index nexus_notice_recipient_state on public.nexus_notice_recipients (job_id, state, installation_id);
create index nexus_notice_recipient_user on public.nexus_notice_recipients (user_id);
create index nexus_notice_jobs_sender on public.nexus_notice_jobs (sender_id);

create function public.start_nexus_update_notice(p_sender uuid)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  aviso uuid;
begin
  perform pg_catalog.pg_advisory_xact_lock(65012175);
  select j.id into aviso from public.nexus_notice_jobs j where j.completed_at is null order by j.created_at limit 1;
  if aviso is not null then return aviso; end if;
  if not public.claim_nexus_update_notice(p_sender) then return null; end if;

  delete from public.nexus_notice_jobs where completed_at < pg_catalog.now() - interval '30 days';
  insert into public.nexus_notice_jobs (sender_id) values (p_sender) returning id into aviso;
  insert into public.nexus_notice_recipients (job_id, installation_id, user_id)
    select aviso, d.installation_id, d.user_id
    from public.nexus_notification_devices d join public.profiles p on p.id = d.user_id
    where p.status = 'ativo';
  return aviso;
end;
$$;

create function public.claim_nexus_notice_recipients(p_job uuid)
returns table (installation_id uuid, lease uuid, provider text, address text, web_keys jsonb)
language plpgsql
security invoker
set search_path = ''
as $$
begin
  -- Um worker pode cair após o provedor aceitar a mensagem. Não reenvia nessas condições.
  update public.nexus_notice_recipients r
    set state = 'uncertain', lease = null, lease_expires_at = null
    where r.job_id = p_job and r.state = 'processing' and r.lease_expires_at <= pg_catalog.now();

  return query
    with proximos as (
      select r.installation_id from public.nexus_notice_recipients r
      where r.job_id = p_job and r.state = 'queued'
      order by r.installation_id limit 16 for update skip locked
    ), lote as (
      update public.nexus_notice_recipients r
      set state = 'processing', lease = pg_catalog.gen_random_uuid(), lease_expires_at = pg_catalog.now() + interval '45 seconds'
      from proximos p where r.job_id = p_job and r.installation_id = p.installation_id
      returning r.installation_id, r.user_id, r.lease
    )
    select l.installation_id, l.lease, d.provider, d.address, d.web_keys from lote l
    left join public.profiles p on p.id = l.user_id and p.status = 'ativo'
    left join public.nexus_notification_devices d on d.installation_id = l.installation_id and d.user_id = p.id;
end;
$$;

create function public.nexus_notice_status(p_job uuid)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  resultado jsonb;
  pendentes bigint;
begin
  if not exists (select 1 from public.nexus_notice_jobs j where j.id = p_job) then return null; end if;
  select pg_catalog.count(*) filter (where state in ('queued', 'processing')),
    pg_catalog.jsonb_build_object(
      'aceitos', pg_catalog.count(*) filter (where state = 'accepted'),
      'falharam', pg_catalog.count(*) filter (where state = 'failed'),
      'indisponiveis', pg_catalog.count(*) filter (where state = 'unavailable'),
      'incertos', pg_catalog.count(*) filter (where state = 'uncertain')
    )
    into pendentes, resultado from public.nexus_notice_recipients where job_id = p_job;
  if pendentes = 0 then
    update public.nexus_notice_jobs set completed_at = pg_catalog.now() where id = p_job and completed_at is null;
  end if;
  return resultado || pg_catalog.jsonb_build_object('job', p_job, 'pendentes', pendentes, 'concluido', pendentes = 0);
end;
$$;

revoke execute on function public.start_nexus_update_notice(uuid), public.claim_nexus_notice_recipients(uuid), public.nexus_notice_status(uuid) from public, anon, authenticated;
grant execute on function public.start_nexus_update_notice(uuid), public.claim_nexus_notice_recipients(uuid), public.nexus_notice_status(uuid) to service_role;
