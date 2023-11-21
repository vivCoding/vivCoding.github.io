const starsBg = document.getElementById("starsBg")
const noStarElems = [...document.getElementsByClassName("noStars")]

const pixiApp = new PIXI.Application({
  view: starsBg,
  resizeTo: window,
  autoResize: true,
  backgroundAlpha: 0,
})
document.body.appendChild(pixiApp.view)

const width = pixiApp.screen.width
const height = pixiApp.screen.height

const center = { x: width / 2, y: height / 2 }

const elemSpacing = 0
const spacing = 80
const size = 3.5
const numStars = 0
const baseSpeed = 1
// const baseSpeed = 0

const stars = []
const mousePosition = { x: 0, y: 0 }

document.onmousemove = (e) => {
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY
}

const mouseCursor = new PIXI.Graphics()
mouseCursor.beginFill("rgba(255, 255, 255, 0.7)")
mouseCursor.drawCircle(0, 0, 4)
mouseCursor.endFill()
pixiApp.stage.addChild(mouseCursor)

const lineGraphics = new PIXI.Graphics()
pixiApp.stage.addChild(lineGraphics)

for (let x = 0; x < width; x += spacing) {
  for (let y = 0; y < height; y += spacing) {
    // randomize position, size, and color
    const rx = randomFromRange(x - spacing, x + spacing)
    const ry = randomFromRange(y - spacing, y + spacing)
    const rSize = size * randomFromRange(0.5, 1.25)
    const rAngle = randomFromRange(0, 360)
    const alpha = randomFromRange()
    const rSpeed = alpha * baseSpeed
    // create star
    const star = new PIXI.Graphics()
    star
      .beginFill(`rgba(255, 255, 255, ${alpha})`)
      .drawRect(-rSize / 2, -rSize / 2, rSize, rSize)
      .endFill()
    star.angle = rAngle
    star.position.set(rx, ry)
    stars.push({
      graphic: star,
      alpha,
      x: rx,
      y: ry,
      center: { x: rx, y: ry },
      velocity: { x: 0, y: rSpeed },
      startVelocity: { x: 0, y: rSpeed },
      size: rSize,
    })
    pixiApp.stage.addChild(star)
  }
}

pixiApp.ticker.add((delta) => {
  mouseCursor.position.x = mousePosition.x
  mouseCursor.position.y = mousePosition.y
  lineGraphics.clear()
  stars.forEach((star) => {
    // general movement
    star.x += star.velocity.x * delta
    star.y += star.velocity.y * delta
    star.center.x += star.startVelocity.x * delta
    star.center.y += star.startVelocity.y * delta
    star.graphic.position.set(star.x, star.y)
    if (star.y > height + star.size) {
      star.y = -star.size
      star.center.y = -star.size
    }

    // maybe not needed
    let minD = Infinity
    for (let i = 0; i < noStarElems.length; i++) {
      const bb = noStarElems[i].getBoundingClientRect()
      // if not in x range, disregard
      if (star.x < bb.x || star.x > bb.x + bb.width) continue
      // check if star is inside el
      if (star.y >= bb.y && star.y <= bb.y + bb.height) {
        minD = 0
        break
      }
      // calculate
      const dist = Math.min(
        Math.abs(bb.y - star.y),
        Math.abs(bb.y + bb.height - star.y)
      )
      minD = Math.min(dist, minD)
    }
    if (minD < elemSpacing) {
      star.graphic.clear()
      const newAlpha = Math.max(
        Math.min(star.alpha, 0.2),
        (star.alpha * minD) / elemSpacing
      )
      star.graphic
        .beginFill(`rgba(255, 255, 255, ${newAlpha})`)
        .drawRect(-star.size / 2, -star.size / 2, star.size, star.size)
        .endFill()
    }

    // mouse gravity
    const mxDiff = star.x - mousePosition.x
    const myDiff = star.y - mousePosition.y
    const mDistSquared = mxDiff ** 2 + myDiff ** 2
    // ignore mouse gravity if distance far away
    // const mGrav =
    //   mDistSquared > 10000 ? 0 : Math.max(100 / Math.max(mDistSquared, 1), 1)
    const mGrav =
      mDistSquared > 10000 ? 0 : Math.min(500 / Math.max(mDistSquared, 1), 10)

    // original center gravity
    const cxDiff = star.x - star.center.x
    const cyDiff = star.y - star.center.y
    const cDistSquared = cxDiff ** 2 + cyDiff ** 2
    const cGrav = cDistSquared < 10 ? 0 : cDistSquared / 10000 + 0.1

    star.velocity.x +=
      (mGrav * Math.sign(mxDiff) + cGrav * -Math.sign(cxDiff)) * delta
    star.velocity.y +=
      (mGrav * Math.sign(myDiff) + cGrav * -Math.sign(cyDiff)) * delta
    star.velocity.x *= 0.9
    star.velocity.y *= 0.9

    // add lines to show mouse gravity
    if (mGrav > 0) {
      lineGraphics
        .lineStyle(
          Math.min(mGrav * 10, 5),
          "white",
          Math.min(star.alpha, 3000 / Math.max(mDistSquared, 1))
        )
        .moveTo(mouseCursor.position.x, mouseCursor.position.y)
        .lineTo(star.x, star.y)
    }
  })
})

