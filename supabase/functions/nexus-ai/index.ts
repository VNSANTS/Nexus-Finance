// Edge Function: nexus-ai
//
// Ponte entre o app e a API do Gemini. Existe especificamente para NUNCA
// expor a chave da API do Gemini no bundle do frontend — se ela fosse
// colocada direto no React, qualquer pessoa abrindo o DevTools do
// navegador conseguiria copiá-la e usar a cota de outra pessoa. Aqui ela
// vive só como variável de ambiente da function, nunca sai do servidor.
//
// Fluxo: app manda { mensagem, sessaoId, escopo, moduloContexto? } →
// function confirma que quem chamou tem sessão válida → busca as últimas
// mensagens DAQUELA SESSÃO (não do usuário inteiro — cada conversa tem
// sua própria memória, sem misturar com conversas antigas) → monta o
// prompt (system prompt do escopo + índice de módulos + contexto
// financeiro real, se escopo gestao-financeira + contexto do módulo
// atual, se houver + histórico da sessão + mensagem nova) → chama o
// Gemini → salva a pergunta e a resposta no histórico → devolve a resposta.
//
// IMPORTANTE sobre acesso a dados financeiros: a function lê
// gestao_financeira_estado usando o token do PRÓPRIO usuário que chamou
// (createClient com o Authorization header dele), nunca a service_role
// key — ou seja, a RLS de gestao_financeira_estado (só auth.uid() =
// user_id) protege isso normalmente, a function só consegue ler os dados
// de quem está efetivamente logado fazendo a pergunta, nunca de outro
// usuário.

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_MODEL_PADRAO = 'gemini-3.6-flash'
// Lista fixa — nunca confia no que o cliente manda sem checar. Só modelos
// Flash/Flash-Lite (família 3.x, elegíveis pro tier gratuito do Gemini;
// modelos Pro saíram do tier grátis em 2026, por isso não entram aqui).
const MODELOS_PERMITIDOS = new Set(['gemini-3.1-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash'])
const NIVEL_PENSAMENTO: Record<string, 'low' | 'medium' | 'high'> = { baixo: 'low', medio: 'medium', alto: 'high' }
const URL_INDICE_MODULOS = 'https://vnsants.github.io/Nexus-Finance/nexus-ai-indice-modulos.json'
const MAX_MENSAGENS_HISTORICO = 20 // últimas 20 (10 trocas) da sessão atual — memória curta o suficiente sem inflar o prompt
const MAX_TRANSACOES_NO_PROMPT = 30 // últimas 30 transações — dá contexto real sem mandar o histórico financeiro inteiro a cada mensagem

type Escopo = 'geral' | 'gestao-financeira'

const SYSTEM_PROMPTS: Record<Escopo, string> = {
  geral: `Você é o Nexus AI, o assistente do Nexus Finance — um app brasileiro de educação financeira.

Seu papel:
- Tirar dúvidas gerais sobre finanças pessoais e investimentos, em português do Brasil, de forma clara e didática.
- Quando o usuário perguntar sobre um tema que existe como módulo no app (veja o índice abaixo), mencione o nome do módulo e sugira que ele acesse para aprofundar, além de já dar uma resposta útil na hora.
- Se a pergunta não tiver relação com finanças/investimentos/o app, responda educadamente que seu foco é esse tema.

Regras importantes:
- Nunca dê recomendação de investimento específica e personalizada (tipo "compre a ação X" ou "invista Y% no seu caso") — você não conhece a situação financeira completa da pessoa. Eduque sobre conceitos e processos de decisão, não substitua um profissional.
- Seja direto e didático, sem enrolação. Use exemplos práticos brasileiros (Selic, Tesouro Direto, CDB, FGTS etc.) quando fizer sentido.
- Respostas em geral curtas (2-4 parágrafos), a não ser que o usuário peça mais detalhe.`,

  'gestao-financeira': `Você é o Nexus AI, assistente dentro do módulo de Gestão Financeira do Nexus Finance — um app brasileiro de organização financeira pessoal (controle de receitas, despesas, cartões, metas e orçamento).

Você TEM ACESSO aos dados financeiros reais da pessoa (saldo, contas, cartões, transações recentes, dívidas, metas, orçamento por categoria) — eles vêm resumidos logo abaixo, na seção "Dados financeiros do usuário". Use esses números de verdade nas suas respostas: se perguntarem "como estão minhas finanças", analise os dados reais em vez de pedir para a pessoa te contar de novo.

Seu papel:
- Analisar a situação financeira real da pessoa e dar um retrato honesto (gastando mais do que ganha? qual categoria pesa mais? meta no prazo?).
- Ajudar a organizar: categorizar melhor um gasto, montar orçamento, interpretar tendências nos próprios números.
- Quando fizer sentido pelo que você vê nos dados (ex: gasto alto e recorrente numa categoria, dívida crescendo, meta estagnada), conecte com um módulo educacional relevante do índice abaixo e sugira que a pessoa aprofunde lá — você é também uma ponte para o aprendizado, não só um espelho dos números.

Regras importantes:
- Nunca dê recomendação de investimento específica (tipo "compre X" ou "invista Y% no seu caso") — para isso, direcione ao assistente educacional geral do app ou a um profissional.
- Os dados financeiros abaixo podem estar incompletos ou desatualizados por alguns segundos (sincronizam periodicamente) — se algo parecer estranho ou você não tiver o dado necessário, pergunte à pessoa em vez de inventar.
- Seja prático, direto, e baseado nos números reais — a pessoa está organizando a vida financeira dela de verdade.
- Respostas curtas (2-4 parágrafos), a não ser que peçam mais detalhe.`,
}

