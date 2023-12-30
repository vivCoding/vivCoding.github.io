// https://github.com/joeiddon/perlin/blob/master/perlin.js
export const perlin = {
  ct: 0,
  ct2: 0,
  memory: {} as Record<number, Record<number, number>>,
  gradients: {} as Record<number, Record<number, { x: number; y: number }>>,

  seed: function () {
    this.gradients = {}
    this.memory = {}
    this.ct = 0
    this.ct2 = 0
  },

  rand_vect: function () {
    let theta = Math.random() * 2 * Math.PI
    return { x: Math.cos(theta), y: Math.sin(theta) }
  },

  dot_prod_grid: function (x: number, y: number, vx: number, vy: number): number {
    let g_vect
    let d_vect = { x: x - vx, y: y - vy }
    // vx = +vx.toFixed(2)
    // vy = +vy.toFixed(2)
    if (!!this.gradients[vx] && !!this.gradients[vx][vy]) {
      g_vect = this.gradients[vx][vy]
    } else {
      this.ct2++
      g_vect = this.rand_vect()
      if (!this.gradients[vx]) this.gradients[vx] = {}
      this.gradients[vx][vy] = g_vect
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y
  },

  smootherstep: function (x: number) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
  },

  interp: function (x: number, a: number, b: number) {
    return a + this.smootherstep(x) * (b - a)
  },

  get: function (x: number, y: number): number {
    // x = +x.toFixed(2)
    // y = +y.toFixed(2)
    if (!!this.memory[x] && !!this.memory[x][y]) return this.memory[x][y]
    let xf = Math.floor(x)
    let yf = Math.floor(y)
    //interpolate
    let tl = this.dot_prod_grid(x, y, xf, yf)
    let tr = this.dot_prod_grid(x, y, xf + 1, yf)
    let bl = this.dot_prod_grid(x, y, xf, yf + 1)
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1)
    let xt = this.interp(x - xf, tl, tr)
    let xb = this.interp(x - xf, bl, br)
    let v = this.interp(y - yf, xt, xb)
    if (!this.memory[x]) this.memory[x] = {}
    this.memory[x][y] = v
    // this.ct++
    // console.log(this.ct, this.ct2)
    return v
  },
}
