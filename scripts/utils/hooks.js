import { clampValue } from "./misc.js"

/**
 * @param {HTMLElement | null} element
 * @param {(percentage: number) => void} onChange
 */
export function useScroll(element, onChange) {
  if (!element) {
    throw new Error("no elem for useScroll")
  }

  const handleScroll = () => {
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight
    const scrollTop = window.scrollY
    const elementOffsetTop = element.offsetTop
    const elementHeight = element.offsetHeight

    // Calculate percentage of smthing
    const distance = scrollTop + viewportHeight - elementOffsetTop
    // Restrict the range to between 0 and 100
    const percentage = clampValue(0, 100, distance / ((viewportHeight + elementHeight) / 100)) / 100
    onChange(percentage)
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll()
}
