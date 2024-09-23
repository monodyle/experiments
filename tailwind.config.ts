import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      keyframes: {
        loading: {
          from: { 'background-position': '0%' },
          to: { 'background-position': '100%' },
        },
      },
      animation: {
        loading: 'loading var(--duration,10s) infinite linear',
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config
