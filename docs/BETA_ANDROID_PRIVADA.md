# Nexus Finance: distribuição Android privada (beta)

## Estado deste checkpoint (18/11/2026)

Branch: `nexus/android-private-beta-2026-11-18`.

O APK agora é preparado com os assets de `dist/` dentro do pacote. Removida a dependência obrigatória do site na Vercel em `capacitor.config.ts`. O Supabase continua sendo a API de autenticação/sincronização e requer internet. O site completo NÃO precisa ser publicado para a abertura das telas do Android.

O APK de debug serve somente à equipe, não deve ser enviado ao grupo: usa chave de teste. Para distribuir, executar o workflow **Android Beta - Signed Release APK** após configurar os quatro secrets de assinatura em GitHub Actions. Guardar uma cópia offline SEGURA da keystore e sua senha para atualizar o mesmo app depois; sem isso o Android exigirá desinstalar antes de instalar outra assinatura. Verificar o SHA-256 do APK.

## Segurança verificada no código

- `server.url` removido do Capacitor, evitando carregar HTML/JS atualizado remotamente por um site antigo.
- Android `allowBackup=false` e `usesCleartextTraffic=false`.
- Origem `https://localhost` acrescentada às quatro Edge Functions (requer implantar essas versões no Supabase correto). Origem/CORS **não é autenticação**. JWT, permissões, RLS e rate limits ainda devem ser testados no serviço hospedado.
- SQL `supabase/013_proteger_campos_perfil.sql` impede usuário comum de editar diretamente `profiles.role/status/email/id` e corrige a policy de UPDATE. **A correção só entra em produção após executar a SQL no projeto do Nexus Finance.**
- O projeto Supabase do Nexus Finance identificado no código é `ygtroklufolvixwazkne`; ele **não aparece entre os projetos da conexão atual**. Não executar esta SQL no Supabase do Nexus ERP/CRM ou do Bíblia App.
- Nenhum backup completo foi solicitado ou realizado. Como rollback leve, preservar o commit anterior, registrar as DDLs alteradas e confirmar a política após aplicação. Isso não substitui backup de dados.

## Bloqueios para entregar ao grupo

1. Conectar/autorizar o Supabase **do Nexus Finance**, aplicar a SQL 013, implantar Edge Functions e testar com duas contas reais distintas: usuário A não altera dados de B, usuário comum não muda role/status/email, admin autorizado mantém funções próprias.
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
