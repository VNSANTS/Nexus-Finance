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
// prompt (system prompt do escopo + índice de módulos, se escopo geral +
// contexto do módulo atual, se houver + histórico da sessão + mensagem
// nova) → chama o Gemini → salva a pergunta e a resposta no histórico →
// devolve a resposta.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_MODEL = 'gemini-3.6-flash'
const URL_INDICE_MODULOS = 'https://vnsants.github.io/Nexus-Finance/nexus-ai-indice-modulos.json'
const MAX_MENSAGENS_HISTORICO = 20 // últimas 20 (10 trocas) da sessão atual — memória curta o suficiente sem inflar o prompt

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

Seu papel aqui é diferente do assistente educacional do app principal: seu foco é ajudar a pessoa a organizar e entender AS PRÓPRIAS finanças — como categorizar melhor um gasto, como montar um orçamento por categoria, como interpretar um relatório de receitas/despesas, como definir e acompanhar uma meta financeira, como usar as funções do app (lançamentos, cartões, orçamento).

Regras importantes:
- Você não tem acesso aos lançamentos, saldos ou valores reais da pessoa (isso não é enviado a você) — não invente números específicos dela nem finja saber o que ela já cadastrou. Se a pergunta depender de dados que você não tem, peça para ela te contar o valor/contexto relevante.
- Nunca dê recomendação de investimento específica (tipo "compre X" ou "invista Y% no seu caso") — direcione para o assistente educacional geral do app ou para um profissional, se for o caso.
- Seja prático e direto — a pessoa está no meio de organizar a vida financeira, não estudando teoria.
- Respostas curtas (2-3 parágrafos), a não ser que peçam mais detalhe.`,
}

type CorpoRequisicao = {
  mensagem: string
  sessaoId: string
  escopo?: Escopo
  moduloContexto?: string | null
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

    const { mensagem, sessaoId, escopo = 'geral', moduloContexto }: CorpoRequisicao = await req.json()
    if (!mensagem || !mensagem.trim()) return respostaErro('Mensagem vazia.', 400)
    if (!sessaoId) return respostaErro('sessaoId ausente.', 400)

    // Histórico da SESSÃO atual (não do usuário inteiro) — cada conversa
    // tem sua própria memória de curto prazo, sem vazar contexto de
    // conversas antigas ou do outro escopo (geral vs gestão financeira).
    const { data: historico } = await supabase
      .from('nexus_ai_mensagens')
      .select('papel, conteudo')
      .eq('user_id', user.id)
      .eq('sessao_id', sessaoId)
      .order('created_at', { ascending: false })
      .limit(MAX_MENSAGENS_HISTORICO)
    const historicoOrdenado = (historico ?? []).reverse()

    // Índice de módulos só faz sentido no escopo geral (educacional) — o
    // assistente da Gestão Financeira não precisa saber dos módulos.
    let indiceTexto = ''
    if (escopo === 'geral') {
      try {
        const resp = await fetch(URL_INDICE_MODULOS)
        if (resp.ok) {
          const indice = await resp.json()
          indiceTexto = '\n\nÍndice de módulos disponíveis no app:\n' +
            indice.modulos.map((m: { titulo: string; trilhaId: string }) => `- ${m.titulo} (trilha: ${m.trilhaId})`).join('\n')
        }
      } catch {
        // segue sem índice
      }
    }

    const contextoModulo = moduloContexto
      ? `\n\nO usuário está atualmente na tela do módulo "${moduloContexto}" — priorize relacionar sua resposta a esse módulo quando fizer sentido.`
      : ''

    const systemInstruction = SYSTEM_PROMPTS[escopo] + indiceTexto + contextoModulo

    const contents = [
      ...historicoOrdenado.map((m: { papel: string; conteudo: string }) => ({
        role: m.papel,
        parts: [{ text: m.conteudo }],
      })),
      { role: 'user', parts: [{ text: mensagem }] },
    ]

    const respostaGemini = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
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
    // a resposta pro usuário se a escrita falhar por algum motivo.
    await supabase.from('nexus_ai_mensagens').insert([
      { user_id: user.id, sessao_id: sessaoId, escopo, papel: 'user', conteudo: mensagem, modulo_contexto: moduloContexto ?? null },
      { user_id: user.id, sessao_id: sessaoId, escopo, papel: 'model', conteudo: textoResposta, modulo_contexto: moduloContexto ?? null },
    ])

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
