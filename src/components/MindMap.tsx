import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MindMapNode } from '@/types'

interface MindMapProps {
  data: MindMapNode
}

export default function MindMap({ data }: MindMapProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [expandedFilhos, setExpandedFilhos] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleFilho(key: string) {
    setExpandedFilhos((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* Nó central */}
      <div
        className="px-5 py-3 rounded-2xl font-display font-bold text-[15px] text-white text-center
                   bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 border border-accent-cyan/40 shadow-glow max-w-[260px] flex flex-col gap-1"
      >
        <span>{data.label}</span>
        {data.subtitulo && <span className="text-[10.5px] font-normal text-slate-300 leading-snug">{data.subtitulo}</span>}
      </div>

      <div className="w-px h-4 bg-border" />

      {/* Ramos */}
      <div className="w-full flex flex-col gap-2.5">
        {data.ramos.map((ramo) => (
          <div key={ramo.id}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(ramo.id)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl card-surface"
              style={{ borderColor: `${ramo.cor}55` }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ramo.cor }} />
                <div className="text-left min-w-0">
                  <span className="text-[13px] font-semibold text-white block">{ramo.label}</span>
                  {ramo.resumo && <span className="text-[10.5px] text-slate-500 block truncate">{ramo.resumo}</span>}
                </div>
              </div>
              <motion.span animate={{ rotate: expanded.has(ramo.id) ? 90 : 0 }} className="text-slate-500 text-sm shrink-0 ml-2">
                ▸
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {expanded.has(ramo.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 pt-2 pb-1 flex flex-col gap-1.5 border-l-2 ml-4" style={{ borderColor: `${ramo.cor}33` }}>
                    {ramo.filhos.map((filhoRaw, i) => {
                      // Normaliza: string simples vira objeto sem desc/netos
                      const filho = typeof filhoRaw === 'string' ? { label: filhoRaw, desc: undefined, netos: undefined } : filhoRaw
                      const filhoKey = `${ramo.id}-${i}`
                      const temNetos = filho.netos && filho.netos.length > 0
                      const temConteudo = Boolean(filho.desc) || Boolean(temNetos)
                      const filhoAberto = expandedFilhos.has(filhoKey)
                      return (
                        <div key={i}>
                          <button
                            onClick={() => temConteudo && toggleFilho(filhoKey)}
                            className="w-full px-3.5 py-2 rounded-xl bg-bg-card/60 border border-border text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[12.5px] font-medium text-slate-200">{filho.label}</span>
                              {temConteudo && (
                                <motion.span animate={{ rotate: filhoAberto ? 90 : 0 }} className="text-slate-600 text-xs shrink-0 ml-2">
                                  ▸
                                </motion.span>
                              )}
                            </div>
                            {filho.desc && filhoAberto && <p className="text-[11px] text-slate-500 mt-1 leading-snug">{filho.desc}</p>}
                          </button>
                          {temNetos && (
                            <AnimatePresence>
                              {filhoAberto && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-3.5 pt-1.5 pb-0.5 flex flex-col gap-1.5 border-l border-border/60 ml-2 mt-1.5">
                                    {filho.netos!.map((neto, j) => (
                                      <div key={j} className="px-3 py-1.5 rounded-lg bg-black/20">
                                        <span className="text-[11px] font-medium text-slate-300 block">{neto.label}</span>
                                        <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">{neto.desc}</p>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
