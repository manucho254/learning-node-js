require("dotenv").config();

const express = require("express");
const app = express();
//db
const connectDb = require("./db/connect");
const taskRoutes = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// logging
const morgan = require("morgan");

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./public"));

// routes

app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleWare);

// server
const port = process.env.PORT || 3000;

// connectDb().then(() =>
//     console.log("Connected to database"),
//     app.listen(port, () => {
//         console.log(`App listening on port ${port}`);
//     })
// ).catch(err => console.log(err))

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
