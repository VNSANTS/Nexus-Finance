import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
import { LocalNotifications, type LocalNotificationSchema } from '@capacitor/local-notifications'
import { useNotificacoesRemotas } from './notificacoesRemotas'

type Area = 'aprender' | 'financas'
type Preferencias = { som: boolean; vibrar: boolean }
export interface LembreteDispositivo {
  chave: string
  titulo: string
  mensagem: string
  rota: string
  horario?: Date
}

const ROTAS_NOTIFICACAO = new Set([
  '/', '/aprender', '/desafio-diario', '/revisao', '/perfil',
  '/gestao-financeira/dividas', '/gestao-financeira/orcamento',
  '/gestao-financeira/metas', '/gestao-financeira/relatorios',
])
const MARCADOR = 'nexus-lembretes-v1'
let fila = Promise.resolve()
let contaAtiva: string | null = null

export const notificacoesLocaisAndroid = Capacitor.getPlatform() === 'android'

export function aoRetomarAndroid(callback: () => void) {
  if (!notificacoesLocaisAndroid) return () => {}
  let ativo = true
  const listener = App.addListener('appStateChange', ({ isActive }) => {
    if (ativo && isActive) callback()
  }).catch(() => null)
  return () => {
    ativo = false
    void listener.then((l) => l?.remove()).catch(() => {})
  }
}

export async function consultarPermissaoNotificacoes() {
  try {
    if (notificacoesLocaisAndroid) {
      if (!Capacitor.isPluginAvailable('LocalNotifications')) return 'indisponivel'
      const { display } = await LocalNotifications.checkPermissions()
      if (display === 'prompt' || display === 'prompt-with-rationale') return 'default'
      return display === 'granted' && (await LocalNotifications.areEnabled()).value ? 'granted' : 'denied'
    }
    return 'Notification' in window ? Notification.permission : 'indisponivel'
  } catch {
    return 'indisponivel'
  }
}

export async function pedirPermissaoNotificacoes() {
  try {
    if (notificacoesLocaisAndroid) {
      if (!Capacitor.isPluginAvailable('LocalNotifications')) return 'indisponivel'
      await LocalNotifications.requestPermissions()
      return (await consultarPermissaoNotificacoes()) === 'granted' ? 'autorizado' : 'negado'
    }
    if (!('Notification' in window)) return 'indisponivel'
    return (await Notification.requestPermission()) === 'granted' ? 'autorizado' : 'negado'
  } catch {
    return 'indisponivel'
  }
}

export async function mostrarNotificacaoWeb(titulo: string, opcoes: NotificationOptions, conta = contaAtiva) {
  if (notificacoesLocaisAndroid || !('Notification' in window) || Notification.permission !== 'granted') return
  try {
    const registro = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : undefined
    if (!conta || conta !== contaAtiva || Notification.permission !== 'granted') return
    if (registro?.active) await registro.showNotification(titulo, opcoes)
    else new Notification(titulo, opcoes)
  } catch {
    // Alguns navegadores móveis exigem um service worker ativo.
  }
}

function emOrdem(operacao: () => Promise<void>) {
  if (!notificacoesLocaisAndroid || !Capacitor.isPluginAvailable('LocalNotifications')) return
  fila = fila.then(operacao).catch(() => {
    // Uma falha do plugin não bloqueia o próximo ciclo de reconciliação.
  })
}

function idDoLembrete(conta: string, area: Area, chave: string) {
  let hash = 0x811c9dc5
  for (const letra of JSON.stringify([conta, area, chave])) {
    hash = Math.imul(hash ^ letra.charCodeAt(0), 0x01000193)
  }
  return (hash & 0x3fffffff) + 1
}

function canal(area: Area, prefs: Preferencias) {
  return `nexus-${area}-${Number(prefs.som)}-${Number(prefs.vibrar)}`
}

async function prepararCanal(area: Area, prefs: Preferencias) {
  const versaoAndroid = Number(/Android\s+(\d+)/i.exec(navigator.userAgent)?.[1] ?? 8)
  if (versaoAndroid < 8) {
    // O plugin usa o som e a vibração do sistema antes dos canais do Android 8.
    // Nesses aparelhos, respeita o modo silencioso omitindo o alerta do SO.
    return prefs.som && prefs.vibrar
  }
  await LocalNotifications.createChannel({
    id: canal(area, prefs),
    name: `${area === 'aprender' ? 'Aprender' : 'Gestão Financeira'}${prefs.som ? '' : ' • sem som'}${prefs.vibrar ? '' : ' • sem vibração'}`,
    importance: prefs.som ? 3 : 2,
    vibration: prefs.vibrar,
    visibility: 0,
  })
  return true
}

