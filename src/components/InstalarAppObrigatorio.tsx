import { Download, Share, Plus, MoreVertical, ExternalLink, TrendingUp, Loader2 } from 'lucide-react'
import { usePwaInstall } from '@/hooks/usePwaInstall'

/**
 * Gate obrigatório: enquanto o app não estiver rodando instalado (modo
 * "standalone"), ninguém vê o resto do Nexus Finance — nem a tela de
 * login. Pedido explícito: instalar deixou de ser opcional.
 *
 * Android/Chrome/Desktop: usa o prompt nativo de instalação do navegador
 * (`beforeinstallprompt`) — um botão só.
 * iOS/Safari: não existe prompt nativo via código (limitação da Apple,
 * não do app) — mostra o passo a passo manual (Compartilhar → Adicionar
 * à Tela de Início).
 * Navegador embutido (Instagram/TikTok/etc.): instalação é impossível
 * ali de qualquer jeito — instrui a abrir no navegador padrão em vez de
 * mostrar um botão que não vai funcionar.
 */
export default function InstalarAppObrigatorio() {
  const { plataforma, navegadorEmbutido, podeInstalarNativo, instalando, instalar } = usePwaInstall()

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-10 text-center max-w-[420px] mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-accent-cyan/15 flex items-center justify-center mb-5">
        <TrendingUp size={30} className="text-accent-cyan" />
      </div>
      <h1 className="font-display font-extrabold text-2xl text-texto mb-2">Instale o Nexus Finance</h1>
      <p className="text-sm text-texto-secundario mb-8">
        Pra usar o app, primeiro instale ele na tela inicial do seu aparelho — é rápido, gratuito e não ocupa espaço de app de loja.
      </p>

      {navegadorEmbutido ? (
        <div className="w-full rounded-2xl bg-bg-card border border-accent-gold/30 p-4 text-left">
          <p className="text-sm font-semibold text-accent-gold mb-1.5 flex items-center gap-2">
            <ExternalLink size={15} /> Abra no navegador padrão
          </p>
          <p className="text-[12.5px] text-texto-secundario">
            Esse link foi aberto dentro de outro app (Instagram, TikTok, etc.), que não permite instalar. Toque nos <MoreVertical size={12} className="inline" /> (⋮) no canto e escolha <strong>"Abrir no navegador"</strong> — daí a instalação funciona normalmente.
          </p>
        </div>
      ) : plataforma === 'ios' ? (
        <div className="w-full rounded-2xl bg-bg-card border border-border p-4 text-left flex flex-col gap-3.5">
          <PassoIos numero={1} icone={Share} texto={<>Toque no ícone de <strong>Compartilhar</strong> na barra do Safari</>} />
          <PassoIos numero={2} icone={Plus} texto={<>Toque em <strong>"Adicionar à Tela de Início"</strong></>} />
          <PassoIos numero={3} icone={TrendingUp} texto={<>Abra o Nexus Finance pelo ícone que apareceu na tela</>} />
        </div>
      ) : (
        <button
          onClick={instalar}
          disabled={!podeInstalarNativo || instalando}
          className="w-full rounded-full bg-accent-cyan text-black font-semibold py-4 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {instalando ? <Loader2 size={17} className="animate-spin" /> : <Download size={17} />}
          {podeInstalarNativo ? 'Instalar agora' : 'Preparando instalação…'}
        </button>
      )}

      {!navegadorEmbutido && plataforma !== 'ios' && !podeInstalarNativo && (
        <p className="text-[11px] text-texto-secundario mt-3">
          Se o botão não ativar em alguns segundos, procure "Instalar app" ou "Adicionar à tela inicial" no menu (⋮) do navegador.
        </p>
      )}
    </div>
  )
}

function PassoIos({ numero, icone: Icone, texto }: { numero: number; icone: typeof Share; texto: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-cyan/15 text-accent-cyan text-[11px] font-bold flex items-center justify-center shrink-0">
        {numero}
      </div>
      <p className="text-[12.5px] text-texto flex items-center gap-1.5 flex-wrap">
        <Icone size={13} className="text-texto-secundario shrink-0" /> {texto}
      </p>
    </div>
  )
}
