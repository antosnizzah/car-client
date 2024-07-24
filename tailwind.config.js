/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  darkMode: 'class', // or 'media' or 'class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

