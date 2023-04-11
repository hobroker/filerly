const colors = require("tailwindcss/colors");
const { omitBy } = require("ramda-adjunct");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...omitBy(
        (_, key) =>
          [
            "lightBlue",
            "warmGray",
            "trueGray",
            "coolGray",
            "blueGray",
          ].includes(key),
        colors
      ),
      base: colors.gray,
      primary: colors.blue,
      danger: colors.red,
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

module.exports = config;
