/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["RobotoMono", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              // override 'animation' property using !important
              "animation-delay": `${value} !important`,
            }
          },
        },
        {
          // use transitionDelay values as default values
          values: theme("transitionDelay"),
        }
      )
      matchUtilities(
        {
          "animation-duration": (value) => {
            return {
              // override 'animation' property using !important
              "animation-duration": `${value} !important`,
            }
          },
        },
        {
          // use transitionDelay values as default values
          values: theme("transitionDelay"),
        }
      )
    }),
  ],
}
