import { useEffect } from 'react'
import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor, type PluginListenerHandle } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { PushNotifications } from '@capacitor/push-notifications'
import { supabase } from './supabase'

const LINK_OFICIAL = 'https://nexus-finance-vn.lovable.app'
const CHAVE_INSTALACAO = 'nexus-push-instalacao:v1'
const CHAVE_CONSENTIMENTO = 'nexus-push-consentimento:v1'
const ANDROID_FCM = Capacitor.getPlatform() === 'android' && import.meta.env.VITE_FCM_ANDROID_ENABLED === 'true'
const WEB_KEY = import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY?.trim()

let contaAtiva: string | null = null
let contaAnterior: string | null = null
let registro: Promise<void> | null = null
let registroConta: string | null = null
let suspensa: string | null = null
let ultimoRegistro = 0

export function avisosRemotosDisponiveis() {
  if (Capacitor.isNativePlatform()) return ANDROID_FCM && Capacitor.isPluginAvailable('PushNotifications')
  return Boolean(WEB_KEY && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window)
}

function obterInstalacao(criar: boolean) {
  const existente = localStorage.getItem(CHAVE_INSTALACAO)
  if (existente) {
    try {
      const { instalacao, prova } = JSON.parse(existente)
      if (typeof instalacao === 'string' && typeof prova === 'string') return { instalacao, prova }
    } catch { /* O registro de desenvolvimento anterior não tinha prova. */ }
  }
  if (!criar) return null
  const instalacao = crypto.randomUUID()
  const prova = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, '0')).join('')
  const registroDispositivo = { instalacao, prova }
  localStorage.setItem(CHAVE_INSTALACAO, JSON.stringify(registroDispositivo))
  return registroDispositivo
}

export function avisosRemotosAutorizados(conta: string) {
  try {
    return localStorage.getItem(`${CHAVE_CONSENTIMENTO}:${conta}`) === 'true'
  } catch {
    return false
  }
}

async function chamarCadastro(conta: string, body: Record<string, unknown>, timeout: number) {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user.id !== conta) throw new Error('A conta mudou. Tente novamente.')
  const { data, error } = await supabase.functions.invoke<{ ok: boolean }>('notifications-device', {
    body, timeout, headers: { Authorization: `Bearer ${session.access_token}` },
  })
  if (error || !data?.ok) throw new Error('Não foi possível atualizar o cadastro do dispositivo.')
}

async function obterTokenFcm() {
  const handles: PluginListenerHandle[] = []
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    return await new Promise<string>((resolve, reject) => {
      const iniciar = async () => {
        handles.push(await PushNotifications.addListener('registration', ({ value }) => resolve(value)))
        handles.push(await PushNotifications.addListener('registrationError', () => reject(new Error('FCM não está disponível neste dispositivo.'))))
        timeout = setTimeout(() => reject(new Error('Tempo limite ao registrar notificações do Android.')), 10_000)
        await PushNotifications.register()
      }
      void iniciar().catch(reject)
    })
  } finally {
    clearTimeout(timeout)
    await Promise.allSettled(handles.map((handle) => handle.remove()))
  }
}

function chaveDeAplicacao() {
  const key = WEB_KEY?.replace(/-/g, '+').replace(/_/g, '/') ?? ''
  return Uint8Array.from(atob(key.padEnd(Math.ceil(key.length / 4) * 4, '=')), (caractere) => caractere.charCodeAt(0))
}

async function registrar(conta: string, pedirPermissao: boolean) {
  if (contaAtiva !== conta || suspensa === conta) throw new Error('A conta mudou. Tente novamente.')
  const instalacao = obterInstalacao(true)
  let credencial: Record<string, unknown>
  if (ANDROID_FCM) {
    const { receive } = pedirPermissao ? await PushNotifications.requestPermissions() : await PushNotifications.checkPermissions()
    if (receive !== 'granted' || !(await LocalNotifications.areEnabled()).value) throw new Error('Autorize as notificações nas configurações do Android.')
    credencial = { provider: 'fcm', address: await obterTokenFcm() }
  } else {
    const permissao = pedirPermissao ? await Notification.requestPermission() : Notification.permission
    if (permissao !== 'granted') throw new Error('Autorize as notificações nas configurações do navegador.')
    const worker = await navigator.serviceWorker.getRegistration()
    if (!worker?.active) throw new Error('Reabra o Nexus Finance para concluir a instalação das notificações.')
    const chave = chaveDeAplicacao()
    let subscription = await worker.pushManager.getSubscription()
    const chaveAnterior = subscription?.options.applicationServerKey
    if (subscription && chaveAnterior && (chaveAnterior.byteLength !== chave.length || !new Uint8Array(chaveAnterior).every((byte, i) => byte === chave[i]))) {
      await subscription.unsubscribe()
      subscription = null
    }
    subscription ??= await worker.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chave })
    credencial = { provider: 'webpush', address: subscription.endpoint, keys: subscription.toJSON().keys }
  }
  if (contaAtiva !== conta || suspensa === conta) throw new Error('A conta mudou. Tente novamente.')
  await chamarCadastro(conta, { acao: 'registrar', ...instalacao, ...credencial }, 6000)
  ultimoRegistro = Date.now()
}

