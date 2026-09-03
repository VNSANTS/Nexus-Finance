import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

// Preferências visuais do app inteiro (tema, cor de destaque, tamanho de
// fonte, densidade, animações). Fica FORA da Gestão Financeira de propósito
// — GF tem estado isolado e não deve ter nenhuma dependência cruzada, mas
// tema é uma preferência do dispositivo/app como um todo, não algo
// financeiro. As duas áreas (app principal e GF) compartilham este mesmo
// provider, então trocar o tema em Configurações Gerais (dentro de GF)
// também muda o app principal, e vice-versa se um dia essa tela existir lá.
const STORAGE_KEY = 'nexus-tema'

export type ModoTema = 'claro' | 'escuro' | 'automatico'

export const CORES_PRINCIPAIS = [
  { id: 'ciano', label: 'Ciano', cor: '#00D4FF', fim: '#3B82F6' },
  { id: 'roxo', label: 'Roxo', cor: '#8B5CF6', fim: '#EC4899' },
  { id: 'verde', label: 'Verde', cor: '#22C55E', fim: '#00D4FF' },
  { id: 'dourado', label: 'Dourado', cor: '#FFC93C', fim: '#EF4444' },
  { id: 'rosa', label: 'Rosa', cor: '#EC4899', fim: '#8B5CF6' },
  { id: 'azul', label: 'Azul', cor: '#3B82F6', fim: '#00D4FF' },
] as const

export type IdCorPrincipal = (typeof CORES_PRINCIPAIS)[number]['id']

export type TamanhoFonte = 'pequeno' | 'padrao' | 'grande' | 'extra-grande'
const ESCALA_FONTE: Record<TamanhoFonte, number> = {
  pequeno: 0.9,
  padrao: 1,
  grande: 1.12,
  'extra-grande': 1.28,
}

export type Densidade = 'compacta' | 'padrao' | 'confortavel'
const ESCALA_DENSIDADE: Record<Densidade, number> = {
  compacta: 0.88,
  padrao: 1,
  confortavel: 1.15,
}

export type TipoFonte = 'padrao' | 'legivel'
export type EspacamentoLinha = 'padrao' | 'ampliado' | 'grande'
const ESCALA_LINHA: Record<EspacamentoLinha, number> = {
  padrao: 1,
  ampliado: 1.25,
  grande: 1.5,
}

export type EspacamentoLetra = 'padrao' | 'ampliado' | 'grande'
const ESCALA_LETRA: Record<EspacamentoLetra, string> = {
  padrao: 'normal',
  ampliado: '0.02em',
  grande: '0.04em',
}

export type EscalaInterface = 'padrao' | 'ampliada' | 'grande'
const ESCALA_INTERFACE: Record<EscalaInterface, number> = {
  padrao: 1,
  ampliada: 1.1,
  grande: 1.22,
}

// ===== Personalização — fundo do app (tela /personalizacao) =====
// Fundo GERAL do app (atrás de tudo), separado da cor de destaque
// (--accent-primaria) e dos cards (--bg-card, que não muda aqui de
// propósito — ver nota grande abaixo do useEffect principal).
export type TipoFundo = 'solido' | 'degrade' | 'imagem'

export interface DegradeFundo {
  de: string // hex
  para: string // hex
  anguloGraus: number // 0–360, direção do gradiente linear
}

const DEGRADE_PADRAO: DegradeFundo = { de: '#0B1220', para: '#0A0E1A', anguloGraus: 135 }

interface PreferenciasTema {
  modo: ModoTema
  corPrincipal: IdCorPrincipal
  tamanhoFonte: TamanhoFonte
  densidade: Densidade
  animacoesAtivas: boolean
  // ===== Acessibilidade (Configurações → Acessibilidade) =====
  // Texto e leitura
  tipoFonte: TipoFonte
  espacamentoLinha: EspacamentoLinha
  espacamentoLetra: EspacamentoLetra
  textoNegrito: boolean
  // Visual
  altoContraste: boolean
  reduzirTransparencias: boolean
  desativarEfeitosVisuais: boolean // sombras, blur, glow — além de "sem animação"
  escalaInterface: EscalaInterface
  // Áudio
  feedbackSonoroAtivo: boolean
  volumeSons: number // 0–100
  // Navegação e interação
  areaTequeAmpliada: boolean // aumenta a área de toque mínima dos botões
  tempoAcaoAmpliado: boolean // dá mais tempo antes de toasts/confirmações temporárias sumirem
  confirmarAcoesImportantes: boolean
  // ===== Personalização (Configurações → Personalização) =====
  amoledAtivo: boolean // só tem efeito com modo/temaResolvido = 'escuro'; força preto puro
  tipoFundo: TipoFundo
  corFundoSolido: string // hex, usado quando tipoFundo === 'solido'
  degradeFundo: DegradeFundo // usado quando tipoFundo === 'degrade'
  imagemFundoUrl: string | null // data URL (base64), usado quando tipoFundo === 'imagem'
  imagemFundoOpacidade: number // 0–100 — opacidade da imagem; o resto é overlay escuro/claro pra manter texto legível
}

