import { usePercentageSeen } from "./utils/hooks"

const contactSection = document.getElementById("contact")
const projectsSection = document.getElementById("projects")
const words = [...document.getElementsByClassName("contact-line-word")] as HTMLElement[]
const emoji = document.getElementById("contact-line-emoji")

const PERCENTAGE_TRIGGER = 0.73

const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-swoosh"

export function animateContact() {
  if (!contactSection) throw "no contact section"

  // initial
  hideLines()

  // use intro section to relate the scrolling of intro section to about section
  usePercentageSeen(projectsSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      contactSection.style.opacity = "1"
      showLines()
    } else {
      const opacity = (percentage - 0.7) / (PERCENTAGE_TRIGGER - 0.7)
      contactSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hideLines()
      }
    }
  })
}

function hideLines() {
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
