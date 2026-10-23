import type { CapacitorConfig } from '@capacitor/cli'

// O app usa a hospedagem pública do Vercel. Antes de gerar um APK/AAB de
// lançamento, confirme que este domínio está implantado e acessível sem login.
// As páginas legais também devem permanecer públicas, sem autenticação.
const config: CapacitorConfig = {
  appId: 'com.nexusfinance.app',
  appName: 'Nexus Finance',
  webDir: 'dist',
  server: {
    url: 'https://nexus-finance-vinigodoaldo-2786.vercel.app/',
    androidScheme: 'https',
  },
}

export default config
