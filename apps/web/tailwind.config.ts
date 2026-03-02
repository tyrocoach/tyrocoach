import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1D428A',  // Leeds Navy Blue
          lime: '#5B9BD5',   // Sky Blue (accent)
          yellow: '#FFCD00', // Leeds Yellow
          dark: '#0D1B3E',   // Deep Navy
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
