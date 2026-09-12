-- =============================================================================
-- Nexus Finance — Vínculo de WhatsApp (Nexus AI por mensagem)
-- =============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase e rode uma vez.
--
-- Fluxo: a pessoa gera um código de 6 dígitos no app (Perfil → Conectar
-- WhatsApp), manda esse código pro número do bot no WhatsApp, e a Edge
-- Function whatsapp-webhook vincula o número de telefone que mandou a essa
-- conta (via whatsapp_codigo_vinculo). Depois disso, mensagens desse número
-- viram lançamentos automaticamente na Gestão Financeira dessa pessoa.
-- =============================================================================

alter table public.profiles add column if not exists whatsapp_telefone text unique;
alter table public.profiles add column if not exists whatsapp_codigo_vinculo text;
alter table public.profiles add column if not exists whatsapp_codigo_expira_em timestamptz;
