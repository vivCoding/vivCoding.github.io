import { PixiEngine } from "@/pixi/engine"
import { delay, fadeIn, fadeOut, waitForAnimation } from "@/utils/animation"
import { Vector2d } from "@/utils/misc"
import * as PIXI from "pixi.js"

export class Theme {
  /** play when theme enters */
  async enter(transitionDuration: number, delay: number) {
    throw new Error("bruh enter not implemented")
  }

  /** play when theme exits */
  async exit(transitionDuration: number, delay: number) {
    throw new Error("bruh exit not implemented")
  }
}

/** Theme that uses pixijs. Is always attached to pixi canvas */
export class PixiTheme extends Theme {
  // This theme always uses the same canvas. Instantiate only one engine
  static pixiCanvas = document.getElementById("pixiCanvas")
  static pixiEngine = new PixiEngine(PixiTheme.pixiCanvas)

  // upon review, can prob be static too but eh
  pixiApp = PixiTheme.pixiEngine.pixiApp

  width = this.pixiApp.screen.width
  height = this.pixiApp.screen.height
  center = new Vector2d(this.width / 2, this.height / 2)

  rendered = false
  playing = false

  _updateFunc?: PIXI.TickerCallback<any> = undefined

  constructor() {
    if (!PixiTheme.pixiCanvas) throw new Error("welp no pixi canvas, no cool pixi theme")
    super()

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
      this._updateFunc = (delta: number) => this.onTick(delta)
      this.pixiApp.ticker.add(this._updateFunc)
    }
  }

  stop() {
    if (this.playing && this._updateFunc) {
      this.playing = false
      this.pixiApp.ticker.remove(this._updateFunc)
    }
  }

  onTick(delta: number) {
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
