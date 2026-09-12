// Edge Function: whatsapp-webhook
//
// Recebe mensagens do WhatsApp (Meta Cloud API) e:
//   1. Se o número não está vinculado a nenhuma conta: espera um código de
//      6 dígitos (gerado no app, Perfil → Conectar WhatsApp) pra vincular.
//   2. Se já está vinculado: interpreta a mensagem como um lançamento
//      financeiro (via Gemini) e adiciona direto na Gestão Financeira da
//      pessoa, sem precisar abrir o app.
//
// GRATUITO: mensagens que o USUÁRIO manda pro bot primeiro são "conversas
// de serviço" no WhatsApp Cloud API — sempre grátis, sem limite mensal
// (diferente de mensagens de marketing/notificação que a empresa manda por
// iniciativa própria, essas sim cobradas). Pra uso pessoal (só você
// conversando com seu próprio bot), a Meta dá um número de teste grátis
// pra sempre — sem precisar de aprovação de empresa nem BSP pago.
//
// Usa service_role (não o token do usuário) porque a mensagem chega sem
// nenhuma sessão logada — é a Meta quem chama esse endpoint, então quem
// autentica é o vínculo telefone → conta, não um JWT de usuário.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type' }
const GEMINI_MODEL = 'gemini-3.1-flash-lite' // rápido — só extrai 3-4 campos de uma frase curta, não precisa de modelo caro

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS })

  const url = new URL(req.url)

  // -------------------------------------------------------------------
  // Verificação do webhook (Meta chama isso 1x, ao configurar a URL no
  // painel de Developers) — só confirma que o dono do endpoint concorda
  // em receber mensagens desse app.
  // -------------------------------------------------------------------
  if (req.method === 'GET') {
    const modo = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const desafio = url.searchParams.get('hub.challenge')
    if (modo === 'subscribe' && token === Deno.env.get('WHATSAPP_VERIFY_TOKEN')) {
      return new Response(desafio, { status: 200 })
    }
    return new Response('Token inválido.', { status: 403 })
  }

  try {
    const corpoTexto = await req.text()

    // Confirma que a mensagem veio de verdade da Meta (não de alguém que
    // descobriu a URL do webhook e está mandando POSTs falsos fingindo ser
    // um número já vinculado) — HMAC SHA-256 do corpo com o App Secret.
    const assinaturaValida = await verificarAssinatura(req.headers.get('x-hub-signature-256'), corpoTexto)
    if (!assinaturaValida) return new Response('Assinatura inválida.', { status: 401 })

    const payload = JSON.parse(corpoTexto)
    const mensagem = payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    if (!mensagem || mensagem.type !== 'text') {
      // Status/leitura/outros tipos de evento que a Meta também manda pro
      // mesmo webhook — não é uma mensagem de texto, não há o que fazer.
      return respostaOk()
    }

    const telefone = String(mensagem.from) // vem sem "+", ex: "5511999999999"
    const texto = String(mensagem.text?.body ?? '').trim()

    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { data: perfilVinculado } = await supabaseAdmin
      .from('profiles')
      .select('id, nome')
      .eq('whatsapp_telefone', telefone)
      .maybeSingle()

    if (perfilVinculado) {
      const resultado = await processarLancamento(supabaseAdmin, perfilVinculado.id, texto)
      await enviarMensagemWhatsApp(telefone, resultado)
      return respostaOk()
    }

    // Não vinculado ainda — só aceita um código de 6 dígitos.
    const codigo = texto.replace(/\D/g, '')
    if (codigo.length !== 6) {
      await enviarMensagemWhatsApp(
        telefone,
        'Oi! Ainda não reconheço esse número. Pra vincular sua conta, abra o Nexus Finance → Perfil → "Conectar WhatsApp", gere o código e manda ele aqui.'
      )
      return respostaOk()
    }

    const { data: perfilPendente } = await supabaseAdmin
      .from('profiles')
      .select('id, nome, whatsapp_codigo_expira_em')
      .eq('whatsapp_codigo_vinculo', codigo)
      .maybeSingle()

    if (!perfilPendente || !perfilPendente.whatsapp_codigo_expira_em || new Date(perfilPendente.whatsapp_codigo_expira_em) < new Date()) {
      await enviarMensagemWhatsApp(telefone, 'Esse código não é válido ou expirou. Gera um novo no app (Perfil → Conectar WhatsApp) e manda de novo.')
      return respostaOk()
    }

    await supabaseAdmin
      .from('profiles')
      .update({ whatsapp_telefone: telefone, whatsapp_codigo_vinculo: null, whatsapp_codigo_expira_em: null })
      .eq('id', perfilPendente.id)

    await enviarMensagemWhatsApp(
      telefone,
      `Prontinho, ${perfilPendente.nome ?? ''}! Seu WhatsApp está vinculado ao Nexus Finance. A partir de agora, é só me contar o que você gastou ou recebeu (ex: "gastei 35 no mercado") que eu registro pra você.`
    )
    return respostaOk()
  } catch (erro) {
    console.error('Erro inesperado no whatsapp-webhook:', erro)
    // Sempre 200 pra Meta, mesmo em erro interno — um erro aqui não deve
    // fazer a Meta ficar retentando a mesma mensagem em loop.
    return respostaOk()
  }
})

