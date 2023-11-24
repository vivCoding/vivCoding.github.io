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
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-in-down": {
          "0%": { opacity: 0, transform: "translateY(-100%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        "fade-in-left": {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
        "fade-in-right": {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" },
        },
        "spin-slow": {
          "0%": { transform: "translate3d(0, 0, 0) scale3d(1, 1)", rotate: "0deg" },
          "50%": { transform: "translate3d(0, 0, 0) scale3d(1.4, 1)" },
          "100%": { transform: "translate3d(0, 0, 0) scale3d(1, 1)", rotate: "360deg" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s linear forwards",
        "fade-in-down": "fade-in-down 1s ease forwards",
        "fade-in-left": "fade-in-left 1s ease forwards",
        "fade-in-right": "fade-in-right 1s ease forwards",
        "spin-slow": "spin-slow 15s linear infinite",
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
