const heroSect = document.getElementById("hero")
const heroTitle = document.getElementById("heroTitle")
const heroDesc = document.getElementById("heroDesc")

const logoInit = document.getElementById("logoInit")
const logoTop = document.getElementById("logoTop")
const logoMiddle = document.getElementById("logoMiddle")
const logoBottom = document.getElementById("logoBottom")

const logoFinal = document.getElementById("logo")

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function waitForAnimation(animation) {
  return new Promise(
    (resolve) =>
      (animation.onfinish = () => {
        resolve()
      })
  )
}

function waitForAnimations(animations) {
  return Promise.all(animations.map((a) => waitForAnimation(a)))
}

document.body.onload = async function () {
  await heroAnimation0()
  await heroAnimation1()
  await heroAnimation2()
  await heroAnimation3()
  await heroAnimationFinish()
}

function heroAnimation0() {
  // initial setup
  logoInit.style.position = "relative"
  logoInit.style.left = "50%"
  logoInit.style.translate = "-50%"
}

async function heroAnimation1() {
  await waitForAnimation(
    logoInit.animate(
      [
        { scale: 2, opacity: 0 },
        { scale: 1, opacity: 1 },
      ],
      {
        duration: 250,
        easing: "ease",
        fill: "forwards",
      }
    )
  )
}

async function heroAnimation2() {
  await waitForAnimations([
    logoInit.animate(
      [
        {
          rotate: "3deg",
        },
      ],
      {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      }
    ),
    logoTop.animate(
      [
        {
          transform: "translate(-2px, -3px)",
        },
      ],
      {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      }
    ),
    logoMiddle.animate(
      [
        {
          transform: "translate(2px, 3px)",
        },
      ],
      {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      }
    ),
    logoBottom.animate(
      [
        {
          transform: "translate(5px, 5px)",
        },
      ],
      {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      }
    ),
  ])
}

async function heroAnimation3() {
  await waitForAnimations([
    logoInit.animate(
      {
        left: "0%",
        translate: "0%",
      },
      {
        duration: 250,
        easing: "ease",
        fill: "forwards",
      }
    ),
  ])
}

async function heroAnimationFinish() {
  // cleanup, set styles
  logoInit.style.display = "none"
  logoFinal.style.display = "block"
}
