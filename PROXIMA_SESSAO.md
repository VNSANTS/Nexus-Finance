# Handoff — Personalização (AMOLED + fundo custom) — trabalho dividido em 4 sessões paralelas

O Vinícius pediu: modo AMOLED, e fundo do app configurável (sólido/
degradê/imagem) com color picker completo (presets rápidos + avançado
RGB/hex/matiz). Decisão dele: **migrar toda a "Personalização" (o que
hoje é `BlocoAparencia` dentro de Configurações Gerais) para uma tela
própria `/personalizacao`, acessível tanto do app principal quanto da
Gestão Financeira** — já que `ThemeProvider` é global (montado em
`main.tsx`, fora de tudo), isso é só uma questão de rota + dois pontos
de entrada, não precisa duplicar nada.

Está dividido em 4 partes que podem rodar em paralelo, em sessões Claude
diferentes. Se você é uma dessas sessões, **leia a sua parte e as
"Decisões já tomadas" antes de começar.** Ao terminar, marque sua parte
como `[FEITO]` neste arquivo e descreva o que mudou, do jeito que a
Sessão A fez abaixo — as outras sessões dependem de saber o que já
existe.

## Sessão A — Hook de tema (`useTheme.tsx`) — **[FEITO]**

Expandido `PreferenciasTema` em `src/hooks/useTheme.tsx` com:

```ts
amoledAtivo: boolean
tipoFundo: 'solido' | 'degrade' | 'imagem'
corFundoSolido: string          // hex
degradeFundo: { de: string; para: string; anguloGraus: number }
imagemFundoUrl: string | null   // data URL base64
imagemFundoOpacidade: number    // 0–100
```

Padrões: `amoledAtivo: false`, `tipoFundo: 'solido'`, `corFundoSolido:
'#0A0E1A'`, `degradeFundo: { de: '#0B1220', para: '#0A0E1A', anguloGraus:
135 }`, `imagemFundoUrl: null`, `imagemFundoOpacidade: 40`.

Setters novos no context (todos seguem o padrão `useCallback` já
existente): `definirAmoledAtivo`, `definirTipoFundo`,
`definirCorFundoSolido`, `definirDegradeFundo` (aceita `Partial<DegradeFundo>`,
faz merge com o degradê atual — não precisa passar objeto completo),
`definirImagemFundoUrl`, `definirImagemFundoOpacidade` (já clampa 0–100).

**Regra de negócio importante:** `amoledEfetivo` (exposto no context,
`amoledAtivo && temaResolvido === 'escuro'`) — AMOLED só tem efeito
visual com tema escuro resolvido; em tema claro a preferência fica salva
mas não faz nada. **AMOLED sobrepõe qualquer fundo custom** (sólido/
degradê/imagem) quando ativo — é preto puro (`#000000`), sem mistura, de
propósito (é o ponto do modo AMOLED: pixels realmente desligados em tela
OLED). A UI de Personalização deve deixar isso claro (ex: desabilitar
visualmente as opções de fundo custom, ou avisar, quando AMOLED estiver
ligado).

**CSS variables novas, setadas pelo `ThemeProvider` no `<html>`:**
- `--bg-fundo-app`: cor sólida ou `linear-gradient(...)` já pronto,
  dependendo do `tipoFundo` (o hook decide qual, o CSS só consome).
- `--bg-imagem-url`: `url(...)` ou `none`.
- `--bg-imagem-opacidade`: 0–1.
- Classe `.amoled-ativo` no `<html>` quando `amoledEfetivo`.
- Classe `.fundo-tipo-imagem` no `<html>` quando `tipoFundo === 'imagem'`
  E existe `imagemFundoUrl` E AMOLED não está sobrepondo.

**`globals.css` já tem o fio mínimo ligado** (só isso, não é a tela
ainda): `body` usa `background: var(--bg-fundo-app)`, e
`.fundo-tipo-imagem body::before`/`::after` desenham a camada de imagem +
overlay de legibilidade (reusa `--cor-overlay-leve`, que já existe e já
respeita claro/escuro).

**⚠️ Isso que a Sessão B/D PRECISA saber:** o wrapper em `App.tsx` (`<div
className="max-w-[480px] mx-auto min-h-dvh relative bg-bg">`) usa a
classe Tailwind `bg-bg`, que resolve pra `var(--cor-bg)` — **não**
`var(--bg-fundo-app)`. Isso significa que hoje, mesmo com o fio de CSS
pronto, o fundo custom **não aparece visualmente ainda**, porque
`bg-bg` (opaco) do wrapper cobre o `body` por cima. Quem for ligar a UI
de verdade (Sessão B ou D) precisa trocar essa classe no wrapper — por
exemplo remover `bg-bg` dali e deixar só o `body` prover o fundo, ou
trocar por algo transparente — e testar que nenhuma tela fica com texto
sobre fundo errado por causa disso (cards continuam usando `--cor-bg-card`
normalmente, que não foi tocado).

