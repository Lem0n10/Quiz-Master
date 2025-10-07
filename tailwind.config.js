/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi-Variable', 'Satoshi-Regular', 'sans-serif'],
        'satoshi-light': ['Satoshi-Light'],
        'satoshi-medium': ['Satoshi-Medium'],
        'satoshi-bold': ['Satoshi-Bold'],
        
      }
      
    },
  },
  plugins: [],
}
