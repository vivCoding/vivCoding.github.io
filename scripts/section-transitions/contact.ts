import { usePercentageSeen, useScrollPosition } from "@/utils/hooks"

const contactSection = document.getElementById("contact")
const projectsSection = document.getElementById("projects")
const words = [...document.getElementsByClassName("contact-line-word")] as HTMLElement[]
const emoji = document.getElementById("contact-line-emoji")

const PERCENTAGE_TRIGGER = 0.9

const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-swoosh"

export function initTransition() {
  if (!contactSection) throw "no contact section"

  // initial
  hide()

  // a lil different for last section
  usePercentageSeen(contactSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      show()
    } else {
      const opacity = 1 - (PERCENTAGE_TRIGGER - percentage) / 0.3
      contactSection.style.opacity = `${opacity}`
      if (opacity <= 0) {
        hide()
      }
    }
  })

  // accouting for large screens, where there is very minimal scrolling
  useScrollPosition(({ yPercentage }) => {
    if (yPercentage >= 0.99) {
      show()
    }
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
