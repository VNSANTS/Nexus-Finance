# Checkpoint Nexus Finance — modo convidado e notificações

- Branch: `feat/guest-mode-notifications` nos repositórios Nexus-Finance e Nexus-Finance-web.
- Banco: quatro migrações aditivas aplicadas ao Supabase compartilhado; manutenção permanece desligada; versão mínima Android permanece 1 até existir APK assinado compatível.
- Edge Functions: education-module, feedback-beta, notifications-device e notifications-admin ativas. Requests não autenticadas das rotas protegidas responderam 401; feedback inválido respondeu 400 sem escrita.
- Validação local: builds Web de produção e Android debug, testes direcionados de guest/isolation/login/education/push/offline config já executados nesta sessão; detalhes no relatório da sessão.
- APK público analisado: versionCode 5, certificado SHA-256 `19cef861fb8df4f39fff71ab0879892654dc90e4bce15d5083b7d755d7a1e93f`. Próximo release deve ser >=6 e usar a mesma chave.
- Dependências externas: segredo/chave de assinatura Android do GitHub Actions e credenciais FCM + VAPID não estão disponíveis no projeto local; push remoto e APK instalável sobre o beta não podem ser declarados prontos antes de configurar/verificar as mesmas credenciais já existentes.
- Próxima ação: concluir build Web, commit seletivo e publicar branch/PR para checks; então promover web. Não elevar o bloqueio Android até APK assinado e download homologados.
