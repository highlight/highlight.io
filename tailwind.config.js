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
        'divider-on-dark': '#30294E',
        'dark-background': '#0D0225',
        'copy-on-light': '#645D74',
      },
      fontFamily: {
        sans: 'Poppins',
      },
      screens: {
        desktop: '1340px',
        mobile: '601px',
      },
    },
  },
  plugins: [],
};
