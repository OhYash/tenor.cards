const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: [
      './index.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
      boxShadow: {
        'neumorphic': '11px 11px 22px #bdbdbd, -11px -11px 22px #ffffff'
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
