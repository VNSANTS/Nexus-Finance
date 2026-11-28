import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type ResultadoEnvio = { job: string; aceitos: number; falharam: number; indisponiveis: number; incertos: number; pendentes: number; concluido: boolean; aguardando: boolean }

export default function PainelEnviarAtualizacao() {
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [falha, setFalha] = useState(false)
  const ultimoJob = useRef<string | null>(null)
  const execucao = useRef<AbortController | null>(null)
  useEffect(() => () => execucao.current?.abort(), [])

  async function enviar() {
    if (enviando || (!ultimoJob.current && !window.confirm('Enviar ou retomar um aviso geral de atualização aos dispositivos autorizados?'))) return
    setEnviando(true)
    setMensagem('')
    setFalha(false)
    const controller = new AbortController()
    execucao.current = controller
    try {
      while (!controller.signal.aborted) {
        const funcao = ultimoJob.current ? `notifications-admin?job=${encodeURIComponent(ultimoJob.current)}` : 'notifications-admin'
        const { data, error } = await supabase.functions.invoke<ResultadoEnvio>(funcao, { body: {}, timeout: 30_000, signal: controller.signal })
        if (error) {
          const resposta = 'context' in error && error.context instanceof Response ? error.context : null
          const detalhe = await resposta?.json().catch(() => null)
          throw new Error(detalhe?.error ?? 'Falha na comunicação. Use o botão para retomar o envio.')
        }
        if (!data) throw new Error('Não foi possível consultar o envio.')
        ultimoJob.current = data.job
        if (!data.concluido) {
          setMensagem(`${data.aceitos} aceito(s) pelos provedores. ${data.pendentes} pendente(s).`)
          if (data.aguardando) await new Promise((resolve) => setTimeout(resolve, 1500))
          continue
        }
        ultimoJob.current = null
        setFalha(data.aceitos === 0)
        setMensagem(`${data.aceitos} aceito(s) pelos provedores. ${data.falharam} falha(s), ${data.indisponiveis} indisponível(is) e ${data.incertos} sem confirmação.`)
        break
      }
    } catch (erro) {
      if (!controller.signal.aborted) {
        setFalha(true)
        setMensagem(erro instanceof Error ? erro.message : 'Não foi possível enviar o aviso.')
      }
    } finally {
      if (!controller.signal.aborted) setEnviando(false)
      if (execucao.current === controller) execucao.current = null
    }
  }

  return (
    <section className="rounded-card border border-border bg-bg-card p-3.5">
      <h2 className="text-[13px] font-semibold text-texto">Aviso geral de atualização</h2>
      <p className="mt-1 text-[11px] text-texto-secundario">Envia um aviso com o link oficial aos dispositivos autorizados das contas ativas.</p>
      {mensagem && <p role={falha ? 'alert' : 'status'} className={`mt-2 text-xs ${falha ? 'text-accent-red' : 'text-accent-green'}`}>{mensagem}</p>}
      <button type="button" onClick={enviar} disabled={enviando} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-accent-cyan px-3 text-xs font-bold text-accent-cyan disabled:opacity-60">
        <Bell size={14} aria-hidden="true" /> {enviando ? 'Enviando…' : ultimoJob.current ? 'Retomar envio' : 'Enviar aviso de atualização'}
      </button>
    </section>
  )
}
