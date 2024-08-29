/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes:{
            wigggle:{
              '0%,100%':{}
            }
      },
      fontFamily: {
        bungee: ["Bungee Tint", "san-serif"],
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
