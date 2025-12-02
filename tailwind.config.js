const colors = require('tailwindcss/colors')

module.exports = {
  content:[
    "./index.html",
    "./frontend/src/**/*.{js,jsx,ts,tsx}", // pathing to all components and pages
  ],
  mode: 'jit',
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite', //change the seconds value to adjust speed
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // scroll half the total width
        },
      },
    },
  },
  variants: {},
  plugins: [],
}

