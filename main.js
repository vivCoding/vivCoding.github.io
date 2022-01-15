var app = new Vue({
    el: "#content",
    data: {
        content: content
    }
})

var backToTopBtn = document.getElementById("backToTop")

var height = window.visualViewport.height / 3

function displayBackToTop() {
    backToTopBtn.style.display = window.scrollY >= height ? "block" : "none"
}

window.addEventListener("scroll", displayBackToTop)
