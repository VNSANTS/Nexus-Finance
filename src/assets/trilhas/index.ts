import fundamentos from './trilha-01-fundamentos-e-mentalidade.svg'
import economiaMercado from './trilha-02-economia-e-mercado.svg'
import rendaFixaPrevidencia from './trilha-03-renda-fixa-e-previdencia.svg'
import fundos from './trilha-04-fundos.svg'
import acoesBolsa from './trilha-05-acoes-e-bolsa.svg'
import estrategiaGestao from './trilha-06-estrategia-e-gestao.svg'
import alternativosDerivativos from './trilha-07-alternativos-e-derivativos.svg'
import vidaFinanceira from './trilha-08-vida-financeira.svg'
import carreiraNegocios from './trilha-09-carreira-e-negocios.svg'
import culturaInvestimentos from './trilha-10-cultura-de-investimentos.svg'

// Mapeado pelo id de cada trilha em src/data/trilhas.ts
export const CAPAS_TRILHA: Record<string, string> = {
  'fundamentos': fundamentos,
  'economia-mercado': economiaMercado,
  'renda-fixa-previdencia': rendaFixaPrevidencia,
  'fundos': fundos,
  'acoes-bolsa': acoesBolsa,
  'estrategia-gestao': estrategiaGestao,
  'alternativos-derivativos': alternativosDerivativos,
  'vida-financeira': vidaFinanceira,
  'carreira-negocios': carreiraNegocios,
  'cultura-investimentos': culturaInvestimentos,
}
