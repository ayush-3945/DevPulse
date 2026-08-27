/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          gold: '#F5A623',
          light: '#FFC15E',
        }
      }
    },
  },
  plugins: [],
}
