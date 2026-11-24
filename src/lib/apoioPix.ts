import { supabase } from '@/lib/supabase'

export const BUCKET_QR_PIX = 'nexus-apoie-pix'
export const TAMANHO_MAXIMO_QR_PIX = 1024 * 1024

const TIPOS_QR_ACEITOS = new Map<string, string>([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
])

export interface ApoioPixConfig {
  chave: string
  nomeRecebedor: string
  caminhoQr: string | null
}

interface LinhaApoioPix {
  pix_chave: string | null
  pix_nome_recebedor: string | null
  pix_qr_path: string | null
}

function mapearConfig(linha: LinhaApoioPix): ApoioPixConfig {
  return {
    chave: linha.pix_chave ?? '',
    nomeRecebedor: linha.pix_nome_recebedor ?? '',
    caminhoQr: linha.pix_qr_path,
  }
}

export async function buscarApoioPix(): Promise<ApoioPixConfig> {
  const { data, error } = await supabase
    .from('app_config')
    .select('pix_chave, pix_nome_recebedor, pix_qr_path')
    .eq('id', true)
    .single()

  if (error) throw new Error(error.message)
  return mapearConfig(data as LinhaApoioPix)
}

export function urlPublicaQrPix(caminho: string | null): string | null {
  if (!caminho) return null
  return supabase.storage.from(BUCKET_QR_PIX).getPublicUrl(caminho).data.publicUrl
}

function novoNomeQr(extensao: string): string {
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return `qr/${id}.${extensao}`
}

export async function salvarApoioPix(
  valores: Pick<ApoioPixConfig, 'chave' | 'nomeRecebedor'>,
  arquivoQr: File | null,
  removerQrAtual: boolean,
): Promise<ApoioPixConfig> {
  const chave = valores.chave.trim()
  const nomeRecebedor = valores.nomeRecebedor.trim()

  if (chave.length > 200) throw new Error('A chave Pix deve ter no máximo 200 caracteres.')
  if (nomeRecebedor.length > 100) throw new Error('O nome do recebedor deve ter no máximo 100 caracteres.')

  const atual = await buscarApoioPix()
  let novoCaminhoQr: string | null = null

  if (arquivoQr) {
    const extensao = TIPOS_QR_ACEITOS.get(arquivoQr.type)
    if (!extensao) throw new Error('Envie uma imagem PNG, JPG ou WebP.')
    if (arquivoQr.size > TAMANHO_MAXIMO_QR_PIX) throw new Error('A imagem do QR deve ter até 1 MB.')

    novoCaminhoQr = novoNomeQr(extensao)
    const { error } = await supabase.storage.from(BUCKET_QR_PIX).upload(novoCaminhoQr, arquivoQr, {
      cacheControl: '3600',
      contentType: arquivoQr.type,
      upsert: false,
    })
    if (error) throw new Error(error.message)
  }

  const caminhoQr = removerQrAtual ? null : novoCaminhoQr ?? atual.caminhoQr
  const { data, error } = await supabase
    .from('app_config')
    .update({
      pix_chave: chave || null,
      pix_nome_recebedor: nomeRecebedor || null,
      pix_qr_path: caminhoQr,
    })
    .eq('id', true)
    .select('pix_chave, pix_nome_recebedor, pix_qr_path')
    .single()

  if (error) {
    if (novoCaminhoQr) await supabase.storage.from(BUCKET_QR_PIX).remove([novoCaminhoQr])
    throw new Error(error.message)
  }

  if ((novoCaminhoQr || removerQrAtual) && atual.caminhoQr) {
    await supabase.storage.from(BUCKET_QR_PIX).remove([atual.caminhoQr])
  }

  return mapearConfig(data as LinhaApoioPix)
}
