export interface AppConfig {
  cadastroFechado: boolean
  modoManutencao: boolean
  carregada: boolean
  androidMinVersionCode: number
  androidUpdateRevoked: boolean
  androidApkDownloadUrl: string
}

/** Mantém a última configuração confirmada quando uma leitura periódica falha. */
export function manterUltimaAppConfigValida(
  anterior: AppConfig | null,
  recebida: AppConfig,
): AppConfig {
  if (!recebida.carregada && anterior?.carregada) return anterior
  return recebida
}