function gerarNotificacao(conta: string, area: Area, lembrete: LembreteDispositivo, prefs: Preferencias): LocalNotificationSchema {
  return {
    id: idDoLembrete(conta, area, lembrete.chave),
    title: lembrete.titulo,
    body: lembrete.mensagem,
    channelId: canal(area, prefs),
    isExactNotification: false,
    schedule: lembrete.horario ? { at: lembrete.horario, allowWhileIdle: true } : undefined,
    extra: {
      marcador: MARCADOR, conta, area, rota: lembrete.rota,
      horario: lembrete.horario?.getTime(), canal: canal(area, prefs),
    },
  }
}

async function cancelarPendentes(notifications: { id: number }[]) {
  if (notifications.length > 0) await LocalNotifications.cancel({ notifications })
}

export function sincronizarLembretesAndroid(conta: string, area: Area, lembretes: LembreteDispositivo[], prefs: Preferencias) {
  emOrdem(async () => {
    if (contaAtiva !== conta) return
    const permissao = await consultarPermissaoNotificacoes()
    const candidatos = permissao === 'granted' && lembretes.length && await prepararCanal(area, prefs)
      ? lembretes.map((lembrete) => gerarNotificacao(conta, area, lembrete, prefs))
      : []
    const desejadas = new Map(candidatos.map((n) => [n.id, n]))
    const { notifications } = await LocalNotifications.getAll({ state: 'SCHEDULED' })
    const remover = notifications.filter((n) => {
      if (n.extra?.marcador !== MARCADOR || n.extra.conta !== conta || n.extra.area !== area) return false
      const nova = desejadas.get(n.id)
      if (nova && n.extra.horario === nova.extra.horario && n.extra.canal === nova.extra.canal && n.title === nova.title && n.body === nova.body) {
        desejadas.delete(n.id)
        return false
      }
      return true
    })
    await cancelarPendentes(remover)
    if (contaAtiva !== conta) return
    const novas = Array.from(desejadas.values()).filter((n) => (n.schedule?.at?.getTime() ?? 0) > Date.now())
    if (novas.length > 0) await LocalNotifications.schedule({ notifications: novas })
  })
}

export function mostrarLembreteAndroid(conta: string, area: Area, lembrete: LembreteDispositivo, prefs: Preferencias) {
  emOrdem(async () => {
    if (contaAtiva !== conta || (await consultarPermissaoNotificacoes()) !== 'granted') return
    if (await prepararCanal(area, prefs) && contaAtiva === conta) {
      await LocalNotifications.schedule({ notifications: [gerarNotificacao(conta, area, lembrete, prefs)] })
    }
  })
}

/** Monta uma vez dentro do Router, inclusive nas telas do bloqueio do APK. */
export function useContaNotificacoesLocais(conta: string | null, verificando: boolean) {
  const navigate = useNavigate()
  useNotificacoesRemotas(conta, verificando)

  useEffect(() => {
    contaAtiva = verificando ? null : conta
    if (verificando) return

    function limparAlertas() {
      emOrdem(async () => {
        const permissoes = contaAtiva ? await consultarPermissaoNotificacoes() : null
        const contaAutorizada = permissoes === 'granted' ? contaAtiva : null
        const { notifications } = await LocalNotifications.getAll({ state: 'SCHEDULED' })
        await cancelarPendentes(notifications.filter((n) => n.extra?.marcador === MARCADOR && n.extra.conta !== contaAutorizada))
        const entregues = await LocalNotifications.getAll({ state: 'TRIGGERED' })
        const ids = entregues.notifications.filter((n) => n.extra?.marcador === MARCADOR && n.extra.conta !== contaAutorizada).map((n) => n.id)
        if (ids.length > 0) await LocalNotifications.removeDeliveredNotificationsById({ ids })
      })
    }

    limparAlertas()
    return aoRetomarAndroid(limparAlertas)
  }, [conta, verificando])

  useEffect(() => {
    if (verificando || !conta || !notificacoesLocaisAndroid || !Capacitor.isPluginAvailable('LocalNotifications')) return
    let ativo = true
    const listener = LocalNotifications.addListener('localNotificationActionPerformed', ({ notification }) => {
      const { marcador, conta: dono, rota } = notification.extra ?? {}
      if (ativo && marcador === MARCADOR && dono === contaAtiva && ROTAS_NOTIFICACAO.has(rota)) void navigate(rota)
    }).catch(() => null)
    return () => {
      ativo = false
      void listener.then((l) => l?.remove()).catch(() => {})
    }
  }, [conta, navigate, verificando])
}
