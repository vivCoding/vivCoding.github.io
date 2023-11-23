/**
 * Inclusive range. Default range from 0 to 1
 */
export function randomFromRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 * Inclusive range
 *
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
export function clampValue(min, max, value) {
  return Math.max(min, Math.min(value, max))
}

/**
 * just a simple obj to hold {x, y}
 */
export class Vector2d {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  /** @param {number} x, @param {number} y */
  set(x, y) {
    this.x = x
    this.y = y
  }
}
