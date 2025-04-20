import { dark } from '@mui/material/styles/createPalette';
import { set } from 'date-fns';



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
        stickyBarBg: '#d9f0e2',
        settingsBg: '#fafaf2',
        creamyGreen: '#4d7c6f'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],  
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

