import { Vector2d, randomFromRange, randomIntFromRange, shuffle } from "@/utils/misc"
import * as PIXI from "pixi.js"
import { PixiTheme } from "."

type WaveFunc = (x: number) => number

type WavePoint = {
  position: Vector2d
  initialPosition: Vector2d
  speed: number
  modValue: number
  amplitude: number
  waveFunc: WaveFunc
}

export class WavesScene extends PixiTheme {
  // TODO scale with screen width
  minWavesHeight = this.height * (this.width < 500 ? 0.2 : 0.5)
  maxWavesHeight = this.height * (this.width < 500 ? 0.4 : 0.9)
  minOpacity = 0.2
  maxOpacity = 0.4
  waves: WaveShape[]

  constructor() {
    super()
    this.waves = [
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#263357"),
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#263357"),
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#374F7A"),
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#476D9E"),
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#5386BB"),
      new WaveShape(this, randomIntFromRange(this.minWavesHeight, this.maxWavesHeight), "#5386BB"),
    ]
  }

  render() {
    shuffle(this.waves)
    this.waves.forEach((wave) => {
      const waveOpacity = randomFromRange(this.minOpacity, this.maxOpacity)
      wave.opacity = waveOpacity
      wave.render()
    })
  }

  onTick(delta: number) {
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

class WaveShape {
  /*
    TODO could make another class specifically for wave (edge of shape)
    TODO wave height resize
    TODO do some cool stuff with mouse?
    maybe make wave center curvey rather than a horizontal line? idk
  */

  wavesScene: WavesScene
  pixiApp: PIXI.Application
  waveColor: string
  opacity: number

  shapeCenter: number
  shapeHeight: number
  topShapeBound: number
  bottomShapeBound: number

  minCenterRange: number
  maxCenterRange: number
  bottomEdgeCenter: number
  topEdgeCenter: number

  bottomMaxAmplitude: number
  topMaxAmplitude: number

  edgeSameDirection: boolean

  minWaveModAB: number
  maxWaveModAB: number
  minWaveModC: number
  maxWaveModC: number

  points: WavePoint[]

  minPointSpeed: number
  maxPointSpeed: number
  numPoints: number

  topEdgeGraphics1?: PIXI.Graphics = undefined
  topEdgeGraphics2?: PIXI.Graphics = undefined
  bottomEdgeGraphics1?: PIXI.Graphics = undefined
  bottomEdgeGraphics2?: PIXI.Graphics = undefined

  constructor(wavesScene: WavesScene, shapeHeight: number, waveColor: string, opacity = 1) {
    this.wavesScene = wavesScene
    this.pixiApp = wavesScene.pixiApp
    this.waveColor = waveColor
    this.opacity = opacity

    this.shapeCenter = wavesScene.center.y

    // height of shape from bottom of shape to top of shape
    this.shapeHeight = shapeHeight
    this.topShapeBound = this.shapeCenter + this.shapeHeight / 2
    this.bottomShapeBound = this.shapeCenter - this.shapeHeight / 2

    // vary the center of wave on each edge
    this.minCenterRange = 0.2
    this.maxCenterRange = 1.4
    this.bottomEdgeCenter =
      this.shapeCenter - (this.shapeHeight / 4) * randomIntFromRange(this.minCenterRange, this.maxCenterRange)
    this.topEdgeCenter =
      this.shapeCenter + (this.shapeHeight / 4) * randomIntFromRange(this.minCenterRange, this.maxCenterRange)

    // calculate max amplitude based on distance from nearest bound
    this.bottomMaxAmplitude = this.bottomEdgeCenter - this.bottomShapeBound
    this.topMaxAmplitude = this.topShapeBound - this.topEdgeCenter

    // should edges flow in same dir
    this.edgeSameDirection = false

    // wave function params
    this.minWaveModAB = 0.1
    this.maxWaveModAB = 1.2
    this.minWaveModC = 0
    this.maxWaveModC = 10

    // wave edge points
    // TODO maybe break this into two arrays, top edge points and bottom edge points?
    this.points = []

    // wave values
    this.minPointSpeed = 0.005
    this.maxPointSpeed = 0.04
    // TODO different num points for each edge?
    this.numPoints = randomIntFromRange(4, 12)
    // this.numPoints = this.wavesScene.width < 500 ? randomIntFromRange(4, 7) : randomIntFromRange(4, 12)

    // masking for when the top edge and bottom edge overlap :))))
    // (lmao maybe not performant for the user but idgaf it look cool)
    this.topEdgeGraphics1 = undefined
    this.topEdgeGraphics2 = undefined
    this.bottomEdgeGraphics1 = undefined
    this.bottomEdgeGraphics2 = undefined
  }

  createPoints() {
    // random speeds for each wave edge
    const midSpeed = (this.minPointSpeed + this.maxPointSpeed) / 2
    const speed1 =
      randomFromRange(this.minPointSpeed, midSpeed) * (this.edgeSameDirection ? 1 : Math.sign(randomFromRange(-1, 1)))
    const speed2 =
      randomFromRange(midSpeed, this.maxPointSpeed) * (this.edgeSameDirection ? 1 : Math.sign(randomFromRange(-1, 1)))

    // create two different wave func for each edge
    const midWaveMod = (this.minWaveModAB + this.maxWaveModAB) / 2
    const waveFunc1 = this.createWaveFunc(
      randomFromRange(this.minWaveModAB, midWaveMod),
      randomFromRange(midWaveMod, this.maxWaveModAB),
      randomFromRange(this.minWaveModC, 5)
    )
    const waveFunc2 = this.createWaveFunc(
      randomFromRange(this.minWaveModAB, midWaveMod),
      randomFromRange(midWaveMod, this.maxWaveModAB),
      randomFromRange(5, this.maxWaveModC)
    )

    // randomize which edge gets which property
    const coinFlip = randomFromRange() > 0
    const coinFlip2 = randomFromRange() > 0

    // overflow the edges a bit
    const start = Math.round(-this.numPoints / 3)
    const end = Math.round(this.numPoints * 1.3)
    const pointSpacing = this.wavesScene.width / this.numPoints
    // top edge of wave
    for (let i = start; i <= end; i++) {
      this.createPoint({
        position: new Vector2d(i * pointSpacing, this.topEdgeCenter),
        amplitude: randomFromRange(this.topMaxAmplitude * 0.25, this.topMaxAmplitude),
        speed: coinFlip ? speed1 : speed2,
        waveFunc: coinFlip2 ? waveFunc1 : waveFunc2,
      })
    }
    // bottom edge of wave
    for (let i = end; i >= start; i--) {
      this.createPoint({
        position: new Vector2d(i * pointSpacing, this.bottomEdgeCenter),
        amplitude: randomFromRange(this.bottomMaxAmplitude * 0.25, this.bottomMaxAmplitude),
        speed: !coinFlip ? speed1 : speed2,
        waveFunc: !coinFlip2 ? waveFunc1 : waveFunc2,
      })
    }
  }

  createPoint({
    position,
    speed,
    amplitude,
    waveFunc,
  }: {
    position: Vector2d
    speed: number
    amplitude: number
    waveFunc: WaveFunc
  }) {
    // normalize x range to be in 10, so u can view wave func on a 0 <= x <= 10 desmos graph
    const initModValue = (position.x / this.wavesScene.width) * 10
    const point: WavePoint = {
      position: position,
      initialPosition: position.copy(),
      modValue: initModValue,
      amplitude,
      speed,
      waveFunc,
    }

    this.points.push(point)
  }

  /**
   * Creates a new wave function with params
   *
   * f(x) = sin(Ax + C) * cos(Bx)
   */
  createWaveFunc(modA: number, modB: number, modC: number): WaveFunc {
    return (x) =>
      // random bs func go brr
      Math.sin(modA * x + modC) * Math.cos(modB * x)
    // Math.sin(x)
  }

  /** @param {number} delta */
  updateWave(delta: number) {
    if (!this.topEdgeGraphics1 || !this.topEdgeGraphics2 || !this.bottomEdgeGraphics1 || !this.bottomEdgeGraphics2)
      throw "wtf no edge grpahics??"
    // update point value with wave movement
    this.points.forEach((point) => {
      point.modValue += point.speed * delta
      point.position.y = point.initialPosition.y + point.waveFunc(point.modValue) * point.amplitude
    })

    // draw top edge, as well as shape for masking
    let prev = this.points[0].position.copy()
    this.topEdgeGraphics1.clear()
    this.topEdgeGraphics1.beginFill(this.waveColor, this.opacity)
    this.topEdgeGraphics1.moveTo(prev.x, this.bottomShapeBound)

    this.topEdgeGraphics2.clear()
    this.topEdgeGraphics2.beginFill(this.waveColor, this.opacity)
    this.topEdgeGraphics2.moveTo(prev.x, this.topShapeBound)

    for (let i = 0; i < this.points.length / 2; i++) {
      const point = this.points[i]
      // draw curve using median between two points (use median else won't curve)
      const mx = (prev.x + point.position.x) / 2
      const my = (prev.y + point.position.y) / 2
      this.topEdgeGraphics1.quadraticCurveTo(prev.x, prev.y, mx, my)
      this.topEdgeGraphics2.quadraticCurveTo(prev.x, prev.y, mx, my)
      prev = point.position.copy()
    }

    this.topEdgeGraphics1.lineTo(prev.x, this.bottomShapeBound)
    this.topEdgeGraphics1.closePath()
    this.topEdgeGraphics1.endFill()

    this.topEdgeGraphics2.lineTo(prev.x, this.topShapeBound)
    this.topEdgeGraphics2.closePath()
    this.topEdgeGraphics2.endFill()

    // draw bottom edge, as well as shape for masking
    prev = this.points[this.points.length / 2].position.copy()
    this.bottomEdgeGraphics1.clear()
    this.bottomEdgeGraphics1.beginFill(this.waveColor, this.opacity)
    this.bottomEdgeGraphics1.moveTo(prev.x, this.bottomShapeBound)

    this.bottomEdgeGraphics2.clear()
    this.bottomEdgeGraphics2.beginFill(this.waveColor, this.opacity)
    this.bottomEdgeGraphics2.moveTo(prev.x, this.topShapeBound)

    for (let i = this.points.length / 2; i < this.points.length; i++) {
      const point = this.points[i]
      // draw curve using median between two points (use median else won't curve)
      const mx = (prev.x + point.position.x) / 2
      const my = (prev.y + point.position.y) / 2
      this.bottomEdgeGraphics1.quadraticCurveTo(prev.x, prev.y, mx, my)
      this.bottomEdgeGraphics2.quadraticCurveTo(prev.x, prev.y, mx, my)
      prev = point.position.copy()
    }

    this.bottomEdgeGraphics1.lineTo(prev.x, this.bottomShapeBound)
    this.bottomEdgeGraphics1.closePath()
    this.bottomEdgeGraphics1.endFill()

    this.bottomEdgeGraphics2.lineTo(prev.x, this.topShapeBound)
    this.bottomEdgeGraphics2.closePath()
    this.bottomEdgeGraphics2.endFill()
  }

  render() {
    this.topEdgeGraphics1 = new PIXI.Graphics()
    this.topEdgeGraphics2 = new PIXI.Graphics()
    this.bottomEdgeGraphics1 = new PIXI.Graphics()
    this.bottomEdgeGraphics2 = new PIXI.Graphics()
    this.pixiApp.stage.addChild(
      this.topEdgeGraphics1,
      this.topEdgeGraphics2,
      this.bottomEdgeGraphics1,
      this.bottomEdgeGraphics2
    )
    this.topEdgeGraphics1.mask = this.bottomEdgeGraphics2
    this.bottomEdgeGraphics1.mask = this.topEdgeGraphics2

    this.createPoints()
  }

  clear() {
    if (this.topEdgeGraphics1) this.topEdgeGraphics1.destroy()
    if (this.topEdgeGraphics2) this.topEdgeGraphics2.destroy()
    if (this.bottomEdgeGraphics1) this.bottomEdgeGraphics1.destroy()
    if (this.bottomEdgeGraphics2) this.bottomEdgeGraphics2.destroy()
    this.points = []
  }

  resize() {}
}
