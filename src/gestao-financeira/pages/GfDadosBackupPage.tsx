import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Database, Download, Upload, Clock, CloudOff, AlertTriangle, FileJson, X } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import type { GestaoFinanceiraState } from '../types'

// Tela "Dados e backup" (menu Mais → Dados e backup). Escopo: backup
// manual local (baixar/restaurar um arquivo .json com TUDO da Gestão
// Financeira). O que fica fora por decisão consciente:
// - Sincronização automática em nuvem: não existe backend hoje (ver
//   src/backend/ — só localStorage). Fica registrado como "em breve",
//   sem fingir um toggle que não faz nada.
// - Exportar CSV de lançamentos / PDF-imagem de relatório: já existem
//   em Relatórios (gerarCsvTransacoes, exportarComoPdf/Imagem) — aqui é
//   o backup completo do app (todas as tabelas), não um recorte.
const CHAVE_ULTIMO_BACKUP = 'nexus-gf-ultimo-backup-em'

function baixarArquivo(nome: string, conteudo: string, tipo: string) {
  const blob = new Blob([conteudo], { type: tipo })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function lerUltimoBackup(): string | null {
  try {
    return window.localStorage.getItem(CHAVE_ULTIMO_BACKUP)
  } catch {
    return null
  }
}

function contarRegistros(estado: Pick<GestaoFinanceiraState, 'transacoes' | 'contas' | 'cartoes' | 'dividas' | 'metas' | 'categorias'>) {
  return {
    transacoes: estado.transacoes?.length ?? 0,
    contas: estado.contas?.length ?? 0,
    cartoes: estado.cartoes?.length ?? 0,
    dividas: estado.dividas?.length ?? 0,
    metas: estado.metas?.length ?? 0,
    categorias: estado.categorias?.length ?? 0,
  }
}

export default function GfDadosBackupPage() {
  const navigate = useNavigate()
  const { estado, permissoes, restaurarBackup } = useGestaoFinanceira()
  const inputRef = useRef<HTMLInputElement>(null)
  const [ultimoBackup, setUltimoBackup] = useState<string | null>(() => lerUltimoBackup())
  const [erroImportacao, setErroImportacao] = useState<string | null>(null)
  const [pendente, setPendente] = useState<{ arquivo: GestaoFinanceiraState; nomeArquivo: string } | null>(null)

  const resumoAtual = contarRegistros(estado)

  function aoExportar() {
    const agora = new Date()
    const nomeArquivo = `nexus-financeira-backup-${agora.toISOString().slice(0, 10)}.json`
    baixarArquivo(nomeArquivo, JSON.stringify(estado, null, 2), 'application/json')
    try {
      window.localStorage.setItem(CHAVE_ULTIMO_BACKUP, agora.toISOString())
    } catch {
      // localStorage indisponível — o download em si já aconteceu, só a
      // data "último backup" não fica registrada nesta sessão
    }
    setUltimoBackup(agora.toISOString())
  }

  function aoEscolherArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    e.target.value = ''
    if (!arquivo) return
    setErroImportacao(null)

    const leitor = new FileReader()
    leitor.onload = () => {
      try {
        const dados = JSON.parse(String(leitor.result)) as Partial<GestaoFinanceiraState>
        // Validação leve: um backup de verdade tem essas listas como
        // array. Não valida campo a campo (o reducer já funde com
        // estadoInicial() pra cobrir campos ausentes/antigos).
        if (!Array.isArray(dados.transacoes) || !Array.isArray(dados.contas)) {
          setErroImportacao('Esse arquivo não parece um backup da Gestão Financeira.')
          return
        }
        setPendente({ arquivo: dados as GestaoFinanceiraState, nomeArquivo: arquivo.name })
      } catch {
        setErroImportacao('Não consegui ler esse arquivo — confira se é o .json exportado por aqui.')
      }
    }
    leitor.readAsText(arquivo)
  }

  function aoConfirmarImportacao() {
    if (!pendente) return
    restaurarBackup(pendente.arquivo)
    setPendente(null)
    navigate('/gestao-financeira')
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Dados e backup"
        subtitulo="Exportar e restaurar seus dados"
        icone={Database}
        corIcone="#3B82F6"
        voltarPara="/gestao-financeira/mais"
      />

      <input ref={inputRef} type="file" accept="application/json" className="hidden" onChange={aoEscolherArquivo} />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Exportar */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-blue/15">
              <Download size={15} className="text-accent-blue" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Exportar backup</p>
          </div>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Baixa um arquivo .json com tudo: contas, cartões, lançamentos, dívidas, metas, categorias e suas preferências.
            Guarde em algum lugar seguro (e-mail pra você mesmo, Drive, etc.) — se trocar de celular ou limpar os dados do
            navegador, é esse arquivo que traz tudo de volta.
          </p>
          <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
            <FileJson size={12} />
            <span>
              {resumoAtual.transacoes} lançamentos · {resumoAtual.contas} contas · {resumoAtual.cartoes} cartões ·{' '}
              {resumoAtual.dividas} dívidas · {resumoAtual.metas} metas
            </span>
          </div>
          <button
            onClick={aoExportar}
            className="w-full rounded-xl py-2.5 text-[12.5px] font-bold text-[#04121A] bg-accent-blue flex items-center justify-center gap-1.5"
          >
            <Download size={14} /> Baixar backup agora
          </button>
          <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
            <Clock size={11} />
            {ultimoBackup ? (
              <span>Último backup baixado: {new Date(ultimoBackup).toLocaleString('pt-BR')}</span>
            ) : (
              <span>Nenhum backup baixado neste dispositivo ainda</span>
            )}
          </div>
        </div>

        {/* Importar */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-green/15">
              <Upload size={15} className="text-accent-green" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Restaurar backup</p>
          </div>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Escolha um arquivo .json exportado daqui. Isso <span className="text-white font-semibold">substitui todos os
            dados atuais</span> deste dispositivo pelos do arquivo — não é uma mesclagem.
          </p>
          {permissoes.gerenciarMembros ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full rounded-xl py-2.5 text-[12.5px] font-bold text-white card-surface border border-border flex items-center justify-center gap-1.5"
            >
              <Upload size={14} /> Escolher arquivo
            </button>
          ) : (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Só um administrador da família pode restaurar um backup — isso substitui os dados de todos os perfis deste dispositivo.
            </p>
          )}
          {erroImportacao && (
            <div className="flex items-start gap-2 rounded-xl bg-accent-red/10 p-2.5">
              <AlertTriangle size={13} className="text-accent-red mt-0.5 shrink-0" />
              <p className="text-[11px] text-accent-red font-medium leading-relaxed">{erroImportacao}</p>
            </div>
          )}
        </div>

        {/* Sincronização em nuvem — honesto sobre o que não existe ainda */}
        <div className="card-surface rounded-2xl p-3.5 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-slate-500/15">
            <CloudOff size={15} className="text-slate-400" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">Sincronização automática</p>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
              Ainda não existe — hoje os dados vivem só neste dispositivo, e o backup acima é manual. Fica pra quando o
              backend da Gestão Financeira existir.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmação de restauração */}
      {pendente && (
        <div className="fixed inset-0 z-[999] flex items-end justify-center bg-black/60 px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md card-surface rounded-2xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold text-white">Restaurar este backup?</p>
              <button onClick={() => setPendente(null)} aria-label="Cancelar">
                <X size={16} className="text-slate-500" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{pendente.nomeArquivo}</p>

            <div className="flex items-start gap-2 rounded-xl bg-accent-red/10 p-2.5">
              <AlertTriangle size={14} className="text-accent-red mt-0.5 shrink-0" />
              <p className="text-[11px] text-accent-red font-medium leading-relaxed">
                Os dados atuais deste dispositivo ({resumoAtual.transacoes} lançamentos, {resumoAtual.contas} contas,{' '}
                {resumoAtual.metas} metas) vão ser substituídos pelo conteúdo do arquivo. Isso não pode ser desfeito.
              </p>
            </div>

            <div className="rounded-xl border border-border p-2.5 flex flex-col gap-1">
              <p className="text-[10.5px] text-slate-500 mb-0.5">O arquivo contém</p>
              {(() => {
                const r = contarRegistros(pendente.arquivo)
                return (
                  <p className="text-[11.5px] text-white font-medium">
                    {r.transacoes} lançamentos · {r.contas} contas · {r.cartoes} cartões · {r.dividas} dívidas · {r.metas}{' '}
                    metas
                  </p>
                )
              })()}
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setPendente(null)}
                className="flex-1 rounded-xl py-2.5 text-[12px] font-semibold text-slate-300 card-surface border border-border"
              >
                Cancelar
              </button>
              <button onClick={aoConfirmarImportacao} className="flex-1 rounded-xl py-2.5 text-[12px] font-bold text-white bg-accent-red">
                Substituir tudo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
