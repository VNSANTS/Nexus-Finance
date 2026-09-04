import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Check, ChevronRight, Palette } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
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

// Tela de Configurações gerais — cobre "2. Aparência" e parte de
// "3. Configurações financeiras" (valores e moeda, período financeiro) do
// documento de projeto. O que fica fora daqui por escopo (limites de
// gastos, tipos de transação personalizados, regras financeiras) pertence
// às telas de Orçamento/Notificações/Categorias, não a esta.
export default function GfConfiguracoesGeraisPage() {
  const navigate = useNavigate()
  const { estado, permissoes, definirMoeda, definirConfigFinanceira } = useGestaoFinanceira()
  const [secaoAberta, setSecaoAberta] = useState<'idioma-moeda' | 'periodo'>('idioma-moeda')

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
        <button
          onClick={() => navigate('/personalizacao')}
          className="card-surface rounded-2xl p-3.5 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 flex items-center justify-center shrink-0">
              <Palette size={16} className="text-accent-cyan" />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-white">Personalização</p>
              <p className="text-[11px] text-slate-500">Tema, cor, fonte e fundo do app</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-500 shrink-0" />
        </button>

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
