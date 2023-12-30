import { BlobBg } from "./themes/blob.js"
import { Theme } from "./themes/index.js"
import { StarsScene } from "./themes/stars.js"
import { WavesScene } from "./themes/waves.js"
import { randomIntFromRange } from "./utils/misc.js"

const themes: Record<string, Theme> = {
  waves: new WavesScene(),
  stars: new StarsScene(),
  blob: new BlobBg(),
  // TODO flow field
  // flowField: new FlowField(),
}

const themeNames = Object.keys(themes)
// choose random initial theme
const initialTheme = themeNames[randomIntFromRange(0, themeNames.length - 1)]

let currentTheme = "none"
let isTransitioning = false
const initialDelay = 1000
const transitionDuration = 1000

export function startTheme() {
  changeTheme(initialTheme, initialDelay)
}

export async function changeTheme(theme: string, delayMs = 0) {
  if (isTransitioning) return
  isTransitioning = true
  if (currentTheme !== "none") {
    await themes[currentTheme].exit(transitionDuration, delayMs)
  }
  if (theme !== "none") {
    await themes[theme].enter(transitionDuration, delayMs)
  }
  currentTheme = theme
  isTransitioning = false
}

// expose this function globally (to bind to buttons easily)
window.changeTheme = changeTheme
