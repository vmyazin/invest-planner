/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        gap: {
          '4': '1rem',
        }
      },
    },
  },
  plugins: [],
}

