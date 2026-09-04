import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, X, Pencil, Trash2, Repeat, ShieldCheck, Info } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfFormMembro from '../components/GfFormMembro'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { LABEL_PERMISSAO, PAPEIS, membroAtivo, quantosAdministradores } from '../permissoes'
import type { Membro, PermissoesMembro } from '../types'

type Modal = { modo: 'novo' } | { modo: 'editar'; membro: Membro } | null

// Tela "Família e perfis" (menu Mais). Importante: a Gestão Financeira
// inteira é local, sem servidor (ver GestaoFinanceiraContext.tsx) — então
// isto NÃO é uma conta compartilhada de verdade entre aparelhos diferentes.
// É um jeito de organizar quem, no mesmo dispositivo, está lançando o quê,
// com permissões que o app respeita (ex.: esconder o botão de lançar pra
// quem só pode visualizar). Não tem senha por perfil — trocar de perfil é
// só escolher na lista, igual trocar de usuário num app de streaming.
export default function GfFamiliaPerfisPage() {
  const { estado, permissoes, excluirMembro, definirMembroAtivo } = useGestaoFinanceira()
  const [modal, setModal] = useState<Modal>(null)
  const [trocaAberta, setTrocaAberta] = useState(false)

  const ativo = membroAtivo(estado)

  function pedirExclusao(membro: Membro) {
    if (membro.principal) {
      window.alert('O membro principal não pode ser excluído — é o dono do dispositivo.')
      return
    }
    if (membro.permissoes.gerenciarMembros && quantosAdministradores(estado.membros) === 1) {
      window.alert('Esse é o único administrador da família — promova outro membro antes de excluir este.')
      return
    }
    if (window.confirm(`Remover "${membro.nome}" da família? Os lançamentos já feitos por essa pessoa continuam existindo, só ficam sem dono.`)) {
      excluirMembro(membro.id)
    }
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Família e perfis"
        subtitulo="Quem usa este dispositivo e o que cada um pode fazer"
        icone={Users}
        corIcone="#EC4899"
        voltarPara="/gestao-financeira/mais"
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Perfil ativo */}
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[11px] text-slate-500 font-medium mb-2.5">Usando agora</p>
          {ativo ? (
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-[20px]"
                style={{ background: `${ativo.cor}26`, border: `2px solid ${ativo.cor}` }}
              >
                {ativo.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-white truncate">{ativo.nome}</p>
                <p className="text-[11px] text-slate-500">{PAPEIS.find((p) => p.id === ativo.papel)?.label}</p>
              </div>
              {estado.membros.length > 1 && (
                <button
                  onClick={() => setTrocaAberta(true)}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11.5px] font-semibold text-accent-cyan border border-accent-cyan/30"
                >
                  <Repeat size={13} /> Trocar
                </button>
              )}
            </div>
          ) : (
            <p className="text-[12px] text-slate-500">Nenhum perfil configurado ainda.</p>
          )}
        </div>

        {/* Lista de membros */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-[12.5px] font-semibold text-slate-400">Membros da família ({estado.membros.length})</p>
          {permissoes.gerenciarMembros && (
            <button onClick={() => setModal({ modo: 'novo' })} className="flex items-center gap-1 text-[12px] font-semibold text-accent-cyan">
              <Plus size={14} /> Adicionar
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          {estado.membros.map((membro) => (
            <div key={membro.id} className="card-surface rounded-2xl p-3.5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[17px]"
                style={{ background: `${membro.cor}26`, border: `2px solid ${membro.cor}` }}
              >
                {membro.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-semibold text-white truncate">{membro.nome}</p>
                  {membro.id === estado.membroAtivoId && (
                    <span className="text-[9px] font-bold text-accent-cyan bg-accent-cyan/15 rounded-full px-1.5 py-0.5 shrink-0">ATIVO</span>
                  )}
                </div>
                <p className="text-[10.5px] text-slate-500">
                  {PAPEIS.find((p) => p.id === membro.papel)?.label}
                  {membro.principal ? ' · Principal' : ''}
                </p>
                <ChipsPermissoes permissoes={membro.permissoes} />
              </div>
              {permissoes.gerenciarMembros && (
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setModal({ modo: 'editar', membro })} className="p-1.5 text-slate-500" aria-label="Editar membro">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => pedirExclusao(membro)} className="p-1.5 text-slate-500" aria-label="Excluir membro">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Como funciona */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-blue/15">
              <Info size={15} className="text-accent-blue" />
            </div>
            <p className="text-[13px] font-semibold text-white">Como funciona por aqui</p>
          </div>
          <p className="text-[10.5px] text-slate-500 leading-relaxed">
            Todos os perfis compartilham os mesmos dados, salvos só neste aparelho — não existe login nem sincronização
            entre dispositivos diferentes. Trocar de perfil não pede senha; as permissões controlam o que aparece e o
            que dá pra fazer no app enquanto aquele perfil está ativo, mas não protegem contra quem tem acesso físico
            ao aparelho. Bloqueio de verdade com PIN fica pra tela Segurança.
            {!permissoes.gerenciarMembros && ' Seu perfil não tem permissão de gerenciar membros — só um administrador pode adicionar, editar ou remover alguém da família.'}
          </p>
        </div>
      </div>

      {/* Modal: novo/editar membro — só monta pra quem tem permissão de gerenciar */}
      {permissoes.gerenciarMembros && (
        <ModalFormulario aberto={modal !== null} titulo={modal?.modo === 'editar' ? 'Editar membro' : 'Novo membro'} onFechar={() => setModal(null)}>
          <GfFormMembro
            membroEditando={modal?.modo === 'editar' ? modal.membro : null}
            onSalvar={() => setModal(null)}
            onCancelar={() => setModal(null)}
          />
        </ModalFormulario>
      )}

      {/* Modal: trocar perfil ativo */}
      <ModalFormulario aberto={trocaAberta} titulo="Trocar perfil" onFechar={() => setTrocaAberta(false)}>
        <div className="flex flex-col gap-2 pb-4">
          {estado.membros.map((membro) => (
            <button
              key={membro.id}
              onClick={() => {
                definirMembroAtivo(membro.id)
                setTrocaAberta(false)
              }}
              className={`flex items-center gap-3 rounded-2xl p-3 border ${
                membro.id === estado.membroAtivoId ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[17px]"
                style={{ background: `${membro.cor}26`, border: `2px solid ${membro.cor}` }}
              >
                {membro.emoji}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[13px] font-semibold text-white truncate">{membro.nome}</p>
                <p className="text-[10.5px] text-slate-500">{PAPEIS.find((p) => p.id === membro.papel)?.label}</p>
              </div>
              {membro.id === estado.membroAtivoId && <ShieldCheck size={16} className="text-accent-cyan shrink-0" />}
            </button>
          ))}
        </div>
      </ModalFormulario>
    </div>
  )
}

function ChipsPermissoes({ permissoes }: { permissoes: PermissoesMembro }) {
  const negadas = (Object.keys(LABEL_PERMISSAO) as (keyof PermissoesMembro)[]).filter((k) => !permissoes[k])
  if (negadas.length === 0) {
    return <p className="text-[9.5px] text-accent-green mt-1">Acesso total</p>
  }
  return (
    <p className="text-[9.5px] text-slate-600 mt-1 truncate">
      Sem: {negadas.map((k) => LABEL_PERMISSAO[k].split(' ')[0]).join(', ')}
    </p>
  )
}

function ModalFormulario({ aberto, titulo, onFechar, children }: { aberto: boolean; titulo: string; onFechar: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[var(--cor-overlay)] flex items-end justify-center"
          onClick={onFechar}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] max-h-[88vh] overflow-y-auto bg-bg rounded-t-[28px] border-t border-border px-5 pt-5 pb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-display font-extrabold text-white">{titulo}</p>
              <button onClick={onFechar} className="text-slate-500" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
