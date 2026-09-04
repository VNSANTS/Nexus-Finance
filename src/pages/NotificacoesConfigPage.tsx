import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  SlidersHorizontal,
  Bell,
  BellOff,
  Smartphone,
  Vibrate,
  Flame,
  Zap,
  RotateCw,
  Trophy,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Rows3,
  LayoutGrid,
  MoonStar,
  RotateCcw,
  Check,
  Clock,
} from 'lucide-react'
import { useUserProgress } from '@/hooks/useUserProgress'
import { ESTILOS_SOM_APRENDER, tocarSomAprender } from '@/lib/som'
import type { EstiloSomNotificacaoAprender, FrequenciaLembrete } from '@/types'

const DIAS_SEMANA: { valor: number; label: string }[] = [
  { valor: 0, label: 'D' },
  { valor: 1, label: 'S' },
  { valor: 2, label: 'T' },
  { valor: 3, label: 'Q' },
  { valor: 4, label: 'Q' },
  { valor: 5, label: 'S' },
  { valor: 6, label: 'S' },
]

// Tela avançada de configuração da Central de Notificações do lado
// "Aprender" — mesmo padrão visual/arquitetural de
// gestao-financeira/pages/GfNotificacoesConfigPage.tsx, adaptado para as
// categorias de aprendizado/gamificação (sequência, desafio diário, revisão
// espaçada, conquistas, módulo parado, motivacional).
export default function NotificacoesConfigPage() {
  const navigate = useNavigate()
  const { progress, definirPreferenciasNotificacoes, restaurarPreferenciasNotificacoes } = useUserProgress()
  const prefs = progress.preferenciasNotificacoesAprender
  const [secaoAberta, setSecaoAberta] = useState<'geral' | 'categorias' | 'estilo' | 'som'>('geral')
  const [avisoPermissao, setAvisoPermissao] = useState<string | null>(null)

  async function ativarNotificacaoNavegador() {
    if (!('Notification' in window)) {
      setAvisoPermissao('Seu navegador não suporta notificações nativas.')
      setTimeout(() => setAvisoPermissao(null), 3500)
      return
    }
    const permissao = await Notification.requestPermission()
    if (permissao === 'granted') {
      definirPreferenciasNotificacoes({ notificacaoNavegador: true })
      new Notification('Nexus Finance', { body: 'Notificações do navegador ativadas para o Aprender.' })
    } else {
      definirPreferenciasNotificacoes({ notificacaoNavegador: false })
      setAvisoPermissao('Permissão negada — ative pelas configurações do navegador se mudar de ideia.')
      setTimeout(() => setAvisoPermissao(null), 4000)
    }
  }

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate('/perfil')} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Perfil
      </button>

      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-[42px] h-[42px] rounded-2xl bg-accent-gold/10 flex items-center justify-center">
          <SlidersHorizontal size={19} className="text-accent-gold" />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white">Notificações</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">Categorias, horários e som</p>
        </div>
      </div>

      {avisoPermissao && (
        <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-2.5">
          <p className="text-[11.5px] text-yellow-400">{avisoPermissao}</p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <Secao
          titulo="Geral"
          desc="Ligar tudo, notificação do navegador e vibração"
          aberta={secaoAberta === 'geral'}
          onClick={() => setSecaoAberta('geral')}
        >
          <LinhaSwitch
            label="Notificações ativadas"
            desc="Desativa a central inteira — nenhum alerta é gerado"
            ativo={prefs.ativas}
            onToggle={() => definirPreferenciasNotificacoes({ ativas: !prefs.ativas })}
            icone={prefs.ativas ? Bell : BellOff}
          />
          <LinhaSwitch
            label="Notificações do navegador"
            desc="Mostra um alerta nativo do sistema, mesmo com a aba em segundo plano"
            ativo={prefs.notificacaoNavegador}
            onToggle={() => (prefs.notificacaoNavegador ? definirPreferenciasNotificacoes({ notificacaoNavegador: false }) : ativarNotificacaoNavegador())}
            icone={Smartphone}
            desabilitado={!prefs.ativas}
          />
          <LinhaSwitch
            label="Vibrar"
            desc="Vibração curta ao chegar uma notificação nova (dispositivos compatíveis)"
            ativo={prefs.vibrar}
            onToggle={() => definirPreferenciasNotificacoes({ vibrar: !prefs.vibrar })}
            icone={Vibrate}
            desabilitado={!prefs.ativas}
          />

          <div className="rounded-xl border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-500/15">
                  <MoonStar size={15} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-white">Não perturbe</p>
                  <p className="text-[10.5px] text-slate-500">Silencia tudo nesse intervalo</p>
                </div>
              </div>
              <SwitchInline
                ativo={prefs.naoPerturbe.ativo}
                onToggle={() => definirPreferenciasNotificacoes({ naoPerturbe: { ...prefs.naoPerturbe, ativo: !prefs.naoPerturbe.ativo } })}
                desabilitado={!prefs.ativas}
              />
            </div>
            {prefs.naoPerturbe.ativo && (
              <div className="pl-[42px] flex items-center gap-2.5">
                <CampoHorario
                  label="Início"
                  valor={prefs.naoPerturbe.inicio}
                  onChange={(v) => definirPreferenciasNotificacoes({ naoPerturbe: { ...prefs.naoPerturbe, inicio: v } })}
                />
                <span className="text-slate-500 text-[11px]">até</span>
                <CampoHorario
                  label="Fim"
                  valor={prefs.naoPerturbe.fim}
                  onChange={(v) => definirPreferenciasNotificacoes({ naoPerturbe: { ...prefs.naoPerturbe, fim: v } })}
                />
              </div>
            )}
          </div>
        </Secao>

        <Secao
          titulo="Categorias"
          desc="O que gera notificação e quando"
          aberta={secaoAberta === 'categorias'}
          onClick={() => setSecaoAberta('categorias')}
        >
          <BlocoCategoria
            titulo="Sequência de estudos"
            desc="Avisa antes de perder seu streak do dia"
            Icone={Flame}
            cor="#EF4444"
            ativa={prefs.lembreteStreak.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ lembreteStreak: { ...prefs.lembreteStreak, ativa: !prefs.lembreteStreak.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <CampoHorario
                  label="Horário do lembrete"
                  valor={prefs.lembreteStreak.horario}
                  onChange={(v) => definirPreferenciasNotificacoes({ lembreteStreak: { ...prefs.lembreteStreak, horario: v } })}
                />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 mb-1.5">Frequência</p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'diaria', label: 'Diária' },
                      { id: 'dias_uteis', label: 'Dias úteis' },
                      { id: 'personalizada', label: 'Escolher dias' },
                    ] as { id: FrequenciaLembrete; label: string }[]
                  ).map((o) => (
                    <ChipOpcao
                      key={o.id}
                      label={o.label}
                      ativo={prefs.lembreteStreak.frequencia === o.id}
                      onClick={() => definirPreferenciasNotificacoes({ lembreteStreak: { ...prefs.lembreteStreak, frequencia: o.id } })}
                    />
                  ))}
                </div>
              </div>
              {prefs.lembreteStreak.frequencia === 'personalizada' && (
                <div className="flex gap-1.5">
                  {DIAS_SEMANA.map((d) => {
                    const ativo = prefs.lembreteStreak.diasPersonalizados.includes(d.valor)
                    return (
                      <button
                        key={d.valor}
                        onClick={() =>
                          definirPreferenciasNotificacoes({
                            lembreteStreak: {
                              ...prefs.lembreteStreak,
                              diasPersonalizados: ativo
                                ? prefs.lembreteStreak.diasPersonalizados.filter((x) => x !== d.valor)
                                : [...prefs.lembreteStreak.diasPersonalizados, d.valor].sort(),
                            },
                          })
                        }
                        className={`w-8 h-8 rounded-lg text-[11px] font-bold border ${
                          ativo ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
                        }`}
                      >
                        {d.label}
                      </button>
                    )
                  })}
                </div>
              )}
              <LinhaSwitch
                label="Apenas se ainda não estudou hoje"
                ativo={prefs.lembreteStreak.apenasSeAindaNaoEstudouHoje}
                onToggle={() =>
                  definirPreferenciasNotificacoes({
                    lembreteStreak: { ...prefs.lembreteStreak, apenasSeAindaNaoEstudouHoje: !prefs.lembreteStreak.apenasSeAindaNaoEstudouHoje },
                  })
                }
                pequeno
              />
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Desafio diário"
            desc="Avisa quando um novo desafio libera"
            Icone={Zap}
            cor="#FFC93C"
            ativa={prefs.desafioDiario.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ desafioDiario: { ...prefs.desafioDiario, ativa: !prefs.desafioDiario.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <CampoHorario
              label="Horário"
              valor={prefs.desafioDiario.horario}
              onChange={(v) => definirPreferenciasNotificacoes({ desafioDiario: { ...prefs.desafioDiario, horario: v } })}
            />
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Revisão espaçada"
            desc="Avisa quando itens de revisão acumulam"
            Icone={RotateCw}
            cor="#EC4899"
            ativa={prefs.revisao.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ revisao: { ...prefs.revisao, ativa: !prefs.revisao.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Avisar a partir de quantos itens vencidos</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5, 10].map((n) => (
                <ChipOpcao
                  key={n}
                  label={String(n)}
                  ativo={prefs.revisao.minimoItens === n}
                  onClick={() => definirPreferenciasNotificacoes({ revisao: { ...prefs.revisao, minimoItens: n } })}
                />
              ))}
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Conquistas"
            desc="Avisa ao desbloquear um badge novo"
            Icone={Trophy}
            cor="#8B5CF6"
            ativa={prefs.conquistas.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ conquistas: { ativa: !prefs.conquistas.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[10.5px] text-slate-500">Sem opções adicionais — dispara na hora que o badge é desbloqueado.</p>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Módulo parado"
            desc="Sugere retomar um módulo iniciado e não terminado"
            Icone={BookOpen}
            cor="#00D4FF"
            ativa={prefs.moduloParado.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ moduloParado: { ...prefs.moduloParado, ativa: !prefs.moduloParado.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Dias de inatividade até avisar</p>
            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 7, 14].map((d) => (
                <ChipOpcao
                  key={d}
                  label={`${d}d`}
                  ativo={prefs.moduloParado.diasInatividade === d}
                  onClick={() => definirPreferenciasNotificacoes({ moduloParado: { ...prefs.moduloParado, diasInatividade: d } })}
                />
              ))}
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Motivacional"
            desc="Frases dos livros e módulos, de vez em quando"
            Icone={Sparkles}
            cor="#22C55E"
            ativa={prefs.motivacional.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ motivacional: { ...prefs.motivacional, ativa: !prefs.motivacional.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Frequência</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'diaria', label: 'Diária' },
                  { id: 'semanal', label: 'Semanal' },
                ] as { id: 'diaria' | 'semanal'; label: string }[]
              ).map((o) => (
                <ChipOpcao
                  key={o.id}
                  label={o.label}
                  ativo={prefs.motivacional.frequencia === o.id}
                  onClick={() => definirPreferenciasNotificacoes({ motivacional: { ...prefs.motivacional, frequencia: o.id } })}
                />
              ))}
            </div>
          </BlocoCategoria>
        </Secao>

        <Secao titulo="Estilo" desc="Como as notificações são exibidas" aberta={secaoAberta === 'estilo'} onClick={() => setSecaoAberta('estilo')}>
          <div>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Exibição</p>
            <div className="grid grid-cols-2 gap-2">
              <OpcaoEstilo
                label="Compacto"
                desc="Só o essencial"
                Icone={Rows3}
                ativo={prefs.estiloExibicao === 'compacto'}
                onClick={() => definirPreferenciasNotificacoes({ estiloExibicao: 'compacto' })}
              />
              <OpcaoEstilo
                label="Detalhado"
                desc="Com mais contexto"
                Icone={LayoutGrid}
                ativo={prefs.estiloExibicao === 'detalhado'}
                onClick={() => definirPreferenciasNotificacoes({ estiloExibicao: 'detalhado' })}
              />
            </div>
          </div>
        </Secao>

        <Secao titulo="Som" desc="Ativar, volume e tom das notificações" aberta={secaoAberta === 'som'} onClick={() => setSecaoAberta('som')}>
          <LinhaSwitch
            label="Sons ativados"
            ativo={prefs.som.ativo}
            onToggle={() => definirPreferenciasNotificacoes({ som: { ...prefs.som, ativo: !prefs.som.ativo } })}
            icone={prefs.som.ativo ? Volume2 : VolumeX}
          />

          <div className={prefs.som.ativo ? '' : 'opacity-40 pointer-events-none'}>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Volume — {prefs.som.volume}%</p>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={prefs.som.volume}
              onChange={(e) => definirPreferenciasNotificacoes({ som: { ...prefs.som, volume: Number(e.target.value) } })}
              onMouseUp={() => prefs.som.estilo !== 'nenhum' && tocarSomAprender(prefs.som.estilo, 'padrao', prefs.som.volume)}
              onTouchEnd={() => prefs.som.estilo !== 'nenhum' && tocarSomAprender(prefs.som.estilo, 'padrao', prefs.som.volume)}
              className="w-full accent-accent-cyan"
            />
          </div>

          <div className={prefs.som.ativo ? '' : 'opacity-40 pointer-events-none'}>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tom</p>
            <div className="flex flex-col gap-2">
              {[...ESTILOS_SOM_APRENDER, { id: 'nenhum' as const, label: 'Nenhum', desc: 'Só o alerta visual, sem som' }].map((e) => (
                <button
                  key={e.id}
                  onClick={() => definirPreferenciasNotificacoes({ som: { ...prefs.som, estilo: e.id as EstiloSomNotificacaoAprender } })}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border ${
                    prefs.som.estilo === e.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <p className={`text-[12.5px] font-semibold ${prefs.som.estilo === e.id ? 'text-accent-cyan' : 'text-white'}`}>{e.label}</p>
                    <p className="text-[10.5px] text-slate-500">{e.desc}</p>
                  </div>
                  {e.id !== 'nenhum' && (
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation()
                        tocarSomAprender(e.id as Exclude<EstiloSomNotificacaoAprender, 'nenhum'>, 'padrao', prefs.som.volume)
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-bg-card"
                      aria-label={`Testar som ${e.label}`}
                    >
                      <Play size={13} className="text-slate-300 ml-0.5" />
                    </button>
                  )}
                  {prefs.som.estilo === e.id && <Check size={15} className="text-accent-cyan shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </Secao>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            if (window.confirm('Restaurar as configurações de notificação para o padrão?')) restaurarPreferenciasNotificacoes()
          }}
          className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium mx-auto"
        >
          <RotateCcw size={12} /> Restaurar notificações padrão
        </button>
      </div>
    </div>
  )
}

function Secao({
  titulo,
  desc,
  aberta,
  onClick,
  children,
}: {
  titulo: string
  desc: string
  aberta: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div className="card-surface rounded-2xl overflow-hidden">
      <button onClick={onClick} className="w-full flex items-center justify-between p-3.5 text-left">
        <div>
          <p className="text-[13.5px] font-semibold text-white">{titulo}</p>
          <p className="text-[11px] text-slate-500">{desc}</p>
        </div>
        <span className={`text-slate-500 transition-transform ${aberta ? 'rotate-180' : ''}`}>⌄</span>
      </button>
      {aberta && <div className="px-3.5 pb-4 flex flex-col gap-4 border-t border-border pt-4">{children}</div>}
    </div>
  )
}

function LinhaSwitch({
  label,
  desc,
  ativo,
  onToggle,
  icone: Icone,
  desabilitado,
  pequeno,
}: {
  label: string
  desc?: string
  ativo: boolean
  onToggle: () => void
  icone?: typeof Bell
  desabilitado?: boolean
  pequeno?: boolean
}) {
  return (
    <button onClick={onToggle} disabled={desabilitado} className="w-full flex items-center justify-between disabled:opacity-40">
      <div className="flex items-center gap-2.5 pr-3 text-left">
        {Icone && <Icone size={pequeno ? 14 : 16} className="text-slate-400 shrink-0" />}
        <div>
          <p className={`font-semibold text-white ${pequeno ? 'text-[12px]' : 'text-[12.5px]'}`}>{label}</p>
          {desc && <p className="text-[10.5px] text-slate-500">{desc}</p>}
        </div>
      </div>
      <SwitchInline ativo={ativo} onToggle={onToggle} />
    </button>
  )
}

function SwitchInline({ ativo, onToggle, desabilitado }: { ativo: boolean; onToggle: () => void; desabilitado?: boolean }) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        if (!desabilitado) onToggle()
      }}
      role="switch"
      aria-checked={ativo}
      className="relative w-11 h-6 rounded-full shrink-0 transition-colors cursor-pointer"
      style={{ background: ativo ? 'var(--accent-primaria)' : '#1C2740', opacity: desabilitado ? 0.4 : 1 }}
    >
      <motion.span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
        animate={{ left: ativo ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </span>
  )
}

function BlocoCategoria({
  titulo,
  desc,
  Icone,
  cor,
  ativa,
  onToggle,
  desabilitado,
  children,
}: {
  titulo: string
  desc: string
  Icone: typeof Bell
  cor: string
  ativa: boolean
  onToggle: () => void
  desabilitado?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cor}22` }}>
            <Icone size={15} style={{ color: cor }} />
          </div>
          <div>
            <p className="text-[12.5px] font-semibold text-white">{titulo}</p>
            <p className="text-[10.5px] text-slate-500">{desc}</p>
          </div>
        </div>
        <SwitchInline ativo={ativa} onToggle={onToggle} desabilitado={desabilitado} />
      </div>
      {ativa && !desabilitado && <div className="pl-[42px]">{children}</div>}
    </div>
  )
}

function OpcaoEstilo({ label, desc, Icone, ativo, onClick }: { label: string; desc: string; Icone: typeof Bell; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl py-3 border ${
        ativo ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
      }`}
    >
      <Icone size={17} className={ativo ? 'text-accent-cyan' : 'text-slate-400'} />
      <span className={`text-[11.5px] font-semibold ${ativo ? 'text-accent-cyan' : 'text-white'}`}>{label}</span>
      <span className="text-[9.5px] text-slate-500">{desc}</span>
    </button>
  )
}

function ChipOpcao({ label, ativo, onClick }: { label: string; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-2 text-[11.5px] font-semibold border ${
        ativo ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
      }`}
    >
      {label}
    </button>
  )
}

function CampoHorario({ label, valor, onChange }: { label: string; valor: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10.5px] text-slate-500 flex items-center gap-1">
        <Clock size={10} /> {label}
      </span>
      <input
        type="time"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border card-surface px-2.5 py-1.5 text-[12.5px] text-white"
      />
    </label>
  )
}
