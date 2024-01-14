// TODO this is basically copy paste from aboutSection
// dont repeat urself?

import { useScrollPosition, useYPercentageOnScreen } from "../utils/hooks"

const projectsSection = document.getElementById("projects")
const aboutSection = document.getElementById("about")
const words = [...document.getElementsByClassName("projects-line-word")] as HTMLElement[]
const emoji = document.getElementById("projects-line-emoji")
const projectCards = [...document.getElementsByClassName("projectCard")] as HTMLElement[]

const PERCENTAGE_TRIGGER = 0.6

const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-bop"
const CARD_ANIMATION = "animate-rise-word"

export function initTransition() {
  if (!projectsSection) throw "no section"

  // initial
  hide()

  // relate the position/visibility of previous section to this section
  useYPercentageOnScreen(aboutSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      show()
    } else {
      const opacity = 1 - (PERCENTAGE_TRIGGER - percentage) / 0.25
      projectsSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hide()
      }
    }
  })

  // accouting for large screens, where there is very minimal scrolling
  useScrollPosition(({ yPercentage }) => {
    if (yPercentage === 1) show()
  })
}

function show() {
  if (!projectsSection) throw "no section"
  projectsSection.style.visibility = "visible"
  projectsSection.style.opacity = "1"

  // show lines
  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "visible"
  emoji.classList.add(EMOJI_ANIMATION)

  // show cards
  projectCards.forEach((projectCard) => {
    projectCard.style.visibility = "visible"
    projectCard.classList.add(CARD_ANIMATION)
  })
}

function hide() {
  if (!projectsSection) throw "no section"
  projectsSection.style.visibility = "hidden"

  // hiding words
  words.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "hidden"
  emoji.classList.remove(EMOJI_ANIMATION)

  // hiding cards
  const projectCards = [...document.getElementsByClassName("projectCard")] as HTMLElement[]
  projectCards.forEach((projectCard) => {
    projectCard.style.visibility = "hidden"
    projectCard.classList.remove(CARD_ANIMATION)
  })
}
