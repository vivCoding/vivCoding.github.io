import { ThemeFromHtml } from "./index.js"

const wavesBg = document.getElementById("wavesBg")
const waveGroups = [...document.getElementsByClassName("waveGroup")]

export class Waves extends ThemeFromHtml {
  constructor() {
    super(wavesBg)
  }
}
