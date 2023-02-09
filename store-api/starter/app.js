require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// logging
const morgan = require("morgan");

// local imports
const connectDb = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productRoutes = require("./routes/products");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api/v1/products", productRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
   
  } catch (error) {
    console.log(error);
  }
};
start();
