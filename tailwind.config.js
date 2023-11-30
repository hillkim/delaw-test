module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-rtl')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
