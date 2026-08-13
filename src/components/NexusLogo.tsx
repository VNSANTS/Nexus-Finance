import logoSimbolo from '@/assets/brand/logo-simbolo.svg'

interface LogoProps {
  size?: number
  showWordmark?: boolean
}

export default function NexusLogo({ size = 32, showWordmark = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoSimbolo} width={size} height={size} alt="Nexus Finance" draggable={false} />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-white tracking-wide text-[15px]">NEXUS</span>
          <span className="font-display font-semibold text-accent-cyan tracking-[0.2em] text-[9px]">FINANCE</span>
        </div>
      )}
    </div>
  )
}
