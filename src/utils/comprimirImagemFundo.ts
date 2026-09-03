// Comprime uma imagem de fundo escolhida pelo usuário antes de guardar como
// data URL no localStorage (junto de PreferenciasTema, em useTheme.tsx).
// Sem isso, uma foto de celular (3-8MB) sozinha já estouraria a cota do
// localStorage (geralmente 5-10MB no total, dividido com todo o resto que
// o app já guarda lá — progresso, Gestão Financeira etc.).
//
// Mesma ideia de gestao-financeira/comprimirImagem.ts (foto de perfil), mas
// arquivo próprio aqui em src/utils/ em vez de importar aquele: a Gestão
// Financeira é isolada de propósito (ver PROXIMA_SESSAO.md, "Decisões já
// tomadas"), então Personalização — que vive fora da GF e é usada também
// pelo app principal — não deve importar de dentro dela. Parâmetros
// diferentes também: fundo de tela cheia pode ficar em qualidade mais alta
// que uma foto de perfil pequena, mas ainda comprimido o bastante pra não
// estourar o localStorage.

export class ImagemFundoMuitoGrandeError extends Error {}

const LIMITE_BYTES_APROX = 3 * 1024 * 1024 // ~3MB de data URL — deixa folga no orçamento de ~5-10MB do localStorage

export function comprimirImagemFundo(arquivo: File, larguraMaxima = 1080, qualidade = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader()
    leitor.onerror = () => reject(new Error('Não foi possível ler o arquivo.'))
    leitor.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Arquivo não é uma imagem válida.'))
      img.onload = () => {
        const escala = Math.min(1, larguraMaxima / img.width)
        const largura = Math.round(img.width * escala)
        const altura = Math.round(img.height * escala)

        const canvas = document.createElement('canvas')
        canvas.width = largura
        canvas.height = altura
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas indisponível nesse navegador.'))
          return
        }
        ctx.drawImage(img, 0, 0, largura, altura)
        const dataUrl = canvas.toDataURL('image/jpeg', qualidade)

        if (dataUrl.length > LIMITE_BYTES_APROX) {
          // Tenta uma segunda passada, mais agressiva, em vez de falhar de
          // cara — a maioria das fotos de celular resolve aqui.
          const dataUrlMenor = canvas.toDataURL('image/jpeg', 0.5)
          if (dataUrlMenor.length > LIMITE_BYTES_APROX) {
            reject(new ImagemFundoMuitoGrandeError('Imagem grande demais mesmo depois de comprimida. Tente uma foto com menos detalhe ou resolução menor.'))
            return
          }
          resolve(dataUrlMenor)
          return
        }

        resolve(dataUrl)
      }
      img.src = leitor.result as string
    }
    leitor.readAsDataURL(arquivo)
  })
}
