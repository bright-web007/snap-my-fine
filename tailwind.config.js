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
            'sans': ['Sora', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
            'sora': ['Sora', 'sans-serif'],
            'inter': ['Inter', 'sans-serif'],
          },
          animation: {
            'slide-vertical': 'slide-vertical 15s linear infinite',
          },
        },
      },
    plugins: [],
  }
  