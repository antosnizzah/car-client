/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'confetti': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100px)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'confetti': 'confetti 1s ease-out infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}
