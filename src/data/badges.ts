import type { Badge } from '@/types'

// Condições reais verificadas em código — contador nunca hardcoded.
export const BADGES: Badge[] = [
  { id: 'primeira-licao', nome: 'Primeira Lição', descricao: 'Complete seu primeiro módulo', iconName: 'Star', cor: '#00D4FF', condicao: (s) => s.modulosCompletos >= 1 },
  { id: 'streak-7', nome: '7 dias seguidos', descricao: 'Mantenha uma sequência de 7 dias', iconName: 'Flame', cor: '#FFC93C', condicao: (s) => s.streak >= 7 },
  { id: 'streak-30', nome: '30 dias seguidos', descricao: 'Um mês inteiro sem falhar', iconName: 'Flame', cor: '#EF4444', condicao: (s) => s.streak >= 30 },
  { id: 'quiz-10-seguidos', nome: '10 acertos seguidos', descricao: 'Acerte 10 perguntas de quiz seguidas', iconName: 'Target', cor: '#22C55E', condicao: (s) => s.maiorSequenciaAcertos >= 10 },
  { id: 'trilha-completa', nome: 'Trilha 100%', descricao: 'Complete todos os módulos de uma trilha', iconName: 'Trophy', cor: '#8B5CF6', condicao: (s) => s.trilhasCompletas >= 1 },
  { id: 'revisor', nome: 'Revisor Dedicado', descricao: 'Revise 5 itens pendentes', iconName: 'RotateCw', cor: '#EC4899', condicao: (s) => s.itensRevisados >= 5 },
  { id: 'leitor', nome: 'Leitor Voraz', descricao: 'Abra 3 resumos de livros na Biblioteca', iconName: 'BookMarked', cor: '#FFC93C', condicao: (s) => s.livrosAbertos >= 3 },
  { id: 'nivel-4', nome: 'Estrategista', descricao: 'Alcance o nível 4 (Estrategista)', iconName: 'Zap', cor: '#3B82F6', condicao: (s) => s.nivel >= 4 },
  { id: 'calculista', nome: 'Calculista', descricao: 'Use 3 calculadoras diferentes', iconName: 'Calculator', cor: '#00D4FF', condicao: (s) => s.calculadorasUsadas >= 3 },
  { id: 'explorador', nome: 'Explorador de Carteiras', descricao: 'Veja os 3 perfis de carteira', iconName: 'Wallet', cor: '#22C55E', condicao: (s) => s.perfisCarteiraVistos >= 3 },
  { id: 'desafiante', nome: 'Desafiante', descricao: 'Complete seu primeiro desafio diário', iconName: 'Zap', cor: '#FFC93C', condicao: (s) => s.desafiosCompletos >= 1 },
  { id: 'primeiro-xp', nome: '100 XP', descricao: 'Acumule 100 XP', iconName: 'Star', cor: '#00D4FF', condicao: (s) => s.xp >= 100 },
]
