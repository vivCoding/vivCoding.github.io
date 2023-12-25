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
          "0%": { opacity: 0, translate: "0 -100%" },
          "100%": { opacity: 1, transform: "0 0%" },
        },
        "fade-in-left": {
          "0%": { opacity: 0, translate: "100% 0" },
          "100%": { opacity: 1, translate: "0% 0" },
        },
        "fade-in-right": {
          "0%": { opacity: 0, translate: "-100% 0" },
          "100%": { opacity: 1, translate: "0% 0" },
        },
        "spin-slow": {
          "0%": { transform: "translate3d(0, 0, 0) scale3d(1, 1)", rotate: "0deg" },
          "50%": { transform: "translate3d(0, 0, 0) scale3d(1.4, 1)" },
          "100%": { transform: "translate3d(0, 0, 0) scale3d(1, 1)", rotate: "360deg" },
        },
        rise: {
          "0%": { opacity: 1, transform: "translateY(50%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        wave: {
          "25%": {
            opacity: 1,
            transform: "rotate3d(0, 0, 1, 5deg)",
          },
          "50%": {
            opacity: 1,
            transform: "rotate3d(0, 0, 1, -5deg)",
          },
          "75%": {
            opacity: 1,
            transform: "rotate3d(0, 0, 1, 5deg)",
          },
          "100%": {
            opacity: 1,
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s linear forwards",
        "fade-in-down": "fade-in-down 1s ease forwards",
        "fade-in-left": "fade-in-left 1s ease forwards",
        "fade-in-right": "fade-in-right 1s ease forwards",
        "spin-slow": "spin-slow 15s linear infinite",
        "rise-word": "rise 300ms cubic-bezier(0.86, 0, 0.07, 1) 1 forwards",
        wave: "wave 1000ms linear forwards",
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