`carregar()` (leitura do localStorage) recebeu merge especial pra
`degradeFundo`: como é objeto aninhado, um merge raso comum deixaria
campos faltando como `undefined` se alguém carregasse uma versão salva
antes de `anguloGraus` existir. Corrigido pra merge dedicado desse campo
especificamente. Os campos novos simples (não aninhados) não precisam
disso — o merge raso do resto do objeto já resolve.

**Verificação rodada (os 3 passos, com internet disponível nesta
sessão):** `npm install` limpo, `./node_modules/.bin/tsc --noEmit` (zero
erros), `npm run build` (passou). Testado só a nível de tipo/build — não
validei visualmente ainda porque não existe UI que exponha esses campos
(é exatamente o trabalho das Sessões B/C/D).

## Sessão B — Nova página `PersonalizacaoPage.tsx` + rota — **[FEITO]**

Criado `src/pages/PersonalizacaoPage.tsx` e registrada a rota `/personalizacao`
em `src/App.tsx` (fora de `/gestao-financeira/*`, nível raiz, lazy-loaded
igual às outras telas). Dois pontos de entrada ligados: `PerfilPage.tsx`
(novo `ConfigRow` "Personalização", ícone `Palette`, logo abaixo de
"Notificações") e `GfConfiguracoesGeraisPage.tsx` (card no topo da lista,
antes de "Idioma e moeda", que navega direto pra `/personalizacao` em vez
de abrir um accordion).

**O que a tela cobre hoje:**
- Bloco "Aparência" migrado 1:1 de `BlocoAparencia` (Tema, Cor principal,
  Tamanho da fonte, Densidade, Animações) — mesmo comportamento de antes,
  só que numa tela própria em vez de accordion dentro de Configurações
  gerais.
- Toggle "Modo AMOLED" (`amoledAtivo`/`definirAmoledAtivo`). Decisão: **não
  desabilitei** o toggle quando o tema não é escuro (a pessoa pode querer
  deixar pré-configurado antes de trocar de tema) — em vez disso, mostro um
  aviso amarelo quando `amoledAtivo && temaResolvido !== 'escuro'`,
  explicando que está salvo mas inerte. O doc da Sessão A permitia as duas
  abordagens ("desabilitado OU com aviso").
- Seletor de tipo de fundo (Sólido / Degradê / Imagem) ligado em
  `tipoFundo`/`definirTipoFundo`, com o bloco condicional certo:
  - **Sólido**: um color picker.
  - **Degradê**: dois color pickers ("De"/"Para") + slider de ângulo
    (0–360°) + preview ao vivo do gradiente.
  - **Imagem**: placeholder explicando que o upload chega em outra sessão
    (não fingi que tem upload funcionando).
- Todo o bloco de fundo fica visualmente desabilitado
  (`opacity-50 pointer-events-none`) quando `amoledEfetivo` é true, com nota
  explicando que é preciso desligar o AMOLED pra usar o fundo custom — não
  reabre a discussão de que AMOLED sobrepõe fundo, só deixa isso visível.
- Botão "Restaurar aparência padrão" (`tema.restaurarPadroes()`), migrado
  do lugar antigo. **Atenção pra próxima sessão que mexer nisso**:
  `restaurarPadroes()` reseta o objeto `PreferenciasTema` inteiro (inclusive
  Acessibilidade), não só a parte de Personalização — esse é o comportamento
  que já existia antes desta sessão (não foi introduzido agora), só migrei
  o botão. Não resolvi esse escopo maior porque não estava no pedido da
  Sessão B; fica registrado aqui caso o Vinícius ache o nome do botão
  enganoso.

**Color picker temporário:** como a Sessão C (`SeletorCor.tsx`, presets +
avançado saturação/matiz/RGB) ainda não tinha entregado nada quando rodei,
implementei um `SeletorCorBasico` local dentro do próprio
`PersonalizacaoPage.tsx` (`<input type="color">` nativo + campo hex
editável), com a **mesma assinatura de props planejada pro componente da
Sessão C** (`valor: string`, `onChange: (hex: string) => void`). Quando a
Sessão C entregar `src/components/SeletorCor.tsx`, trocar é só mudar o
import e apagar o `SeletorCorBasico` local — não deve exigir mudança de
lógica no resto da tela. Os 3 usos (`corFundoSolido`, `degradeFundo.de`,
`degradeFundo.para`) já estão isolados nesse componente.

**Não mexi** no wrapper de `App.tsx` (`bg-bg` cobrindo o fundo custom) —
isso é explicitamente escopo da Sessão D, documentado abaixo. A tela de
Personalização já lê/escreve os campos certos do `useTheme()`, mas o fundo
custom (sólido/degradê) **ainda não aparece visualmente no app** até a
Sessão D resolver isso — testei só que os controles atualizam o estado e
persistem (via `localStorage`), não a aparência final.

