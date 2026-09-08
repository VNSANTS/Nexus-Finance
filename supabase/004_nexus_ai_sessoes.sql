-- =============================================================================
-- Nexus Finance — Nexus AI: sessões de conversa + escopo (geral / GF)
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode. Seguro rodar de novo.
--
-- Duas mudanças na tabela nexus_ai_mensagens (criada em 003_nexus_ai.sql):
--
--   1. sessao_id: agrupa mensagens em conversas separadas. Uma "sessão"
--      nova começa quando o usuário abre o chat depois de 2+ minutos sem
--      mandar mensagem (regra aplicada no frontend, ver useNexusAI.ts) ou
--      quando aperta "Novo chat" manualmente. Mensagens antigas (antes
--      desta migration) recebem um sessao_id novo gerado agora, viram uma
--      "conversa" só no histórico — não se perdem, só ficam agrupadas.
--
--   2. escopo: distingue o assistente "geral" (educação financeira, no
--      app principal) do assistente "gestao-financeira" (focado em ajudar
--      com as finanças pessoais registradas na Gestão Financeira). São
--      contextos e prompts diferentes: o histórico de um não aparece
--      misturado com o do outro.

alter table public.nexus_ai_mensagens
  add column if not exists sessao_id uuid,
  add column if not exists escopo text not null default 'geral' check (escopo in ('geral', 'gestao-financeira'));

-- Preenche sessao_id das linhas antigas (antes desta migration existir)
-- com um único id novo, agrupando-as como "uma conversa antiga" em vez de
-- deixar nulo (nulo quebraria o agrupamento por sessão no histórico).
update public.nexus_ai_mensagens set sessao_id = gen_random_uuid() where sessao_id is null;

alter table public.nexus_ai_mensagens alter column sessao_id set not null;

create index if not exists idx_nexus_ai_mensagens_sessao on public.nexus_ai_mensagens (user_id, sessao_id, created_at);

-- =============================================================================
-- Fim.
-- =============================================================================