function sincronizar(conta: string, pedirPermissao: boolean) {
  if (!avisosRemotosDisponiveis()) return Promise.reject(new Error('Avisos de atualização indisponíveis neste dispositivo.'))
  if (registro && registroConta === conta) return registro
  const anterior = registro
  registroConta = conta
  const atual = (anterior?.catch(() => {}) ?? Promise.resolve()).then(() => registrar(conta, pedirPermissao))
  registro = atual
  const limparRegistro = () => {
    if (registro === atual) { registro = null; registroConta = null }
  }
  void atual.then(limparRegistro, limparRegistro)
  return atual
}

export async function ativarAvisosRemotos(conta: string) {
  if (suspensa === conta) suspensa = null
  try {
    await sincronizar(conta, true)
    if (conta !== contaAtiva || suspensa === conta) throw new Error('A conta mudou. Tente novamente.')
    localStorage.setItem(`${CHAVE_CONSENTIMENTO}:${conta}`, 'true')
  } catch (erro) {
    await desvincularAvisosRemotos(conta)
    throw erro
  }
}

async function cancelarNoDispositivo() {
  if (ANDROID_FCM && Capacitor.isPluginAvailable('PushNotifications')) return PushNotifications.unregister()
  if (!Capacitor.isNativePlatform() && 'serviceWorker' in navigator && 'PushManager' in window) {
    const worker = await navigator.serviceWorker.getRegistration()
    const subscription = await worker?.pushManager.getSubscription()
    if (subscription) await subscription.unsubscribe()
  }
}

export async function desvincularAvisosRemotos(conta: string, desativarPreferencia = false) {
  if (!conta || !avisosRemotosDisponiveis()) return
  suspensa = conta
  if (desativarPreferencia) localStorage.removeItem(`${CHAVE_CONSENTIMENTO}:${conta}`)
  const instalacao = obterInstalacao(false)
  if (!instalacao) return
  await Promise.race([registro?.catch(() => {}) ?? Promise.resolve(), new Promise<void>((resolve) => setTimeout(resolve, 2000))])
  const resultados = await Promise.allSettled([
    chamarCadastro(conta, { acao: 'remover', ...instalacao }, 3500),
    cancelarNoDispositivo(),
  ])
  if (desativarPreferencia && resultados.every((resultado) => resultado.status === 'rejected')) {
    throw new Error('Não foi possível confirmar que o dispositivo foi removido. Tente novamente com conexão.')
  }
}

export function useNotificacoesRemotas(conta: string | null, verificando: boolean) {
  useEffect(() => {
    contaAtiva = conta
    if (verificando || !avisosRemotosDisponiveis()) return
    if (conta !== contaAnterior) {
      ultimoRegistro = 0
      if (contaAnterior) void cancelarNoDispositivo().catch(() => {})
      if (suspensa !== conta) suspensa = null
      contaAnterior = conta
    }
    if (!conta) return
    const verificar = async () => {
      if (!avisosRemotosAutorizados(conta) || suspensa === conta || contaAtiva !== conta) return
      const permitido = ANDROID_FCM
        ? (await PushNotifications.checkPermissions()).receive === 'granted' && (await LocalNotifications.areEnabled()).value
        : Notification.permission === 'granted'
      if (!permitido) return desvincularAvisosRemotos(conta)
      if (Date.now() - ultimoRegistro >= 10 * 60_000) await sincronizar(conta, false)
    }
    const retomar = () => void verificar().catch(() => {})
    retomar()
    let ativo = true
    const listeners = ANDROID_FCM ? [
      App.addListener('appStateChange', ({ isActive }) => { if (ativo && isActive) retomar() }),
      PushNotifications.addListener('pushNotificationActionPerformed', ({ notification }) => {
        if (ativo && contaAtiva === conta && notification.data?.url === LINK_OFICIAL) void Browser.open({ url: LINK_OFICIAL }).catch(() => {})
      }),
    ] : []
    const pendentes = Promise.allSettled(listeners)
    if (!ANDROID_FCM) window.addEventListener('focus', retomar)
    return () => {
      ativo = false
      window.removeEventListener('focus', retomar)
      void pendentes.then((resultados) => Promise.allSettled(resultados.flatMap((r) => r.status === 'fulfilled' ? [r.value.remove()] : [])))
    }
  }, [conta, verificando])
}
