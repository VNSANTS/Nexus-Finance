-- =============================================================================
-- Nexus Finance — Remoção da integração de WhatsApp
-- =============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase e rode uma vez.
--
-- Desfaz a migration 011_whatsapp_vinculo.sql: remove as colunas de
-- vínculo de WhatsApp da tabela profiles. A funcionalidade (código no
-- app, Edge Function whatsapp-webhook) foi removida do projeto.
-- =============================================================================

alter table public.profiles drop column if exists whatsapp_telefone;
alter table public.profiles drop column if exists whatsapp_codigo_vinculo;
alter table public.profiles drop column if exists whatsapp_codigo_expira_em;
