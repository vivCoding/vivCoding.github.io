/** @param {number} time */
export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/** @param {Animation} animation */
export function waitForAnimation(animation) {
  return new Promise((resolve) => (animation.onfinish = resolve))
}

/** @param {Animation[]} animations */
export function waitForAnimations(animations) {
  return Promise.all(animations.map((a) => waitForAnimation(a)))
}

/**
 * Default duration = 1000ms
 * @param {HTMLElement} elem
 * */
export function fadeIn(elem, duration = 1000) {
  return elem.animate(
    { opacity: [0, 1] },
    {
      duration,
      fill: "forwards",
      easing: "linear",
    }
  )
}

/**
 * Default duration = 1000ms
 * @param {HTMLElement} elem
 * */
export function fadeOut(elem, duration = 1000) {
  return elem.animate(
    { opacity: [1, 0] },
    {
      duration,
      fill: "forwards",
      easing: "linear",
    }
  )
}
