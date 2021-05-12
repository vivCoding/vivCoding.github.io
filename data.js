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
            title: "HealthEye",
            link: "https://devpost.com/software/healtheye",
            image: "assets/healtheye.png",
            description: "A video analytics system that allows you to monitor people traffic and COVID social distancing violations. Uses Microsoft Azure Web services. Submitted to the Microsoft Azure AI 2021 Hackathon"
        },
        {
            title: "Vusic",
            link: "https://vusicmusic.herokuapp.com",
            image: "assets/logo500x500.png",
            description: "A fast and easy to use music queuer, inspired by Discord GroovyBot. Created with Vue. Submited to the BoilerMake VIII Hackathon"
        },
        {
            title: "ASCII Art Converter",
            link: "https://ascii-art-converter.herokuapp.com/",
            image: "assets/hashtag.png",
            description: "Converts regular images to text characters based on pixel intensity, adding some \"text-ure\" to them! Created with Python."
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