async function verificarAssinatura(assinaturaHeader: string | null, corpo: string): Promise<boolean> {
  const appSecret = Deno.env.get('WHATSAPP_APP_SECRET')
  if (!appSecret || !assinaturaHeader) return false

  const chave = await crypto.subtle.importKey('raw', new TextEncoder().encode(appSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const assinaturaCalculada = await crypto.subtle.sign('HMAC', chave, new TextEncoder().encode(corpo))
  const hex = [...new Uint8Array(assinaturaCalculada)].map((b) => b.toString(16).padStart(2, '0')).join('')

  return assinaturaHeader === `sha256=${hex}`
}

// Interpreta a mensagem como um lançamento financeiro (Gemini) e adiciona
// direto no dados_jsonb da pessoa. Devolve o texto de confirmação/erro que
// vai ser mandado de volta pro WhatsApp.
async function processarLancamento(supabaseAdmin: ReturnType<typeof createClient>, userId: string, texto: string): Promise<string> {
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
  if (!geminiApiKey) return 'O assistente ainda não está configurado direito — avisa o administrador do app.'

  const { data: linha } = await supabaseAdmin.from('gestao_financeira_estado').select('dados_jsonb').eq('user_id', userId).maybeSingle()
  const estado = (linha?.dados_jsonb as Record<string, unknown>) ?? null
  if (!estado) {
    return 'Ainda não encontrei sua Gestão Financeira — abre o app pelo menos uma vez pra ela sincronizar, aí eu já consigo registrar por aqui.'
  }

  const categorias = (estado.categorias as { id: string; nome: string; tipo: string }[]) ?? []
  const contas = (estado.contas as { id: string; nome: string; principal: boolean; arquivada: boolean }[]) ?? []
  const nomesCategoria = categorias.map((c) => c.nome).join(', ') || 'nenhuma cadastrada ainda'

  const prompt =
    `Interprete esta mensagem como UM lançamento financeiro: "${texto}"\n` +
    `Categorias que já existem (tente encaixar em uma se fizer sentido, senão null): ${nomesCategoria}\n` +
    `Responda SOMENTE com um JSON válido, sem markdown, no formato exato: ` +
    `{"valor": 45.00, "tipo": "despesa", "descricao": "mercado", "categoria": "Alimentação" ou null, "entendi": true}\n` +
    `"tipo" é "despesa" ou "receita". Se a mensagem não parecer um lançamento financeiro de jeito nenhum ` +
    `(ex: só um "oi", uma pergunta, algo incompreensível), responda {"entendi": false} e mais nada.`

  const respGemini = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 300 },
    }),
  })

  if (!respGemini.ok) return 'Deu um erro aqui tentando entender sua mensagem. Tenta de novo em instantes.'

  const dadosGemini = await respGemini.json()
  const textoResposta: string | undefined = dadosGemini?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!textoResposta) return 'Não consegui entender essa mensagem como um lançamento. Tenta descrever de outro jeito (ex: "gastei 20 reais no uber").'

  let interpretado: { valor?: number; tipo?: 'receita' | 'despesa'; descricao?: string; categoria?: string | null; entendi?: boolean }
  try {
    interpretado = JSON.parse(textoResposta.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, ''))
  } catch {
    return 'Não consegui entender essa mensagem como um lançamento. Tenta descrever de outro jeito (ex: "gastei 20 reais no uber").'
  }

  if (!interpretado.entendi || typeof interpretado.valor !== 'number' || !interpretado.tipo) {
    return 'Não entendi isso como um gasto ou recebimento. Manda algo tipo "gastei 35 no mercado" ou "recebi 100 de reembolso".'
  }

  const categoriaEncontrada = categorias.find((c) => c.nome.toLowerCase() === (interpretado.categoria ?? '').toLowerCase())
  const contaPrincipal = contas.find((c) => c.principal && !c.arquivada) ?? contas.find((c) => !c.arquivada)

  const novaTransacao = {
    id: `tx-whatsapp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tipo: interpretado.tipo,
    valor: Math.abs(interpretado.valor),
    data: new Date().toISOString().slice(0, 10),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }),
    descricao: interpretado.descricao || 'Lançamento via WhatsApp',
    categoriaId: categoriaEncontrada?.id ?? null,
    contaId: contaPrincipal?.id ?? null,
    cartaoId: null,
    formaPagamento: 'outro',
    pago: true,
    criadaEm: new Date().toISOString(),
  }

  const transacoesAtualizadas = [novaTransacao, ...((estado.transacoes as unknown[]) ?? [])]
  const { error: erroSalvar } = await supabaseAdmin
    .from('gestao_financeira_estado')
    .update({ dados_jsonb: { ...estado, transacoes: transacoesAtualizadas } })
    .eq('user_id', userId)

  if (erroSalvar) {
    console.error('Erro ao salvar lançamento via WhatsApp:', erroSalvar)
    return 'Entendi o lançamento, mas deu erro salvando. Tenta de novo em instantes.'
  }

  const emoji = interpretado.tipo === 'despesa' ? '💸' : '💰'
  return `${emoji} Registrado: ${interpretado.tipo === 'despesa' ? 'gasto' : 'entrada'} de R$ ${novaTransacao.valor.toFixed(2)} — ${novaTransacao.descricao}${categoriaEncontrada ? ` (${categoriaEncontrada.nome})` : ''}.`
}

async function enviarMensagemWhatsApp(para: string, texto: string) {
  const token = Deno.env.get('WHATSAPP_TOKEN')
  const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID')
  if (!token || !phoneNumberId) return

  await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: para, type: 'text', text: { body: texto } }),
  }).catch((e) => console.error('Erro ao enviar mensagem WhatsApp:', e))
}

function respostaOk() {
  return new Response(JSON.stringify({ ok: true }), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 200 })
}
