# Nexus Finance: distribuição Android privada (beta)

## Estado deste checkpoint (18/11/2026)

Branch: `nexus/android-private-beta-2026-11-18`.

O APK agora é preparado com os assets de `dist/` dentro do pacote. Removida a dependência obrigatória do site na Vercel em `capacitor.config.ts`. O Supabase continua sendo a API de autenticação/sincronização e requer internet. O site completo NÃO precisa ser publicado para a abertura das telas do Android.

O APK de debug serve somente à equipe, não deve ser enviado ao grupo: usa chave de teste. Para distribuir, executar o workflow **Android Beta - Signed Release APK** após configurar os quatro secrets de assinatura em GitHub Actions. Guardar uma cópia offline SEGURA da keystore e sua senha para atualizar o mesmo app depois; sem isso o Android exigirá desinstalar antes de instalar outra assinatura. Verificar o SHA-256 do APK.

## Segurança verificada no código

- `server.url` removido do Capacitor, evitando carregar HTML/JS atualizado remotamente por um site antigo.
- Android `allowBackup=false` e `usesCleartextTraffic=false`.
- Origem `https://localhost` acrescentada e **implantada em 18/11/2026** nas quatro Edge Functions do projeto correto. Elas continuam com `verify_jwt=true`; CORS **não é autenticação**. Ainda é necessário o smoke test funcional via dispositivo Android.
- SQL `supabase/013_proteger_campos_perfil.sql` aplicada em **18/11/2026** ao projeto Nexus Finance. Simulações transacionais sem persistência confirmaram bloqueio de troca de `role/status/email`, edição de nome permitida e acesso administrativo intacto.
- SQL `supabase/014_suspender_acesso_contas_bloqueadas.sql` aplicada em **18/11/2026**: políticas RLS restritivas impedem tokens de contas bloqueadas de acessar Gestão Financeira, histórico de IA e progresso. Testado com sessão simulada bloqueada e administradora ativa.
- Rotas protegidas aguardam a consulta do perfil e exibem bloqueio antes de liberar a interface, incluindo navegação/chat. **Ainda não testado em um APK instalado.**
- O projeto Supabase correto foi conectado: **Nexus Finance App**, ref `ygtroklufolvixwazkne`. Nenhum SQL foi aplicado nos projetos Nexus ERP/CRM ou Bíblia App.
- Nenhum backup completo foi solicitado ou realizado. Como rollback leve, preservar o commit anterior, registrar as DDLs alteradas e confirmar a política após aplicação. Isso não substitui backup de dados.

## Bloqueios para entregar ao grupo

O Supabase Security Advisor ainda alerta para **proteção contra senhas vazadas desativada**. Revisar https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection e validar disponibilidade no plano sem custos extras.


1. **Concluído no backend (18/11):** conexão ao Supabase correto, SQL 013 e 014, e quatro Edge Functions implantadas. Simulações de papéis no PostgreSQL passaram sem persistir alterações. **Pendente:** repetir fluxo A/B e funções pelo APK real com duas contas diferentes e redes reais.
2. **Autenticação no Android local:** o login por e-mail e senha deve ser testado. OAuth e recuperação de senha dependem de redirecionamentos web/deep links; a configuração atual aponta para a origem do navegador e **não está validada para o APK local**. Corrigir e homologar antes da distribuição. Manter página legal/recuperação minimalista na Cloudflare, se necessário, sem hospedar a aplicação completa.
3. Configurar os secrets de assinatura Android (ou verificar os já existentes) e gerar APK de release assinado, depois testar instalação e atualização em dispositivo Android real.
4. Apenas após o APK ser testado e possuir URL pública: criar um repositório **separado** de distribuição pública contendo somente APK, checksum e changelog, ou publicar o binário na Cloudflare. Um GitHub Release de repositório privado **não é baixável pelo grupo sem autenticação**.
5. Tornar o repositório-fonte privado em Settings → General → Danger Zone → Change repository visibility. Isso **não revoga cópias já feitas** enquanto era público; também desabilitar GitHub Pages, descontinuar implantação web antiga e verificar Vercel, sem fazer isso antes de preservar os fluxos de autenticação.
6. Revisar direito autoral dos textos/resumos de livros distribuídos no aplicativo e a política de privacidade de usuários, além de demonstrar consentimento e canais de feedback.

## Testes mínimos de aceitação

- Instalação em aparelho novo sem navegador; abertura inicial com internet e retorno offline às telas educacionais já empacotadas.
- Cadastro, confirmação por e-mail, login, logout, reset de senha, OAuth (se oferecido), conta bloqueada, expiração do token, exclusão de conta.
- Navegação profunda, módulo de estudo, quiz, gráficos, dados da Gestão Financeira, persistência após reiniciar; Internet ligada/desligada; modo claro/AMOLED.
- RLS A/B, XSS em campos do usuário, requisições indevidas às Edge Functions (JWT inválido), rate limiting e segurança da função admin.
- Instalação limpa, atualização por APK assinado com a **mesma chave**, arquivo SHA-256 publicado e teste de versão anterior.

O arquivo `scripts/verificar-beta-android.mjs` e o workflow de PR validam apenas algumas configurações estáticas e compilação. PASS em CI não substitui os testes acima.

## Coleta de feedback para teste em grupo

Incluída a tela `/feedback-beta`, acessível em Perfil → Enviar feedback (beta). O testador pode descrever erro, sugestões e passos de reprodução e escolher Compartilhar/Copiar para mandar ao grupo. Nenhum dado ou relato é enviado automaticamente a um servidor. Recomenda-se que ninguém compartilhe CPF, tokens, saldos, senhas ou capturas com dados pessoais. A tela precisa de validação visual e do fluxo de compartilhamento num APK real.
