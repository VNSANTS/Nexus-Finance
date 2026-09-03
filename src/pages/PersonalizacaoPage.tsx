import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Palette,
  Sun,
  Moon,
  MonitorSmartphone,
  Check,
  RotateCcw,
  Zap,
  Square,
  Layers,
  Image as ImageIcon,
  AlertTriangle,
  Upload,
  Trash2,
  Loader2,
} from 'lucide-react'
import { useTheme, CORES_PRINCIPAIS } from '@/hooks/useTheme'
import type { TamanhoFonte, Densidade, IdCorPrincipal, TipoFundo } from '@/hooks/useTheme'
import SeletorCor from '@/components/SeletorCor'
import { comprimirImagemFundo, ImagemFundoMuitoGrandeError } from '@/utils/comprimirImagemFundo'

// Tela única de Personalização — antes vivia como "BlocoAparencia" dentro de
// Configurações gerais da Gestão Financeira. Migrada pra rota própria
// (/personalizacao) porque o ThemeProvider é global (montado em main.tsx,
// fora de tudo), então uma única tela serve tanto o app principal (entrada
// via Perfil) quanto a Gestão Financeira (entrada via Configurações gerais)
// sem duplicar nada. Ver PROXIMA_SESSAO.md, seção "Sessão A", para as
// regras de negócio de AMOLED/fundo custom — não reabrir sem necessidade.

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

const TIPOS_FUNDO: { id: TipoFundo; label: string; desc: string; Icon: typeof Square }[] = [
  { id: 'solido', label: 'Sólido', desc: 'Uma cor só', Icon: Square },
  { id: 'degrade', label: 'Degradê', desc: 'Transição entre 2 cores', Icon: Layers },
  { id: 'imagem', label: 'Imagem', desc: 'Uma foto como fundo', Icon: ImageIcon },
]

export default function PersonalizacaoPage() {
  const navigate = useNavigate()
  const tema = useTheme()
  const {
    modo,
    definirModo,
    corPrincipal,
    definirCorPrincipal,
    tamanhoFonte,
    definirTamanhoFonte,
    densidade,
    definirDensidade,
    animacoesAtivas,
    definirAnimacoesAtivas,
    temaResolvido,
    amoledAtivo,
    definirAmoledAtivo,
    amoledEfetivo,
    tipoFundo,
    definirTipoFundo,
    corFundoSolido,
    definirCorFundoSolido,
    degradeFundo,
    definirDegradeFundo,
    imagemFundoUrl,
    definirImagemFundoUrl,
    imagemFundoOpacidade,
    definirImagemFundoOpacidade,
  } = tema

  return (
    <div className="px-4 pt-5 pb-28">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-400 text-[13px] font-semibold mb-3.5">
        <ChevronLeft size={16} /> Voltar
      </button>

      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-[42px] h-[42px] rounded-2xl bg-accent-cyan/10 flex items-center justify-center">
          <Palette size={19} className="text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white">Personalização</h1>
          <p className="text-[11px] text-slate-500 mt-0.5">Tema, cor, fonte e fundo do app</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {/* ===== Aparência (migrado de BlocoAparencia) ===== */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-4">
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
        </div>

        {/* ===== Modo AMOLED ===== */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <LinhaSwitch
            label="Modo AMOLED"
            desc={
              temaResolvido === 'escuro'
                ? 'Fundo preto puro — pixels desligados de verdade em tela OLED, economiza bateria'
                : 'Só tem efeito com o tema escuro ativo — a preferência fica salva, mas fica inerte no tema claro'
            }
            ativo={amoledAtivo}
            onToggle={() => definirAmoledAtivo(!amoledAtivo)}
            Icon={Zap}
          />
          {amoledAtivo && temaResolvido !== 'escuro' && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 flex items-start gap-2">
              <AlertTriangle size={13} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-[10.5px] text-yellow-400 leading-relaxed">
                AMOLED está ligado, mas sem efeito agora porque o tema atual é claro. Ele entra em ação assim que o tema escuro estiver ativo.
              </p>
            </div>
          )}
        </div>

        {/* ===== Fundo do app ===== */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] font-bold text-white">Fundo do app</p>
            {amoledEfetivo && (
              <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/15 px-1.5 py-0.5 rounded-full">SOBREPOSTO PELO AMOLED</span>
            )}
          </div>

          <div className={`flex flex-col gap-3 ${amoledEfetivo ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="grid grid-cols-3 gap-2">
              {TIPOS_FUNDO.map((t) => (
                <button
                  key={t.id}
                  onClick={() => definirTipoFundo(t.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl py-3 border ${
                    tipoFundo === t.id ? 'border-accent-cyan bg-accent-cyan/10' : 'border-border card-surface'
                  }`}
                >
                  <t.Icon size={17} className={tipoFundo === t.id ? 'text-accent-cyan' : 'text-slate-400'} />
                  <span className={`text-[10.5px] font-semibold ${tipoFundo === t.id ? 'text-accent-cyan' : 'text-slate-400'}`}>{t.label}</span>
                </button>
              ))}
            </div>

            {tipoFundo === 'solido' && (
              <SeletorCor label="Cor de fundo" valor={corFundoSolido} onChange={definirCorFundoSolido} />
            )}

            {tipoFundo === 'degrade' && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <SeletorCor label="De" valor={degradeFundo.de} onChange={(hex) => definirDegradeFundo({ de: hex })} />
                  <SeletorCor label="Para" valor={degradeFundo.para} onChange={(hex) => definirDegradeFundo({ para: hex })} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11.5px] text-slate-500 font-medium">Ângulo</p>
                    <p className="text-[11px] text-slate-400 font-semibold">{degradeFundo.anguloGraus}°</p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={degradeFundo.anguloGraus}
                    onChange={(e) => definirDegradeFundo({ anguloGraus: Number(e.target.value) })}
                    className="w-full accent-[var(--accent-primaria)]"
                  />
                </div>
                <div
                  className="h-14 rounded-xl border border-border"
                  style={{ background: `linear-gradient(${degradeFundo.anguloGraus}deg, ${degradeFundo.de}, ${degradeFundo.para})` }}
                />
              </div>
            )}

            {tipoFundo === 'imagem' && (
              <SeletorImagemFundo
                imagemFundoUrl={imagemFundoUrl}
                imagemFundoOpacidade={imagemFundoOpacidade}
                definirImagemFundoUrl={definirImagemFundoUrl}
                definirImagemFundoOpacidade={definirImagemFundoOpacidade}
              />
            )}
          </div>

          {amoledEfetivo && (
            <p className="text-[10.5px] text-slate-500 leading-relaxed">
              O AMOLED está ativo e sobrepõe qualquer fundo personalizado com preto puro. Desative o AMOLED acima pra usar o fundo escolhido
              aqui.
            </p>
          )}
        </div>

        <button
          onClick={() => {
            if (window.confirm('Restaurar aparência para os valores padrão (tema escuro, cor ciano, fonte padrão)?')) {
              tema.restaurarPadroes()
            }
          }}
          className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium mx-auto mt-1"
        >
          <RotateCcw size={12} /> Restaurar aparência padrão
        </button>
      </div>
    </div>
  )
}

