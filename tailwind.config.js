/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        color1: "#D7573B",
        color2: "#FA9C0F",
        color3: "#152F37",
        color4: "#35528B",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};