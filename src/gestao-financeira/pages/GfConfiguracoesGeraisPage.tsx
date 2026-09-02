import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Sun, Moon, MonitorSmartphone, Check, RotateCcw } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { useTheme, CORES_PRINCIPAIS } from '@/hooks/useTheme'
import type { ModoTema, TamanhoFonte, Densidade, IdCorPrincipal } from '@/hooks/useTheme'
import { formatMoeda } from '../formatMoeda'
import type { Idioma } from '../types'

const MOEDAS = [
  { codigo: 'BRL', label: 'Real brasileiro', simbolo: 'R$' },
  { codigo: 'USD', label: 'Dólar americano', simbolo: 'US$' },
  { codigo: 'EUR', label: 'Euro', simbolo: '€' },
  { codigo: 'GBP', label: 'Libra esterlina', simbolo: '£' },
  { codigo: 'ARS', label: 'Peso argentino', simbolo: 'AR$' },
  { codigo: 'JPY', label: 'Iene japonês', simbolo: '¥' },
]

const IDIOMAS: { codigo: Idioma; label: string; bandeira: string }[] = [
  { codigo: 'pt-BR', label: 'Português (Brasil)', bandeira: '🇧🇷' },
  { codigo: 'en-US', label: 'English (US)', bandeira: '🇺🇸' },
]

const TAMANHOS_FONTE: { id: TamanhoFonte; label: string }[] = [
  { id: 'pequeno', label: 'Pequeno' },
  { id: 'padrao', label: 'Padrão' },
  { id: 'grande', label: 'Grande' },
  { id: 'extra-grande', label: 'Extra grande' },
]

const DENSIDADES: { id: Densidade; label: string; desc: string }[] = [
  { id: 'compacta', label: 'Compacta', desc: 'Mais itens visíveis por tela' },
  { id: 'padrao', label: 'Padrão', desc: 'Equilíbrio entre espaço e leitura' },
  { id: 'confortavel', label: 'Confortável', desc: 'Mais espaço entre elementos' },
]

