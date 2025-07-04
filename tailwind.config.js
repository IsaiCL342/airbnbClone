/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        rausch: "#FF385C",
        babu: "#00A699",
        arches: "#484848",
        hof: "#767676",
        foggy: "#EBEBEB",
      }
    },
  },
  plugins: [],
}