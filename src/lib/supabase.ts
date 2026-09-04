import { createClient } from '@supabase/supabase-js'

// Cliente único do Supabase — todo o app importa daqui, nunca cria outro
// createClient() em outro arquivo.
//
// As variáveis vêm de .env.local (não versionado, ver .gitignore) em dev, e
// precisam ser configuradas como "repository secrets" / variáveis de build
// no GitHub Actions para o deploy no GitHub Pages funcionar (ver
// .github/workflows — a chave é PUBLISHABLE, segura de ficar no bundle
// público; a proteção real de dados é a Row Level Security no banco).

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !publishableKey) {
  // Erro alto e claro em dev em vez de falha silenciosa esquisita depois.
  throw new Error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY em .env.local (veja .env.example).'
  )
}

export const supabase = createClient(url, publishableKey)
