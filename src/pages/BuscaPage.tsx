import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BookMarked, Calculator, GraduationCap, LineChart, Wallet, BookOpen } from 'lucide-react'
import { MODULOS, TRILHAS } from '@banco-de-dados/modulos'
import { GLOSSARIO_TERMOS } from '@banco-de-dados/glossario/termos'
import { LIVROS } from '@banco-de-dados/livros'
import { buildMercados } from '@/data/mercado'
import { CARTEIRAS_RECOMENDADAS } from '@banco-de-dados/investidor/dicas'

const CALCULADORAS_BUSCA = [
  { id: 'juros-compostos', nome: 'Juros Compostos', desc: 'Veja seu dinheiro crescer com aportes constantes' },
  { id: 'regra-72', nome: 'Regra dos 72', desc: 'Em quanto tempo seu capital dobra' },
  { id: 'dividendos', nome: 'Renda de Dividendos', desc: 'Estime sua renda passiva mensal' },
  { id: 'fire', nome: 'Aposentadoria (FIRE)', desc: 'Patrimônio necessário para viver de renda' },
  { id: 'conversor-taxas', nome: 'Conversor de Taxas', desc: 'Ao ano, ao mês, nominal e real' },
  { id: 'primeiro-milhao', nome: 'Primeiro Milhão', desc: 'Quando você chega no R$ 1.000.000' },
  { id: 'planejador-metas', nome: 'Planejador de Metas', desc: 'Quanto guardar por mês para uma meta' },
]

const PAGINAS_APP = [
  { nome: 'Aprender', desc: `${MODULOS.length} módulos em ${TRILHAS.length} trilhas`, destino: '/aprender' },
  { nome: 'Mercado ao vivo', desc: 'Cotações, ranking, watchlist', destino: '/mercado' },
  { nome: 'Biblioteca', desc: 'Resumos de livros e glossário', destino: '/biblioteca' },
  { nome: 'Carteira', desc: 'Simulador de perfis e ferramentas', destino: '/carteira' },
  { nome: 'Perfil', desc: 'Conquistas e configurações', destino: '/perfil' },
  { nome: 'Área do Investidor', desc: 'Teses, carteiras recomendadas, relatórios', destino: '/investidor' },
]

// Os mercados são dados estáticos montados em runtime: gerar uma vez, no
// módulo, em vez de a cada tecla digitada na busca.
const MERCADOS = buildMercados()

function filtrar<T>(itens: T[], q: string, campos: (item: T) => string[]) {
  if (!q) return []
  return itens.filter((item) => campos(item).some((c) => c.toLowerCase().includes(q))).slice(0, 5)
}

