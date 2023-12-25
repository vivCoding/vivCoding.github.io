import { animateAbout } from "./about.js"
import { animateHero } from "./hero.js"
import { startTheme } from "./settings.js"

document.body.onload = () => {
  console.log("yo")
  animateHero()
  startTheme()
  animateAbout()
}
