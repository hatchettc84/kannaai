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
          green: '#2ecc71',
          'green-dark': '#27ae60',
          bg: '#0a0a1a',
          surface: '#1a1a2e',
          'surface-light': '#252540',
          text: '#ffffff',
          'text-secondary': '#8a8aa3',
          accent: '#9b59b6',
          sativa: '#2ecc71',
          indica: '#9b59b6',
          hybrid: '#f39c12',
          warning: '#f39c12',
          error: '#e74c3c',
        },
      },
    },
  },
  plugins: [],
};
