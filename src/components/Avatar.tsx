import { Edit3 } from 'lucide-react'
import type { AjusteFoto } from '@/types'
import { corComAlfa, corOpaca } from '@/utils/cor'

interface AvatarProps {
  nome: string
  emoji: string | null
  cor: string
  fotoUrl?: string | null
  fotoAjuste?: AjusteFoto | null
  size?: number
  editavel?: boolean
}

// Avatar compartilhado entre o Nexus Finance principal e a Gestão
// Financeira — extraído de PerfilPage.tsx para os dois lados usarem o
// mesmo visual sem duplicar código, já que o perfil (nome/avatar/nível)
// agora é único e sincronizado entre os dois. Quando há fotoUrl, ela
// substitui completamente o emoji/iniciais, recortada em círculo com o
// zoom/posição/rotação salvos pelo editor.
export default function Avatar({ nome, emoji, cor, fotoUrl, fotoAjuste, size = 64, editavel }: AvatarProps) {
  const iniciais = nome ? nome.trim().split(' ').slice(0, 2).map((p) => p[0]?.toUpperCase()).join('') : '?'
  const ajuste = fotoAjuste ?? { zoom: 1, deslocX: 0, deslocY: 0, rotacaoGraus: 0 }
  // `cor` pode vir com opacidade própria (#RRGGBBAA) — corComAlfa combina
  // isso com a opacidade do fundo sem quebrar (em vez de concatenar
  // sufixo direto na string, que só funciona com hex de 6 dígitos).
  // Borda e texto ficam sempre sólidos (corOpaca) pra manter legibilidade
  // mesmo se o usuário escolher uma cor bem transparente.
  const corBorda = corOpaca(cor)

  return (
    <div
      className="rounded-full flex items-center justify-center relative shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: corComAlfa(cor, 15), border: `2px solid ${corBorda}` }}
    >
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt={nome}
          draggable={false}
          className="w-full h-full pointer-events-none"
          style={{
            objectFit: 'cover',
            transform: `translate(${ajuste.deslocX}%, ${ajuste.deslocY}%) scale(${ajuste.zoom}) rotate(${ajuste.rotacaoGraus}deg)`,
            transformOrigin: 'center',
          }}
        />
      ) : emoji ? (
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      ) : (
        <span className="font-display font-extrabold" style={{ fontSize: size * 0.32, color: corBorda }}>
          {iniciais}
        </span>
      )}
      {editavel && (
        <div className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-accent-cyan border-2 border-bg flex items-center justify-center">
          <Edit3 size={11} className="text-bg" />
        </div>
      )}
    </div>
  )
}
