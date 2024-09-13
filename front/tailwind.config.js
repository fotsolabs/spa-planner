import { dark } from '@mui/material/styles/createPalette';


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        darkScreen: '#2c2d29',
        lightMode: '#fff',
        ligtText: '#fff',
        darkText: '#000',
      },
    },
  },
  plugins: [],
}

