import { startTheme } from "./intro/bg"
import { animateHero } from "./intro/hero"
import { initSectionTransitions } from "./section-transitions"

document.body.onload = () => {
  console.log("😎")
  animateHero()
  startTheme()
  initSectionTransitions()
}
