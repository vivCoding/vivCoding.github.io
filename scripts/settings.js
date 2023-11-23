import { ThemeFromHtml } from "./themes/index.js"
import { StarsBg } from "./themes/stars.js"
import { delay } from "./utils/animation.js"

/**
 * @typedef theme
 * @type {keyof themes | "none"}
 */

const themes = {
  waves: new ThemeFromHtml("wavesBg"),
  stars: new StarsBg(),
}
const defaultTheme = "waves"

let isTransitioning = false
/** @type {theme} */
let currentTheme = "none"

export function startTheme() {
  changeTheme(defaultTheme, 1000)
}

/** @param {theme} theme */
export async function changeTheme(theme, delayMs = 0) {
  if (isTransitioning) return
  isTransitioning = true
  await delay(delayMs)
  if (currentTheme !== "none") {
    await themes[currentTheme].exit()
  }
  if (theme !== "none") {
    await themes[theme].enter()
  }
  currentTheme = theme
  isTransitioning = false
}

// expose this function globally (make dev ez)
// @ts-ignore
window.changeTheme = changeTheme
