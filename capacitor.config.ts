import type { CapacitorConfig } from '@capacitor/cli'

// O app usa a hospedagem pública de produção do Vercel.
// Mantenha este domínio alinhado ao alias de produção confirmado.
// As páginas legais também devem permanecer públicas, sem autenticação.
const config: CapacitorConfig = {
  appId: 'com.nexusfinance.app',
  appName: 'Nexus Finance',
  webDir: 'dist',
  server: {
    url: 'https://nexus-finance-ten-kappa.vercel.app/',
    androidScheme: 'https',
  },
}

export default config
