/** Retorna uma data YYYY-MM-DD no fuso local, sem deslocamento para UTC. */
export function dataLocalISO(data = new Date()): string {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

/** Soma dias de calendário a uma data ISO sem depender do fuso do aparelho. */
export function deslocarDataISO(dataISO: string, dias: number): string {
  const [ano, mes, dia] = dataISO.split('-').map(Number)
  const data = new Date(Date.UTC(ano, mes - 1, dia + dias))
  return `${data.getUTCFullYear()}-${String(data.getUTCMonth() + 1).padStart(2, '0')}-${String(data.getUTCDate()).padStart(2, '0')}`
}

/** Diferença em dias entre duas datas ISO, contando dias de calendário. */
export function diferencaDiasISO(inicio: string, fim: string): number {
  const paraUTC = (valor: string) => {
    const [ano, mes, dia] = valor.split('-').map(Number)
    return Date.UTC(ano, mes - 1, dia)
  }
  return Math.round((paraUTC(fim) - paraUTC(inicio)) / 86_400_000)
}
