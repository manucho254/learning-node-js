const express = require("express");
const path = require("path");

const app = express();

app.use(express.static('./public'))

// app.get("/", (req, res) =>  {
//   const newPath = path.resolve(__dirname, "./express-tutorial/navbar-app/index.html")
//   res.sendFile(newPath)
// })

app.all("*", (req, res) =>  {
  res.status(404).send("resource not found")
})

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});