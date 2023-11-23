import { randomFromRange, Vector2d } from "../utils/misc.js"
import { PixiTheme } from "./index.js"

/**
 * @typedef WavePoint
 * @type {object}
 * @property {PIXI.Sprite} sprite
 * @property {Vector2d} position
 * @property {Vector2d} initialPosition
 * @property {number} speed
 * @property {number} modValue
 * @property {number} amplitude
 */

export class WavesScene extends PixiTheme {
  constructor() {
    super()

    this.numWaves = 3

    /** @type {Wave[]} */
    this.waves = [
      new Wave(this, "red"),
      new Wave(this, "#00ff00"),
      new Wave(this, "#00ffff"),
    ]

    // for (let i = 0; i < this.numWaves; i++) {
    //   const wave = new Wave(this, "red")
    //   this.waves.push(wave)
    // }
  }

  render() {
    this.waves.forEach((wave) => {
      wave.render()
    })
  }

  /** @param {number} delta */
  onTick(delta) {
    this.waves.forEach((wave) => {
      wave.updateWave(delta)
    })
  }

  clear() {
    this.waves.forEach((wave) => {
      wave.clear()
    })
  }

  resize() {
    this.clear()
    this.render()
  }
}

class Wave {
  /**
   *
   * @param {WavesScene} wavesScene
   * @param {any} waveColor
   */
  constructor(wavesScene, waveColor) {
    this.wavesScene = wavesScene
    this.pixiApp = wavesScene.pixiApp

    this.pointSize = 1
    this.numPoints = 20
    this.pointSpeed = randomFromRange(0.005, 0.03)
    // this.maxAmplitude = randomFromRange(100, 200)
    this.maxAmplitude = randomFromRange(75, 150)
    this.initAmpitude = this.maxAmplitude
    this.modAmplitudeValue = 0
    // this.modAmplitudeSpeed = randomFromRange(0.1, 0.25)
    this.modAmplitudeSpeed = 0
    this.waveCenter = wavesScene.center.y

    this.minWaveMod = 0.1
    this.maxWaveMod = 1.2
    this.midWaveMod = (this.minWaveMod + this.maxWaveMod) / 2
    // values to modify wave function
    this.modA = randomFromRange(this.minWaveMod, this.midWaveMod)
    this.modB = randomFromRange(this.midWaveMod, this.maxWaveMod)
    this.modC = randomFromRange(0, 10)

    /** @type {WavePoint[]} */
    this.points = []

    this.waveColor = waveColor
  }

  createPoints() {
    const spacing = this.wavesScene.width / this.numPoints
    for (let i = 0; i <= this.numPoints; i++) {
      const graphic = new PIXI.Graphics()
        .beginFill(this.waveColor)
        .drawCircle(0, 0, this.pointSize)
        .endFill()
      const sprite = new PIXI.Sprite(
        this.pixiApp.renderer.generateTexture(graphic)
      )
      sprite.pivot.set(this.pointSize, this.pointSize)
      graphic.destroy()

      const normalized = (i / this.numPoints) * 10
      const value = this.calcWave(normalized)
      const init = new Vector2d(
        i * spacing,
        this.waveCenter + value * this.maxAmplitude
      )

      /** @type {WavePoint} */
      const point = {
        position: new Vector2d(init.x, init.y),
        initialPosition: new Vector2d(init.x, this.waveCenter),
        sprite: sprite,
        amplitude: this.maxAmplitude,
        modValue: normalized,
        speed: this.pointSpeed,
      }

      this.pixiApp.stage.addChild(sprite)
      this.points.push(point)
    }
  }

  /** @param {number} x */
  calcWave(x) {
    // random bs go brr
    return Math.sin(this.modA * x + this.modC) * Math.cos(this.modB * x)
  }

  /**
   * A clamping function
   *
   * @param {number} min
   * @param {number} max
   * @param {number} x
   * */
  calcClamp(min, max, x) {
    const range = max - min
    // const val = x - min + Math.sin(x - min)
    const val = x - min
    const steps = Math.floor(val / range)
    const reverse = steps % 2 === 1
    const rem = val % range
    const percentage = Math.sin(val / 20) / 2 + 0.5
    // const percentage = reverse ? (range - rem) / range : rem / range
    // console.log(percentage)
    return min + percentage * range
  }

  /** @param {number} delta */
  updateWave(delta) {
    this.lineGraphics.clear()
    this.lineGraphics.lineStyle(5, this.waveColor)
    this.lineGraphics.moveTo(
      this.points[0].position.x,
      this.points[0].position.y
    )
    this.points.forEach((point) => {
      point.sprite.position.set(point.position.x, point.position.y)
      point.modValue += point.speed * delta
      let calc = this.calcWave(point.modValue)
      point.position.y = point.initialPosition.y + calc * this.maxAmplitude
      this.lineGraphics.lineTo(point.position.x, point.position.y)
    })

    // update values for funsies
    this.modAmplitudeValue += this.modAmplitudeSpeed * delta
    this.maxAmplitude = this.calcClamp(
      this.initAmpitude / 2,
      this.initAmpitude,
      this.initAmpitude + this.modAmplitudeValue
    )
  }

  render() {
    this.lineGraphics = new PIXI.Graphics()
    this.pixiApp.stage.addChild(this.lineGraphics)
    this.createPoints()
  }

  clear() {
    this.points.forEach((point) => {
      point.sprite.destroy()
    })
    this.lineGraphics.destroy()
    this.points = []
  }
}
