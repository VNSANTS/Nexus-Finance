# Notificações do Nexus Finance

Lembretes locais do Android funcionam com `@capacitor/local-notifications`, sem Firebase. Os avisos gerais de atualização usam um consentimento separado nas preferências de notificações. O painel administrativo envia a mensagem fixa com o link oficial. O resultado identifica os aceites dos provedores, que não comprovam entrega ao aparelho.

## FCM no APK

1. No projeto Firebase existente ou no plano gratuito Spark, registre o app Android `com.nexusfinance.app` e habilite a API Firebase Cloud Messaging HTTP v1.
2. Forneça `android/app/google-services.json` desse projeto ao ambiente de compilação. Esse arquivo é ignorado no Git. No passo de build Web que será empacotado no APK, defina `VITE_FCM_ANDROID_ENABLED=true` somente se o arquivo estiver presente. Execute o `cap sync android` e compile o APK normalmente. Para compilação sem Firebase, deixe a variável ausente ou como `false`.
3. Configure `FCM_SERVICE_ACCOUNT_JSON` como segredo da Edge Function. Use o JSON da conta de serviço autorizada no projeto Firebase, com `project_id`, `client_email` e `private_key`. A credencial deve ter apenas a permissão de envio necessária. Guarde-a no Supabase, separada do arquivo Android.
4. Homologue com uma instalação assinada, uma conta ativa, permissão de notificações no Android e consentimento em **Preferências de notificações → Avisos gerais de atualização**. FCM exige Google Play Services. ROMs sem esse serviço podem usar os lembretes locais.

## Web Push

1. Gere um par VAPID para o projeto. Configure `VITE_WEB_PUSH_PUBLIC_KEY` no build da aplicação Web. Configure `WEB_PUSH_PUBLIC_KEY`, `WEB_PUSH_PRIVATE_KEY` e `WEB_PUSH_SUBJECT` no Supabase. As duas chaves públicas devem coincidir. Use `mailto:` com o contato operacional em `WEB_PUSH_SUBJECT`.
2. A configuração atual aceita endpoints HTTPS dos serviços de push do Chrome, Firefox e Safari. O navegador precisa oferecer Push API e um service worker ativo no escopo do PWA. No iOS, use o PWA adicionado à tela inicial. O consentimento inicia a inscrição e o cancelamento remove a inscrição correspondente.
3. Homologue a inscrição, recebimento com o app fechado, abertura do link oficial e revogação no navegador. O service worker mantém o fluxo automático de atualização do PWA.

## Supabase e operação

- Homologue primeiro as migrações `notification_devices` e `durable_notification_broadcasts` e as Edge Functions `notifications-device` e `notifications-admin` no ambiente de teste. A função valida a sessão com Auth e confere o perfil no banco. Cadastro de dispositivos e fila de envio só ficam acessíveis ao backend.
- A fila registra o progresso em lotes. Se a aba fechar ou a rede cair, o próximo clique no painel retoma o envio pendente. Uma entrega sem confirmação após expirar a reserva aparece como **sem confirmação** e não é reenviada automaticamente, porque o provedor pode já tê-la aceitado.
- O fluxo usa o Firebase apenas para FCM e o protocolo Web Push sem serviços pagos. Nenhum segredo do servidor precisa ser inserido em variáveis `VITE_*`, arquivos Git ou logs de CI.
