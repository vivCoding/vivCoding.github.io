// TODO this is basically copy paste from aboutSection
// dont repeat urself?

import { usePercentageSeen } from "../utils/hooks"

const projectsSection = document.getElementById("projects")
const aboutSection = document.getElementById("about")
const words = [...document.getElementsByClassName("projects-line-word")] as HTMLElement[]
const emoji = document.getElementById("projects-line-emoji")
const description = document.getElementById("projectsDescription")

const PERCENTAGE_TRIGGER = 0.75
const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-bop"
const DESC_ANIMATION = "animate-fade-in-up"

export function initTransition() {
  if (!projectsSection) throw "no section"

  // initial
  hideLines()

  // use intro section to relate the scrolling of intro section to about section
  usePercentageSeen(aboutSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      projectsSection.style.opacity = "1"
      showLines()
      showProjects()
    } else {
      const opacity = (percentage - 0.6) / (PERCENTAGE_TRIGGER - 0.6)
      projectsSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hideLines()
        hideProjects()
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
}

function showLines() {
  if (!projectsSection) throw "no about section"
  projectsSection.style.visibility = "visible"

  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "visible"
  emoji.classList.add(EMOJI_ANIMATION)

  // if (!description) throw "no description"
  // description.style.visibility = "visible"
  // description.classList.add(DESC_ANIMATION)
}

function showProjects() {
  const projectCards = [...document.getElementsByClassName("projectCard")] as HTMLElement[]
  projectCards.forEach((projectCard) => {
    projectCard.style.visibility = "visible"
    projectCard.classList.add("animate-rise-word")
  })
}

function hideProjects() {
  const projectCards = [...document.getElementsByClassName("projectCard")] as HTMLElement[]
  projectCards.forEach((projectCard) => {
    projectCard.style.visibility = "hidden"
    projectCard.classList.remove("animate-rise-word")
  })
}
