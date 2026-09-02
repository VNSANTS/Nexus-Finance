# Mercado — Categorias e Notícias

## O que tem aqui

Um arquivo, `categorias.ts`, com todas as categorias de mercado mostradas na tela "Mercado ao vivo" do app (Bolsa, Dólar, Selic, Criptomoedas, etc.), incluindo os valores exibidos e as notícias de cada uma.

**Importante:** todos os valores aqui são mockados (fictícios) — o app ainda não está conectado a nenhuma API de cotações real. Editar os números aqui só muda o que aparece na tela, não reflete o mercado real.

## Como adicionar uma categoria nova

Siga as instruções do comentário no topo do arquivo `categorias.ts`. Resumindo: copie um bloco inteiro de dentro de `CATEGORIAS_MERCADO`, cole antes do `]` final, preencha `id`, `nome`, `valor`, `delta`, `up`, `iconName`, `cor` e `noticias`.

## Categorias existentes

12 categorias hoje: Bolsa de Valores, Dólar, Juros e Inflação, Criptomoedas, Fundos Imobiliários (FIIs), Commodities, Índices e Mercado Internacional, ETFs, Renda Fixa/Tesouro Direto, Fundos de Investimento, Câmbios, Futuros e Derivativos.

## Onde isso é usado no app

- `src/pages/MercadoPage.tsx` — tela principal de mercado
- `src/pages/BuscaPage.tsx` — resultado de busca por categoria de mercado
