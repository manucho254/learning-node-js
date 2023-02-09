// express middleware

const express = require("express");
const app = express();
const logger = require("./express-tutorial/final/logger");
const authorize = require("./authorize");

// req => middleware => res

// app.use(logger)

// add route to middleware

app.use("/api", logger);

// api/home/about/products

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

// using double middleware
app.get("/api/orders", [logger, authorize], (req, res) => {
  res.send("orders");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
