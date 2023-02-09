const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url
  res.writeHead(200, { "content-type": "text/html" });
  if (url === "/") {
    res.write("<h1>Home page</h1>");
    res.end();
  }else if(url === "/about") {
    res.write("<h1>About page</h1>");
    res.end();
  }else {
    res.write("<h1>Error page</h1>");
    res.end();
  }
});
server.listen(5000);
