# Banco de Dados — Nexus Finance

Esta pasta reúne **todo o conteúdo editável do app** (textos, perguntas, listas) separado do código de programação (React/TypeScript). A ideia: dá para editar o app sem precisar entender a estrutura do projeto — só abrir o arquivo certo e mexer no texto.

## Estrutura

| Pasta | O que tem | Formato |
|---|---|---|
| `modulos/` | Conteúdo completo dos 66 módulos de aprendizado + as 10 trilhas | Um arquivo por módulo |
| `livros/` | Resumos completos dos 19 livros | Um arquivo por livro |
| `desafio-diario/` | Banco de perguntas do Desafio Diário | Um arquivo único, numerado |
| `glossario/` | Termos do glossário financeiro | Um arquivo único, numerado |
| `mercado/` | Categorias e notícias da tela de Mercado (dados mockados) | Um arquivo único |
| `perfis-carteira/` | Os 3 perfis de investidor (conservador/moderado/agressivo) | Um arquivo único |
| `investidor/` | Dicas por classe de ativo e carteiras recomendadas | Um arquivo único |

Cada subpasta tem seu próprio `README.md` explicando exatamente como editar ou adicionar conteúdo ali.

## Como isso funciona por baixo dos panos

Cada subpasta que tem múltiplos arquivos (como `modulos/` e `livros/`) tem um `index.ts` que **carrega tudo automaticamente**, varrendo a pasta e juntando os arquivos sozinho. Isso significa que:

- Você **nunca precisa registrar um arquivo novo em nenhum lugar** — só criar o arquivo na pasta certa, com o nome certo, e ele já aparece no app
- O código do app (em `src/`) nunca precisa ser tocado para adicionar conteúdo — só para mudar como o app funciona

Esse mecanismo (chamado *auto-loader*) usa um recurso do Vite (`import.meta.glob`), parecido com um "importar tudo desta pasta" automático.

## O que NÃO está aqui (e por quê)

Duas coisas ficaram em `src/data/` em vez de virem para cá:

- **`src/data/badges.ts`** (conquistas) — cada conquista tem uma condição escrita em código (ex: `s.streak >= 7`), não um texto simples. Mover isso para cá exigiria escrever lógica de programação, não só texto.
- A parte de **função** de `src/data/mercado.ts` — os dados em si (categorias, notícias) já estão em `banco-de-dados/mercado/categorias.ts`; só a "casca" que conecta ao resto do app ficou em `src/`.

## Convenção geral usada em todos os arquivos

- Textos sempre entre crase (`` ` ``), não aspas simples — assim não precisa escapar aspas dentro do texto
- Onde há numeração (Desafio Diário, Glossário), sempre sequencial, sem pular números
- Cada arquivo tem instruções de edição escritas em comentário no próprio topo — a fonte da verdade de "como editar" está sempre no arquivo, não só neste README