type CorpoRequisicao = {
  mensagem: string
  sessaoId: string
  escopo?: Escopo
  moduloContexto?: string | null
  // Usado por chamadas de IA que não são um "chat" de verdade (ex: resumo
  // diário de mercado em src/lib/resumoDiarioIA.ts) — não grava em
  // nexus_ai_mensagens, pra não poluir a lista de conversas do usuário com
  // uma sessão que ele nunca abriu de propósito. Também não lê histórico
  // (não faz sentido pra uma chamada avulsa). Default false = comportamento
  // de chat normal, sem mudar nada pra quem já usa.
  semHistorico?: boolean
  // Escolha da pessoa (Settings do chat, ver src/nexus-ai/preferenciasModelo.ts)
  // — sempre validada contra MODELOS_PERMITIDOS/NIVEL_PENSAMENTO abaixo antes
  // de repassar pro Gemini, nunca usada crua. Ausente/inválida = padrão de sempre.
  modelo?: string
  esforco?: string
}

type IndiceModulos = { modulos: { titulo: string; trilhaId: string }[] }

async function buscarIndiceModulos(): Promise<string> {
  try {
    const resp = await fetch(URL_INDICE_MODULOS)
    if (!resp.ok) return ''
    const indice: IndiceModulos = await resp.json()
    return '\n\nÍndice de módulos disponíveis no app:\n' +
      indice.modulos.map((m) => `- ${m.titulo} (trilha: ${m.trilhaId})`).join('\n')
  } catch {
    return '' // site fora do ar ou sem rede — segue sem índice em vez de travar a conversa
  }
}

