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

// class="flex translate-y-full scale-75 flex-col items-center rounded-t-full bg-[#0D0F20] bg-opacity-0 p-2 pb-2 pt-4 opacity-0 transition group-hover/overlay:translate-y-0 group-hover/overlay:scale-100 group-hover/overlay:bg-opacity-90 group-hover/overlay:opacity-100"

// const settingsBtn = document.getElementById("settingsBtn")
// const themeMenu = document.getElementById("themeMenu")
// if (!settingsBtn) throw "bad"
// settingsBtn.addEventListener("click", () => {
//   settingsBtn.dispatchEvent()
//   // if (!themeMenu) throw "no themeMenu"
//   // console.log("yooo")
//   // themeMenu.setAttribute("active", "")
//   // const isShowing = themeMenu.style.visibility === "visible"
//   // themeMenu.style.visibility = isShowing ? "hidden" : "visible"
// })
