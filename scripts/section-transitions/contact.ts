import { useScrollPosition, useYPercentageOnScreen } from "../utils/hooks"

const contactSection = document.getElementById("contact")
const projectsSection = document.getElementById("projects")
const words = [...document.getElementsByClassName("contact-line-word")] as HTMLElement[]
const emoji = document.getElementById("contact-line-emoji")

const PERCENTAGE_TRIGGER = 0.45

const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-swoosh"

export function initTransition() {
  if (!contactSection) throw "no contact section"

  // initial
  hide()

  // relate the position/visibility of previous section to this section
  useYPercentageOnScreen(projectsSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      show()
    } else {
      const opacity = 1 - (PERCENTAGE_TRIGGER - percentage) / 0.1
      contactSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hide()
      }
    }
  })

  // accouting for large screens, where there is very minimal scrolling
  useScrollPosition(({ yPercentage }) => {
    console.log(yPercentage)
    if (yPercentage === 1) show()
  })
}

function show() {
  if (!contactSection) throw "no section"
  contactSection.style.visibility = "visible"
  contactSection.style.opacity = "1"

  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "visible"
  emoji.classList.add(EMOJI_ANIMATION)
}

function hide() {
  if (!contactSection) throw "no section"
  contactSection.style.visibility = "hidden"

  words.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove(WORD_ANIMATION)
  })
  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "hidden"
  emoji.classList.remove(EMOJI_ANIMATION)
}
