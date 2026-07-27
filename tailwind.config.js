/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0bac9',
          400: '#8595ab',
          500: '#657791',
          600: '#516078',
          700: '#424e61',
          800: '#3a4352',
          900: '#22262e',
          950: '#141820',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe0e2',
          200: '#ffc6ca',
          300: '#ff9da5',
          400: '#ff6673',
          500: '#f83b4c',
          600: '#e51c30',
          700: '#c8102e',
          800: '#a11026',
          900: '#851124',
          950: '#49040e',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(20, 24, 32, 0.04), 0 12px 32px -12px rgba(20, 24, 32, 0.18)',
        lift: '0 18px 40px -18px rgba(20, 24, 32, 0.32)',
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(to right, rgba(101,119,145,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(101,119,145,0.10) 1px, transparent 1px)',
        'steel-fade':
          'linear-gradient(135deg, #141820 0%, #22262e 45%, #3a4352 100%)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}