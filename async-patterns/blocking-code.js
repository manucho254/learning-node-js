const http = require("http");

const server = http.createServer((req, res) =>  {
    if (req.url === "/") {
        res.end("Home Page")
    }
    if (req.url === "/about") {
        // BLOCKING CODE !!
        for (let x= 0;  x < 1000; x++) {
            for (let j= 0;  j < 1000; j++) {
                console.log(`${x} ${j}`)
            }
        }
        res.end("About Page")
    }
    res.end("Error page")
})
 
server.listen(5000, () => {
    console.log("server listening on port : 5000.... ")
})