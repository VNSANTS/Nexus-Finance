import type { PerfilCarteira } from '@/types'

export const PERFIS_CARTEIRA: Record<'conservador' | 'moderado' | 'agressivo', PerfilCarteira> = {
  conservador: {
    nome: 'Conservador',
    cor: '#22C55E',
    descricao: 'Prioriza segurança e previsibilidade, aceita menos volatilidade em troca de estabilidade',
    alocacao: [
      { classe: 'Renda Fixa (Tesouro, CDB)', pct: 70, cor: '#22C55E' },
      { classe: 'Fundos Imobiliários', pct: 15, cor: '#FFC93C' },
      { classe: 'Ações', pct: 10, cor: '#EC4899' },
      { classe: 'Internacional', pct: 5, cor: '#3B82F6' },
    ],
    retornoMensalEstimado: 0.85,
  },
  moderado: {
    nome: 'Moderado',
    cor: '#00D4FF',
    descricao: 'Equilíbrio entre segurança e crescimento, aceitando alguma volatilidade por retorno maior',
    alocacao: [
      { classe: 'Renda Fixa (Tesouro, CDB)', pct: 45, cor: '#22C55E' },
      { classe: 'Ações', pct: 25, cor: '#EC4899' },
      { classe: 'Fundos Imobiliários', pct: 15, cor: '#FFC93C' },
      { classe: 'Internacional', pct: 10, cor: '#3B82F6' },
      { classe: 'Cripto/Alternativos', pct: 5, cor: '#8B5CF6' },
    ],
    retornoMensalEstimado: 1.05,
  },
  agressivo: {
    nome: 'Agressivo',
    cor: '#EC4899',
    descricao: 'Foco em crescimento de longo prazo, tolera maior volatilidade em busca de retorno superior',
    alocacao: [
      { classe: 'Ações', pct: 45, cor: '#EC4899' },
      { classe: 'Internacional', pct: 20, cor: '#3B82F6' },
      { classe: 'Renda Fixa (Tesouro, CDB)', pct: 20, cor: '#22C55E' },
      { classe: 'Cripto/Alternativos', pct: 10, cor: '#8B5CF6' },
      { classe: 'Fundos Imobiliários', pct: 5, cor: '#FFC93C' },
    ],
    retornoMensalEstimado: 1.35,
  },
}
