const express = require("express");

const app = express();

const { products, people } = require("./data");

app.get("/", (req, res) => {
  res.json(people);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  let product = products.filter(
    (product) => product.id === Number(req.params.id)
  );
  res.json(product);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
