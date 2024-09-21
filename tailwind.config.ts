import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
    },
  },
  plugins: [],
} satisfies Config
