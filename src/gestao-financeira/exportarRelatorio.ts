// Exporta um elemento do DOM (o relatório inteiro) como PNG ou PDF.
// html2canvas e jsPDF são carregados via import() dinâmico — só entram no
// bundle do usuário no momento em que ele realmente clica em exportar, em
// vez de pesar o carregamento inicial do app pra todo mundo.

function nomeArquivo(base: string, extensao: string): string {
  const agora = new Date()
  const carimbo = `${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}`
  return `${base}-${carimbo}.${extensao}`
}

async function capturarElemento(elemento: HTMLElement) {
  const { default: html2canvas } = await import('html2canvas')
  return html2canvas(elemento, {
    backgroundColor: '#0B0F1A', // mesma cor de fundo do app, pra não sair com fundo branco
    scale: 2, // mais nítido em telas de alta densidade
    useCORS: true,
  })
}

export async function exportarComoImagem(elemento: HTMLElement, nomeBase = 'nexus-relatorio') {
  const canvas = await capturarElemento(elemento)
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = nomeArquivo(nomeBase, 'png')
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export async function exportarComoPdf(elemento: HTMLElement, nomeBase = 'nexus-relatorio') {
  const canvas = await capturarElemento(elemento)
  const { jsPDF } = await import('jspdf')

  const imgData = canvas.toDataURL('image/png')
  // Página no formato do próprio conteúdo capturado, em vez de forçar A4 —
  // evita cortar o relatório no meio quando ele é mais alto que uma página.
  const larguraPt = canvas.width / 2 // /2 porque capturamos em scale 2
  const alturaPt = canvas.height / 2
  const pdf = new jsPDF({
    orientation: alturaPt > larguraPt ? 'portrait' : 'landscape',
    unit: 'pt',
    format: [larguraPt, alturaPt],
  })
  pdf.addImage(imgData, 'PNG', 0, 0, larguraPt, alturaPt)
  pdf.save(nomeArquivo(nomeBase, 'pdf'))
}
