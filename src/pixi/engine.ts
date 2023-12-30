import * as PIXI from "pixi.js"

export const mousePosition = { x: 0, y: 0 }

document.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY
})

// Abstracts some of the initial pixi setup
export class PixiEngine {
  pixiApp: PIXI.Application
  resizeFuncs: Function[]

  constructor(elem: HTMLElement | null) {
    if (!elem) throw new Error("yuh oh, no elem passed for pixi app")
    this.pixiApp = new PIXI.Application({
      view: elem as HTMLCanvasElement,
      resizeTo: window,
      backgroundAlpha: 0,
    })
    document.body.appendChild(this.pixiApp.view as HTMLCanvasElement)

    this.resizeFuncs = []

    window.addEventListener("resize", this.onResize.bind(this))
  }

  onResize() {
    this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    this.resizeFuncs.forEach((func) => func())
  }

  addOnResize(func: Function) {
    this.resizeFuncs.push(func)
  }
}
