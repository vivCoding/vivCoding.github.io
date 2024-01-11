import { usePercentageSeen } from "@/utils/hooks"

const introSection = document.getElementById("intro")
const hero = document.getElementById("hero")
const bgOverlay = document.getElementById("bgOverlay")

export function initTransition() {
  if (!hero || !bgOverlay) throw "bruh no hero"
  usePercentageSeen(introSection, (percentage) => {
    if (percentage >= 0.55) {
      hero.style.opacity = `${(0.67 - percentage) / 0.12}`
    } else {
      hero.style.opacity = "1"
    }
    bgOverlay.style.opacity = `${1 - (0.65 - percentage) / 0.15}`
  })
}