// Upload de imagem de fundo — comprime no cliente (canvas) antes de salvar
// como data URL em PreferenciasTema (ver src/utils/comprimirImagemFundo.ts
// pro porquê de não reusar o comprimirImagem.ts da Gestão Financeira).
function SeletorImagemFundo({
  imagemFundoUrl,
  imagemFundoOpacidade,
  definirImagemFundoUrl,
  definirImagemFundoOpacidade,
}: {
  imagemFundoUrl: string | null
  imagemFundoOpacidade: number
  definirImagemFundoUrl: (url: string | null) => void
  definirImagemFundoOpacidade: (v: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function aoEscolherArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    e.target.value = '' // permite escolher o mesmo arquivo de novo depois de um erro
    if (!arquivo) return

    if (!arquivo.type.startsWith('image/')) {
      setErro('Escolha um arquivo de imagem.')
      return
    }

    setErro(null)
    setCarregando(true)
    try {
      const dataUrl = await comprimirImagemFundo(arquivo)
      definirImagemFundoUrl(dataUrl)
    } catch (err) {
      if (err instanceof ImagemFundoMuitoGrandeError) {
        setErro(err.message)
      } else {
        setErro('Não foi possível processar essa imagem. Tente outra.')
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input ref={inputRef} type="file" accept="image/*" onChange={aoEscolherArquivo} className="hidden" />

      {imagemFundoUrl ? (
        <div className="flex flex-col gap-3">
          <div
            className="h-28 rounded-xl border border-border bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${imagemFundoUrl})` }}
          >
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={carregando}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border card-surface py-2.5 text-[11.5px] font-semibold text-slate-300 disabled:opacity-50"
            >
              {carregando ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Trocar imagem
            </button>
            <button
              type="button"
              onClick={() => definirImagemFundoUrl(null)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border card-surface px-3.5 py-2.5 text-[11.5px] font-semibold text-red-400"
              aria-label="Remover imagem"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11.5px] text-slate-500 font-medium">Opacidade</p>
              <p className="text-[11px] text-slate-400 font-semibold">{imagemFundoOpacidade}%</p>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={imagemFundoOpacidade}
              onChange={(e) => definirImagemFundoOpacidade(Number(e.target.value))}
              className="w-full accent-[var(--accent-primaria)]"
            />
            <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1">
              Um overlay automático se ajusta ao tema pra manter o texto legível por cima da imagem.
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={carregando}
          className="rounded-xl border border-dashed border-border card-surface px-3.5 py-6 flex flex-col items-center gap-2 disabled:opacity-50"
        >
          {carregando ? <Loader2 size={20} className="text-slate-400 animate-spin" /> : <Upload size={20} className="text-slate-400" />}
          <div className="text-center">
            <p className="text-[11.5px] font-semibold text-slate-300">{carregando ? 'Processando imagem…' : 'Escolher imagem'}</p>
            <p className="text-[10.5px] text-slate-500 mt-0.5">A imagem é redimensionada e comprimida automaticamente</p>
          </div>
        </button>
      )}

      {erro && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 flex items-start gap-2">
          <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-[10.5px] text-red-400 leading-relaxed">{erro}</p>
        </div>
      )}
    </div>
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

function LinhaSwitch({
  label,
  desc,
  ativo,
  onToggle,
  Icon,
}: {
  label: string
  desc?: string
  ativo: boolean
  onToggle: () => void
  Icon?: typeof Zap
}) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between">
      <div className="flex items-start gap-2.5 text-left pr-3">
        {Icon && <Icon size={16} className={`mt-0.5 shrink-0 ${ativo ? 'text-accent-cyan' : 'text-slate-500'}`} />}
        <div>
          <p className="text-[12.5px] font-semibold text-white">{label}</p>
          {desc && <p className="text-[10.5px] text-slate-500 leading-relaxed">{desc}</p>}
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