export default function BuscaPage() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')
  const q = busca.trim().toLowerCase()

  // Sem o memo, as oito listas eram refiltradas a cada render — inclusive nos
  // renders que não têm nada a ver com a busca.
  const r = useMemo(
    () => ({
      paginas: filtrar(PAGINAS_APP, q, (p) => [p.nome, p.desc]),
      modulos: filtrar(MODULOS, q, (m) => [m.titulo]),
      trilhas: filtrar(TRILHAS, q, (t) => [t.nome, t.descricao]),
      mercados: filtrar(MERCADOS, q, (m) => [m.nome]),
      carteiras: filtrar(CARTEIRAS_RECOMENDADAS, q, (c) => [c.nome, c.foco]),
      glossario: filtrar(GLOSSARIO_TERMOS, q, (t) => [t.termo, t.def]),
      livros: filtrar(LIVROS, q, (l) => [l.titulo, l.autor]),
      calculadoras: filtrar(CALCULADORAS_BUSCA, q, (c) => [c.nome, c.desc]),
    }),
    [q]
  )

  const resultadosPaginas = r.paginas
  const resultadosModulos = r.modulos
  const resultadosTrilhas = r.trilhas
  const resultadosMercados = r.mercados
  const resultadosCarteiras = r.carteiras
  const resultadosGlossario = r.glossario
  const resultadosLivros = r.livros
  const resultadosCalc = r.calculadoras

  const total =
    resultadosPaginas.length + resultadosModulos.length + resultadosTrilhas.length + resultadosMercados.length +
    resultadosCarteiras.length + resultadosGlossario.length + resultadosLivros.length + resultadosCalc.length

  return (
    <div className="px-4 pt-5 pb-28">
      <div className="flex items-center gap-2.5 mb-4.5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            autoFocus
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar em todo o app..."
            className="w-full h-11 pl-[38px] rounded-2xl bg-bg-card border border-accent-cyan/30 text-white text-[13px] outline-none"
          />
        </div>
        <button onClick={() => navigate(-1)} className="text-slate-400 text-[13px] font-semibold">
          Cancelar
        </button>
      </div>

      {!q && (
        <div className="text-center py-16 text-slate-500">
          <Search size={30} className="mx-auto mb-3" />
          <p className="text-[13px]">Busque em módulos, trilhas, mercados, glossário, livros e ferramentas</p>
        </div>
      )}

      {q && total === 0 && (
        <div className="text-center py-16 text-slate-500">
          <p className="text-[13px]">Nenhum resultado para "{busca}"</p>
        </div>
      )}

      {resultadosPaginas.length > 0 && (
        <Secao titulo="Páginas" icone={GraduationCap} cor="#00D4FF">
          {resultadosPaginas.map((p, i) => (
            <Item key={i} titulo={p.nome} subtitulo={p.desc} onClick={() => navigate(p.destino)} />
          ))}
        </Secao>
      )}

      {resultadosModulos.length > 0 && (
        <Secao titulo="Módulos" icone={GraduationCap} cor="#00D4FF">
          {resultadosModulos.map((m) => (
            <Item key={m.id} titulo={m.titulo} onClick={() => navigate(m.id === 'educacao-financeira' ? '/modulo/educacao-financeira' : '/aprender')} />
          ))}
        </Secao>
      )}

      {resultadosTrilhas.length > 0 && (
        <Secao titulo="Trilhas" icone={BookOpen} cor="#3B82F6">
          {resultadosTrilhas.map((t) => (
            <Item key={t.id} titulo={t.nome} subtitulo={t.descricao} onClick={() => navigate(`/aprender?trilha=${t.id}`)} />
          ))}
        </Secao>
      )}

      {resultadosMercados.length > 0 && (
        <Secao titulo="Mercado" icone={LineChart} cor="#EC4899">
          {resultadosMercados.map((m) => (
            <Item key={m.id} titulo={m.nome} subtitulo={`${m.valor} · ${m.delta}`} onClick={() => navigate('/mercado')} />
          ))}
        </Secao>
      )}

      {resultadosCarteiras.length > 0 && (
        <Secao titulo="Carteiras Recomendadas" icone={Wallet} cor="#8B5CF6">
          {resultadosCarteiras.map((c) => (
            <Item key={c.id} titulo={c.nome} subtitulo={c.foco} onClick={() => navigate('/investidor')} />
          ))}
        </Secao>
      )}

      {resultadosGlossario.length > 0 && (
        <Secao titulo="Glossário" icone={Search} cor="#FFC93C">
          {resultadosGlossario.map((t, i) => (
            <Item key={i} titulo={t.termo} subtitulo={t.def} onClick={() => navigate('/glossario')} />
          ))}
        </Secao>
      )}

      {resultadosLivros.length > 0 && (
        <Secao titulo="Biblioteca" icone={BookMarked} cor="#8B5CF6">
          {resultadosLivros.map((l) => (
            <Item key={l.id} titulo={l.titulo} subtitulo={l.autor} onClick={() => navigate('/biblioteca')} />
          ))}
        </Secao>
      )}

      {resultadosCalc.length > 0 && (
        <Secao titulo="Ferramentas" icone={Calculator} cor="#22C55E">
          {resultadosCalc.map((c) => (
            <Item key={c.id} titulo={c.nome} subtitulo={c.desc} onClick={() => navigate('/ferramentas')} />
          ))}
        </Secao>
      )}
    </div>
  )
}

function Secao({ titulo, icone: Icone, cor, children }: { titulo: string; icone: any; cor: string; children: React.ReactNode }) {
  return (
    <div className="mb-4.5">
      <div className="flex items-center gap-1.5 mb-2">
        <Icone size={12} style={{ color: cor }} />
        <p className="text-[10.5px] font-bold tracking-wide" style={{ color: cor }}>
          {titulo.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function Item({ titulo, subtitulo, onClick }: { titulo: string; subtitulo?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-start w-full p-3 rounded-[14px] card-surface text-left">
      <span className="text-[13px] font-semibold text-white">{titulo}</span>
      {subtitulo && <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">{subtitulo}</span>}
    </button>
  )
}
