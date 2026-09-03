import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HexColorPicker, HexAlphaColorPicker } from 'react-colorful'
import { Check, Sliders, X } from 'lucide-react'

// Componente de seleção de cor compartilhado entre o app principal e a
// Gestão Financeira — por isso mora em src/components (não dentro de
// gestao-financeira/, que é isolada de propósito). Ver PROXIMA_SESSAO.md,
// seção "Sessão C", pro pedido original.
//
// Duas camadas, como o Vinícius pediu ("presets rápidos + avançado"):
// 1. Presets rápidos: grade de swatches com paleta própria de tons
//    escuros/neutros (pensada pra fundo, não pra accent — por isso não
//    reusa CORES_PRINCIPAIS de useTheme.tsx, que são tons vivos).
// 2. Avançado: modal com quadrado de saturação/matiz + slider de matiz
//    (via react-colorful, que já entrega os dois juntos), campos RGB e
//    campo hex, todos sincronizados entre si e com o preset/hex de fora.
//
// Controlado, sem estado de tema embutido: só recebe `valor` (hex) e chama
// `onChange(hex)` — quem usa decide o que fazer com o hex (ver
// PersonalizacaoPage.tsx, fundo sólido e "de"/"para" do degradê).
//
// `permiteAlpha`: opt-in pro canal de opacidade (#RRGGBBAA). Só é seguro
// ligar onde o hex é consumido direto como `background`. NUNCA ligar onde
// a cor é reusada por concatenação de sufixo tipo `${cor}2E`/`${cor}44`
// (é assim que a cor de perfil funciona em várias telas) — um hex de 9
// dígitos + sufixo vira uma string inválida e quebra o CSS silenciosamente.

export interface SeletorCorProps {
  label?: string
  valor: string
  onChange: (hex: string) => void
  permiteAlpha?: boolean
}

// Fundo em xadrez atrás das amostras de cor — é o jeito padrão de indicar
// visualmente que uma cor tem opacidade (canal alpha < 255).
const ESTILO_XADREZ: React.CSSProperties = {
  backgroundImage:
    'conic-gradient(#64748B 90deg, transparent 90deg 180deg, #64748B 180deg 270deg, transparent 270deg)',
  backgroundSize: '8px 8px',
  backgroundColor: '#1E293B',
}

// Amostra de cor com xadrez por trás, pra opacidade ficar visível mesmo em
// cores bem transparentes (sem isso, uma cor a 10% de opacidade pareceria
// só "quase preto" contra o fundo escuro do app).
function AmostraCor({ cor, className = '' }: { cor: string; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span className="absolute inset-0" style={ESTILO_XADREZ} />
      <span className="absolute inset-0" style={{ background: cor }} />
    </span>
  )
}

const PRESETS: string[] = [
  '#070B16', '#0A0E1A', '#0E1526', '#0F172A', '#111827', '#1C2740',
  '#000000', '#18181B', '#1E293B', '#16213E', '#1A1A2E', '#292524',
  '#374151', '#4B5563', '#94A3B8', '#E2E8F0', '#F1F5F9', '#FFFFFF',
]

// Aceita tanto #RRGGBB (opaco) quanto #RRGGBBAA (com canal de opacidade) —
// os presets e o campo hex continuam funcionando com 6 dígitos normalmente,
// o 8º dígito só aparece quando o usuário mexe no slider de opacidade.
const HEX_VALIDO = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

function normalizarHex(valor: string): string | null {
  const v = valor.trim()
  const comHash = v.startsWith('#') ? v : `#${v}`
  return HEX_VALIDO.test(comHash) ? comHash.toUpperCase() : null
}

