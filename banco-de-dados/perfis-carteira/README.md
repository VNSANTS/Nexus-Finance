# Perfis de Carteira

## O que tem aqui

Um arquivo, `perfis.ts`, com os 3 perfis de investidor usados no app (Conservador, Moderado, Agressivo): a alocação recomendada de cada um e o retorno mensal estimado.

## Como editar

Abra `perfis.ts` e ajuste os valores de `alocacao` (lista de classes de ativo com percentual) ou `retornoMensalEstimado` diretamente. Não há um formato de "adicionar" aqui, porque o app trabalha com exatamente 3 perfis fixos (conservador/moderado/agressivo) — mudar isso exigiria também alterar código em `src/pages/CarteiraPage.tsx`.

## Onde isso é usado no app

- `src/components/Onboarding.tsx` — escolha do perfil no cadastro
- `src/pages/CarteiraPage.tsx` — tela de carteira, simulação por perfil
