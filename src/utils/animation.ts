export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export function waitForAnimation(animation: Animation) {
  return new Promise((resolve) => (animation.onfinish = resolve))
}

export function waitForAnimations(animations: Animation[]) {
  return Promise.all(animations.map((a) => waitForAnimation(a)))
}

/** Default duration = 1000ms */
export function fadeIn(elem: HTMLElement, duration = 1000, delay = 0) {
  return elem.animate(
    { opacity: [0, 1] },
    {
      duration,
      delay,
      fill: "forwards",
      easing: "linear",
    }
  )
}

/** Default duration = 1000ms */
export function fadeOut(elem: HTMLElement, duration = 1000, delay = 0) {
  return elem.animate(
    { opacity: [1, 0] },
    {
      duration,
      delay,
      fill: "forwards",
      easing: "linear",
    }
  )
}
