// Ícone animado do Nexus AI: hexágono de nós (rede neural) girando devagar
// ao redor, cristal central (losango + triângulos) girando no eixo Y e
// balançando sutilmente para cima/baixo — reproduz em SVG+CSS a estética
// da arte de referência (cristal geométrico cyan/azul com nós dourados),
// só que animado em vez de estático, para poder ser reutilizado tanto no
// botão flutuante pequeno quanto numa tela de splash grande.
//
// Toda a animação usa CSS puro (@keyframes via <style> escopado dentro do
// próprio SVG) — nada de JS rodando por frame, então funciona leve mesmo
// em vários lugares da tela ao mesmo tempo.

interface NexusAIIconeProps {
  size?: number
  className?: string
}

export default function NexusAIIcone({ size = 56, className }: NexusAIIconeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="nexusAiGlowCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7DF0FF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </radialGradient>
        <radialGradient id="nexusAiGlowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE29A" />
          <stop offset="100%" stopColor="#FFC93C" />
        </radialGradient>
        <linearGradient id="nexusAiCristal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0A5C7A" stopOpacity="0.55" />
        </linearGradient>
        <filter id="nexusAiBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <style>
        {`
          .nexus-ai-rede {
            transform-origin: 100px 100px;
            animation: nexus-ai-girar-rede 14s linear infinite;
          }
          .nexus-ai-cristal {
            transform-origin: 100px 100px;
            animation: nexus-ai-girar-cristal 6s ease-in-out infinite,
                       nexus-ai-flutuar 3s ease-in-out infinite;
          }
          .nexus-ai-no {
            animation: nexus-ai-pulsar 2.4s ease-in-out infinite;
          }
          @keyframes nexus-ai-girar-rede {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes nexus-ai-girar-cristal {
            0%, 100% { transform: rotateY(0deg) rotate(0deg); }
            50% { transform: rotateY(0deg) rotate(8deg); }
          }
          @keyframes nexus-ai-flutuar {
            0%, 100% { transform: translateY(0px) scaleY(1); }
            50% { transform: translateY(-3px) scaleY(1.03); }
          }
          @keyframes nexus-ai-pulsar {
            0%, 100% { opacity: 0.75; r: 6; }
            50% { opacity: 1; r: 8; }
          }
        `}
      </style>

      {/* Rede neural externa — hexágono de nós, gira devagar */}
      <g className="nexus-ai-rede">
        {/* Linhas do hexágono e diagonais internas */}
        <g stroke="#3FA9E0" strokeWidth="1.5" opacity="0.55" fill="none">
          <polygon points="100,25 165,62 165,138 100,175 35,138 35,62" />
          <line x1="100" y1="25" x2="100" y2="175" />
          <line x1="35" y1="62" x2="165" y2="138" />
          <line x1="35" y1="138" x2="165" y2="62" />
          <line x1="35" y1="62" x2="165" y2="62" />
          <line x1="35" y1="138" x2="165" y2="138" />
        </g>

        {/* Nós — cantos cyan (brilho branco-azulado), meio-lado dourado */}
        {[
          { cx: 100, cy: 25, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 165, cy: 62, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 165, cy: 138, cor: 'url(#nexusAiGlowGold)' },
          { cx: 100, cy: 175, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 35, cy: 138, cor: 'url(#nexusAiGlowGold)' },
          { cx: 35, cy: 62, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 100, cy: 62, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 132, cy: 100, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 100, cy: 138, cor: 'url(#nexusAiGlowCyan)' },
          { cx: 68, cy: 100, cor: 'url(#nexusAiGlowCyan)' },
        ].map((no, i) => (
          <circle
            key={i}
            className="nexus-ai-no"
            cx={no.cx}
            cy={no.cy}
            r={6}
            fill={no.cor}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </g>

      {/* Cristal central — losango com triângulos internos, gira/flutua */}
      <g className="nexus-ai-cristal">
        <polygon points="100,55 140,100 100,145 60,100" fill="url(#nexusAiCristal)" stroke="#7DF0FF" strokeWidth="1.5" />
        <polygon points="100,55 140,100 100,100" fill="#7DF0FF" opacity="0.35" />
        <line x1="100" y1="55" x2="100" y2="145" stroke="#7DF0FF" strokeWidth="1" opacity="0.6" />
        <line x1="60" y1="100" x2="140" y2="100" stroke="#FFC93C" strokeWidth="1.2" opacity="0.7" filter="url(#nexusAiBlur)" />
        <circle cx="100" cy="100" r="4" fill="#FFE29A" filter="url(#nexusAiBlur)" />
      </g>
    </svg>
  )
}
