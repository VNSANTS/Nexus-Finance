import type { GestaoFinanceiraState } from './types'

// Formata um valor respeitando moeda, casas decimais, separador decimal e
// separador de milhares configurados pelo usuário em Configurações gerais.
// Substitui formatBRL/formatCompactBRL (utils/format.ts) DENTRO da Gestão
// Financeira — aquelas funções continuam existindo e sendo usadas pelo
// resto do app (educação financeira), que segue fixo em BRL/pt-BR.
//
// PENDENTE (ver PROXIMA_SESSAO.md): só a tela de Configurações gerais usa
// esta função até agora. Os ~19 arquivos da GF que hoje chamam formatBRL
// direto (Home, Relatórios, Lançamentos, etc.) ainda formatam sempre em
// BRL — migrá-los para formatMoeda(valor, estado) é o próximo passo para
// a preferência de moeda ter efeito real em todo o módulo.

const SIMBOLOS: Record<string, string> = {
  BRL: 'R$',
  USD: 'US$',
  EUR: '€',
  GBP: '£',
  ARS: 'AR$',
  JPY: '¥',
}

export function simboloMoeda(codigo: string): string {
  return SIMBOLOS[codigo] ?? codigo
}

type ConfigMoeda = Pick<
  GestaoFinanceiraState,
  'moedaPadrao' | 'formatoValor' | 'casasDecimais' | 'separadorDecimal' | 'separadorMilhares'
>

export function formatMoeda(valor: number, config: ConfigMoeda): string {
  const negativo = valor < 0
  const abs = Math.abs(valor)
  const decimais = Math.min(Math.max(config.casasDecimais, 0), 4)

  const partes = abs.toFixed(decimais).split('.')
  const inteiro = partes[0]
  const decimal = partes[1] ?? ''

  const sepMilhar = config.separadorMilhares === 'nenhum' ? '' : config.separadorMilhares
  const inteiroFormatado = sepMilhar ? inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, sepMilhar) : inteiro

  const numeroFormatado = decimal ? `${inteiroFormatado}${config.separadorDecimal}${decimal}` : inteiroFormatado
  const simbolo = simboloMoeda(config.moedaPadrao)
  const sinal = negativo ? '-' : ''

  switch (config.formatoValor) {
    case 'simbolo-depois':
      return `${sinal}${numeroFormatado} ${simbolo}`
    case 'codigo-antes':
      return `${sinal}${config.moedaPadrao} ${numeroFormatado}`
    case 'simbolo-antes':
    default:
      return `${sinal}${simbolo} ${numeroFormatado}`
  }
}

export function formatDataConfig(dataIso: string, formato: GestaoFinanceiraState['formatoData']): string {
  const d = new Date(dataIso)
  if (Number.isNaN(d.getTime())) return dataIso
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const aaaa = d.getFullYear()

  switch (formato) {
    case 'MM/DD/AAAA':
      return `${mm}/${dd}/${aaaa}`
    case 'AAAA-MM-DD':
      return `${aaaa}-${mm}-${dd}`
    case 'DD/MM/AAAA':
    default:
      return `${dd}/${mm}/${aaaa}`
  }
}
