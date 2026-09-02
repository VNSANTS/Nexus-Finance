# Atualização — Segurança (Gestão Financeira → Mais)

## O que mudou

O item "Segurança" no menu **Mais** existia só como placeholder ("em breve").
Esta atualização implementa a tela de verdade, com a única proteção que dá
pra construir de verdade hoje, sem servidor: **bloqueio por PIN**.

### O que a tela faz

- **Ativar PIN**: escolhe 4 ou 6 dígitos, digita duas vezes pra confirmar.
- **Alterar PIN**: pede o PIN atual antes de deixar trocar.
- **Desativar PIN**: também pede o PIN atual antes.
- **Bloquear ao abrir o app**: pede o PIN toda vez que a Gestão Financeira
  carrega do zero (padrão: ligado).
- **Bloquear ao voltar de outro app**: pede o PIN de novo ao voltar de outra
  aba/app, com uma tolerância configurável (Imediato / 1 min / 5 min / 15
  min) — padrão: ligado, imediato.
- **Esqueci meu PIN**: na própria tela de bloqueio, remove a trava sem
  apagar nenhum dado financeiro (não existe recuperação por e-mail/SMS —
  não há servidor nem conta).

Quando o PIN está ativo, a Gestão Financeira inteira fica coberta por uma
tela de bloqueio (`GfBloqueioOverlay`) até a pessoa acertar o código. Depois
de 5 tentativas erradas seguidas, o teclado fica desabilitado por 30
segundos.

### Como o PIN é guardado

**Nunca em texto puro.** Cada PIN vira um hash (PBKDF2-SHA256, 100 mil
iterações, salt aleatório de 16 bytes) via Web Crypto API nativa do
navegador — **nenhuma biblioteca nova foi adicionada ao projeto**. Ver
comentário completo em `seguranca.ts`.

### Biometria e "Sessões"

O item do menu "Mais" já dizia "PIN, biometria, sessões" — a tela cobre os
três, mas de forma honesta:

- **Biometria**: documentado como não implementado, com o porquê (WebAuthn
  foi pensado pra funcionar com servidor validando a chave; sem servidor,
  usar isso direito enfraqueceria a proteção em vez de reforçar).
- **Sessões e dispositivos**: documentado que não existe esse conceito aqui
  — a Gestão Financeira é local a cada aparelho (mesma decisão já
  documentada em Privacidade → "Onde seus dados ficam"), então não há uma
  lista de sessões pra encerrar.

## Arquivos modificados/criados (8)

Novos:
- `src/gestao-financeira/seguranca.ts` — hash/verificação de PIN (Web
  Crypto), constantes de configuração padrão
- `src/gestao-financeira/components/GfTecladoPin.tsx` — teclado numérico
  reutilizável (usado no bloqueio e nos fluxos de ativar/alterar/desativar)
- `src/gestao-financeira/components/GfBloqueioOverlay.tsx` — a tela de
  bloqueio de verdade (cobre o app até acertar o PIN)
- `src/gestao-financeira/pages/GfSegurancaPage.tsx` — a tela de
  configuração em si

Modificados:
- `src/gestao-financeira/types.ts` — tipos `PreferenciasSeguranca`,
  `TamanhoPin`, `TempoAutoBloqueio`; campo `preferenciasSeguranca` no estado
- `src/gestao-financeira/GestaoFinanceiraContext.tsx` — estado inicial com
  PIN desativado por padrão; ação/reducer
  `DEFINIR_PREFERENCIAS_SEGURANCA`; `LIMPAR_TODOS_DADOS` preserva as
  preferências de segurança (mesma lógica já usada pras outras
  preferências — PIN não é dado financeiro)
- `src/gestao-financeira/GestaoFinanceiraShell.tsx` — rota
  `/gestao-financeira/seguranca`; monta `<GfBloqueioOverlay />` (sempre
  presente, decide sozinho quando aparecer)
- `src/gestao-financeira/pages/GfMaisPage.tsx` — o item "Segurança" agora
  navega pra tela em vez de ficar desabilitado

Todos já existiam no projeto (exceto os 4 novos) — é só substituir pelo
conteúdo deste zip (mesmo caminho, mesmo nome) e criar os novos nos
caminhos indicados.

## ⚠️ O que fica de fora por decisão (não é bug)

- **PIN não é criptografia dos dados.** É uma trava de acesso à TELA, igual
  ao "véu visual" que já existia em Privacidade → "Ocultar ao trocar de
  app", só que agora pedindo um código de verdade em vez de só um toque.
  Os lançamentos, contas, cartões, dívidas e metas continuam salvos como
  sempre estiveram no localStorage (texto normal, sem cifra) — alguém com
  acesso ao aparelho e ao DevTools consegue ler os dados direto, PIN ou
  não. Isso já era assim antes desta tela existir; ela não piora nem
  resolve esse ponto, só documenta com clareza.
