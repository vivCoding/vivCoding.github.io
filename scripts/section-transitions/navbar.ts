import { useYPercentageOnScreen } from "@/utils/hooks"

const navbar = document.getElementById("navbar")
const navbarLinks = [...document.getElementsByClassName("navbarLink")] as HTMLElement[]
const NAVBAR_ANIMATION = "animate-fade-in-down"

const introSection = document.getElementById("intro")
const settingsBtnOverlay = document.getElementById("buttonOverlay")
const settingsBtnOverlayContainer = document.getElementById("buttonOverlayContainer")

const NAVBAR_TRIGGER = 0.4
const SETTINGS_TRIGGER = 0.1
const GROUP_HOVER_CLASS = "group/overlay"

export function initTransition() {
  // once user has scrolled down enough, make navbar background opaque
  if (!navbar) throw "no navbar"
  if (!settingsBtnOverlay || !settingsBtnOverlayContainer) throw "no buttonOverlay"

  useYPercentageOnScreen(introSection, (percentage) => {
    if (percentage > NAVBAR_TRIGGER) {
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
    if (percentage > SETTINGS_TRIGGER) {
      settingsBtnOverlay.classList.remove(GROUP_HOVER_CLASS)
      const opacity = 1 - (percentage - SETTINGS_TRIGGER) / 0.1
      settingsBtnOverlayContainer.style.opacity = `${opacity}`
      if (opacity <= 0) {
        settingsBtnOverlayContainer.style.display = "none"
      }
    } else {
      settingsBtnOverlay.classList.add(GROUP_HOVER_CLASS)
      settingsBtnOverlayContainer.style.opacity = "1"
      settingsBtnOverlayContainer.style.display = "block"
    }
  })
}
