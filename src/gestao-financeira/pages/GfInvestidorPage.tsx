import { Radar } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfEmConstrucao from '../components/GfEmConstrucao'

export default function GfInvestidorPage() {
  return (
    <div>
      <GfHeader titulo="Área do Investidor" subtitulo="Carteira e mercado" icone={Radar} corIcone="#EC4899" voltarPara="/gestao-financeira" />
      <GfEmConstrucao
        titulo="Em construção"
        descricao="Aqui você vai acompanhar sua carteira de investimentos, performance e análises — separado da Área do Investidor educacional do app principal."
        topicos={['Ativos comprados e desempenho', 'Análise de performance da carteira', 'Preferências de acompanhamento de mercado']}
      />
    </div>
  )
}
