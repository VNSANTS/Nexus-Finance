# Auditoria de todos os links | Nexus Finance Android Beta

**Data:** 22/11/2026  
**Escopo:** branch `nexus/android-private-beta-2026-11-18` / PR #8.  
**Importante:** auditoria de código e HTTP de páginas públicas; não equivale à homologação funcional de cada fluxo num celular.

## Cobertura automática

- **333 arquivos** de `src`, `banco-de-dados`, páginas em `public`, documentação, scripts e manifesto.
- **45 rotas React Router** identificadas.
- **156 referências estáticas** de navegação/arquivos; **0 rotas ou arquivos locais inválidos** nos casos verificáveis.
- **14 referências a arquivos públicos** resolvidas.
- **35 URLs HTTP(S) literais** detectadas, incluindo comentários, documentação, fontes, APIs e páginas.
- **17 páginas públicas seguras para consulta** verificadas por HEAD/GET no GitHub Actions; **17 acessíveis**, nenhum 404/410. Os 18 itens restantes foram classificados como API, endpoint de infraestrutura, URL dinâmica, exemplo, ou endpoint de clonagem e **não foram chamados**.
- **29 expressões dinâmicas** catalogadas, inclusive 13 chamadas de navegação de destino variável. Boa parte das outras são imagens do perfil, logo e conteúdos do usuário, não links de navegação.

Os resultados completos, inclusive arquivo/linha/endereço/status, são anexados automaticamente como `nexus-finance-auditoria-links` no workflow `Validar Nexus Finance (PR)`. O ZIP inclui `auditoria-links.json`, `auditoria-links.md`, `auditoria-links-publicos.json` e `auditoria-links-publicos.md`.

## Destinos dinâmicos revisados por leitura de código

- **Notificações da Gestão Financeira:** `n.rota` é gerada por `src/gestao-financeira/notificacoes.ts`. Os destinos de dívidas, orçamento, metas e relatórios correspondem a rotas existentes.
- **Busca geral:** `p.destino` sai de uma lista estática com destinos existentes. Módulos usam `/modulo/:id` ou `/aprender`; filtros `?trilha=` preservam a rota `/aprender`.
- **Cabeçalhos:** `voltarPara` é informado pelas páginas com destinos existentes.
- **Revisão de conteúdo:** `/desafio-diario` e `/modulo/:id` existem; módulos removidos dos dados podem ainda exigir tratamento de item antigo em teste real.
- **Links de notícias externas:** originam-se da MarketAux; agora são filtrados para aceitar somente URLs absolutas HTTPS sem credenciais. O componente já utiliza `target="_blank"` e `rel="noopener noreferrer"`.
- **Navegar de volta (-1):** depende do histórico do navegador/app, não é URL estática.
- **Google/GitHub OAuth:** o link vem do Supabase; não é possível validar o callback completo sem credenciais e dispositivo Android.

## Correções realizadas

1. **Redirecionamento nativo único, sem query:** cadastro, Google/GitHub OAuth, reenvio de confirmação e redefinição de senha usam exatamente `com.nexusfinance.app://auth/callback`, que precisa existir na allowlist do Supabase. Antes o app acrescentava `?next=`, permitindo incompatibilidade e eventual retorno à Site URL (Vercel).
2. **Rota pós-autenticação preservada localmente:** o WebView guarda a rota pendente por até 48h e o listener nativo a restaura após a troca PKCE. Isso não resolve integralmente recuperação de senha iniciada em outro dispositivo, que permanece um caso obrigatório de teste/ajuste.
3. **Links malformados do callback rejeitados:** falta de código PKCE ou tokens válidos leva a mensagem de falha, sem presumir login concluído.
4. **Reenvio de confirmação:** passa a especificar `emailRedirectTo`, antes omitido.
5. **URLs de notícias:** URLs inválidas, com esquema não HTTPS ou credenciais são ignoradas.
6. **Regressão automatizada:** scripts `auditar-links.mjs` e `verificar-links-publicos.mjs` executados no workflow de PR; relatórios anexados.

## Pendências que não são resolvidas por análise estática

- [ ] Confirmar no Supabase Auth → URL Configuration que `com.nexusfinance.app://auth/callback` está realmente em **Redirect URLs**. **Não alterar** a Site URL atual até a migração web ser aprovada.
- [ ] Gerar novo APK **release assinado com a mesma keystore** após os commits desta auditoria. APK assinado de 22/11 anterior às correções ainda tem o problema.
- [ ] Testar em dispositivo físico: Google, GitHub, login por senha, logout, cadastro, confirmar por e-mail, reenvio de confirmação e recuperação de senha (mesmo dispositivo e outro dispositivo).
- [ ] Conferir os templates de e-mail no Supabase. Templates personalizados que forçam `{{ .SiteURL }}` podem ignorar o destino nativo, mesmo se o código solicitar `redirectTo`.
- [ ] Testar abertura de notícias que vierem da API, serviços financeiros e endpoints com JWT com contas de teste. **Não executar APIs pagas ou com cotas apenas para validar uma URL.**
- [ ] Antes de desligar GitHub Pages/Vercel, migrar a landing page, simulador, links legais e qualquer link compartilhado que hoje aponte para `https://vnsants.github.io/Nexus-Finance/`.
- [ ] Testar instalação/atualização do APK assinado no mesmo aparelho e comparar comportamento da versão nova.

**Estado:** PR #8 permanece Draft. Sem merge, sem alteração de repositório público/privado, sem desligar sites, sem acesso a senhas ou chaves privadas.