import { ThemeFromHtml } from "./themes/index.js"
import { StarsBg } from "./themes/stars.js"
import { WavesScene } from "./themes/waves.js"
import { delay } from "./utils/animation.js"

/**
 * @typedef theme
 * @type {keyof themes | "none"}
 */

const themes = {
  waves: new WavesScene(),
  stars: new StarsBg(),
}
const defaultTheme = "waves"

/** @type {theme} */
let currentTheme = "none"
let isTransitioning = false
// const initialDelay = 0
const initialDelay = 1000
const transitionDuration = 1000

export function startTheme() {
  changeTheme(defaultTheme, initialDelay)
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
// @ts-ignore
window.changeTheme = changeTheme
