import { usePercentageSeen } from "./utils/hooks.js"

const aboutSection = document.getElementById("about")
const introSection = document.getElementById("intro")
/** @type {HTMLElement[]} */
// @ts-ignore
const words = [...document.getElementsByClassName("about-line-word")]
const emoji = document.getElementById("about-line-emoji")

const PERCENTAGE_TRIGGER = 0.68
const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-wave"

export function animateAbout() {
  if (!aboutSection) throw "no aboutSection"

  // initial
  hideLines()

  // use intro section to relate the scrolling of intro section to about section
  usePercentageSeen(introSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      showLines()
      aboutSection.style.opacity = "1"
    } else {
      const opacity = (percentage - 0.6) / (PERCENTAGE_TRIGGER - 0.6)
      aboutSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hideLines()
      }
    }
  })
}

function hideLines() {
  if (!aboutSection) throw "no about section"
  aboutSection.style.visibility = "hidden"

  words.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove(WORD_ANIMATION)
  })

  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "hidden"
  emoji.classList.remove(EMOJI_ANIMATION)
}

function showLines() {
  if (!aboutSection) throw "no about section"
  aboutSection.style.visibility = "visible"

  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })

  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "visible"
  emoji.classList.add("animate-wave")
}
