import type { Categoria } from './types'

// Categorias padrão criadas na primeira vez que o usuário entra na Gestão
// Financeira. O usuário pode editar, ocultar ou criar novas depois — isso é
// só o ponto de partida (a base pedida por enquanto).
export const CATEGORIAS_PADRAO: Categoria[] = [
  { id: 'cat-alimentacao', nome: 'Alimentação', tipo: 'despesa', icone: 'UtensilsCrossed', cor: '#00D4FF', categoriaPaiId: null, padrao: true, natureza: 'variavel', essencialidade: 'necessidade' },
  { id: 'cat-transporte', nome: 'Transporte', tipo: 'despesa', icone: 'Car', cor: '#FFC93C', categoriaPaiId: null, padrao: true, natureza: 'variavel', essencialidade: 'necessidade' },
  { id: 'cat-moradia', nome: 'Moradia', tipo: 'despesa', icone: 'Home', cor: '#EC4899', categoriaPaiId: null, padrao: true, natureza: 'fixo', essencialidade: 'necessidade' },
  { id: 'cat-lazer', nome: 'Lazer', tipo: 'despesa', icone: 'PartyPopper', cor: '#8B5CF6', categoriaPaiId: null, padrao: true, natureza: 'variavel', essencialidade: 'desejo' },
  { id: 'cat-saude', nome: 'Saúde', tipo: 'despesa', icone: 'HeartPulse', cor: '#22C55E', categoriaPaiId: null, padrao: true, natureza: 'fixo', essencialidade: 'necessidade' },
  { id: 'cat-educacao', nome: 'Educação', tipo: 'despesa', icone: 'GraduationCap', cor: '#3B82F6', categoriaPaiId: null, padrao: true, natureza: 'fixo', essencialidade: 'necessidade' },
  { id: 'cat-assinaturas', nome: 'Assinaturas', tipo: 'despesa', icone: 'Repeat', cor: '#EF4444', categoriaPaiId: null, padrao: true, natureza: 'fixo', essencialidade: 'desejo' },
  { id: 'cat-outros-despesa', nome: 'Outros', tipo: 'despesa', icone: 'MoreHorizontal', cor: '#64748B', categoriaPaiId: null, padrao: true, natureza: 'variavel', essencialidade: 'desejo' },
  { id: 'cat-salario', nome: 'Salário', tipo: 'receita', icone: 'Landmark', cor: '#22C55E', categoriaPaiId: null, padrao: true },
  { id: 'cat-freelance', nome: 'Freelance', tipo: 'receita', icone: 'Briefcase', cor: '#00D4FF', categoriaPaiId: null, padrao: true },
  { id: 'cat-investimentos-receita', nome: 'Rendimentos', tipo: 'receita', icone: 'TrendingUp', cor: '#8B5CF6', categoriaPaiId: null, padrao: true },
  { id: 'cat-outros-receita', nome: 'Outros', tipo: 'receita', icone: 'MoreHorizontal', cor: '#64748B', categoriaPaiId: null, padrao: true },
]
