import { usePercentageSeen } from "./utils/hooks.js"
import { clampValue } from "./utils/misc.js"

const aboutSection = document.getElementById("about")
const introSection = document.getElementById("intro")
/** @type {HTMLElement[]} */
// @ts-ignore
const lines = [
  ...document.getElementsByClassName("line1"),
  ...document.getElementsByClassName("line2"),
  ...document.getElementsByClassName("line3"),
  ...document.getElementsByClassName("line4"),
]
const lineEmoji = document.getElementById("line1-emoji")

const FIRST_LINE_TRIGGER = 0.65
let isShowing = false

export function animateAbout() {
  if (!aboutSection) throw "no aboutSection"

  // initial
  hideLines()

  // use intro section to relate the scrolling of intro section to about section
  usePercentageSeen(introSection, (percentage) => {
    if (percentage >= FIRST_LINE_TRIGGER) {
      showLines()
      aboutSection.style.opacity = "1"
    } else {
      const opacity = (percentage - 0.6) / (FIRST_LINE_TRIGGER - 0.6)
      aboutSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hideLines()
      }
    }
  })
}

function hideLines() {
  if (!lineEmoji) throw new Error("no emoji")
  lines.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove("animate-rise-word")
  })
  lineEmoji.style.visibility = "hidden"
  lineEmoji.classList.remove("animate-wave")
}

function showLines() {
  if (!lineEmoji) throw new Error("no emoji")
  lines.forEach((line) => {
    line.style.visibility = "visible"
    line.classList.add("animate-rise-word")
  })
  lineEmoji.style.visibility = "visible"
  lineEmoji.classList.add("animate-wave")
}