// Monta um resumo compacto (não o JSON bruto inteiro, que pode ter
// centenas de transações e estouraria o prompt) do estado financeiro real
// da pessoa, para o escopo gestao-financeira.
//
// IMPORTANTE: os nomes de campo aqui precisam bater exatamente com
// src/gestao-financeira/types.ts (Conta.saldoInicial, não "saldo";
// Meta.valorObjetivo, não "valorAlvo"; OrcamentoCategoria.limite, não
// "valorLimite"). Um campo errado aqui derruba TODA mensagem do escopo GF,
// porque isso roda antes de chamar o Gemini — já aconteceu uma vez.
function montarContextoFinanceiro(estadoGf: Record<string, unknown> | null): string {
  if (!estadoGf) {
    return '\n\nDados financeiros do usuário: ainda não há dados sincronizados (conta nova ou app ainda não sincronizou). Peça para a pessoa abrir a tela inicial da Gestão Financeira ao menos uma vez.'
  }

  const contas = (estadoGf.contas as { id: string; nome: string; tipo: string; saldoInicial: number; arquivada: boolean }[]) ?? []
  const cartoes = (estadoGf.cartoes as { nome: string; limite: number }[]) ?? []
  const transacoes = (estadoGf.transacoes as { descricao: string; valor: number; tipo: string; categoriaId: string | null; contaId: string | null; data: string }[]) ?? []
  const dividas = (estadoGf.dividas as { descricao: string; valorTotal: number; valorPago: number }[]) ?? []
  const metas = (estadoGf.metas as { nome: string; valorObjetivo: number; valorAtual: number }[]) ?? []
  const orcamentos = (estadoGf.orcamentos as { categoriaId: string; limite: number }[]) ?? []
  const categorias = (estadoGf.categorias as { id: string; nome: string }[]) ?? []
  const nomeCategoria = (id: string | null) => (id ? categorias.find((c) => c.id === id)?.nome ?? id : 'sem categoria')

  // Mesma fórmula de src/gestao-financeira/selectors.ts (saldoDaConta /
  // saldoTotalContas): saldo inicial + receitas - despesas lançadas nela.
  const movimentacoesDaConta = (contaId: string) =>
    transacoes
      .filter((t) => t.contaId === contaId)
      .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)

  const contasAtivas = contas.filter((c) => !c.arquivada)
  const idsContasAtivas = new Set(contasAtivas.map((c) => c.id))
  const saldoSemConta = transacoes
    .filter((t) => !t.contaId || !idsContasAtivas.has(t.contaId))
    .reduce((s, t) => s + (t.tipo === 'receita' ? t.valor : t.tipo === 'despesa' ? -t.valor : 0), 0)
  const saldoTotal = contasAtivas.reduce((soma, c) => soma + c.saldoInicial + movimentacoesDaConta(c.id), 0) + saldoSemConta

  const ultimasTransacoes = [...transacoes]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, MAX_TRANSACOES_NO_PROMPT)

  const partes: string[] = []
  partes.push(`Saldo total (todas as contas): R$ ${saldoTotal.toFixed(2)}`)
  partes.push(
    `Contas: ${
      contasAtivas.length
        ? contasAtivas.map((c) => `${c.nome} (${c.tipo}): R$ ${(c.saldoInicial + movimentacoesDaConta(c.id)).toFixed(2)}`).join('; ')
        : 'nenhuma cadastrada'
    }`
  )
  if (cartoes.length) partes.push(`Cartões: ${cartoes.map((c) => `${c.nome} (limite R$ ${c.limite.toFixed(2)})`).join('; ')}`)
  if (dividas.length) {
    partes.push(
      `Dívidas: ${dividas.map((d) => `${d.descricao}: pago R$ ${d.valorPago.toFixed(2)} de R$ ${d.valorTotal.toFixed(2)}`).join('; ')}`
    )
  }
  if (metas.length) {
    partes.push(`Metas: ${metas.map((m) => `${m.nome}: R$ ${m.valorAtual.toFixed(2)} de R$ ${m.valorObjetivo.toFixed(2)}`).join('; ')}`)
  }
  if (orcamentos.length) {
    partes.push(`Orçamento por categoria: ${orcamentos.map((o) => `${nomeCategoria(o.categoriaId)}: limite R$ ${o.limite.toFixed(2)}`).join('; ')}`)
  }
  partes.push(
    `Últimas ${ultimasTransacoes.length} transações (mais recente primeiro): ` +
      (ultimasTransacoes.length
        ? ultimasTransacoes
            .map((t) => `[${t.data}] ${t.tipo} "${t.descricao}" R$ ${t.valor.toFixed(2)} (${nomeCategoria(t.categoriaId)})`)
            .join(' | ')
        : 'nenhuma transação ainda')
  )

  return '\n\nDados financeiros do usuário (use estes números reais nas suas respostas):\n' + partes.join('\n')
}

