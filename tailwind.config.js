/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,less}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4a90e2',
          DEFAULT: '#357abd',
          dark: '#2c6aa0'
        },
        secondary: {
          light: '#718096',
          DEFAULT: '#4a5568',
          dark: '#2d3748'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      },
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'archivo-black': ['"Archivo Black"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}