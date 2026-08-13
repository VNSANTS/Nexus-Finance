import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Flame, ChevronRight, RotateCw, Zap, Lock, Radar } from 'lucide-react'
import ProgressRing from '@/components/ProgressRing'
import TrilhaCard from '@/components/TrilhaCard'
import NexusLogo from '@/components/NexusLogo'
import { useUserProgress } from '@/hooks/useUserProgress'
import { TRILHAS, MODULOS } from '@banco-de-dados/modulos'

const FRASES_MOTIVADORAS = [
  // Pai Rico, Pai Pobre (20)
  { texto: 'Ativo é o que coloca dinheiro no seu bolso. Hoje é um bom dia para escolher construir um.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: "A pergunta certa não é 'posso comprar isso', é 'o que posso fazer para poder comprar isso'.", fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Quem entende como o dinheiro funciona deixa de ser refém do medo e da ambição.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Trabalhar duro pelo dinheiro é diferente de fazer o dinheiro trabalhar duro por você — só um dos dois caminhos leva à liberdade.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'A escola ensina a calcular a área de um triângulo, mas raramente ensina a ler um extrato bancário.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Diploma sozinho não gera renda — só aumenta a chance de conseguir um emprego melhor pago.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Antes de comprar qualquer coisa, pergunte: isso vai colocar dinheiro no meu bolso ou tirar dinheiro do meu bolso?', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Não confunda conforto com investimento — a casa onde você mora raramente é o ativo que você imagina que é.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Não é quanto você ganha que importa, é quanto você fica com.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Entender como impostos funcionam não é sonegar — é jogar o jogo com as regras que já existem.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'O dinheiro não é recurso escasso, é consequência de resolver problema — quanto mais problema você resolve, mais dinheiro flui na sua direção.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Os ricos não esperam o dinheiro aparecer. Eles o criam.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Pergunte não só quanto vou ganhar, mas o que vou aprender — o conhecimento é o único ativo que não deprecia.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'O especialista ganha muito fazendo uma coisa só; o generalista sabe o suficiente de cada área pra enxergar a oportunidade que ninguém mais viu.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'A diferença entre um rico e um pobre, no fim, costuma estar no que cada um faz no próprio tempo livre.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Pague-se primeiro: separe pelo menos 10% da sua renda antes de pagar qualquer outra conta.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Não existe idade certa, nem valor mínimo, nem momento perfeito para começar — o momento certo é agora.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Um bom contador não é despesa, é investimento — pode economizar muito mais do que custa.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Quando você ensina o que aprendeu, você aprende duas vezes.', fonte: 'Pai Rico, Pai Pobre' },
  { texto: 'Carregar água de um poço todo dia ou construir um encanamento que leva água até casa sozinho — essa é a escolha entre trabalhar pelo dinheiro e fazer o dinheiro trabalhar por você.', fonte: 'Pai Rico, Pai Pobre' },

  // O Milionário Mora ao Lado (18)
  { texto: 'O carro importado e a casa imponente são só a ponta do iceberg — o patrimônio de verdade fica submerso, invisível.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Pare de julgar riqueza pelo que você vê. O verdadeiro indicador é o que sobra, não o que se ostenta.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Frugalidade não é privação, é a arte de priorizar: cada real gasto em status é um real que deixou de virar patrimônio.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Renda e riqueza são praticamente variáveis independentes — quem ganha muito pode ter patrimônio negativo, e vice-versa.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Bons acumuladores de patrimônio gastam mais tempo planejando as próprias finanças do que comparando modelo de carro.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Você não é o que você dirige — carro é o ativo que mais deprecia, e quase ninguém está realmente prestando atenção nele.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Cada real gasto pra impressionar os outros é um real a menos rumo à liberdade financeira.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Ajuda financeira crônica a filho adulto não fortalece — substitui a disciplina que ele nunca vai precisar desenvolver sozinho.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'O maior legado que você pode deixar não é dinheiro, é a capacidade de gerar e administrar dinheiro.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'De mangas de camisa a mangas de camisa em três gerações: riqueza não é bem que se transmite, é habilidade que se ensina.', fonte: 'O Milionário Mora ao Lado' },
  { texto: '70% das famílias ricas perdem a riqueza já na segunda geração. Só ensinar o hábito quebra esse padrão.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Profissão de prestígio não é sinônimo de acumulação de riqueza — às vezes é exatamente o oposto.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'A profissão ideal combina baixa concorrência, alto lucro, controle sobre a própria renda, e nenhuma obrigação social de ostentação.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Riqueza não é acidente de nascimento nem prêmio de loteria — é a soma de decisões pequenas e consistentes ao longo de décadas.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'A pergunta que separa quem acumula de quem ostenta: estou comprando isso por necessidade, ou pela imagem que projeta pros outros?', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Some todos os seus bens, subtraia todas as suas dívidas — esse número, não seu salário, é sua riqueza real.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Um gasto pequeno e recorrente, investido por décadas, se transforma numa soma que surpreende até quem fez a conta.', fonte: 'O Milionário Mora ao Lado' },
  { texto: 'Ninguém fica rico tentando parecer rico.', fonte: 'O Milionário Mora ao Lado' },

  // Módulos do app (15)
  { texto: 'O maior erro não é escolher o investimento errado — é deixar o custo fixo mensal subir na mesma velocidade da renda até o aumento de salário virar aluguel maior e carro mais caro.', fonte: 'Módulo: Construção de Patrimônio' },
  { texto: 'R$ 1.000 por mês durante 30 anos a 6% ao ano viram quase R$ 975 mil — e mais da metade desse total vem dos juros, não do seu bolso.', fonte: 'Módulo: Construção de Patrimônio' },
  { texto: 'Renda fixa longa vendida no meio do caminho é renda variável — o risco só desaparece pra quem consegue esperar até o vencimento.', fonte: 'Módulo: Macroeconomia Aplicada à Carteira' },
  { texto: 'Oito reuniões por ano do Copom decidem a taxa que move praticamente toda a renda fixa brasileira e o custo de capital da bolsa inteira.', fonte: 'Módulo: Macroeconomia Aplicada à Carteira' },
  { texto: 'Três em cada quatro brasileiros dizem que dinheiro é uma fonte relevante de estresse no dia a dia. Entender as próprias finanças também é cuidar da própria saúde mental.', fonte: 'Módulo: Psicologia do Dinheiro' },
  { texto: 'O padrão financeiro disfuncional que você nunca parou pra examinar tende a se repetir sozinho — escassez extrema ou gasto compulsivo, herdado sem perceber.', fonte: 'Módulo: Psicologia do Dinheiro' },
  { texto: 'Uma empresa pode ter lucro contábil relevante e, ao mesmo tempo, estar queimando caixa de verdade. Balanço, DRE e fluxo de caixa juntos contam a história completa — isolados, mentem.', fonte: 'Módulo: Empresas e Negócios' },
  { texto: 'Com uma taxa de retirada de 4% ao ano, seu patrimônio-alvo é 25 vezes sua despesa anual — quem gasta R$ 8.000 por mês precisa de R$ 2,4 milhões investidos, não um centavo a menos.', fonte: 'Módulo: Liberdade Financeira' },
  { texto: 'Calcular sua aposentadoria pela rentabilidade nominal em vez do juro real líquido é o erro mais caro do planejamento financeiro — e só aparece uns oito anos tarde demais.', fonte: 'Módulo: Liberdade Financeira' },
  { texto: 'Educação financeira não é sobre nunca gastar — é sobre saber exatamente por que você está gastando.', fonte: 'Nexus Finance' },
  { texto: 'Todo módulo que você completa hoje é um erro caro que você não vai cometer amanhã.', fonte: 'Nexus Finance' },
  { texto: 'Patrimônio não se constrói com um golpe de sorte. Se constrói com a mesma decisão pequena, repetida por anos.', fonte: 'Nexus Finance' },
  { texto: 'O dinheiro que você não entende hoje é a dívida que alguém vai cobrar amanhã.', fonte: 'Nexus Finance' },
  { texto: 'Ler sobre investimento sem nunca investir é como estudar natação sem entrar na água.', fonte: 'Nexus Finance' },
  { texto: 'Quem sabe o próprio número (quanto precisa, até quando, a que taxa) já está à frente de quase todo mundo que só sabe o próprio salário.', fonte: 'Nexus Finance' },
]

const MODULOS_PARA_DESAFIO = 3 // precisa de banco de perguntas suficiente para misturar; 66 módulos completos hoje, então isso libera rápido

function getSaudacao() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function HomePage() {
  const navigate = useNavigate()
  const { progress, levelInfo, isModuloCompleto } = useUserProgress()
  const modulosCompletos = Object.values(progress.abasConcluidas).filter((abas) => abas.length === 6).length
  const desafioDisponivel = modulosCompletos >= MODULOS_PARA_DESAFIO
  const jaFezDesafioHoje = progress.ultimoDesafioData === new Date().toISOString().slice(0, 10)

  const [fraseIndex, setFraseIndex] = useState(() => Math.floor(Math.random() * FRASES_MOTIVADORAS.length))
  const frase = FRASES_MOTIVADORAS[fraseIndex]

  function proximaFrase() {
    setFraseIndex((atual) => {
      if (FRASES_MOTIVADORAS.length <= 1) return atual
      let proximo
      do {
        proximo = Math.floor(Math.random() * FRASES_MOTIVADORAS.length)
      } while (proximo === atual)
      return proximo
    })
  }

  return (
    <div className="px-4 pt-5 pb-28 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <NexusLogo size={34} />
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/busca')} className="w-8 h-8 rounded-full card-surface flex items-center justify-center">
            <Search size={15} className="text-slate-400" />
          </button>
          <div className="flex items-center gap-1.5 card-surface rounded-full px-3 py-1.5">
            <Flame size={15} className="text-accent-gold" fill="#FFC93C" />
            <span className="text-[13px] font-bold text-white">{progress.streak}</span>
          </div>
        </div>
      </div>

      {/* Saudação + frase motivadora clicável */}
      <div>
        <p className="text-lg font-display font-extrabold text-white">
          {getSaudacao()}, {progress.perfilPessoal.nome} 👋
        </p>
        <button onClick={proximaFrase} className="text-left mt-1.5 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={fraseIndex} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
              <p className="text-xs text-slate-400 italic leading-relaxed">"{frase.texto}"</p>
              <p className="text-[10.5px] text-accent-gold font-semibold mt-0.5">— {frase.fonte}</p>
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Card de revisão */}
      {progress.itensRevisao.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/revisao')}
          className="flex items-center gap-3 p-3.5 rounded-[18px] w-full text-left"
          style={{ background: 'linear-gradient(135deg, #EC48991A, #8B5CF61A)', border: '1px solid #EC489944' }}
        >
          <div className="w-10 h-10 rounded-xl bg-accent-pink/20 flex items-center justify-center shrink-0">
            <RotateCw size={19} className="text-accent-pink" />
          </div>
          <div className="flex-1">
            <p className="text-[13.5px] font-bold text-white">Revisar agora</p>
            <p className="text-[11.5px] text-slate-400 mt-0.5">
              {progress.itensRevisao.length} {progress.itensRevisao.length === 1 ? 'item pendente' : 'itens pendentes'} de reforço
            </p>
          </div>
          <ChevronRight size={17} className="text-accent-pink" />
        </motion.button>
      )}

      {/* XP Card */}
      <div className="card-surface rounded-[20px] p-4.5 flex items-center gap-4">
        <ProgressRing progress={levelInfo.progressToNext} size={92} strokeWidth={9}>
          <span className="text-[19px] font-display font-extrabold text-white leading-none">{levelInfo.level}</span>
          <span className="text-[8.5px] text-slate-500 mt-0.5">nível</span>
        </ProgressRing>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-accent-cyan">{levelInfo.levelName}</p>
          <p className="text-xs font-bold text-white mt-0.5">{progress.xp} XP</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {levelInfo.nextLevelName ? `faltam ${100 - levelInfo.progressToNext}% para ${levelInfo.nextLevelName}` : 'nível máximo alcançado'}
          </p>
        </div>
      </div>

      {/* Desafio diário */}
      {desafioDisponivel ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/desafio-diario')}
          className="flex items-center gap-3.5 p-4 rounded-[18px] w-full text-left"
          style={{ background: 'linear-gradient(135deg, #00D4FF14, #8B5CF614)', border: '1px solid #00D4FF33' }}
        >
          <div className="w-[42px] h-[42px] rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0">
            <Zap size={20} className="text-accent-gold" fill="#FFC93C" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[14px] font-bold text-white">Desafio diário</p>
              <span className="text-[9px] font-bold text-accent-gold bg-accent-gold/20 px-1.5 py-0.5 rounded-full">1 PERGUNTA</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {jaFezDesafioHoje ? 'Concluído hoje — volte amanhã' : 'Uma pergunta difícil · +100 XP se acertar · expira à meia-noite'}
            </p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </motion.button>
      ) : (
        <div className="flex items-center gap-3.5 p-4 rounded-[18px] card-surface" style={{ borderStyle: 'dashed' }}>
          <div className="w-[42px] h-[42px] rounded-xl bg-border flex items-center justify-center shrink-0">
            <Lock size={18} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-slate-400">Desafio diário bloqueado</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Conclua mais {Math.max(0, MODULOS_PARA_DESAFIO - modulosCompletos)} módulo(s) para desbloquear
            </p>
          </div>
        </div>
      )}

      {/* Área do Investidor */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/investidor')}
        className="flex items-center gap-3 w-full p-3.5 rounded-[18px] text-left"
        style={{ background: 'linear-gradient(135deg, #8B5CF614, #3B82F614)', border: '1px solid #8B5CF644' }}
      >
        <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center shrink-0">
          <Radar size={19} className="text-accent-purple" />
        </div>
        <div className="flex-1">
          <p className="text-[13.5px] font-bold text-white">Área do Investidor</p>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Teses, carteiras recomendadas e relatórios</p>
        </div>
        <ChevronRight size={17} className="text-accent-purple" />
      </motion.button>

      {/* Trilhas */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-display font-extrabold text-white">Suas trilhas</h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {TRILHAS.map((trilha) => {
            const modulosDaTrilha = MODULOS.filter((m) => m.trilhaId === trilha.id)
            const concluidos = modulosDaTrilha.filter((m) => isModuloCompleto(m.id)).length
            return (
              <TrilhaCard
                key={trilha.id}
                trilha={trilha}
                totalModulos={modulosDaTrilha.length}
                concluidos={concluidos}
                onClick={() => {
                  if (trilha.id === 'fundamentos') navigate('/modulo/educacao-financeira')
                  else navigate(`/aprender?trilha=${trilha.id}`)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
