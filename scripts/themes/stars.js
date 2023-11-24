import { clampValue, randomFromRange, Vector2d } from "../utils/misc.js"
import { mousePosition } from "../pixi/engine.js"
import { PixiTheme } from "./index.js"

/**
 * @typedef StarType
 * @type {object}
 * @property {PIXI.Sprite} sprite
 * @property {number} size
 * @property {number} alpha
 * @property {Vector2d} position
 * @property {Vector2d} center
 * @property {Vector2d} velocity
 * @property {Vector2d} startVelocity
 * @property {{ h: number, s: number, l: number }} lineColor
 */

/**
 * @typedef MouseCursorType
 * @type {object}
 * @property {PIXI.Sprite} sprite
 * @property {number} size
 * @property {Vector2d} position
 * @property {Vector2d} velocity
 */

export class StarsScene extends PixiTheme {
  constructor() {
    super()
    this.spacing = 80
    this.maxStarSize = 3.5
    this.baseSpeed = 1
    this.minSpeed = 0.1
    this.mouseForceRadius = 100
    this.mouseCursorSize = 3

    // TODO why not initialize the stars HERE (somewhere not in render), and then add to stage in render

    /** @type {StarType[]} */
    this.stars = []

    /**  @type {MouseCursorType} */
    this.mouseCursor = undefined
    /**  @type {PIXI.Graphics} */
    this.lineGraphics = undefined
  }

  createMouseCursor() {
    const mouseCursorGraphic = new PIXI.Graphics()
      .beginFill("white", 0.7)
      .drawCircle(0, 0, this.mouseCursorSize)
      .endFill()
    this.mouseCursor = {
      sprite: new PIXI.Sprite(this.pixiApp.renderer.generateTexture(mouseCursorGraphic)),
      size: this.mouseCursorSize,
      position: new Vector2d(),
      velocity: new Vector2d(),
    }
    this.mouseCursor.sprite.pivot.set(this.mouseCursor.size, this.mouseCursor.size)
    this.pixiApp.stage.addChild(this.mouseCursor.sprite)
    mouseCursorGraphic.destroy()
  }

  createLines() {
    this.lineGraphics = new PIXI.Graphics()
    this.pixiApp.stage.addChild(this.lineGraphics)
  }

  createStars() {
    const offset = 100
    for (let x = -offset; x < this.width + offset; x += this.spacing) {
      for (let y = -offset; y < this.height + offset; y += this.spacing) {
        // randomize position, size, and color
        const rx = randomFromRange(x - this.spacing, x + this.spacing)
        const ry = randomFromRange(y - this.spacing, y + this.spacing)
        const rSize = this.maxStarSize * randomFromRange(0.5, 1.25)
        const rAngle = randomFromRange(0, 360)
        const alpha = randomFromRange()
        const rSpeed = alpha * this.baseSpeed
        // create star graphic
        const graphic = new PIXI.Graphics()
        graphic.beginFill("white", alpha).drawRect(0, 0, rSize, rSize).endFill()
        // create sprite with graphic texture
        // (sprites are apparently a lil' more performant than graphics)
        const sprite = new PIXI.Sprite(this.pixiApp.renderer.generateTexture(graphic))
        // set pivot and initial transform, and add to list
        sprite.pivot.set(rSize / 2, rSize / 2)
        sprite.angle = rAngle
        sprite.position.set(rx, ry)
        this.stars.push({
          sprite,
          size: rSize,
          alpha,
          position: new Vector2d(rx, ry),
          center: new Vector2d(rx, ry),
          velocity: new Vector2d(0, rSpeed),
          startVelocity: new Vector2d(0, rSpeed),
          lineColor: {
            h: randomFromRange(0, 360),
            s: randomFromRange(100, 100),
            l: randomFromRange(50, 50),
          },
        })
        this.pixiApp.stage.addChild(sprite)
        graphic.destroy()
      }
    }
  }

