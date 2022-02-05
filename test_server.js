const http = require("http")
const fs = require("fs")
const path = require("path")

const port = 3000;
const home = __dirname + "/index.html";

const server = http.createServer((req, res) => {
    // console.log(req.url);
    if (req.url == "/") {
        fs.readFile(home, (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        })
    } else {
        fs.readFile(__dirname + req.url, (error, data) => {
            if (!error) {
                res.statusCode = 200;
                res.write(data);
                res.end();
            }
        })
    }
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})