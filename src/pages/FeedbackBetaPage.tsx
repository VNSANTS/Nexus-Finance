import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ClipboardCopy, MessageSquare, Share2 } from 'lucide-react'

type Categoria = 'Erro' | 'Sugestão' | 'Dificuldade' | 'Elogio'
const MAX_DESCRICAO = 2000

export default function FeedbackBetaPage() {
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState<Categoria>('Erro')
  const [tela, setTela] = useState('')
  const [descricao, setDescricao] = useState('')
  const [passos, setPassos] = useState('')
  const [esperado, setEsperado] = useState('')
  const [status, setStatus] = useState('')
  const valido = descricao.trim().length >= 10

  const relato = useMemo(() => [
    'NEXUS FINANCE | RELATO DA BETA ANDROID',
    `Categoria: ${categoria}`,
    `Tela/recurso: ${tela.trim() || 'Não informado'}`,
    `Descrição: ${descricao.trim()}`,
    `Passos para reproduzir: ${passos.trim() || 'Não informado'}`,
    `O que era esperado: ${esperado.trim() || 'Não informado'}`,
    `Data: ${new Date().toLocaleDateString('pt-BR')}`,
  ].join('\n\n'), [categoria, tela, descricao, passos, esperado])

  async function copiar() {
    if (!valido) return
    try {
      await navigator.clipboard.writeText(relato)
      setStatus('Relato copiado. Cole no grupo de testes para enviar.')
    } catch {
      // Fallback para WebViews sem Clipboard API.
      const campo = document.createElement('textarea')
      campo.value = relato
      campo.style.position = 'fixed'
      campo.style.left = '-9999px'
      document.body.appendChild(campo)
      campo.select()
      const ok = document.execCommand('copy')
      campo.remove()
      setStatus(ok ? 'Relato copiado. Cole no grupo de testes para enviar.' : 'Não foi possível copiar. Use Compartilhar ou selecione o texto do relato.')
    }
  }

  async function compartilhar() {
    if (!valido) return
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Nexus Finance: feedback beta', text: relato })
        setStatus('Compartilhamento concluído pelo aparelho.')
        return
      } catch (erro) {
        if (erro instanceof DOMException && erro.name === 'AbortError') return
      }
    }
    await copiar()
  }

  return (
    <main className="px-4 pt-5 pb-28 text-texto max-w-[480px] mx-auto">
      <button type="button" className="flex items-center gap-2 text-sm text-texto-secundario mb-5" onClick={() => navigate('/perfil')}>
        <ArrowLeft size={18} /> Voltar ao perfil
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent-cyan/15 flex items-center justify-center"><MessageSquare size={20} /></div>
        <div><h1 className="text-xl font-bold">Feedback da versão beta</h1><p className="text-xs text-texto-secundario">Ajude a melhorar o Nexus Finance</p></div>
      </div>
      <p className="text-xs text-texto-secundario leading-relaxed mb-6">
        Informe falhas, dificuldades ou ideias. Não envie senhas, CPF, tokens, valores de contas nem capturas com informações pessoais.
        Nenhuma informação é enviada automaticamente: você escolhe onde compartilhar.
      </p>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Tipo do relato
          <select value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)} className="w-full rounded-xl bg-bg-card border border-border px-3 py-3">
            {(['Erro', 'Sugestão', 'Dificuldade', 'Elogio'] as const).map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Em qual tela ou recurso?
          <input value={tela} onChange={(e) => setTela(e.target.value.slice(0, 120))} placeholder="Ex.: Módulo 3, gestão financeira" maxLength={120} className="w-full rounded-xl bg-bg-card border border-border px-3 py-3" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          O que aconteceu? (mínimo 10 caracteres)
          <textarea rows={4} value={descricao} onChange={(e) => setDescricao(e.target.value.slice(0, MAX_DESCRICAO))} maxLength={MAX_DESCRICAO} placeholder="Explique exatamente o que ocorreu ou o que pode melhorar" className="w-full rounded-xl bg-bg-card border border-border px-3 py-3 resize-y" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Como reproduzir? (opcional)
          <textarea rows={3} value={passos} onChange={(e) => setPassos(e.target.value.slice(0, 1200))} maxLength={1200} placeholder="1. Abri a tela... 2. Toquei em..." className="w-full rounded-xl bg-bg-card border border-border px-3 py-3 resize-y" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          O que você esperava? (opcional)
          <textarea rows={2} value={esperado} onChange={(e) => setEsperado(e.target.value.slice(0, 600))} maxLength={600} className="w-full rounded-xl bg-bg-card border border-border px-3 py-3 resize-y" />
        </label>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button type="button" onClick={copiar} disabled={!valido} className="rounded-xl border border-border px-3 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-40"><ClipboardCopy size={16} /> Copiar</button>
          <button type="button" onClick={compartilhar} disabled={!valido} className="rounded-xl bg-accent-cyan text-black px-3 py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"><Share2 size={16} /> Compartilhar</button>
        </div>
        {status && <p role="status" className="text-sm text-accent-green">{status}</p>}
      </div>
    </main>
  )
}
