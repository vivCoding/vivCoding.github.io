/** Inclusive range. Default range from 0 to 1 */
export function randomFromRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/** Inclusive range. Default range from 0 to 1 */
export function randomIntFromRange(min = 0, max = 1) {
  return Math.round(randomFromRange(min, max))
}

/** Ensures value is between min and max. Inclusive range */
export function clampValue(min: number, max: number, value: number) {
  return Math.max(min, Math.min(value, max))
}

/** just a simple obj to hold {x, y} */
export class Vector2d {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  add(x: number, y: number) {
    this.x += x
    this.y += y
    return this
  }

  scale(m: number) {
    this.x *= m
    this.y *= m
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
 */
export function shuffle(array: Array<any>) {
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
