require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");

// local imports
const connectDb = require("./db/connect");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const jobRoutes = require("./routes/jobs")
const authRoutes = require("./routes/auth")

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  app routes
app.use("/api/v1/jobs", jobRoutes)
app.use("/api/v1/auth", authRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
