-- =============================================================================
-- Nexus Finance — Forçar atualização do app pra todos os usuários
-- =============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase e rode uma vez.
--
-- Junto com o modo manutenção (que já reusa esse mesmo padrão de polling a
-- cada 25s em AuthContext.tsx), essa coluna resolve o problema de PWA
-- instalado que fica preso numa versão antiga: o admin marca esse timestamp
-- como "agora", e todo aparelho com o app aberto (ou que abrir depois)
-- detecta que é mais novo que o que já viu e força uma atualização de
-- verdade — desregistra o Service Worker antigo, limpa os caches e recarrega
-- do zero, garantindo pegar a versão mais recente sem depender do ciclo
-- normal (às vezes lento/travado) de atualização do Service Worker.
-- =============================================================================

alter table public.app_config add column if not exists forcar_atualizacao_em timestamptz;
