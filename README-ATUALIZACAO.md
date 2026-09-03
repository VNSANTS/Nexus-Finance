# Atualização — Correção de overflow/travamento nas Calculadoras (Ferramentas)

## Problema relatado
Na calculadora de Juros Compostos (e nas demais que usam o mesmo `ResultCard`), ao colocar valores exagerados nos sliders:
1. Arrastar o slider travava a tela.
2. Quando o valor resultante era grande demais para caber na tela, ele simplesmente vazava para fora em vez de ser cortado com "...".

## Causa
- O `fmt()` sempre formatava o número completo por extenso (`toLocaleString`). Com taxas de juros extremas (até 1000% ao mês) compostas por até 40 anos, o resultado virava uma string com centenas de dígitos.
- Essa string enorme era renderizada sem nenhum corte (`overflow`/`truncate`), então o navegador precisava desenhar uma caixa de texto imensa (bem mais larga que a tela) a cada novo evento do slider durante o arraste — isso é o que travava a rolagem/tela no celular.

## Correção (`src/pages/FerramentasPage.tsx`)
1. **`fmt()`**: agora trata valores não finitos (`Infinity`/`NaN`) mostrando `R$ —`, e valores acima de 1 quatrilhão (cenário fora de qualquer uso real) são exibidos em notação científica compacta (ex.: `R$ 7,95 × 10^29`) em vez da string gigante. Isso resolve a causa raiz do travamento.
2. **`ResultCard`** (componente usado por todas as ~30 calculadoras): o valor principal e a linha de "Investido/Juros" agora têm `truncate` (corta com "..." se não couber) + `title` com o valor completo.
3. **Tabela de histórico por ano** (tela de Juros Compostos, a mesma do print): cada linha agora trunca o valor com "..." em vez de vazar para fora da tela, mantendo o rótulo "Ano X" sempre visível.

## Como aplicar
Substitua o arquivo `src/pages/FerramentasPage.tsx` do seu repositório pelo arquivo anexo (é o único arquivo alterado). Não há mudança em `types.ts` nem em outros contextos — mudança isolada de UI/formatação.

## Observação
Valores "normais" (até milhões/bilhões, o uso real do app) continuam formatados exatamente como antes — só valores absurdamente exagerados (típicos de teste, como 514% ao mês) passam a usar a notação compacta.
