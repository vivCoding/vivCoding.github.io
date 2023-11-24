import { waitForAnimations } from "./utils/animation.js"

const logoInit = document.getElementById("logoInit")
const logoTop = document.getElementById("logoTop")
const logoMiddle = document.getElementById("logoMiddle")
const logoBottom = document.getElementById("logoBottom")
const logoStroke = document.getElementById("logoStroke")

const heroSeparator = document.getElementById("heroSeparator")
const heroText = document.getElementById("heroText")
const heroTitle = document.getElementById("heroTitle")
const heroDesc = document.getElementById("heroDesc")

// TODO maybe bring this back into css?

export async function animateHero() {
  animateLogoHeroText()
}

async function animateLogoHeroText() {
  // initial setup
  logoInit.style.visibility = "visible"
  logoInit.style.translate = "-50%"
  logoInit.style.translate = "-50%"

  logoTop.style.strokeDasharray = "300"
  logoStroke.style.strokeDasharray = "300"
  logoTop.style.fillOpacity = "0"
  logoMiddle.style.fillOpacity = "0"
  logoBottom.style.fillOpacity = "0"

  const containerBr = heroText.getBoundingClientRect()
  const dist = containerBr.height / 2
  heroTitle.style.transform = `translateY(calc(${dist}px - 50%))`

  // to prevent overlapping elems
  const heroDescParent = heroDesc.parentElement
  heroDescParent.style.overflowY = "clip"

  // step 1
  await waitForAnimations([
    logoInit.animate([{ transform: "translateY(-10px)" }, { transform: "translateY(0)" }], {
      duration: 500,
      easing: "ease",
      fill: "forwards",
    }),
    logoTop.animate([{ strokeDashoffset: 300 }, { strokeDashoffset: 475 }], {
      duration: 600,
      easing: "ease",
      fill: "forwards",
    }),
    logoStroke.animate([{ strokeDashoffset: 300 }, { strokeDashoffset: 170 }], {
      duration: 400,
      easing: "ease",
      fill: "forwards",
    }),
    logoTop.animate(
      [
        { offset: 0, fillOpacity: 0 },
        { offset: 0.5, fillOpacity: 0, easing: "ease" },
        { offset: 1, fillOpacity: 1, easing: "ease" },
      ],
      {
        duration: 600,
        fill: "forwards",
      }
    ),
  ])

  // step 2
  await waitForAnimations([
    logoInit.animate([{ rotate: "3deg" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
    logoTop.animate([{ transform: "translate(-2px, -3px)" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
    logoStroke.animate([{ transform: "translate(-2px, -3px)" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
    logoMiddle.animate([{ fillOpacity: 1, transform: "translate(2px, 3px)" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
    logoBottom.animate([{ fillOpacity: 1, transform: "translate(5px, 5px)" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
  ])

  // step 3
  await waitForAnimations([
    logoInit.animate([{ left: "0%", translate: "0%" }], {
      duration: 250,
      easing: "ease",
      fill: "forwards",
    }),
    heroText.animate(
      [
        {
          offset: 0,
          opacity: 0,
          transform: "translateX(-150%) scale(0.4)",
          easing: "ease",
        },
        {
          offset: 0.5,
          opacity: 0,
          easing: "ease",
        },
        {
          offset: 1,
          opacity: 1,
          transform: "translateX(0%) scale(1)",
          easing: "ease",
        },
      ],
      {
        delay: -250,
        duration: 500,
        fill: "forwards",
      }
    ),
  ])

  // step 4
  await waitForAnimations([
    heroSeparator.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
      duration: 400,
      easing: "cubic-bezier(0.86, 0, 0.07, 1)",
      fill: "forwards",
    }),
    heroTitle.animate(
      { transform: "translateY(0)" },
      { duration: 300, easing: "ease", fill: "forwards", delay: 100 }
    ),
    heroDesc.animate(
      [
        {
          offset: 0,
          opacity: 0,
          transform: "translateY(-50%)",
          easing: "ease",
        },
        {
          offset: 1,
          opacity: 1,
          transform: "translateY(0)",
          easing: "ease",
        },
      ],
      {
        duration: 300,
        fill: "forwards",
        delay: 100,
      }
    ),
  ])

  // using animation fill forward to retain new transforms and adding hover effects afterwards is kinda whack
  // hacky fix: just replace the node
  // 1) reset styling for elems that are about to be replaced
  logoInit.style.left = "0%"
  logoInit.style.translate = "0%"
  logoTop.style.fillOpacity = "1"
  logoMiddle.style.fillOpacity = "1"
  logoBottom.style.fillOpacity = "1"
  // 2) create node, and change id to use hover effects defined in css
  const newNode = logoInit.cloneNode(true)
  newNode.id = "logo"
  // 3) remove old node and replace with new one
  const parent = logoInit.parentNode
  const sibling = logoInit.nextSibling
  logoInit.remove()
  parent.insertBefore(newNode, sibling)

  // also reset hero description parent
  heroDescParent.style.overflowY = "visible"
}
