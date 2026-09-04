import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wallet2, Sun, Moon, MonitorSmartphone, CreditCard, MessageSquareHeart, ChevronRight, ChevronLeft } from 'lucide-react'
import NexusLogo from '@/components/NexusLogo'
import { useGestaoFinanceira } from '../GestaoFinanceiraContext'
import { useTheme } from '@/hooks/useTheme'
import type { ModoTema } from '@/hooks/useTheme'

const MOEDAS = [
  { codigo: 'BRL', label: 'Real (R$)' },
  { codigo: 'USD', label: 'Dólar (US$)' },
  { codigo: 'EUR', label: 'Euro (€)' },
]

const TOTAL_PASSOS = 4

// Tela de primeiro acesso (item 1.9 do documento), em formato wizard: uma
// pergunta por tela (Tema → Moeda → Cartão → Feedback), com Voltar/Avançar
// entre elas e "Pular tudo" sempre disponível. Tudo aqui pode ser alterado
// depois em Mais > Configurações gerais. Aparece uma única vez; marcamos
// `primeiroAcessoFeito` ao concluir ou pular.
export default function GfPrimeiroAcesso({ aoConcluir }: { aoConcluir: () => void }) {
  const { estado, definirMoeda, marcarPrimeiroAcesso } = useGestaoFinanceira()
  const { modo, definirModo } = useTheme()
  const [passo, setPasso] = useState(1)
  const [direcao, setDirecao] = useState<1 | -1>(1)
  const [moeda, setMoeda] = useState(estado.moedaPadrao)
  const [temCartao, setTemCartao] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState('')

  function concluir() {
    definirMoeda(moeda)
    marcarPrimeiroAcesso()
    // O feedback e a resposta sobre cartão ficam só neste fluxo por enquanto;
    // quando o módulo de Contas & Cartões existir, "temCartao" pode
    // pré-abrir o formulário de cadastro de cartão automaticamente. O tema
    // já é salvo direto pelo ThemeProvider a cada toque em PassoTema, não
    // precisa de nada aqui.
    aoConcluir()
  }

  function avancar() {
    if (passo === TOTAL_PASSOS) {
      concluir()
      return
    }
    setDirecao(1)
    setPasso((p) => p + 1)
  }

  function voltar() {
    if (passo === 1) return
    setDirecao(-1)
    setPasso((p) => p - 1)
  }

  return (
    <div className="px-5 pt-8 pb-10 min-h-dvh flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <NexusLogo size={34} showWordmark={false} />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-green flex items-center justify-center border-2 border-bg">
            <Wallet2 size={10} className="text-bg" />
          </div>
        </div>
        <div>
          <h1 className="text-[17px] font-display font-extrabold text-white leading-tight">Bem-vindo à Gestão Financeira</h1>
          <p className="text-[12px] text-slate-500">Só alguns ajustes rápidos antes de começar</p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="flex items-center gap-1.5 mb-7">
        {Array.from({ length: TOTAL_PASSOS }, (_, i) => i + 1).map((n) => (
          <div key={n} className="flex-1 h-1.5 rounded-full overflow-hidden bg-border">
            <div
              className="h-full rounded-full bg-accent-green transition-all duration-300"
              style={{ width: n <= passo ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direcao}>
          <motion.div
            key={passo}
            custom={direcao}
            initial={{ opacity: 0, x: direcao * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direcao * -24 }}
            transition={{ duration: 0.2, ease: [0.4, 0.2, 0.2, 1] }}
          >
            {passo === 1 && <PassoTema tema={modo} setTema={definirModo} />}
            {passo === 2 && <PassoMoeda moeda={moeda} setMoeda={setMoeda} />}
            {passo === 3 && <PassoCartao temCartao={temCartao} setTemCartao={setTemCartao} />}
            {passo === 4 && <PassoFeedback feedback={feedback} setFeedback={setFeedback} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2.5 mt-6">
        {passo > 1 && (
          <button
            onClick={voltar}
            className="w-12 h-12 shrink-0 rounded-2xl card-surface border border-border flex items-center justify-center text-slate-300"
            aria-label="Voltar"
          >
            <ChevronLeft size={19} />
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={avancar}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-accent-green text-bg font-bold text-[14px] py-3.5"
        >
          {passo === TOTAL_PASSOS ? 'Começar a usar' : 'Próximo'} <ChevronRight size={17} />
        </motion.button>
      </div>
      <button onClick={concluir} className="mt-3 text-[12px] text-slate-500 font-medium self-center">
        Pular tudo
      </button>
    </div>
  )
}

function PassoTema({ tema, setTema }: { tema: ModoTema; setTema: (t: ModoTema) => void }) {
  return (
    <section>
      <p className="text-[15px] font-bold text-white mb-1">Tema do app</p>
      <p className="text-[12px] text-slate-500 mb-4">Escolha como a Gestão Financeira aparece pra você.</p>
      <div className="grid grid-cols-3 gap-2.5">
        <OpcaoTema label="Claro" Icon={Sun} ativo={tema === 'claro'} onClick={() => setTema('claro')} />
        <OpcaoTema label="Escuro" Icon={Moon} ativo={tema === 'escuro'} onClick={() => setTema('escuro')} />
        <OpcaoTema label="Automático" Icon={MonitorSmartphone} ativo={tema === 'automatico'} onClick={() => setTema('automatico')} />
      </div>
    </section>
  )
}

function PassoMoeda({ moeda, setMoeda }: { moeda: string; setMoeda: (m: string) => void }) {
  return (
    <section>
      <p className="text-[15px] font-bold text-white mb-1">Moeda preferencial</p>
      <p className="text-[12px] text-slate-500 mb-4">Detectamos Real (R$) pelo idioma do dispositivo — pode trocar quando quiser.</p>
      <div className="flex flex-col gap-2">
        {MOEDAS.map((m) => (
          <button
            key={m.codigo}
            onClick={() => setMoeda(m.codigo)}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition-colors ${
              moeda === m.codigo ? 'border-accent-green bg-accent-green/10' : 'border-border card-surface'
            }`}
          >
            <span className="text-[13px] font-medium text-white">{m.label}</span>
            {moeda === m.codigo && <span className="w-2.5 h-2.5 rounded-full bg-accent-green" />}
          </button>
        ))}
      </div>
    </section>
  )
}

function PassoCartao({ temCartao, setTemCartao }: { temCartao: boolean | null; setTemCartao: (v: boolean) => void }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <CreditCard size={16} className="text-accent-gold" />
        <p className="text-[15px] font-bold text-white">Já quer cadastrar um cartão?</p>
      </div>
      <p className="text-[12px] text-slate-500 mb-4">Opcional — você pode fazer isso a qualquer momento em Contas & Cartões.</p>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setTemCartao(true)}
          className={`rounded-2xl px-4 py-3 text-[13px] font-semibold border ${
            temCartao === true ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-300'
          }`}
        >
          Sim, cadastrar depois
        </button>
        <button
          onClick={() => setTemCartao(false)}
          className={`rounded-2xl px-4 py-3 text-[13px] font-semibold border ${
            temCartao === false ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-border card-surface text-slate-300'
          }`}
        >
          Agora não
        </button>
      </div>
    </section>
  )
}

function PassoFeedback({ feedback, setFeedback }: { feedback: string; setFeedback: (v: string) => void }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <MessageSquareHeart size={16} className="text-accent-pink" />
        <p className="text-[15px] font-bold text-white">Alguma sugestão pra essa área?</p>
      </div>
      <p className="text-[12px] text-slate-500 mb-4">Opcional — o que você gostaria de ver aqui dentro?</p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Escreva aqui..."
        rows={4}
        className="w-full rounded-2xl card-surface border border-border px-4 py-3 text-[13px] text-white placeholder:text-slate-600 resize-none focus:outline-none focus:border-accent-green"
      />
    </section>
  )
}

function OpcaoTema({ label, Icon, ativo, onClick }: { label: string; Icon: typeof Sun; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-2xl py-3.5 border ${
        ativo ? 'border-accent-green bg-accent-green/10' : 'border-border card-surface'
      }`}
    >
      <Icon size={18} className={ativo ? 'text-accent-green' : 'text-slate-400'} />
      <span className={`text-[11px] font-medium ${ativo ? 'text-accent-green' : 'text-slate-400'}`}>{label}</span>
    </button>
  )
}
