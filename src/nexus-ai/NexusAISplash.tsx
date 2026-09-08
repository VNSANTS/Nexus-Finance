import NexusAIIcone from './NexusAIIcone'

// Splash/loading do Nexus AI — mesmo cristal animado do botão flutuante e
// do cabeçalho do chat (NexusAIIcone.tsx), só que grande e centralizado,
// com um texto de status embaixo. Usado enquanto o histórico carrega ou
// enquanto a primeira resposta ainda não chegou, em qualquer lugar do
// app que precise dessa tela cheia (não é usado dentro do próprio chat,
// que já tem seu spinner de "pensando" mais discreto — isto é para
// contextos de carregamento inicial, tipo abrir o app vindo de um link
// direto para o Nexus AI).
export default function NexusAISplash({ mensagem = 'Carregando Nexus AI...' }: { mensagem?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center gap-5">
      <NexusAIIcone size={140} />
      <p className="text-[13px] text-texto-secundario">{mensagem}</p>
    </div>
  )
}
