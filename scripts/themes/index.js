import { PixiEngine } from "../pixi/engine.js"
import { fadeIn, fadeOut, waitForAnimation } from "../utils/animation.js"

export class Theme {
  /**
   * All themes are attached to some main HTML element
   *
   * @param {HTMLElement | string | null} parentElem - Parent element obj or id
   */
  constructor(parentElem) {
    const elem =
      typeof parentElem === "string"
        ? document.getElementById(parentElem)
        : parentElem
    if (!elem) throw new Error("bruh no elem for theme")
    this.parentElem = elem
  }

  async enter() {
    throw new Error("bruh enter not implemented")
  }

  async exit() {
    throw new Error("bruh exit not implemented")
  }
}

/**
 * Basic theme that only adds html elements and only uses CSS animations (no js needed)
 * Has basic fade in/out as transition
 */
export class ThemeFromHtml extends Theme {
  // Default fade in
  async enter() {
    await waitForAnimation(fadeIn(this.parentElem))
  }

  // Default fade out
  async exit() {
    await waitForAnimation(fadeOut(this.parentElem))
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
    if (!PixiTheme.pixiCanvas) {
      throw new Error("welp no pixi canvas, no cool pixi theme")
    }
    super(PixiTheme.pixiCanvas)
    this.pixiApp = PixiTheme.pixiEngine.pixiApp

    /** @type {number} */
    this.width = this.pixiApp.screen.width
    /** @type {number} */
    this.height = this.pixiApp.screen.width

    PixiTheme.pixiEngine.addOnResize(
      (() => {
        this.width = this.pixiApp.screen.width
        this.height = this.pixiApp.screen.width
        this.resize()
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

  async enter() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
    this.play()
    await waitForAnimation(fadeIn(this.parentElem))
  }

  async exit() {
    await waitForAnimation(fadeOut(this.parentElem))
    this.stop()
  }
}
