# Gerar o AAB assinado do Nexus Finance

O workflow `.github/workflows/release-aab.yml` gera um Android App Bundle de release assinado. Ele não pode produzir o pacote até que os secrets necessários sejam configurados pelo responsável do repositório.

## 1. Criar e guardar a chave de assinatura

Faça isso em um computador confiável com JDK instalado. Escolha uma senha forte e guarde uma cópia segura da keystore e das senhas. **Se perder a chave, poderá ter problemas para atualizar o app publicado. Nunca envie a keystore ao GitHub como arquivo normal, nem a comite no repositório.**

Exemplo de criação (guarde os valores escolhidos em local seguro):

```bash
keytool -genkeypair -v -keystore nexus-finance-release.jks -alias nexus-finance -keyalg RSA -keysize 2048 -validity 10000
```

## 2. Converter a keystore para Base64

No PowerShell do Windows, na pasta onde está a keystore:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes(".\nexus-finance-release.jks")) | Set-Clipboard
```

Cole o conteúdo copiado diretamente no secret do GitHub; não o publique em issues, commits ou mensagens.

## 3. Criar os secrets no GitHub

Abra o repositório → **Settings → Secrets and variables → Actions → New repository secret** e crie:

- `ANDROID_KEYSTORE_BASE64`: keystore codificada em Base64.
- `ANDROID_KEYSTORE_PASSWORD`: senha da keystore.
- `ANDROID_KEY_ALIAS`: alias usado na criação (no exemplo, `nexus-finance`).
- `ANDROID_KEY_PASSWORD`: senha da chave.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: chave publishable usada pelo build. Use o valor atual do projeto Supabase; nunca use `service_role` ou outra chave secreta no frontend.

A URL do Supabase está definida no workflow. Se o projeto ou a chave mudar, atualize a configuração com cuidado.

## 4. Executar o workflow

Vá para **Actions → Android Release AAB → Run workflow**. Se tudo estiver configurado, o workflow compilará o projeto e publicará o artefato `nexus-finance-release-aab` na execução. Baixe o arquivo `app-release.aab` nos artifacts da execução e mantenha-o privado.

O workflow não envia o app automaticamente à Google Play. Antes disso, instale e teste o app, confira autenticação/OAuth, exclusão de conta, funcionamento offline e a página de privacidade. Para cada nova versão, aumente o `versionCode` em `android/app/build.gradle`.

## 5. Verificações obrigatórias

- Confirme que o arquivo AAB foi gerado e assinado.
- Teste em aparelho Android real e pela faixa de teste interno do Play Console.
- Confirme a URL da política de privacidade e substitua o marcador de e-mail antes de publicar.
- Não compartilhe a keystore ou senhas com testadores.
