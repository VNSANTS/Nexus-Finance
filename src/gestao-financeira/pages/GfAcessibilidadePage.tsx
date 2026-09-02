import { useState } from 'react'
import { motion } from 'framer-motion'
import { Accessibility, Check, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import {
  useTheme,
  type TipoFonte,
  type EspacamentoLinha,
  type EspacamentoLetra,
  type EscalaInterface,
} from '@/hooks/useTheme'

// Tela de Acessibilidade — cobre a seção 11 do documento de projeto:
// Texto e leitura, Visual, Áudio, Navegação e interação. Tudo aqui liga
// direto no mesmo ThemeProvider global usado por Configurações gerais
// (src/hooks/useTheme.tsx), então essas preferências valem pro app
// inteiro, não só pra Gestão Financeira.
//
// O que este arquivo NÃO resolve sozinho (documentado no PROXIMA_SESSAO.md
// como pendência, não fingido aqui como pronto):
// - Leitor de tela de verdade (aria-label em cada ícone, texto alternativo
//   em cada imagem, ordem de navegação, rótulo de cada campo de form) —
//   isso é auditoria + edição tela por tela do app inteiro, não uma
//   preferência que se liga num switch.
// - Alternativa em tabela para cada gráfico e descrição textual dos
//   dados — depende de cada componente de gráfico individualmente
//   (GfDonutDuplo, GfDonutCategorias, gráficos de Relatórios).
// - Atalhos de teclado dedicados e navegação 100% por teclado testada.
// As preferências abaixo são reais e persistem, mas algumas (feedback
// sonoro, confirmação de ações importantes) ainda não têm nenhum outro
// componente do app *lendo* o valor — ver nota em cada bloco.
export default function GfAcessibilidadePage() {
  const [secaoAberta, setSecaoAberta] = useState<'texto' | 'visual' | 'audio' | 'navegacao'>('texto')

  return (
    <div className="pb-10">
      <GfHeader
        titulo="Acessibilidade"
        subtitulo="Texto, contraste, leitura de tela"
        icone={Accessibility}
        corIcone="#FFC93C"
        voltarPara="/gestao-financeira/mais"
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        <Secao titulo="Texto e leitura" desc="Fonte, espaçamento e negrito" aberta={secaoAberta === 'texto'} onClick={() => setSecaoAberta('texto')}>
          <BlocoTexto />
        </Secao>

        <Secao titulo="Visual" desc="Contraste, transparência, efeitos" aberta={secaoAberta === 'visual'} onClick={() => setSecaoAberta('visual')}>
          <BlocoVisual />
        </Secao>

        <Secao titulo="Áudio" desc="Sons de confirmação e alerta" aberta={secaoAberta === 'audio'} onClick={() => setSecaoAberta('audio')}>
          <BlocoAudio />
        </Secao>

        <Secao titulo="Navegação e interação" desc="Toque, tempo de ação, confirmações" aberta={secaoAberta === 'navegacao'} onClick={() => setSecaoAberta('navegacao')}>
          <BlocoNavegacao />
        </Secao>
      </div>

      <RestaurarPadroes />
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
        {desc && <p className="text-[10.5px] text-slate-500 leading-relaxed">{desc}</p>}
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

function BlocoTexto() {
  const {
    tamanhoFonte, definirTamanhoFonte,
    tipoFonte, definirTipoFonte,
    espacamentoLinha, definirEspacamentoLinha,
    espacamentoLetra, definirEspacamentoLetra,
    textoNegrito, definirTextoNegrito,
  } = useTheme()

  const TAMANHOS: { id: typeof tamanhoFonte; label: string }[] = [
    { id: 'pequeno', label: 'Pequeno' },
    { id: 'padrao', label: 'Padrão' },
    { id: 'grande', label: 'Grande' },
    { id: 'extra-grande', label: 'Extra grande' },
  ]

  return (
    <>
      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tamanho da fonte</p>
        <div className="grid grid-cols-2 gap-2">
          {TAMANHOS.map((t) => (
            <ChipOpcao key={t.id} label={t.label} ativo={tamanhoFonte === t.id} onClick={() => definirTamanhoFonte(t.id)} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Tipo de fonte</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => definirTipoFonte('padrao')}
            className={`text-left rounded-xl px-3.5 py-2.5 border text-[12.5px] font-semibold ${
              tipoFonte === 'padrao' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-white'
            }`}
          >
            Padrão <span className="text-slate-500 font-normal">— Inter</span>
          </button>
          <button
            onClick={() => definirTipoFonte('legivel')}
            className={`text-left rounded-xl px-3.5 py-2.5 border text-[12.5px] font-semibold ${
              tipoFonte === 'legivel' ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-white'
            }`}
            style={tipoFonte === 'legivel' ? undefined : { fontFamily: "'Atkinson Hyperlegible', sans-serif" }}
          >
            Mais legível <span className="text-slate-500 font-normal">— Atkinson Hyperlegible, feita para baixa visão e dislexia</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Espaço entre linhas</p>
          <div className="flex flex-col gap-2">
            {(['padrao', 'ampliado', 'grande'] as EspacamentoLinha[]).map((v) => (
              <ChipOpcao key={v} label={v === 'padrao' ? 'Padrão' : v === 'ampliado' ? 'Ampliado' : 'Grande'} ativo={espacamentoLinha === v} onClick={() => definirEspacamentoLinha(v)} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Espaço entre letras</p>
          <div className="flex flex-col gap-2">
            {(['padrao', 'ampliado', 'grande'] as EspacamentoLetra[]).map((v) => (
              <ChipOpcao key={v} label={v === 'padrao' ? 'Padrão' : v === 'ampliado' ? 'Ampliado' : 'Grande'} ativo={espacamentoLetra === v} onClick={() => definirEspacamentoLetra(v)} />
            ))}
          </div>
        </div>
      </div>

      <LinhaSwitch label="Texto em negrito" desc="Engrossa todo o texto do app para facilitar a leitura" ativo={textoNegrito} onToggle={() => definirTextoNegrito(!textoNegrito)} />
    </>
  )
}

function BlocoVisual() {
  const {
    altoContraste, definirAltoContraste,
    reduzirTransparencias, definirReduzirTransparencias,
    animacoesAtivas, definirAnimacoesAtivas,
    desativarEfeitosVisuais, definirDesativarEfeitosVisuais,
    escalaInterface, definirEscalaInterface,
  } = useTheme()

  return (
    <>
      <LinhaSwitch
        label="Alto contraste"
        desc="Aumenta o contraste entre texto, fundo e bordas para leitura mais nítida"
        ativo={altoContraste}
        onToggle={() => definirAltoContraste(!altoContraste)}
      />

      <div>
        <p className="text-[11.5px] text-slate-500 font-medium mb-1.5">Escala dos elementos</p>
        <div className="grid grid-cols-3 gap-2">
          {(['padrao', 'ampliada', 'grande'] as EscalaInterface[]).map((v) => (
            <ChipOpcao key={v} label={v === 'padrao' ? 'Padrão' : v === 'ampliada' ? 'Ampliada' : 'Grande'} ativo={escalaInterface === v} onClick={() => definirEscalaInterface(v)} />
          ))}
        </div>
      </div>

      <LinhaSwitch
        label="Reduzir transparências"
        desc="Deixa fundos e camadas semi-transparentes praticamente opacos"
        ativo={reduzirTransparencias}
        onToggle={() => definirReduzirTransparencias(!reduzirTransparencias)}
      />

      <LinhaSwitch
        label="Reduzir animações"
        desc="Diminui transições e movimentos da interface"
        ativo={!animacoesAtivas}
        onToggle={() => definirAnimacoesAtivas(!animacoesAtivas)}
      />

      <LinhaSwitch
        label="Desativar efeitos visuais"
        desc="Remove sombras, brilhos e desfoques decorativos"
        ativo={desativarEfeitosVisuais}
        onToggle={() => definirDesativarEfeitosVisuais(!desativarEfeitosVisuais)}
      />

      <p className="text-[10.5px] text-slate-500 leading-relaxed">
        O app já usa ícones e formas além de cor para indicar receita/despesa em todos os lançamentos — nenhuma informação depende só da cor.
      </p>
    </>
  )
}

function BlocoAudio() {
  const { feedbackSonoroAtivo, definirFeedbackSonoroAtivo, volumeSons, definirVolumeSons } = useTheme()

  return (
    <>
      <LinhaSwitch
        label="Feedback sonoro"
        desc="Sons curtos ao confirmar ações e ao receber alertas"
        ativo={feedbackSonoroAtivo}
        onToggle={() => definirFeedbackSonoroAtivo(!feedbackSonoroAtivo)}
      />

      <div className={feedbackSonoroAtivo ? '' : 'opacity-40 pointer-events-none'}>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[11.5px] text-slate-500 font-medium">Volume dos sons</p>
          <div className="flex items-center gap-1 text-slate-500">
            {volumeSons === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span className="text-[11px]">{volumeSons}%</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volumeSons}
          onChange={(e) => definirVolumeSons(Number(e.target.value))}
          className="w-full accent-[var(--accent-primaria)]"
        />
      </div>

      <p className="text-[10.5px] text-slate-500 leading-relaxed">
        Segue automaticamente a compatibilidade de áudio do seu sistema (modo silencioso, fones, etc.).
      </p>
    </>
  )
}

function BlocoNavegacao() {
  const {
    areaTequeAmpliada, definirAreaTequeAmpliada,
    tempoAcaoAmpliado, definirTempoAcaoAmpliado,
    confirmarAcoesImportantes, definirConfirmarAcoesImportantes,
  } = useTheme()

  return (
    <>
      <LinhaSwitch
        label="Aumentar área de toque"
        desc="Expande a área clicável de botões e ícones pequenos"
        ativo={areaTequeAmpliada}
        onToggle={() => definirAreaTequeAmpliada(!areaTequeAmpliada)}
      />

      <LinhaSwitch
        label="Mais tempo para ações temporárias"
        desc="Avisos e confirmações que somem sozinhos ficam visíveis por mais tempo"
        ativo={tempoAcaoAmpliado}
        onToggle={() => definirTempoAcaoAmpliado(!tempoAcaoAmpliado)}
      />

      <LinhaSwitch
        label="Confirmar ações importantes"
        desc="Pede confirmação antes de excluir ou de ações que não podem ser desfeitas"
        ativo={confirmarAcoesImportantes}
        onToggle={() => definirConfirmarAcoesImportantes(!confirmarAcoesImportantes)}
      />

      <p className="text-[10.5px] text-slate-500 leading-relaxed">
        O app não tem nenhuma ação que dependa só de arrastar — tudo que pode ser feito arrastando (como o botão de ação rápida) também pode ser feito por toque simples.
      </p>
    </>
  )
}

function RestaurarPadroes() {
  const { restaurarPadroes } = useTheme()
  return (
    <div className="px-4 mt-3">
      <button
        onClick={() => {
          if (window.confirm('Restaurar todas as preferências de acessibilidade e aparência para os valores padrão?')) {
            restaurarPadroes()
          }
        }}
        className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium mx-auto"
      >
        <RotateCcw size={12} /> Restaurar padrões de acessibilidade
      </button>
    </div>
  )
}
