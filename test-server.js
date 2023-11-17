// Simple static file server
var http = require("http")
var fs = require("fs")
var path = require("path")

const port = 3000
const home = __dirname

const extToType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
}

const server = http.createServer((req, res) => {
  console.log("got", req.url)

  const filePath = path.join(home, req.url == "/" ? "index.html" : req.url)
  const extname = path.extname(filePath)
  const contentType = extToType[extname]

  fs.readFile(filePath, (err, data) => {
    if (!err) {
      res.writeHead(200)
      res.end(data)
    } else {
      res.writeHead(404)
      res.end(`404 ${filePath} not found`)
    }
  })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
