# Atualização — Valores grandes agora aparecem resumidos (em vez de sumirem)

## O que mudou (`src/pages/FerramentasPage.tsx`)

Antes, valores muito grandes (ex.: resultado da calculadora de Juros Compostos com taxas exageradas)
eram cortados com "..." e praticamente somem da tela. Agora o `fmt()` resume o número:

- Abaixo de R$ 1 bilhão: mostra o número completo, como sempre (nenhuma mudança aqui).
- A partir de R$ 1 bilhão: mostra resumido com o nome da escala — "R$ 1,5 bilhões", "R$ 4,07 octilhões", "R$ 795 octilhões", etc.
- Além de 1 decilhão (10^33), usa notação científica curta (ex.: "R$ 1,00 × 10^36").
- Se o cálculo estourar o limite numérico (Infinity), mostra "Valor muito alto" em vez de sumir ou travar.

Isso resolve tanto o "valor sumindo" quanto o travamento ao arrastar os sliders com valores exagerados
(a causa raiz era formatar/renderizar uma string com centenas de dígitos a cada movimento do slider).

O `truncate` + tooltip continuam como proteção extra, mas na prática o texto resumido já cabe normalmente.

## Como aplicar
Substitua o arquivo `src/pages/FerramentasPage.tsx` do seu repositório pelo anexo. Único arquivo alterado.
