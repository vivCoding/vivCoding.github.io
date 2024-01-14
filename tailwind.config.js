/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

// TODO maybe move animations into separate css file

module.exports = {
  content: ["./**/*.{html,liquid,js}"],
  // safelist some classes, cuz they only get used in js created elems(?)
  safelist: ["animate-rise-word", "animate-wave", "animate-bop", "animate-swoosh"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["RobotoMono", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-in-up": {
          "0%": { opacity: 0, translate: "0 50%" },
          "100%": { opacity: 1, transform: "0 0%" },
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
          "0%": { transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)", rotate: "0deg" },
          "50%": { transform: "translate3d(0, 0, 0) scale3d(1.4, 1, 1)" },
          "100%": { transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)", rotate: "360deg" },
        },
        rise: {
          "0%": { opacity: 0, translate: "0 50%" },
          "50%": { opacity: 1 },
          "100%": { opacity: 1, translate: "0 0%" },
        },
        wave: {
          "0%": {
            opacity: 1,
            rotate: "0deg",
          },
          "25%": {
            rotate: "10deg",
          },
          "50%": {
            rotate: "0deg",
          },
          "75%": {
            rotate: "10deg",
          },
          "100%": {
            opacity: 1,
            rotate: "0deg",
          },
        },
        bop: {
          "0%": {
            opacity: 1,
            transformOrigin: "15% bottom",
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
          "25%": {
            transformOrigin: "15% bottom",
            transform: "rotate3d(0, 0, 1, -10deg)",
          },
          "50%": {
            transformOrigin: "15% bottom",
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
          "51%": {
            transformOrigin: "85% bottom",
          },
          "75%": {
            transformOrigin: "85% bottom",
            transform: "rotate3d(0, 0, 1, 10deg)",
          },
          "100%": {
            opacity: 1,
            transformOrigin: "85% bottom",
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
        },
        "swoosh-in": {
          "0%": {
            transform: "skew(10deg) translate3d(-100%, 0, 0)",
            opacity: 0,
            // clipPath: "inset(0 0 -10% 0)",
          },
          "50%": {
            opacity: 0.25,
            transform: "skew(10deg) translate3d(-50%, 0, 0)",
          },

          "100%": {
            translate: "0 0",
            transform: "skew(0deg) translate3d(0, 0, 0)",
            opacity: 1,
            // clipPath: "inset(0 0 -10% 0)",
          },
        },
        "swoosh-out": {
          "0%": {
            transform: "skew(0deg) translate3d(0, 0, 0)",
            opacity: 1,
            // clipPath: "inset(0 0 -10% 0)",
          },
          "50%": {
            transform: "skew(10deg) translate3d(50%, 0, 0)",
            opacity: 0,
          },
          "100%": {
            transform: "skew(10deg) translate3d(100%, 0, 0)",
            opacity: 0,
            // clipPath: "inset(0 1ex -10% 0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s linear forwards",
        "fade-in-up": "fade-in-up 1s ease forwards",
        "fade-in-down": "fade-in-down 1s ease forwards",
        "fade-in-left": "fade-in-left 1s ease forwards",
        "fade-in-right": "fade-in-right 1s ease forwards",
        "spin-slow": "spin-slow 15s linear infinite",
        "rise-word": "rise 300ms cubic-bezier(0.86, 0, 0.07, 1) 1 forwards",
        wave: "wave 1000ms linear forwards",
        bop: "bop 1s ease-in-out forwards",
        swoosh: "swoosh-out 100ms ease-in 0ms forwards, swoosh-in 200ms ease-in 100ms forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "rgb(147 197 253 / var(--tw-text-opacity))",
              fontWeight: 600,
              textDecorationLine: "none",
              opacity: 1,
              borderColor: "transparent",
              borderStyle: "solid",
              borderBottomWidth: "2px",
              transitionProperty: "border-color, opacity",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "200ms",
              "&:hover": {
                borderColor: "rgb(147 197 253 / var(--tw-text-opacity))",
                opacity: 0.6,
              },
            },
            blockquote: {
              "p::before": {
                content: "none",
              },
              "p::after": {
                content: "none",
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
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
