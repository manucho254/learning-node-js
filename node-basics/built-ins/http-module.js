// http module 

const http = require("http");

// creating a webserver
const server = http.createServer((req, res) => {
    //request object
    console.log(req)

    // response object
    res.write('welcome to our home page')
    res.end()
})

server.listen(5000)