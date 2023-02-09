let http = require("http");
let fs = require("fs");

const server = http.createServer(function (req, res) {
    // const text = fs.readFileSync("./content/big.txt", "utf8")
    // res.end(text)
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8');
    fileStream.on('open', () => {
      fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
})

server.listen(5000)