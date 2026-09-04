/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Todas as cores abaixo apontam para CSS variables (definidas em
        // src/styles/globals.css), nunca hex fixo. É o que permite o tema
        // claro/escuro e a "cor principal do app" funcionarem globalmente
        // sem precisar tocar em nenhum componente que já usa essas classes.
        bg: {
          DEFAULT: 'var(--cor-bg)',
          card: 'var(--cor-bg-card)',
        },
        border: {
          DEFAULT: 'var(--cor-border)',
        },
        texto: {
          DEFAULT: 'var(--cor-texto)',
          secundario: 'var(--cor-texto-secundario)',
        },
        accent: {
          // "cyan" é historicamente a cor de destaque principal do app —
          // mantém o nome por compatibilidade com todo componente
          // existente, mas agora segue a cor principal escolhida pelo
          // usuário em Configurações gerais.
          cyan: 'var(--accent-primaria)',
          'cyan-fim': 'var(--accent-primaria-fim)',
          gold: 'var(--accent-gold)',
          green: 'var(--accent-green)',
          pink: 'var(--accent-pink)',
          red: 'var(--accent-red)',
          blue: 'var(--accent-blue)',
          purple: 'var(--accent-purple)',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '20px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 212, 255, 0.25)',
        'glow-gold': '0 0 24px rgba(255, 201, 60, 0.2)',
        card: '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.3)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
