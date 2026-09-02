import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Fingerprint, KeyRound, Laptop, ShieldCheck } from 'lucide-react'
import GfHeader from '../components/GfHeader'
import GfTecladoPin from '../components/GfTecladoPin'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { criarHashPin, OPCOES_TAMANHO_PIN, OPCOES_TEMPO_AUTO_BLOQUEIO, verificarPin } from '../seguranca'
import type { TamanhoPin } from '../types'

// Tela "Segurança" (menu Mais → Segurança). Escopo real desta leva: o
// bloqueio por PIN, que é a única coisa que dá pra construir de verdade
// hoje sem servidor e sem sair do navegador (ver seguranca.ts pra o porquê
// e os limites disso). Biometria e "sessões" ficam documentados como não
// implementados nesta tela mesma — mesmo espírito de honestidade já usado
// em GfAcessibilidadePage.tsx (nada de switch fingindo resolver algo que
// não resolve).
//
// O que fica de fora por decisão (não é bug):
// - Esta tela ainda não verifica permissão de Família e perfis — qualquer
//   perfil pode ativar/alterar/desativar o PIN por enquanto. permissoes.gerenciarMembros
//   já existe e dá pra usar aqui quando fizer sentido gatear isso.
// - PIN não criptografa dado nenhum — é trava de tela, não trava de arquivo.
export default function GfSegurancaPage() {
  const { estado, definirPreferenciasSeguranca } = useGestaoFinanceira()
  const prefs = estado.preferenciasSeguranca

  type Etapa = 'tamanho' | 'atual' | 'novo' | 'confirmar'
  const [modo, setModo] = useState<null | 'ativar' | 'alterar' | 'desativar'>(null)
  const [etapa, setEtapa] = useState<Etapa>('tamanho')
  const [tamanhoEscolhido, setTamanhoEscolhido] = useState<TamanhoPin>(4)
  const [digitado, setDigitado] = useState('')
  const [pinNovoTemp, setPinNovoTemp] = useState('')
  const [erroTeclado, setErroTeclado] = useState(false)
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)
  const processandoRef = useRef(false)

  function limparFluxo() {
    setModo(null)
    setEtapa('tamanho')
    setDigitado('')
    setPinNovoTemp('')
    setErroTeclado(false)
    setMensagemErro(null)
  }

  function iniciarAtivar() {
    limparFluxo()
    setModo('ativar')
    setEtapa('tamanho')
    setTamanhoEscolhido(4)
  }
  function iniciarAlterar() {
    limparFluxo()
    setModo('alterar')
    setEtapa('atual')
  }
  function iniciarDesativar() {
    limparFluxo()
    setModo('desativar')
    setEtapa('atual')
  }

  function avisarSucesso(texto: string) {
    setMensagemSucesso(texto)
    setTimeout(() => setMensagemSucesso(null), 3500)
  }

  const tamanhoAlvo: number =
    etapa === 'atual' ? prefs.pinTamanho ?? 4 : modo === 'ativar' ? tamanhoEscolhido : prefs.pinTamanho ?? 4

  useEffect(() => {
    if (!modo || etapa === 'tamanho' || digitado.length !== tamanhoAlvo || processandoRef.current) return

    if (etapa === 'atual') {
      if (!prefs.pinHash || !prefs.pinSalt) return
      processandoRef.current = true
      verificarPin(digitado, prefs.pinSalt, prefs.pinHash).then((ok) => {
        processandoRef.current = false
        if (!ok) {
          setErroTeclado(true)
          setDigitado('')
          setMensagemErro('PIN incorreto.')
          setTimeout(() => setErroTeclado(false), 450)
          return
        }
        setMensagemErro(null)
        setDigitado('')
        if (modo === 'desativar') {
          definirPreferenciasSeguranca({ pinAtivo: false, pinHash: null, pinSalt: null, pinTamanho: null })
          limparFluxo()
          avisarSucesso('PIN desativado.')
        } else {
          setEtapa('novo')
        }
      })
      return
    }

    if (etapa === 'novo') {
      setPinNovoTemp(digitado)
      setDigitado('')
      setEtapa('confirmar')
      return
    }

    if (etapa === 'confirmar') {
      if (digitado !== pinNovoTemp) {
        setErroTeclado(true)
        setDigitado('')
        setPinNovoTemp('')
        setMensagemErro('Os dois códigos não bateram — digite de novo.')
        setEtapa('novo')
        setTimeout(() => setErroTeclado(false), 450)
        return
      }
      processandoRef.current = true
      criarHashPin(digitado).then(({ hash, salt }) => {
        processandoRef.current = false
        definirPreferenciasSeguranca({
          pinAtivo: true,
          pinHash: hash,
          pinSalt: salt,
          pinTamanho: modo === 'ativar' ? tamanhoEscolhido : prefs.pinTamanho ?? 4,
        })
        avisarSucesso(modo === 'ativar' ? 'PIN ativado.' : 'PIN alterado.')
        limparFluxo()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digitado])

  return (
    <div className="pb-10">
      <GfHeader titulo="Segurança" subtitulo="PIN, biometria, sessões" icone={ShieldCheck} corIcone="#22C55E" voltarPara="/gestao-financeira/mais" />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {mensagemSucesso && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-accent-green/30 bg-accent-green/10 px-3 py-2 flex items-center gap-2"
          >
            <Check size={14} className="text-accent-green shrink-0" />
            <p className="text-[11.5px] text-accent-green font-medium">{mensagemSucesso}</p>
          </motion.div>
        )}

        {/* Bloqueio por PIN */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-green/15">
              <KeyRound size={15} className="text-accent-green" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Bloqueio por PIN</p>
          </div>

          {modo ? (
            <FluxoPin
              modo={modo}
              etapa={etapa}
              tamanhoEscolhido={tamanhoEscolhido}
              onEscolherTamanho={(t) => {
                setTamanhoEscolhido(t)
                setEtapa('novo')
              }}
              digitado={digitado}
              tamanhoAlvo={tamanhoAlvo}
              erro={erroTeclado}
              mensagemErro={mensagemErro}
              onDigitar={setDigitado}
              onCancelar={limparFluxo}
            />
          ) : !prefs.pinAtivo ? (
            <>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">
                Exige um código de 4 ou 6 dígitos pra abrir a Gestão Financeira neste aparelho. Ninguém precisa digitar
                nada hoje — ative se quiser essa camada extra.
              </p>
              <button onClick={iniciarAtivar} className="w-full rounded-xl py-2.5 text-[12.5px] font-bold text-[#04121A] bg-accent-green">
                Ativar PIN
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-accent-green shrink-0" />
                <p className="text-[12px] text-slate-300">
                  PIN ativo · {prefs.pinTamanho} dígitos
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={iniciarAlterar}
                  className="flex-1 rounded-xl py-2.5 text-[12px] font-semibold text-slate-200 card-surface border border-border"
                >
                  Alterar PIN
                </button>
                <button
                  onClick={iniciarDesativar}
                  className="flex-1 rounded-xl py-2.5 text-[12px] font-semibold text-accent-red border border-accent-red/40"
                >
                  Desativar PIN
                </button>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-3.5">
                <LinhaSwitch
                  label="Bloquear ao abrir o app"
                  desc="Pede o PIN toda vez que a Gestão Financeira carrega do zero"
                  ativo={prefs.bloquearAoAbrirApp}
                  onToggle={() => definirPreferenciasSeguranca({ bloquearAoAbrirApp: !prefs.bloquearAoAbrirApp })}
                />
                <LinhaSwitch
                  label="Bloquear ao voltar de outro app"
                  desc="Pede o PIN de novo depois de trocar de aba/app e voltar"
                  ativo={prefs.bloquearAoTrocarDeApp}
                  onToggle={() => definirPreferenciasSeguranca({ bloquearAoTrocarDeApp: !prefs.bloquearAoTrocarDeApp })}
                />

                {prefs.bloquearAoTrocarDeApp && (
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] text-slate-500">Tolerância antes de bloquear de novo</p>
                    <div className="grid grid-cols-2 gap-2">
                      {OPCOES_TEMPO_AUTO_BLOQUEIO.map((op) => (
                        <button
                          key={op.valor}
                          onClick={() => definirPreferenciasSeguranca({ tempoAutoBloqueio: op.valor })}
                          className={`rounded-xl py-2 text-[11.5px] font-semibold border ${
                            prefs.tempoAutoBloqueio === op.valor
                              ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                              : 'border-border card-surface text-slate-400'
                          }`}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <p className="text-[10.5px] text-slate-500 leading-relaxed border-t border-border pt-3">
            O PIN nunca fica salvo em texto puro — só um hash (PBKDF2-SHA256), gerado no seu próprio navegador. Isso
            protege o acesso à TELA neste aparelho; não é criptografia dos dados e não impede alguém com acesso ao
            aparelho e ferramentas de desenvolvedor de ler o que está salvo localmente. Se esquecer o PIN, dá pra
            remover a trava na própria tela de bloqueio — isso não apaga nenhum lançamento, conta ou meta. Por enquanto
            qualquer perfil de Família e perfis pode mexer aqui, sem checagem de permissão ainda.
          </p>
        </div>

        {/* Biometria */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-purple/15">
              <Fingerprint size={15} className="text-accent-purple" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Biometria</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Ainda não dá pra desbloquear com digital ou reconhecimento facial. O navegador até oferece uma API pra isso
            (WebAuthn), mas ela foi pensada pra funcionar junto com um servidor validando a chave — sem servidor
            (decisão de projeto da Gestão Financeira), usar isso direito exigiria guardar a própria chave de acesso no
            aparelho, o que enfraquece a proteção em vez de reforçar. Por ora, o PIN é a trava real; biometria fica
            registrada como pendência, não como algo fingido pronto.
          </p>
        </div>

        {/* Sessões e dispositivos */}
        <div className="card-surface rounded-2xl p-3.5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-accent-blue/15">
              <Laptop size={15} className="text-accent-blue" />
            </div>
            <p className="text-[13.5px] font-semibold text-white">Sessões e dispositivos</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            A Gestão Financeira roda só neste aparelho — não existe login, conta na nuvem nem sincronização entre
            celular, computador etc. (ver Privacidade → "Onde seus dados ficam"). Por isso não há uma lista de "outras
            sessões" pra encerrar: cada aparelho tem seus próprios dados, PIN e membros, de forma independente. Pra
            levar seus dados pra outro aparelho, use Mais → Dados e backup.
          </p>
        </div>
      </div>
    </div>
  )
}

function FluxoPin({
  modo,
  etapa,
  tamanhoEscolhido,
  onEscolherTamanho,
  digitado,
  tamanhoAlvo,
  erro,
  mensagemErro,
  onDigitar,
  onCancelar,
}: {
  modo: 'ativar' | 'alterar' | 'desativar'
  etapa: 'tamanho' | 'atual' | 'novo' | 'confirmar'
  tamanhoEscolhido: TamanhoPin
  onEscolherTamanho: (t: TamanhoPin) => void
  digitado: string
  tamanhoAlvo: number
  erro: boolean
  mensagemErro: string | null
  onDigitar: (v: string) => void
  onCancelar: () => void
}) {
  const titulo =
    etapa === 'tamanho'
      ? 'Quantos dígitos?'
      : etapa === 'atual'
        ? modo === 'desativar'
          ? 'Digite seu PIN atual pra desativar'
          : 'Digite seu PIN atual'
        : etapa === 'novo'
          ? 'Digite o novo PIN'
          : 'Digite de novo pra confirmar'

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <p className="text-[12.5px] font-semibold text-white">{titulo}</p>
      {mensagemErro && <p className="text-[11px] text-accent-red -mt-2">{mensagemErro}</p>}

      {etapa === 'tamanho' ? (
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[260px]">
          {OPCOES_TAMANHO_PIN.map((op) => (
            <button
              key={op.valor}
              onClick={() => onEscolherTamanho(op.valor)}
              className={`rounded-xl py-3 text-[12.5px] font-semibold border ${
                tamanhoEscolhido === op.valor
                  ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                  : 'border-border card-surface text-slate-400'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      ) : (
        <GfTecladoPin valor={digitado} tamanho={tamanhoAlvo} onMudar={onDigitar} erro={erro} />
      )}

      <button onClick={onCancelar} className="text-[11.5px] text-slate-500 underline mt-1">
        Cancelar
      </button>
    </div>
  )
}

function LinhaSwitch({ label, desc, ativo, onToggle }: { label: string; desc?: string; ativo: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
      <div className="text-left pr-2">
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
