import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, EyeOff, HardDrive, Camera, Trash2, AlertTriangle } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'

// Tela "Privacidade" (menu Mais → Privacidade). Escopo: o que dá pra
// controlar de fato dentro do app hoje — ocultar valores, gerenciar as
// permissões usadas pelo app e apagar dados. O que fica de fora por
// decisão consciente, não por esquecimento:
// - PIN/biometria/sessões: isso é a tela "Segurança" (ainda não construída).
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

  const totalRegistros =
    estado.transacoes.length + estado.contas.length + estado.cartoes.length + estado.dividas.length + estado.metas.length

  const statusNotificacaoNavegador: 'granted' | 'denied' | 'default' | 'indisponivel' =
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'indisponivel'

  async function ativarNotificacaoNavegador() {
    if (!('Notification' in window)) {
      setAvisoPermissao('Seu navegador não suporta notificações nativas.')
      setTimeout(() => setAvisoPermissao(null), 3500)
      return
    }
    const permissao = await Notification.requestPermission()
    if (permissao === 'granted') {
      definirPreferenciasNotificacoes({ notificacaoNavegador: true })
    } else {
      definirPreferenciasNotificacoes({ notificacaoNavegador: false })
      setAvisoPermissao('Permissão negada no navegador — pra reverter, é nas configurações do site, não por aqui.')
      setTimeout(() => setAvisoPermissao(null), 4500)
    }
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
            Isso é um véu visual, não uma trava — não pede senha nem PIN pra voltar. Bloqueio de verdade com PIN ou biometria vai ficar na tela Segurança.
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
            Tudo da Gestão Financeira — contas, cartões, lançamentos, dívidas e metas — fica salvo só neste dispositivo, no
            armazenamento local do navegador. Nada é enviado pra nenhum servidor, nenhuma nuvem e não existe coleta de dados
            de uso (analytics) rodando hoje.
          </p>
          <p className="text-[10.5px] text-slate-500">{totalRegistros} registros salvos localmente agora</p>
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
              label="Notificações do navegador"
              desc="Mostra alerta nativo do sistema mesmo com a aba em segundo plano"
              ativo={notifPrefs.notificacaoNavegador}
              onToggle={() =>
                notifPrefs.notificacaoNavegador
                  ? definirPreferenciasNotificacoes({ notificacaoNavegador: false })
                  : ativarNotificacaoNavegador()
              }
            />
            {statusNotificacaoNavegador === 'denied' && (
              <p className="text-[10px] text-slate-500 leading-relaxed">
                O navegador está bloqueando notificações pra este site — o app não consegue religar isso sozinho, precisa
                liberar nas configurações do site no navegador primeiro.
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
            Esses três controlam de verdade o que o app faz. A única coisa que continua fora daqui é a permissão do próprio
            navegador (o "Permitir/Bloquear" que ele pergunta) — o app não tem como reverter uma negação por conta própria,
            só pedir de novo ou te avisar quando estiver bloqueada.
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
