// express middleware

const express = require("express");
const app = express();
const morgan = require("morgan")

let { people } = require("../data")


app.use(morgan("tiny"));

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