  /** @param {number} delta */
  updateMouseCursor(delta) {
    // mouse cursor simple gravity
    const mcxDiff = mousePosition.x - this.mouseCursor.position.x
    const mcyDiff = mousePosition.y - this.mouseCursor.position.y
    const mcDistSquared = mcxDiff ** 2 + mcyDiff ** 2
    const mcDist = Math.sqrt(mcDistSquared)

    const mcGrav = mcDist / 25
    const mcTheta = Math.atan2(mcyDiff, mcxDiff)
    const mcxGrav = mcGrav * Math.cos(mcTheta)
    const mcyGrav = mcGrav * Math.sin(mcTheta)

    this.mouseCursor.velocity.x += mcxGrav * delta
    this.mouseCursor.velocity.y += mcyGrav * delta

    this.mouseCursor.position.x += this.mouseCursor.velocity.x * delta
    this.mouseCursor.position.y += this.mouseCursor.velocity.y * delta
    this.mouseCursor.sprite.position.set(this.mouseCursor.position.x, this.mouseCursor.position.y)
    // some velocity dampening
    this.mouseCursor.velocity.x *= 0.6
    this.mouseCursor.velocity.y *= 0.6
  }

  /** @param {number} delta */
  updateStars(delta) {
    // TODO maybe break this into diff funcs
    this.stars.forEach((star) => {
      // apply movement (including forces)
      star.position.x += star.velocity.x * delta
      star.position.y += star.velocity.y * delta
      // apply only base movement (no forces) to star center
      star.center.x += star.startVelocity.x * delta
      star.center.y += star.startVelocity.y * delta
      // reset pos if needed
      if (star.position.y > this.height + star.size) {
        star.center.y = -star.size
        // stop movement after reset
        star.velocity.x = 0
        star.velocity.y = 0
        star.position.x = star.center.x
        star.position.y = star.center.y
      }
      // update sprite
      star.sprite.position.set(star.position.x, star.position.y)

      // velocity loss
      star.velocity.x *= 0.5
      star.velocity.y *= 0.5

      // prevent excess oscillation
      // if (Math.abs(star.velocity.x) < minSpeed) star.velocity.x = 0
      // if (Math.abs(star.velocity.y) < minSpeed) star.velocity.y = 0

      // mouse force
      const mxDiff = star.position.x - this.mouseCursor.position.x
      const myDiff = star.position.y - this.mouseCursor.position.y
      const mDistSquared = mxDiff ** 2 + myDiff ** 2
      const mDist = Math.sqrt(mDistSquared)
      // ignore mouse force if distance far away
      const mGrav = mDist > this.mouseForceRadius ? 0 : 50 / mDist
      const mTheta = Math.atan2(myDiff, mxDiff)
      const mxGrav = mGrav * Math.cos(mTheta)
      const myGrav = mGrav * Math.sin(mTheta)
      const mouseInteraction = !!mGrav

      // gravity towards star center (orbit)
      const cxDiff = star.center.x - star.position.x
      const cyDiff = star.center.y - star.position.y
      const cDistSquared = cxDiff ** 2 + cyDiff ** 2
      const cDist = Math.sqrt(cDistSquared)
      const cGrav = Math.min(cDist / 50, 5)
      const cTheta = Math.atan2(cyDiff, cxDiff)
      const cxGrav = cGrav * Math.cos(cTheta)
      const cyGrav = cGrav * Math.sin(cTheta)

      // apply forces
      star.velocity.x += (mxGrav + cxGrav) * delta
      star.velocity.y += (myGrav + cyGrav) * delta

      // add lines to show mouse gravity
      if (mouseInteraction) {
        const percentDist = (this.mouseForceRadius - mDist) / this.mouseForceRadius
        this.lineGraphics
          .lineStyle(
            clampValue(1, 5, percentDist ** 0.5 * 5),
            "white",
            clampValue(0, star.alpha, percentDist ** 0.6)
            // star.lineColor,
          )
          .moveTo(this.mouseCursor.position.x, this.mouseCursor.position.y)
          .lineTo(star.position.x, star.position.y)
      }
    })
  }

  render() {
    this.createMouseCursor()
    this.createLines()
    this.createStars()
  }

  /** @param {number} delta */
  onTick(delta) {
    this.lineGraphics.clear()
    this.updateMouseCursor(delta)
    this.updateStars(delta)
  }

  clear() {
    this.lineGraphics.destroy()
    this.mouseCursor.sprite.destroy()
    this.stars.forEach((star) => {
      star.sprite.destroy()
    })
    this.pixiApp.stage.removeChildren()
    this.stars = []
  }

  resize() {
    // TODO only remove old/recreate new stars when needed?
    this.stars.forEach((star) => {
      star.sprite.destroy()
      this.pixiApp.stage.removeChild(star.sprite)
    })
    this.stars = []
    this.createStars()
  }
}
