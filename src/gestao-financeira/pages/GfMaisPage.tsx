import { useNavigate } from 'react-router-dom'
import {
  Landmark,
  PiggyBank,
  PieChart,
  Radar,
  Bell,
  Bot,
  Settings,
  ShieldCheck,
  Database,
  Tag,
  Accessibility,
  Lock,
  Info,
  Users,
  ChevronRight,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import Avatar from '@/components/Avatar'
import { useUserProgress } from '@/hooks/useUserProgress'

// "Mais" reúne tudo que não cabe na barra de navegação principal — o
// equivalente ao "Menu" do documento. Cada item já navega para sua rota;
// os que ainda não têm rota própria mostram "em breve" por enquanto,
// preservando a estrutura para preenchimento futuro.
const ITENS = [
  { label: 'Contas & Cartões', desc: 'Bancos, carteiras e cartões', Icon: Landmark, cor: '#FFC93C', to: '/gestao-financeira/contas-cartoes' },
  { label: 'Metas', desc: 'Objetivos e progresso', Icon: PiggyBank, cor: '#8B5CF6', to: '/gestao-financeira/metas' },
  { label: 'Orçamento', desc: 'Limites por categoria', Icon: PieChart, cor: '#00D4FF', to: '/gestao-financeira/orcamento' },
  { label: 'Área do Investidor', desc: 'Carteira e mercado', Icon: Radar, cor: '#EC4899', to: '/gestao-financeira/investidor' },
  { label: 'Categorias', desc: 'Organize receitas e despesas', Icon: Tag, cor: '#3B82F6', to: '/gestao-financeira/categorias' },
  { label: 'Notificações', desc: 'Lembretes e alertas', Icon: Bell, cor: '#FFC93C', to: '/gestao-financeira/notificacoes' },
  { label: 'Nexus AI', desc: 'Assistente financeiro', Icon: Bot, cor: '#8B5CF6', to: null },
  { label: 'Família e perfis', desc: 'Gestão compartilhada', Icon: Users, cor: '#EC4899', to: '/gestao-financeira/familia-perfis' },
  { label: 'Segurança', desc: 'PIN, biometria, sessões', Icon: ShieldCheck, cor: '#22C55E', to: null },
  { label: 'Privacidade', desc: 'Ocultar valores e seus dados', Icon: Lock, cor: '#00D4FF', to: '/gestao-financeira/privacidade' },
  { label: 'Dados e backup', desc: 'Exportar, importar, restaurar', Icon: Database, cor: '#3B82F6', to: '/gestao-financeira/dados-backup' },
  { label: 'Acessibilidade', desc: 'Texto, contraste, leitura de tela', Icon: Accessibility, cor: '#FFC93C', to: '/gestao-financeira/acessibilidade' },
  { label: 'Configurações gerais', desc: 'Aparência, moeda, idioma', Icon: Settings, cor: '#64748B', to: '/gestao-financeira/configuracoes-gerais' },
  { label: 'Sobre', desc: 'Versão, ajuda e suporte', Icon: Info, cor: '#64748B', to: '/gestao-financeira/sobre' },
]

export default function GfMaisPage() {
  const navigate = useNavigate()
  const { progress } = useUserProgress()

  return (
    <div>
      <GfHeader titulo="Configurações" subtitulo="Módulos e preferências" icone={Settings} corIcone="#00D4FF" voltarPara="/gestao-financeira" />

      {/* Card de perfil — mesmo perfil do Nexus Finance principal (nome, foto
          e avatar são únicos e sincronizados entre os dois). Nível/XP fica
          de fora de propósito: isso é da parte de educação financeira, não
          da Gestão Financeira. Editar aqui leva pra tela de Perfil do app
          principal, de onde o perfil é gerenciado. */}
      <div className="px-4 mt-4">
        <button onClick={() => navigate('/perfil')} className="w-full flex items-center gap-3 card-surface rounded-2xl p-3.5 text-left">
          <Avatar
            nome={progress.perfilPessoal.nome}
            emoji={progress.perfilPessoal.emoji}
            cor={progress.perfilPessoal.cor}
            fotoUrl={progress.perfilPessoal.fotoUrl}
            fotoAjuste={progress.perfilPessoal.fotoAjuste}
            size={48}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-white truncate">{progress.perfilPessoal.nome}</p>
            <p className="text-[11.5px] text-slate-500">Editar perfil</p>
          </div>
          <ChevronRight size={16} className="text-slate-600 shrink-0" />
        </button>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-2.5">
        {ITENS.map((item) => (
          <button
            key={item.label}
            onClick={() => (item.to ? navigate(item.to) : undefined)}
            disabled={!item.to}
            className="flex items-center gap-3 card-surface rounded-2xl p-3.5 text-left disabled:opacity-60"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.cor}22` }}>
              <item.Icon size={17} style={{ color: item.cor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{item.label}</p>
              <p className="text-[11px] text-slate-500 truncate">{item.to ? item.desc : `${item.desc} · em breve`}</p>
            </div>
            <ChevronRight size={16} className="text-slate-600 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
