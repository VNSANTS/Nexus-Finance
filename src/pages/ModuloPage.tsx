import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Clock, CheckCircle2, Circle, Calculator, ArrowRight, BookOpen, Zap, GitCompare, ArrowUpRight } from 'lucide-react'
import { carregarModulo } from '@banco-de-dados/modulos'
import { useUserProgress } from '@/hooks/useUserProgress'
import { TODAS_ABAS, ABAS_MARCAVEIS, XP_POR_ABA, CORES_NIVEL, LABELS_NIVEL } from '@/types'
import type { NomeAba, Modulo, Flashcard, QuizQuestion } from '@/types'
import FlipCard from '@/components/FlipCard'
import MindMap from '@/components/MindMap'
import QuizInline from '@/components/QuizInline'

export default function ModuloPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    progress,
    concluirAba,
    isModuloCompleto,
    marcarFlashcardErrado,
    marcarFlashcardAcertado,
    marcarQuizErrado,
    registrarAcertoQuiz,
    ganharXp,
    perderXp,
  } = useUserProgress()
  const [tab, setTab] = useState<NomeAba>('Aprender')
  const [celebrar, setCelebrar] = useState<{ xp: number; bonus: string | null; completo: boolean } | null>(null)
  // undefined = ainda carregando | null = não existe conteúdo para este id
  const [modulo, setModulo] = useState<Modulo | null | undefined>(undefined)

  useEffect(() => {
    if (!id) {
      setModulo(null)
      return
    }
    let ativo = true
    setModulo(undefined)
    setTab('Aprender')
    carregarModulo(id).then((m) => {
      if (ativo) setModulo(m)
    })
    return () => {
      ativo = false
    }
  }, [id])

  // Volta para o topo ao trocar de aba — sem isso, quem estava no fim da aba
  // Aprender caía no meio do quiz ao mudar para Teste.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [tab])

  if (modulo === undefined && id) {
    return (
      <div className="px-4 pt-6 flex flex-col gap-3" aria-busy="true" aria-label="Carregando módulo">
        <div className="h-5 w-24 rounded bg-bg-card animate-pulse" />
        <div className="h-6 w-3/4 rounded bg-bg-card animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-bg-card animate-pulse" />
        <div className="h-24 w-full rounded-card bg-bg-card animate-pulse mt-3" />
        <div className="h-40 w-full rounded-card bg-bg-card animate-pulse" />
      </div>
    )
  }

  if (!modulo || !id) {
    return (
      <div className="px-4 pt-16 text-center">
        <p className="text-slate-400 text-sm">Este módulo ainda não tem conteúdo completo.</p>
        <p className="text-slate-500 text-xs mt-1">Ele chega em breve — siga acompanhando o progresso do projeto.</p>
        <button onClick={() => navigate('/aprender')} className="mt-6 text-accent-cyan text-sm font-semibold">
          Voltar para Aprender
        </button>
      </div>
    )
  }

  const abasConcluidasDoModulo = progress.abasConcluidas[id] || []
  const totalConcluidas = abasConcluidasDoModulo.length
  const moduloCompleto = isModuloCompleto(id)

  function marcarAba(aba: NomeAba) {
    if (abasConcluidasDoModulo.includes(aba)) return
    const resultado = concluirAba(id!, aba)
    const ficouCompleto = totalConcluidas + 1 === TODAS_ABAS.length
    setCelebrar({ xp: resultado?.xpFinal ?? XP_POR_ABA, bonus: resultado?.bonusAplicado ?? null, completo: ficouCompleto })
    setTimeout(() => setCelebrar(null), 2600)
  }

  // O XP ganho/perdido pergunta a pergunta já foi aplicado dentro do QuizInline
  // (via onErrarPergunta/onAcertarPergunta abaixo). Aqui só falta o XP de conclusão
  // da aba "Teste" em si, igual às outras abas.
  function handleQuizComplete() {
    marcarAba('Teste')
  }

  return (
    <div className="pb-28 relative">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <button onClick={() => navigate('/aprender')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3">
          <ChevronLeft size={16} /> Aprender
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-display font-extrabold text-white leading-tight">{modulo.titulo}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{modulo.subtitulo}</p>
          </div>
          {moduloCompleto ? (
            <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-green/10 border border-accent-green/30">
              <CheckCircle2 size={13} className="text-accent-green" />
              <span className="text-[11px] font-semibold text-accent-green">Concluído</span>
            </div>
          ) : (
            <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg-card border border-border">
              <span className="text-[11px] font-semibold text-slate-400">
                {totalConcluidas}/{TODAS_ABAS.length} abas
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2 text-slate-500">
          <Clock size={12} />
          <span className="text-[11px]">{modulo.duracaoMin} min de conteúdo</span>
          {modulo.nivel && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1"
              style={{ color: CORES_NIVEL[modulo.nivel], background: `${CORES_NIVEL[modulo.nivel]}1A` }}
            >
              {LABELS_NIVEL[modulo.nivel]}
            </span>
          )}
        </div>
        <div className="h-1 rounded-full bg-border mt-2.5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${moduloCompleto ? 'bg-accent-green' : 'bg-accent-cyan'}`}
            animate={{ width: `${(totalConcluidas / TODAS_ABAS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 px-4 mb-5 overflow-x-auto no-scrollbar">
        {TODAS_ABAS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 h-9 rounded-full text-[12.5px] font-semibold transition-colors ${
              tab === t ? 'bg-accent-cyan text-bg' : 'bg-bg-card text-slate-400 border border-border'
            }`}
          >
            {abasConcluidasDoModulo.includes(t) && (
              <CheckCircle2 size={12} className={tab === t ? 'text-bg' : 'text-accent-green'} />
            )}
            {t}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="px-4">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {tab === 'Aprender' && <AprenderTab modulo={modulo} />}
            {tab === 'Mapa Mental' && <MindMap data={modulo.mapaMental} />}
            {tab === 'Simulação' && <SimulacaoTab simulacao={modulo.simulacao} />}
            {tab === 'Resumo' && (
              <ResumoTab
                cards={modulo.flashcards}
                moduloId={id}
                moduloTitulo={modulo.titulo}
                itensErradosDoModulo={progress.itensRevisao.filter((i) => i.moduloId === id && i.tipo === 'flashcard')}
                onErrado={(card) => marcarFlashcardErrado(id, modulo.titulo, card)}
                onAcertado={marcarFlashcardAcertado}
              />
            )}
            {tab === 'Teste' && (
              <QuizInline
                questions={modulo.quiz}
                onComplete={handleQuizComplete}
                onErrar={(pergunta, indice) => marcarQuizErrado(id, modulo.titulo, pergunta, indice)}
                onGanharXp={(xp) => ganharXp(xp)}
                onPerderXp={(xp) => perderXp(xp)}
                onAcertar={registrarAcertoQuiz}
              />
            )}
            {tab === 'FAQ' && <FaqTab faq={modulo.faq} proximoPasso={modulo.proximoPasso} />}

            {/* Botão de marcar aba concluída — todas exceto Teste, que é automático via quiz */}
            {ABAS_MARCAVEIS.includes(tab) && (
              <div className="mt-6">
                {abasConcluidasDoModulo.includes(tab) ? (
                  <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-accent-green/10 border border-accent-green/30">
                    <CheckCircle2 size={16} className="text-accent-green" />
                    <span className="text-[12.5px] font-semibold text-accent-green">Aba concluída</span>
                  </div>
                ) : (
                  <button
                    onClick={() => marcarAba(tab)}
                    className="w-full p-3.5 rounded-2xl card-surface text-slate-300 text-[12.5px] font-semibold flex items-center justify-center gap-2"
                  >
                    <Circle size={15} className="text-slate-500" />
                    Marcar como concluído (+{XP_POR_ABA} XP)
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Celebração */}
      <AnimatePresence>
        {celebrar && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl font-bold text-sm shadow-glow flex flex-col items-center gap-0.5 ${
              celebrar.completo ? 'bg-accent-gold text-bg' : 'bg-accent-green text-bg'
            }`}
          >
            <span>{celebrar.completo ? '🏆 Módulo 100% concluído!' : `✅ +${celebrar.xp} XP`}</span>
            {celebrar.bonus && <span className="text-[10px] font-semibold opacity-80">Bônus: {celebrar.bonus}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AprenderTab({ modulo }: { modulo: Modulo }) {
  const { aprender } = modulo
  return (
    <div className="flex flex-col gap-6 text-[13.5px] leading-relaxed text-slate-300">
      {modulo.objetivoAprendizagem && (
        <p className="text-[12.5px] text-accent-cyan italic -mb-2">{modulo.objetivoAprendizagem}</p>
      )}

      <Section title="O que é">
        <p>{aprender.oQueE}</p>
      </Section>

      <Section title="Por que importa">
        <p>{aprender.porQueImporta}</p>
      </Section>

      {modulo.numeroChave && (
        <div className="p-4 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/25 text-center">
          <p className="text-2xl font-display font-extrabold text-accent-cyan">{modulo.numeroChave.valor}</p>
          <p className="text-[11px] text-slate-400 mt-1">{modulo.numeroChave.legenda}</p>
        </div>
      )}

      {modulo.erroFatal && (
        <div className="p-3.5 rounded-2xl bg-accent-red/10 border border-accent-red/30">
          <p className="text-[11px] font-bold text-accent-red mb-1">ERRO FATAL</p>
          <p className="text-[12.5px] text-slate-200 leading-relaxed">{modulo.erroFatal}</p>
        </div>
      )}

      {aprender.livroRelacionado && (
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-accent-gold/10 border border-accent-gold/20">
          <BookOpen size={17} className="text-accent-gold shrink-0" />
          <p className="text-[11.5px] text-slate-200 leading-relaxed flex-1">{aprender.livroRelacionado.textoConexao}</p>
        </div>
      )}

      <Section title="Como funciona na prática no Brasil">
        <p>{aprender.naPratica}</p>
      </Section>

      {aprender.comparativo && (
        <Section title={aprender.comparativo.titulo}>
          <div className="rounded-2xl overflow-hidden border border-border">
            {aprender.comparativo.linhas.map((linha, i) => {
              // Parte do conteúdo já foi escrito no formato "A: texto | B: texto"
              // (uma comparação de dois cenários dentro do mesmo campo). Como
              // frase corrida isso ficava ilegível numa tela estreita — aqui
              // detectamos o padrão e quebramos em duas sublinhas próprias.
              const partes = linha.valor.split(' | ').map((p) => {
                const idx = p.indexOf(':')
                if (idx === -1) return { rotulo: null, texto: p.trim() }
                return { rotulo: p.slice(0, idx).trim(), texto: p.slice(idx + 1).trim() }
              })
              const ehComparacaoDupla = partes.length === 2 && partes.every((p) => p.rotulo)

              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 px-3.5 py-3 ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-card/50'} ${i > 0 ? 'border-t border-border' : ''}`}
                >
                  <span className="text-[11px] font-semibold text-accent-cyan uppercase tracking-wide">{linha.label}</span>
                  {ehComparacaoDupla ? (
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      {partes.map((p, j) => (
                        <div key={j} className="flex flex-col gap-0.5 pl-2.5 border-l-2" style={{ borderColor: j === 0 ? '#64748B44' : '#00D4FF44' }}>
                          <span className="text-[10px] font-semibold text-slate-500">{p.rotulo}</span>
                          <span className="text-[13px] font-medium text-white leading-snug">{p.texto}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[13.5px] font-medium text-white leading-snug">{linha.valor}</span>
                  )}
                </div>
              )
            })}
          </div>
        </Section>
      )}

      <Section title="Passo a passo acionável">
        <ol className="flex flex-col gap-2.5">
          {aprender.passoAPasso.map((passo, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-accent-cyan/15 text-accent-cyan text-[11px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>
      </Section>

      {aprender.naoConfundirCom && aprender.naoConfundirCom.length > 0 && (
        <Section title="Não confundir com">
          <div className="flex flex-col gap-2">
            {aprender.naoConfundirCom.map((n, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-bg-card border border-border">
                <GitCompare size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[12px] text-slate-400 leading-relaxed">{n.diferenca}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Erros comuns e como evitar">
        <ul className="flex flex-col gap-2.5">
          {aprender.errosComuns.map((erro, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="shrink-0 text-accent-red mt-0.5">✕</span>
              <span>{erro}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Checklist de ação">
        <div className="flex flex-col gap-2">
          {aprender.checklist.map((item, i) => (
            <label key={i} className="flex items-center gap-3 px-3.5 py-3 rounded-2xl card-surface cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-accent-cyan shrink-0" />
              <span className="text-[13px] text-slate-200">{item}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[14px] font-display font-bold text-white mb-2.5">{title}</h2>
      {children}
    </section>
  )
}

function SimulacaoTab({ simulacao }: { simulacao: Modulo['simulacao'] }) {
  const navigate = useNavigate()
  const [cenarioAtual, setCenarioAtual] = useState(0)
  const [resultadoCenario, setResultadoCenario] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      {simulacao.calculadoraRelacionada ? (
        <button
          onClick={() => navigate('/ferramentas')}
          className="w-full flex items-center gap-2.5 p-3.5 rounded-2xl bg-accent-gold/10 border border-accent-gold/30"
        >
          <Calculator size={19} className="text-accent-gold shrink-0" />
          <div className="flex-1 text-left">
            <p className="text-[11px] text-slate-400">Calculadora relacionada</p>
            <p className="text-[13.5px] font-bold text-white">{simulacao.calculadoraRelacionada}</p>
          </div>
          <ArrowRight size={17} className="text-accent-gold shrink-0" />
        </button>
      ) : (
        <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-accent-purple/10 border border-accent-purple/30">
          <Zap size={19} className="text-accent-purple shrink-0" />
          <p className="text-[12.5px] font-bold text-white">Cenário guiado — sem calculadora, é sobre decisão</p>
        </div>
      )}

      <p className="text-[13px] text-slate-300 leading-relaxed">{simulacao.intro}</p>

      <Section title="Como usar, passo a passo">
        <ol className="flex flex-col gap-2.5">
          {simulacao.passos.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-[12.5px] text-slate-300">
              <span className="shrink-0 w-5 h-5 rounded-full bg-accent-gold/20 text-accent-gold text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </Section>

      {simulacao.cenarioGuiado && simulacao.cenarioGuiado.length > 0 && (
        <Section title="Cenário guiado">
          <div className="p-3.5 rounded-2xl card-surface">
            <p className="text-[12.5px] font-semibold text-white mb-3">{simulacao.cenarioGuiado[cenarioAtual].pergunta}</p>
            {resultadoCenario === null ? (
              <div className="flex flex-col gap-2">
                {simulacao.cenarioGuiado[cenarioAtual].opcoes.map((op, i) => (
                  <button
                    key={i}
                    onClick={() => setResultadoCenario(op.resultado)}
                    className="text-left p-3 rounded-xl bg-bg-card border border-border text-[12px] text-slate-200"
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-[12px] text-slate-300 leading-relaxed mb-3">{resultadoCenario}</p>
                <button
                  onClick={() => {
                    setResultadoCenario(null)
                    setCenarioAtual((c) => (c + 1) % simulacao.cenarioGuiado!.length)
                  }}
                  className="text-[11.5px] text-accent-cyan font-semibold"
                >
                  Próximo cenário →
                </button>
              </div>
            )}
          </div>
        </Section>
      )}

      <div className="p-3.5 rounded-2xl card-surface">
        <p className="text-[11px] font-bold text-accent-cyan mb-1.5">EXEMPLO GUIADO</p>
        <p className="text-[12.5px] text-slate-300 leading-relaxed">{simulacao.exemploGuiado}</p>
      </div>
    </div>
  )
}

function ResumoTab({
  cards,
  moduloId,
  moduloTitulo,
  itensErradosDoModulo,
  onErrado,
  onAcertado,
}: {
  cards: Flashcard[]
  moduloId: string
  moduloTitulo: string
  itensErradosDoModulo: { id: string }[]
  onErrado: (card: Flashcard) => void
  onAcertado: (cardId: string) => void
}) {
  const [filtro, setFiltro] = useState<'tudo' | 'errados'>('tudo')
  const idsErrados = new Set(itensErradosDoModulo.map((i) => i.id))
  const cardsParaMostrar = filtro === 'errados' ? cards.filter((c) => idsErrados.has(c.id)) : cards

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setFiltro('tudo')}
          className={`flex-1 h-8 rounded-xl text-[11.5px] font-semibold ${filtro === 'tudo' ? 'bg-accent-pink text-white' : 'card-surface text-slate-400'}`}
        >
          Rever tudo
        </button>
        <button
          onClick={() => setFiltro('errados')}
          className={`flex-1 h-8 rounded-xl text-[11.5px] font-semibold ${filtro === 'errados' ? 'bg-accent-pink text-white' : 'card-surface text-slate-400'}`}
        >
          Rever só o que errei{idsErrados.size ? ` (${idsErrados.size})` : ''}
        </button>
      </div>

      <p className="text-xs text-slate-500 -mt-1">
        {filtro === 'errados' ? 'Revisão explicativa — reforço extra por aba' : 'Toque no card para virar. Marque se acertou.'}
      </p>

      {cards.length > 0 &&
        cardsParaMostrar.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            onMark={(acertou) => (acertou ? onAcertado(card.id) : onErrado(card))}
          />
        ))}
    </div>
  )
}

function FaqTab({ faq, proximoPasso }: { faq: Modulo['faq']; proximoPasso?: Modulo['proximoPasso'] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-2">
      {faq.map((item, i) => (
        <div key={i} className="rounded-2xl card-surface overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-3.5 text-left"
          >
            <span className="text-[13px] font-semibold text-white pr-3">{item.pergunta}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-accent-cyan text-lg font-light shrink-0">
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="text-[12.5px] text-slate-400 leading-relaxed px-3.5 pb-3.5">{item.resposta}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {proximoPasso && (
        <button
          onClick={() => navigate(`/modulo/${proximoPasso.moduloId}`)}
          className="flex items-center gap-3 p-3.5 rounded-2xl mt-2 text-left"
          style={{ background: '#00D4FF14', border: '1px solid #00D4FF44' }}
        >
          <ArrowUpRight size={18} className="text-accent-cyan shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] text-slate-400">Próximo passo sugerido</p>
            <p className="text-[12.5px] text-slate-200 mt-0.5 leading-snug">{proximoPasso.motivo}</p>
          </div>
        </button>
      )}
    </div>
  )
}