- **Esta tela ainda não verifica permissão de Família e perfis.** Qualquer
  perfil pode ativar, alterar ou desativar o PIN por enquanto —
  `permissoes.gerenciarMembros` já existe (`permissoes.ts`) e dá pra usar
  aqui quando fizer sentido gatear isso, mesmo padrão da pendência já
  documentada na entrega anterior de Família e perfis.
- **Biometria de verdade não foi implementada** — ver explicação na
  própria tela e no README-ATUALIZACAO.md da seção acima. Não é um switch
  fingindo que funciona.
- **"Sessões" não existe como conceito aqui** — é local a cada aparelho,
  documentado na própria tela.

## Como aplicar

1. No GitHub, para os arquivos **modificados**: abra, edite (ícone de
   lápis), apague o conteúdo e cole o conteúdo do arquivo correspondente
   deste zip.
2. Para os arquivos **novos**: crie o arquivo no caminho indicado (botão
   "Add file" → "Create new file", cole o caminho completo) e cole o
   conteúdo.
3. Commit direto na branch `main` (ou um PR, como preferir).
4. O GitHub Actions builda com `npm install` — não precisa mexer no
   `deploy.yml`.

## ⚠️ Verificação NÃO concluída nesta sessão

Sem acesso à internet nesta sessão (ambiente sem rede — `npm install` deu
403), não rodei `tsc --noEmit` / `npm run build` reais. O que fiz pra
compensar:

1. **Checagem de sintaxe real** (não só olho nu): rodei o parser do esbuild
   (já disponível no ambiente via uma dependência de outra ferramenta)
   contra os 8 arquivos tocados — todos passaram sem erro de sintaxe/JSX.
2. Revisei manualmente, cruzando cada arquivo: todo campo novo usado
   (`pinAtivo`, `pinHash`, `pinSalt`, `pinTamanho`, `bloquearAoAbrirApp`,
   `bloquearAoTrocarDeApp`, `tempoAutoBloqueio`) existe em
   `PreferenciasSeguranca` (`types.ts`); toda função importada de
   `seguranca.ts` (`criarHashPin`, `verificarPin`, `OPCOES_TAMANHO_PIN`,
   `OPCOES_TEMPO_AUTO_BLOQUEIO`) é de fato exportada de lá; os pontos de
   `pinHash`/`pinSalt` que podem ser `null` (`strict: true` no
   `tsconfig.json`) são checados com `if (!x) return` antes de usar, no
   mesmo bloco síncrono, pra o TypeScript conseguir estreitar o tipo.
3. Não consegui montar um `tsc` completo (faltam `@types/react` e as
   libs do projeto — `react-router-dom`, `framer-motion`, `lucide-react`
   — instaladas só via `npm install`, que não rodou).

**Se você é a próxima sessão com internet: rode a verificação de 3 passos
ANTES de continuar pra qualquer pendência nova.** Se aparecer erro de tipo,
é mais provável em:
- Nomes de ícones do `lucide-react` usados pela primeira vez nesta entrega
  (`Fingerprint`, `KeyRound`, `Laptop`, `Delete`) — não pude confirmar
  contra a lista real de exports da versão instalada no projeto sem rede.
- Alguma diferença de tipagem do React 18 (o projeto usa `^18.3.1`) que
  meu ambiente offline não tinha como testar (não há `@types/react`
  instalado aqui fora do projeto).

```bash
rm -rf node_modules
npm install
./node_modules/.bin/tsc --noEmit
npm run build
```

## Teste manual sugerido

1. Vá em Mais → Segurança. Deve aparecer "Bloqueio por PIN" desativado.
2. Toque em "Ativar PIN", escolha 4 dígitos, digite um PIN, confirme
   digitando de novo. Deve aparecer "PIN ativado."
3. Saia da Gestão Financeira e volte (ou recarregue a página) — deve
   aparecer a tela de bloqueio pedindo o PIN.
4. Digite o PIN errado 5 vezes seguidas — o teclado deve travar por 30s.
5. Digite o PIN certo — deve desbloquear e voltar pra Home normalmente.
6. Em Segurança, toque em "Alterar PIN" — deve pedir o PIN atual antes de
   deixar definir um novo.
7. Toque em "Desativar PIN" — deve pedir o PIN atual e, depois, "Bloqueio
   por PIN" deve voltar a mostrar "Ativar PIN".
8. Ative o PIN de novo e, na tela de bloqueio, toque em "Esqueci meu PIN" →
   "Remover PIN" — deve desbloquear sem pedir nada e sem apagar nenhum
   lançamento/conta/meta.
