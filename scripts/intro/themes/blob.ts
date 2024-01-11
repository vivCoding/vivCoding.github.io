import { fadeIn, fadeOut, waitForAnimations } from "@/utils/animation"
import { Theme } from "."

export class BlobBg extends Theme {
  blobBg = document.getElementById("blobBg")
  blobs = [...document.getElementsByClassName("blob")]

  constructor() {
    super()
    if (!this.blobBg) throw new Error("no blobBg")

    window.addEventListener(
      "pointermove",
      ((e: MouseEvent) => {
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
    if (!this.blobBg) throw new Error("no blobBg")
    await waitForAnimations([fadeIn(this.blobBg, duration)])
  }

  async exit(duration = 1000) {
    if (!this.blobBg) throw new Error("no blobBg")
    await waitForAnimations([fadeOut(this.blobBg, duration)])
  }
}
