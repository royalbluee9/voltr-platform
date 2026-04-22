/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--bg-void)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        overlay: 'var(--bg-overlay)',
        plasma: 'var(--energy-plasma)',
        solar: 'var(--energy-solar)',
        gas: 'var(--energy-gas)',
        carbon: 'var(--energy-carbon)',
        nuclear: 'var(--energy-nuclear)',
        buy: 'var(--trade-buy)',
        sell: 'var(--trade-sell)',
        neutral: 'var(--trade-neutral)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'monospace'],
        mono: ['var(--font-mono)', 'monospace'],
        ui: ['var(--font-ui)', 'sans-serif'],
      },
      boxShadow: {
        'glow-plasma': 'var(--glow-plasma)',
        'glow-buy': 'var(--glow-buy)',
        'glow-sell': 'var(--glow-sell)',
        'glow-solar': 'var(--glow-solar)',
      }
    },
  },
  plugins: [],
}
