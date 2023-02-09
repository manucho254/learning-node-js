// express middleware

const express = require("express");
const app = express();
const logger = require("./express-tutorial/final/logger");
const authorize = require("./express-tutorial/final/authorize");

// req => middleware => res
 
// app.use(logger);

// @desc Using multiple middleware

app.use([logger, authorize]);

// add route to middleware

// app.use("/api", logger)

// api/home/about/products

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/products", (req, res) => {
  res.send("products");
});

app.get("/api/items", (req, res) => {
  res.send("items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
