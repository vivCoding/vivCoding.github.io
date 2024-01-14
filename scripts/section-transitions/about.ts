import { useScrollPosition, useYPercentageOnScreen } from "@/utils/hooks"

const aboutSection = document.getElementById("about")
const introSection = document.getElementById("intro")
const words = [...document.getElementsByClassName("about-line-word")] as HTMLElement[]
const emoji = document.getElementById("about-line-emoji")

// const PERCENTAGE_TRIGGER = 0.65
const PERCENTAGE_TRIGGER = 0.35

const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-wave"

export function initTransition() {
  if (!aboutSection) throw "no aboutSection"

  // initial
  hide()

  // relate the position/visibility of previous section to this section
  useYPercentageOnScreen(introSection, (percentage) => {
    if (percentage >= PERCENTAGE_TRIGGER) {
      show()
    } else {
      const opacity = 1 - (PERCENTAGE_TRIGGER - percentage) / 0.15
      aboutSection.style.opacity = `${opacity}`
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
  if (!aboutSection) throw "no section"
  aboutSection.style.visibility = "visible"
  aboutSection.style.opacity = "1"

  words.forEach((word) => {
    word.style.visibility = "visible"
    word.classList.add(WORD_ANIMATION)
  })

  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "visible"
  emoji.classList.add("animate-wave")
}

function hide() {
  if (!aboutSection) throw "no section"
  aboutSection.style.visibility = "hidden"

  words.forEach((line) => {
    line.style.visibility = "hidden"
    line.classList.remove(WORD_ANIMATION)
  })

  if (!emoji) throw new Error("no emoji")
  emoji.style.visibility = "hidden"
  emoji.classList.remove(EMOJI_ANIMATION)
}
