/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#13132b',
        'midnight-light': '#1f1f42',
        gold: '#d4af37',
        'gold-soft': '#e8cf7c',
        cream: '#f5f0e6',
        violet: '#6e5ba6',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
