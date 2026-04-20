// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/component/**/*.{js,ts,jsx,tsx}",
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          keyframes: {
            'slide-vertical': {
              '0%': { transform: 'translateY(0)' },
              '100%': { transform: 'translateY(-100%)' },
            },
            'scroll-badges': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          },
          fontFamily: {
            'sans': ['Sora', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
            'sora': ['Sora', 'sans-serif'],
            'inter': ['Inter', 'sans-serif'],
          },
          animation: {
            'slide-vertical': 'slide-vertical 15s linear infinite',
            'scroll-badges': 'scroll-badges 12s linear infinite',
          },
        },
      },
    plugins: [],
  }
  