export const mousePosition = { x: 0, y: 0 }
document.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY
})

export class PixiEngine {
  /**
   *
   * @param {HTMLElement|null} elem
   */
  constructor(elem) {
    if (!elem) {
      console.error("yuh oh, no elem passed for pixi app")
      return
    }
    this.pixiApp = new PIXI.Application({
      view: elem,
      resizeTo: window,
      autoResize: true,
      backgroundAlpha: 0,
    })
    document.body.appendChild(this.pixiApp.view)

    /** @type {Function[]} */
    this.resizeFuncs = []

    window.addEventListener("resize", this.onResize.bind(this))
  }

  onResize() {
    this.resizeFuncs.forEach((func) => func())
  }

  /** @param {Function} func */
  addOnResize(func) {
    this.resizeFuncs.push(func)
  }
}
