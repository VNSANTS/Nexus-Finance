# Preparação do Nexus Finance para o Google Play

Este documento registra o que foi verificado no repositório e o que ainda precisa ser concluído. **Não significa que o aplicativo já esteja pronto para publicação.**

## Estado confirmado no repositório

- [x] Identificador Android definido: `com.nexusfinance.app`.
- [x] Versão inicial definida: `versionCode 1` / `versionName 1.0`.
- [x] `targetSdkVersion` configurado como API 36 no projeto (confirmar o valor efetivo em `android/variables.gradle` antes do release).
- [x] A aplicação tem opção de exclusão da própria conta dentro do perfil.
- [x] O README descreve o projeto, o ambiente e pontos de atenção.
- [ ] O workflow atual `.github/workflows/build-apk.yml` gera um **APK debug**, não um Android App Bundle de lançamento assinado.
- [ ] Não foi localizada uma política de privacidade publicada e pronta para vincular no Play Console.
- [ ] Não foi localizada uma página externa funcional para solicitar exclusão de conta.
- [ ] O processo de exclusão precisa ser validado com uma conta de teste, incluindo todos os dados associados e a resposta do backend.
- [ ] O aplicativo Android usa `server.url` apontando para o GitHub Pages. Isso faz o app depender do site remoto e permite que alterações do site mudem a experiência instalada sem nova versão da loja. Avaliar antes do lançamento se isso é intencional e se o app mantém uma experiência estável quando o site fica indisponível.
- [ ] Não foi validado neste documento um build de release em dispositivo real, nem uma submissão ao Play Console.

## Antes de enviar o primeiro lançamento

### 1. Privacidade, dados e exclusão

- [ ] Auditar quais dados o app coleta, cria, salva localmente ou envia ao Supabase e a outros provedores.
- [ ] Publicar uma política de privacidade acessível sem login, com nome do app, contato válido, dados tratados, finalidades, compartilhamentos, retenção, segurança e instruções de exclusão.
- [ ] Implementar uma página web externa que permita iniciar um pedido de exclusão sem precisar reinstalar ou abrir o app.
- [ ] Confirmar que a exclusão remove os dados pessoais associados, incluindo dados em tabelas próprias e serviços de terceiros quando aplicável; documentar exceções legítimas de retenção.
- [ ] Preencher com precisão a seção **Segurança dos dados** e as perguntas de exclusão no Play Console. As respostas devem refletir o comportamento real, não apenas a intenção.
- [ ] Testar login por e-mail, recuperação de senha e cada provedor OAuth habilitado em build Android de release.

### 2. Build Android de lançamento

- [ ] Decidir se o app deve carregar o site remoto ou empacotar os arquivos web localmente. Se continuar usando `server.url`, testar inicialização, indisponibilidade de rede, OAuth/deep links e atualizações remotas.
- [ ] Gerar um Android App Bundle (`.aab`) de release, assinado com uma chave de lançamento segura.
- [ ] Não guardar keystores, senhas, tokens de serviço ou chaves privadas no Git. Usar armazenamento seguro e secrets do CI quando necessário.
- [ ] Incrementar `versionCode` em cada versão publicada.
- [ ] Instalar e testar o release em pelo menos um aparelho Android real, além de testar fluxos principais, telas pequenas, navegação, teclado, conexões lentas e falhas de rede.
- [ ] Verificar logs e corrigir crashes, falhas de autenticação, permissões desnecessárias e problemas de acessibilidade.

### 3. Página da loja e revisão

- [ ] Definir nome público final, descrição curta e completa, ícone de alta resolução, capturas de tela reais e categoria.
- [ ] Definir e-mail de suporte que será monitorado e publicá-lo na ficha do app.
- [ ] Concluir classificação indicativa, público-alvo, anúncios, acesso ao app para revisão e demais declarações do Play Console.
- [ ] Declarar com precisão funcionalidades de IA e conteúdo financeiro. Deixar claro que o conteúdo é educativo e não constitui recomendação individual de investimento.
- [ ] Conferir as políticas vigentes do Google Play no momento do envio.

### 4. Testes e acesso à produção

- [ ] Para contas pessoais criadas após 13/11/2023, planejar o teste fechado exigido pelo Google Play: no mínimo 12 testadores inscritos continuamente por 14 dias antes de solicitar acesso à produção.
- [ ] Fazer verificação de acesso a um dispositivo Android conforme solicitado pelo Play Console.
- [ ] Resolver todos os avisos impeditivos do Play Console antes do envio final.

## Informações que ainda precisam ser definidas pelo responsável

- E-mail de suporte público válido.
- URL pública da política de privacidade.
- URL pública do pedido externo de exclusão de conta.
- Inventário definitivo de dados e serviços integrados, para completar as declarações de privacidade.
- Decisão final sobre o carregamento remoto do GitHub Pages versus conteúdo web empacotado.
- Chave de assinatura de lançamento, guardada fora do repositório.

## Fontes oficiais consultadas

- Requisitos de nível de API: https://support.google.com/googleplay/android-developer/answer/11926878
- Testes para novas contas pessoais: https://support.google.com/googleplay/android-developer/answer/14151465
- Política de dados e exclusão de conta: https://support.google.com/googleplay/android-developer/answer/10144311
- Preparar e publicar uma versão: https://support.google.com/googleplay/android-developer/answer/9859348
- Requisitos para criar conta Play Console: https://support.google.com/googleplay/android-developer/answer/6112435

Revise as fontes novamente antes do lançamento, pois as políticas podem mudar.
