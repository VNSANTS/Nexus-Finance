import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Nexus-Finance/',
  // Sem este alias o `@/...` só funcionava no editor (via tsconfig paths):
  // `vite dev` e `vite build` não resolviam nenhum import e o projeto não subia.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@banco-de-dados': fileURLToPath(new URL('./banco-de-dados', import.meta.url)),
    },
  },
  build: {
    // Separa as libs pesadas do código do app. Elas quase nunca mudam, então
    // ficam em cache do usuário entre um deploy e outro.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      workbox: {
        // O conteúdo dos módulos é dividido em dezenas de chunks pequenos.
        // Precachear todos deixaria a instalação do PWA lenta demais, então
        // eles entram no cache conforme o usuário abre cada módulo.
        globPatterns: ['**/*.{css,html,svg,png,ico,webmanifest}', 'assets/index-*.js', 'assets/react-*.js'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'script',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'nexus-chunks' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'nexus-fonts',
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      manifest: {
        id: '/Nexus-Finance/',
        scope: '/Nexus-Finance/',
        name: 'Nexus Finance',
        short_name: 'Nexus',
        description: 'Do seu primeiro real ao seu primeiro milhão — aprenda, acompanhe e invista.',
        theme_color: '#070B16',
        background_color: '#070B16',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/Nexus-Finance/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
