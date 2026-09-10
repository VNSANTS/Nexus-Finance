// =============================================================================
// Importação de extrato bancário via arquivo (CSV ou OFX) — a alternativa
// gratuita ao Open Finance de verdade: puxar extrato real de um banco
// específico exige virar instituição credenciada pelo Banco Central
// (Pluggy/Belvo cobram assim que sai do modo sandbox), o que não é viável
// pra um app pessoal sem custo. Praticamente todo banco brasileiro deixa
// EXPORTAR o extrato em CSV ou OFX de graça — essa tela lê esse arquivo.
//
// Não existe um padrão único de CSV entre bancos, então o parser tenta
// reconhecer os formatos mais comuns (delimitador vírgula ou ponto-e-
// vírgula, datas em vários formatos, valor com vírgula ou ponto decimal) e
// sempre mostra uma PRÉVIA antes de importar de verdade — a pessoa revisa
// e pode desmarcar/ajustar qualquer linha antes de confirmar.
// =============================================================================

export interface TransacaoImportada {
  data: string // YYYY-MM-DD
  descricao: string
  valor: number // sempre positivo aqui — o sinal vira "tipo" (receita/despesa)
  tipo: 'receita' | 'despesa'
  linhaOriginal: string // pra debug/exibição, se precisar mostrar o que veio no arquivo
}

export interface ResultadoImportacao {
  transacoes: TransacaoImportada[]
  avisos: string[] // linhas que não deu pra entender, mostradas pra pessoa não achar que "sumiu" nada
}

function normalizarValor(texto: string): number | null {
  let limpo = texto.trim().replace(/^R\$\s?/i, '').replace(/\s/g, '')
  if (!limpo) return null
  // Formato BR (1.234,56) vs formato US (1,234.56) — decide pelo último
  // separador que aparece: se for vírgula, ela é o decimal (BR); se for
  // ponto, ele é o decimal (US/OFX).
  const ultimaVirgula = limpo.lastIndexOf(',')
  const ultimoPonto = limpo.lastIndexOf('.')
  if (ultimaVirgula > ultimoPonto) {
    limpo = limpo.replace(/\./g, '').replace(',', '.')
  } else {
    limpo = limpo.replace(/,/g, '')
  }
  const n = parseFloat(limpo)
  return Number.isNaN(n) ? null : n
}

function normalizarData(texto: string): string | null {
  const t = texto.trim()
  // YYYY-MM-DD ou YYYYMMDD (OFX)
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10)
  if (/^\d{8}/.test(t)) return `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}`
  // DD/MM/YYYY ou DD-MM-YYYY (o mais comum nos bancos BR)
  const m = t.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  return null
}

const CABECALHOS_DATA = ['data', 'date', 'dt', 'data lançamento', 'data lancamento']
const CABECALHOS_DESCRICAO = ['descricao', 'descrição', 'histórico', 'historico', 'description', 'lançamento', 'lancamento', 'detalhes']
const CABECALHOS_VALOR = ['valor', 'value', 'amount', 'valor (r$)', 'montante']

function indiceColuna(cabecalho: string[], candidatos: string[]): number {
  return cabecalho.findIndex((c) => candidatos.includes(c.trim().toLowerCase()))
}

export function parseCSV(texto: string): ResultadoImportacao {
  const avisos: string[] = []
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim())
  if (linhas.length === 0) return { transacoes: [], avisos: ['Arquivo vazio.'] }

  // Delimitador: conta quantos ; e , tem na 1ª linha — bancos BR costumam
  // usar ; (porque , já é o separador decimal dos valores).
  const delimitador = (linhas[0].match(/;/g) ?? []).length >= (linhas[0].match(/,/g) ?? []).length ? ';' : ','
  const dividirLinha = (l: string) => l.split(delimitador).map((c) => c.trim().replace(/^"|"$/g, ''))

  const cabecalho = dividirLinha(linhas[0]).map((c) => c.toLowerCase())
  const idxData = indiceColuna(cabecalho, CABECALHOS_DATA)
  const idxDescricao = indiceColuna(cabecalho, CABECALHOS_DESCRICAO)
  const idxValor = indiceColuna(cabecalho, CABECALHOS_VALOR)

  const temCabecalhoReconhecido = idxData !== -1 && idxValor !== -1
  const linhasDeDados = temCabecalhoReconhecido ? linhas.slice(1) : linhas // sem cabeçalho reconhecido, tenta tudo como dado

  const transacoes: TransacaoImportada[] = []
  for (const linha of linhasDeDados) {
    const colunas = dividirLinha(linha)
    if (colunas.length < 2) continue

    // Sem cabeçalho reconhecido: assume a ordem mais comum (data, descrição, valor).
    const dataTexto = colunas[temCabecalhoReconhecido ? idxData : 0]
    const descricaoTexto = temCabecalhoReconhecido && idxDescricao !== -1 ? colunas[idxDescricao] : colunas[1]
    const valorTexto = colunas[temCabecalhoReconhecido ? idxValor : colunas.length - 1]

    const data = normalizarData(dataTexto)
    const valor = normalizarValor(valorTexto)
    if (!data || valor === null) {
      avisos.push(`Não entendi esta linha: "${linha.slice(0, 60)}${linha.length > 60 ? '…' : ''}"`)
      continue
    }

    transacoes.push({
      data,
      descricao: (descricaoTexto || 'Importado do extrato').trim(),
      valor: Math.abs(valor),
      tipo: valor < 0 ? 'despesa' : 'receita',
      linhaOriginal: linha,
    })
  }

  return { transacoes, avisos }
}

export function parseOFX(texto: string): ResultadoImportacao {
  const avisos: string[] = []
  const transacoes: TransacaoImportada[] = []

  // OFX é SGML, não XML bem-formado (tags sem fechamento em muitas
  // versões) — regex por bloco <STMTTRN>...</STMTTRN> é mais robusto que
  // tentar um parser XML de verdade aqui.
  const blocos = texto.match(/<STMTTRN>[\s\S]*?<\/STMTTRN>/gi) ?? []
  if (blocos.length === 0) return { transacoes: [], avisos: ['Não encontrei nenhuma transação (tag <STMTTRN>) neste arquivo OFX.'] }

  const extrairTag = (bloco: string, tag: string) => {
    const m = bloco.match(new RegExp(`<${tag}>([^<\r\n]*)`, 'i'))
    return m ? m[1].trim() : ''
  }

  for (const bloco of blocos) {
    const dataTexto = extrairTag(bloco, 'DTPOSTED')
    const valorTexto = extrairTag(bloco, 'TRNAMT')
    const nome = extrairTag(bloco, 'NAME')
    const memo = extrairTag(bloco, 'MEMO')

    const data = normalizarData(dataTexto)
    const valor = normalizarValor(valorTexto)
    if (!data || valor === null) {
      avisos.push('Uma transação do arquivo veio sem data ou valor válido e foi ignorada.')
      continue
    }

    transacoes.push({
      data,
      descricao: (nome || memo || 'Importado do extrato').trim(),
      valor: Math.abs(valor),
      tipo: valor < 0 ? 'despesa' : 'receita',
      linhaOriginal: bloco,
    })
  }

  return { transacoes, avisos }
}

export function parseArquivoExtrato(nomeArquivo: string, conteudo: string): ResultadoImportacao {
  const ehOfx = /\.ofx$/i.test(nomeArquivo) || conteudo.includes('<STMTTRN>') || conteudo.includes('<OFX>')
  return ehOfx ? parseOFX(conteudo) : parseCSV(conteudo)
}