// #region utilities

function randomFromRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(getDistanceSquared(x1, y1, x2, y2))
}

/**
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function getDistanceSquared(x1, y1, x2, y2) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function getDistanceFromCenter(x, y) {
  return getDistance(x, y, center.x, center.y)
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function getPercentDistanceFromCenter(x, y) {
  if (x == center.x && y == center.y) return 0
  // top edge
  const c1 = lineIntersect(x, y, center.x, center.y, 0, 0, width, 0)
  // bottom edge
  const c2 = lineIntersect(x, y, center.x, center.y, 0, height, width, height)
  // left edge
  const c3 = lineIntersect(x, y, center.x, center.y, 0, 0, 0, height)
  // right edge
  const c4 = lineIntersect(x, y, center.x, center.y, width, 0, width, height)
  // find edge point
  let minD = Infinity
  let edgePoint = undefined
  if (c1 && (d = getDistance(x, y, c1.x, c1.y)) < minD)
    (edgePoint = c1), (minD = d)
  if (c2 && (d = getDistance(x, y, c2.x, c2.y)) < minD)
    (edgePoint = c2), (minD = d)
  if (c3 && (d = getDistance(x, y, c3.x, c3.y)) < minD)
    (edgePoint = c3), (minD = d)
  if (c4 && (d = getDistance(x, y, c4.x, c4.y)) < minD)
    (edgePoint = c4), (minD = d)
  console.log("edgePoint", edgePoint)
  console.log("coords", c1, c2, c3, c4)
  return (
    getDistanceFromCenter(x, y) /
    getDistanceFromCenter(edgePoint.x, edgePoint.y)
  )
}

// https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines
function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  let denom, a, b, num1, num2
  const result = {
    x: NaN,
    y: NaN,
  }
  denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
  if (denom == 0) {
    return result
  }
  a = y1 - y3
  b = x1 - x3
  num1 = (x4 - x3) * a - (y4 - y3) * b
  num2 = (x2 - x1) * a - (y2 - y1) * b
  a = num1 / denom
  b = num2 / denom

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = x1 + a * (x2 - x1) ?? NaN
  result.y = y1 + a * (y2 - y1) ?? NaN

  return result
}

function showClientBrs() {
  noStarElems.forEach((el) => {
    const { x, y, width, height } = el.getBoundingClientRect()
    console.log("got", x, width)
    const graphics = new PIXI.Graphics()
    graphics.beginFill("rgba(255, 0, 0, 0.2)")
    graphics.drawRect(
      x - elemSpacing,
      y - elemSpacing,
      width + elemSpacing * 2,
      height + elemSpacing * 2
    )
    graphics.endFill()
    pixiApp.stage.addChild(graphics)
  })
}
// #endregion utilities
