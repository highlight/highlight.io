/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'highlight-yellow': '#EBFF5E',
        'copy-on-dark': '#DFDFDF',
      },
    },
  },
  plugins: [],
};
