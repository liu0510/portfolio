import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        ink: {
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
        },
        zinc: {
          200: 'rgb(var(--color-zinc-200) / <alpha-value>)',
          300: 'rgb(var(--color-zinc-300) / <alpha-value>)',
          400: 'rgb(var(--color-zinc-400) / <alpha-value>)',
          500: 'rgb(var(--color-zinc-500) / <alpha-value>)',
          600: 'rgb(var(--color-zinc-600) / <alpha-value>)',
          700: 'rgb(var(--color-zinc-700) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          soft: 'rgb(var(--color-accent) / 0.12)',
          glow: 'rgb(var(--color-accent) / 0.35)',
        },
      },
      fontFamily: {
        display: [
          'Inter',
          'HarmonyOS Sans SC',
          'PingFang SC',
          'Microsoft YaHei',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
