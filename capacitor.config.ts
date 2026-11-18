import type { CapacitorConfig } from '@capacitor/cli'

// Beta Android: arquivos web empacotados no APK. Nunca apontar server.url
// para um site público, pois isso transformaria o APK em um navegador remoto.
// Autenticação e dados ainda utilizam Supabase pela rede.
const config: CapacitorConfig = {
  appId: 'com.nexusfinance.app',
  appName: 'Nexus Finance',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
