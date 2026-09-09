import type { Investimento, InvestimentoRendaFixa } from '../types'
import type { IndicadoresEconomicos } from './indicadoresBacen'

export interface ValorAtivo {
  valorAplicado: number // quantidade × precoCompra, nunca muda
  valorAtual: number
  rentabilidadePercent: number
  rentabilidadeReais: number
  // false quando o valor atual é só uma estimativa porque a fonte de
  // dados (Bacen pra Renda Fixa, brapi/CoinGecko pra Variável/Cripto)
  // estava indisponível no momento — nesses casos valorAtual === valorAplicado
  // (0% de variação assumida) até a próxima tentativa dar certo.
  dadoAtualizado: boolean
}

const MS_POR_DIA = 24 * 60 * 60 * 1000

function diasCorridos(dataAplicacao: string): number {
  const aplicacao = new Date(dataAplicacao + 'T00:00:00')
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return Math.max(0, Math.round((hoje.getTime() - aplicacao.getTime()) / MS_POR_DIA))
}

/**
 * Projeta o valor atual de um investimento de Renda Fixa.
 *
 * SIMPLIFICAÇÃO IMPORTANTE (documentada, não é um bug): usa a taxa do
 * indexador de HOJE como se ela tivesse valido igual todo dia desde a
 * aplicação, em vez da série histórica dia-a-dia de verdade. A série
 * histórica completa existe na mesma API do Bacen (é só pedir um período
 * em vez de "últimos 1"), mas processar isso corretamente (CDI muda de
 * valor entre reuniões do Copom, junta feriados/dias úteis etc.) é
 * significativamente mais complexo — essa versão dá uma estimativa
 * razoável pro dia a dia, não um valor de precisão contábil/fiscal.
 */
function calcularRendaFixa(inv: InvestimentoRendaFixa, indicadores: IndicadoresEconomicos | null): ValorAtivo {
  const valorAplicado = inv.quantidade * inv.precoCompra
  const dias = diasCorridos(inv.dataAplicacao)

  if (!indicadores) {
    return { valorAplicado, valorAtual: valorAplicado, rentabilidadePercent: 0, rentabilidadeReais: 0, dadoAtualizado: false }
  }

  let fator = 1
  if (inv.indexador === 'PREFIXADO') {
    fator = Math.pow(1 + inv.taxaContratada / 100, dias / 365)
  } else if (inv.indexador === 'IPCA') {
    const fatorInflacao = Math.pow(1 + indicadores.ipcaMensalPercent / 100, dias / 30)
    const fatorSpread = Math.pow(1 + inv.taxaContratada / 100, dias / 365)
    fator = fatorInflacao * fatorSpread
  } else {
    // CDI ou SELIC — taxaContratada é "% do indexador" (ex: 110 = 110% do CDI)
    const taxaDiariaBase = inv.indexador === 'CDI' ? indicadores.cdiDiarioPercent : indicadores.selicDiariaPercent
    const fatorDiario = 1 + (taxaDiariaBase / 100) * (inv.taxaContratada / 100)
    fator = Math.pow(fatorDiario, dias)
  }

  const valorAtual = valorAplicado * fator
  return {
    valorAplicado,
    valorAtual,
    rentabilidadePercent: valorAplicado > 0 ? (valorAtual / valorAplicado - 1) * 100 : 0,
    rentabilidadeReais: valorAtual - valorAplicado,
    dadoAtualizado: true,
  }
}

/**
 * Valor atual de Renda Variável/Cripto a partir de uma cotação já buscada
 * (ver apiInvestimentos.ts) — null quando a cotação não veio (API fora do
 * ar, ticker sem dado), caindo no mesmo fallback de "0% de variação".
 */
export function calcularComCotacao(inv: Investimento, precoAtual: number | null): ValorAtivo {
  const valorAplicado = inv.quantidade * inv.precoCompra
  if (precoAtual === null) {
    return { valorAplicado, valorAtual: valorAplicado, rentabilidadePercent: 0, rentabilidadeReais: 0, dadoAtualizado: false }
  }
  const valorAtual = inv.quantidade * precoAtual
  return {
    valorAplicado,
    valorAtual,
    rentabilidadePercent: valorAplicado > 0 ? (valorAtual / valorAplicado - 1) * 100 : 0,
    rentabilidadeReais: valorAtual - valorAplicado,
    dadoAtualizado: true,
  }
}

export function calcularValorAtivo(
  inv: Investimento,
  indicadores: IndicadoresEconomicos | null,
  cotacoes: Map<string, number>
): ValorAtivo {
  if (inv.classe === 'renda-fixa') return calcularRendaFixa(inv, indicadores)
  if (inv.classe === 'renda-variavel') return calcularComCotacao(inv, cotacoes.get(inv.ticker) ?? null)
  return calcularComCotacao(inv, cotacoes.get(inv.coingeckoId) ?? null) // cripto
}

export interface ResumoCarteira {
  valorAplicado: number
  valorAtual: number
  rentabilidadePercent: number
  rentabilidadeReais: number
  porClasse: Record<'renda-fixa' | 'renda-variavel' | 'cripto', { valorAplicado: number; valorAtual: number }>
}

export function calcularResumoCarteira(
  investimentos: Investimento[],
  indicadores: IndicadoresEconomicos | null,
  cotacoes: Map<string, number>
): ResumoCarteira {
  const porClasse: ResumoCarteira['porClasse'] = {
    'renda-fixa': { valorAplicado: 0, valorAtual: 0 },
    'renda-variavel': { valorAplicado: 0, valorAtual: 0 },
    cripto: { valorAplicado: 0, valorAtual: 0 },
  }

  for (const inv of investimentos) {
    const v = calcularValorAtivo(inv, indicadores, cotacoes)
    porClasse[inv.classe].valorAplicado += v.valorAplicado
    porClasse[inv.classe].valorAtual += v.valorAtual
  }

  const valorAplicado = Object.values(porClasse).reduce((s, c) => s + c.valorAplicado, 0)
  const valorAtual = Object.values(porClasse).reduce((s, c) => s + c.valorAtual, 0)

  return {
    valorAplicado,
    valorAtual,
    rentabilidadePercent: valorAplicado > 0 ? (valorAtual / valorAplicado - 1) * 100 : 0,
    rentabilidadeReais: valorAtual - valorAplicado,
    porClasse,
  }
}
