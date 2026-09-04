import type { Idioma } from './types'

// Infraestrutura de tradução da Gestão Financeira. Hoje cobre só as strings
// realmente usadas pela tela de Configurações gerais e pela barra de
// navegação — é uma fatia pequena e verificada, não um dicionário
// "decorativo" com centenas de chaves nunca conectadas a nada.
//
// PENDENTE (ver PROXIMA_SESSAO.md): a esmagadora maioria do texto da GF
// ainda está hardcoded em português direto no JSX de cada tela. Traduzir o
// app de verdade significa passar cada string visível por esse dicionário,
// tela por tela — trabalho grande, melhor feito incrementalmente.

export const DICIONARIO = {
  'pt-BR': {
    inicio: 'Início',
    lancamentos: 'Lançamentos',
    relatorios: 'Relatórios',
    configuracoes: 'Configurações',
    configuracoesGerais: 'Configurações gerais',
    aparencia: 'Aparência',
    idioma: 'Idioma',
    moeda: 'Moeda',
  },
  'en-US': {
    inicio: 'Home',
    lancamentos: 'Transactions',
    relatorios: 'Reports',
    configuracoes: 'Settings',
    configuracoesGerais: 'General settings',
    aparencia: 'Appearance',
    idioma: 'Language',
    moeda: 'Currency',
  },
} as const satisfies Record<Idioma, Record<string, string>>

export type ChaveTraducao = keyof (typeof DICIONARIO)['pt-BR']

export function traduzir(idioma: Idioma, chave: ChaveTraducao): string {
  return DICIONARIO[idioma][chave] ?? DICIONARIO['pt-BR'][chave]
}
