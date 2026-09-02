# Handoff — Tela de Segurança (bloqueio por PIN) implementada

Contexto: o Vinícius roda várias sessões Claude em paralelo neste projeto
porque é grande demais pra uma sessão só. Se você é uma dessas sessões:
leia este arquivo inteiro antes de mexer em qualquer coisa, e ao terminar
seu pedaço, **atualize este mesmo arquivo** para a próxima sessão
continuar de onde você parou.

## O que esta sessão fez: tela de Segurança (menu Mais → Segurança)

Implementei o item "Segurança", que existia só como placeholder ("em
breve") desde a entrega de Família e perfis. Escopo: bloqueio por PIN de
verdade (4 ou 6 dígitos, hash PBKDF2-SHA256 + salt via Web Crypto nativa,
nunca texto puro, nenhuma lib nova adicionada). Detalhes completos no
`README-ATUALIZACAO.md` desta entrega — resumindo aqui:

- `seguranca.ts` (novo): hash/verificação de PIN.
- `GfTecladoPin.tsx` (novo): teclado numérico reutilizável.
- `GfBloqueioOverlay.tsx` (novo): a trava de verdade — cobre a Gestão
  Financeira inteira até acertar o PIN, com bloqueio de 30s depois de 5
  tentativas erradas e fluxo "Esqueci meu PIN" (remove a trava, não apaga
  dados).
- `GfSegurancaPage.tsx` (novo): tela de configuração — ativar/alterar/
  desativar PIN, bloquear ao abrir o app, bloquear ao voltar de outro
  app com tolerância configurável.
- `types.ts`, `GestaoFinanceiraContext.tsx`, `GestaoFinanceiraShell.tsx`,
  `GfMaisPage.tsx`: integração (estado, reducer, rota, item de menu).

**Documentado como não implementado nesta tela mesma** (não fingido):
biometria (WebAuthn precisaria de servidor pra funcionar direito) e
"sessões" (não existe conceito disso num app 100% local por aparelho).

**Pendência que herdei e não peguei**: esta tela ainda não verifica
`permissoes.gerenciarMembros` — qualquer perfil de Família e perfis pode
mexer no PIN por enquanto. Mesma pendência já existia pras outras 19
telas (documentada na entrega de Família e perfis) — não resolvida aqui
de propósito, pra não misturar duas mudanças grandes na mesma leva.

## ⚠️ Verificação não rodada nesta sessão (sem internet)

Mesma situação já registrada nas sessões anteriores deste handoff: sem
acesso à rede (`npm install` deu 403), não rodei `tsc --noEmit` nem
`npm run build` reais. Compensei rodando o parser do esbuild (disponível
no ambiente via dependência de outra ferramenta) contra os 8 arquivos
tocados — todos passaram sem erro de sintaxe — e revisão manual cruzando
nomes de campo/exports entre arquivos. Detalhes e o que checar primeiro
se aparecer erro de tipo: ver seção equivalente no `README-ATUALIZACAO.md`
desta entrega (ícones novos do `lucide-react` — `Fingerprint`, `KeyRound`,
`Laptop`, `Delete` — são o ponto mais provável de erro, não confirmados
contra a versão instalada no projeto sem rede).

**Se você é a próxima sessão com internet: rode a verificação de 3 passos
ANTES de continuar pra qualquer pendência nova** (comando no fim deste
arquivo).

---

# Handoff anterior — Acessibilidade implementada + bug real do botão radial corrigido

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
