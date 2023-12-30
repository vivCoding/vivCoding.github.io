// TODO this is basically copy paste from aboutSection
// dont repeat urself?

import { content } from "./data"
import { usePercentageSeen } from "./utils/hooks"

const projectsSection = document.getElementById("projects")
const aboutSection = document.getElementById("about")
const words = [...document.getElementsByClassName("projects-line-word")] as HTMLElement[]
const emoji = document.getElementById("projects-line-emoji")
const description = document.getElementById("projectsDescription")
const projectsList = document.getElementById("projectsList")

const PERCENTAGE_TRIGGER = 0.7
const WORD_ANIMATION = "animate-rise-word"
const EMOJI_ANIMATION = "animate-bop"
const DESC_ANIMATION = "animate-fade-in-up"

export function animateProject() {
  if (!projectsSection) throw "no section"

  // initial
  hideLines()
  initProjects()

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

// maaaaan use some kind of framework at this point
function initProjects() {
  if (!projectsList) throw "no projectsList"
  content.projects.forEach((project, idx) => {
    const newElemHtml = `
    <div class="projectCard invisible group flex w-full flex-row items-center rounded-2xl bg-white text-black transition hover:scale-105 opacity-0 animate-rise-word" style="animation-delay: ${
      50 * idx + 300
    }ms">
      <div class="flex w-full flex-row items-center p-5 pr-0">
        <img
          src="${project.image}"
          class="max-h-32 w-32 rounded border-2 border-solid border-slate-200"
        />
        <div class="projectCardContent ml-10">
          <h6 class="text-lg font-medium">${project.title}</h6>
          <p class="mt-2">${project.description}</p>
        </div>
      </div>
      <a
        href="${project.link}"
        title="${project.title}"
        target="_blank"
        rel="noreferrer noopener"
        class="ml-1 block h-full w-8 rounded-2xl rounded-l-none bg-clip-content transition hover:bg-slate-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-full w-full -translate-x-[100%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m 9 20 6 -8 -6 -8" />
        </svg>
      </a>
    </div>
    `
    const template = document.createElement("template")
    template.innerHTML = newElemHtml.trim()
    projectsList.appendChild(template.content.children[0])
  })
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
