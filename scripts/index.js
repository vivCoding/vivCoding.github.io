// hero
const heroSect = document.getElementById("hero")
const heroBorder = document.getElementById("heroBorder")
const heroText = document.getElementById("heroText")
const heroTitle = document.getElementById("heroTitle")
const heroDesc = document.getElementById("heroDesc")

const logoInit = document.getElementById("logoInit")
const logoTop = document.getElementById("logoTop")
const logoMiddle = document.getElementById("logoMiddle")
const logoBottom = document.getElementById("logoBottom")
const logoStroke = document.getElementById("logoStroke")

const wavesBg = document.getElementById("wavesBg")
// stars
const starsBg = document.getElementById("starsBg")
const noStarElems = [...document.getElementsByClassName("noStars")]

// settings
const waveSettingBtn = document.getElementById("waveSettingBtn")
const starSettingBtn = document.getElementById("starSettingBtn")

// TODO move document body onload to index
document.body.onload = () => {
  animateHero()
}

// #region animation utilities

/**
 *
 * @param {number} time
 * @returns {Promise}
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 *
 * @param {Animation} animation
 * @returns {Promise}
 */
function waitForAnimation(animation) {
  return new Promise((resolve) => (animation.onfinish = resolve))
}

/**
 *
 * @param {Animation[]} animation
 * @returns {Promise}
 */
function waitForAnimations(animations) {
  return Promise.all(animations.map((a) => waitForAnimation(a)))
}

// #endregion animation utilities

// #region misc utilities

function randomFromRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @param {number} value
 * @returns {number}
 */
function clampValue(min, max, value) {
  return Math.max(min, Math.min(value, max))
}

// #endregion misc utilities
