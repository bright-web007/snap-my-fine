// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          keyframes: {
            'slide-vertical': {
              '0%': { transform: 'translateY(0)' },
              '100%': { transform: 'translateY(-100%)' },
            },
          },
          fontFamily: {
            inter: ['var(--font-inter)', 'sans-serif'],
            Archivo: ['Archivo', 'sans-serif'],
          },
          animation: {
            'slide-vertical': 'slide-vertical 15s linear infinite',
          },
        },
      },
    plugins: [],
  }
  