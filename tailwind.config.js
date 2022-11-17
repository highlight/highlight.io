/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/index.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/common/Navbar/*.{js,ts,jsx,tsx}",
    "./components/common/Navbar/Navbar.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
