import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, ChevronLeft, Newspaper, Zap, ExternalLink } from 'lucide-react'
import { getIcon } from '@/components/Icon'
import DonutChart from '@/components/DonutChart'
import { DICAS_POR_CLASSE, CARTEIRAS_RECOMENDADAS, RELATORIO_SEMANA, CHECKLISTS_AVANCADOS } from '@banco-de-dados/investidor/dicas'

export default function InvestidorPage() {
  const navigate = useNavigate()
  const [secao, setSecao] = useState<'dicas' | 'carteiras' | 'relatorio' | 'avancado'>('dicas')
  const [classeExpandida, setClasseExpandida] = useState<string | null>(null)
  const [checklistExpandido, setChecklistExpandido] = useState<string | null>(null)

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Início
      </button>

      <h1 className="text-xl font-display font-extrabold text-white">Área do Investidor</h1>
      <p className="text-xs text-slate-500 mt-1 mb-4.5">Para quem já domina o básico e quer ideias práticas</p>

      <div className="flex gap-1.5 mb-5 overflow-x-auto no-scrollbar">
        <SubTab label="Dicas por classe" active={secao === 'dicas'} onClick={() => setSecao('dicas')} />
        <SubTab label="Carteiras" active={secao === 'carteiras'} onClick={() => setSecao('carteiras')} />
        <SubTab label="Relatório" active={secao === 'relatorio'} onClick={() => setSecao('relatorio')} />
        <SubTab label="Avançado" active={secao === 'avancado'} onClick={() => setSecao('avancado')} />
      </div>

      {secao === 'dicas' && (
        <div className="flex flex-col gap-2.5">
          {DICAS_POR_CLASSE.map((classe) => {
            const aberta = classeExpandida === classe.id
            const Icon = getIcon(classe.iconName, BarChart3)
            return (
              <div key={classe.id} className="rounded-[18px] card-surface overflow-hidden">
                <button
                  onClick={() => setClasseExpandida(aberta ? null : classe.id)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center shrink-0" style={{ background: `${classe.cor}1A` }}>
                    <Icon size={18} style={{ color: classe.cor }} />
                  </div>
                  <span className="text-[13.5px] font-bold text-white flex-1">{classe.nome}</span>
                  <motion.span animate={{ rotate: aberta ? 90 : 0 }} style={{ color: classe.cor }} className="text-sm">
                    ▸
                  </motion.span>
                </button>
                <AnimatePresence>
                  {aberta && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-3.5 pb-4">
                        {classe.teses ? (
                          <div className="flex flex-col gap-3">
                            {classe.teses.map((t, i) => (
                              <div key={i} className="p-3.5 rounded-2xl bg-black/20 border border-border">
                                <p className="text-xs font-bold mb-1.5" style={{ color: classe.cor }}>
                                  {t.titulo}
                                </p>
                                <p className="text-xs text-slate-200 mb-2 leading-relaxed">{t.ideia}</p>
                                <p className="text-[11px] text-slate-400 mb-1">
                                  <strong className="text-slate-300">Por que agora:</strong> {t.porque}
                                </p>
                                <p className="text-[11px] text-slate-400 mb-1">
                                  <strong className="text-slate-300">Riscos:</strong> {t.riscos}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  <strong className="text-slate-300">Acompanhe:</strong> {t.indicadores}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-300 leading-relaxed">{classe.texto}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

      {secao === 'carteiras' && (
        <div className="flex flex-col gap-3.5">
          {CARTEIRAS_RECOMENDADAS.map((c) => (
            <div key={c.id} className="rounded-[18px] card-surface p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-display font-bold text-white">{c.nome}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: c.cor, background: `${c.cor}1A` }}>
                  {c.perfil}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-400 mb-3.5">{c.foco}</p>
              <div className="flex items-center gap-4">
                <DonutChart dados={c.alocacao} size={92} />
                <div className="flex flex-col gap-1.5 flex-1">
                  {c.alocacao.map((a, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-[3px]" style={{ background: a.cor }} />
                        <span className="text-[11px] text-slate-300">{a.classe}</span>
                      </div>
                      <span className="text-[11px] font-bold text-white">{a.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {secao === 'relatorio' && (
        <div className="flex flex-col gap-4">
          <div className="rounded-[18px] card-surface p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Newspaper size={15} className="text-accent-cyan" />
              <p className="text-[13px] font-bold text-white">Relatório da Semana</p>
            </div>
            <RelatorioBloco titulo="O que moveu o mercado" texto={RELATORIO_SEMANA.moveu} />
            <RelatorioBloco titulo="O que olhar na próxima semana" texto={RELATORIO_SEMANA.proximaSemana} />
            <RelatorioBloco titulo="Tese em destaque" texto={RELATORIO_SEMANA.teseDestaque} />
            <div className="mt-1">
              <p className="text-[11px] font-bold text-accent-gold mb-1">CONCEITO DA SEMANA: {RELATORIO_SEMANA.conceito.termo.toUpperCase()}</p>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">{RELATORIO_SEMANA.conceito.explicacao}</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl border border-dashed border-border text-center">
            <p className="text-[11.5px] text-slate-500">Relatórios anteriores aparecerão aqui conforme forem publicados</p>
          </div>
        </div>
      )}

      {secao === 'avancado' && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 px-1 mb-1">
            <Zap size={13} className="text-accent-gold" />
            <p className="text-[11px] text-slate-500">Referência rápida — direto ao ponto, sem introdução didática</p>
          </div>
          {CHECKLISTS_AVANCADOS.map((c) => {
            const aberto = checklistExpandido === c.id
            const Icon = getIcon(c.iconName, BarChart3)
            return (
              <div key={c.id} className="rounded-[18px] card-surface overflow-hidden">
                <button
                  onClick={() => setChecklistExpandido(aberto ? null : c.id)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.cor}1A` }}>
                    <Icon size={18} style={{ color: c.cor }} />
                  </div>
                  <span className="text-[13px] font-bold text-white flex-1 leading-snug">{c.titulo}</span>
                  <motion.span animate={{ rotate: aberto ? 90 : 0 }} style={{ color: c.cor }} className="text-sm shrink-0">
                    ▸
                  </motion.span>
                </button>
                <AnimatePresence>
                  {aberto && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-3.5 pb-4 flex flex-col gap-2">
                        {c.itens.map((item, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: c.cor }} />
                            <p className="text-[11.5px] text-slate-300 leading-relaxed">{item}</p>
                          </div>
                        ))}
                        {c.moduloRelacionado && (
                          <button
                            onClick={() => navigate(`/modulo/${c.moduloRelacionado}`)}
                            className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold"
                            style={{ color: c.cor }}
                          >
                            <ExternalLink size={12} /> Ver módulo completo
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-6 p-3.5 rounded-2xl bg-slate-500/5 border border-border">
        <p className="text-[10.5px] text-slate-500 leading-relaxed text-center">
          Conteúdo educacional. Não constitui recomendação de investimento. Rentabilidade passada não garante resultados futuros.
        </p>
      </div>
    </div>
  )
}

function SubTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 h-8 px-3 rounded-xl text-[11.5px] font-semibold whitespace-nowrap"
      style={{ background: active ? '#00D4FF' : '#0E1526', color: active ? '#04070D' : '#94A3B8', border: `1px solid ${active ? '#00D4FF' : '#1C2740'}` }}
    >
      {label}
    </button>
  )
}

function RelatorioBloco({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="mb-3.5">
      <p className="text-[11px] font-bold text-accent-cyan mb-1">{titulo.toUpperCase()}</p>
      <p className="text-xs text-slate-300 leading-relaxed">{texto}</p>
    </div>
  )
}
