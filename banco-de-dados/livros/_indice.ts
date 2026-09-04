export interface LivroMeta {
  id: string
  titulo: string
  autor: string
  cor: string
  categoria: 'educacao-financeira' | 'vendas-persuasao'
}

// Índice leve dos 19 livros (id, título, autor, cor, categoria) — carregado
// sempre, ao contrário do resumoCompleto de cada um (o mais pesado), que é
// carregado sob demanda só quando o usuário abre aquele livro específico.
// Mesmo padrão já usado em banco-de-dados/modulos.
export const LIVROS_META: LivroMeta[] = [
  { id: 'acoes-comuns-lucros-extraordinarios', titulo: "Ações Comuns e Lucros Extraordinários", autor: "Philip A. Fisher", cor: '#059669', categoria: 'educacao-financeira' },
  { id: 'bogleheads-guide-to-investing', titulo: "The Bogleheads Guide to Investing", autor: "Taylor Larimore, Mel Lindauer e Michael LeBoeuf", cor: '#7C3AED', categoria: 'educacao-financeira' },
  { id: 'habitos-atomicos', titulo: "Hábitos Atômicos", autor: "James Clear", cor: '#8B5CF6', categoria: 'educacao-financeira' },
  { id: 'homem-mais-rico-babilonia', titulo: "O Homem Mais Rico da Babilônia", autor: "George S. Clason", cor: '#D97706', categoria: 'educacao-financeira' },
  { id: 'i-will-teach-you-to-be-rich', titulo: "I Will Teach You to Be Rich", autor: "Ramit Sethi", cor: '#DB2777', categoria: 'educacao-financeira' },
  { id: 'investidor-inteligente', titulo: "O Investidor Inteligente", autor: "Benjamin Graham", cor: '#0EA5E9', categoria: 'educacao-financeira' },
  { id: 'liberdade-financeira-sabatier', titulo: "Liberdade Financeira", autor: "Grant Sabatier", cor: '#F59E0B', categoria: 'educacao-financeira' },
  { id: 'milionario-mora-ao-lado', titulo: "O Milionário Mora ao Lado", autor: "Thomas J. Stanley e William D. Danko", cor: '#64748B', categoria: 'educacao-financeira' },
  { id: 'mulheres-e-dinheiro', titulo: "Mulheres e Dinheiro", autor: "Suze Orman", cor: '#E11D48', categoria: 'educacao-financeira' },
  { id: 'pai-rico-pai-pobre', titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", cor: '#FFC93C', categoria: 'educacao-financeira' },
  { id: 'pense-e-enriqueca', titulo: "Pense e Enriqueça", autor: "Napoleon Hill", cor: '#EAB308', categoria: 'educacao-financeira' },
  { id: 'psicologia-do-dinheiro-livro', titulo: "A Psicologia do Dinheiro", autor: "Morgan Housel", cor: '#0891B2', categoria: 'educacao-financeira' },
  { id: 'quit-like-a-millionaire', titulo: "Quit Like a Millionaire", autor: "Kristy Shen e Bryce Leung", cor: '#0D9488', categoria: 'educacao-financeira' },
  { id: 'random-walk-wall-street', titulo: "Um Passeio Aleatório por Wall Street", autor: "Burton G. Malkiel", cor: '#6366F1', categoria: 'educacao-financeira' },
  { id: 'rapido-e-devagar', titulo: "Rápido e Devagar: Duas Formas de Pensar", autor: "Daniel Kahneman", cor: '#DC2626', categoria: 'educacao-financeira' },
  { id: 'segredos-mente-milionaria', titulo: "Os Segredos da Mente Milionária", autor: "T. Harv Eker", cor: '#F97316', categoria: 'educacao-financeira' },
  { id: 'seu-dinheiro-ou-sua-vida', titulo: "Seu Dinheiro ou Sua Vida", autor: "Vicki Robin e Joe Dominguez", cor: '#14B8A6', categoria: 'educacao-financeira' },
  { id: 'the-go-giver', titulo: "The Go-Giver", autor: "Bob Burg e John David Mann", cor: '#EC4899', categoria: 'educacao-financeira' },
  { id: 'total-money-makeover', titulo: "The Total Money Makeover", autor: "Dave Ramsey", cor: '#DC2626', categoria: 'educacao-financeira' },
]
