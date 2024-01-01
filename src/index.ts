import Alpine from "alpinejs"
import { animateAbout } from "./about"
import { animateContact } from "./contact"
import { animateIntro } from "./intro"
import { animateProject, initProjects } from "./projects"
import { startTheme } from "./settings"
import { useScrollPosition } from "./utils/hooks"

const navbar = document.getElementById("navbar")
const navbarLinks = [...document.getElementsByClassName("navbarLink")] as HTMLElement[]
const NAVBAR_ANIMATION = "animate-fade-in-down"

// alpine:init triggers before body.onload
document.addEventListener("alpine:init", () => {
  initProjects()
})

// after adding alpine event listener, start alpine
window.Alpine = Alpine
Alpine.start()

document.body.onload = () => {
  console.log("😎")
  updateNavbarOnScroll()
  animateIntro()
  startTheme()
  animateAbout()
  animateProject()
  animateContact()
}

function updateNavbarOnScroll() {
  // once user has scrolled down enough, make navbar background opaque
  if (!navbar) throw "no navbar"
  useScrollPosition(({ yPercentage }) => {
    // TODO adjust for smaller screens
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
