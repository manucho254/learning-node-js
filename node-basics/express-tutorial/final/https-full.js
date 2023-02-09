const http = require("http");

const { readFileSync } = require('fs');
const homePage = readFileSync('./express-tutorial/navbar-app/index.html')
const homeStyles = readFileSync('./express-tutorial/navbar-app/styles.css')
const homeLogic = readFileSync('./express-tutorial/navbar-app/browser-app.js')
 
const server = http.createServer((req, res) => {
  const url = req.url
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  }
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  }
  else if(url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About page</h1>");
    res.end();
  }else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Error page</h1>");
    res.end();
  }
});
server.listen(5000);