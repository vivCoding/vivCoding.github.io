var app = new Vue({
  el: "#content",
  data: {
    content: content,
  },
});

let backToTopBtn = document.getElementById("backToTop");
let readMoreAboutMeBtn = document.getElementById("readMoreAboutMe");
let readMoreDiv = document.getElementById("readMore");

let height = window.visualViewport.height / 3;

function displayBackToTop() {
  backToTopBtn.style.display = window.scrollY >= height ? "block" : "none";
}
window.addEventListener("scroll", displayBackToTop);

function readMoreAboutMe() {
  console.log("hllowefiwefoew");
  if (readMoreAboutMeBtn.textContent == "Read More") {
    readMoreDiv.style.display = "block";
    readMoreAboutMeBtn.textContent = "Read Less";
    console.log("yo");
  } else {
    readMoreDiv.style.display = "none";
    readMoreAboutMeBtn.textContent = "Read More";
    console.log("hm");
  }
}
