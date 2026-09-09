import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Gauge, Zap } from 'lucide-react'
import { MODELOS, ESFORCOS, lerPreferenciasModelo, salvarPreferenciasModelo, type ModeloNexusAI, type EsforcoNexusAI } from './preferenciasModelo'

export default function NexusAIConfiguracoes({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const [prefs, setPrefs] = useState(lerPreferenciasModelo)

  function escolherModelo(modelo: ModeloNexusAI) {
    const nova = { ...prefs, modelo }
    setPrefs(nova)
    salvarPreferenciasModelo(nova)
  }
  function escolherEsforco(esforco: EsforcoNexusAI) {
    const nova = { ...prefs, esforco }
    setPrefs(nova)
    salvarPreferenciasModelo(nova)
  }

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-end"
          onClick={onFechar}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-bg border-t border-border rounded-t-[24px] max-h-[75%] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
              <p className="text-[13.5px] font-bold text-texto">Configurações do Nexus AI</p>
              <button onClick={onFechar} className="text-texto-secundario p-1.5" aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-4 flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Zap size={13} className="text-accent-cyan" />
                  <p className="text-[11.5px] font-bold text-texto-secundario uppercase tracking-wide">Modelo</p>
                </div>
                <div className="flex flex-col gap-2">
                  {MODELOS.map((m) => (
                    <OpcaoConfig key={m.id} selecionado={prefs.modelo === m.id} label={m.label} descricao={m.descricao} onClick={() => escolherModelo(m.id)} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Gauge size={13} className="text-accent-cyan" />
                  <p className="text-[11.5px] font-bold text-texto-secundario uppercase tracking-wide">Esforço (velocidade de entrega)</p>
                </div>
                <div className="flex flex-col gap-2">
                  {ESFORCOS.map((e) => (
                    <OpcaoConfig key={e.id} selecionado={prefs.esforco === e.id} label={e.label} descricao={e.descricao} onClick={() => escolherEsforco(e.id)} />
                  ))}
                </div>
              </div>

              <p className="text-[10.5px] text-texto-secundario leading-snug px-0.5">
                Modelos e níveis mais rápidos respondem antes, mas pensam menos — pra perguntas simples isso quase não muda a qualidade da resposta. Vale a pena testar.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function OpcaoConfig({ selecionado, label, descricao, onClick }: { selecionado: boolean; label: string; descricao: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left ${
        selecionado ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border bg-bg-card'
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-texto">{label}</p>
        <p className="text-[11px] text-texto-secundario">{descricao}</p>
      </div>
      {selecionado && <Check size={16} className="text-accent-cyan shrink-0" />}
    </button>
  )
}
