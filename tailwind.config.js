/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#fdf8f6',
          100: '#f2e6e0',
          200: '#e0cfc5',
          300: '#c9ad9f',
          400: '#b08968',
          500: '#9c6644',  // main brown
          600: '#8b5a3c',
          700: '#6f4518',
          800: '#5a3a2d',
          900: '#3e2723',
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