// Tela de Configurações gerais — cobre "2. Aparência" e parte de
// "3. Configurações financeiras" (valores e moeda, período financeiro) do
// documento de projeto. O que fica fora daqui por escopo (limites de
// gastos, tipos de transação personalizados, regras financeiras) pertence
// às telas de Orçamento/Notificações/Categorias, não a esta.
export default function GfConfiguracoesGeraisPage() {
  const { estado, permissoes, definirMoeda, definirConfigFinanceira } = useGestaoFinanceira()
  const tema = useTheme()
  const [secaoAberta, setSecaoAberta] = useState<'aparencia' | 'idioma-moeda' | 'periodo'>('aparencia')

  const exemploFormatado = useMemo(
    () =>
      formatMoeda(1234.5, {
        moedaPadrao: estado.moedaPadrao,
        formatoValor: estado.formatoValor,
        casasDecimais: estado.casasDecimais,
        separadorDecimal: estado.separadorDecimal,
        separadorMilhares: estado.separadorMilhares,
      }),
    [estado.moedaPadrao, estado.formatoValor, estado.casasDecimais, estado.separadorDecimal, estado.separadorMilhares],
  )

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Configurações gerais"
        subtitulo="Aparência, moeda e idioma"
        icone={Settings}
        corIcone="#64748B"
        voltarPara="/gestao-financeira/mais"
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        <Secao
          id="aparencia"
          titulo="Aparência"
          desc="Tema, cor e tamanho de texto"
          aberta={secaoAberta === 'aparencia'}
          onToggle={() => setSecaoAberta(secaoAberta === 'aparencia' ? 'aparencia' : 'aparencia')}
          onClick={() => setSecaoAberta('aparencia')}
        >
          <BlocoAparencia />
        </Secao>

        <Secao
          id="idioma-moeda"
          titulo="Idioma e moeda"
          desc="Idioma, moeda padrão e formato dos valores"
          aberta={secaoAberta === 'idioma-moeda'}
          onClick={() => setSecaoAberta('idioma-moeda')}
        >
          <BlocoIdiomaMoeda
            estado={estado}
            definirMoeda={definirMoeda}
            definirConfigFinanceira={definirConfigFinanceira}
            exemploFormatado={exemploFormatado}
            podeEditar={permissoes.editar}
          />
        </Secao>

        <Secao
          id="periodo"
          titulo="Período financeiro"
          desc="Início do mês, semana e formato de data"
          aberta={secaoAberta === 'periodo'}
          onClick={() => setSecaoAberta('periodo')}
        >
          <BlocoPeriodo estado={estado} definirConfigFinanceira={definirConfigFinanceira} podeEditar={permissoes.editar} />
        </Secao>
      </div>

      <div className="px-4 mt-3">
        <button
          onClick={() => {
            if (window.confirm('Restaurar aparência para os valores padrão (tema escuro, cor ciano, fonte padrão)?')) {
              tema.restaurarPadroes()
            }
          }}
          className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium mx-auto"
        >
          <RotateCcw size={12} /> Restaurar aparência padrão
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
  id: string
  titulo: string
  desc: string
  aberta: boolean
  onToggle?: () => void
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

function BlocoAparencia() {
  const { modo, definirModo, corPrincipal, definirCorPrincipal, tamanhoFonte, definirTamanhoFonte, densidade, definirDensidade, animacoesAtivas, definirAnimacoesAtivas } = useTheme()

  return (
    <>
      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tema</p>
        <div className="grid grid-cols-3 gap-2">
          <OpcaoTema label="Claro" Icon={Sun} ativo={modo === 'claro'} onClick={() => definirModo('claro')} />
          <OpcaoTema label="Escuro" Icon={Moon} ativo={modo === 'escuro'} onClick={() => definirModo('escuro')} />
          <OpcaoTema label="Automático" Icon={MonitorSmartphone} ativo={modo === 'automatico'} onClick={() => definirModo('automatico')} />
        </div>
      </div>

      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Cor principal</p>
        <div className="flex gap-2.5 flex-wrap">
          {CORES_PRINCIPAIS.map((c) => (
            <button
              key={c.id}
              onClick={() => definirCorPrincipal(c.id as IdCorPrincipal)}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${c.cor}, ${c.fim})` }}
              aria-label={c.label}
            >
              {corPrincipal === c.id && <Check size={15} className="text-white" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tamanho da fonte</p>
        <div className="grid grid-cols-2 gap-2">
          {TAMANHOS_FONTE.map((t) => (
            <ChipOpcao key={t.id} label={t.label} ativo={tamanhoFonte === t.id} onClick={() => definirTamanhoFonte(t.id)} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Densidade da interface</p>
        <div className="flex flex-col gap-2">
          {DENSIDADES.map((d) => (
            <button
              key={d.id}
              onClick={() => definirDensidade(d.id)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 border ${
                densidade === d.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
            >
              <div className="text-left">
                <p className={`text-[12.5px] font-semibold ${densidade === d.id ? 'text-accent-cyan' : 'text-white'}`}>{d.label}</p>
                <p className="text-[10.5px] text-slate-500">{d.desc}</p>
              </div>
              {densidade === d.id && <Check size={15} className="text-accent-cyan shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <LinhaSwitch
        label="Animações"
        desc="Desative para uma interface mais rápida e enxuta"
        ativo={animacoesAtivas}
        onToggle={() => definirAnimacoesAtivas(!animacoesAtivas)}
      />
    </>
  )
}

function OpcaoTema({ label, Icon, ativo, onClick }: { label: string; Icon: typeof Sun; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl py-3 border ${
        ativo ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
      }`}
    >
      <Icon size={17} className={ativo ? 'text-accent-cyan' : 'text-slate-400'} />
      <span className={`text-[11px] font-semibold ${ativo ? 'text-accent-cyan' : 'text-slate-400'}`}>{label}</span>
    </button>
  )
}

function ChipOpcao({ label, ativo, onClick }: { label: string; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-2.5 text-[12px] font-semibold border ${
        ativo ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-400'
      }`}
    >
      {label}
    </button>
  )
}

function LinhaSwitch({ label, desc, ativo, onToggle }: { label: string; desc?: string; ativo: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between">
      <div className="text-left pr-3">
        <p className="text-[12.5px] font-semibold text-white">{label}</p>
        {desc && <p className="text-[10.5px] text-slate-500">{desc}</p>}
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

interface BlocoProps {
  estado: ReturnType<typeof useGestaoFinanceira>['estado']
  definirMoeda: ReturnType<typeof useGestaoFinanceira>['definirMoeda']
  definirConfigFinanceira: ReturnType<typeof useGestaoFinanceira>['definirConfigFinanceira']
  exemploFormatado: string
  podeEditar: boolean
}

function BlocoIdiomaMoeda({ estado, definirMoeda, definirConfigFinanceira, exemploFormatado, podeEditar }: BlocoProps) {
  // Moeda, idioma e formato afetam os dados de toda a família — quem não
  // tem "editar" ainda vê os valores atuais (transparência), só não
  // consegue alterá-los.
  const desabilitado = podeEditar ? '' : 'opacity-50 pointer-events-none select-none'
  return (
    <>
      {!podeEditar && (
        <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
          Seu perfil não tem permissão para alterar essas configurações — só um administrador ou um perfil com edição pode.
        </p>
      )}
      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Idioma</p>
        <div className="flex flex-col gap-2">
          {IDIOMAS.map((i) => (
            <button
              key={i.codigo}
              onClick={() => definirConfigFinanceira({ idioma: i.codigo })}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border ${
                estado.idioma === i.codigo ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
            >
              <span className="text-[16px]">{i.bandeira}</span>
              <span className={`flex-1 text-left text-[12.5px] font-semibold ${estado.idioma === i.codigo ? 'text-accent-cyan' : 'text-white'}`}>
                {i.label}
              </span>
              {estado.idioma === i.codigo && <Check size={15} className="text-accent-cyan" />}
            </button>
          ))}
        </div>
        {estado.idioma !== 'pt-BR' && (
          <p className="text-[10.5px] text-slate-500 mt-1.5 leading-relaxed">
            A tradução completa da interface ainda está em construção — algumas telas continuam em português por enquanto.
          </p>
        )}
      </div>

      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Moeda padrão</p>
        <div className="grid grid-cols-2 gap-2">
          {MOEDAS.map((m) => (
            <button
              key={m.codigo}
              onClick={() => definirMoeda(m.codigo)}
              className={`rounded-xl px-3 py-2.5 text-left border ${
                estado.moedaPadrao === m.codigo ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
              }`}
            >
              <p className={`text-[12px] font-bold ${estado.moedaPadrao === m.codigo ? 'text-accent-cyan' : 'text-white'}`}>{m.simbolo}</p>
              <p className="text-[10px] text-slate-500 truncate">{m.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Formato do valor</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => definirConfigFinanceira({ formatoValor: 'simbolo-antes' })}
            className={`text-left rounded-xl px-3.5 py-2.5 border text-[12.5px] font-semibold ${
              estado.formatoValor === 'simbolo-antes' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-white'
            }`}
          >
            R$ 1.234,50 <span className="text-slate-500 font-normal">— símbolo antes</span>
          </button>
          <button
            onClick={() => definirConfigFinanceira({ formatoValor: 'simbolo-depois' })}
            className={`text-left rounded-xl px-3.5 py-2.5 border text-[12.5px] font-semibold ${
              estado.formatoValor === 'simbolo-depois' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-white'
            }`}
          >
            1.234,50 R$ <span className="text-slate-500 font-normal">— símbolo depois</span>
          </button>
          <button
            onClick={() => definirConfigFinanceira({ formatoValor: 'codigo-antes' })}
            className={`text-left rounded-xl px-3.5 py-2.5 border text-[12.5px] font-semibold ${
              estado.formatoValor === 'codigo-antes' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-white'
            }`}
          >
            BRL 1.234,50 <span className="text-slate-500 font-normal">— código antes</span>
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-2 ${desabilitado}`}>
        <div>
          <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Casas decimais</p>
          <div className="flex gap-2">
            {[0, 2].map((n) => (
              <ChipOpcao key={n} label={String(n)} ativo={estado.casasDecimais === n} onClick={() => definirConfigFinanceira({ casasDecimais: n })} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Separador decimal</p>
          <div className="flex gap-2">
            <ChipOpcao label="," ativo={estado.separadorDecimal === ','} onClick={() => definirConfigFinanceira({ separadorDecimal: ',' })} />
            <ChipOpcao label="." ativo={estado.separadorDecimal === '.'} onClick={() => definirConfigFinanceira({ separadorDecimal: '.' })} />
          </div>
        </div>
      </div>

      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Separador de milhares</p>
        <div className="grid grid-cols-4 gap-2">
          <ChipOpcao label="." ativo={estado.separadorMilhares === '.'} onClick={() => definirConfigFinanceira({ separadorMilhares: '.' })} />
          <ChipOpcao label="," ativo={estado.separadorMilhares === ','} onClick={() => definirConfigFinanceira({ separadorMilhares: ',' })} />
          <ChipOpcao label="espaço" ativo={estado.separadorMilhares === ' '} onClick={() => definirConfigFinanceira({ separadorMilhares: ' ' })} />
          <ChipOpcao label="nenhum" ativo={estado.separadorMilhares === 'nenhum'} onClick={() => definirConfigFinanceira({ separadorMilhares: 'nenhum' })} />
        </div>
      </div>

      <div className="card-surface rounded-xl p-3 border border-border">
        <p className="text-[10.5px] text-slate-500 mb-0.5">Pré-visualização</p>
        <p className="text-[15px] font-bold text-white">{exemploFormatado}</p>
      </div>
    </>
  )
}

function BlocoPeriodo({ estado, definirConfigFinanceira, podeEditar }: Omit<BlocoProps, 'definirMoeda' | 'exemploFormatado'>) {
  const desabilitado = podeEditar ? '' : 'opacity-50 pointer-events-none select-none'
  return (
    <>
      {!podeEditar && (
        <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
          Seu perfil não tem permissão para alterar essas configurações — só um administrador ou um perfil com edição pode.
        </p>
      )}
      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Primeiro dia do mês financeiro</p>
        <p className="text-[10.5px] text-slate-500 mb-2 leading-relaxed">
          Útil se seu salário cai num dia diferente do dia 1 — os relatórios mensais passam a considerar esse dia como início do período.
        </p>
        <input
          type="number"
          min={1}
          max={28}
          value={estado.primeiroDiaMesFinanceiro}
          onChange={(e) => {
            const v = Math.min(Math.max(Number(e.target.value) || 1, 1), 28)
            definirConfigFinanceira({ primeiroDiaMesFinanceiro: v })
          }}
          className="w-24 card-surface rounded-xl px-3.5 py-2.5 text-[13px] text-white border border-border focus:outline-none focus:border-accent-cyan"
        />
      </div>

      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Semana começa em</p>
        <div className="flex gap-2">
          <ChipOpcao label="Domingo" ativo={estado.semanaComecaEm === 'domingo'} onClick={() => definirConfigFinanceira({ semanaComecaEm: 'domingo' })} />
          <ChipOpcao label="Segunda" ativo={estado.semanaComecaEm === 'segunda'} onClick={() => definirConfigFinanceira({ semanaComecaEm: 'segunda' })} />
        </div>
      </div>

      <div className={desabilitado}>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Formato de data</p>
        <div className="flex flex-col gap-2">
          {(['DD/MM/AAAA', 'MM/DD/AAAA', 'AAAA-MM-DD'] as const).map((f) => (
            <ChipOpcao key={f} label={f} ativo={estado.formatoData === f} onClick={() => definirConfigFinanceira({ formatoData: f })} />
          ))}
        </div>
      </div>
    </>
  )
}
