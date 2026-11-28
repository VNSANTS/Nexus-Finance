# Conteúdo educacional e homologação

O build gera 94 prévias em `banco-de-dados/modulos/previas.json` e um catálogo completo em `supabase/functions/education-module/catalogo.json`. Somente a Edge Function importa o catálogo. O diretório publicado por Vite/Cloudflare é `dist/`. A função responde a `GET education-module?id=<id>` e não lista módulos nem aceita caminhos de arquivo.

Antes de promover um cliente, homologue a função `education-module` no Supabase compartilhado. Ela usa as variáveis de runtime `SUPABASE_URL` e `SUPABASE_ANON_KEY` e valida cada bearer no Auth. O perfil e a manutenção são consultados com o JWT do próprio usuário, sob RLS. Falhas de verificação impedem a entrega. As respostas usam `private, no-store`; os módulos completos exigem conexão. Os testes locais exercitam o handler com fixtures, sem credenciais. Falta homologar com sessão real na instância de teste.

Execute `npm run build` e `node --experimental-strip-types --test scripts/testar-carregamento-modulos.mjs`. O postbuild inspeciona o diretório final à procura de chunks antigos e textos privados. No APK, sincronize o novo dist e recompile antes de assinar. Não distribua builds de teste com configuração fictícia.

O gateway controla a entrega pelo aplicativo atualizado. O histórico público do repositório, os APKs antigos, arquivos já baixados e deploys antigos podem conter cópias integrais. A instalação do novo service worker remove os chunks de módulo do cache `nexus-chunks` correspondente à PWA. Essa limpeza não recolhe cópias externas. Conteúdo futuro que exija sigilo também depende de manter as fontes, o catálogo e os artefatos anteriores fora de repositórios e hosts públicos.
