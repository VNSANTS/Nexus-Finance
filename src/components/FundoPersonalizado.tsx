import { useTheme } from '@/hooks/useTheme'

// Fundo de imagem personalizável (Personalização → Fundo do app → Imagem).
// Substitui a técnica antiga de `body::before`/`::after` com background-image
// puro em CSS (ver globals.css) — aquela abordagem só suportava
// `background-size: cover` + `center`, sem jeito de combinar com o zoom,
// posição e rotação ajustados no EditorImagemFundo. Aqui, como é um
// componente React lendo o ajuste direto do ThemeProvider, dá pra aplicar
// um `transform` de verdade na imagem, igual ao EditorFotoPerfil faz com o
// avatar.
//
// Fica fora do wrapper `max-w-[480px]` do App (ver App.tsx) pra cobrir a
// tela inteira, do mesmo jeito que o `position: fixed` do `body::before`
// antigo cobria — assim o fundo não fica com faixas em branco nas laterais
// em telas mais largas que 480px.
export default function FundoPersonalizado() {
  const { tipoFundo, imagemFundoUrl, imagemFundoAjuste, imagemFundoOpacidade, amoledEfetivo } = useTheme()

  // AMOLED tem prioridade (preto puro) — mesma regra de precedência do
  // `backgroundFundo` em useTheme.tsx. Sem imagem salva, não tem o que
  // desenhar.
  if (tipoFundo !== 'imagem' || !imagemFundoUrl || amoledEfetivo) return null

  const ajuste = imagemFundoAjuste ?? { zoom: 1, deslocX: 0, deslocY: 0, rotacaoGraus: 0 }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={imagemFundoUrl}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: imagemFundoOpacidade / 100,
          transform: `translate(${ajuste.deslocX}%, ${ajuste.deslocY}%) scale(${ajuste.zoom}) rotate(${ajuste.rotacaoGraus}deg)`,
          transformOrigin: 'center',
        }}
      />
      {/* Overlay automático pra manter o texto legível por cima de qualquer
          foto — mesma variável usada no tema, já respeita claro/escuro. */}
      <div className="absolute inset-0" style={{ background: 'var(--cor-overlay-leve)' }} />
    </div>
  )
}
