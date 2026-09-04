import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Exporta um elemento da tela (por id) como imagem PNG ou PDF, usando
// html2canvas pra "fotografar" o elemento e jsPDF pra montar o PDF. As duas
// libs já são dependências do projeto (package.json) — nenhuma lib nova.
// Usado no botão "Exportar" da tela de Relatórios e da Retrospectiva anual.

async function capturarElemento(elementId: string): Promise<HTMLCanvasElement> {
  const elemento = document.getElementById(elementId)
  if (!elemento) {
    throw new Error(`Elemento "${elementId}" não encontrado para exportação.`)
  }
  return html2canvas(elemento, {
    backgroundColor: '#0B1120',
    scale: 2,
    useCORS: true,
  })
}

export async function exportarComoImagem(elementId: string, nomeArquivo: string): Promise<void> {
  const canvas = await capturarElemento(elementId)
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `${nomeArquivo}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export async function exportarComoPdf(elementId: string, nomeArquivo: string): Promise<void> {
  const canvas = await capturarElemento(elementId)
  const imgData = canvas.toDataURL('image/png')

  const larguraMm = 190
  const alturaMm = (canvas.height * larguraMm) / canvas.width
  const pdf = new jsPDF({
    orientation: alturaMm > larguraMm ? 'portrait' : 'landscape',
    unit: 'mm',
    format: 'a4',
  })
  pdf.addImage(imgData, 'PNG', 10, 10, larguraMm, alturaMm)
  pdf.save(`${nomeArquivo}.pdf`)
}
