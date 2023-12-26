// TODO this is basically copy paste from aboutSection
// dont repeat urself?
import { usePercentageSeen } from "./utils/hooks.js"

const projectsSection = document.getElementById("projects")
const aboutSection = document.getElementById("about")
/** @type {HTMLElement[]} */
// @ts-ignore
const words = [...document.getElementsByClassName("projects-line-word")]
const emoji = document.getElementById("projects-line-emoji")
const description = document.getElementById("projectsDescription")

const PERCENTAGE_TRIGGER = 0.8
const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-bop"
const DESC_ANIMATION = "animate-fade-in-up"

export function animateProject() {
  if (!projectsSection) throw "no section"

  // initial
  hideLines()

  // use intro section to relate the scrolling of intro section to about section
  usePercentageSeen(aboutSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      showLines()
      projectsSection.style.opacity = "1"
    } else {
      const opacity = (percentage - 0.6) / (PERCENTAGE_TRIGGER - 0.6)
      projectsSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hideLines()
      }
    }
  })
}

function hideLines() {
  if (!projectsSection) throw "no section"
  projectsSection.style.visibility = "hidden"

  words.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "hidden"
  emoji.classList.remove(EMOJI_ANIMATION)

  // if (!description) throw "no description"
  // description.style.visibility = "hidden"
  // description.classList.remove(DESC_ANIMATION)
}

function showLines() {
  if (!projectsSection) throw "no about section"
  projectsSection.style.visibility = "visible"

  if (!emoji) throw new Error("no emoji")
  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })
  emoji.style.visibility = "visible"
  emoji.classList.add(EMOJI_ANIMATION)

  // if (!description) throw "no description"
  // description.style.visibility = "visible"
  // description.classList.add(DESC_ANIMATION)
}
