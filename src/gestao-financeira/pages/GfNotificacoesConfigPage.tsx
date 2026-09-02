import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SlidersHorizontal,
  Bell,
  BellOff,
  Smartphone,
  Vibrate,
  HandCoins,
  PieChart,
  Sparkles,
  Lightbulb,
  Volume2,
  VolumeX,
  Play,
  Rows3,
  LayoutGrid,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
} from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { tocarSomNotificacao, ESTILOS_SOM } from '../somNotificacao'
import type { PrioridadeNotificacao } from '../notificacoes'
import type { AgruparNotificacoesPor, EstiloExibicaoNotificacao, EstiloSomNotificacao } from '../types'

// Tela avançada de configuração da Central de Notificações — cobre a seção
// "4. Notificações" do documento de projeto: liga/desliga geral, liga/desliga
// e ajusta limiar por categoria, estilo de exibição/agrupamento e som,
// incluindo notificação nativa do navegador (mesmo padrão já usado em
// PerfilPage para o lembrete de sequência de estudos).
export default function GfNotificacoesConfigPage() {
  const { estado, definirPreferenciasNotificacoes, restaurarPreferenciasNotificacoes } = useGestaoFinanceira()
  const prefs = estado.preferenciasNotificacoes
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
      new Notification('Nexus Finance', { body: 'Notificações do navegador ativadas para a Gestão Financeira.' })
    } else {
      definirPreferenciasNotificacoes({ notificacaoNavegador: false })
      setAvisoPermissao('Permissão negada — ative pelas configurações do navegador se mudar de ideia.')
      setTimeout(() => setAvisoPermissao(null), 4000)
    }
  }

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Configurar notificações"
        subtitulo="Categorias, estilo e som"
        icone={SlidersHorizontal}
        corIcone="#FFC93C"
        voltarPara="/gestao-financeira/notificacoes"
      />

      {avisoPermissao && (
        <div className="mx-4 mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-2.5">
          <p className="text-[11.5px] text-yellow-400">{avisoPermissao}</p>
        </div>
      )}

      <div className="px-4 mt-4 flex flex-col gap-3">
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
        </Secao>

        <Secao
          titulo="Categorias"
          desc="O que gera notificação e com qual antecedência"
          aberta={secaoAberta === 'categorias'}
          onClick={() => setSecaoAberta('categorias')}
        >
          <BlocoCategoria
            titulo="Dívidas e contas"
            desc="Avisa quando uma dívida está vencendo"
            Icone={HandCoins}
            cor="#EF4444"
            ativa={prefs.dividas.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ dividas: { ...prefs.dividas, ativa: !prefs.dividas.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Avisar com quantos dias de antecedência</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 7, 15].map((d) => (
                <ChipOpcao
                  key={d}
                  label={`${d}d`}
                  ativo={prefs.dividas.diasAntecedencia === d}
                  onClick={() => definirPreferenciasNotificacoes({ dividas: { ...prefs.dividas, diasAntecedencia: d } })}
                />
              ))}
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Orçamento"
            desc="Avisa quando uma categoria se aproxima do limite"
            Icone={PieChart}
            cor="#FFC93C"
            ativa={prefs.orcamento.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ orcamento: { ...prefs.orcamento, ativa: !prefs.orcamento.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Avisar ao atingir</p>
            <div className="grid grid-cols-3 gap-2">
              {[75, 90, 100].map((p) => (
                <ChipOpcao
                  key={p}
                  label={`${p}%`}
                  ativo={prefs.orcamento.percentualAlerta === p}
                  onClick={() => definirPreferenciasNotificacoes({ orcamento: { ...prefs.orcamento, percentualAlerta: p } })}
                />
              ))}
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Metas"
            desc="Avisa quando o prazo de uma meta está próximo"
            Icone={Sparkles}
            cor="#8B5CF6"
            ativa={prefs.metas.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ metas: { ...prefs.metas, ativa: !prefs.metas.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <p className="text-[11px] text-slate-500 mb-1.5">Avisar com quantos dias de antecedência</p>
            <div className="grid grid-cols-4 gap-2">
              {[3, 7, 14, 30].map((d) => (
                <ChipOpcao
                  key={d}
                  label={`${d}d`}
                  ativo={prefs.metas.diasAntecedencia === d}
                  onClick={() => definirPreferenciasNotificacoes({ metas: { ...prefs.metas, diasAntecedencia: d } })}
                />
              ))}
            </div>
          </BlocoCategoria>

          <BlocoCategoria
            titulo="Insights automáticos"
            desc="Análises geradas a partir dos seus lançamentos"
            Icone={Lightbulb}
            cor="#00D4FF"
            ativa={prefs.insights.ativa}
            onToggle={() => definirPreferenciasNotificacoes({ insights: { ...prefs.insights, ativa: !prefs.insights.ativa } })}
            desabilitado={!prefs.ativas}
          >
            <div className="flex flex-col gap-3">
              <LinhaSwitch
                label="Boas notícias"
                ativo={prefs.insights.boasNoticias}
                onToggle={() => definirPreferenciasNotificacoes({ insights: { ...prefs.insights, boasNoticias: !prefs.insights.boasNoticias } })}
                pequeno
              />
              <LinhaSwitch
                label="Pontos de atenção"
                ativo={prefs.insights.pontosAtencao}
                onToggle={() => definirPreferenciasNotificacoes({ insights: { ...prefs.insights, pontosAtencao: !prefs.insights.pontosAtencao } })}
                pequeno
              />
            </div>
          </BlocoCategoria>
        </Secao>

        <Secao
          titulo="Estilo"
          desc="Como a lista de notificações é exibida"
          aberta={secaoAberta === 'estilo'}
          onClick={() => setSecaoAberta('estilo')}
        >
          <div>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Exibição</p>
            <div className="grid grid-cols-2 gap-2">
              <OpcaoEstilo
                label="Compacto"
                desc="Só o essencial"
                Icone={Rows3}
                ativo={prefs.estiloExibicao === 'compacto'}
                onClick={() => definirPreferenciasNotificacoes({ estiloExibicao: 'compacto' as EstiloExibicaoNotificacao })}
              />
              <OpcaoEstilo
                label="Detalhado"
                desc="Com mais contexto"
                Icone={LayoutGrid}
                ativo={prefs.estiloExibicao === 'detalhado'}
                onClick={() => definirPreferenciasNotificacoes({ estiloExibicao: 'detalhado' as EstiloExibicaoNotificacao })}
              />
            </div>
          </div>

          <div>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Agrupar por</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'prioridade', label: 'Prioridade' },
                  { id: 'categoria', label: 'Categoria' },
                  { id: 'status', label: 'Não lidas' },
                ] as { id: AgruparNotificacoesPor; label: string }[]
              ).map((o) => (
                <ChipOpcao
                  key={o.id}
                  label={o.label}
                  ativo={prefs.agruparPor === o.id}
                  onClick={() => definirPreferenciasNotificacoes({ agruparPor: o.id })}
                />
              ))}
            </div>
          </div>

          <LinhaSwitch
            label="Ocultar valores"
            desc="Troca valores em R$ por •••• nas mensagens da central"
            ativo={prefs.ocultarValores}
            onToggle={() => definirPreferenciasNotificacoes({ ocultarValores: !prefs.ocultarValores })}
            icone={prefs.ocultarValores ? EyeOff : Eye}
          />
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
              onMouseUp={() => tocarSomNotificacao(prefs.som.estilo, 'media', prefs.som.volume)}
              onTouchEnd={() => tocarSomNotificacao(prefs.som.estilo, 'media', prefs.som.volume)}
              className="w-full accent-accent-cyan"
            />
          </div>

          <div className={prefs.som.ativo ? '' : 'opacity-40 pointer-events-none'}>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tom</p>
            <div className="flex flex-col gap-2">
              {ESTILOS_SOM.map((e) => (
                <button
                  key={e.id}
                  onClick={() => definirPreferenciasNotificacoes({ som: { ...prefs.som, estilo: e.id as EstiloSomNotificacao } })}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border ${
                    prefs.som.estilo === e.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <p className={`text-[12.5px] font-semibold ${prefs.som.estilo === e.id ? 'text-accent-cyan' : 'text-white'}`}>{e.label}</p>
                    <p className="text-[10.5px] text-slate-500">{e.desc}</p>
                  </div>
                  <button
                    onClick={(ev) => {
                      ev.stopPropagation()
                      tocarSomNotificacao(e.id, 'media', prefs.som.volume)
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-bg-card"
                    aria-label={`Testar som ${e.label}`}
                  >
                    <Play size={13} className="text-slate-300 ml-0.5" />
                  </button>
                  {prefs.som.estilo === e.id && <Check size={15} className="text-accent-cyan shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className={prefs.som.ativo ? '' : 'opacity-40 pointer-events-none'}>
            <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Testar por prioridade</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { p: 'alta', label: 'Alta', cor: '#EF4444' },
                  { p: 'media', label: 'Média', cor: '#FFC93C' },
                  { p: 'baixa', label: 'Baixa', cor: '#22C55E' },
                ] as { p: PrioridadeNotificacao; label: string; cor: string }[]
              ).map((x) => (
                <button
                  key={x.p}
                  onClick={() => tocarSomNotificacao(prefs.som.estilo, x.p, prefs.som.volume)}
                  className="rounded-xl py-2.5 text-[12px] font-semibold border border-border card-surface flex items-center justify-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: x.cor }} />
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        </Secao>
      </div>

      <div className="px-4 mt-3">
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
      <span
        className="relative w-11 h-6 rounded-full shrink-0 transition-colors"
        style={{ background: ativo ? 'var(--accent-primaria)' : '#1C2740' }}
      >
        <motion.span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
          animate={{ left: ativo ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
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
        <span
          onClick={(e) => {
            e.stopPropagation()
            if (!desabilitado) onToggle()
          }}
          role="switch"
          aria-checked={ativa}
          className="relative w-11 h-6 rounded-full shrink-0 transition-colors cursor-pointer"
          style={{ background: ativa ? 'var(--accent-primaria)' : '#1C2740', opacity: desabilitado ? 0.4 : 1 }}
        >
          <motion.span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
            animate={{ left: ativa ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          />
        </span>
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
