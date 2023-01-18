// http module 

const http = require("http");

// simple creating a webserver
const server = http.createServer((req, res) => {
    //request object
    if (req.url === "/") {
        res.end("<h2>Welcome to home page</h2>")
    }
    if (req.url === "/about"){
        res.end("<h2>Welcome to about page</h2>")
    }
    res.end(`
    <h2>Oops! Page not found </h2>
    <p>We can't seem to find the page </p>
    <a href="/"> back home </a>
    `)
})

server.listen(5000)