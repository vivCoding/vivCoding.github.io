import { initTransition as initAbout } from "./about"
import { initTransition as initContact } from "./contact"
import { initTransition as initIntro } from "./intro"
import { initTransition as initNavbar } from "./navbar"
import { initTransition as initProjects } from "./projects"

// TODO adjust for smaller screens
export function initSectionTransitions() {
  initIntro()
  initNavbar()
  initAbout()
  initProjects()
  initContact()
}
