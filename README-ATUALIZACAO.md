# Atualização — Família e perfis (Gestão Financeira → Mais)

## O que mudou

O item "Família e perfis" no menu **Mais** existia só como placeholder
("em breve"). Esta atualização implementa a tela de verdade.

Como a Gestão Financeira inteira é local (sem servidor, sem conta na
nuvem — decisão já documentada no próprio código), isto **não é
multiusuário real entre aparelhos diferentes**. É um sistema de perfis
dentro do mesmo dispositivo: várias pessoas da família podem ter um
perfil (nome, avatar, cor, papel) pra organizar quem lançou o quê, com
um conjunto de permissões que fica salvo — mas trocar de perfil não pede
senha (é como trocar de usuário num app de streaming, não um login).

### Papéis e permissões

Quatro papéis prontos, cada um com um conjunto padrão de permissões que
pode ser ajustado individualmente por membro ("Personalizar permissões"
no formulário):

- **Administrador** — acesso total, inclusive gerenciar outros membros
- **Adulto** — lança, edita e exclui, mas não mexe nos membros
- **Jovem/dependente** — lança e edita, não exclui
- **Visualizador** — só consulta

Permissões: lançar, editar, excluir, ver saldos, gerenciar membros.

O app sempre garante pelo menos **um administrador** — não deixa excluir
o membro principal (o "dono" do aparelho, criado automaticamente) nem
tirar a permissão de gerenciar membros do único administrador restante.

### O que a tela faz

- Mostra o **perfil ativo** no topo, com botão "Trocar" (abre a lista de
  membros pra escolher outro — sem senha)
- Lista todos os membros, com chips resumindo as permissões de cada um
- Adicionar / editar / excluir membro (excluir não apaga lançamentos já
  feitos por essa pessoa, só desvincula)

## Arquivos modificados/criados (7)

Novos:
- `src/gestao-financeira/permissoes.ts` — papéis, permissões padrão e helpers
- `src/gestao-financeira/components/GfFormMembro.tsx` — formulário de membro
- `src/gestao-financeira/pages/GfFamiliaPerfisPage.tsx` — a tela em si

Modificados:
- `src/gestao-financeira/types.ts` — tipos `Membro`, `PapelMembro`,
  `PermissoesMembro`; `membros`/`membroAtivoId` no estado; `membroId?`
  opcional em `Transacao` (preparado pra atribuir lançamentos a um
  membro no futuro — hoje o formulário de lançamento ainda não usa isso)
- `src/gestao-financeira/GestaoFinanceiraContext.tsx` — estado inicial
  cria um membro "Eu" (administrador) automaticamente; ações
  `adicionarMembro`/`editarMembro`/`excluirMembro`/`definirMembroAtivo`;
  `LIMPAR_TODOS_DADOS` preserva os membros (são configuração, não dado
  financeiro, mesma lógica já usada pras outras preferências)
- `src/gestao-financeira/GestaoFinanceiraShell.tsx` — rota
  `/gestao-financeira/familia-perfis`
- `src/gestao-financeira/pages/GfMaisPage.tsx` — o item "Família e
  perfis" agora navega pra tela em vez de ficar desabilitado

Todos já existiam no projeto (exceto os 3 novos) — é só substituir pelo
conteúdo deste zip (mesmo caminho, mesmo nome) e criar os novos nos
caminhos indicados.

## ⚠️ O que fica de fora por decisão (não é bug)

- **Nenhuma tela existente passou a checar permissão de verdade** (ex.: o
  botão de lançamento na Home ou em Lançamentos não fica desabilitado
  pra um perfil "Visualizador" ainda). A tela de Família e perfis guarda
  as permissões certinho — usá-las pra travar botões nas outras 19 telas
  é trabalho à parte, pra não misturar duas mudanças grandes na mesma
  leva. `permissoesAtivas(estado)` em `permissoes.ts` já está pronta pra
  isso quando você quiser.
- **Sem PIN por perfil** — trocar de perfil é livre, de propósito (ver
  comentário na própria tela). Bloqueio de verdade é a futura tela
  Segurança.
- **Lançamentos ainda não mostram "quem lançou"** — o campo `membroId`
  existe no tipo, mas o formulário de lançamento não foi alterado nesta
  leva.

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

Sem acesso à internet nesta sessão (ambiente sem rede), não rodei
`npm install` / `tsc --noEmit` / `npm run build`. Revisei manualmente:
chaves/parênteses balanceados em todos os arquivos tocados, imports
usados, e os pontos de null-check que costumam gerar TS18048 (capturei
`ativo`/`membroAtivo` em variável antes de usar em vez de acessar dentro
de função aninhada). Ainda assim, **isso não substitui o build real** —
se algo estiver errado, o GitHub Actions vai falhar e mostrar o erro
exato.

## Teste manual sugerido

1. Vá em Mais → Família e perfis. Deve aparecer um membro "Eu"
   (Administrador) já criado.
2. Toque em "Adicionar", crie um segundo membro (ex.: papel
   "Visualizador"), salve.
3. Toque em "Trocar" no card do topo, escolha o novo perfil — o card
   deve atualizar pra ele.
4. Edite esse membro, abra "Personalizar permissões" e mude um switch —
   salve e confira que o chip "Sem: ..." no card da lista mudou.
5. Tente excluir o membro "Eu" (principal) — deve aparecer um aviso
   bloqueando.
6. Tente tirar "Gerenciar membros" do único administrador — deve
   bloquear com aviso, mostrando a mensagem de erro no formulário.
