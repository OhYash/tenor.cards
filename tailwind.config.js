const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: [
      './index.html',
      './cards/*.html',
      './assets/javascript/card_*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		  colors: {
        'light-blue': colors.sky,
        cyan: colors.cyan,
      },
      boxShadow: {
        'neumorphic': '11px 11px 22px #bdbdbd, -11px -11px 22px #ffffff'
      },
      minHeight: {
        'maxc': 'max-content',
        '1/2': '50%'
      },
      spacing: {
         '512': '512px',
         '1024': '1024px',
         '100': '25rem',
         '104': '26rem'
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
