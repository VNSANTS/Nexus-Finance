alter table public.app_config
  add column if not exists android_min_version_code integer not null default 1
    check (android_min_version_code >= 1),
  add column if not exists android_update_revoked boolean not null default false,
  add column if not exists android_apk_download_url text not null
    default 'https://nexus-finance-vn.lovable.app';

comment on column public.app_config.android_min_version_code is
  'Menor versionCode Android permitido. A versão Web/PWA ignora este valor.';
comment on column public.app_config.android_update_revoked is
  'Quando true, revoga administrativamente o bloqueio por versionCode Android.';
comment on column public.app_config.android_apk_download_url is
  'Página oficial de download para a tela obrigatória de atualização Android.';
