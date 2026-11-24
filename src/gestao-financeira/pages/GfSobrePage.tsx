import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Database, FileText, HelpCircle, Lock, Mail, MessageSquare, ShieldCheck } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import NexusLogo from '@/components/NexusLogo'

const EMAIL_CONTATO = 'vinisantossfsa@gmail.com'
const BASE_URL = import.meta.env.BASE_URL

export default function GfSobrePage() {
  const navigate = useNavigate()

  return (
    <div className="pb-10">
      <GfHeader titulo="Sobre" subtitulo="Ajuda, privacidade e termos" icone={HelpCircle} corIcone="#64748B" voltarPara="/gestao-financeira/mais" />

      <div className="px-4 mt-4 flex flex-col gap-3">
        <div className="card-surface rounded-2xl p-4 flex items-center justify-center gap-3">
          <NexusLogo size={40} showWordmark={false} />
          <p className="text-[14px] font-bold text-white">Nexus Finance</p>
        </div>

        <section className="card-surface rounded-2xl p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent-cyan/15">
              <Mail size={15} className="text-accent-cyan" />
            </div>
            <div>
              <h2 className="text-[13.5px] font-semibold text-white">Ajuda e suporte</h2>
              <p className="text-[10.5px] text-slate-500">Fale com a equipe ou envie um relato</p>
            </div>
          </div>
          <a
            href={`mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent('Ajuda e suporte — Nexus Finance')}`}
            className="w-full rounded-xl py-2.5 text-center text-[12px] font-semibold text-black bg-accent-cyan"
          >
            Enviar e-mail ao suporte
          </a>
          <button
            type="button"
            onClick={() => navigate('/feedback-beta')}
            className="w-full rounded-xl py-2.5 text-[12px] font-semibold text-slate-200 card-surface border border-border flex items-center justify-center gap-2"
          >
            <MessageSquare size={14} /> Relatar um problema
          </button>
          <p className="text-[10.5px] leading-relaxed text-slate-500">Não envie senhas, códigos de acesso ou dados bancários.</p>
        </section>

        <section className="card-surface rounded-2xl overflow-hidden">
          <a href={`${BASE_URL}privacy-policy.html`} className="flex items-center gap-3 p-3.5 border-b border-border">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent-blue/15">
              <Lock size={15} className="text-accent-blue" />
            </div>
            <span className="flex-1 text-[12.5px] font-semibold text-white">Política de privacidade</span>
            <ArrowUpRight size={15} className="text-slate-500" />
          </a>
          <a href={`${BASE_URL}termos-de-uso.html`} className="flex items-center gap-3 p-3.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent-purple/15">
              <FileText size={15} className="text-accent-purple" />
            </div>
            <span className="flex-1 text-[12.5px] font-semibold text-white">Termos de uso</span>
            <ArrowUpRight size={15} className="text-slate-500" />
          </a>
        </section>

        <section className="card-surface rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => navigate('/gestao-financeira/dados-backup')}
            className="w-full flex items-center gap-3 p-3.5 text-left border-b border-border"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent-green/15">
              <Database size={15} className="text-accent-green" />
            </div>
            <span className="flex-1 text-[12.5px] font-semibold text-white">Exportar ou restaurar dados</span>
            <ArrowUpRight size={15} className="text-slate-500" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/gestao-financeira/privacidade')}
            className="w-full flex items-center gap-3 p-3.5 text-left"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent-red/15">
              <ShieldCheck size={15} className="text-accent-red" />
            </div>
            <span className="flex-1 text-[12.5px] font-semibold text-white">Apagar dados deste aparelho</span>
            <ArrowUpRight size={15} className="text-slate-500" />
          </button>
        </section>
      </div>
    </div>
  )
}
