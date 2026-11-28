import { NavLink } from 'react-router-dom'
import { Home, GraduationCap, LineChart, Wallet, User, BookMarked, LockKeyhole } from 'lucide-react'

const ITEMS = [
  { to: '/', label: 'Início', Icon: Home },
  { to: '/aprender', label: 'Aprender', Icon: GraduationCap },
  { to: '/mercado', label: 'Mercado', Icon: LineChart },
  { to: '/biblioteca', label: 'Biblioteca', Icon: BookMarked },
  { to: '/carteira', label: 'Carteira', Icon: Wallet },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

export default function BottomNav({ ehConvidado = false }: { ehConvidado?: boolean }) {
  return (
    <nav
      className="bottom-nav-glass nexus-bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50"
      aria-label="Navegação principal"
    >
      <ul className="flex items-stretch justify-between px-1">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className="nav-item relative flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} className={isActive ? 'text-accent-cyan' : 'text-slate-400'} />
                    {ehConvidado && to !== '/' && <LockKeyhole size={10} className="absolute -right-2 -top-1 text-[#00D4FF]" />}
                  </span>
                  <span
                    className={`text-[9px] font-medium tracking-wide whitespace-nowrap ${
                      isActive ? 'text-accent-cyan' : 'text-slate-500'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
