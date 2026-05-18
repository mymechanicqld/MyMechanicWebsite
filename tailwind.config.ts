import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF8',
        surface: '#FFFFFF',
        soft: '#F5F4EF',
        ink: '#0C0A09',
        muted: '#44403C',
        subtle: '#78716C',
        hairline: '#E7E5E0',
        border: '#D6D3CB',
        accent: {
          DEFAULT: '#1E3A8A',
          hover: '#1E40AF',
          bright: '#2563EB',
          tint: '#E8EEFB',
        },
        gold: '#B68B2F',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        container: '1240px',
        prose: '65ch',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      },
    },
  },
  plugins: [],
}

export default config
