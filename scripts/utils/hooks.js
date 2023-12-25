import { clampValue } from "./misc.js"

/**
 * @param {HTMLElement | null} element
 * @param {(percentage: number) => void} onChange
 */
export function usePercentageSeen(element, onChange) {
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

/**
 * @param {({ yPos, yPercentage}: { yPos: number, yPercentage: number}) => void} onChange
 */
export function useScrollPosition(onChange) {
  const handleScroll = () => {
    const yPos = window.scrollY
    const yPercentage =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    onChange({ yPos, yPercentage })
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll()
}
