const currentAnimations = []
let isAnimating = false
// possible values: waves, stars
let currAnimation = "waves"
const bgTransitionDuration = 1000

starSettingBtn.onclick = async () => {
  if (isAnimating || currAnimation === "stars") return
  isAnimating = true
  await waitForAnimation(fadeOut(wavesBg))
  await waitForAnimation(fadeIn(starsBg))
  isAnimating = false
  currAnimation = "stars"
}

waveSettingBtn.onclick = async () => {
  if (isAnimating || currAnimation === "waves") return
  isAnimating = true
  await waitForAnimation(fadeOut(starsBg))
  await waitForAnimation(fadeIn(wavesBg))
  isAnimating = false
  currAnimation = "waves"
}

function fadeIn(elem) {
  return elem.animate(
    { opacity: [0, 1] },
    {
      duration: bgTransitionDuration,
      fill: "forwards",
      easing: "linear",
    }
  )
}

function fadeOut(elem) {
  return elem.animate(
    { opacity: [1, 0] },
    {
      duration: bgTransitionDuration,
      fill: "forwards",
      easing: "linear",
    }
  )
}
