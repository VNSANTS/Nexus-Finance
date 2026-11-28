import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, EyeOff, HardDrive, Camera, Trash2, AlertTriangle } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { aoRetomarAndroid, consultarPermissaoNotificacoes, notificacoesLocaisAndroid, pedirPermissaoNotificacoes } from '@/lib/notificacoesDispositivo'

// Tela "Privacidade" (menu Mais → Privacidade). Escopo: o que dá pra
// controlar de fato dentro do app hoje — ocultar valores, gerenciar as
// permissões usadas pelo app e apagar dados locais. O que fica de fora por
// decisão consciente, não por esquecimento:
// - Exportar/importar/sincronizar: isso é "Dados e backup" (outra tela) —
//   o botão de apagar tudo aqui é sobre direito de exclusão, não backup.
// - Câmera nas Metas e notificação/vibração viraram controle de verdade
//   por aqui (preferenciasPrivacidade.permitirFotoMetas gate o upload em
//   GfFormMeta.tsx; notificacaoNavegador/vibrar são as mesmas prefs que
//   Notificações → Configurar usa — este é só outro lugar de mexer na
//   mesma fonte única). O que o app genuinamente não controla é a
//   permissão do SISTEMA operacional/navegador em si (se a pessoa negou
//   notificação no navegador, nenhum toggle aqui religa isso sozinho) —
//   pra esse caso mostramos o status e a orientação, sem fingir um botão
//   que reverteria uma negação do navegador.
export default function GfPrivacidadePage() {
  const navigate = useNavigate()
  const { estado, permissoes, definirPreferenciasPrivacidade, definirPreferenciasNotificacoes, limparTodosDados } = useGestaoFinanceira()
  const prefs = estado.preferenciasPrivacidade
  const notifPrefs = estado.preferenciasNotificacoes
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)
  const [avisoPermissao, setAvisoPermissao] = useState<string | null>(null)

  const [statusNotificacoes, setStatusNotificacoes] = useState<Awaited<ReturnType<typeof consultarPermissaoNotificacoes>>>()
  useEffect(() => {
    let ativo = true
    const atualizar = () => void consultarPermissaoNotificacoes().then((status) => {
      if (ativo) setStatusNotificacoes(status)
    })
    atualizar()
    const removerListenerAndroid = aoRetomarAndroid(atualizar)
    return () => {
      ativo = false
      removerListenerAndroid()
    }
  }, [])

  async function ativarNotificacaoNavegador() {
    if (!permissoes.editar) return
    const permissao = await pedirPermissaoNotificacoes()
    definirPreferenciasNotificacoes({ notificacaoNavegador: permissao === 'autorizado' })
    setStatusNotificacoes(await consultarPermissaoNotificacoes())
    if (permissao === 'autorizado') return setAvisoPermissao(null)
    setAvisoPermissao(permissao === 'indisponivel'
      ? 'As notificações do dispositivo estão indisponíveis.'
      : 'Permissão negada. Você pode habilitá-la nas configurações do dispositivo ou do navegador.')
    setTimeout(() => setAvisoPermissao(null), 4000)
  }

  function aoConfirmarExclusao() {
    if (!window.confirm('Apagar TODOS os dados da Gestão Financeira (contas, cartões, lançamentos, dívidas e metas)? Isso não pode ser desfeito.')) {
      return
    }
    limparTodosDados()
    setConfirmandoExclusao(false)
    navigate('/gestao-financeira')
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Privacidade"
        subtitulo="Ocultar valores e seus dados"
        icone={Lock}
        corIcone="#00D4FF"
        voltarPara="/gestao-financeira/mais"
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Ocultar valores */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-cyan/15">
              <EyeOff size={15} className="text-accent-cyan" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Ocultar valores</p>
          </div>

          <LinhaSwitch
            label="Abrir com valores ocultos"
            desc="A Home já começa borrada — toque no olho no topo pra revelar quando quiser"
            ativo={prefs.ocultarValoresAoAbrir}
            onToggle={() => definirPreferenciasPrivacidade({ ocultarValoresAoAbrir: !prefs.ocultarValoresAoAbrir })}
          />
          <LinhaSwitch
            label="Ocultar valores ao trocar de app"
            desc="Cobre a tela com um véu ao minimizar ou trocar de aba — útil se alguém puder olhar por cima do ombro"
            ativo={prefs.ocultarAoTrocarDeApp}
            onToggle={() => definirPreferenciasPrivacidade({ ocultarAoTrocarDeApp: !prefs.ocultarAoTrocarDeApp })}
          />
          <p className="text-[10.5px] text-slate-500 leading-relaxed">
            Ocultar valores é um recurso visual. Para bloquear esta área, configure um PIN em Segurança.
          </p>
        </div>

        {/* Onde os dados ficam */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-green/15">
              <HardDrive size={15} className="text-accent-green" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Onde seus dados ficam</p>
          </div>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Seus registros ficam disponíveis neste aparelho e também são sincronizados com sua conta pelo Supabase quando
            você está conectado. Veja a Política de Privacidade para entender o uso desses dados e dos serviços externos.
          </p>
        </div>

        {/* Permissões */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-gold/15">
              <Camera size={15} className="text-accent-gold" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Permissões</p>
          </div>

          {avisoPermissao && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2">
              <p className="text-[11px] text-yellow-400">{avisoPermissao}</p>
            </div>
          )}

          <LinhaSwitch
            label="Fotos nas Metas"
            desc="Permite anexar/tirar foto ao criar ou editar uma Meta"
            ativo={prefs.permitirFotoMetas}
            onToggle={() => definirPreferenciasPrivacidade({ permitirFotoMetas: !prefs.permitirFotoMetas })}
          />

          <div className="flex flex-col gap-1.5">
            <LinhaSwitch
              label={notificacoesLocaisAndroid ? 'Notificações do dispositivo' : 'Notificações do navegador'}
              desc={notificacoesLocaisAndroid ? 'Permite agendar lembretes no Android' : 'Mostra alertas enquanto o Nexus Finance está aberto'}
              ativo={notifPrefs.notificacaoNavegador}
              onToggle={() =>
                notifPrefs.notificacaoNavegador
                  ? definirPreferenciasNotificacoes({ notificacaoNavegador: false })
                  : ativarNotificacaoNavegador()
              }
            />
            {statusNotificacoes === 'denied' && (
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {notificacoesLocaisAndroid ? 'Libere as notificações nas configurações do Android.' : 'Libere as notificações nas configurações do site no navegador.'}
              </p>
            )}
          </div>

          <LinhaSwitch
            label="Vibração"
            desc="Vibração curta ao chegar uma notificação nova (dispositivos compatíveis)"
            ativo={notifPrefs.vibrar}
            onToggle={() => definirPreferenciasNotificacoes({ vibrar: !notifPrefs.vibrar })}
          />

          <p className="text-[10.5px] text-slate-500 leading-relaxed">
            O Android e o navegador também têm configurações próprias de permissão para notificações.
          </p>
        </div>

        {/* Apagar dados */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3 border border-accent-red/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-red/15">
              <Trash2 size={15} className="text-accent-red" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Apagar meus dados</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Remove permanentemente contas, cartões, lançamentos, dívidas e metas deste dispositivo. Suas preferências de
            aparência, moeda e notificações continuam como estão.
          </p>

          {!permissoes.gerenciarMembros ? (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Só um administrador da família pode apagar os dados — eles são compartilhados por todos os perfis deste dispositivo.
            </p>
          ) : !confirmandoExclusao ? (
            <button
              onClick={() => setConfirmandoExclusao(true)}
              className="w-full rounded-xl py-2.5 text-[12.5px] font-bold text-accent-red border border-accent-red/40"
            >
              Apagar todos os dados
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
              <div className="flex items-start gap-2 rounded-xl bg-accent-red/10 p-2.5">
                <AlertTriangle size={14} className="text-accent-red mt-0.5 shrink-0" />
                <p className="text-[11px] text-accent-red font-medium leading-relaxed">
                  Isso não pode ser desfeito. Confirme só se tiver certeza.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmandoExclusao(false)}
                  className="flex-1 rounded-xl py-2.5 text-[12px] font-semibold text-slate-300 card-surface border border-border"
                >
                  Cancelar
                </button>
                <button
                  onClick={aoConfirmarExclusao}
                  className="flex-1 rounded-xl py-2.5 text-[12px] font-bold text-white bg-accent-red"
                >
                  Sim, apagar tudo
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function LinhaSwitch({ label, desc, ativo, onToggle }: { label: string; desc?: string; ativo: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
      <div className="text-left pr-2">
        <p className="text-[12.5px] font-semibold text-white">{label}</p>
        {desc && <p className="text-[10.5px] text-slate-500 leading-relaxed">{desc}</p>}
      </div>
      <span
        className="relative w-11 h-6 rounded-full shrink-0 transition-colors"
        style={{ background: ativo ? 'var(--accent-primaria)' : '#1C2740' }}
      >
        <motion.span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
          animate={{ left: ativo ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
  )
}
