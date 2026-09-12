import { useEffect, useState } from 'react'
import { MessageCircle, Copy, Check, Unlink, Loader2 } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/auth/AuthContext'

// Número do bot — depende do número de teste (ou real) que você configurou
// no Meta for Developers. Fica em .env.local porque muda por instalação
// (cada pessoa que rodar esse projeto vai ter o próprio número).
const NUMERO_BOT = import.meta.env.VITE_WHATSAPP_NUMERO_BOT as string | undefined

function gerarCodigo(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export default function GfWhatsAppPage() {
  const { sessao } = useAuth()
  const [carregando, setCarregando] = useState(true)
  const [telefoneVinculado, setTelefoneVinculado] = useState<string | null>(null)
  const [codigo, setCodigo] = useState<string | null>(null)
  const [copiado, setCopiado] = useState(false)
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const userId = sessao?.user?.id

  useEffect(() => {
    if (!userId) return
    supabase
      .from('profiles')
      .select('whatsapp_telefone, whatsapp_codigo_vinculo, whatsapp_codigo_expira_em')
      .eq('id', userId)
      .single()
      .then(({ data, error }) => {
        if (error) setErro('Não consegui carregar o status do WhatsApp — veja o erro abaixo.')
        setTelefoneVinculado(data?.whatsapp_telefone ?? null)
        const aindaValido = data?.whatsapp_codigo_expira_em && new Date(data.whatsapp_codigo_expira_em) > new Date()
        setCodigo(aindaValido ? data!.whatsapp_codigo_vinculo : null)
        setCarregando(false)
      })
  }, [userId])

  async function gerarNovoCodigo() {
    if (!userId) return
    setProcessando(true)
    setErro(null)
    const novoCodigo = gerarCodigo()
    const expiraEm = new Date(Date.now() + 10 * 60_000).toISOString() // 10 min de validade
    const { error } = await supabase
      .from('profiles')
      .update({ whatsapp_codigo_vinculo: novoCodigo, whatsapp_codigo_expira_em: expiraEm })
      .eq('id', userId)
    if (error) setErro(error.message)
    else setCodigo(novoCodigo)
    setProcessando(false)
  }

  async function desconectar() {
    if (!userId) return
    if (!window.confirm('Desconectar seu WhatsApp do Nexus Finance? Você pode vincular de novo quando quiser.')) return
    setProcessando(true)
    setErro(null)
    const { error } = await supabase.from('profiles').update({ whatsapp_telefone: null }).eq('id', userId)
    if (error) setErro(error.message)
    else setTelefoneVinculado(null)
    setProcessando(false)
  }

  function copiarCodigo() {
    if (!codigo) return
    navigator.clipboard.writeText(codigo)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="pb-10">
      <GfHeader titulo="Conectar WhatsApp" subtitulo="Lance gastos por mensagem" icone={MessageCircle} corIcone="#22C55E" voltarPara="/gestao-financeira/mais" />

      <div className="px-4 mt-4">
        {carregando ? (
          <div className="flex justify-center py-10">
            <Loader2 size={20} className="animate-spin text-slate-500" />
          </div>
        ) : telefoneVinculado ? (
          <div className="card-surface rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-green/15 flex items-center justify-center mx-auto mb-3">
              <Check size={22} className="text-accent-green" />
            </div>
            <p className="text-sm font-semibold text-white mb-1">WhatsApp conectado!</p>
            <p className="text-xs text-slate-500 mb-5">
              Número terminado em •••{telefoneVinculado.slice(-4)}. Manda mensagens tipo "gastei 35 no mercado" que eu registro pra você.
            </p>
            <button
              onClick={desconectar}
              disabled={processando}
              className="flex items-center justify-center gap-1.5 mx-auto text-xs font-semibold text-accent-red disabled:opacity-50"
            >
              <Unlink size={13} /> Desconectar
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-4">
              Conecte seu WhatsApp pra registrar gastos e recebimentos direto por mensagem, sem precisar abrir o app.
            </p>

            {!NUMERO_BOT && (
              <div className="rounded-xl border border-accent-gold/30 bg-accent-gold/5 p-3 mb-4">
                <p className="text-[11.5px] text-slate-400">
                  O número do bot ainda não foi configurado (<code className="text-[10.5px] bg-bg-card px-1 rounded">VITE_WHATSAPP_NUMERO_BOT</code> no{' '}
                  <code className="text-[10.5px] bg-bg-card px-1 rounded">.env.local</code>). Você já pode gerar o código, mas só vai funcionar depois
                  disso configurado.
                </p>
              </div>
            )}

            {codigo ? (
              <div className="card-surface rounded-2xl p-5 text-center mb-4">
                <p className="text-[11px] text-slate-500 mb-2">Seu código (válido por 10 min)</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-3xl font-display font-extrabold text-white tracking-[0.2em]">{codigo}</p>
                  <button onClick={copiarCodigo} className="text-slate-500">
                    {copiado ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-[12px] text-slate-400">
                  Manda esse código pro WhatsApp{NUMERO_BOT ? ` ${NUMERO_BOT}` : ' do bot'} pra vincular sua conta.
                </p>
              </div>
            ) : (
              <button
                onClick={gerarNovoCodigo}
                disabled={processando || !userId}
                className="w-full rounded-full bg-accent-cyan text-black font-semibold py-3.5 text-sm disabled:opacity-50 mb-4"
              >
                {processando ? 'Gerando...' : 'Gerar código de vínculo'}
              </button>
            )}

            {codigo && (
              <button onClick={gerarNovoCodigo} disabled={processando} className="w-full text-xs text-slate-500 disabled:opacity-50">
                Gerar um código novo
              </button>
            )}

            {erro && (
              <p className="text-[11.5px] text-accent-red text-center mt-3 px-2">
                Erro: {erro}. Se a mensagem falar de uma coluna que não existe, é porque o SQL 011 ainda não rodou no Supabase.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
