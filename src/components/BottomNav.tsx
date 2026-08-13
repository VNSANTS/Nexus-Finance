import { NavLink } from 'react-router-dom'
import { Home, GraduationCap, LineChart, Wallet, User, BookMarked } from 'lucide-react'
import { motion } from 'framer-motion'

const ITEMS = [
  { to: '/', label: 'Início', Icon: Home },
  { to: '/aprender', label: 'Aprender', Icon: GraduationCap },
  { to: '/mercado', label: 'Mercado', Icon: LineChart },
  { to: '/biblioteca', label: 'Biblioteca', Icon: BookMarked },
  { to: '/carteira', label: 'Carteira', Icon: Wallet },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50
                 bg-bg-card/95 backdrop-blur-lg border-t border-border
                 pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegação principal"
    >
      <ul className="flex items-stretch justify-between px-1">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className="relative flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-accent-cyan shadow-glow"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    className={isActive ? 'text-accent-cyan' : 'text-slate-400'}
                  />
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
