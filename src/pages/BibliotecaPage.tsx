import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search, BookMarked } from 'lucide-react'
import { LIVROS } from '@banco-de-dados/livros'
import { GLOSSARIO_TERMOS } from '@banco-de-dados/glossario/termos'
import { useUserProgress } from '@/hooks/useUserProgress'
import type { Livro } from '@/types'

export default function BibliotecaPage() {
  const navigate = useNavigate()
  const { registrarLivroAberto } = useUserProgress()
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null)

  function abrirLivro(livro: Livro) {
    setLivroSelecionado(livro)
    registrarLivroAberto(livro.id)
  }

  if (livroSelecionado) {
    return <LivroDetalhe livro={livroSelecionado} onBack={() => setLivroSelecionado(null)} />
  }

  return (
    <div className="px-4 pt-5 pb-28">
      <h1 className="text-xl font-display font-extrabold text-white">Biblioteca</h1>
      <p className="text-xs text-slate-500 mt-1 mb-4">Resumos de livros, biografias, casos e documentários</p>

      <button
        onClick={() => navigate('/glossario')}
        className="flex items-center gap-3 w-full p-3.5 mb-4.5 rounded-2xl"
        style={{ background: '#00D4FF14', border: '1px solid #00D4FF44' }}
      >
        <div className="w-[38px] h-[38px] rounded-xl bg-accent-cyan/20 flex items-center justify-center shrink-0">
          <Search size={17} className="text-accent-cyan" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[13px] font-bold text-white">Glossário Financeiro</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{GLOSSARIO_TERMOS.length} termos explicados de forma simples</p>
        </div>
        <ChevronRight size={16} className="text-accent-cyan" />
      </button>

      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
        <Chip label="Livros" active cor="#FFC93C" />
        <Chip label="Biografias" active={false} />
        <Chip label="Casos" active={false} />
        <Chip label="Documentários" active={false} />
      </div>

      <div className="flex flex-col gap-2.5">
        {LIVROS.map((livro) => (
          <motion.button
            key={livro.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => abrirLivro(livro)}
            className="flex items-center gap-3.5 card-surface rounded-[18px] p-3.5 text-left"
          >
            <div
              className="w-[46px] h-[60px] rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${livro.cor}44, ${livro.cor}11)`, border: `1px solid ${livro.cor}55` }}
            >
              <BookMarked size={20} style={{ color: livro.cor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-white leading-tight">{livro.titulo}</p>
              <p className="text-[11.5px] text-slate-500 mt-0.5">{livro.autor}</p>
              <p className="text-[10.5px] mt-1" style={{ color: livro.cor }}>
                5 ideias-chave
              </p>
            </div>
            <ChevronRight size={17} className="text-slate-500 shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function Chip({ label, active, cor }: { label: string; active: boolean; cor?: string }) {
  return (
    <button
      className="shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold border whitespace-nowrap"
      style={{
        background: active ? cor ?? '#00D4FF' : '#0E1526',
        borderColor: active ? cor ?? '#00D4FF' : '#1C2740',
        color: active ? '#04070D' : '#CBD5E1',
      }}
    >
      {label}
    </button>
  )
}

function LivroDetalhe({ livro, onBack }: { livro: Livro; onBack: () => void }) {
  const [resumoAberto, setResumoAberto] = useState(false)

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-4">
        <ChevronLeft size={16} /> Biblioteca
      </button>

      <div className="flex gap-3.5 mb-5">
        <div
          className="w-16 h-[84px] rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, ${livro.cor}44, ${livro.cor}11)`, border: `1px solid ${livro.cor}55` }}
        >
          <BookMarked size={26} style={{ color: livro.cor }} />
        </div>
        <div className="flex-1">
          <h1 className="text-[17px] font-display font-extrabold text-white leading-snug">{livro.titulo}</h1>
          <p className="text-xs text-slate-400 mt-1">{livro.autor}</p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl mb-5" style={{ background: `${livro.cor}14`, border: `1px solid ${livro.cor}44` }}>
        <p className="text-[11px] font-bold mb-1.5" style={{ color: livro.cor }}>
          PARA QUEM É
        </p>
        <p className="text-[12.5px] text-slate-200 leading-relaxed">{livro.paraQuem}</p>
      </div>

      <p className="text-[13px] font-bold text-white mb-3">5 ideias-chave</p>
      <div className="flex flex-col gap-2.5 mb-6">
        {livro.ideias.map((ideia, i) => (
          <div key={i} className="flex gap-2.5 p-3.5 rounded-2xl card-surface">
            <span
              className="shrink-0 w-[22px] h-[22px] rounded-full text-[11px] font-bold flex items-center justify-center"
              style={{ background: `${livro.cor}26`, color: livro.cor }}
            >
              {i + 1}
            </span>
            <span className="text-[12.5px] text-slate-300 leading-relaxed">{ideia}</span>
          </div>
        ))}
      </div>

      {livro.resumoCompleto.length > 0 && (
        <div>
          <button
            onClick={() => setResumoAberto((a) => !a)}
            className="flex items-center justify-between w-full p-3.5 rounded-2xl card-surface"
            style={{ borderColor: `${livro.cor}44` }}
          >
            <div className="flex items-center gap-2.5">
              <BookMarked size={16} style={{ color: livro.cor }} />
              <span className="text-[13px] font-bold text-white">Resumo completo do livro</span>
            </div>
            <motion.span animate={{ rotate: resumoAberto ? 90 : 0 }} style={{ color: livro.cor }} className="text-sm">
              ▸
            </motion.span>
          </button>
          <AnimatePresence>
            {resumoAberto && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="flex flex-col gap-4.5 pt-4.5">
                  {livro.resumoCompleto.map((s, i) => (
                    <div key={i}>
                      <h3 className="text-[13px] font-display font-bold mb-2" style={{ color: livro.cor }}>
                        {s.secao}
                      </h3>
                      <p className="text-[12.5px] text-slate-300 leading-[1.7]">{s.texto}</p>
                      {s.lista && s.lista.length > 0 && (
                        <ol className="mt-2.5 flex flex-col gap-2">
                          {s.lista.map((item, j) => (
                            <li key={j} className="flex gap-2.5 text-[12.5px] text-slate-300 leading-[1.6]">
                              <span
                                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold"
                                style={{ background: `${livro.cor}22`, color: livro.cor }}
                              >
                                {j + 1}
                              </span>
                              <span className="pt-px">{item}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                      {s.fechamento && (
                        <p className="text-[12.5px] text-slate-300 leading-[1.7] mt-2.5">{s.fechamento}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
