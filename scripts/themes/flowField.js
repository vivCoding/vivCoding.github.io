import { randomFromRange, randomIntFromRange, shuffle, Vector2d } from "../utils/misc.js"
import { perlin } from "../utils/perlin.js"
import { PixiTheme } from "./index.js"

export class FlowField extends PixiTheme {
  constructor() {
    super()

    // this.numParticles = Math.floor((this.width * this.height) / 50 ** 2)
    // console.log(this.numParticles)
    this.numParticles = 1
    this.particleSpeed = 5
    /** @type {Particle[]} */
    this.particles = []
    this.ct = 0
  }

  render() {
    perlin.seed()
    for (let i = 0; i < this.numParticles; i++) {
      const randomPosition = new Vector2d(
        // randomFromRange(0, this.width),
        // randomFromRange(0, this.height)
        randomFromRange(0, 0),
        randomFromRange(0, 0)
      )
      const particle = new Particle(this, randomPosition)
      this.particles.push(particle)
      particle.render()
    }
  }

  /** @param {number} delta */
  onTick(delta) {
    this.particles.forEach((particle) => {
      // const newPos = new Vector2d(200 + Math.sin(this.ct) * 100, 200 + Math.cos(this.ct) * 100)
      const newPos = new Vector2d(2, 1)
        .scale(delta * delta)
        .add(particle.position.x, particle.position.y)
      // const px = +(particle.position.x / this.width).toFixed(2)
      // const py = +(particle.position.y / this.height).toFixed(2)
      // const noise = perlin.get(px, py)
      // const a = Math.PI * 2 * noise
      // const vel = new Vector2d(Math.cos(a), Math.sin(a)).scale(this.particleSpeed).scale(delta)
      // const newPos = particle.position.copy().add(vel.x, vel.y)
      particle.updateParticle(newPos)
    })
  }

  clear() {
    this.particles.forEach((particle) => {
      particle.clear()
    })
    this.particles = []
  }

  resize() {
    this.clear()
    this.render()
  }
}

class Particle {
  /**
   *
   * @param {FlowField} flowFieldScene
   * @param {Vector2d} initPosition
   */
  constructor(flowFieldScene, initPosition) {
    this.flowFieldScene = flowFieldScene
    this.position = initPosition

    /**
     * @type {{
     * history: {position: Vector2d, disconnected: boolean}[]
     * historyLength: number
     * spacing: number
     * resolution: number
     * points: Vector2d[]
     * width: number
     * color: any
     * }}
     */
    this.trail = {
      history: [],
      historyLength: 5,
      spacing: 10,
      points: [],
      resolution: 100,
      width: 5,
      color: "rgba(255, 255, 255, 0.7)",
    }

    this.ct = 0
  }

  createTrail() {
    this.trail.history.push({
      position: this.position.copy(),
      disconnected: false,
    })

    for (let i = 1; i <= this.trailLength; i++) {
      const graphic = new PIXI.Graphics()
        .beginFill(this.trailColor)
        .drawCircle(0, 0, this.trailSize)
        .endFill()
      const sprite = new PIXI.Sprite(this.flowFieldScene.pixiApp.renderer.generateTexture(graphic))
      this.trail.unshift({
        position: this.position.copy(),
        sprite,
      })
      sprite.pivot.set(this.trailSize, this.trailSize)
      sprite.alpha = 0
      this.flowFieldScene.pixiApp.stage.addChild(sprite)
      graphic.destroy()
    }
  }

  /** @param {Vector2d} newPosition */
  updateParticle(newPosition) {
    // this.position.add(velocity.x, velocity.y)
    this.position.set(newPosition.x, newPosition.y)
    // this.position.add(velocity.x, velocity.y)
    if (
      this.position.x < 0 ||
      this.position.x >= this.flowFieldScene.width ||
      this.position.y < 0 ||
      this.position.y >= this.flowFieldScene.height
    ) {
      this.position.set(
        randomFromRange(0, this.flowFieldScene.width),
        randomFromRange(0, this.flowFieldScene.width)
      )
      this.trail.forEach((trailParticle) => {
        // trailParticle.position.set(this.position.x, this.position.y)
        trailParticle.sprite.alpha = 0
      })
    }
    let prev = this.position.copy()
    this.trail.forEach((trailParticle, idx) => {
      // kinda like coding a snake in a snake game
      const temp = trailParticle.position.copy()
      trailParticle.position.set(prev.x, prev.y)
      prev = temp.copy()
      trailParticle.sprite.position.set(trailParticle.position.x, trailParticle.position.y)
      const perc = (this.trailLength - idx) / this.trailLength
      trailParticle.sprite.alpha = perc ** 2
    })
  }

  render() {
    this.createTrail()
  }

  clear() {
    this.trail.forEach((trailParticle) => {
      trailParticle.sprite.destroy()
    })
    this.trail = []
  }
}
