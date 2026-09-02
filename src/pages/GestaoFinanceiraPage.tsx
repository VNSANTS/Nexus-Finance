import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Wallet2, TrendingUp, Sparkles, Construction } from 'lucide-react'

// Tela inicial da futura área de Gestão Financeira pessoal — acompanhamento
// de gastos com dicas contextuais baseadas no progresso do usuário no app.
// Por enquanto é só a porta de entrada; a funcionalidade completa (lançar
// gastos, categorias, dicas dinâmicas) ainda está em desenho.
export default function GestaoFinanceiraPage() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Início
      </button>

      <div className="flex items-center gap-3 mb-1">
        <div className="w-11 h-11 rounded-2xl bg-accent-green/15 flex items-center justify-center">
          <Wallet2 size={22} className="text-accent-green" />
        </div>
        <div>
          <h1 className="text-xl font-display font-extrabold text-white">Gestão Financeira</h1>
          <p className="text-xs text-slate-500">Acompanhe seus gastos, no seu ritmo</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-3xl p-6 text-center flex flex-col items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #22C55E14, #00D4FF14)', border: '1px solid #22C55E33' }}
      >
        <div className="w-14 h-14 rounded-2xl bg-accent-green/15 flex items-center justify-center">
          <Construction size={26} className="text-accent-green" />
        </div>
        <h2 className="text-base font-display font-extrabold text-white">Em construção</h2>
        <p className="text-[13px] text-slate-400 leading-relaxed max-w-[280px]">
          Aqui você vai poder registrar seus gastos com liberdade total — sem categorias fixas, no seu jeito — e receber
          dicas com base no que você já estudou nas trilhas do Nexus Finance.
        </p>
      </motion.div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-3 card-surface rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-accent-cyan/15 flex items-center justify-center shrink-0">
            <TrendingUp size={17} className="text-accent-cyan" />
          </div>
          <p className="text-[12.5px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Liberdade total.</span> Você registra do seu jeito, sem regras
            rígidas de categoria impostas pelo app.
          </p>
        </div>
        <div className="flex items-center gap-3 card-surface rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-accent-gold/15 flex items-center justify-center shrink-0">
            <Sparkles size={17} className="text-accent-gold" />
          </div>
          <p className="text-[12.5px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Dicas contextuais.</span> Conforme você avança nas trilhas, o
            app conecta o que você aprendeu com seus próprios gastos.
          </p>
        </div>
      </div>
    </div>
  )
}
