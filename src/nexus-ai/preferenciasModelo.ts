// Preferências de modelo e "esforço" (nível de raciocínio do Gemini) do
// Nexus AI — escolha da pessoa, guardada no aparelho (localStorage, não
// sincroniza entre aparelhos de propósito: é uma preferência de
// velocidade x qualidade, não um dado da conta). Mandada em toda mensagem
// pro backend (ver useNexusAI.ts) — a Edge Function valida contra uma
// lista fixa antes de repassar pro Gemini (nunca confia cegamente no que
// vem do cliente pra esse tipo de parâmetro).

export type ModeloNexusAI = 'gemini-3.1-flash-lite' | 'gemini-3.6-flash' | 'gemini-3.8-flash'
export type EsforcoNexusAI = 'baixo' | 'medio' | 'alto'

export const MODELOS: { id: ModeloNexusAI; label: string; descricao: string }[] = [
  { id: 'gemini-3.1-flash-lite', label: 'Rápido', descricao: 'Respostas quase instantâneas, ótimo pra perguntas diretas' },
  { id: 'gemini-3.6-flash', label: 'Equilibrado', descricao: 'Bom equilíbrio entre velocidade e qualidade (padrão)' },
  { id: 'gemini-3.8-flash', label: 'Completo', descricao: 'Mais cuidadoso em respostas complexas, um pouco mais lento' },
]

export const ESFORCOS: { id: EsforcoNexusAI; label: string; descricao: string }[] = [
  { id: 'baixo', label: 'Rápido', descricao: 'Responde direto, sem pensar muito antes' },
  { id: 'medio', label: 'Padrão', descricao: 'Equilíbrio entre velocidade e capricho' },
  { id: 'alto', label: 'Caprichado', descricao: 'Pensa mais antes de responder — mais lento' },
]

const CHAVE = 'nexus-ai:preferencias-modelo'
const PADRAO: { modelo: ModeloNexusAI; esforco: EsforcoNexusAI } = { modelo: 'gemini-3.6-flash', esforco: 'medio' }

export function lerPreferenciasModelo(): { modelo: ModeloNexusAI; esforco: EsforcoNexusAI } {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (!salvo) return PADRAO
    const dados = JSON.parse(salvo)
    const modelo = MODELOS.some((m) => m.id === dados.modelo) ? dados.modelo : PADRAO.modelo
    const esforco = ESFORCOS.some((e) => e.id === dados.esforco) ? dados.esforco : PADRAO.esforco
    return { modelo, esforco }
  } catch {
    return PADRAO
  }
}

export function salvarPreferenciasModelo(p: { modelo: ModeloNexusAI; esforco: EsforcoNexusAI }) {
  localStorage.setItem(CHAVE, JSON.stringify(p))
}
