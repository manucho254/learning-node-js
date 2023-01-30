// express middleware

const express = require("express");
const app = express();

// npm package for logging
const morgan = require("morgan");


app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
