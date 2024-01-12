import { startTheme } from "./intro/bg"
import { animateHero } from "./intro/hero"
import { initSectionTransitions } from "./section-transitions"

const reducedMotion = window.matchMedia(`(prefers-reduced-motion: safe)`).matches === true

document.body.onload = () => {
  console.log("😎")
  if (!reducedMotion) {
    animateHero()
    startTheme()
    initSectionTransitions()
  }
}
