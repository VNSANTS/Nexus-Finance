-- =============================================================================
-- Nexus Finance — Histórico do chat Nexus AI
-- =============================================================================
-- Cole no SQL Editor do Supabase e rode. Seguro rodar de novo.
--
-- Guarda o histórico de conversas do assistente Nexus AI por usuário. Cada
-- linha é UMA mensagem (não a conversa inteira em JSON) — isso facilita
-- paginação/scroll infinito depois, sem reescrever um blob toda hora.

create table if not exists public.nexus_ai_mensagens (
  id bigserial primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  papel text not null check (papel in ('user', 'model')), -- nomenclatura do Gemini: 'user' e 'model'
  conteudo text not null,
  modulo_contexto text, -- id do módulo aberto quando a pergunta foi feita, se houver (null = fora de um módulo)
  created_at timestamp with time zone default now()
);

create index if not exists idx_nexus_ai_mensagens_user on public.nexus_ai_mensagens (user_id, created_at);

comment on table public.nexus_ai_mensagens is
  'Histórico de mensagens do chat Nexus AI, uma linha por mensagem (user ou model).';

alter table public.nexus_ai_mensagens enable row level security;

-- Cada usuário só vê e escreve o próprio histórico. Sem exceção para
-- admin aqui de propósito — conversa com IA é privada mesmo do painel
-- administrativo, diferente de XP/progresso (que faz sentido admin ver).
drop policy if exists "usuario_ve_proprio_historico_ia" on public.nexus_ai_mensagens;
create policy "usuario_ve_proprio_historico_ia"
  on public.nexus_ai_mensagens for select
  using (auth.uid() = user_id);

drop policy if exists "usuario_insere_proprio_historico_ia" on public.nexus_ai_mensagens;
create policy "usuario_insere_proprio_historico_ia"
  on public.nexus_ai_mensagens for insert
  with check (auth.uid() = user_id);

drop policy if exists "usuario_apaga_proprio_historico_ia" on public.nexus_ai_mensagens;
create policy "usuario_apaga_proprio_historico_ia"
  on public.nexus_ai_mensagens for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- Fim.
-- =============================================================================
