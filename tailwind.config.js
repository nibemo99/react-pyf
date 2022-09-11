/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggleh: {
          '0%, 100%': {
            transform: 'rotate(-3deg)',
          },
          '50%': {
            transform: 'rotate(3deg)',
          }

        },
        colorChange: {
          '0%, 100%': { color: 'red', transform: 'rotate(-3deg)', },
          '20%': { color: 'blue' },
          '40%': { color: 'green', transform: 'rotate(3deg)', },
          '60%': { color: 'gray' },
          '80%': { color: 'orange' },

        },
        bounceToRight: {
          '0%, 100%': {
            'transform': 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            'transform': 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        wiggle: 'wiggleh 1s ease-in-out infinite',
        colorChange: 'colorChange 1s ease-in-out infinite',
        bounceToRight: 'bounceToRight 1s infinite'
      }
    },
  },
  plugins: [],
}