import { clampValue } from "./misc"

// Set up ONE event listener
// Keep track of functions we need to call when event is triggered
// NOTE this means that the order of how hook are registered matter
const scrollHooks: Function[] = []
function handleScroll() {
  scrollHooks.forEach((hook) => hook())
}
window.addEventListener("scroll", handleScroll)

// #region hooks

/** Tracks how much percentage an element is on screen. Returns number between [0, 1]
 *
 * Ex. If half of element is viewable on screen, returns 0.5.
 */
export function usePercentageSeen(element: HTMLElement | null, onChange: (percentage: number) => any) {
  if (!element) throw new Error("no elem for useScroll")

  scrollHooks.push(() => {
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight
    const scrollPosition = window.scrollY
    const elementOffsetTop = element.offsetTop
    const elementHeight = element.offsetHeight

    // calculate y positions of the screen edges
    const topEdge = scrollPosition
    const bottomEdge = scrollPosition + viewportHeight
    // check if element is already past the top screen edge
    const overTopEdge = elementOffsetTop < topEdge

    // calculate the percentage on screen
    // NOTE could divide by min(elementHeight, viewportHeight) instead.
    // That way, if element is larger than screen, will return 100% when element covers entire screen
    const calcPercentage =
      (overTopEdge ? elementOffsetTop + elementHeight - topEdge : bottomEdge - elementOffsetTop) / elementHeight
    // Restrict the range to between 0 and 1
    const percentage = Math.round(clampValue(0, 1, calcPercentage) * 100) / 100
    onChange(percentage)
  })

  handleScroll()
}

/** Tracks an element's y position on screen, converted to a percentage based on screen height. Returns number between [0, 1].
 *
 * By default, uses bottom edge as the element's y position. Can use top edge instead
 *
 * Ex. if bottom edge of element is in middle of screen, returns 0.5.
 */
export function useYPercentageOnScreen(
  element: HTMLElement | null,
  onChange: (percentage: number) => any,
  useTopEdge = false
) {
  if (!element) throw new Error("no elem for useScroll")

  scrollHooks.push(() => {
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight
    const scrollPos = window.scrollY
    const elementPos = useTopEdge ? element.offsetTop : element.offsetTop + element.offsetHeight

    // calculate scroll position y where the element is just at the bottom edge of screen
    const trigger = elementPos - viewportHeight
    // now calculate the element's position y on screen, and get percentage y
    // also restrict range to between 0 and 1
    const percentage = Math.round(clampValue(0, 1, (scrollPos - trigger) / viewportHeight) * 100) / 100
    onChange(percentage)
  })

  handleScroll()
}

/** Tracks scroll y position, both real value and percentage of page. Percentage is between [0, 1]
 */
export function useScrollPosition(onChange: ({ yPos, yPercentage }: { yPos: number; yPercentage: number }) => any) {
  scrollHooks.push(() => {
    const yPos = window.scrollY
    const yPercentage =
      Math.round(
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
          100
      ) / 100
    onChange({ yPos, yPercentage })
  })

  handleScroll()
}

// #endregion hooks
