create table public.nexus_notification_devices (
  installation_id uuid primary key,
  proof_hash text not null check (proof_hash ~ '^[0-9a-f]{64}$'),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null check (provider in ('fcm', 'webpush')),
  address text not null check (char_length(address) between 1 and 2048),
  web_keys jsonb,
  updated_at timestamptz not null default now(),
  unique (provider, address),
  check ((provider = 'fcm' and web_keys is null) or (provider = 'webpush' and web_keys is not null))
);

alter table public.nexus_notification_devices enable row level security;
revoke all on public.nexus_notification_devices from public, anon, authenticated;
grant select, insert, update, delete on public.nexus_notification_devices to service_role;
create index nexus_notification_devices_user on public.nexus_notification_devices (user_id);

create table public.nexus_device_registration_windows (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  started_at timestamptz not null,
  attempts integer not null check (attempts between 1 and 30)
);
alter table public.nexus_device_registration_windows enable row level security;
revoke all on public.nexus_device_registration_windows from public, anon, authenticated;
grant select, insert, update on public.nexus_device_registration_windows to service_role;

create function public.manage_nexus_notification_device(
  p_user uuid, p_install uuid, p_proof_hash text, p_action text,
  p_provider text, p_address text, p_keys jsonb
) returns text language plpgsql security invoker set search_path = '' as $$
declare
  device public.nexus_notification_devices%rowtype;
begin
  if p_user is null or p_install is null or p_proof_hash is null
     or p_proof_hash !~ '^[0-9a-f]{64}$' then
    return 'invalid';
  end if;

  -- All changes for an account and all ownership changes for an installation
  -- serialize, including the first registration before a device row exists.
  perform pg_catalog.pg_advisory_xact_lock(134754, pg_catalog.hashtext(p_user::text));
  perform pg_catalog.pg_advisory_xact_lock(134755, pg_catalog.hashtext(p_install::text));
  select * into device from public.nexus_notification_devices where installation_id = p_install for update;

  if p_action = 'remover' then
    if device.installation_id is null then return 'ok'; end if;
    if device.user_id <> p_user or device.proof_hash <> p_proof_hash then return 'denied'; end if;
    delete from public.nexus_notification_devices where installation_id = p_install;
    return 'ok';
  end if;
  if p_action is distinct from 'registrar' then return 'invalid'; end if;

  insert into public.nexus_device_registration_windows as w (user_id, started_at, attempts)
  values (p_user, now(), 1)
  on conflict (user_id) do update set
    started_at = case when w.started_at <= now() - interval '10 minutes' then now() else w.started_at end,
    attempts = case when w.started_at <= now() - interval '10 minutes' then 1 else w.attempts + 1 end
  where w.started_at <= now() - interval '10 minutes' or w.attempts < 30;
  if not found then return 'limited'; end if;
  if device.installation_id is not null and device.proof_hash <> p_proof_hash then return 'denied'; end if;
  if device.user_id is distinct from p_user and
    (select count(*) from public.nexus_notification_devices where user_id = p_user) >= 10 then
    return 'limited';
  end if;

  begin
    insert into public.nexus_notification_devices(installation_id, proof_hash, user_id, provider, address, web_keys)
    values (p_install, p_proof_hash, p_user, p_provider, p_address, p_keys)
    on conflict (installation_id) do update set user_id = excluded.user_id, provider = excluded.provider,
      address = excluded.address, web_keys = excluded.web_keys, updated_at = now();
  exception when unique_violation then
    return 'denied';
  end;
  return 'ok';
end;
$$;
revoke all on function public.manage_nexus_notification_device(uuid,uuid,text,text,text,text,jsonb) from public, anon, authenticated;
grant execute on function public.manage_nexus_notification_device(uuid,uuid,text,text,text,text,jsonb) to service_role;

create table public.nexus_notification_dispatch_gate (
  id boolean primary key default true check (id),
  next_send_at timestamptz not null default '-infinity',
  last_sender uuid references public.profiles(id) on delete set null
);

insert into public.nexus_notification_dispatch_gate (id) values (true);
alter table public.nexus_notification_dispatch_gate enable row level security;
revoke all on public.nexus_notification_dispatch_gate from public, anon, authenticated;
grant select, update on public.nexus_notification_dispatch_gate to service_role;

create function public.claim_nexus_update_notice(p_sender uuid)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
begin
  update public.nexus_notification_dispatch_gate
    set next_send_at = pg_catalog.now() + interval '5 minutes', last_sender = p_sender
    where id and next_send_at <= pg_catalog.now();
  return found;
end;
$$;

revoke execute on function public.claim_nexus_update_notice(uuid) from public, anon, authenticated;
grant execute on function public.claim_nexus_update_notice(uuid) to service_role;