**Limpeza dos dois pontos pendentes (já feita nesta sessão, não sobrou pra
Sessão D):**
1. `GfConfiguracoesGeraisPage.tsx`: removida a seção "Aparência" inteira
   (`BlocoAparencia`, `OpcaoTema`, o botão "Restaurar aparência padrão" e o
   `useTheme()` que só existiam por causa dela). `LinhaSwitch` também saiu
   do arquivo — só era usada dentro de `BlocoAparencia`, ficou sem uso
   depois da remoção (`ChipOpcao` continua lá, ainda usado por
   Idioma/Moeda/Período). `secaoAberta` perdeu a opção `'aparencia'`
   (default agora é `'idioma-moeda'`).
2. Ponto de entrada no app principal confirmado e criado: era mesmo
   `PerfilPage.tsx` (seção "Configurações", ao lado de "Notificações").

**Verificação:** sandbox desta sessão **sem acesso à internet** (mesmo
erro 403 de npm registry das sessões anteriores) — não rodei os 3 passos
oficiais (`npm install` / `tsc --noEmit` / `npm run build`). Fiz checagem
manual: balanceamento de parênteses/chaves/colchetes nos 4 arquivos
tocados (`PersonalizacaoPage.tsx`, `GfConfiguracoesGeraisPage.tsx`,
`App.tsx`, `PerfilPage.tsx`), grep confirmando zero sobra de referências a
`BlocoAparencia`/`OpcaoTema`/`useTheme`/`motion`/ícones removidos em
`GfConfiguracoesGeraisPage.tsx`, e conferência visual de que todo campo
desestruturado de `useTheme()` em `PersonalizacaoPage.tsx` existe de fato
no context (comparado direto com `useTheme.tsx` da Sessão A). **Isso não
substitui o build de verdade — próxima sessão com internet, rodar os 3
passos antes de continuar.**

---

<!-- Texto original do pedido da Sessão B, mantido como referência do que foi pedido: -->

Criar `src/pages/PersonalizacaoPage.tsx`. Migrar o conteúdo de
`BlocoAparencia` (dentro de
`src/gestao-financeira/pages/GfConfiguracoesGeraisPage.tsx`, linhas
~154–223 do arquivo original) pra lá — Tema, Cor principal, Tamanho da
fonte, Densidade, Animações — e **adicionar** os novos controles:
- Toggle "Modo AMOLED" (usa `amoledAtivo`/`definirAmoledAtivo`,
  desabilitado ou com aviso quando `temaResolvido !== 'escuro'` — ver
  regra de negócio na Sessão A acima).
- Seletor de tipo de fundo: Sólido / Degradê / Imagem (`tipoFundo`).
- Bloco condicional por tipo escolhido (sólido → color picker da Sessão
  C; degradê → dois color pickers + slider de ângulo; imagem → input de
  upload, ver Sessão D).

Registrar rota em `src/App.tsx`: `<Route path="/personalizacao"
element={<PersonalizacaoPage />} />` **fora** de `/gestao-financeira/*`
(fica no nível raiz, junto das outras — assim funciona dos dois lados
sem duplicar nada, já que o `ThemeProvider` é global).

