const heroSect = document.getElementById("hero")
const heroBorder = document.getElementById("heroBorder")
const heroText = document.getElementById("heroText")
const heroTitle = document.getElementById("heroTitle")
const heroDesc = document.getElementById("heroDesc")

const logoInit = document.getElementById("logoInit")
const logoTop = document.getElementById("logoTop")
const logoMiddle = document.getElementById("logoMiddle")
const logoBottom = document.getElementById("logoBottom")
const logoStroke = document.getElementById("logoStroke")

document.body.onload = async () => {
  // initial setup
  logoInit.style.position = "relative"
  logoInit.style.left = "50%"
  logoInit.style.translate = "-50%"

  logoMiddle.style.visibility = "hidden"
  logoBottom.style.visibility = "hidden"

  logoTop.style.strokeDasharray = 300
  logoStroke.style.strokeDasharray = 300

  // logo step 1

  await waitForAnimations([
    // logoInit.animate([{ scale: 3 }, { scale: 1 }], {
    //   duration: 1000,
    //   easing: "ease",
    //   fill: "forwards",
    // }),
    logoTop.animate([{ strokeDashoffset: 300 }, { strokeDashoffset: 475 }], {
      duration: 900,
      easing: "ease",
      fill: "forwards",
    }),
    logoStroke.animate([{ strokeDashoffset: 300 }, { strokeDashoffset: 170 }], {
      duration: 700,
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
        duration: 900,
        fill: "forwards",
      }
    ),
  ])
  logoMiddle.style.visibility = "visible"
  logoBottom.style.visibility = "visible"

  // start hero text animation concurrently, and don't wait to finish
  heroTextAnimation()

  // logo step 2
  await waitForAnimations([
    logoInit.animate(
      [
        {
          rotate: "3deg",
          strokeOpacity: 0,
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
    logoStroke.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      }
    ),
  ])

  logoTop.style.strokeOpacity = 0
  logoStroke.style.opacity = 0

  // logo step 3
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

  // using animation fill forward to retain new transforms and adding hover effects afterwards is kinda whack
  // hacky fix: just replace the node
  const newNode = logoInit.cloneNode(true)
  // reset styling
  newNode.style.left = "0%"
  newNode.style.translate = "0%"
  // change id to use hover effects defined in css
  newNode.id = "logo"
  // remove old node and replace with new one
  const parent = logoInit.parentNode
  const sibling = logoInit.nextSibling
  logoInit.remove()
  parent.insertBefore(newNode, sibling)
}

async function heroTextAnimation() {
  await delay(500)
  // initial setup
  const containerBr = heroText.getBoundingClientRect()
  const dist = containerBr.height / 2
  heroTitle.style.transform = `translateY(calc(${dist}px - 50%))`

  // border animation
  heroBorder.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
    duration: 500,
    easing: "cubic-bezier(0.86, 0, 0.07, 1)",
    fill: "forwards",
  })

  // wait till text slides in
  await waitForAnimation(
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
        duration: 500,
        fill: "forwards",
      }
    )
  )

  await delay(100)
  // slide smaller text down, and title up
  heroTitle.animate(
    { transform: "translateY(0)" },
    { duration: 300, easing: "ease", fill: "forwards" }
  )
  heroDesc.animate(
    [
      {
        offset: 0,
        opacity: 0,
        transform: "translateY(-80%)",
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
        transform: "translateY(0)",
        easing: "ease",
      },
    ],
    {
      duration: 300,
      fill: "forwards",
    }
  )
}

// #region utility

/**
 *
 * @param {number} time
 * @returns {Promise}
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 *
 * @param {Animation} animation
 * @returns {Promise}
 */
function waitForAnimation(animation) {
  return new Promise((resolve) => (animation.onfinish = resolve))
}

/**
 *
 * @param {Animation[]} animation
 * @returns {Promise}
 */
function waitForAnimations(animations) {
  return Promise.all(animations.map((a) => waitForAnimation(a)))
}

// #endregion utility
