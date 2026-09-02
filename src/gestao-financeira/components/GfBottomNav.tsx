import { NavLink } from 'react-router-dom'
import { Home, ListChecks, BarChart3, Settings } from 'lucide-react'
import GfBotaoAcaoRapida from './GfBotaoAcaoRapida'

// Barra de navegação própria da Gestão Financeira — não tem nenhuma relação
// com a <BottomNav /> do app principal (troca completa, como pedido).
// Réplica 1:1 da foto de referência: barra em formato de cápsula flutuante
// com margem lateral e cantos bem arredondados; item ativo com ícone e texto
// em ciano (só contorno, sem preenchimento) + barrinha fina em gradiente
// alinhada embaixo do ícone; itens inativos em cinza claro quase branco;
// botão central é o <GfBotaoAcaoRapida /> (menu radial de ações).
const ITEMS_ESQUERDA = [
  { to: '/gestao-financeira', label: 'Início', Icon: Home, fim: true },
  { to: '/gestao-financeira/lancamentos', label: 'Lançamentos', Icon: ListChecks, fim: false },
]

const ITEMS_DIREITA = [
  { to: '/gestao-financeira/relatorios', label: 'Relatórios', Icon: BarChart3, fim: false },
  { to: '/gestao-financeira/mais', label: 'Configurações', Icon: Settings, fim: false, comBadge: true },
]

export default function GfBottomNav() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[456px] z-50 bottom-[calc(12px+env(safe-area-inset-bottom))]">
      <nav
        className="rounded-[28px] bg-[#0B1120]/95 backdrop-blur-lg border border-white/5 shadow-2xl"
        aria-label="Navegação da Gestão Financeira"
      >
        <ul className="flex items-stretch justify-between px-2">
          {ITEMS_ESQUERDA.map((item) => (
            <ItemNav key={item.to} {...item} />
          ))}

          <li className="flex-1 flex items-center justify-center">
            <GfBotaoAcaoRapida />
          </li>

          {ITEMS_DIREITA.map((item) => (
            <ItemNav key={item.to} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  )
}

function ItemNav({
  to,
  label,
  Icon,
  fim,
  comBadge,
}: {
  to: string
  label: string
  Icon: typeof Home
  fim: boolean
  comBadge?: boolean
}) {
  return (
    <li className="flex-1">
      <NavLink to={to} end={fim} className="relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[52px]">
        {({ isActive }) => (
          <>
            <span className="relative flex items-center justify-center">
              <Icon size={18} strokeWidth={isActive ? 2.1 : 1.7} className={isActive ? 'text-accent-cyan' : 'text-slate-300'} />
              {comBadge && !isActive && <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-accent-red" />}
            </span>
            <span className={`text-[9.5px] font-medium tracking-wide whitespace-nowrap ${isActive ? 'text-accent-cyan' : 'text-slate-300'}`}>
              {label}
            </span>
            {isActive && (
              <span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-7 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #00D4FF, #3B82F6)' }}
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  )
}
