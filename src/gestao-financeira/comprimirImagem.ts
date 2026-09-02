// Comprime uma imagem escolhida pelo usuário antes de guardar como data URL
// no localStorage. Sem isso, uma foto de celular (3-8MB) sozinha já
// estouraria a cota do localStorage (geralmente 5-10MB no total) — aqui ela
// sai redimensionada pra no máximo `larguraMaxima` px e em JPEG, o que
// normalmente fica entre 20-80KB por foto.
export function comprimirImagem(arquivo: File, larguraMaxima = 480, qualidade = 0.7): Promise<string> {
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
        resolve(canvas.toDataURL('image/jpeg', qualidade))
      }
      img.src = leitor.result as string
    }
    leitor.readAsDataURL(arquivo)
  })
}