const PADRAO: PreferenciasTema = {
  modo: 'escuro',
  corPrincipal: 'ciano',
  tamanhoFonte: 'padrao',
  densidade: 'padrao',
  animacoesAtivas: true,
  tipoFonte: 'padrao',
  espacamentoLinha: 'padrao',
  espacamentoLetra: 'padrao',
  textoNegrito: false,
  altoContraste: false,
  reduzirTransparencias: false,
  desativarEfeitosVisuais: false,
  escalaInterface: 'padrao',
  feedbackSonoroAtivo: true,
  volumeSons: 70,
  areaTequeAmpliada: false,
  tempoAcaoAmpliado: false,
  confirmarAcoesImportantes: true,
  amoledAtivo: false,
  tipoFundo: 'solido',
  corFundoSolido: '#0A0E1A',
  degradeFundo: DEGRADE_PADRAO,
  imagemFundoUrl: null,
  imagemFundoOpacidade: 40,
}

function carregar(): PreferenciasTema {
  if (typeof window === 'undefined') return PADRAO
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return PADRAO
    const salvo = JSON.parse(raw) as Partial<PreferenciasTema>
    // Merge raso normal, exceto degradeFundo: é objeto aninhado, então um
    // merge raso simples deixaria campos faltando (ex: versão salva antes
    // de "anguloGraus" existir) como undefined em vez de cair no padrão.
    return {
      ...PADRAO,
      ...salvo,
      degradeFundo: { ...PADRAO.degradeFundo, ...(salvo.degradeFundo ?? {}) },
    }
  } catch {
    return PADRAO
  }
}

