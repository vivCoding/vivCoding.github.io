import { animateAbout } from "./about.js"
import { animateHero } from "./hero.js"
import { startTheme } from "./settings.js"
import { useScrollPosition } from "./utils/hooks.js"

const navBar = document.getElementById("navbar")

document.body.onload = () => {
  console.log("yo")
  animateHero()
  startTheme()
  animateAbout()

  if (!navBar) throw "no navbar"
  useScrollPosition(({ yPercentage }) => {
    console.log(yPercentage)
    if (yPercentage > 0.25) {
      navBar.classList.remove("bg-opacity-0")
      navBar.classList.add("bg-opacity-100")
    } else {
      navBar.classList.remove("bg-opacity-100")
      navBar.classList.add("bg-opacity-0")
    }
  })
}
