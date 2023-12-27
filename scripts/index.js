import { animateAbout } from "./about.js"
import { animateHero } from "./hero.js"
import { animateProject } from "./projects.js"
import { startTheme } from "./settings.js"
import { useScrollPosition } from "./utils/hooks.js"

const navbar = document.getElementById("navbar")
/** @type {HTMLElement[]} */
// @ts-ignore
const navbarLinks = [...document.getElementsByClassName("navbarLink")]
const NAVBAR_ANIMATION = "animate-fade-in-down"

document.body.onload = () => {
  console.log("yo")
  updateNavbarOnScroll()
  animateHero()
  startTheme()
  animateAbout()
  animateProject()
}

function updateNavbarOnScroll() {
  // once user has scrolled down enough, make navbar background opaque
  if (!navbar) throw "no navbar"
  useScrollPosition(({ yPercentage }) => {
    if (yPercentage > 0.25) {
      navbar.classList.remove("bg-opacity-0")
      navbar.classList.add("bg-opacity-100")
      // when page loads, don't animate links if already further down page (ex. user reloads in middle of page)
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove(NAVBAR_ANIMATION)
        navbarLink.style.opacity = "1"
      })
    } else {
      navbar.classList.remove("bg-opacity-100")
      navbar.classList.add("bg-opacity-0")
    }
  })
}
