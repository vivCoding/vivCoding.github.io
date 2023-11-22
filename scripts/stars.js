// TODO wrap around big function, check if prefered reduced motion
// TODO pixiApp on resize window
// TODO remove unused funcs

const pixiApp = new PIXI.Application({
  view: starsBg,
  resizeTo: window,
  autoResize: true,
  backgroundAlpha: 0,
})
if (starsBg) {
  document.body.appendChild(pixiApp.view)
}

const width = pixiApp.screen.width
const height = pixiApp.screen.height

const center = { x: width / 2, y: height / 2 }

const elemSpacing = 0
const spacing = 80
const size = 3.5
const numStars = 0
const baseSpeed = 1
const minSpeed = 0.1
const mouseForceRadius = 100
const mouseCursorSize = 3

const stars = []
const mousePosition = { x: 0, y: 0 }

document.onmousemove = (e) => {
  mousePosition.x = e.clientX
  mousePosition.y = e.clientY
}

// create the mouse cursor
const mouseCursorGraphic = new PIXI.Graphics()
  .beginFill("white", 0.7)
  .drawCircle(0, 0, mouseCursorSize)
  .endFill()
const mouseCursor = {
  sprite: new PIXI.Sprite(pixiApp.renderer.generateTexture(mouseCursorGraphic)),
  x: 0,
  y: 0,
  size: mouseCursorSize,
  velocity: { x: 0, y: 0 },
}
mouseCursorGraphic.destroy()
mouseCursor.sprite.pivot.set(mouseCursorSize, mouseCursorSize)
pixiApp.stage.addChild(mouseCursor.sprite)

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
    // create star graphic
    const graphic = new PIXI.Graphics()
    graphic.beginFill("white", alpha).drawRect(0, 0, rSize, rSize).endFill()
    // create sprite with graphic texture (sprites are apparently a lil' more performant than graphics)
    const star = new PIXI.Sprite(pixiApp.renderer.generateTexture(graphic))
    // set pivot and initial transform, and add to list
    star.pivot.set(rSize / 2, rSize / 2)
    star.angle = rAngle
    star.position.set(rx, ry)
    stars.push({
      sprite: star,
      alpha,
      x: rx,
      y: ry,
      center: { x: rx, y: ry },
      velocity: { x: 0, y: rSpeed },
      startVelocity: { x: 0, y: rSpeed },
      size: rSize,
      lineColor: {
        h: randomFromRange(0, 360),
        s: randomFromRange(100, 100),
        l: randomFromRange(50, 50),
      },
    })
    pixiApp.stage.addChild(star)
    graphic.destroy()
  }
}

pixiApp.ticker.add((delta) => {
  // mouse cursor simple gravity
  const mcxDiff = mousePosition.x - mouseCursor.x
  const mcyDiff = mousePosition.y - mouseCursor.y
  const mcDistSquared = mcxDiff ** 2 + mcyDiff ** 2
  const mcDist = Math.sqrt(mcDistSquared)

  const mcGrav = mcDist / 25
  const mcTheta = Math.atan2(mcyDiff, mcxDiff)
  const mcxGrav = mcGrav * Math.cos(mcTheta)
  const mcyGrav = mcGrav * Math.sin(mcTheta)

  mouseCursor.velocity.x += mcxGrav * delta
  mouseCursor.velocity.y += mcyGrav * delta

  mouseCursor.x += mouseCursor.velocity.x * delta
  mouseCursor.y += mouseCursor.velocity.y * delta
  mouseCursor.sprite.position.set(mouseCursor.x, mouseCursor.y)

  mouseCursor.velocity.x *= 0.8
  mouseCursor.velocity.y *= 0.8

  lineGraphics.clear()

  stars.forEach((star) => {
    // apply movement (including forces)
    star.x += star.velocity.x * delta
    star.y += star.velocity.y * delta
    // apply only base movement (no forces) to star center
    star.center.x += star.startVelocity.x * delta
    star.center.y += star.startVelocity.y * delta
    // reset pos if needed
    if (star.y > height + star.size) {
      star.velocity.x = 0
      star.velocity.y = 0
      star.center.y = -star.size
      star.x = star.center.x
      star.y = star.center.y
    }
    // update sprite
    star.sprite.position.set(star.x, star.y)

    // velocity loss
    star.velocity.x *= 0.5
    star.velocity.y *= 0.5

    // prevent excess oscillation
    // if (Math.abs(star.velocity.x) < minSpeed) star.velocity.x = 0
    // if (Math.abs(star.velocity.y) < minSpeed) star.velocity.y = 0

    // mouse force
    const mxDiff = star.x - mouseCursor.x
    const myDiff = star.y - mouseCursor.y
    const mDistSquared = mxDiff ** 2 + myDiff ** 2
    const mDist = Math.sqrt(mDistSquared)
    // ignore mouse force if distance far away
    const mGrav = mDist > mouseForceRadius ? 0 : 50 / mDist
    const mTheta = Math.atan2(myDiff, mxDiff)
    const mxGrav = mGrav * Math.cos(mTheta)
    const myGrav = mGrav * Math.sin(mTheta)
    const mouseInteraction = !!mGrav

    // gravity towards star center (orbit)
    const cxDiff = star.center.x - star.x
    const cyDiff = star.center.y - star.y
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
      const percentDist = (mouseForceRadius - mDist) / mouseForceRadius
      lineGraphics
        .lineStyle(
          clampValue(1, 5, percentDist ** 0.5 * 5),
          "white",
          // star.lineColor,
          // { h: Math.floor(percentDist * 360), s: 100, l: 50 },
          clampValue(0, star.alpha, percentDist ** 0.6)
        )
        .moveTo(mouseCursor.x, mouseCursor.y)
        .lineTo(star.x, star.y)
    }
  })
})

// #region utilities (unused)

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

// #endregion utilities
