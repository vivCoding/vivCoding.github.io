import { BlobBg } from "./themes/blob.js"
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
}
/** @type {theme} */
// @ts-ignore
const initialTheme = Object.keys(themes)[randomIntFromRange(0, Object.keys(themes).length - 1)]

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
  await delay(delayMs)
  if (currentTheme !== "none") {
    await themes[currentTheme].exit(transitionDuration)
  }
  if (theme !== "none") {
    await themes[theme].enter(transitionDuration)
  }
  currentTheme = theme
  isTransitioning = false
}

// expose this function globally (to bind to buttons easily)
window.changeTheme = changeTheme
