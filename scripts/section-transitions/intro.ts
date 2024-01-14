import { useYPercentageOnScreen } from "@/utils/hooks"

const introSection = document.getElementById("intro")
const hero = document.getElementById("hero")
const bgOverlay = document.getElementById("bgOverlay")

const PERCENTAGE_TRIGGER = 0.1

export function initTransition() {
  if (!hero || !bgOverlay) throw "bruh no hero"
  useYPercentageOnScreen(introSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      hero.style.opacity = `${(0.34 - percentage) / (0.34 - PERCENTAGE_TRIGGER)}`
    } else {
      hero.style.opacity = "1"
    }
    const opacity = 1 - (0.3 - percentage) / 0.3
    bgOverlay.style.opacity = `${opacity}`
  })
}
