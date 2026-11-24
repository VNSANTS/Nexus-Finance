-- Configuração pública de apoio voluntário via Pix.
-- A chave e a imagem do QR são públicas por definição; só admins podem alterá-las.

alter table public.app_config
  add column if not exists pix_chave text,
  add column if not exists pix_nome_recebedor text,
  add column if not exists pix_qr_path text;

comment on column public.app_config.pix_chave is
  'Chave Pix exibida publicamente no cartão Apoie o projeto.';
comment on column public.app_config.pix_nome_recebedor is
  'Nome público do recebedor Pix, opcional.';
comment on column public.app_config.pix_qr_path is
  'Caminho do QR Pix público salvo no bucket nexus-apoie-pix.';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'nexus-apoie-pix',
  'nexus-apoie-pix',
  true,
  1048576,
  array['image/png', 'image/jpeg', 'image/webp']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin_le_qr_apoio_pix" on storage.objects;
create policy "admin_le_qr_apoio_pix"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'nexus-apoie-pix'
    and name like 'qr/%'
    and (select private.is_admin())
  );

drop policy if exists "admin_envia_qr_apoio_pix" on storage.objects;
create policy "admin_envia_qr_apoio_pix"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'nexus-apoie-pix'
    and name like 'qr/%'
    and (select private.is_admin())
  );

drop policy if exists "admin_atualiza_qr_apoio_pix" on storage.objects;
create policy "admin_atualiza_qr_apoio_pix"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'nexus-apoie-pix'
    and name like 'qr/%'
    and (select private.is_admin())
  )
  with check (
    bucket_id = 'nexus-apoie-pix'
    and name like 'qr/%'
    and (select private.is_admin())
  );

drop policy if exists "admin_remove_qr_apoio_pix" on storage.objects;
create policy "admin_remove_qr_apoio_pix"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'nexus-apoie-pix'
    and name like 'qr/%'
    and (select private.is_admin())
  );
