/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        reading: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        sepia: {
          50: '#fdfbf7',
          100: '#f7f2e7',
          200: '#ede2ce',
          300: '#dfcca9',
          400: '#ceb080',
          500: '#ba945c',
          600: '#9d7647',
          700: '#7c5a38',
          800: '#5c422c',
          900: '#432f22',
          950: '#271911',
        }
      }
    },
  },
  plugins: [],
}
