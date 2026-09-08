import type { CapacitorConfig } from '@capacitor/cli'

// server.url aponta para o site já publicado no GitHub Pages, em vez de
// empacotar os arquivos de dist/ dentro do APK. Isso é intencional aqui:
//
//   - O app usa Supabase Auth com OAuth (Google/GitHub), que depende de
//     redirect URLs configuradas para o domínio real
//     (vnsants.github.io) — um app carregando arquivos locais teria
//     origem diferente e quebraria esses fluxos de login sem
//     reconfiguração adicional.
//   - O Service Worker do PWA (vite-plugin-pwa) já cuida de cache e
//     funcionamento offline no mesmo domínio.
//   - Atualizações do app ficam automáticas: todo `git push` que atualiza
//     o GitHub Pages atualiza o app instalado também, sem precisar gerar
//     e reinstalar um novo APK a cada mudança pequena.
//
// Trade-off: o app exige internet na primeira abertura (para carregar o
// site); depois disso, o Service Worker permite uso offline como em
// qualquer PWA.
const config: CapacitorConfig = {
  appId: 'com.nexusfinance.app',
  appName: 'Nexus Finance',
  webDir: 'dist',
  server: {
    url: 'https://vnsants.github.io/Nexus-Finance/',
    androidScheme: 'https',
  },
}

export default config
