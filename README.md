# Nexus Finance

**Aprenda sobre finanças, explore o mercado e pratique decisões financeiras em um só lugar.**

O **Nexus Finance** é um aplicativo de educação financeira que combina trilhas de aprendizagem, ferramentas interativas e recursos de acompanhamento de progresso. O projeto busca tornar conceitos financeiros mais acessíveis por meio de uma experiência visual, prática e gamificada.

- **Aplicação web (Vercel):** https://nexus-finance-ten-kappa.vercel.app/
- **GitHub Actions (builds, verificações e deploy):** https://github.com/VNSANTS/Nexus-Finance/actions
- **Repositório:** https://github.com/VNSANTS/Nexus-Finance
- **Status:** projeto em evolução; a publicação na Google Play ainda depende da preparação e aprovação da ficha e do pacote de lançamento.

## Conteúdo

- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Executar localmente](#executar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Publicação e versão Android](#publicação-e-versão-android)
- [Segurança e privacidade](#segurança-e-privacidade)
- [Aviso importante](#aviso-importante)
- [Contribuição e contato](#contribuição-e-contato)

## Recursos

### Aprendizagem
- Trilhas e módulos de educação financeira.
- Revisão de conteúdo, glossário e biblioteca.
- Busca, desafios e quizzes para praticar conceitos.
- Progresso, experiência (XP), níveis, sequências e conquistas.

### Ferramentas financeiras
- Recursos para explorar o mercado e conceitos de investimento.
- Simulações e ferramentas educativas.
- Área de investidor e seção de gestão financeira.
- Nexus AI e recursos auxiliares, sujeitos à disponibilidade dos serviços conectados.

> A disponibilidade de dados de mercado e de integrações externas pode depender de serviços de terceiros, limites de uso e configuração de chaves.

### Perfil e progresso
- Perfil personalizável.
- Sincronização de progresso com conta autenticada, quando disponível.
- Exportação de um resumo de progresso.
- Controles de conta, incluindo saída e solicitação de exclusão da própria conta.

## Tecnologias

- **React** e **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Capacitor** para integração Android
- **Supabase** para autenticação, banco de dados e funções de backend
- **Vercel** para a aplicação web em produção; **GitHub Pages** também está configurado para publicação
- **GitHub Actions** para builds, verificações, análise CodeQL e deploy: [ver execuções](https://github.com/VNSANTS/Nexus-Finance/actions)

## Executar localmente

### Pré-requisitos

- Node.js 22 (recomendado para acompanhar o workflow de build)
- npm
- Acesso ao projeto Supabase e às chaves públicas necessárias para o frontend

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/VNSANTS/Nexus-Finance.git
   cd Nexus-Finance
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz, usando `.env.example` como referência, e configure as variáveis necessárias.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

### Verificações de build

Para executar a verificação TypeScript e gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente o build:

```bash
npm run preview
```

## Variáveis de ambiente

O frontend utiliza as seguintes variáveis:

| Variável | Obrigatória | Finalidade |
|---|---|---|
| `VITE_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Sim | Chave publicável do Supabase para o cliente frontend |
| `VITE_WHATSAPP_NUMERO_BOT` | Não | Número exibido para a integração de WhatsApp, se configurada |
| `VITE_MARKETAUX_KEY` | Não | Chave do Marketaux para recursos de notícias, se habilitados |

Use `.env.example` como modelo. **Nunca coloque chaves secretas ou `service_role` no frontend, em variáveis `VITE_*` ou em arquivos versionados.** A chave publicável pode estar no frontend; o controle de acesso aos dados deve ser aplicado com políticas RLS e funções de backend adequadas.

No GitHub Actions, configure os segredos/variáveis de build exigidos pelos workflows do repositório. As variáveis opcionais só devem ser adicionadas quando a integração correspondente estiver configurada.

## Publicação e versão Android

A versão web usada pelo aplicativo Android está hospedada na [Vercel](https://nexus-finance-ten-kappa.vercel.app/). Os builds, verificações e execuções de deploy podem ser acompanhados em [GitHub Actions](https://github.com/VNSANTS/Nexus-Finance/actions). O repositório também mantém um fluxo de publicação no GitHub Pages e contém um workflow para gerar um APK Android de depuração.

**Importante:** o workflow existente gera um **APK de debug**, que serve para testes e não é o pacote de lançamento recomendado para a Google Play. Antes da publicação oficial, gere e valide um **Android App Bundle (AAB) assinado para release**, configure a assinatura de forma segura e teste o pacote em dispositivos reais.

O projeto usa Capacitor com uma URL remota para carregar a aplicação web. Isso significa que o aplicativo Android depende da disponibilidade do site e de conectividade para carregar a versão inicial; mudanças no site também podem aparecer no app instalado sem uma atualização da loja. Avalie cuidadosamente esse comportamento e as políticas atuais da Google Play antes do lançamento.

### Checklist para a Google Play

Checklist detalhado de preparação e pendências: [docs/GOOGLE_PLAY_PREPARACAO.md](docs/GOOGLE_PLAY_PREPARACAO.md).


- [ ] Criar a conta de desenvolvedor Google Play e concluir as verificações exigidas.
- [ ] Confirmar o nome público, ícone, capturas de tela, descrição curta e descrição completa.
- [ ] Publicar uma política de privacidade acessível por URL e coerente com os dados realmente coletados.
- [ ] Preencher a seção **Segurança dos dados** e o questionário de classificação indicativa com informações verdadeiras.
- [ ] Declarar corretamente anúncios, compras, dados financeiros e integrações de terceiros, quando aplicável.
- [ ] Implementar e validar o fluxo de exclusão de conta e de dados, inclusive os requisitos aplicáveis da Google Play.
- [ ] Confirmar os requisitos vigentes de nível de API alvo, assinatura e formato AAB.
- [ ] Configurar a assinatura de release sem armazenar keystore ou senhas no Git.
- [ ] Testar login, redefinição de senha, links de retorno OAuth, navegação, modo offline, permissões e exclusão de conta em Android.
- [ ] Fazer testes internos/fechados e cumprir eventuais exigências de teste para contas pessoais novas.
- [ ] Revisar todos os avisos do Play Console e só então enviar para análise.

Os requisitos da Google Play mudam. Confirme as regras atuais no [Centro de Ajuda do Play Console](https://support.google.com/googleplay/android-developer/) antes de enviar o app.

## Segurança e privacidade

O projeto utiliza Supabase. A chave publicável do frontend não substitui controles de segurança: tabelas com dados de usuários devem ter políticas de **Row Level Security (RLS)** adequadas, e operações privilegiadas devem ocorrer no backend com autorização apropriada.

Antes do lançamento:
- Revise as políticas RLS, permissões e funções SQL.
- Não exponha chaves secretas, tokens, credenciais ou dados pessoais em commits, logs ou screenshots.
- Confirme as configurações de autenticação, URLs de redirecionamento e e-mails de recuperação.
- Documente quais dados são coletados, por quê, com quem são compartilhados e como solicitar exclusão.
- Teste a exclusão da conta e verifique o que acontece com dados associados e serviços de terceiros.

A existência de configurações de segurança no repositório não constitui, por si só, certificação ou garantia de segurança do aplicativo.

## Aviso importante

O Nexus Finance tem finalidade **educacional e informativa**. O conteúdo e as simulações não constituem recomendação personalizada de investimento, consultoria financeira, oferta de ativos ou garantia de rentabilidade. Decisões financeiras devem considerar a situação individual e fontes confiáveis.

Dados, cotações, notícias e funcionalidades conectadas podem sofrer atrasos, indisponibilidade ou limitações de terceiros.

## Contribuição e contato

Este repositório é o ponto de partida para acompanhar o projeto, reportar problemas e propor melhorias. Ao abrir uma issue, descreva o problema, os passos para reproduzi-lo e o comportamento esperado; não inclua senhas, tokens, informações financeiras privadas ou outros dados sensíveis.

---

Desenvolvido como um projeto de educação financeira.