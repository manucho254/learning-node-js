require("dotenv").config();
require("express-async-errors");

// all imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDb = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const authRoutes = require("./routes/auth");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use("/api/v1", authRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb;
    app.listen(port, () => {
      console.log(`Server listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
