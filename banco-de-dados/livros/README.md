# Livros — Resumos completos

## O que tem aqui

Um arquivo por livro (ex: `pai-rico-pai-pobre.ts`), cada um exportando um objeto do tipo `Livro`. O `index.ts` junta todos automaticamente — não precisa registrar nada manualmente.

## Como adicionar um livro novo

1. Crie um arquivo novo nesta pasta, com nome no formato `nome-do-livro.ts` (sem espaços, tudo minúsculo, hífen entre palavras — isso vira o `id` do livro)
2. Copie a estrutura de um arquivo existente (ex: `pai-rico-pai-pobre.ts`) como modelo
3. Preencha os campos: `id` (mesmo nome do arquivo), `titulo`, `autor`, `cor`, `categoria`, `paraQuem`, `ideias` (lista curta de 4-5 insights), `resumoCompleto` (lista de seções com `secao` e `texto`, podendo ter capítulos/introdução/fechamento)
4. Salve. Pronto — o `index.ts` já pega o arquivo novo automaticamente, sem precisar editar mais nada

## Onde isso é usado no app

- Biblioteca (`src/pages/BibliotecaPage.tsx`) — lista todos os livros e mostra o resumo completo
- Busca (`src/pages/BuscaPage.tsx`) — busca por título e autor
- Módulos (`banco-de-dados/modulos/`) — cada módulo pode referenciar um livro relacionado pelo campo `livroRelacionado.livroId`, que precisa bater exatamente com o `id` do livro aqui

## Quantidade atual

19 livros.
