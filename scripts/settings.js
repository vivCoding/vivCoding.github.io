import { BlobBg } from "./themes/blob.js"
import { FlowField } from "./themes/flowField.js"
import { StarsScene } from "./themes/stars.js"
import { WavesScene } from "./themes/waves.js"
import { delay } from "./utils/animation.js"
import { randomFromRange, randomIntFromRange } from "./utils/misc.js"

/**
 * @typedef theme
 * @type {keyof themes | "none"}
 */

const themes = {
  waves: new WavesScene(),
  stars: new StarsScene(),
  blob: new BlobBg(),
  // TODO flow field
  // flowField: new FlowField(),
}
const themeNames = Object.keys(themes)
/** @type {theme} */
// @ts-ignore
// choose random initial theme
const initialTheme = themeNames[randomIntFromRange(0, themeNames.length - 1)]
// const initialTheme = "stars"

/** @type {theme} */
let currentTheme = "none"
let isTransitioning = false
const initialDelay = 1000
const transitionDuration = 1000

export function startTheme() {
  changeTheme(initialTheme, initialDelay)
}

/** @param {theme} theme */
export async function changeTheme(theme, delayMs = 0) {
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