// Busca gestao_financeira_estado + monta o resumo, com o mesmo try/catch
// de proteção de antes (nunca deixa um formato de dado inesperado derrubar
// a conversa inteira — já aconteceu por um nome de campo errado). Extraído
// numa função à parte pra poder rodar em paralelo com as outras buscas
// independentes (ver Promise.all mais abaixo).
async function buscarContextoFinanceiro(supabase: SupabaseClient, userId: string): Promise<string> {
  const { data: estadoGf } = await supabase.from('gestao_financeira_estado').select('dados_jsonb').eq('user_id', userId).maybeSingle()
  try {
    return montarContextoFinanceiro((estadoGf?.dados_jsonb as Record<string, unknown>) ?? null)
  } catch (erroContexto) {
    console.error('Erro ao montar contexto financeiro:', erroContexto)
    return '\n\nDados financeiros do usuário: não foi possível ler os dados agora. Avise a pessoa e sugira tentar de novo em instantes.'
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      return respostaErro('Nexus AI ainda não está configurado (chave ausente no servidor).', 500)
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return respostaErro('Não autenticado.', 401)

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })

    const { data: { user }, error: erroUsuario } = await supabase.auth.getUser()
    if (erroUsuario || !user) return respostaErro('Sessão inválida.', 401)

    const { mensagem, sessaoId, escopo = 'geral', moduloContexto, semHistorico = false, modelo, esforco }: CorpoRequisicao = await req.json()
    if (!mensagem || !mensagem.trim()) return respostaErro('Mensagem vazia.', 400)
    if (!sessaoId) return respostaErro('sessaoId ausente.', 400)

    const modeloEscolhido = modelo && MODELOS_PERMITIDOS.has(modelo) ? modelo : GEMINI_MODEL_PADRAO
    const nivelPensamento = (esforco && NIVEL_PENSAMENTO[esforco]) || NIVEL_PENSAMENTO.medio

    // As 3 buscas abaixo (histórico da sessão, índice de módulos, contexto
    // financeiro) são independentes entre si — antes rodavam uma atrás da
    // outra (await sequencial), o que somava a latência das 3. Rodando em
    // paralelo, o tempo total é só o da mais lenta das 3 (normalmente o
    // índice de módulos, que é um fetch pro GitHub Pages) em vez da soma —
    // ganho de velocidade real, sem mudar nada do que cada uma faz.
    const [historicoOrdenado, indiceTexto, contextoFinanceiro] = await Promise.all([
      semHistorico
        ? Promise.resolve([])
        : supabase
            .from('nexus_ai_mensagens')
            .select('papel, conteudo')
            .eq('user_id', user.id)
            .eq('sessao_id', sessaoId)
            .eq('escopo', escopo)
            .order('created_at', { ascending: false })
            .limit(MAX_MENSAGENS_HISTORICO)
            .then((r) => (r.data ?? []).reverse()),

      // Índice de módulos: em AMBOS os escopos agora — o assistente geral
      // usa para direcionar aprendizado, e o assistente da GF usa para
      // conectar um padrão visto nos dados financeiros reais a um módulo
      // educacional relevante (pedido explícito: "usar como base os módulos
      // e direcionar a um aprendizado mais completo").
      buscarIndiceModulos(),

      // Contexto financeiro real: só no escopo gestao-financeira, e só
      // busca gestao_financeira_estado com o token do PRÓPRIO usuário (RLS
      // de supabase/007_gestao_financeira_sync.sql garante que só o dono do
      // dado é lido, mesmo que alguém tentasse manipular o request).
      escopo === 'gestao-financeira' ? buscarContextoFinanceiro(supabase, user.id) : Promise.resolve(''),
    ])

    const contextoModulo = moduloContexto
      ? `\n\nO usuário está atualmente na tela do módulo "${moduloContexto}" — priorize relacionar sua resposta a esse módulo quando fizer sentido.`
      : ''

    const systemInstruction = SYSTEM_PROMPTS[escopo] + indiceTexto + contextoFinanceiro + contextoModulo

    const contents = [
      ...historicoOrdenado.map((m: { papel: string; conteudo: string }) => ({
        role: m.papel,
        parts: [{ text: m.conteudo }],
      })),
      { role: 'user', parts: [{ text: mensagem }] },
    ]

    const respostaGemini = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modeloEscolhido}:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            // "Esforço" escolhido na tela de Configurações — modelos 3.x
            // não suportam desligar completamente o "pensamento" (nem no
            // nível mais baixo), mas "low" já reduz bastante a latência
            // comparado ao padrão do modelo.
            thinkingConfig: { thinkingLevel: nivelPensamento },
          },
        }),
      }
    )

    if (!respostaGemini.ok) {
      const detalhe = await respostaGemini.text()
      console.error('Erro Gemini:', detalhe)
      return respostaErro('O Nexus AI não conseguiu responder agora. Tente novamente em instantes.', 502)
    }

    const dadosGemini = await respostaGemini.json()
    const textoResposta: string | undefined = dadosGemini?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!textoResposta) {
      return respostaErro('O Nexus AI não conseguiu gerar uma resposta. Tente reformular a pergunta.', 502)
    }

    // Salva pergunta e resposta no histórico — melhor esforço, não bloqueia
    // a resposta pro usuário se a escrita falhar por algum motivo. Pulado
    // quando semHistorico (ver comentário acima).
    if (!semHistorico) {
      await supabase.from('nexus_ai_mensagens').insert([
        { user_id: user.id, sessao_id: sessaoId, escopo, papel: 'user', conteudo: mensagem, modulo_contexto: moduloContexto ?? null },
        { user_id: user.id, sessao_id: sessaoId, escopo, papel: 'model', conteudo: textoResposta, modulo_contexto: moduloContexto ?? null },
      ])
    }

    return respostaOk({ resposta: textoResposta })
  } catch (erro) {
    console.error('Erro inesperado na nexus-ai:', erro)
    return respostaErro('Erro interno.', 500)
  }
})

function respostaOk(dados: unknown) {
  return new Response(JSON.stringify({ ok: true, dados }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    status: 200,
  })
}

function respostaErro(mensagem: string, status: number) {
  return new Response(JSON.stringify({ ok: false, erro: mensagem }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    status,
  })
}
