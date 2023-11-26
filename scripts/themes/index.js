import { PixiEngine } from "../pixi/engine.js"
import { delay, fadeIn, fadeOut, waitForAnimation } from "../utils/animation.js"
import { Vector2d } from "../utils/misc.js"

// TODO check for prefer no motion

export class Theme {
  async enter() {
    throw new Error("bruh enter not implemented")
  }

  async exit() {
    throw new Error("bruh exit not implemented")
  }
}

/**
 * Theme uses pixijs. Is always attached to pixi canvas
 */
export class PixiTheme extends Theme {
  // This theme always uses the same canvas. Instantiate only one engine
  static pixiCanvas = document.getElementById("pixiCanvas")
  static pixiEngine = new PixiEngine(PixiTheme.pixiCanvas)

  constructor() {
    if (!PixiTheme.pixiCanvas) throw new Error("welp no pixi canvas, no cool pixi theme")
    super()
    this.pixiApp = PixiTheme.pixiEngine.pixiApp

    /** @type {number} */
    this.width = this.pixiApp.screen.width
    /** @type {number} */
    this.height = this.pixiApp.screen.height

    this.center = new Vector2d(this.width / 2, this.height / 2)

    PixiTheme.pixiEngine.addOnResize(
      (() => {
        this.width = this.pixiApp.screen.width
        this.height = this.pixiApp.screen.width
        this.center.x = this.width / 2
        this.center.y = this.height / 2
        this.center.set(this.width / 2, this.height / 2)
        if (this.rendered) {
          this.resize()
        }
      }).bind(this)
    )
    this.playing = false
    this.rendered = false

    /** @type {Function=} */
    this.updateFunc = undefined
  }

  render() {
    throw new Error("render not implemented hmmmmm")
  }

  clear() {
    throw new Error("clear not implemented hmmmmm")
  }

  resize() {
    throw new Error("resize not implemented hmmmmm")
  }

  play() {
    if (!this.playing) {
      this.playing = true
      this.updateFunc = (delta) => this.onTick(delta)
      this.pixiApp.ticker.add(this.updateFunc)
    }
  }

  stop() {
    if (this.playing) {
      this.playing = false
      this.pixiApp.ticker.remove(this.updateFunc)
    }
  }

  /** @param {number} delta */
  onTick(delta) {
    throw new Error("onTick not implemented hmmmmm")
  }

  /** Default duration = 1000ms */
  async enter(duration = 1000, delayMs = 0) {
    if (!PixiTheme.pixiCanvas) throw new Error("welp no pixi canvas, no cool pixi theme")
    this.pixiApp.start()
    this.pixiApp.ticker.start()
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
    this.play()
    await waitForAnimation(fadeIn(PixiTheme.pixiCanvas, duration, delayMs))
  }

  /** Default duration = 1000ms */
  async exit(duration = 1000, delayMs = 0) {
    if (!PixiTheme.pixiCanvas) throw new Error("welp no pixi canvas, no cool pixi theme")
    await delay(delayMs)
    await waitForAnimation(fadeOut(PixiTheme.pixiCanvas, duration))
    this.stop()
    this.clear()
    this.rendered = false
    this.pixiApp.ticker.stop()
    this.pixiApp.stop()
  }
}