**Depois de criar a página**, dois ajustes de limpeza (coordenar com
quem estiver na Sessão D pra não haver conflito de merge, já que os dois
mexem nos mesmos arquivos):
1. Em `GfConfiguracoesGeraisPage.tsx`: remover a seção "Aparência"
   inteira (o bloco `BlocoAparencia` e o botão "Restaurar aparência
   padrão" que só faz sentido junto dela) e trocar por um item que leva
   pra `/personalizacao` — o padrão visual já existe no próprio arquivo
   (`Secao`).
2. Achar (ou criar) o ponto de entrada equivalente no app principal —
   `src/pages/PerfilPage.tsx` é o candidato mais provável (não confirmado
   ainda, precisa checar o arquivo) — e adicionar lá também um link pra
   `/personalizacao`.

Reaproveitar os componentes já existentes no arquivo original
(`ChipOpcao`, `OpcaoTema`, `LinhaSwitch`) — ou movê-los pra um arquivo
compartilhado se `GfConfiguracoesGeraisPage.tsx` ainda precisar deles
depois da limpeza (`LinhaSwitch` e `ChipOpcao` continuam em uso lá, por
Idioma/Moeda/Período — não remover esses, só o bloco de Aparência).

## Sessão C — Color picker (presets + avançado) — **[FEITO]**

Criado `src/components/SeletorCor.tsx` (confirmado: fica em
`src/components/`, não dentro de `gestao-financeira/`, por ser
compartilhado com o app principal — como o próprio texto do pedido já
apontava como mais provável).

Mesma assinatura de props que a Sessão B já vinha usando no
`SeletorCorBasico` temporário — `label?: string`, `valor: string`,
`onChange: (hex: string) => void` — então a troca foi só isso mesmo:
trocado o import em `PersonalizacaoPage.tsx` (`SeletorCorBasico` →
`SeletorCor`, `@/components/SeletorCor`) nos 3 usos (`corFundoSolido`,
`degradeFundo.de`, `degradeFundo.para`) e apagada a função local. Nenhuma
mudança de lógica no resto da tela, como o doc da Sessão B previa.

**Duas camadas, como pedido:**
1. **Presets rápidos**: botão-swatch abre (inline, com animação de altura)
   uma grade de 18 tons escuros/neutros (paleta própria, não reusa
   `CORES_PRINCIPAIS` de `useTheme.tsx` — aquela é pensada pra accent/tons
   vivos, essa é pensada pra fundo). O preset atualmente selecionado mostra
   um ícone de check, com cor de contraste calculada por luminância (preto
   ou branco conforme o swatch).
2. **Avançado**: botão de ícone (`Sliders`) abre um modal bottom-sheet
   (mesmo padrão visual/animação de `GfFiltrosRelatorio.tsx`, reaproveitado)
   com quadrado de saturação/matiz + slider de matiz — via `react-colorful`
   (`HexColorPicker`), que já entrega os dois juntos numa peça só, exatamente
   como a imagem 2 do Vinícius — mais campo hex e 3 campos RGB (0–255), todos
   sincronizados entre si e com o preset/hex de fora.

**Biblioteca escolhida:** `react-colorful` (5.8.1, ~2.8kB) — não tinha
nenhuma no projeto ainda. Rede do sandbox desta sessão tinha acesso ao
registry (`npm view` funcionou), então adicionada como dependência normal
em vez de implementar o quadrado de saturação na mão. Não precisa de CSS
importado à parte (a lib injeta o próprio `<style>`); só adicionei um bloco
pequeno em `globals.css` (classe `.seletor-cor-avancado`) pra ajustar
tamanho/cantos arredondados e combinar com o resto do app — não mexe na
lógica de cor da lib.

**Verificação rodada (os 3 passos, com internet disponível nesta
sessão):** `rm -rf node_modules && npm install` limpo, `./node_modules/.bin/tsc
--noEmit` (zero erros), `npm run build` (passou, PWA precache gerado normal).
`SeletorCor` + `react-colorful` ficam dentro do chunk lazy de
`PersonalizacaoPage` (~23KB/~8KB gzip), não pesam no bundle inicial.

**Não mexi** no que é explicitamente escopo de outra sessão: upload de
imagem de fundo (Sessão D) e o ajuste do wrapper `bg-bg` em `App.tsx`
(também Sessão D) continuam como estavam.

Duas camadas, conforme pedido do Vinícius ("presets rápidos + avançado"):
1. **Presets rápidos**: grade de swatches (pode reusar a paleta de
   `CORES_PRINCIPAIS` de `useTheme.tsx` como ponto de partida, mas para
   cor de fundo provavelmente faz sentido ter uma paleta própria — cores
   escuras/neutras fazem mais sentido como fundo do que os tons vivos de
   `CORES_PRINCIPAIS`, que são pensados pra accent).
2. **Avançado**: botão/link que abre um modal com color picker completo
   — quadrado de saturação/luminosidade + slider de matiz (igual à
   imagem 2 que o Vinícius mandou) + campos RGB editáveis + campo hex
   editável, todos sincronizados entre si.

Props sugeridas: `valor: string` (hex), `onChange: (hex: string) =>
void`. Componente controlado, sem estado de tema embutido — quem usa
(Sessão B, no bloco de fundo sólido, e no "de"/"para" do degradê) decide
o que fazer com o hex.

Não existe biblioteca de color picker no `package.json` ainda — checar
se vale adicionar uma (ex: `react-colorful`, leve) ou implementar na mão
com um canvas/gradiente CSS. Verificar compatibilidade de rede do
sandbox antes de adicionar dependência nova (ver nota de rede no rodapé
deste doc).

## Sessão D — Fundo degradê/imagem + integração final — **[FEITO]**

**Antes de começar, checagem do estado real:** a UI de degradê (dois
`SeletorCor` "de"/"para" + slider de ângulo + preview ao vivo) **já
tinha sido entregue pela própria Sessão B** — o texto original desta
seção pedia isso, mas conferindo `PersonalizacaoPage.tsx` ela já estava
completa e funcional quando esta sessão rodou. Não mexi nela, só validei
que bate com o que a Sessão A/C definiram. O trabalho real que sobrava
era: upload de imagem de verdade e o ajuste do wrapper `bg-bg`.

**Upload de imagem de fundo** (`SeletorImagemFundo`, componente novo
dentro de `PersonalizacaoPage.tsx`):
- Input `type="file" accept="image/*"` oculto, disparado por um botão
  (estado vazio: área tracejada "Escolher imagem"; com imagem: preview +
  "Trocar imagem" + remover).
- Compressão via canvas em `src/utils/comprimirImagemFundo.ts` — **arquivo
  novo, não uma importação de `gestao-financeira/comprimirImagem.ts`**.
  Mesma técnica (`FileReader` → `Image` → canvas → `toDataURL('image/jpeg')`),
  mas parâmetros próprios (1080px/qualidade 0.75, fundo de tela cheia
  aguenta mais detalhe que uma foto de perfil pequena) e função separada
  porque a GF é isolada de propósito (decisão já registrada neste
  arquivo) — Personalização vive fora da GF e é usada pelo app principal
  também, então importar de dentro da GF criaria uma dependência na
  direção errada.
- **Limite de tamanho tratado, não só documentado**: se o `data:` URL
  resultante passar de ~3MB, tenta uma segunda compressão mais agressiva
  (qualidade 0.5); se ainda assim passar, rejeita com
  `ImagemFundoMuitoGrandeError` e a tela mostra um aviso vermelho pedindo
  uma foto com menos detalhe/resolução — não estoura silenciosamente o
  `localStorage`, como o doc da Sessão A/D original pedia pra evitar.
- Slider de opacidade (`imagemFundoOpacidade`/`definirImagemFundoOpacidade`,
  0–100) exibido só quando já existe uma imagem salva, com o mesmo padrão
  visual do slider de ângulo do degradê.
- Estado de carregamento (`Loader2` girando) durante a compressão, texto
  do botão muda pra "Processando imagem…".

**Resolvido o problema documentado pela Sessão A** (wrapper `bg-bg`
cobrindo o fundo custom): troquei `bg-bg` → `bg-transparent` nos dois
wrappers de `App.tsx` (onboarding e app principal). `body` já é quem
provê `--bg-fundo-app` (sólido/degradê/imagem, via `globals.css`), então
bastou parar de sobrepor isso com o `--cor-bg` opaco do wrapper. Deixei
comentário no próprio `App.tsx` explicando a mudança pra não ser
revertida sem contexto numa sessão futura.

**Checagem de que nada mais quebra por causa disso:** rodei
`grep -rn "bg-bg\b"` em todo `src/` antes de mexer — todo *outro* uso de
`bg-bg` no projeto é em modal/overlay/input/portal (`SeletorCor`,
`GfFiltrosRelatorio`, os bottom-sheets da GF, `GfPrivacyOverlay`,
`GfBloqueioOverlay`, inputs de busca/perfil etc.), que **devem** continuar
opacos com `--cor-bg` puro (tema, não fundo custom) — não toquei em
nenhum desses, só nos dois wrappers de nível raiz em `App.tsx`. Portais
(menu radial, modais) montam em cima da árvore via `createPortal` e não
são filhos desse wrapper, então não são afetados por ele de qualquer
forma — o `<html>`/`<body>` (onde `ThemeProvider` aplica as classes/vars)
é que cobre esses casos.

**Coordenação com a Sessão B**: os dois pontos de limpeza (remover
`BlocoAparencia` de `GfConfiguracoesGeraisPage.tsx`, achar/criar o link
equivalente no app principal) **já estavam feitos** pela própria Sessão
B quando esta sessão rodou — não sobrou nada aqui.

**Verificação rodada (os 3 passos, com internet disponível nesta
sessão):** `rm -rf node_modules && npm install` limpo, `./node_modules/.bin/tsc
--noEmit` (zero erros), `npm run build` (passou, PWA precache gerado
normal, `PersonalizacaoPage` ~27KB/~9KB gzip no chunk lazy). Validado
manualmente (leitura de código, não visual) que o fundo custom agora
realmente chega até o `body` sem nada opaco por cima na árvore principal.
**Não testado visualmente num navegador de verdade** (sandbox sem
ambiente gráfico) — recomendo abrir o app e conferir pelo menos Home,
uma tela dentro da GF e um modal/bottom-sheet com um fundo degradê ou
imagem ativo, pra confirmar que nenhuma tela ficou com texto ilegível.

Com isso, os 4 pedaços de "Personalização" (Sessões A/B/C/D) estão
todos **[FEITO]** — a feature como um todo (AMOLED, fundo sólido/degradê/
imagem, color picker completo) está implementada de ponta a ponta.

## Decisões já tomadas sobre Personalização (não reabrir sem necessidade)

- Fundo custom é **só o fundo geral do app**, não cards/superfícies —
  `--cor-bg-card` continua fixo por tema, não foi tocado.
- AMOLED sobrepõe fundo custom quando ligado (preto puro, sem mistura).
- AMOLED sem efeito em tema claro (preferência salva, mas inerte).
- `ThemeProvider` continua global — Personalização não vira parte da
  Gestão Financeira nem ganha estado próprio; usa o mesmo context de
  sempre.

---

# Handoff — Acessibilidade implementada + bug real do botão radial corrigido

Contexto: o Vinícius roda várias sessões Claude em paralelo neste projeto
porque é grande demais pra uma sessão só. Se você é uma dessas sessões:
leia este arquivo inteiro antes de mexer em qualquer coisa, e ao terminar
seu pedaço, **atualize este mesmo arquivo** para a próxima sessão
continuar de onde você parou.

## Bug real do botão radial ("analógico") — corrigido nesta sessão

O Vinícius reportou que o botão continuava travando às vezes mesmo depois
de uma correção anterior (a de "listeners fantasmas" documentada nos
comentários do arquivo). Investiguei sem confiar no comentário anterior e
achei uma race condition diferente e real, ainda presente:

**Causa:** `abertoRef.current` (lida por todo handler, inclusive o
`onTouchEnd` sintético do React) só era atualizada por um `useEffect`
reagindo ao state `aberto`. Efeitos rodam depois do commit/pintura, de
forma assíncrona em relação ao instante exato de um `setTimeout`. Isso
abria uma janela real: o timer de 220ms chamava `setAberto(true)`, mas se
um `touchend` chegasse logo em seguida (gesto bem na borda do delay,
comum em uso real), o `onTouchEnd` sintético do React dispara **antes**
do listener nativo registrado no `window` (o bubble passa pela raiz de
delegação do React antes de continuar subindo até o `window`). Nesse
instante, `abertoRef.current` ainda podia estar `false` (o efeito não
tinha rodado), então o handler de "toque rápido" rodava por engano:
navegava pro destino genérico e **removia os listeners de touchmove/
touchend/touchcancel** — mas o `setAberto(true)` enfileirado ainda ia
aplicar um instante depois, abrindo o leque visualmente **sem nenhum
listener vivo**. Resultado: leque "fantasma" na tela, sem responder a
nada, até o próximo toque do zero resetar tudo. Isso bate exatamente com
"trava algumas vezes" — intermitente porque depende de timing (gestos
perto dos 220ms), não reproduzível de forma consistente em teste manual
lento.

**Correção:** troquei toda escrita de `aberto` por uma função
`definirAberto(valor)` que atualiza `abertoRef.current` **sincronamente**
no mesmo instante que chama `setAberto`, eliminando a dependência do
timing do `useEffect`. `abertoRef.current` agora sempre reflete a decisão
no exato momento em que foi tomada.

**Não relacionado a tema/acessibilidade**: confirmei que
`GfBotaoAcaoRapida.tsx` não consome `useTheme()` em nenhum lugar — as
mudanças de tema/acessibilidade desta sessão não tocam esse componente.
O bug já existia antes, só não tinha sido identificado.

## O que esta sessão fez: tela de Acessibilidade (seção 11 do documento)

Antes de mexer em qualquer coisa, rodei a verificação de 3 passos herdada
da sessão anterior (P1 — moeda dinâmica) porque ela avisou que não
conseguiu rodar build por falta de internet no sandbox dela. **Passou
limpo** (zero erros de tipo, build ok) — o P1 está confirmado funcional.

Implementei a tela `/gestao-financeira/acessibilidade`
(`GfAcessibilidadePage.tsx`), ligada no menu "Mais". Ela cobre 4 blocos,
todos aplicando via o mesmo `ThemeProvider` global (`src/hooks/useTheme.tsx`,
o mesmo usado por Configurações gerais — expandi o mesmo context em vez de
criar um novo, pra não duplicar a lógica de persistência/CSS vars):

- **Texto e leitura**: tamanho da fonte (reaproveita o que já existia),
  tipo de fonte ("mais legível" = Atkinson Hyperlegible, carregada via
  Google Fonts no `index.html`), espaçamento entre linhas, espaçamento
  entre letras, texto em negrito.
- **Visual**: alto contraste (dois blocos de CSS, um por tema — os alvos
  de contraste são diferentes no claro vs escuro), escala dos elementos
  (cresce padding/toque, não só o texto), reduzir transparências, reduzir
  animações (reaproveita o toggle que já existia em Config Gerais — **e eu
  corrigi um bug nele**, ver abaixo), desativar efeitos visuais (sombra/
  blur/glow).
- **Áudio**: feedback sonoro ligar/desligar + volume (0–100).
- **Navegação e interação**: área de toque ampliada, mais tempo pra ações
  temporárias, confirmar ações importantes.

Todas as novas preferências vivem em `PreferenciasTema` dentro de
`useTheme.tsx`, persistidas no mesmo `localStorage` (`nexus-tema`) que já
existia — nenhuma migração de dado necessária, chaves novas simplesmente
não existiam antes e caem no valor padrão.

### Bug que encontrei e corrigi de passagem
O botão "Reduzir animações" que eu ia reaproveitar tinha
`onToggle={() => definirAnimacoesAtivas(animacoesAtivas)}` — passava o
valor **atual**, não o invertido, ou seja o switch nunca mudava nada.
Corrigido pra `definirAnimacoesAtivas(!animacoesAtivas)`. Vale conferir se
esse padrão de bug não se repetiu em outro lugar que usa a mesma ideia de
"switch que inverte booleano".

### O que é honesto dizer que NÃO está pronto (documentado na própria tela)
A tela tem um comentário no topo do arquivo listando isso, mas resumindo
aqui também:
- **Leitor de tela de verdade** (aria-label em cada ícone, texto
  alternativo em imagem, ordem de navegação, rótulo de campo de form) —
  isso não é uma preferência que liga num switch, é auditoria + edição
  tela por tela do app inteiro. Não fingi que um toggle "compatibilidade
  com leitor de tela" resolveria isso.
- **Alternativa em tabela pra cada gráfico + descrição textual dos
  dados** — depende de cada componente de gráfico individualmente
  (`GfDonutDuplo`, `GfDonutCategorias`, gráficos de Relatórios). Nenhum
  gráfico tem isso ainda.
- **Atalhos de teclado** e navegação 100% por teclado testada — não
  implementado nem testado nesta sessão.
- As preferências de **feedback sonoro** e **confirmar ações
  importantes** persistem e têm UI funcionando, mas **nenhum outro
  componente do app ainda lê esses valores** — não existe nenhum som
  tocando em lugar nenhum do app hoje (nem tinha antes), e as confirmações
  existentes (ex: excluir categoria) já usam `window.confirm` fixo,
  independente dessa preferência. Ligar isso de verdade é trabalho novo.

## Pendências herdadas de antes (ainda não peguei nenhuma destas)

### P6 — Ligar feedback sonoro e "confirmar ações importantes" de verdade
Novidade desta sessão. As preferências existem e persistem, mas:
- Não existe nenhum arquivo de áudio no projeto ainda — precisaria decidir
  2+ sons curtos (confirmação, alerta) e adicionar em `public/`.
- `confirmarAcoesImportantes` (de `useTheme()`) não é lido em nenhum dos
  `window.confirm(...)` espalhados pela GF (ex: excluir categoria, excluir
  conta) — hoje essas confirmações sempre acontecem, ignorando a
  preferência. Se o usuário desligar essa opção, o esperado é que ações
  destrutivas ainda avisem de alguma forma (não seria seguro remover
  totalmente o aviso) — vale decidir com o Vinícius se "desligar" deve
  trocar `window.confirm` por um toast de desfazer, por exemplo, em vez de
  simplesmente não perguntar nada.

Antes, só a tela de Configurações gerais respeitava a moeda/formato
escolhidos pelo usuário (era só a pré-visualização). Os outros 19 arquivos
da Gestão Financeira formatavam sempre em BRL fixo via `formatBRL`/
`formatCompactBRL` (`utils/format.ts`).

Troquei todos esses 19 arquivos pra usar `formatMoeda(valor, estado)`
(`gestao-financeira/formatMoeda.ts`), que já existia mas não era
consumido fora da tela de config. Lista completa dos arquivos alterados
está no `README-ATUALIZACAO.md` desta entrega.

**Padrão usado:** cada componente/página chama `useGestaoFinanceira()` e
passa o `estado` inteiro pra `formatMoeda` (a função só lê os campos que
precisa via `Pick`, então passar o estado todo funciona sem problema).
Em componentes de gráfico/card que não tinham acesso ao contexto antes
(ex: `GfDonutDuplo`, `MiniBarrasFluxo`), adicionei a chamada direto,
já que todos estão dentro do `GestaoFinanceiraProvider`.

Casos que precisaram de atenção extra (sub-componentes dentro do mesmo
arquivo que não herdam variáveis do componente pai):
- `FormPagarDivida` (dentro de `GfDividasPage.tsx`) — ganhou seu próprio
  `estado` na desestruturação do hook.
- `CardResumo` (dentro de `GfMovimentacoesPage.tsx`) — ganhou seu próprio
  `useGestaoFinanceira()`.
- `LinhaMovimentacao` (mesmo arquivo) já recebia `estado` como prop, só
  precisou trocar a chamada de formatação.

`utils/format.ts` (BRL fixo) **não foi tocado** — continua usado pelo app
de educação financeira, que segue fixo em BRL/pt-BR de propósito.

## ⚠️ Pendência crítica desta sessão: verificação não rodada

Esta sessão **não teve acesso à internet** (npm deu erro 403 de rede no
sandbox), então não rodei `npm install` / `tsc --noEmit` / `npm run
build`. Fiz uma checagem manual (grep confirmando zero sobra de
`formatBRL`, balanceamento de parênteses/chaves nos 19 arquivos, e
conferência de que `estado` está em escopo em toda chamada de
`formatMoeda`), mas **isso não substitui o build de verdade**.

**Se você é a próxima sessão com acesso à internet: rode a verificação
de 3 passos ANTES de continuar para qualquer pendência nova.** Se achar
erro de tipo nos 19 arquivos listados no README, é provável que seja
nessas áreas:
- Algum sub-componente que eu não identifiquei também chamava
  `formatBRL` sem ter `estado` facilmente acessível.
- Import duplicado ou faltando em algum dos 19 arquivos (chequei todos,
  mas sem `tsc` de verdade, sempre pode escapar algo).

```bash
rm -rf node_modules
npm install
./node_modules/.bin/tsc --noEmit
npm run build
```

## Pendências (ordem sugerida — herdada da sessão anterior, P1 já feito)

### P2 — Migrar hex hardcoded restante para CSS variables
Ainda sobra hex inline em vários lugares, a maioria **fora** da Gestão
Financeira (não muda de tema junto com o resto):
```bash
grep -rn "background: '#\|background: \"#\|style={{ background: '#0" src --include="*.tsx"
```
Pega coisas como `PerfilPage.tsx`, `FerramentasPage.tsx`,
`BibliotecaPage.tsx`, `ModuloPage.tsx` (cores tipo `#00D4FF14`,
`#22C55E14` — geralmente fundos translúcidos de card com cor de accent).
Padrão: `style={{ background: 'color-mix(in srgb, var(--accent-primaria) 8%, transparent)' }}`
ou `bg-accent-cyan/10` via Tailwind quando o layout permitir. **Cuidado**:
cores dinâmicas vindas de dados do usuário (`categoria.cor`, `conta.cor`)
NÃO são hex hardcoded de tema — são dados legítimos, não mexer.

### P3 — Consumir `--escala-densidade`
A variável CSS existe (setada pelo `ThemeProvider`) mas nenhum componente
lê ela ainda — mudar "Densidade da interface" na tela de config hoje não
visualmente altera nada. Decidir estratégia (padding/gap via `calc()`, ou
classes condicionais) e aplicar pelo menos nas listas principais
(Lançamentos, Movimentações, Categorias, Contas & Cartões).

### P4 — Tradução de verdade (en-US)
`i18n.ts` tem poucas chaves e nada consome o dicionário fora da própria
tela de config (que também não usa na prática — texto hardcoded em
português no JSX). Decidir com o Vinícius se vale traduzir tela por tela
(grande esforço) ou preparar só a infra e manter pt-BR único idioma
funcional por mais tempo.

### P5 — Aplicar `formatDataConfig` e `primeiroDiaMesFinanceiro`/`semanaComecaEm`
Existem no state e têm UI em Configurações gerais, mas nenhum outro lugar
do código lê ainda:
- `formatDataConfig` (`formatMoeda.ts`) — nenhuma tela chama; datas em
  Lançamentos/Relatórios/Detalhe da Movimentação seguem no formato fixo.
- `primeiroDiaMesFinanceiro` — cálculos de "mês atual" em
  `selectors.ts`/`relatorios.ts` assumem mês começando no dia 1. Mudança
  de lógica de negócio, não só exibição — testar com dado de exemplo.
- `semanaComecaEm` — calendário/seletor de semana na GF (ex: form de
  lançamento) hoje deve assumir domingo — não verificado ainda.

## Decisões já tomadas (não reabrir sem necessidade)

- **Tema é global (fora da GF), moeda/idioma são da GF.** Intencional —
  GF é isolada de propósito (localStorage próprio), tema é preferência de
  app inteiro.
- **`accent-cyan` (classe Tailwind) É a cor principal escolhida pelo
  usuário**, não fixo em ciano. Proposital. Outras accents (`gold`,
  `green`, `pink`, `red`, `blue`, `purple`) continuam fixas/semânticas.
- **`utils/format.ts` (BRL fixo) não deve ser removido nem alterado.**
  Usado pelo app de educação financeira, fixo em BRL/pt-BR de propósito.
- **Formato de entrega:** zip só com arquivos novos/modificados +
  `README-ATUALIZACAO.md`, nunca o projeto completo a menos que pedido.

## Verificação obrigatória antes de qualquer entrega
1. `npm install` limpo (`rm -rf node_modules` antes)
2. `./node_modules/.bin/tsc --noEmit` (nunca `npx tsc`)
3. `npm run build`

Esta sessão **não conseguiu rodar esses três passos** (sem internet no
sandbox) — isso precisa ser feito antes de confiar 100% no P1 como
concluído.
