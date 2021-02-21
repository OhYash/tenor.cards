const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      }
	},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
