# Nexus Finance — Sessão D: Fundo degradê/imagem + integração final

Entrega referente à "Sessão D" do handoff em `PROXIMA_SESSAO.md`
(Personalização → fundo do app). Zip só com os arquivos novos/modificados
— não é o projeto completo.

## O que mudou

- **Novo:** `src/utils/comprimirImagemFundo.ts` — comprime a imagem de
  fundo escolhida pelo usuário (canvas: redimensiona pra no máximo 1080px
  de largura, JPEG qualidade 0.75) antes de virar `data:` URL. Se o
  resultado ainda passar de ~3MB, tenta uma segunda compressão mais
  agressiva (qualidade 0.5); se mesmo assim passar, rejeita com
  `ImagemFundoMuitoGrandeError` em vez de deixar estourar o localStorage
  silenciosamente. Arquivo próprio (não reusa
  `gestao-financeira/comprimirImagem.ts`) porque a GF é isolada de
  propósito e Personalização é usada fora dela também.
- **Modificado:** `src/pages/PersonalizacaoPage.tsx` — bloco "Imagem"
  (antes só um placeholder "em construção") agora é o componente novo
  `SeletorImagemFundo`: escolher/trocar/remover imagem, preview, estado
  de carregamento, aviso de erro, e slider de opacidade
  (`imagemFundoOpacidade`) quando já existe imagem salva. A parte de
  degradê **não foi tocada** — já estava completa desde a Sessão B.
- **Modificado:** `src/App.tsx` — os dois wrappers de nível raiz
  (onboarding e app principal) trocaram `bg-bg` (opaco, `var(--cor-bg)`)
  por `bg-transparent`, resolvendo o problema documentado pela Sessão A:
  o fundo custom (`--bg-fundo-app`, aplicado no `body`) agora aparece de
  verdade, em vez de ficar coberto pelo wrapper. Nenhum outro uso de
  `bg-bg` no projeto foi tocado (modais/overlays/inputs devem continuar
  opacos com a cor de tema pura — checado com grep antes de mexer).
- **Modificado:** `PROXIMA_SESSAO.md` — Sessão D marcada `[FEITO]` com o
  resumo do que foi feito. Com isso as 4 sessões (A/B/C/D) da feature de
  Personalização estão completas.

## Verificação rodada

```
rm -rf node_modules
npm install
./node_modules/.bin/tsc --noEmit   → zero erros
npm run build                      → passou, PWA precache gerado normal
```

Sandbox desta sessão tinha acesso à internet.

## Como instalar

1. Substituir/adicionar os arquivos deste zip no projeto (mantendo os
   caminhos: `src/utils/comprimirImagemFundo.ts` é novo, os outros
   substituem os existentes).
2. Não precisa `npm install` de dependência nova — nenhuma foi
   adicionada nesta sessão.
3. Testar a tela `/personalizacao`:
   - Fundo "Imagem": escolher uma foto, conferir preview + slider de
     opacidade, trocar e remover.
   - Fundo "Sólido"/"Degradê": confirmar que agora aparecem de verdade
     por trás do conteúdo (antes ficavam escondidos pelo wrapper).
   - Testar em pelo menos uma tela de cada área (Home, dentro da GF, um
     modal/bottom-sheet) pra garantir que nenhum texto ficou ilegível —
     isso não foi validado visualmente nesta sessão (sandbox sem
     navegador gráfico), só por leitura de código.

## O que não foi mexido

- Nada pendente das Sessões A/B/C — a feature de Personalização
  (AMOLED, fundo sólido/degradê/imagem, color picker) está completa.
