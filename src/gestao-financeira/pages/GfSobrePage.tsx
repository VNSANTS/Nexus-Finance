import { useNavigate } from 'react-router-dom'
import { Info, HelpCircle, Bug, ChevronRight, Lock, Database, Users, Heart, Code2 } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import NexusLogo from '@/components/NexusLogo'

// Versão da Gestão Financeira exibida aqui — mantenha em sincronia com
// "version" em package.json ao publicar uma nova versão. Não é lida
// automaticamente do package.json porque o build do Vite não expõe esse
// arquivo pro código do cliente por padrão, e criar um mecanismo só pra
// isso seria complexidade desnecessária pra um número que muda raramente.
const VERSAO_APP = '0.1.0'

// Bibliotecas open source usadas de fato pela Gestão Financeira, puxadas
// de package.json — dar crédito é o mínimo, e mantém a lista honesta (só
// o que realmente está em uso, não uma lista genérica).
const BIBLIOTECAS = [
  { nome: 'React', uso: 'Interface' },
  { nome: 'React Router', uso: 'Navegação' },
  { nome: 'Framer Motion', uso: 'Animações' },
  { nome: 'Recharts', uso: 'Gráficos' },
  { nome: 'Lucide', uso: 'Ícones' },
  { nome: 'html2canvas + jsPDF', uso: 'Exportar relatórios' },
  { nome: 'Tailwind CSS', uso: 'Estilo' },
]

// Tela "Sobre" (menu Mais → Sobre). Escopo: identidade da versão, ajuda e
// suporte, e créditos. Fica de fora por decisão consciente, não por
// esquecimento:
// - Central de ajuda / chat de suporte de verdade: não existe backend
//   hoje (ver GfDadosBackupPage) — não fingimos um canal que ninguém
//   responde do outro lado.
// - Termos de uso / política de privacidade formais: como não há conta,
//   login nem envio de dados a um servidor (tudo fica no dispositivo,
//   ver Privacidade), um documento legal aqui seria só decoração. O que
//   existe de real sobre dados já está descrito nas telas de Privacidade
//   e Dados e backup — aqui só linkamos pra lá.
export default function GfSobrePage() {
  const navigate = useNavigate()

  return (
    <div className="pb-10">
      <GfHeader titulo="Sobre" subtitulo="Versão, ajuda e suporte" icone={Info} corIcone="#64748B" voltarPara="/gestao-financeira/mais" />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Identidade / versão */}
        <div className="card-surface rounded-2xl p-4 flex flex-col items-center text-center gap-2">
          <NexusLogo size={40} showWordmark={false} />
          <div>
            <p className="text-[14px] font-bold text-white">Nexus Finance</p>
            <p className="text-[11px] text-slate-500">Módulo Gestão Financeira</p>
          </div>
          <span className="text-[10.5px] font-semibold text-slate-400 bg-bg-card rounded-full px-2.5 py-1 mt-1">
            Versão {VERSAO_APP}
          </span>
        </div>

        {/* Ajuda e suporte */}
        <div className="card-surface rounded-2xl overflow-hidden">
          <div className="p-3.5 pb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-cyan/15">
              <HelpCircle size={15} className="text-accent-cyan" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Ajuda e suporte</p>
          </div>
          <div className="px-3.5 pb-3.5 flex items-start gap-2.5">
            <Bug size={14} className="text-slate-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ainda não existe uma central de ajuda ou canal de suporte dentro do app — é o próximo passo depois que
              o backend da Gestão Financeira existir. Por enquanto, se algo não funcionar como esperado, o botão de
              feedback do app é o melhor caminho.
            </p>
          </div>
        </div>

        {/* Atalhos pra onde os dados de fato são tratados */}
        <div className="card-surface rounded-2xl overflow-hidden">
          <button
            onClick={() => navigate('/gestao-financeira/privacidade')}
            className="w-full flex items-center gap-3 p-3.5 text-left border-b border-border"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-blue/15">
              <Lock size={15} className="text-accent-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-white">Como seus dados são tratados</p>
              <p className="text-[10.5px] text-slate-500">Tudo fica neste dispositivo — ver Privacidade</p>
            </div>
            <ChevronRight size={15} className="text-slate-600 shrink-0" />
          </button>
          <button onClick={() => navigate('/gestao-financeira/dados-backup')} className="w-full flex items-center gap-3 p-3.5 text-left">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-green/15">
              <Database size={15} className="text-accent-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-white">Exportar ou apagar tudo</p>
              <p className="text-[10.5px] text-slate-500">Backup manual — ver Dados e backup</p>
            </div>
            <ChevronRight size={15} className="text-slate-600 shrink-0" />
          </button>
        </div>

        {/* Créditos */}
        <div className="card-surface rounded-2xl overflow-hidden">
          <div className="p-3.5 pb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-purple-500/15">
              <Code2 size={15} className="text-purple-400" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Feito com</p>
          </div>
          <div className="px-3.5 pb-3.5 flex flex-col gap-1.5">
            {BIBLIOTECAS.map((b) => (
              <div key={b.nome} className="flex items-center justify-between">
                <span className="text-[11.5px] text-slate-300">{b.nome}</span>
                <span className="text-[10.5px] text-slate-600">{b.uso}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Família e perfis — lembrete rápido de que "sobre" é por dispositivo, não por perfil */}
        <div className="flex items-start gap-2.5 px-1">
          <Users size={13} className="text-slate-600 mt-0.5 shrink-0" />
          <p className="text-[10.5px] text-slate-600 leading-relaxed">
            Esta tela é a mesma pra qualquer perfil ativo — versão e créditos não mudam com quem está usando o
            aparelho no momento.
          </p>
        </div>

        <p className="text-[10.5px] text-slate-600 text-center flex items-center justify-center gap-1 mt-2">
          Feito com <Heart size={11} className="text-accent-red fill-accent-red" /> em React
        </p>
      </div>
    </div>
  )
}
