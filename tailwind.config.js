/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#070B16',
          card: '#0E1526',
        },
        border: {
          DEFAULT: '#1C2740',
        },
        accent: {
          cyan: '#00D4FF',
          gold: '#FFC93C',
          green: '#22C55E',
          pink: '#EC4899',
          red: '#EF4444',
          blue: '#3B82F6',
          purple: '#8B5CF6',
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
