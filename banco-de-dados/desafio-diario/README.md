# Desafio Diário — Banco de Perguntas

## O que tem aqui

Um único arquivo: `perguntas.ts`, com todas as perguntas do Desafio Diário do app.

## Como funciona no app

Todo dia, o app sorteia **1 pergunta** desse banco para cada usuário, individualmente. A pergunta sorteada nunca se repete para aquela pessoa até que todas as perguntas do banco já tenham aparecido pelo menos uma vez — quando isso acontece, o controle reinicia sozinho e as perguntas voltam a ser sorteáveis.

Você não precisa mexer em nenhuma lógica de sorteio — ela já existe e funciona sozinha, em `src/hooks/useUserProgress.ts` (função `sortearPerguntasDesafio`). Só precisa alimentar o banco de perguntas.

## Como adicionar perguntas novas

Abra `perguntas.ts` e siga as instruções que estão no comentário no topo do próprio arquivo. Resumindo:

1. Copie um bloco de pergunta inteiro (do `{` até o `},`)
2. Cole no final do array
3. Troque o `numero` para o próximo da sequência
4. Preencha pergunta, as 5 alternativas, qual é a correta (0 a 4) e a explicação

Não precisa editar nenhum outro arquivo do projeto. O app já vai puxar as perguntas novas automaticamente.

## Regras importantes

- Sempre 5 alternativas — nem 4, nem 6
- `numero` sempre único e sequencial — não repetir, não pular
- Use crase (`` ` ``) para abrir/fechar os textos, não aspas simples — assim não precisa escapar aspas dentro do texto
- A explicação deve dizer por que a resposta certa está certa

## Quantidade atual

200 perguntas (numeradas 1 a 200 no arquivo).
