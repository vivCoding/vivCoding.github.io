import { animateAbout } from "./about"
import { animateHero } from "./hero"
import { animateProject } from "./projects"
import { startTheme } from "./settings"
import { useScrollPosition } from "./utils/hooks"

const navbar = document.getElementById("navbar")
const navbarLinks = [...document.getElementsByClassName("navbarLink")] as HTMLElement[]
const NAVBAR_ANIMATION = "animate-fade-in-down"

document.body.onload = () => {
  console.log("😎")
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
