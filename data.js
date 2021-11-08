var content = {
    subtitle: "CS Student at Purdue University",
    description: "Just making fun and useful things.",
    links: [
        {
            title: "GitHub",
            link: "https://github.com/vivCoding",
            icon: "assets/githubIcon_trans.png"
        },
        {
            title: "LinkedIn",
            link: "https://www.linkedin.com/in/vincent-v-vu/",
            icon: "assets/linkedinLogo_trans.png"
        }
    ],
    projects: [
        {
            title: "Vusic",
            link: "https://vusicmusic.herokuapp.com",
            image: "assets/logo500x500.png",
            description: "A fast and easy to use music queuer, inspired by Discord GroovyBot. Created with Vue and NodeJS. Submited to the BoilerMake VIII Hackathon"
        },
        {
            title: "HealthEye",
            link: "https://devpost.com/software/healtheye",
            image: "assets/healtheye.png",
            description: "A video analytics system that allows you to monitor people traffic and COVID social distancing violations. Uses Microsoft Azure Web services. Submitted to the Microsoft Azure AI 2021 Hackathon"
        },
        {
            title: "vsearch",
            link: "https://github.com/vivCoding/vsearch",
            image: "assets/search.png",
            description: "An attempt to make a customizable web crawler/data miner wth search engine fetures. Created with Scrapy, Flask, and MongoDB"
        },
        {
            title: "vBlocker",
            link: "https://github.com/vivCoding/vBlocker",
            image: "assets/code_icon.png",
            description: "Simple browser extension that blocks user specified domains with a password. Created with JavaScript"
        },
        {
            title: "Sorting Visualizer",
            link: "https://vivcoding.github.io/sorting_viz/",
            image: "assets/barchart.jpg",
            description: "Web app that animates many different sorting algorithms"
        },
        {
            title: "vTodo",
            link: "https://vtodo.herokuapp.com",
            image: "assets/checkmark.jpg",
            description: "An extremely basic app where users can write and save todo apps. Created with Vue/TypeScript, FastApi, and MongoDB"
        },
        {
            title: "ASCII Art Converter",
            link: "https://ascii-art-converter.herokuapp.com/",
            image: "assets/hashtag.png",
            description: "Converts regular images to text characters based on pixel intensity, adding some \"text-ure\" to them! Created with Python"
        },
        {
            title: "Portfolio Website",
            link: "https://github.com/vivCoding/vivCoding.github.io",
            image: "assets/code_icon.png",
            description: "Website to display my ongoing and completed technical projects. Created using vanilla HTML/CSS and Vue"
        }
    ]
}

var app = new Vue({
    el: "#content",
    data: {
        content: content
    }
})