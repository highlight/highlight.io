/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/index.tsx",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/Products/*.{js,ts,jsx,tsx}",
    "./components/Products/FeatureBox.tsx",
    "./components/common/Navbar/*.{js,ts,jsx,tsx}",
    "./components/common/Navbar/Navbar.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'highlight-yellow': '#EBFF5E',
        'copy-on-dark': '#DFDFDF',
        'divider-on-dark': '#30294E',
        'dark-background': '#0D0225',
        'copy-on-light': '#645D74',
        'color-selected-light': '#ebff5e',
        'color-selected-dark': '#8dc31a',
        'color-secondary-100': '#b9f2fe',
        'color-secondary-200': '#72e4fc',
        'color-secondary-300': '#23b6e2',
        'color-secondary-400': '#0b75aa',
        'color-primary-100': '#b19cff',
        'color-primary-200': '#6c37f4',
        'color-primary-300': '#5420d1',
        'color-primary-400': '#120532',
        'color-primary-500': '#0d0225',
        'color-copy-on-dark': '#dfdfdf',
        'color-darker-copy-on-dark': '#9D97AA',
        'color-copy-on-light': '#645d74',
        'color-divider-on-dark': '#30294e',
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