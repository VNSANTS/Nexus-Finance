import { useState } from 'react'
import { Edit3 } from 'lucide-react'

interface SliderInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  decimals?: number
}

// Slider com valor editável por toque — usuário pode arrastar OU digitar o número diretamente.
export default function SliderInput({ label, value, onChange, min, max, step, prefix = '', suffix = '', decimals = 0 }: SliderInputProps) {
  const [editando, setEditando] = useState(false)
  const [textoTemp, setTextoTemp] = useState('')
  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('pt-BR')

  function iniciarEdicao() {
    setTextoTemp(decimals > 0 ? value.toFixed(decimals) : String(Math.round(value)))
    setEditando(true)
  }

  function confirmarEdicao() {
    let num = parseFloat(textoTemp.replace(',', '.'))
    if (isNaN(num)) num = value
    num = Math.min(max, Math.max(min, num))
    onChange(num)
    setEditando(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[12.5px] text-slate-400 font-medium">{label}</span>
        {editando ? (
          <div className="flex items-center gap-1.5">
            {prefix && <span className="text-[13px] text-accent-cyan font-bold">{prefix}</span>}
            <input
              autoFocus
              type="text"
              inputMode="decimal"
              value={textoTemp}
              onChange={(e) => setTextoTemp(e.target.value)}
              onBlur={confirmarEdicao}
              onKeyDown={(e) => e.key === 'Enter' && confirmarEdicao()}
              className="w-[74px] h-7 rounded-lg bg-bg border-[1.5px] border-accent-cyan text-white text-[13px] font-bold text-right px-1.5 outline-none"
            />
            {suffix && <span className="text-xs text-accent-cyan font-semibold">{suffix}</span>}
          </div>
        ) : (
          <button onClick={iniciarEdicao} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md">
            <span className="text-[13.5px] font-bold text-accent-cyan">
              {prefix}
              {displayValue}
              {suffix}
            </span>
            <Edit3 size={11} className="text-accent-cyan opacity-60" />
          </button>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent-cyan h-1"
      />
    </div>
  )
}
