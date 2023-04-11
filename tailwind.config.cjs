const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.blue,
      danger: colors.red,
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

module.exports = config;
