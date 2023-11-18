/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./**/*.{html,js}"],
  // TODO remove in prod
  safelist: [
    {
      pattern: /.*/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["RobotoMono", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
