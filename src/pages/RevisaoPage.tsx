import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, RotateCw, CheckCircle2 } from 'lucide-react'
import { useUserProgress } from '@/hooks/useUserProgress'
import type { ItemRevisao } from '@/types'

export default function RevisaoPage() {
  const navigate = useNavigate()
  const { progress, removerItemRevisao } = useUserProgress()

  const flashcardsErrados = progress.itensRevisao.filter((i) => i.tipo === 'flashcard')
  const quizErrados = progress.itensRevisao.filter((i) => i.tipo === 'quiz')

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Início
      </button>

      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-[42px] h-[42px] rounded-2xl bg-accent-pink/10 flex items-center justify-center">
          <RotateCw size={20} className="text-accent-pink" />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white">Revisar</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">{progress.itensRevisao.length} itens de todos os seus módulos</p>
        </div>
      </div>

      {progress.itensRevisao.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <CheckCircle2 size={32} className="text-accent-green mx-auto mb-2.5" />
          <p className="text-[13px]">Tudo revisado! Nenhum item pendente.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5.5 mt-5">
          {flashcardsErrados.length > 0 && (
            <section>
              <p className="text-[11.5px] font-bold text-slate-400 mb-2.5 tracking-wide">FLASHCARDS · {flashcardsErrados.length}</p>
              <div className="flex flex-col gap-2.5">
                {flashcardsErrados.map((item) => (
                  <RevisaoItem key={item.id} item={item} navigate={navigate} onRemover={() => removerItemRevisao(item.id, 'flashcard')} />
                ))}
              </div>
            </section>
          )}

          {quizErrados.length > 0 && (
            <section>
              <p className="text-[11.5px] font-bold text-slate-400 mb-2.5 tracking-wide">PERGUNTAS DE QUIZ · {quizErrados.length}</p>
              <div className="flex flex-col gap-2.5">
                {quizErrados.map((item) => (
                  <RevisaoItem key={item.id} item={item} navigate={navigate} onRemover={() => removerItemRevisao(item.id, 'quiz')} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

function RevisaoItem({ item, navigate, onRemover }: { item: ItemRevisao; navigate: (p: string) => void; onRemover: () => void }) {
  const [expandido, setExpandido] = useState(false)
  const titulo = item.tipo === 'flashcard' ? item.card?.frente : item.pergunta?.pergunta
  const detalhe = item.tipo === 'flashcard' ? item.card?.verso : item.pergunta?.explicacao
  // Itens vindos do Desafio Diário usam um moduloId sintético — não existe
  // rota /modulo/desafio-diario, então o botão de origem aponta para lá.
  const ehDesafio = item.moduloId === 'desafio-diario'
  const destinoOrigem = ehDesafio ? '/desafio-diario' : `/modulo/${item.moduloId}`
  const rotuloOrigem = ehDesafio ? 'Ver desafio diário' : 'Ir para o módulo'

  return (
    <div className="rounded-2xl card-surface overflow-hidden">
      <button onClick={() => setExpandido((e) => !e)} className="w-full p-3.5 text-left">
        <p className="text-[10px] text-accent-cyan font-semibold">{item.moduloTitulo}</p>
        <p className="text-[13px] font-semibold text-white mt-1 leading-snug">{titulo}</p>
      </button>
      <AnimatePresence>
        {expandido && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-3.5 pb-3.5">
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{detalhe}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(destinoOrigem)}
                  className="flex-1 h-9 rounded-[11px] bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-semibold"
                >
                  {rotuloOrigem}
                </button>
                <button onClick={onRemover} className="flex-1 h-9 rounded-[11px] bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold">
                  Já sei isso
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
