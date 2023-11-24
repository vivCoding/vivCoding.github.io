/**
 * Inclusive range. Default range from 0 to 1
 */
export function randomFromRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 * Inclusive range. Default range from 0 to 1
 */
export function randomIntFromRange(min = 0, max = 1) {
  return Math.round(randomFromRange(min, max))
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
    return this
  }

  /** @param {number} x, @param {number} y */
  add(x, y) {
    this.x += x
    this.y += y
    return this
  }

  /** Returns a copy of this vector */
  copy() {
    return new Vector2d(this.x, this.y)
  }
}

/**
 * Shuffle array in-place
 *
 * https://bost.ocks.org/mike/shuffle/
 * @param {Array} array
 */
export function shuffle(array) {
  let m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)
    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}
