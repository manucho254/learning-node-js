// express middleware

const express = require("express");
const app = express();

// npm package for logging
const morgan = require("morgan");
const peopleRouter = require("./express-tutorial/routes/people");
const authRouter = require("./express-tutorial/routes/auth")

app.use(express.urlencoded({ extended: false }));
// parse json data
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/people", peopleRouter);
app.use("/auth", authRouter)

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
