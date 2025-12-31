import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#90EE90',
          DEFAULT: '#4CAF50',
          dark: '#2E7D32',
        },
        accent: {
          light: '#E8F5E9',
          DEFAULT: '#C8E6C9',
        },
      },
    },
  },
  plugins: [],
}
export default config


