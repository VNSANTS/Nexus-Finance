# Módulos — Conteúdo das Trilhas de Aprendizado

## O que tem aqui

- **66 arquivos `mNN-slug.ts`** — o conteúdo completo de cada módulo (Aprender, Mapa Mental, Simulação, Flashcards, Teste, FAQ)
- **`_indice.ts`** — a lista leve de todos os módulos (id, trilha, ícone, ordem, duração) — carregada sempre, usada para montar os cards
- **`_trilhas.ts`** — a lista das 10 trilhas (Fundamentos, Economia, Renda Fixa, etc.)
- **`index.ts`** — junta tudo automaticamente. Não precisa editar.

Os arquivos `_indice.ts` e `_trilhas.ts` começam com `_` de propósito, para não serem confundidos com os arquivos de conteúdo `mNN-*.ts`.

## Como editar o conteúdo de um módulo existente

Abra o arquivo `mNN-slug-do-modulo.ts` correspondente e edite os campos diretamente. Cada módulo segue a interface `Modulo` (definida em `src/types/index.ts`), com campos como `aprender`, `mapaMental`, `simulacao`, `flashcards`, `quiz`, `faq`.

## Como adicionar um módulo novo

1. Escolha o próximo número disponível (ex: se o último é `m66-...`, o novo é `m67-...`)
2. Crie o arquivo `m67-slug-do-novo-modulo.ts` nesta pasta, seguindo a estrutura de um módulo existente como modelo
3. Adicione uma entrada correspondente em `_indice.ts`, com o mesmo `id` usado no nome do arquivo (a parte depois do `mNN-`)
4. Se for de uma trilha nova, adicione a trilha em `_trilhas.ts` também

O conteúdo do módulo (`mNN-*.ts`) é carregado sob demanda — só baixa quando o usuário abre aquele módulo específico, para o app carregar rápido. O índice (`_indice.ts`) e as trilhas (`_trilhas.ts`) carregam sempre, por serem leves.

## Livro relacionado

Cada módulo pode (e hoje todos têm) um campo `aprender.livroRelacionado`, apontando para um livro em `banco-de-dados/livros/` pelo `livroId`. Esse id precisa bater exatamente com o `id` do livro.

## Quantidade atual

66 módulos, 10 trilhas.
