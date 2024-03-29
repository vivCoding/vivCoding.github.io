import { mousePosition } from "@/pixi/engine"
import { Vector2d, clampValue, randomFromRange } from "@/utils/misc"
import * as PIXI from "pixi.js"
import { PixiTheme } from "."

type StarType = {
  sprite: PIXI.Sprite
  size: number
  alpha: number
  position: Vector2d
  center: Vector2d
  velocity: Vector2d
  startVelocity: Vector2d
  lineColor: { h: number; s: number; l: number }
}

type MouseCursorType = {
  sprite: PIXI.Sprite
  size: number
  position: Vector2d
  velocity: Vector2d
}

export class StarsScene extends PixiTheme {
  spacing = 80
  maxStarSize = 3.5
  baseSpeed = 1
  minSpeed = 0.1
  mouseForceRadius = 100
  mouseCursorSize = 3

  stars: StarType[] = []
  mouseCursor?: MouseCursorType = undefined
  lineGraphics?: PIXI.Graphics = undefined

  constructor() {
    super()

    // TODO why not initialize the stars HERE (somewhere not in render), and then add to stage in render
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

  updateMouseCursor(delta: number) {
    // mouse cursor simple gravity
    if (!this.mouseCursor) throw "wtf no mouse cursor sprite?"
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
    this.mouseCursor.velocity.x *= 0.8
    this.mouseCursor.velocity.y *= 0.8
  }

  updateStars(delta: number) {
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
      if (!this.mouseCursor) throw "wtf no mouse cursor sprite?"
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
        if (!this.lineGraphics) throw "wtf no lineGraphics?"
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

  onTick(delta: number) {
    if (this.lineGraphics) this.lineGraphics.clear()
    this.updateMouseCursor(delta)
    this.updateStars(delta)
  }

  clear() {
    if (this.lineGraphics) this.lineGraphics.destroy()
    if (this.mouseCursor) this.mouseCursor.sprite.destroy()
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
