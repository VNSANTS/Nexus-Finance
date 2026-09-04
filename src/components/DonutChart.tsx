import { motion } from 'framer-motion'

interface DonutChartProps {
  dados: { classe: string; pct: number; cor: string }[]
  size?: number
}

export default function DonutChart({ dados, size = 180 }: DonutChartProps) {
  const strokeWidth = 26
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let acumulado = 0

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {dados.map((d, i) => {
        const dash = (d.pct / 100) * circumference
        const offset = circumference - (acumulado / 100) * circumference
        acumulado += d.pct
        return (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={d.cor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.08 }}
          />
        )
      })}
    </svg>
  )
}
