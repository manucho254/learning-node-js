const express = require("express");

const app = express();

const { products, people } = require("./data");

app.get("/", (req, res) => {
  res.send(
    "<h1>Home page </h1><a href='/api/people'>people</a><br><a href='/api/products'>products</a>"
  );
});

app.get("/api/people", (req, res) => {
  res.json(people);
});

app.get("/api/people/:id", (req, res) => {
  let person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    res.status(404).json([{ message: "Person not found" }]);
  }
  else res.json(person);
});

app.get("/api/products", (req, res) => {
  // destructuring so that we only get the data we need
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  let { productId } = req.params;
  let product = products.find(
    (product) => product.id === Number(productId)
  );
  if (!product) {
    res.status(404).json([{ message: "Product not found" }]);
  }
  else res.json(product);
});

// a more nested param 

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  console.log(req.params)
  res.send("Done")
});


app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