function hexParaRgb(hex: string): { r: number; g: number; b: number } {
  const seguro = HEX_VALIDO.test(hex) ? hex : '#000000'
  const num = parseInt(seguro.slice(1, 7), 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

// Opacidade em 0–255 (byte alpha do hex). Hex sem canal alpha = opaco (255).
function hexParaAlpha(hex: string): number {
  if (!HEX_VALIDO.test(hex) || hex.length < 9) return 255
  return parseInt(hex.slice(7, 9), 16)
}

function rgbaParaHex(r: number, g: number, b: number, a: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(Number.isFinite(n) ? n : 0)))
  const canais = [clamp(r), clamp(g), clamp(b)]
  // Só grava o 8º dígito (alpha) quando a cor não é totalmente opaca, pra
  // manter compatibilidade com quem já espera #RRGGBB puro.
  if (clamp(a) < 255) canais.push(clamp(a))
  return `#${canais.map((n) => n.toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

// Força de volta pra #RRGGBB, cortando o canal alpha se tiver algum — usado
// em todo lugar com permiteAlpha=false (padrão), pra garantir que essa cor
// nunca vaze um hex de 8 dígitos pra código que concatena sufixo tipo
// `${cor}2E`.
function forcarOpaco(hex: string): string {
  return hex.length > 7 ? hex.slice(0, 7) : hex
}

// Decide se o "check" de seleção nos presets fica preto ou branco, conforme
// a luminância percebida do swatch — só estética, não tem relação com tema.
function corDeContraste(hex: string): string {
  const { r, g, b } = hexParaRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#000000' : '#FFFFFF'
}

export default function SeletorCor({ label, valor, onChange, permiteAlpha = false }: SeletorCorProps) {
  const [presetsAbertos, setPresetsAbertos] = useState(false)
  const [avancadoAberto, setAvancadoAberto] = useState(false)
  const [hexDigitado, setHexDigitado] = useState(valor)

  // Se o valor mudar por fora (ex: outro campo, ou restaurar padrões),
  // mantém o campo de texto em sincronia.
  useEffect(() => setHexDigitado(valor), [valor])

  const corValida0 = normalizarHex(valor) ?? '#000000'
  const corValida = permiteAlpha ? corValida0 : forcarOpaco(corValida0)

  function confirmarTexto(texto: string) {
    const normalizado = normalizarHex(texto)
    if (normalizado) onChange(permiteAlpha ? normalizado : forcarOpaco(normalizado))
    else setHexDigitado(valor) // inválido: reverte pro último valor válido
  }

  return (
    <div className="flex-1 min-w-0">
      {label && <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">{label}</p>}

      <div className="flex items-center gap-2 rounded-xl border border-border card-surface px-2.5 py-2">
        <button
          type="button"
          onClick={() => setPresetsAbertos((v) => !v)}
          className="w-8 h-8 rounded-lg shrink-0 border border-border overflow-hidden"
          aria-label="Presets de cor"
        >
          <AmostraCor cor={corValida} className="w-full h-full" />
        </button>
        <input
          type="text"
          value={hexDigitado}
          onChange={(e) => setHexDigitado(e.target.value)}
          onBlur={(e) => confirmarTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-[12px] font-semibold text-white uppercase focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setAvancadoAberto(true)}
          className="text-slate-500 shrink-0"
          aria-label="Cor avançada"
        >
          <Sliders size={15} />
        </button>
      </div>

      <AnimatePresence>
        {presetsAbertos && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-6 gap-1.5 pt-2">
              {PRESETS.map((cor) => (
                <button
                  key={cor}
                  type="button"
                  onClick={() => {
                    onChange(cor)
                    setPresetsAbertos(false)
                  }}
                  className="aspect-square rounded-lg border border-border relative"
                  style={{ background: cor }}
                  aria-label={`Usar cor ${cor}`}
                >
                  {corValida === cor && (
                    <Check size={12} className="absolute inset-0 m-auto" style={{ color: corDeContraste(cor) }} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalAvancado
        aberto={avancadoAberto}
        onFechar={() => setAvancadoAberto(false)}
        valor={corValida}
        onChange={onChange}
        permiteAlpha={permiteAlpha}
      />
    </div>
  )
}

export function ModalAvancado({
  aberto,
  onFechar,
  valor,
  onChange,
  permiteAlpha = false,
}: {
  aberto: boolean
  onFechar: () => void
  valor: string
  onChange: (hex: string) => void
  permiteAlpha?: boolean
}) {
  const [hexDigitado, setHexDigitado] = useState(valor)
  const [rgbDigitado, setRgbDigitado] = useState(hexParaRgb(valor))
  // Opacidade exibida em % (0–100) pra ficar mais natural que o byte
  // alpha (0–255) do hex — a conversão acontece só na hora de gravar.
  // Sem permiteAlpha, fica travada em 100 e o campo nem aparece.
  const [opacidadeDigitada, setOpacidadeDigitada] = useState(permiteAlpha ? Math.round((hexParaAlpha(valor) / 255) * 100) : 100)

  // Sincroniza os campos sempre que o valor de fora mudar — inclusive
  // quando o próprio quadrado de saturação/matiz do react-colorful muda o
  // valor (ele chama onChange, que atualiza `valor` no componente pai).
  useEffect(() => {
    setHexDigitado(valor)
    setRgbDigitado(hexParaRgb(valor))
    if (permiteAlpha) setOpacidadeDigitada(Math.round((hexParaAlpha(valor) / 255) * 100))
  }, [valor, permiteAlpha])

  function gravar(r: number, g: number, b: number, opacidadePct: number) {
    const hex = permiteAlpha ? rgbaParaHex(r, g, b, (opacidadePct / 100) * 255) : rgbaParaHex(r, g, b, 255)
    onChange(hex)
  }

  function aplicarRgb(campo: 'r' | 'g' | 'b', texto: string) {
    const n = texto === '' ? 0 : Number(texto)
    const novo = { ...rgbDigitado, [campo]: n }
    setRgbDigitado(novo)
    if (!Number.isNaN(n)) gravar(novo.r, novo.g, novo.b, opacidadeDigitada)
  }

  function aplicarOpacidade(texto: string) {
    const pct = texto === '' ? 0 : Number(texto)
    setOpacidadeDigitada(pct)
    if (!Number.isNaN(pct)) gravar(rgbDigitado.r, rgbDigitado.g, rgbDigitado.b, Math.max(0, Math.min(100, pct)))
  }

  function aplicarHex(texto: string) {
    setHexDigitado(texto)
    const normalizado = normalizarHex(texto)
    if (normalizado) onChange(permiteAlpha ? normalizado : forcarOpaco(normalizado))
  }

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-[var(--cor-overlay)] flex items-end justify-center"
          onClick={onFechar}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] max-h-[85vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-display font-extrabold text-white">Cor avançada</p>
              <button onClick={onFechar} className="text-slate-500" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="seletor-cor-avancado mb-4">
              {permiteAlpha ? (
                <HexAlphaColorPicker color={valor} onChange={(hex) => onChange(hex.toUpperCase())} />
              ) : (
                <HexColorPicker color={valor} onChange={(hex) => onChange(hex.toUpperCase())} />
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border card-surface px-2.5 py-2 mb-3">
              <AmostraCor cor={valor} className="w-8 h-8 rounded-lg shrink-0 border border-border" />
              <input
                type="text"
                value={hexDigitado}
                onChange={(e) => aplicarHex(e.target.value)}
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent text-[13px] font-semibold text-white uppercase focus:outline-none"
              />
            </div>

            <div className={`grid gap-2 ${permiteAlpha ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {(['r', 'g', 'b'] as const).map((campo) => (
                <div key={campo}>
                  <p className="text-[10.5px] text-slate-500 font-medium mb-1 uppercase">{campo}</p>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgbDigitado[campo]}
                    onChange={(e) => aplicarRgb(campo, e.target.value)}
                    className="w-full rounded-xl border border-border card-surface px-2.5 py-2 text-[13px] font-semibold text-white text-center focus:outline-none"
                  />
                </div>
              ))}
              {permiteAlpha && (
                <div>
                  <p className="text-[10.5px] text-slate-500 font-medium mb-1 uppercase">Opac. %</p>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={opacidadeDigitada}
                    onChange={(e) => aplicarOpacidade(e.target.value)}
                    className="w-full rounded-xl border border-border card-surface px-2.5 py-2 text-[13px] font-semibold text-white text-center focus:outline-none"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
