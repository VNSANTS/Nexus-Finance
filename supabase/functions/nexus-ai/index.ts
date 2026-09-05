// Edge Function: nexus-ai
//
// Ponte entre o app e a API do Gemini. Existe especificamente para NUNCA
// expor a chave da API do Gemini no bundle do frontend — se ela fosse
// colocada direto no React, qualquer pessoa abrindo o DevTools do
// navegador conseguiria copiá-la e usar a cota de outra pessoa. Aqui ela
// vive só como variável de ambiente da function, nunca sai do servidor.
//
// Fluxo: app manda { mensagem, moduloContexto? } → function confirma que
// quem chamou tem sessão válida → busca as últimas mensagens do
// histórico do usuário (para dar memória de curto prazo à conversa) →
// monta o prompt (system prompt fixo + índice de módulos + contexto do
// módulo atual, se houver + histórico + mensagem nova) → chama o Gemini →
// salva a pergunta e a resposta no histórico → devolve a resposta.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_MODEL = 'gemini-2.0-flash'
const URL_INDICE_MODULOS = 'https://vnsants.github.io/Nexus-Finance/nexus-ai-indice-modulos.json'
const MAX_MENSAGENS_HISTORICO = 20 // últimas 20 (10 trocas) — memória curta o suficiente sem inflar o prompt a cada request

const SYSTEM_PROMPT = `Você é o Nexus AI, o assistente do Nexus Finance — um app brasileiro de educação financeira.

Seu papel:
- Tirar dúvidas gerais sobre finanças pessoais e investimentos, em português do Brasil, de forma clara e didática.
- Quando o usuário perguntar sobre um tema que existe como módulo no app (veja o índice abaixo), mencione o nome do módulo e sugira que ele acesse para aprofundar, além de já dar uma resposta útil na hora.
- Se a pergunta não tiver relação com finanças/investimentos/o app, responda educadamente que seu foco é esse tema.

Regras importantes:
- Nunca dê recomendação de investimento específica e personalizada (tipo "compre a ação X" ou "invista Y% no seu caso") — você não conhece a situação financeira completa da pessoa. Eduque sobre conceitos e processos de decisão, não substitua um profissional.
- Seja direto e didático, sem enrolação. Use exemplos práticos brasileiros (Selic, Tesouro Direto, CDB, FGTS etc.) quando fizer sentido.
- Respostas em geral curtas (2-4 parágrafos), a não ser que o usuário peça mais detalhe.`

type CorpoRequisicao = {
  mensagem: string
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

    const { mensagem, moduloContexto }: CorpoRequisicao = await req.json()
    if (!mensagem || !mensagem.trim()) return respostaErro('Mensagem vazia.', 400)

    // Histórico recente da conversa (memória de curto prazo).
    const { data: historico } = await supabase
      .from('nexus_ai_mensagens')
      .select('papel, conteudo')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(MAX_MENSAGENS_HISTORICO)
    const historicoOrdenado = (historico ?? []).reverse()

    // Índice de módulos (título + trilha de cada um) — deixa a IA saber o
    // que existe no app sem precisar mandar o conteúdo completo de todos
    // os ~94 módulos em todo request (custaria caro e estouraria contexto
    // rápido). Se essa busca falhar (ex: site fora do ar), segue sem o
    // índice em vez de travar a conversa inteira.
    let indiceTexto = ''
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

    const contextoModulo = moduloContexto
      ? `\n\nO usuário está atualmente na tela do módulo "${moduloContexto}" — priorize relacionar sua resposta a esse módulo quando fizer sentido.`
      : ''

    const systemInstruction = SYSTEM_PROMPT + indiceTexto + contextoModulo

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
      { user_id: user.id, papel: 'user', conteudo: mensagem, modulo_contexto: moduloContexto ?? null },
      { user_id: user.id, papel: 'model', conteudo: textoResposta, modulo_contexto: moduloContexto ?? null },
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
