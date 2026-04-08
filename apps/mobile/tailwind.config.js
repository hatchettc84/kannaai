/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        kanna: {
          green: '#4A6741',
          'green-light': '#5B8C51',
          bg: '#FFFFFF',
          cream: '#F8F7F4',
          surface: '#F2F2F0',
          'surface-green': '#D4E8CD',
          'surface-green-dark': '#A8C99B',
          text: '#1A1A1A',
          'text-secondary': '#8A8A8A',
          terracotta: '#C27B5A',
          gold: '#D4A843',
          coral: '#D4534B',
          sativa: '#5B8C51',
          indica: '#7B5EA7',
          hybrid: '#D4A843',
          error: '#D4534B',
        },
      },
    },
  },
  plugins: [],
};
