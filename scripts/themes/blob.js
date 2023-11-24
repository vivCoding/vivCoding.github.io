import { fadeIn, fadeOut, waitForAnimations } from "../utils/animation.js"
import { Theme } from "./index.js"

export class BlobBg extends Theme {
  constructor() {
    super()

    this.blobBg = document.getElementById("blobBg")
    /** @type {Element[]} */
    this.blobs = [...document.getElementsByClassName("blob")]

    if (!this.blobBg) throw new Error("no blobBg")

    window.addEventListener(
      "pointermove",
      ((e) => {
        const { clientX, clientY } = e
        this.blobs.forEach((blob, idx) => {
          blob.animate(
            {
              top: `${clientY - blob.clientHeight / 2}px`,
              left: `${clientX - blob.clientWidth / 2}px`,
            },
            { duration: 5000 + 3000 * idx, fill: "forwards" }
          )
        })
      }).bind(this)
    )
  }

  async enter(duration = 1000) {
    await waitForAnimations([fadeIn(this.blobBg, duration)])
  }

  async exit(duration = 1000) {
    await waitForAnimations([fadeOut(this.blobBg, duration)])
  }
}
