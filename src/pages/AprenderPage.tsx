import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle2, Circle, Clock, FileText, Lock, Search, X } from 'lucide-react'
import { getIcon } from '@/components/Icon'
import { TRILHAS, MODULOS, getModulosByTrilha } from '@banco-de-dados/modulos'
import { useUserProgress } from '@/hooks/useUserProgress'

export default function AprenderPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { progress, isModuloCompleto } = useUserProgress()

  const trilhaParam = searchParams.get('trilha')
  const moduloParam = searchParams.get('modulo')

  const [busca, setBusca] = useState('')
  const [trilhaAtiva, setTrilhaAtiva] = useState<string | null>(trilhaParam)
  // Cada trilha começa minimizada — só os módulos da(s) trilha(s) expandida(s)
  // aparecem, para a tela não ficar cheia de cara. A trilha vinda por link
  // direto (query param ?trilha=) já entra expandida.
  const [trilhasExpandidas, setTrilhasExpandidas] = useState<Set<string>>(
    () => new Set(trilhaParam ? [trilhaParam] : [])
  )

  function alternarTrilha(trilhaId: string) {
    setTrilhasExpandidas((prev) => {
      const novo = new Set(prev)
      if (novo.has(trilhaId)) novo.delete(trilhaId)
      else novo.add(trilhaId)
      return novo
    })
  }

  useEffect(() => {
    if (trilhaParam) {
      setTrilhaAtiva(trilhaParam)
      setTrilhasExpandidas((prev) => new Set(prev).add(trilhaParam))
    }
  }, [trilhaParam])

  useEffect(() => {
    if (moduloParam) navigate(`/modulo/${moduloParam}`)
  }, [moduloParam, navigate])

  const resultadosBusca = useMemo(() => {
    if (!busca.trim()) return null
    const q = busca.toLowerCase()
    return MODULOS.filter((m) => m.titulo.toLowerCase().includes(q))
  }, [busca])

  function selecionarTrilha(id: string | null) {
    setTrilhaAtiva(id)
    if (id) setSearchParams({ trilha: id })
    else setSearchParams({})
  }

  function statusModulo(moduloId: string): 'concluido' | 'disponivel' | 'bloqueado' {
    if (isModuloCompleto(moduloId)) return 'concluido'
    return 'disponivel'
  }

  return (
    <div className="px-4 pt-5 pb-28 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-display font-extrabold text-white">Aprender</h1>
        <p className="text-xs text-slate-500 mt-0.5">{MODULOS.length} módulos em {TRILHAS.length} trilhas — do zero ao avançado</p>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar módulo, ex: Tesouro Direto"
          className="w-full h-11 pl-10 pr-9 rounded-2xl bg-bg-card border border-border text-sm text-white
                     placeholder:text-slate-500 focus:border-accent-cyan/50 outline-none transition-colors"
        />
        {busca && (
          <button
            onClick={() => setBusca('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-label="Limpar busca"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {resultadosBusca ? (
        <BuscaResultados modulos={resultadosBusca} statusModulo={statusModulo} navigate={navigate} />
      ) : (
        <>
          {/* Chips de trilha */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            <Chip label="Todas" active={!trilhaAtiva} onClick={() => selecionarTrilha(null)} />
            {TRILHAS.map((t) => (
              <Chip
                key={t.id}
                label={t.nome.split(' ')[0]}
                active={trilhaAtiva === t.id}
                cor={t.cor}
                onClick={() => selecionarTrilha(t.id)}
              />
            ))}
          </div>

          {/* Lista de trilhas com módulos */}
          <div className="flex flex-col gap-6">
            {(trilhaAtiva ? TRILHAS.filter((t) => t.id === trilhaAtiva) : TRILHAS).map((trilha) => {
              const modulos = getModulosByTrilha(trilha.id)
              const concluidos = modulos.filter((m) => isModuloCompleto(m.id)).length
              const Icon = getIcon(trilha.iconName, BookOpen)
              const expandida = trilhasExpandidas.has(trilha.id)

              return (
                <section key={trilha.id}>
                  <button onClick={() => alternarTrilha(trilha.id)} className="flex items-center gap-3 mb-3 w-full text-left">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${trilha.cor}1A` }}
                    >
                      <Icon size={18} style={{ color: trilha.cor }} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[14px] font-display font-bold text-white leading-tight">
                        {trilha.numero}. {trilha.nome}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {concluidos}/{modulos.length} concluídos
                      </p>
                    </div>
                    <motion.span animate={{ rotate: expandida ? 90 : 0 }} className="text-slate-500 text-sm shrink-0 pr-1">
                      ▸
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandida && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                  <div className="flex flex-col gap-2">
                    {modulos.map((modulo) => {
                      const status = statusModulo(modulo.id)
                      const ModIcon = getIcon(modulo.iconName, FileText)
                      return (
                        <motion.button
                          key={modulo.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/modulo/${modulo.id}`)}
                          className="flex items-center gap-3 card-surface rounded-2xl p-3 text-left"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${trilha.cor}14` }}
                          >
                            <ModIcon size={18} style={{ color: trilha.cor }} strokeWidth={2} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-white leading-tight line-clamp-2">
                              {modulo.titulo}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock size={11} className="text-slate-500" />
                              <span className="text-[11px] text-slate-500">{modulo.duracaoMin} min</span>
                              {!modulo.temConteudoCompleto && (
                                <span className="text-[10px] text-accent-gold/80 ml-1">· em breve</span>
                              )}
                            </div>
                          </div>
                          {status === 'concluido' ? (
                            <CheckCircle2 size={20} className="text-accent-green shrink-0" />
                          ) : (
                            <Circle size={20} className="text-slate-700 shrink-0" />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function Chip({
  label,
  active,
  cor,
  onClick,
}: {
  label: string
  active: boolean
  cor?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold border transition-colors ${
        active ? 'text-bg' : 'text-slate-300 border-border bg-bg-card'
      }`}
      style={active ? { backgroundColor: cor ?? '#00D4FF', borderColor: cor ?? '#00D4FF' } : undefined}
    >
      {label}
    </button>
  )
}

function BuscaResultados({
  modulos,
  statusModulo,
  navigate,
}: {
  modulos: typeof MODULOS
  statusModulo: (id: string) => string
  navigate: (path: string) => void
}) {
  if (modulos.length === 0) {
    return (
      <div className="py-16 text-center">
        <Search size={28} className="mx-auto text-slate-700 mb-3" />
        <p className="text-sm text-slate-400">Nenhum módulo encontrado</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      {modulos.map((modulo) => {
        const ModIcon = getIcon(modulo.iconName, FileText)
        const status = statusModulo(modulo.id)
        return (
          <motion.button
            key={modulo.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/modulo/${modulo.id}`)}
            className="flex items-center gap-3 card-surface rounded-2xl p-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-accent-cyan/10">
              <ModIcon size={18} className="text-accent-cyan" strokeWidth={2} />
            </div>
            <p className="text-[13px] font-semibold text-white flex-1 line-clamp-2">{modulo.titulo}</p>
            {status === 'concluido' ? (
              <CheckCircle2 size={20} className="text-accent-green shrink-0" />
            ) : (
              <Circle size={20} className="text-slate-700 shrink-0" />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
