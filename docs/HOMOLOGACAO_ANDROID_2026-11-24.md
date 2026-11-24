# Homologação Android — 24/11/2026

- Destino: PR #8, branch nexus/android-private-beta-2026-11-18, base main. Manter a PR em Draft até revisão; esta entrega não é merge nem release.
- Base do conjunto homologado antes da sincronização: baa2426.
- Trabalho: topo radial do Perfil, glassmorphism discreto nas barras e cards de destaque, contraste das conquistas bloqueadas, opção técnica de atualização removida do fluxo comum, largura adaptativa de 480 px para 768 px em telas >= 600 px, barra centrada até 640 px e rolagem redefinida a cada rota.
- Dispositivo: Infinix X6531B, 720×1600, densidade restaurada para 320 DPI físico (override anterior: 213 DPI). APK DEBUG 1.0.1 instalado e aberto. Navegação visual verificada em Início, Aprender, Mercado, Biblioteca, Carteira, Perfil e Gestão Financeira; telas capturadas na conversa.
- Checks: npm run build PASSOU (aviso preexistente de import dinâmico/estático do índice de livros); beta estático PASSOU; auth listener PASSOU; testes auth 20/20; carregamento módulos 5/5; Capacitor sync PASSOU; Gradle :app:assembleDebug PASSOU; assinatura APK DEBUG verificada; git diff --check PASSOU.
- APK local homologado: android/app/build/outputs/apk/debug/app-debug.apk; SHA-256 5DBCDFA716F8A369448AA89C0D3C4FEF5692B0B8A6D9F290B1C5DCDD05EC9D40.
- Limites: sem tablet/emulador conectado; login visual não foi aberto para preservar credenciais/sessão. Os fluxos de autenticação passaram nos testes executáveis. O bundle não contém o texto “Como atualizar o APK”.
- Próxima etapa: revisar o conteúdo da PR Draft. APK Release só deve ser gerado após essa revisão, usando o fluxo oficial e sem expor a chave de assinatura.