function prefereClaroDoSistema(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

interface ThemeContextValue extends PreferenciasTema {
  temaResolvido: 'claro' | 'escuro' // 'automatico' já resolvido pro valor real em uso
  amoledEfetivo: boolean // amoledAtivo && temaResolvido === 'escuro' — já calculado, evita duplicar a regra na UI
  definirModo: (modo: ModoTema) => void
  definirCorPrincipal: (id: IdCorPrincipal) => void
  definirTamanhoFonte: (t: TamanhoFonte) => void
  definirDensidade: (d: Densidade) => void
  definirAnimacoesAtivas: (ativo: boolean) => void
  definirTipoFonte: (t: TipoFonte) => void
  definirEspacamentoLinha: (e: EspacamentoLinha) => void
  definirEspacamentoLetra: (e: EspacamentoLetra) => void
  definirTextoNegrito: (ativo: boolean) => void
  definirAltoContraste: (ativo: boolean) => void
  definirReduzirTransparencias: (ativo: boolean) => void
  definirDesativarEfeitosVisuais: (ativo: boolean) => void
  definirEscalaInterface: (e: EscalaInterface) => void
  definirFeedbackSonoroAtivo: (ativo: boolean) => void
  definirVolumeSons: (v: number) => void
  definirAreaTequeAmpliada: (ativo: boolean) => void
  definirTempoAcaoAmpliado: (ativo: boolean) => void
  definirConfirmarAcoesImportantes: (ativo: boolean) => void
  definirAmoledAtivo: (ativo: boolean) => void
  definirTipoFundo: (t: TipoFundo) => void
  definirCorFundoSolido: (hex: string) => void
  definirDegradeFundo: (d: Partial<DegradeFundo>) => void
  definirImagemFundoUrl: (url: string | null) => void
  definirImagemFundoOpacidade: (v: number) => void
  restaurarPadroes: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<PreferenciasTema>(carregar)
  const [sistemaClaro, setSistemaClaro] = useState(prefereClaroDoSistema)

  // Acompanha prefers-color-scheme em tempo real só quando o modo é
  // "automático" — em claro/escuro fixo essa mudança do SO é ignorada.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const ouvir = (e: MediaQueryListEvent) => setSistemaClaro(e.matches)
    mq.addEventListener('change', ouvir)
    return () => mq.removeEventListener('change', ouvir)
  }, [])

  const temaResolvido: 'claro' | 'escuro' =
    prefs.modo === 'automatico' ? (sistemaClaro ? 'claro' : 'escuro') : prefs.modo

  const corSelecionada = useMemo(
    () => CORES_PRINCIPAIS.find((c) => c.id === prefs.corPrincipal) ?? CORES_PRINCIPAIS[0],
    [prefs.corPrincipal],
  )

  // AMOLED só faz sentido com o tema escuro resolvido — em tema claro a
  // preferência fica salva mas sem efeito visual nenhum (documentado na UI
  // pela sessão que fizer a tela de Personalização).
  const amoledEfetivo = prefs.amoledAtivo && temaResolvido === 'escuro'

  // Monta o CSS `background` do fundo geral a partir do tipo escolhido.
  // AMOLED tem prioridade sobre qualquer fundo custom — preto puro é o
  // ponto todo do modo AMOLED (economia de bateria em tela OLED), então
  // ligá-lo sobrepõe sólido/degradê/imagem em vez de combinar com eles.
  const backgroundFundo = useMemo(() => {
    if (amoledEfetivo) return '#000000'
    if (prefs.tipoFundo === 'solido') return prefs.corFundoSolido
    if (prefs.tipoFundo === 'degrade') {
      const { de, para, anguloGraus } = prefs.degradeFundo
      return `linear-gradient(${anguloGraus}deg, ${de}, ${para})`
    }
    // 'imagem': a imagem em si vai em --bg-imagem-url (usada via
    // background-image na globals.css, com overlay por cima pra
    // legibilidade — ver nota de handoff abaixo). Aqui o `background`
    // vira só uma cor de fallback enquanto a imagem carrega/se ausente.
    return prefs.corFundoSolido
  }, [amoledEfetivo, prefs.tipoFundo, prefs.corFundoSolido, prefs.degradeFundo])

  // Aplica tudo direto no <html> via classe + CSS variables inline. Fica no
  // <html> (não num wrapper interno) para cobrir portais (createPortal),
  // como o menu radial e os modais, que renderizam fora da árvore do app.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('tema-claro', temaResolvido === 'claro')
    root.classList.toggle('amoled-ativo', amoledEfetivo)
    root.classList.toggle('fundo-tipo-imagem', prefs.tipoFundo === 'imagem' && !amoledEfetivo && !!prefs.imagemFundoUrl)
    root.classList.toggle('animacoes-desativadas', !prefs.animacoesAtivas)
    root.classList.toggle('alto-contraste', prefs.altoContraste)
    root.classList.toggle('reduzir-transparencias', prefs.reduzirTransparencias)
    root.classList.toggle('sem-efeitos-visuais', prefs.desativarEfeitosVisuais)
    root.classList.toggle('fonte-legivel', prefs.tipoFonte === 'legivel')
    root.classList.toggle('texto-negrito', prefs.textoNegrito)
    root.classList.toggle('area-toque-ampliada', prefs.areaTequeAmpliada)
    root.classList.toggle('escala-interface-ativa', prefs.escalaInterface !== 'padrao')
    root.style.setProperty('--accent-primaria', corSelecionada.cor)
    root.style.setProperty('--accent-primaria-fim', corSelecionada.fim)
    root.style.setProperty('--escala-fonte', String(ESCALA_FONTE[prefs.tamanhoFonte]))
    root.style.setProperty('--escala-densidade', String(ESCALA_DENSIDADE[prefs.densidade]))
    root.style.setProperty('--escala-linha', String(ESCALA_LINHA[prefs.espacamentoLinha]))
    root.style.setProperty('--espacamento-letra', ESCALA_LETRA[prefs.espacamentoLetra])
    root.style.setProperty('--escala-interface', String(ESCALA_INTERFACE[prefs.escalaInterface]))
    // ===== Personalização: fundo geral do app =====
    root.style.setProperty('--bg-fundo-app', backgroundFundo)
    root.style.setProperty('--bg-imagem-url', prefs.imagemFundoUrl ? `url(${prefs.imagemFundoUrl})` : 'none')
    root.style.setProperty('--bg-imagem-opacidade', String(prefs.imagemFundoOpacidade / 100))
  }, [
    temaResolvido,
    amoledEfetivo,
    backgroundFundo,
    corSelecionada,
    prefs.tamanhoFonte,
    prefs.densidade,
    prefs.animacoesAtivas,
    prefs.altoContraste,
    prefs.reduzirTransparencias,
    prefs.desativarEfeitosVisuais,
    prefs.tipoFonte,
    prefs.textoNegrito,
    prefs.areaTequeAmpliada,
    prefs.espacamentoLinha,
    prefs.espacamentoLetra,
    prefs.escalaInterface,
    prefs.tipoFundo,
    prefs.imagemFundoUrl,
    prefs.imagemFundoOpacidade,
  ])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // localStorage indisponível (modo privado/quota) — preferências
      // continuam funcionando nesta sessão, só não persistem.
    }
  }, [prefs])

  const definirModo = useCallback((modo: ModoTema) => setPrefs((p) => ({ ...p, modo })), [])
  const definirCorPrincipal = useCallback((id: IdCorPrincipal) => setPrefs((p) => ({ ...p, corPrincipal: id })), [])
  const definirTamanhoFonte = useCallback((t: TamanhoFonte) => setPrefs((p) => ({ ...p, tamanhoFonte: t })), [])
  const definirDensidade = useCallback((d: Densidade) => setPrefs((p) => ({ ...p, densidade: d })), [])
  const definirAnimacoesAtivas = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, animacoesAtivas: ativo })), [])
  const definirTipoFonte = useCallback((t: TipoFonte) => setPrefs((p) => ({ ...p, tipoFonte: t })), [])
  const definirEspacamentoLinha = useCallback((e: EspacamentoLinha) => setPrefs((p) => ({ ...p, espacamentoLinha: e })), [])
  const definirEspacamentoLetra = useCallback((e: EspacamentoLetra) => setPrefs((p) => ({ ...p, espacamentoLetra: e })), [])
  const definirTextoNegrito = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, textoNegrito: ativo })), [])
  const definirAltoContraste = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, altoContraste: ativo })), [])
  const definirReduzirTransparencias = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, reduzirTransparencias: ativo })), [])
  const definirDesativarEfeitosVisuais = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, desativarEfeitosVisuais: ativo })), [])
  const definirEscalaInterface = useCallback((e: EscalaInterface) => setPrefs((p) => ({ ...p, escalaInterface: e })), [])
  const definirFeedbackSonoroAtivo = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, feedbackSonoroAtivo: ativo })), [])
  const definirVolumeSons = useCallback((v: number) => setPrefs((p) => ({ ...p, volumeSons: Math.min(Math.max(v, 0), 100) })), [])
  const definirAreaTequeAmpliada = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, areaTequeAmpliada: ativo })), [])
  const definirTempoAcaoAmpliado = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, tempoAcaoAmpliado: ativo })), [])
  const definirConfirmarAcoesImportantes = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, confirmarAcoesImportantes: ativo })), [])
  const definirAmoledAtivo = useCallback((ativo: boolean) => setPrefs((p) => ({ ...p, amoledAtivo: ativo })), [])
  const definirTipoFundo = useCallback((t: TipoFundo) => setPrefs((p) => ({ ...p, tipoFundo: t })), [])
  const definirCorFundoSolido = useCallback((hex: string) => setPrefs((p) => ({ ...p, corFundoSolido: hex })), [])
  const definirDegradeFundo = useCallback(
    (d: Partial<DegradeFundo>) => setPrefs((p) => ({ ...p, degradeFundo: { ...p.degradeFundo, ...d } })),
    [],
  )
  const definirImagemFundoUrl = useCallback((url: string | null) => setPrefs((p) => ({ ...p, imagemFundoUrl: url })), [])
  const definirImagemFundoOpacidade = useCallback(
    (v: number) => setPrefs((p) => ({ ...p, imagemFundoOpacidade: Math.min(Math.max(v, 0), 100) })),
    [],
  )
  const restaurarPadroes = useCallback(() => setPrefs(PADRAO), [])

  const value: ThemeContextValue = {
    ...prefs,
    temaResolvido,
    amoledEfetivo,
    definirModo,
    definirCorPrincipal,
    definirTamanhoFonte,
    definirDensidade,
    definirAnimacoesAtivas,
    definirTipoFonte,
    definirEspacamentoLinha,
    definirEspacamentoLetra,
    definirTextoNegrito,
    definirAltoContraste,
    definirReduzirTransparencias,
    definirDesativarEfeitosVisuais,
    definirEscalaInterface,
    definirFeedbackSonoroAtivo,
    definirVolumeSons,
    definirAreaTequeAmpliada,
    definirTempoAcaoAmpliado,
    definirConfirmarAcoesImportantes,
    definirAmoledAtivo,
    definirTipoFundo,
    definirCorFundoSolido,
    definirDegradeFundo,
    definirImagemFundoUrl,
    definirImagemFundoOpacidade,
    restaurarPadroes,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  return ctx
}
